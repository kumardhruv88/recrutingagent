from pydantic import BaseModel, EmailStr, ConfigDict
from typing import Dict, Any, Optional
from datetime import datetime
from uuid import UUID


class EmailSendRequest(BaseModel):
    template_name: str
    recipient: EmailStr
    variables: Dict[str, Any] = {}


class EmailDeliveryResponse(BaseModel):
    success: bool
    message_id: Optional[str] = None
    provider: Optional[str] = None
    error: Optional[str] = None


class EmailDeliveryLogResponse(BaseModel):
    id: UUID
    organization_id: UUID
    message_id: str
    provider: str
    status: str
    recipient: str
    subject: str
    error_details: Optional[str] = None
    sent_at: datetime

    model_config = ConfigDict(from_attributes=True)
