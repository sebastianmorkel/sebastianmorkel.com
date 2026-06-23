---
title: AI Budget Coach
summary: A full-stack personal budgeting web app that tracks your income and expenses and delivers AI-generated insights. 
date: 2026-06-18
disciplines: [ai, softwaredev, webdev]
status: live
links:
  github: https://github.com/sebastianmorkel/ai-budget-coach
demo:
  mode: recorded
  video: /demo/coach.mp4
  poster: /demo/coach.jpg
featured: true
---

Next.js,TypeScript, Supabase (PostgreSQL), Google Gemini API
github.com/sebastianmorkel/ai-buget-coach
  •  Built a full-stack budgeting app where users track income and expenses, visualise spending with interactive charts, and receive AI-generated financial insights.
  •  Integrated Google's Gemini API through a server-side route returning schema-constrained JSON, keeping the API key off the client and guaranteeing reliable, structured output.
  •  Modelled the database in PostgreSQL and enforced per-user data isolation with row-level security policies, so each user can only access their own data.
  •  Implemented email/password authentication, a saved-insight history, and savings-goal tracking; version-controlled with Git/GitHub.