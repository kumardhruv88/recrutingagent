from fastapi import APIRouter, Depends, UploadFile, File, Form, Response
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.dependencies.database import get_db_session
from app.dependencies.auth import (
    get_current_organization,
    require_permission,
)
from app.models.auth import Organization, User
from app.models.enums import Permission
from app.schemas.resume import (
    ResumeResponse,
    ResumeUploadResponse,
    ResumeHistoryResponse,
)
from app.services.resumes import ResumeService

router = APIRouter()
resume_service = ResumeService()


@router.post("/upload", response_model=ResumeUploadResponse, status_code=201)
async def upload_resume(
    candidate_id: UUID = Form(...),
    file: UploadFile = File(...),
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    resume = await resume_service.upload_resume(db, org.id, candidate_id, file)
    return ResumeUploadResponse(
        success=True,
        resume=resume,  # type: ignore
        message="Resume uploaded and parsed successfully.",
    )


@router.get("/{candidate_id}", response_model=ResumeResponse)
async def get_latest_resume(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await resume_service.get_latest_resume(db, org.id, candidate_id)


@router.get("/{candidate_id}/history", response_model=ResumeHistoryResponse)
async def get_resume_history(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    history = await resume_service.get_history(db, org.id, candidate_id)
    return ResumeHistoryResponse(candidate_id=candidate_id, history=history)  # type: ignore


@router.get("/file/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await resume_service.get_resume(db, org.id, resume_id)


@router.delete("/{resume_id}", status_code=204, response_class=Response)
async def delete_resume(
    resume_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_DELETE)),
    db: AsyncSession = Depends(get_db_session),
) -> None:
    await resume_service.delete_resume(db, org.id, resume_id)
