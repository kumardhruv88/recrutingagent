# Recruiter Portal

---

# Purpose

The Recruiter Portal is the recruiter’s personal workspace.

It provides a unified view of assigned jobs, candidate pipeline, interviews, AI recommendations, tasks, notifications, and productivity metrics.

This should feel like a personalized operating system for recruiters.

Frontend only.

No backend.

No authentication.

Use local static data.

---

# Goal

Create the primary daily workspace for recruiters.

This module should combine productivity, AI assistance, and hiring management into one elegant experience.

---

# Design Inspiration

Linear

Notion

Raycast

Slack

Ashby

Vercel

Stripe

---

# Layout

Header

↓

Recruiter Summary

↓

Today's Tasks

↓

Assigned Jobs

↓

Candidate Pipeline

↓

Upcoming Interviews

↓

AI Recommendations

↓

Activity Feed

↓

Performance Metrics

---

# Screens

## 1. Recruiter Home

Display

Profile Summary

Current Workload

Pending Reviews

Interview Count

Assigned Jobs

AI Productivity Score

---

## 2. My Jobs

Cards

Job Title

Department

Applications

Interviews

Status

Hiring Progress

Quick Actions

---

## 3. My Candidates

List

Candidate

Job

AI Match

Current Stage

Last Activity

---

## 4. Today's Tasks

Checklist

Review Resume

Schedule Interview

Approve Candidate

Send Offer

Follow Up

---

## 5. AI Assistant

Sticky panel

Today's priorities

High-risk candidates

Pipeline warnings

Suggested actions

Recruiter insights

---

## 6. Upcoming Interviews

Timeline

Candidate

Role

Time

Meeting Type

Status

---

## 7. Performance

Cards

Candidates Reviewed

Interviews Completed

Offers Sent

Response Time

Hiring Efficiency

---

## 8. Activity Feed

Timeline

Resume Reviewed

Candidate Moved

Interview Completed

Offer Accepted

---

# Components

RecruiterSummary

TaskChecklist

AssignedJobCard

CandidateList

InterviewTimeline

AIAssistantPanel

PerformanceCards

ActivityFeed

QuickActionGrid

ProductivityWidget

---

# Folder Structure

features/

recruiter-portal/

components/

pages/

hooks/

data/

types/

---

# Local Data

Create

data/recruiter.ts

Include

Recruiter profile

Assigned jobs

Candidates

Tasks

Notifications

Activity

Performance metrics

---

# Design

Premium SaaS.

Personal dashboard.

Modern cards.

Large whitespace.

Rounded components.

Soft gradients.

Micro interactions.

Elegant typography.

---

# Animations

Fade

Slide

Hover

Task completion

Timeline

Counters

Charts

---

# Responsive

Desktop

Three-column layout

Tablet

Two-column

Mobile

Single-column

---

# Dark Mode

Required

---

# Accessibility

Keyboard

ARIA

Contrast

Focus

---

# Empty States

No Tasks

No Jobs

No Interviews

No Activity

---

# Loading States

Cards

Timeline

Tasks

Charts

---

# Error States

Failed to Load

Retry

---

# Acceptance Criteria

Premium UI

Responsive

Accessible

Reusable Components

Dark Mode

Static Data

No Backend

No APIs

Zero TypeScript Errors

Zero ESLint Errors

Production Build Passes

---

# Out of Scope

Authentication

Database

Notifications API

Calendar Sync

Real Tasks

Real Analytics