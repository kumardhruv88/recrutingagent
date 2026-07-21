# HireMind AI Engineering Constitution

This document serves as the permanent and immutable engineering constitution for the **HireMind AI** repository. It defines all foundational principles, standards, and rules. Every implementation, architecture decision, prompt, pull request, and deployment must strictly adhere to this document. In the event of conflicting documentation, this constitution takes absolute precedence.

---

## 1. Engineering Philosophy
We build software that outlasts the individuals who wrote it. 
- **Quality Over Velocity:** A slow, correct feature is infinitely better than a fast, broken one.
- **Maintainability First:** Code is read 100x more often than it is written. Optimize for readability.
- **Zero Magic:** Explicit is better than implicit. We avoid "clever" one-liners in favor of readable, verbose code.

## 2. Product Philosophy
HireMind AI is not merely an applicant tracker; it is an intelligent, scalable Copilot.
- **AI as an Augmentation, Not a Replacement:** The human is always in the loop. The AI suggests; the user decides.
- **Explainability:** AI outputs must always be auditable and explainable. No "black box" rejections.
- **Data Privacy:** Candidate data is sacred. We enforce multi-tenant isolation rigorously.

## 3. Coding Philosophy
- Code must be boring. Boring code is predictable code.
- If a junior developer cannot understand it within 5 minutes, it is too complex.
- We do not tolerate "TODO" comments in the main branch. Fix it now or create a ticket.

## 4. Repository Standards
- **Monorepo Approach:** Frontend and Backend coexist logically to streamline types and API schemas, but remain cleanly separated by boundaries (`/frontend` and `/backend`).
- **Strict Formatting:** Code must pass formatters (`prettier`, `black`, `isort`) unconditionally.
- **No Unused Code:** Dead code must be deleted, not commented out. Version control remembers it.

## 5. Folder Organization Rules
Every file belongs in a clearly defined directory based on its domain. 
- **Frontend:** Follows a domain-driven `features/` directory (e.g., `features/auth`, `features/candidates`).
- **Backend:** Follows `domains/` inside the `app/` structure.
- **No "Junk" Folders:** Folders named `helpers`, `misc`, or `core` (without specific boundaries) are forbidden. 

## 6. Feature-first Development
We organize by feature, not by technical layer.
- **Bad:** Grouping all controllers, all services, all models together globally.
- **Good:** Grouping the `CandidateController`, `CandidateService`, and `CandidateModel` under `domains/candidate`.
- **Why?** It ensures deleting or extracting a feature is a localized operation, paving the way for microservices.

## 7. Clean Architecture Principles
- **Separation of Concerns:** The UI does not know about the Database. The API layer does not contain business logic.
- **Dependency Rule:** Inner layers (Business Logic, Core Models) must never depend on outer layers (UI, Web Frameworks, DB ORMs).

## 8. SOLID Principles
Every class and module must adhere to:
1. **Single Responsibility:** One reason to change.
2. **Open/Closed:** Open for extension, closed for modification.
3. **Liskov Substitution:** Subtypes must be replaceable for base types.
4. **Interface Segregation:** Small, specific interfaces.
5. **Dependency Inversion:** Depend on abstractions, not concretions.

## 9. DRY (Don't Repeat Yourself)
- If you write the same logic twice, consider extracting it. If you write it three times, you **must** extract it.
- Exception: Do not apply DRY if it prematurely couples two completely unrelated domains (e.g., User Auth logic vs Admin Auth logic).

## 10. KISS (Keep It Simple, Stupid)
- Always choose the simplest solution that fulfills the requirement.
- Over-engineering is penalized. Do not build an abstraction layer for a future use-case that does not exist today.

## 11. YAGNI (You Aren't Gonna Need It)
- Never implement functionality based on "we might need this later". 
- Implement precisely what is required by the current ticket. No more, no less.

## 12. Domain Driven Design Guidelines
- Establish a Ubiquitous Language. If the product team says "Recruiter", the code must say `Recruiter`, not `HiringManager` or `Admin`.
- Protect Bounded Contexts. A candidate's view of an "Interview" is a different object than the recruiter's view of an "Interview". 

## 13. Naming Conventions
- Names must express intent clearly.
- **Avoid Abbreviations:** Use `candidate_id` not `c_id`. Use `fetchOrganization` not `getOrg`.
- **Boolean Variables:** Must start with `is`, `has`, `should`, or `can` (e.g., `isVerified`).

## 14. File Naming Rules
- **Frontend (React/TS):** PascalCase for components (`CandidateProfile.tsx`). camelCase for utilities/hooks (`useAuth.ts`).
- **Backend (Python):** snake_case for all files (`candidate_service.py`).
- **Docs (Markdown):** PascalCase or kebab-case, strictly standardized per folder.

## 15. Component Naming Rules
- Components must be nouns describing their visual function or domain entity.
- Base components (buttons, inputs) must be prefixed with their library or role (e.g., `UiButton`, `FormInput`).
- Feature components must include their domain (e.g., `CandidateResumeViewer`).

