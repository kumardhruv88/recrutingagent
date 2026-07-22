# CURRENT TASK

## Project

HireMind AI

---

# Current Phase

Phase 2 — Authentication & Multi-Tenancy

---

# Current Module

Authentication & Multi-Tenancy

---

# Goal

Build a secure, production-ready authentication and multi-tenant foundation for HireMind AI using Clerk.

This module establishes identity, organization management, tenant isolation, and reusable authentication dependencies that every future business module will use.

---

# Scope

Implement ONLY:

- Clerk authentication integration
- Clerk SDK configuration
- JWT verification
- User synchronization
- Organization synchronization
- Membership synchronization
- Clerk webhook endpoints
- Multi-tenant request context
- Authentication middleware
- Organization middleware
- Current User dependency
- Current Organization dependency
- Protected route dependencies
- Authentication database models
- Organization database models
- Membership database models
- Role placeholders
- Permission placeholders
- Authentication tests

---

# Do NOT Implement

Do NOT implement:

- Candidates
- Jobs
- Applications
- Resume Intelligence
- GitHub Intelligence
- AI Agents
- AI Orchestrator
- Email Automation
- Calendar Automation
- Notifications
- Workflow Engine
- Interview Scheduling
- RAG
- AI Copilot
- Analytics
- Business APIs

Authentication and Multi-Tenancy only.

---

# Architecture Rules

Follow all standards defined in:

- AI_CONTEXT.md
- docs/backend/00_EngineeringStandards.md

Reuse the existing Backend Foundation.

Do not duplicate infrastructure.

Business logic must remain outside routers.

Repositories should contain only database operations.

Services should coordinate business logic.

All database operations must remain asynchronous.

---

# Deliverables

By the end of this phase the backend should include:

- Clerk integration
- JWT authentication
- User model
- Organization model
- Membership model
- Authentication middleware
- Organization middleware
- Tenant-aware request context
- Authentication dependencies
- Webhook synchronization
- Protected routes
- Authentication tests
- Updated documentation

---

# Acceptance Criteria

The module is complete only if:

- Clerk authentication works
- JWT verification succeeds
- Clerk webhooks synchronize users
- Organizations synchronize correctly
- Memberships synchronize correctly
- Tenant context resolves automatically
- Protected endpoints reject unauthorized requests
- Ruff passes
- Black passes
- MyPy passes
- PyTest passes
- Documentation is updated

---

# Next Module

03_DatabaseArchitecture.md

Do NOT begin the next module until Authentication & Multi-Tenancy is fully completed, tested, and verified.