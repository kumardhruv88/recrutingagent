import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission
from app.schemas.workflow import WorkflowExecuteRequest, WorkflowExecutionResponse
from app.services.workflow.registry import WorkflowRegistry, TriggerRegistry
from app.services.workflow.executor import WorkflowExecutor
from app.services.workflow.service import WorkflowService

router = APIRouter()

# Global registries for the application lifecycle
workflow_registry = WorkflowRegistry()
trigger_registry = TriggerRegistry()


def get_workflow_service() -> WorkflowService:
    executor = WorkflowExecutor()
    return WorkflowService(workflow_registry, trigger_registry, executor)


@router.post(
    "/execute",
    response_model=WorkflowExecutionResponse,
    status_code=status.HTTP_201_CREATED,
)
async def execute_workflow(
    request: WorkflowExecuteRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    workflow_service: WorkflowService = Depends(get_workflow_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Manually execute a specific workflow."""
    try:
        # Check if workflow exists in registry
        workflow_registry.get(request.workflow_name)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    execution = await workflow_service.execute_workflow(db, organization.id, request)
    return execution


@router.get("/history", response_model=List[WorkflowExecutionResponse])
async def get_execution_history(
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    workflow_service: WorkflowService = Depends(get_workflow_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get history of workflow executions for the organization."""
    return await workflow_service.list_executions(db, organization.id)


@router.get("/{execution_id}", response_model=WorkflowExecutionResponse)
async def get_execution_status(
    execution_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    workflow_service: WorkflowService = Depends(get_workflow_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get status of a specific workflow execution."""
    execution = await workflow_service.get_execution(db, organization.id, execution_id)
    if not execution:
        raise HTTPException(status_code=404, detail="Workflow execution not found")
    return execution
