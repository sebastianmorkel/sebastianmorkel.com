---
title: Personal Portfolio
summary: A statically-generated portfolio and skills hub built with Astro. One tagged content source that populates filtered discipline pages, a skills explorer, and auto-generated PDF CVs.
date: 2026-06-22
disciplines: [webdev,softwaredev]
tech:
  - Astro
  - TypeScript
  - Cloudflare Pages
  - Playwright
status: live
demo:
  mode: link
  url: https://sebastianmorkel.com
featured: true
---

This site itself — a fast, content-driven portfolio I designed and built from scratch.

- Built as a statically-generated site in **Astro** + **TypeScript (strict)**, deployed with **Cloudflare Pages** with push-to-deploy CI.
- Authored every project and skill as a single **tagged content collection** (Zod-validated), so each entry is only written once and automatically surfaces on each discipline it's tagged with (and no duplications).
- Designed a **token-based design system** with two switchable themes. A terminal / amber-CRT aesthetic and a clean editorial theme. All from one shared component set.
- Generated downloadable **per-discipline PDF CVs at build time** by rendering the live CV pages with headless Chromium/Playwright in CI.
- Configured the custom domain, DNS, and automatic HTTPS on Cloudflare.

Source: [github.com/sebastianmorkel/sebastianmorkel.com](https://github.com/sebastianmorkel/sebastianmorkel.com)