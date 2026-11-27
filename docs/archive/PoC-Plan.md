# Proof of Concept — The Website Production System

**Derived from:** Product Vision — The Website Production System (v2), 8 Aug 2026
**Scope agreed:** thin slice of all three risks · 2 fictional Indonesian SMB sites · Pages CMS · 24 hours, mostly AI-driven with human taste checkpoints
**Status:** plan, not yet executed · reviewed adversarially against the vision and re-cut to actually fit 24h
**Last updated:** 8 August 2026

---

## 1. What this PoC is actually for

The vision says the system is **extracted, not designed** (§9). So a PoC cannot be "build the system." It can only be: *build the smallest thing that tells us whether the four contracts hold together in practice, and where they chafe.*

**The one sentence:**

> Two Indonesian SMB websites that look unrelated to a stranger, built from one shared core, where a non-technical person can edit content and one change to the core reaches both live sites.

That sentence contains all four contracts and all three risks.

**The PoC succeeds even if it fails.** Ending with *"the Content Contract broke on the contractor site because construction businesses lead with projects, not services"* is worth more than two pretty sites. The friction log is the deliverable. The code is the instrument.

### The most important warning in this document

Vision §9 says the wrong sequencing "costs months," and names the failure precisely: *"a beautiful system fitted to imaginary clients."* This PoC builds shared components for **two fictional businesses and zero paying clients** — which is exactly that failure mode, run deliberately and time-boxed.

That is acceptable **only** if the output is treated as evidence, not inventory. So:

> **The code produced by this PoC is a spike, not a core.** Site 1 (the first paying client) is built by *copying components out of it and editing them freely*. The shared core is re-extracted only after site 3, per §9 Phase 0.

Nothing here is called `v1`. Nothing here is called a contract without the word *spike* attached. This is not pedantry — after 24 hours of investment, nobody voluntarily throws away nine working components, and version numbers are how a spike quietly becomes a commitment.

---

## 2. Explicit non-goals

| Not doing | Why |
|---|---|
| Component variants | §9: "build components, and note which ones you rebuild." |
| More than 8 sections | Rule of Three. |
| Blog/posts, pricing, locations, certifications | Neither fictional client needs them. Adding them is guessing. |
| Bilingual ID/EN | §13 defers it. |
| Contact form endpoint | §2 of the vision: "the decision moment almost always ends in **WhatsApp**, not a contact form." The form is the secondary channel and the first thing to cut. → `OPERATIONS.md` |
| WhatsApp click-attribution Worker | Deferred, and for a reason — see §10, risk 4. → `OPERATIONS.md` |
| Uptime monitoring, backups, offboarding, `.co.id` paperwork | Written as procedure, not built. → `OPERATIONS.md` |
| Real domains and DNS | `*.workers.dev` only. |
| Portfolio dashboard, custom CMS, custom auth | §8 anti-goals. |
| Pixel-perfect polish | The stranger test is about art direction being *different*, not finished. |

**Scope tripwire:** if you are building something not on the block list in §6, stop and write it in the friction log instead.

---

## 3. Stack decisions (locked for the PoC)

Verified 8 Aug 2026. Each line names the reason and the year-3 exposure, per decision principle 6.

| Layer | Choice | Why | Year-3 risk |
|---|---|---|---|
| Framework | **Astro 6.4.x, static, no adapter.** Requires **Node 22.12+** — pin it in CI. | Content collections + islands + zero JS. Static-only keeps hosting swappable. | Cloudflare acquired the Astro team (Jan 2026); staying adapter-free makes that irrelevant. Do **not** use Astro 7 beta. |
| Repo | **pnpm workspaces monorepo** — `packages/core` + `sites/*` | One change to core, fan-out to N deploys. | Couples CMS access to repo access — a known blocker, see §9-A. |
| Tokens | **Tailwind v4.3 `@theme` + per-site `tokens.css`** | Names shared, values per-site. Each site compiles separately, so a theme swap is a real re-skin. | Low; degrades to plain CSS custom properties. |
| Components | **`.astro` sections, semantic tokens only** | Zero JS. `bg-primary`, never `bg-slate-900`. | Low. |
| CMS | **Pages CMS** (hosted) | Free, MIT, self-hostable. Client logs in by **email + OTP, no GitHub account**. One `.pages.yml`. | Medium (solo maintainer) — mitigated by MIT + self-hosting, and content is plain Markdown so moving to Decap/Sveltia is cheap. |
| Hosting | **Cloudflare Workers Static Assets** | ~$5/mo for 40 sites. The only option where site 40 costs what site 4 costs. | Low. |
| CI | **GitHub Actions + Wrangler**, matrix over sites, **path-filtered** | Sidesteps Cloudflare's 500-build/mo free quota; path filtering is what makes canary-first fan-out possible. | Low. |
| Motion | **CSS-first**; GSAP only where earned | GSAP is fully free now, Club plugins included. View Transitions ~88%. Scroll-driven animations are progressive enhancement only (Firefox holdout). | Low. |

