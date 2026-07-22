import uuid
from typing import Optional, List, Tuple
from sqlalchemy import select, or_, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository
from app.models.recruitment import Job
from app.models.enums import JobStatus, EmploymentType


class JobRepository(BaseRepository[Job]):
    async def get_by_title(
        self, db: AsyncSession, org_id: uuid.UUID, title: str
    ) -> Optional[Job]:
        stmt = select(Job).where(
            and_(Job.organization_id == org_id, Job.title == title)
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_by_id_and_org(
        self, db: AsyncSession, job_id: uuid.UUID, org_id: uuid.UUID
    ) -> Optional[Job]:
        stmt = select(Job).where(and_(Job.id == job_id, Job.organization_id == org_id))
        result = await db.execute(stmt)
        return result.scalars().first()

    async def search_and_filter(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
        status: Optional[JobStatus] = None,
        department: Optional[str] = None,
        employment_type: Optional[EmploymentType] = None,
        experience_level: Optional[str] = None,
    ) -> Tuple[List[Job], int]:

        conditions = [Job.organization_id == org_id]

        if search:
            search_term = f"%{search}%"
            conditions.append(
                or_(
                    Job.title.ilike(search_term),
                    Job.department.ilike(search_term),
                    Job.location.ilike(search_term),
                )
            )

        if status:
            conditions.append(Job.status == status)

        if department:
            conditions.append(Job.department.ilike(f"%{department}%"))

        if employment_type:
            conditions.append(Job.employment_type == employment_type)

        if experience_level:
            conditions.append(Job.experience_level.ilike(f"%{experience_level}%"))

        base_stmt = select(Job).where(and_(*conditions))

        # Get total count
        count_stmt = select(func.count()).select_from(base_stmt.subquery())
        count_result = await db.execute(count_stmt)
        total = count_result.scalar_one()

        # Get items
        items_stmt = base_stmt.order_by(Job.created_at.desc()).offset(skip).limit(limit)
        items_result = await db.execute(items_stmt)
        items = list(items_result.scalars().all())

        return items, total
