---
status: active
authority: current-state
owner: ai-maintained
purpose: Give a compact, evidence-based snapshot of current reality, blockers, and immediate priorities.
answers:
  - What is verified now
  - What is not yet true
  - What should happen next
does_not_answer:
  - Enduring policy, product scope, system behavior, or release standards
authoritative_inputs:
  - Verified repository and test evidence
  - Active documentation and founder decisions
update_triggers:
  - A material change to verified capability, milestone, blocker, priority, or pending founder decision
last_reviewed: 2026-08-09
last_verified: 2026-08-09
---

# Current State

## Current milestone

**Documentation baseline — Session 0 (installed 2026-08-09).** The seven-document contract now lives in this repository. The old PoC-era documentation is archived under `docs/archive/` and counts as sources, not policy. `VISION.md`, `PRODUCT.md`, `SYSTEM.md`, and `QUALITY.md` remain structured drafts for Sessions 1–4.

The repository also contains a working PoC implementation built under the previous documentation model. Its verified facts are recorded below so the drafting sessions start from ground truth instead of assumptions.

## Verified available

Evidence: commands run in this repository on 2026-08-09; full output in session run evidence.

- **Repository:** pnpm workspace `web-production-system`; `packageManager` `pnpm@9.15.9`; Node `>=22.12.0` (engines). Remote: `github.com/yasir-mukhtar/web-agency.git`.
- **Sites (4):** `sites/senyum-sehat` (dental clinic, Jakarta Selatan), `sites/baja-nusantara` (steel fabrication, Surabaya), `sites/kopi-tiga` (coffee roaster), `sites/masryef` (Islamic finance advisory, Kuala Lumpur; real-client prototype, Phase 9). Each is Astro 6.4 static output + Tailwind v4 themed via `packages/core/tokens.base.css` + site `tokens.css` + Pages CMS (`/.pages.yml`).
- **Shared core:** `packages/core` holds 8 shared components (SiteHeader, Hero, ServicesGrid, FAQ, Testimonials, WhatsAppCTA, SiteFooter, SiteHead) plus a content-schema spike.
- **Commands verified in this repository:**
  - `pnpm install --frozen-lockfile` — PASS (2.9s, no changes).
  - `pnpm build` (root script; runs `pnpm -r build`, all four sites) — PASS.
  - `pnpm --filter <site> dev|build|preview` — per-site Astro scripts; build PASS.
  - `pnpm exec wrangler deploy --dry-run` — PASS from `sites/senyum-sehat` (wrangler 4.120.0); run per site before deploy.
  - `actionlint .github/workflows/deploy.yml` — PASS.
  - `node scripts/drift.mjs` — RUNS, currently FAILS (see below).
- **CI:** `.github/workflows/deploy.yml` is present and actionlint-valid. The Astro `sites/masryef` was claimed live at `https://masryef.mail-yasirmukhtar.workers.dev` in the in-repo recraft plan (2026-08-09); not re-verified this session.

## Not yet verified or active

- `VISION.md`, `PRODUCT.md`, `SYSTEM.md`, `QUALITY.md` remain structured drafts and have no active authority yet.
- Live deployment status of each site (workers.dev URLs) was not re-checked this session.
- **Drift budget breach:** the rule is site-local drift `< 10%`. Measured today: senyum-sehat 28.8%, baja-nusantara 20.5%, masryef 24.8%, kopi-tiga 0.0% → `drift.mjs` exits FAIL. The archived `FINDINGS.md`/`FRICTION.md` carry the honest reading; `drift.mjs`'s failure message still points at those archived paths (cosmetic, code unchanged).
- The sanctioned React + shadcn/ui stack-shift experiment for masryef (plan: `.hermes/plans/2026-08-09_152156-masryef-shadcn-recraft.md`) has no implementation present in this workspace (`spikes/` does not exist). Status unverified.
- No golden pilot brief or second independent pilot exists.

## Active constraints

- Keep the active documentation set lean; do not create one document per quality layer.
- Repository files, not conversation memory, carry continuity.
- Draft one major authority per focused session, then conduct a fresh integration audit.
- Do not implement against unapproved draft product or system requirements.
- `docs/archive/` is sources, not policy (per `AGENTS.md` authority rules).

## Next three priorities

1. Session 1: distill, challenge, and activate `docs/VISION.md` — using `Web-Production-Engine-Product-Vision.md`, `project_sources/01-Web-Production-Engine.md`, and this file's verified facts.
2. Session 2: derive and activate `docs/PRODUCT.md` from the active vision.
3. Session 3: derive and activate `docs/SYSTEM.md` — must reconcile the documented engine with the existing PoC repo as evidence.

After these, Session 4 activates `QUALITY.md`; Session 5 runs a fresh cross-document integration audit and finalizes `AGENTS.md`, `STATE.md`, and consequential decisions.

## Pending founder decisions

- Approve or revise the distilled product vision in Session 1.
- Approve version-one customer, supported-project envelope, and acceptance scenario in Session 2.
- Confirm or revise stack and operating choices in Session 3 — including whether the existing PoC repo is the version-one engine foundation or a disposable prototype, and which masryef stack (Astro PoC vs. the shadcn experiment) represents the direction.
- Decide how to handle the drift budget breach (3 of 4 sites above 10%): re-baseline the budget, or reduce site-local code.

## Last trusted result

Session 0 documentation installed and old docs archived; all new files byte-identical to their source. Full workspace build PASS for all four sites; drift check FAIL with the numbers above.

## Exact next action

Start a fresh Session 1. Read `AGENTS.md`, this file, the full existing product vision, the original concept, and active documentation decisions. Draft only `VISION.md`, challenge it for ambiguity and implementation leakage, compress it, then request founder review before activation.
