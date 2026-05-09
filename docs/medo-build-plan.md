# MeDo build plan: Hackathon Submission Checklist Builder

Last updated: 2026-05-09

Status: ready for MeDo account execution. Not submitted. MeDo login, Devpost Join/rules acceptance, public app publishing, and final submission require user authorization.

## Target

Hackathon: Build with MeDo Hackathon
URL: https://medo.devpost.com/
Category: Work & Productivity
Project title: Hackathon Submission Checklist Builder
Tagline: Turn a hackathon page and builder profile into an eligibility, payout, and submission-readiness checklist.

## Product goal

Build a small MeDo-native productivity app that helps solo builders avoid late disqualification. The app collects a hackathon URL, builder profile, prize/payout constraints, and required deliverables, then produces a clear readiness dashboard:

- Ready
- Needs review
- Blocked by user authorization
- High payout/eligibility risk

The key idea is not to rebuild the Node Hackathon Scout Agent inside MeDo. The MeDo app should be a focused no-code companion that demonstrates MeDo-generated UI, workflow, structured data collection, and checklist automation.

## Core user story

As a solo hackathon builder, I paste a hackathon URL and enter my residence, nationality, payout rails, deadline, and deliverables. The app generates a reviewable checklist showing whether I can safely continue, what is still missing, and what actions require human approval.

## MeDo app structure

### Page 1: Intake

Purpose: collect one opportunity and builder context.

Fields:

- Hackathon name: text
- Hackathon URL: URL
- Organizer/platform: text
- Deadline: date/time
- Builder residence: select/text; default example Japan
- Builder nationality/citizenship: select/text; default example China
- Age of majority confirmed: yes/no
- Prize type: multi-select
  - cash
  - Web3/token
  - bank transfer
  - PayPal
  - hardware
  - credits
  - swag/recognition
  - unknown
- Available payout rails: multi-select
  - Web3 wallet
  - U card
  - Hong Kong bank
  - local bank
  - PayPal
  - international card
  - unknown
- Required deliverables: multi-select
  - working app
  - public project URL
  - GitHub repo
  - demo video
  - slide deck
  - social post
  - Discord/community post
  - final form
  - wallet signature
  - KYC/tax form
- Rules notes: long text
- Build notes: long text

### Page 2: Risk checklist

Purpose: show eligibility and payout blockers.

Checklist groups:

Eligibility:

- Residence allowed?
- Nationality/citizenship allowed?
- Sanctions/OFAC restriction checked?
- Minimum age satisfied?
- Individual/solo participation allowed?

Payout:

- Prize payout method is clear?
- Prize can be received via user's available rails?
- PayPal-only risk?
- US-bank-only or specific-country bank risk?
- KYC/tax form required?
- Hardware shipping/customs risk?

Submission boundary:

- Login required?
- Terms/rules acceptance required?
- Wallet signature required?
- Final submit required?
- Organizer contact needed?

Each checklist item should have:

- status: pass / review / blocked / unknown
- evidence note
- next action

### Page 3: Submission asset generator

Purpose: turn intake into draft submission copy.

Outputs:

- Short project description
- Longer project description
- How the target tool/platform was used
- Problem solved
- Demo flow outline
- Public URL checklist
- Repo checklist
- Demo video outline
- Organizer questions

### Page 4: Final review dashboard

Purpose: one screen for whether the builder should submit.

Sections:

- Overall readiness: ready / needs review / blocked
- Deadline urgency
- Missing deliverables
- User authorization needed
- Payout risks
- Eligibility risks
- Suggested next actions

## Rule logic

Use simple deterministic rules that are easy to explain in the demo.

Readiness status:

- blocked if any critical item is blocked:
  - residence not allowed
  - nationality/citizenship not allowed
  - sanctions restriction applies
  - no compatible payout route for a cash prize
  - required working app/public URL missing
  - final terms acceptance needed but not done

- needs review if:
  - payout method unknown
  - eligibility text unclear
  - KYC/tax forms unknown
  - demo video optional but not prepared
  - organizer confirmation needed

- ready if:
  - no critical blockers
  - required deliverables have links/status
  - human final-submit approval is the only remaining action

## First MeDo generation prompt

Paste this into MeDo as the initial app prompt:

