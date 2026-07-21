# Backend Architecture

HireMind AI

Version: 1.0

Status: Draft

Owner: Backend Engineering Team

---

# Table of Contents

1. Purpose

2. Backend Philosophy

3. Backend Goals

4. Backend Non Goals

5. Technology Stack

6. High-Level Backend Architecture

7. Backend Responsibilities

8. Request Lifecycle

9. Architectural Principles

---

# 1. Purpose

This document defines the backend architecture of HireMind AI.

It describes how the FastAPI backend is structured, how business logic is organized, and how backend services interact with the database, AI platform, storage layer, and external services.

This document serves as the implementation blueprint for backend engineers.

It complements, but does not replace, the following architecture documents:

- System Design
- Database Design
- AI Architecture
- OpenAPI Specification

Those documents define **what** the platform does.

This document defines **how** the backend is implemented.

---

# 2. Backend Philosophy

The backend should be modular, predictable, and easy to evolve.

Every component should have a single responsibility.

Business logic should remain independent of infrastructure concerns such as databases, AI providers, storage systems, and authentication providers.

The backend is designed around the following principles:

- Business-first architecture
- Clear separation of responsibilities
- Dependency inversion
- Strong typing
- Explicit data validation
- Testability
- Provider independence

Rather than coupling the application directly to specific technologies, all external systems are accessed through dedicated service abstractions.

This allows the implementation of underlying providers to change without affecting business logic.

---

# 3. Backend Goals

The backend architecture is designed to achieve the following goals.

### Goal 1

Provide a reliable API for all frontend clients.

---

### Goal 2

Encapsulate all business logic within dedicated services.

---

### Goal 3

Keep AI processing isolated from business workflows.

---

### Goal 4

Support asynchronous processing for long-running tasks.

---

### Goal 5

Ensure organization-level data isolation.

---

### Goal 6

Provide consistent validation and error handling.

---

### Goal 7

Remain maintainable as new hiring features are added.

---

### Goal 8

Support future scaling without major architectural changes.

---

# 4. Backend Non Goals

The backend intentionally avoids unnecessary complexity.

The initial version does NOT include:

- Microservices
- Distributed transactions
- Event streaming platforms
- Message brokers
- Kubernetes-specific infrastructure
- Vendor-specific business logic
- Custom authentication implementation
- Real-time collaborative editing

These capabilities may be introduced in future versions if justified by product requirements.

---

# 5. Technology Stack

## Programming Language

Python

---

## Framework

FastAPI

Responsibilities

- REST API
- Dependency Injection
- Request Validation
- Response Serialization
- Background Tasks
- OpenAPI Generation

---

## ORM

SQLAlchemy

Responsibilities

- Data Models
- Database Access
- Transactions

---

## Database Migration

Alembic

Responsibilities

- Schema Versioning
- Migration Management

---

## Validation

Pydantic

Responsibilities

- Request Validation
- Response Validation
- Internal Data Contracts

---

## Authentication

Clerk

Responsibilities

- User Authentication
- Session Management
- JWT Issuance

The backend performs token verification but does not manage passwords.

---

## Database

Supabase PostgreSQL

Responsibilities

- Relational Data
- JSONB Storage
- pgvector Integration

---

## File Storage

Supabase Storage

Responsibilities

- Resume Storage
- Signed Download URLs
- Document Versioning

---

## AI Platform

Sentence Transformers

Hugging Face Inference API

Responsibilities

- Resume Intelligence
- ATS Intelligence
- Semantic Matching
- Recruiter Copilot
- GitHub Intelligence

---

# 6. High-Level Backend Architecture

The backend is organized into three primary layers.

Frontend Clients

↓

FastAPI Backend

├── Business Layer
├── AI Platform Layer
└── Infrastructure Layer

↓

External Systems

- PostgreSQL
- Supabase Storage
- Clerk
- Hugging Face

Each layer has a clearly defined responsibility.

The Business Layer never communicates directly with external providers.

All external interactions pass through dedicated infrastructure services.

---

# 7. Backend Responsibilities

The backend is responsible for:

Authentication Verification

↓

Authorization

↓

Organization Isolation

↓

Business Rules

↓

Database Operations

↓

AI Orchestration

↓

Resume Processing

↓

File Management

↓

Notification Coordination

↓

Response Generation

The backend is the single source of truth for business workflows.

No business logic should exist in the frontend.

---

# 8. Request Lifecycle

Every API request follows the same execution flow.

Client Request

↓

API Router

↓

Authentication

↓

Authorization

↓

Request Validation

↓

Business Service

↓

Repository / AI Platform / Storage

↓

Response Validation

↓

API Response

The API layer remains thin.

Business services perform orchestration.

Repositories manage persistence.

The AI Platform manages all AI-related operations.

---

# 9. Architectural Principles

The backend architecture follows the following principles.

### Layered Architecture

Responsibilities are divided into independent layers.

Each layer communicates only with adjacent layers.

---

### Separation of Concerns

Business logic, infrastructure, AI processing, and persistence remain isolated.

---

### Dependency Inversion

Business services depend on interfaces rather than concrete implementations.

---

### Strong Typing

All application boundaries use Pydantic models.

Typed contracts reduce runtime errors and improve maintainability.

---

### Stateless APIs

Every request contains all information required for execution.

No server-side session state is maintained.

---

### Single Responsibility

Every module, service, and class should perform one clearly defined task.

---

### Organization Isolation

Every business operation executes within the authenticated organization's context.

Cross-tenant access is prohibited.

---

### AI Abstraction

Business services never call AI providers directly.

All AI interactions occur through the AI Platform layer.

---

### Infrastructure Independence

Business rules remain independent of:

- Database implementation
- Storage provider
- Authentication provider
- AI provider

