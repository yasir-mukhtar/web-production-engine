---
status: active
authority: decision-log
owner: ai-maintained; founder-approved where the governing subject requires it
purpose: Preserve consequential choices and their reasoning when forgetting them would create risk or repeated debate.
answers:
  - What was decided, why, and with what consequences
  - Which earlier decision an active choice supersedes
does_not_answer:
  - Current progress, detailed specifications, task history, or routine implementation choices
authoritative_inputs:
  - Explicit founder decisions
  - Resolutions made through the authority rules in AGENTS.md
update_triggers:
  - A consequential, durable, or difficult-to-reverse choice is accepted, changed, or superseded
last_reviewed: 2026-08-09
---

# Decision Log

This file is append-only. Correct wording errors in place, but supersede a changed decision with a new entry rather than rewriting history. Valid statuses are `Proposed`, `Active`, `Rejected`, and `Superseded`.

Record a decision only when its rationale is likely to matter later. Specifications belong in the governing document; task activity belongs in `STATE.md` or run evidence.

## D-001 — Use a lean seven-document authority model

**Status:** Active  
**Date:** 2026-08-09  
**Governing area:** Documentation operations

### Decision

Maintain seven active documents: `AGENTS.md`, `VISION.md`, `PRODUCT.md`, `SYSTEM.md`, `QUALITY.md`, `STATE.md`, and `DECISIONS.md`. `README.md` is navigation only. Keep the 17 product layers as a coverage model inside `QUALITY.md`, not as 17 separate specifications.

### Why

The project needs durable context for long AI-assisted sessions, but a large document tree would create retrieval mistakes, duplicated rules, conflicts, and founder maintenance burden.

### Consequences

- Every subject has one authoritative home.
- New documents require an independent lifecycle or a strong reason they cannot live in code, schemas, tests, or an existing authority.
- A major document may be extracted later only after navigation or lifecycle evidence justifies it.

### Supersedes

The earlier proposal for a broad multi-directory documentation repository.

## D-002 — Write the baseline through focused sessions and a fresh audit

**Status:** Active  
**Date:** 2026-08-09  
**Governing area:** Documentation workflow

### Decision

Use a staged hybrid workflow: establish contracts and skeletons in Session 0; draft `VISION.md`, `PRODUCT.md`, `SYSTEM.md`, and `QUALITY.md` in separate focused sessions; then run a fresh cross-document audit and founder decision review.

### Why

One enormous session creates context competition and draft residue. Fully isolated sessions risk inconsistent assumptions. A shared contract plus bounded context packs preserves both continuity and focus.

### Consequences

- Each major document is drafted only after its upstream authority is active.
- Each writing session performs draft, adversarial review, compression, and boundary checks.
- The integration audit reads all active documents and reports contradictions before editing.

### Supersedes

No prior recorded decision.

## D-003 — Put executable precision in executable sources

**Status:** Active  
**Date:** 2026-08-09  
**Governing area:** Sources of truth

### Decision

Keep product intent, system relationships, authority, and quality obligations in documents. Put exact data shapes in schemas, implemented behavior in code and configuration, and verification in tests. Prose links to these sources instead of duplicating them.

### Why

Implementation prose decays when it competes with executable behavior. Agents need one precise source for structures and checks.

### Consequences

- The future design system is primarily tokens, components, patterns, examples, and visual tests, governed by concise rules in `QUALITY.md`.
- CMS fields and run artifacts belong in machine-readable schemas.
- Tests prove thresholds described by `QUALITY.md`; they do not redefine product promises silently.

### Supersedes

No prior recorded decision.

## Entry template

```markdown
## D-NNN — Decision title

**Status:** Proposed | Active | Rejected | Superseded  
**Date:** YYYY-MM-DD  
**Governing area:** Foundation | Product | System | Quality | Operations

### Decision

### Why

### Consequences

### Supersedes
```
