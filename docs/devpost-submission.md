# Devpost submission draft

## Project name
Hackathon Scout Agent

## Tagline
A Gemini-ready agent that finds high-value AI/Web3 hackathons, ranks expected ROI, and generates human-approved submission packets.

## Inspiration
Independent builders often spend more time searching for paid opportunities than building. High-value hackathons and bounties are scattered across Devpost, DoraHacks, Superteam, Kaggle, GitHub, Discord, and email. Missing one deadline can mean missing the project that would fund the next month of building. I wanted an agent that turns opportunity discovery into an execution queue.

## What it does
Hackathon Scout Agent discovers public hackathon/bounty opportunities, ranks them by fit and expected value, creates an evidence-backed application packet, maps the packet to judging criteria, and generates a concrete next-action plan. It also exposes a dashboard and APIs for the opportunity queue, submission kit, and Cloud Run deployment manifest.

The agent is intentionally human-in-the-loop: it prepares registration and submission materials, but final account actions, wallet signatures, KYC, and official submissions require human approval.

## How we built it
The MVP is a dependency-light Node.js agent and web dashboard.

Implemented:

- Live public Devpost ingestion with curated fallback data for reliable demos.
- Opportunity scoring for AI/Gemini fit, Web3/MCP relevance, reward, deadline risk, remote friendliness, and build effort.
- Application packet generation with pitch, action plan, deliverables, evidence, judging map, demo script, and human approval boundaries.
- Gemini-compatible enhancement function that calls the Gemini API when `GEMINI_API_KEY` is available and falls back deterministically when it is not.
- Cloud Run deployment artifacts: Dockerfile, deployment guide, `/api/cloud-run` manifest.
- Tests for core scoring, ingestion, Gemini fallback/API behavior, server endpoints, and deployment manifest.

Target Google Cloud architecture:

- Gemini: reasoning, packet enhancement, and submission-copy generation.
- Cloud Run: hosted dashboard/API.
- Cloud Scheduler: daily opportunity scan.
- Firestore: persistent opportunities, evidence, and status.
- Agent Builder: orchestration of discovery → scoring → packet → human approval workflow.
- GitLab MCP or MongoDB MCP: partner integration for repo tasks or opportunity persistence.

## Challenges
The hardest part is balancing automation with safety. It is easy to over-automate account-bound actions, but registrations, wallet signatures, legal terms, and final submissions must stay human-approved. The project therefore focuses on high-leverage preparation: evidence, ranking, copy, checklists, and deployment-ready artifacts.

## Accomplishments
A working local MVP with ranked opportunity packets, dashboard, APIs, Gemini integration point, Cloud Run deployment path, tests, MIT license, demo video script, and a complete submission draft.

## What we learned
Agents are most useful when they turn vague intent into next actions with evidence. The key is not just “find hackathons,” but “which one should I do, why, what do I submit, and what should a human approve?”

## What's next

- Deploy the current app to Cloud Run and attach a public demo URL.
- Store opportunity state and evidence in Firestore.
- Use Gemini for all packet generation in production.
- Add GitLab MCP to create issues from action plans, or MongoDB MCP to persist opportunity packets and scan history.
- Add user profiles and notification digests.
