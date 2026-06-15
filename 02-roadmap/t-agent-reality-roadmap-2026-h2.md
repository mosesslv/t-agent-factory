---
type: roadmap
status: draft
lifecycle: execution-overlay
created: 2026-06-15
updated: 2026-06-15
scope: 2026-h2-reality
depends_on:
  - agent.md
  - 02-roadmap/t-agent-roadmap.md
  - 04-sources/ai-dbgpt/project-baseline-index.md
  - 05-decisions/product-decisions/PDR-2026-06-15-reality-roadmap-management.md
---

# t-agent Reality Roadmap 2026 H2

This roadmap is the reality overlay for execution planning.

It does not replace `02-roadmap/t-agent-roadmap.md`. The canonical roadmap defines version meaning. This file defines what the current team can realistically align, build, validate, and hand off from June to December 2026, given the existing AI_DB_GPT codebase and current organizational readiness.

## 1. Product Committee Decision

Decision: `narrow`

Define 2026 H2 as:

> Build a Trusted Analysis Platform Beta from the existing AI_DB_GPT / ChatReport vertical slice, rather than claiming full V2 / V3 / V4 completion.

The near-term goal is not to finish an enterprise Data Agent Core. The near-term goal is to turn the current ChatReport-centered pilot into a team-aligned, productized iteration with shared objects, contracts, evals, and a visible workbench path.

## 2. Reality Check

### Evidence

- AI_DB_GPT is an existing DB-GPT-derived rough / semi-finished codebase, not a from-scratch project.
- AI_DB_GPT currently has ChatExcel, ChatBI / ChatData, Knowledge, Agent, AWEL, ChatReport, document-governance, scripts, tests, and acceptance materials.
- The strongest implemented product slice is still ChatReport v1.0: Excel-first, SourceRef / Dataset, controlled runtime, artifacts, evidence, Markdown / HTML report, and local acceptance records.
- `KnowledgeAsset`, `AnalysisRun`, `Artifact`, `Evidence`, `Eval`, and related contracts exist as concepts or ChatReport-local objects, but they are not yet locked as a shared team-level platform target.

### Assumption

- The next useful step is to extract and align platform primitives from ChatReport, not to ask the team to immediately build a full platform abstraction.
- June 2026 should be used to freeze the shared iteration target, not to expand scope.

### Unknown

- Which AI_DB_GPT code paths are production-ready under the team's deployment environment.
- Which real business data, golden questions, metric definitions, and expected report standards are available.
- Whether backend ownership is enough to separate platform substrate from ChatReport vertical logic without slowing delivery.

## 3. Roadmap Layering

| Layer | File | Purpose | Change Rule |
|---|---|---|---|
| Version North Star | `02-roadmap/t-agent-roadmap.md` | Defines V1 / V2 / V3 / V4 meaning and non-goals | Change only with accepted PDR |
| Reality Execution Overlay | this file | Defines realistic H2 stages, June alignment work, and workstreams | Can be updated each planning cycle |
| Product Decision | `05-decisions/product-decisions/PDR-2026-06-15-reality-roadmap-management.md` | Explains why reality overlay exists and how old roadmap is managed | Promote to accepted after review |
| Backlog | `02-roadmap/backlog/product-backlog.md` | Tracks shaped work items and status | Update every iteration |
| PRD / Contract / Eval | `01-product/prd/`, `03-architecture/contracts/`, `07-evals/` | Turns roadmap into team-executable acceptance | Required before `ready` |

## 4. 2026 H2 Reality Target

By the end of 2026, the realistic target is:

```text
Trusted Analysis Platform Beta
  = AI_DB_GPT / ChatReport real-business quality closure
  + shared Dataset / SourceRef / Run / Artifact / Evidence / Eval contracts
  + one visible workbench path
  + one or two validated business workflows
  + governance lite for high-risk outputs and publishing
```

Do not claim:

