# AI-HANDOFF — full report for the next agent

**Status: PoC COMPLETE.** All 8 phases delivered (Phases 0–6, 8 fully; Phase 7 setup complete, the human-run editor test was deferred by the founder's decision). Three sites are LIVE. The repo's actual output is `FINDINGS.md` + `OPERATIONS.md`.

Read order for a fresh agent, in this priority:
1. `docs/CONTRACTS.md` — the four contracts (source of truth for every rule)
2. `AGENTS.md` — the working translation of the contracts into build rules
3. `FINDINGS.md` — the measured numbers and conclusions (the real deliverable)
4. `docs/FRICTION.md` — every problem encountered, append-only
5. `docs/Phase 0.md` … `docs/Phase 8.md` — per-phase prompts and evals
6. `OPERATIONS.md` — procedures for everything deliberately not built
7. This file — the operational handoff

---

## 1. What this is

A proof-of-concept for a web production system: an agency that sells static marketing websites to Indonesian SMBs (dental clinic, steel fabricator, coffee roaster — deliberately unrelated). One pnpm workspace: a shared core (`packages/core`) holds all components, token NAMES, and the content schema; each client site (`sites/*`) holds only token VALUES, content, fonts, and imagery. Per-site differences are limited to tokens + content + composition — never by forking a core component. The whole system is judged by the numbers in FINDINGS.md: marginal cost of site N+1 and contract-change fan-out.

## 2. Environment (locked, non-negotiable)

- **Node ≥ 22.12** — machine has Node v24.13.0
- **pnpm 9.15.9** at `~/.local/bin/pnpm` — **`export PATH="$HOME/.local/bin:$PATH"` in every shell call** (global npm/corepack routes fail on `/usr/local/bin` permissions)
- **Astro 6.4.8** (`^6.4.8` — caret keeps it off Astro 7, which is FORBIDDEN despite being npm `latest`)
- **Tailwind CSS 4.3.3 + @tailwindcss/vite 4.3.3**, sharp ^0.34.5, @fontsource-variable fonts ^5.2.5, wrangler ^4.120.0 (site devDependency)
- `actionlint` installed (`brew`) — MUST run before pushing workflow edits
- gh CLI: accounts `yasir-mukhtar` (active) + `ux-inadigital` (inactive) — verify with `gh auth status`; switch with `gh auth switch --user yasir-mukhtar` before repo ops
- Cloudflare account: mail.yasirmukhtar@gmail.com; workers.dev subdomain `mail-yasirmukhtar`; **Workers Paid ($5) deferred** by the founder — free tier works
- Astro's node_modules path (for reading .d.ts): `node_modules/.pnpm/astro@6.4.8_jiti@2.7.0_lightningcss@1.32.0_rollup@4.62.4/node_modules/astro`

## 3. Repo layout

```
/Users/yasir/Web Agency/           ← note the SPACE in the path
├── AGENTS.md                      AI instruction layer (the four contracts as rules)
├── FINDINGS.md                    ★ the deliverable — numbers, friction, open questions
├── OPERATIONS.md                  ★ procedures for everything not built
├── TEST-SCRIPT.md                 the 3-task editor test (Bahasa) — ready to run
├── .pages.yml                     Pages CMS config: 2 projects, 100+ fields, all Bahasa
├── .github/workflows/deploy.yml   path-filtered matrix ×3 sites, canary input, token guard
├── packages/core/                 ★ the shared core (@wps/core)
│   ├── tokens.base.css            24 token NAMES (values = `initial`, never painted)
│   ├── content-schema.spike.ts    makeSchemas({image}) factory — the content contract
│   ├── lib/whatsapp.ts            wa.me href builder (E.164, URL-encoded)
│   └── components/                8 components: SiteHead, SiteHeader, Hero, ServicesGrid,
│                                  Testimonials, FAQ, WhatsAppCTA, SiteFooter
├── scripts/drift.mjs              drift metric (site-local % of src lines, budget < 10%)
└── sites/
    ├── senyum-sehat/              Klinik Gigi Senyum Sehat (Jakarta) — warm/teal/rounded
    ├── baja-nusantara/            CV Baja Nusantara (Surabaya) — dark/orange/zero-radius
    └── kopi-tiga/                 Kopi Tiga (Bandung) — espresso brown/kraft/serif ★ site 3
```

Each site: `package.json`, `astro.config.mjs` (static, no adapter, @tailwindcss/vite), `tsconfig.json`, `wrangler.jsonc` (assets: `./dist`, `not_found_handling: "404-page"`), `src/styles/global.css` (the four load-bearing import lines), `src/styles/tokens.css` (all values), `src/content.config.ts` (collections), `src/pages/index.astro` (composition in code), `content/` (site.yml + markdown), `public/media/<site>/…` (images), plus `src/site-local/` for senyum (`TimDokter.astro`) and baja (`Proyek.astro`). kopi-tiga has NO site-local.

## 4. The four contracts (summary — full text in CONTRACTS.md)

1. **Content** — schema in `packages/core/content-schema.spike.ts` only; site content in `content/`; image() paths must be root-absolute `/public/media/...`; no layout/section order in the CMS (composition lives in `index.astro` in code — never a `sections[]` array).
2. **Token** — semantic utilities ONLY in core (`bg-primary`, `text-ink`, `rounded-card`); never `bg-slate-900`, never hex, never `text-[17px]`. Values live per-site in `tokens.css`. The four load-bearing lines in `global.css`: `@import "tailwindcss"; @import "../../../../packages/core/tokens.base.css"; @import "./tokens.css"; @source "../../../../packages/core";` (paths are 4 levels up from `sites/<site>/src/styles/`).
3. **Component** — no variant/size/theme/columns/layout props (grep-enforced, E4.3). Components take content-shaped props. Only 8 components, ever. No ninth.
4. **Operations** — pnpm workspaces; CI via GitHub Actions; canary-first fan-out; every eval run and pasted, never claimed; append-only FRICTION.md; PHASE REPORT format; actionlint before workflow pushes.

## 5. Phase-by-phase status (all evidence is real, from actual runs)

| Phase | What | Evals | Status |
|---|---|---|---|
| 0 | Workspace scaffold (no create-astro), token pipeline proven | 6/6 | ✅ PASS |
| 1 | Walking skeleton: Hero, site.yml/home.md, deploy workflow, Pages CMS config | 6/6 | ✅ PASS — deploys live since 8 Aug 2026 |
| 2 | Content spike: schema factory, .pages.yml (100 fields, all Bahasa label+desc), 34 content files, 24 images | 7/7 incl. one-sitting audit (0 NOs) | ✅ PASS |
| 3 | Taste slice: art-directed hero + ServicesGrid, full token namespace | 6/6 | ✅ PASS — stranger test n=2 "looks like different agencies" |
| 4 | All 8 core components; SiteHead JSON-LD (Dentist/GeneralContractor); zero client JS | 8/8 | ✅ PASS — 0 bytes JS |
| 5 | Full Variation Budget: tokens pushed, duotone grade, section reorder, voice | 6/6 | ✅ PASS — 390px screenshots in `docs/screenshots/` |
| 6 | Signature moments (TimDokter, Proyek) + scripts/drift.mjs + CI wiring | 6/7 | ⚠️ drift FAIL 28.8%/20.5% — reported honestly, not gamed (see §9-C) |
| 7 | Editor-test environment: single-tenant scratch repo, TEST-SCRIPT.md, topology friction | 5/5 setup | ⏸️ TEST ITSELF NOT RUN (founder's decision) |
| 8 | Site 3 (5 min), contract fan-out (1m26s), Lighthouse, FINDINGS.md, OPERATIONS.md | 4/5 | ✅ PASS — E8.5 FAIL is the documented businessType finding |

## 6. The two numbers (the whole point)

- **Marginal cost of site N+1: 5 minutes** of scaffold work (copy folder → new tokens.css → paste content → deploy), 6 minutes wall-clock including one finding (the `businessType` union in SiteHead needed `CafeOrCoffeeShop` — site-2-shaped vocabulary; one-line fix, documented in FINDINGS §The numbers and §9-D). Criterion 4 budget was 2 hours.
- **Contract-change fan-out: 1m26s** from first commit to all three sites live (required `durasi_estimasi` field: schema + 18 markdown files + 2 CMS projects + component render + 3 pages). Criterion 3 budget was 1 hour. **Canary-first proven**: `gh workflow run Deploy -f canary=<site>` deploys only that site (verified: others show deploy step SKIPPED).

## 7. Final measurements (8 Aug 2026)

| Site | Drift | Lighthouse perf | a11y | best-practices | SEO | Client JS |
|---|---|---|---|---|---|---|
| senyum-sehat | 28.8% (74/257) | 100 | 93 | 93 | 100 | 0 bytes |
| baja-nusantara | 20.5% (48/234) | 99 | 100 | 93 | 100 | 0 bytes |
| kopi-tiga | 0.0% (0/156) | 90 | 93 | 96 | 100 | 0 bytes |

Literal-value + config-prop greps (E4.2/E4.3): **clean** on every run. Field-change log: 45 fields at site A → +3 (`geo.lat/lng`, `durasi_estimasi`) = **6.7% churn** across three FICTIONAL clients (labelled as such; vision's Phase-0 exit is <20% on real clients).

## 8. Live URLs

- https://senyum-sehat.mail-yasirmukhtar.workers.dev
- https://baja-nusantara.mail-yasirmukhtar.workers.dev
- https://kopi-tiga.mail-yasirmukhtar.workers.dev

All HTTP 200, all verified rendering shared-core sections; the CMS→commit→CI→live loop proven twice (the founder edited the clinic's phone via Pages CMS and it reached production).

## 9. Open items / next steps for whoever continues

1. **Run the editor test** (the only unmeasured criterion): Pages CMS on `yasir-mukhtar/senyum-sehat-cms-test` (private, single-tenant, ready) → invite a NON-technical person by email → read `TEST-SCRIPT.md` aloud to them → time each task, log every question verbatim → paste results into FINDINGS.md §The numbers (criterion 5) + §Editor questions. Do NOT help them; absence of help IS the measurement. Do not simulate or predict their behavior.
2. **Stranger test, human confirmation**: open the three live URLs (or `docs/screenshots/p5-*.png`, `p6-*.png`) — do they read as three different agencies? (n=2 automated reads say yes; human check deferred by founder.)
3. **Drift budget definition**: the <10% figure cannot hold on one-page sites; needs a denominator decision (count core lines? exclude styles?) before gating real clients. CI drift job is intentionally red until then.
4. **Cloudflare Workers Paid $5/mo**: deferred; upgrade when scaling beyond free tier.
5. **Repo topology decision (§9-A)**: Pages CMS is repo-scoped → per-client content repos (with sync) or self-hosted path-scoped CMS. Decision deferred to site 3's REAL client.
6. **Real domains + `baseUrl`**: canonical/OG-url/JSON-LD url+logo are gated on the `baseUrl` prop (currently empty). When a real domain exists, set it per site in `index.astro`.
7. **Site 1 for real**: copy `sites/kopi-tiga` (cleanest slice) per FINDINGS "What I would tell the person building site 1". Re-extract the shared core only after site 3's real client (vision Phase 0). Nothing is versioned; everything is evidence.

## 10. API gotchas (all verified in node_modules — do NOT re-guess)

**Astro 6.4:**
1. `glob` loader imports from `astro/loaders`, NOT `astro:content`
2. Legacy `type: 'data'|'content'` + loader is REJECTED — loader-only collections
3. `<Picture>` takes `src`, not `image` (error: "Received undefined")
4. `sharp` must be an explicit dependency (no longer auto-bundled)
5. `astro/zod` = zod/v4; `z.image` does NOT exist → the `makeSchemas({ image })` factory pattern is mandatory
6. `image()` needs root-absolute fs paths → `/public/media/...` (not `/media/...`)

**Tailwind v4:**
- Workspace packages need `@source "../../../../packages/core"` or classes silently missing
- Duration namespace is `--transition-duration-*` (silent fallback if wrong)
- Unused theme vars are tree-shaken from output CSS
- `--font-weight-*` custom tokens COLLIDE with `--font-*` (both emit `font-<name>`) — weight rides on the faces
- `@utility image-grade: filter: var(--image-grade)` is the imagery-treatment hook

**GitHub Actions:**
- `matrix` NOT allowed in job-level `if`; `secrets` NOT allowed in ANY `if` — actionlint names the exact line; solution: coarse static gate + matrix at step level + secret via `env` read by step-level `if`
- `pnpm/action-setup@v4` with `version:` input clashes with `packageManager` → ERR_PNPM_BAD_PM_VERSION — omit the input
- `cloudflare/wrangler-action@v3` falls back to `npm i wrangler` which breaks on `workspace:` protocol → keep `wrangler` as a site devDependency so the pre-installed binary is used
- `assets.not_found_handling` accepts `single-page-application | 404-page | none` — NOT `"404"`

**Pages CMS:**
- Access is per-repository → the two-tenant monorepo confounds any editor test and leaks content across clients (Phase 7 split: scratch repo + derived .pages.yml)
- Media sources must be per-site and their output path must match the content image() paths (`/public/media`)
- Every field needs Bahasa label + description (one-sitting test: 0 NOs across 100 fields)

## 11. Content facts

- 3 sites × (site.yml + home.md + about.md + 6 services + 3 testimonials + 6 faq) = 63 content files, all real Indonesian copy, fictional businesses
- + site-local: senyum `team/` ×4 (TimDokter), baja `proyek/` ×5 (Proyek) — inline schemas in the site's own content.config.ts, NOT in the factory, NOT in .pages.yml (E6.5)
- wa.me hrefs built by `packages/core/lib/whatsapp.ts`: E.164 digits only, no +, no leading zero, URL-encoded message (E1.2 verified)
- geo added Phase 4 (JSON-LD needs it); durasi_estimasi added Phase 8

## 12. Repos & credentials

- **web-agency** (this repo, private) — monorepo; branch main; remote `origin` = github.com/yasir-mukhtar/web-agency
- **senyum-sehat-cms-test** (private) — single-tenant editor test repo (content + media + scoped .pages.yml, derived from the monorepo by a transform script)
- GitHub secrets (repo): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` — present; values [REDACTED], never reproduce them
- Pages CMS: installed + connected to both repos; the founder edited the clinic's content through it (proof of loop)
- No other credentials in the repo. `.env` files: none.

## 13. Commands that work

```bash
export PATH="$HOME/.local/bin:$PATH"
pnpm install            # ~20s
pnpm run build          # whole workspace (root alias: pnpm -r build)
pnpm --filter @wps/<site> preview --port 4321   # serve dist
node scripts/drift.mjs  # drift metric (exit 1 if any site > 10%)
actionlint .github/workflows/deploy.yml
pnpm exec wrangler deploy --config wrangler.jsonc --dry-run   # validate before pushing
gh workflow run Deploy -f canary=<site>    # canary-only deploy
gh run watch <id> --exit-status
```
