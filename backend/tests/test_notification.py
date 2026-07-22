import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any, Dict

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.notification import NotificationLog
from app.schemas.notification import SendNotificationRequest
from app.services.notification.adapter import ChannelAdapter, EmailChannelAdapter
from app.services.notification.registry import ChannelRegistry
from app.services.notification.template import TemplateEngine
from app.services.notification.service import NotificationService
from app.dependencies.auth import get_current_organization, require_authenticated_user
from app.dependencies.database import get_db_session

test_user = User(id=uuid4(), clerk_user_id="user_notif_123")
test_org = Organization(
    id=uuid4(),
    clerk_organization_id="org_notif_123",
    name="Notif Org",
    slug="notif-org",
    is_active=True,
    created_at=datetime.now(UTC),
    updated_at=datetime.now(UTC),
)


class MockChannelAdapter(ChannelAdapter):
    def __init__(self, should_fail: bool = False) -> None:
        self.should_fail = should_fail

    async def send(
        self,
        db: Any,
        organization_id: Any,
        recipient: str,
        subject: str,
        body: str,
        metadata: Dict[str, Any],
    ) -> Dict[str, Any]:
        if self.should_fail:
            raise RuntimeError("Mock channel delivery failure")
        return {"status": "delivered", "channel": "mock", "msg_id": "mock-123"}


@pytest.fixture
def override_dependencies(monkeypatch: Any) -> Any:
    app.dependency_overrides[get_current_organization] = lambda: test_org
    app.dependency_overrides[require_authenticated_user] = lambda: test_user
    from app.services.authorization import authorization_service

    monkeypatch.setattr(authorization_service, "require_permissions", AsyncMock())

    async def mock_get_db_session() -> Any:
        session = MagicMock()
        session.execute = AsyncMock()
        session.commit = AsyncMock()
        session.refresh = AsyncMock()
        session.add = MagicMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


def test_template_engine() -> None:
    engine = TemplateEngine()

    # Test valid rendering
    subject, body = engine.render(
        "interview_invite",
        {
            "job_title": "Senior Engineer",
            "candidate_name": "Alice",
            "interview_date": "2026-08-01",
        },
    )
    assert "Senior Engineer" in subject
    assert "Alice" in body

    # Test missing variable
    with pytest.raises(ValueError, match="Missing required template variable"):
        engine.render("interview_invite", {"job_title": "Senior Engineer"})

    # Test unregistered template
    with pytest.raises(ValueError, match="Template 'unknown' not found"):
        engine.render("unknown", {})


def test_channel_registry() -> None:
    registry = ChannelRegistry()
    mock_adapter = MockChannelAdapter()
    registry.register("email", mock_adapter)

    resolved = registry.resolve("EMAIL")
    assert resolved == mock_adapter

    with pytest.raises(ValueError, match="No notification channel adapter registered"):
        registry.resolve("sms")


@pytest.mark.asyncio
async def test_notification_service_success() -> None:
    registry = ChannelRegistry()
    adapter = MockChannelAdapter(should_fail=False)
    registry.register("email", adapter)
    engine = TemplateEngine()

    service = NotificationService(registry, engine)

    db_mock = MagicMock()
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()
    db_mock.add = MagicMock()

    req = SendNotificationRequest(
        recipient="alice@example.com",
        channel="email",
        template_name="candidate_application_received",
        variables={"job_title": "Backend Lead", "candidate_name": "Alice"},
    )

    log_entry = await service.send_notification(db_mock, test_org.id, req)

    assert log_entry.status == "SENT"
    assert log_entry.recipient == "alice@example.com"
    assert log_entry.provider_response == {
        "status": "delivered",
        "channel": "mock",
        "msg_id": "mock-123",
    }
    assert log_entry.sent_at is not None
    assert log_entry.error_details is None


@pytest.mark.asyncio
async def test_notification_service_failure_and_retry() -> None:
    registry = ChannelRegistry()
    failing_adapter = MockChannelAdapter(should_fail=True)
    registry.register("email", failing_adapter)
    engine = TemplateEngine()

    service = NotificationService(registry, engine)

    db_mock = MagicMock()
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()
    db_mock.add = MagicMock()

    req = SendNotificationRequest(
        recipient="bob@example.com",
        channel="email",
        template_name="candidate_application_received",
        variables={"job_title": "Backend Lead", "candidate_name": "Bob"},
    )

    log_entry = await service.send_notification(db_mock, test_org.id, req)
    assert log_entry.status == "FAILED"
    assert (
        log_entry.error_details is not None
        and "Mock channel delivery failure" in log_entry.error_details
    )

    # Switch adapter to succeeding adapter for retry
    registry.register("email", MockChannelAdapter(should_fail=False))

    mock_query_result = MagicMock()
    mock_query_result.scalar_one_or_none.return_value = log_entry
    db_mock.execute = AsyncMock(return_value=mock_query_result)

    retried_entry = await service.retry_notification(db_mock, test_org.id, log_entry.id)
    assert retried_entry.status == "SENT"
    assert retried_entry.error_details is None


def test_api_send_notification(override_dependencies: Any, monkeypatch: Any) -> None:
    mock_log = NotificationLog(
        id=uuid4(),
        organization_id=test_org.id,
        recipient="test@example.com",
        channel="email",
        template_name="interview_invite",
        variables={
            "job_title": "Dev",
            "candidate_name": "Dev",
            "interview_date": "Tomorrow",
        },
        status="SENT",
        sent_at=datetime.now(UTC),
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    mock_send = AsyncMock(return_value=mock_log)
    monkeypatch.setattr(NotificationService, "send_notification", mock_send)

    client = TestClient(app)
    response = client.post(
        "/api/v1/notifications/send",
        json={
            "recipient": "test@example.com",
            "channel": "email",
            "template_name": "interview_invite",
            "variables": {
                "job_title": "Dev",
                "candidate_name": "Dev",
                "interview_date": "Tomorrow",
            },
        },
    )

    assert response.status_code == 201
    assert response.json()["status"] == "SENT"
    assert response.json()["recipient"] == "test@example.com"
