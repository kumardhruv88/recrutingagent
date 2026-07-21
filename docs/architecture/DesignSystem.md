# Design System

---

# 1. Purpose

The HireMind AI Design System establishes a consistent visual language, interaction model, and reusable component library for the application.

Its objectives are to:

- Create a unified user experience
- Improve development speed through reusable components
- Ensure accessibility across the platform
- Maintain visual consistency
- Simplify future feature development

The design system serves as the single source of truth for designers and developers.

---

# 2. Design Philosophy

HireMind AI follows a modern SaaS design philosophy inspired by products such as Linear, Vercel, Notion, GitHub, and Stripe.

Core principles include:

- Simplicity over complexity
- Consistency over creativity
- AI assists rather than distracts
- Data-first interfaces
- Clear visual hierarchy
- Fast interactions
- Accessibility by default

Every screen should feel clean, professional, and predictable.

---

# 3. Brand Personality

The product should communicate:

Professional

Reliable

Intelligent

Modern

Minimal

Trustworthy

Efficient

The interface should never appear playful or overly decorative.

---

# 4. Visual Principles

The UI should emphasize:

Whitespace

↓

Content Hierarchy

↓

Readable Typography

↓

Meaningful Colors

↓

Consistent Components

↓

Subtle Motion

Decorative elements should never compete with important content.

---

# 5. Color System

## Brand Colors

Primary

#2563EB

Primary Hover

#1D4ED8

Primary Light

#DBEAFE

---

## Semantic Colors

Success

#16A34A

Warning

#F59E0B

Danger

#DC2626

Information

#0EA5E9

---

## Neutral Colors

Background

#FFFFFF

Surface

#F8FAFC

Card

#FFFFFF

Border

#E5E7EB

Divider

#F1F5F9

Text Primary

#111827

Text Secondary

#6B7280

Muted Text

#9CA3AF

---

## Dark Theme

Background

#09090B

Surface

#18181B

Card

#18181B

Border

#27272A

Primary Text

#FAFAFA

Secondary Text

#A1A1AA

---

# 6. Color Usage Rules

Use the primary color only for:

- Primary buttons
- Links
- Selected states
- Important actions
- AI highlights

Success should indicate completed or positive states.

Warning should indicate attention-required states.

Danger should indicate destructive actions.

Avoid using semantic colors for decoration.

---

# 7. Typography

Primary Font

Inter

Fallback

system-ui

Arial

sans-serif

Typography Scale

H1

36px

Bold

H2

30px

Bold

H3

24px

SemiBold

H4

20px

SemiBold

Body

16px

Regular

Small

14px

Regular

Caption

12px

Medium

Line height should remain between 1.4 and 1.6 for readability.

---

# 8. Spacing System

The design system follows an 8-point spacing grid.

Spacing Tokens

4

8

12

16

24

32

40

48

64

80

96

Spacing should be applied consistently across layouts and components.

Avoid arbitrary spacing values.

---

# 9. Border Radius

Buttons

8px

Inputs

8px

Cards

12px

Dialogs

16px

Badges

999px

Consistent radius values create a cohesive visual language.

---

# 10. Elevation

Three elevation levels are defined.

Level 1

Cards

Level 2

Dropdowns

Popovers

Level 3

Dialogs

Drawers

Shadows should remain subtle and never dominate the interface.

---

# 11. Grid System

Desktop

12-column grid

Tablet

8-column grid

Mobile

4-column grid

Layouts should adapt fluidly between breakpoints.

Content should align consistently to the grid.

---

# 12. Responsive Breakpoints

Mobile

0–639px

Small

640px

Medium

768px

Large

1024px

Extra Large

1280px

2XL

1536px

Design mobile-first whenever possible.

---

# 13. Iconography

Icon Library

Lucide React

Standard Sizes

16px

20px

24px

Icons should always accompany actions or provide meaningful context.

Avoid decorative icon usage.

---

# 14. Illustrations

Illustrations should be used only for:

- Empty states
- Onboarding
- Error pages
- Success pages

Illustrations should remain minimal and align with the overall brand style.

---

# 15. Accessibility Foundations

The design system follows WCAG AA standards.

Requirements

- Minimum contrast ratio of 4.5:1
- Keyboard navigation support
- Visible focus indicators
- Screen reader compatibility
- Semantic HTML
- ARIA attributes where required

Accessibility is considered a default requirement rather than an enhancement.

---

# 16. Foundation Principles

The HireMind AI design foundation is built upon these principles.