Replacing one infrastructure component should not require rewriting business logic.

---

### Maintainability

The architecture favors readability, consistency, and explicit behavior over clever abstractions.

Every component should be understandable in isolation and composable with the rest of the system.

---
---

# 10. Project Structure

The backend follows a modular layered architecture.

The project is organized by responsibility rather than by individual endpoints.

Each directory owns a specific concern.

Business logic is isolated from infrastructure and AI providers.

---

# 11. Root Directory Structure

app/

├── api/

├── core/

├── db/

├── modules/

├── ai/

├── storage/

├── background/

├── middleware/

├── dependencies/

├── utils/

├── tests/

├── main.py

Each directory has a clearly defined responsibility.

---

# 12. API Layer

Directory

app/api/

Purpose

Expose REST endpoints.

Responsibilities

- API routers
- Route registration
- Request parsing
- Response serialization
- Dependency injection
- OpenAPI metadata

The API layer should remain thin.

It should never contain business logic.

Example

api/

├── v1/

│   ├── auth.py

│   ├── candidates.py

│   ├── jobs.py

│   ├── resumes.py

│   ├── applications.py

│   ├── interviews.py

│   ├── analytics.py

│   └── copilot.py

---

# 13. Core Layer

Directory

app/core/

Purpose

Application-wide configuration and shared infrastructure.

Contains

config.py

settings.py

security.py

constants.py

exceptions.py

logging.py

Responsibilities

- Environment configuration
- Application constants
- Security utilities
- Exception definitions
- Shared configuration

Business logic must never be placed here.

---

# 14. Database Layer

Directory

app/db/

Purpose

Database infrastructure.

Contains

database.py

base.py

session.py

migrations/

Responsibilities

- SQLAlchemy engine
- Session management
- Declarative base
- Alembic integration

The database layer manages connections only.

It does not implement business logic.

---

# 15. Feature Modules

Directory

app/modules/

Business functionality is organized into independent feature modules.

Example

modules/

├── candidates/

├── jobs/

├── applications/

├── resumes/

├── interviews/

├── assessments/

├── organizations/

├── analytics/

Each module owns its business logic.

Modules communicate through services rather than importing each other's repositories directly.

---

# 16. Internal Module Structure

Each module follows the same structure.

Example

modules/candidates/

├── models.py

├── schemas.py

├── repository.py

├── service.py

├── router.py

├── dependencies.py

Responsibilities

models.py

SQLAlchemy models

---

schemas.py

Pydantic models

---

repository.py

Database access

---

service.py

Business logic

---

router.py

FastAPI routes

---

dependencies.py

Module-specific dependencies

This structure keeps every module predictable.

---

# 17. AI Platform

Directory

app/ai/

Purpose

Shared AI platform used across all business modules.

Structure

ai/

├── prompts/

├── embeddings/

├── retrieval/

├── llm/

├── parsers/

├── validation/

├── providers/

├── pipelines/

Responsibilities

Prompt templates

Embedding generation

Resume parsing

ATS evaluation

Matching

RAG

LLM integration

Provider abstraction

Business modules never call AI providers directly.

---

# 18. Storage Layer

Directory

app/storage/

Purpose

File management.

Responsibilities

- Resume upload
- Resume download
- Signed URLs
- Storage provider abstraction

Contains

storage_service.py

supabase_storage.py

Storage providers remain replaceable.

---

# 19. Background Processing

Directory

app/background/

Purpose

Long-running asynchronous tasks.

Examples

Resume processing

Embedding generation

GitHub analysis

ATS generation

Bulk imports

Background tasks never contain business rules.

They orchestrate existing services.

---

# 20. Middleware

Directory

app/middleware/

Purpose

Cross-cutting request processing.

Examples

Authentication

Request logging

Exception handling

Security headers

CORS

Middleware should remain generic.

Business logic does not belong here.

---

# 21. Dependencies

Directory

app/dependencies/

Purpose

Reusable FastAPI dependency providers.

Examples

Current User

Current Organization

Database Session

Role Validation

Repositories

AI Services

This centralizes dependency injection.

---

# 22. Utilities

Directory

app/utils/

Purpose

Reusable helper functions.

Examples

Date utilities

String normalization

UUID helpers

File utilities

Utilities must remain stateless.

Business workflows should not be implemented here.

---

# 23. Tests

Directory

app/tests/

Structure mirrors production code.

Example

tests/

├── candidates/

├── jobs/

├── resumes/

├── ai/

├── integration/

├── fixtures/

Test organization follows the application structure.

---

# 24. Entry Point

File

main.py

Responsibilities

- Create FastAPI application
- Register middleware
- Register routers
- Startup events
- Shutdown events
- Exception handlers

Business logic should never exist inside main.py.

---

# 25. Module Communication Rules

Feature modules should remain loosely coupled.

Allowed

Candidate Service

↓

Application Service

↓

Repository

Not Allowed

Candidate Repository

↓

Job Repository

Repositories should never communicate directly.

Business workflows should be coordinated through services.

---

# 26. Import Rules

To avoid circular dependencies, imports follow these rules.

API

↓

Service

↓

Repository

↓

Database

The reverse direction is prohibited.

Similarly

Business Module

↓

AI Platform

↓

Provider

AI providers never import business modules.

---

# 27. Project Structure Principles

The backend project structure follows these principles.

- One responsibility per directory.
- One responsibility per module.
- Business logic belongs in services.
- Database access belongs in repositories.
- AI code belongs in the AI Platform.
- Infrastructure remains isolated.
- Shared functionality is centralized.
- Feature modules remain independent.
- Consistent internal structure across modules.

This organization enables HireMind AI to scale from an MVP to a production platform while keeping the codebase predictable, maintainable, and easy for new engineers to navigate.

