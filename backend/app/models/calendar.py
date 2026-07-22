import uuid
from typing import List, Optional, Any
from datetime import datetime
from sqlalchemy import String, Text, DateTime, ForeignKey, Index
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.database.base import Base


class CalendarEvent(Base):
    __tablename__ = "calendar_events"

    id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), primary_key=True, default=uuid.uuid4
    )
    organization_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True),
        ForeignKey("organizations.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    organizer: Mapped[str] = mapped_column(String(255), nullable=False)
    attendees: Mapped[List[Any]] = mapped_column(JSONB, nullable=False, default=list)
    start_time: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), nullable=False
    )
    end_time: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    time_zone: Mapped[str] = mapped_column(String(100), nullable=False, default="UTC")
    provider: Mapped[str] = mapped_column(String(100), nullable=False)
    external_event_id: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="scheduled")

    __table_args__ = (
        Index("ix_calendar_events_org_id_start_time", "organization_id", "start_time"),
    )