- Consistency across every screen
- Minimal visual noise
- Strong information hierarchy
- Accessible by default
- Mobile-first responsive layouts
- Reusable design tokens
- Predictable interactions
- Professional visual identity

These foundations guide every component and screen throughout the application.

---
# Design System

---

# 17. Component Philosophy

All UI components should be:

- Reusable
- Accessible
- Composable
- Theme-aware
- Responsive
- Consistent

Components should solve one problem well.

Avoid creating multiple versions of the same component.

---

# 18. Component Hierarchy

Application

↓

Pages

↓

Feature Components

↓

Shared Components

↓

UI Components

↓

Design Tokens

Business logic should never exist inside UI components.

---

# 19. Buttons

Buttons communicate user actions.

Variants

- Primary
- Secondary
- Outline
- Ghost
- Destructive
- Link

Sizes

- Small (32px)
- Medium (40px)
- Large (48px)
- Icon

States

- Default
- Hover
- Focus
- Active
- Disabled
- Loading

Guidelines

- One primary button per section
- Use loading state for async actions
- Disable during submission
- Include icons only when they add clarity

---

# 20. Inputs

Supported Components

- Text Input
- Password Input
- Email Input
- Number Input
- Search Input
- File Upload

Features

- Label
- Placeholder
- Helper Text
- Error Message
- Success State

Validation should appear after interaction.

Avoid excessive validation while typing.

---

# 21. Textareas

Used for

- Notes
- Job Descriptions
- Feedback
- AI Prompts

Features

- Auto Resize
- Character Count
- Validation
- Helper Text

---

# 22. Select Components

Supported

- Single Select
- Multi Select
- Searchable Select
- Async Select

Used for

- Recruiters
- Skills
- Departments
- Locations
- Job Status

---

# 23. Checkboxes & Radio Buttons

Checkbox

Use for multiple selections.

Radio

Use for mutually exclusive options.

Switch

Use for immediate settings changes.

Always include descriptive labels.

---

# 24. Cards

Cards group related information.

Structure

Header

↓

Content

↓

Footer (optional)

Use cards for

- Candidate Summary
- Job Overview
- Analytics Widgets
- AI Insights

Avoid nesting cards inside cards.

---

# 25. Tables

Tables display structured data.

Supported Features

- Sorting
- Filtering
- Pagination
- Search
- Row Selection
- Sticky Header
- Bulk Actions

Tables should remain readable on smaller screens.

---

# 26. Avatars

Display

- Users
- Candidates
- Recruiters

Sizes

Small

Medium

Large

Fallback

User initials if image unavailable.

---

# 27. Badges

Badges communicate status.

Examples

Active

Paused

Interview

Hired

Rejected

AI Generated

Use semantic colors consistently.

---

# 28. Tags

Tags categorize content.

Examples

Python

Remote

Backend

Senior

Urgent

Tags are informational and non-interactive unless explicitly removable.

---

# 29. Alerts

Types

Success

Warning

Error

Information

Structure

Icon

↓

Title

↓

Description

↓

Action (optional)

Alerts should clearly communicate what happened and what the user can do next.

---

# 30. Toast Notifications

Used for lightweight feedback.

Examples

Saved Successfully

Resume Uploaded

Interview Scheduled

Maximum Duration

3–5 seconds

Avoid stacking excessive toasts.

---

# 31. Dialogs

Dialogs interrupt the workflow only when necessary.

Use for

- Delete Confirmation
- Invite Members
- Create Job
- Edit Candidate

Dialogs should always provide:

Primary Action

Secondary Action

Close Button

Escape Key Support

---

# 32. Drawers

Use drawers instead of dialogs for large forms.

Examples

Candidate Details

Notifications

Filters

AI Copilot

Drawers should preserve page context.

---

# 33. Tabs

Tabs organize related information.

Examples

Overview

Resume

AI Analysis

Interviews

GitHub

Notes

Keep the number of tabs manageable.

---

# 34. Accordions

Use accordions for expandable information.

Examples

Resume Sections

FAQs

Advanced Filters

Audit Logs

Do not hide critical information inside accordions.

---

# 35. Tooltips

Tooltips provide additional context.

Use for

- Icons
- AI Scores
- Technical Terms
- Disabled Buttons

Keep tooltip content concise.

---

# 36. Dropdown Menus

Use for contextual actions.

Examples

Edit

Duplicate

Archive

Delete

Share

Group destructive actions separately.

---

