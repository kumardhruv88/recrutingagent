# HireMind AI - Backend Architecture

## Backend Architecture Overview
The backend is a production-ready Modular Monolith built with FastAPI and PostgreSQL (using SQLAlchemy 2 Async and Supabase). It follows Clean Architecture principles, ensuring that business logic is independent of infrastructure and the API layer.

## Project Structure
```
backend/
├── alembic/            # Database migrations
├── app/
│   ├── api/            # API Routers and Endpoints
│   ├── core/           # Configuration, Logging, Exception Handlers
│   ├── database/       # Engine, Session, Base Models, Mixins
│   ├── dependencies/   # Dependency Injection (DB, Settings, Logger)
│   ├── middleware/     # Request ID, CORS, Execution Time
│   ├── repositories/   # BaseRepository and custom repositories
│   ├── services/       # BaseService and business logic
│   └── utils/          # Standard responses, helpers
└── tests/              # Unit and Integration tests
```

## Running Locally

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Setup Environment**
   ```bash
   cp .env.example .env
   # Update DATABASE_URL in .env to your local PostgreSQL instance
   ```

3. **Run Migrations**
   ```bash
   alembic upgrade head
   ```

4. **Start Application**
   ```bash
   uvicorn app.main:app --reload
   ```

## Testing
Run the test suite with:
```bash
pytest
```

## Coding Standards
- **Formatting:** `black`
- **Linting:** `ruff`
- **Typing:** `mypy` (strict mode)
- Ensure 0 warnings and errors before committing.
- Prefer explicit async operations and avoid blocking the event loop.
- Use the shared exception hierarchy and standardized response format.
