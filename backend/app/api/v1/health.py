import time
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.dependencies.database import get_db_session
from app.dependencies.settings import get_app_settings
from app.core.config import Settings
from app.utils.responses import success_response, error_response, APIResponse
from app.services.ai.orchestrator import AIOrchestratorService
from app.services.ai.providers.mock import MockAIProvider
from app.services.ai.registry import ProviderRegistry, PromptRegistry
from app.services.ai.router import AITaskRouter
from app.services.worker.provider import DatabaseQueueProvider
from app.services.worker.registry import TaskRegistry
from app.services.worker.service import BackgroundWorkerService
import structlog

logger = structlog.get_logger()
router = APIRouter()

START_TIME = time.time()


@router.get("/health", response_model=APIResponse)
async def health_check(settings: Settings = Depends(get_app_settings)) -> APIResponse:
    """Basic health check endpoint returning API status, version, and uptime."""
    uptime_seconds = round(time.time() - START_TIME, 2)
    return success_response(
        data={
            "status": "ok",
            "version": settings.APP_VERSION,
            "uptime_seconds": uptime_seconds,
        },
        message="Application is healthy",
    )


@router.get("/ready", response_model=APIResponse)
async def readiness_check(
    db: AsyncSession = Depends(get_db_session),
    settings: Settings = Depends(get_app_settings),
) -> APIResponse:
    """Check if application is ready and can connect to DB, AI Provider, and Worker infrastructure."""
    readiness_status = {
        "database": "unknown",
        "ai_provider": "unknown",
        "worker": "unknown",
        "environment": settings.ENVIRONMENT,
    }
    is_ready = True

    # 1. Check database connection
    try:
        await db.execute(text("SELECT 1"))
        readiness_status["database"] = "connected"
    except Exception as e:
        logger.error("Database readiness check failed", exc_info=e)
        readiness_status["database"] = f"error: {str(e)}"
        is_ready = False

    # 2. Check AI Provider availability
    try:
        provider_registry = ProviderRegistry()
        provider_registry.register(MockAIProvider())
        prompt_registry = PromptRegistry()
        task_router = AITaskRouter()
        ai_service = AIOrchestratorService(
            provider_registry, prompt_registry, task_router
        )
        if ai_service:
            readiness_status["ai_provider"] = "available"
    except Exception as e:
        logger.error("AI Provider readiness check failed", exc_info=e)
        readiness_status["ai_provider"] = f"error: {str(e)}"
        is_ready = False

    # 3. Check Background Worker availability
    try:
        queue_provider = DatabaseQueueProvider()
        task_registry = TaskRegistry()
        worker_service = BackgroundWorkerService(queue_provider, task_registry)
        if worker_service:
            readiness_status["worker"] = "available"
    except Exception as e:
        logger.error("Worker readiness check failed", exc_info=e)
        readiness_status["worker"] = f"error: {str(e)}"
        is_ready = False

    if is_ready:
        return success_response(
            data=readiness_status,
            message="Application is ready",
        )
    else:
        return error_response(
            message="Application is not ready",
            details=readiness_status,
        )


@router.get("/live", response_model=APIResponse)
async def liveness_check() -> APIResponse:
    """Check if application process is live."""
    return success_response(data={"status": "live"}, message="Application is live")
