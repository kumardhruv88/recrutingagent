from enum import Enum
from pydantic import BaseModel
from typing import Any, Dict, Optional


class AITaskType(str, Enum):
    RESUME_PARSE = "resume_parse"
    GITHUB_SUMMARY = "github_summary"
    CANDIDATE_SUMMARY = "candidate_summary"
    INTERVIEW_QUESTIONS = "interview_questions"
    EMBEDDING_GENERATION = "embedding_generation"
    JOB_SUMMARY = "job_summary"
    CANDIDATE_COMPARISON = "candidate_comparison"
    RECRUITER_QA = "recruiter_qa"


class AIResponse(BaseModel):
    task: AITaskType
    provider: str
    model: str
    execution_time_ms: int
    input_tokens: Optional[int] = None
    output_tokens: Optional[int] = None
    result: Any
    metadata: Dict[str, Any] = {}
