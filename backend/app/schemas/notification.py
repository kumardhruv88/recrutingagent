import uuid
from datetime import datetime
from typing import Any, Dict, Optional
from pydantic import BaseModel, Field, ConfigDict


class SendNotificationRequest(BaseModel):
    recipient: str = Field(
        ..., description="Recipient email address, phone, or target identifier"
    )
    channel: str = Field(
        "email", description="Delivery channel (e.g., email, sms, push, in_app, slack)"
    )
    template_name: str = Field(
        ..., description="Template name to render (e.g., interview_invite)"
    )
    variables: Dict[str, Any] = Field(
        default_factory=dict, description="Variables for template rendering"
    )


class NotificationLogResponse(BaseModel):
    id: uuid.UUID
    organization_id: uuid.UUID
    recipient: str
    channel: str
    template_name: str
    variables: Optional[Dict[str, Any]] = None
    status: str
    provider_response: Optional[Dict[str, Any]] = None
    sent_at: Optional[datetime] = None
    error_details: Optional[str] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
