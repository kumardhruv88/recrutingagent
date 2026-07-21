# Candidate Portal

---

# Purpose

The Candidate Portal is the central workspace for recruiters to manage candidates throughout the hiring lifecycle.

It provides a complete 360° view of every candidate, including resumes, AI analysis, interviews, assessments, GitHub insights, activity history, and recruiter notes.

This module should prioritize speed, readability, and recruiter productivity.

---

# Goal

Build a complete frontend-only Candidate Management module.

This phase focuses only on UI.

No backend.

No APIs.

No authentication.

Use local static data.

---

# Navigation

Sidebar

↓

Candidates

↓

Candidate List

↓

Candidate Profile

---

# Screens

## 1. Candidate List

Displays all candidates.

Features

- Search
- Advanced Filters
- Sort
- Card View
- Table View
- Pagination
- Bulk Selection
- Bulk Actions

Columns

- Avatar
- Name
- Email
- Current Role
- Experience
- AI Match Score
- Status
- Applied Job
- Recruiter
- Last Updated

Actions

- View
- Edit (placeholder)
- Archive (placeholder)

---

## 2. Candidate Profile

Displays a complete candidate profile.

Header

- Avatar
- Full Name
- Current Position
- Experience
- Location
- Email
- Phone
- AI Match Score
- Status Badge

Quick Actions

- Schedule Interview
- Download Resume
- Share Profile
- More Actions

---

# Tabs

The profile contains the following tabs.

---

## Overview

Summary

Skills

Experience

Education

Projects

Languages

Certifications

Quick Statistics

---

## Resume

Embedded PDF viewer placeholder

Toolbar

- Download
- Fullscreen
- Zoom In
- Zoom Out

---

## AI Analysis

Sections

Executive Summary

Skill Match

ATS Score

Strengths

Weaknesses

Recommendations

Confidence Level

Hiring Recommendation

Use visual score cards.

---

## Applications

Table

Columns

- Job
- Applied Date
- Stage
- Recruiter
- Status

---

## Interviews

Timeline

Upcoming Interviews

Completed Interviews

Interview Feedback

---

## Assessments

Cards

Assessment Name

Score

Completion Status

Submitted Date

---

## GitHub

Repository Summary

Top Languages

Contribution Graph Placeholder

Open Source Projects

AI GitHub Summary

---

## Activity

Timeline

Resume Uploaded

Profile Updated

Interview Scheduled

Assessment Completed

Offer Sent

Status Changed

---

## Notes

Rich text placeholder

Pinned Notes

Recent Notes

Timestamp

Author

---

# Search

Global search within candidates.

Search by

- Name
- Email
- Skills
- Company
- Job Title

---

# Filters

Support

- Experience
- Status
- Skills
- Recruiter
- Applied Job
- Location
- Education

Include

Clear Filters

Save Filter (placeholder)

---

# Bulk Actions

Support

- Assign Recruiter
- Change Status
- Export
- Archive

Confirmation dialogs only.

---

# Local Data

Create

```
data/candidates.ts
```

Include realistic dummy data.

Minimum

- 20 candidates
- Multiple jobs
- Various statuses
- Different AI scores

---

# Components

Create reusable components.

CandidateTable

CandidateCard

CandidateHeader

CandidateOverview

ResumeViewer

AIScoreCard

ATSCard

SkillBadge

ApplicationTable

InterviewTimeline

AssessmentCard

GitHubCard

ActivityTimeline

NotesPanel

FilterBar

SearchBar

BulkActionBar

Pagination

---

# Folder Structure

```
features/

candidates/

components/

pages/

hooks/

data/

types/
```

---

# Animations

Framer Motion

Fade

Slide

Card Hover

Tab Transition

Loading Skeleton

Keep animations subtle.

---

# Responsive

Desktop

Two-column profile layout.

Tablet

Stacked sections.

Mobile

Single column.

Tabs become horizontally scrollable.

---

# Theme

Support

Light

Dark

System

---

# Accessibility

Keyboard navigation

ARIA labels

Visible focus states

Proper color contrast

Semantic HTML

---

# Empty States

No Candidates

No Resume

No Interviews

No Assessments

No Notes

Guide users toward the next action.

---

# Loading States

Candidate Table Skeleton

Profile Skeleton

Timeline Skeleton

Resume Loader

AI Analysis Skeleton

---

# Error States

Candidate Not Found

Resume Failed to Load

AI Analysis Unavailable

Retry actions only.

---

# Acceptance Criteria

- Fully responsive
- Production-quality UI
- Reusable components
- Dark mode support
- Accessible (WCAG AA)
- Uses shared layout components
- Uses shadcn/ui
- Uses Framer Motion
- Uses local static data
- Zero TypeScript errors
- Zero ESLint errors
- Production build passes

---

# Out of Scope

- Backend APIs
- Authentication
- Database
- Real PDF rendering
- AI inference
- Clerk integration
- Supabase integration
- File uploads
- Editing candidate information

These will be implemented in later phases.