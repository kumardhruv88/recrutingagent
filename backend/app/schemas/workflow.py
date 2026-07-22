from typing import Dict, Any, Optional
from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, ConfigDict, Field


class WorkflowExecuteRequest(BaseModel):
    workflow_name: str = Field(..., max_length=255)
    trigger_name: str = Field(default="manual", max_length=255)
    input_payload: Dict[str, Any] = Field(default_factory=dict)


class WorkflowExecutionResponse(BaseModel):
    id: UUID
    organization_id: UUID
    workflow_name: str
    trigger_name: str
    status: str
    input_payload: Optional[Dict[str, Any]] = None
    output_payload: Optional[Dict[str, Any]] = None
    error_details: Optional[str] = None
    started_at: datetime
    completed_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)
