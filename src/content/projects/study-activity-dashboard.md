---
title: Study Activity Dashboard
summary: A full-stack internal dashboard that reads student study activity from Postgres and presents per-student stats, a gap-free 14-day activity chart, and an LLM-generated "at a glance" summary.
date: 2026-07-01
disciplines: [softwaredev, webdev, ai]
tech:
  - FastAPI
  - PostgreSQL
  - Docker
  - React
  - TypeScript
  - TanStack Query
  - Google Gemini API
status: live
demo:
  mode: none
featured: true
---

A full-stack "Study Activity Dashboard" that lets a learning officer see how active a study group's students are — built end-to-end for a software-engineering take-home.

- Built a typed **FastAPI** backend over **PostgreSQL** using **asyncpg** with raw, parameterised SQL organised behind a repository layer, computing all aggregation (per-student stats, a gap-free 14-day activity timeline) in the database via `GROUP BY` / `AVG` / `COUNT` rather than in application code.
- Enforced the core business rule (quiz scores required and constrained to 0–100; null for every other activity type) in **two layers** — a Postgres `CHECK` constraint and a matching **Pydantic v2** validator — with correct 201 / 404 / 422 status codes.
- Containerised Postgres with **Docker Compose**, auto-running the schema and a deterministic seed on first boot so the whole stack comes up with a single command; secured the API with a shared `X-API-Key` header.
- Built the frontend in **React** + **TypeScript** + **Tailwind** (Vite), using **TanStack Query** for data fetching and cache invalidation, **Recharts** for the activity chart, and a sortable table with real submit UX (in-flight disabling, toasts, error recovery).
- Added an "At a glance" **LLM summary** endpoint that computes the numbers in SQL and has **Google's Gemini** only reword them, with a graceful templated fallback so the API degrades cleanly instead of failing when the model is unavailable.

Source: private take-home repo