- Full V4 Enterprise Data Agent Core.
- Full multi-tenant IAM / RBAC / ABAC.
- Full AgentOps / EvalOps / FinOps.
- Open SkillHub or marketplace.
- Arbitrary dynamic DAG or user-created agents.
- Production-quality real-business reporting until real data, golden questions, metric definitions, and expected report standards pass review.

## 5. June 15-30: Reality Lock

Purpose:

> Convert the ChatReport vertical pilot into a shared team iteration target.

### Deliverables

| Workstream | Deliverable by June 30 | Owner Lens | Acceptance |
|---|---|---|---|
| Product alignment | V2 Reality PRD outline and one-page product brief | Product Lead, AI Product Owner | Team can explain the same target in one sentence |
| Codebase baseline | AI_DB_GPT baseline demo / handoff map | Agent Architect, Knowledge Librarian | Everyone can locate README, route docs, scripts, tests, and ChatReport code paths |
| Contract lock | Contract inventory for Dataset / SourceRef / AnalysisRun / Artifact / Evidence / Eval | Data Product, Agent Architect | Each object has owner, current location, gap, and next action |
| Real-business validation | Data / golden question / metric definition intake checklist | User Research, Eval Lead | Missing inputs are explicit, not hidden in "later" |
| Workbench sample | One task-first ChatReport review path | Product, Design, Frontend / Agent Engineer | Shows run, plan, artifact, evidence, warning, eval status |
| Engineering split | Workstream backlog and owner map | Product Lead, Tech Lead | Each work item has an owner, output, dependency, and validation |
| Governance | Reality roadmap management PDR | Product Lead, Red Team | Old roadmap and reality roadmap relationship is clear |

### June Workstreams

| ID | Workstream | Main Question | Output Target |
|---|---|---|---|
| RR-JUN-01 | Current-state audit | What already exists in AI_DB_GPT, and where? | `04-sources/ai-dbgpt/project-baseline-index.md` |
| RR-JUN-02 | Product target | What exactly is the next iteration users and team will see? | `01-product/prd/` |
| RR-JUN-03 | Object boundary | Which ChatReport-local objects become shared platform candidates? | `03-architecture/contracts/` |
| RR-JUN-04 | Real-business eval | What inputs are required to move from `Accepted with Warning` to real quality closure? | `07-evals/` |
| RR-JUN-05 | Workbench UX | How do PM, analyst, and engineer inspect run / artifact / evidence / warning? | `08-design-prototypes/flows/` |
| RR-JUN-06 | Backlog and owners | What does each engineer / PM own next? | `02-roadmap/backlog/product-backlog.md` |

## 6. July-August: Platformization Alpha

Purpose:

> Make platform primitives visible and reusable without prematurely building a separate platform service.

Scope:

- Align ChatReport `SourceRef`, `Dataset`, `AnalysisRun`, `ReportArtifact`, `EvidenceRecord`, and `EvalResult` with t-agent contracts.
- Create `KnowledgeAsset Lite` only where it directly affects a report, answer, or evidence citation.
- Make the workbench show what happened: data source, plan, steps, artifacts, evidence, warnings, and eval result.
- Keep ChatReport as the proving vertical, but avoid hiding reusable objects inside ChatReport-only assumptions.

Non-goals:

- Do not extract a full Core Service yet.
- Do not build open skill search.
- Do not support arbitrary multi-agent topology.
- Do not broaden to many domains before one workflow passes.

Acceptance:

- One real or representative business workflow can run end-to-end.
- Important claims cite artifact / evidence.
- Failures become eval cases or backlog items.
- Team can explain which parts are vertical ChatReport logic and which parts are platform candidates.

## 7. September-October: Trusted Report Workspace Beta

Purpose:

> Turn the single vertical slice into a reviewable product workflow.

Scope:

