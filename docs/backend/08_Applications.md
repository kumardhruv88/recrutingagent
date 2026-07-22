# Application Management

> Version: 1.0

---

# 1. Objective

Implement production-ready Application Management.

Applications connect Candidates with Jobs and track the hiring lifecycle.

This module does not implement AI scoring, resume parsing, or interview scheduling.

---

# 2. Scope

Included

- Application CRUD
- Candidate ↔ Job linking
- Status Management
- Stage Management
- Timeline
- Internal Notes
- Validation

Excluded

- Resume Parsing
- AI Matching
- ATS
- Interviews
- Email
- Calendar

---

# 3. Architecture

Request

↓

RBAC

↓

Application Router

↓

Application Service

↓

Application Repository

↓

Database

---

# 4. Repository

Create ApplicationRepository.

Responsibilities:

- create
- update
- delete
- get_by_id
- list
- search
- paginate
- exists

---

# 5. Service

Create ApplicationService.

Responsibilities:

- Create application
- Update application
- Stage transitions
- Status transitions
- Timeline events
- Notes management
- Duplicate application validation

---

# 6. APIs

Implement:

GET /applications

GET /applications/{id}

POST /applications

PATCH /applications/{id}

DELETE /applications/{id}

POST /applications/{id}/notes

GET /applications/{id}/timeline

PATCH /applications/{id}/stage

---

# 7. Application Stages

Support configurable stages:

Applied

Screening

Shortlisted

Assessment

Interview

Offer

Hired

Rejected

Withdrawn

Validate legal stage transitions.

---

# 8. Timeline

Track every application event.

Examples:

Application Created

Stage Changed

Status Updated

Note Added

Future AI events will integrate here.

Timeline entries must be immutable.

---

# 9. Internal Notes

Support recruiter-only notes.

Each note should store:

- author
- timestamp
- content

Candidates must never access these notes.

---

# 10. Validation

Validate:

- Candidate exists
- Job exists
- Same organization
- Duplicate applications
- Valid stage transitions

---

# 11. Security

Enforce:

Authentication

Organization isolation

RBAC

Users cannot access applications outside their organization.

---

# 12. Testing

Test:

CRUD

Stage transitions

Timeline

Notes

Duplicate validation

RBAC

Multi-tenancy

---

# 13. Acceptance Criteria

✓ CRUD complete

✓ Timeline complete

✓ Notes complete

✓ Stage management complete

✓ Tests pass

---

# 14. Deliverables

Application Repository

Application Service

Application APIs

Timeline

Notes

Tests

Documentation

---

# 15. Next Module

09_ResumeIntelligence.md