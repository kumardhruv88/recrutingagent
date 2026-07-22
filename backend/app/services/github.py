import uuid
from typing import Optional, List, Dict, Any
from datetime import datetime
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
import dateutil.parser

from app.models.recruitment import GithubProfile, GithubRepository, Candidate
from app.repositories.github import GithubProfileRepository, GithubRepositoryRepository
from app.repositories.candidates import CandidateRepository
from app.clients.github import GitHubClientProtocol


class GithubService:
    def __init__(self, client: GitHubClientProtocol) -> None:
        self.client = client
        self.profile_repo = GithubProfileRepository(GithubProfile)
        self.repo_repo = GithubRepositoryRepository(GithubRepository)
        self.candidate_repo = CandidateRepository(Candidate)

    async def _verify_candidate_ownership(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> Candidate:
        candidate = await self.candidate_repo.get_by_id_and_org(
            db, candidate_id, org_id
        )
        if not candidate:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Candidate not found or does not belong to your organization.",
            )
        return candidate

    def _extract_username(self, url: str) -> Optional[str]:
        if not url:
            return None
        # Basic extraction: https://github.com/username -> username
        parts = url.rstrip("/").split("/")
        if len(parts) > 0 and "github.com" in url:
            return parts[-1]
        return None

    def _calculate_language_stats(self, repos: List[Dict[str, Any]]) -> Dict[str, Any]:
        stats: Dict[str, int] = {}
        total = 0
        for repo in repos:
            lang = repo.get("language")
            if lang:
                stats[lang] = stats.get(lang, 0) + 1
                total += 1

        # Calculate percentages
        if total > 0:
            return {
                lang: round((count / total) * 100, 2) for lang, count in stats.items()
            }
        return {}

    async def sync_candidate_github(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> GithubProfile:
        candidate = await self._verify_candidate_ownership(db, org_id, candidate_id)
        if not candidate.github_url:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Candidate does not have a GitHub URL.",
            )

        username = self._extract_username(candidate.github_url)
        if not username:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid GitHub URL."
            )

        # Fetch data from GitHub via client
        try:
            gh_profile_data = await self.client.get_user_profile(username)
            gh_repos_data = await self.client.get_user_repositories(username)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"Failed to fetch data from GitHub: {str(e)}",
            )

        # Delete existing profile and repositories if they exist
        existing_profile = await self.profile_repo.get_by_candidate(db, candidate_id)
        if existing_profile:
            await self.profile_repo.delete(db, existing_profile.id)

        # Parse account created at
        created_at_str = gh_profile_data.get("created_at")
        account_created_at = None
        if created_at_str:
            try:
                account_created_at = dateutil.parser.isoparse(created_at_str).replace(
                    tzinfo=None
                )
            except ValueError:
                pass

        language_stats = self._calculate_language_stats(gh_repos_data)

        # Create Profile
        profile = await self.profile_repo.create(
            db,
            {
                "candidate_id": candidate_id,
                "username": gh_profile_data.get("login"),
                "avatar_url": gh_profile_data.get("avatar_url"),
                "bio": gh_profile_data.get("bio"),
                "company": gh_profile_data.get("company"),
                "location": gh_profile_data.get("location"),
                "website": gh_profile_data.get("blog"),
                "followers": gh_profile_data.get("followers", 0),
                "following": gh_profile_data.get("following", 0),
                "public_repos": gh_profile_data.get("public_repos", 0),
                "public_gists": gh_profile_data.get("public_gists", 0),
                "account_created_at": account_created_at,
                "language_stats": language_stats,
            },
        )

        # Create Repositories
        for repo_data in gh_repos_data:
            updated_at_str = repo_data.get("updated_at")
            last_updated = None
            if updated_at_str:
                try:
                    last_updated = dateutil.parser.isoparse(updated_at_str).replace(
                        tzinfo=None
                    )
                except ValueError:
                    pass

            await self.repo_repo.create(
                db,
                {
                    "profile_id": profile.id,
                    "name": repo_data.get("name"),
                    "description": repo_data.get("description"),
                    "visibility": repo_data.get("visibility", "public"),
                    "primary_language": repo_data.get("language"),
                    "topics": repo_data.get("topics", []),
                    "stars": repo_data.get("stargazers_count", 0),
                    "forks": repo_data.get("forks_count", 0),
                    "watchers": repo_data.get("watchers_count", 0),
                    "open_issues": repo_data.get("open_issues_count", 0),
                    "size": repo_data.get("size", 0),
                    "default_branch": repo_data.get("default_branch"),
                    "last_updated": last_updated,
                },
            )

        return profile

    async def get_profile(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> GithubProfile:
        await self._verify_candidate_ownership(db, org_id, candidate_id)
        profile = await self.profile_repo.get_by_candidate(db, candidate_id)
        if not profile:
            raise HTTPException(
                status_code=404, detail="GitHub profile not found for candidate"
            )
        return profile

    async def get_repositories(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> List[GithubRepository]:
        profile = await self.get_profile(db, org_id, candidate_id)
        return await self.repo_repo.get_by_profile(db, profile.id)

    async def delete_profile(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> None:
        profile = await self.get_profile(db, org_id, candidate_id)
        await self.profile_repo.delete(db, profile.id)
