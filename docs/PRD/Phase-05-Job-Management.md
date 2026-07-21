# Product Requirements Document (PRD)

# PRD-05: AI Candidate Matching Engine

---

## Document Information

| Field | Value |
|--------|-------|
| Project | HireMind AI |
| Phase | 05 |
| Version | 1.0 |
| Status | Draft |
| Priority | Critical |
| Dependencies | PRD-00 → PRD-04 |

---

# 1. Overview

The Candidate Matching Engine is the intelligence layer of HireMind AI.

Instead of relying on keyword matching, the system performs semantic understanding between resumes and job descriptions using embeddings, AI scoring, and explainable reasoning.

The engine recommends the best candidates for every job while clearly explaining every recommendation.

---

# 2. Objectives

The engine shall:

- Match resumes to jobs semantically
- Rank candidates
- Explain every recommendation
- Detect skill gaps
- Identify transferable skills
- Recommend hidden talent
- Remove duplicate candidates
- Improve recruiter productivity

---

# 3. Business Value

Current ATS systems rely heavily on keyword matching.

HireMind AI should understand:

- Context
- Experience
- Skill similarity
- Career progression
- Domain expertise
- Project relevance

instead of simple keyword overlap.

---

# 4. Matching Pipeline

Job Description

↓

AI Parsing

↓

Job Embedding

↓

Vector Search

↓

Retrieve Top Candidates

↓

Semantic Similarity

↓

ATS Score

↓

Experience Score

↓

Skill Gap Analysis

↓

Candidate Quality Score

↓

Final Ranking

↓

AI Explanation

↓

Recruiter Dashboard

---

# 5. Inputs

Job Description

Resume Embeddings

Resume Metadata

Candidate Profile

Skills

Projects

Experience

Education

Certifications

GitHub Score

Interview Scores

Assessment Scores

---

# 6. Outputs

Top Candidates

Matching Percentage

Skill Match

Experience Match

Education Match

Project Match

Certification Match

AI Recommendation

Hiring Recommendation

Skill Gap Analysis

Candidate Summary

---

# 7. Matching Algorithm

Matching should consider:

Semantic Similarity

35%

Technical Skills

20%

Experience

15%

Projects

10%

Education

5%

Certifications

5%

ATS Score

5%

Recruiter Preferences

5%

Final Score

100%

---

# 8. AI Explanation

Every recommendation must explain:

Why candidate ranked high

Matching skills

Relevant experience

Relevant projects

Missing skills

Strengths

Weaknesses

Hiring confidence

Example

Candidate matched because:

- 92% semantic similarity
- Strong backend experience
- 3 relevant AI projects
- Python expertise
- Missing Docker experience

Confidence: High

---

# 9. Skill Gap Analysis

Compare:

Candidate Skills

↓

Required Skills

↓

Preferred Skills

↓

Industry Skills

Generate

Missing Skills

Nice-to-have Skills

Learning Suggestions

Priority Order

---

# 10. Similar Candidate Search

Recruiters should search:

"Find candidates similar to Alice"

Engine should retrieve

Top 20 semantically similar candidates

---

# 11. Job Recommendation

Candidates should receive

Recommended Jobs

Based on:

Resume

Skills

Experience

Projects

Previous Applications

Career Progression

---

# 12. Duplicate Detection

Detect:

Same Resume

Same Email

Near-identical Resume

Duplicate Candidates

Merged Candidate Profiles

---

# 13. Recruiter Filters

Experience

Location

Skills

Salary

Availability

Education

Company

Notice Period

Work Authorization

Remote Preference

AI Score

ATS Score

---

# 14. Functional Requirements

FR-501

Generate job embeddings.

---

FR-502

Generate semantic similarity.

---

FR-503

Rank candidates.

---

FR-504

Generate AI explanation.

---

FR-505

Detect skill gaps.

---

FR-506

Recommend candidates.

---

FR-507

Recommend jobs.

---

FR-508

Support recruiter filters.

---

FR-509

Detect duplicates.

---

FR-510

Support vector search.

---

# 15. Backend APIs

POST /matching/jobs/{id}

GET /matching/jobs/{id}/top

GET /matching/candidate/{id}

GET /matching/similar/{id}

GET /matching/explanation/{id}

GET /matching/recommendations

---

# 16. Database Changes

Tables

candidate_matches

job_embeddings

candidate_embeddings

matching_scores

matching_explanations

skill_gaps

recommendations

duplicate_candidates

---

# 17. AI Components

Embedding Service

Vector Database

Semantic Search

Similarity Engine

Ranking Engine

Recommendation Engine

Skill Gap Engine

Explainability Engine

---

# 18. Performance Requirements

Top 100 Matches

<2 sec

Similarity Search

<500 ms

Embedding Retrieval

<200 ms

Explanation

<3 sec

---

# 19. Security

Organization Isolation

Encrypted Embeddings

Audit Logging

Permission Validation

Search Rate Limiting

---

# 20. Error Handling

Embedding Missing

Job Not Found

Candidate Not Found

AI Timeout

Vector DB Failure

Similarity Failure

---

# 21. Acceptance Criteria

✓ Candidate ranking operational

✓ Semantic similarity generated

✓ AI explanations available

✓ Skill gaps detected

✓ Duplicate detection working

✓ Job recommendations generated

✓ Candidate recommendations generated

✓ Recruiter filters functional

✓ Vector search operational

---

# 22. Out of Scope

Interview Scheduling

Voice Interviews

Analytics

Billing

Notifications

---

# 23. Deliverables

- Candidate Matching Engine
- Semantic Search
- AI Ranking
- Explainability Module
- Skill Gap Analysis
- Recommendation Engine
- Duplicate Detection
- Job Recommendation Engine
- Candidate Recommendation Engine
- Vector Search APIs