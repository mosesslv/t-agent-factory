---
type: index
status: active
created: 2026-06-13
updated: 2026-06-13
generated_by: tools/kb refresh-index
---

# Generated RAG Scope

本文件定义 Knowledge Workbench 的检索和 RAG 范围。它只描述读取优先级和风险，不代表人工审阅或正式入库。

## Retrieval Policy

- default_formal_answer_scope: include
- stable_claim_priority: 主题库/ first, then governance rules, then generated review context.
- workbench_default: cautious or exclude unless the user asks for process context.
- citation_rule: When citing cautious material, include path and review or promotion status.

## Scope Counts

- `cautious`: `3`
- `exclude`: `2`
- `include`: `5`

## Include

| ID | Priority | Audience | Path | Reason | Conditions | Risk |
|---|---|---|---|---|---|---|
| formal-topic-library | high | `human, agent, rag` | `主题库/` | Formal knowledge cards, decision records, and topic indexes live here after review and promotion. | Prefer files with type knowledge-card, decision-record, or topic-index.; Use source_sessions and status fields when citing claims. | `low` |
| generated-core-indexes | high | `agent, rag` | `_index/generated-manifest.json, _index/generated-review-queue.json, _index/generated-review-packet.json, _index/generated-decision-guide.json, _index/generated-rag-scope.json, _index/generated-workspace-dashboard.json, _index/generated-tool-catalog.json` | Machine-readable status, review context, dashboard, and tool boundary snapshots. | Refresh with tools/kb refresh-index after accepted writes.; Treat generated-agent-brief, generated-promote-audit, and generated-version-status as runtime-local snapshots. | `low` |
| governance-rules | high | `human, agent, rag` | `_meta/知识入库规则.md, _meta/工作流说明.md, _meta/版本管理规则.md, _meta/Knowledge Workbench V0 实施计划.md` | Defines admission, workflow, versioning, and current implementation goals. | Use these rules to interpret workbench state before proposing writes.; Do not override explicit human review gates. | `low` |
| agent-profiles | medium | `human, agent, rag` | `_agents/` | Expert personas and durable viewpoints used to structure multi-expert discussions. | Use as role context, not as factual evidence.; Separate expert stance from confirmed knowledge claims. | `medium` |
| integration-docs | medium | `human, agent` | `_integrations/` | Adapter plans for Obsidian, Khoj, MCP, and input workflows. | Use for integration behavior and UI entry points.; Do not treat draft integration plans as completed implementation. | `medium` |

## Cautious

| ID | Priority | Audience | Path | Reason | Conditions | Risk |
|---|---|---|---|---|---|---|
| distillation-candidates | low | `human, agent, rag` | `_workbench/distillations/` | Condensed candidate knowledge before formal promotion. | Only cite with promotion_status and path.; Pending-human-review content can inform discussion but is not formal knowledge.; Approved-for-promotion still requires promote-audit and promote --confirm before entering 主题库/. | `high` |
| debate-sessions | low | `human, agent` | `_workbench/debates/` | Red-blue debate traces and multi-expert reasoning history. | Use for process context, objections, and unresolved assumptions.; Do not answer stable factual questions from debate text alone. | `high` |
| discussion-sessions | low | `human, agent` | `_workbench/sessions/` | Persistent brainstorm and discussion records. | Use to reconstruct context and source_sessions.; Treat claims as provisional unless promoted or reviewed elsewhere. | `high` |

## Exclude

| ID | Priority | Audience | Path | Reason | Conditions | Risk |
|---|---|---|---|---|---|---|
| raw-inbox | none | `agent` | `_workbench/inbox/` | Raw or semi-processed source notes may contain unverified, clipped, or placeholder material. | Use only when explicitly reviewing a source note.; Do not include by default in broad RAG answers.; Promote source value through review-source or distillation workflows, not direct retrieval priority. | `critical` |
| templates-and-local-runtime | none | `agent` | `_meta/templates/, 模版表/, .git/, .obsidian/workspace*, .DS_Store, screenshots, binary media` | Templates, local runtime state, Git internals, and media are not stable knowledge sources. | Only inspect when debugging a template, Obsidian setup, Git issue, or visual asset.; Never use these paths as formal answer evidence. | `medium` |

## Recommended Query Order

| Step | Label | Scope | Paths | Use For |
|---:|---|---|---|---|
| 1 | Formal knowledge and rules | `include` | `主题库/, _meta/知识入库规则.md, _meta/工作流说明.md, _meta/版本管理规则.md` | Stable claims, decisions, admission rules, workflow, and versioning. |
| 2 | Generated machine context | `include` | `_index/generated-workspace-dashboard.json, _index/generated-review-queue.json, _index/generated-review-packet.json, _index/generated-decision-guide.json, _index/generated-rag-scope.json, _index/generated-tool-catalog.json` | Current state, queues, human decision context, and safe tool boundaries. |
| 3 | Expert and integration context | `include` | `_agents/, _integrations/` | Expert perspectives, adapter behavior, and UI or client integration plans. |
| 4 | Workbench process context | `cautious` | `_workbench/distillations/, _workbench/debates/, _workbench/sessions/` | Reasoning traces, provisional candidates, objections, and source reconstruction. |

## Guardrails

- Retrieval scope does not equal formal knowledge promotion.
- Prefer 主题库/ for stable claims and cite source_sessions when available.
- Use _workbench/ material as process context unless a human explicitly asks to inspect it.
- Never treat _workbench/inbox/ as default RAG evidence.
- Generated runtime snapshots should be refreshed before cross-client handoff.
- Do not call review-source, review-distillation, approve-distillation, or promote --confirm from retrieval results alone.
