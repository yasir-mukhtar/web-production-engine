Append-only. Never edit or delete an earlier entry — a friction point that
later turned out to be fine is itself a finding.

Four sections. Every phase appends to at least one.

---

## 1. CONTRACT FRICTION

Anywhere a contract chafed. Format:

### [P<n>] <one-line title>
- **Contract stressed:** Content | Component | Token | Operations
- **What happened:** <two sentences>
- **What I did instead:** <two sentences>
- **Would this get worse at 40 sites?** yes / no / unknown — and why

---

## 2. REBUILD LOG

Every time something was the second version of an earlier thing. This is the
seed of the real component inventory — the Rule of Three counts from here.

| Phase | What was rebuilt | First occurrence | Why it wasn't reusable |
|---|---|---|---|

---

## 3. REFUSED WANTS

Fields, components, collections, and capabilities that a site genuinely
wanted and did NOT get, because of the Rule of Three or the scope rules.
Do not editorialise. Just record the want.

| Phase | Site | What it wanted | Why refused | Workaround used |
|---|---|---|---|---|
| P0 | both | Bundled web fonts (Plus Jakarta Sans / Oswald) | Phase 0 scope: no deps beyond the locked list | System-ui fallbacks in token stacks; fonts arrive with art direction (Block 3/5) |
| P0 | both | More token names (radius, shadow, type scale, motion) | Phase 0 minimum is five tokens | Deferred to Block 5 (art direction) where the values earn the names |
| P2 | senyum-sehat | team[] (Tim Dokter) | Rule of Three — one site needs it | site-local/ in Phase 6 |
| P2 | baja-nusantara | projects[] (Proyek) | Rule of Three — one site needs it | site-local/ in Phase 6 |
| P2 | both | Hero image field in content | Not in the phase field list | Art direction phase decides how the hero image is delivered |
| P2 | both | Pricing | Non-goal; vision defers pricing | — |
| P2 | senyum-sehat | Certifications | Neither client needs them in scope | — |
| P2 | baja-nusantara | Client logos | Neither client needs them in scope | — |

---

## 4. NEAR-MISSES ON THE PAGE-BUILDER BOUNDARY

Any moment where the obvious solution was to let content control layout,
ordering, or composition. Record even the ones that were easy to resist —
frequency here is the leading indicator for whether this system holds.

### [P<n>] <one-line title>
- **The tempting solution:** <one sentence>
- **Why it was tempting:** <one sentence>
- **What was done instead:** <one sentence>

---

## SEEDED BEFORE PHASE 0 — known frictions, already accepted

These are recorded so they are not "discovered" and re-litigated mid-build.

### [P0] Tailwind v4 does not scan workspace packages
- **Contract stressed:** Token
- **What happened:** v4 skips node_modules and gitignored files by default,
  so a shared component package's classes silently vanish from output CSS.
- **What I did instead:** explicit `@source` pointing at packages/core.
- **Would this get worse at 40 sites?** No — one line per site, but it is a
  silent failure with no error message, so it must stay in the site template.

### [P2] Astro's image() cannot live in a plain shared Zod object
- **Contract stressed:** Content
- **What happened:** image() is injected into the schema function, so a
  shared schema must be a factory, not an object.
- **What I did instead:** export makeSchemas({ image }).
- **Would this get worse at 40 sites?** No, but it constrains how the
  content contract can ever be packaged.

### [P7] Pages CMS access is repository-scoped
- **Contract stressed:** Operations
- **What happened:** In a monorepo, an editor invited to one client's
  content can see every client's content.
- **What I did instead:** separate single-site scratch repo for the editor
  test.
- **Would this get worse at 40 sites?** Yes. This is a client-
  confidentiality blocker, not an inconvenience, and it is the single
  biggest open architectural question in the PoC.

### [P0] Tailwind v4 tree-shakes unused theme variables
- **Contract stressed:** Token
- **What happened:** `--color-ink` and `--font-body` were defined in both
  sites' `@theme` blocks but absent from the built CSS, because no utility
  referenced them yet. Tailwind v4 emits theme variables on demand.
- **What I did instead:** nothing — the variable appears once a component
  uses it. But grep-based evals that look for `--color-*` in `dist/` can
  misread this as a missing token.
- **Would this get worse at 40 sites?** No. Per-site CSS is compiled
  independently; each site emits only the tokens it uses.

### [P0] `initial` placeholder values in tokens.base.css worked
- **Contract stressed:** Token
- **What happened:** The base file defines token NAMES with `initial` values
  so it genuinely cannot paint anything; site `@theme` blocks override them.
  Tailwind generated the utilities (`bg-primary` etc.) from the names and
  the build merged base+site, emitting only the site's value.
- **What I did instead:** kept the design; it makes "names, not values"
  structurally enforced instead of a convention.
- **Would this get worse at 40 sites?** No — it is the mechanism that
  guarantees a missing site override fails loudly (transparent, not
  inherited).

### [P0] Environment friction: pnpm not installed
- **Contract stressed:** Operations
- **What happened:** The locked package manager (pnpm) was absent; npm
  global install failed (`/usr/local/bin` not writable, corepack symlink
  also EACCES).
- **What I did instead:** `npm i -g pnpm@9 --prefix ~/.local`, PATH
  exported per session.
