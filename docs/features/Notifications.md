# Notifications Center

---

# Purpose

The Notifications Center provides a centralized inbox for all recruiter and hiring activities.

Every important event across HireMind AI should appear here.

This module should feel similar to Linear Inbox, GitHub Notifications, and Slack Activity.

Frontend only.

No backend.

No APIs.

No authentication.

Use realistic static data.

---

# Goal

Build a beautiful enterprise notification center that is clean, actionable, and easy to scan.

---

# Design Inspiration

- Linear Inbox
- GitHub Notifications
- Slack Activity
- Notion Updates
- Arc Browser

---

# Screens

## 1. Notification Center

Display all notifications.

Views

- All
- Unread
- Mentions
- AI
- Interviews
- Jobs
- Candidates
- System

---

## 2. Notification Detail

Shows

Title

Description

Timestamp

Actor

Related Entity

Quick Actions

---

## 3. AI Notifications

Examples

Resume Analysis Completed

New Job Matches Found

Candidate Ranking Updated

Interview Summary Ready

---

## 4. Mentions

Display recruiter mentions

Comments

Team discussions

Notes

---

## 5. Activity Feed

Chronological timeline

Grouped by

Today

Yesterday

This Week

Earlier

---

# Features

Search Notifications

Filter

Mark as Read

Mark All Read

Archive

Delete (UI only)

Pin

Star

Bulk Selection

Infinite Scroll (UI only)

---

# Components

NotificationList

NotificationCard

NotificationFilters

NotificationTabs

NotificationSearch

NotificationDetail

NotificationBadge

ActivityTimeline

EmptyState

NotificationSettings

BulkActionBar

---

# Folder Structure

features/

notifications/

components/

pages/

hooks/

data/

types/

---

# Local Data

Create

data/notifications.ts

Include

50 realistic notifications

Unread

Read

Pinned

Mentions

AI

System

Recruiter

Interview

---

# Design

Premium inbox.

Minimal.

Readable.

Lots of whitespace.

Soft borders.

Beautiful badges.

Elegant icons.

Smooth hover states.

---

# Animations

Fade

Slide

Unread indicator

Hover

List transitions

Badge updates

---

# Responsive

Desktop

Split view

Tablet

Stacked

Mobile

Drawer detail panel

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

No Notifications

No Mentions

No AI Updates

---

# Loading States

Notification list

Detail panel

Timeline

---

# Error States

Failed to Load

Retry

---

# Acceptance Criteria

Premium UI

Responsive

Dark Mode

Accessible

Reusable Components

Local Static Data

No Backend

No APIs

Zero TypeScript Errors

Zero ESLint Errors

Production Build Passes

---

# Out of Scope

Realtime updates

Push notifications

Email

WebSockets

Backend

Authentication