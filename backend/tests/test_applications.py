import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from fastapi.testclient import TestClient
from datetime import datetime, UTC
from typing import Any

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import (
    Application,
    ApplicationNote,
    ApplicationTimelineEvent,
    Candidate,
    Job,
)
from app.models.enums import ApplicationStatus, ApplicationSource, EmploymentType
from app.dependencies.auth import get_current_organization, require_permission
from app.dependencies.database import get_db_session

# Mock dependencies
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
        yield AsyncMock()

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


@pytest.fixture
def mock_app() -> Application:
    c_id = uuid4()
    j_id = uuid4()
    return Application(
        id=uuid4(),
        candidate_id=c_id,
        job_id=j_id,
        status=ApplicationStatus.APPLIED,
        source=ApplicationSource.DIRECT,
        current_stage="Applied",
        applied_at=datetime.now(UTC),
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )


def test_create_application_mocked(
    override_dependencies: Any, monkeypatch: Any, mock_app: Application
) -> None:
    from app.services.applications import ApplicationService

    mock_create = AsyncMock()
    mock_create.return_value = mock_app
    monkeypatch.setattr(ApplicationService, "create_application", mock_create)

    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    client = TestClient(app)
    response = client.post(
        "/api/v1/applications",
        json={
            "candidate_id": str(mock_app.candidate_id),
            "job_id": str(mock_app.job_id),
            "source": "DIRECT",
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["candidate_id"] == str(mock_app.candidate_id)
    assert data["current_stage"] == "Applied"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_list_applications(
    override_dependencies: Any, monkeypatch: Any, mock_app: Application
) -> None:
    from app.services.applications import ApplicationService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_list = AsyncMock()
    mock_list.return_value = ([mock_app], 1)
    monkeypatch.setattr(ApplicationService, "list_applications", mock_list)

    client = TestClient(app)
    response = client.get("/api/v1/applications")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_application(
    override_dependencies: Any, monkeypatch: Any, mock_app: Application
) -> None:
    from app.services.applications import ApplicationService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_get = AsyncMock()
    mock_get.return_value = mock_app
    monkeypatch.setattr(ApplicationService, "get_application", mock_get)

    client = TestClient(app)
    response = client.get(f"/api/v1/applications/{mock_app.id}")

    assert response.status_code == 200

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_update_application_stage(
    override_dependencies: Any, monkeypatch: Any, mock_app: Application
) -> None:
    from app.services.applications import ApplicationService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_update = AsyncMock()
    updated_app = mock_app
    updated_app.current_stage = "Interview"
    mock_update.return_value = updated_app
    monkeypatch.setattr(ApplicationService, "update_application", mock_update)

    client = TestClient(app)
    response = client.patch(
        f"/api/v1/applications/{mock_app.id}/stage", json={"stage": "Interview"}
    )

    assert response.status_code == 200
    assert response.json()["current_stage"] == "Interview"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_add_note(
    override_dependencies: Any, monkeypatch: Any, mock_app: Application
) -> None:
    from app.services.applications import ApplicationService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    note = ApplicationNote(
        id=uuid4(),
        application_id=mock_app.id,
        author_id=test_user.id,
        content="Great candidate!",
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    mock_add = AsyncMock()
    mock_add.return_value = note
    monkeypatch.setattr(ApplicationService, "add_note", mock_add)

    client = TestClient(app)
    response = client.post(
        f"/api/v1/applications/{mock_app.id}/notes",
        json={"content": "Great candidate!"},
    )

    assert response.status_code == 201
    assert response.json()["content"] == "Great candidate!"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_timeline(
    override_dependencies: Any, monkeypatch: Any, mock_app: Application
) -> None:
    from app.services.applications import ApplicationService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    event = ApplicationTimelineEvent(
        id=uuid4(),
        application_id=mock_app.id,
        event_type="APPLICATION_CREATED",
        event_data={},
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    mock_get = AsyncMock()
    mock_get.return_value = [event]
    monkeypatch.setattr(ApplicationService, "get_timeline", mock_get)

    client = TestClient(app)
    response = client.get(f"/api/v1/applications/{mock_app.id}/timeline")

    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["event_type"] == "APPLICATION_CREATED"

    app.dependency_overrides.pop(require_authenticated_user, None)
