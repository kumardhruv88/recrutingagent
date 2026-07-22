from typing import Protocol, Dict, Any, List
from datetime import datetime


class GitHubClientProtocol(Protocol):
    async def get_user_profile(self, username: str) -> Dict[str, Any]:
        """Fetch the public GitHub profile for a user."""
        ...

    async def get_user_repositories(self, username: str) -> List[Dict[str, Any]]:
        """Fetch the public repositories for a user."""
        ...


class MockGitHubClient:
    """A deterministic mock client for testing and local development without tokens."""

    async def get_user_profile(self, username: str) -> Dict[str, Any]:
        return {
            "login": username,
            "avatar_url": f"https://avatars.githubusercontent.com/{username}",
            "bio": "Software Engineer & Open Source Contributor",
            "company": "HireMind AI",
            "location": "San Francisco, CA",
            "blog": f"https://{username}.dev",
            "followers": 150,
            "following": 50,
            "public_repos": 15,
            "public_gists": 3,
            "created_at": "2018-01-01T00:00:00Z",
        }

    async def get_user_repositories(self, username: str) -> List[Dict[str, Any]]:
        return [
            {
                "name": "hiremind-core",
                "description": "Core backend services",
                "visibility": "public",
                "language": "Python",
                "topics": ["fastapi", "ai", "recruiting"],
                "stargazers_count": 42,
                "forks_count": 5,
                "watchers_count": 42,
                "open_issues_count": 2,
                "size": 1024,
                "default_branch": "main",
                "updated_at": "2023-12-01T12:00:00Z",
            },
            {
                "name": "react-components",
                "description": "Shared UI library",
                "visibility": "public",
                "language": "TypeScript",
                "topics": ["react", "ui"],
                "stargazers_count": 120,
                "forks_count": 15,
                "watchers_count": 120,
                "open_issues_count": 10,
                "size": 2048,
                "default_branch": "main",
                "updated_at": "2023-11-15T08:30:00Z",
            },
        ]


# A real HTTP client could be implemented here using httpx when needed.