- Report planning, artifact shelf, evidence drawer, reviewer gate, warning states.
- Real-business validation pack with golden questions, metric definitions, expected report sections, and quality rules.
- ChatBI / existing BI adapter spike only if the target data path is available and owned.
- Dashboard insight remains limited to controlled artifact / view model consumption.

Acceptance:

- Reports cannot be marked publishable without evidence and eval status.
- Reviewer gate can block unsupported claims.
- At least one workflow has repeatable eval results.

## 8. November-December: Enterprise Beta / Governance Lite

Purpose:

> Prepare the validated beta for enterprise-facing pilots without claiming full V4.

Scope:

- PermissionAdapter / Policy / AuditLog lite.
- Action policy for export, share, write-back, or external publishing.
- Release gate with eval and reviewer decision.
- Platform API / contract draft for future ChatExcel, ChatBI, ChatReport, Dashboard reuse.

Acceptance:

- High-risk actions are dry-run or approval-gated.
- Published artifacts are traceable to run, data, evidence, and reviewer decision.
- Open V4 items are explicitly documented as future work.

## 9. How To Answer The User's Questions

### What should we iterate now?

Iterate the shared trusted-analysis loop:

```text
SourceRef / Dataset
  -> AnalysisRun / StepRun / ToolCall
  -> Artifact / Evidence
  -> ReportArtifact / Workbench
  -> Eval / ReviewerDecision / Feedback
```

Treat `KnowledgeAsset` as lite and scoped until a specific workflow proves it affects output quality and evidence.

### How do we align the team?

Run a June Reality Lock review with four shared artifacts:

- product target one-pager;
- AI_DB_GPT codebase baseline map;
- object / contract gap map;
- backlog with owners and acceptance checks.

### How do we create the PRD?

Create a V2 Reality PRD, not a generic V2 platform PRD.

Minimum sections:

- target workflow;
- users and jobs;
- existing AI_DB_GPT assets used;
- platform candidate objects;
- vertical ChatReport responsibilities;
- non-goals;
- acceptance gates;
- owner map;
- eval pack.

### How do we coordinate product and engineering?

Use workstreams, not abstract versions:

- Product owns target workflow, non-goals, acceptance, business intake.
- Agent engineers own runtime, planner, artifacts, evidence, eval integration.
- Backend engineers own persistence, APIs, permissions, audit, deployment path.
- AI product managers own PRD hygiene, backlog, review rituals, and user validation.

### Do we need new directories?

No new top-level directories are needed now.

Use existing folders:

| Need | Folder |
|---|---|
| Reality roadmap | `02-roadmap/` |
| Backlog and owner split | `02-roadmap/backlog/` |
| PRD | `01-product/prd/` |
| Shared object contracts | `03-architecture/contracts/` |
| AI_DB_GPT source and codebase baseline | `04-sources/ai-dbgpt/` |
| Decision | `05-decisions/product-decisions/` |
| Iteration notes and messy inputs | `06-iteration/` |
| Golden questions / eval / failures | `07-evals/` |
| Workbench flow and mockups | `08-design-prototypes/` |
| Expert routing and review protocols | `09-agents/` |

Create subfolders only when a folder becomes crowded.

## 10. Immediate Next Artifacts

Recommended next artifacts, in order:

1. `01-product/prd/PRD-V2-reality-platformization-and-chatreport-closure.md`
2. `03-architecture/contracts/platform-object-gap-map-v0.md`
3. `07-evals/golden-questions/V2-reality-chatreport-quality-closure.md`
4. `08-design-prototypes/flows/chatreport-trusted-analysis-workbench-flow.md`
5. `02-roadmap/backlog/product-backlog.md` owner/status update

## 11. Main Risk

The team may talk as if it is building a platform while still implementing one vertical ChatReport slice.

Mitigation:

- Keep the canonical roadmap as the north star.
- Use this reality roadmap as the execution plan.
- Require every "platform" claim to point to at least one contract, one code path, one eval, and one owner.
