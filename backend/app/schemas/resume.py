from pydantic import BaseModel, ConfigDict, Field
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID


class ParsedResumeData(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    skills: List[str] = Field(default_factory=list)
    education: List[Dict[str, Any]] = Field(default_factory=list)
    experience: List[Dict[str, Any]] = Field(default_factory=list)
    projects: List[Dict[str, Any]] = Field(default_factory=list)
    certifications: List[str] = Field(default_factory=list)
    languages: List[str] = Field(default_factory=list)


class ResumeBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    candidate_id: UUID
    file_name: str
    content_type: str
    file_size: int
    version: int
    parsed: bool


class ResumeResponse(ResumeBase):
    id: UUID
    uploaded_at: datetime
    parsed_data: Optional[Dict[str, Any]] = None
    parser_metadata: Optional[Dict[str, Any]] = None


class ResumeUploadResponse(BaseModel):
    success: bool
    resume: ResumeResponse
    message: str


class ResumeHistoryResponse(BaseModel):
    candidate_id: UUID
    history: List[ResumeResponse]
