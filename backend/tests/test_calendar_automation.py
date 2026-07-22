import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC, timedelta
from typing import Any

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.calendar import CalendarEvent
from app.services.calendar.registry import CalendarProviderRegistry
from app.services.calendar.providers.mock import MockCalendarProvider
from app.services.calendar.service import CalendarService
from app.dependencies.auth import get_current_organization
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
        session = MagicMock()
        session.execute = AsyncMock()
        session.commit = AsyncMock()
        session.refresh = AsyncMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_calendar_service_create() -> None:
    provider_registry = CalendarProviderRegistry()
    mock_provider = MockCalendarProvider()
    provider_registry.register(mock_provider, is_default=True)

    service = CalendarService(provider_registry)

    db_mock = MagicMock()
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    from app.schemas.calendar import EventCreateRequest, Attendee

    start = datetime.now(UTC) + timedelta(days=1)
    end = start + timedelta(hours=1)

    request = EventCreateRequest(
        title="Interview",
        organizer="hr@test.com",
        attendees=[Attendee(email="candidate@example.com")],
        start_time=start,
        end_time=end,
    )

    event = await service.create_event(
        db=db_mock, organization_id=test_org.id, request=request
    )

    assert event.title == "Interview"
    assert event.provider == "mock"
    assert event.external_event_id and event.external_event_id.startswith("mock-cal-")
    assert event.status == "scheduled"

    db_mock.add.assert_called_once()
    db_mock.commit.assert_awaited_once()


def test_api_create_event(override_dependencies: Any, monkeypatch: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    start = datetime.now(UTC) + timedelta(days=1)
    end = start + timedelta(hours=1)

    event_response = CalendarEvent(
        id=uuid4(),
        organization_id=test_org.id,
        title="API Interview",
        organizer="hr@test.com",
        attendees=[
            {"email": "cand@example.com", "name": None, "status": "needs_action"}
        ],
        start_time=start,
        end_time=end,
        time_zone="UTC",
        provider="mock",
        external_event_id="mock-cal-123",
        status="scheduled",
    )

    mock_create = AsyncMock()
    mock_create.return_value = event_response
    monkeypatch.setattr(CalendarService, "create_event", mock_create)

    client = TestClient(app)
    response = client.post(
        "/api/v1/calendar/events",
        json={
            "title": "API Interview",
            "organizer": "hr@test.com",
            "attendees": [{"email": "cand@example.com"}],
            "start_time": start.isoformat(),
            "end_time": end.isoformat(),
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "API Interview"
    assert data["external_event_id"] == "mock-cal-123"

    app.dependency_overrides.pop(require_authenticated_user, None)
