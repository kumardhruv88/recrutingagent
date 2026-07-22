from fastapi import APIRouter, Depends

from app.models.auth import User
from app.dependencies.auth import require_authenticated_user
from app.utils.responses import APIResponse, success_response

router = APIRouter()


@router.get("/me", response_model=APIResponse)
async def get_current_user_profile(
    current_user: User = Depends(require_authenticated_user),
) -> APIResponse:
    """
    Returns the currently authenticated user's profile.
    """
    return success_response(
        data={
            "id": str(current_user.id),
            "clerk_id": current_user.clerk_user_id,
            "email": current_user.email,
            "first_name": current_user.first_name,
            "last_name": current_user.last_name,
        },
        message="User profile retrieved successfully",
    )
