# 3-minute demo video script

## 0:00 - 0:20 Problem
Solo builders miss paid AI/Web3 opportunities because discovery, qualification, application prep, GitHub setup, demo videos, and Devpost submissions are scattered across many platforms.

## 0:20 - 0:50 Solution
Hackathon Scout Agent monitors opportunity sources, ranks them by fit and ROI, and produces a concrete application packet with action steps, deliverables, and submission copy.

## 0:50 - 1:40 Live demo
1. Open the web dashboard.
2. Show the prioritized opportunity queue.
3. Open the Google Cloud Rapid Agent Hackathon packet.
4. Show generated next actions: join, create repo, build MVP, record video, submit.
5. Open `/api/opportunities` to show the agent-readable structured output.

## 1:40 - 2:20 Architecture
Gemini reasons over deadlines, rewards, fit, and build effort. Google Cloud Agent Builder orchestrates the workflow. Cloud Run hosts the dashboard. Cloud Scheduler triggers daily scans. Firestore stores seen opportunities and submission evidence. GitLab or MongoDB MCP is used as the partner integration.

## 2:20 - 2:50 Impact
The agent turns scattered hackathon discovery into a daily execution queue for independent builders, students, and open-source contributors who need to convert skill into income.

## 2:50 - 3:00 Close
Hackathon Scout Agent moves beyond chat: it plans, prepares, tracks, and guides real submissions while keeping the human in control.
