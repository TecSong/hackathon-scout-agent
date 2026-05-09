# Build with MeDo Devpost submission pack

Status: draft, not submitted.

This pack is ready to paste into Devpost after the MeDo app is built and a public project URL exists. Do not submit without user approval, Devpost Join/rules acceptance, and final review.

## Project title

Hackathon Submission Checklist Builder

## Category

Work & Productivity

## Tagline

A MeDo-built checklist app that helps solo builders catch eligibility, payout, and final-submit blockers before hackathon deadlines.

## Elevator pitch

Hackathon Submission Checklist Builder helps solo builders avoid last-minute disqualification. It turns a hackathon URL, builder profile, prize details, payout rails, and required deliverables into a structured readiness dashboard covering eligibility, payout risk, missing assets, and actions that require human approval.

## Short description

Hackathon Submission Checklist Builder is a MeDo-built productivity app for solo hackathon builders. It collects hackathon details, builder residence/nationality, payout rails, prize type, and required deliverables, then generates a readiness checklist showing what is ready, what needs review, and what is blocked by eligibility, payout, login, terms, wallet, KYC, or final-submit requirements.

## Long description

Hackathon builders often lose time on the wrong opportunity or discover blockers too late: residence restrictions, nationality/citizenship restrictions, sanctions clauses, incompatible payout methods, missing demo assets, required public URLs, or terms that must be accepted by the human entrant.

Hackathon Submission Checklist Builder addresses that problem with a focused MeDo app. The app guides a builder through an intake form for one hackathon opportunity, then turns the data into a structured checklist and final review dashboard.

The app has four main flows:

1. Intake Form
The builder enters a hackathon URL, deadline, organizer, residence, nationality/citizenship, prize types, available payout rails, required deliverables, rules notes, and build notes.

2. Risk Checklist
The app groups checks into eligibility, payout, and human-approval boundaries. It flags residence, nationality, sanctions, payout compatibility, KYC/tax forms, PayPal-only risk, hardware shipping risk, login, terms acceptance, wallet signature, and final submit requirements.

3. Submission Asset Generator
The app turns the opportunity data into draft submission text: short description, long description, problem solved, demo flow outline, public URL checklist, repo checklist, and organizer questions.

4. Final Review Dashboard
The app summarizes whether the opportunity is Ready, Needs Review, or Blocked. It highlights missing deliverables, deadline urgency, payout risks, eligibility risks, and human authorization steps.

For the demo, the app includes a seeded Build with MeDo Hackathon record. It intentionally shows a realistic Needs Review status where Hong Kong bank payout compatibility and Devpost terms/final submission still require human confirmation. This is a core design principle: the app supports automation, but does not pretend legal/account/payment actions are complete before the human approves them.

## Problem solved

Hackathon opportunity evaluation is usually scattered across browser tabs, rules PDFs, prize pages, Discord messages, Devpost forms, and personal notes. Solo builders need a compact way to know:

- whether they are eligible;
- whether they can receive the prize;
- what deliverables are still missing;
- what actions require account login, terms acceptance, wallet signing, KYC, or final submission;
- whether an opportunity is worth continuing before the deadline.

This app turns those concerns into a concrete, reviewable workflow.

## How MeDo was used

MeDo was used to generate the application UI, structured intake flow, checklist pages, status dashboard, and iteration workflow from natural-language prompts. The project demonstrates how a no-code AI app builder can turn an ambiguous operational process into a usable productivity tool with clear data fields, status badges, and exportable submission copy.

The MeDo-generated app is the primary working application for this submission. The existing Hackathon Scout Agent repository is used only as planning/reference material and documentation for the workflow; the submitted app itself is built in MeDo.

## Key features

- Hackathon intake form
- Builder profile fields for residence, nationality/citizenship, and payout rails
- Prize and deliverable tracking
- Eligibility checklist
- Payout compatibility checklist
- Human approval boundary checklist
- Submission asset generator
- Final readiness dashboard
- Seeded Build with MeDo sample record
- Copy-ready Devpost text outputs

## Demo flow

1. Open the MeDo app.
2. Show the Build with MeDo sample record.
3. Open the Intake Form and show the captured fields: deadline, residence, nationality, prize type, payout rails, and deliverables.
4. Open Risk Checklist and show the grouped checks.
5. Highlight that Hong Kong bank payout compatibility is marked Needs Review.
6. Highlight that Devpost Join, terms acceptance, and final submission are marked Human Approval Required.
7. Open Submission Asset Generator and copy the short description/demo outline.
8. Open Final Review Dashboard and show the overall Needs Review status.
9. Explain that the app prevents false completion claims and helps builders submit only after eligibility, payout, and human-approval blockers are resolved.

## Public project URL

https://app-bitlzh1im9kx.appmedo.com/

## GitHub / reference URL

https://github.com/TecSong/hackathon-scout-agent

Note: this repository is a supporting planning/reference repo. The submitted working application should be the public MeDo app URL.

## Demo video URL

Optional/TBD.

## Social / community links

Optional/TBD after user approval.

## Prize / category mapping

Category: Work & Productivity

Why it fits:

- The app improves a real builder workflow.
- It converts unclear hackathon requirements into actionable checklists.
- It demonstrates MeDo's strength in quickly creating structured workflow apps.
- It supports solo builders while keeping high-risk legal/account/payment actions under human control.

## Final submission checklist

Before submitting, confirm:

- [x] Public MeDo app URL works: https://app-bitlzh1im9kx.appmedo.com/
- [x] App includes four flows: Intake, Risk Checklist, Submission Asset Generator, Final Review Dashboard.
- [x] Build with MeDo sample record is included.
- [ ] Devpost category selected: Work & Productivity.
- [ ] Devpost Join completed by user.
- [ ] Rules/terms accepted by user.
- [ ] Payout compatibility reviewed, especially Hong Kong bank route.
- [ ] User approves final submission text.
- [ ] No private API keys, tokens, passwords, or sensitive personal data are exposed.
