import structlog
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.middleware.gzip import GZipMiddleware

from app.core.config import get_settings
from app.core.logging import setup_logging
from app.core.handlers import register_exception_handlers
from app.middleware.request_context import RequestContextMiddleware
from app.middleware.auth import AuthenticationMiddleware
from app.middleware.tenant import TenantMiddleware
from app.database.session import engine
from app.api.v1 import health
from app.api.v1.webhooks import clerk
from app.api.v1.auth import me
from app.api.v1.organizations import router as org_router
from app.api.v1.candidates import router as candidate_router
from app.api.v1.jobs import router as job_router
from app.api.v1.applications import router as application_router
from app.api.v1.resumes import router as resume_router
from app.api.v1.github.router import router as github_router
from app.api.v1.emails.router import router as emails_router
from app.api.v1.calendar.router import router as calendar_router
from app.api.v1.workflows.router import router as workflows_router
from app.api.v1.interviews.router import router as interviews_router
from app.api.v1.copilot.router import router as copilot_router
from app.api.v1.rag.router import router as rag_router
from app.api.v1.workers.router import router as workers_router


def register_middleware(app: FastAPI) -> None:
    settings = get_settings()
    app.add_middleware(RequestContextMiddleware)
    app.add_middleware(AuthenticationMiddleware)
    app.add_middleware(TenantMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(GZipMiddleware, minimum_size=1000)
    # Add TrustedHostMiddleware if needed for production
    # app.add_middleware(TrustedHostMiddleware, allowed_hosts=["*"])


def register_routers(app: FastAPI) -> None:
    settings = get_settings()
    app.include_router(
        health.router, prefix=f"{settings.API_V1_STR}/health", tags=["Health"]
    )
    app.include_router(
        clerk.router, prefix=f"{settings.API_V1_STR}/webhooks", tags=["Webhooks"]
    )
    app.include_router(me.router, prefix=f"{settings.API_V1_STR}/auth", tags=["Auth"])
    app.include_router(
        org_router.router,
        prefix=f"{settings.API_V1_STR}/organizations",
        tags=["Organizations"],
    )
    app.include_router(
        candidate_router.router,
        prefix=f"{settings.API_V1_STR}/candidates",
        tags=["Candidates"],
    )
    app.include_router(
        job_router.router,
        prefix=f"{settings.API_V1_STR}/jobs",
        tags=["Jobs"],
    )
    app.include_router(
        application_router.router,
        prefix=f"{settings.API_V1_STR}/applications",
        tags=["Applications"],
    )
    app.include_router(
        resume_router.router,
        prefix=f"{settings.API_V1_STR}/resumes",
        tags=["Resumes"],
    )
    app.include_router(
        github_router,
        prefix=f"{settings.API_V1_STR}/github",
        tags=["GitHub"],
    )
    app.include_router(
        emails_router,
        prefix=f"{settings.API_V1_STR}/emails",
        tags=["Emails"],
    )
    app.include_router(
        calendar_router,
        prefix=f"{settings.API_V1_STR}/calendar",
        tags=["Calendar"],
    )
    app.include_router(
        workflows_router,
        prefix=f"{settings.API_V1_STR}/workflows",
        tags=["Workflows"],
    )
    app.include_router(
        interviews_router,
        prefix=f"{settings.API_V1_STR}/interviews",
        tags=["Interviews"],
    )
    app.include_router(
        copilot_router,
        prefix=f"{settings.API_V1_STR}/copilot",
        tags=["AI Copilot"],
    )
    app.include_router(
        rag_router,
        prefix=f"{settings.API_V1_STR}/rag",
        tags=["RAG Architecture"],
    )
    app.include_router(
        workers_router,
        prefix=f"{settings.API_V1_STR}/workers",
        tags=["Background Workers"],
    )


from typing import AsyncGenerator


@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    """
    Application lifespan manager.
    Initializes logger, validates database connection, and cleans up resources on shutdown.
    """
    setup_logging()
    logger = structlog.get_logger()
    logger.info("Application starting up...")

    # Database initialization / test
    try:
        async with engine.connect() as conn:
            logger.info("Successfully connected to the database.")
    except Exception as e:
        logger.error("Failed to connect to the database on startup.", exc_info=e)

    yield

    logger.info("Application shutting down...")
    await engine.dispose()
    logger.info("Database engine disposed.")


def create_app() -> FastAPI:
    """
    Application factory.
    """
    settings = get_settings()

    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        description="API for HireMind AI Platform",
        lifespan=lifespan,
        docs_url=f"{settings.API_V1_STR}/docs",
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    register_middleware(app)
    register_exception_handlers(app)
    register_routers(app)

    return app


# The main application instance used by Uvicorn
app = create_app()
