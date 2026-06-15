---
type: prd
status: draft
version: V2
created: 2026-06-15
updated: 2026-06-15
source_of_truth:
  - 02-roadmap/t-agent-roadmap.md
decision_refs:
  - 05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md
supersedes:
  - 01-product/prd/PRD-V2-sales-operating-analysis.md
---

# PRD V2: Platform Capability and Entry Apps

## 1. Positioning

V2 is the first active t-agent build target after route consolidation.

V2 does not mean a full sales operating report platform. V2 means:

```text
Dataset Learning + Knowledge Base
+ existing ChatBI integration
+ ChatExcel single-file / initially single-table analysis-report iteration
```

## 2. Users

| User | Goal |
|---|---|
| Business user | Ask questions against a trusted file or existing BI dataset and inspect how the answer was produced. |
| Analyst | Upload or select one file/table, review fields, add knowledge, generate an analysis-report draft, and correct outputs. |
| Data / BI owner | Reuse existing ChatBI capability without duplicating BI semantics, and capture trace / feedback into t-agent. |
| Product / AI team | Validate whether reusable Dataset Learning and Knowledge Base are strong enough before building ChatReport / Dashboard. |

## 3. Scope

### Platform Capabilities

- Dataset / DatasetVersion / SourceRef.
- DatasetField / DatasetProfile / LearningJob.
- Field semantic labels, aliases, askable scope, sensitivity, sample values.
- Manual correction and learning result versioning.
- KnowledgeAsset Lite with source, scope, trust level, binding, citation.
- QueryRun / AnalysisRun Lite, ToolTrace, FieldHit, KnowledgeHit.
- Artifact Lite for table, chart, SQL, insight, report draft.
- Eval Lite with 10-20 golden cases.

### Vertical Entry Modules

- ChatBI Adapter:
  - call existing ChatBI through a controlled adapter;
  - pass user/data permission context;
  - normalize result into UnifiedQueryResult;
  - write trace and artifact refs back to t-agent.

- ChatExcel:
  - support one file and initially one primary table;
  - learn dataset fields and profile;
  - ask / analyze / generate table and chart outputs;
  - produce an analysis-report draft.

- Analysis Report Iteration:
  - expose visible analysis process: plan, steps, SQL/calculation, tool calls, artifacts, evidence, warnings;
  - allow user correction at plan, field, SQL/calculation, artifact, and report-draft checkpoints;
  - never expose hidden model chain-of-thought.

## 4. Non-goals

- Full ChatReport.
- Full Dashboard Insight.
- Sales operating report as mandatory V2.
- Full Metric Store / Semantic Center.
- Full Skill Hub / Asset Hub.
- Feishu publishing as a V2 gate.
- Multi-table automatic join and complex workbook reasoning.
- Enterprise multi-tenant / SSO / full permission governance.
- Autonomous business action.

## 5. Core Flow

```text
User enters t-agent
  -> chooses ChatBI dataset or uploads a single file
  -> system loads / creates Dataset and DatasetField profile
  -> user adds or selects relevant knowledge
  -> user asks a question or requests an analysis-report draft
  -> system builds visible plan and context
  -> ChatBI Adapter or ChatExcel execution runs
  -> result becomes table/chart/SQL/insight artifact
  -> report draft cites artifacts and knowledge
  -> user corrects outputs
  -> run, artifact, feedback, and eval case are saved
```

## 6. Functional Requirements

| ID | Requirement | Priority | Acceptance |
|---|---|---:|---|
| F1 | Dataset object creation from ChatExcel file and ChatBI dataset ref | P0 | Stable dataset_id and version are recorded. |
| F2 | Dataset Learning for one file / one table | P0 | Field profile, semantic type, aliases, askable scope, and sample values are visible and editable. |
| F3 | KnowledgeAsset Lite | P0 | Knowledge can be bound to user/session/dataset/task and cited in outputs. |
| F4 | ChatBI Adapter | P0 | Existing ChatBI can be called and normalized result is written into t-agent run trace. |
| F5 | ChatExcel asking and analysis output | P0 | One-file / one-table path returns table/chart/summary with safety handling. |
| F6 | Visible analysis process | P0 | User can inspect plan, steps, SQL/calculation, artifacts, evidence, and warnings. |
| F7 | Analysis-report draft | P0 | Draft cites artifact or knowledge refs and can be corrected. |
| F8 | Run Trace Lite | P0 | QueryRun or AnalysisRun Lite records fields, knowledge, tools, artifacts, errors, and feedback. |
| F9 | Eval Lite | P0 | 10-20 golden cases can be replayed with pass/fail and failure reason. |
| F10 | Feedback loop | P1 | User corrections can create failure cases or update candidate metadata. |

## 7. Acceptance Gates

V2 is not accepted until all P0 gates pass:

1. ChatExcel one-file / one-table dataset learning can persist and be reused.
2. Knowledge can affect an answer/report and be cited.
3. ChatBI Adapter returns normalized result and t-agent trace.
4. Analysis-report draft contains only cited table/chart/SQL/knowledge evidence.
5. User-visible process shows what happened without exposing hidden chain-of-thought.
6. 10-20 golden cases can be replayed.
7. Failures become feedback or eval cases.

## 8. Candidate Golden Workflow

Sales operating analysis may be used as a candidate golden workflow if the team has:

- real or representative sales dataset;
- 10-20 user questions;
- expected SQL/result or answer rubric;
- report style / quality standard.

If those inputs are missing, V2 should still proceed with the platform capability and entry-app proof using a simpler file / BI dataset.

## 9. Sources

- `02-roadmap/t-agent-roadmap.md`
- `05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\context-packs\current-route.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\architecture-current-state\03_gap_diagnosis_against_research_direction.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\inspiration\04_v2_v3_gap_and_roadmap.md`