---
---

# 28. Layered Architecture

HireMind AI follows a layered architecture that separates concerns between presentation, orchestration, business logic, persistence, AI infrastructure, and external systems.

Each layer has a single responsibility.

Layers communicate only with adjacent layers.

This minimizes coupling and improves maintainability.

---

# 29. Layer Overview

Client

↓

API Layer

↓

Workflow Layer

↓

Domain Service Layer

↓

Repository Layer

↓

Database

                ↓

           AI Platform

                ↓

        External Providers

Each layer performs a distinct role.

---

# 30. API Layer

Purpose

The API Layer exposes REST endpoints.

Responsibilities

- Parse HTTP requests
- Validate request schemas
- Resolve dependencies
- Invoke workflows
- Serialize responses
- Return HTTP status codes

The API layer should contain no business logic.

Example

POST /resumes/upload

↓

ResumeUploadWorkflow

Not

POST /resumes/upload

↓

SQLAlchemy

---

# 31. Workflow Layer

Purpose

Workflows coordinate complex business operations involving multiple services.

Examples

Resume Upload

Application Creation

Interview Scheduling

GitHub Refresh

Candidate Import

Responsibilities

- Coordinate multiple services
- Manage execution order
- Handle transactional boundaries
- Trigger background tasks
- Return final results

Example

ResumeUploadWorkflow

↓

Validate Upload

↓

Store File

↓

Create Resume Record

↓

Queue Processing

↓

Return Response

A workflow does not contain domain-specific business rules.

---

# 32. Domain Service Layer

Purpose

Domain Services contain business rules.

Each service owns one business domain.

Examples

CandidateService

JobService

ResumeService

ApplicationService

InterviewService

AssessmentService

AnalyticsService

Responsibilities

- Domain validation
- Business policies
- Domain calculations
- Lifecycle management
- Coordination with repositories

Services do not know how databases or AI providers are implemented.

---

# 33. Repository Layer

Purpose

Repositories encapsulate persistence logic.

Responsibilities

- CRUD operations
- Query construction
- Database filtering
- Pagination
- Transactions (where appropriate)

Repositories expose domain-friendly methods.

Example

CandidateRepository

Methods

get_by_id()

create()

update()

search()

find_by_email()

Repositories never contain business rules.

---

# 34. AI Platform Layer

Purpose

Provide all AI capabilities through a shared abstraction.

Business services interact only with the AI Platform.

Components

Prompt Service

Embedding Service

Retrieval Service

Resume Parser

ATS Engine

LLM Service

Validation Service

Responsibilities

- Resume parsing
- ATS scoring
- Embedding generation
- Candidate matching
- Copilot responses
- GitHub analysis

The AI Platform hides provider-specific implementation details.

---

# 35. Infrastructure Layer

Purpose

Provide integrations with external systems.

Examples

Supabase PostgreSQL

Supabase Storage

Clerk

Hugging Face

Email Provider

Responsibilities

- Database connections
- File storage
- Authentication verification
- AI provider communication
- Signed URL generation

Infrastructure code should never contain business logic.

---

# 36. Layer Communication Rules

Allowed Communication

API

↓

Workflow

↓

Service

↓

Repository

↓

Database

Service

↓

AI Platform

↓

Provider

Service

↓

Storage

↓

Supabase Storage

Forbidden Communication

API → Database

API → SQLAlchemy

Workflow → Database

Repository → AI Provider

Repository → Repository

AI Provider → Business Services

Every interaction should pass through the correct abstraction.

---

# 37. Request Execution Example

Resume Upload

Client

↓

POST /resumes/upload

↓

Resume Router

↓

ResumeUploadWorkflow

↓

Storage Service

↓

Resume Repository

↓

Background Task

↓

HTTP Response

Background Task

↓

Resume Parser

↓

ATS Engine

↓

Embedding Service

↓

Resume Repository

↓

Update Status

The upload request completes quickly while AI processing continues asynchronously.

---

# 38. Domain Boundaries

Each domain owns its own business rules.

Candidate Domain

- Candidate lifecycle
- Candidate status
- Contact information

Resume Domain

- Resume versions
- Resume processing
- Resume analysis

Job Domain

- Job lifecycle
- Hiring requirements

Application Domain

- Hiring stages
- Application status

Interview Domain

- Scheduling
- Feedback

Analytics Domain

- Metrics
- Dashboard summaries

Business rules should never leak across domains.

Cross-domain operations are coordinated through workflows.

---

# 39. Data Flow

Incoming Request

↓

Pydantic Request Schema

↓

Workflow

↓

Domain Service

↓

Repository

↓

SQLAlchemy Model

↓

Database

↓

SQLAlchemy Model

↓

Pydantic Response Schema

↓

HTTP Response

Pydantic models form the boundary between layers.

Internal database models are never exposed directly.

---

# 40. Transaction Boundaries

Transactions should be as small as possible.

Example

Application Creation

Start Transaction

↓

Create Application

↓

Commit

↓

Generate AI Match (Background)

Do not keep database transactions open while waiting for AI inference or external APIs.

Long-running operations should execute outside transactional boundaries.

---

# 41. Dependency Injection

FastAPI dependency injection is used throughout the backend.

Injected Dependencies

- Database Session
- Current User
- Current Organization
- Repositories
- Services
- AI Platform
- Storage Service

Dependencies should be injected rather than instantiated manually.

This improves testing and reduces coupling.

---

# 42. Error Propagation

Errors propagate upward through the layers.

Provider Error

↓

AI Platform

↓

Service

↓

Workflow

↓

API Layer

↓

HTTP Error Response

Each layer may enrich the error with additional context.

