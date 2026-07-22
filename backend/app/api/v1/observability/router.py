import uuid
from typing import Any, List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission

from app.middleware.metrics import metrics_tracker
from app.schemas.audit import AuditLogResponse, MetricsResponse
from app.services.observability.audit import audit_logger

router = APIRouter()


@router.get("/metrics", response_model=MetricsResponse)
async def get_request_metrics(
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Returns lightweight HTTP request metrics and endpoint usage statistics."""
    return metrics_tracker.get_summary()


@router.get("/audit", response_model=List[AuditLogResponse])
async def get_audit_logs(
    action: Optional[str] = Query(None, description="Filter by action name"),
    user_id: Optional[str] = Query(None, description="Filter by user ID"),
    limit: int = Query(100, ge=1, le=500, description="Max logs to return"),
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Queries audit logs for the current organization."""
    return await audit_logger.query_logs(
        db=db,
        organization_id=organization.id,
        action=action,
        user_id=user_id,
        limit=limit,
    )
