import pytest
from unittest.mock import AsyncMock, MagicMock
from uuid import uuid4
from datetime import datetime, UTC
from typing import Any, Dict

from fastapi.testclient import TestClient

from app.main import app
from app.models.auth import User, Organization
from app.models.workflow import WorkflowExecution
from app.services.workflow.registry import WorkflowRegistry, TriggerRegistry
from app.services.workflow.executor import WorkflowExecutor
from app.services.workflow.service import WorkflowService
from app.dependencies.auth import get_current_organization
from app.dependencies.database import get_db_session

# Mock data
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
        yield session

    app.dependency_overrides[get_db_session] = mock_get_db_session
    yield
    app.dependency_overrides.clear()


@pytest.mark.asyncio
async def test_workflow_execution() -> None:
    # 1. Setup Registries and Executor
    workflow_registry = WorkflowRegistry()
    trigger_registry = TriggerRegistry()
    executor = WorkflowExecutor()
    service = WorkflowService(workflow_registry, trigger_registry, executor)

    # 2. Define mock workflow steps
    async def step_one(ctx: Dict[str, Any]) -> Dict[str, Any]:
        ctx["step_one"] = "done"
        return ctx

    async def step_two(ctx: Dict[str, Any]) -> Dict[str, Any]:
        ctx["step_two"] = "done"
        return ctx

    # 3. Register Workflow
    workflow_registry.register("test_workflow", [step_one, step_two])
    trigger_registry.register("test_trigger", "test_workflow")

    db_mock = MagicMock()
    db_mock.commit = AsyncMock()
    db_mock.refresh = AsyncMock()

    # 4. Trigger event
    executions = await service.trigger_event(
        db=db_mock,
        organization_id=test_org.id,
        trigger_name="test_trigger",
        payload={"initial": "data"},
    )

    assert len(executions) == 1
    exec = executions[0]
    assert exec.workflow_name == "test_workflow"
    assert exec.trigger_name == "test_trigger"
    assert exec.status == "completed"
    assert exec.output_payload == {
        "initial": "data",
        "step_one": "done",
        "step_two": "done",
    }
    assert exec.completed_at is not None


def test_api_execute_workflow(override_dependencies: Any, monkeypatch: Any) -> None:
    from app.dependencies.auth import require_authenticated_user

    app.dependency_overrides[require_authenticated_user] = lambda: test_user

    # Mocking the service execution
    exec_response = WorkflowExecution(
        id=uuid4(),
        organization_id=test_org.id,
        workflow_name="test_workflow",
        trigger_name="manual",
        status="completed",
        input_payload={"test": "data"},
        output_payload={"test": "data", "result": "ok"},
        started_at=datetime.now(UTC),
        completed_at=datetime.now(UTC),
    )

    mock_execute = AsyncMock()
    mock_execute.return_value = exec_response
    monkeypatch.setattr(WorkflowService, "execute_workflow", mock_execute)

    # Register mock workflow in router's registry to bypass validation
    from app.api.v1.workflows.router import workflow_registry

    async def mock_step(ctx: Dict[str, Any]) -> Dict[str, Any]:
        return ctx

    workflow_registry.register("test_workflow", [mock_step])

    client = TestClient(app)
    response = client.post(
        "/api/v1/workflows/execute",
        json={
            "workflow_name": "test_workflow",
            "trigger_name": "manual",
            "input_payload": {"test": "data"},
        },
    )

    assert response.status_code == 201
    data = response.json()
    assert data["workflow_name"] == "test_workflow"
    assert data["status"] == "completed"
    assert data["output_payload"] == {"test": "data", "result": "ok"}

    app.dependency_overrides.pop(require_authenticated_user, None)
