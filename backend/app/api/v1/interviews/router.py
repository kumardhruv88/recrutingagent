import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission
from app.schemas.interview import (
    InterviewCreateRequest,
    InterviewRescheduleRequest,
    InterviewFeedbackRequest,
    InterviewResponse,
)
from app.services.interviews import InterviewService
from app.services.calendar.service import CalendarService
from app.services.email.service import EmailService
from app.services.workflow.service import WorkflowService
from app.services.calendar.registry import CalendarProviderRegistry
from app.services.email.registry import EmailProviderRegistry, TemplateRegistry
from app.services.workflow.registry import WorkflowRegistry, TriggerRegistry
from app.services.workflow.executor import WorkflowExecutor

router = APIRouter()

# Singletons (In a real app, use a dependency injection framework like Dependency Injector)
calendar_provider_registry = CalendarProviderRegistry()
email_provider_registry = EmailProviderRegistry()
template_registry = TemplateRegistry()
workflow_registry = WorkflowRegistry()
trigger_registry = TriggerRegistry()
workflow_executor = WorkflowExecutor()


def get_interview_service() -> InterviewService:
    calendar_service = CalendarService(calendar_provider_registry)
    email_service = EmailService(email_provider_registry, template_registry)
    workflow_service = WorkflowService(
        workflow_registry, trigger_registry, workflow_executor
    )
    return InterviewService(calendar_service, email_service, workflow_service)


@router.post("", response_model=InterviewResponse, status_code=status.HTTP_201_CREATED)
async def schedule_interview(
    request: InterviewCreateRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    interview_service: InterviewService = Depends(get_interview_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Schedule a new interview."""
    try:
        return await interview_service.schedule_interview(db, organization.id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.get("", response_model=List[InterviewResponse])
async def list_interviews(
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    interview_service: InterviewService = Depends(get_interview_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """List interviews for the organization."""
    return await interview_service.list_interviews(db, organization.id)


@router.get("/{interview_id}", response_model=InterviewResponse)
async def get_interview(
    interview_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    interview_service: InterviewService = Depends(get_interview_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Get a specific interview."""
    interview = await interview_service.get_interview(db, organization.id, interview_id)
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found")
    return interview


@router.post("/{interview_id}/reschedule", response_model=InterviewResponse)
async def reschedule_interview(
    interview_id: uuid.UUID,
    request: InterviewRescheduleRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    interview_service: InterviewService = Depends(get_interview_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Reschedule an interview."""
    try:
        return await interview_service.reschedule_interview(
            db, organization.id, interview_id, request
        )
    except ValueError as e:
        if str(e) == "Interview not found":
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{interview_id}/cancel", response_model=InterviewResponse)
async def cancel_interview(
    interview_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    interview_service: InterviewService = Depends(get_interview_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Cancel an interview."""
    try:
        return await interview_service.cancel_interview(
            db, organization.id, interview_id
        )
    except ValueError as e:
        if str(e) == "Interview not found":
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/{interview_id}/feedback", response_model=InterviewResponse)
async def submit_feedback(
    interview_id: uuid.UUID,
    request: InterviewFeedbackRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    interview_service: InterviewService = Depends(get_interview_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_UPDATE)),
) -> Any:
    """Submit feedback for an interview."""
    try:
        return await interview_service.submit_feedback(
            db, organization.id, interview_id, request
        )
    except ValueError as e:
        if str(e) == "Interview not found":
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e))
