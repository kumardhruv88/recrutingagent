import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import Application, Interview
from app.models.enums import InterviewType, InterviewStatus
from app.services.interviews import InterviewService
from app.schemas.interview import (
    InterviewCreateRequest,
    InterviewRescheduleRequest,
    InterviewFeedbackRequest,
)
from app.dependencies.auth import get_current_organization
from app.dependencies.database import get_db_session

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
async def test_schedule_interview() -> None:
    # Mocks
    calendar_service = MagicMock()
    email_service = MagicMock()
    workflow_service = MagicMock()
    workflow_service.trigger_event = AsyncMock()

    service = InterviewService(calendar_service, email_service, workflow_service)

    db_mock = MagicMock()
    # Mock return values for Application and User
    app_mock = MagicMock()
    app_mock.scalar_one_or_none.return_value = Application(id=uuid4())
    user_mock = MagicMock()
    user_mock.scalar_one_or_none.return_value = User(id=uuid4())

    db_mock.execute = AsyncMock(side_effect=[app_mock, user_mock])
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    request = InterviewCreateRequest(
        application_id=uuid4(),
        interviewer_id=uuid4(),
        scheduled_at=datetime.now(UTC),
        interview_type=InterviewType.VIDEO,
    )

    interview = await service.schedule_interview(db_mock, test_org.id, request)
    assert interview.status == InterviewStatus.SCHEDULED
    workflow_service.trigger_event.assert_awaited_once()


def test_api_cancel_interview(override_dependencies: Any, monkeypatch: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    interview_id = uuid4()

    response_interview = Interview(
        id=interview_id,
        application_id=uuid4(),
        interviewer_id=uuid4(),
        scheduled_at=datetime.now(UTC),
        interview_type=InterviewType.PHONE,
        status=InterviewStatus.CANCELLED,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    mock_cancel = AsyncMock(return_value=response_interview)
    monkeypatch.setattr(InterviewService, "cancel_interview", mock_cancel)

    client = TestClient(app)
    response = client.post(f"/api/v1/interviews/{interview_id}/cancel")

    assert response.status_code == 200
    assert response.json()["status"] == "CANCELLED"

    app.dependency_overrides.pop(require_authenticated_user, None)
