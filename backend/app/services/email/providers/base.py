from typing import Protocol, Any, Optional


class EmailProviderProtocol(Protocol):
    """
    Standard interface for all Email Providers (e.g. Resend, SendGrid, Mock).
    """

    @property
    def name(self) -> str:
        """The identifier name of the provider."""
        ...

    async def send_email(
        self, recipient: str, subject: str, body_html: str, **kwargs: Any
    ) -> str:
        """
        Dispatch an email and return a unique message_id.
        Raises an exception if delivery/handshake fails.
        """
        ...

    async def validate_configuration(self) -> bool:
        """
        Validates if the API keys or SMTP settings are correctly loaded.
        """
        ...

    async def health_check(self) -> bool:
        """
        Verify the provider is accessible and properly configured.
        """
        ...