**Rejected — record so it isn't re-litigated:**

- **Keystatic** (the §13 working assumption) — GitHub mode requires giving the *client* write access to your repo. Disqualifying. `@keystatic/core` was dormant Jul 2025 → Mar 2026; `@keystatic/next` last shipped Feb 2025; `keystatic.cloud` returned HTTP 500 during research on 8 Aug 2026.
- **Vercel Hobby** — Fair Use Guidelines explicitly prohibit "receiving payment to create, update, or host the site." Not a grey area.
- **Netlify** — credit model burns the free 300 credits at ~20 production deploys/month.
- **GitHub Pages** — ToS grey zone for 40 paid client sites.
- **Payload / Directus / Strapi / Sanity-per-site** — need a runtime, or cost $300–3,000/mo at portfolio scale.

**Verify before spending money (not blocking):** Cloudflare free-tier commercial use is permitted by *absence of prohibition*, not explicit grant — pay the $5/mo and the ambiguity disappears. Tailwind Plus's license forbids "creating a UI library or component library," which sits awkwardly against this architecture; email support before buying. MIT sources (shadcn, Base UI, Preline, Flowbite core) carry no such clause.

---

## 4. The two fictional clients

Chosen to be as far apart as possible in *art direction* and in *content shape*, so both the Variation Budget and the Content Contract get stressed.

**Site A — Klinik Gigi Senyum Sehat** (dental clinic, Jakarta Selatan)
Light, warm, high-trust. Humanist sans, large radius, soft shadows, generous line-height, gentle easing. Photography: bright, soft, warm-graded, faces. Leads with services and practitioners. Wants **team**.

**Site B — CV Baja Nusantara** (steel fabrication contractor, Surabaya)
Near-black, industrial. Condensed display face, radius `0`, hard edges, tight tracking, fast easing. Photography: high-contrast, desaturated, duotone over safety-orange. Leads with completed work and scale. Wants **projects**.

**The mismatch is the point.** One needs `team[]`, the other `projects[]`. Under the Rule of Three, **neither enters the shared schema.** Both become that site's signature moment in `site-local/` — which tests the quarantine rule *and* the drift metric on day one instead of in month six.

---

## 5. The content spike

Authored from the client's vocabulary downward (§4). If a business owner can't answer a field in one sitting without phoning us, it's the wrong field.

```
content/
  site.yml            # globals
  home.md
  about.md
  services/*.md
  testimonials/*.md
  faq/*.md
```

**Contact is a first-class primitive** (§5, Contract 1) — a block, not a field:

```yaml
contact:
  whatsapp_number: "628123456789"   # E.164 digits: no +, no leading 0
  whatsapp_default_message: "Halo, saya ingin bertanya tentang layanan Anda"
  cta_context:
    hero: "Halo, saya lihat website Anda dan ingin konsultasi"
    service: "Halo, saya tertarik dengan layanan {service}"
```

`site.yml` also carries business name, tagline, logo, address, hours, phone, socials, SEO defaults — all of which feed the shared `<SiteHead />` (§6, Block 4).

**Deliberately absent, logged as Rule-of-Three candidates:** team, projects, client logos, posts, pricing, multiple locations, certifications.

**The boundary that matters most:** section order and composition live in each site's `src/pages/index.astro` — in code, never in the CMS. Decision principle 3. The moment a `sections: []` array appears in a CMS-editable file, you have started building a page builder.

---

## 6. The 24-hour plan

**Walking skeleton first.** The integration points — CMS auth, Cloudflare deploy, Tailwind scanning a workspace package — are where 24-hour plans die. Cross all of them in the first five hours while there's still time to change course.

🧑 = human checkpoint. These are about **taste and judgment**, not correctness, and they are the parts AI cannot do for you. They are not cuttable.

---

### Pre-flight — before H0, and not counted in the 24

None of this is build work; all of it is wall-clock you cannot compress once the clock starts.

