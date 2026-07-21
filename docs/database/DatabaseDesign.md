# Database

<!-- TODO: Implementation details go here -->
# Database Design Document

# HireMind AI

Version: 1.0

Status: Draft

Owner: Engineering Team

---

# Table of Contents

1. Purpose
2. Database Overview
3. Database Philosophy
4. Design Principles
5. Technology Stack
6. Database Domains
7. Multi-Tenant Design
8. Naming Conventions
9. Primary Key Strategy
10. Audit Fields
11. Soft Delete Strategy
12. Relationships
13. Data Integrity
14. Indexing Strategy
15. JSON Usage
16. File Storage Strategy
17. Vector Storage Strategy
18. Migration Strategy

---

# 1. Purpose

This document defines the logical and physical database architecture for HireMind AI.

Its objectives are to:

- Define every database entity
- Standardize naming conventions
- Document relationships
- Describe indexing strategy
- Explain multi-tenancy
- Ensure consistency across backend development

This document acts as the single source of truth for database implementation.

---

# 2. Database Overview

HireMind AI uses PostgreSQL hosted on Supabase as its primary relational database.

The database stores:

- Organizations
- Users
- Candidates
- Recruiters
- Jobs
- Applications
- Resume Analysis
- GitHub Analysis
- Interviews
- Assessments
- Notifications
- Analytics
- AI Metadata

Uploaded files are stored in Supabase Storage.

Semantic vectors are stored inside PostgreSQL using the pgvector extension.

The architecture intentionally avoids multiple databases to simplify deployment and maintenance.

---

# 3. Database Philosophy

The database follows these principles:

## Single Source of Truth

Every business entity has one authoritative table.

Duplicate information should be avoided whenever possible.

---

## Relational First

Structured business data should be modeled using normalized relational tables.

JSON should only be used when schema flexibility is required.

---

## UUID Everywhere

Every business entity uses UUID as the primary key.

UUIDs prevent enumeration attacks and simplify distributed systems in the future.

---

## AI Metadata Separate from Business Data

AI-generated outputs such as summaries, embeddings, ATS scores, and recommendations are stored separately from raw business records.

This ensures that AI models can evolve without modifying core business tables.

---

## Extensibility

The schema should support future modules without requiring destructive redesigns.

Examples include:

- Billing
- Enterprise SSO
- Custom AI Models
- Marketplace Integrations

---

# 4. Design Principles

The schema follows these design principles.

### Consistency

Every table follows identical naming conventions.

---

### Simplicity

Avoid unnecessary joins and overly complex relationships.

---

### Security

Sensitive information should never be duplicated.

Passwords are never stored.

Authentication is handled by Clerk.

---

### Scalability

The schema should comfortably support:

- Thousands of organizations
- Millions of candidates
- Millions of resumes
- Millions of embeddings

without structural changes.

---

### Auditability

Every important record tracks:

- Creator
- Creation Time
- Last Modifier
- Last Update

---

# 5. Technology Stack

Database Engine

PostgreSQL

Provider

Supabase

ORM

SQLAlchemy

Migration Tool

Alembic

Validation

Pydantic

Authentication

Clerk

Vector Search

pgvector

Storage

Supabase Storage

---

# 6. Database Domains

The database is divided into logical domains.

Authentication

Organization

Recruiters

Candidates

Jobs

Applications

Resume Intelligence

Matching Engine

GitHub Intelligence

Interviews

Assessments

Notifications

Analytics

Audit Logs

Each domain owns its own tables.

Cross-domain references should occur only through foreign keys.

---

# 7. Multi-Tenant Design

HireMind AI is a multi-tenant SaaS platform.

Every recruiter belongs to one organization.

Every business entity belongs to one organization.

Example

Organization

↓

Jobs

↓

Candidates

↓

Applications

↓

Interviews

↓

Reports

↓

Analytics

Every query must include organization_id.

Example

SELECT *

FROM jobs

WHERE organization_id = :organization_id;

This guarantees complete tenant isolation.

---

# 8. Naming Conventions

## Table Names

Plural

snake_case

Examples

users

organizations

candidate_profiles

job_postings

interview_feedback

---

## Column Names

snake_case

Examples

first_name

