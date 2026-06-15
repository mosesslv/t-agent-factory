---
type: source-integration
status: active
updated: 2026-06-15
source_repo: D:\Users\Desktop\项目\代码\AI_DB_GPT
---

# AI_DB_GPT Source Integration

This directory is the source-control layer for importing AI_DB_GPT research and PRD material into the t-agent workspace.

It does not own the product answer. It records where the source came from, how authoritative it is, and which t-agent artifact may need review.

## Codebase Baseline

AI_DB_GPT is also the rough / semi-finished codebase substrate for t-agent planning, not only a document source.

Current local path in this Codex workspace:

```text
/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT
```

Read `project-baseline-index.md` before any roadmap, staffing, feasibility, V2/V3/V4, implementation-scope, or enterprise-readiness discussion that depends on AI_DB_GPT.

## Source Scope

Primary source folders:

- `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\inspiration`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\gather`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd`

Authority anchors:

- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\context-packs\current-route.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\document-governance\AGENT_DOC_ROUTING.md`

## Rule

Do not edit AI_DB_GPT `inspiration` or `gather` files as the active t-agent workspace.

Use this repo as the active editing surface:

```text
rough idea -> 06-iteration/inbox
theme draft -> 06-iteration/drafts
share/report material -> 06-iteration/reports
accepted product decision -> 05-decisions or 05-decisions/product-decisions
accepted PRD change -> 01-product/prd
accepted architecture or contract -> 03-architecture or 03-architecture/contracts
accepted eval coverage -> 07-evals
```

## Generated Files

The generated files in this folder are review aids:

- `generated-manifest.md` / `.json`: source inventory.
- `generated-link-map.md`: candidate dispatch targets in this repo.
- `generated-timeline.md`: source chronology based on front matter and file metadata.
- `generated-conflict-candidates.md`: likely conflicts or tension points that need human review.

Generated conflict and link output is advisory. It should not directly modify PRD, ADR, or eval files without review.

## Maintained Source Indexes

- `project-baseline-index.md`: live map of AI_DB_GPT repo path, README files, key docs, code assets, scripts, and validation signals.
- `source-register.md`: source authority levels and document groups.
- `material-reference-register.md`: material-production references found during searches.
