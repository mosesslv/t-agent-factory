---
type: codebase-baseline-index
status: active
updated: 2026-06-15
source_repo_mac: /Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT
source_repo_windows: D:\Users\Desktop\项目\代码\AI_DB_GPT
authority: source-evidence
---

# AI_DB_GPT Project Baseline Index

This file records the AI_DB_GPT codebase as the current t-agent build substrate.

The important product assumption is:

> t-agent is not being evaluated as a from-scratch build. It is being shaped around a rough / semi-finished DB-GPT-derived codebase with existing ChatExcel, ChatBI / ChatData, Knowledge, Agent, AWEL, ChatReport, document-governance, scripts, tests, and acceptance materials.

## 1. Repository Location

| Environment | Path |
|---|---|
| macOS local path | `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT` |
| Windows source path in generated indexes | `D:\Users\Desktop\项目\代码\AI_DB_GPT` |
| t-agent integration layer | `04-sources/ai-dbgpt/` |

Use the macOS path in this Codex workspace. Older generated AI_DB_GPT indexes may still contain Windows paths.

## 2. Product Role

| Item | Current Interpretation |
|---|---|
| Base project | DB-GPT-derived open-source / semi-finished codebase |
| Current AI_DB_GPT route | ChatReport v1.0 as a DB-GPT / t-agent native Report Agent vertical app |
| Product substrate | Existing code, docs, scripts, tests, and governance assets that t-agent can mine and refactor |
| Boundary | AI_DB_GPT is source evidence and implementation substrate; it does not override `agent.md` or `02-roadmap/t-agent-roadmap.md` |

Evaluation implication:

- Resource and roadmap estimates must account for existing AI_DB_GPT assets.
- The baseline reduces zero-to-one cost for ChatReport, Excel-first workflow, artifacts, evidence, and acceptance scaffolding.
- The baseline does not remove the cost of platform extraction, real-business validation, governance, permissions, and multi-application hardening.

## 3. First-Read Files

| File | Why It Matters |
|---|---|
| `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT/agent.md` | AI_DB_GPT branch agent rules and ChatReport v1 route |
| `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT/CLAUDE.md` | Current project direction, architecture boundary, doc governance, acceptance guards |
| `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT/.productfactory/context.md` | ProductFactory adapter context and current bet |
| `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT/README.md` | Upstream DB-GPT capabilities and English README |
| `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT/README.zh.md` | Upstream DB-GPT capabilities and Chinese README |
| `/Users/ALv/Desktop_Local/CY/knowledge/base/working/proj/AI_DB_GPT/docs/research/context-packs/current-route.md` | Canonical current route context pack |

## 4. Main Documentation Areas

| Directory / File | Use |
|---|---|
| `doc/prd/v1.0/00-index-v1.0.md` | ChatReport v1.0 PRD and acceptance index |
| `doc/prd/v1.0/*.md` | ChatReport PRD, goals, acceptance rounds, real-business validation, API / contract docs |
| `docs/research/context-packs/current-route.md` | Short canonical route and non-authority rules |
| `docs/research/decisions/*.md` | Accepted ADRs for ChatReport route, Go6 workbench, reference pack, capability selection |
| `docs/research/architecture-current-state/*.md` | Repository baseline, architecture scan, gap diagnosis, expert synthesis |
| `docs/research/document-governance/*.md` | Document governance handbook, metadata schema, registry, routing |
| `docs/research/inspiration/*.md` | Platform inspiration: report runtime, evidence graph, v2/v3 roadmap, Snowflake / data-agent signals |
| `docs/research/ai-risk/*.md` | AI risk taxonomy and ChatReport risk register |
| `docs_site/*.md` | Lightweight rendered docs-site pages for route, governance, ChatReport, agent workflow, AI risk |
| `handover/*.md` | Session / cross-machine handoff notes |

## 5. Code Areas To Treat As Existing Assets

