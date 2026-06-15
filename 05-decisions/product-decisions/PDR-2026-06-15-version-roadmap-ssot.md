---
type: product-decision
status: accepted
decision: narrow
created: 2026-06-15
updated: 2026-06-15
supersedes:
  - 05-decisions/product-decisions/PDR-2026-06-15-v2-sales-operating-wedge.md
canonical_artifacts:
  - agent.md
  - 02-roadmap/t-agent-roadmap.md
  - 02-roadmap/backlog/product-backlog.md
---

# PDR-2026-06-15: Version Roadmap SSOT

## Decision

`narrow`

Use `agent.md` as the project-level SSOT entry and `02-roadmap/t-agent-roadmap.md` as the detailed source of truth for t-agent V1/V2/V3/V4 version meaning.

## Why

The workspace had multiple overlapping route definitions:

- historical `idealization/5月/` materials;
- early V2 sales operating pilot docs;
- AI_DB_GPT `research/gather` route notes;
- AI_DB_GPT `inspiration` and accepted ChatReport ADRs;
- current t-agent PRD / contract / eval drafts.

Those materials are useful, but they mixed product stages. The immediate risk is that the team treats "sales operating report pilot", "platform capability iteration", "ChatReport MVP", and "enterprise core service" as the same version.

## New Version Boundary

| Version | Accepted Meaning |
|---|---|
| V1 | Historical baseline / dual-entry MVP proof. |
| V2 | Platform capability iteration: Dataset Learning and Knowledge Base; vertical modules: existing ChatBI integration and ChatExcel single-file / initially single-table analysis-report iteration. |
| V3 | Trusted Insight & Report Workspace: ChatReport, Dashboard Insight, EvidenceGraph, ReportArtifact, reviewer gate, eval. |
| V4 | Enterprise Data Agent Core: core services, OpenAPI, governance, action control, AgentOps, EvalOps, FinOps, multi-tenant readiness. |

## Important Clarification

Sales operating analysis remains valuable as a candidate golden workflow. It no longer defines V2.

The V2 phrase "展示思维链" must be implemented as visible analysis process and evidence trace. It must not expose hidden model chain-of-thought.

## Non-goals

- Do not delete historical materials.
- Do not treat AI_DB_GPT `inspiration` files as direct execution authority.
- Do not move full ChatReport, Dashboard Insight, Feishu publishing, Skill Hub, or Action Governance into V2.
- Do not build a generic enterprise Data Agent Core before V2/V3 proof.

## Storage / Follow-up

Canonical:

- `02-roadmap/t-agent-roadmap.md`
- `02-roadmap/backlog/product-backlog.md`
- `agent.md`

Superseded / candidate:

- `01-product/prd/PRD-V2-sales-operating-analysis.md`
- `05-decisions/product-decisions/PDR-2026-06-15-v2-sales-operating-wedge.md`
- `07-evals/golden-questions/V2-sales-operating-golden-questions.md`

Created during this consolidation:

- `01-product/prd/PRD-V2-platform-capability-and-entry-apps.md`

Next required artifacts:

- V2 domain-neutral eval pack for Dataset Learning, Knowledge Base, ChatBI Adapter, and ChatExcel single-file / single-table analysis report.
- V3 report / dashboard eval plan.
- V4 governance and action-control architecture note.
