from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.responses import Response

from app.core.context import current_tenant_id_ctx_var


class TenantMiddleware(BaseHTTPMiddleware):
    """
    Resolves the organization context from the request (e.g., via headers or JWT)
    and attaches it to the global context for tenant isolation.
    """

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        # Check X-Organization-ID header
        org_id = request.headers.get("X-Organization-ID")

        # We can also attempt to read from clerk token if needed, but header is standard.
        if org_id:
            current_tenant_id_ctx_var.set(org_id)
            # Make it available in request state
            request.state.organization_id = org_id
        else:
            current_tenant_id_ctx_var.set(None)
            request.state.organization_id = None

        response = await call_next(request)
        return response
