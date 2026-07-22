import uuid
from typing import Optional, Any
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Sequence

from app.repositories.base import BaseRepository
from app.models.auth import User, Organization, Membership, Invitation


class UserRepository(BaseRepository[User]):
    async def get_by_clerk_id(self, db: AsyncSession, clerk_id: str) -> Optional[User]:
        stmt = select(User).where(User.clerk_user_id == clerk_id)
        result = await db.execute(stmt)
        return result.scalars().first()


class OrganizationRepository(BaseRepository[Organization]):
    async def get_by_clerk_id(
        self, db: AsyncSession, clerk_id: str
    ) -> Optional[Organization]:
        stmt = select(Organization).where(
            Organization.clerk_organization_id == clerk_id
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_by_identifier(
        self, db: AsyncSession, identifier: str
    ) -> Optional[Organization]:
        # Tries to fetch by clerk ID, slug or standard ID
        try:
            # Check if identifier is UUID
            val = uuid.UUID(identifier)
            stmt = select(Organization).where(Organization.id == val)
        except ValueError:
            stmt = select(Organization).where(
                or_(
                    Organization.clerk_organization_id == identifier,
                    Organization.slug == identifier,
                )
            )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def list_for_user(
        self, db: AsyncSession, user_id: Any
    ) -> Sequence[Organization]:
        stmt = (
            select(Organization).join(Membership).where(Membership.user_id == user_id)
        )
        result = await db.execute(stmt)
        return result.scalars().all()


class MembershipRepository(BaseRepository[Membership]):
    async def get_user_membership(
        self, db: AsyncSession, user_id: Any, org_id: Any
    ) -> Optional[Membership]:
        stmt = select(Membership).where(
            Membership.user_id == user_id, Membership.organization_id == org_id
        )
        result = await db.execute(stmt)
        return result.scalars().first()


class InvitationRepository(BaseRepository[Invitation]):
    async def get_by_clerk_id(
        self, db: AsyncSession, clerk_id: str
    ) -> Optional[Invitation]:
        stmt = select(Invitation).where(Invitation.clerk_invitation_id == clerk_id)
        result = await db.execute(stmt)
        return result.scalars().first()

    async def list_for_organization(
        self, db: AsyncSession, org_id: Any
    ) -> Sequence[Invitation]:
        stmt = select(Invitation).where(Invitation.organization_id == org_id)
        result = await db.execute(stmt)
        return result.scalars().all()
