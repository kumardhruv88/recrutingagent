# Database Architecture

> Version: 1.0

---

# 1. Objective

Design the production database architecture for HireMind AI.

This module defines all core entities, relationships, constraints, and indexes required by the recruitment platform.

No business logic or API endpoints should be implemented.

---

# 2. Scope

Included:

- SQLAlchemy models
- Entity relationships
- Foreign keys
- Constraints
- Indexes
- Alembic migrations

Excluded:

- CRUD
- Services
- APIs
- AI
- Resume Parsing
- GitHub
- Calendar
- Email

---

# 3. Core Entities

Authentication (already exists)

- User
- Organization
- Membership

Recruitment

- Candidate
- Job
- Application
- Interview
- Resume
- Skill
- CandidateSkill

---

# 4. Relationships

Organization

↓

Jobs

↓

Applications

↓

Candidate

↓

Resume

↓

Interviews

Candidate

↓

CandidateSkill

↓

Skill

Users create Jobs.

Organizations own Jobs.

Candidates apply to Jobs.

Applications connect Candidates and Jobs.

Interviews belong to Applications.

---

# 5. Candidate Model

Fields:

- id
- organization_id
- first_name
- last_name
- email
- phone
- location
- linkedin_url
- github_url
- portfolio_url
- years_of_experience
- current_company
- current_role
- status
- created_at
- updated_at

---

# 6. Job Model

Fields:

- id
- organization_id
- created_by
- title
- description
- department
- location
- employment_type
- experience_level
- salary_min
- salary_max
- status
- created_at
- updated_at

---

# 7. Application Model

Fields:

- id
- candidate_id
- job_id
- status
- source
- applied_at
- current_stage
- created_at
- updated_at

---

# 8. Interview Model

Fields:

- id
- application_id
- interviewer_id
- scheduled_at
- interview_type
- status
- feedback
- created_at
- updated_at

---

# 9. Resume Model

Fields:

- id
- candidate_id
- file_name
- storage_path
- file_size
- uploaded_at
- parsed
- created_at
- updated_at

---

# 10. Skill Model

Fields:

- id
- name
- category

---

# 11. CandidateSkill

Many-to-many mapping.

Fields:

- candidate_id
- skill_id
- proficiency

---

# 12. Constraints

Unique:

- Candidate email per organization
- Job title + organization
- Skill name

Foreign Keys:

- Candidate → Organization
- Job → Organization
- Job → User
- Application → Candidate
- Application → Job
- Interview → Application
- Resume → Candidate

---

# 13. Indexes

Create indexes for:

- email
- status
- organization_id
- job_id
- candidate_id
- created_at

Optimize for recruiter dashboards.

---

# 14. Migration Strategy

Use Alembic.

Single migration for all database entities.

Migration must be reversible.

---

# 15. Testing

Verify:

- Relationships
- Constraints
- Foreign keys
- Migrations

---

# 16. Acceptance Criteria

✓ Models complete

✓ Relationships validated

✓ Migration succeeds

✓ Tests pass

---

# 17. Next Module

04_Organizations.md