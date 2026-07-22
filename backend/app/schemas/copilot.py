from typing import List, Optional, Any, Dict
from uuid import UUID
from pydantic import BaseModel, Field


class SummaryResponse(BaseModel):
    content: str
    metadata: Dict[str, Any] = {}


class CandidateComparisonRequest(BaseModel):
    candidate_ids: List[UUID] = Field(
        ..., min_length=2, description="List of candidate IDs to compare"
    )
    job_id: UUID = Field(..., description="The job ID to compare against")


class RecruiterQARequest(BaseModel):
    question: str = Field(..., min_length=1, description="The recruiter's question")
    candidate_id: Optional[UUID] = Field(None, description="Optional context candidate")
    job_id: Optional[UUID] = Field(None, description="Optional context job")


class CopilotResponse(BaseModel):
    response: str
    metadata: Dict[str, Any] = {}
