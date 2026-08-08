Read CONTRACTS.md in full before doing anything. Read PoC-Plan.md sections 3
and 6 for context. Confirm you have read both in your first sentence.

## Goal of this phase

Get a pnpm workspace building, and PROVE that Tailwind v4 can see classes
that live inside a workspace package. Nothing else.

This is the highest-risk hour of the project. Tailwind v4 does not scan
workspace dependencies by default. When it fails, there is no error message —
the classes are simply absent from the output CSS and the site renders
unstyled-but-plausible. Everything downstream silently breaks. Prove it works
before you write a second component.

## Tasks

1. Initialise a pnpm workspace at the repo root with:
   - packages/core
   - sites/senyum-sehat
   - sites/baja-nusantara

2. Scaffold both sites with Astro 6.4.x, minimal template, TypeScript strict,
   static output, NO adapter. Pin Node 22.12+ in package.json engines.

3. Install Tailwind CSS v4.3.x in both sites via the Vite plugin.

4. Create packages/core/tokens.base.css defining token NAMES inside @theme.
   Minimum for now:
     --color-primary, --color-surface, --color-ink, --font-display, --font-body
   These must be inside @theme, not :root. A plain :root custom property
   creates the variable but generates NO utility class, which silently
   voids the entire premise of this repo.

5. Create sites/<site>/src/styles/global.css in each site with EXACTLY this
   structure and order. Three of these four lines are load-bearing:

     @import "tailwindcss";
     @import "../../../../packages/core/tokens.base.css";
     @import "./tokens.css";
     @source "../../../../packages/core";

   Notes you must respect:
   - @import must precede all other rules. @source comes after the imports.
   - Paths are relative to THIS stylesheet. Count the directory levels
     yourself and verify — from sites/<site>/src/styles/ the repo root is
     four levels up, not three. Do not assume.
   - tokens.css (per-site values) must be imported AFTER tokens.base.css
     (shared names) so it overrides.

6. Create sites/<site>/src/styles/tokens.css in each site, each with an
   @theme block setting deliberately clashing values:
   - senyum-sehat: warm teal primary, light surface, a humanist sans
   - baja-nusantara: safety orange primary, near-black surface, a condensed
     display face

7. Create packages/core/components/SmokeTest.astro — a single div using
   class="bg-primary text-surface font-display". Import and render it on
   both sites' index page. This class combination must appear NOWHERE else
   in the repo.

## Do NOT

- Do not build any real component.
- Do not write any content.
- Do not set up CI, deploy, or the CMS.
- Do not add any dependency not listed above.
- Do not "improve" the CSS structure. The order in task 5 is deliberate.

## Self-eval — run every command, paste the real output

E0.1  Both sites build:
        pnpm -r build
      Expect: exit 0, no warnings about missing content sources.

E0.2  THE CRITICAL CHECK — core classes reached the output CSS:
        grep -rl "bg-primary" sites/senyum-sehat/dist/
        grep -rl "bg-primary" sites/baja-nusantara/dist/
      Expect: at least one .css file path from each.
      If EMPTY: the @source path is wrong. Fix the path depth and rebuild.
      Do NOT proceed to Phase 1 until this passes. Do not work around it by
      adding the class to a site file — that defeats the entire test.

E0.3  Token VALUES differ between the two built sites:
        grep -rh "\-\-color-primary:" sites/*/dist/**/*.css
      Expect: two different values.

E0.4  No literal colours in core:
        grep -rnE '(bg|text|border|ring|fill|stroke)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-[0-9]{2,3}' packages/core
      Expect: no matches.

E0.5  No arbitrary values in core:
        grep -rnE '\[[0-9]+(px|rem|em|%)\]|\[#[0-9a-fA-F]' packages/core
      Expect: no matches.

E0.6  Node version pinned:
        grep -rn '"node"' package.json sites/*/package.json
      Expect: 22.12 or higher.

## Stop condition

If E0.2 fails after three genuine attempts at fixing the @source path, STOP
and report BLOCKED with the exact paths you tried and the directory tree.
Do not invent a workaround.

Then produce the PHASE 0 REPORT in the format specified in CONTRACTS.md.