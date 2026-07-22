# Organization Management

> Version: 1.0

---

# 1. Objective

Implement organization management for HireMind AI.

Organizations are the tenant boundary of the application.

Every business entity belongs to exactly one organization.

---

# 2. Scope

Included

- Organization CRUD
- Active Organization
- Organization Switching
- Organization Invitations
- Organization Settings

Excluded

- RBAC
- Candidates
- Jobs
- AI
- Email

---

# 3. Responsibilities

The organization module is responsible for:

- Managing organizations
- Managing organization metadata
- Switching active organization
- Validating organization ownership
- Invitation lifecycle

---

# 4. Services

Create:

OrganizationService

Responsibilities:

- Create organization
- Update organization
- Delete organization
- Switch organization
- Validate organization
- Invite member

---

# 5. Repository

OrganizationRepository

Implement:

- create
- update
- delete
- get_by_id
- get_by_slug
- list
- exists

---

# 6. APIs

Implement:

GET /organizations

GET /organizations/current

GET /organizations/{id}

POST /organizations

PATCH /organizations/{id}

DELETE /organizations/{id}

POST /organizations/switch

POST /organizations/invitations

GET /organizations/invitations

DELETE /organizations/invitations/{id}

---

# 7. Organization Switching

Every authenticated user may belong to multiple organizations.

The backend should support:

Current User

↓

Memberships

↓

Active Organization

↓

Tenant Context

---

# 8. Invitations

Support invitation lifecycle.

Invitation states:

Pending

Accepted

Expired

Cancelled

Reject duplicate invitations.

---

# 9. Validation

Validate:

Organization exists

Membership exists

Organization active

Invitation valid

---

# 10. Security

Only organization owners/admins may:

Update organization

Delete organization

Invite members

Switching organization requires active membership.

---

# 11. Testing

Test:

CRUD

Switching

Invitations

Validation

Organization resolution

---

# 12. Acceptance Criteria

✓ CRUD complete

✓ Switching complete

✓ Invitations complete

✓ Validation complete

✓ Tests pass

---

# 13. Deliverables

Organization Repository

Organization Service

Organization APIs

Invitation APIs

Tests

Documentation

---

# 14. Next Module

05_RBAC.md