Read CONTRACTS.md in full. Read PoC-Plan.md section 6 Block 5 and section 4.
Read FRICTION.md. Confirm in your first sentence.

## Goal of this phase

Make the two sites look like they came from two different agencies.

This is the highest-leverage work in the entire PoC and the most likely to be
rushed. The system's commercial failure mode is not bad sites — it is forty
technically excellent sites that all read as the same studio's template.

## Tasks

The vision names SIX axes that always vary. Tokens are one of them. Spend on
all six.

1. TOKEN VALUES — push both directions harder than feels comfortable.
   Type scale ratio, weight, tracking, line-height, radius, shadow, border
   width, motion duration and easing. Not just hue.

2. IMAGERY AND PHOTOGRAPHIC TREATMENT — this decides the stranger test more
   than colour does. Complete both sites' image sets (~12 each) and apply a
   consistent per-site grade via the imagery tokens:
   - senyum-sehat: bright, soft, warm-graded, human faces, generous crops
   - baja-nusantara: high-contrast, desaturated, duotone over safety-orange,
     no faces, tight aggressive crops

3. SECTION COMPOSITION AND ORDER — this is free differentiation that most
   studios forget. Change it in each site's src/pages/index.astro:
   - senyum-sehat leads with services and trust signals
   - baja-nusantara leads with proof-of-work and scale
   Same components. Different sequence. Different density.

4. COPY AND VOICE — the clinic reassures, the fabricator asserts. Different
   sentence length, different formality register. Revise the content.

5. Verify nothing in packages/core changed to accommodate either site.

## Do NOT

- Do not add components.
- Do not add site-local code (that is Phase 6).
- Do not add per-site props or conditionals to core components. If you need
  one, you have found a real gap — report it instead of building it.

## Self-eval

E5.1  Build passes, both sites deploy.

E5.2  Core is untouched by site-specific needs:
        git diff --stat <phase-4-commit> -- packages/core
      Explain every line that changed. Any change that exists to serve ONE
      site is a contract violation — revert it and report the gap.

E5.3  Literal-value and variant-prop checks from Phase 4 (E4.2, E4.3) still
      return nothing.

E5.4  Difference audit. Produce a table with one row per always-varies axis:
      | Axis | senyum-sehat | baja-nusantara | Genuinely different? |
      Axes: type, colour, spacing/density, radius+shadow, motion, imagery
      treatment, section order, copy voice.
      Any row marked "no" is unspent variation budget.

E5.5  Take a full-page screenshot of both sites at 390px width. Put them side
      by side. Describe what you see in three sentences, as a stranger would.

E5.6  Self-assess honestly: "could a stranger tell these share a codebase?"
      Answer YES or NO with reasons. A diplomatic answer here is worse than
      a harsh one.

Then produce the PHASE 5 REPORT.