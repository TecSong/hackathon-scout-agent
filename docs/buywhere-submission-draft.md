# Build With BuyWhere submission draft

Last checked: 2026-05-08T12:10Z

This is a working draft for the public BuyWhere developer challenge. It is not submitted. API-key signup, sending the key to BuyWhere for verification, and final GitHub issue/email/DM submission require user authorization.

## Official links

- Challenge page: https://buywhere.ai/challenge/
- DEV article/API mirror: https://dev.to/buywhere/build-with-buywhere-ai-agent-developer-challenge-2ak7
- Submission issue template from challenge page: https://github.com/buywhere/buywhere-site/issues/new?labels=challenge,submission&template=build-with-buywhere-submission.yml
- Docs: https://docs.buywhere.ai

## Public facts verified

- Deadline: 2026-05-19.
- Anyone can enter according to the challenge page.
- Free API key; no credit card required.
- Build requirement: an AI shopping agent using BuyWhere REST API or MCP server, with live product search / comparison / merchant handoff.
- Submission requirement from challenge page: open a GitHub issue with repo URL, demo link, and a short description.
- Submission requirement from DEV article: alternatively DM on LinkedIn or email dev@buywhere.ai with description, repo/demo link, and BuyWhere API key so they can verify integration.
- Must use live BuyWhere API data. Hardcoded mock data does not count.

## Prize / payout fit

- Grand prize: 15-inch M3 MacBook Air on the DEV article; challenge page says Apple M3 MacBook Air.
- Other rewards: BuyWhere API credits, swag, feature/shoutout/social recognition.
- This is not a cash/Web3/bank-payout opportunity.
- Fit for user's rails: low for liquid payout; acceptable only if user wants hardware/API-credit upside and accepts shipping/customs uncertainty for Japan.

## Recommended project angle

Project title:
Prize Fit Shopping Agent

Tagline:
An AI commerce agent that turns a hackathon winner's location, payout constraints, and gear budget into BuyWhere-powered product comparisons.

Why this fits:
- It reuses Hackathon Scout Agent's existing domain: hackathons, prizes, payout constraints, and human-in-the-loop decisions.
- It adds a commerce-specific capability that maps directly to BuyWhere judging: utility, real MCP/API usage, polish, and creativity.
- It avoids pretending the main scout-agent is already a shopping agent.

## MVP behavior

Input:
- country/residence, e.g. Japan;
- available payout rails, e.g. Web3 wallet, U card, Hong Kong bank;
- target use case, e.g. laptop for AI coding agent work;
- budget or prize type, e.g. MacBook alternative / hardware grant.

Agent flow:
1. Convert user constraints into product search intents.
2. Query BuyWhere live product search/pricing/availability via REST API or MCP.
3. Rank products by utility, availability, expected delivery feasibility, and price/value.
4. Produce a human-readable recommendation and a trace of API calls.
5. Keep purchases and account/payment actions human-approved.

## Repo/demo plan

Recommended implementation path:
- Add a small side app or example module rather than replacing the current scout-agent core.
- Use environment variable `BUYWHERE_API_KEY`; do not commit keys.
- Provide deterministic fallback UI only for development, but final demo must show a successful live BuyWhere API/MCP call.
- Add tests for ranking and no-secret handling.

Suggested files:
- `examples/buywhere-prize-fit-agent/README.md`
- `examples/buywhere-prize-fit-agent/index.js`
- `examples/buywhere-prize-fit-agent/public/index.html` if using a tiny demo UI
- `docs/buywhere-submission-draft.md` this file

## Draft submission copy

Short description:
Prize Fit Shopping Agent helps hackathon builders convert prize constraints into practical buying decisions. Given a winner's location, available payout rails, target use case, and budget, it uses BuyWhere live product catalog data to compare real products and generate a transparent recommendation.

Repo URL:
https://github.com/TecSong/hackathon-scout-agent

Demo URL:
TBD after live BuyWhere API/MCP integration is added and deployed.

What uses BuyWhere:
The demo will use BuyWhere product search/pricing/availability data through the REST API or MCP server. The UI and output must show evidence of live API results, not mock data.

## Blockers requiring user authorization

- Get free BuyWhere API key.
- Provide the API key to the build environment or let Hermes use it without exposing it in code/logs.
- Decide whether this non-cash/hardware prize is worth submitting despite payout/shipping uncertainty.
- Final GitHub issue/email/LinkedIn submission.
