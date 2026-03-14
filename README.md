# ShakeBack — From Layoff to Offer

> An AI-powered career assistant that transforms the stressful job search into a structured, AI-guided strategy.

---

## Overview

ShakeBack helps professionals recover from layoffs and navigate career transitions with confidence. Most job tools focus only on resumes or listings — ShakeBack goes further, combining career planning, application optimization, and interview coaching into one centralized platform.

---

## Problem

Millions of professionals experience layoffs or career transitions each year. The job search process is stressful, inefficient, and hard to track — especially without guidance on career strategy, skill gaps, application optimization, and interview preparation.

---

## Features

### Resume Analysis
Upload your resume and receive an AI-generated breakdown including a skills summary, career overview, strengths, and actionable improvement suggestions.

### Career Strategy Generator
Get a personalized 30-day job search plan based on your skills, experience, and goals.

| Week | Focus |
|------|-------|
| Week 1 | Resume improvements + networking outreach |
| Week 2 | Apply to 10 roles + interview preparation |
| Week 3 | Portfolio improvement + skill development |
| Week 4 | Follow-ups + interview practice |

### Job Match Analyzer
Paste any job description and instantly receive a match score, missing keywords, tailored resume bullet suggestions, and a customized cover letter.

### AI Interview Coach
Practice for your next interview with AI-generated behavioral and technical questions based on the specific job description you're targeting.

### Job Application Tracker
A dashboard to track every application — company, role, status, notes, and interview dates — all in one place.

### Career Health Score
An AI-calculated score based on resume quality, application success, skill alignment, and interview readiness, with recommendations to improve it over time.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Next.js, TailwindCSS |
| Backend | FastAPI |
| Database | PostgreSQL |
| AI | DigitalOcean Gradient AI |

---

## User Flow

```
Upload Resume
     ↓
AI Analyzes Career Profile
     ↓
Receive Career Strategy Plan
     ↓
Paste Job Description
     ↓
AI Generates Match Score, Resume Suggestions & Cover Letter
     ↓
Track Application in Dashboard
     ↓
AI Generates Interview Questions
```

---

## Build Plan

The MVP is structured as a 4-day sprint across two roles:

- **Product/UI Engineer** — React frontend, dashboard, user flows, UI components, backend integration
- **AI/Backend Engineer** — FastAPI server, prompt engineering, Gradient AI integration, endpoints, database

| Day | Goal | Deliverable |
|-----|------|-------------|
| Day 1 | Project setup + Resume AI | Landing page with Resume Analyzer |
| Day 2 | Career Strategy AI | Dashboard with Resume Analyzer + Career Plan |
| Day 3 | Job Match + Interview Coach | Three feature pages + dashboard |
| Day 4 | Application Tracker + Polish | Complete, demo-ready MVP |

---

## Demo Scenario

Meet **Alex**, a product analyst recently laid off who needs to navigate a job search.

1. **Resume Upload** — Alex uploads their resume. ShakeBack returns a skills summary, strengths, and improvement suggestions.
2. **Career Strategy** — Alex generates a 30-day job search plan tailored to their background.
3. **Job Match Analyzer** — Alex pastes a job description and receives a 78% match score, missing keywords, and a cover letter.
4. **Interview Coach** — Alex practices with AI-generated questions like *"Tell me about a product decision you influenced."*
5. **Application Tracker** — Alex tracks 5 applications, 1 interview, and 2 responses from the dashboard.

---

## Target Users

**Primary**
- Recently laid-off professionals
- Professionals in career transition
- Job seekers overwhelmed by the process

**Secondary**
- Early-career professionals
- Active job seekers looking to optimize their search

---

## Getting Started

*Setup instructions coming soon as the project is scaffolded during the build sprint.*

---

## License

MIT
