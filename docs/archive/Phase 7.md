Read CONTRACTS.md in full. Read PoC-Plan.md section 6 Block 7. Confirm in
your first sentence.

## Goal of this phase

Set up a VALID environment for measuring how a non-technical Indonesian
business owner copes with the CMS. Then stop — the test itself is run by a
human with a human subject, and you must not participate in it.

## Why the setup matters

Pages CMS grants access per REPOSITORY. In our monorepo, an editor invited to
edit the clinic can also see and edit the contractor's content, and the
sidebar shows ~12 flat entries spanning two unrelated businesses. That is a
client-confidentiality blocker, and more importantly it CONFOUNDS the
measurement: task time in a two-tenant 12-entry sidebar tells us nothing
about a real single-client repo.

## Tasks

1. Create a separate scratch repository containing ONLY:
   - sites/senyum-sehat/content/
   - a .pages.yml scoped to that one site
   - its own media config
   Push it. Connect it in Pages CMS as a second project.

2. Harden that .pages.yml for a real editor:
   - group related fields
   - order fields the way an owner thinks, not the way the schema is written
   - required-field validation
   - media upload paths and extension limits
   - every label and description in Bahasa Indonesia, business vocabulary
   - a preview URL if Pages CMS supports one for this setup

3. Write TEST-SCRIPT.md containing exactly these three tasks in Bahasa
   Indonesia, with NO instructions or hints beyond the task text:
     1. Ganti nomor WhatsApp klinik.
     2. Tambahkan satu layanan baru, lengkap dengan foto.
     3. Perbaiki typo di jawaban FAQ nomor 2.
   Include a blank results table: task | time | number of questions asked |
   questions verbatim.

4. Document in FRICTION.md what this split cost you and what it implies for
   the monorepo-vs-per-client-repo decision. That is real evidence for an
   open architectural question — write it properly.

## Do NOT

- Do not run the test yourself.
- Do not write instructions, a tutorial, a tooltip, or onboarding text for
  the editor. The absence of help IS the measurement.
- Do not simulate or predict what the editor will do.
- Do not change any component or content to make the test easier.

## Self-eval

E7.1  The scratch repo contains only one site's content. List its files.

E7.2  An editor in that repo cannot see the other client's content. Explain
      how you verified this.

E7.3  Every field has a Bahasa Indonesia label and description. Output the
      full table again: field | label | description.

E7.4  TEST-SCRIPT.md contains the three tasks and nothing that helps.

E7.5  The FRICTION.md entry on repo topology is written and specific.

Then produce the PHASE 7 REPORT and STOP. Do not begin Phase 8 until the
human has run the editor test and pasted the results back to you.