from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional
from datetime import datetime
from uuid import UUID

from app.models.enums import Role, InvitationStatus


class OrganizationBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    name: str = Field(..., min_length=1, max_length=255)
    slug: str = Field(..., min_length=1, max_length=255)
    logo_url: Optional[str] = None


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    slug: Optional[str] = Field(None, min_length=1, max_length=255)
    logo_url: Optional[str] = None


class OrganizationResponse(OrganizationBase):
    id: UUID
    clerk_organization_id: str
    is_active: bool = True
    created_at: datetime
    updated_at: datetime


class InvitationCreate(BaseModel):
    email: EmailStr
    role: Role = Role.MEMBER


class InvitationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    clerk_invitation_id: str
    organization_id: UUID
    email: EmailStr
    role: Role
    status: InvitationStatus
    created_at: datetime
    updated_at: datetime


class SwitchOrganizationRequest(BaseModel):
    organization_id: str
