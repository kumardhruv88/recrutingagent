# Product Requirements Document (PRD)

# PRD-06: Candidate ↔ Job Matching Engine

---

## Document Information

| Field | Value |
|--------|-------|
| Project | HireMind AI |
| Phase | 06 |
| Version | 1.0 |
| Status | Draft |
| Priority | Critical |
| Owner | AI Engineering Team |
| Dependencies | PRD-00 → PRD-05 |

---

# 1. Overview

The Candidate ↔ Job Matching Engine is the intelligence layer responsible for automatically identifying the most suitable candidates for a job and the most relevant jobs for a candidate.

Unlike traditional Applicant Tracking Systems that rely on keyword matching, HireMind AI performs semantic matching using embeddings, AI scoring, contextual understanding, transferable skills analysis, and explainable AI.

This engine serves both recruiters and candidates by providing personalized recommendations backed by transparent reasoning.

---

# 2. Objectives

The matching engine shall:

- Match candidates with jobs semantically
- Match jobs with candidates
- Rank recommendations
- Detect transferable skills
- Identify missing skills
- Explain every recommendation
- Learn recruiter preferences
- Support semantic search
- Continuously improve recommendations

---

# 3. Business Goals

The matching engine should:

- Reduce recruiter screening time
- Improve hiring quality
- Increase application success rate
- Reduce false positives
- Surface hidden talent
- Improve candidate engagement
- Improve recruiter confidence

---

# 4. Matching Workflow

Recruiter Creates Job

↓

Job Intelligence Engine

↓

Generate Job Embedding

↓

Vector Search

↓

Retrieve Top Candidate Embeddings

↓

Semantic Similarity Calculation

↓

AI Scoring

↓

Skill Gap Analysis

↓

Experience Evaluation

↓

Education Evaluation

↓

Project Relevance

↓

Generate Explainability

↓

Rank Candidates

↓

Recruiter Dashboard

---

Candidate Perspective

Resume

↓

Resume Intelligence

↓

Embedding

↓

Job Embeddings

↓

Semantic Search

↓

Recommended Jobs

↓

Candidate Dashboard

---

# 5. Inputs

## Candidate Data

- Resume Embedding
- Skills
- Experience
- Education
- Certifications
- Projects
- ATS Score
- Resume Quality
- Candidate Preferences
- Location
- Salary Expectations

---

## Job Data

- Job Description
- Required Skills
- Preferred Skills
- Responsibilities
- Experience Required
- Location
- Salary Range
- Employment Type
- Industry

---

# 6. AI Matching Components

## Semantic Similarity Engine

Purpose

Understand contextual similarity between resumes and jobs instead of exact keyword overlap.

Output

Similarity Score

0–100

---

## Skill Matching Engine

Detect

Required Skills

Preferred Skills

Optional Skills

Transferable Skills

Missing Skills

Skill Categories

---

## Experience Matching

Compare

Years of Experience

Role Similarity

Industry Similarity

Leadership Experience

Project Experience

Technology Experience

---

## Education Matching

Institution

Degree

Specialization

Graduation Year

Academic Performance

---

## Project Matching

Relevant Projects

Technology Stack

Project Complexity

Business Domain

Open Source Projects

Leadership

---

## Certification Matching

Relevant Certifications

Industry Certifications

Cloud Certifications

AI Certifications

Security Certifications

---

# 7. AI Scoring Model

Suggested Weight Distribution

Semantic Similarity ............35%

Technical Skills.................20%

Professional Experience..........15%

Projects.........................10%

ATS Compatibility................5%

Education........................5%

Certifications...................5%

Recruiter Preferences............5%

Final Score....................100%

---

# 8. Explainable AI

Every recommendation must explain:

Why candidate ranked highly

Relevant experience

Relevant projects

Matching technologies

Matching skills

Missing skills

Strengths

Weaknesses

Confidence score

Example

Candidate is recommended because:

• Strong semantic similarity (94%)

• 4 AI projects

• Experience with FastAPI

• Strong Python background

• Missing Docker experience

Hiring Confidence: High

---

# 9. Skill Gap Analysis

Compare

Candidate Skills

↓

Required Skills

↓

Preferred Skills

↓

Industry Benchmark

Generate

Missing Skills

Priority Ranking

Recommended Learning Path

Certification Suggestions

Estimated Readiness

---

# 10. Candidate Ranking

Support ranking by

Overall Match

AI Score

ATS Score

Experience

Education

Projects

GitHub Score

Interview Score

Assessment Score

Salary Expectation

Location

Availability

---

# 11. Job Recommendation Engine

Recommend jobs using

Resume Embedding

Career Goals

Skills

Experience

Projects

Application History

Recruiter Interest

Location Preference

Remote Preference

---

# 12. Candidate Recommendation Engine

Recommend candidates based on

Job Embedding

Historical Hiring

Recruiter Preferences

Semantic Similarity

Skill Coverage

Assessment Results

Interview Feedback

---

# 13. Recruiter Controls

Recruiters should configure

Minimum Match %

Mandatory Skills

Preferred Skills

Experience Range

Salary Budget

Location

Employment Type

Notice Period

Education Requirement

Remote Eligibility

---

# 14. Functional Requirements

FR-601

Generate candidate recommendations.

---

FR-602

Generate job recommendations.

---

FR-603

Calculate semantic similarity.

---

FR-604

Rank candidates.

---

FR-605

Rank jobs.

---

FR-606

Generate explainability.

---

FR-607

Detect missing skills.

---

FR-608

Recommend learning paths.

---

FR-609

Support recruiter filters.

---

FR-610

Support semantic search.

---

# 15. Backend APIs

POST /matching/jobs/{jobId}

GET /matching/jobs/{jobId}/candidates

GET /matching/candidates/{candidateId}/jobs

GET /matching/explanation/{matchId}

GET /matching/skill-gap/{matchId}

POST /matching/recalculate

GET /matching/history

---

# 16. Database Changes

Tables

candidate_job_matches

matching_scores

matching_explanations

skill_gap_analysis

job_recommendations

candidate_recommendations

matching_history

---

# 17. Search & Filtering

Support

Semantic Search

Keyword Search

Boolean Search

Natural Language Search

Advanced Filters

Saved Searches

---

# 18. Performance Requirements

Top 100 candidates

<2 sec

Recommendation Generation

<3 sec

Similarity Search

<500 ms

Search Results

<300 ms

---

# 19. Security

Organization Isolation

Permission Validation

Encrypted Matching Data

Audit Logging

Rate Limiting

GDPR-ready Data Handling

---

# 20. Error Handling

Job Not Found

Candidate Not Found

Embedding Missing

AI Timeout

Vector Search Failure

Recommendation Failure

Invalid Filters

---

# 21. Acceptance Criteria

✓ Semantic candidate matching works

✓ Job recommendations generated

✓ AI explanations displayed

✓ Skill gap analysis available

✓ Candidate ranking operational

✓ Recruiter filters functional

✓ Search performs within SLA

✓ Recommendation history stored

---

# 22. Out of Scope

GitHub Repository Analysis

Interview Scheduling

Coding Assessments

Voice Interviews

Recruiter AI Copilot

Analytics

---

# 23. Deliverables

- Candidate Matching Engine
- Job Recommendation Engine
- Candidate Recommendation Engine
- Semantic Search Service
- AI Ranking Engine
- Explainable AI Module
- Skill Gap Analyzer
- Matching APIs
- Matching Dashboard Components
- Recommendation History