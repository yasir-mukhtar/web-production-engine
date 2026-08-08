Read CONTRACTS.md in full. Read PoC-Plan.md section 6, Block 1. Confirm in
your first sentence.

## Goal of this phase

Prove all four contracts connect, end to end, at the thinnest possible depth:
one component, one content field, two live URLs, one browser edit that
reaches production.

This phase is mostly integration and configuration, not code. Getting a
beautiful hero is worthless; getting a mediocre hero that a non-technical
person edited in a browser and watched deploy is the whole point.

## Tasks

1. Replace SmokeTest.astro with packages/core/components/Hero.astro.
   Props: { headline, subheadline, image, ctaLabel, whatsappHref }.
   Semantic tokens only. No literal values.

2. Create content in each site at sites/<site>/content/:
   - site.yml   — business name, tagline, and a contact block:
                    contact:
                      whatsapp_number: "628..."      # E.164, no +, no leading 0
                      whatsapp_default_message: "..."
   - home.md    — hero headline, subheadline, cta_label
   Write real Indonesian copy appropriate to each business. No lorem ipsum.

3. Wire each site's src/pages/index.astro to read that content and render
   Hero. Section ORDER lives here, in code — never in content.

4. Build the WhatsApp href as:
     https://wa.me/<digits>?text=<urlencoded message>
   Digits only. No +. No leading zero: 08123... becomes 628123...
   URL-encode the message properly.

5. Create .github/workflows/deploy.yml:
   - Node 22.12+
   - pnpm install, pnpm -r build
   - matrix over the two sites
   - deploy each with wrangler to Cloudflare Workers Static Assets
   - IMPORTANT: add path filtering (dorny/paths-filter or equivalent) so a
     change to one site does not rebuild the other, but a change to
     packages/core rebuilds both. This is required now, not later — the
     canary-first fan-out test in Phase 8 depends on it existing.

6. Create .pages.yml at the repo root with:
   - one content collection per site, pointing at sites/<site>/content
   - SEPARATE media configs per site with distinct input/output paths
     (Pages CMS supports an array of named media sources — use it, or both
     clients' uploads land in one shared folder)
   - Field labels in Bahasa Indonesia, in business language

7. Report the exact manual steps the human must perform in the Cloudflare
   and Pages CMS dashboards. Be specific — name the screens and fields.

## Do NOT

- Do not build a second component.
- Do not add a contact form.
- Do not add analytics, sitemap, robots.txt, or SEO tags yet.
- Do not style beyond what makes the hero legible.

## Self-eval

E1.1  pnpm -r build exits 0.

E1.2  WhatsApp href format is correct:
        grep -rn "wa.me" packages/core sites/*/src
      Verify by eye: no "+", no leading zero after the country code, message
      is URL-encoded. State the exact rendered href for both sites.

E1.3  No layout in content — this must return NOTHING:
        grep -rnE "^(sections|layout|order|template):" sites/*/content
        grep -nE "(sections|layout|blocks)" .pages.yml
      If either matches, you have started building a page builder. Remove it.

E1.4  Path filtering works. Show the workflow logic and explain in two
      sentences what happens when (a) sites/senyum-sehat/content changes,
      (b) packages/core changes.

E1.5  .pages.yml has separate media input/output per site. Paste the media
      section.

E1.6  Core classes still reach output CSS (regression check on Phase 0):
        grep -rl "bg-primary" sites/*/dist/

## Stop condition

If the deploy or the CMS connection cannot be made to work, STOP and report
BLOCKED. Specifically: if Pages CMS and the monorepo layout conflict, do NOT
restructure the repo to fix it. Report the conflict and stop — the human has
a documented fallback (drop to one site for the CMS test) and that decision
is theirs.

Then produce the PHASE 1 REPORT.