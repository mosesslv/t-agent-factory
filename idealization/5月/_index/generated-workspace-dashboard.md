---
type: index
status: active
created: 2026-06-13
updated: 2026-06-13
generated_by: tools/kb refresh-index
---

# Generated Workspace Dashboard

本页是 Obsidian 人类工作台首屏。它只聚合当前状态、审阅焦点、门禁和安全动作，不执行 review、approve 或 promote。

## Snapshot

- Typed files: `46`
- Active sessions and debates: `5`
- Source review ready: `1`
- Distillation review ready: `1`
- Approved for promotion: `0`
- High-risk tools: `5`

## Decision Focus

| Priority | Kind | Reason | Next | Topic | Preview | Path |
|---:|---|---|---|---|---|---|
| 10 | source-note | source ready for human review | preview-source-review | agent-harness-skill-system | `tools/kb preview-source-review _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md` | `_workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md` |
| 20 | distillation-candidate | distillation ready for human review | preview-distillation-review | agent-harness-skill-system | `tools/kb preview-distillation-review _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md` | `_workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md` |
| 88 | debate-session | debate already drafted a distillation | distillation-drafted | enterprise-ai-tech-org | `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md` | `_workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md` |
| 90 | source-note | source already reviewed | source-reviewed | agent-harness-skill-system | `tools/kb preview-source-review _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md` | `_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md` |
| 90 | source-note | source already reviewed | source-reviewed | enterprise-ai-tech-org | `tools/kb preview-source-review _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md` | `_workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md` |

## Gate Status

| Gate | Count | State | Next |
|---|---:|---|---|
| 来源资料人工审阅 | 1 | `ready` | preview-source-review, then human review-source decision |
| 来源资料补全 | 0 | `clear` | prepare-source or draft-source-summary |
| 沉淀候选人工审阅 | 1 | `ready` | preview-distillation-review, then human review-distillation decision |
| 正式入库确认 | 0 | `blocked-by-human-review` | promote-audit before promote --confirm |

## Workspace Layers

| Layer | Paths | Counts | Rule |
|---|---|---|---|
| 正式知识库 | `主题库/` | `topic-index=3, knowledge-card=3, decision-record=3` | Only reviewed and promoted knowledge belongs here. |
| 工作台 | `_workbench/inbox/, _workbench/sessions/, _workbench/debates/, _workbench/distillations/` | `source-note=3, discussion-session=4, debate-session=1, distillation-candidate=4` | Process materials stay here until human-reviewed. |
| 专家层 | `_agents/` | `agent-profile=7` | Expert roles and long-running viewpoints. |
| 规则和集成 | `_meta/, _integrations/, tools/` | `workflow=3, governance-rule=2, implementation-plan=1, integration-plan=6, tool-doc=1` | Defines how humans, agents, and tools collaborate. |

## Safe Read Commands

- `tools/kb workspace-dashboard`
- `tools/kb workspace-ui`
- `tools/kb decision-guide --limit 3`
- `tools/kb rag-scope --json`
- `tools/kb review-packet --limit 3`
- `tools/kb tool-catalog --json`
- `tools/kb agent-brief --json`
- `tools/kb version-status`

## Protected Actions

- `tools/kb review-source <source> reviewed --note <note>`
- `tools/kb review-distillation <distillation> approve --note <note>`
- `tools/kb approve-distillation <distillation>`
- `tools/kb promote --confirm <distillation>`

## Entry Links

| Label | Markdown | JSON |
|---|---|---|
| 只读工作台 UI | `_index/generated-workspace-ui.html` | `_index/generated-workspace-dashboard.json` |
| 审阅队列 | `_index/generated-review-queue.md` | `_index/generated-review-queue.json` |
| 决策指南 | `_index/generated-decision-guide.md` | `_index/generated-decision-guide.json` |
| RAG 范围 | `_index/generated-rag-scope.md` | `_index/generated-rag-scope.json` |
| 审阅包 | `_index/generated-review-packet.md` | `_index/generated-review-packet.json` |
| Agent 接手简报 | `_index/generated-agent-brief.md` | `_index/generated-agent-brief.json` |
| 工具边界目录 | `_index/generated-tool-catalog.md` | `_index/generated-tool-catalog.json` |
| 入库审计 | `_index/generated-promote-audit.md` | `_index/generated-promote-audit.json` |
| 版本状态 | `_index/generated-version-status.md` | `_index/generated-version-status.json` |
