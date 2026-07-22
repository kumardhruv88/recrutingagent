import pytest
from unittest.mock import AsyncMock
from uuid import uuid4
from fastapi.testclient import TestClient
from datetime import datetime, UTC
from typing import Any

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import GithubProfile, GithubRepository
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
def mock_github_profile() -> GithubProfile:
    c_id = uuid4()
    return GithubProfile(
        id=uuid4(),
        candidate_id=c_id,
        username="testuser",
        avatar_url="https://avatar.url",
        bio="Hello world",
        company="Test Co",
        location="Earth",
        website="https://test.com",
        followers=10,
        following=5,
        public_repos=2,
        public_gists=0,
        language_stats={"Python": 50.0, "TypeScript": 50.0},
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )


@pytest.fixture
def mock_github_repository(mock_github_profile: GithubProfile) -> GithubRepository:
    return GithubRepository(
        id=uuid4(),
        profile_id=mock_github_profile.id,
        name="test-repo",
        description="A test repo",
        visibility="public",
        primary_language="Python",
        topics=["test"],
        stars=10,
        forks=2,
        watchers=10,
        open_issues=1,
        size=1024,
        default_branch="main",
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )


def test_sync_github(
    override_dependencies: Any, monkeypatch: Any, mock_github_profile: GithubProfile
) -> None:
    from app.services.github import GithubService

    mock_sync = AsyncMock()
    mock_sync.return_value = mock_github_profile
    monkeypatch.setattr(GithubService, "sync_candidate_github", mock_sync)

    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    client = TestClient(app)
    response = client.post(
        "/api/v1/github/sync",
        json={"candidate_id": str(mock_github_profile.candidate_id)},
    )

    assert response.status_code == 201
    data = response.json()
    assert data["success"] is True
    assert data["profile"]["username"] == "testuser"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_github_profile(
    override_dependencies: Any, monkeypatch: Any, mock_github_profile: GithubProfile
) -> None:
    from app.services.github import GithubService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_get = AsyncMock()
    mock_get.return_value = mock_github_profile
    monkeypatch.setattr(GithubService, "get_profile", mock_get)

    client = TestClient(app)
    response = client.get(f"/api/v1/github/{mock_github_profile.candidate_id}")

    assert response.status_code == 200
    assert response.json()["username"] == "testuser"

    app.dependency_overrides.pop(require_authenticated_user, None)


def test_get_github_repositories(
    override_dependencies: Any,
    monkeypatch: Any,
    mock_github_profile: GithubProfile,
    mock_github_repository: GithubRepository,
) -> None:
    from app.services.github import GithubService
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_get_repos = AsyncMock()
    mock_get_repos.return_value = [mock_github_repository]
    monkeypatch.setattr(GithubService, "get_repositories", mock_get_repos)

    client = TestClient(app)
    response = client.get(
        f"/api/v1/github/{mock_github_profile.candidate_id}/repositories"
    )

    assert response.status_code == 200
    data = response.json()
    assert len(data) == 1
    assert data[0]["name"] == "test-repo"

    app.dependency_overrides.pop(require_authenticated_user, None)
