from fastapi import APIRouter, Depends, Query, Response
from typing import Optional, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.dependencies.database import get_db_session
from app.dependencies.auth import (
    get_current_organization,
    require_permission,
)
from app.models.auth import Organization, User
from app.models.enums import Permission
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationResponse,
    ApplicationStageUpdate,
    ApplicationNoteCreate,
    ApplicationNoteResponse,
    ApplicationTimelineEventResponse,
)
from app.schemas.common import PaginatedResponse
from app.services.applications import ApplicationService

router = APIRouter()
app_service = ApplicationService()


@router.post("", response_model=ApplicationResponse, status_code=201)
async def create_application(
    data: ApplicationCreate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_CREATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await app_service.create_application(db, org.id, data)


@router.get("", response_model=PaginatedResponse[ApplicationResponse])
async def list_applications(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    items, total = await app_service.list_applications(db, org.id, page, size)
    return {"items": items, "total": total, "page": page, "size": size}


@router.get("/{app_id}", response_model=ApplicationResponse)
async def get_application(
    app_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await app_service.get_application(db, org.id, app_id)


@router.patch("/{app_id}", response_model=ApplicationResponse)
async def update_application(
    app_id: UUID,
    data: ApplicationUpdate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await app_service.update_application(db, org.id, app_id, data)


@router.patch("/{app_id}/stage", response_model=ApplicationResponse)
async def update_stage(
    app_id: UUID,
    data: ApplicationStageUpdate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    update_data = ApplicationUpdate(current_stage=data.stage)
    return await app_service.update_application(db, org.id, app_id, update_data)


@router.delete("/{app_id}", status_code=204, response_class=Response)
async def delete_application(
    app_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_DELETE)),
    db: AsyncSession = Depends(get_db_session),
) -> None:
    await app_service.delete_application(db, org.id, app_id)


@router.post("/{app_id}/notes", response_model=ApplicationNoteResponse, status_code=201)
async def add_note(
    app_id: UUID,
    data: ApplicationNoteCreate,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await app_service.add_note(db, org.id, app_id, user.id, data)


@router.get("/{app_id}/notes", response_model=List[ApplicationNoteResponse])
async def get_notes(
    app_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await app_service.get_notes(db, org.id, app_id)


@router.get("/{app_id}/timeline", response_model=List[ApplicationTimelineEventResponse])
async def get_timeline(
    app_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.APPLICATION_READ)),
    db: AsyncSession = Depends(get_db_session),
) -> Any:
    return await app_service.get_timeline(db, org.id, app_id)
