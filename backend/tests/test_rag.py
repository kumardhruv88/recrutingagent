import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.schemas.rag import DocumentIndexRequest, SearchRequest, ContextBuilderRequest
from app.services.rag.chunking import ChunkingPipeline
from app.services.rag.service import RetrievalService
from app.services.rag.builder import ContextBuilder
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
        session.commit = AsyncMock()
        session.add = MagicMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


def test_chunking_pipeline() -> None:
    chunker = ChunkingPipeline(chunk_size=10, overlap=2)
    text = "Hello world! This is a test."
    chunks = chunker.chunk_text(text)
    assert len(chunks) > 1
    # Check if there's overlap or boundary logic
    assert "Hello" in chunks[0]


@pytest.mark.asyncio
async def test_retrieval_service_index() -> None:
    ai_orchestrator = MagicMock()
    mock_response = MagicMock()
    mock_response.metadata = {"embedding": [0.1] * 1536}
    ai_orchestrator.execute_task = AsyncMock(return_value=mock_response)

    chunker = ChunkingPipeline()
    service = RetrievalService(ai_orchestrator, chunker)

    db_mock = MagicMock()
    db_mock.execute = AsyncMock()
    db_mock.commit = AsyncMock()
    db_mock.add = MagicMock()

    req = DocumentIndexRequest(
        document_id=uuid4(),
        document_type="RESUME",
        text="Sample resume text",
        metadata=None,
    )
    await service.index_document(db_mock, test_org.id, req)

    assert db_mock.add.called
    assert db_mock.commit.called


def test_api_index(override_dependencies: Any, monkeypatch: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    mock_index = AsyncMock(return_value=None)
    monkeypatch.setattr(RetrievalService, "index_document", mock_index)

    client = TestClient(app)
    response = client.post(
        "/api/v1/rag/index",
        json={
            "document_id": str(uuid4()),
            "document_type": "RESUME",
            "text": "Some text",
        },
    )

    assert response.status_code == 201
    assert response.json()["status"] == "success"

    app.dependency_overrides.pop(require_authenticated_user, None)
