import pytest
from unittest.mock import AsyncMock
from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Any
from uuid import uuid4
from datetime import datetime, UTC

from app.services.authorization import AuthorizationService
from app.models.auth import User, Organization, Membership
from app.models.enums import Role, Permission
from app.core.rbac import ROLE_PERMISSIONS


@pytest.fixture
def auth_service() -> AuthorizationService:
    return AuthorizationService()


@pytest.fixture
def mock_db() -> AsyncMock:
    return AsyncMock(spec=AsyncSession)


@pytest.fixture
def test_user() -> User:
    return User(id=uuid4(), clerk_user_id="user_123", is_active=True)


@pytest.fixture
def test_org() -> Organization:
    return Organization(
        id=uuid4(), clerk_organization_id="org_123", name="Test Org", slug="test"
    )


@pytest.mark.asyncio
async def test_get_user_role_success(
    auth_service: AuthorizationService,
    mock_db: AsyncMock,
    test_user: User,
    test_org: Organization,
    monkeypatch: Any,
) -> None:
    # Mock membership repository
    mock_membership = Membership(
        id=uuid4(),
        user_id=test_user.id,
        organization_id=test_org.id,
        role=Role.ADMIN,
        is_active=True,
    )
    monkeypatch.setattr(auth_service.mem_repo, "get_user_membership", AsyncMock(return_value=mock_membership))

    role = await auth_service.get_user_role(mock_db, test_user.id, test_org.id)
    assert role == Role.ADMIN


@pytest.mark.asyncio
async def test_get_user_role_not_active(
    auth_service: AuthorizationService,
    mock_db: AsyncMock,
    test_user: User,
    test_org: Organization,
    monkeypatch: Any,
) -> None:
    # Mock inactive membership
    mock_membership = Membership(
        id=uuid4(),
        user_id=test_user.id,
        organization_id=test_org.id,
        role=Role.ADMIN,
        is_active=False,
    )
    monkeypatch.setattr(auth_service.mem_repo, "get_user_membership", AsyncMock(return_value=mock_membership))

    with pytest.raises(HTTPException) as exc:
        await auth_service.get_user_role(mock_db, test_user.id, test_org.id)

    assert exc.value.status_code == 403


@pytest.mark.asyncio
async def test_require_permissions_success(
    auth_service: AuthorizationService,
    mock_db: AsyncMock,
    test_user: User,
    test_org: Organization,
    monkeypatch: Any,
) -> None:
    mock_membership = Membership(
        id=uuid4(),
        user_id=test_user.id,
        organization_id=test_org.id,
        role=Role.RECRUITER,
        is_active=True,
    )
    monkeypatch.setattr(auth_service.mem_repo, "get_user_membership", AsyncMock(return_value=mock_membership))

    # Recruiter has CANDIDATE_CREATE, should not raise Exception
    await auth_service.require_permissions(
        mock_db, test_user, test_org, [Permission.CANDIDATE_CREATE]
    )


@pytest.mark.asyncio
async def test_require_permissions_fail(
    auth_service: AuthorizationService,
    mock_db: AsyncMock,
    test_user: User,
    test_org: Organization,
    monkeypatch: Any,
) -> None:
    mock_membership = Membership(
        id=uuid4(),
        user_id=test_user.id,
        organization_id=test_org.id,
        role=Role.VIEWER,
        is_active=True,
    )
    monkeypatch.setattr(auth_service.mem_repo, "get_user_membership", AsyncMock(return_value=mock_membership))

    # Viewer does not have CANDIDATE_CREATE
    with pytest.raises(HTTPException) as exc:
        await auth_service.require_permissions(
            mock_db, test_user, test_org, [Permission.CANDIDATE_CREATE]
        )

    assert exc.value.status_code == 403


@pytest.mark.asyncio
async def test_require_roles_success(
    auth_service: AuthorizationService,
    mock_db: AsyncMock,
    test_user: User,
    test_org: Organization,
    monkeypatch: Any,
) -> None:
    mock_membership = Membership(
        id=uuid4(),
        user_id=test_user.id,
        organization_id=test_org.id,
        role=Role.OWNER,
        is_active=True,
    )
    monkeypatch.setattr(auth_service.mem_repo, "get_user_membership", AsyncMock(return_value=mock_membership))

    # Owner should be allowed
    await auth_service.require_roles(
        mock_db, test_user, test_org, [Role.OWNER, Role.ADMIN]
    )


def test_role_permissions_mapping() -> None:
    assert Permission.ORGANIZATION_DELETE in ROLE_PERMISSIONS[Role.OWNER]
    assert Permission.ORGANIZATION_DELETE not in ROLE_PERMISSIONS[Role.ADMIN]
    assert Permission.INTERVIEW_CREATE in ROLE_PERMISSIONS[Role.INTERVIEWER]
    assert Permission.CANDIDATE_CREATE not in ROLE_PERMISSIONS[Role.INTERVIEWER]