| Area | Existing Asset |
|---|---|
| `pilot/chatreport/` | ChatReport native app facade, local platform store, runtime, API, validation |
| `pilot/openapi/api_v1/` | API integration points, including additive ChatReport endpoints |
| `pilot/scene/chat_data/` | Existing data chat / ChatDB-style scene capability |
| `pilot/scene/chat_dashboard/` | Existing dashboard / GBI-style report generation capability |
| `pilot/scene/chat_agent/` and `pilot/agent/` | Existing data-driven multi-agent / agent framework capability |
| `pilot/server/knowledge/` | Existing knowledge-base API area |
| `pilot/vector_store/` and `pilot/embedding_engine/` | Existing RAG / embedding / vector infrastructure |
| `pilot/awel/` and `examples/awel/` | Existing AWEL pipeline / DAG-style workflow substrate |
| `schemas/` | ChatReport / report quality / eval / artifact contract schemas |
| `tests/unit/` | Unit tests for ChatReport goals, validation contracts, governance checks |
| `tests/acceptance/chatreport/` | ChatReport acceptance cases and business acceptance intake |

## 6. Script Inventory

| Script / Area | Use |
|---|---|
| `scripts/dev/chatreport_api_server.py` | Local ChatReport API server for development and API acceptance |
| `scripts/dev/chatreport_phase41_acceptance.py` | Phase 4.1 / controlled capability selection acceptance helper |
| `scripts/doc-governance/local-governance-check.py` | Portable local governance checks when PowerShell is unavailable |
| `scripts/doc-governance/*.ps1` | Canonical document governance scripts: init session, sync registry, validate docs, drift review, new ADR / doc |
| `scripts/agent-governance/*.ps1` | Agent workflow, schema, feature-packet, business intake, run manifest validation |
| `.pre-commit-config.yaml` | Local hooks for document governance and schema / artifact contract validation |
| `docker-compose.yml` | Local DB-GPT / AI_DB_GPT compose entry |
| `mkdocs.yml` | Docs site configuration |
| `setup.py` | Python package setup and upstream dependency surface |

PowerShell scripts are canonical in AI_DB_GPT docs. On this macOS workspace, `powershell` was not available during the 2026-06-15 scan, so use Python fallbacks or read source files directly when scripts cannot run.

## 7. Validation Signals

Known validation commands from AI_DB_GPT context:

```bash
python -m pytest \
  tests/unit/test_chatreport_goal_3_4_5.py \
  tests/unit/test_chatreport_goal_6_e2e.py \
  tests/acceptance/chatreport/test_api_e2e.py
```

Known current limitation:

- The local `python3` environment in this Codex session did not have `pytest` installed, so tests were not re-run during the 2026-06-15 t-agent scan.
- Existing AI_DB_GPT acceptance records should be treated as static source evidence unless tests are run in the proper project environment.

## 8. Current Baseline Judgment

Evidence:

- AI_DB_GPT has a DB-GPT-derived foundation with data chat, ChatExcel, knowledge, dashboard / GBI, agent, AWEL, and model-management areas.
- AI_DB_GPT has a ChatReport vertical slice with lightweight platform objects such as `SourceRef`, `Dataset`, `AnalysisRun`, `ReportArtifact`, `EvidenceRecord`, `GoldenQuestion`, `ReportSpec`, `QualityRule`, and `EvalResult`.
- AI_DB_GPT has document governance, PRD / ADR / acceptance records, schemas, scripts, and tests.

Assumption:

- t-agent should treat AI_DB_GPT as the rough codebase to mine, refactor, and productize, not as a clean platform already completed.

Unknown:

- Which parts of upstream DB-GPT / AI_DB_GPT are production-ready under the current team's deployment constraints.
- Whether full real-business Excel / BI data, golden questions, metric contracts, and expected report standards are available.
- Which backend engineers own platform extraction versus ChatReport vertical delivery.

## 9. Required Use In Future Evaluations

Before estimating roadmap, staffing, V2/V3/V4 feasibility, implementation scope, or enterprise-readiness:

1. Read this file.
2. Read `AI_DB_GPT/agent.md`, `AI_DB_GPT/CLAUDE.md`, and `AI_DB_GPT/docs/research/context-packs/current-route.md`.
3. Check whether AI_DB_GPT scripts and tests can run in the current environment.
4. Separate existing code assets from missing platform hardening.
5. State conclusions as `evidence`, `assumption`, and `unknown`.
