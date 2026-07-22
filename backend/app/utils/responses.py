from typing import Any, Dict, Optional
from pydantic import BaseModel


class APIResponse(BaseModel):
    """
    Standard JSON response wrapper for all API endpoints.
    """

    success: bool
    message: str
    data: Dict[str, Any]
    meta: Dict[str, Any]


def success_response(
    data: Optional[Dict[str, Any]] = None,
    message: str = "Operation successful",
    meta: Optional[Dict[str, Any]] = None,
) -> APIResponse:
    """Helper to return a standardized success response."""
    return APIResponse(success=True, message=message, data=data or {}, meta=meta or {})


def error_response(
    message: str = "An error occurred", details: Optional[Dict[str, Any]] = None
) -> APIResponse:
    """Helper to return a standardized error response."""
    return APIResponse(
        success=False, message=message, data={}, meta={"details": details or {}}
    )
