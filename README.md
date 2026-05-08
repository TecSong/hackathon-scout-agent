# Hackathon Scout Agent

Hackathon Scout Agent helps an independent builder continuously find, rank, and prepare applications for AI/Web3 hackathons and bounty tasks while keeping sensitive account actions human-approved.

Note: Google Cloud Rapid Agent Hackathon was evaluated and then dropped as an active target. The related GCP deployment resources have been removed; this repo is now maintained as a reusable local/opportunity-prep tool and as a base for better-fit opportunities such as MeDo or payout-compatible AI/Web3 bounties.

## Why it matters

Many solo builders miss paid opportunities because discovery, eligibility checks, repo setup, demo preparation, payout review, and submission forms are fragmented across Devpost, DoraHacks, Superteam Earn, Kaggle, GitHub, and email. This agent turns that workflow into an actionable execution queue.

## What the agent does

1. Collects public AI/Web3 hackathon and bounty opportunities.
2. Uses live public Devpost ingestion when available, with curated fallback data for reliable demos.
3. Scores each opportunity by fit, prize value, deadline risk, online availability, and build effort.
4. Generates an application packet: pitch, action plan, judging map, repo checklist, deliverables, demo script, and submission copy.
5. Exposes API endpoints for dashboard, opportunity queue, and submission kit.
6. Keeps the human in control for registrations, wallet signatures, KYC, terms acceptance, and final submissions.

## Current active directions

- Build with MeDo: conditional P1. Worth pursuing only if a MeDo-built app can be created and payout/HK-bank compatibility is acceptable.
- Build With BuyWhere: low-priority P2. Useful as a small commerce-agent demo, but prizes are hardware/API credits/swag rather than cash/Web3/bank payout.
- Higher-priority future targets: AI/Web3 bounties or hackathons with clear payout via Web3 wallet, U card, Hong Kong bank, or another user-approved non-PayPal/non-international-card method.

## Implemented MVP

- Node.js agent and dashboard with no heavy runtime dependencies.
- `/api/opportunities` returns ranked, evidence-backed opportunity packets.
- `/api/submission-kit` returns submission copy and demo outline for the current top opportunity.
- `enhancePacketWithGemini()` is an optional Gemini-compatible API integration point with deterministic fallback.
- Tests cover ranking, ingestion normalization, submission kit generation, Gemini integration behavior, fallback targets, and server endpoints.

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

## Submission artifacts

- BuyWhere draft: `docs/buywhere-submission-draft.md`
- MeDo draft: `docs/medo-submission-draft.md`
- Target due diligence: `docs/target-opportunities-due-diligence.md`

## Safety and compliance

The agent does not silently register, submit, sign wallet messages, accept legal terms, or perform KYC. It prepares the packet and asks for human approval before account-level side effects.
