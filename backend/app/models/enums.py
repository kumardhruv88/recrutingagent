from enum import Enum


class Role(str, Enum):
    """
    Placeholder for organizational roles.
    Will be expanded in the RBAC module.
    """

    OWNER = "OWNER"
    ADMIN = "ADMIN"
    MEMBER = "MEMBER"


class Permission(str, Enum):
    """
    Placeholder for granular permissions.
    Will be expanded in the RBAC module.
    """

    MANAGE_USERS = "MANAGE_USERS"
    VIEW_CANDIDATES = "VIEW_CANDIDATES"


class InvitationStatus(str, Enum):
    PENDING = "PENDING"
    ACCEPTED = "ACCEPTED"
    EXPIRED = "EXPIRED"
    CANCELLED = "CANCELLED"


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
