import uuid
from typing import Any, Dict, Tuple
from app.services.calendar.providers.base import CalendarProviderProtocol


class MockCalendarProvider:
    """
    Deterministic mock provider for offline testing.
    Does not perform network requests.
    """

    @property
    def name(self) -> str:
        return "mock"

    async def create_event(
        self, event_data: Dict[str, Any], **kwargs: Any
    ) -> Tuple[str, str]:
        # Simulate successful creation
        return f"mock-cal-{uuid.uuid4().hex[:12]}", self.name

    async def update_event(
        self, external_event_id: str, updates: Dict[str, Any], **kwargs: Any
    ) -> bool:
        # Simulate successful update
        return True

    async def cancel_event(self, external_event_id: str, **kwargs: Any) -> bool:
        # Simulate successful cancellation
        return True

    async def health_check(self) -> bool:
        return True
