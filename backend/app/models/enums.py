from enum import Enum


class Role(str, Enum):
    OWNER = "owner"
    ADMIN = "admin"
    RECRUITER = "recruiter"
    HIRING_MANAGER = "hiring_manager"
    INTERVIEWER = "interviewer"
    VIEWER = "viewer"
    MEMBER = "member"  # Legacy or default fallback


class Permission(str, Enum):
    ORGANIZATION_READ = "organization.read"
    ORGANIZATION_UPDATE = "organization.update"
    ORGANIZATION_DELETE = "organization.delete"

    CANDIDATE_READ = "candidate.read"
    CANDIDATE_CREATE = "candidate.create"
    CANDIDATE_UPDATE = "candidate.update"
    CANDIDATE_DELETE = "candidate.delete"

    JOB_READ = "job.read"
    JOB_CREATE = "job.create"
    JOB_UPDATE = "job.update"
    JOB_DELETE = "job.delete"

    APPLICATION_READ = "application.read"
    APPLICATION_CREATE = "application.create"
    APPLICATION_UPDATE = "application.update"
    APPLICATION_DELETE = "application.delete"

    INTERVIEW_READ = "interview.read"
    INTERVIEW_CREATE = "interview.create"
    INTERVIEW_UPDATE = "interview.update"
    INTERVIEW_DELETE = "interview.delete"

    FUTURE_AI_USE = "future.ai.use"
    FUTURE_BILLING_MANAGE = "future.billing.manage"


class InvitationStatus(str, Enum):
    PENDING = "pending"
    ACCEPTED = "accepted"
    DECLINED = "declined"
    REVOKED = "revoked"


class CandidateStatus(str, Enum):
    NEW = "NEW"
    SCREENING = "SCREENING"
    INTERVIEWING = "INTERVIEWING"
    OFFER = "OFFER"
    HIRED = "HIRED"
    REJECTED = "REJECTED"


class JobStatus(str, Enum):
    DRAFT = "DRAFT"
    PUBLISHED = "PUBLISHED"
    CLOSED = "CLOSED"
    ARCHIVED = "ARCHIVED"


class ApplicationStatus(str, Enum):
    APPLIED = "APPLIED"
    REVIEWING = "REVIEWING"
    INTERVIEWING = "INTERVIEWING"
    REJECTED = "REJECTED"
    HIRED = "HIRED"


class ApplicationSource(str, Enum):
    DIRECT = "DIRECT"
    REFERRAL = "REFERRAL"
    LINKEDIN = "LINKEDIN"
    INDEED = "INDEED"
    AGENCY = "AGENCY"


class InterviewType(str, Enum):
    PHONE = "PHONE"
    VIDEO = "VIDEO"
    ONSITE = "ONSITE"
    TECHNICAL = "TECHNICAL"


class InterviewStatus(str, Enum):
    SCHEDULED = "SCHEDULED"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"


class EmploymentType(str, Enum):
    FULL_TIME = "FULL_TIME"
    PART_TIME = "PART_TIME"
    CONTRACT = "CONTRACT"
    FREELANCE = "FREELANCE"
    INTERNSHIP = "INTERNSHIP"
