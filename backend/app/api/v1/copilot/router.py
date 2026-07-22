import uuid
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.dependencies.database import get_db_session
from app.dependencies.auth import get_current_organization, require_permission
from app.models.auth import Organization
from app.models.enums import Permission
from app.schemas.copilot import (
    SummaryResponse,
    CandidateComparisonRequest,
    RecruiterQARequest,
    CopilotResponse,
)
from app.services.copilot.service import AICopilotService
from app.services.ai.orchestrator import AIOrchestratorService
from app.services.ai.registry import ProviderRegistry, PromptRegistry
from app.services.ai.router import AITaskRouter
from app.services.copilot.prompts import register_copilot_prompts

router = APIRouter()

# Setup AI Orchestrator (In production, use DI)
provider_registry = ProviderRegistry()
prompt_registry = PromptRegistry()
register_copilot_prompts(prompt_registry)
ai_router = AITaskRouter()
ai_orchestrator = AIOrchestratorService(provider_registry, prompt_registry, ai_router)


def get_copilot_service() -> AICopilotService:
    return AICopilotService(ai_orchestrator)


@router.post("/candidates/{candidate_id}/summary", response_model=SummaryResponse)
async def get_candidate_summary(
    candidate_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    copilot_service: AICopilotService = Depends(get_copilot_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Generate an AI summary for a candidate."""
    try:
        return await copilot_service.get_candidate_summary(
            db, organization.id, candidate_id
        )
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/resumes/{resume_id}/summary", response_model=SummaryResponse)
async def get_resume_summary(
    resume_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    copilot_service: AICopilotService = Depends(get_copilot_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Generate an AI summary for a resume."""
    try:
        return await copilot_service.get_resume_summary(db, organization.id, resume_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/github/{github_id}/summary", response_model=SummaryResponse)
async def get_github_summary(
    github_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    copilot_service: AICopilotService = Depends(get_copilot_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Generate an AI summary for a GitHub profile."""
    try:
        return await copilot_service.get_github_summary(db, organization.id, github_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/jobs/{job_id}/summary", response_model=SummaryResponse)
async def get_job_summary(
    job_id: uuid.UUID,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    copilot_service: AICopilotService = Depends(get_copilot_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Generate an AI summary for a job."""
    try:
        return await copilot_service.get_job_summary(db, organization.id, job_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/compare-candidates", response_model=CopilotResponse)
async def compare_candidates(
    request: CandidateComparisonRequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    copilot_service: AICopilotService = Depends(get_copilot_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Compare multiple candidates against a job description."""
    try:
        return await copilot_service.compare_candidates(db, organization.id, request)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.post("/ask", response_model=CopilotResponse)
async def ask_question(
    request: RecruiterQARequest,
    organization: Organization = Depends(get_current_organization),
    db: AsyncSession = Depends(get_db_session),
    copilot_service: AICopilotService = Depends(get_copilot_service),
    _: Any = Depends(require_permission(Permission.ORGANIZATION_READ)),
) -> Any:
    """Ask the AI Copilot a question with optional context."""
    return await copilot_service.ask_question(db, organization.id, request)
