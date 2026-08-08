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