from abc import ABC, abstractmethod
from typing import Dict, Any, Callable, Awaitable
from sqlalchemy.ext.asyncio import AsyncSession


# Abstract Validator for signatures
class SignatureValidator(ABC):
    @abstractmethod
    async def validate(self, payload: bytes, headers: Dict[str, str]) -> bool:
        pass


# Handler Type
WebhookHandler = Callable[[AsyncSession, Dict[str, Any]], Awaitable[None]]


class WebhookRegistry:
    def __init__(self) -> None:
        self._validators: Dict[str, SignatureValidator] = {}
        self._handlers: Dict[str, Dict[str, WebhookHandler]] = {}

    def register_validator(self, provider: str, validator: SignatureValidator) -> None:
        self._validators[provider] = validator

    def register_handler(
        self, provider: str, event_type: str, handler: WebhookHandler
    ) -> None:
        if provider not in self._handlers:
            self._handlers[provider] = {}
        self._handlers[provider][event_type] = handler

    def get_validator(self, provider: str) -> SignatureValidator:
        if provider not in self._validators:
            raise ValueError(f"No validator registered for provider '{provider}'")
        return self._validators[provider]

    def get_handler(self, provider: str, event_type: str) -> WebhookHandler:
        if provider not in self._handlers or event_type not in self._handlers[provider]:
            raise ValueError(
                f"No handler registered for provider '{provider}' and event '{event_type}'"
            )
        return self._handlers[provider][event_type]