- [ ] Cloudflare account + Workers Paid ($5) + API token in GitHub secrets
- [ ] GitHub repo created, Pages CMS GitHub App installed, **your test editor invited and confirmed logged in**
- [ ] Node 22.12+ pinned locally and in the Actions workflow
- [ ] **Recruit the non-technical editor for Block 7.** This is the only irreplaceable input in the plan and the easiest to forget.
- [ ] Rough image plan: ~12 images per site, sourced or generated, before H0

---

### Block 0 · H0–H1 · Scaffold + the AI instruction layer

1. pnpm workspaces: `packages/core`, `sites/senyum-sehat`, `sites/baja-nusantara`. Astro minimal template, TypeScript strict, static, **no adapter**.
2. Tailwind v4 in both sites. **This exact order — three of the four lines are load-bearing:**

```css
@import "tailwindcss";
@import "../../../../packages/core/tokens.base.css";  /* @theme — the NAMES */
@import "./tokens.css";                                /* @theme — this site's VALUES, must come after */
@source "../../../../packages/core";                   /* v4 does not scan workspace deps */
```

  - `@import` must precede all other rules — `@source` after the imports, not between them.
  - Paths are relative to *this stylesheet*. From `sites/<site>/src/styles/global.css` that's four levels, not three. Getting it wrong fails **silently**.
  - Tokens must live inside `@theme`, not `:root`. A plain `:root { --color-primary }` produces the variable but **no `bg-primary` utility**, which silently voids success criterion 6.

3. **Smoke test, right now:** put a class used *only* inside `packages/core` on a page, build, and grep the output CSS for it. Do not proceed until it's there. This is the single highest-probability failure in the whole plan and it has no error message.
4. Write `AGENTS.md` at the repo root encoding the contracts as build rules — **a product deliverable, not overhead** (§11.6). Minimum: the three-question scope test, semantic-tokens-only, no-layout-in-the-CMS, and the site-local quarantine rule.

---

### Block 1 · H1–H5 · Walking skeleton — all four contracts, end to end

Thinnest possible version of the whole loop: one component, one field, one deploy, one browser edit. Mostly OAuth screens and dashboard clicking, not AI build time — budget accordingly.

