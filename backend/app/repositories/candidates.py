import uuid
from typing import Optional, Any, List, Tuple
from sqlalchemy import select, or_, and_, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository
from app.models.recruitment import Candidate
from app.models.enums import CandidateStatus


class CandidateRepository(BaseRepository[Candidate]):
    async def get_by_email(
        self, db: AsyncSession, org_id: uuid.UUID, email: str
    ) -> Optional[Candidate]:
        stmt = select(Candidate).where(
            and_(Candidate.organization_id == org_id, Candidate.email == email)
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_by_id_and_org(
        self, db: AsyncSession, candidate_id: uuid.UUID, org_id: uuid.UUID
    ) -> Optional[Candidate]:
        stmt = select(Candidate).where(
            and_(Candidate.id == candidate_id, Candidate.organization_id == org_id)
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def search_and_filter(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        skip: int = 0,
        limit: int = 100,
        search: Optional[str] = None,
        status: Optional[CandidateStatus] = None,
        experience_min: Optional[int] = None,
        experience_max: Optional[int] = None,
        location: Optional[str] = None,
    ) -> Tuple[List[Candidate], int]:

        conditions = [Candidate.organization_id == org_id]

        if search:
            search_term = f"%{search}%"
            conditions.append(
                or_(
                    Candidate.first_name.ilike(search_term),
                    Candidate.last_name.ilike(search_term),
                    Candidate.email.ilike(search_term),
                    Candidate.current_company.ilike(search_term),
                    Candidate.current_role.ilike(search_term),
                )
            )

        if status:
            conditions.append(Candidate.status == status)

        if experience_min is not None:
            conditions.append(Candidate.years_of_experience >= experience_min)

        if experience_max is not None:
            conditions.append(Candidate.years_of_experience <= experience_max)

        if location:
            conditions.append(Candidate.location.ilike(f"%{location}%"))

        base_stmt = select(Candidate).where(and_(*conditions))

        # Get total count
        count_stmt = select(func.count()).select_from(base_stmt.subquery())
        count_result = await db.execute(count_stmt)
        total = count_result.scalar_one()

        # Get items
        items_stmt = (
            base_stmt.order_by(Candidate.created_at.desc()).offset(skip).limit(limit)
        )
        items_result = await db.execute(items_stmt)
        items = list(items_result.scalars().all())

        return items, total