## 16. Backend Naming Rules
- **Services:** Suffixed with `Service` (e.g., `ResumeParsingService`).
- **Repositories:** Suffixed with `Repository` (e.g., `UserRepository`).
- **Models:** Singular nouns (e.g., `Candidate`, `JobPosting`).

## 17. API Naming Rules
- Use strict RESTful resource naming. Nouns, pluralized.
- **GET** `/api/v1/candidates` (List)
- **POST** `/api/v1/candidates` (Create)
- **GET** `/api/v1/candidates/{id}` (Read)
- **PATCH** `/api/v1/candidates/{id}` (Update)
- Endpoints must never contain verbs (e.g., `/api/v1/getCandidates` is strictly forbidden).

## 18. Database Naming Rules
- **Tables:** plural, snake_case (e.g., `job_postings`).
- **Columns:** snake_case (e.g., `created_at`, `resume_url`).
- **Foreign Keys:** Must end in `_id` (e.g., `organization_id`).

## 19. TypeScript Standards
- `strict: true` must always be enabled.
- The `any` type is completely forbidden. Use `unknown` if truly dynamic, then type guard.
- Interfaces over Types for object definitions, as they are extensible and provide better error messages.

## 20. Python Standards
- Strictly use Python 3.12+ type hints.
- Use `Pydantic v2` for all data validation and serialization.
- All functions must have type hints for arguments and return types. No exceptions.

## 21. React Standards
- React 19 functional components only. No class components.
- State should be pushed down as close to the UI as possible.
- Use `TanStack Query` for all server state. Use Context/Zustand ONLY for pure client state.
- Components must not exceed 200 lines. Split into smaller components.

## 22. FastAPI Standards
- Use APIRouters to split endpoints by domain.
- Never write business logic inside the router function. Pass validated schemas to a Service layer.
- Use dependency injection for database sessions and current users.

## 23. AI Development Standards
- Treat LLM APIs as highly unreliable databases. All outputs must be validated strictly using `Instructor` or `Pydantic` schemas before entering our system.
- Log token usage, latency, and exact prompts for every inference call.

## 24. Prompt Engineering Standards
- Prompts must be treated as code. They must be version-controlled, modularized, and strictly templated.
- Use System Prompts for persona and constraints. Use User Prompts solely for input variables.

## 25. Documentation Standards
- The `docs/` folder is the source of truth.
- Every function exposed outside its module must have a JSDoc or Python Docstring explaining *what* it does and *why*, not *how*.
- Architecture decisions must be recorded as an ADR.

## 26. Error Handling Standards
- Errors must be caught at the lowest reasonable level and thrown up as standard Domain Exceptions.
- The UI must never display raw backend errors.
- **Frontend:** Wrap features in Error Boundaries.
- **Backend:** Use global exception handlers to standardize HTTP 400/500 responses.

## 27. Logging Standards
- `print()` and `console.log()` are strictly forbidden in production.
- Use structured JSON logging (`structlog` in Python, a logging library in JS).
- Log levels must be respected: `ERROR` (action required), `WARN` (potential issue), `INFO` (state change), `DEBUG` (tracing).
- Never log PII (Personally Identifiable Information) or Secrets.

## 28. Security Standards
- Treat all user input as malicious. Validate everything using `Zod` (frontend) and `Pydantic` (backend).
- Rely on proven security libraries. Never roll your own crypto or JWT validation.

## 29. Authentication Rules
- We use **Clerk** exclusively for Authentication.
- Backend APIs must verify the Clerk JWT for every single protected request via middleware.
- Passwords are never handled, seen, or stored on our servers.

## 30. Authorization Rules
- Role-Based Access Control (RBAC) is enforced at the API layer, not just the UI layer.
- A user cannot access a resource outside their `organization_id`. Every DB query must append `.where(org_id == current_org)`.

## 31. Database Migration Rules
- Database schemas are managed strictly via Alembic.
- Manual database changes are forbidden.
- Migrations must be reversible (`upgrade` and `downgrade` both implemented).
- Migrations must not break the current production code (zero-downtime migrations).

## 32. Testing Philosophy
- Tests are not optional. Code without tests is legacy code by default.
- **Unit Tests:** For isolated business logic and utility functions.
- **Integration Tests:** For API endpoints hitting a test database.
- TDD is heavily encouraged.

## 33. Performance Standards
- Pagination is mandatory on all list endpoints from Day 1. No exceptions.
- Frontend must aggressively lazy-load heavy components and utilize Next.js server components where possible.
- Avoid N+1 queries in SQLAlchemy by utilizing `joinedload` appropriately.

## 34. Accessibility Standards
- All UI components must comply with WCAG 2.1 AA standards.
- Rely on `shadcn/ui` and Radix primitives for built-in accessibility.
- `aria-labels` and keyboard navigability are mandatory.

