# Product Requirements Document (PRD)

# PRD-02: Recruiter Dashboard

---

## Document Information

| Field | Value |
|--------|-------|
| Project | HireMind AI |
| Phase | 02 |
| Version | 1.0 |
| Status | Draft |
| Priority | High |
| Dependencies | PRD-00, PRD-01 |

---

# 1. Overview

The Recruiter Dashboard is the primary workspace for recruiters.

It provides a centralized interface to monitor recruitment activities, manage candidates, create jobs, review AI insights, schedule interviews, and access hiring analytics.

The dashboard should prioritize clarity, efficiency, and productivity, enabling recruiters to complete common workflows with minimal navigation.

---

# 2. Objectives

The Recruiter Dashboard should enable recruiters to:

- View recruitment metrics
- Monitor hiring pipelines
- Access candidate summaries
- Manage active jobs
- Review AI recommendations
- Navigate to all recruitment modules
- Track interview schedules
- View notifications
- Access organization settings

---

# 3. Business Goals

The dashboard should:

- Reduce recruiter workload
- Increase hiring visibility
- Surface AI insights
- Centralize hiring activities
- Improve recruiter productivity

---

# 4. Dashboard Layout

The dashboard consists of the following sections.

## Left Sidebar

- Dashboard
- Jobs
- Candidates
- Resume Intelligence
- Interviews
- Assessments
- GitHub Intelligence
- AI Copilot
- Analytics
- Notifications
- Organization
- Settings

---

## Top Navigation

Contains:

- Search
- Organization Switcher
- Notification Center
- Theme Toggle
- User Profile
- Settings

---

## Main Workspace

Displays dynamic content depending on selected module.

---

# 5. Dashboard Widgets

The landing dashboard should display:

## Recruitment Overview

- Active Jobs
- Total Candidates
- Pending Reviews
- Scheduled Interviews
- Offers Sent
- Hires Completed

---

## Hiring Funnel

Visual funnel displaying:

Applied

↓

Screened

↓

Shortlisted

↓

Interview

↓

Offer

↓

Hired

---

## Candidate Activity

Displays:

- Recent Applications
- New Candidates
- Recently Updated Profiles

---

## AI Recommendations

Examples:

Top Candidate

Candidate Needing Review

High ATS Match

Skill Gap Alerts

Duplicate Candidate Detection

---

## Calendar

Upcoming interviews.

Upcoming meetings.

Deadlines.

---

## Quick Actions

Buttons:

Create Job

Upload Resume

Invite Recruiter

Schedule Interview

Generate Job Description

Open AI Copilot

---

# 6. Functional Requirements

## Dashboard

FR-201

Display organization summary.

---

FR-202

Display recruiter statistics.

---

FR-203

Display AI recommendations.

---

FR-204

Display hiring pipeline.

---

FR-205

Display calendar events.

---

FR-206

Display recent notifications.

---

FR-207

Support global search.

---

FR-208

Support responsive layouts.

---

FR-209

Support dark mode.

---

FR-210

Refresh dashboard automatically.

---

# 7. User Stories

US-201

As a recruiter,

I want to see hiring metrics immediately after login

so that I understand current recruitment progress.

---

US-202

As a recruiter,

I want quick access to every recruitment module

without excessive navigation.

---

US-203

As a recruiter,

I want AI-generated recommendations

to prioritize my work.

---

US-204

As a recruiter,

I want upcoming interviews displayed

so I don't miss meetings.

---

# 8. UI Components

Cards

Metric Cards

Charts

Tables

Activity Feed

Calendar Widget

Notification Drawer

Search Bar

Profile Menu

Sidebar

Top Navigation

Quick Action Buttons

Modal Components

Skeleton Loaders

Empty States

Error States

---

# 9. Dashboard Cards

Cards required:

Organization Summary

Today's Interviews

Candidates Awaiting Review

Active Jobs

Average ATS Score

Average Hiring Time

Recent AI Analyses

Recruitment Funnel

Recent Activity

System Notifications

---

# 10. Charts

Implement:

Applications Per Day

Hiring Funnel

Candidate Sources

Hiring Trend

Recruiter Productivity

Monthly Hiring

AI Processing Statistics

---

# 11. Search

Global search supports:

Candidates

Jobs

Recruiters

Organizations

Interviews

GitHub Profiles

AI Reports

Resume IDs

---

# 12. Filters

Date Range

Department

Job

Status

Experience

Skills

Recruiter

Location

Employment Type

---

# 13. Backend APIs

GET /dashboard

GET /dashboard/stats

GET /dashboard/activity

GET /dashboard/calendar

GET /dashboard/notifications

GET /dashboard/recommendations

---

# 14. Database Changes

No new tables.

Reads from:

Users

Organizations

Jobs

Candidates

Interviews

Notifications

---

# 15. Performance Requirements

Dashboard initial load:

<2 seconds

Statistics refresh:

<500ms

Search:

<300ms

Charts:

Lazy Loaded

Images:

Optimized

---

# 16. Accessibility

Keyboard Navigation

Screen Reader Support

High Contrast

Responsive Design

Focus Indicators

ARIA Labels

---

# 17. Error Handling

No Internet

API Failure

Unauthorized

Empty Dashboard

Organization Missing

Session Expired

AI Service Unavailable

---

# 18. Security

Dashboard visible only to:

Owner

Admin

Recruiter

Hiring Manager

Candidates cannot access recruiter dashboard.

Organization isolation must be enforced.

---

# 19. Acceptance Criteria

✓ Dashboard loads successfully.

✓ Statistics displayed.

✓ Sidebar navigation works.

✓ Charts render correctly.

✓ Notifications visible.

✓ AI recommendations displayed.

✓ Calendar operational.

✓ Search functional.

✓ Responsive on desktop/tablet/mobile.

✓ Dark mode supported.

---

# 20. Out of Scope

Resume Parsing

Candidate Detail

Job Creation

Interview Scheduling

Analytics Reports

GitHub Analysis

AI Copilot Chat

These modules are implemented in later phases.

---

# 21. Deliverables

- Recruiter Dashboard
- Sidebar Navigation
- Top Navigation
- Dashboard Widgets
- Hiring Funnel
- Statistics Cards
- Calendar Widget
- Activity Feed
- Search
- Notifications
- Responsive Layout
- Dark Mode