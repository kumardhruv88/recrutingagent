# Role Based Access Control (RBAC)

> Version: 1.0

---

# 1. Objective

Implement a centralized Role Based Access Control system for HireMind AI.

Every protected resource must be secured through reusable authorization policies.

Authentication identifies the user.

RBAC determines what the user is allowed to do.

---

# 2. Scope

Included

- Role Management
- Permission Management
- Authorization Service
- Permission Dependencies
- Permission Enforcement
- Authorization Policies

Excluded

- Candidates
- Jobs
- AI
- Email
- Calendar

---

# 3. RBAC Architecture

Request

↓

Authentication

↓

Current User

↓

Current Organization

↓

Membership

↓

Role

↓

Permissions

↓

Protected Endpoint

---

# 4. Roles

Implement:

Owner

Admin

Recruiter

Hiring Manager

Interviewer

Viewer

Roles belong to Membership.

A user may have different roles across organizations.

---

# 5. Permissions

Define reusable permissions.

Examples:

organization.read

organization.update

organization.delete

candidate.read

candidate.create

candidate.update

candidate.delete

job.read

job.create

job.update

job.delete

application.read

application.create

application.update

application.delete

interview.read

interview.create

interview.update

interview.delete

future.ai.use

future.billing.manage

---

# 6. Permission Mapping

Map every role to permissions.

Example:

Owner

↓

All permissions

Admin

↓

Most permissions

Recruiter

↓

Candidate

Job

Application

Interview

Hiring Manager

↓

Job

Application

Interview

Interviewer

↓

Interview

Viewer

↓

Read only

---

# 7. Authorization Service

Create AuthorizationService.

Responsibilities:

Resolve role

Resolve permissions

Validate access

Permission checks

Role checks

---

# 8. Dependencies

Create reusable dependencies.

Examples:

require_permission()

require_any_permission()

require_role()

require_owner()

Future modules must reuse these.

---

# 9. API Protection

Every protected endpoint must use authorization dependencies.

Never check permissions inside routers manually.

---

# 10. Security

Permission checks occur after authentication.

Always validate:

Membership

Role

Permission

Organization Context

Return 403 for unauthorized requests.

---

# 11. Testing

Test:

Permission resolution

Role mapping

Authorization dependencies

403 responses

Owner override

Organization isolation

---

# 12. Acceptance Criteria

✓ Permission mapping complete

✓ Dependencies reusable

✓ Authorization service works

✓ Tests pass

✓ Documentation updated

---

# 13. Deliverables

Role Enum

Permission Enum

Authorization Service

Dependencies

Tests

Documentation

---

# 14. Next Module

06_Candidates.md