Lower layers should never generate HTTP responses directly.

---

# 43. Layer Responsibilities Summary

API Layer

Handles HTTP communication.

Workflow Layer

Coordinates complex business processes.

Domain Service Layer

Implements business rules.

Repository Layer

Manages persistence.

AI Platform

Provides AI capabilities.

Infrastructure Layer

Communicates with external systems.

Database

Stores application state.

Each layer owns one responsibility and communicates only through defined interfaces.

---

# 44. Layered Architecture Principles

The layered architecture follows these principles.

- Thin API routes.
- Explicit workflows for multi-step operations.
- Business rules isolated in domain services.
- Persistence isolated in repositories.
- AI functionality centralized in the AI Platform.
- Infrastructure hidden behind abstractions.
- Small transaction boundaries.
- Strong typing across all layer boundaries.
- Independent, testable components.
- Clear ownership of responsibilities.

This layered design enables HireMind AI to evolve without tightly coupling business logic to infrastructure, AI providers, or framework-specific implementation details.

---
---

# 45. Authentication Architecture

HireMind AI delegates user authentication entirely to Clerk.

The backend is responsible for:

- Verifying JWT tokens
- Resolving the authenticated user
- Resolving organization membership
- Determining permissions
- Building the request context

The backend never stores passwords or manages login sessions.

---

# 46. Authentication Flow

Every authenticated request follows the same flow.

Client

↓

Clerk Authentication

↓

JWT Token

↓

Authorization Header

↓

FastAPI Middleware

↓

JWT Verification

↓

Internal User Resolution

↓

Organization Resolution

↓

Permission Resolution

↓

Request Context

↓

Business Logic

Only verified requests continue through the application.

---

# 47. Clerk Integration

Clerk manages:

- Registration
- Login
- Multi-device sessions
- Password management
- Email verification
- MFA (optional)
- Session lifecycle

The backend stores only the Clerk user identifier.

Example

User Table

id

clerk_user_id

email

organization_id

role

The backend treats Clerk as the identity provider.

---

# 48. JWT Verification

Every protected endpoint requires a valid JWT.

Verification Steps

Extract Authorization header

↓

Verify JWT signature

↓

Validate expiration

↓

Extract Clerk user identifier

↓

Load internal user

↓

Continue request

Invalid or expired tokens immediately return HTTP 401 Unauthorized.

---

# 49. Internal User Resolution

After JWT verification, the backend resolves the application's internal user record.

Lookup

clerk_user_id

↓

users table

↓

User Entity

The internal user contains application-specific information such as:

- Organization
- Role
- Preferences
- Status

Authentication and business identity remain separate concerns.

---

# 50. Organization Resolution

HireMind AI is a multi-tenant application.

Every authenticated request executes within one organization.

Workflow

Authenticated User

↓

Organization Membership

↓

Organization Entity

↓

Request Context

Organization identifiers are never accepted from frontend requests.

The organization is always derived from the authenticated user.

---

# 51. Request Context

Every authenticated request creates a Request Context object.

Contains

- User ID
- Clerk User ID
- Organization ID
- Role
- Permissions
- Request Timestamp

Business services consume the Request Context rather than accessing authentication details directly.

This keeps business logic independent of Clerk.

---

# 52. Authorization (RBAC)

Authorization is role-based.

Supported Roles

Owner

Admin

Recruiter

Hiring Manager

Candidate

Each role defines permitted operations.

Examples

Recruiter

- View candidates
- Create jobs
- Schedule interviews

Hiring Manager

- Review candidates
- Submit interview feedback

Candidate

- View own profile
- Upload resume
- View applications

Roles define capabilities rather than implementation details.

---

# 53. Permission Resolution

Permissions are derived from roles.

Example

Recruiter

↓

Candidate Read

Candidate Update

Job Create

Interview Schedule

Analytics View

Permissions are resolved once during request initialization.

Business services receive permissions through the Request Context.

---

# 54. Organization Isolation

Every database operation is organization-scoped.

Example

Candidate Search

↓

Organization Filter

↓

Candidate Repository

↓

Database

Repositories automatically apply organization filtering where applicable.

Cross-tenant queries are prohibited.

---

# 55. Route Protection

Endpoints are classified into three categories.

### Public

Examples

Health endpoints

No authentication required.

---

### Authenticated

Examples

Profile

Dashboard

Resume Upload

Require authenticated users.

---

### Role-Protected

Examples

Create Job

Delete Candidate

Organization Settings

Require authentication and specific permissions.

Authorization checks execute before business logic.

---

# 56. FastAPI Dependencies

Authentication and authorization are implemented using reusable dependencies.

Examples

get_current_user()

get_current_organization()

require_role()

require_permission()

These dependencies centralize security logic and reduce duplication.

---

# 57. Dependency Injection Strategy

Dependencies are injected rather than instantiated manually.

Typical Request

Router

↓

Current User Dependency

↓

Current Organization Dependency

↓

Database Session

↓

Workflow

↓

Service

↓

Repository

Dependency injection keeps components loosely coupled and easier to test.

---

# 58. Security Boundaries

The backend enforces security at multiple layers.

API Layer

Authentication

↓

Workflow

Authorization

↓

Repository

Organization Filtering

↓

Database

Persistence

Every layer contributes to protecting application data.

---

# 59. Authentication Errors

Common authentication failures include:

Missing Token

↓

401 Unauthorized

---

Invalid Token

↓

401 Unauthorized

---

Expired Token

↓

401 Unauthorized

---

Inactive User

↓

403 Forbidden

---

Missing Organization Membership

↓

403 Forbidden

Error responses never expose sensitive implementation details.

---

# 60. Authorization Errors

Permission failures return HTTP 403 Forbidden.

Example

