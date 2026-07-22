import uuid
import os
from typing import List, Optional, Any
from fastapi import HTTPException, status, UploadFile
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.recruitment import Resume, Candidate, ResumeEmbedding
from app.repositories.resumes import ResumeRepository, ResumeEmbeddingRepository
from app.repositories.candidates import CandidateRepository
from app.schemas.resume import ParsedResumeData


# Mock Services for the Pipelines
class ResumeParserService:
    @staticmethod
    async def parse(file_path: str, original_filename: str) -> ParsedResumeData:
        # Mock parsed data
        return ParsedResumeData(
            name="Parsed Candidate",
            email="parsed@example.com",
            skills=["Python", "FastAPI", "SQLAlchemy", "PostgreSQL"],
            experience=[
                {
                    "role": "Software Engineer",
                    "company": "Tech Corp",
                    "years": "2020-2023",
                }
            ],
            education=[
                {"degree": "B.S. Computer Science", "university": "State University"}
            ],
        )


class EmbeddingService:
    @staticmethod
    async def embed_text(text: str) -> List[float]:
        # Return a mock 1536-dimensional vector for pgvector
        return [0.01] * 1536


class ResumeService:
    def __init__(self) -> None:
        self.resume_repo = ResumeRepository(Resume)
        self.embedding_repo = ResumeEmbeddingRepository(ResumeEmbedding)
        self.candidate_repo = CandidateRepository(Candidate)
        self.parser_service = ResumeParserService()
        self.embedding_service = EmbeddingService()

    async def _verify_candidate_ownership(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> Candidate:
        candidate = await self.candidate_repo.get_by_id_and_org(
            db, candidate_id, org_id
        )
        if not candidate:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Candidate not found or does not belong to your organization.",
            )
        return candidate

    async def upload_resume(
        self,
        db: AsyncSession,
        org_id: uuid.UUID,
        candidate_id: uuid.UUID,
        file: UploadFile,
    ) -> Resume:
        await self._verify_candidate_ownership(db, org_id, candidate_id)

        # 1. Validation
        allowed_types = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ]
        if file.content_type not in allowed_types:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Unsupported file type. Please upload a PDF or DOCX file.",
            )

        file_bytes = await file.read()
        file_size = len(file_bytes)
        if file_size > 10 * 1024 * 1024:  # 10MB
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="File too large. Max 10MB.",
            )

        # 2. Storage (Mocked path for now)
        storage_dir = f"/tmp/hiremind/resumes/{org_id}/{candidate_id}"
        os.makedirs(storage_dir, exist_ok=True)
        safe_filename = file.filename or "resume.pdf"
        storage_path = os.path.join(storage_dir, safe_filename)

        with open(storage_path, "wb") as f:
            f.write(file_bytes)

        # 3. Parsing Pipeline
        parsed_data = await self.parser_service.parse(storage_path, safe_filename)

        # 4. Save Resume Version
        next_version = await self.resume_repo.get_next_version(db, candidate_id)

        resume = await self.resume_repo.create(
            db,
            {
                "candidate_id": candidate_id,
                "file_name": safe_filename,
                "content_type": file.content_type,
                "storage_path": storage_path,
                "file_size": file_size,
                "version": next_version,
                "parsed": True,
                "parsed_data": parsed_data.model_dump(),
                "parser_metadata": {"model": "mock-parser-v1", "confidence": 0.95},
            },
        )

        # 5. Embedding Pipeline
        # Generate text representation for embedding
        text_to_embed = (
            f"{parsed_data.name} {parsed_data.email} {' '.join(parsed_data.skills)}"
        )
        vector = await self.embedding_service.embed_text(text_to_embed)

        await self.embedding_repo.create(
            db, {"resume_id": resume.id, "embedding": vector}
        )

        return resume

    async def get_latest_resume(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> Resume:
        await self._verify_candidate_ownership(db, org_id, candidate_id)
        resume = await self.resume_repo.get_latest(db, candidate_id)
        if not resume:
            raise HTTPException(status_code=404, detail="No resume found for candidate")
        return resume

    async def get_history(
        self, db: AsyncSession, org_id: uuid.UUID, candidate_id: uuid.UUID
    ) -> List[Resume]:
        await self._verify_candidate_ownership(db, org_id, candidate_id)
        return await self.resume_repo.get_history(db, candidate_id)

    async def get_resume(
        self, db: AsyncSession, org_id: uuid.UUID, resume_id: uuid.UUID
    ) -> Resume:
        resume = await self.resume_repo.get_by_id(db, resume_id)
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found")
        await self._verify_candidate_ownership(db, org_id, resume.candidate_id)
        return resume

    async def delete_resume(
        self, db: AsyncSession, org_id: uuid.UUID, resume_id: uuid.UUID
    ) -> None:
        resume = await self.get_resume(db, org_id, resume_id)
        await self.resume_repo.delete(db, resume.id)
