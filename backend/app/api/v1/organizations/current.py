from fastapi import APIRouter, Depends

from app.models.auth import Organization, User
from app.dependencies.auth import get_current_organization, require_authenticated_user
from app.utils.responses import APIResponse, success_response, error_response

router = APIRouter()


@router.get("/current", response_model=APIResponse)
async def get_current_active_organization(
    current_user: User = Depends(require_authenticated_user),
    organization: Organization | None = Depends(get_current_organization),
) -> APIResponse:
    """
    Returns the organization resolved from the current request context (tenant).
    """
    if not organization:
        return error_response(message="No active organization context found")

    return success_response(
        data={
            "id": str(organization.id),
            "clerk_id": organization.clerk_organization_id,
            "name": organization.name,
            "slug": organization.slug,
        },
        message="Active organization retrieved successfully",
    )
