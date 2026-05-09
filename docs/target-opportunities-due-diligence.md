# Target opportunities due diligence

Last checked: 2026-05-08T12:10Z

This file tracks public-rule findings for the active hackathon/bounty queue. It is a working aid for final submission prep; it is not proof of registration, account access, terms acceptance, or final submission.

## Dropped target

Google Cloud Rapid Agent Hackathon was evaluated and then dropped as an active target because the user decided it is not suitable to participate in. Related GCP resources have been deleted, and the dedicated winner-result cron job was removed. Do not re-promote it as an active target unless the user explicitly asks.

## 1. BuyWhere AI Agent Developer Challenge

Primary public links:

- DEV article/API: https://dev.to/buywhere/build-with-buywhere-ai-agent-developer-challenge-2ak7
- Challenge page: https://buywhere.ai/challenge/
- Submission link from challenge page: https://github.com/buywhere/buywhere-site/issues/new?labels=challenge,submission&template=build-with-buywhere-submission.yml

### Public status

- Deadline stated in article: May 19, 2026.
- Challenge page rechecked on 2026-05-08T12:10Z: anyone can enter, free API key, no credit card required, build with REST API or MCP, submit via GitHub issue template.
- Challenge: build an AI shopping agent using BuyWhere product catalog API or MCP tools.
- How to enter from public page: get a free API key, build using REST API or MCP server, then open a GitHub issue with repo URL, demo link, and short description.
- Judging criteria from challenge page:
  - Utility 40%;
  - MCP/API usage 30%;
  - Polish 20%;
  - Creativity 10%.

### Prize/payment fit

- Grand prize: Apple M3 MacBook Air, $1,000 BuyWhere API credits, swag, feature.
- Runner-up/community prizes: API credits, swag, social recognition.
- This is **not a cash/Web3 payout opportunity**. Shipping hardware to Japan and customs/tax handling are not clarified in public text.
- Because the main reward is hardware/API credits, this is lower priority than cash/Web3-compatible bounties unless the build is very small or can reuse existing scout-agent work.
- Working submission draft: `docs/buywhere-submission-draft.md`; recommended angle is a small `Prize Fit Shopping Agent` side demo using live BuyWhere data.

### Feasibility notes

- Public challenge page says anyone can enter and no credit card is required for the API key.
- The DEV article links to `https://github.com/buywhere/mcp`, but that repository returned 404 during an earlier check. The challenge page instead points submission to the `buywhere/buywhere-site` issue form.
- API key signup and final GitHub issue/email/LinkedIn submission require user/account actions and must not be done automatically.

### Suggested adaptation

If pursued, build a small commerce-agent side demo rather than changing the core scout-agent submission:

- "Prize Fit Shopping Agent": given a hackathon winner's likely payout constraints/location, search products and compare laptop/gear options using live BuyWhere data.
- Deliverable: tiny repo or subdirectory with README, demo page/API, and proof of live BuyWhere API/MCP usage.
- Blockers: API key access, repo/demo target, and issue submission authorization.

## 2. Build with MeDo Hackathon

URL: https://medo.devpost.com/

### Public status

- Deadline: May 20, 2026 at 9:00am EDT.
- Rules rechecked on 2026-05-08T12:10Z: registration/submission period ends May 20, 2026 at 9:00am Eastern Time; winners announced around June 7, 2026 at 10:00am Eastern Time.
- Prize pool: $50,000+ cash and other prizes.
- Public participants observed: 6,431.
- Required/optional deliverables from public page/rules:
  - working application built using MeDo;
  - project description explaining how MeDo was used;
  - public project URL;
  - category selection;
  - optional max 3-minute demo video uploaded to YouTube/Vimeo/Youku;
  - optional social/content links for separate awards;
  - optional Discord showcase link for community award.

### Eligibility and payout

- Rules state the hackathon is open to individuals at least age of majority where they reside.
- Exclusions found are countries/territories where participation or receiving a prize is prohibited, including Brazil, Quebec, Russia, Crimea, Cuba, Iran, North Korea and OFAC-designated regions. China/Japan were not found as blanket exclusions in the snippets checked.
- Prize delivery language found: physical address or electronically to entrant/representative/organization bank account after required forms; prizes delivered within 60 days after required forms.
- Payout fit: possible bank-account route, but Hong Kong bank compatibility and tax/KYC forms must be confirmed before final submission.

### Feasibility notes

- This is not a natural fit for the current Node/local scout-agent because submissions must be built with MeDo.
- Better route: create a separate MeDo-built app inspired by scout-agent, e.g. a no-code "Opportunity Intake Dashboard" or "Hackathon Submission Checklist" using MeDo-generated UI and plugins/API integrations.
- Working submission draft: `docs/medo-submission-draft.md`; recommended category is Work & Productivity.
- Prepared execution assets: `docs/medo-build-plan.md`, `docs/medo-devpost-submission-pack.md`, and `docs/medo-demo-video-script.md`.
- Published MeDo app URL: https://app-bitlzh1im9kx.appmedo.com/ . Verified reachable after publishing live version v5.
- Remaining user/account actions: Devpost join/terms, final submission, payout compatibility confirmation, optional video/social/Discord actions.

## Current repo snapshot

- GitHub repo: public, MIT license detected, default branch `main`.
- GCP deployment resources for the dropped Google Cloud Rapid Agent Hackathon target have been removed.
- The repo should be treated as a reusable local/opportunity-prep tool unless a new target justifies deployment.
