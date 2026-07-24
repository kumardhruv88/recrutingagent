#!/bin/bash
# migrate.sh
# Dedicated script to safely run Alembic migrations.

set -e

echo "Starting DB Migrations..."

# Validate if alembic is accessible
if ! command -v alembic &> /dev/null
then
    echo "Alembic could not be found. Ensure virtualenv is activated and requirements installed."
    exit 1
fi

echo "Running alembic upgrade head..."
alembic upgrade head

echo "Migrations completed successfully."
