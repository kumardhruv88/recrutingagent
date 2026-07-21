# Voice Interview

---

# Purpose

Voice Interview is HireMind AI's AI-powered interview workspace.

It enables recruiters to configure, launch, monitor, and review AI-led interviews.

This module should feel like a modern meeting platform combined with an AI assistant.

Frontend only.

No backend.

No authentication.

No APIs.

Use realistic static data.

---

# Goal

Build a premium interview experience.

The interface should feel comparable to products like:

- Zoom
- Google Meet
- Riverside
- ElevenLabs
- ChatGPT Voice
- Granola AI

Minimal.

Elegant.

AI-first.

---

# Navigation

Sidebar

↓

Voice Interview

↓

Interview Sessions

↓

Interview Details

---

# Screens

## 1. Interview Dashboard

Display

Upcoming Interviews

Active Interviews

Completed Interviews

Interview Templates

AI Statistics

Quick Actions

---

## 2. Interview Sessions

Card View

Table View

Search

Filters

Pagination

Each session contains

Candidate

Role

Scheduled Time

Duration

Status

AI Rating

---

## 3. Live Interview

Center

Animated Voice Orb

Waveform Visualization

Current Transcript

Timer

Recording Indicator

---

Right Sidebar

Candidate Information

Resume Score

AI Notes

Emotion Timeline Placeholder

Question Progress

---

Bottom Controls

Mute

Pause

Resume

End Interview

Settings

---

## 4. Interview Review

Video Placeholder

Transcript

AI Summary

Strengths

Weaknesses

Communication Score

Technical Score

Confidence Score

Hiring Recommendation

---

## 5. Interview Templates

Cards

Frontend Developer

Backend Developer

ML Engineer

AI Engineer

Custom Template

---

# Components

InterviewCard

InterviewStats

InterviewTimeline

VoiceOrb

Waveform

TranscriptPanel

CandidateInfoCard

QuestionProgress

ScoreCard

RecommendationCard

InterviewTemplateCard

ReviewPanel

ControlBar

SessionTable

---

# Folder Structure

```
features/

voice-interview/

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
data/voice-interview.ts
```

Include

Interview sessions

Templates

Transcripts

AI summaries

Scores

Candidate info

---

# Design

Premium AI experience.

Dark-first design.

Large whitespace.

Soft shadows.

Subtle glassmorphism.

Rounded containers.

Animated gradients.

Professional typography.

---

# Animations

Framer Motion

Voice orb pulse

Wave animation

Transcript streaming animation

Card hover

Fade

Slide

Counters

Loading shimmer

---

# Responsive

Desktop

Split layout

Tablet

Stacked panels

Mobile

Drawer-based side panels

Sticky controls

---

# Dark Mode

Required

---

# Accessibility

Keyboard shortcuts

Focus indicators

ARIA labels

High contrast

Screen reader support

---

# Empty States

No interviews

No transcript

No templates

No recordings

---

# Loading States

Voice initialization

Transcript loading

Score generation

Timeline loading

---

# Error States

Microphone unavailable

Recording failed

Transcript unavailable

Retry actions

---

# Acceptance Criteria

Premium UI

Responsive

Dark mode

Accessible

Reusable components

Static local data

No backend

No APIs

No authentication

Zero TypeScript errors

Zero ESLint errors

Production build passes

---

# Out of Scope

Real microphone

WebRTC

Speech-to-text

LLMs

Recording

Streaming

Backend integration