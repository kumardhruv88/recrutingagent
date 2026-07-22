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
from app.models.enums import Permission, CandidateStatus
from app.schemas.candidate import CandidateCreate, CandidateUpdate, CandidateResponse
from app.schemas.common import PaginatedResponse
from app.services.candidates import CandidateService

router = APIRouter()
candidate_service = CandidateService()


@router.post("", response_model=CandidateResponse, status_code=201)
async def create_candidate(
    data: CandidateCreate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_CREATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await candidate_service.create_candidate(db, org.id, data)


@router.get("", response_model=PaginatedResponse[CandidateResponse])
async def search_candidates(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    search: Optional[str] = Query(None),
    status: Optional[CandidateStatus] = Query(None),
    experience_min: Optional[int] = Query(None, ge=0),
    experience_max: Optional[int] = Query(None, ge=0),
    location: Optional[str] = Query(None),
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    items, total = await candidate_service.search_candidates(
        db=db,
        org_id=org.id,
        page=page,
        size=size,
        search=search,
        status=status,
        experience_min=experience_min,
        experience_max=experience_max,
        location=location,
    )

    return {"items": items, "total": total, "page": page, "size": size}


@router.get("/{candidate_id}", response_model=CandidateResponse)
async def get_candidate(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await candidate_service.get_candidate(db, org.id, candidate_id)


@router.patch("/{candidate_id}", response_model=CandidateResponse)
async def update_candidate(
    candidate_id: UUID,
    data: CandidateUpdate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await candidate_service.update_candidate(db, org.id, candidate_id, data)


@router.delete("/{candidate_id}", status_code=204, response_class=Response)
async def delete_candidate(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_DELETE)),
    db: AsyncSession = Depends(get_db_session),
) -> None:
    await candidate_service.delete_candidate(db, org.id, candidate_id)
