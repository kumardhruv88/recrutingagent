from typing import Any
from app.schemas.ai import AITaskType

COPILOT_PROMPTS = {
    AITaskType.JOB_SUMMARY: (
        "You are an expert recruiter AI. Summarize the following job description "
        "and extract the core responsibilities, key skills required, and ideal candidate profile.\n\n"
        "Job Title: {title}\n"
        "Department: {department}\n"
        "Description: {description}\n\n"
        "Provide a concise summary:"
    ),
    AITaskType.CANDIDATE_COMPARISON: (
        "You are an expert recruiter AI. Compare the following candidates for the job '{job_title}'. "
        "Highlight their relative strengths, weaknesses, and rank them based on fit.\n\n"
        "Job Details:\n{job_description}\n\n"
        "Candidates Data:\n{candidates_data}\n\n"
        "Provide a structured comparison and your recommendation:"
    ),
    AITaskType.RECRUITER_QA: (
        "You are an expert recruiter AI assisting a human recruiter. "
        "Answer the recruiter's question using the provided context.\n\n"
        "Context (if any):\n{context}\n\n"
        "Question: {question}\n\n"
        "Answer:"
    ),
}


def register_copilot_prompts(registry: Any) -> None:
    for task_type, template in COPILOT_PROMPTS.items():
        registry.register(task_type, template)