```text
Build a Work & Productivity app called “Hackathon Submission Checklist Builder”.

The app helps solo hackathon builders avoid disqualification by turning a hackathon page and builder profile into an eligibility, payout, and submission-readiness checklist.

Create four screens:

1. Intake Form
Collect: hackathon name, hackathon URL, organizer/platform, deadline, builder residence, builder nationality/citizenship, age-of-majority confirmation, prize types, available payout rails, required deliverables, rules notes, and build notes.

Prize types should include: cash, Web3/token, bank transfer, PayPal, hardware, credits, swag/recognition, unknown.
Available payout rails should include: Web3 wallet, U card, Hong Kong bank, local bank, PayPal, international card, unknown.
Required deliverables should include: working app, public project URL, GitHub repo, demo video, slide deck, social post, Discord/community post, final form, wallet signature, KYC/tax form.

2. Risk Checklist
For each opportunity, generate checklist items for eligibility, payout, and human-approval boundaries.
Each item has: status (pass, review, blocked, unknown), evidence note, and next action.
Eligibility checks: residence allowed, nationality/citizenship allowed, sanctions/OFAC checked, minimum age satisfied, solo participation allowed.
Payout checks: payout method clear, compatible with available rails, PayPal-only risk, specific-country-bank risk, KYC/tax requirement, hardware shipping/customs risk.
Human-approval checks: login required, terms/rules acceptance required, wallet signature required, final submit required, organizer contact needed.

3. Submission Asset Generator
Generate draft text fields: short project description, long project description, how the platform/tool was used, problem solved, demo flow outline, public URL checklist, repo checklist, demo video outline, and organizer questions.

4. Final Review Dashboard
Show overall readiness as Ready, Needs Review, or Blocked.
Show deadline urgency, missing deliverables, user authorization needed, payout risks, eligibility risks, and suggested next actions.

Use a clean dashboard style. Make the workflow clear and demo-friendly. Keep final submission, account login, terms acceptance, wallet signing, and KYC/tax actions marked as requiring human approval.

Add example seed data for the Build with MeDo Hackathon:
- URL: https://medo.devpost.com/
- Deadline: May 20, 2026 09:00 ET
- Residence example: Japan
- Nationality example: China
- Prize: $50,000+ cash and other prizes
- Required deliverables: working app built using MeDo, public project URL, project description, category selection, optional demo video
- Payout note: bank transfer or electronic payment may require forms; Hong Kong bank compatibility needs confirmation.
```

## Follow-up prompts for MeDo iteration

Use these after the first version is generated.

### Prompt 2: improve readiness rules

```text
Improve the readiness logic so the app marks an opportunity as Blocked if a critical eligibility restriction applies, if payout is incompatible with the builder's available rails, or if a required working app/public URL is missing. Mark it as Needs Review if payout, KYC/tax, residence, nationality, or organizer confirmation is unclear. Mark it as Ready only when required deliverables exist and only human final-submit approval remains.
```

### Prompt 3: improve demo data

```text
Add a realistic sample record for “Build with MeDo Hackathon”. Include the category “Work & Productivity”, prize pool “$50,000+ cash and other prizes”, deadline “May 20, 2026 09:00 ET”, and required deliverables. The sample should show “Needs Review” because Hong Kong bank payout compatibility and final Devpost terms acceptance still require human confirmation.
```

### Prompt 4: polish UI

```text
Polish the UI for a hackathon judge demo. Use concise cards, clear status badges, and a final review dashboard. Highlight the three key safety boundaries: eligibility, payout compatibility, and human approval for login/terms/wallet/final submission.
```

### Prompt 5: submission copy export

```text
Add an export/copy section that lets the user copy the short description, long description, problem solved, how MeDo was used, and demo video outline for a Devpost submission.
```

## Demo path

1. Open the app.
2. Show the seeded Build with MeDo sample.
3. Explain that the app separates safe automation from legal/account/payment actions.
4. Open the Risk Checklist page.
5. Show eligibility and payout rows.
6. Show that Hong Kong bank payout compatibility is Needs Review.
7. Show that Devpost Join/terms/final submit are Human Approval actions.
8. Open Submission Asset Generator.
9. Copy the generated short description and demo flow.
10. Open Final Review Dashboard.
11. Explain why the project is not falsely marked complete until human approval and final submit happen.

## Acceptance criteria

The MeDo app is ready to submit only when:

- There is a public app URL.
- The app has the four pages/flows above.
- The app contains the Build with MeDo sample record.
- Final Review shows Needs Review rather than making false legal/payout claims.
- There is enough visible app behavior for a 2-3 minute demo.
- Devpost submission copy is complete.

## Current blockers

- MeDo login/account access.
- Ability to generate and publish a public MeDo app URL.
- Devpost Join/rules acceptance.
- Final submission authorization.
- Confirmation that Hong Kong bank payout is acceptable for prize transfer.
