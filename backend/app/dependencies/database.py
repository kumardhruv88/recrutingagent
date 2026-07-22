from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import AsyncSession
from app.database.session import async_session_factory


async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency that yields an async database session.
    """
    async with async_session_factory() as session:
        yield session
