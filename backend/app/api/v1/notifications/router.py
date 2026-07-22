import uuid
from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission

from app.schemas.notification import SendNotificationRequest, NotificationLogResponse
from app.services.email.providers.mock import MockEmailProvider
from app.services.email.registry import (
    EmailProviderRegistry,
    TemplateRegistry as EmailTemplateRegistry,
)
from app.services.email.service import EmailService

from app.services.notification.adapter import EmailChannelAdapter
from app.services.notification.registry import ChannelRegistry
from app.services.notification.template import TemplateEngine
from app.services.notification.service import NotificationService

router = APIRouter()

# Global setup of notification dependencies
_email_provider_registry = EmailProviderRegistry()
_email_provider_registry.register(MockEmailProvider(), is_default=True)
_email_template_registry = EmailTemplateRegistry()
_email_service = EmailService(_email_provider_registry, _email_template_registry)

_channel_registry = ChannelRegistry()
_channel_registry.register("email", EmailChannelAdapter(_email_service))

_template_engine = TemplateEngine()
_notification_service = NotificationService(_channel_registry, _template_engine)


def get_notification_service() -> NotificationService:
    return _notification_service


@router.post(
    "/send", response_model=NotificationLogResponse, status_code=status.HTTP_201_CREATED
)
async def send_notification(
    request: SendNotificationRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: NotificationService = Depends(get_notification_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Sends a notification through the configured channel and returns delivery status."""
    try:
        return await service.send_notification(db, organization.id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("", response_model=List[NotificationLogResponse])
async def list_notifications(
    status: Optional[str] = None,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: NotificationService = Depends(get_notification_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Lists notifications for the current organization."""
    return await service.list_notifications(db, organization.id, status=status)


@router.get("/{notification_id}", response_model=NotificationLogResponse)
async def get_notification(
    notification_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: NotificationService = Depends(get_notification_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Retrieves delivery log for a specific notification."""
    try:
        return await service.get_notification(db, organization.id, notification_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/{notification_id}/retry", response_model=NotificationLogResponse)
async def retry_notification(
    notification_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: NotificationService = Depends(get_notification_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Retries sending a failed notification."""
    try:
        return await service.retry_notification(db, organization.id, notification_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
