Read CONTRACTS.md in full. Read PoC-Plan.md section 5 and section 6 Block 2.
Read FRICTION.md. Confirm in your first sentence.

## Goal of this phase

Define the content shape once, share it between both sites, fill both sites
with content that feels real, and write CMS field labels a Jakarta clinic
owner could answer without phoning us.

The field labels are not polish. "Update it without calling anyone" is the
product promise, and it is kept or broken here.

## Tasks

1. Create packages/core/content-schema.spike.ts.

   Two things that WILL bite you — handle them deliberately:

   a) Import Zod from "astro/zod", NOT from "astro:content" or "astro:schema".
      Astro 6 uses Zod 4, and astro:content does not resolve outside an
      Astro build context.

   b) Astro's image() helper is INJECTED INTO the schema function. A plain
      exported Zod object therefore CANNOT contain an image field — and
      every collection here has one. Export a FACTORY:

        export const makeSchemas = ({ image }) => ({ services: z.object({...}), ... })

      Each site keeps its own src/content.config.ts with its own glob()
      loader and base path. Only the Zod shapes travel between sites.

   If either of these does not work as described, do not invent an
   alternative — read the installed Astro types and report what you found.

2. Collections (this is the complete list — do not add to it):
   - site.yml     : name, tagline, logo, address, hours, phone, socials,
                    contact block, seo defaults (title template, description,
                    og image)
   - home.md      : hero fields + per-section intro copy
   - about.md
   - services/*.md      : title, summary, body, image, order
   - testimonials/*.md  : quote, name, role, company, photo
   - faq/*.md           : question, answer

   Deliberately absent, and they stay absent: team, projects, client logos,
   posts, pricing, multiple locations, certifications. Both sites will want
   some of these. They do not get them. Log the want in FRICTION.md.

3. Fill BOTH sites with real content: 5-6 services, 3 testimonials, 6 FAQ,
   an about page. Write good Indonesian copy that a real clinic and a real
   steel fabricator would plausibly publish. Placeholder copy makes design
   judgment impossible two phases from now, so this matters more than it
   looks.

4. Rewrite .pages.yml with full field definitions. Every label and
   description in Bahasa Indonesia, in the vocabulary of a business owner.

   Wrong: "whatsapp_default_message"
   Right: label "Pesan otomatis WhatsApp"
          description "Teks yang muncul otomatis saat pelanggan klik tombol
          WhatsApp di website Anda"

   Also set media.extensions and add a size hint in the description asking
   the editor to resize before uploading.

## Do NOT

- Do not build components. That is Phase 4.
- Do not add fields beyond the list in task 2, even if the content you are
  writing wants one. Write the want in FRICTION.md instead.
- Do not add a sections/order/layout field anywhere.

## Self-eval

E2.1  pnpm -r build exits 0 with all collections validating.

E2.2  Schema is genuinely shared:
        grep -rn "content-schema.spike" sites/*/src/
      Expect: both sites import it.

E2.3  image() works through the factory. Paste the built <img> or <picture>
      output for one service card on each site.

E2.4  No layout fields:
        grep -rnE "^(sections|layout|order|template):" sites/*/content
        grep -nE "sections|layout|blocks" .pages.yml
      Expect: nothing.

E2.5  Every .pages.yml field has a Bahasa Indonesia label AND description.
      Output a table: field name | label | description. Any row with an
      English label or an empty description is a FAIL.

E2.6  THE ONE-SITTING TEST — self-review, then hand to the human.
      For each field, answer in one line: "could a 55-year-old dentist who
      does not work in tech answer this in one sitting, without asking us
      what it means?" Mark YES or NO. List every NO.

E2.7  Content is not placeholder:
      Confirm no lorem ipsum, no "Service 1 / Service 2", no repeated copy
      between the two sites. Paste one service description from each site.

## Stop condition

If the shared-schema factory pattern does not work, STOP and report BLOCKED
with what you found in the Astro types. Do not fall back to duplicating the
schema in both sites without asking — that would quietly delete the thing
this phase exists to test.

Then produce the PHASE 2 REPORT.