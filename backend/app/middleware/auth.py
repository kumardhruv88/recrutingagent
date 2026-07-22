from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import JSONResponse, Response

from app.core.auth import clerk_auth
from app.core.context import current_user_id_ctx_var
from app.utils.responses import error_response


class AuthenticationMiddleware(BaseHTTPMiddleware):
    """
    Extracts the JWT from the Authorization header, verifies it using Clerk,
    and attaches the authenticated clerk_user_id to the context.
    """

    async def dispatch(self, request: Request, call_next: RequestResponseEndpoint) -> Response:
        auth_header = request.headers.get("Authorization")

        request.state.user_id = None
        current_user_id_ctx_var.set(None)

        if auth_header and auth_header.startswith("Bearer "):
            token = auth_header.split(" ")[1]
            try:
                claims = await clerk_auth.verify_token(token)
                # Clerk's subject ('sub') is the user ID
                user_id = claims.get("sub")
                if user_id:
                    request.state.user_id = user_id
                    current_user_id_ctx_var.set(user_id)
            except ValueError as e:
                # We do not block requests here to allow public endpoints.
                # The authorization dependencies (require_authenticated_user) will enforce protection.
                pass

        response = await call_next(request)
        return response