created_at

organization_id

resume_score

---

## Foreign Keys

Always end with _id

Examples

user_id

candidate_id

job_id

organization_id

resume_id

---

## Boolean Fields

Prefix with

is_

has_

Examples

is_active

is_verified

has_github

---

## Timestamp Fields

created_at

updated_at

deleted_at

---

# 9. Primary Key Strategy

Every table uses

id UUID PRIMARY KEY

Generated using PostgreSQL

gen_random_uuid()

Advantages

Globally unique

Non-sequential

More secure

Future-proof

---

# 10. Audit Fields

Every business table contains

created_at

updated_at

created_by

updated_by

These fields improve traceability.

Example

created_by

references

users.id

---

# 11. Soft Delete Strategy

Business records should not be permanently deleted.

Instead

deleted_at

TIMESTAMP NULL

Active records

deleted_at IS NULL

Benefits

Data Recovery

Audit Trails

Analytics

Compliance

Some lookup tables may use hard deletes if appropriate.

---

# 12. Relationships

Relationships follow standard relational principles.

One-to-One

User

↓

Recruiter Profile

One-to-Many

Organization

↓

Jobs

One-to-Many

Job

↓

Applications

Many-to-Many

Candidate

↓

Skills

↓

Job Requirements

implemented using junction tables.

---

# 13. Data Integrity

Integrity is enforced using:

Primary Keys

Foreign Keys

Unique Constraints

Check Constraints

NOT NULL Constraints

Application-level validation complements database constraints but never replaces them.

---

# 14. Indexing Strategy

Indexes are created for:

Primary Keys

Foreign Keys

Email

Organization ID

Job Status

Candidate Status

Created Date

Embedding Search

Composite indexes are added only when justified by query patterns.

---

# 15. JSON Usage

JSON columns are reserved for flexible or evolving data.

Appropriate use cases include:

Resume parsing metadata

AI explanations

LLM prompt metadata

Model responses

Dynamic recruiter preferences

Structured business entities should not be stored entirely as JSON.

---

# 16. File Storage Strategy

Files are stored using Supabase Storage.

Examples

Resume PDFs

Cover Letters

Organization Logos

Certificates

Assessment Attachments

The database stores only metadata.

Example

storage_path

mime_type

file_size

uploaded_at

---

# 17. Vector Storage Strategy

Semantic embeddings are stored using pgvector.

Embedding dimensions depend on the selected model.

Objects stored as vectors include:

Resume Embeddings

Job Embeddings

Project Embeddings

Recruiter Search Queries

Interview Summaries

These vectors enable semantic search and AI-powered recommendations.

---

# 18. Migration Strategy

Schema changes are managed using Alembic.

Migration Rules

Never modify production tables manually.

Every schema change requires a migration.

Migrations must be reversible.

Destructive changes require data migration plans.

Development follows:

Model

↓

Migration

↓

Review

↓

Apply

↓

Test

This ensures database consistency across all environments.

---
---

# 19. Core Authentication & Organization Domain

The Authentication and Organization domain is the foundation of HireMind AI.

Authentication is delegated to Clerk, while PostgreSQL stores application-specific user information, organization membership, and roles.

This separation keeps authentication secure while allowing the application to maintain its own business logic.

Domain Tables:

- organizations
- users
- organization_members
- invitations

---

# 20. Entity Relationship

Organization

│

├──────────────┐

│              │

Users      Invitations

│

Organization Members

This domain enables:

- Multi-tenancy
- Role-Based Access Control
- Team Invitations
- Organization Isolation

---

# 21. organizations Table

Represents a company using HireMind AI.

Each company has one organization.

Example:

Google

Microsoft

OpenAI

Amazon

Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| name | VARCHAR(150) | Company name |
| slug | VARCHAR(120) | Unique organization URL |
| industry | VARCHAR(100) | Industry |
| company_size | VARCHAR(50) | Startup, SMB, Enterprise |
| website | TEXT | Company website |
| logo_url | TEXT | Organization logo |
| description | TEXT | About company |
| is_active | BOOLEAN | Active organization |
| created_at | TIMESTAMP | Created timestamp |
| updated_at | TIMESTAMP | Updated timestamp |

