# Product Requirements Document (PRD)

# PRD-08: Interview & Assessment Management

---

# Document Information

| Field | Value |
|--------|-------|
| Project | HireMind AI |
| Phase | 08 |
| Version | 1.0 |
| Status | Draft |
| Priority | Critical |
| Owner | Product & Engineering Team |
| Dependencies | PRD-00 → PRD-07 |

---

# 1. Overview

The Interview & Assessment Management module streamlines the hiring evaluation process by managing interview scheduling, coding assessments, MCQ tests, interview feedback, evaluation scorecards, and hiring decisions.

It integrates seamlessly with Google Calendar, Google Meet, email notifications, and the AI modules to automate repetitive recruiter tasks while providing candidates with a transparent interview experience.

---

# 2. Objectives

The module shall:

- Schedule interviews
- Manage interview rounds
- Generate interview links
- Assign interviewers
- Conduct coding assessments
- Conduct MCQ assessments
- Generate AI interview questions
- Capture interviewer feedback
- Calculate interview scores
- Recommend hiring decisions
- Send reminders and notifications

---

# 3. Business Goals

The Interview Management module should:

- Reduce scheduling overhead
- Improve interviewer coordination
- Standardize candidate evaluations
- Reduce hiring bias
- Increase recruiter efficiency
- Improve candidate experience
- Automate repetitive administrative work

---

# 4. Interview Workflow

Candidate Shortlisted

↓

Interview Round Created

↓

Interviewer Assigned

↓

Calendar Availability Check

↓

Interview Scheduled

↓

Google Meet Link Generated

↓

Email Invitations Sent

↓

Reminder Notifications

↓

Interview Conducted

↓

Feedback Submitted

↓

Scorecards Generated

↓

Hiring Recommendation

↓

Next Round / Offer / Rejection

---

# 5. Assessment Workflow

Candidate Selected

↓

Assessment Assigned

↓

Assessment Invitation Sent

↓

Candidate Starts Test

↓

Timer Starts

↓

Submission Received

↓

Automatic Evaluation

↓

Manual Review (Optional)

↓

Assessment Score Generated

↓

Recruiter Dashboard Updated

---

# 6. Interview Types

Supported interview formats:

- HR Interview
- Technical Interview
- Managerial Interview
- Behavioral Interview
- System Design Interview
- AI Interview
- Panel Interview
- Final Round

---

# 7. Assessment Types

Supported assessments:

- Coding Challenge
- MCQ Test
- Aptitude Test
- SQL Assessment
- Machine Learning Assessment
- AI/LLM Assessment
- File Upload Assignment
- Case Study
- Video Response
- Custom Assessment

---

# 8. Interview Scheduling

Features:

- Select Interview Round
- Assign Interviewer
- Time Zone Support
- Calendar Availability Check
- Conflict Detection
- Google Calendar Sync
- Google Meet Link Generation
- Rescheduling
- Cancellation
- Interview Reminders

---

# 9. Interview Dashboard

Recruiter Dashboard

Displays:

- Today's Interviews
- Upcoming Interviews
- Pending Feedback
- Interview Calendar
- Interview Pipeline
- Candidate Status
- Interview History

Candidate Dashboard

Displays:

- Upcoming Interviews
- Meeting Links
- Interview Instructions
- Status Timeline
- Completed Interviews
- Feedback (Optional)

---

# 10. AI Interview Question Generator

Generate questions based on:

- Job Description
- Candidate Resume
- Skills
- Experience
- GitHub Analysis
- Previous Interview Feedback

Question Categories:

- Technical
- HR
- Behavioral
- Coding
- System Design
- AI/ML
- Domain Specific

Difficulty Levels:

- Easy
- Medium
- Hard

---

# 11. Coding Assessment

Support:

- Multiple Languages
- Online IDE
- Hidden Test Cases
- Public Test Cases
- Code Execution
- Runtime Limits
- Memory Limits
- Auto Evaluation
- Manual Evaluation

Supported Languages:

- Python
- Java
- JavaScript
- C++
- Go
- Rust
- SQL

---

