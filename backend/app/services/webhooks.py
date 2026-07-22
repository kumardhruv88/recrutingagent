from typing import Dict, Any
import structlog
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.auth import User, Organization, Membership
from app.models.enums import Role
from app.repositories.auth import (
    UserRepository,
    OrganizationRepository,
    MembershipRepository,
)
from app.services.base import BaseService

logger = structlog.get_logger()


class ClerkWebhookService(BaseService[UserRepository]):
    def __init__(self) -> None:
        self.user_repo = UserRepository(User)
        self.org_repo = OrganizationRepository(Organization)
        self.membership_repo = MembershipRepository(Membership)
        super().__init__(self.user_repo)

    async def handle_user_event(
        self, db: AsyncSession, event_type: str, data: Dict[str, Any]
    ) -> None:
        clerk_id = data.get("id")
        if not clerk_id:
            return

        if event_type == "user.deleted":
            user = await self.user_repo.get_by_clerk_id(db, clerk_id)
            if user:
                await self.user_repo.delete(db, user.id)
            return

        email = ""
        email_addresses = data.get("email_addresses", [])
        if email_addresses:
            email = email_addresses[0].get("email_address", "")

        obj_in = {
            "clerk_user_id": clerk_id,
            "email": email,
            "first_name": data.get("first_name"),
            "last_name": data.get("last_name"),
            "profile_image": data.get("image_url"),
        }

        user = await self.user_repo.get_by_clerk_id(db, clerk_id)
        if user:
            await self.user_repo.update(db, user, obj_in)
        else:
            await self.user_repo.create(db, obj_in)

    async def handle_organization_event(
        self, db: AsyncSession, event_type: str, data: Dict[str, Any]
    ) -> None:
        clerk_id = data.get("id")
        if not clerk_id:
            return

        if event_type == "organization.deleted":
            org = await self.org_repo.get_by_clerk_id(db, clerk_id)
            if org:
                await self.org_repo.delete(db, org.id)
            return

        obj_in = {
            "clerk_organization_id": clerk_id,
            "name": data.get("name", ""),
            "slug": data.get("slug", ""),
            "logo_url": data.get("image_url"),
        }

        org = await self.org_repo.get_by_clerk_id(db, clerk_id)
        if org:
            await self.org_repo.update(db, org, obj_in)
        else:
            await self.org_repo.create(db, obj_in)

    async def handle_membership_event(
        self, db: AsyncSession, event_type: str, data: Dict[str, Any]
    ) -> None:
        org_id = data.get("organization", {}).get("id")
        user_id = data.get("public_user_data", {}).get("user_id")
        role_str = data.get("role", "").replace("org:", "").upper()

        if not org_id or not user_id:
            return

        org = await self.org_repo.get_by_clerk_id(db, org_id)
        user = await self.user_repo.get_by_clerk_id(db, user_id)

        if not org or not user:
            logger.warning(
                "Membership event skipped: missing org or user in DB",
                clerk_org_id=org_id,
                clerk_user_id=user_id,
            )
            return

        if event_type == "organizationMembership.deleted":
            membership = await self.membership_repo.get_user_membership(
                db, user.id, org.id
            )
            if membership:
                await self.membership_repo.delete(db, membership.id)
            return

        role = Role.MEMBER
        try:
            role = Role(role_str)
        except ValueError:
            if role_str == "ADMIN":
                role = Role.ADMIN

        membership = await self.membership_repo.get_user_membership(db, user.id, org.id)
        if membership:
            await self.membership_repo.update(db, membership, {"role": role})
        else:
            await self.membership_repo.create(
                db,
                {
                    "user_id": user.id,
                    "organization_id": org.id,
                    "role": role,
                },
            )
