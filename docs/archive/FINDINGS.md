# FINDINGS

## Read this first

The code in this repo is **EVIDENCE, NOT INVENTORY**. Site 1 (the first paying client) is built by copying components out of this repo and editing them freely. The shared core is re-extracted only after site 3, per the vision's Phase 0. Nothing here is versioned. Nothing here is a commitment.

## The numbers

Measured against every success criterion in PoC-Plan.md §8, on 8 Aug 2026.

| # | Criterion | Measured | Result |
|---|---|---|---|
| 1 | Both sites render from one shared core | 100% of sections from `packages/core` on all three sites; site-local only for the two signature moments | **PASS** |
| 2 | Site-local code < 10% | senyum-sehat **28.8%** (74/257 lines), baja-nusantara **20.5%** (48/234), kopi-tiga **0.0%** (0/156) | **FAIL** (see §9-C) |
| 3 | Contract-change fan-out, commit → all sites live < 1 hour | **1 min 26 s** (commit 17:02:51 → all three live 17:04:17); canary-only step separately demonstrated (54 s, others skipped) | **PASS** |
| 4 | Scaffold + deploy site 3 < 2 hours | **6 min wall-clock** including the businessType finding (1 min); **5 min** pure scaffold after the fix | **PASS** |
| 5 | Editor completes all three tasks, ≤ 2 questions | **NOT RUN** — the editor test was skipped by the founder's decision. When run, this measures *first-run learnability, n=1*, not tickets per site-year | **NOT RUN** |
| 6 | Lighthouse mobile performance ≥ 90 | senyum-sehat **100**, baja-nusantara **99**, kopi-tiga **90** (a11y 93/100/93, best-practices 93/93/96, SEO 100/100/100) | **PASS** |
| 7 | Re-theming purely through `tokens.css` | Zero literal colours/arbitrary values in `packages/core` (both greps clean, all phases) | **PASS** |
| 8 | 🧑 Stranger test | n=2 side-by-side at 390px: three independent vision reads call them "warm calming clinic" vs "dark rugged fabricator" vs "craft roaster"; no shared-agency read. **Human checkpoint deferred by the founder** (n=2 is necessary, not sufficient — §10) | **PASS (n=2, human check pending)** |

**Also measured:** client JS shipped = **0 bytes on all three sites** (FAQ = `<details>`, mobile nav none, scroll reveal = CSS `animation-timeline: view()` with static fallback). CI drift job intentionally red (criterion 2).

## Friction log

Grouped by the contract each entry stressed. Full detail in `docs/FRICTION.md` (append-only).

### Content Contract
- **image() cannot resolve `/media/...`** — content images must use root-absolute `/public/media/...`; Pages CMS media output must match or every upload breaks the build. (P2)
- **E2.4's grep collides with the phase's own `order` field** — per-item display order is not page composition; the page-builder boundary itself held everywhere. (P2)
- **`packages/core` needs astro as a devDependency** for `astro/zod` + `astro/content/config` types. (P2)
- **First field change: `geo`** — Phase 4 mandated geo in JSON-LD; Phase 2's list lacked it. Cheap (one optional block); arguably a P2 omission, not drift. (P4)
- **`businessType` + `baseUrl` are code props, not content** — business facts passed in code; businessType's union grew at site 3 (`CafeOrCoffeeShop`). (P4, P8)
- **about.md is authored but unrouted** — no phase builds /about; nav is Home + WhatsApp only. (P4)
- **Site-local content is not CMS-editable** — team/proyek collections can't be edited by the client via Pages CMS. Real consequence of the quarantine rule. (P6)
- **`durasi_estimasi` migration** — one required field across three sites: schema + 18 markdown files + 2 CMS projects + 1 component + 3 pages, done in minutes; the field shape (string) fit clinic minutes, contractor weeks, and roaster days equally. (P8)

### Token Contract
- **Tailwind v4 does not scan workspace packages** — `@source` is mandatory; failure is silent. (P0)
- **Unused theme variables are tree-shaken** from output CSS — don't read absence as a bug. (P0)
- **`initial` placeholder values work** — the base file genuinely cannot paint; missing site overrides fail loudly. (P0)
- **Duration namespace is `--transition-duration-*`**, not `--duration-*` — silent fallback to 150 ms. (P3)
- **Font-weight cannot be a custom token** — `--font-weight-*` collides with `--font-*` utilities. Weight differentiation rides on the faces themselves. (P5)
- **Tracking axis added** (`--tracking-display`) as a shared name with per-site values. (P5)
- **Duotone approximated with a CSS filter chain** in `--image-grade`; a real duotone is an asset-production decision. (P5)

### Component Contract
- **Astro 6 API drift ×2** — `glob()` lives in `astro/loaders`; legacy `type:` + `loader` is rejected. (P1/P2)
- **`<Picture>` takes `src`, not `image`** — misleading "Received undefined" error. (P3)
- **Drift over budget** — the 10% figure can't hold on one-page sites (see §9-C). (P6)

