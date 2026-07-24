# Hugging Face Spaces Deployment for FastAPI Backend

We utilize Hugging Face Spaces to host our FastAPI backend. The project requirements specify that we do **not** use Docker.

To run a FastAPI application natively without Docker on Hugging Face Spaces, we use the `gradio` SDK type as a generic Python runtime and execute the `uvicorn` server inside our `app.py` entrypoint.

## Deployment Process (Automated via GitHub Actions)

The `ci-cd.yml` pipeline handles deployment to Hugging Face automatically.

### Prerequisites

1. **Hugging Face Account:** Create an account on huggingface.co.
2. **Create a Space:**
   - Go to Hugging Face -> New Space.
   - Name your Space (e.g., `hiremind-backend`).
   - Select **Gradio** as the Space SDK. (This tells HF to look for an `app.py`).
   - Choose the hardware (the free "CPU basic" tier is sufficient for testing).
   - Create Space.
3. **GitHub Secrets:**
   - Go to your HF Account Settings -> Access Tokens -> Create a **Write** token.
   - Add this token as `HF_TOKEN` in your GitHub repository secrets.
   - Add your Space ID (e.g., `your-username/hiremind-backend`) as `HF_SPACE_ID` in GitHub secrets.

### How it Works (Under the Hood)

When the GitHub Action runs, it executes a `git push` to the Hugging Face Space's internal Git repository.

1. Hugging Face parses the `backend/README.md` YAML metadata to understand the project structure (`sdk: gradio`, `app_file: app.py`).
2. HF installs dependencies from `requirements.txt`.
3. HF executes `python app.py`.
4. Our `app.py` script starts the `uvicorn` ASGI server on port `7860` (the port HF expects Gradio to run on).
5. The FastAPI app binds to this port and handles incoming traffic.

### Environment Variables

Ensure you have added all required backend secrets (e.g., `DATABASE_URL`) directly in the Hugging Face Space settings. Navigate to **Space Settings -> Variables and secrets**. See [02_Secrets.md](02_Secrets.md) for the full list.
