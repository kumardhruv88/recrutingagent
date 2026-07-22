from fastapi import APIRouter, Depends, Response
from typing import Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID

from app.dependencies.database import get_db_session
from app.dependencies.auth import (
    get_current_organization,
    require_permission,
)
from app.models.auth import Organization, User
from app.models.enums import Permission
from app.schemas.github import (
    GithubSyncRequest,
    GithubSyncResponse,
    GithubProfileResponse,
    GithubRepositoryResponse,
    GithubProfileDetailResponse,
)
from app.services.github import GithubService
from app.clients.github import MockGitHubClient

router = APIRouter()


def get_github_service() -> GithubService:
    # Inject MockGitHubClient for deterministic tests and safe defaults
    client = MockGitHubClient()
    return GithubService(client=client)


@router.post("/sync", response_model=GithubSyncResponse, status_code=201)
async def sync_github(
    request: GithubSyncRequest,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
    service: GithubService = Depends(get_github_service),
) -> Any:
    profile = await service.sync_candidate_github(db, org.id, request.candidate_id)
    return GithubSyncResponse(
        success=True,
        message="GitHub profile synced successfully.",
        profile=profile,  # type: ignore
    )


@router.post("/{candidate_id}/refresh", response_model=GithubSyncResponse)
async def refresh_github(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_UPDATE)),
    db: AsyncSession = Depends(get_db_session),
    service: GithubService = Depends(get_github_service),
) -> Any:
    profile = await service.sync_candidate_github(db, org.id, candidate_id)
    return GithubSyncResponse(
        success=True,
        message="GitHub profile refreshed successfully.",
        profile=profile,  # type: ignore
    )


@router.get("/{candidate_id}", response_model=GithubProfileResponse)
async def get_github_profile(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
    service: GithubService = Depends(get_github_service),
) -> Any:
    return await service.get_profile(db, org.id, candidate_id)


@router.get(
    "/{candidate_id}/repositories", response_model=List[GithubRepositoryResponse]
)
async def get_github_repositories(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_READ)),
    db: AsyncSession = Depends(get_db_session),
    service: GithubService = Depends(get_github_service),
) -> Any:
    return await service.get_repositories(db, org.id, candidate_id)


@router.delete("/{candidate_id}", status_code=204, response_class=Response)
async def delete_github_profile(
    candidate_id: UUID,
    org: Organization = Depends(get_current_organization),
    user: User = Depends(require_permission(Permission.CANDIDATE_DELETE)),
    db: AsyncSession = Depends(get_db_session),
    service: GithubService = Depends(get_github_service),
) -> None:
    await service.delete_profile(db, org.id, candidate_id)
