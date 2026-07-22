from typing import Dict, Optional

from app.services.calendar.providers.base import CalendarProviderProtocol


class ProviderNotFoundError(Exception):
    pass


class CalendarProviderRegistry:
    """Registry to manage and resolve Calendar providers dynamically."""

    def __init__(self) -> None:
        self._providers: Dict[str, CalendarProviderProtocol] = {}
        self._default_provider: Optional[str] = None

    def register(
        self, provider: CalendarProviderProtocol, is_default: bool = False
    ) -> None:
        self._providers[provider.name] = provider
        if is_default or not self._default_provider:
            self._default_provider = provider.name

    def resolve(self, name: Optional[str] = None) -> CalendarProviderProtocol:
        target = name or self._default_provider
        if not target or target not in self._providers:
            raise ProviderNotFoundError(
                f"Calendar Provider '{target}' is not registered."
            )
        return self._providers[target]
