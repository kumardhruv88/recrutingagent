import uuid
from typing import Optional, List, Tuple, Any
from fastapi import HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.recruitment import (
    Application,
    ApplicationNote,
    ApplicationTimelineEvent,
    Candidate,
    Job,
)
from app.models.enums import ApplicationStatus
from app.repositories.applications import (
    ApplicationRepository,
    ApplicationNoteRepository,
    ApplicationTimelineRepository,
)
from app.repositories.candidates import CandidateRepository
from app.repositories.jobs import JobRepository
from app.schemas.application import (
    ApplicationCreate,
    ApplicationUpdate,
    ApplicationNoteCreate,
)

VALID_STAGES = [
    "Applied",
    "Screening",
    "Shortlisted",
    "Assessment",
    "Interview",
    "Offer",
    "Hired",
    "Rejected",
    "Withdrawn",
]


class ApplicationService:
    def __init__(self) -> None:
        self.app_repo = ApplicationRepository(Application)
        self.note_repo = ApplicationNoteRepository(ApplicationNote)
        self.timeline_repo = ApplicationTimelineRepository(ApplicationTimelineEvent)
        self.candidate_repo = CandidateRepository(Candidate)
        self.job_repo = JobRepository(Job)

    async def _verify_ownership(
        self, db: AsyncSession, org_id: uuid.UUID, app_id: uuid.UUID
    ) -> Application:
        # Check if the application exists and belongs to the org
        app_record = await self.app_repo.get_with_relations(db, app_id)
        if not app_record or app_record.job.organization_id != org_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="Application not found"
            )
        return app_record

    async def _add_timeline_event(
        self,
        db: AsyncSession,
        app_id: uuid.UUID,
        event_type: str,
        event_data: dict[str, Any],
    ) -> None:
        await self.timeline_repo.create(
            db,
            {
                "application_id": app_id,
                "event_type": event_type,
                "event_data": event_data,
            },
        )

    async def create_application(
        self, db: AsyncSession, org_id: uuid.UUID, data: ApplicationCreate
    ) -> Application:
        # Validate Candidate belongs to org
        candidate = await self.candidate_repo.get_by_id_and_org(
            db, data.candidate_id, org_id
        )
        if not candidate:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Candidate not found or does not belong to your organization.",
            )

        # Validate Job belongs to org
        job = await self.job_repo.get_by_id_and_org(db, data.job_id, org_id)
        if not job:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Job not found or does not belong to your organization.",
            )

        # Check Duplicate
        existing = await self.app_repo.get_by_candidate_and_job(
            db, data.candidate_id, data.job_id
        )
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Candidate has already applied to this job.",
            )

        create_data = data.model_dump()
        create_data["current_stage"] = "Applied"

        app_record = await self.app_repo.create(db, create_data)

        # Timeline
        await self._add_timeline_event(
            db,
            app_record.id,
            "APPLICATION_CREATED",
            {"candidate_id": str(candidate.id), "job_id": str(job.id)},
        )

        return app_record

    async def get_application(
        self, db: AsyncSession, org_id: uuid.UUID, app_id: uuid.UUID
    ) -> Application:
        return await self._verify_ownership(db, org_id, app_id)

    async def update_application(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        app_id: uuid.UUID,
        data: ApplicationUpdate,
    ) -> Application:
        app_record = await self._verify_ownership(db, org_id, app_id)

        update_data = data.model_dump(exclude_unset=True)
        if "current_stage" in update_data:
            stage = update_data["current_stage"]
            if stage not in VALID_STAGES:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid stage. Must be one of {VALID_STAGES}",
                )

            # Record timeline if changed
            if stage != app_record.current_stage:
                await self._add_timeline_event(
                    db,
                    app_id,
                    "STAGE_CHANGED",
                    {"old_stage": app_record.current_stage, "new_stage": stage},
                )

        if "status" in update_data and update_data["status"] != app_record.status:
            await self._add_timeline_event(
                db,
                app_id,
                "STATUS_CHANGED",
                {
                    "old_status": (
                        app_record.status.value if app_record.status else None
                    ),
                    "new_status": update_data["status"].value,
                },
            )

        return await self.app_repo.update(db, app_record, update_data)

    async def delete_application(
        self, db: AsyncSession, org_id: uuid.UUID, app_id: uuid.UUID
    ) -> None:
        app_record = await self._verify_ownership(db, org_id, app_id)
        await self.app_repo.delete(db, app_record.id)

    async def list_applications(
        self, db: AsyncSession, org_id: uuid.UUID, page: int = 1, size: int = 20
    ) -> Tuple[List[Application], int]:
        skip = (page - 1) * size
        return await self.app_repo.get_all_for_org(db, org_id, skip, size)

    async def add_note(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        app_id: uuid.UUID,
        user_id: uuid.UUID,
        data: ApplicationNoteCreate,
    ) -> ApplicationNote:
        app_record = await self._verify_ownership(db, org_id, app_id)

        note = await self.note_repo.create(
            db,
            {
                "application_id": app_record.id,
                "author_id": user_id,
                "content": data.content,
            },
        )

        await self._add_timeline_event(
            db,
            app_id,
            "NOTE_ADDED",
            {"note_id": str(note.id), "author_id": str(user_id)},
        )

        return note

    async def get_notes(
        self, db: AsyncSession, org_id: uuid.UUID, app_id: uuid.UUID
    ) -> List[ApplicationNote]:
        app_record = await self._verify_ownership(db, org_id, app_id)
        return await self.note_repo.get_by_application(db, app_record.id)

    async def get_timeline(
        self, db: AsyncSession, org_id: uuid.UUID, app_id: uuid.UUID
    ) -> List[ApplicationTimelineEvent]:
        app_record = await self._verify_ownership(db, org_id, app_id)
        return await self.timeline_repo.get_by_application(db, app_record.id)
