# Google Cloud Run deployment

This MVP is designed to be deployed as a Cloud Run service for the Google Cloud Rapid Agent Hackathon.

## Prerequisites

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com cloudscheduler.googleapis.com firestore.googleapis.com aiplatform.googleapis.com
```

## Local verification

```bash
npm ci
npm test
PORT=8787 npm start
```

Open:

```text
http://localhost:8787
http://localhost:8787/api/opportunities
http://localhost:8787/api/submission-kit
http://localhost:8787/api/cloud-run
```

## Deploy to Cloud Run

```bash
gcloud run deploy hackathon-scout-agent \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

If using Gemini API directly, store the key as a secret or set it as an environment variable:

```bash
gcloud run services update hackathon-scout-agent \
  --region us-central1 \
  --set-env-vars GEMINI_API_KEY=YOUR_KEY
```

Production hardening should move the API key to Secret Manager.

## Daily monitoring trigger

After deployment, create a scheduler job that warms and refreshes the opportunity queue:

```bash
gcloud scheduler jobs create http hackathon-scout-agent-daily \
  --schedule="0 9 * * *" \
  --location=us-central1 \
  --uri="https://YOUR_CLOUD_RUN_URL/api/opportunities" \
  --http-method=GET
```

## Hackathon judging notes

- Gemini integration point: `enhancePacketWithGemini()` in `src/agent.js`.
- Cloud Run deployable: `Dockerfile`, `/api/cloud-run`, and this guide.
- Responsible automation: final registration, wallet signatures, KYC, and Devpost submission remain human-approved.
- MCP path: GitLab MCP can turn action plans into issues; MongoDB MCP can persist opportunity packets and evidence.
