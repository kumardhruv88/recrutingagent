import uuid
from abc import ABC, abstractmethod
from typing import Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.email.service import EmailService


class ChannelAdapter(ABC):
    """
    Abstract base class for all notification channel adapters.
    """

    @abstractmethod
    async def send(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        recipient: str,
        subject: str,
        body: str,
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:
        """
        Sends a notification to the target recipient over this channel.
        Returns provider execution details/metadata.
        """
        pass


class EmailChannelAdapter(ChannelAdapter):
    """
    Email adapter using existing EmailService infrastructure.
    """

    def __init__(self, email_service: EmailService) -> None:
        self.email_service = email_service

    async def send(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        recipient: str,
        subject: str,
        body: str,
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:
        provider = self.email_service.provider_registry.resolve()
        message_id = await provider.send_email(
            recipient=recipient,
            subject=subject,
            body_html=body,
        )
        return {
            "provider": provider.name,
            "message_id": message_id,
            "channel": "email",
        }