### Operations Contract
- **pnpm not installed; `/usr/local/bin` not writable** — installed to `~/.local/bin`. (P0)
- **GitHub Actions context rules** — `matrix` banned in job-level `if`, `secrets` banned in all `if`; caught by actionlint, fixed with coarse/fine gates + env bridge. (P1)
- **`pnpm/action-setup` + `packageManager` double-pin** → ERR_PNPM_BAD_PM_VERSION. (P1)
- **Deploy guard on secret presence** — CI stays green pre-infra, activates automatically. (P1)
- **wrangler must be a project dependency** — the action's `npm i` fallback breaks on pnpm `workspace:`. (P8)
- **`not_found_handling` accepts `404-page`**, not `"404"`. (P8)
- **Repo topology forced a content split** — Pages CMS is repo-scoped; the clinic got its own repo (see §9-A). (P7)

## Rebuild log

**Nothing was rebuilt.** Stated explicitly: the wa.me href logic was *extracted* into `packages/core/lib/whatsapp.ts` (shared helper, not a second version); card styling reuses the same token recipe everywhere. The Rule-of-Three inventory starts empty — which is itself evidence that the shared components held shape across three sites.

## Field-change log

Shared schema field count at site A (Phase 2): **45 fields**. Changes since:
- **+2** `site.geo {lat, lng}` (Phase 4, mandated by JSON-LD)
- **+1** `services.durasi_estimasi` (Phase 8, the fan-out test)
- businessType union grew by one value (a component prop, not a schema field)

**Churn ≈ 3/45 ≈ 6.7% added, 0 changed, 0 removed** across three sites. The vision's Phase 0 exit is < 20% churn across *three real clients* — this is an early read against three **fictional** ones, and must be labelled as such. The `services[]` primitive itself never changed shape: clinics, contractors, and roasters all fit `{title, summary, body, image, order}` + extras.

## Editor questions, verbatim

None. The editor test was not run (founder's decision, 8 Aug 2026). The TEST-SCRIPT.md and the single-tenant scratch repo (`yasir-mukhtar/senyum-sehat-cms-test`) are ready; the measurement is repeatable at any time. Until it runs, criterion 5 is a blank, and §11.4's support-load risk remains unmeasured.

## Answers to the open questions

**A. Monorepo vs per-client repo — what did Phase 7 actually cost?**
The two-tenant monorepo made Pages CMS unusable for a real editor (sidebar shows ~12 flat entries across two businesses; the clinic's editor could edit the contractor's content — a confidentiality blocker). The split into a per-site repo cost: one script (content + media copied, image paths rewritten, `.pages.yml` derived from the monorepo's clinic group), one extra repo to keep in sync, and a permanent fork of the clinic's content from its code. That is cheap for two clients and untenable for forty. The evidence points at: per-site content repos are viable ONLY with an automated sync, or self-hosted Pages CMS with path-scoped permissions (plan §9-A option 3) removes the split entirely. Decision deferred to site 3's real client, as planned — but the PoC proved the split is a *process* cost, not a technical one.

**B. Does section composition need to be data-driven?**
At three sites, composition in `index.astro` was the cheapest part of the system: reordering baja's sections (testimonials before services) was a two-line move; site 3's page was copy-paste with one line deleted. Nothing was tedious enough to justify a `sections[]` array — and the page-builder boundary never even got tempted in practice, because the friction never appeared. **Do not build the array.** (Logged as friction, per the plan.)

**C. How much of the 10% signature-moment budget does a real site consume?**
The two signature moments cost 74 and 48 lines — and on one-page PoC sites that is **28.8% and 20.5%** of all source. kopi-tiga chose no signature moment: **0%**. The budget is denominator-sensitive: a real client site (8+ pages, layout, more shared sections) would dilute the same absolute lines well under 10%. The metric needs a definition decision (what counts as the denominator) before it can gate real clients — and a real site's moment will likely cost 60–120 lines, so the *absolute* budget matters more than the percentage.

**D. Where does the content spike genuinely break?**
It didn't — and that is the most interesting result. `services[]` held for a dentist, a steel contractor, and a coffee roaster; the clinic's `team[]` and the contractor's `projects[]` were correctly refused by the Rule of Three and lived in site-local. The genuine friction is not the schema — it is that **two of the three most important per-site axes live outside content**: business type (JSON-LD specialisation) and imagery treatment (grade/overlay) are code props and tokens, not fields. A real business type is content; a real duotone is an asset decision. The spike schema generalised; the *packaging* of business facts did not fully.

## What I would tell the person building site 1

1. Copy `sites/kopi-tiga` — it is the cleanest slice: all eight shared components, zero site-local, builds in one shot.
2. The token files are the entire art direction. Spend a day there, not in the components — a site's identity is `tokens.css` plus its imagery, and the components genuinely do the rest.
3. Do not touch `packages/core` for site 1 beyond copying; the first re-extraction happens after site 3's *real* client, not before.
4. The deploy pipeline is proven and boring: push to main, path-filtered matrix deploys only what changed, `canary` input for staged rollouts. Copy the workflow and the two wrangler gotchas (`wrangler` as a devDependency, `404-page`) with you.
5. Recruit the non-technical editor before you need them, run the three-task test on a single-tenant repo, and log every question verbatim — that is the only number in this PoC that predicts your support load, and it is still unmeasured.
