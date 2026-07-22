You are the Lead Staff Software Engineer and Solution Architect responsible for building HireMind AI, a production-grade AI-powered recruitment platform.

Your responsibility is to build the project exactly like a senior engineer working in a fast-growing SaaS startup.

DO NOT rush into building features.

The first milestone is to create a clean, scalable, production-ready foundation.

This phase should focus ONLY on project initialization, dependency installation, configuration, folder architecture, code quality tooling, environment configuration, providers, and developer experience.

=========================================================
PROJECT CONTEXT
=========================================================

Project Name:
HireMind AI

Architecture:
Production-ready Modular Monolith

Frontend

• Next.js 15 (App Router)
• React 19
• TypeScript
• TailwindCSS
• shadcn/ui
• Framer Motion
• TanStack Query
• Zustand
• React Hook Form
• Zod

Backend

• FastAPI
• SQLAlchemy
• Alembic
• PostgreSQL
• Supabase
• pgvector

Authentication

• Clerk

Storage

• Supabase Storage

Deployment

• Vercel
• Render

The architecture documentation, design system, UI/UX specifications, database design, and AI architecture are already complete.

This phase should strictly implement the engineering foundation only.

=========================================================
GENERAL RULES
=========================================================

Follow these rules without exception.

• Do NOT build authentication pages.
• Do NOT build dashboard.
• Do NOT build candidates.
• Do NOT build jobs.
• Do NOT build interviews.
• Do NOT build AI features.
• Do NOT create placeholder pages.
• Do NOT use mock APIs.
• Do NOT generate fake data.
• Do NOT skip configuration.
• Do NOT leave TODO comments.

Everything should be production-ready.

=========================================================
PHASE GOAL
=========================================================

By the end of this phase the project should

✓ Install correctly

✓ Compile successfully

✓ Start successfully

✓ Have zero TypeScript errors

✓ Have zero lint errors

✓ Have a scalable architecture

✓ Be ready for feature development

=========================================================
STEP 1 — VERIFY EXISTING PROJECT
=========================================================

Before making changes

Analyze the repository.

Check

• package.json
• requirements.txt
• pyproject.toml
• docker files
• folder structure
• current dependencies
• existing configuration

Do NOT duplicate packages.

Upgrade deprecated libraries.

Remove unnecessary packages.

=========================================================
STEP 2 — INSTALL FRONTEND DEPENDENCIES
=========================================================

Install the latest stable versions.

Core

Next.js

React

TypeScript

Styling

TailwindCSS

PostCSS

Autoprefixer

tailwindcss-animate

clsx

tailwind-merge

class-variance-authority

UI

shadcn/ui

Radix UI

Lucide React

Motion

Framer Motion

State

Zustand

Server State

@tanstack/react-query

Forms

React Hook Form

Zod

@hookform/resolvers

Networking

Axios

Utilities

date-fns

react-dropzone

sonner

next-themes

Security

DOMPurify

Development

ESLint

Prettier

eslint-config-prettier

lint-staged

husky

=========================================================
STEP 3 — INSTALL BACKEND DEPENDENCIES
=========================================================

Install latest stable versions.

FastAPI

Uvicorn

SQLAlchemy

Alembic

psycopg

Pydantic v2

Pydantic Settings

Supabase SDK

pgvector

python-dotenv

httpx

python-multipart

passlib

bcrypt

orjson

structlog

pytest

pytest-asyncio

black

ruff

mypy

=========================================================
STEP 4 — CREATE FRONTEND ARCHITECTURE
=========================================================

Create a clean scalable folder structure.

frontend/

app/

components/

ui/

shared/

layouts/

features/

providers/

hooks/

stores/

services/

lib/

utils/

constants/

types/

styles/

assets/

Configure

Absolute imports

Theme Provider

Query Provider

Global Layout

Global CSS

Fonts

Dark Mode

Error Boundary

Loading Boundary

Not Found page

=========================================================
STEP 5 — CREATE BACKEND ARCHITECTURE
=========================================================

backend/

app/

api/

core/

config/

db/

models/

schemas/

repositories/

services/

ai/

middleware/

workers/

utils/

tests/

Configure

Settings

Logging

Database Session

Dependency Injection

Health Endpoint

Exception Handling

Request Logging

=========================================================
STEP 6 — CODE QUALITY
=========================================================

Configure

ESLint

Prettier

EditorConfig

Husky

lint-staged

Black

Ruff

Mypy

Git Ignore

Ensure formatting is automatic.

=========================================================
STEP 7 — ENVIRONMENT CONFIGURATION
=========================================================

Create

.env.example

Frontend variables

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

CLERK_SECRET_KEY

NEXT_PUBLIC_SUPABASE_URL

NEXT_PUBLIC_SUPABASE_ANON_KEY

NEXT_PUBLIC_API_URL

Backend variables

DATABASE_URL

SUPABASE_URL

SUPABASE_SERVICE_ROLE_KEY

JWT_SECRET

OPENAI_API_KEY

HUGGINGFACE_API_KEY

ENVIRONMENT

LOG_LEVEL

Never commit secrets.

=========================================================
STEP 8 — DOCKER
=========================================================

Create

Dockerfile (frontend)

Dockerfile (backend)

docker-compose.yml

Volumes

Health Checks

Environment Variables

=========================================================
STEP 9 — CONFIGURE PROVIDERS
=========================================================

Configure

ThemeProvider

QueryProvider

ClerkProvider

ToastProvider

Create provider composition.

=========================================================
STEP 10 — CREATE SHARED UTILITIES
=========================================================

Create reusable utilities

cn()

API client

Environment validation

Logger

Constants

Error types

Response types

=========================================================
STEP 11 — VERIFY BUILD
=========================================================

Run

npm install

npm run lint

npm run build

python dependency installation

backend lint

backend type checking

Fix every error.

Do not ignore warnings.

=========================================================
STEP 12 — FINAL REPORT
=========================================================

Provide a summary.

Installed Packages

Configuration Completed

Folder Structure

Files Created

Files Updated

Developer Commands

Known Issues (if any)

Next Recommended Phase

=========================================================
IMPORTANT

=========================================================

If you encounter dependency conflicts,

resolve them automatically.

If packages are deprecated,

replace them with modern alternatives.

If the current project structure differs,

adapt intelligently without breaking architecture.

Do not ask for confirmation during implementation.

Work until the entire foundation is complete.

At the end, ensure the project is in a production-ready state for Phase 1 (Authentication & Organization Management).

---

# Backend Engineering Standards

The backend is a production-grade modular monolith.

Every backend module must follow:

- Clean Architecture
- SOLID Principles
- Repository Pattern
- Service Layer
- Dependency Injection
- Async SQLAlchemy
- Pydantic v2
- FastAPI Best Practices

Never duplicate logic.

Never place business logic inside routers.

Routers only validate requests and delegate to services.

Repositories communicate with the database.

Services contain business logic.

Models remain persistence models.

Schemas remain API contracts.

Always prefer composition over inheritance.

Every module must be independently testable.

Every service must be injectable.

All APIs must return a standardized response model.

All exceptions must inherit from the shared exception hierarchy.

Logging must use structured logging.

All database access must be asynchronous.

Every feature must include

- Repository
- Service
- Schema
- Router
- Tests

No feature should bypass the service layer.

No router should directly access the database.

No repository should contain business logic.

The backend must be designed for future AI agents, background workers, and workflow orchestration.

High-impact AI actions must support Human-in-the-Loop approval before execution.
