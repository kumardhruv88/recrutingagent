from pydantic import BaseModel, EmailStr, Field, ConfigDict, AnyHttpUrl
from typing import Optional, List
from datetime import datetime
from uuid import UUID

from app.models.enums import CandidateStatus


class CandidateBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    first_name: str = Field(..., min_length=1, max_length=255)
    last_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=50)
    location: Optional[str] = Field(None, max_length=255)
    linkedin_url: Optional[AnyHttpUrl] = None
    github_url: Optional[AnyHttpUrl] = None
    portfolio_url: Optional[AnyHttpUrl] = None
    years_of_experience: int = Field(0, ge=0)
    current_company: Optional[str] = Field(None, max_length=255)
    current_role: Optional[str] = Field(None, max_length=255)
    status: CandidateStatus = CandidateStatus.NEW


class CandidateCreate(CandidateBase):
    pass


class CandidateUpdate(BaseModel):
    first_name: Optional[str] = Field(None, min_length=1, max_length=255)
    last_name: Optional[str] = Field(None, min_length=1, max_length=255)
    email: Optional[EmailStr] = None
    phone: Optional[str] = Field(None, max_length=50)
    location: Optional[str] = Field(None, max_length=255)
    linkedin_url: Optional[AnyHttpUrl] = None
    github_url: Optional[AnyHttpUrl] = None
    portfolio_url: Optional[AnyHttpUrl] = None
    years_of_experience: Optional[int] = Field(None, ge=0)
    current_company: Optional[str] = Field(None, max_length=255)
    current_role: Optional[str] = Field(None, max_length=255)
    status: Optional[CandidateStatus] = None


class CandidateResponse(CandidateBase):
    id: UUID
    organization_id: UUID
    created_at: datetime
    updated_at: datetime
