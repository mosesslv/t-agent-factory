---
type: source-register
status: active
updated: 2026-06-15
---

# AI_DB_GPT Source Register

This register tracks AI_DB_GPT documents that can inform t-agent, without promoting them directly into current product truth.

## Authority Levels

| Level | Meaning | Can Drive t-agent Decisions? |
|---|---|---|
| canonical | Current accepted source in AI_DB_GPT, usually front matter `canonical: true` or lifecycle `canonical` | Yes, after mapping to t-agent scope |
| accepted-decision | Accepted ADR or decision record | Yes, for the decision boundary it covers |
| acceptance-record | Verification or acceptance result | Yes, as status evidence, not as product direction alone |
| proposal | Candidate plan or PRD draft | No, needs review |
| research | Inspiration, benchmark, gather note, technical research | No, source only |
| historical | Superseded, demo, old audit, scratch, deprecated | No, historical context only |

## Initial Source Groups

| Source Group | Path | Default Level | Current Use |
|---|---|---|---|
| codebase baseline | `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT` | canonical source-evidence | Rough / semi-finished DB-GPT-derived codebase substrate for t-agent feasibility and roadmap estimates |
| project baseline index | `04-sources/ai-dbgpt/project-baseline-index.md` | active index | Local map of AI_DB_GPT path, README, key docs, scripts, code assets, and validation signals |
| current-route | `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\context-packs\current-route.md` | canonical | AI_DB_GPT route boundary and non-authority rules |
| ChatReport PRD index | `D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md` | canonical | ChatReport v1 source map and accepted baseline |
| document governance | `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\document-governance\AGENT_DOC_ROUTING.md` | canonical | Routing and conflict precedence rules |
| inspiration | `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\inspiration\*.md` | research | Idea mining, report framing, architecture vocabulary |
| gather | `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\gather\*.md` | research | Version direction drafts and rough iteration material |
| ChatReport PRD set | `D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\*.md` | mixed | PRD, acceptance, historical audit, validation pack |

## Review Policy

- Register first, then distill.
- Before roadmap, staffing, feasibility, V2/V3/V4, implementation-scope, or enterprise-readiness work, read `project-baseline-index.md` so AI_DB_GPT is treated as an existing codebase substrate rather than a from-scratch build.
- Keep source paths stable; do not copy large historical folders unless a release snapshot is needed.
- Link generated candidates into current t-agent artifacts only after a human review.
- If a source contradicts current t-agent PRD or decision files, create a conflict note in `06-iteration/review-queue` or a formal ADR if the conflict changes direction.