Candidate attempts to delete another candidate.

↓

Permission Check

↓

Denied

↓

403 Forbidden

The backend should provide clear but non-sensitive error messages.

---

# 61. Security Design Principles

The authentication and authorization architecture follows these principles.

- Delegate identity management to Clerk.
- Keep authentication separate from business identity.
- Build a Request Context for every request.
- Resolve organization automatically.
- Enforce RBAC consistently.
- Never trust client-supplied organization identifiers.
- Centralize security logic using FastAPI dependencies.
- Keep business services independent of authentication providers.
- Apply organization isolation at the repository level.
- Fail securely when authentication or authorization cannot be verified.

This architecture provides a secure, maintainable, and provider-independent security foundation for HireMind AI while supporting multi-tenant operation and future organizational growth.

---
---

# 62. AI Integration

Artificial Intelligence is a core capability of HireMind AI.

Rather than embedding AI logic inside business services, all AI functionality is centralized within the AI Platform.

The backend communicates with the AI Platform through well-defined service interfaces.

This separation ensures that business workflows remain independent of AI implementation details.

---

# 63. AI Integration Architecture

The backend integrates with AI through a dedicated platform layer.

Business Module

↓

Workflow

↓

AI Platform

↓

AI Pipeline

↓

AI Provider

↓

AI Result

Business modules never communicate directly with external AI providers.

---

# 64. AI Platform Responsibilities

The AI Platform provides reusable capabilities across the application.

Core responsibilities include:

- Resume Intelligence
- ATS Evaluation
- Semantic Search
- Candidate Matching
- GitHub Intelligence
- Recruiter Copilot
- Embedding Generation
- Prompt Management
- AI Validation

Each capability is exposed through a dedicated service or pipeline.

---

# 65. Resume Intelligence Integration

Resume processing is initiated after a successful upload.

Workflow

Resume Upload

↓

Store Resume

↓

Queue Background Task

↓

Resume Intelligence Pipeline

↓

Persist Analysis

↓

Mark Processing Complete

The upload endpoint responds immediately while AI processing continues asynchronously.

---

# 66. ATS Evaluation Integration

ATS evaluation operates on structured resume data.

Resume Analysis

↓

ATS Pipeline

↓

Content Analysis

↓

Skill Analysis

↓

Experience Analysis

↓

Recommendation Engine

↓

ATS Report

The ATS report is stored as versioned analysis data.

---

# 67. Semantic Matching Integration

Candidate matching is performed using semantic embeddings.

Job Description

↓

Embedding Generation

↓

Vector Search

↓

Business Ranking

↓

Candidate Matches

Matching combines AI similarity with deterministic business rules.

---

# 68. Recruiter Copilot Integration

The AI Recruiter Copilot uses Retrieval-Augmented Generation (RAG).

Recruiter Question

↓

Intent Detection

↓

Retrieve Context

↓

Build Prompt

↓

LLM

↓

Grounded Response

The backend orchestrates the retrieval process and validates responses before returning them.

---

# 69. GitHub Intelligence Integration

GitHub analysis runs asynchronously.

GitHub URL

↓

Repository Discovery

↓

Metadata Collection

↓

AI Analysis

↓

Developer Intelligence Profile

↓

Persist Results

Repository analysis never blocks user-facing requests.

---

# 70. AI Pipelines

Complex AI workflows are implemented as pipelines.

Examples

Resume Processing Pipeline

ATS Pipeline

Matching Pipeline

GitHub Analysis Pipeline

Copilot Pipeline

Each pipeline coordinates multiple AI services while exposing a single business capability.

---

# 71. AI Service Abstractions

The backend depends on abstract AI interfaces rather than concrete implementations.

Examples

ResumeParser

EmbeddingGenerator

ATSAnalyzer

MatchingEngine

LLMClient

PromptManager

Concrete providers can change without affecting business services.

---

# 72. Prompt Management

Prompts are treated as versioned application assets.

Responsibilities

- Prompt templates
- Variable interpolation
- Version tracking
- Prompt validation
- Reuse across pipelines

Business services never construct prompts directly.

---

# 73. Embedding Integration

Embeddings power semantic search and matching.

Embedding Sources

- Resumes
- Jobs
- Candidate Profiles

Embedding Lifecycle

Content

↓

Preprocessing

↓

Embedding Generation

↓

pgvector Storage

↓

Semantic Retrieval

Embeddings are generated asynchronously whenever possible.

---

# 74. AI Validation

Every AI response undergoes validation before persistence.

Validation includes:

- Schema validation
- Required field checks
- Confidence checks
- Data normalization
- Error detection

Only validated outputs are stored in the database.

---

# 75. AI Error Handling

AI failures should not compromise core application workflows.

Examples

LLM timeout

↓

Retry

↓

Fallback

↓

Log Failure

↓

Continue Workflow

Where appropriate, AI features degrade gracefully rather than blocking user operations.

---

# 76. AI Background Processing

Long-running AI operations execute asynchronously.

Examples

- Resume parsing
- ATS analysis
- Embedding generation
- GitHub analysis
- Candidate matching refresh

Background execution improves API responsiveness and user experience.

---

# 77. AI Provider Independence

The backend never depends directly on a specific AI vendor.

Business Workflow

↓

AI Platform

↓

Provider Adapter

↓

External Provider

Supported providers can evolve over time without changing business workflows.

---

# 78. AI Result Persistence

AI outputs are stored as structured application data.

Examples

Resume Analysis

ATS Report

Match Result

Developer Intelligence Profile

Copilot Conversation

Persisted AI results are versioned and remain reproducible even as models evolve.

---

# 79. AI Performance Strategy

The backend optimizes AI execution through:

