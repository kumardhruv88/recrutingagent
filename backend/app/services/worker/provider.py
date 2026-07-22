import uuid
from typing import Optional
from abc import ABC, abstractmethod
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.worker import BackgroundJob


class QueueProvider(ABC):
    @abstractmethod
    async def enqueue(self, db: AsyncSession, job: BackgroundJob) -> BackgroundJob:
        pass

    @abstractmethod
    async def pop_next_job(
        self, db: AsyncSession, organization_id: uuid.UUID
    ) -> Optional[BackgroundJob]:
        pass


class DatabaseQueueProvider(QueueProvider):
    async def enqueue(self, db: AsyncSession, job: BackgroundJob) -> BackgroundJob:
        db.add(job)
        await db.commit()
        await db.refresh(job)
        return job

    async def pop_next_job(
        self, db: AsyncSession, organization_id: uuid.UUID
    ) -> Optional[BackgroundJob]:
        from datetime import datetime, UTC

        now = datetime.now(UTC)

        # Simple DB-based queue pop:
        # 1. Find the first pending job that is ready to execute (execute_after is null or <= now).
        # 2. In a real system, we would use SELECT FOR UPDATE SKIP LOCKED.
        #    SQLAlchemy supports this via with_for_update(skip_locked=True).
        stmt = (
            select(BackgroundJob)
            .where(
                BackgroundJob.organization_id == organization_id,
                BackgroundJob.status == "PENDING",
            )
            .where(
                (BackgroundJob.execute_after == None)
                | (BackgroundJob.execute_after <= now)  # noqa: E711
            )
            .order_by(BackgroundJob.created_at)
            .with_for_update(skip_locked=True)
            .limit(1)
        )

        job = (await db.execute(stmt)).scalar_one_or_none()

        if job:
            job.status = "RUNNING"
            await db.commit()
            await db.refresh(job)

        return job
