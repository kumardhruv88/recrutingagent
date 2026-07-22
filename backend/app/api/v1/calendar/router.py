import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission
from app.models.calendar import CalendarEvent
from app.schemas.calendar import EventCreateRequest, EventUpdateRequest, EventResponse
from app.services.calendar.registry import CalendarProviderRegistry
from app.services.calendar.providers.mock import MockCalendarProvider
from app.services.calendar.service import CalendarService

router = APIRouter()


def get_calendar_service() -> CalendarService:
    provider_registry = CalendarProviderRegistry()
    mock_provider = MockCalendarProvider()
    provider_registry.register(mock_provider, is_default=True)
    return CalendarService(provider_registry)


@router.post(
    "/events", response_model=EventResponse, status_code=status.HTTP_201_CREATED
)
async def create_event(
    request: EventCreateRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    calendar_service: CalendarService = Depends(get_calendar_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Create a new calendar event."""
    try:
        event = await calendar_service.create_event(db, organization.id, request)
        return event
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("/events", response_model=List[EventResponse])
async def get_events(
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get upcoming events for the organization."""
    stmt = (
        select(CalendarEvent)
        .where(CalendarEvent.organization_id == organization.id)
        .order_by(desc(CalendarEvent.start_time))
        .limit(100)
    )
    result = await db.execute(stmt)
    return result.scalars().all()


@router.get("/events/{event_id}", response_model=EventResponse)
async def get_event(
    event_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    calendar_service: CalendarService = Depends(get_calendar_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get a specific event."""
    event = await calendar_service.get_event(db, organization.id, event_id)
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return event


@router.patch("/events/{event_id}", response_model=EventResponse)
async def update_event(
    event_id: uuid.UUID,
    request: EventUpdateRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    calendar_service: CalendarService = Depends(get_calendar_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Update a specific event."""
    try:
        event = await calendar_service.update_event(
            db, organization.id, event_id, request
        )
        if not event:
            raise HTTPException(status_code=404, detail="Event not found")
        return event
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def cancel_event(
    event_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    calendar_service: CalendarService = Depends(get_calendar_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> None:
    """Cancel a specific event."""
    success = await calendar_service.cancel_event(db, organization.id, event_id)
    if not success:
        raise HTTPException(status_code=404, detail="Event not found")
