from typing import Optional, List, Callable, Any
from fastapi import Depends, Request, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.database.session import async_session_factory
from app.dependencies.database import get_db_session
from app.models.auth import User, Organization, Membership
from app.models.enums import Role, Permission
from app.services.authorization import authorization_service
from app.repositories.auth import (
    UserRepository,
    OrganizationRepository,
    MembershipRepository,
)


async def get_current_user(
    request: Request, db: AsyncSession = Depends(get_db_session)
) -> Optional[User]:
    """Resolves the active user from the database based on the authenticated request state."""
    clerk_id = getattr(request.state, "user_id", None)
    if not clerk_id:
        return None

    user_repo = UserRepository(User)
    return await user_repo.get_by_clerk_id(db, clerk_id)


async def require_authenticated_user(
    user: Optional[User] = Depends(get_current_user),
) -> User:
    """Dependency that strictly requires an authenticated user."""
    if not user or not user.is_active:
        raise HTTPException(status_code=401, detail="Unauthorized")
    return user


async def get_current_organization(
    request: Request, db: AsyncSession = Depends(get_db_session)
) -> Optional[Organization]:
    """Resolves the active organization from the tenant context."""
    org_id_slug_or_clerk = getattr(request.state, "organization_id", None)
    if not org_id_slug_or_clerk:
        return None

    org_repo = OrganizationRepository(Organization)
    return await org_repo.get_by_identifier(db, org_id_slug_or_clerk)


async def require_active_membership(
    user: User = Depends(require_authenticated_user),
    organization: Optional[Organization] = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
) -> Membership:
    """
    Dependency that strictly requires the user to have an active membership
    in the currently resolved organization context.
    """
    if not organization:
        raise HTTPException(status_code=400, detail="Organization context required")

    membership_repo = MembershipRepository(Membership)
    membership = await membership_repo.get_user_membership(db, user.id, organization.id)

    if not membership or not membership.is_active:
        raise HTTPException(
            status_code=403, detail="Forbidden: Active membership required"
        )

    return membership


def require_role(allowed_roles: List[Role]) -> Callable[..., Any]:
    """Dependency factory that requires a user to have one of the allowed roles."""

    async def _require_role(
        user: User = Depends(require_authenticated_user),
        organization: Organization = Depends(get_current_organization),
        db: AsyncSession = Depends(get_db_session),
    ) -> User:
        if not organization:
            raise HTTPException(status_code=400, detail="Organization context required")

        await authorization_service.require_roles(db, user, organization, allowed_roles)
        return user

    return _require_role


def require_permission(permission: Permission) -> Callable[..., Any]:
    """Dependency factory that requires a specific permission."""

    async def _require_permission(
        user: User = Depends(require_authenticated_user),
        organization: Organization = Depends(get_current_organization),
        db: AsyncSession = Depends(get_db_session),
    ) -> User:
        if not organization:
            raise HTTPException(status_code=400, detail="Organization context required")

        await authorization_service.require_permissions(
            db, user, organization, [permission], require_all=True
        )
        return user

    return _require_permission


def require_any_permission(permissions: List[Permission]) -> Callable[..., Any]:
    """Dependency factory that requires at least one of the specified permissions."""

    async def _require_any_permission(
        user: User = Depends(require_authenticated_user),
        organization: Organization = Depends(get_current_organization),
        db: AsyncSession = Depends(get_db_session),
    ) -> User:
        if not organization:
            raise HTTPException(status_code=400, detail="Organization context required")

        await authorization_service.require_permissions(
            db, user, organization, permissions, require_all=False
        )
        return user

    return _require_any_permission


def require_owner() -> Callable[..., Any]:
    """Dependency factory that strictly requires the OWNER role."""
    return require_role([Role.OWNER])
