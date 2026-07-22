from typing import Any, Callable, Awaitable, Generic, TypeVar
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.base import BaseRepository

RepoType = TypeVar("RepoType", bound=BaseRepository[Any])


class BaseService(Generic[RepoType]):
    """
    Base service containing repository access and transaction helpers.
    No validation logic should be placed here (it belongs in Pydantic schemas).
    """

    def __init__(self, repository: RepoType):
        self.repository = repository

    async def run_in_transaction(
        self,
        db: AsyncSession,
        func: Callable[..., Awaitable[Any]],
        *args: Any,
        **kwargs: Any
    ) -> Any:
        """
        Helper to run a function inside a transaction block.
        """
        async with db.begin():
            return await func(db, *args, **kwargs)
