from typing import Dict
from app.services.notification.adapter import ChannelAdapter


class ChannelRegistry:
    """
    Registry for managing and resolving channel adapters dynamically.
    """

    def __init__(self) -> None:
        self._adapters: Dict[str, ChannelAdapter] = {}

    def register(self, channel_name: str, adapter: ChannelAdapter) -> None:
        self._adapters[channel_name.lower()] = adapter

    def resolve(self, channel_name: str) -> ChannelAdapter:
        channel_key = channel_name.lower()
        if channel_key not in self._adapters:
            raise ValueError(
                f"No notification channel adapter registered for channel '{channel_name}'"
            )
        return self._adapters[channel_key]
