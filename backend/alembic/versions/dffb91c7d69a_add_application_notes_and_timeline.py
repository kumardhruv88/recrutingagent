"""add application notes and timeline

Revision ID: dffb91c7d69a
Revises:
Create Date: 2026-07-22 14:08:12.593717

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "dffb91c7d69a"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # application_notes
    op.create_table(
        "application_notes",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("application_id", sa.UUID(), nullable=False),
        sa.Column("author_id", sa.UUID(), nullable=True),
        sa.Column("content", sa.Text(), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["application_id"], ["applications.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(["author_id"], ["users.id"], ondelete="SET NULL"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_application_notes_application_id"),
        "application_notes",
        ["application_id"],
        unique=False,
    )

    # application_timeline_events
    op.create_table(
        "application_timeline_events",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("application_id", sa.UUID(), nullable=False),
        sa.Column("event_type", sa.String(length=100), nullable=False),
        sa.Column("event_data", sa.JSON(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["application_id"], ["applications.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_application_timeline_events_application_id"),
        "application_timeline_events",
        ["application_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_application_timeline_events_event_type"),
        "application_timeline_events",
        ["event_type"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_application_timeline_events_event_type"),
        table_name="application_timeline_events",
    )
    op.drop_index(
        op.f("ix_application_timeline_events_application_id"),
        table_name="application_timeline_events",
    )
    op.drop_table("application_timeline_events")

    op.drop_index(
        op.f("ix_application_notes_application_id"), table_name="application_notes"
    )
    op.drop_table("application_notes")