- **Would this get worse at 40 sites?** No — one-time per machine, but it
  should be written into the onboarding runbook (OPERATIONS.md).

### [P1] Astro 6 API drift: `glob` loader moved to `astro/loaders`
- **Contract stressed:** Component
- **What happened:** `import { glob } from 'astro:content'` resolved to
  `undefined` in Astro 6.4.8 — the `glob()` loader is exported from
  `astro/loaders`. Most online examples (including older Astro 5 docs) show
  the old import; `astro sync` fails loudly, so the failure mode was good.
- **What I did instead:** split the import; verified the export in
  `node_modules/astro/dist/content/loaders/index.d.ts` before changing.
- **Would this get worse at 40 sites?** No — one fix per codebase, and the
  site template carries it forward.

### [P1] Astro 6 API drift: legacy `type:` + `loader` combination rejected
- **Contract stressed:** Content
- **What happened:** `defineCollection({ type: 'data', loader: glob(...) })`
  is rejected — the legacy `type: 'content'|'data'` collections and the
  loader-based collections are disjoint unions. The current form is
  loader-only; the glob loader infers content-vs-data from file extension.
- **What I did instead:** dropped `type` from both collections.
- **Would this get worse at 40 sites?** No — the shared schema factory
  (Phase 2) must use the loader-only form in each site's content.config.ts.

### [P1] Deploy step guarded on secret presence
- **Contract stressed:** Operations
- **What happened:** `CLOUDFLARE_API_TOKEN` doesn't exist yet (pre-flight
  not done), so an unguarded deploy job would make every push red.
- **What I did instead:** `if: ${{ secrets.CLOUDFLARE_API_TOKEN != '' }}`
  on the wrangler step — CI is green now and deploys activate automatically
  the moment the secret lands. No workflow edit needed later.
- **Would this get worse at 40 sites?** No — the guard is in the shared
  template, and it makes the pre-flight handoff explicit.

### [P1] GitHub Actions context availability bit me twice in one file
- **Contract stressed:** Operations
- **What happened:** `matrix` is not available in job-level `if`
  (only github/inputs/needs/vars), and `secrets` is not available in `if`
  at ANY level — the first push failed to load with no error message, and
  `gh run view` only said "likely failed because of a workflow file issue".
- **What I did instead:** installed `actionlint` (brew), which named both
  errors precisely. Restructured: coarse job-level gate with static site
  names, fine per-step gate using `matrix` at step level, and the secret
  check bridged through `env: HAS_CF_TOKEN: ${{ secrets... != '' }}` with
  `if: env.HAS_CF_TOKEN == 'true'`.
- **Would this get worse at 40 sites?** No — the template now embeds the
  pattern, and actionlint runs locally before any push.

### [P1] pnpm/action-setup@v4 rejects a version input next to packageManager
- **Contract stressed:** Operations
- **What happened:** `version: 9` in the action plus `packageManager:
  pnpm@9.15.9` in package.json → `ERR_PNPM_BAD_PM_VERSION` on the second
  CI run.
- **What I did instead:** omitted `version`; the action reads the pinned
  version from package.json, so pnpm version stays single-sourced.
- **Would this get worse at 40 sites?** No — it removes a whole class of
  version drift in the template.

### [P2] image() does not resolve "/media/..." — needs "/public/media/..."
- **Contract stressed:** Content
- **What happened:** The shared factory's image() fields failed at build
  with ImageNotFound for every "/media/..." path. Traced through
  vite-plugin-assets: the content-image loader resolves the frontmatter
  string via Vite's resolver, then emitImageMetadata() does
  `pathToFileURL(id)` — a literal filesystem read. "/media/..." resolves
  against the site root, missing the public/ dir entirely. Public-URL
  forms are NOT mapped to the public folder in Astro 6.4.8.
- **What I did instead:** content image values and Pages CMS media output
  now use "/public/media/..." (root-absolute into the site's own public
  dir). The CMS writes the same form the build can resolve. Verified the
  emitted output: images get optimized into /_astro/*.hashed.jpg.
- **Would this get worse at 40 sites?** No, but it must live in the site
  template + media config, or every client's first upload breaks the build
  silently-ish (loud error, confusing cause).

### [P2] E2.4's grep pattern collides with the phase's own `order` field
- **Contract stressed:** Content
- **What happened:** E2.4 greps `^(sections|layout|order|template):` and
  expects nothing, but task 2 mandates `order` in services/*.md. The only
  matches are that mandated per-item display-order field — within-collection
  ordering, not page/section composition.
- **What I did instead:** kept `order` (task 2's letter), verified the
  page-builder boundary itself is clean (no sections/layout/template keys,
  nothing in .pages.yml). Noted here so the eval pattern isn't re-litigated.
- **Would this get worse at 40 sites?** No — the boundary that matters is
  page composition, and it held.

### [P2] packages/core must declare astro as a devDependency
- **Contract stressed:** Content
- **What happened:** The shared schema file imports 'astro/zod' and
  'astro/content/config' types, but packages/core had no astro dependency —
  TS could not resolve, and pnpm's strict linking means the site's astro
  was not visible from core.
- **What I did instead:** `devDependencies: { astro: ^6.4.8 }` in core —
  runtime consumers bring their own astro, so dev is the right bucket.
- **Would this get worse at 40 sites?** No — one line in the core package.