## 35. Responsive Design Rules
- Mobile-first approach using Tailwind CSS.
- The UI must be fully functional on devices as narrow as 320px.

## 36. Design Consistency Rules
- Use exact design tokens (colors, spacing, typography) from the Tailwind config.
- Arbitrary pixel values (e.g., `w-[312px]`) are forbidden. Stick to the spacing scale.

## 37. Code Review Checklist
Before approving a PR, reviewers must check:
- Does it solve the ticket?
- Is it tested?
- Is it documented?
- Does it adhere to the Naming Conventions and Clean Architecture?
- Are there any security risks?

## 38. Pull Request Rules
- PRs must be small and focused on a single concern (< 400 lines changed if possible).
- The PR title must follow the Conventional Commits specification.
- You must link the PR to an Epic or Issue.

## 39. Git Branch Strategy
- We use Trunk-Based Development.
- `main` is always deployable.
- Feature branches branch off `main` and use the naming convention `feat/ticket-id-description`, `bug/ticket-id-description`, or `chore/description`.

## 40. Commit Message Convention
We strictly follow Conventional Commits:
- `feat: add AI interview scheduler`
- `fix: resolve JWT parsing error`
- `docs: update ADR 005`
- `refactor: extract candidate card component`

## 41. Environment Variable Rules
- All environment variables must be declared in `.env.example`.
- The application must fail immediately at startup if a required environment variable is missing (validated via Pydantic Settings / Zod).

## 42. Third-party Integration Rules
- Third-party APIs (Google, GitHub, Clerk) must be wrapped in a Facade or Service class.
- The rest of the application interacts with our Interface, not the third-party library directly. This ensures vendor lock-in is minimized.

## 43. Google API Standards
- Authentication with Google uses OAuth via Clerk where possible.
- Background syncs with Google Calendar/Drive must be handled by robust background workers with exponential backoff and retry mechanisms.

## 44. Hugging Face Integration Rules
- Always specify the exact model version/hash, never use `latest`.
- Implement robust timeout and fallback mechanisms for inference calls.
- Cache repetitive queries (e.g., static embeddings) using Redis or FAISS/Chroma locally.

## 45. VAPI / Voice AI Rules
- Voice interactions require extreme latency optimization.
- Payload sizes must be minimized.
- System prompts for Voice AI must strictly limit verbosity and enforce conversational boundaries to prevent hallucination.

## 46. Analytics Standards
- Analytics tracking must be implemented via a centralized provider interface.
- UI components do not trigger analytics directly; they dispatch events to a `TrackingService`.
- No PII is sent to product analytics tools.

## 47. Monitoring Standards
- Sentry (or equivalent) must be initialized on both frontend and backend to catch unhandled exceptions.
- Critical endpoints must have APM (Application Performance Monitoring) tracing enabled.

## 48. Deployment Philosophy
- Deployments must be fully automated, repeatable, and boring.
- Deployments happen multiple times a day. If it hurts, do it more often.

## 49. CI/CD Standards
- GitHub Actions is the source of truth for CI.
- Every PR must pass `lint`, `typecheck`, and `test` pipelines before the merge button turns green.
- `main` merges automatically trigger deployments to the Staging environment.

## 50. Production Readiness Checklist
Before any feature hits production:
- Migration applied?
- Environment variables set in production?
- Load tested (if critical)?
- Feature flags configured?
- Documentation updated?

## 51. Definition of Done
A task is DONE only when:
- Code is written and adheres to this Constitution.
- Unit and Integration tests pass.
- Code is peer-reviewed and merged to `main`.
- Feature is deployed to Staging and QA verified.
- Product Owner accepts the implementation.

## 52. AI Agent Rules
- Any AI Agent operating within the system must log its exact reasoning trajectory.
- Agents must have strictly defined scopes (e.g., an Interview Agent cannot modify Billing settings).
- Agents must operate under the exact RBAC privileges of the user who invoked them.

## 53. Rules for Future Contributors
- Read this document.
- Leave the codebase better than you found it.
- If a rule here no longer makes sense, do not silently ignore it. Open a PR to amend the Constitution.

## 54. Rules for AI Coding Assistants
- When writing code for this repository, AI Assistants (e.g., Copilot, ChatGPT, Claude) must ingest this document.
- Assistants must NEVER generate placeholder APIs, fake data layers, or bypass validation.
- Assistants must adhere to the 300-line limit per file, prioritizing modular extraction.

## 55. Rules that every implementation prompt must follow
Every prompt requesting code generation MUST:
1. Specify the exact Domain or Feature bounded context.
2. Demand strict typing (TS or Python).
3. Demand proper error handling.
4. Reference the specific tech stack (FastAPI/Next.js).
5. Forbid the usage of inline styles or raw CSS; enforce Tailwind.
6. Demand adherence to the HireMind AI Architecture and Constitution.
