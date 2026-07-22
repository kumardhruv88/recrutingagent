from typing import Optional, Any
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field
from app.models.enums import InterviewType, InterviewStatus


class InterviewCreateRequest(BaseModel):
    application_id: UUID
    interviewer_id: UUID
    scheduled_at: datetime
    interview_type: InterviewType


class InterviewRescheduleRequest(BaseModel):
    scheduled_at: datetime


class InterviewFeedbackRequest(BaseModel):
    feedback: str = Field(..., min_length=1)


class InterviewResponse(BaseModel):
    id: UUID
    application_id: UUID
    interviewer_id: Optional[UUID] = None
    scheduled_at: datetime
    interview_type: InterviewType
    status: InterviewStatus
    feedback: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
