---
status: draft
authority: quality
owner: founder for promises and exceptions; ai-maintained for evidence and thresholds
purpose: Define the outcomes, rules, measurable criteria, evidence, and blocking failures required to release and hand over a website.
answers:
  - What good and complete mean across every product layer
  - What must be proven before preview, production, and handover
does_not_answer:
  - Why the product exists or which projects it supports
  - How the pipeline implements checks or stores run state
  - Tool-specific configuration already defined by code or schemas
authoritative_inputs:
  - PRODUCT.md and SYSTEM.md after they become active
  - Relevant principles from VISION.md
  - Verified benchmark and test evidence
update_triggers:
  - A quality promise, release criterion, blocking condition, evidence method, or exception policy changes
last_reviewed: 2026-08-09
---

# Unified Quality and Release Standard

> Session status: structure established in Session 0. Content will be operationalized after `PRODUCT.md` and `SYSTEM.md` are active. This draft is not yet authoritative.

## 1. Quality model

Define quality as a balanced, evidence-backed set of outcomes rather than a self-awarded label or a single score.

## 2. Normative language and gate policy

Define `MUST`, `SHOULD`, and `MAY`; preview, production, and handover gates; severity; blocking rules; ownership; and the exception process.

## 3. Quality matrix contract

Each area below must define exactly five fields in Session 4:

1. Required outcome.
2. Non-negotiable rules.
3. Measurable acceptance criteria.
4. Required evidence.
5. Blocking failure conditions.

| Group | Quality area |
| --- | --- |
| Business and experience | Strategy |
| Business and experience | Content and conversion |
| Business and experience | Information architecture and UX |
| Business and experience | Visual design |
| Website system | Content model and CMS |
| Website system | SEO and discovery |
| Website system | Code engineering |
| Website system | Data |
| Website system | Integrations |
| Website system | Assets and media |
| Assurance and operation | Infrastructure and performance |
| Assurance and operation | Security, privacy, and compliance |
| Assurance and operation | Accessibility and compatibility |
| Assurance and operation | Measurement and experimentation |
| Assurance and operation | Operations and ownership |
| Assurance and operation | Quality assurance |
| Production engine | Orchestration and governance |

## 4. Cross-cutting definitions

Define terms such as truthful, conversion-ready, distinctive, responsive, accessible, performant, secure, owned, maintainable, complete, and high-converting. Claims requiring post-launch evidence must be distinguished from pre-launch readiness.

## 5. Evidence model

Define accepted automated tests, human review, screenshots, approvals, provenance records, operational exercises, and post-launch measurements. Evidence must identify the artifact revision and environment tested.

## 6. Release-blocking defects

Define universal blockers and severity rules, including broken critical journeys, unsupported claims, missing ownership, security findings, inaccessible primary actions, CMS drift, failed builds, and absent rollback.

## 7. Exceptions and risk acceptance

Define who may accept an exception, required rationale, affected users, mitigation, expiry, and follow-up. No agent may waive a blocking requirement.

## 8. Definition of done and handover evidence

Define the complete evidence bundle required before the project is called finished, including an actual edit-through-CMS-to-deployment exercise and ownership verification.

## 9. Benchmarks, regression, and improvement

Define how reference sites, golden briefs, diverse pilot sites, field data, and prior failures improve standards without turning one aesthetic or client pattern into a universal template.

## Drafting acceptance check

Session 4 is complete when every aspiration has an observable criterion or an explicitly documented judgment method, every criterion names evidence, every blocker has an owner, and the standard can reject a polished but incomplete website.