Constraints

Primary Key

id

Unique

slug

Indexes

slug

name

---

# SQLAlchemy Model

class Organization(Base):
    __tablename__ = "organizations"

    id = Column(UUID, primary_key=True)

    name = Column(String(150), nullable=False)

    slug = Column(String(120), unique=True)

    industry = Column(String(100))

    company_size = Column(String(50))

    website = Column(Text)

    logo_url = Column(Text)

    description = Column(Text)

    is_active = Column(Boolean, default=True)

    created_at = Column(DateTime)

    updated_at = Column(DateTime)

---

# 22. users Table

Authentication is managed by Clerk.

The users table stores only business-specific information.

Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Internal ID |
| clerk_user_id | VARCHAR | Clerk User ID |
| email | VARCHAR | Email |
| first_name | VARCHAR | First Name |
| last_name | VARCHAR | Last Name |
| profile_image | TEXT | Avatar |
| phone | VARCHAR | Phone |
| is_active | BOOLEAN | Active User |
| last_login | TIMESTAMP | Last Login |
| created_at | TIMESTAMP | Created |
| updated_at | TIMESTAMP | Updated |

Unique

clerk_user_id

email

Indexes

email

clerk_user_id

---

Example

User signs in

↓

Clerk

↓

JWT

↓

Backend

↓

Find clerk_user_id

↓

Return User

---

# SQLAlchemy Model

class User(Base):

    __tablename__="users"

    id = Column(UUID, primary_key=True)

    clerk_user_id = Column(String, unique=True)

    email = Column(String, unique=True)

    first_name = Column(String)

    last_name = Column(String)

    profile_image = Column(Text)

    phone = Column(String)

    is_active = Column(Boolean)

    last_login = Column(DateTime)

---

# 23. organization_members Table

A user can belong to multiple organizations.

Example

Dhruv

↓

OpenAI

↓

Recruiter

Dhruv

↓

Startup X

↓

Hiring Manager

Instead of storing organization_id inside users, membership is stored separately.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| organization_id | UUID FK |
| user_id | UUID FK |
| role | VARCHAR |
| joined_at | TIMESTAMP |
| invited_by | UUID FK |
| is_active | BOOLEAN |

Unique Constraint

organization_id

+

user_id

No duplicate memberships.

Indexes

organization_id

user_id

role

---

Relationship

Organization

↓

Organization Members

↓

Users

---

# SQLAlchemy Model

class OrganizationMember(Base):

    __tablename__="organization_members"

    id = Column(UUID, primary_key=True)

    organization_id = Column(UUID,
        ForeignKey("organizations.id"))

    user_id = Column(UUID,
        ForeignKey("users.id"))

    role = Column(String(50))

    joined_at = Column(DateTime)

    invited_by = Column(UUID,
        ForeignKey("users.id"))

---

# 24. invitations Table

Organizations invite recruiters before they join.

Workflow

Admin

↓

Invite Recruiter

↓

Email Sent

↓

Recruiter Accepts

↓

Account Created

↓

Membership Added

Columns

| Column | Type |
|---------|------|
| id | UUID |
| organization_id | UUID FK |
| email | VARCHAR |
| role | VARCHAR |
| invitation_token | TEXT |
| expires_at | TIMESTAMP |
| accepted_at | TIMESTAMP |
| invited_by | UUID FK |
| created_at | TIMESTAMP |

Indexes

email

organization_id

---

# 25. Role-Based Access Control (RBAC)

Supported Roles

Owner

Admin

Recruiter

Hiring Manager

Candidate

Permissions are enforced in FastAPI.

Example

Owner

✓ Invite Users

✓ Delete Jobs

✓ Billing

✓ Organization Settings

Admin

✓ Invite Users

✓ Manage Jobs

✓ View Analytics

Recruiter

✓ Create Jobs

✓ Review Candidates

✓ Schedule Interviews

Hiring Manager

✓ Review Candidates

✓ Submit Feedback

Candidate

✓ Upload Resume

✓ Apply for Jobs

✓ View Applications

Roles are stored in organization_members.role.

---

# 26. Clerk Integration

Authentication Flow

User Login

↓

Clerk

↓

JWT

↓

FastAPI Middleware

