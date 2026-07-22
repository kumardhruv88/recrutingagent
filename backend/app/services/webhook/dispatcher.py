import json
import traceback
from typing import Dict, Any
from datetime import datetime, UTC
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.webhook import WebhookEvent
from app.services.webhook.registry import WebhookRegistry


class WebhookDispatcher:
    def __init__(self, registry: WebhookRegistry) -> None:
        self.registry = registry

    async def dispatch(
        self,
        db: AsyncSession,
        provider: str,
        payload_bytes: bytes,
        headers: Dict[str, str],
    ) -> WebhookEvent:

        validator = self.registry.get_validator(provider)

        # 1. Validate signature
        is_valid = await validator.validate(payload_bytes, headers)
        if not is_valid:
            raise ValueError("Invalid signature")

        payload = json.loads(payload_bytes.decode("utf-8"))

        # Determine event identity (This could be abstracted, but assuming payload has id/type common patterns)
        event_id = (
            payload.get("id")
            or headers.get("x-event-id")
            or headers.get("stripe-signature")
        )
        event_type = payload.get("type") or headers.get("x-github-event")

        if not event_id or not event_type:
            raise ValueError(
                "Could not determine event ID or type from payload/headers"
            )

        # 2. Idempotency Check
        stmt = select(WebhookEvent).where(
            WebhookEvent.provider == provider,
            WebhookEvent.provider_event_id == event_id,
        )
        existing = (await db.execute(stmt)).scalar_one_or_none()
        if existing:
            return existing  # Deduplicate safely

        # 3. Persist Event
        event = WebhookEvent(
            provider=provider,
            provider_event_id=event_id,
            event_type=event_type,
            payload=payload,
            headers=headers,
            status="PENDING",
        )
        db.add(event)
        await db.commit()
        await db.refresh(event)

        # 4. Invoke Handler Inline (or via Queue eventually)
        try:
            handler = self.registry.get_handler(provider, event_type)
            await handler(db, payload)

            event.status = "PROCESSED"
            event.processed_at = datetime.now(UTC)
        except Exception as e:
            event.status = "FAILED"
            event.error_details = traceback.format_exc()

        await db.commit()
        await db.refresh(event)

        return event

    async def retry(self, db: AsyncSession, event_id: str) -> WebhookEvent:
        stmt = select(WebhookEvent).where(WebhookEvent.id == event_id)
        event = (await db.execute(stmt)).scalar_one_or_none()
        if not event:
            raise ValueError("Event not found")

        if event.status == "PROCESSED":
            raise ValueError("Event already processed")

        try:
            handler = self.registry.get_handler(event.provider, event.event_type)
            await handler(db, event.payload)

            event.status = "PROCESSED"
            event.error_details = None
            event.processed_at = datetime.now(UTC)
        except Exception as e:
            event.status = "FAILED"
            event.error_details = traceback.format_exc()

        await db.commit()
        await db.refresh(event)
        return event
