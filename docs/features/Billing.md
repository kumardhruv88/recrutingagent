# Billing & Subscription

## 1. Purpose

The Billing & Subscription module provides organizations with a centralized workspace to understand their plan, usage, AI consumption, invoices, and subscription options.

This phase implements FRONTEND UI ONLY.

No payment provider integration.
No backend.
No APIs.
No real checkout.

---

## 2. Goal

Build a premium SaaS billing experience inspired by:

- Vercel
- Linear
- Stripe Dashboard
- Clerk
- Supabase

The interface must be visually polished, trustworthy, simple, and easy to understand.

Avoid creating a generic pricing-template UI.

---

## 3. Main Route

/billing

The module should use the existing authenticated application shell.

---

## 4. Billing Navigation

Tabs:

Overview

Plans

Usage

AI Credits

Invoices

Payment Methods

---

# 5. Overview

Create a premium billing overview.

## Current Plan Card

Display:

Plan Name

Plan Badge

Monthly Price

Billing Cycle

Renewal Date

Organization Members

Plan Status

Actions:

Manage Plan

Upgrade

Cancel Subscription

UI only.

---

## Usage Summary

Display usage metrics:

Team Members

Active Jobs

Candidates Processed

Resume Analyses

Voice Interviews

GitHub Analyses

Storage

AI Credits

Use elegant progress indicators.

Clearly show:

Current Usage

Plan Limit

Percentage Used

---

## Billing Summary

Current Monthly Cost

Next Invoice Date

Billing Cycle

Estimated Next Invoice

Payment Method

---

# 6. Plans

Create a premium plan comparison experience.

Plans:

Free

Starter

Growth

Enterprise

Each plan includes:

Price

Description

Feature List

Usage Limits

AI Credits

Team Members

Storage

CTA

Highlight the recommended plan.

Include:

Monthly / Annual toggle.

Annual savings indicator.

---

# 7. Plan Comparison

Create a detailed feature comparison table.

Categories:

Recruitment

AI Features

Resume Intelligence

Voice Interviews

GitHub Analysis

Analytics

Team Management

Integrations

Security

Support

Use:

Checkmarks

Limits

Tooltips

Sticky plan headers on desktop.

---

# 8. Usage Dashboard

Create analytics for resource consumption.

Metrics:

Resume Analyses

AI Tokens / Credits

Voice Interview Minutes

GitHub Analyses

Candidate Records

Storage

API Usage Placeholder

Display:

Usage Cards

Trend Charts

Progress Indicators

Monthly Breakdown

Use Recharts where appropriate.

---

# 9. AI Credits

Dedicated AI usage experience.

Display:

Credits Remaining

Credits Used

Monthly Allocation

Reset Date

Usage Breakdown

Breakdown:

Resume Intelligence

ATS Analysis

Resume Optimization

Job Matching

Voice Interviews

GitHub Analysis

AI Copilot

Include visual usage distribution.

Do NOT implement purchasing credits.

UI placeholder only.

---

# 10. Invoices

Create invoice history table.

Columns:

Invoice ID

Date

Plan

Amount

Status

Payment Method

Actions

Statuses:

Paid

Pending

Failed

Refunded

Actions:

View

Download

UI only.

---

# 11. Invoice Detail

Create a polished invoice detail dialog/drawer.

Display:

Organization

Invoice Number

Billing Period

Plan

Line Items

Taxes Placeholder

Total

Payment Status

Payment Method

Download Invoice

UI only.

---

# 12. Payment Methods

Display saved payment method UI.

Card information must be fictional and masked.

Example:

•••• 4242

Never use real financial information.

Actions:

Add Payment Method

Set Default

Remove

UI only.

---

# 13. Upgrade Experience

Create UpgradePlanDialog.

Flow:

Select Plan

↓

Choose Billing Cycle

↓

Review Changes

↓

Payment Placeholder

↓

Confirmation

No payment processing.

---

# 14. Cancellation Experience

Create cancellation confirmation UI.

Include:

Current Plan

Features Lost

Effective Date

Feedback Selector

Keep Subscription

Confirm Cancellation

UI only.

Use clear non-manipulative UX.

---

# 15. Components

Create reusable components such as:

BillingOverview

CurrentPlanCard

BillingSummary

UsageMetricCard

UsageProgress

PlanCard

PricingToggle

PlanComparisonTable

UsageDashboard

AICreditCard

AIUsageBreakdown

InvoiceTable

InvoiceDetail

PaymentMethodCard

UpgradePlanDialog

CancelPlanDialog

BillingStatusBadge

Reuse existing shared components whenever possible.

---

# 16. Local Data

Create:

data/billing.ts

Include realistic fictional data for:

Plans

Subscription

Usage

AI Credits

Invoices

Payment Methods

Feature Comparison

Monthly Usage

Do not use real financial information.

---

# 17. Design Direction

This module must look like a premium commercial SaaS billing dashboard.

Prioritize:

Excellent visual hierarchy

Whitespace

Typography

Clean pricing cards

Elegant progress indicators

Readable comparison tables

Subtle gradients

Professional icons

Clear usage visualization

Trustworthy financial UI

Avoid:

Excessive glassmorphism

Excessive gradients

Oversized cards

Clutter

Generic template appearance

Unnecessary animation

---

# 18. Motion

Use Framer Motion sparingly.

Suitable motion:

Plan card hover

Tab transitions

Dialog transitions

Usage progress animation

Chart entrance

Billing cycle toggle

Motion must support comprehension rather than decoration.

---

# 19. Responsive Design

Desktop:

Rich multi-column billing dashboard.

Tablet:

Adaptive 2-column layouts.

Mobile:

Single-column.

Plan cards stack vertically.

Comparison tables become horizontally scrollable or mobile-friendly comparison cards.

Invoices remain readable.

---

# 20. Dark Mode

Fully supported.

Financial and usage information must remain highly readable in both themes.

---

# 21. Accessibility

WCAG AA.

Keyboard navigation.

Visible focus states.

Semantic tables.

Accessible dialogs.

ARIA labels where necessary.

Do not communicate usage/status through color alone.

---

# 22. States

Loading:

Billing skeleton

Usage skeleton

Invoice skeleton

Plan skeleton

Empty:

No invoices

No payment method

No usage history

Error:

Billing unavailable

Usage unavailable

Invoice unavailable

Retry actions where appropriate.

---

# 23. Acceptance Criteria

Premium production-quality UI.

Consistent with existing HireMind AI frontend.

Fully responsive.

Dark mode.

Accessible.

Reusable architecture.

Realistic local static data.

No backend.

No payment APIs.

No Stripe integration.

No real checkout.

Zero TypeScript errors.

Zero ESLint errors.

Production build passes.

---

# 24. Out of Scope

Real subscriptions

Stripe integration

Payment processing

Refund processing

Tax calculations

Real invoices

Backend billing APIs

Database integration

Real AI credit enforcement