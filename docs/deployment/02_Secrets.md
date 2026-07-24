# Environment Variables and Secrets

This document outlines the required environment variables for deploying HireMind AI. **Never commit secrets to version control.**

## Frontend (Vercel)

Configure these in the Vercel Dashboard under Settings -> Environment Variables.

| Variable Name | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend publishable key | `pk_test_...` |
| `CLERK_SECRET_KEY` | Clerk backend secret key | `sk_test_...` |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | `https://xyz.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase public anonymous key | `eyJhb...` |
| `NEXT_PUBLIC_API_URL` | Backend URL | `https://your-space-name.hf.space` |

## Backend (Hugging Face Spaces)

Configure these in the Hugging Face Space Settings under "Variables and secrets". Note that Hugging Face separates standard "Variables" (publicly visible in the UI) and "Secrets" (hidden). 

Ensure all sensitive keys are added as **Secrets**.

| Variable Name | Type | Description | Example |
|---|---|---|---|
| `DATABASE_URL` | Secret | Supabase connection string (PostgreSQL) | `postgresql+asyncpg://postgres:[YOUR-PASSWORD]@db.xyz.supabase.co:5432/postgres` |
| `CLERK_SECRET_KEY` | Secret | Clerk backend secret key | `sk_test_...` |
| `CLERK_WEBHOOK_SECRET` | Secret | Secret for verifying Clerk webhook signatures | `whsec_...` |
| `JWT_SECRET` | Secret | Secret used for internal token signing | `your-secure-random-string` |
| `SUPABASE_URL` | Variable | Supabase project URL | `https://xyz.supabase.co` |
| `SUPABASE_KEY` | Secret | Supabase Service Role Key | `eyJhb...` |
| `AI_PROVIDER_KEY` | Secret | API key for OpenAI / Hugging Face | `sk-...` |
| `ENVIRONMENT` | Variable | The deployment environment | `production` |
| `LOG_LEVEL` | Variable | Logging verbosity | `INFO` |

## GitHub Actions (CI/CD)

Configure these in the GitHub Repository under Settings -> Secrets and variables -> Actions.

| Secret Name | Description |
|---|---|
| `VERCEL_TOKEN` | A Vercel Personal Access Token to deploy the frontend via CLI. |
| `HF_TOKEN` | A Hugging Face write-access token to push code to the Space. |
| `HF_SPACE_ID` | The ID of your hugging face space (e.g., `username/hiremind-backend`). |
