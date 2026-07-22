import json
import uuid
from typing import List, Optional, Any, Dict
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.models.recruitment import (
    Candidate,
    Job,
    Resume,
    Application,
    GithubProfile,
    GithubRepository,
)
from app.schemas.ai import AITaskType
from app.schemas.copilot import (
    SummaryResponse,
    CandidateComparisonRequest,
    RecruiterQARequest,
    CopilotResponse,
)
from app.services.ai.orchestrator import AIOrchestratorService


class AICopilotService:
    def __init__(self, ai_orchestrator: AIOrchestratorService) -> None:
        self.ai_orchestrator = ai_orchestrator

    async def get_candidate_summary(
        self, db: AsyncSession, organization_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> SummaryResponse:
        stmt = (
            select(Candidate)
            .options(selectinload(Candidate.skills))
            .where(
                Candidate.id == candidate_id,
                Candidate.organization_id == organization_id,
            )
        )
        candidate = (await db.execute(stmt)).scalar_one_or_none()
        if not candidate:
            raise ValueError("Candidate not found")

        skills = [s.skill.name for s in candidate.skills]
        context = f"Name: {candidate.first_name} {candidate.last_name}\nEmail: {candidate.email}\nPhone: {candidate.phone}\nSkills: {', '.join(skills)}"

        response = await self.ai_orchestrator.execute_task(
            AITaskType.CANDIDATE_SUMMARY, {"text": context}
        )
        return SummaryResponse(content=response.result, metadata=response.metadata)

    async def get_resume_summary(
        self, db: AsyncSession, organization_id: uuid.UUID, resume_id: uuid.UUID
    ) -> SummaryResponse:
        stmt = (
            select(Resume)
            .join(Candidate)
            .where(Resume.id == resume_id, Candidate.organization_id == organization_id)
        )
        resume = (await db.execute(stmt)).scalar_one_or_none()
        if not resume:
            raise ValueError("Resume not found")

        context = ""
        if resume.parsed_data:
            context = json.dumps(resume.parsed_data)
        else:
            context = f"Resume filename: {resume.file_name}. (Unparsed)"

        response = await self.ai_orchestrator.execute_task(
            AITaskType.RESUME_PARSE, {"text": context}
        )
        return SummaryResponse(content=response.result, metadata=response.metadata)

    async def get_github_summary(
        self, db: AsyncSession, organization_id: uuid.UUID, github_id: uuid.UUID
    ) -> SummaryResponse:
        stmt = (
            select(GithubProfile)
            .options(selectinload(GithubProfile.repositories))
            .join(Candidate)
            .where(
                GithubProfile.id == github_id,
                Candidate.organization_id == organization_id,
            )
        )
        profile = (await db.execute(stmt)).scalar_one_or_none()
        if not profile:
            raise ValueError("GitHub profile not found")

        repos = [
            f"{r.name} ({r.primary_language}): {r.description}"
            for r in profile.repositories
        ]
        context = (
            f"GitHub User: {profile.username}\nFollowers: {profile.followers}\nRepos:\n"
            + "\n".join(repos)
        )

        response = await self.ai_orchestrator.execute_task(
            AITaskType.GITHUB_SUMMARY, {"text": context}
        )
        return SummaryResponse(content=response.result, metadata=response.metadata)

    async def get_job_summary(
        self, db: AsyncSession, organization_id: uuid.UUID, job_id: uuid.UUID
    ) -> SummaryResponse:
        stmt = select(Job).where(
            Job.id == job_id, Job.organization_id == organization_id
        )
        job = (await db.execute(stmt)).scalar_one_or_none()
        if not job:
            raise ValueError("Job not found")

        response = await self.ai_orchestrator.execute_task(
            AITaskType.JOB_SUMMARY,
            {
                "title": job.title,
                "department": job.department or "N/A",
                "description": job.description,
            },
        )
        return SummaryResponse(content=response.result, metadata=response.metadata)

    async def compare_candidates(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        request: CandidateComparisonRequest,
    ) -> CopilotResponse:
        stmt_job = select(Job).where(
            Job.id == request.job_id, Job.organization_id == organization_id
        )
        job = (await db.execute(stmt_job)).scalar_one_or_none()
        if not job:
            raise ValueError("Job not found")

        stmt_candidates = (
            select(Candidate)
            .options(selectinload(Candidate.skills))
            .where(
                Candidate.id.in_(request.candidate_ids),
                Candidate.organization_id == organization_id,
            )
        )
        candidates = (await db.execute(stmt_candidates)).scalars().all()

        if len(candidates) != len(request.candidate_ids):
            raise ValueError("One or more candidates not found or unauthorized")

        job_desc = f"Title: {job.title}\nDescription: {job.description}"
        candidates_data = ""
        for c in candidates:
            skills = ", ".join([s.skill.name for s in c.skills])
            candidates_data += f"- {c.first_name} {c.last_name}: Skills [{skills}]\n"

        response = await self.ai_orchestrator.execute_task(
            AITaskType.CANDIDATE_COMPARISON,
            {
                "job_title": job.title,
                "job_description": job_desc,
                "candidates_data": candidates_data,
            },
        )
        return CopilotResponse(response=response.result, metadata=response.metadata)

    async def ask_question(
        self, db: AsyncSession, organization_id: uuid.UUID, request: RecruiterQARequest
    ) -> CopilotResponse:
        context = ""
        if request.candidate_id:
            stmt_candidate = select(Candidate).where(
                Candidate.id == request.candidate_id,
                Candidate.organization_id == organization_id,
            )
            c = (await db.execute(stmt_candidate)).scalar_one_or_none()
            if c:
                context += f"Candidate: {c.first_name} {c.last_name}\n"

        if request.job_id:
            stmt_job = select(Job).where(
                Job.id == request.job_id, Job.organization_id == organization_id
            )
            j = (await db.execute(stmt_job)).scalar_one_or_none()
            if j:
                context += f"Job: {j.title}\n"

        if not context:
            context = "No specific context provided."

        response = await self.ai_orchestrator.execute_task(
            AITaskType.RECRUITER_QA, {"context": context, "question": request.question}
        )
        return CopilotResponse(response=response.result, metadata=response.metadata)
