---
status: active
authority: operations
owner: ai-maintained; founder-approved for material policy changes
purpose: Route every contributor to the smallest authoritative context and define how work is performed.
answers:
  - Which context an agent must load for a task
  - How authority, conflicts, approvals, documentation, and handoff work
does_not_answer:
  - Product direction, current product scope, system design, or release thresholds
authoritative_inputs:
  - Explicit founder-approved operating decisions
  - The active documentation authority model
update_triggers:
  - A change to agent workflow, context routing, approval boundaries, or documentation governance
last_reviewed: 2026-08-09
---

# Agent Operating Contract

## Project

Web Production Engine is a human-directed production system for turning a truthful business brief into a distinctive, effective, owned, and maintainable marketing website. It begins with Indonesian SMBs and aims to combine professional judgment, repeatable production, and AI leverage without treating a generated page or live URL as a complete product.

## First actions in every session

1. Read this file.
2. Read [docs/STATE.md](docs/STATE.md) before planning or changing the project.
3. Load only the additional context named in the table below.
4. Inspect the relevant implementation, schema, tests, and recent changes before editing them.
5. Report any conflict between sources before continuing.

Do not read all documentation by default.

## Active documentation set

| File | Governing question | Load when |
| --- | --- | --- |
| [docs/VISION.md](docs/VISION.md) | Why does the product exist, and what must endure? | Product direction, principles, boundaries, or strategy |
| [docs/PRODUCT.md](docs/PRODUCT.md) | What product are we building now? | Scope, user, capability, or product behavior |
| [docs/SYSTEM.md](docs/SYSTEM.md) | How does the engine work end to end? | Architecture, workflow, artifacts, agents, approvals, or recovery |
| [docs/QUALITY.md](docs/QUALITY.md) | What evidence makes a site releasable? | Implementation, QA, release, or quality trade-offs |
| [docs/STATE.md](docs/STATE.md) | What is true now, and what comes next? | Every planning or continuation task |
| [docs/DECISIONS.md](docs/DECISIONS.md) | Why was a consequential choice made? | Reconsidering or changing an established choice |

`README.md` is navigation only and must contain no unique rule.

## Authority and conflict rules

Within repository documentation, use this order:

1. `VISION.md`
2. `PRODUCT.md`
3. `SYSTEM.md`
4. `QUALITY.md`
5. Active entries in `DECISIONS.md`, within the authority above
6. `STATE.md` for current facts and priorities, not enduring policy
7. Milestone plans, task plans, and generated run evidence

Additional rules:

- The founder's explicit current instruction outranks repository documents, but the resulting change must be recorded in the appropriate authoritative file.
- A `draft` document is not authoritative. It may be used as source material only.
- Archived concepts, superseded plans, chats, and issue descriptions are sources, not policy.
- Code, schemas, configuration, and tests are authoritative evidence of implemented behavior. They do not silently override product intent, scope, or quality obligations.
- When two active sources conflict, stop, name the conflict, recommend which authority should change, and do not invent a compromise.

## Context loading by task

| Task | Required context after this file |
| --- | --- |
| Continue or plan work | `STATE.md` |
| Change vision, principles, or boundaries | `VISION.md`, `PRODUCT.md`, relevant decisions |
| Change product scope or behavior | `PRODUCT.md`, relevant parts of `VISION.md`, `STATE.md`, relevant decisions |
| Change architecture or pipeline | `SYSTEM.md`, `PRODUCT.md`, `STATE.md`, relevant decisions and implementation |
| Implement a website capability | Relevant `SYSTEM.md` sections, `QUALITY.md`, implementation, schemas, and tests |
| QA or release | `QUALITY.md`, relevant `SYSTEM.md` sections, current run evidence |
| Revisit an established choice | Search `DECISIONS.md`, then load the governing document |
| Update progress | Evidence from the work, then `STATE.md` |

## Non-negotiable operating rules

- Separate verified facts, client-supplied claims, assumptions, recommendations, and approvals.
- Never invent business facts, evidence, customer proof, access, test results, or implementation state.
- Use AI for interpretation and production; use deterministic schemas, generators, permissions, and tests where correctness matters.
- Use one authoritative home for each rule or decision. Link instead of copying.
- Treat plans as proposals until their decisions enter an authoritative document.
- Prefer the smallest reversible change that satisfies the active specification.
- Preserve user work and unrelated changes. Do not make destructive changes without explicit authorization.
- Never expose or commit secrets. Use least privilege for external systems.
- Attach evidence to completion claims. If evidence is unavailable, say what remains unverified.
- Update affected documentation in the same change as a material decision or implementation change.
- Keep `STATE.md` current and compact; replace stale facts rather than appending history.
- Add to `DECISIONS.md` only when forgetting the rationale would cause risk or repeated debate.

## Human approval boundaries

An accountable human must approve any action that materially changes:

- what the business claims or promises;
- product scope, enduring principles, or client commitments;
- approved strategy or visual direction;
- production publication, rollback with user impact, domains, or ownership;
- access, spending, legal obligations, privacy posture, or difficult-to-reverse external state.

Agents may prepare recommendations and reversible drafts without approval. Approval must identify the artifact or revision being approved.

## Documentation writing standard

- Every major document must declare: status, authority, owner, purpose, answers, does not answer, authoritative inputs, update triggers, and last review date.
- Use `MUST` for invariants and release requirements, `SHOULD` for defaults with allowed exceptions, and `MAY` for optional behavior.
- Label unsettled matters as assumptions or open questions, never as facts.
- Prefer concrete outcomes, thresholds, and examples over adjectives such as “modern,” “premium,” or “high quality.”
- Keep one primary question per document and remove duplicated history.
- Create a new document only when its subject has an independent lifecycle or cannot be expressed more reliably in code, schemas, tests, or an existing authority.

Soft ceilings: `AGENTS.md` 150 lines, `VISION.md` 250, `PRODUCT.md` 300, `SYSTEM.md` 500, `QUALITY.md` 400, and `STATE.md` 100. Compress before splitting.

## Implementation commands

No build, validation, test, preview, or release command has been verified in the available workspace. Do not invent commands. Add commands here only after they run successfully in the actual repository.

## Completion and handoff

Before claiming a task is complete:

1. Run the relevant verified checks, or state why they could not run.
2. Review coverage, document boundaries, upstream consistency, and actionability.
3. Update `STATE.md` when current reality, blockers, or priorities changed.
4. Append a decision only when the rationale is consequential and durable.
5. Report the outcome, evidence, files changed, limitations, and next recommended action.

If work stops incomplete, leave a concise handoff in `STATE.md`: last trusted result, current blocker, and exact next action. The repository, not chat history, carries continuity.
