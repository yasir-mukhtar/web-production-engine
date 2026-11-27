Read CONTRACTS.md in full. Read PoC-Plan.md section 4 (the two clients) and
section 6 Block 3. Read FRICTION.md. Confirm in your first sentence.

## Goal of this phase

Before we build eight components against an unproven token contract:
fully art-direct ONE hero and ONE section on both sites, to finished quality.

The purpose is to discover whether the token NAMES are sufficient to express
two genuinely different art directions. If they are not, we find out now for
one hour instead of at Phase 5 for six.

## Tasks

1. Extend packages/core/tokens.base.css with every token name you need to
   express both directions. Names only. Cover at minimum:
     colour roles, type scale, spacing scale, radius, shadow, border width,
     motion duration and easing, and — do not skip this — IMAGERY tokens:
     overlay colour, overlay opacity, image aspect ratios, grade/filter.

   Imagery treatment must be a token, not a per-image decision. It is the
   axis that decides the stranger test more than hue does.

2. Build packages/core/components/ServicesGrid.astro to finished quality.
   Semantic tokens only.

3. Set both sites' tokens.css to real, opposed values per the two directions
   in CONTRACTS.md. Real fonts, real colours, real radii, real easing.

4. Source or generate 3 real images per site, treated per that site's
   direction. Wire them through Astro's <Picture> with widths/sizes/format.

5. Render hero + ServicesGrid on both sites. Deploy both.

## Do NOT

- Do not build any other component.
- Do not touch the CMS config.
- Do not add site-local code yet.
- Do not compromise one site's direction to make a shared component easier.
  If a component cannot express both directions from tokens alone, that is
  the finding this phase exists to produce. Report it — do not paper over it.

## Self-eval

E3.1  pnpm -r build exits 0; both sites deploy.

E3.2  No literal colours or arbitrary values in core:
        grep -rnE '(bg|text|border|ring|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}' packages/core
        grep -rnE '\[[0-9]+(px|rem|em|%)\]|\[#[0-9a-fA-F]' packages/core
      Expect: nothing from either.

E3.3  Token diff is the whole visual difference. Output the full contents of
      both tokens.css files side by side. Then state explicitly: is there ANY
      visual difference between the two sites that is NOT expressed in these
      two files? If yes, name it — that is a gap in the Token Contract and
      the most important output of this phase.

E3.4  Imagery treatment is tokenised. Show the imagery tokens and how the
      component consumes them.

E3.5  Images are optimised. Paste the generated <picture> markup showing
      multiple widths and a modern format.

E3.6  Self-assess the stranger test, honestly: "would someone who has not
      seen the code believe these two sections come from the same agency?"
      Answer YES or NO and give three concrete reasons. Do not be
      diplomatic — a false NO here costs six hours later.

Then produce the PHASE 3 REPORT.