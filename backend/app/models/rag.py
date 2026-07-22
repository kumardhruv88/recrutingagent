import uuid
from typing import Any, Dict, Optional
from sqlalchemy import String, ForeignKey, Text
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import JSONB
from pgvector.sqlalchemy import Vector

from app.database.base import Base
from app.database.mixins import UUIDMixin, TimestampMixin


class DocumentChunk(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "document_chunks"

    organization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True
    )
    document_id: Mapped[uuid.UUID] = mapped_column(index=True)
    document_type: Mapped[str] = mapped_column(String(50), index=True)
    text: Mapped[str] = mapped_column(Text)
    metadata_: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSONB, nullable=True)
    embedding: Mapped[Any] = mapped_column(Vector(1536))
