from typing import List, Optional, Any
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, EmailStr, Field


class Attendee(BaseModel):
    email: EmailStr
    name: Optional[str] = None
    status: Optional[str] = "needs_action"  # accepted, declined, needs_action


class EventBase(BaseModel):
    title: str = Field(..., max_length=255)
    description: Optional[str] = None
    organizer: EmailStr
    attendees: List[Attendee] = Field(default_factory=list)
    start_time: datetime
    end_time: datetime
    time_zone: str = Field(default="UTC")


class EventCreateRequest(EventBase):
    pass


class EventUpdateRequest(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    description: Optional[str] = None
    attendees: Optional[List[Attendee]] = None
    start_time: Optional[datetime] = None
    end_time: Optional[datetime] = None
    time_zone: Optional[str] = None
    status: Optional[str] = None


class EventResponse(EventBase):
    id: UUID
    organization_id: UUID
    provider: str
    external_event_id: Optional[str] = None
    status: str

    model_config = ConfigDict(from_attributes=True)
