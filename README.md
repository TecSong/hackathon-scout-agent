# Hackathon Scout Agent

Hackathon Scout Agent is a Gemini-ready agent workflow for the Google Cloud Rapid Agent Hackathon. It helps an independent builder continuously find, rank, apply to, and submit AI/Web3 hackathons and bounty tasks so the human can focus on high-value execution.

## Why it matters

Many solo builders miss paid opportunities because discovery, eligibility checks, repo setup, demo-video preparation, and submission forms are fragmented across Devpost, DoraHacks, Superteam Earn, Kaggle, GitHub, and email. This agent turns that workflow into an actionable queue.

## What the agent does

1. Collects AI/Web3 hackathons and bounty opportunities.
2. Scores each opportunity by fit, prize value, deadline risk, and build effort.
3. Generates an application packet: pitch, action plan, repo checklist, deliverables, and submission copy.
4. Keeps the human in control for final account, wallet, and submission actions.

## Google Cloud / Gemini / MCP architecture

Competition target: Google Cloud Rapid Agent Hackathon.

Planned production architecture:

- Gemini provides reasoning, fit scoring, and submission-copy generation.
- Google Cloud Agent Builder orchestrates the multi-step workflow.
- Cloud Run hosts the app and API.
- Cloud Scheduler triggers daily monitoring.
- Firestore stores opportunities, state, and evidence.
- Partner MCP track: GitLab or MongoDB.
  - GitLab MCP can create issues, track build tasks, and manage repo workflows.
  - MongoDB MCP can persist opportunities, scoring metadata, and submission evidence.

This repository includes a dependency-light runnable MVP plus clear integration points for Gemini, Agent Builder, and partner MCP servers.

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
```

Tests:

```bash
npm test
```

## Devpost submission artifacts

- Hosted project URL: deploy this Node app to Cloud Run, Render, Railway, Vercel, or Fly.io.
- Public code repository: this repo, MIT licensed.
- Demo video: see `docs/demo-video-script.md`.
- Track: GitLab MCP or MongoDB MCP recommended.

## Safety and compliance

The agent does not silently register, submit, sign wallet messages, or perform KYC. It prepares the packet and asks for human approval before account-level side effects.
