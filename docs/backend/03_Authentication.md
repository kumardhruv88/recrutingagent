# Authentication & Multi-Tenancy

> Version: 1.0
>
> Project: HireMind AI

---

# 1. Objective

The Authentication module establishes identity management and multi-tenancy for HireMind AI.

Authentication is handled entirely by Clerk.

The backend is responsible for:

- Verifying authenticated requests
- Synchronizing Clerk users
- Synchronizing organizations
- Managing memberships
- Resolving tenant context
- Providing reusable authentication dependencies

This module becomes the security foundation for every future backend feature.

---

# 2. Scope

Included:

- Clerk Integration
- JWT Verification
- User Synchronization
- Organization Synchronization
- Membership Synchronization
- Clerk Webhooks
- Multi-Tenant Context
- Authentication Middleware
- Organization Middleware
- Current User Dependency
- Current Organization Dependency
- Protected Routes
- Authentication Tests

Excluded:

- Candidates
- Jobs
- Applications
- Resume Intelligence
- GitHub Intelligence
- AI Services
- Calendar
- Email
- Notifications
- Workflow Engine
- RBAC Enforcement

---

# 3. Authentication Flow

```
Client

↓

Clerk Authentication

↓

JWT Token

↓

FastAPI Middleware

↓

JWT Verification

↓

Current User

↓

Current Organization

↓

Protected API
```

The backend never manages passwords.

Clerk is the single authentication provider.

---

# 4. Database Models

Create only three models.

## User

Stores synchronized Clerk users.

Required fields:

- id (UUID4)
- clerk_user_id
- email
- first_name
- last_name
- profile_image
- is_active
- created_at
- updated_at

---

## Organization

Stores synchronized Clerk organizations.

Required fields:

- id
- clerk_organization_id
- name
- slug
- logo_url
- created_at
- updated_at

---

## Membership

Represents a user's membership in an organization.

Required fields:

- id
- user_id
- organization_id
- role
- is_active
- joined_at

Support multiple organizations per user.

---

# 5. Clerk Integration

Configure Clerk SDK.

Implement:

- JWT verification
- Clerk configuration
- Authentication dependency
- Current authenticated user
- Authentication middleware

Authentication should be reusable.

---

# 6. Webhooks

Implement secure Clerk webhook endpoints.

Handle:

- User Created
- User Updated
- User Deleted
- Organization Created
- Organization Updated
- Organization Deleted
- Membership Created
- Membership Updated
- Membership Deleted

Verify webhook signatures.

Never trust incoming payloads.

---

# 7. Multi-Tenancy

Every authenticated request must resolve:

Current User

↓

Current Organization

↓

Membership

↓

Tenant Context

Future business modules should never manually resolve organizations.

Tenant context should already exist.

---

# 8. Authentication Middleware

Middleware should:

Verify JWT

Resolve User

Resolve Organization

Attach Context

Reject unauthorized requests

Skip only public endpoints.

---

# 9. Dependencies

Create reusable dependencies.

Examples:

get_current_user()

get_current_organization()

require_authenticated_user()

require_active_membership()

Future modules must reuse these dependencies.

---

# 10. Authorization Preparation

Prepare RBAC foundation.

Create:

Role Enum

Permission Enum

Membership Role

Do NOT enforce permissions.

Permission enforcement belongs to the RBAC module.

---

# 11. API Endpoints

Implement only authentication-related endpoints.

Examples:

/webhooks/clerk

/auth/me

/organizations/current

No login or signup routes.

Authentication is handled by Clerk.

---

# 12. Error Handling

Handle:

Invalid JWT

Expired JWT

Missing User

Missing Organization

Inactive Membership

Webhook Verification Failure

Return standardized API responses.

---

# 13. Security

Never trust client claims.

Always verify JWT signatures.

Always verify webhook signatures.

Never expose Clerk secrets.

Never store passwords.

Never expose internal authentication errors.

---

# 14. Testing

Write tests for:

JWT Verification

Authentication Middleware

Current User Dependency

Current Organization Dependency

Webhook Verification

User Synchronization

Organization Synchronization

Membership Synchronization

Protected Endpoints

---

# 15. Acceptance Criteria

Authentication is complete only if:

✓ Clerk authentication works

✓ JWT verification succeeds

✓ Users synchronize correctly

✓ Organizations synchronize correctly

✓ Memberships synchronize correctly

✓ Webhooks are verified

✓ Tenant context resolves correctly

✓ Protected routes reject unauthorized requests

✓ Ruff passes

✓ Black passes

✓ MyPy passes

✓ PyTest passes

---

# 16. Deliverables

At the end of this module the backend should contain:

✓ Clerk Integration

✓ Authentication Middleware

✓ User Model

✓ Organization Model

✓ Membership Model

✓ JWT Verification

✓ Webhook Synchronization

✓ Authentication Dependencies

✓ Tenant Context

✓ Protected Routes

✓ Tests

✓ Updated Documentation

---

# 17. Next Module

03_DatabaseArchitecture.md

This module will introduce the remaining core database entities required by the recruitment platform, including candidates, jobs, applications, interviews, and supporting relationships.

Do not begin Database Architecture until Authentication & Multi-Tenancy has been fully implemented, tested, and verified.