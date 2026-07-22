import uuid
from typing import Any, Dict, Optional
from datetime import datetime
from sqlalchemy import String, Text, DateTime, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB

from app.database.base import Base
from app.database.mixins import UUIDMixin, TimestampMixin


class WebhookEvent(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "webhook_events"

    provider: Mapped[str] = mapped_column(String(50), index=True)
    provider_event_id: Mapped[str] = mapped_column(String(255), index=True)
    event_type: Mapped[str] = mapped_column(String(100), index=True)

    payload: Mapped[Dict[str, Any]] = mapped_column(JSONB)
    headers: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB, nullable=True)

    status: Mapped[str] = mapped_column(String(50), default="PENDING", index=True)
    error_details: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    processed_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)

    __table_args__ = (
        UniqueConstraint("provider", "provider_event_id", name="uq_provider_event_id"),
    )
