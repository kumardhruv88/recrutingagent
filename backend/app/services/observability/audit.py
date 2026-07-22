import uuid
from typing import Any, Dict, Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.audit import AuditLog
from app.core.logging import correlation_id_ctx_var


SENSITIVE_KEYS = {
    "password",
    "token",
    "secret",
    "api_key",
    "authorization",
    "jwt",
    "access_token",
    "refresh_token",
}


def mask_sensitive_dict(data: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if not data:
        return data

    masked: Dict[str, Any] = {}
    for key, val in data.items():
        if any(sens in key.lower() for sens in SENSITIVE_KEYS):
            masked[key] = "***MASKED***"
        elif isinstance(val, dict):
            masked[key] = mask_sensitive_dict(val)
        else:
            masked[key] = val
    return masked


class AuditLogger:
    """
    Service for persisting structured audit logs with automatic sensitive field masking.
    """

    async def log_action(
        self,
        db: AsyncSession,
        action: str,
        organization_id: Optional[uuid.UUID] = None,
        user_id: Optional[str] = None,
        resource_type: Optional[str] = None,
        resource_id: Optional[str] = None,
        details: Optional[Dict[str, Any]] = None,
        ip_address: Optional[str] = None,
        correlation_id: Optional[str] = None,
    ) -> AuditLog:
        eff_correlation_id = correlation_id or correlation_id_ctx_var.get()
        masked_details = mask_sensitive_dict(details)

        log_entry = AuditLog(
            organization_id=organization_id,
            user_id=user_id,
            action=action.upper(),
            resource_type=resource_type,
            resource_id=resource_id,
            details=masked_details,
            ip_address=ip_address,
            correlation_id=eff_correlation_id,
        )

        db.add(log_entry)
        await db.commit()
        await db.refresh(log_entry)
        return log_entry

    async def query_logs(
        self,
        db: AsyncSession,
        organization_id: Optional[uuid.UUID] = None,
        action: Optional[str] = None,
        user_id: Optional[str] = None,
        limit: int = 100,
    ) -> List[AuditLog]:
        stmt = select(AuditLog)
        if organization_id:
            stmt = stmt.where(AuditLog.organization_id == organization_id)
        if action:
            stmt = stmt.where(AuditLog.action == action.upper())
        if user_id:
            stmt = stmt.where(AuditLog.user_id == user_id)

        stmt = stmt.order_by(AuditLog.created_at.desc()).limit(limit)
        results = await db.execute(stmt)
        return list(results.scalars().all())


audit_logger = AuditLogger()
