import uuid
from typing import Optional, List, Tuple
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.recruitment import Job
from app.models.enums import JobStatus, EmploymentType
from app.repositories.jobs import JobRepository
from app.schemas.job import JobCreate, JobUpdate


class JobService:
    def __init__(self) -> None:
        self.job_repo = JobRepository(Job)

    async def create_job(
        self, db: AsyncSession, org_id: uuid.UUID, user_id: uuid.UUID, data: JobCreate
    ) -> Job:
        # Check for duplicate title in the same organization
        existing = await self.job_repo.get_by_title(db, org_id, data.title)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A job with this title already exists in your organization",
            )

        create_data = data.model_dump()
        create_data["organization_id"] = org_id
        create_data["created_by"] = user_id

        return await self.job_repo.create(db, create_data)

    async def get_job(
        self, db: AsyncSession, org_id: uuid.UUID, job_id: uuid.UUID
    ) -> Job:
        job = await self.job_repo.get_by_id_and_org(db, job_id, org_id)
        if not job:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Job not found"
            )
        return job

    async def update_job(
        self, db: AsyncSession, org_id: uuid.UUID, job_id: uuid.UUID, data: JobUpdate
    ) -> Job:
        job = await self.get_job(db, org_id, job_id)

        update_data = data.model_dump(exclude_unset=True)

        if "title" in update_data and update_data["title"] != job.title:
            existing = await self.job_repo.get_by_title(
                db, org_id, update_data["title"]
            )
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A job with this title already exists in your organization",
                )

        return await self.job_repo.update(db, job, update_data)

    async def delete_job(
        self, db: AsyncSession, org_id: uuid.UUID, job_id: uuid.UUID
    ) -> None:
        job = await self.get_job(db, org_id, job_id)
        await self.job_repo.delete(db, job.id)

    async def search_jobs(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        page: int = 1,
        size: int = 20,
        search: Optional[str] = None,
        status: Optional[JobStatus] = None,
        department: Optional[str] = None,
        employment_type: Optional[EmploymentType] = None,
        experience_level: Optional[str] = None,
    ) -> Tuple[List[Job], int]:

        skip = (page - 1) * size
        return await self.job_repo.search_and_filter(
            db=db,
            org_id=org_id,
            skip=skip,
            limit=size,
            search=search,
            status=status,
            department=department,
            employment_type=employment_type,
            experience_level=experience_level,
        )
