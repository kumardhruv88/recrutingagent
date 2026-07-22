import uuid
from typing import Any, List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission
from app.models.worker import BackgroundJob

from app.schemas.worker import EnqueueJobRequest, JobResponse
from app.services.worker.provider import DatabaseQueueProvider
from app.services.worker.registry import TaskRegistry
from app.services.worker.service import BackgroundWorkerService

router = APIRouter()

# Setup worker infrastructure
provider = DatabaseQueueProvider()
task_registry = TaskRegistry()
worker_service = BackgroundWorkerService(provider, task_registry)


# Dependency to inject the service
def get_worker_service() -> BackgroundWorkerService:
    return worker_service


@router.post("/jobs", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
async def enqueue_job(
    request: EnqueueJobRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: BackgroundWorkerService = Depends(get_worker_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Enqueue a new background job."""
    try:
        return await service.enqueue(db, organization.id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/jobs", response_model=List[JobResponse])
async def list_jobs(
    status: Optional[str] = None,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """List background jobs, optionally filtering by status (e.g. DLQ)."""
    stmt = select(BackgroundJob).where(BackgroundJob.organization_id == organization.id)
    if status:
        stmt = stmt.where(BackgroundJob.status == status)
    stmt = stmt.order_by(BackgroundJob.created_at.desc()).limit(100)

    results = await db.execute(stmt)
    return results.scalars().all()


@router.get("/jobs/{job_id}", response_model=JobResponse)
async def get_job_status(
    job_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: BackgroundWorkerService = Depends(get_worker_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get the status of a specific background job."""
    try:
        return await service.get_job(db, organization.id, job_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/jobs/{job_id}/retry", response_model=JobResponse)
async def retry_dlq_job(
    job_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    service: BackgroundWorkerService = Depends(get_worker_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Manually requeue a job from the DLQ."""
    try:
        return await service.retry_dlq_job(db, organization.id, job_id)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
