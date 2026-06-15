---
type: product-decision
status: draft
decision: narrow
created: 2026-06-15
updated: 2026-06-15
topic: reality-roadmap-management
related:
  - 02-roadmap/t-agent-roadmap.md
  - 02-roadmap/t-agent-reality-roadmap-2026-h2.md
  - 04-sources/ai-dbgpt/project-baseline-index.md
---

# PDR-2026-06-15: Reality Roadmap Management

## Decision

`narrow`

Keep `02-roadmap/t-agent-roadmap.md` as the canonical version meaning map, and add `02-roadmap/t-agent-reality-roadmap-2026-h2.md` as the execution overlay.

Do not overwrite the V2 / V3 / V4 north star with a short-term delivery plan. Do not pretend the north-star roadmap is already team-committed delivery scope.

## Why

The current roadmap correctly describes the desired enterprise Data Agent evolution:

```text
V2: Dataset Learning + Knowledge + ChatBI / ChatExcel
V3: Trusted Insight & Report Workspace
V4: Enterprise Data Agent Core
```

But the current implementation reality is narrower:

- AI_DB_GPT is an existing rough / semi-finished DB-GPT-derived codebase.
- The strongest productized slice is ChatReport.
- The reusable objects are mostly ChatReport-local or draft contracts.
- `KnowledgeAsset`, `AnalysisRun`, `Artifact`, `Evidence`, `Eval`, and related contracts are not yet locked as a shared team target.
- The next two weeks need alignment, PRD, contracts, eval, demo, owner map, and backlog, not another high-level version promise.

## Roadmap Management Rule

| Roadmap Type | File | Role |
|---|---|---|
| Canonical roadmap | `02-roadmap/t-agent-roadmap.md` | Defines product version meaning and non-goals |
| Reality roadmap | `02-roadmap/t-agent-reality-roadmap-2026-h2.md` | Defines realistic execution stages and team alignment work |
| Backlog | `02-roadmap/backlog/product-backlog.md` | Converts reality roadmap into owned work |
| PRD / Contract / Eval | `01-product/prd/`, `03-architecture/contracts/`, `07-evals/` | Defines what can be built and accepted |

If reality roadmap learns something that changes version meaning, update this PDR, `agent.md`, and `02-roadmap/t-agent-roadmap.md` together.

## Scope

The 2026 H2 reality target is:

```text
Trusted Analysis Platform Beta
  from AI_DB_GPT / ChatReport baseline
  with shared contracts, evals, workbench, and governance lite
```

June 15-30 target:

- align on the actual next iteration;
- create a V2 Reality PRD;
- map AI_DB_GPT baseline assets;
- lock candidate platform objects;
- create real-business validation intake;
- split tasks across product, agent engineering, and backend.

## Non-goals

- Do not claim full V4 delivery in 2026 H2.
- Do not create a new top-level directory for every iteration.
- Do not treat ChatReport-local objects as platform truth until contracts and owners are agreed.
- Do not broaden to open SkillHub, arbitrary DAG, or runtime-created agents.

## Acceptance Checks

- `02-roadmap/t-agent-reality-roadmap-2026-h2.md` exists and is linked from roadmap / entry files.
- Backlog contains reality-roadmap work items or a clear status section.
- A V2 Reality PRD is created before engineering execution starts.
- Contract / eval gaps are explicit.
- Future feasibility discussions read `04-sources/ai-dbgpt/project-baseline-index.md`.

## Review Date

2026-06-30