# 37. Progress Indicators

Used for

- Resume Processing
- AI Analysis
- File Upload
- Assessment Completion

Display percentage when meaningful.

---

# 38. Skeleton Loaders

Replace spinners wherever possible.

Provide skeletons for

- Cards
- Tables
- Dashboards
- Candidate Profiles
- Analytics

Skeletons should match the final layout.

---

# 39. Empty States

Every module should include a meaningful empty state.

Components

Illustration

↓

Title

↓

Description

↓

Primary Action

↓

Secondary Action (optional)

Guide users toward the next step.

---

# 40. Pagination

Use pagination for large datasets.

Include

- Page Number
- Previous
- Next
- Rows per Page

Remember user preferences where appropriate.

---

# 41. Breadcrumbs

Used for deep navigation.

Example

Dashboard

>

Jobs

>

Backend Engineer

>

Applications

Breadcrumbs should reflect the navigation hierarchy.

---

# 42. Search

Search should support

- Instant Results
- Keyboard Navigation
- Recent Searches
- Highlighted Matches

Search should remain accessible from every major page.

---

# 43. AI Components

Specialized components unique to HireMind AI.

Includes

AI Score Card

Confidence Badge

AI Recommendation Panel

Resume Match Card

Skill Match Visualization

Interview Recommendation Panel

AI Chat Bubble

AI Summary Card

These components should visually distinguish AI-generated insights from user-entered content.

---

# 44. Component Naming Convention

Base Components

Button

Card

Input

Dialog

Table

Badge

Feature Components

CandidateCard

JobCard

ResumeViewer

PipelineColumn

InterviewTimeline

AssessmentCard

AnalyticsWidget

Component names should clearly communicate purpose.

---

# 45. Component Principles

Every component should:

- Be reusable
- Support dark mode
- Support accessibility
- Use design tokens
- Be responsive
- Handle loading states
- Handle error states
- Avoid embedded business logic
- Be easily testable
- Follow consistent naming

The component library should serve as the foundation for every screen in HireMind AI, ensuring a consistent, maintainable, and scalable user interface.

---
# Design System

---

# 46. Layout Philosophy

The layout system should prioritize:

- Simplicity
- Predictability
- Consistency
- Content-first design
- Efficient workflows

Every page should follow the same structural pattern.

---

# 47. Application Shell

The authenticated application follows a standard shell.

```
+------------------------------------------------------+
| Header                                               |
+------------+-----------------------------------------+
| Sidebar    | Main Content                            |
|            |                                         |
|            |                                         |
|            |                                         |
+------------+-----------------------------------------+
```

The sidebar remains persistent on desktop and collapsible on smaller screens.

---

# 48. Sidebar Navigation

Sidebar contains the primary navigation.

Sections

- Dashboard
- Jobs
- Candidates
- Applications
- Interviews
- Assessments
- Analytics
- AI Copilot
- Team
- Settings

Guidelines

- Highlight active page
- Support collapsed mode
- Icons + Labels
- Group related modules
- Keep navigation depth shallow

---

# 49. Header

The global header includes:

- Organization Switcher
- Global Search
- AI Command Button
- Notifications
- User Profile Menu

The header remains fixed while scrolling.

---

# 50. Page Layout

Every page follows a consistent structure.

```
Page Header

↓

Toolbar (Search / Filters / Actions)

↓

Main Content

↓

Pagination (if required)
```

Avoid placing unrelated actions in the page header.

---

# 51. Page Header

Each page header includes:

- Page Title
- Description (optional)
- Breadcrumb (optional)
- Primary Action
- Secondary Actions

Example:

Candidates

"Manage and evaluate your candidate pipeline."

[Upload Resume] [Export]

---

# 52. Dashboard Layout

Dashboard uses a responsive widget grid.

Structure

```
KPI Cards

↓

Charts

↓

Recent Activity

↓

AI Insights

↓

Upcoming Tasks
```

Widgets should be rearrangeable in future versions.

---

# 53. Forms

Forms should follow a single-column layout by default.

Structure

Label

↓

Input

↓

Helper Text

↓

Validation Message

Group related fields into logical sections.

---

# 54. Multi-Step Forms

Use step-based forms for complex workflows.

Examples

- Create Job
- Organization Setup
- Candidate Import

Structure

Step Indicator

↓

Current Form

↓

Navigation Buttons

Users should be able to return to previous steps.

---

# 55. Lists

Lists are suitable for compact information.

Examples

