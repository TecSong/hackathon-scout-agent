# Devpost submission draft

## Project name
Hackathon Scout Agent

## Tagline
An agent that finds, ranks, and prepares applications for AI/Web3 hackathons and bounty tasks.

## Inspiration
Independent builders often spend more time searching for paid opportunities than building. I wanted an agent that helps a solo builder continuously discover AI/Web3 hackathons and bounties, evaluate ROI, prepare submission assets, and stay on top of deadlines.

## What it does
Hackathon Scout Agent monitors opportunity sources, ranks each opportunity, generates an application packet, and creates a next-action plan. It supports human-approved workflows for registration, GitHub repo setup, demo video preparation, and final submission.

## How we built it
The MVP is a Node.js agent and web dashboard. The target Google Cloud architecture uses Gemini for reasoning, Google Cloud Agent Builder for orchestration, Cloud Run for hosting, Cloud Scheduler for daily monitoring, Firestore for state, and GitLab/MongoDB MCP as the partner integration.

## Challenges
The hardest part is balancing automation with safety. Registration, wallet signatures, KYC, and final submissions must remain human-approved, so the agent prepares everything but does not silently perform sensitive actions.

## Accomplishments
A working local MVP with prioritized opportunity packets, a dashboard, an API, tests, MIT license, and a complete Devpost submission draft/video script.

## What is next
Connect Gemini and Agent Builder directly, deploy to Cloud Run, add GitLab/MongoDB MCP integration, and automate evidence tracking for submissions and results.
