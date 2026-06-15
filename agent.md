---
type: project-agent-ssot
status: canonical
lifecycle: single-source-of-truth
updated: 2026-06-15
canonical_artifacts:
  - 02-roadmap/t-agent-roadmap.md
  - 05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md
  - 01-product/prd/PRD-V2-platform-capability-and-entry-apps.md
  - 02-roadmap/backlog/product-backlog.md
---

# T-agent Platform SSOT

This file is the mandatory first read for any agent working in this repository.

It defines the current T-agent platform truth, source priority, and conflict rules. Use it as the project-level SSOT entry. Use linked artifacts for detail.

## 1. Product Truth

t-agent is an enterprise Data Agent platform workspace.

It is not:

- a generic chat box;
- a Text2SQL-only tool;
- a DB-GPT skin;
- a one-off sales report project;
- a generic multi-agent platform.

The product goal is to make enterprise data analysis trustworthy and reusable by organizing dataset context, knowledge context, run trace, artifacts, evidence, eval, and controlled application entry points.

## 2. Current Version Truth

`02-roadmap/t-agent-roadmap.md` is the detailed version roadmap SSOT.

Current accepted version meaning:

| Version | Meaning |
|---|---|
| V1 | Historical baseline / dual-entry MVP proof. |
| V2 | Dataset Learning + Knowledge Base + existing ChatBI integration + ChatExcel single-file / initially single-table analysis-report iteration. |
| V3 | Trusted Insight & Report Workspace: ChatReport, Dashboard Insight, EvidenceGraph, ReportArtifact, reviewer gate, report/dashboard eval. |
| V4 | Enterprise Data Agent Core: core service APIs, governance, action control, AgentOps, EvalOps, FinOps, multi-tenant readiness. |

Sales operating analysis is only a candidate golden workflow / eval pack. It no longer defines V2.

## 3. V2 Active Scope

V2 must stay narrow:

```text
Platform capabilities:
  Dataset Learning
  Knowledge Base

Vertical modules:
  ChatBI Adapter over existing ChatBI
  ChatExcel one-file / initially one-table analysis-report flow
```

V2 must expose visible analysis process:

- plan;
- selected data / fields;
- SQL or calculation step;
- tool calls;
- table/chart/artifact outputs;
- evidence links;
- warnings;
- editable checkpoints.

Do not expose hidden model chain-of-thought.

## 4. Authority Order

When documents conflict, use this order:

1. `agent.md`
2. `02-roadmap/t-agent-roadmap.md`
3. accepted Product Decisions / ADRs under `05-decisions/`
4. active PRDs under `01-product/prd/`
5. active backlog under `02-roadmap/backlog/`
6. active contracts under `03-architecture/contracts/`
7. active eval packs under `07-evals/`
8. AI_DB_GPT canonical context and accepted ADRs
9. AI_DB_GPT research / inspiration
10. `idealization/5月/` historical materials

ProductFactory may provide product judgment and precedent. It is not the t-agent project truth source.

## 5. Superseded Materials

The following are historical or candidate inputs, not current V2 authority:

- `01-product/prd/PRD-V2-sales-operating-analysis.md`
- `05-decisions/product-decisions/PDR-2026-06-15-v2-sales-operating-wedge.md`
- `07-evals/golden-questions/V2-sales-operating-golden-questions.md`
- `06-iteration/reports/2026-06-15-t-agent-ai-team-sync-plan.md`
- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`
- `idealization/5月/gather/v2/v2迭代方向.md`

Use them as source material only after checking the current SSOT.

## 6. Agent Operating Rules

Before product, roadmap, PRD, architecture, eval, or agent-routing work:

1. Read this file.
2. Read `02-roadmap/t-agent-roadmap.md`.
3. Read the narrow artifact relevant to the task.
4. If the work estimates roadmap feasibility, staffing, implementation scope, enterprise readiness, or V2/V3/V4 delivery and depends on AI_DB_GPT, read `04-sources/ai-dbgpt/project-baseline-index.md` and treat AI_DB_GPT as the existing rough / semi-finished codebase substrate, not a from-scratch build.
5. If AI_DB_GPT material is involved, refresh the source index first:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\ai-dbgpt\update-ai-dbgpt-source-index.ps1
```

6. If the conclusion changes product direction, update or create a Product Decision.
7. If it changes version meaning, update this file and `02-roadmap/t-agent-roadmap.md` in the same change.
8. If it changes committed scope, update PRD and backlog together.
9. If it changes acceptance, update eval coverage.

## 7. Current Next Work

The next artifacts to create or update are:

1. V2 domain-neutral eval pack for Dataset Learning, Knowledge Base, ChatBI Adapter, and ChatExcel single-file / single-table analysis report.
2. Decision on whether the sales operating question pack belongs to V2 candidate eval or V3 report workflow eval.
3. V3 report / dashboard eval plan.
4. V4 governance and action-control architecture note.

## 8. Git Boundary

Do not push to GitHub unless the user explicitly asks.

Preserve user-owned working tree changes. Do not reset, revert, or overwrite unrelated work.