1. **Core:** one `<Hero />` taking content-shaped props, semantic tokens only.
2. **Content:** `site.yml` + `home.md` per site, hero fields only.
3. **Tokens:** `tokens.css` per site — just `--color-primary` and `--font-display`, deliberately clashing.
4. **Deploy:** Actions matrix over `sites/*`, `wrangler deploy` to Workers Static Assets. **Add `dorny/paths-filter` now** — without it every CMS commit rebuilds both sites, and canary-first fan-out in Block 8 is impossible.
5. **CMS:** `.pages.yml` at repo root, one collection per site, **separate `media` sources per site** (Pages CMS supports an array of named media configs with distinct `input`/`output` — otherwise both clients' uploads land in one folder).
6. Edit the hero headline in the browser; watch the commit land and the site rebuild.

> ### 🚦 GATE — H6. If the skeleton isn't working, cut scope.
> The skeleton failing is *information*, not a setback. Likely failures in order: (a) Tailwind not seeing core classes → `@source` path depth; (b) Pages CMS × monorepo → drop to one site for the CMS test, keep both for the core test; (c) Wrangler config. Do not spend hours fighting (b).

**Exit:** two live URLs, both rendering from shared core, both editable by someone with no GitHub account.

---

### Block 2 · H5–H8 · Content spike + content that feels real

1. Shared schema in `packages/core/content-schema.spike.ts`. Two things the docs will bite you on:
   - Import Zod from **`astro/zod`** (Astro 6 is on Zod 4; `astro:content` doesn't resolve outside an Astro build).
   - Astro's `image()` helper is **injected into the schema function**, so a plain exported Zod object *cannot contain an image field* — and every collection here has one. Export a **factory**: `makeSchemas({ image })`. Each site keeps its own `src/content.config.ts` with the `glob()` loader; only the Zod shapes travel.
2. `.pages.yml` field labels in **Bahasa Indonesia, in business language.** Not `whatsapp_default_message` but *"Pesan otomatis saat pelanggan klik tombol WhatsApp."* This is where the "update it without calling anyone" promise is kept or broken. Set `media.extensions` and a size hint too.
3. Fill both sites: 5–6 services, 3 testimonials, 6 FAQ, about page. **Write good copy** — placeholder copy makes real design judgment impossible at H15.

🧑 **Checkpoint 1 — the one-sitting test.** Read every CMS label as the clinic owner. Any field you'd have to phone us about is the wrong field. Cut or rename it. Log what you cut — that log is the first real evidence about the content contract.

---

### Block 3 · H8–H9 · Taste slice (early, deliberately)

Before building eight components against an unproven token contract: **fully art-direct one hero + one section, on both sites.** Real type, real images, real treatment.

🧑 **Checkpoint 2 — early stranger test, n=2 sections.** Side by side on a phone: do these read as two different businesses? If not, the token names are wrong or the imagery plan is too timid. **Fixing this now costs one hour; fixing it at H18 costs six.**

---

### Block 4 · H9–H15 · The core sections

Eight components in `packages/core`. Not variants — one implementation each.

`SiteHead` · `SiteHeader` · `Hero` · `ServicesGrid` · `Testimonials` · `FAQ` · `WhatsAppCTA` · `SiteFooter`

**`SiteHead` is first and is not optional.** Vision §6 puts SEO/schema conventions in the 100%-shared column. It emits meta, canonical, sitemap/robots, OG/Twitter, and **`LocalBusiness`/`Dentist` JSON-LD** built from `site.yml` — address, hours, phone, geo. For a Jakarta clinic and a Surabaya fabricator this is close to the highest-value shared thing in the system, it's ~30 minutes, and it's the cleanest possible demonstration of principle 7 ("one improvement, many sites"). Skipping it also means your test editor never touches the SEO fields, so you learn nothing about them.

**Images:** wire `astro:assets` `<Picture>` through every image-bearing section with `widths`/`sizes`/`format` set at the component level. Pages CMS commits whatever the editor uploads — a 4 MB phone JPEG is the realistic input, and it is simultaneously your most likely criterion-5 failure and your most likely real support ticket.

Rules, enforced by `AGENTS.md`: props are content shapes; **zero literal colours or font sizes anywhere in core** (one `bg-slate-900` silently kills re-theming); no client JS unless genuinely needed (FAQ → `<details>`); accessibility baseline is shared and non-negotiable.

Keep a **rebuild log**: every time you catch yourself writing the second version of something. That log is the seed of the real component inventory.

---

### Block 5 · H15–H18 · Art direction — make them look unrelated

The highest-leverage block, and the one most likely to be rushed. It is what disproves "sameness" (§11.3, the named killer).

Vision §6 lists **six** always-varies axes. Tokens are one. Spend on all of them:

1. **Token names fixed** in `tokens.base.css` — colour roles, type scale, spacing, radius, shadow, motion. Identical across sites, forever.
2. **Token values** varied hard, per §4's two directions.
3. **Imagery and photographic treatment** — this decides the stranger test more than hue does. Senyum Sehat: bright, soft, warm-graded, human. Baja Nusantara: high-contrast, desaturated, duotone over orange, no faces. Put overlay colour, grade, aspect ratios and grain **in the Token Contract** so treatment is a token, not a per-image decision.
4. **Composition and order** — clinic leads with services and trust; contractor leads with proof-of-work and scale. Same components, different sequence. Free differentiation, and most studios forget it.

🧑 **Checkpoint 3 — the stranger test (§10).** Both sites side by side on a phone, shown to someone who hasn't seen the code: *"same agency?"* If yes, the Variation Budget isn't being spent. Fix it **here**. Note in `FINDINGS.md` that §10 specifies *five* sites — passing at n=2 is necessary, not sufficient. Two sites can look different by accident.

---

### Block 6 · H18–H20 · Signature moments + drift metric

Exactly one bespoke thing per site, inside the Token and Component Contracts, quarantined in `sites/*/src/site-local/`.

- **Senyum Sehat →** *Tim Dokter*: practitioner cards, soft scroll reveal, WhatsApp-per-doctor CTA.
- **Baja Nusantara →** *Proyek*: horizontally-scrolling project strip, heavy overlay treatment.

These are the `team[]` and `projects[]` needs from §4, deliberately **not** promoted into the shared schema. That is the Rule of Three working visibly on day one.

Then `scripts/drift.mjs`: lines in `sites/*/src/site-local/**` as a percentage of that site's source. Run it in CI so the number is never a surprise. **Target < 10%.**

🧑 **Checkpoint 4 — is the signature moment worth its cost?** If it reads as decoration rather than the thing someone remembers, it failed. A signature moment nobody notices is 10% drift bought for nothing.

---

### Block 7 · H20–H22 · The client editing test

The support-load risk (§11.4) is invisible until a real non-technical person touches it.

**First, 30 minutes of setup that makes the measurement valid.** Pages CMS access is **repository-scoped**: in the monorepo, the clinic's editor can see the contractor's content, and the sidebar shows ~12 flat entries across two unrelated businesses. That is a client-confidentiality blocker, not "friction to observe" — and it confounds the measurement. So: push one site's `content/` to a scratch single-site repo with its own scoped `.pages.yml`, and run the test there. Cheap, valid, and it directly produces evidence for §9-A.

Then give your recruited editor three tasks in Bahasa Indonesia, with **no instructions beyond the task**:

1. Ganti nomor WhatsApp klinik.
2. Tambahkan satu layanan baru, lengkap dengan foto.
3. Perbaiki typo di jawaban FAQ nomor 2.

Time each. Log every question **verbatim**.

🧑 **Checkpoint 5 — watch, don't help.** Every question is a support ticket you will receive forty times. Don't answer until they give up.

**Report this honestly.** One first-time user, three tasks, no handover call, n=1 — that measures **first-run learnability**, not tickets per site-year. §10's "under 4" target assumes a client who was onboarded. Recording it as if it maps to §10 will manufacture false confidence.

---

### Block 8 · H22–H24 · The two numbers that decide the business

Both of these test the actual thesis. Neither is optional.

**1. Marginal cost of site N+1 (~30 min).** Scaffold a *third* site from the core: copy a site folder, swap `tokens.css`, paste content, deploy. **Stopwatch it.** This is the number behind §3 ("client 30 costs the same as client 1"), §10 (40h → under 12h), and §7's "build real work on spec during the sales conversation" — the most direct commercial return in the whole vision, and nothing else in the plan tests it.

**2. Fan-out of a *contract* change (~45 min).** Not `loading="lazy"` — that's the easy case. Contract 1 says a schema change "is a migration event across the portfolio, and is treated as such." So: **add one required field to `services`**, migrate both sites' Markdown, update `.pages.yml`, deploy the canary, check it, then the rest. Time from first commit to all sites live. That number predicts what portfolio maintenance actually costs.

Then run `drift.mjs`, run Lighthouse on both, and write `FINDINGS.md`:

- The numbers from §8.
- **Friction log** — everywhere a contract chafed.
- **Rebuild log** — components built twice.
- **Field-change log** — how much the schema moved between site A and site B. (§9's Phase 0 exit is <20% churn across *three* clients; two gives an early read.)
- Every editor question, verbatim.
- Answers to §9's open questions.
- The "evidence, not inventory" clause from §1, restated at the top.

---

## 7. Deliverables

1. `web-production-system` monorepo — `packages/core` + two site workspaces
2. Two live sites on `*.workers.dev`, visibly unrelated
3. `packages/core/content-schema.spike.ts` — the content spike, executable (factory, not object)
4. `packages/core/tokens.base.css` — token names, including imagery treatment tokens
5. Two `tokens.css` files — the cheapest axis of difference, not the only one
6. `.pages.yml` — Indonesian, business-language labels, per-site media sources
7. Actions pipeline — path-filtered matrix, canary-first fan-out
8. `AGENTS.md` — the AI instruction layer. Part of the product (§11.6)
9. `OPERATIONS.md` — written procedure for everything deliberately not built
10. `scripts/drift.mjs` — the drift metric, in CI
11. `FINDINGS.md` — **the actual output**

---

## 8. Success criteria

| # | Criterion | Pass |
|---|---|---|
| 1 | Both sites render from one shared core | 100% of sections from `packages/core`, except site-local |
| 2 | Site-local code per site | **< 10%** |
| 3 | Contract-change fan-out, commit → all sites live | **Under 1 hour** |
| 4 | Time to scaffold and deploy site 3 | **Under 2 hours** (the number §3 and §7 rest on) |
| 5 | Editor completes all three tasks | **Yes, ≤ 2 questions total** (learnability, n=1 — not a §10 metric) |
| 6 | Lighthouse mobile performance, both sites | **≥ 90** |
| 7 | Re-theming works purely through `tokens.css` | Zero literal colour/size values in `packages/core` |
| 8 | 🧑 The stranger test | A stranger cannot tell they share a system |

**Criterion 8 is the one that can't be automated and the one most likely to be quietly failed.** §10 says the metric that matters most is *system* similarity; §11.3 says what kills the business is *visual* sameness. The PoC has to pass both at once. That tension is the entire product.

---

## 9. Open questions the PoC should answer

**A. Monorepo vs. per-client repo.** Pages CMS grants access per *repository* — this is now a known constraint, not a discovery. Three candidate resolutions, all deferrable: (1) per-site content repos with code in the monorepo; (2) per-client repos consuming core as a private npm package — slower fan-out, but version pinning means a bad core can't take down 40 sites at once; (3) self-hosted Pages CMS with path-scoped permissions. Block 7 gives you a hands-on read on (1). Do not decide before site 3.

**B. Does section composition need to be data-driven?** If sequencing sections in `index.astro` is tedious at two sites, it will be unbearable at forty. But a `sections[]` array is one step from a page builder. **Log the friction; do not build the array.**

**C. How much of the 10% signature-moment budget does a real site consume?** The ceiling is a hypothesis. Two data points is the first evidence.

**D. Where does the content spike genuinely break?** The clinic/contractor mismatch is engineered to find this. Was `services[]` even the right primitive for a contractor?

---

## 10. Risks to the PoC itself

| Risk | Likelihood | Mitigation |
|---|---|---|
| Tailwind doesn't see core classes — **fails silently** | **High** | Exact CSS block in Block 0 + grep smoke test before proceeding |
| `image()` can't live in a shared Zod object | **High** | Factory pattern, flagged in Block 2 |
| Block 1 overruns (OAuth, secrets, dashboards) | **High** | 4h budget, gate at H6, pre-flight checklist moves account setup outside the clock |
| Art direction rushed → sites look like siblings | **High** | Two taste checkpoints (H9 and H18), imagery funded as a first-class axis |
| Building the click-attribution Worker | Medium | **Cut.** It puts one custom service in front of 100% of conversion traffic at zero clients — against principle 8 and the "no premature platform" tripwire. If it's ever built: plain `wa.me` stays the real `href`, attribution is fire-and-forget alongside it. Never a mandatory redirect hop on a 3G phone. |
| Scope creep | **High** | §2 tripwire: write it in the friction log |
| AI generates architecture, not variation | Medium | `AGENTS.md` written first, in Block 0. Principle 4. |
| No editor available for Block 7 | Medium | Pre-flight checklist. Only irreplaceable input in the plan. |
| 24h becomes 40h | **High** | Blocks 6 and 7 are the designated cuts, in that order. Blocks 1, 3, 5 and 8 are not cuttable. |

**Honest note on the budget.** An adversarial review put the *uncut* version of this plan at 34–40 hours. It fits 24 only because of specific cuts: no form endpoint, no click-attribution Worker, no Lighthouse CI gate (run it manually once), eight components instead of ten, and all account setup pushed to pre-flight. If it runs long, cut Block 6 (signature moments) before Block 5 (art direction) — **ops and bespoke sections can be documented; taste cannot be deferred.**

---

## 11. Correcting one thing from the research

`wa.me` links use the full international number with **no `+` and no leading zero** (`08123…` → `628123…`) — dropping the zero is the most common mistake. But a link to a number without WhatsApp does **not** fail silently; it shows *"Phone number shared via url is invalid."* It fails *unhelpfully*, which is worse for a client who will assume the website is broken. Verify every client number on a real phone at onboarding — and put that step in `OPERATIONS.md`.

Two other ops details for the runbook: Cloudflare Web Analytics' 10-site soft cap applies to hostnames **not proxied through Cloudflare** — moving each client's zone into Cloudflare removes the limit, which changes the mitigation from "email support" to "standard onboarding step." And Astro 6 needs **Node 22.12+**; pin it in Actions or the first deploy fails confusingly.

---

## 12. What happens after

If the PoC passes, it is **not** the system. It is evidence that the shape is right. §9 is unambiguous: the system is extracted from **three real paying sites**, not from a PoC.

The correct next move is to sell and ship site 1 on this stack — deliberately similar, copying components out of the spike and editing them freely, building no library — and let `FINDINGS.md` become the first entry in the content contract's version history.

The most valuable artifact this PoC produces is the friction log, not the code.

---

*Research verified 8 Aug 2026. Re-check before committing money: Cloudflare free-tier commercial-use permission (permitted by absence of prohibition, not explicit grant — pay the $5/mo); Tailwind Plus's "component library" clause; Cloudflare zones-per-free-account limit; keystatic.cloud availability.*
