"""add email delivery logs

Revision ID: c1e8a9d01234
Revises: f57f6ef67355
Create Date: 2026-07-22 15:35:00.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = "c1e8a9d01234"
down_revision: Union[str, None] = "f57f6ef67355"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "email_delivery_logs",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("organization_id", sa.UUID(), nullable=False),
        sa.Column("message_id", sa.String(length=255), nullable=False),
        sa.Column("provider", sa.String(length=100), nullable=False),
        sa.Column("status", sa.String(length=50), nullable=False),
        sa.Column("recipient", sa.String(length=255), nullable=False),
        sa.Column("subject", sa.String(length=255), nullable=False),
        sa.Column("error_details", sa.Text(), nullable=True),
        sa.Column("sent_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["organization_id"], ["organizations.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_email_delivery_logs_organization_id"),
        "email_delivery_logs",
        ["organization_id"],
        unique=False,
    )
    op.create_index(
        op.f("ix_email_delivery_logs_recipient"),
        "email_delivery_logs",
        ["recipient"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_email_delivery_logs_recipient"), table_name="email_delivery_logs"
    )
    op.drop_index(
        op.f("ix_email_delivery_logs_organization_id"), table_name="email_delivery_logs"
    )
    op.drop_table("email_delivery_logs")
