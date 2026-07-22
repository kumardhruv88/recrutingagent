import pytest
from unittest.mock import AsyncMock, patch
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.email import EmailDeliveryLog
from app.services.email.registry import EmailProviderRegistry, TemplateRegistry
from app.services.email.providers.mock import MockEmailProvider
from app.services.email.service import EmailService
from app.dependencies.auth import get_current_organization, require_permission
from app.dependencies.database import get_db_session

# Mock data
test_user = User(id=uuid4(), clerk_user_id="user_123")
test_org = Organization(
    id=uuid4(),
    clerk_organization_id="org_123",
    name="Test Org",
    slug="test-org",
    is_active=True,
    created_at=datetime.now(UTC),
    updated_at=datetime.now(UTC),
)


async def mock_get_current_org() -> Any:
    return test_org


@pytest.fixture
def override_dependencies(monkeypatch: Any) -> Any:
    app.dependency_overrides[get_current_organization] = mock_get_current_org
    from app.services.authorization import authorization_service

    monkeypatch.setattr(authorization_service, "require_permissions", AsyncMock())

    async def mock_get_db_session() -> Any:
        # DB Session mock
        session = AsyncMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


def test_template_registry() -> None:
    registry = TemplateRegistry()
    rendered = registry.render("welcome", {"name": "Alice"})
    assert "Alice" in rendered

    with pytest.raises(ValueError):
        registry.render("welcome", {})  # Missing name


@pytest.mark.asyncio
async def test_email_service_send() -> None:
    provider_registry = EmailProviderRegistry()
    mock_provider = MockEmailProvider()
    provider_registry.register(mock_provider, is_default=True)

    template_registry = TemplateRegistry()
    service = EmailService(provider_registry, template_registry)

    db_mock = AsyncMock()

    log = await service.send_templated_email(
        db=db_mock,
        organization_id=test_org.id,
        recipient="test@example.com",
        template_name="welcome",
        variables={"name": "Bob"},
        subject="Welcome Bob",
    )

    assert log.status == "sent"
    assert log.recipient == "test@example.com"
    assert log.provider == "mock"
    assert log.message_id.startswith("mock-msg-")
    db_mock.add.assert_called_once()
    db_mock.commit.assert_awaited_once()


def test_api_send_email(override_dependencies: Any, monkeypatch: Any) -> None:
    # Need to override the dependency in the router
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    # Mock the email service send method so it doesn't do real DB operations
    log_response = EmailDeliveryLog(
        id=uuid4(),
        organization_id=test_org.id,
        message_id="mock-msg-123",
        provider="mock",
        status="sent",
        recipient="test@example.com",
        subject="Notification from Test Org",
        sent_at=datetime.now(UTC),
    )

    mock_send = AsyncMock()
    mock_send.return_value = log_response
    monkeypatch.setattr(EmailService, "send_templated_email", mock_send)

    client = TestClient(app)
    response = client.post(
        "/api/v1/emails/send",
        json={
            "template_name": "welcome",
            "recipient": "test@example.com",
            "variables": {"name": "Bob"},
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["message_id"] == "mock-msg-123"

    app.dependency_overrides.pop(require_authenticated_user, None)
