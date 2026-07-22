from typing import List
from uuid import UUID
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.auth import User, Organization
from app.models.enums import Role, Permission
from app.core.rbac import ROLE_PERMISSIONS
from app.repositories.auth import MembershipRepository


class AuthorizationService:
    def __init__(self) -> None:
        from app.models.auth import Membership  # inline to avoid circular deps if any

        self.mem_repo = MembershipRepository(Membership)

    async def get_user_role(
        self, db: AsyncSession, user_id: UUID, organization_id: UUID
    ) -> Role:
        """
        Retrieves the role for a user in a specific organization.
        Raises 403 if the user is not a member of the organization.
        """
        membership = await self.mem_repo.get_user_membership(
            db, user_id, organization_id
        )
        if not membership or not membership.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User is not an active member of this organization",
            )
        return membership.role

    def get_role_permissions(self, role: Role) -> List[Permission]:
        """
        Returns the list of permissions associated with a given role.
        """
        return ROLE_PERMISSIONS.get(role, [])

    async def require_permissions(
        self,
        db: AsyncSession,
        user: User,
        organization: Organization,
        required_permissions: List[Permission],
        require_all: bool = False,
    ) -> None:
        """
        Validates that a user has the required permissions in the given organization context.
        Raises 403 if validation fails.
        """
        role = await self.get_user_role(db, user.id, organization.id)
        user_permissions = self.get_role_permissions(role)

        if require_all:
            has_permission = all(p in user_permissions for p in required_permissions)
        else:
            has_permission = any(p in user_permissions for p in required_permissions)

        if not has_permission:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to perform this action",
            )

    async def require_roles(
        self,
        db: AsyncSession,
        user: User,
        organization: Organization,
        allowed_roles: List[Role],
    ) -> None:
        """
        Validates that a user has one of the allowed roles in the given organization context.
        """
        role = await self.get_user_role(db, user.id, organization.id)
        if role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your role does not have permission to perform this action",
            )


authorization_service = AuthorizationService()
