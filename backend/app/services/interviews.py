import uuid
from typing import Optional, List, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.models.recruitment import Interview, Application, Candidate
from app.models.auth import User
from app.models.enums import InterviewStatus
from app.schemas.interview import (
    InterviewCreateRequest,
    InterviewRescheduleRequest,
    InterviewFeedbackRequest,
)

from app.services.calendar.service import CalendarService
from app.schemas.calendar import EventCreateRequest, Attendee, EventUpdateRequest
from app.services.email.service import EmailService
from app.services.workflow.service import WorkflowService


class InterviewService:
    def __init__(
        self,
        calendar_service: CalendarService,
        email_service: EmailService,
        workflow_service: WorkflowService,
    ) -> None:
        self.calendar_service = calendar_service
        self.email_service = email_service
        self.workflow_service = workflow_service

    async def schedule_interview(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        request: InterviewCreateRequest,
    ) -> Interview:
        # Validate application
        stmt_app = (
            select(Application)
            .join(Candidate)
            .where(
                Application.id == request.application_id,
                Candidate.organization_id == organization_id,
            )
        )
        application = (await db.execute(stmt_app)).scalar_one_or_none()
        if not application:
            raise ValueError("Application not found")

        # Validate interviewer
        stmt_user = select(User).where(User.id == request.interviewer_id)
        interviewer = (await db.execute(stmt_user)).scalar_one_or_none()
        if not interviewer:
            raise ValueError("Interviewer not found")

        # Create Interview in DB
        interview = Interview(
            application_id=request.application_id,
            interviewer_id=request.interviewer_id,
            scheduled_at=request.scheduled_at,
            interview_type=request.interview_type,
            status=InterviewStatus.SCHEDULED,
        )
        db.add(interview)
        await db.commit()
        await db.refresh(interview)

        # Trigger workflow asynchronously or synchronously (we'll do synchronously)
        await self.workflow_service.trigger_event(
            db,
            organization_id,
            "interview_scheduled",
            {"interview_id": str(interview.id)},
        )

        return interview

    async def get_interview(
        self, db: AsyncSession, organization_id: uuid.UUID, interview_id: uuid.UUID
    ) -> Optional[Interview]:
        stmt = (
            select(Interview)
            .join(Application)
            .join(Candidate)
            .where(
                Interview.id == interview_id,
                Candidate.organization_id == organization_id,
            )
        )
        return (await db.execute(stmt)).scalar_one_or_none()

    async def reschedule_interview(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        interview_id: uuid.UUID,
        request: InterviewRescheduleRequest,
    ) -> Interview:
        interview = await self.get_interview(db, organization_id, interview_id)
        if not interview:
            raise ValueError("Interview not found")

        if interview.status in [InterviewStatus.COMPLETED, InterviewStatus.CANCELLED]:
            raise ValueError(f"Cannot reschedule a {interview.status.value} interview")

        interview.scheduled_at = request.scheduled_at
        db.add(interview)
        await db.commit()
        await db.refresh(interview)

        await self.workflow_service.trigger_event(
            db,
            organization_id,
            "interview_rescheduled",
            {"interview_id": str(interview.id)},
        )

        return interview

    async def cancel_interview(
        self, db: AsyncSession, organization_id: uuid.UUID, interview_id: uuid.UUID
    ) -> Interview:
        interview = await self.get_interview(db, organization_id, interview_id)
        if not interview:
            raise ValueError("Interview not found")

        if interview.status in [InterviewStatus.COMPLETED, InterviewStatus.CANCELLED]:
            raise ValueError(f"Cannot cancel a {interview.status.value} interview")

        interview.status = InterviewStatus.CANCELLED
        db.add(interview)
        await db.commit()
        await db.refresh(interview)

        await self.workflow_service.trigger_event(
            db,
            organization_id,
            "interview_cancelled",
            {"interview_id": str(interview.id)},
        )

        return interview

    async def submit_feedback(
        self,
        db: AsyncSession,
        organization_id: uuid.UUID,
        interview_id: uuid.UUID,
        request: InterviewFeedbackRequest,
    ) -> Interview:
        interview = await self.get_interview(db, organization_id, interview_id)
        if not interview:
            raise ValueError("Interview not found")

        if interview.status == InterviewStatus.CANCELLED:
            raise ValueError("Cannot submit feedback for a cancelled interview")

        if interview.feedback:
            raise ValueError("Feedback already submitted")

        interview.feedback = request.feedback
        interview.status = InterviewStatus.COMPLETED
        db.add(interview)
        await db.commit()
        await db.refresh(interview)

        await self.workflow_service.trigger_event(
            db,
            organization_id,
            "interview_feedback_submitted",
            {"interview_id": str(interview.id)},
        )
        return interview

    async def list_interviews(
        self, db: AsyncSession, organization_id: uuid.UUID, limit: int = 100
    ) -> List[Interview]:
        stmt = (
            select(Interview)
            .join(Application)
            .join(Candidate)
            .where(Candidate.organization_id == organization_id)
            .limit(limit)
        )
        return list((await db.execute(stmt)).scalars().all())