- Background processing
- Result caching
- Embedding reuse
- Batched inference where appropriate
- Minimal synchronous AI operations

The objective is to keep user-facing APIs responsive while handling computationally expensive tasks efficiently.

---

# 80. AI Integration Principles

The backend follows these principles when integrating AI.

- Business logic remains independent of AI providers.
- AI capabilities are exposed through pipelines.
- AI processing is asynchronous whenever possible.
- Retrieval precedes generation for contextual responses.
- All AI outputs are validated before persistence.
- AI failures degrade gracefully without breaking core workflows.
- Providers remain replaceable through abstraction layers.
- AI reports are versioned for reproducibility.
- Business modules consume AI capabilities rather than individual models.

This integration architecture allows HireMind AI to evolve its AI capabilities independently while maintaining a stable, maintainable backend.

---
---

# 81. Infrastructure Architecture

The Infrastructure Layer provides access to external systems and shared platform capabilities.

It isolates business logic from implementation details such as storage providers, databases, email providers, and background processing.

Business modules communicate only with infrastructure service abstractions.

---

# 82. Infrastructure Components

The Infrastructure Layer consists of the following services.

Storage Service

↓

Background Task Service

↓

Configuration Service

↓

Notification Service

↓

Database Infrastructure

↓

External Providers

Each component has a single responsibility.

---

# 83. Storage Architecture

All documents are stored in Supabase Storage.

Supported Files

- Resume PDFs
- Resume DOCX files
- Candidate attachments
- Assessment documents

Upload Flow

Client

↓

API

↓

Storage Service

↓

Supabase Storage

↓

Signed URL

↓

Database

The backend stores only file metadata and storage paths.

Files are never stored inside PostgreSQL.

---

# 84. Storage Service

The Storage Service provides a provider-independent abstraction.

Responsibilities

- Upload files
- Delete files
- Generate signed URLs
- Validate file types
- Validate file size
- Organize storage paths

Example Interface

upload()

download_url()

delete()

exists()

Business services never interact with Supabase Storage directly.

---

# 85. Background Processing

Long-running operations execute asynchronously.

Examples

Resume Parsing

ATS Analysis

Embedding Generation

GitHub Analysis

Bulk Candidate Import

Analytics Refresh

Background tasks prevent slow API responses.

---

# 86. Background Task Service

The Background Task Service coordinates asynchronous execution.

Responsibilities

- Queue tasks
- Execute tasks
- Handle retries
- Capture failures
- Log execution

The service orchestrates tasks but does not contain business rules.

---

# 87. Database Infrastructure

The backend uses SQLAlchemy with PostgreSQL.

Responsibilities

- Connection management
- Session lifecycle
- Transactions
- Query execution
- Migration support

Database infrastructure remains independent of repositories.

Repositories consume database sessions through dependency injection.

---

# 88. Configuration Management

Application configuration is centralized.

Configuration Sources

Environment Variables

↓

Pydantic Settings

↓

Configuration Service

Configuration includes

- Database credentials
- Clerk configuration
- Hugging Face API keys
- Supabase configuration
- Application settings
- Feature flags

Configuration values should never be hardcoded.

---

# 89. Environment Strategy

Configuration is environment-specific.

Supported Environments

Development

Testing

Staging

Production

Each environment provides its own configuration values while sharing the same application code.

Secrets are injected through environment variables.

---

# 90. Notification Service

The Notification Service manages outbound notifications.

Examples

Interview Invitations

Application Updates

Organization Invitations

Assessment Notifications

Future implementations may support

- Email
- In-app notifications
- SMS
- Push notifications

Business services request notifications without knowing the delivery mechanism.

---

# 91. File Organization

Uploaded files follow a predictable structure.

organizations/

organization_id/

candidates/

candidate_id/

resumes/

resume_id.pdf

This structure simplifies access control and cleanup.

---

# 92. Database Transactions

Transactions should be limited to database operations.

Example

Create Candidate

↓

Create Resume Record

↓

Commit

↓

Start Background AI Processing

External API calls and AI inference should never execute inside database transactions.

---

# 93. Startup and Shutdown Events

The application performs initialization during startup.

Startup Responsibilities

- Load configuration
- Initialize database connections
- Register middleware
- Verify external services
- Initialize AI providers

Shutdown Responsibilities

- Close database sessions
- Release resources
- Complete active background tasks when possible

---

# 94. Infrastructure Security

Infrastructure services enforce security through:

- Signed URLs for file downloads
- Input validation
- Secret management
- Secure environment variables
- TLS for external communication
- Least-privilege access

Infrastructure components never expose secrets to business modules.

---

# 95. Infrastructure Error Handling

Infrastructure failures are translated into application-level exceptions.

Examples

Storage Failure

↓

StorageException

↓

Workflow

↓

API Response

Database Timeout

↓

DatabaseException

↓

Workflow

↓

HTTP Error

Provider-specific exceptions are not propagated directly to API consumers.

---

# 96. Infrastructure Testing

Infrastructure services should be independently testable.

Testing includes

- Storage integration tests
- Database integration tests
- Background task tests
- Configuration validation
- Provider mocks
- Failure scenarios

Business logic can be tested using mocked infrastructure services.

---

# 97. Infrastructure Principles

The Infrastructure Layer follows these principles.

- Infrastructure is isolated from business logic.
- Services depend on abstractions rather than providers.
- External systems remain replaceable.
- Files are stored outside the database.
- Long-running work executes asynchronously.
- Configuration is centralized and environment-driven.
- Transactions remain short-lived.
- Secrets are never hardcoded.
- Infrastructure failures are translated into application exceptions.
- Components remain independently testable.

This architecture provides a stable foundation for the backend while allowing infrastructure technologies to evolve without impacting business workflows.

--- 
---

