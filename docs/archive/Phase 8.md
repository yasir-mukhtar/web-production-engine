Read CONTRACTS.md in full. Read PoC-Plan.md section 6 Block 8 and section 8.
Read FRICTION.md in full. Confirm in your first sentence.

## Goal of this phase

Measure the two things the entire business model rests on, then write the
findings document that is the real output of this PoC.

Everything before this phase built an instrument. This phase takes the
readings.

## Task 1 — Marginal cost of site N+1 (~30 min)

Start a timer. Report the elapsed minutes at each step.

Scaffold a THIRD site, sites/kopi-tiga, from the core:
  - copy a site folder
  - write a new tokens.css (a small-batch coffee roaster in Bandung —
    a third direction, not a blend of the other two)
  - paste in content
  - deploy

Report total wall-clock minutes. This is the number behind "client 30 costs
the same as client 1" and behind the ability to build a real homepage for a
real prospect DURING a sales conversation. Nothing else in this PoC tests it.

Do NOT modify packages/core to make this easier. If you need to, that is the
finding — report it and stop the timer.

## Task 2 — Fan-out of a CONTRACT change (~45 min)

Not a code tweak — a schema migration, which is the hard case and the one
that predicts real portfolio maintenance cost.

Start a timer.
  1. Add one required field to the services collection:
     `durasi_estimasi` (estimated duration) — a short string.
  2. Update packages/core/content-schema.spike.ts.
  3. Migrate the Markdown in ALL THREE sites.
  4. Update .pages.yml (both projects).
  5. Render it in ServicesGrid.
  6. Commit. Deploy the CANARY site only. Inspect it.
  7. Then deploy the remaining two.

Report wall-clock minutes from first commit to all three sites live, and
report the canary-only step separately.

## Task 3 — Final measurements

Run and paste output for all of these:
  - node scripts/drift.mjs
  - Lighthouse mobile on all three deployed sites (performance, a11y, SEO,
    best practices). Use PageSpeed Insights API or Lighthouse CLI.
  - the literal-value and variant-prop greps from E4.2 and E4.3
  - total JS bytes per site

## Task 4 — Write FINDINGS.md

Structure it exactly like this:

  # FINDINGS

  ## Read this first
  The code in this repo is EVIDENCE, NOT INVENTORY. Site 1 (the first paying
  client) is built by copying components out of this repo and editing them
  freely. The shared core is re-extracted only after site 3, per the vision's
  Phase 0. Nothing here is versioned. Nothing here is a commitment.

  ## The numbers
  <table against every success criterion in PoC-Plan.md section 8, with the
  measured value and PASS/FAIL. Include the editor-test results the human
  gave you, labelled "first-run learnability, n=1" — NOT as a support-ticket
  projection.>

  ## Friction log
  <every entry from FRICTION.md, grouped by which contract it stressed>

  ## Rebuild log
  <components built twice — the seed of the real component inventory>

  ## Field-change log
  <how much the content schema moved between site A, site B, and site C.
  Express as a percentage of fields added/changed/removed. The vision's
  Phase 0 exit is <20% churn across three real clients — this is an early
  read against three FICTIONAL ones, and must be labelled as such.>

  ## Editor questions, verbatim
  <every question, unedited>

  ## Answers to the open questions
  A. Monorepo vs per-client repo — what did Phase 7 actually cost?
  B. Does section composition need to be data-driven — how tedious was it
     at three sites? (Log the friction. Do NOT recommend building a
     sections[] array — that is one step from a page builder.)
  C. How much of the 10% signature-moment budget did a real site consume?
  D. Where did the content schema genuinely break? Was services[] even the
     right primitive for a contractor?

  ## What I would tell the person building site 1
  <your honest assessment, five bullets maximum, no hedging>

## Do NOT

- Do not fix problems you find while measuring. Record them. A PoC that
  reports "drift was 14%" is more valuable than one that quietly refactored
  until it was 9%.
- Do not round timings in your favour.
- Do not recommend building anything. FINDINGS.md reports; it does not plan.

## Self-eval

E8.1  All three timings are real wall-clock, reported to the minute.
E8.2  Every success criterion in PoC-Plan.md section 8 has a measured value
      and a PASS/FAIL. No blanks, no "approximately".
E8.3  FINDINGS.md contains the "evidence, not inventory" clause at the top.
E8.4  Every open question A-D has an answer grounded in something that
      actually happened, not in reasoning.
E8.5  packages/core was NOT modified during Task 1:
        git diff --stat <task-1-start> <task-1-end> -- packages/core
      Expect: no changes. Any change is a finding, and a significant one.

Then produce the PHASE 8 REPORT.