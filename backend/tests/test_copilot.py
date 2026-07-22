import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.recruitment import Candidate, Job, Resume
from app.schemas.ai import AITaskType, AIResponse
from app.schemas.copilot import CandidateComparisonRequest, RecruiterQARequest
from app.services.copilot.service import AICopilotService
from app.dependencies.auth import get_current_organization
from app.dependencies.database import get_db_session

test_user = User(id=uuid4(), clerk_user_id="user_123")
test_org = Organization(
    id=uuid4(),
    clerk_organization_id="org_123",
    name="Test Org",
    slug="test-org",
    is_active=True,
    created_at=datetime.now(UTC),
    updated_at=datetime.now(UTC),
)


async def mock_get_current_org() -> Any:
    return test_org


@pytest.fixture
def override_dependencies(monkeypatch: Any) -> Any:
    app.dependency_overrides[get_current_organization] = mock_get_current_org
    from app.services.authorization import authorization_service

    monkeypatch.setattr(authorization_service, "require_permissions", AsyncMock())

    async def mock_get_db_session() -> Any:
        session = MagicMock()
        session.execute = AsyncMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_candidate_summary() -> None:
    ai_orchestrator = MagicMock()
    mock_response = AIResponse(
        task=AITaskType.CANDIDATE_SUMMARY,
        provider="mock",
        model="mock",
        execution_time_ms=10,
        result="Great candidate.",
    )
    ai_orchestrator.execute_task = AsyncMock(return_value=mock_response)

    service = AICopilotService(ai_orchestrator)
    db_mock = MagicMock()

    candidate_mock = MagicMock()
    candidate = Candidate(
        id=uuid4(),
        organization_id=test_org.id,
        first_name="John",
        last_name="Doe",
        email="j@doe.com",
        phone="123",
    )
    candidate.skills = []
    candidate_mock.scalar_one_or_none.return_value = candidate
    db_mock.execute = AsyncMock(return_value=candidate_mock)

    summary = await service.get_candidate_summary(db_mock, test_org.id, candidate.id)
    assert summary.content == "Great candidate."
    ai_orchestrator.execute_task.assert_awaited_once()


def test_api_ask_question(override_dependencies: Any, monkeypatch: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_response = MagicMock(response="Mock answer", metadata={})
    mock_ask = AsyncMock(return_value=mock_response)
    monkeypatch.setattr(AICopilotService, "ask_question", mock_ask)

    client = TestClient(app)
    response = client.post(
        "/api/v1/copilot/ask", json={"question": "What are the strengths?"}
    )

    assert response.status_code == 200
    assert response.json()["response"] == "Mock answer"

    app.dependency_overrides.pop(require_authenticated_user, None)
