# Target opportunities due diligence

Last checked: 2026-05-08T12:10Z

This file tracks public-rule findings for the active hackathon/bounty queue. It is a working aid for final submission prep; it is not proof of registration or acceptance of terms.

## 1. Google Cloud Rapid Agent Hackathon

URL: https://rapid-agent.devpost.com/

### Public status

- Deadline: June 11, 2026 at 2:00pm PDT / 5:00pm EDT.
- Prize pool: $50,000 cash across partner-track buckets.
- Public participants observed: 2,987.
- Required deliverables from public page/rules:
  - hosted project URL;
  - public open-source repository with a detectable license;
  - approximately 3-minute demo video;
  - selected partner track;
  - completed Devpost submission form.

### Eligibility and payout

- Rules say the contest is open except for residents of listed excluded territories including China; Japan was not found in the excluded residence list during this check.
- User's current residence is Japan; nationality is China. The rule language found is residence-based, but final Devpost entry still requires user acceptance of the official rules.
- Prize delivery language found in the rules: prize may be sent to the winner's address or electronically to the winner/team/organization bank account after required forms. Winners are responsible for fees, wiring fees, and currency exchange fees.
- Payout risk: likely bank-account based; compatibility with Hong Kong bank must be confirmed before final submit. No Web3/U-card/PayPal-specific support found in public text.

### Product fit notes

- Rules require a functional agent powered by Gemini and Google Cloud Agent Builder that integrates one partner entity's MCP server.
- Public page currently lists partner tracks: Arize, Elastic, Fivetran, GitLab, MongoDB.
- Repo/deployment are healthy, but the final story should not overclaim a partner MCP integration unless it is actually implemented or clearly framed as the selected integration path.
- Best current track recommendation: **MongoDB MCP** if we can add real persistence/evidence history before final submission; otherwise **GitLab MCP** if we add issue/task creation from generated action plans. MongoDB matches the scout-agent data model more naturally.

### Remaining blockers

- User must accept Devpost/rules and final submission terms.
- User must confirm prize payout acceptability, ideally Hong Kong bank support.
- Demo video must be recorded/uploaded.
- Final partner track must be selected and backed by a real integration or a clearly demoable workflow.

## 2. BuyWhere AI Agent Developer Challenge

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
- Working submission draft created at `docs/buywhere-submission-draft.md`; recommended angle is a small `Prize Fit Shopping Agent` side demo using live BuyWhere data.

### Feasibility notes

- Public challenge page says anyone can enter and no credit card is required for the API key.
- The DEV article links to `https://github.com/buywhere/mcp`, but that repository returned 404 during this check. The challenge page instead points submission to the `buywhere/buywhere-site` issue form.
- API key signup and final GitHub issue submission require user/account actions and must not be done automatically.

### Suggested adaptation

If pursued, build a small commerce-agent side demo rather than changing the core scout-agent submission:

- "Prize Fit Shopping Agent": given a hackathon winner's likely payout constraints/location, search products and compare laptop/gear options using live BuyWhere data.
- Deliverable: tiny repo or subdirectory with README, demo page/API, and proof of live BuyWhere API/MCP usage.
- Blockers: API key access, repo/demo target, and issue submission authorization.

## 3. Build with MeDo Hackathon

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

- This is not a natural fit for the current Node/Cloud Run scout-agent because submissions must be built with MeDo.
- Better route: create a separate MeDo-built app inspired by scout-agent, e.g. a no-code "Opportunity Intake Dashboard" or "Hackathon Submission Checklist" using MeDo-generated UI and plugins/API integrations.
- Working submission draft created at `docs/medo-submission-draft.md`; recommended category is Work & Productivity.
- Requires user/account actions: MeDo signup/invite credits, Devpost join/terms, final submission, optional video/social/Discord actions.

## Current repo/deploy health snapshot

- GitHub repo: public, MIT license detected, default branch `main`.
- Local git status before this doc update: clean and synced with `origin/main` at commit `a72afd4`.
- Cloud Run service `hackathon-scout-agent` in `us-central1`: Ready=True via `gcloud run services describe`.
- Direct curl to the `.app` URL was not retried because the local command safety scanner requires approval for `.app` domains in this environment.
