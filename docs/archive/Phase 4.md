Read CONTRACTS.md in full. Read PoC-Plan.md section 6 Block 4. Read
FRICTION.md. Confirm in your first sentence.

## Goal of this phase

Build the remaining shared sections. One implementation each — no variants,
no options props, no configuration surface. If a section needs to look
different on the two sites, that must come from tokens and content, not from
a prop.

## Tasks

Build these, in this order. This is the complete list — eight total,
including the two you already have.

1. SiteHead        <- BUILD THIS FIRST, it is not optional
2. SiteHeader
3. Hero            (exists — refine)
4. ServicesGrid    (exists — refine)
5. Testimonials
6. FAQ
7. WhatsAppCTA
8. SiteFooter

### SiteHead is first and is the highest-value component here

It emits, all derived from site.yml:
  - title (via template), description, canonical
  - Open Graph + Twitter card
  - robots, and a sitemap
  - JSON-LD structured data: LocalBusiness, specialised as Dentist for
    senyum-sehat and GeneralContractor / HomeAndConstructionBusiness for
    baja-nusantara. Include address, geo, openingHours, telephone, url, logo.

For a Jakarta clinic and a Surabaya fabricator this is close to the highest-
value shared thing in the entire system. It is roughly 30 minutes of work and
it is the cleanest demonstration of "one improvement, many sites." It also
means the test editor in Phase 7 will actually touch the SEO fields, which is
how we learn whether they pass the one-sitting test.

### Rules while building

- Props are content-contract shapes. ServicesGrid receives services[]. It
  does not receive columns, variant, or theme.
- ZERO literal colours, hex values, or arbitrary sizes. Anywhere.
- Zero client JS unless genuinely impossible: FAQ uses <details>, mobile nav
  uses <details> or a checkbox. If you use JS, justify it in the report.
- Every image goes through <Picture> with widths/sizes/format set at the
  component level. Pages CMS commits whatever the editor uploads — assume a
  4MB phone JPEG is the real input.
- Accessibility: landmarks, heading order, visible focus, alt text, contrast.

### Keep a rebuild log

Every time you catch yourself writing something that is the second version of
an earlier thing, write it in FRICTION.md under "REBUILD LOG". That log is
the seed of the real component inventory and is a primary output of this PoC.

## Do NOT

- Do not build a ninth component.
- Do not add variant, size, or theme props to any component.
- Do not build a contact form, newsletter, cookie banner, or dark mode.
- Do not build team or projects sections — those are Phase 6, and they are
  site-local by design.

## Self-eval

E4.1  pnpm -r build exits 0. Both sites deploy.

E4.2  Literal-value check (run both, expect nothing):
        grep -rnE '(bg|text|border|ring|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}' packages/core
        grep -rnE '\[[0-9]+(px|rem|em|%)\]|\[#[0-9a-fA-F]' packages/core

E4.3  No configuration props:
        grep -rnE "(variant|size|theme|columns|layout)\s*[?:]" packages/core/components
      Expect: nothing. Any match means you built a variant system.

E4.4  JSON-LD is valid and correct. For each site, extract the ld+json block
      from dist and verify it parses:
        node -e "const fs=require('fs');const h=fs.readFileSync('sites/senyum-sehat/dist/index.html','utf8');const m=[...h.matchAll(/<script type=\"application\/ld\+json\">([\s\S]*?)<\/script>/g)];m.forEach(x=>console.log(JSON.stringify(JSON.parse(x[1]),null,2)))"
      Paste the output for both sites. Confirm @type differs between them.

E4.5  Client JS budget. Report the total JS bytes shipped per site:
        du -sh sites/*/dist/_astro/*.js 2>/dev/null || echo "no JS shipped"
      Target: zero. Justify any bytes.

E4.6  Images are responsive. Paste one <picture> element per site.

E4.7  Accessibility spot-check. For each site, state: number of <h1> (must be
      exactly 1), heading order violations, images missing alt, interactive
      elements without visible focus styles.

E4.8  Regression: core classes still in output CSS.
        grep -rl "bg-primary" sites/*/dist/

E4.9  Rebuild log has at least one honest entry, or state explicitly that
      nothing was rebuilt.

Then produce the PHASE 4 REPORT.