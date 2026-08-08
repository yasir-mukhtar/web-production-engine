# AGENTS.md — AI instruction layer for this repo

This file is a **product deliverable**, not overhead (plan §11.6). It encodes
the four contracts (docs/CONTRACTS.md) as build rules that any agent or
human working in this repo must follow. CONTRACTS.md is the source of truth;
this file is its working translation.

This is a **spike**, not a product. Nothing is versioned `v1`. The code is
evidence about whether the architecture holds — not inventory to be reused.

## The three-question scope test

Before adding anything, ask:

1. **Does a third site need it?** If one site needs it → `site-local/`.
   If both sites need it, it still does not enter the core until a third
   would. (Rule of Three.)
2. **Does it belong in the CMS?** Section order, composition, and layout
   live in `src/pages/*.astro`, in code. NEVER in content or `.pages.yml`.
   A `sections:` array is a page builder — the one thing this system must
   never become.
3. **Is it on the non-goals list?** Contact form endpoints, blog, pricing,
   i18n, dark mode, cookie banners, WhatsApp attribution Worker — refused.
   If it seems obviously missing, write it in `docs/FRICTION.md` and move on.

## Hard build rules

1. **Semantic tokens only in `packages/core`.** `bg-primary`, `text-heading`,
   `rounded-card`. NEVER `bg-slate-900`, never `#1a1a1a`, never `text-[17px]`,
   never `p-[23px]`. One literal value silently destroys re-theming.
2. **Never put layout or section order in the CMS.** Composition lives in
   each site's `src/pages/index.astro`, in code.
3. **Site-local quarantine.** Anything only one site needs goes in
   `sites/<site>/src/site-local/` and counts against that site's drift
   budget (target < 10%, measured by `scripts/drift.mjs`).
4. **Never add scope.** No form endpoints, no blog, no newsletter, no cookie
   banner, no dark mode toggle, no i18n, no sitemap beyond what a phase asks
   for. Refused wants go in `docs/FRICTION.md`.
5. **Never guess an API.** Astro 6 / Tailwind 4 / Pages CMS are recent and
   their syntax changed. Read `node_modules/` or run a one-line experiment.
   If still unsure, stop and report. A confident wrong import costs more
   than a question.
6. **Never mark an eval PASS without running it.** Paste the actual command
   output. An unrun check reported as passing destroys the value of every
   check after it.
7. **Zero client-side JavaScript** unless a component genuinely cannot work
   without it. FAQ → `<details>`. Mobile nav → `<details>` or a checkbox.
   If you need JS, say why in the phase report.
8. **Accessibility is not optional and not per-site.** Real landmarks,
   visible focus states, alt text on every image, sufficient contrast,
   semantic headings in order.

## Environment (locked for the PoC)

- Node **22.12+** (Astro 6 requires it) — pinned in `engines` and CI.
- pnpm workspaces: `packages/core`, `sites/*`. Install with `pnpm install`.
- **Validate `.github/workflows/*` edits with `actionlint` before pushing**
  (brew install actionlint). GitHub rejects context misuse (`matrix` in
  job-level `if`, `secrets` in any `if`) at load time with no error
  message — actionlint names the exact line.
- Astro 6.4.x, **static output, no adapter**.
- Tailwind CSS v4.3.x via `@tailwindcss/vite`.
- Token pipeline (the four load-bearing lines, in `src/styles/global.css`):

  ```css
  @import "tailwindcss";
  @import "../../../../packages/core/tokens.base.css";  /* NAMES */
  @import "./tokens.css";                                /* VALUES — after */
  @source "../../../../packages/core";                   /* v4 needs this */
  ```

  Token names live in `packages/core/tokens.base.css` inside `@theme`.
  Token values live in each site's `src/styles/tokens.css` inside `@theme`.
  A plain `:root` block produces no utility class — silent failure.
  Paths are relative to the stylesheet: from `sites/<site>/src/styles/` the
  repo root is **four** levels up.

## The two sites

- `sites/senyum-sehat` — Klinik Gigi Senyum Sehat, dental clinic, Jakarta
  Selatan. Light, warm, high-trust; humanist sans; large radius; soft
  shadows; warm bright photography with faces. Leads with services + team.
- `sites/baja-nusantara` — CV Baja Nusantara, steel fabrication contractor,
  Surabaya. Near-black, industrial; condensed display; radius 0; hard
  edges; high-contrast desaturated photography, duotone over safety-orange,
  no faces. Leads with completed work + scale.

**They must not look like siblings.** That is a success criterion, not a
stylistic preference. Token values, imagery treatment, composition order,
and motion all differ — via tokens and `site-local/`, never by forking a
core component.

## Reporting

Every phase ends with the PHASE REPORT format in docs/CONTRACTS.md, and
appends its friction to docs/FRICTION.md (append-only — never edit an
earlier entry).