- Notifications
- Recent Activity
- AI Suggestions
- Interview Timeline

Each list item should include:

- Title
- Supporting Text
- Timestamp (if applicable)
- Optional Action

---

# 56. Data Tables

Tables should support:

- Search
- Filters
- Sorting
- Pagination
- Bulk Selection
- Responsive Columns

Columns should be prioritized by importance.

Avoid horizontal scrolling whenever possible.

---

# 57. Kanban Boards

Kanban boards are used for hiring pipelines.

Structure

```
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
```

Cards should support:

- Drag & Drop
- Quick Actions
- Status Indicators

---

# 58. AI Panels

AI-generated insights appear in dedicated panels.

Structure

AI Icon

↓

Title

↓

Summary

↓

Supporting Evidence

↓

Recommended Actions

AI panels should always be visually distinct from user-generated content.

---

# 59. Search Experience

Global search should support:

- Instant Results
- Keyboard Navigation
- Recent Searches
- Highlighted Matches

Search Categories

- Candidates
- Jobs
- Applications
- Interviews
- Settings

---

# 60. Filters

Filters should appear in a consistent location above data.

Supported Types

- Dropdown
- Multi-select
- Date Range
- Status Chips
- Search

Provide a "Clear All" option when filters are active.

---

# 61. Detail Pages

Detail pages provide a 360° view of an entity.

Layout

Header

↓

Summary

↓

Tabbed Content

↓

Activity Timeline

↓

Context Actions

Examples

- Candidate Profile
- Job Details
- Interview Details

---

# 62. Empty States

Every screen should provide a meaningful empty state.

Include:

- Illustration
- Title
- Description
- Primary Action

Example:

"No candidates yet."

[Upload Resume]

---

# 63. Loading States

Use skeleton loaders instead of blank screens.

Provide skeletons for:

- Tables
- Cards
- Charts
- Detail Pages
- AI Panels

Maintain layout stability while loading.

---

# 64. Error States

Errors should be localized.

Each error includes:

- Clear Message
- Cause (if known)
- Retry Action
- Support Link (optional)

Never block the entire application because of one failed request.

---

# 65. Responsive Layout

Desktop

- Sidebar visible
- Multi-column layouts

Tablet

- Collapsible sidebar
- Two-column layouts

Mobile

- Drawer navigation
- Single-column layout
- Sticky action buttons

The same functionality should remain available across all devices.

---

# 66. Motion & Interaction

Interactions should feel responsive and natural.

Use motion for:

- Page transitions
- Dialogs
- Drawers
- Dropdowns
- Hover states
- Loading indicators

Animation Duration

- Fast: 150ms
- Standard: 200ms
- Slow: 300ms

Avoid excessive or distracting animations.

---

# 67. Layout Principles

The HireMind AI layout system follows these principles:

- Maintain a consistent page structure.
- Prioritize content over decoration.
- Keep navigation predictable.
- Use whitespace to improve readability.
- Present data clearly and efficiently.
- Separate AI insights from user content.
- Ensure responsive behavior across devices.
- Minimize unnecessary clicks.
- Provide immediate visual feedback for interactions.
- Design for scalability as new modules are added.

These layout guidelines ensure every screen feels familiar, reducing cognitive load and allowing users to focus on hiring decisions rather than learning the interface.

---
# Design System

---

# 46. Layout Philosophy

The layout system should prioritize:

- Simplicity
- Predictability
- Consistency
- Content-first design
- Efficient workflows

Every page should follow the same structural pattern.

---

# 47. Application Shell

The authenticated application follows a standard shell.

```
+------------------------------------------------------+
| Header                                               |
+------------+-----------------------------------------+
| Sidebar    | Main Content                            |
|            |                                         |
|            |                                         |
|            |                                         |
+------------+-----------------------------------------+
```

The sidebar remains persistent on desktop and collapsible on smaller screens.

---

# 48. Sidebar Navigation

Sidebar contains the primary navigation.

Sections

- Dashboard
- Jobs
- Candidates
- Applications
- Interviews
- Assessments
- Analytics
- AI Copilot
- Team
- Settings

Guidelines

- Highlight active page
- Support collapsed mode
- Icons + Labels
- Group related modules
- Keep navigation depth shallow

---

# 49. Header

The global header includes:

- Organization Switcher
- Global Search
- AI Command Button
- Notifications
- User Profile Menu

The header remains fixed while scrolling.

---

# 50. Page Layout

Every page follows a consistent structure.