↓

Verify JWT

↓

Extract clerk_user_id

↓

Lookup users

↓

Lookup organization_members

↓

Resolve Organization

↓

Attach Current User Context

↓

Continue Request

The backend never stores passwords or authentication tokens.

---

# 27. Current User Context

Every authenticated request builds a Current User Context.

CurrentUser

├── User ID

├── Clerk User ID

├── Organization ID

├── Role

├── Email

├── Permissions

Every service uses this context for authorization and tenant isolation.

---

# 28. Design Decisions

Why separate users and organization_members?

Advantages:

- Supports users belonging to multiple organizations.
- Simplifies RBAC.
- Eases future enterprise features.
- Prevents data duplication.

Why use Clerk IDs?

- Secure authentication.
- Easy OAuth integration.
- No password management.
- Reduced security risk.

Why organizations table?

- Enables true SaaS multi-tenancy.
- Clean tenant isolation.
- Future billing support.

---
---

# 29. Candidate & Resume Domain

The Candidate Domain is the core of HireMind AI.

It manages:

- Candidate Profiles
- Resume Storage
- Resume Versions
- Resume Intelligence
- ATS Scores
- AI Analysis
- Candidate Search

Domain Tables

- candidates
- resumes
- resume_analysis

---

# 30. Entity Relationship

Organization

↓

Candidates

↓

Resumes

↓

Resume Analysis

A candidate can upload multiple resumes.

Each uploaded resume has one AI analysis.

---

# 31. candidates Table

Stores candidate profile information.

Candidate data should remain independent of individual resumes.

A candidate may update resumes many times while maintaining the same profile.

Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| organization_id | UUID FK | Organization |
| first_name | VARCHAR(100) | First Name |
| last_name | VARCHAR(100) | Last Name |
| email | VARCHAR(255) | Email |
| phone | VARCHAR(30) | Phone |
| location | VARCHAR(150) | City/Country |
| linkedin_url | TEXT | LinkedIn |
| github_url | TEXT | GitHub |
| portfolio_url | TEXT | Portfolio |
| current_company | VARCHAR(200) | Current Employer |
| current_role | VARCHAR(150) | Current Position |
| total_experience | DECIMAL(4,1) | Years of Experience |
| highest_education | VARCHAR(100) | Highest Degree |
| profile_summary | TEXT | Short Bio |
| status | VARCHAR(50) | Active, Archived, Hired |
| created_at | TIMESTAMP | Created |
| updated_at | TIMESTAMP | Updated |

Indexes

organization_id

email

status

---

# Relationship

Organization

↓

Candidates

↓

Applications

↓

Interviews

↓

Assessments

---

# SQLAlchemy

class Candidate(Base):

    __tablename__="candidates"

    id = Column(UUID, primary_key=True)

    organization_id = Column(
        UUID,
        ForeignKey("organizations.id")
    )

    first_name = Column(String(100))

    last_name = Column(String(100))

    email = Column(String(255))

    phone = Column(String(30))

    location = Column(String(150))

    github_url = Column(Text)

    linkedin_url = Column(Text)

    portfolio_url = Column(Text)

---

# 32. resumes Table

Stores uploaded resume files.

Each upload creates a new record.

Old resumes are never overwritten.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| candidate_id | UUID FK |
| organization_id | UUID FK |
| file_name | VARCHAR |
| storage_path | TEXT |
| file_size | BIGINT |
| mime_type | VARCHAR |
| upload_source | VARCHAR |
| version | INTEGER |
| is_current | BOOLEAN |
| uploaded_at | TIMESTAMP |

Example

Resume V1

↓

Version = 1

Resume V2

↓

Version = 2

Current Resume

↓

is_current = TRUE

Previous resumes remain available for comparison.

---

# Storage Strategy

Actual PDF files are stored inside Supabase Storage.

Database stores only metadata.

Example

storage_path

resumes/org_123/candidate_45/resume_v2.pdf

---

# 33. resume_analysis Table

Contains all AI-generated information for one resume.

