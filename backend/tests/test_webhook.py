import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
import json
from typing import Any, Dict

from fastapi.testclient import TestClient

from app.main import app
from app.models.webhook import WebhookEvent
from app.services.webhook.registry import SignatureValidator, WebhookRegistry
from app.services.webhook.dispatcher import WebhookDispatcher
from app.dependencies.auth import get_current_organization


class MockValidator(SignatureValidator):
    async def validate(self, payload: bytes, headers: Dict[str, str]) -> bool:
        return headers.get("x-signature") == "valid"


async def mock_handler(db: Any, payload: Dict[str, Any]) -> None:
    if payload.get("fail"):
        raise ValueError("Simulated handler failure")


@pytest.fixture
def webhook_dispatcher() -> WebhookDispatcher:
    registry = WebhookRegistry()
    registry.register_validator("test_provider", MockValidator())
    registry.register_handler("test_provider", "test.event", mock_handler)
    return WebhookDispatcher(registry)


@pytest.mark.asyncio
async def test_webhook_dispatch_success(webhook_dispatcher: WebhookDispatcher) -> None:
    db_mock = MagicMock()
    # Mock no existing duplicate
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    db_mock.execute = AsyncMock(return_value=mock_result)
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    payload = {"id": "evt_123", "type": "test.event", "fail": False}
    payload_bytes = json.dumps(payload).encode("utf-8")
    headers = {"x-signature": "valid"}

    event = await webhook_dispatcher.dispatch(
        db_mock, "test_provider", payload_bytes, headers
    )

    assert event.status == "PROCESSED"
    assert event.provider_event_id == "evt_123"


@pytest.mark.asyncio
async def test_webhook_dispatch_invalid_signature(
    webhook_dispatcher: WebhookDispatcher,
) -> None:
    db_mock = MagicMock()
    payload_bytes = b"{}"
    headers = {"x-signature": "invalid"}

    with pytest.raises(ValueError, match="Invalid signature"):
        await webhook_dispatcher.dispatch(
            db_mock, "test_provider", payload_bytes, headers
        )


@pytest.mark.asyncio
async def test_webhook_dispatch_handler_failure(
    webhook_dispatcher: WebhookDispatcher,
) -> None:
    db_mock = MagicMock()
    # Mock no existing duplicate
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = None
    db_mock.execute = AsyncMock(return_value=mock_result)
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    payload = {"id": "evt_123", "type": "test.event", "fail": True}
    payload_bytes = json.dumps(payload).encode("utf-8")
    headers = {"x-signature": "valid"}

    event = await webhook_dispatcher.dispatch(
        db_mock, "test_provider", payload_bytes, headers
    )

    assert event.status == "FAILED"
    assert event.error_details is not None and "Simulated handler failure" in str(
        event.error_details
    )


def test_api_receive_webhook(monkeypatch: Any) -> None:
    # Need to override router dependency for dispatcher
    from app.api.v1.webhooks.router import get_webhook_dispatcher
    from app.dependencies.database import get_db_session

    mock_dispatcher = MagicMock()
    mock_event = WebhookEvent(
        id=uuid4(),
        provider="test_provider",
        provider_event_id="evt_123",
        event_type="test.event",
        payload={},
        status="PROCESSED",
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )
    mock_dispatcher.dispatch = AsyncMock(return_value=mock_event)

    app.dependency_overrides[get_webhook_dispatcher] = lambda: mock_dispatcher

    async def mock_get_db_session() -> Any:
        yield MagicMock()

    app.dependency_overrides[get_db_session] = mock_get_db_session

    client = TestClient(app)
    response = client.post(
        "/api/v1/webhooks/test_provider", json={"id": "evt_123", "type": "test.event"}
    )

    assert response.status_code == 200
    assert response.json()["status"] == "PROCESSED"

    app.dependency_overrides.clear()
