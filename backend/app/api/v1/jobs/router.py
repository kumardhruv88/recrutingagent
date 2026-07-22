from fastapi import APIRouter, Depends, Query, Response
from typing import Optional, Any
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.dependencies.database import get_db_session
from app.dependencies.auth import (
    get_current_organization,
    require_permission,
)
from app.models.auth import Organization, User
from app.models.enums import Permission, JobStatus, EmploymentType
from app.schemas.job import JobCreate, JobUpdate, JobResponse
from app.schemas.common import PaginatedResponse
from app.services.jobs import JobService

router = APIRouter()
job_service = JobService()


@router.post("", response_model=JobResponse, status_code=201)
async def create_job(
    data: JobCreate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.JOB_CREATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await job_service.create_job(db, org.id, user.id, data)


@router.get("", response_model=PaginatedResponse[JobResponse])
async def search_jobs(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    search: Optional[str] = Query(None),
    status: Optional[JobStatus] = Query(None),
    department: Optional[str] = Query(None),
    employment_type: Optional[EmploymentType] = Query(None),
    experience_level: Optional[str] = Query(None),
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.JOB_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    items, total = await job_service.search_jobs(
        db=db,
        org_id=org.id,
        page=page,
        size=size,
        search=search,
        status=status,
        department=department,
        employment_type=employment_type,
        experience_level=experience_level,
    )

    return {"items": items, "total": total, "page": page, "size": size}


@router.get("/{job_id}", response_model=JobResponse)
async def get_job(
    job_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.JOB_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await job_service.get_job(db, org.id, job_id)


@router.patch("/{job_id}", response_model=JobResponse)
async def update_job(
    job_id: UUID,
    data: JobUpdate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.JOB_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await job_service.update_job(db, org.id, job_id, data)


@router.delete("/{job_id}", status_code=204, response_class=Response)
async def delete_job(
    job_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.JOB_DELETE)),
    db: AsyncSession = Depends(get_db_session),
) -> None:
    await job_service.delete_job(db, org.id, job_id)
