# sebastianmorkel.com

My personal portfolio and skills hub. A fast and static site that gathers my work across my
different disciplines (currently software/web dev and AI/ML, adding quant dev in the future)
into one place. It comes with per-discipline views, a filterable skills section, and live 
project demos.

**Live link:** https://sebastianmorkel-com.pages.dev
_(custom domain sebastianmorkel.com coming soon!)_

## What it is

Every project is authored once as a tagged Markdown file. The discipline pages (`/softwaredev`,
`/webdev`, `/ai`) are filtered _views_ over that single source, so a project spanning several
disciplines appears on each with no duplications. Skills also follow the same pattern one 
tagged list for the `/skills` page (filterable by discipline) and as per-page slices.

The design system ships two themes from one set of components: a signature **terminal** look
(amber-on-black, monospace) for the home and dev/AI showcases, and a toned-down **editorial**
look for the CV surfaces (and future quant dev) switched via a single `data-theme` attribute, 
with a per-page accent.

## Tech stack

- **[Astro](https://astro.build)** — static site generation
- **TypeScript** (strict)
- **Content Collections** — type-safe, tagged project & skill data
- **CSS custom properties** — design tokens + two switchable themes
- **Vitest** — schema-guard & filter tests
- **Cloudflare Pages** — hosting + CI (push to deploy from git)
- **pnpm** — package manager

## Local development

```bash
pnpm install
pnpm dev        # dev server → http://localhost:4321
pnpm build      # production build → dist/
pnpm preview    # serve the production build locally
pnpm test       # run the test suite
```

> Requires Node ≥ 22.12 and pnpm.

## Project structure

```
src/
  pages/         # routes: home, /softwaredev /webdev /ai, /skills, /projects/[slug]
  layouts/       # BaseLayout - theme + accent plumbing
  components/    # token-driven UI (cards, tags, demo, skills, …)
  content/       # projects/*.md + content.config.ts (Zod schemas)
  data/          # skills.yaml
  lib/           # discipline/status filter helpers
  styles/        # global.css - design tokens + terminal/editorial palettes
public/          # static assets (demo media, …)
```

## Adding content

- **A project:** drop a Markdown file in `src/content/projects/` with `disciplines`, a `status`
  (`live` / `in-development` / `planned`), and an optional `demo` block. It appears automatically
  on every discipline (page) that is tagged.
- **A skill:** add an entry to `src/data/skills.yaml` with its `category` and `disciplines`.

## Status

In active development. Discipline pages, skills, and project demos are live with per-discipline CVs
and the custom-domain cutover being in progress.