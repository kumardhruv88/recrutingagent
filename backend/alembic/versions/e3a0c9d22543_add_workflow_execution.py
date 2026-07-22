"""add workflow execution

Revision ID: e3a0c9d22543
Revises: d2f9b8c11432
Create Date: 2026-07-22 16:02:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision: str = "e3a0c9d22543"
down_revision: Union[str, None] = "d2f9b8c11432"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "workflow_executions",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("organization_id", sa.UUID(), nullable=False),
        sa.Column("workflow_name", sa.String(length=255), nullable=False),
        sa.Column("trigger_name", sa.String(length=255), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column(
            "input_payload", postgresql.JSONB(astext_type=sa.Text()), nullable=True  # type: ignore
        ),
        sa.Column(
            "output_payload", postgresql.JSONB(astext_type=sa.Text()), nullable=True  # type: ignore
        ),
        sa.Column("error_details", sa.Text(), nullable=True),
        sa.Column("started_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.ForeignKeyConstraint(
            ["organization_id"], ["organizations.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_workflow_executions_organization_id"),
        "workflow_executions",
        ["organization_id"],
        unique=False,
    )
    op.create_index(
        "ix_workflow_executions_org_id_status",
        "workflow_executions",
        ["organization_id", "status"],
        unique=False,
    )
    op.create_index(
        "ix_workflow_executions_org_id_workflow_name",
        "workflow_executions",
        ["organization_id", "workflow_name"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_workflow_executions_org_id_workflow_name", table_name="workflow_executions"
    )
    op.drop_index(
        "ix_workflow_executions_org_id_status", table_name="workflow_executions"
    )
    op.drop_index(
        op.f("ix_workflow_executions_organization_id"), table_name="workflow_executions"
    )
    op.drop_table("workflow_executions")
