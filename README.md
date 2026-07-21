# HireMind AI

> **AI-Powered Hiring Copilot** — Enterprise SaaS platform that automates the complete hiring lifecycle for recruiters and candidates.

---

## Architecture

Production-ready **Modular Monolith** with a clear separation between frontend and backend.

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, shadcn/ui |
| **Backend** | FastAPI, Python 3.12+, Pydantic v2, SQLAlchemy 2.0, Alembic |
| **Database** | Supabase PostgreSQL + pgvector |
| **Authentication** | Clerk |
| **Storage** | Supabase Storage |
| **AI** | HuggingFace Inference API, Sentence Transformers |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Repository Structure

```
recruit/
├── docs/               # Architecture, PRD, engineering docs
│   ├── architecture/   # System design, frontend/backend architecture
│   ├── database/       # Database design
│   ├── api/            # OpenAPI specification
│   ├── engineering/    # Coding standards, contributing, testing
│   ├── features/       # Feature specifications per module
│   ├── PRD/            # Phase-by-phase product requirements
│   ├── diagrams/       # Architecture diagrams
│   └── templates/      # Reusable doc templates
├── frontend/           # Next.js 15 application
│   └── src/
│       ├── app/        # App Router pages and layouts
│       ├── components/ # Shared and feature UI components
│       ├── features/   # Feature-scoped modules
│       ├── providers/  # Global React providers
│       ├── hooks/      # Custom React hooks
│       ├── stores/     # Zustand state stores
│       ├── services/   # API service layer
│       ├── lib/        # Utilities and configuration
│       ├── types/      # TypeScript type definitions
│       └── styles/     # Global styles
├── backend/            # FastAPI application
│   └── app/
│       ├── api/        # Route handlers
│       ├── core/       # App configuration and startup
│       ├── db/         # Database session and connection
│       ├── models/     # SQLAlchemy ORM models
│       ├── schemas/    # Pydantic request/response schemas
│       ├── repositories/ # Data access layer
│       ├── services/   # Business logic layer
│       ├── ai/         # AI/ML service integrations
│       ├── middleware/ # Custom FastAPI middleware
│       └── utils/      # Shared utilities
├── shared/             # Cross-cutting types, schemas, constants
├── scripts/            # Developer build and utility scripts
├── assets/             # Static assets and branding
└── .github/            # CI/CD workflows and PR templates
```

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload
```

---

## Environment Variables

Copy the example files and fill in your values:

```bash
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

---

## Deployment

- **Frontend** → [Vercel](https://vercel.com)
- **Backend** → [Render](https://render.com)
- **Database** → [Supabase](https://supabase.com)

---

## Documentation

Full documentation is in the [`docs/`](./docs/) directory.  
Engineering handbook: [`docs/project_const.md`](./docs/project_const.md)

---

## Contributing

See [`docs/engineering/Contributing.md`](./docs/engineering/Contributing.md).

## License

MIT License — see [`LICENSE`](./LICENSE).
