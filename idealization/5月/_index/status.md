---
type: index
status: active
created: 2026-06-08
updated: 2026-06-09
---

# Status

本页记录 Knowledge Workbench 的当前工程状态。

## 已完成

- V0: 目录边界、入口页、规则、模板、专家 profile。
- Git baseline: `8fe6be9 chore: establish knowledge base baseline`
- V0 结构提交: `c5ef99c feat: add knowledge workbench v0 structure`
- V1: schema、CLI、Dataview 状态视图、V2 集成占位。
- V2 初始能力: `tools/kb search` 和 Web Clipper 输入规范。
- V2 索引快照: `tools/kb refresh-index` 生成 `_index/generated-manifest.md` 和 `_index/generated-promotion-queue.md`。
- V2 机器索引: `tools/kb refresh-index` 同时生成 `_index/generated-manifest.json` 和 `_index/generated-promotion-queue.json`。
- V2 主题/来源入口: `tools/kb new-topic` 和 `tools/kb new-source`。
- V2 来源关联: `tools/kb link-source` 将 `_workbench/inbox/` 来源资料受控关联到研讨 session。
- V2 来源前检查: `tools/kb check-source` 在来源标记 reviewed 前检查摘要、判断和 session 关联。
- V2 来源补全任务: `tools/kb prepare-source` 将来源检查失败项写入 `## 补全任务`。
- V2 来源摘要草稿: `tools/kb draft-source-summary` 从已关联 session 生成 `## 摘要草稿`。
- V2 来源草稿应用: `tools/kb apply-source-draft` 预览或受控复制 `## 摘要草稿` 到正式来源段落。
- V2 来源审阅预览: `tools/kb preview-source-review` 输出人工审阅材料、检查项、关联 session 和建议决定命令。
- V2 审阅状态流: `tools/kb review-source` 和 `tools/kb review-distillation` 记录人工审阅、退回和批准。
- V2 入库前检查: `tools/kb check-distillation` 在批准前检查沉淀候选结构完整性。
- V2 Promote 预览: `tools/kb preview-promote` 在正式写入前展示目标文件、生成 ID 和冲突风险。
- V2 Promote 审计: `tools/kb promote-audit` 在正式入库前展示门禁、计划写入文件、Git 状态、提交边界和回退策略。
- V2 沉淀审阅预览: `tools/kb preview-distillation-review` 输出沉淀内容、来源 session、入库计划、冲突风险和建议决定命令。
- V2 工作队列动作: `tools/kb queue` 输出 `next_action`、`preview_command` 和 `decision_commands`。
- V2 审阅队列入口: `tools/kb review-queue` 按优先级输出当前人工审阅任务。
- V2 工作队列快照: `tools/kb refresh-index` 生成带下一步动作的 `_index/generated-workbench-queue.md/json` 和 `_index/generated-review-queue.md/json`。
- V2 审阅包入口: `tools/kb review-packet` 汇总最高优先级人工审阅任务的上下文、检查项和建议命令。
- V2 多专家辩论: `tools/kb new-debate` 基于已有 session 创建 `_workbench/debates/` 红蓝攻防和专家对话文件。
- V2 辩论沉淀闭环: `tools/kb check-debate`、`preview-debate-review` 和 `draft-distillation-from-debate` 将成熟辩论受控转成沉淀候选草稿。
- V2 跨客户端接手: `tools/kb agent-brief` 输出 Codex、Claude Code、ChatGPT、自写脚本或未来 MCP 工具可读取的接手上下文。
- V2 MCP-ready 工具边界: `tools/kb tool-catalog` 输出资源、工具、权限级别、风险和人工确认要求。
- V2 Obsidian 人类前端: `tools/kb workspace-dashboard` 输出首屏总览、决策焦点、门禁状态、工作台层级和受保护动作。
- V2 静态只读工作台 UI: `tools/kb workspace-ui` 输出可直接打开的 `_index/generated-workspace-ui.html`，展示审阅焦点、门禁、RAG 范围和安全命令。
- V2 人工审阅决策辅助: `tools/kb decision-guide` 输出证据摘要、可选动作、适用条件、风险和 note 模板。
- V2 检索/RAG 边界: `tools/kb rag-scope` 输出 include、cautious、exclude 路径、优先级、适用条件和风险。
- V2 框架雷达: `_integrations/agent-framework-radar-2026-06.md` 记录 2025-06 之后 Agent/工作台/RAG 候选框架和建议 POC 顺序。

## 当前待处理

- `_workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md`
  - 状态：pending-human-review
  - 下一步：运行 `preview-distillation-review` 后人工确认是否批准进入 promote 前置状态
- `_workbench/distillations/2026-06-08-企业技术部门在Agent时代的定位-沉淀候选.md`
  - 状态：pending-human-review
  - 关联：已由 `db-20260609-001` 红蓝攻防补强
  - 下一步：运行 `preview-distillation-review` 后人工确认是否批准进入 promote 前置状态
- `_workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`
  - 状态：draft / convergence / check-debate passed
  - 下一步：作为 `ds-20260608-002` 的 `source_debates`，随沉淀候选一起审阅
- `_workbench/sessions/2026-06-08-企业技术部门在Agent时代的定位.md`
  - 状态：reviewed
  - 下一步：等待沉淀候选审阅
- `主题库/企业技术部门AI转型/README.md`
  - 状态：draft
  - 下一步：承接 `enterprise-ai-tech-org` 的正式主题入口
- `_workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md`
  - 状态：draft / draft-summary-applied / check-source passed
  - 关联：已进入 `ws-20260608-002`
  - 下一步：运行 `preview-source-review` 查看审阅材料，人工确认后运行 `review-source ... reviewed`

## 常用命令

```bash
tools/kb status
tools/kb validate
tools/kb search "Agent"
tools/kb refresh-index
tools/kb status --json
tools/kb workspace-dashboard
tools/kb workspace-ui > _index/generated-workspace-ui.html
tools/kb decision-guide --limit 3
tools/kb rag-scope --json
tools/kb agent-brief --json
tools/kb tool-catalog --json
tools/kb review-packet --limit 3
tools/kb new-session "议题名称" --topic topic-id
tools/kb new-debate "议题名称红蓝攻防" --topic topic-id --session ws-20260608-001 --target-topic-path 主题库/主题目录/
tools/kb check-debate _workbench/debates/2026-06-09-议题名称红蓝攻防.md
tools/kb preview-debate-review _workbench/debates/2026-06-09-议题名称红蓝攻防.md
tools/kb draft-distillation-from-debate _workbench/debates/2026-06-09-议题名称红蓝攻防.md
tools/kb new-topic "主题名称" --topic topic-id
tools/kb new-source "来源标题" --url "https://example.com" --topic topic-id
tools/kb link-source _workbench/inbox/2026-06-08-来源标题.md ws-20260608-002
tools/kb review-source _workbench/inbox/2026-06-08-来源标题.md reviewed --note "摘要和来源可信"
tools/kb promote --dry-run _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
tools/kb check-distillation _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
tools/kb preview-promote _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
tools/kb promote-audit _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
```

正式入库前的两段式命令：

```bash
tools/kb review-distillation _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md approve --note "人工同意进入正式入库前置状态"
tools/kb promote --confirm _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
```
