import uuid
from typing import Optional, List, Tuple
from sqlalchemy import select, func, and_
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository
from app.models.recruitment import (
    Application,
    ApplicationNote,
    ApplicationTimelineEvent,
    Job,
)


class ApplicationRepository(BaseRepository[Application]):
    async def get_with_relations(
        self, db: AsyncSession, app_id: uuid.UUID
    ) -> Optional[Application]:
        stmt = (
            select(Application)
            .options(selectinload(Application.candidate), selectinload(Application.job))
            .where(Application.id == app_id)
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_by_candidate_and_job(
        self, db: AsyncSession, candidate_id: uuid.UUID, job_id: uuid.UUID
    ) -> Optional[Application]:
        stmt = select(Application).where(
            and_(Application.candidate_id == candidate_id, Application.job_id == job_id)
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_all_for_org(
        self, db: AsyncSession, org_id: uuid.UUID, skip: int = 0, limit: int = 100
    ) -> Tuple[List[Application], int]:

        base_stmt = (
            select(Application)
            .join(Job, Application.job_id == Job.id)
            .where(Job.organization_id == org_id)
        )

        count_stmt = select(func.count()).select_from(base_stmt.subquery())
        count_result = await db.execute(count_stmt)
        total = count_result.scalar_one()

        items_stmt = (
            base_stmt.options(
                selectinload(Application.candidate), selectinload(Application.job)
            )
            .order_by(Application.created_at.desc())
            .offset(skip)
            .limit(limit)
        )
        items_result = await db.execute(items_stmt)
        items = list(items_result.scalars().all())

        return items, total


class ApplicationNoteRepository(BaseRepository[ApplicationNote]):
    async def get_by_application(
        self, db: AsyncSession, app_id: uuid.UUID
    ) -> List[ApplicationNote]:
        stmt = (
            select(ApplicationNote)
            .where(ApplicationNote.application_id == app_id)
            .order_by(ApplicationNote.created_at.desc())
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())


class ApplicationTimelineRepository(BaseRepository[ApplicationTimelineEvent]):
    async def get_by_application(
        self, db: AsyncSession, app_id: uuid.UUID
    ) -> List[ApplicationTimelineEvent]:
        stmt = (
            select(ApplicationTimelineEvent)
            .where(ApplicationTimelineEvent.application_id == app_id)
            .order_by(ApplicationTimelineEvent.created_at.desc())
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())
