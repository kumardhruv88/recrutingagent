import uuid
import traceback
import asyncio
from datetime import datetime, UTC, timedelta
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.worker import BackgroundJob
from app.schemas.worker import EnqueueJobRequest
from app.services.worker.provider import QueueProvider
from app.services.worker.registry import TaskRegistry


class BackgroundWorkerService:
    def __init__(self, queue_provider: QueueProvider, registry: TaskRegistry) -> None:
        self.queue_provider = queue_provider
        self.registry = registry

    async def enqueue(
        self, db: AsyncSession, organization_id: uuid.UUID, request: EnqueueJobRequest
    ) -> BackgroundJob:
        # Validate that the task exists before enqueuing
        self.registry.get_task(request.task_name)

        job = BackgroundJob(
            organization_id=organization_id,
            task_name=request.task_name,
            payload=request.payload or {},
            max_retries=request.max_retries,
            execute_after=request.execute_after,
        )
        return await self.queue_provider.enqueue(db, job)

    async def process_next_job(
        self, db: AsyncSession, organization_id: uuid.UUID
    ) -> Optional[BackgroundJob]:
        job = await self.queue_provider.pop_next_job(db, organization_id)
        if not job:
            return None

        try:
            task_func = self.registry.get_task(job.task_name)
            result = await task_func(job.payload or {})

            job.status = "COMPLETED"
            job.result = result
            job.error = None

        except Exception as e:
            job.error = traceback.format_exc()
            job.retry_count += 1

            if job.retry_count >= job.max_retries:
                job.status = "DLQ"
            else:
                job.status = "PENDING"
                # Exponential backoff: 2^retry_count minutes
                backoff_minutes = 2**job.retry_count
                job.execute_after = datetime.now(UTC) + timedelta(
                    minutes=backoff_minutes
                )

        await db.commit()
        await db.refresh(job)
        return job

    async def get_job(
        self, db: AsyncSession, organization_id: uuid.UUID, job_id: uuid.UUID
    ) -> BackgroundJob:
        stmt = select(BackgroundJob).where(
            BackgroundJob.id == job_id, BackgroundJob.organization_id == organization_id
        )
        job = (await db.execute(stmt)).scalar_one_or_none()
        if not job:
            raise ValueError("Job not found")
        return job

    async def retry_dlq_job(
        self, db: AsyncSession, organization_id: uuid.UUID, job_id: uuid.UUID
    ) -> BackgroundJob:
        job = await self.get_job(db, organization_id, job_id)
        if job.status != "DLQ":
            raise ValueError("Only DLQ jobs can be retried.")

        job.status = "PENDING"
        job.retry_count = 0
        job.error = None
        job.execute_after = datetime.now(UTC)
        await db.commit()
        await db.refresh(job)
        return job
