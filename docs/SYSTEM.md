---
status: draft
authority: system
owner: ai-maintained; founder-approved for material risk or operating-model changes
purpose: Define how Web Production Engine reliably produces, verifies, publishes, transfers, and resumes a supported website project.
answers:
  - System boundaries, architecture, workflow, states, artifacts, roles, approvals, and recovery
  - How the content model, CMS, implementation, quality gates, deployment, and handover connect
does_not_answer:
  - Why the product exists or which customers and capabilities are committed
  - Exact schema syntax or implementation details already defined by code
  - The complete release-quality matrix
authoritative_inputs:
  - PRODUCT.md after it becomes active
  - Relevant principles from VISION.md
  - Active technical and operating entries in DECISIONS.md
  - ../Web-Production-Engine-End-to-End-Plan.md as non-authoritative source material
update_triggers:
  - A change to architecture, workflow, artifact ownership, agent authority, approval, recovery, deployment, or handover
last_reviewed: 2026-08-09
---

# System Specification

> Session status: structure established in Session 0. Content will be drafted only after the current product definition is active. This draft is not yet authoritative.

## 1. Executive system model

Describe the control, production, assurance, and ownership parts of the engine and their boundaries.

## 2. System context and repository boundaries

Define engine-owned, client-owned, and third-party systems; trust boundaries; sources of truth; and separation between engine and client repositories.

## 3. End-to-end production workflow

Define stages from intake through operation, their dependencies, entry conditions, outputs, and exit conditions.

## 4. Run state machine

Define allowed states and transitions, approval, retry, cancellation, supersession, rollback, failure, and resume behavior.

## 5. Artifact contracts and sources of truth

For each authoritative artifact, define purpose, producer, consumer, owner, validator, versioning, and change policy. Put exact data shapes in schemas.

## 6. Agent operating model

Define bounded roles, required context, read/write authority, structured outputs, uncertainty handling, retry limits, escalation, and completion evidence.

## 7. Human decisions and approval gates

Define the decision, artifact revision, evidence, approver, consequences, expiry, and invalidation rules for each gate.

## 8. Canonical content model and CMS contract

Define how one content model drives content, routes, types, validation, and CMS configuration; distinguish editor-owned content from engine-owned composition; specify the round-trip test.

## 9. Design and implementation production

Define how approved strategy, content, art direction, patterns, assets, and build plans become a client-specific site without silent template convergence.

## 10. Assurance and release integration

Define how `QUALITY.md` gates run state, how evidence is collected, who may accept exceptions, and what is required before preview and production.

## 11. Failure recovery, idempotency, and change handling

Define trusted checkpoints, artifact hashes, safe reruns, stale approval detection, partial failure, bounded retries, revision classes, and rollback.

## 12. Security, privacy, access, and secrets boundaries

Define least privilege, secret handling, account ownership, data minimization, external-write authority, and auditability at system level.

## 13. Environments, deployment, operation, and handover

Define preview and production separation, deploy authority, domains, observability, backups, incident paths, ownership transfer, maintenance, and exit.

## 14. Cost, performance, and operational limits

Define budgets and controls that protect sustainable delivery without duplicating website release thresholds.

## 15. Permitted variation and extension rules

Define what is configurable per client, what requires a reusable engine extension, and what falls outside the product.

## Drafting acceptance check

Session 3 is complete when every stage has an owner and trusted output, every consequential action has authority, a failed run has an explicit recovery path, dependent artifacts cannot silently drift, and exact formats are routed to schemas rather than duplicated in prose.
