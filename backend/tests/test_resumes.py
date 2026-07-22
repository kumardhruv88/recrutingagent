import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from fastapi.testclient import TestClient
from datetime import datetime, UTC
from typing import Any

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import Resume, Candidate
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
def mock_resume() -> Resume:
    c_id = uuid4()
    return Resume(
        id=uuid4(),
        candidate_id=c_id,
        file_name="resume.pdf",
        content_type="application/pdf",
        storage_path="/tmp/resume.pdf",
        file_size=1024,
        version=1,
        parsed=True,
        parsed_data={"name": "Test"},
        uploaded_at=datetime.now(UTC),
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )


def test_upload_resume_mocked(
    override_dependencies: Any, monkeypatch: Any, mock_resume: Resume
) -> None:
    from app.services.resumes import ResumeService

    mock_upload = AsyncMock()
    mock_upload.return_value = mock_resume
    monkeypatch.setattr(ResumeService, "upload_resume", mock_upload)

    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    client = TestClient(app)

    # Needs to be sent as multipart/form-data
    response = client.post(
        "/api/v1/resumes/upload",
        data={"candidate_id": str(mock_resume.candidate_id)},
        files={"file": ("resume.pdf", b"dummy content", "application/pdf")},
    )

    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["resume"]["file_name"] == "resume.pdf"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_latest_resume(
    override_dependencies: Any, monkeypatch: Any, mock_resume: Resume
) -> None:
    from app.services.resumes import ResumeService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_get = AsyncMock()
    mock_get.return_value = mock_resume
    monkeypatch.setattr(ResumeService, "get_latest_resume", mock_get)

    client = TestClient(app)
    response = client.get(f"/api/v1/resumes/{mock_resume.candidate_id}")

    assert response.status_code == 200
    assert response.json()["file_name"] == "resume.pdf"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_resume_history(
    override_dependencies: Any, monkeypatch: Any, mock_resume: Resume
) -> None:
    from app.services.resumes import ResumeService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_history = AsyncMock()
    mock_history.return_value = [mock_resume]
    monkeypatch.setattr(ResumeService, "get_history", mock_history)

    client = TestClient(app)
    response = client.get(f"/api/v1/resumes/{mock_resume.candidate_id}/history")

    assert response.status_code == 200
    data = response.json()
    assert len(data["history"]) == 1
    assert data["candidate_id"] == str(mock_resume.candidate_id)

    app.dependency_overrides.pop(require_authenticated_user, None)
