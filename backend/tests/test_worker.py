import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any, Dict

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.worker import BackgroundJob
from app.schemas.worker import EnqueueJobRequest
from app.services.worker.provider import DatabaseQueueProvider
from app.services.worker.registry import TaskRegistry
from app.services.worker.service import BackgroundWorkerService
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
        session.refresh = AsyncMock()
        session.add = MagicMock()
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


async def dummy_task(payload: Dict[str, Any]) -> Dict[str, Any]:
    if payload.get("fail"):
        raise ValueError("Simulated failure")
    return {"status": "success"}


@pytest.mark.asyncio
async def test_worker_success() -> None:
    provider = DatabaseQueueProvider()
    registry = TaskRegistry()
    registry.register("dummy", dummy_task)

    service = BackgroundWorkerService(provider, registry)

    db_mock = MagicMock()
    job = BackgroundJob(
        id=uuid4(),
        organization_id=test_org.id,
        task_name="dummy",
        payload={"fail": False},
        max_retries=3,
        status="PENDING",
        retry_count=0,
    )

    # Mock pop
    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = job
    db_mock.execute = AsyncMock(return_value=mock_result)
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    processed = await service.process_next_job(db_mock, test_org.id)
    assert processed is not None
    assert processed.status == "COMPLETED"
    assert processed.result == {"status": "success"}


@pytest.mark.asyncio
async def test_worker_failure_and_dlq() -> None:
    provider = DatabaseQueueProvider()
    registry = TaskRegistry()
    registry.register("dummy", dummy_task)

    service = BackgroundWorkerService(provider, registry)
    db_mock = MagicMock()

    # First failure -> PENDING and retry count increments
    job = BackgroundJob(
        id=uuid4(),
        organization_id=test_org.id,
        task_name="dummy",
        payload={"fail": True},
        max_retries=2,
        status="PENDING",
        retry_count=0,
    )

    mock_result = MagicMock()
    mock_result.scalar_one_or_none.return_value = job
    db_mock.execute = AsyncMock(return_value=mock_result)
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    processed = await service.process_next_job(db_mock, test_org.id)
    assert processed is not None
    assert processed.status == "PENDING"
    assert processed.retry_count == 1
    assert processed.execute_after is not None

    # Second failure -> DLQ
    job.retry_count = 2
    processed2 = await service.process_next_job(db_mock, test_org.id)
    assert processed2 is not None
    assert processed2.status == "DLQ"


def test_api_enqueue(override_dependencies: Any, monkeypatch: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    job = BackgroundJob(
        id=uuid4(),
        organization_id=test_org.id,
        task_name="dummy",
        status="PENDING",
        retry_count=0,
        max_retries=3,
        created_at=datetime.now(UTC),
        updated_at=datetime.now(UTC),
    )

    mock_enqueue = AsyncMock(return_value=job)
    monkeypatch.setattr(BackgroundWorkerService, "enqueue", mock_enqueue)

    client = TestClient(app)
    response = client.post(
        "/api/v1/workers/jobs",
        json={"task_name": "dummy", "payload": {}, "max_retries": 3},
    )

    assert response.status_code == 201
    assert response.json()["status"] == "PENDING"

    app.dependency_overrides.pop(require_authenticated_user, None)
