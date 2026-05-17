# CLAUDE.md — 3we Website

## Project Overview

This is the marketing website for the 3we Robot Platform. Static HTML + Tailwind CSS, deployed on Cloudflare Pages.

**Tech Stack:** HTML, Tailwind CSS 3.x, Cloudflare Pages (wrangler)

## Repository Responsibility Split

This website repo and the main platform repo (`3we-robot-platform`) have clearly separated responsibilities. Do NOT duplicate content across them.

| Responsibility | Owner | Rationale |
|---|---|---|
| Brand homepage / marketing | **This repo** | Brand display belongs on official site |
| Leaderboard display frontend | **This repo** `/benchmarks` | Reads JSON from main repo, never hardcodes data |
| Playground embed | **This repo** `/playground` | iframe embed of HuggingFace Spaces, no duplicate logic |
| Blog | **This repo** `/blog` | Pure content publishing |
| Community page | **This repo** `/community` | Links back to main repo's CONTRIBUTING.md |
| Product / Hardware / Pricing pages | **This repo** | Marketing and comparison content |
| Technical docs (API, Getting Started, CLI) | **Main repo** `docs/` | Co-located with code, MkDocs auto-generated |
| Leaderboard data logic | **Main repo** `data/leaderboard.json` | Data engine, submission schema, JSON storage |
| Playground (interactive demo) | **Main repo** (HuggingFace Spaces) | Compute-intensive, Python environment |

**Key rules:**
- This site's `/docs` path is a 301 redirect to `docs.3we.org`. Never put tutorials or API docs here.
- The `/benchmarks` page fetches leaderboard data from `data/leaderboard.json` in the main repo at build time. Never hardcode benchmark results in HTML.
- Content changes to documentation go in the main repo's `docs/` directory, not here.

## Build & Deploy

### Website (this repo)

```bash
npm run build        # Fetch leaderboard JSON + compile Tailwind CSS
npm run deploy       # Build + deploy to Cloudflare Pages
npm run dev          # Local dev with CSS watch + wrangler dev server
```

- **Cloudflare Pages project:** `3we-website`
- **Production URL:** https://3we-website.pages.dev (custom domain pending)
- **Deploy trigger:** Manual via `npm run deploy`
- **Build output:** `public/` directory

### Documentation site (main repo)

```bash
cd /path/to/3we-robot-platform
python3 -m mkdocs build --strict              # Build docs site to site/
npx wrangler pages deploy site --project-name=3we-docs --branch=main  # Deploy
```

- **Cloudflare Pages project:** `3we-docs`
- **Production URL:** https://3we-docs.pages.dev → `docs.3we.org` (custom domain)
- **Deploy trigger:** Manual via wrangler after docs/ or SDK source changes
- **Build output:** `site/` directory (MkDocs generates from `docs/` markdown)

### Deployment checklist

When making changes that affect both repos, deploy in this order:
1. Push `3we-robot-platform` first (leaderboard JSON, docs content)
2. Deploy docs site: `python3 -m mkdocs build --strict && npx wrangler pages deploy site --project-name=3we-docs --branch=main`
3. Deploy website: `cd 3we-website && npm run deploy` (fetches latest leaderboard JSON from GitHub)

## File Structure

```
public/              → Static HTML pages (served directly)
  _headers           → Cloudflare security headers
  _redirects         → URL redirects (e.g., /docs → docs.3we.org)
  data/              → Build-time fetched data (leaderboard.json)
  css/               → Compiled Tailwind output
scripts/             → Build scripts (fetch-leaderboard.js)
src/                 → Tailwind source CSS
tailwind.config.js   → Design tokens and theme
wrangler.toml        → Cloudflare Pages config
WEBSITE-SPEC.md      → Design specification document
```

## Pages

| Path | Purpose |
|------|---------|
| `/` | Landing page (hero, features, quickstart) |
| `/product` | Platform architecture & feature deep-dive |
| `/hardware` | Hardware specs, SKUs, CAD links |
| `/benchmarks` | Leaderboard (dynamic from JSON) + evaluation protocol |
| `/playground` | HuggingFace Spaces embed + CLI quickstart |
| `/blog` | Blog listing |
| `/community` | Contributing guide, channels, citation |
| `/paper` | Research paper showcase |
| `/pricing` | SKU comparison |
| `/about` | Mission, team, licensing |
| `/docs` | 301 redirect to docs.3we.org |

## Design System

- **Fonts:** Outfit (display), DM Sans (body), JetBrains Mono (code)
- **Colors:** Primary `#815500` (brown/amber), Secondary `#ffce52` (gold)
- **Icons:** Google Material Symbols Outlined
- See `WEBSITE-SPEC.md` for full design tokens and component specs.