# 81. Infrastructure Architecture

The Infrastructure Layer provides access to external systems and shared platform capabilities.

It isolates business logic from implementation details such as storage providers, databases, email providers, and background processing.

Business modules communicate only with infrastructure service abstractions.

---

# 82. Infrastructure Components

The Infrastructure Layer consists of the following services.

Storage Service

↓

Background Task Service

↓

Configuration Service

↓

Notification Service

↓

Database Infrastructure

↓

External Providers

Each component has a single responsibility.

---

# 83. Storage Architecture

All documents are stored in Supabase Storage.

Supported Files

- Resume PDFs
- Resume DOCX files
- Candidate attachments
- Assessment documents

Upload Flow

Client

↓

API

↓

Storage Service

↓

Supabase Storage

↓

Signed URL

↓

Database

The backend stores only file metadata and storage paths.

Files are never stored inside PostgreSQL.

---

# 84. Storage Service

The Storage Service provides a provider-independent abstraction.

Responsibilities

- Upload files
- Delete files
- Generate signed URLs
- Validate file types
- Validate file size
- Organize storage paths

Example Interface

upload()

download_url()

delete()

exists()

Business services never interact with Supabase Storage directly.

---

# 85. Background Processing

Long-running operations execute asynchronously.

Examples

Resume Parsing

ATS Analysis

Embedding Generation

GitHub Analysis

Bulk Candidate Import

Analytics Refresh

Background tasks prevent slow API responses.

---

# 86. Background Task Service

The Background Task Service coordinates asynchronous execution.

Responsibilities

- Queue tasks
- Execute tasks
- Handle retries
- Capture failures
- Log execution

The service orchestrates tasks but does not contain business rules.

---

# 87. Database Infrastructure

The backend uses SQLAlchemy with PostgreSQL.

Responsibilities

- Connection management
- Session lifecycle
- Transactions
- Query execution
- Migration support

Database infrastructure remains independent of repositories.

Repositories consume database sessions through dependency injection.

---

# 88. Configuration Management

Application configuration is centralized.

Configuration Sources

Environment Variables

↓

Pydantic Settings

↓

Configuration Service

Configuration includes

- Database credentials
- Clerk configuration
- Hugging Face API keys
- Supabase configuration
- Application settings
- Feature flags

Configuration values should never be hardcoded.

---

# 89. Environment Strategy

Configuration is environment-specific.

Supported Environments

Development

Testing

Staging

Production

Each environment provides its own configuration values while sharing the same application code.

Secrets are injected through environment variables.

---

# 90. Notification Service

The Notification Service manages outbound notifications.

Examples

Interview Invitations

Application Updates

Organization Invitations

Assessment Notifications

Future implementations may support

- Email
- In-app notifications
- SMS
- Push notifications

Business services request notifications without knowing the delivery mechanism.

---

# 91. File Organization

Uploaded files follow a predictable structure.

organizations/

organization_id/

candidates/

candidate_id/

resumes/

resume_id.pdf

This structure simplifies access control and cleanup.

---

# 92. Database Transactions

Transactions should be limited to database operations.

Example

Create Candidate

↓

Create Resume Record

↓

Commit

↓

Start Background AI Processing

External API calls and AI inference should never execute inside database transactions.

---

# 93. Startup and Shutdown Events

The application performs initialization during startup.

Startup Responsibilities

- Load configuration
- Initialize database connections
- Register middleware
- Verify external services
- Initialize AI providers

Shutdown Responsibilities

- Close database sessions
- Release resources
- Complete active background tasks when possible

---

# 94. Infrastructure Security

Infrastructure services enforce security through:

- Signed URLs for file downloads
- Input validation
- Secret management
- Secure environment variables
- TLS for external communication
- Least-privilege access

Infrastructure components never expose secrets to business modules.

---

# 95. Infrastructure Error Handling

Infrastructure failures are translated into application-level exceptions.

Examples

Storage Failure

↓

StorageException

↓

Workflow

↓

API Response

Database Timeout

↓

DatabaseException

↓

Workflow

↓

HTTP Error

Provider-specific exceptions are not propagated directly to API consumers.

---

# 96. Infrastructure Testing

Infrastructure services should be independently testable.

Testing includes

- Storage integration tests
- Database integration tests
- Background task tests
- Configuration validation
- Provider mocks
- Failure scenarios

Business logic can be tested using mocked infrastructure services.

---

# 97. Infrastructure Principles

The Infrastructure Layer follows these principles.

- Infrastructure is isolated from business logic.
- Services depend on abstractions rather than providers.
- External systems remain replaceable.
- Files are stored outside the database.
- Long-running work executes asynchronously.
- Configuration is centralized and environment-driven.
- Transactions remain short-lived.
- Secrets are never hardcoded.
- Infrastructure failures are translated into application exceptions.
- Components remain independently testable.

This architecture provides a stable foundation for the backend while allowing infrastructure technologies to evolve without impacting business workflows.

---
---

# 114. Deployment Architecture

HireMind AI is deployed as a modular monolithic application.

The backend, frontend, database, storage, and AI providers are independently managed but work together as a single platform.

Deployment Architecture

Frontend (Vercel)

↓

FastAPI Backend (Render)

↓

Supabase PostgreSQL

Supabase Storage

↓

Hugging Face Inference API

↓

Clerk Authentication

Each component has a clearly defined responsibility and can be updated independently.

---

# 115. Deployment Components

## Frontend

Platform

Vercel

Responsibilities

- Host Next.js application
- Static asset delivery
- Client-side rendering
- Server-side rendering
- API communication

---

## Backend

Platform

Render

Responsibilities

- FastAPI application
- REST APIs
- Business workflows
- AI orchestration
- Database communication

