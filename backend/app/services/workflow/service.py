import uuid
from typing import Optional, Dict, Any, List
from datetime import datetime, UTC
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc

from app.models.workflow import WorkflowExecution
from app.schemas.workflow import WorkflowExecuteRequest
from app.services.workflow.registry import WorkflowRegistry, TriggerRegistry
from app.services.workflow.executor import WorkflowExecutor


class WorkflowService:
    def __init__(
        self,
        workflow_registry: WorkflowRegistry,
        trigger_registry: TriggerRegistry,
        executor: WorkflowExecutor,
    ) -> None:
        self.workflow_registry = workflow_registry
        self.trigger_registry = trigger_registry
        self.executor = executor

    async def _execute_single_workflow(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        workflow_name: str,
        trigger_name: str,
        input_payload: Dict[str, Any],
    ) -> WorkflowExecution:
        # Create execution record
        execution = WorkflowExecution(
            organization_id=organization_id,
            workflow_name=workflow_name,
            trigger_name=trigger_name,
            status="running",
            input_payload=input_payload,
            started_at=datetime.now(UTC),
        )
        db.add(execution)
        await db.commit()
        await db.refresh(execution)

        try:
            # Get steps and execute
            steps = self.workflow_registry.get(workflow_name)
            output_payload = await self.executor.execute(steps, input_payload)

            # Update success state
            execution.status = "completed"
            execution.output_payload = output_payload

        except Exception as e:
            # Update failed state
            execution.status = "failed"
            execution.error_details = str(e)

        finally:
            execution.completed_at = datetime.now(UTC)
            db.add(execution)
            await db.commit()
            await db.refresh(execution)

        return execution

    async def execute_workflow(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        request: WorkflowExecuteRequest,
    ) -> WorkflowExecution:
        """Manually trigger a specific workflow."""
        return await self._execute_single_workflow(
            db,
            organization_id,
            request.workflow_name,
            request.trigger_name,
            request.input_payload,
        )

    async def trigger_event(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        trigger_name: str,
        payload: Dict[str, Any],
    ) -> List[WorkflowExecution]:
        """Trigger an event, executing all associated workflows."""
        workflow_names = self.trigger_registry.get_workflows_for_trigger(trigger_name)
        executions = []
        for workflow_name in workflow_names:
            execution = await self._execute_single_workflow(
                db, organization_id, workflow_name, trigger_name, payload
            )
            executions.append(execution)
        return executions

    async def get_execution(
        self, db: AsyncSession, organization_id: uuid.UUID, execution_id: uuid.UUID
    ) -> Optional[WorkflowExecution]:
        stmt = select(WorkflowExecution).where(
            WorkflowExecution.id == execution_id,
            WorkflowExecution.organization_id == organization_id,
        )
        result = await db.execute(stmt)
        return result.scalar_one_or_none()

    async def list_executions(
        self, db: AsyncSession, organization_id: uuid.UUID, limit: int = 100
    ) -> List[WorkflowExecution]:
        stmt = (
            select(WorkflowExecution)
            .where(WorkflowExecution.organization_id == organization_id)
            .order_by(desc(WorkflowExecution.started_at))
            .limit(limit)
        )
        result = await db.execute(stmt)
        return list(result.scalars().all())
