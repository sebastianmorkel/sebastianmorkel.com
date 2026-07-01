---
title: AI Budget Coach
summary: A full-stack budgeting web app that turns income and expenses into interactive charts and AI-generated financial insights, with secure per-user data.
date: 2026-06-18
disciplines: [ai, softwaredev, webdev]
tech:
  - Next.js
  - TypeScript
  - Supabase (PostgreSQL)
  - Google Gemini API
status: live
links:
  github: https://github.com/sebastianmorkel/ai-budget-coach
demo:
  mode: recorded
  video: /demo/coach.mp4
  poster: /demo/coach.jpg
featured: true
---

A full-stack budgeting app that pairs spending tracking with AI-generated financial insights.

- Built a full-stack budgeting app in **Next.js** + **TypeScript** where users track income and expenses, visualise spending with interactive charts, and receive AI-generated financial insights.
- Integrated **Google's Gemini API** through a server-side route returning schema-constrained JSON. Importantly keeping the API key off the client and guaranteeing reliable, structured output.
- Modelled the database in **PostgreSQL** (with Supabase) and enforced per-user data isolation with **row-level security**, so each user only accesses their own data.
- Implemented email/password authentication, saved-insight history, and savings-goal tracking; version-controlled with Git/GitHub.

Source: [github.com/sebastianmorkel/ai-budget-coach](https://github.com/sebastianmorkel/ai-budget-coach)