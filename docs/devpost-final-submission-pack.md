# Devpost final submission pack

Status: prepared, not officially submitted.

Reason submission is paused:
- The official rules for Google Cloud Rapid Agent Hackathon state: "CONTEST IS OPEN TO EVERYONE EXCEPT FOR RESIDENTS OF ... CHINA ...".
- The user confirmed residence as China on 2026-05-08.
- Because the restriction is residence-based, this project should not be officially joined/submitted to this specific Devpost contest unless the organizer grants written eligibility clarification.
- Official submission requires accepting rules/terms; do not accept or submit while the confirmed residence is China.

## Hackathon

Google Cloud Rapid Agent Hackathon: Building Agents for Real-World Challenges
https://rapid-agent.devpost.com/

## Project name

Hackathon Scout Agent

## Tagline

A Gemini-ready agent that finds high-value AI/Web3 hackathons, ranks expected ROI, and generates human-approved submission packets.

## Hosted project URL

https://hackathon-scout-agent-7slsi2frbq-uc.a.run.app

Useful API demo URLs:

- https://hackathon-scout-agent-7slsi2frbq-uc.a.run.app/api/opportunities
- https://hackathon-scout-agent-7slsi2frbq-uc.a.run.app/api/submission-kit
- https://hackathon-scout-agent-7slsi2frbq-uc.a.run.app/api/cloud-run

## Code repository URL

https://github.com/TecSong/hackathon-scout-agent

Current repository check:
- Visibility: PUBLIC as of 2026-05-08.
- GitHub license detection: MIT License.
- Default branch: main.
- Latest pushed commit after final-pack update: see repository history.

Useful public URLs:
- Repository: https://github.com/TecSong/hackathon-scout-agent
- License: https://github.com/TecSong/hackathon-scout-agent/blob/main/LICENSE

## Demo video URL

Not yet available.

Devpost requires an approximately 3-minute demo video. A script exists at:
/root/hackathon-scout-agent/docs/demo-video-script.md

Recommended video outline:
1. Show the deployed dashboard.
2. Open `/api/opportunities`.
3. Open `/api/submission-kit`.
4. Open `/api/cloud-run`.
5. Explain Gemini + Cloud Run + Scheduler + Firestore + MCP architecture.

## Track selection

Recommended track: GitLab MCP or MongoDB MCP.

Best fit based on current MVP:
- GitLab MCP: if emphasizing turning action plans into repo issues/build tasks.
- MongoDB MCP: if emphasizing persistent opportunity packets and evidence history.

The current project text mentions both; choose one final track before submitting. If forced to choose today, use MongoDB MCP if persistence/evidence is the core story, or GitLab MCP if project-management automation is the core story.

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
- Deployed Cloud Run demo at the hosted project URL above.

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

A working Cloud Run-deployed MVP with ranked opportunity packets, dashboard, APIs, Gemini integration point, Dockerfile, deployment guide, tests, MIT license, demo video script, and a complete Devpost-ready submission draft.

## What we learned

Agents are most useful when they turn vague intent into next actions with evidence. The key is not just “find hackathons,” but “which one should I do, why, what do I submit, and what should a human approve?”

## What's next

- Make the repo public and attach the final demo video.
- Store opportunity state and evidence in Firestore.
- Use Gemini for all packet generation in production.
- Add GitLab MCP to create issues from action plans, or MongoDB MCP to persist opportunity packets and scan history.
- Add user profiles and notification digests.

## Final submission blockers

Do not click final Submit until all are resolved:

- [ ] User confirms they are not a resident of an excluded territory, especially China.
- [ ] User explicitly agrees to the official rules/terms.
- [ ] GitHub repo is public.
- [ ] Demo video URL is available.
- [ ] Final partner track selected.
- [ ] Devpost form preview reviewed by user.
