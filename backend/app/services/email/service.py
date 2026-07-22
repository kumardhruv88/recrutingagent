from datetime import datetime, UTC
from typing import Dict, Any, Optional
import uuid
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.email import EmailDeliveryLog
from app.services.email.registry import EmailProviderRegistry, TemplateRegistry


class EmailService:
    """
    Coordinates email dispatch, template rendering, and delivery tracking.
    """

    def __init__(
        self,
        provider_registry: EmailProviderRegistry,
        template_registry: TemplateRegistry,
    ) -> None:
        self.provider_registry = provider_registry
        self.template_registry = template_registry

    async def send_templated_email(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        recipient: str,
        template_name: str,
        variables: Dict[str, Any],
        subject: str,
    ) -> EmailDeliveryLog:
        """
        Renders a template, sends it via the default provider, and logs the result.
        """
        # 1. Render template
        body_html = self.template_registry.render(template_name, variables)

        # 2. Resolve provider
        provider = self.provider_registry.resolve()

        status = "sent"
        error_details = None
        message_id = ""

        # 3. Send email
        try:
            message_id = await provider.send_email(
                recipient=recipient, subject=subject, body_html=body_html
            )
        except Exception as e:
            status = "failed"
            error_details = str(e)

        # 4. Log delivery
        log_entry = EmailDeliveryLog(
            organization_id=organization_id,
            message_id=message_id,
            provider=provider.name,
            status=status,
            recipient=recipient,
            subject=subject,
            error_details=error_details,
            sent_at=datetime.now(UTC),
        )

        db.add(log_entry)
        await db.commit()
        await db.refresh(log_entry)

        return log_entry
