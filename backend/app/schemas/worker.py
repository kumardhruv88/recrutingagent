import uuid
from typing import Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class EnqueueJobRequest(BaseModel):
    task_name: str = Field(
        ..., description="The name of the registered task to execute."
    )
    payload: Optional[Dict[str, Any]] = Field(
        None, description="The JSON payload to pass to the task."
    )
    max_retries: int = Field(
        3, description="Maximum number of retries before moving to DLQ."
    )
    execute_after: Optional[datetime] = Field(
        None, description="Optional timestamp for delayed execution."
    )


class JobResponse(BaseModel):
    id: uuid.UUID
    task_name: str
    status: str
    result: Optional[Dict[str, Any]] = None
    error: Optional[str] = None
    retry_count: int
    execute_after: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
