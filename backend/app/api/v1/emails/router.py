import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission
from app.models.email import EmailDeliveryLog
from app.schemas.email import (
    EmailSendRequest,
    EmailDeliveryResponse,
    EmailDeliveryLogResponse,
)
from app.services.email.registry import EmailProviderRegistry, TemplateRegistry
from app.services.email.providers.mock import MockEmailProvider
from app.services.email.service import EmailService

router = APIRouter()


# Dependency setup for Email Service
# In a real app this might be initialized globally
def get_email_service() -> EmailService:
    provider_registry = EmailProviderRegistry()
    mock_provider = MockEmailProvider()
    provider_registry.register(mock_provider, is_default=True)

    template_registry = TemplateRegistry()
    return EmailService(provider_registry, template_registry)


@router.post(
    "/send", response_model=EmailDeliveryResponse, status_code=status.HTTP_201_CREATED
)
async def send_email(
    request: EmailSendRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    email_service: EmailService = Depends(get_email_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),  # basic guard
) -> Any:
    """Send an email using a registered template."""
    subject = f"Notification from {organization.name}"

    try:
        log = await email_service.send_templated_email(
            db=db,
            organization_id=organization.id,
            recipient=request.recipient,
            template_name=request.template_name,
            variables=request.variables,
            subject=subject,
        )
    except ValueError as e:
        # Catch template errors
        raise HTTPException(status_code=400, detail=str(e))

    if log.status == "failed":
        return EmailDeliveryResponse(
            success=False,
            message_id=log.message_id,
            provider=log.provider,
            error=log.error_details,
        )

    return EmailDeliveryResponse(
        success=True, message_id=log.message_id, provider=log.provider
    )


@router.get("/history", response_model=List[EmailDeliveryLogResponse])
async def get_email_history(
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get delivery history for the organization."""
    stmt = (
        select(EmailDeliveryLog)
        .where(EmailDeliveryLog.organization_id == organization.id)
        .order_by(desc(EmailDeliveryLog.sent_at))
        .limit(100)
    )
    result = await db.execute(stmt)
    logs = result.scalars().all()

    return logs


@router.get("/{log_id}", response_model=EmailDeliveryLogResponse)
async def get_email_log(
    log_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get specific email delivery log."""
    stmt = select(EmailDeliveryLog).where(
        EmailDeliveryLog.id == log_id,
        EmailDeliveryLog.organization_id == organization.id,
    )
    result = await db.execute(stmt)
    log = result.scalar_one_or_none()

    if not log:
        raise HTTPException(status_code=404, detail="Email log not found")

    return log
