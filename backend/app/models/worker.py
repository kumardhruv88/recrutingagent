import uuid
from typing import Any, Dict, Optional
from datetime import datetime
from sqlalchemy import String, ForeignKey, Text, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB

from app.database.base import Base
from app.database.mixins import UUIDMixin, TimestampMixin


class BackgroundJob(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "background_jobs"

    organization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True
    )
    task_name: Mapped[str] = mapped_column(String(255), index=True)
    payload: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB, nullable=True)

    status: Mapped[str] = mapped_column(String(50), default="PENDING", index=True)

    result: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    error: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    retry_count: Mapped[int] = mapped_column(Integer, default=0)
    max_retries: Mapped[int] = mapped_column(Integer, default=3)

    execute_after: Mapped[Optional[datetime]] = mapped_column(
        DateTime, nullable=True, index=True
    )
