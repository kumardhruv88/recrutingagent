from fastapi import APIRouter, Depends, HTTPException, Response
from typing import List, Any
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.dependencies.database import get_db_session
from app.dependencies.auth import (
    get_current_user,
    get_current_organization,
    require_active_membership,
    require_permission,
    require_role,
)
from app.schemas.organization import (
    OrganizationCreate,
    OrganizationUpdate,
    OrganizationResponse,
    InvitationCreate,
    InvitationResponse,
    SwitchOrganizationRequest,
)
from app.services.organization import OrganizationService
from app.models.auth import Organization, User
from app.models.enums import Permission, Role

router = APIRouter()
org_service = OrganizationService()


@router.get("", response_model=List[OrganizationResponse])
async def list_organizations(
    user: User = Depends(get_current_user), db: AsyncSession = Depends(get_db_session)
) -> Any:
    """List all organizations the user is a member of"""
    orgs = await org_service.org_repo.list_for_user(db, user.id)
    return orgs


@router.get("/current", response_model=OrganizationResponse)
async def get_current_active_organization(
    org: Organization = Depends(get_current_organization),
) -> Any:
    """Retrieve the currently active organization from context"""
    return org


@router.post("", response_model=OrganizationResponse)
async def create_organization(
    data: OrganizationCreate,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await org_service.create_organization(db, user, data)


@router.get("/{org_id}", response_model=OrganizationResponse)
async def get_organization(
    org_id: UUID,
    user: User = Depends(require_active_membership),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    org = await org_service.org_repo.get_by_id(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return org


@router.patch("/{org_id}", response_model=OrganizationResponse)
async def update_organization(
    org_id: UUID,
    data: OrganizationUpdate,
    user: User = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    org = await org_service.org_repo.get_by_id(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    return await org_service.update_organization(db, org, data)


@router.delete("/{org_id}", status_code=204, response_class=Response)
async def delete_organization(
    org_id: UUID,
    user: User = Depends(require_permission(Permission.ORGANIZATION_DELETE)),
    db: AsyncSession = Depends(get_db_session),
) -> None:
    org = await org_service.org_repo.get_by_id(db, org_id)
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")
    await org_service.delete_organization(db, org)


@router.post("/switch")
async def switch_organization(
    data: SwitchOrganizationRequest,
    user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    """
    Validates if the user belongs to the requested organization and sets a standard response header
    or response body that the frontend can use to update its active tenant context.
    """
    # Fetch org
    org = await org_service.org_repo.get_by_id(db, UUID(data.organization_id))
    if not org:
        raise HTTPException(status_code=404, detail="Organization not found")

    # Validate membership
    membership = await org_service.mem_repo.get_user_membership(db, user.id, org.id)
    if not membership:
        raise HTTPException(
            status_code=403, detail="You are not a member of this organization"
        )

    # Instruct client they are authorized to switch
    return {"message": "Switched successfully", "organization_id": str(org.id)}


@router.post("/invitations", response_model=InvitationResponse)
async def invite_member(
    data: InvitationCreate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_role([Role.OWNER, Role.ADMIN])),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await org_service.invite_member(db, org, user, data)


@router.get("/invitations", response_model=List[InvitationResponse])
async def list_invitations(
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_active_membership),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await org_service.inv_repo.list_for_organization(db, org.id)


@router.delete("/invitations/{inv_id}", status_code=204, response_class=Response)
async def revoke_invitation(
    inv_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_role([Role.OWNER, Role.ADMIN])),
    db: AsyncSession = Depends(get_db_session),
) -> None:
    invitation = await org_service.inv_repo.get_by_id(db, inv_id)
    if not invitation or invitation.organization_id != org.id:
        raise HTTPException(status_code=404, detail="Invitation not found")

    await org_service.revoke_invitation(db, org, invitation)
