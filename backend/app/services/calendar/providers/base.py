from typing import Protocol, Any, Dict, Optional, Tuple


class CalendarProviderProtocol(Protocol):
    """
    Standard interface for all Calendar Providers (e.g. Google Calendar, Outlook, Mock).
    """

    @property
    def name(self) -> str:
        """The identifier name of the provider."""
        ...

    async def create_event(
        self, event_data: Dict[str, Any], **kwargs: Any
    ) -> Tuple[str, str]:
        """
        Create a calendar event and return (external_event_id, provider_name).
        """
        ...

    async def update_event(
        self, external_event_id: str, updates: Dict[str, Any], **kwargs: Any
    ) -> bool:
        """
        Update an existing event. Returns True if successful.
        """
        ...

    async def cancel_event(self, external_event_id: str, **kwargs: Any) -> bool:
        """
        Cancel (or delete) an event. Returns True if successful.
        """
        ...

    async def health_check(self) -> bool:
        """
        Verify the provider is accessible and properly configured.
        """
        ...
