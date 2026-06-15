---
type: integration-plan
status: draft
created: 2026-06-08
updated: 2026-06-08
scope: v2-khoj-rag
---

# Khoj 接入计划

## 目标

V2 可考虑用 Khoj 做轻量知识问答层，让人和 Agent 能基于当前 Obsidian/Markdown 知识库做自然语言检索。

## 约束

- Markdown/Git 仍是真相源。
- Khoj 只做检索和问答客户端，不负责 promote。
- `_workbench/` 的过程内容默认不进入正式知识回答优先级。
- `主题库/`、`_index/`、经过确认的 sources 应优先进入检索范围。
- 具体检索范围以 `tools/kb rag-scope --json` 和 `_index/generated-rag-scope.json` 为准。

## 建议索引范围

先运行：

```bash
tools/kb rag-scope --json
```

或读取：

- `_index/generated-rag-scope.json`
- `_index/generated-rag-scope.md`

当前建议：

优先：

- `主题库/`
- `_index/generated-manifest.json`
- `_index/generated-review-queue.json`
- `_index/generated-review-packet.json`
- `_index/generated-decision-guide.json`
- `_index/generated-workspace-dashboard.json`
- `_index/generated-tool-catalog.json`
- `_meta/知识入库规则.md`
- `_meta/工作流说明.md`
- `_meta/版本管理规则.md`

谨慎：

- `_workbench/distillations/`
- `_workbench/sessions/`
- `_workbench/debates/`
- `_agents/`
- `_integrations/`

默认排除：

- `_workbench/inbox/`
- `_meta/templates/`
- `.git/`
- `.obsidian/workspace*`
- 截图、二进制媒体和本地运行态文件

## 接入前检查

- V1 `tools/kb validate` 稳定通过。
- `tools/kb rag-scope --json` 能输出 include、cautious、exclude 三类路径。
- 正式知识卡具备 `source_sessions`。
- Obsidian 入口可以清晰区分正式知识和工作台过程。

## 后续任务

- 试用 Khoj Obsidian 客户端或 self-host 配置。
- 验证中文 Markdown 检索质量。
- 验证是否能排除 `_workbench/` 噪音。
- 形成 `Khoj 使用规范.md`。
