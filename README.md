# Hackathon Scout Agent

Hackathon Scout Agent is a Gemini-ready, Cloud Run deployable agent workflow for the Google Cloud Rapid Agent Hackathon. It helps an independent builder continuously find, rank, apply to, and submit AI/Web3 hackathons and bounty tasks while keeping sensitive account actions human-approved.

## Why it matters

Many solo builders miss paid opportunities because discovery, eligibility checks, repo setup, demo-video preparation, and submission forms are fragmented across Devpost, DoraHacks, Superteam Earn, Kaggle, GitHub, and email. This agent turns that workflow into an actionable execution queue.

## What the agent does

1. Collects public AI/Web3 hackathon and bounty opportunities.
2. Uses live public Devpost ingestion when available, with curated fallback data for reliable demos.
3. Scores each opportunity by fit, prize value, deadline risk, online availability, and build effort.
4. Generates an application packet: pitch, action plan, judging map, repo checklist, deliverables, demo script, and submission copy.
5. Exposes API endpoints for dashboard, opportunity queue, submission kit, and Cloud Run deployment manifest.
6. Keeps the human in control for registrations, wallet signatures, KYC, and final submissions.

## Winning-oriented architecture

Competition target: Google Cloud Rapid Agent Hackathon.

Implemented MVP:

- Node.js agent and dashboard with no heavy runtime dependencies.
- `/api/opportunities` returns ranked, evidence-backed opportunity packets.
- `/api/submission-kit` returns judge-ready submission copy and demo script.
- `/api/cloud-run` returns deploy commands and scheduler guidance.
- `enhancePacketWithGemini()` is a Gemini-compatible API integration point with deterministic fallback.
- Tests cover ranking, ingestion normalization, submission kit generation, Gemini integration behavior, Cloud Run manifest, and server endpoints.

Production path:

- Gemini provides reasoning, fit scoring, and submission-copy generation.
- Google Cloud Agent Builder can orchestrate the multi-step workflow.
- Cloud Run hosts the app and API.
- Cloud Scheduler triggers daily monitoring.
- Firestore stores opportunities, state, and evidence.
- Partner MCP track: GitLab or MongoDB.
  - GitLab MCP can create issues, track build tasks, and manage repo workflows.
  - MongoDB MCP can persist opportunities, scoring metadata, and submission evidence.

## Run locally

```bash
npm install
npm start
```

Open:

```text
http://localhost:8787
```

API:

```bash
curl http://localhost:8787/api/opportunities
curl http://localhost:8787/api/submission-kit
curl http://localhost:8787/api/cloud-run
```

Tests:

```bash
npm test
```

CLI demo:

```bash
node src/agent.js
```

Optional Gemini enhancement:

```bash
GEMINI_API_KEY=your_key npm start
```

## Deploy

See `docs/gcp-deploy.md`.

Short version:

```bash
gcloud run deploy hackathon-scout-agent \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars NODE_ENV=production
```

## Devpost submission artifacts

- Hosted project URL: deploy this Node app to Cloud Run.
- Public code repository: this repo, MIT licensed.
- Demo video: see `docs/demo-video-script.md`.
- Submission draft: see `docs/devpost-submission.md`.
- Track: GitLab MCP or MongoDB MCP recommended.

## Safety and compliance

The agent does not silently register, submit, sign wallet messages, or perform KYC. It prepares the packet and asks for human approval before account-level side effects.
