import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from fastapi.testclient import TestClient
from datetime import datetime, UTC
from typing import Any

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import Candidate
from app.models.enums import CandidateStatus
from app.dependencies.auth import (
    get_current_organization,
    require_permission,
)
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


def mock_require_permission() -> Any:
    async def _mock() -> Any:
        return test_user

    return _mock


@pytest.fixture
def override_dependencies(monkeypatch: Any) -> Any:
    app.dependency_overrides[get_current_organization] = mock_get_current_org
    # require_permission is a factory, so we must mock the result of the factory or override the factory.
    # Actually, in router it's Depends(require_permission(Permission.CANDIDATE_CREATE))
    # We can't easily override a parametrized dependency with dependency_overrides natively without matching the exact instance.
    # We can instead patch the service or patch require_permissions in authorization_service.

    # Easiest way: patch AuthorizationService.require_permissions to do nothing (allow all).
    from app.services.authorization import authorization_service

    monkeypatch.setattr(authorization_service, "require_permissions", AsyncMock())
    # We also need to bypass require_authenticated_user in the require_permission dependency,
    # but the easiest way is to mock the actual dependency override if we can, or just mock the db.

    async def mock_get_db_session() -> Any:
        yield AsyncMock()

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


@pytest.fixture
def mock_candidate() -> Candidate:
    return Candidate(
        id=uuid4(),
        organization_id=test_org.id,
        first_name="John",
        last_name="Doe",
        email="john@example.com",
        status=CandidateStatus.NEW,
        years_of_experience=5,
        current_company="Acme Corp",
        current_role="Software Engineer",
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )


def test_create_candidate_mocked(
    override_dependencies: Any, monkeypatch: Any, mock_candidate: Candidate
) -> None:
    from app.services.candidates import CandidateService

    mock_create = AsyncMock()
    mock_create.return_value = mock_candidate
    monkeypatch.setattr(CandidateService, "create_candidate", mock_create)

    client = TestClient(app)
    response = client.post(
        "/api/v1/candidates",
        json={
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "years_of_experience": 5,
        },
    )

    # 401 might happen if require_authenticated_user is executed and fails.
    # In require_permission, it uses `Depends(require_authenticated_user)`.
    # Let's override require_authenticated_user globally.
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    response = client.post(
        "/api/v1/candidates",
        json={
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "years_of_experience": 5,
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["first_name"] == "John"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_search_candidates(
    override_dependencies: Any, monkeypatch: Any, mock_candidate: Candidate
) -> None:
    from app.services.candidates import CandidateService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_search = AsyncMock()
    mock_search.return_value = ([mock_candidate], 1)
    monkeypatch.setattr(CandidateService, "search_candidates", mock_search)

    client = TestClient(app)
    response = client.get("/api/v1/candidates?search=John")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["first_name"] == "John"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_candidate(
    override_dependencies: Any, monkeypatch: Any, mock_candidate: Candidate
) -> None:
    from app.services.candidates import CandidateService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_get = AsyncMock()
    mock_get.return_value = mock_candidate
    monkeypatch.setattr(CandidateService, "get_candidate", mock_get)

    client = TestClient(app)
    response = client.get(f"/api/v1/candidates/{mock_candidate.id}")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == str(mock_candidate.id)

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_update_candidate(
    override_dependencies: Any, monkeypatch: Any, mock_candidate: Candidate
) -> None:
    from app.services.candidates import CandidateService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_update = AsyncMock()
    updated_candidate = mock_candidate
    updated_candidate.status = CandidateStatus.SCREENING
    mock_update.return_value = updated_candidate
    monkeypatch.setattr(CandidateService, "update_candidate", mock_update)

    client = TestClient(app)
    response = client.patch(
        f"/api/v1/candidates/{mock_candidate.id}", json={"status": "SCREENING"}
    )

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "SCREENING"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_delete_candidate(
    override_dependencies: Any, monkeypatch: Any, mock_candidate: Candidate
) -> None:
    from app.services.candidates import CandidateService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_delete = AsyncMock()
    mock_delete.return_value = None
    monkeypatch.setattr(CandidateService, "delete_candidate", mock_delete)

    client = TestClient(app)
    response = client.delete(f"/api/v1/candidates/{mock_candidate.id}")

    assert response.status_code == 204

    app.dependency_overrides.pop(require_authenticated_user, None)
