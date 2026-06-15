---
type: integration-plan
status: draft
created: 2026-06-09
updated: 2026-06-09
scope: v2-readonly-workspace-ui
---

# 只读工作台 UI

## 目标

把 Obsidian 首屏和机器索引导出成一个可直接打开的静态 HTML 工作台，让人不用进入 Codex 也能看到当前审阅焦点、门禁状态、RAG 范围和安全命令。

## 当前实现

```bash
tools/kb workspace-ui > _index/generated-workspace-ui.html
tools/kb refresh-index
```

`tools/kb workspace-ui` 默认把 HTML 输出到 stdout；`tools/kb refresh-index` 会同步生成 `_index/generated-workspace-ui.html`。

## 数据来源

- `_index/generated-workspace-dashboard.json`
- `_index/generated-review-queue.json`
- `_index/generated-rag-scope.json`
- `tools/kb workspace-dashboard --json`
- `tools/kb rag-scope --json`

HTML 内会嵌入生成时的只读快照，不需要本地服务器，不请求外部网络。

## 页面结构

- Snapshot metrics
- Decision Focus
- Gate Status
- RAG Scope
- Safe Read Commands
- Protected Actions
- Entry Links

## 交互边界

- 允许按任务类型筛选 Decision Focus。
- 允许复制 preview 或只读命令。
- 不执行 review、approve、promote。
- 不写 `_workbench/`。
- 不写 `主题库/`。
- 不把 `_workbench/inbox/` 当作默认 RAG 证据。

## 后续升级路径

- 若需要更强交互，优先用 Vercel AI SDK 5 或 AG-UI 重做同一信息架构。
- 若需要 Obsidian 插件，先复用 `_index/generated-workspace-ui.html` 的分区和字段，再决定是否读取 JSON resources。
- 若接 MCP server，继续沿用 `_index/generated-tool-catalog.json` 的权限边界。