```
Page Header

↓

Toolbar (Search / Filters / Actions)

↓

Main Content

↓

Pagination (if required)
```

Avoid placing unrelated actions in the page header.

---

# 51. Page Header

Each page header includes:

- Page Title
- Description (optional)
- Breadcrumb (optional)
- Primary Action
- Secondary Actions

Example:

Candidates

"Manage and evaluate your candidate pipeline."

[Upload Resume] [Export]

---

# 52. Dashboard Layout

Dashboard uses a responsive widget grid.

Structure

```
KPI Cards

↓

Charts

↓

Recent Activity

↓

AI Insights

↓

Upcoming Tasks
```

Widgets should be rearrangeable in future versions.

---

# 53. Forms

Forms should follow a single-column layout by default.

Structure

Label

↓

Input

↓

Helper Text

↓

Validation Message

Group related fields into logical sections.

---

# 54. Multi-Step Forms

Use step-based forms for complex workflows.

Examples

- Create Job
- Organization Setup
- Candidate Import

Structure

Step Indicator

↓

Current Form

↓

Navigation Buttons

Users should be able to return to previous steps.

---

# 55. Lists

Lists are suitable for compact information.

Examples

- Notifications
- Recent Activity
- AI Suggestions
- Interview Timeline

Each list item should include:

- Title
- Supporting Text
- Timestamp (if applicable)
- Optional Action

---

# 56. Data Tables

Tables should support:

- Search
- Filters
- Sorting
- Pagination
- Bulk Selection
- Responsive Columns

Columns should be prioritized by importance.

Avoid horizontal scrolling whenever possible.

---

# 57. Kanban Boards

Kanban boards are used for hiring pipelines.

Structure

```
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
```

Cards should support:

- Drag & Drop
- Quick Actions
- Status Indicators

---

# 58. AI Panels

AI-generated insights appear in dedicated panels.

Structure

AI Icon

↓

Title

↓

Summary

↓

Supporting Evidence

↓

Recommended Actions

AI panels should always be visually distinct from user-generated content.

---

# 59. Search Experience

Global search should support:

- Instant Results
- Keyboard Navigation
- Recent Searches
- Highlighted Matches

Search Categories

- Candidates
- Jobs
- Applications
- Interviews
- Settings

---

# 60. Filters

Filters should appear in a consistent location above data.

Supported Types

- Dropdown
- Multi-select
- Date Range
- Status Chips
- Search

Provide a "Clear All" option when filters are active.

---

# 61. Detail Pages

Detail pages provide a 360° view of an entity.

Layout

Header

↓

Summary

↓

Tabbed Content

↓

Activity Timeline

↓

Context Actions

Examples

- Candidate Profile
- Job Details
- Interview Details

---

# 62. Empty States

Every screen should provide a meaningful empty state.

Include:

- Illustration
- Title
- Description
- Primary Action

Example:

"No candidates yet."

[Upload Resume]

---

# 63. Loading States

Use skeleton loaders instead of blank screens.

Provide skeletons for:

- Tables
- Cards
- Charts
- Detail Pages
- AI Panels

Maintain layout stability while loading.

---

# 64. Error States

Errors should be localized.

Each error includes:

- Clear Message
- Cause (if known)
- Retry Action
- Support Link (optional)

Never block the entire application because of one failed request.

---

# 65. Responsive Layout

Desktop

- Sidebar visible
- Multi-column layouts

Tablet

- Collapsible sidebar
- Two-column layouts

Mobile

- Drawer navigation
- Single-column layout
- Sticky action buttons

The same functionality should remain available across all devices.

---

# 66. Motion & Interaction

Interactions should feel responsive and natural.

Use motion for:

- Page transitions
- Dialogs
- Drawers
- Dropdowns
- Hover states
- Loading indicators

Animation Duration

- Fast: 150ms
- Standard: 200ms
- Slow: 300ms

Avoid excessive or distracting animations.

---

# 67. Layout Principles

The HireMind AI layout system follows these principles:

- Maintain a consistent page structure.
- Prioritize content over decoration.
- Keep navigation predictable.
- Use whitespace to improve readability.
- Present data clearly and efficiently.
- Separate AI insights from user content.
- Ensure responsive behavior across devices.
- Minimize unnecessary clicks.
- Provide immediate visual feedback for interactions.
- Design for scalability as new modules are added.

These layout guidelines ensure every screen feels familiar, reducing cognitive load and allowing users to focus on hiring decisions rather than learning the interface.

---