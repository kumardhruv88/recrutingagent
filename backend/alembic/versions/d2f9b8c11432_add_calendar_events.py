"""add calendar events

Revision ID: d2f9b8c11432
Revises: c1e8a9d01234
Create Date: 2026-07-22 15:50:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "d2f9b8c11432"
down_revision: Union[str, None] = "c1e8a9d01234"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "calendar_events",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("organization_id", sa.UUID(), nullable=False),
        sa.Column("title", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("organizer", sa.String(length=255), nullable=False),
        sa.Column("attendees", postgresql.JSONB(astext_type=sa.Text()), nullable=False),  # type: ignore
        sa.Column("start_time", sa.DateTime(timezone=True), nullable=False),
        sa.Column("end_time", sa.DateTime(timezone=True), nullable=False),
        sa.Column("time_zone", sa.String(length=100), nullable=False),
        sa.Column("provider", sa.String(length=100), nullable=False),
        sa.Column("external_event_id", sa.String(length=255), nullable=True),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.ForeignKeyConstraint(
            ["organization_id"], ["organizations.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_calendar_events_organization_id"),
        "calendar_events",
        ["organization_id"],
        unique=False,
    )
    op.create_index(
        "ix_calendar_events_org_id_start_time",
        "calendar_events",
        ["organization_id", "start_time"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_calendar_events_org_id_start_time", table_name="calendar_events")
    op.drop_index(
        op.f("ix_calendar_events_organization_id"), table_name="calendar_events"
    )
    op.drop_table("calendar_events")
