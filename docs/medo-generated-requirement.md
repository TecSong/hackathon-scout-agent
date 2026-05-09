# Requirements Document

## 1. Application Overview

### 1.1 Application Name
Hackathon Submission Checklist Builder

### 1.2 Application Description
A work and productivity tool designed for solo hackathon builders to avoid disqualification by converting hackathon requirements and builder profiles into comprehensive eligibility, payout, and submission-readiness checklists.

## 2. Users and Usage Scenarios

### 2.1 Target Users
Solo hackathon participants who need to verify eligibility, understand payout requirements, and ensure submission completeness before deadlines.

### 2.2 Core Usage Scenarios
- Verifying eligibility before committing time to a hackathon
- Understanding payout compatibility with available payment methods
- Tracking submission requirements and deliverables
- Generating submission assets and documentation
- Reviewing overall readiness before final submission

## 3. Page Structure and Functionality

```
Hackathon Submission Checklist Builder
├── Intake Form
├── Risk Checklist
├── Submission Asset Generator
└── Final Review Dashboard
```

### 3.1 Intake Form

**Purpose**: Collect all necessary information about the hackathon and builder profile.

**Input Fields**:
- Hackathon name (text input)
- Hackathon URL (text input)
- Organizer/platform (text input)
- Deadline (date and time picker)
- Builder residence (text input)
- Builder nationality/citizenship (text input)
- Age-of-majority confirmation (checkbox)
- Prize types (multi-select checkboxes):
  - Cash
  - Web3/token
  - Bank transfer
  - PayPal
  - Hardware
  - Credits
  - Swag/recognition
  - Unknown
- Available payout rails (multi-select checkboxes):
  - Web3 wallet
  - U card
  - Hong Kong bank
  - Local bank
  - PayPal
  - International card
  - Unknown
- Required deliverables (multi-select checkboxes):
  - Working app
  - Public project URL
  - GitHub repo
  - Demo video
  - Slide deck
  - Social post
  - Discord/community post
  - Final form
  - Wallet signature
  - KYC/tax form
- Rules notes (text area)
- Build notes (text area)

**Actions**:
- Submit button to proceed to Risk Checklist
- Clear form button to reset all fields

**Example Seed Data**:
- Hackathon name: Build with MeDo Hackathon
- Hackathon URL: https://medo.devpost.com/
- Deadline: May 20, 2026 09:00 ET
- Builder residence: Japan
- Builder nationality: China
- Prize types: Cash
- Required deliverables: Working app, Public project URL
- Rules notes: Must use MeDo platform, category selection required
- Build notes: Bank transfer or electronic payment may require forms; Hong Kong bank compatibility needs confirmation

### 3.2 Risk Checklist

**Purpose**: Generate and display checklist items for eligibility, payout, and human-approval requirements.

**Display Structure**:
Three sections with expandable checklist items:

**Section A: Eligibility Checks**
- Residence allowed
- Nationality/citizenship allowed
- Sanctions/OFAC checked
- Minimum age satisfied
- Solo participation allowed

**Section B: Payout Checks**
- Payout method clear
- Compatible with available rails
- PayPal-only risk
- Specific-country-bank risk
- KYC/tax requirement
- Hardware shipping/customs risk

**Section C: Human-Approval Checks**
- Login required
- Terms/rules acceptance required
- Wallet signature required
- Final submit required
- Organizer contact needed

**Each Checklist Item Contains**:
- Status indicator (pass / review / blocked / unknown)
- Evidence note (text field)
- Next action (text field)

**Actions**:
- Edit status for each item
- Add evidence notes
- Add next action notes
- Proceed to Submission Asset Generator button

### 3.3 Submission Asset Generator

**Purpose**: Generate draft text content for submission materials.

**Draft Text Fields**:
- Short project description (text area)
- Long project description (text area)
- How the platform/tool was used (text area)
- Problem solved (text area)
- Demo flow outline (text area)
- Public URL checklist (text area)
- Repo checklist (text area)
- Demo video outline (text area)
- Organizer questions (text area)

**Actions**:
- Edit any draft text field
- Copy text to clipboard for each field
- Proceed to Final Review Dashboard button

### 3.4 Final Review Dashboard

**Purpose**: Display overall readiness status and highlight critical items requiring attention.

**Display Components**:

**Overall Readiness Status**:
- Ready / Needs Review / Blocked (prominent status indicator)

**Deadline Urgency**:
- Days/hours remaining until deadline
- Urgency level indicator

**Missing Deliverables**:
- List of uncompleted required deliverables

**User Authorization Needed**:
- List of human-approval actions not yet completed (login, terms acceptance, wallet signing, final submission, KYC/tax forms)

**Payout Risks**:
- List of payout-related items with review or blocked status

**Eligibility Risks**:
- List of eligibility-related items with review or blocked status

**Suggested Next Actions**:
- Prioritized list of recommended actions based on risks and missing items

**Actions**:
- Return to any previous screen for editing
- Export checklist summary

## 4. Business Rules and Logic

### 4.1 Risk Status Auto-Generation
- When Intake Form is submitted, system automatically generates checklist items in Risk Checklist based on collected information
- Default status for all items is unknown until user updates

### 4.2 Overall Readiness Calculation
- Ready: All eligibility checks pass, all payout checks pass or review, all required deliverables completed, all human-approval items acknowledged
- Needs Review: One or more items have review status, or some deliverables missing but deadline not imminent
- Blocked: One or more eligibility or payout checks have blocked status

### 4.3 Deadline Urgency Calculation
- More than 7 days: Low urgency
- 3-7 days: Medium urgency
- Less than 3 days: High urgency
- Less than 24 hours: Critical urgency

### 4.4 Navigation Flow
- Users can navigate forward through screens sequentially
- Users can return to previous screens at any time to edit information
- Changes in earlier screens update subsequent screens automatically

### 4.5 Human-Approval Items
- Login, terms/rules acceptance, wallet signature, final submission, and KYC/tax forms are always marked as requiring human approval
- These items cannot be auto-completed by the system

## 5. Exceptions and Edge Cases

| Scenario | Handling |
|----------|----------|
| User submits Intake Form with minimal information | System generates checklist with many unknown status items |
| Deadline has passed | Display warning message and mark urgency as expired |
| No payout rails selected | Flag payout compatibility as blocked |
| Multiple conflicting eligibility requirements | Mark relevant items as review status |
| User attempts to mark human-approval item as complete | Display reminder that action requires manual completion outside the app |
| No required deliverables selected | Display warning that submission requirements may be incomplete |

## 6. Acceptance Criteria

1. Intake Form successfully collects all specified fields with appropriate input types
2. Example seed data for Build with MeDo Hackathon can be loaded and displayed correctly
3. Risk Checklist generates three sections with all specified check items
4. Each checklist item displays status, evidence note, and next action fields
5. Submission Asset Generator provides all nine draft text fields
6. Final Review Dashboard displays overall readiness status accurately based on checklist data
7. Deadline urgency calculation reflects time remaining correctly
8. Missing deliverables list updates based on Intake Form selections
9. Human-approval items are clearly marked and cannot be auto-completed
10. Users can navigate between all four screens and edit information
11. Dashboard style is clean and workflow is clear for demo purposes
12. All text content is in English

## 7. Out of Scope for This Release

- Automatic web scraping of hackathon pages
- Integration with Devpost or other hackathon platforms
- Actual submission to hackathon platforms
- Real-time deadline notifications or reminders
- Multi-user collaboration features
- Historical tracking of multiple hackathons
- Automated OFAC or sanctions checking
- Direct integration with payment platforms
- File upload or storage for deliverables
- AI-powered content generation for submission assets