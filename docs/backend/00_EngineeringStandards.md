# Backend Engineering Standards

> Version: 1.0
>
> Project: HireMind AI
>
> Applies to every backend module.

---

# 1. Purpose

This document defines the engineering standards that every backend module must follow.

Every implementation must be:

- Modular
- Readable
- Maintainable
- Testable
- Production-ready

These standards are mandatory for every future backend feature.

---

# 2. Engineering Philosophy

HireMind AI is built as a production-ready Modular Monolith.

The goal is simplicity with scalability.

Avoid:

- Over engineering
- Unnecessary abstractions
- Premature optimization
- Deep inheritance hierarchies
- Duplicate code

Prefer:

- Small modules
- Composition
- Clear interfaces
- Dependency Injection
- Async programming
- Reusable utilities

---

# 3. Architecture Principles

The backend follows:

- Modular Architecture
- Clean Architecture
- SOLID Principles
- Repository Pattern
- Service Layer
- Dependency Injection

Business logic must never depend on infrastructure.

---

# 4. Project Structure

Every feature should follow the same structure.

```
app/

api/
models/
schemas/
repositories/
services/
dependencies/
utils/
tests/
```

Do not invent new folder structures.

Keep consistency.

---

# 5. Layer Responsibilities

## API Layer

Responsible for:

- Routing
- Request validation
- Response serialization
- Dependency injection

Never:

- Write business logic
- Query database directly

---

## Service Layer

Responsible for:

- Business rules
- Validation
- Transactions
- Workflow coordination

Never:

- Return ORM objects directly
- Know HTTP details

---

## Repository Layer

Responsible for:

- Database queries
- CRUD
- Filtering
- Pagination

Never:

- Contain business logic

---

## Models

Responsible only for persistence.

No business methods.

---

## Schemas

Responsible for API contracts.

Never reuse ORM models as API responses.

---

# 6. Dependency Injection

Always inject:

- Database Session
- Configuration
- Logger
- Services
- Repositories

Never instantiate services inside routers.

---

# 7. Async Rules

Everything interacting with:

- Database
- HTTP
- AI
- File Storage

must be asynchronous.

Never block the event loop.

Never use synchronous SQLAlchemy.

---

# 8. Database Standards

Use:

- SQLAlchemy 2.x Async ORM
- Alembic
- PostgreSQL
- UUID primary keys

Every table should include:

- id
- created_at
- updated_at

Use UTC timestamps.

Never use integer IDs.

---

# 9. Repository Pattern

Every feature should expose:

Repository

↓

Service

↓

Router

Never skip layers.

---

# 10. Service Layer

Services coordinate:

Repositories

↓

AI Services

↓

External APIs

↓

Background Tasks

Keep services focused.

One service = one responsibility.

---

# 11. API Standards

Use REST.

Version APIs.

Example

/api/v1/jobs

Use nouns.

Good

/jobs

Bad

/createJob

---

# 12. Response Format

All APIs should return a consistent structure.

Example

```json
{
  "success": true,
  "message": "Operation completed.",
  "data": {}
}
```

Errors should use the same format.

---

# 13. Error Handling

Use centralized exception handling.

Create shared exceptions.

Examples

ValidationException

NotFoundException

ConflictException

ForbiddenException

UnauthorizedException

DatabaseException

Never expose internal stack traces.

---

# 14. Logging

Use structured logging.

Every request should include:

- Request ID
- Timestamp
- Log Level

Log:

- Errors
- Warnings
- Startup
- Shutdown
- Database failures

Never log secrets.

---

# 15. Configuration

Never hardcode:

- URLs
- Keys
- Passwords
- Tokens

Everything belongs inside environment variables.

Use Pydantic Settings.

---

# 16. Security

Validate every request.

Escape user input where necessary.

Hash passwords using bcrypt.

Prepare infrastructure for Clerk.

Never trust client data.

Never expose secrets.

---

# 17. Testing

Every feature must include:

Unit Tests

Integration Tests

Health Checks

Minimum expectations:

- Router tests
- Service tests
- Repository tests

---

# 18. Code Quality

Before every commit:

Run Ruff

Run Black

Run MyPy

Run PyTest

Project should have:

Zero lint errors

Zero type errors

---

# 19. Naming Conventions

Classes

PascalCase

Variables

snake_case

Functions

snake_case

Constants

UPPER_CASE

Files

snake_case.py

Routes

kebab-case

---

# 20. AI Services

AI logic should never exist inside routers.

AI belongs inside dedicated services.

Future AI modules include:

Resume Intelligence

GitHub Intelligence

Job Matching

ATS

Interview Evaluation

Recruiter Copilot

Workflow Planner

---

# 21. Human In The Loop

Critical AI decisions must require approval.

Examples:

Candidate rejection

Offer generation

Interview scheduling

Mass emailing

AI recommends.

Humans approve.

---

# 22. Background Tasks

Long-running work should execute outside request lifecycle.

Examples:

Resume parsing

GitHub crawling

Sending emails

Calendar synchronization

Interview processing

Do not block API requests.

---

# 23. External Integrations

Integrations belong inside dedicated modules.

Examples:

Google Calendar

Gmail

Google Drive

GitHub

Slack

Never scatter API logic throughout services.

---

# 24. Performance

Prefer:

Pagination

Indexes

Async

Selective loading

Avoid:

N+1 queries

Large payloads

Repeated database queries

---

# 25. Documentation

Every module must include:

Purpose

Architecture

Dependencies

Flow

Acceptance Criteria

Update documentation whenever architecture changes.

---

# 26. Git Standards

Use Conventional Commits.

Examples

feat(backend): implement candidate repository

fix(api): resolve pagination bug

refactor(service): simplify ranking service

docs: update backend foundation

---

# 27. Review Checklist

Before merging:

✓ Code is modular

✓ No duplicated logic

✓ No circular dependencies

✓ Tests pass

✓ Type checks pass

✓ Ruff passes

✓ Black passes

✓ Health endpoints work

✓ Documentation updated

✓ Environment variables documented

✓ Logging implemented

✓ Errors handled

✓ Async where required

✓ Security considered

---

# 28. Definition of Done

A backend module is complete only if:

- Feature implemented
- Tests written
- Documentation updated
- Lint passes
- Type checks pass
- Production build works
- Git committed
- Git pushed

Only then move to the next module.
