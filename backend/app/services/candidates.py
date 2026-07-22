import uuid
from typing import Optional, List, Tuple
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.recruitment import Candidate
from app.models.enums import CandidateStatus
from app.repositories.candidates import CandidateRepository
from app.schemas.candidate import CandidateCreate, CandidateUpdate


class CandidateService:
    def __init__(self) -> None:
        self.candidate_repo = CandidateRepository(Candidate)

    async def create_candidate(
        self, db: AsyncSession, org_id: uuid.UUID, data: CandidateCreate
    ) -> Candidate:
        # Check for duplicate email in the same organization
        existing = await self.candidate_repo.get_by_email(db, org_id, data.email)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A candidate with this email already exists in your organization",
            )

        create_data = data.model_dump()
        create_data["organization_id"] = org_id

        return await self.candidate_repo.create(db, create_data)

    async def get_candidate(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> Candidate:
        candidate = await self.candidate_repo.get_by_id_and_org(
            db, candidate_id, org_id
        )
        if not candidate:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Candidate not found"
            )
        return candidate

    async def update_candidate(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        candidate_id: uuid.UUID,
        data: CandidateUpdate,
    ) -> Candidate:
        candidate = await self.get_candidate(db, org_id, candidate_id)

        update_data = data.model_dump(exclude_unset=True)

        if "email" in update_data and update_data["email"] != candidate.email:
            existing = await self.candidate_repo.get_by_email(
                db, org_id, update_data["email"]
            )
            if existing:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="A candidate with this email already exists in your organization",
                )

        return await self.candidate_repo.update(db, candidate, update_data)

    async def delete_candidate(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> None:
        candidate = await self.get_candidate(db, org_id, candidate_id)
        await self.candidate_repo.delete(db, candidate.id)

    async def search_candidates(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        page: int = 1,
        size: int = 20,
        search: Optional[str] = None,
        status: Optional[CandidateStatus] = None,
        experience_min: Optional[int] = None,
        experience_max: Optional[int] = None,
        location: Optional[str] = None,
    ) -> Tuple[List[Candidate], int]:

        skip = (page - 1) * size
        return await self.candidate_repo.search_and_filter(
            db=db,
            org_id=org_id,
            skip=skip,
            limit=size,
            search=search,
            status=status,
            experience_min=experience_min,
            experience_max=experience_max,
            location=location,
        )
