import uuid
import traceback
from datetime import datetime, UTC
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.notification import NotificationLog
from app.schemas.notification import SendNotificationRequest
from app.services.notification.registry import ChannelRegistry
from app.services.notification.template import TemplateEngine


class NotificationService:
    """
    Main notification orchestration service handling template rendering, channel resolution,
    sending, delivery tracking, and retries.
    """

    def __init__(
        self,
        channel_registry: ChannelRegistry,
        template_engine: TemplateEngine,
    ) -> None:
        self.channel_registry = channel_registry
        self.template_engine = template_engine

    async def send_notification(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        request: SendNotificationRequest,
    ) -> NotificationLog:
        # 1. Render template
        subject, body = self.template_engine.render(
            request.template_name, request.variables
        )

        # 2. Resolve channel adapter
        adapter = self.channel_registry.resolve(request.channel)

        # 3. Create log record
        log_entry = NotificationLog(
            organization_id=organization_id,
            recipient=request.recipient,
            channel=request.channel.lower(),
            template_name=request.template_name,
            variables=request.variables,
            status="PENDING",
        )
        db.add(log_entry)
        await db.commit()
        await db.refresh(log_entry)

        # 4. Dispatch notification
        try:
            response_metadata = await adapter.send(
                db=db,
                organization_id=organization_id,
                recipient=request.recipient,
                subject=subject,
                body=body,
                metadata=request.variables,
            )
            log_entry.status = "SENT"
            log_entry.provider_response = response_metadata
            log_entry.sent_at = datetime.now(UTC)
            log_entry.error_details = None
        except Exception as e:
            log_entry.status = "FAILED"
            log_entry.error_details = traceback.format_exc()

        await db.commit()
        await db.refresh(log_entry)
        return log_entry

    async def get_notification(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        notification_id: uuid.UUID,
    ) -> NotificationLog:
        stmt = select(NotificationLog).where(
            NotificationLog.id == notification_id,
            NotificationLog.organization_id == organization_id,
        )
        notification = (await db.execute(stmt)).scalar_one_or_none()
        if not notification:
            raise ValueError("Notification not found")
        return notification

    async def list_notifications(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        status: Optional[str] = None,
    ) -> List[NotificationLog]:
        stmt = select(NotificationLog).where(
            NotificationLog.organization_id == organization_id
        )
        if status:
            stmt = stmt.where(NotificationLog.status == status.upper())
        stmt = stmt.order_by(NotificationLog.created_at.desc()).limit(100)
        results = await db.execute(stmt)
        return list(results.scalars().all())

    async def retry_notification(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        notification_id: uuid.UUID,
    ) -> NotificationLog:
        log_entry = await self.get_notification(db, organization_id, notification_id)
        if log_entry.status == "SENT":
            raise ValueError("Notification has already been successfully sent")

        # Render template
        subject, body = self.template_engine.render(
            log_entry.template_name, log_entry.variables or {}
        )
        adapter = self.channel_registry.resolve(log_entry.channel)

        try:
            response_metadata = await adapter.send(
                db=db,
                organization_id=organization_id,
                recipient=log_entry.recipient,
                subject=subject,
                body=body,
                metadata=log_entry.variables or {},
            )
            log_entry.status = "SENT"
            log_entry.provider_response = response_metadata
            log_entry.sent_at = datetime.now(UTC)
            log_entry.error_details = None
        except Exception as e:
            log_entry.status = "FAILED"
            log_entry.error_details = traceback.format_exc()

        await db.commit()
        await db.refresh(log_entry)
        return log_entry
