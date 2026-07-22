import uuid
from typing import Optional, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.calendar import CalendarEvent
from app.schemas.calendar import EventCreateRequest, EventUpdateRequest
from app.services.calendar.registry import CalendarProviderRegistry


class CalendarService:
    """
    Coordinates calendar event management, interacting with providers.
    """

    def __init__(self, provider_registry: CalendarProviderRegistry) -> None:
        self.provider_registry = provider_registry

    async def create_event(
        self, db: AsyncSession, organization_id: uuid.UUID, request: EventCreateRequest
    ) -> CalendarEvent:
        """Create a new event locally and in the external provider."""
        if request.start_time >= request.end_time:
            raise ValueError("Start time must be before end time.")

        provider = self.provider_registry.resolve()

        # Serialize attendees to dict for provider
        attendees_data = [a.model_dump() for a in request.attendees]

        event_data = {
            "title": request.title,
            "description": request.description,
            "organizer": request.organizer,
            "attendees": attendees_data,
            "start_time": request.start_time.isoformat(),
            "end_time": request.end_time.isoformat(),
            "time_zone": request.time_zone,
        }

        # Send to provider
        external_id, provider_name = await provider.create_event(event_data)

        event = CalendarEvent(
            organization_id=organization_id,
            title=request.title,
            description=request.description,
            organizer=request.organizer,
            attendees=attendees_data,
            start_time=request.start_time,
            end_time=request.end_time,
            time_zone=request.time_zone,
            provider=provider_name,
            external_event_id=external_id,
            status="scheduled",
        )
        db.add(event)
        await db.commit()
        await db.refresh(event)
        return event

    async def get_event(
        self, db: AsyncSession, organization_id: uuid.UUID, event_id: uuid.UUID
    ) -> Optional[CalendarEvent]:
        stmt = select(CalendarEvent).where(
            CalendarEvent.id == event_id,
            CalendarEvent.organization_id == organization_id,
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def update_event(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        event_id: uuid.UUID,
        request: EventUpdateRequest,
    ) -> Optional[CalendarEvent]:
        event = await self.get_event(db, organization_id, event_id)
        if not event:
            return None

        # Check valid times if both provided
        start = request.start_time or event.start_time
        end = request.end_time or event.end_time
        if start >= end:
            raise ValueError("Start time must be before end time.")

        updates = request.model_dump(exclude_unset=True)
        if "attendees" in updates:
            updates["attendees"] = (
                [a.model_dump() for a in request.attendees] if request.attendees else []
            )

        # If it has an external ID, update the provider
        if event.external_event_id:
            provider = self.provider_registry.resolve(event.provider)
            await provider.update_event(event.external_event_id, updates)

        for key, value in updates.items():
            setattr(event, key, value)

        db.add(event)
        await db.commit()
        await db.refresh(event)
        return event

    async def cancel_event(
        self, db: AsyncSession, organization_id: uuid.UUID, event_id: uuid.UUID
    ) -> bool:
        event = await self.get_event(db, organization_id, event_id)
        if not event:
            return False

        if event.external_event_id and event.status != "cancelled":
            provider = self.provider_registry.resolve(event.provider)
            await provider.cancel_event(event.external_event_id)

        event.status = "cancelled"
        db.add(event)
        await db.commit()
        return True
