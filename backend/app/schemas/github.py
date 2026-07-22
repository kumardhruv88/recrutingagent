from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Dict, Any
from datetime import datetime
from uuid import UUID


class GithubRepositoryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    profile_id: UUID
    name: str
    description: Optional[str] = None
    visibility: str
    primary_language: Optional[str] = None
    topics: Optional[List[str]] = None
    stars: int
    forks: int
    watchers: int
    open_issues: int
    size: int
    default_branch: Optional[str] = None
    last_updated: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime


class GithubProfileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    candidate_id: UUID
    username: str
    avatar_url: Optional[str] = None
    bio: Optional[str] = None
    company: Optional[str] = None
    location: Optional[str] = None
    website: Optional[str] = None
    followers: int
    following: int
    public_repos: int
    public_gists: int
    account_created_at: Optional[datetime] = None
    language_stats: Optional[Dict[str, Any]] = None
    created_at: datetime
    updated_at: datetime


class GithubProfileDetailResponse(GithubProfileResponse):
    repositories: List[GithubRepositoryResponse]


class GithubSyncRequest(BaseModel):
    candidate_id: UUID


class GithubSyncResponse(BaseModel):
    success: bool
    message: str
    profile: Optional[GithubProfileResponse] = None
