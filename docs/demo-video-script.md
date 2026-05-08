# 3-minute demo video script

## 0:00 - 0:20 Problem
Solo builders miss paid AI/Web3 opportunities because discovery, qualification, application prep, GitHub setup, demo videos, and Devpost submissions are scattered across many platforms.

## 0:20 - 0:50 Solution
Hackathon Scout Agent turns those scattered opportunities into a daily execution queue. It fetches public opportunities, ranks expected ROI, and generates evidence-backed application packets while keeping final account actions human-approved.

## 0:50 - 1:40 Live demo
1. Open the web dashboard.
2. Show the top recommendation card and prioritized opportunity queue.
3. Point out source mode/evidence: live public API when available, curated fallback for reliability.
4. Open `/api/opportunities` to show structured agent-readable packets.
5. Open `/api/submission-kit` to show tagline, judging map, demo script, and human approval boundaries.
6. Open `/api/cloud-run` to show deployable Google Cloud commands.

## 1:40 - 2:20 Architecture
Gemini enhances pitch/risk/moat and can replace deterministic scoring in production. Cloud Run hosts the dashboard and API. Cloud Scheduler triggers daily scans. Firestore stores seen opportunities and evidence. Agent Builder can orchestrate discovery → scoring → packet → approval. GitLab MCP can create execution issues; MongoDB MCP can persist packet history.

## 2:20 - 2:50 Impact
The agent helps independent builders, students, and open-source contributors convert skill into income by turning noisy opportunity discovery into ranked, actionable submissions.

## 2:50 - 3:00 Close
Hackathon Scout Agent moves beyond chat: it plans, prepares, tracks, and guides real submissions while keeping the human in control.
