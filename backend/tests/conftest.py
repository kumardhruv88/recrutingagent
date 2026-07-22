from typing import AsyncGenerator, cast, Any
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture
async def client() -> AsyncGenerator[AsyncClient, None]:
    async with AsyncClient(
        transport=ASGITransport(app=cast(Any, app)), base_url="http://test"
    ) as ac:
        yield ac
