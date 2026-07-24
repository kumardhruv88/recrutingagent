#!/bin/bash
# start-prod.sh
# Production startup script for HireMind AI Backend

set -e

echo "Starting HireMind AI Backend (Production)..."

# In Hugging Face spaces or standard production environments, we should run migrations first.
echo "Running Alembic migrations..."
alembic upgrade head

# Hugging face sets the PORT environment variable to 7860 by default.
PORT=${PORT:-7860}

# Start uvicorn without reload
echo "Starting Uvicorn server on port $PORT..."
uvicorn app.main:app --host 0.0.0.0 --port $PORT --workers 4
