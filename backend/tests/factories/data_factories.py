import uuid
from datetime import datetime, UTC
from typing import Any, Dict, List, Optional
from faker import Faker

fake = Faker()


class UserFactory:
    @staticmethod
    def build(
        user_id: Optional[uuid.UUID] = None,
        clerk_user_id: Optional[str] = None,
        email: Optional[str] = None,
        first_name: Optional[str] = None,
        last_name: Optional[str] = None,
        role: str = "recruiter",
    ) -> Dict[str, Any]:
        return {
            "id": user_id or uuid.uuid4(),
            "clerk_user_id": clerk_user_id or f"user_{fake.hexify(text='^^^^^^^^')}",
            "email": email or fake.email(),
            "first_name": first_name or fake.first_name(),
            "last_name": last_name or fake.last_name(),
            "role": role,
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }


class OrganizationFactory:
    @staticmethod
    def build(
        org_id: Optional[uuid.UUID] = None,
        name: Optional[str] = None,
        slug: Optional[str] = None,
        is_active: bool = True,
    ) -> Dict[str, Any]:
        company_name = name or fake.company()
        return {
            "id": org_id or uuid.uuid4(),
            "clerk_organization_id": f"org_{fake.hexify(text='^^^^^^^^')}",
            "name": company_name,
            "slug": slug or company_name.lower().replace(" ", "-").replace(",", ""),
            "is_active": is_active,
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }


class CandidateFactory:
    @staticmethod
    def build(
        candidate_id: Optional[uuid.UUID] = None,
        organization_id: Optional[uuid.UUID] = None,
        skills: Optional[List[str]] = None,
    ) -> Dict[str, Any]:
        return {
            "id": candidate_id or uuid.uuid4(),
            "organization_id": organization_id or uuid.uuid4(),
            "first_name": fake.first_name(),
            "last_name": fake.last_name(),
            "email": fake.email(),
            "phone": fake.phone_number(),
            "skills": skills or ["Python", "FastAPI", "SQLAlchemy", "Docker"],
            "experience_years": fake.random_int(min=1, max=15),
            "summary": fake.paragraph(),
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }


class JobFactory:
    @staticmethod
    def build(
        job_id: Optional[uuid.UUID] = None,
        organization_id: Optional[uuid.UUID] = None,
        title: Optional[str] = None,
    ) -> Dict[str, Any]:
        return {
            "id": job_id or uuid.uuid4(),
            "organization_id": organization_id or uuid.uuid4(),
            "title": title or fake.job(),
            "department": fake.word().capitalize(),
            "location": fake.city(),
            "employment_type": "FULL_TIME",
            "status": "OPEN",
            "description": fake.text(),
            "requirements": ["Python 3.11+", "FastAPI", "PostgreSQL"],
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }


class InterviewFactory:
    @staticmethod
    def build(
        interview_id: Optional[uuid.UUID] = None,
        organization_id: Optional[uuid.UUID] = None,
        job_id: Optional[uuid.UUID] = None,
        candidate_id: Optional[uuid.UUID] = None,
    ) -> Dict[str, Any]:
        return {
            "id": interview_id or uuid.uuid4(),
            "organization_id": organization_id or uuid.uuid4(),
            "job_id": job_id or uuid.uuid4(),
            "candidate_id": candidate_id or uuid.uuid4(),
            "title": f"Interview: {fake.job()}",
            "status": "SCHEDULED",
            "scheduled_time": datetime.now(UTC),
            "created_at": datetime.now(UTC),
            "updated_at": datetime.now(UTC),
        }
