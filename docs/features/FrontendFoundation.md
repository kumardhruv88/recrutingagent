# Frontend Foundation

---

# Purpose

Build the authenticated application shell that will be reused by every module in HireMind AI.

This is NOT the dashboard.

This is the reusable layout framework.

---

# Goal

Create the complete authenticated UI infrastructure.

Every future page should render inside this layout.

---

# Layout

+------------------------------------------------------------+
| Header                                                     |
+-------------+----------------------------------------------+
| Sidebar     | Main Content                                 |
|             |                                              |
|             |                                              |
|             |                                              |
+-------------+----------------------------------------------+

---

# Sidebar

Persistent on desktop.

Drawer on mobile.

Collapsed mode supported.

Sections

Dashboard

Hiring

- Jobs
- Candidates
- Applications

Evaluation

- Interviews
- Assessments

AI

- Resume Intelligence
- AI Copilot

Insights

- Analytics

Administration

- Team
- Notifications
- Settings

---

# Header

Contains

Organization Switcher

Global Search

Command Palette Button

Notifications

Theme Toggle

User Menu

Sticky

Blur Background

---

# Breadcrumb

Reusable component.

Auto generated from route.

---

# Page Layout

Every page uses

Page Header

↓

Toolbar

↓

Content

↓

Optional Footer

---

# Page Header

Contains

Title

Description

Primary Action

Secondary Actions

---

# Global Search

UI only.

No backend.

Command + K shortcut placeholder.

---

# Notifications

UI only.

Dropdown.

Unread badge.

---

# User Menu

Avatar

Profile

Settings

Logout placeholder

---

# Theme

Light

Dark

System

Persist preference.

---

# Loading Components

Create reusable

LoadingCard

LoadingTable

LoadingPage

Skeleton components

---

# Empty State

Reusable component.

Illustration

Title

Description

Primary Action

---

# Error State

Reusable component.

Icon

Title

Description

Retry Button

---

# Components

Sidebar

SidebarItem

SidebarGroup

Header

Breadcrumb

PageContainer

PageHeader

SearchBar

NotificationDropdown

ThemeToggle

UserMenu

EmptyState

ErrorState

LoadingCard

LoadingTable

LoadingPage

CommandPalette (UI only)

---

# Routing

Create empty routes

/dashboard

/candidates

/jobs

/applications

/interviews

/assessments

/resume-intelligence

/copilot

/analytics

/settings

Every page should only render

Page Header

Empty State

No business logic.

---

# Animations

Framer Motion

Sidebar

Drawer

Dropdown

Page transition

Hover

Loading

---

# Responsive

Desktop

Tablet

Mobile

---

# Accessibility

Keyboard navigation

ARIA

Focus states

Contrast

---

# Acceptance Criteria

Reusable

Responsive

Dark Mode

Production Ready

No backend

No APIs

No authentication

No mock API

No fake business logic

Every future module should plug into this shell.