Instead of dozens of tables, parsed information is stored using JSONB.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| resume_id | UUID FK |
| ats_score | INTEGER |
| resume_summary | TEXT |
| parsed_data | JSONB |
| strengths | JSONB |
| weaknesses | JSONB |
| recommendations | JSONB |
| embedding | VECTOR |
| embedding_model | VARCHAR |
| processed_at | TIMESTAMP |

---

Example parsed_data

{
  "skills": [
    "Python",
    "FastAPI",
    "TensorFlow"
  ],
  "education": [
    {
      "degree":"B.Tech",
      "college":"NSUT"
    }
  ],
  "experience":[...],
  "projects":[...],
  "certifications":[...]
}

Using JSONB allows the schema to evolve without database migrations whenever the AI parser improves.

---

# 34. Resume Processing Lifecycle

Candidate Upload

↓

Supabase Storage

↓

Resume Record Created

↓

Background Processing

↓

Text Extraction

↓

AI Parsing

↓

ATS Scoring

↓

Embedding Generation

↓

resume_analysis Updated

↓

Frontend Displays Results

---

# 35. Resume Versioning

Every upload creates a new version.

Example

Candidate

↓

Resume V1

↓

Resume V2

↓

Resume V3

Recruiters always see the latest version.

Historical resumes remain available for audit and comparison.

---

# 36. Resume Status

Supported statuses

Uploaded

Processing

Completed

Failed

Archived

Status is maintained in the resume record to provide progress updates to the frontend.

---

# 37. ATS Score Storage

ATS score is generated after parsing.

Score Range

0–100

The database stores:

Overall Score

AI Summary

Missing Skills

Formatting Issues

Recommendations

The frontend derives charts and visualizations from this data.

---

# 38. Resume Embeddings

Each processed resume generates one semantic embedding.

Embedding Flow

Resume Text

↓

Sentence Transformer

↓

768-Dimensional Vector

↓

pgvector

↓

Semantic Search

Stored information

Embedding

Model Name

Created Time

Future models can regenerate embeddings without modifying business data.

---

# 39. Search Optimization

Frequently queried fields are indexed.

Candidate Email

Organization ID

Resume Status

ATS Score

Current Resume

Vector Search uses pgvector indexes for semantic similarity queries.

---

# 40. Design Decisions

Why keep candidate and resume separate?

- Candidates can upload multiple resumes.
- Historical resumes are preserved.
- AI can compare resume versions.

Why JSONB for parsed AI output?

- Flexible schema.
- Easier upgrades.
- Fewer migrations.
- Better compatibility with evolving AI models.

Why separate resume_analysis?

- Business data remains clean.
- AI outputs can be regenerated.
- Supports future AI model improvements without affecting core candidate records.

---
---

# 41. Job & Hiring Pipeline Domain

This domain manages:

- Job Creation
- Job Publishing
- Candidate Applications
- AI Matching
- Hiring Pipeline
- Hiring Decisions

Domain Tables

- jobs
- applications
- application_activity

The Application acts as the central entity connecting candidates with jobs.

---

# 42. Entity Relationship

Organization

↓

Jobs

↓

Applications

↓

Candidate

↓

Interview

↓

Assessment

↓

Offer

↓

Hiring Decision

Each application progresses independently through the hiring pipeline.

---

# 43. jobs Table

Stores all job postings created by recruiters.

Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| organization_id | UUID FK | Organization |
| created_by | UUID FK | Recruiter |
| title | VARCHAR(200) | Job Title |
| department | VARCHAR(100) | Department |
| employment_type | VARCHAR(50) | Full-time, Internship, Contract |
| work_mode | VARCHAR(50) | Remote, Hybrid, Onsite |
| location | VARCHAR(150) | Job Location |
| experience_min | DECIMAL(3,1) | Minimum Experience |
| experience_max | DECIMAL(3,1) | Maximum Experience |
| salary_min | INTEGER | Optional |
| salary_max | INTEGER | Optional |
| description | TEXT | Job Description |
| requirements | TEXT | Requirements |
| responsibilities | TEXT | Responsibilities |
| status | VARCHAR(30) | Draft, Open, Closed |
| published_at | TIMESTAMP | Publish Date |
| expires_at | TIMESTAMP | Closing Date |
| created_at | TIMESTAMP | Created |
| updated_at | TIMESTAMP | Updated |

Indexes

