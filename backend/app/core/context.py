from contextvars import ContextVar
from typing import Optional

# Request lifecycle context variables for multi-tenancy
current_user_id_ctx_var: ContextVar[Optional[str]] = ContextVar(
    "current_user_id", default=None
)
current_tenant_id_ctx_var: ContextVar[Optional[str]] = ContextVar(
    "current_tenant_id", default=None
)
