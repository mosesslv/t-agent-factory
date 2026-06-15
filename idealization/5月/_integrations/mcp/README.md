---
type: integration-plan
status: draft
created: 2026-06-09
updated: 2026-06-09
scope: v2-mcp-tool-boundary
---

# MCP 接入边界

## 目标

把当前 Knowledge Workbench 暴露成可被 MCP server、Claude Code、ChatGPT、自写脚本或 Obsidian 插件读取的稳定工具目录。

V2 不直接实现完整 MCP server。V2 先固定命令契约、资源路径、权限级别和高风险动作边界，避免未来接入时把未审阅内容自动写入正式知识库。

## 首读资源

```bash
tools/kb agent-brief --json
tools/kb tool-catalog --json
tools/kb workspace-ui
tools/kb rag-scope --json
tools/kb review-queue --json
tools/kb review-packet --json
```

对应生成文件：

- `_index/generated-agent-brief.json`
- `_index/generated-tool-catalog.json`
- `_index/generated-workspace-ui.html`
- `_index/generated-rag-scope.json`
- `_index/generated-review-queue.json`
- `_index/generated-review-packet.json`

## 权限分层

| 层级 | 自动调用 | 写入范围 | 说明 |
|---|---:|---|---|
| `read-only` | 是 | - | 查询状态、队列、审阅包、搜索、预览 |
| `index-write` | 是 | `_index/` | 生成派生索引，不改变源知识 |
| `workbench-write` | 否 | `_workbench/` | 创建 session、debate、source、distillation 草稿 |
| `review-decision` | 否 | `_workbench/` | 记录人工审阅决定 |
| `formal-structure-write` | 否 | `主题库/` | 创建正式主题骨架 |
| `formal-knowledge-write` | 否 | `主题库/` | promote 正式知识，必须人工确认 |

## MCP 映射建议

- Resources:
  - `agent-brief`
  - `tool-catalog`
  - `workspace-ui`
  - `rag-scope`
  - `review-queue`
  - `review-packet`
  - `workbench-queue`
  - `version-status`
- Read-only tools:
  - `validate`
  - `status`
  - `search`
  - `source-preview`
  - `debate-preview`
  - `distillation-preview`
  - `promote-preview`
- Write tools:
  - `refresh-index` 可以在写入后自动调用。
  - `workbench-write` 工具需要用户明确要求。
  - `review-decision` 和 `formal-knowledge-write` 工具必须有人类确认。

## 禁止自动化

- 不自动调用 `review-source ... reviewed`。
- 不自动调用 `review-distillation ... approve`。
- 不自动调用 `approve-distillation`。
- 不自动调用 `promote --confirm`。
- 不把 `_workbench/` 的过程材料直接作为正式知识回答。
- 不把 `_workbench/inbox/` 作为默认 RAG 证据源。

## 后续任务

- 基于 `_index/generated-tool-catalog.json` 生成 MCP server tool definitions。
- 基于 `_index/generated-rag-scope.json` 生成 resources include/exclude 配置。
- 给高风险工具增加二次确认 UI。
- 对 `formal-knowledge-write` 增加 promote-audit gate 展示。
- 评估是否需要把 read-only resources 暴露为文件资源，而不是命令工具。
