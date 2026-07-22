# Candidate Management

> Version: 1.0

---

# 1. Objective

Implement a production-ready Candidate Management module.

Candidates represent individuals applying for positions within an organization.

Every candidate belongs to exactly one organization.

This module is responsible only for candidate profile management.

AI-powered resume parsing and scoring will be implemented in later modules.

---

# 2. Scope

Included

- Candidate CRUD
- Candidate Search
- Candidate Filtering
- Candidate Pagination
- Candidate Status Updates
- Candidate Validation

Excluded

- Resume Parsing
- AI
- ATS
- Jobs
- Applications
- Interviews
- Email
- Calendar

---

# 3. Architecture

Request

↓

RBAC

↓

Candidate Router

↓

Candidate Service

↓

Candidate Repository

↓

Database

---

# 4. Repository

Create CandidateRepository.

Responsibilities:

- Create
- Update
- Delete
- Get by ID
- Get by Email
- Search
- Filter
- Pagination
- Exists

---

# 5. Service

Create CandidateService.

Responsibilities:

- Candidate creation
- Candidate update
- Status changes
- Duplicate validation
- Search orchestration
- Filtering orchestration

Business logic belongs here.

---

# 6. APIs

Implement:

GET /candidates

GET /candidates/{id}

POST /candidates

PATCH /candidates/{id}

DELETE /candidates/{id}

GET /candidates/search

---

# 7. Search

Support:

- Name
- Email
- Phone
- Current Company
- Current Role

---

# 8. Filtering

Support filtering by:

- Status
- Experience
- Location
- Skills (relationship only, no AI)
- Created Date

Filtering should be composable.

---

# 9. Pagination

Support:

- page
- page_size
- total
- total_pages

Use the shared pagination infrastructure.

---

# 10. Validation

Validate:

- Duplicate email within organization
- Required fields
- Phone format
- URL format
- Organization ownership

---

# 11. Security

Enforce:

- Authentication
- Organization isolation
- RBAC

Users must never access candidates from another organization.

---

# 12. Testing

Test:

- CRUD
- Search
- Filtering
- Pagination
- Validation
- RBAC
- Multi-tenancy

---

# 13. Acceptance Criteria

✓ CRUD complete

✓ Search complete

✓ Filtering complete

✓ Pagination complete

✓ Validation complete

✓ Tests pass

---

# 14. Deliverables

Candidate Repository

Candidate Service

Candidate APIs

Tests

Documentation

---

# 15. Next Module

07_Jobs.md