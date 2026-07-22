from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Any, Dict
from datetime import datetime
from uuid import UUID

from app.models.enums import ApplicationStatus, ApplicationSource


class ApplicationNoteBase(BaseModel):
    content: str = Field(..., min_length=1)


class ApplicationNoteCreate(ApplicationNoteBase):
    pass


class ApplicationNoteResponse(ApplicationNoteBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    application_id: UUID
    author_id: Optional[UUID] = None
    created_at: datetime
    updated_at: datetime


class ApplicationTimelineEventResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    application_id: UUID
    event_type: str
    event_data: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime


class ApplicationStageUpdate(BaseModel):
    stage: str = Field(..., min_length=1, max_length=100)


class ApplicationBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    candidate_id: UUID
    job_id: UUID
    status: ApplicationStatus = ApplicationStatus.APPLIED
    source: ApplicationSource = ApplicationSource.DIRECT
    current_stage: Optional[str] = Field(None, max_length=100)


class ApplicationCreate(BaseModel):
    candidate_id: UUID
    job_id: UUID
    source: ApplicationSource = ApplicationSource.DIRECT


class ApplicationUpdate(BaseModel):
    status: Optional[ApplicationStatus] = None
    source: Optional[ApplicationSource] = None
    current_stage: Optional[str] = Field(None, max_length=100)


class ApplicationResponse(ApplicationBase):
    id: UUID
    applied_at: datetime
    created_at: datetime
    updated_at: datetime
