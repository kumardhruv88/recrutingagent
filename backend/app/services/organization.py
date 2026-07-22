from typing import Optional, Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
import httpx

from app.core.config import get_settings
from app.models.auth import Organization, Invitation, User, Membership
from app.models.enums import Role
from app.repositories.auth import (
    OrganizationRepository,
    InvitationRepository,
    MembershipRepository,
)
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationUpdate,
    InvitationCreate,
)


class OrganizationService:
    def __init__(self) -> None:
        self.org_repo = OrganizationRepository(Organization)
        self.inv_repo = InvitationRepository(Invitation)
        self.mem_repo = MembershipRepository(
            Membership
        )  # Will handle properly inline if needed
        self.settings = get_settings()
        self.headers = {
            "Authorization": f"Bearer {self.settings.CLERK_SECRET_KEY}",
            "Content-Type": "application/json",
        }
        self.clerk_api = "https://api.clerk.com/v1"

    async def create_organization(
        self, db: AsyncSession, user: User, data: OrganizationCreate
    ) -> Organization:
        # Create in Clerk
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{self.clerk_api}/organizations",
                headers=self.headers,
                json={
                    "name": data.name,
                    "slug": data.slug,
                    "created_by": user.clerk_user_id,
                },
            )
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail=resp.json().get(
                        "errors", [{"message": "Clerk org creation failed"}]
                    )[0]["message"],
                )

            clerk_org = resp.json()

        # Save to local DB immediately
        obj_in = {
            "clerk_organization_id": clerk_org["id"],
            "name": clerk_org["name"],
            "slug": clerk_org.get("slug", data.slug),
            "logo_url": clerk_org.get("image_url"),
        }
        return await self.org_repo.create(db, obj_in)

    async def update_organization(
        self, db: AsyncSession, org: Organization, data: OrganizationUpdate
    ) -> Organization:
        update_data = {k: v for k, v in data.model_dump().items() if v is not None}
        if not update_data:
            return org

        # Update in Clerk
        async with httpx.AsyncClient() as client:
            resp = await client.patch(
                f"{self.clerk_api}/organizations/{org.clerk_organization_id}",
                headers=self.headers,
                json=update_data,
            )
            if resp.status_code != 200:
                raise HTTPException(status_code=400, detail="Clerk org update failed")

            clerk_org = resp.json()

        # Ensure local db maps correctly
        if "image_url" in clerk_org:
            update_data["logo_url"] = clerk_org["image_url"]

        return await self.org_repo.update(db, org, update_data)

    async def delete_organization(self, db: AsyncSession, org: Organization) -> None:
        async with httpx.AsyncClient() as client:
            resp = await client.delete(
                f"{self.clerk_api}/organizations/{org.clerk_organization_id}",
                headers=self.headers,
            )
            if resp.status_code not in (200, 404):  # ignore if already deleted
                raise HTTPException(status_code=400, detail="Clerk org deletion failed")

        await self.org_repo.delete(db, org.id)

    async def invite_member(
        self, db: AsyncSession, org: Organization, user: User, data: InvitationCreate
    ) -> Invitation:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{self.clerk_api}/organizations/{org.clerk_organization_id}/invitations",
                headers=self.headers,
                json={
                    "email_address": data.email,
                    "role": f"org:{data.role.value.lower()}",
                    "inviter_user_id": user.clerk_user_id,
                },
            )
            if resp.status_code != 200:
                raise HTTPException(
                    status_code=400,
                    detail=resp.json().get(
                        "errors", [{"message": "Clerk invite failed"}]
                    )[0]["message"],
                )

            clerk_inv = resp.json()

        obj_in = {
            "clerk_invitation_id": clerk_inv["id"],
            "organization_id": org.id,
            "email": clerk_inv["email_address"],
            "role": data.role,
        }
        return await self.inv_repo.create(db, obj_in)

    async def revoke_invitation(
        self, db: AsyncSession, org: Organization, invitation: Invitation
    ) -> None:
        async with httpx.AsyncClient() as client:
            resp = await client.post(
                f"{self.clerk_api}/organizations/{org.clerk_organization_id}/invitations/{invitation.clerk_invitation_id}/revoke",
                headers=self.headers,
            )
            if resp.status_code not in (200, 404):
                raise HTTPException(status_code=400, detail="Clerk revoke failed")

        await self.inv_repo.delete(db, invitation.id)