# 12. MCQ Assessment

Support:

- Single Choice
- Multiple Choice
- True/False
- Fill in the Blank
- Timed Questions
- Random Question Order
- Negative Marking
- Auto Grading

---

# 13. Evaluation Scorecards

Each interviewer should score:

Technical Knowledge

Communication

Problem Solving

Coding Ability

System Design

Culture Fit

Leadership

Confidence

Learning Ability

Overall Recommendation

Rating Scale:

1–5

Comments:

Required

---

# 14. AI Interview Analysis (Future Ready)

AI should generate:

- Interview Summary
- Candidate Strengths
- Weaknesses
- Communication Score
- Technical Confidence
- Suggested Follow-up Questions
- Hiring Confidence Score

---

# 15. Notifications

Recruiters:

- Interview Scheduled
- Candidate Accepted
- Candidate Declined
- Feedback Pending
- Assessment Submitted

Candidates:

- Interview Invitation
- Reminder
- Reschedule Confirmation
- Assessment Assigned
- Assessment Deadline
- Result Published

---

# 16. Functional Requirements

FR-801

Create interview rounds.

---

FR-802

Assign interviewers.

---

FR-803

Generate Google Meet links.

---

FR-804

Send interview invitations.

---

FR-805

Assign coding assessments.

---

FR-806

Assign MCQ assessments.

---

FR-807

Collect interviewer feedback.

---

FR-808

Generate interview scorecards.

---

FR-809

Recommend hiring decision.

---

FR-810

Track interview history.

---

# 17. Backend APIs

POST /interviews

GET /interviews

PATCH /interviews/{id}

DELETE /interviews/{id}

POST /interviews/{id}/schedule

POST /interviews/{id}/reschedule

POST /interviews/{id}/feedback

GET /interviews/{id}/scorecard

POST /assessments

GET /assessments

POST /assessments/{id}/submit

GET /assessments/{id}/results

POST /ai/interview/questions

---

# 18. Database Changes

Tables:

interviews

interview_rounds

interviewers

interview_feedback

interview_scorecards

meeting_links

assessments

assessment_questions

assessment_submissions

assessment_scores

candidate_interview_history

---

# 19. Performance Requirements

Interview Scheduling

<2 sec

Google Meet Generation

<5 sec

Assessment Loading

<3 sec

Code Evaluation

<10 sec

MCQ Evaluation

<2 sec

Dashboard Refresh

<1 sec

---

# 20. Security Requirements

Role-Based Access Control

Secure Meeting Links

Encrypted Assessment Data

Assessment Anti-Cheating

Audit Logs

Signed URLs

Session Validation

Organization Isolation

---

# 21. Error Handling

Calendar Sync Failure

Meeting Creation Failed

Assessment Timeout

Submission Failed

Internet Disconnect

Interviewer Conflict

Expired Interview Link

Assessment Window Closed

---

# 22. Acceptance Criteria

✓ Interview scheduling operational

✓ Google Calendar integration working

✓ Google Meet links generated

✓ Coding assessments functional

✓ MCQ assessments functional

✓ AI interview questions generated

✓ Feedback captured successfully

✓ Scorecards generated

✓ Notifications delivered

✓ Candidate interview timeline updated

---

# 23. Out of Scope

Voice AI Interviews

Real-time AI Interview Evaluation

AI Proctoring

Offer Letter Generation

Payroll Integration

Background Verification

---

# 24. Deliverables

- Interview Management Dashboard
- Interview Scheduling Engine
- Google Calendar Integration
- Google Meet Integration
- Coding Assessment Platform
- MCQ Assessment Platform
- AI Question Generator
- Interview Scorecards
- Candidate Timeline
- Feedback Management System
- Assessment Evaluation Engine
- Interview Analytics APIs

---

# 25. Future Enhancements

- AI Voice Interview Agent
- Live Coding Collaboration
- AI Interview Transcription
- Emotion & Sentiment Analysis
- AI Interview Scoring
- Video Interview Recording
- Proctoring with Computer Vision
- AI-generated Offer Recommendation
- Automated Interview Feedback Summaries