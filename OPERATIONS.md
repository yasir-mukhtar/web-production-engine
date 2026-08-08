# OPERATIONS.md — written procedure for everything deliberately not built

From PoC-Plan §2 non-goals and §11 corrections. Nothing here is automated; all of it is procedure a human follows. This file is the difference between "the PoC proved the shape" and "the system works."

## Onboarding a new client site (from the Phase 8 result)

1. Copy `sites/kopi-tiga` → `sites/<slug>` (cleanest slice: 8 shared components, no site-local).
2. Write `src/styles/tokens.css` — the entire art direction lives here + the imagery.
3. Paste content into `content/` (site.yml first: name, address, geo, hours, phone, WhatsApp number, SEO).
4. Add the site to the deploy matrix (`sites/*` in `.github/workflows/deploy.yml` + path filter) and `scripts/drift.mjs`.
5. Add a `.pages.yml` group (copy an existing site's, rename paths) — **but see the topology note below**.
6. Deploy. Measured: 5 minutes of scaffold work; the rest is content and taste.

## Topology note (from FINDINGS §9-A)

Pages CMS grants access **per repository**. A multi-client monorepo means every editor sees every client's content. Until this is resolved (per-client content repos with automated sync, or self-hosted Pages CMS with path-scoped permissions), each client's CMS project must live in its own repo — run the split script and keep the sync honest.

## Client onboarding — the non-negotiable steps

- **Verify the WhatsApp number on a real phone.** `wa.me` links to a number without WhatsApp show "Phone number shared via url is invalid" — it fails *unhelpfully*, and the client will assume the website is broken. Do this at onboarding, not after launch. (PoC-Plan §11)
- **Set `baseUrl`** on each site's `SiteHead` usage (the `baseUrl` prop) once the real domain exists — canonical, OG url, and JSON-LD url/logo are gated on it and silently omitted without it.
- **Recruit the non-technical editor** before you need them, and run the three-task test from `TEST-SCRIPT.md` in the single-tenant scratch repo. Log every question verbatim — that number predicts support load.

## Media guidance (for editors, via .pages.yml descriptions)

- Uploads go through Pages CMS media sources: `sites/<site>/public/media`, output `/public/media` (image() requires root-absolute paths — see FRICTION [P2]).
- Ask editors to resize before uploading (descriptions carry the size hints); a 4 MB phone JPEG is the realistic input and the most likely support ticket.

## Deliberately not built (and why)

| Thing | Status | If it's ever needed |
|---|---|---|
| Contact form endpoint | Cut — the decision moment ends in WhatsApp | Add a `mailto:`/form → but the vision says WhatsApp first |
| WhatsApp click-attribution Worker | Cut — one custom service in front of 100% of conversion traffic at zero clients. If ever built: `wa.me` stays the real `href`; attribution is fire-and-forget alongside it. Never a mandatory redirect hop on a 3G phone | Revisit at site ~5 with real data |
| Uptime monitoring | Procedure only | Cloudflare analytics + a free heartbeat (UptimeRobot) per site |
| Backups | Procedure only | The repo IS the backup; enforce branch protection on main |
| Offboarding | Procedure only | Remove Pages CMS collaborator, delete worker, transfer domain |
| `.co.id` / real domains + DNS | Deferred — `*.workers.dev` only | Move each client's zone into Cloudflare (also removes the Web Analytics 10-site soft cap) |
| Real duotone per-image treatment | CSS filter approximation in `--image-grade` | Asset-production pipeline (batch grade) as a paid service |
| About page | Content authored, page unrouted | Copy the index page, add `<About …>` — when a client asks |

## CI notes (from FRICTION)

- `actionlint` before workflow edits (context rules: `matrix` not in job-level `if`, `secrets` not in any `if`).
- `wrangler` is a site devDependency; `assets.not_found_handling` is `404-page`. Validate with `pnpm exec wrangler deploy --dry-run`.
- The drift job fails when any site exceeds 10% — renegotiate the budget or grow the site; do not shrink components to pass it.
- Canary rollouts: `gh workflow run Deploy -f canary=<site>`.

## When a phase fails

`docs/When-Fail.md`: diagnose in two sentences, state the smallest fix, apply only that, re-run only the failed eval. Never refactor mid-failure.
