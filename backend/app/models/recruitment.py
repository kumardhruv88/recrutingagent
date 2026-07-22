import uuid
from typing import Optional, List, Dict, Any
from datetime import datetime
from sqlalchemy import (
    String,
    Boolean,
    ForeignKey,
    Integer,
    Text,
    UniqueConstraint,
    Enum as SAEnum,
    DateTime,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import JSONB
from pgvector.sqlalchemy import Vector

from app.database.base import Base
from app.database.mixins import UUIDMixin, TimestampMixin
from app.models.enums import (
    CandidateStatus,
    JobStatus,
    ApplicationStatus,
    ApplicationSource,
    InterviewType,
    InterviewStatus,
    EmploymentType,
)
from app.models.auth import Organization, User


class Candidate(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "candidates"

    organization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True
    )
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    email: Mapped[str] = mapped_column(String(255), index=True)
    phone: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    linkedin_url: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)
    github_url: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)
    portfolio_url: Mapped[Optional[str]] = mapped_column(String(1024), nullable=True)
    years_of_experience: Mapped[int] = mapped_column(Integer, default=0)
    current_company: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    current_role: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    status: Mapped[CandidateStatus] = mapped_column(
        SAEnum(CandidateStatus, name="candidatestatus_enum", native_enum=False),
        default=CandidateStatus.NEW,
        index=True,
    )

    __table_args__ = (
        UniqueConstraint("email", "organization_id", name="uq_candidate_email_org"),
    )

    organization: Mapped["Organization"] = relationship("Organization")
    applications: Mapped[List["Application"]] = relationship(
        "Application", back_populates="candidate", cascade="all, delete-orphan"
    )
    resumes: Mapped[List["Resume"]] = relationship(
        "Resume", back_populates="candidate", cascade="all, delete-orphan"
    )
    skills: Mapped[List["CandidateSkill"]] = relationship(
        "CandidateSkill", back_populates="candidate", cascade="all, delete-orphan"
    )


class Job(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "jobs"

    organization_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("organizations.id", ondelete="CASCADE"), index=True
    )
    created_by: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    title: Mapped[str] = mapped_column(String(255))
    description: Mapped[str] = mapped_column(Text)
    department: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    location: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    employment_type: Mapped[EmploymentType] = mapped_column(
        SAEnum(EmploymentType, name="employmenttype_enum", native_enum=False)
    )
    experience_level: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    salary_min: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    salary_max: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    status: Mapped[JobStatus] = mapped_column(
        SAEnum(JobStatus, name="jobstatus_enum", native_enum=False),
        default=JobStatus.DRAFT,
        index=True,
    )

    __table_args__ = (
        UniqueConstraint("title", "organization_id", name="uq_job_title_org"),
    )

    organization: Mapped["Organization"] = relationship("Organization")
    creator: Mapped["User"] = relationship("User")
    applications: Mapped[List["Application"]] = relationship(
        "Application", back_populates="job", cascade="all, delete-orphan"
    )


class Application(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "applications"

    candidate_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("candidates.id", ondelete="CASCADE"), index=True
    )
    job_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("jobs.id", ondelete="CASCADE"), index=True
    )
    status: Mapped[ApplicationStatus] = mapped_column(
        SAEnum(ApplicationStatus, name="applicationstatus_enum", native_enum=False),
        default=ApplicationStatus.APPLIED,
        index=True,
    )
    source: Mapped[ApplicationSource] = mapped_column(
        SAEnum(ApplicationSource, name="applicationsource_enum", native_enum=False),
        default=ApplicationSource.DIRECT,
    )
    applied_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    current_stage: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    __table_args__ = (
        UniqueConstraint("candidate_id", "job_id", name="uq_application_candidate_job"),
    )

    candidate: Mapped["Candidate"] = relationship(
        "Candidate", back_populates="applications"
    )
    job: Mapped["Job"] = relationship("Job", back_populates="applications")
    interviews: Mapped[List["Interview"]] = relationship(
        "Interview", back_populates="application", cascade="all, delete-orphan"
    )
    notes: Mapped[List["ApplicationNote"]] = relationship(
        "ApplicationNote", back_populates="application", cascade="all, delete-orphan"
    )
    timeline_events: Mapped[List["ApplicationTimelineEvent"]] = relationship(
        "ApplicationTimelineEvent",
        back_populates="application",
        cascade="all, delete-orphan",
    )


