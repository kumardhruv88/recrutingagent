# Product Requirements Document (PRD)

# PRD-04: Resume Intelligence Engine

---

## Document Information

| Field | Value |
|--------|-------|
| Project | HireMind AI |
| Phase | 04 |
| Version | 1.0 |
| Status | Draft |
| Priority | Critical |
| Dependencies | PRD-00, PRD-01, PRD-02, PRD-03 |

---

# 1. Overview

The Resume Intelligence Engine is the AI core of HireMind AI.

Its responsibility is to transform an unstructured resume into structured, searchable, explainable candidate intelligence.

Instead of simply storing PDFs, the system extracts knowledge, generates semantic embeddings, evaluates ATS compatibility, summarizes candidate profiles, detects strengths and weaknesses, and prepares data for intelligent candidate matching.

The engine should be scalable, explainable, and modular so additional AI models can be integrated without architectural changes.

---

# 2. Objectives

The engine should:

- Parse resumes automatically
- Extract structured information
- Generate semantic embeddings
- Calculate ATS compatibility
- Score candidate quality
- Generate resume summaries
- Detect missing skills
- Identify strengths
- Identify weaknesses
- Store searchable embeddings
- Support downstream AI modules

---

# 3. Business Value

Benefits include:

- Faster resume screening
- Reduced recruiter workload
- Explainable candidate evaluation
- Better candidate ranking
- Higher quality hiring decisions
- Improved recruiter productivity

---

# 4. AI Pipeline

Resume Upload

↓

File Validation

↓

OCR (if scanned)

↓

Text Extraction

↓

Cleaning & Normalization

↓

Section Detection

↓

Named Entity Recognition

↓

Skill Extraction

↓

Experience Extraction

↓

Education Extraction

↓

Project Extraction

↓

Certification Extraction

↓

Embedding Generation

↓

ATS Score

↓

Candidate Score

↓

Resume Summary

↓

Feedback Generation

↓

Store Results

---

# 5. Supported Resume Formats

PDF

DOCX

TXT

Maximum Size

10 MB

Language

Initially English

Future:

Multilingual

---

# 6. Resume Parsing

The parser should extract:

Personal Information

Professional Summary

Education

Experience

Skills

Projects

Certifications

Achievements

Publications

Languages

Contact Details

GitHub

LinkedIn

Portfolio

---

# 7. Skill Extraction

Extract:

Programming Languages

Frameworks

Libraries

Cloud Platforms

Databases

DevOps

AI/ML Tools

Soft Skills

Domain Skills

Each skill should include:

- Name
- Confidence Score
- Category
- Frequency
- Context

---

# 8. Experience Extraction

Extract:

Company

Role

Start Date

End Date

Duration

Responsibilities

Technologies Used

Industry

Employment Type

---

# 9. Education Extraction

Institution

Degree

Branch

CGPA

Graduation Year

Coursework

---

# 10. Project Extraction

Project Name

Description

Tech Stack

GitHub Link

Live URL

Project Type

Role

Duration

---

# 11. Certification Extraction

Certification Name

Provider

Issue Date

Credential ID

Expiration Date

---

# 12. Resume Summary Generation

Generate:

Professional Summary

Experience Summary

Technical Summary

Career Highlights

Leadership Summary

Project Highlights

Strength Summary

Recruiter Snapshot

Maximum Length

250 words

---

# 13. ATS Compatibility Score

Calculate:

Formatting

Keywords

Experience

Education

Projects

Skills

Readability

Completeness

Overall Score

Output:

0–100

---

# 14. Candidate Quality Score

Weighted Scoring:

Experience

30%

Skills

25%

Projects

15%

Education

10%

Certifications

10%

Resume Quality

10%

Final Output

0–100

---

# 15. Missing Skills Detection

Compare against:

Job Description

Industry Benchmark

Similar Candidates

Generate:

Missing Skills

Recommended Skills

Priority Ranking

Learning Suggestions

---

# 16. Resume Feedback

Generate AI recommendations:

Formatting

Keyword Optimization

Project Improvements

Experience Improvements

Technical Improvements

Grammar Suggestions

ATS Improvements

---

# 17. Embedding Generation

Generate embeddings for:

Entire Resume

Skills

Experience

Projects

Education

Summary

Job Descriptions

Embedding Model

Sentence Transformers

Store in Vector Database

---

# 18. Vector Search

Support:

Semantic Resume Search

Skill Search

Project Search

Experience Search

Similar Candidate Search

Job Matching

---

# 19. Functional Requirements

FR-401

Upload resume.

---

FR-402

Parse resume.

---

FR-403

Extract structured information.

---

FR-404

Generate embeddings.

---

FR-405

Calculate ATS score.

---

FR-406

Generate resume summary.

---

FR-407

Generate AI feedback.

---

FR-408

Store parsed data.

---

FR-409

Store vectors.

---

FR-410

Support downstream APIs.

---

# 20. Backend APIs

POST /resume/upload

GET /resume/{id}

GET /resume/{id}/summary

GET /resume/{id}/ats

GET /resume/{id}/skills

GET /resume/{id}/experience

GET /resume/{id}/projects

GET /resume/{id}/feedback

GET /resume/{id}/embedding

---

# 21. Database Changes

Tables:

resumes

resume_sections

resume_skills

resume_projects

resume_experience

resume_education

resume_certifications

resume_feedback

resume_scores

embeddings

---

# 22. AI Services

Resume Parser

NER Service

Embedding Service

ATS Scoring Service

Summarization Service

Feedback Generator

Vector Search Service

---

# 23. Performance Requirements

Resume Upload

<5 sec

Resume Parsing

<10 sec

Embedding Generation

<5 sec

ATS Score

<3 sec

Search

<500 ms

---

# 24. Security

Virus Scan Uploads

Encrypted Storage

Role-Based Access

Signed File URLs

Audit Logging

PII Protection

---

# 25. Error Handling

Unsupported File

Corrupted Resume

OCR Failure

Embedding Failure

AI Timeout

Storage Failure

Retry Mechanism

---

# 26. Acceptance Criteria

✓ Resume uploads successfully

✓ Structured data extracted

✓ Skills extracted accurately

✓ Experience detected

✓ Education parsed

✓ ATS score generated

✓ Candidate score calculated

✓ Resume summary generated

✓ AI feedback available

✓ Embeddings stored

✓ Semantic search operational

---

# 27. Out of Scope

Candidate Matching

Recruiter Copilot

GitHub Analysis

Interview Scheduling

Analytics

Voice Interview

---

# 28. Deliverables

- Resume Upload Service
- Resume Parser
- OCR Pipeline
- Skill Extraction Engine
- Experience Extraction Engine
- Education Parser
- Project Extractor
- ATS Scoring Engine
- Candidate Scoring Engine
- Resume Summarizer
- AI Feedback Generator
- Embedding Generator
- Vector Search
- Resume Intelligence APIs