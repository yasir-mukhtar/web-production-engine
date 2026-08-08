You are building a proof of concept for a website production system.
These rules override any instinct, convention, or helpfulness you may have.
If a task in a phase prompt appears to conflict with this file, **stop and ask.**

## The purpose of this repo

Two Indonesian SMB websites that look unrelated to a stranger, built from one
shared core, where a non-technical person can edit content and one change to
the core reaches both live sites.

This is a **spike**, not a product. Nothing here is versioned `v1`. The code
is evidence about whether the architecture holds — not inventory to be reused.

## The four contracts

1. **Content Contract** — the canonical shape of a business website's
   information. Written in business language, never component language.
2. **Component Contract** — components accept content-shaped props and render
   them. A `ServicesGrid` receives `services[]`. How it looks is the
   component's business, not the content's.
3. **Token Contract** — token *names* are identical across every site. Token
   *values* are where a site becomes itself.
4. **Operations Contract** — same hosting, deploy, CMS, and analytics for
   every site. No exceptions.

## Hard rules — violating any of these fails the phase

1. **No literal colours or sizes in `packages/core`.** Use `bg-primary`,
   `text-heading`, `rounded-card`. Never `bg-slate-900`, never `#1a1a1a`,
   never `text-[17px]`, never `p-[23px]`. One literal value silently destroys
   the re-theming property that this entire PoC exists to prove.
2. **Never put layout or section order in the CMS.** Section composition lives
   in each site's `src/pages/index.astro`, in code. If you find yourself
   creating a `sections:` array in a content file or a `.pages.yml` field that
   controls ordering, **stop** — that is a page builder, and it is the single
   thing this system must never become.
3. **Never add a field, component, or capability that only one site needs.**
   Site-specific needs go in `sites/<site>/src/site-local/`. If both sites
   need it, it still does not enter the core until a third would.
4. **Never add scope.** No contact form, no blog, no newsletter, no cookie
   banner, no dark mode toggle, no i18n, no sitemap generator beyond what a
   phase asks for. If it seems obviously missing, write it in `FRICTION.md`
   and move on.
5. **Never guess an API.** Astro 6 and Tailwind 4 are recent and their syntax
   changed. If you are unsure, read `node_modules/`, read the local docs, or
   run a one-line experiment. If still unsure, **stop and report.** A confident
   wrong import costs more than a question.
6. **Never mark an eval PASS without running it.** Paste the actual command
   output. An unrun check reported as passing is the worst possible outcome
   of a phase, because it destroys the value of every check after it.
7. **Zero client-side JavaScript** unless a component genuinely cannot work
   without it. FAQ accordion → `<details>`. Mobile nav → `<details>` or a
   checkbox. If you need JS, say why in your report.
8. **Accessibility is not optional and not per-site.** Real landmarks,
   visible focus states, alt text on every image, sufficient contrast,
   semantic headings in order.

## Environment

- Node **22.12+** (Astro 6 requires it)
- pnpm workspaces — `packages/core`, `sites/*`
- Astro 6.4.x, **static output, no adapter**
- Tailwind CSS v4.3.x
- Deploy: GitHub Actions + Wrangler → Cloudflare Workers Static Assets
- CMS: Pages CMS, configured by `.pages.yml` at repo root

## The two sites

**`sites/senyum-sehat`** — Klinik Gigi Senyum Sehat, dental clinic,
Jakarta Selatan. Light, warm, high-trust. Humanist sans, large radius, soft
shadows, generous line-height, gentle easing. Photography bright, soft,
warm-graded, human faces. Leads with services and practitioners.

**`sites/baja-nusantara`** — CV Baja Nusantara, steel fabrication contractor,
Surabaya. Near-black, industrial. Condensed display face, radius 0, hard
edges, tight tracking, fast easing. Photography high-contrast, desaturated,
duotone over safety-orange, no faces. Leads with completed work and scale.

**These must not look like siblings.** That is a success criterion, not a
stylistic preference.

## Reporting format — end every phase with exactly this

```
## PHASE <n> REPORT

STATUS: PASS | FAIL | BLOCKED

### Evals
| # | Check | Result | Evidence |
|---|-------|--------|----------|
| 1 | ...   | PASS   | <pasted command output> |

### What I built
- <bullets, files touched>

### What I did NOT do and why
- <bullets>

### Friction (also appended to FRICTION.md)
- <anywhere a contract chafed, anything that felt wrong, anything I
  wanted to add but didn't>

### Questions for the human
- <blocking questions only, or "none">
```

Append the friction section to `FRICTION.md` before reporting. Never
overwrite that file.