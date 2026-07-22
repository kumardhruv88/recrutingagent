import uuid
from typing import Optional, List
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository
from app.models.recruitment import Resume, ResumeEmbedding


class ResumeRepository(BaseRepository[Resume]):
    async def get_latest(
        self, db: AsyncSession, candidate_id: uuid.UUID
    ) -> Optional[Resume]:
        stmt = (
            select(Resume)
            .where(Resume.candidate_id == candidate_id)
            .order_by(Resume.version.desc())
        )
        result = await db.execute(stmt)
        return result.scalars().first()

    async def get_history(
        self, db: AsyncSession, candidate_id: uuid.UUID
    ) -> List[Resume]:
        stmt = (
            select(Resume)
            .where(Resume.candidate_id == candidate_id)
            .order_by(Resume.version.desc())
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())

    async def get_next_version(self, db: AsyncSession, candidate_id: uuid.UUID) -> int:
        stmt = select(func.max(Resume.version)).where(
            Resume.candidate_id == candidate_id
        )
        result = await db.execute(stmt)
        max_version = result.scalar()
        return (max_version or 0) + 1


class ResumeEmbeddingRepository(BaseRepository[ResumeEmbedding]):
    async def get_by_resume(
        self, db: AsyncSession, resume_id: uuid.UUID
    ) -> Optional[ResumeEmbedding]:
        stmt = select(ResumeEmbedding).where(ResumeEmbedding.resume_id == resume_id)
        result = await db.execute(stmt)
        return result.scalars().first()
