"""add resume versioning and embeddings

Revision ID: b7eb2fd91e66
Revises: dffb91c7d69a
Create Date: 2026-07-22 14:16:31.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector


# revision identifiers, used by Alembic.
revision: str = "b7eb2fd91e66"
down_revision: Union[str, None] = "dffb91c7d69a"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Ensure vector extension is created
    op.execute("CREATE EXTENSION IF NOT EXISTS vector;")

    # Modify resumes table
    op.add_column(
        "resumes", sa.Column("content_type", sa.String(length=100), nullable=True)
    )
    op.add_column(
        "resumes",
        sa.Column("version", sa.Integer(), server_default="1", nullable=False),
    )
    op.add_column("resumes", sa.Column("parsed_data", sa.JSON(), nullable=True))
    op.add_column("resumes", sa.Column("parser_metadata", sa.JSON(), nullable=True))

    # create resume_embeddings table
    op.create_table(
        "resume_embeddings",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("resume_id", sa.UUID(), nullable=False),
        sa.Column("embedding", Vector(1536), nullable=False),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(["resume_id"], ["resumes.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_resume_embeddings_resume_id"),
        "resume_embeddings",
        ["resume_id"],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_resume_embeddings_resume_id"), table_name="resume_embeddings"
    )
    op.drop_table("resume_embeddings")
    op.drop_column("resumes", "parser_metadata")
    op.drop_column("resumes", "parsed_data")
    op.drop_column("resumes", "version")
    op.drop_column("resumes", "content_type")