organization_id

status

title

department

---

# Job Lifecycle

Draft

↓

Published

↓

Open

↓

Closed

↓

Archived

Recruiters may duplicate an existing job to create similar openings.

---

# 44. applications Table

The Application table is the heart of the hiring process.

Each record represents one candidate applying for one job.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| organization_id | UUID FK |
| candidate_id | UUID FK |
| job_id | UUID FK |
| source | VARCHAR(50) |
| current_stage | VARCHAR(50) |
| status | VARCHAR(30) |
| ai_match_score | DECIMAL(5,2) |
| recruiter_rating | INTEGER |
| notes | TEXT |
| applied_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Unique Constraint

(candidate_id, job_id)

A candidate cannot apply to the same job twice.

---

# Application Workflow

Candidate

↓

Application Created

↓

Resume Analysis

↓

AI Match Score

↓

Recruiter Review

↓

Interview

↓

Assessment

↓

Offer

↓

Rejected / Hired

---

# Supported Stages

Applied

Screening

Shortlisted

Interview

Assessment

Final Interview

Offer

Hired

Rejected

Withdrawn

The `current_stage` field reflects the candidate's position in the hiring pipeline.

---

# 45. AI Match Score

Every application stores the AI evaluation generated at the time of application.

Stored values include:

- Overall Match Score
- Semantic Similarity
- Skills Match
- Experience Match
- Education Match
- GitHub Score (if available)

These values are stored as JSONB for flexibility.

Example:

{
  "overall": 91.5,
  "semantic_similarity": 95,
  "skills": 88,
  "experience": 90,
  "education": 85,
  "github": 93
}

This snapshot preserves the evaluation even if the AI model changes later.

---

# 46. application_activity Table

Maintains a timeline of important events for each application.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| application_id | UUID FK |
| user_id | UUID FK |
| activity_type | VARCHAR(50) |
| description | TEXT |
| metadata | JSONB |
| created_at | TIMESTAMP |

Examples

- Application Submitted
- Resume Parsed
- AI Score Updated
- Candidate Shortlisted
- Interview Scheduled
- Assessment Completed
- Offer Sent
- Candidate Hired

This table powers the activity timeline shown in the recruiter dashboard.

---

# 47. Hiring Pipeline

The hiring pipeline is driven by the `current_stage` field in the applications table.

Default stages:

Applied

↓

AI Screening

↓

Recruiter Review

↓

Technical Interview

↓

HR Interview

↓

Offer

↓

Hired

Organizations can customize stages in future versions.

---

# 48. Search & Filtering

Recruiters can filter applications by:

- Job
- Stage
- Status
- AI Match Score
- Experience
- Skills
- Source
- Application Date

Indexes are added to frequently filtered columns for efficient queries.

---

# 49. Design Decisions

Why centralize around applications?

- One candidate can apply to many jobs.
- Each application has its own interview history.
- AI scores remain tied to the specific job.
- Hiring decisions are tracked independently.

Why snapshot AI scores?

- Prevents inconsistencies when AI models improve.
- Maintains historical accuracy.
- Supports auditability and recruiter transparency.

Why use application_activity?

- Avoids adding dozens of timestamp columns to applications.
- Provides a complete audit trail.
- Simplifies recruiter timeline views.

---
---

# 41. Job & Hiring Pipeline Domain

This domain manages:

- Job Creation
- Job Publishing
- Candidate Applications
- AI Matching
- Hiring Pipeline
- Hiring Decisions

Domain Tables

- jobs
- applications
- application_activity

The Application acts as the central entity connecting candidates with jobs.

---

# 42. Entity Relationship

Organization

↓

Jobs

↓

Applications

↓

Candidate

↓

Interview

↓

Assessment

↓

Offer

↓

Hiring Decision

Each application progresses independently through the hiring pipeline.

---

# 43. jobs Table

Stores all job postings created by recruiters.

Columns

