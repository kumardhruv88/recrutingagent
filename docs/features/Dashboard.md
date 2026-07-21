# Dashboard

---

# Purpose

The Dashboard is the command center for recruiters.

When users log in, this is the first screen they see.

The dashboard should provide an instant overview of hiring activities, AI insights, interviews, analytics, and pending actions.

The user should understand the organization's hiring status within 5 seconds.

---

# Layout

Header

↓

Welcome Section

↓

Quick Action Cards

↓

KPI Cards

↓

Hiring Funnel

↓

Charts

↓

Upcoming Interviews

↓

Recent Applications

↓

AI Insights

↓

Recent Activity

---

# Welcome Section

Display

Good Morning,

Recruiter Name

Short greeting.

Current date.

---

# Quick Actions

Cards

Create Job

Upload Resume

Invite Team

Schedule Interview

View Analytics

Hover animation.

---

# KPI Cards

Cards

Open Jobs

Candidates

Applications

Interviews Today

Offers Sent

Average Hiring Time

Each card contains

Icon

Title

Value

Change Percentage

Mini trend indicator

---

# Hiring Funnel

Horizontal pipeline

Applied

↓

Screening

↓

Interview

↓

Assessment

↓

Offer

↓

Hired

Each stage

Count

Progress

Color

---

# Analytics

Charts

Applications This Month

Hiring Trend

Candidate Sources

Offer Acceptance

Time To Hire

Use Recharts.

Dummy local data.

---

# Upcoming Interviews

Table

Candidate

Role

Time

Interviewer

Status Badge

Action

---

# Recent Applications

Table

Candidate

Role

Applied

Score

Status

Quick Action

---

# AI Insights

Cards

Examples

"Resume quality increased 18%"

"Backend Engineer pipeline is slowing"

"Top candidate identified"

"Interview success rate improved"

Cards have

AI badge

Confidence

Recommendation

---

# Recent Activity

Timeline

Candidate Applied

Resume Analyzed

Interview Scheduled

Offer Accepted

---

# Sidebar Active State

Dashboard selected.

---

# Responsive

Desktop

2-column

Tablet

Stacked

Mobile

Single column

---

# Components

DashboardHeader

WelcomeCard

QuickActionCard

KPICard

HiringFunnel

AnalyticsChart

InterviewTable

ApplicationsTable

AIInsightCard

ActivityTimeline

SectionHeader

---

# Local Data

Create

data/dashboard.ts

Use realistic data.

No APIs.

---

# Animations

Fade

Slide

Card Hover

Chart Loading

Counter Animation

Scroll Reveal

---

# Dark Mode

Supported

---

# Accessibility

Keyboard

ARIA

Contrast

Screen Readers

---

# Acceptance Criteria

Responsive

Dark Mode

Accessible

Production Ready

No Backend

No APIs

Reusable Components

Charts Responsive

Zero TypeScript Errors

Zero ESLint Errors