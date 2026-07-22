import uuid
from typing import Any
from app.services.email.providers.base import EmailProviderProtocol


class MockEmailProvider:
    """
    Deterministic mock provider for safe offline testing and development.
    Does not perform network requests.
    """

    @property
    def name(self) -> str:
        return "mock"

    async def send_email(
        self, recipient: str, subject: str, body_html: str, **kwargs: Any
    ) -> str:
        # Simulate a successful send by returning a generated message ID
        # In a real app we might log this to stdout or a testing queue
        return f"mock-msg-{uuid.uuid4().hex[:12]}"

    async def validate_configuration(self) -> bool:
        return True

    async def health_check(self) -> bool:
        return True
