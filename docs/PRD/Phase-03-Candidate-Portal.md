# Product Requirements Document (PRD)

# PRD-03: Candidate Portal

---

## Document Information

| Field | Value |
|--------|-------|
| Project | HireMind AI |
| Phase | 03 |
| Version | 1.0 |
| Status | Draft |
| Priority | High |
| Dependencies | PRD-00, PRD-01, PRD-02 |

---

# 1. Overview

The Candidate Portal is the primary workspace for applicants throughout the recruitment journey.

It provides a centralized platform where candidates can manage their profile, upload resumes, receive AI-powered resume feedback, track job applications, schedule interviews, complete assessments, and monitor recruitment progress.

The portal should provide a transparent, intuitive, and engaging user experience while empowering candidates with meaningful insights into their applications.

---

# 2. Objectives

The Candidate Portal should enable users to:

- Create and manage their professional profile
- Upload and manage resumes
- Receive AI resume analysis
- View ATS compatibility score
- Apply for jobs
- Track application status
- Schedule interviews
- Complete assessments
- View interview feedback (when available)
- Receive notifications
- Manage account settings

---

# 3. Business Goals

The Candidate Portal should:

- Improve candidate experience
- Increase application completion rates
- Reduce applicant confusion
- Encourage resume improvement
- Provide transparency during hiring
- Increase engagement with recruiters

---

# 4. Candidate Dashboard

The landing dashboard should display:

- Profile Completion
- Active Applications
- Interview Schedule
- Resume Score
- ATS Compatibility
- AI Suggestions
- Recent Notifications
- Upcoming Assessments
- Saved Jobs
- Recent Activity

---

# 5. Navigation

The portal contains:

- Dashboard
- My Profile
- My Resume
- Resume Analysis
- ATS Score
- Job Applications
- Saved Jobs
- Interviews
- Assessments
- Notifications
- Settings

---

# 6. Candidate Profile

The profile should include:

## Personal Information

- Full Name
- Email
- Phone
- Location
- LinkedIn
- GitHub
- Portfolio
- Professional Summary

---

## Education

- Institution
- Degree
- Branch
- Graduation Year
- CGPA

---

## Experience

- Company
- Position
- Duration
- Responsibilities

---

## Skills

- Technical Skills
- Soft Skills
- Languages
- Certifications

---

## Projects

- Title
- Description
- Technologies
- GitHub Link
- Live Demo

---

# 7. Resume Management

Candidates can:

- Upload Resume
- Replace Resume
- Download Resume
- Delete Resume
- View Resume History
- View Resume Metadata

Supported Formats:

- PDF
- DOCX

Maximum Size:

10 MB

---

# 8. Resume Intelligence

After upload, the system should generate:

- Resume Summary
- Skill Extraction
- Experience Analysis
- Education Analysis
- Project Extraction
- Certification Detection
- Missing Skills
- Strengths
- Weaknesses
- ATS Compatibility Score

---

# 9. ATS Score

The ATS module should display:

- Overall Score
- Keyword Match
- Formatting Score
- Readability
- Skills Coverage
- Experience Coverage
- Recommendations

Visual indicators:

Excellent

Good

Average

Needs Improvement

---

# 10. Job Applications

Candidates can:

- Browse Jobs
- Apply
- Withdraw Application
- Save Jobs
- Track Application Status

Application stages:

Applied

↓

Resume Reviewed

↓

Shortlisted

↓

Interview

↓

Assessment

↓

Offer

↓

Rejected

↓

Hired

---

# 11. Interview Management

Candidates can:

- View Interview Schedule
- Accept Invitation
- Reschedule Request
- Join Google Meet
- View Instructions
- Receive Reminders

---

# 12. Assessment Portal

Candidates should:

- Start Assessment
- View Instructions
- Submit Assessment
- View Status
- View Scores (if released)

---

# 13. Notifications

Notification types:

- Application Submitted
- Resume Reviewed
- Interview Scheduled
- Assessment Assigned
- Offer Released
- Status Updated
- Reminder Notifications

---

# 14. Functional Requirements

FR-301

Candidate registration.

---

FR-302

Resume upload.

---

FR-303

Resume analysis.

---

FR-304

ATS score generation.

---

FR-305

Application tracking.

---

FR-306

Interview management.

---

FR-307

Assessment tracking.

---

FR-308

Notification center.

---

FR-309

Profile management.

---

FR-310

Settings management.

---

# 15. User Stories

US-301

As a candidate,

I want to upload my resume

so recruiters can evaluate me.

---

US-302

As a candidate,

I want AI feedback

so I can improve my resume.

---

US-303

As a candidate,

I want to track my applications

so I know my hiring progress.

---

US-304

As a candidate,

I want interview reminders

so I never miss interviews.

---

US-305

As a candidate,

I want ATS recommendations

to improve my chances.

---

# 16. Backend APIs

GET /candidate/dashboard

GET /candidate/profile

PATCH /candidate/profile

POST /candidate/resume

DELETE /candidate/resume

GET /candidate/resume-analysis

GET /candidate/ats-score

GET /candidate/applications

POST /candidate/jobs/{id}/apply

GET /candidate/interviews

GET /candidate/notifications

---

# 17. Database Changes

Tables:

candidate_profiles

candidate_resumes

candidate_skills

candidate_projects

applications

saved_jobs

candidate_notifications

---

# 18. Performance Requirements

Dashboard

<2 sec

Resume Upload

<5 sec

Resume Analysis

<10 sec

Application Status

Real-time updates

Responsive UI

Desktop

Tablet

Mobile

---

# 19. Security

Candidates can access only:

Their profile

Their resume

Their applications

Their interview schedule

Their assessments

Organization data must remain isolated.

---

# 20. Error Handling

Resume upload failed

Invalid file type

File too large

Application failed

Interview unavailable

Network error

Session expired

Resume analysis failed

---

# 21. Acceptance Criteria

✓ Candidate dashboard operational

✓ Resume upload works

✓ Resume analysis generated

✓ ATS score displayed

✓ Applications tracked

✓ Interview schedule visible

✓ Notifications working

✓ Responsive design complete

✓ Dark mode supported

---

# 22. Out of Scope

Recruiter Dashboard

Job Creation

Candidate Ranking

GitHub Intelligence

AI Copilot

Analytics

Admin Panel

Billing

---

# 23. Deliverables

- Candidate Dashboard
- Candidate Profile
- Resume Management
- Resume Analysis
- ATS Score
- Application Tracker
- Interview Portal
- Assessment Portal
- Notification Center
- Settings
- Responsive Design