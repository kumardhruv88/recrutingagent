import pytest
from app.models.recruitment import Candidate, Job, Application, Interview, Resume, Skill, CandidateSkill

def test_models_importable() -> None:
    """
    Test that ensures all database models compile correctly in SQLAlchemy 
    and are importable without circular dependency issues.
    """
    assert Candidate.__tablename__ == "candidates"
    assert Job.__tablename__ == "jobs"
    assert Application.__tablename__ == "applications"
    assert Interview.__tablename__ == "interviews"
    assert Resume.__tablename__ == "resumes"
    assert Skill.__tablename__ == "skills"
    assert CandidateSkill.__tablename__ == "candidate_skills"
    
def test_candidate_relationships() -> None:
    # Ensures that fields exist on the model
    assert hasattr(Candidate, "applications")
    assert hasattr(Candidate, "resumes")
    assert hasattr(Candidate, "skills")
    
def test_job_relationships() -> None:
    assert hasattr(Job, "applications")
    assert hasattr(Job, "creator")

def test_application_relationships() -> None:
    assert hasattr(Application, "candidate")
    assert hasattr(Application, "job")
    assert hasattr(Application, "interviews")

def test_interview_relationships() -> None:
    assert hasattr(Interview, "application")
    assert hasattr(Interview, "interviewer")
