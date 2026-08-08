Read CONTRACTS.md in full. Read PoC-Plan.md section 6 Block 6. Read
FRICTION.md. Confirm in your first sentence.

## Goal of this phase

Give each site exactly ONE bespoke thing that does not exist in the shared
core — built inside the Token and Component Contracts, quarantined in
site-local, and measured.

This tests the quarantine rule and the drift metric on day one rather than in
month six. It is also the deliberate answer to the fact that both sites want
a collection the shared schema refuses to give them.

## Tasks

1. sites/senyum-sehat/src/site-local/TimDokter.astro
   Practitioner cards with a soft scroll-triggered reveal and a
   WhatsApp-per-doctor CTA carrying that doctor's name in the prefilled
   message. Content lives in that site's content dir only — it does NOT
   enter the shared schema.

2. sites/baja-nusantara/src/site-local/Proyek.astro
   Horizontally-scrolling completed-project strip with a heavy overlay
   treatment. Same rule: site-local content only.

3. Both MUST use the shared tokens. They may be new; they may not be
   structurally foreign. No new colour values, no new type scale.

4. Create scripts/drift.mjs that reports, per site, the percentage of source
   lines living under src/site-local/ versus that site's total src lines.
   Output a simple table. Exit code 1 if any site exceeds 10%.

5. Wire drift.mjs into the GitHub Actions workflow so the number is never a
   surprise.

## Do NOT

- Do not build more than one signature moment per site.
- Do not promote team[] or projects[] into packages/core or the shared
  schema. That is the point of this phase.
- Do not add these to .pages.yml as shared fields.

## Self-eval

E6.1  Build passes, both sites deploy.

E6.2  Drift metric:
        node scripts/drift.mjs
      Paste the table. Both sites must be under 10%. If either exceeds it,
      report the number honestly — do not shrink the component to game it.

E6.3  Quarantine is real:
        grep -rn "site-local" packages/core
      Expect: nothing. Core must not know site-local exists.

E6.4  Shared tokens only:
        grep -rnE '\[[0-9]+(px|rem|em|%)\]|\[#[0-9a-fA-F]|#[0-9a-fA-F]{3,8}' sites/*/src/site-local
      Expect: nothing.

E6.5  Schema is uncontaminated:
        grep -rniE "(team|dokter|proyek|project)" packages/core/content-schema.spike.ts .pages.yml
      Expect: nothing.

E6.6  If either signature moment uses client JS, state the byte cost and
      justify it. Scroll reveal should be CSS or IntersectionObserver in a
      few lines, not a library.

E6.7  Self-assess: "is this the thing someone would remember about this
      site, or is it decoration?" A signature moment nobody notices is 10%
      drift bought for nothing.

Then produce the PHASE 6 REPORT.