"""add github intelligence

Revision ID: f57f6ef67355
Revises: b7eb2fd91e66
Create Date: 2026-07-22 14:33:35.000000

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSONB

# revision identifiers, used by Alembic.
revision: str = "f57f6ef67355"
down_revision: Union[str, None] = "b7eb2fd91e66"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # create github_profiles table
    op.create_table(
        "github_profiles",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("candidate_id", sa.UUID(), nullable=False),
        sa.Column("username", sa.String(length=100), nullable=False),
        sa.Column("avatar_url", sa.String(length=1024), nullable=True),
        sa.Column("bio", sa.Text(), nullable=True),
        sa.Column("company", sa.String(length=255), nullable=True),
        sa.Column("location", sa.String(length=255), nullable=True),
        sa.Column("website", sa.String(length=1024), nullable=True),
        sa.Column("followers", sa.Integer(), server_default="0", nullable=False),
        sa.Column("following", sa.Integer(), server_default="0", nullable=False),
        sa.Column("public_repos", sa.Integer(), server_default="0", nullable=False),
        sa.Column("public_gists", sa.Integer(), server_default="0", nullable=False),
        sa.Column("account_created_at", sa.DateTime(), nullable=True),
        sa.Column("language_stats", JSONB(), nullable=True),  # type: ignore
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["candidate_id"], ["candidates.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_github_profiles_candidate_id"),
        "github_profiles",
        ["candidate_id"],
        unique=True,
    )

    # create github_repositories table
    op.create_table(
        "github_repositories",
        sa.Column("id", sa.UUID(), nullable=False),
        sa.Column("profile_id", sa.UUID(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("visibility", sa.String(length=50), nullable=False),
        sa.Column("primary_language", sa.String(length=100), nullable=True),
        sa.Column("topics", JSONB(), nullable=True),  # type: ignore
        sa.Column("stars", sa.Integer(), server_default="0", nullable=False),
        sa.Column("forks", sa.Integer(), server_default="0", nullable=False),
        sa.Column("watchers", sa.Integer(), server_default="0", nullable=False),
        sa.Column("open_issues", sa.Integer(), server_default="0", nullable=False),
        sa.Column("size", sa.Integer(), server_default="0", nullable=False),
        sa.Column("default_branch", sa.String(length=100), nullable=True),
        sa.Column("last_updated", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(
            ["profile_id"], ["github_profiles.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        op.f("ix_github_repositories_profile_id"),
        "github_repositories",
        ["profile_id"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index(
        op.f("ix_github_repositories_profile_id"), table_name="github_repositories"
    )
    op.drop_table("github_repositories")
    op.drop_index(op.f("ix_github_profiles_candidate_id"), table_name="github_profiles")
    op.drop_table("github_profiles")