---

## Database

Platform

Supabase PostgreSQL

Responsibilities

- Persistent relational data
- JSONB storage
- pgvector embeddings
- Transactions

---

## Storage

Platform

Supabase Storage

Responsibilities

- Resume storage
- Candidate documents
- Signed file URLs

---

## Authentication

Platform

Clerk

Responsibilities

- Authentication
- Session management
- JWT issuance

---

## AI

Platform

Hugging Face

Responsibilities

- LLM inference
- Resume Intelligence
- ATS Intelligence
- Semantic AI features

---

# 116. Environment Configuration

The backend supports multiple deployment environments.

Development

Local development environment.

Testing

Automated testing and continuous integration.

Staging

Pre-production validation.

Production

Live application.

Each environment maintains its own configuration while sharing the same codebase.

---

# 117. Environment Variables

Application behavior is configured through environment variables.

Examples

Database

SUPABASE_URL

SUPABASE_KEY

DATABASE_URL

Authentication

CLERK_SECRET_KEY

CLERK_PUBLISHABLE_KEY

AI

HF_API_KEY

Storage

SUPABASE_STORAGE_BUCKET

Application

ENVIRONMENT

API_VERSION

DEBUG

Sensitive values should never be committed to source control.

---

# 118. Database Migrations

Database schema changes are managed through Alembic.

Migration Workflow

Model Change

↓

Generate Migration

↓

Review Migration

↓

Apply Migration

↓

Deploy

All schema changes should be version controlled.

Production databases must only be modified through migrations.

---

# 119. Deployment Pipeline

Deployment follows a consistent workflow.

Developer

↓

GitHub

↓

Build

↓

Run Tests

↓

Deploy Backend

↓

Deploy Frontend

↓

Database Migration

↓

Health Check

↓

Production

Deployments should be automated whenever possible.

---

# 120. Health Verification

After deployment, the platform verifies core services.

Verification includes

- Backend availability
- Database connectivity
- Storage accessibility
- Authentication provider
- AI provider connectivity

Deployment is considered successful only after all critical services are operational.

---

# 121. Scaling Strategy

The backend is designed to scale incrementally.

Current Architecture

Single FastAPI application

↓

Future

Multiple backend instances

↓

Load-balanced API servers

↓

Independent AI workers

↓

Optional distributed processing

The architecture supports horizontal scaling without changing business logic.

---

# 122. AI Scaling

AI workloads scale independently from REST APIs.

REST API

↓

Background Processing

↓

AI Pipelines

↓

External AI Providers

Long-running AI operations remain isolated from user-facing API requests.

Future AI workers can be deployed separately without modifying API contracts.

---

# 123. Storage Scaling

Application files remain external to the backend.

Advantages

- Reduced application size
- Independent storage scaling
- Secure signed URLs
- Simplified backups

Storage capacity can increase without affecting application deployments.

---

# 124. Database Scaling

The database remains the single source of truth.

Scaling strategies include

- Proper indexing
- Query optimization
- Connection pooling
- Read replicas (future)
- Database partitioning (future if required)

Schema design should prioritize correctness before optimization.

---

# 125. Future Evolution

The backend is intentionally designed as a modular monolith.

Future growth may introduce additional capabilities without requiring major architectural changes.

Potential evolution includes

- Dedicated AI workers
- Redis caching
- Scheduled background jobs
- WebSocket support
- Event-driven workflows
- Search indexing
- Multi-region deployments

These enhancements extend the architecture rather than replacing it.

---

# 126. Microservice Strategy

Microservices are not part of the initial architecture.

They should only be considered when measurable requirements justify additional complexity.

Possible future extraction candidates include

- AI Platform
- Notification Service
- Analytics Service

The current modular architecture minimizes future migration effort by maintaining clear module boundaries.

---

# 127. Disaster Recovery

Operational resilience includes

- Automated database backups
- Storage redundancy provided by Supabase
- Version-controlled infrastructure
- Migration history
- Environment-specific configuration

Recovery procedures should prioritize restoring application data before resuming normal operations.

---

# 128. Maintainability Guidelines

Long-term maintainability is achieved through

- Modular architecture
- Layered design
- Clear ownership
- Consistent project structure
- Strong typing
- Automated testing
- Version-controlled migrations
- Comprehensive documentation

The architecture should remain understandable for new engineers joining the project.

---

# 129. Backend Evolution Principles

Future changes should follow these principles.

- Preserve API contracts whenever possible.
- Prefer extending existing modules over introducing new architectural layers.
- Keep business logic independent of infrastructure.
- Avoid premature optimization.
- Introduce complexity only when justified by measurable requirements.
- Maintain clear separation between business logic, AI, and infrastructure.
- Continue using provider abstractions for external services.
- Preserve organization isolation and security guarantees.

These principles ensure that the backend can evolve sustainably without sacrificing maintainability.

---

# 130. Backend Architecture Summary

The HireMind AI backend is built as a production-ready modular monolith.

Its architecture separates responsibilities into distinct layers for business logic, AI capabilities, persistence, and infrastructure.

Key characteristics include

- FastAPI-based REST architecture
- Layered and modular design
- Feature-oriented project structure
- Dedicated AI Platform
- Repository pattern for persistence
- Workflow-based orchestration
- Strong typing with Pydantic
- SQLAlchemy and Alembic for data management
- Clerk-based authentication
- Organization-aware multi-tenancy
- Asynchronous AI processing
- Provider-independent integrations
- Scalable deployment strategy
- Incremental evolution path

This architecture balances simplicity, maintainability, and scalability while providing a solid foundation for HireMind AI's current requirements and future growth. It enables the platform to evolve by extending well-defined modules rather than requiring disruptive architectural rewrites.

---