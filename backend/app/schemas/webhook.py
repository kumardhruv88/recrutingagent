import uuid
from typing import Optional, Dict, Any, List
from datetime import datetime
from pydantic import BaseModel, ConfigDict


class WebhookEventResponse(BaseModel):
    id: uuid.UUID
    provider: str
    provider_event_id: str
    event_type: str
    payload: Dict[str, Any]
    headers: Optional[Dict[str, Any]] = None
    status: str
    error_details: Optional[str] = None
    processed_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
