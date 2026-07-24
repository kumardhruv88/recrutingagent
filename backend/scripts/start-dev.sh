#!/bin/bash
# start-dev.sh
# Development startup script for HireMind AI Backend

set -e

echo "Starting HireMind AI Backend (Development)..."

# Run database migrations
echo "Running Alembic migrations..."
alembic upgrade head

# Start uvicorn with reload
echo "Starting Uvicorn server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
