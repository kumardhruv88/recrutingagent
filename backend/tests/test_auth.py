import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
async def test_auth_me_unauthorized(client: AsyncClient) -> None:
    # No auth header provided
    response = await client.get("/api/v1/auth/me")
    assert response.status_code == 401
    data = response.json()
    assert data["success"] is False
    assert data["message"] == "Unauthorized"


@pytest.mark.asyncio
async def test_org_current_unauthorized(client: AsyncClient) -> None:
    # No auth header provided
    response = await client.get("/api/v1/organizations/current")
    assert response.status_code == 401
    data = response.json()
    assert data["success"] is False
    assert data["message"] == "Unauthorized"
