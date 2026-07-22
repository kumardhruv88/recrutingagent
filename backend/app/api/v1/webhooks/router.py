import uuid
from typing import Any, List, Dict
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.dependencies.database import get_db_session
from app.dependencies.auth import require_permission
from app.models.enums import Permission
from app.models.webhook import WebhookEvent

from app.schemas.webhook import WebhookEventResponse
from app.services.webhook.registry import WebhookRegistry
from app.services.webhook.dispatcher import WebhookDispatcher

router = APIRouter()

# Setup webhook infrastructure
registry = WebhookRegistry()
dispatcher = WebhookDispatcher(registry)


def get_webhook_dispatcher() -> WebhookDispatcher:
    return dispatcher


@router.post("/{provider}", response_model=WebhookEventResponse)
async def receive_webhook(
    provider: str,
    request: Request,
    db: AsyncSession = Depends(get_db_session),
    dispatch: WebhookDispatcher = Depends(get_webhook_dispatcher),
) -> Any:
    """Receive a webhook from a provider."""
    try:
        body = await request.body()
        headers = dict(request.headers)
        return await dispatch.dispatch(db, provider, body, headers)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/events", response_model=List[WebhookEventResponse])
async def list_webhook_events(
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """List webhook events (System Admin only)."""
    stmt = select(WebhookEvent).order_by(WebhookEvent.created_at.desc()).limit(100)
    results = await db.execute(stmt)
    return results.scalars().all()


@router.get("/events/{event_id}", response_model=WebhookEventResponse)
async def get_webhook_event(
    event_id: uuid.UUID,
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get a specific webhook event."""
    stmt = select(WebhookEvent).where(WebhookEvent.id == event_id)
    event = (await db.execute(stmt)).scalar_one_or_none()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.post("/events/{event_id}/retry", response_model=WebhookEventResponse)
async def retry_webhook_event(
    event_id: uuid.UUID,
    db: AsyncSession = Depends(get_db_session),
    dispatch: WebhookDispatcher = Depends(get_webhook_dispatcher),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Retry a failed webhook event."""
    try:
        return await dispatch.retry(db, str(event_id))
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