| Column | Type | Description |
|---------|------|-------------|
| id | UUID | Primary Key |
| organization_id | UUID FK | Organization |
| created_by | UUID FK | Recruiter |
| title | VARCHAR(200) | Job Title |
| department | VARCHAR(100) | Department |
| employment_type | VARCHAR(50) | Full-time, Internship, Contract |
| work_mode | VARCHAR(50) | Remote, Hybrid, Onsite |
| location | VARCHAR(150) | Job Location |
| experience_min | DECIMAL(3,1) | Minimum Experience |
| experience_max | DECIMAL(3,1) | Maximum Experience |
| salary_min | INTEGER | Optional |
| salary_max | INTEGER | Optional |
| description | TEXT | Job Description |
| requirements | TEXT | Requirements |
| responsibilities | TEXT | Responsibilities |
| status | VARCHAR(30) | Draft, Open, Closed |
| published_at | TIMESTAMP | Publish Date |
| expires_at | TIMESTAMP | Closing Date |
| created_at | TIMESTAMP | Created |
| updated_at | TIMESTAMP | Updated |

Indexes

organization_id

status

title

department

---

# Job Lifecycle

Draft

↓

Published

↓

Open

↓

Closed

↓

Archived

Recruiters may duplicate an existing job to create similar openings.

---

# 44. applications Table

The Application table is the heart of the hiring process.

Each record represents one candidate applying for one job.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| organization_id | UUID FK |
| candidate_id | UUID FK |
| job_id | UUID FK |
| source | VARCHAR(50) |
| current_stage | VARCHAR(50) |
| status | VARCHAR(30) |
| ai_match_score | DECIMAL(5,2) |
| recruiter_rating | INTEGER |
| notes | TEXT |
| applied_at | TIMESTAMP |
| updated_at | TIMESTAMP |

Unique Constraint

(candidate_id, job_id)

A candidate cannot apply to the same job twice.

---

# Application Workflow

Candidate

↓

Application Created

↓

Resume Analysis

↓

AI Match Score

↓

Recruiter Review

↓

Interview

↓

Assessment

↓

Offer

↓

Rejected / Hired

---

# Supported Stages

Applied

Screening

Shortlisted

Interview

Assessment

Final Interview

Offer

Hired

Rejected

Withdrawn

The `current_stage` field reflects the candidate's position in the hiring pipeline.

---

# 45. AI Match Score

Every application stores the AI evaluation generated at the time of application.

Stored values include:

- Overall Match Score
- Semantic Similarity
- Skills Match
- Experience Match
- Education Match
- GitHub Score (if available)

These values are stored as JSONB for flexibility.

Example:

{
  "overall": 91.5,
  "semantic_similarity": 95,
  "skills": 88,
  "experience": 90,
  "education": 85,
  "github": 93
}

This snapshot preserves the evaluation even if the AI model changes later.

---

# 46. application_activity Table

Maintains a timeline of important events for each application.

Columns

| Column | Type |
|---------|------|
| id | UUID |
| application_id | UUID FK |
| user_id | UUID FK |
| activity_type | VARCHAR(50) |
| description | TEXT |
| metadata | JSONB |
| created_at | TIMESTAMP |

Examples

- Application Submitted
- Resume Parsed
- AI Score Updated
- Candidate Shortlisted
- Interview Scheduled
- Assessment Completed
- Offer Sent
- Candidate Hired

This table powers the activity timeline shown in the recruiter dashboard.

---

# 47. Hiring Pipeline

The hiring pipeline is driven by the `current_stage` field in the applications table.

Default stages:

Applied

↓

AI Screening

↓

Recruiter Review

↓

Technical Interview

↓

HR Interview

↓

Offer

↓

Hired

Organizations can customize stages in future versions.

---

# 48. Search & Filtering

Recruiters can filter applications by:

- Job
- Stage
- Status
- AI Match Score
- Experience
- Skills
- Source
- Application Date

Indexes are added to frequently filtered columns for efficient queries.

---

# 49. Design Decisions

Why centralize around applications?

- One candidate can apply to many jobs.
- Each application has its own interview history.
- AI scores remain tied to the specific job.
- Hiring decisions are tracked independently.

Why snapshot AI scores?

- Prevents inconsistencies when AI models improve.
- Maintains historical accuracy.
- Supports auditability and recruiter transparency.

Why use application_activity?

- Avoids adding dozens of timestamp columns to applications.
- Provides a complete audit trail.
- Simplifies recruiter timeline views.

---