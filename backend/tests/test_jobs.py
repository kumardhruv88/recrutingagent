import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from fastapi.testclient import TestClient
from datetime import datetime, UTC
from typing import Any

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import Job
from app.models.enums import JobStatus, EmploymentType
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
def mock_job() -> Job:
    return Job(
        id=uuid4(),
        organization_id=test_org.id,
        created_by=test_user.id,
        title="Software Engineer",
        description="Write code.",
        employment_type=EmploymentType.FULL_TIME,
        status=JobStatus.DRAFT,
        salary_min=100000,
        salary_max=150000,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )


def test_create_job_mocked(
    override_dependencies: Any, monkeypatch: Any, mock_job: Job
) -> None:
    from app.services.jobs import JobService

    mock_create = AsyncMock()
    mock_create.return_value = mock_job
    monkeypatch.setattr(JobService, "create_job", mock_create)

    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    client = TestClient(app)
    response = client.post(
        "/api/v1/jobs",
        json={
            "title": "Software Engineer",
            "description": "Write code.",
            "employment_type": "FULL_TIME",
            "salary_min": 100000,
            "salary_max": 150000,
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["title"] == "Software Engineer"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_create_job_invalid_salary(override_dependencies: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    client = TestClient(app)
    response = client.post(
        "/api/v1/jobs",
        json={
            "title": "Software Engineer",
            "description": "Write code.",
            "employment_type": "FULL_TIME",
            "salary_min": 150000,
            "salary_max": 100000,
        },
    )

    assert response.status_code == 422
    assert "salary_max must be greater than or equal to salary_min" in response.text

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_search_jobs(
    override_dependencies: Any, monkeypatch: Any, mock_job: Job
) -> None:
    from app.services.jobs import JobService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_search = AsyncMock()
    mock_search.return_value = ([mock_job], 1)
    monkeypatch.setattr(JobService, "search_jobs", mock_search)

    client = TestClient(app)
    response = client.get("/api/v1/jobs?search=Software")

    assert response.status_code == 200
    data = response.json()
    assert data["total"] == 1
    assert data["items"][0]["title"] == "Software Engineer"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_job(override_dependencies: Any, monkeypatch: Any, mock_job: Job) -> None:
    from app.services.jobs import JobService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_get = AsyncMock()
    mock_get.return_value = mock_job
    monkeypatch.setattr(JobService, "get_job", mock_get)

    client = TestClient(app)
    response = client.get(f"/api/v1/jobs/{mock_job.id}")

    assert response.status_code == 200
    data = response.json()
    assert data["id"] == str(mock_job.id)

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_update_job(
    override_dependencies: Any, monkeypatch: Any, mock_job: Job
) -> None:
    from app.services.jobs import JobService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_update = AsyncMock()
    updated_job = mock_job
    updated_job.status = JobStatus.PUBLISHED
    mock_update.return_value = updated_job
    monkeypatch.setattr(JobService, "update_job", mock_update)

    client = TestClient(app)
    response = client.patch(f"/api/v1/jobs/{mock_job.id}", json={"status": "PUBLISHED"})

    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "PUBLISHED"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_delete_job(
    override_dependencies: Any, monkeypatch: Any, mock_job: Job
) -> None:
    from app.services.jobs import JobService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_delete = AsyncMock()
    mock_delete.return_value = None
    monkeypatch.setattr(JobService, "delete_job", mock_delete)

    client = TestClient(app)
    response = client.delete(f"/api/v1/jobs/{mock_job.id}")

    assert response.status_code == 204

    app.dependency_overrides.pop(require_authenticated_user, None)
