# AI Copilot

> Version: 1.0

---

# 1. Objective

Implement a recruiter-facing AI Copilot.

The Copilot consumes existing services to help recruiters understand candidates, jobs, resumes, and applications.

It delegates all AI execution to the AI Orchestrator.

---

# 2. Scope

Included

- Candidate Summary
- Resume Summary
- GitHub Summary
- Job Summary
- Candidate Comparison
- Recruiter Q&A
- Prompt Templates

Excluded

- RAG
- Memory
- Voice Assistant
- Notifications

---

# 3. Architecture

Recruiter

↓

AI Copilot

↓

Business Services

↓

AI Orchestrator

↓

Provider

↓

Structured Response

---

# 4. Copilot Service

Responsibilities:

- Aggregate business data
- Build AI context
- Select prompt
- Call AI Orchestrator
- Return structured response

---

# 5. APIs

Implement:

POST /copilot/candidate-summary

POST /copilot/resume-summary

POST /copilot/github-summary

POST /copilot/job-summary

POST /copilot/compare-candidates

POST /copilot/ask

---

# 6. Prompt Templates

Create reusable prompts for:

- Candidate Summary
- Resume Summary
- GitHub Summary
- Job Summary
- Candidate Comparison
- Recruiter Assistant

Prompts should be externalized and versioned.

---

# 7. Candidate Comparison

Support comparing multiple candidates for a single job.

Aggregate:

- Resume data
- GitHub profile
- Experience
- Skills
- Applications

Return structured comparison.

Do not perform ATS scoring.

---

# 8. Recruiter Q&A

Allow recruiters to ask questions such as:

- Summarize this candidate.
- Highlight strengths.
- Highlight risks.
- Compare candidates.
- Explain resume gaps.

All responses must pass through the AI Orchestrator.

---

# 9. Validation

Validate:

- Candidate exists
- Job exists (when applicable)
- Organization ownership
- RBAC permissions

---

# 10. Security

Enforce:

- Authentication
- Organization isolation
- RBAC

Never expose data across organizations.

---

# 11. Testing

Test:

- Summary generation
- Candidate comparison
- Recruiter Q&A
- Prompt resolution
- RBAC
- Multi-tenancy

---

# 12. Acceptance Criteria

✓ Copilot complete

✓ Prompt templates complete

✓ Candidate comparison complete

✓ Recruiter Q&A complete

✓ Tests pass

---

# 13. Deliverables

AI Copilot

Prompt Templates

Copilot APIs

Tests

Documentation

---

# 14. Next Module

17_RAGArchitecture.md