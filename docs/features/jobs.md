# Jobs Module

---

# Purpose

The Jobs module is the central workspace for managing hiring positions.

Each job acts as a hiring workspace where recruiters can monitor applications, AI recommendations, pipeline progress, interviews, and hiring metrics.

This phase focuses on frontend UI only.

No backend.

No authentication.

No APIs.

Use local static data.

---

# Goal

Build a premium ATS-style Jobs experience inspired by Greenhouse, Ashby, Linear, Notion and Stripe.

The interface should feel modern, minimal and enterprise-grade.

---

# Navigation

Sidebar

↓

Jobs

↓

Jobs List

↓

Job Details

↓

Pipeline

---

# Screens

## 1. Jobs List

Display all hiring positions.

Views

- Card View
- Table View

Features

- Search
- Filters
- Sort
- Pagination
- Status Filter
- Department Filter
- Experience Filter

Each Job Card contains

- Job Title
- Department
- Location
- Employment Type
- Hiring Manager
- Applications Count
- Open Positions
- AI Hiring Score
- Status
- Created Date

Quick Actions

- View
- Duplicate
- Archive

---

## 2. Create Job Dialog

Multi-step wizard

Step 1

Basic Information

↓

Step 2

Requirements

↓

Step 3

Responsibilities

↓

Step 4

Preview

↓

Step 5

Publish

UI only.

No submission.

---

## 3. Job Detail Page

Displays a complete hiring workspace.

Header

Job Title

Department

Status

AI Hiring Score

Primary Actions

Edit

Publish

Pause

Archive

---

# Tabs

Overview

Applications

Pipeline

Interviews

Analytics

Activity

---

## Overview

Display

Job Summary

Requirements

Responsibilities

Benefits

Hiring Team

Statistics

AI Summary

---

## Applications

Table

Columns

Candidate

Applied Date

AI Match

Status

Recruiter

Quick Actions

---

## Pipeline

Modern Kanban Board

Columns

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

Cards

Candidate

Avatar

Experience

AI Score

Status

Drag UI only.

No backend.

---

## Interviews

Upcoming Interviews

Completed Interviews

Schedule Cards

Timeline

---

## Analytics

Charts

Applications

Hiring Funnel

Conversion Rate

Time To Hire

Source Breakdown

Use Recharts.

---

## Activity

Timeline

Job Created

Candidate Applied

Interview Scheduled

Offer Sent

Status Changed

---

# Search

Search Jobs

Search Hiring Manager

Search Department

---

# Filters

Department

Status

Location

Experience

Employment Type

Date

Clear Filters

---

# Components

JobsTable

JobCard

JobHeader

JobOverview

JobPipeline

PipelineColumn

CandidatePipelineCard

ApplicationsTable

InterviewCard

AnalyticsCards

JobStatistics

ActivityTimeline

CreateJobDialog

FilterBar

SearchBar

Pagination

---

# Folder Structure

```
features/

jobs/

components/

pages/

hooks/

data/

types/
```

---

# Local Data

Create

```
data/jobs.ts
```

Include

10 realistic jobs

Applications

Pipeline stages

Analytics

Hiring team

---

# Design

Modern ATS interface.

Lots of whitespace.

Rounded cards.

Subtle gradients.

Glassmorphism only where appropriate.

Professional typography.

Premium look.

---

# Animations

Framer Motion

Card Hover

Kanban Hover

Dialog

Tabs

Charts

Counters

Skeletons

---

# Responsive

Desktop

Kanban

Tablet

Stacked

Mobile

Cards

Horizontal tabs

---

# Dark Mode

Supported

---

# Accessibility

Keyboard

ARIA

Contrast

Focus

---

# Empty States

No Jobs

No Applications

No Interviews

No Analytics

---

# Loading States

Cards

Tables

Kanban

Charts

Statistics

---

# Error States

Job Not Found

Analytics Failed

Pipeline Failed

Retry Button

---

# Acceptance Criteria

Responsive

Beautiful UI

Modern ATS Design

Dark Mode

Reusable Components

Accessible

Local Data

No Backend

No APIs

No Authentication

Zero TypeScript Errors

Zero ESLint Errors

Production Build Passes

---

# Out of Scope

Backend

Database

Publishing Jobs

Real Drag & Drop

Authentication

API Integration

AI Inference

Real Analytics