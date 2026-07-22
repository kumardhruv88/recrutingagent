from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.dependencies.database import get_db_session
from app.dependencies.settings import get_app_settings
from app.core.config import Settings
from app.utils.responses import success_response, error_response, APIResponse
import structlog

logger = structlog.get_logger()
router = APIRouter()


@router.get("/health", response_model=APIResponse)
async def health_check() -> APIResponse:
    """Basic health check endpoint."""
    return success_response(data={"status": "ok"}, message="Application is healthy")


@router.get("/ready", response_model=APIResponse)
async def readiness_check(
    db: AsyncSession = Depends(get_db_session),
    settings: Settings = Depends(get_app_settings),
) -> APIResponse:
    """Check if application is ready and can connect to dependencies (Database)."""
    try:
        # Check database connection
        await db.execute(text("SELECT 1"))
        return success_response(
            data={"database": "connected", "environment": settings.ENVIRONMENT},
            message="Application is ready",
        )
    except Exception as e:
        logger.error("Readiness check failed", exc_info=e)
        return error_response(
            message="Application is not ready", details={"error": str(e)}
        )


@router.get("/live", response_model=APIResponse)
async def liveness_check() -> APIResponse:
    """Check if application process is live."""
    return success_response(data={"status": "live"}, message="Application is live")
