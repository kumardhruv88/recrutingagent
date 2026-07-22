import uuid
from typing import Optional, List
from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository
from app.models.recruitment import GithubProfile, GithubRepository


class GithubProfileRepository(BaseRepository[GithubProfile]):
    async def get_by_candidate(
        self, db: AsyncSession, candidate_id: uuid.UUID
    ) -> Optional[GithubProfile]:
        stmt = select(GithubProfile).where(GithubProfile.candidate_id == candidate_id)
        result = await db.execute(stmt)
        return result.scalars().first()


class GithubRepositoryRepository(BaseRepository[GithubRepository]):
    async def get_by_profile(
        self, db: AsyncSession, profile_id: uuid.UUID
    ) -> List[GithubRepository]:
        stmt = select(GithubRepository).where(GithubRepository.profile_id == profile_id)
        result = await db.execute(stmt)
        return list(result.scalars().all())

    async def delete_by_profile(self, db: AsyncSession, profile_id: uuid.UUID) -> None:
        stmt = delete(GithubRepository).where(GithubRepository.profile_id == profile_id)
        await db.execute(stmt)
        await db.commit()
