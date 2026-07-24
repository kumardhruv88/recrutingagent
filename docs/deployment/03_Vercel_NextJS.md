# Vercel Deployment for Next.js Frontend

Deploying the HireMind AI frontend to Vercel is highly optimized since Vercel is the creator of Next.js.

## Deployment Process (Automated via GitHub Actions)

The deployment is handled automatically by our `ci-cd.yml` workflow when changes are pushed to `main`. It uses the Vercel CLI to securely build and deploy.

### Prerequisites

1. **Vercel Account:** Ensure you have a Vercel account.
2. **Project Link:**
   - Install Vercel CLI locally: `npm i -g vercel`
   - Run `vercel link` in the `frontend/` directory to link the repository to a Vercel project.
   - This creates a `.vercel/project.json` containing the Project ID and Org ID.
3. **GitHub Secrets:**
   - Add `VERCEL_TOKEN` (generated in Vercel Account Settings -> Tokens) to your GitHub repository secrets.

### Environment Variables

Ensure you have configured the environment variables as specified in [02_Secrets.md](02_Secrets.md).

You can add these variables directly in the Vercel Dashboard:
- Select your Project -> Settings -> Environment Variables.

### Native Vercel Integration (Alternative)

If you prefer to bypass the Vercel CLI in GitHub Actions, you can use Vercel's native GitHub app:
1. Connect your GitHub repository in the Vercel Dashboard.
2. Set the "Root Directory" to `frontend`.
3. Vercel will automatically trigger deployments on git push.
> [!WARNING]
> If you use the native integration, Vercel will deploy *before* your GitHub Actions quality gates finish. For a production environment, CLI deployment within the GitHub Action is recommended to ensure code quality tests pass first.