class Interview(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "interviews"

    application_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("applications.id", ondelete="CASCADE"), index=True
    )
    interviewer_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True, index=True
    )
    scheduled_at: Mapped[datetime] = mapped_column(DateTime)
    interview_type: Mapped[InterviewType] = mapped_column(
        SAEnum(InterviewType, name="interviewtype_enum", native_enum=False)
    )
    status: Mapped[InterviewStatus] = mapped_column(
        SAEnum(InterviewStatus, name="interviewstatus_enum", native_enum=False),
        default=InterviewStatus.SCHEDULED,
    )
    feedback: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    application: Mapped["Application"] = relationship(
        "Application", back_populates="interviews"
    )
    interviewer: Mapped["User"] = relationship("User")


class Resume(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "resumes"

    candidate_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("candidates.id", ondelete="CASCADE"), index=True
    )
    file_name: Mapped[str] = mapped_column(String(255))
    content_type: Mapped[str] = mapped_column(String(100), default="application/pdf")
    storage_path: Mapped[str] = mapped_column(String(1024))
    file_size: Mapped[int] = mapped_column(Integer)
    version: Mapped[int] = mapped_column(Integer, default=1)
    uploaded_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
    parsed: Mapped[bool] = mapped_column(Boolean, default=False)

    from sqlalchemy.types import JSON

    parsed_data: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)
    parser_metadata: Mapped[Optional[Dict[str, Any]]] = mapped_column(
        JSON, nullable=True
    )

    candidate: Mapped["Candidate"] = relationship("Candidate", back_populates="resumes")
    embedding: Mapped[Optional["ResumeEmbedding"]] = relationship(
        "ResumeEmbedding",
        back_populates="resume",
        uselist=False,
        cascade="all, delete-orphan",
    )


class ResumeEmbedding(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "resume_embeddings"

    resume_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("resumes.id", ondelete="CASCADE"), unique=True, index=True
    )
    embedding: Mapped[Any] = mapped_column(Vector(1536))

    resume: Mapped["Resume"] = relationship("Resume", back_populates="embedding")


class Skill(UUIDMixin, Base):
    __tablename__ = "skills"

    name: Mapped[str] = mapped_column(String(100), unique=True, index=True)
    category: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)

    candidate_skills: Mapped[List["CandidateSkill"]] = relationship(
        "CandidateSkill", back_populates="skill", cascade="all, delete-orphan"
    )


class CandidateSkill(Base):
    __tablename__ = "candidate_skills"

    candidate_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("candidates.id", ondelete="CASCADE"), primary_key=True
    )
    skill_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("skills.id", ondelete="CASCADE"), primary_key=True
    )
    proficiency: Mapped[Optional[int]] = mapped_column(
        Integer, nullable=True
    )  # 1-5 scale

    candidate: Mapped["Candidate"] = relationship("Candidate", back_populates="skills")
    skill: Mapped["Skill"] = relationship("Skill", back_populates="candidate_skills")


class ApplicationNote(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "application_notes"

    application_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("applications.id", ondelete="CASCADE"), index=True
    )
    author_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    content: Mapped[str] = mapped_column(Text)

    application: Mapped["Application"] = relationship(
        "Application", back_populates="notes"
    )
    author: Mapped["User"] = relationship("User")


class ApplicationTimelineEvent(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "application_timeline_events"

    application_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("applications.id", ondelete="CASCADE"), index=True
    )
    event_type: Mapped[str] = mapped_column(String(100), index=True)
    # Using JSON type for broad compatibility (SQLite/Postgres), wait actually JSON is supported in SQLAlchemy via sqlalchemy.types.JSON
    from sqlalchemy.types import JSON

    event_data: Mapped[Optional[Dict[str, Any]]] = mapped_column(JSON, nullable=True)

    application: Mapped["Application"] = relationship(
        "Application", back_populates="timeline_events"
    )
