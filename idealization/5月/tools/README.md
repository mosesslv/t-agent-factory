---
type: tool-doc
status: active
created: 2026-06-08
updated: 2026-06-09
---

# Tools

## `tools/kb`

Knowledge Workbench 的轻量本地 CLI。它只维护秩序，不替代人工判断。

### Validate

```bash
tools/kb validate
```

检查 typed Markdown 的 frontmatter、状态、ID 前缀、来源 session 等。

### Status

```bash
tools/kb status
tools/kb status --json
tools/kb version-status
tools/kb version-status --json
tools/kb agent-brief
tools/kb agent-brief --json
tools/kb tool-catalog
tools/kb tool-catalog --json
tools/kb workspace-dashboard
tools/kb workspace-dashboard --json
tools/kb workspace-ui
tools/kb workspace-ui > _index/generated-workspace-ui.html
tools/kb decision-guide
tools/kb decision-guide --json
tools/kb rag-scope
tools/kb rag-scope --json
```

列出当前工作台、专家、规则、索引和集成计划的状态。

`--json` 输出给 Agent、脚本或未来 UI 使用。

`version-status` 是只读 Git 状态入口，用于查看当前分支、HEAD、未提交文件和最近提交；它不执行回退或切换分支。

`agent-brief` 是给 Codex、Claude Code、ChatGPT、自写脚本或未来 MCP 工具的只读接手上下文。它会汇总工作区根目录、版本状态、首读入口、当前最高优先级审阅任务、promote 审计摘要、安全规则和推荐命令；它不执行 review、approve 或 promote。

`tool-catalog` 是 MCP-ready 工具边界目录，会输出命令、资源、权限级别、风险、写入路径、自动调用策略和人工确认要求；它不执行任何被列出的工具。

`workspace-dashboard` 是 Obsidian 人类工作台总览，会聚合 Snapshot、Decision Focus、Gate Status、Workspace Layers、Safe Read Commands 和 Protected Actions；它不执行 review、approve 或 promote。

`workspace-ui` 输出静态只读 HTML 工作台，适合浏览器直接打开。它展示审阅焦点、门禁、RAG 范围、安全命令和受保护动作；默认输出到 stdout，不执行 review、approve 或 promote。

`decision-guide` 是人工审阅前的只读决策手册，会列出每个待审任务的证据摘要、可选动作、适用条件、风险和 note 模板；它不执行 review、approve 或 promote。

`rag-scope` 是检索/RAG 范围目录，会列出 include、cautious、exclude 三类路径、读取优先级、适用条件和风险；它不执行检索、审阅或入库。

### Queue

```bash
tools/kb queue
tools/kb queue --json
tools/kb review-queue
tools/kb review-queue --limit 3
tools/kb review-queue --ready-only
tools/kb review-queue --kind source-note
tools/kb review-queue --kind distillation-candidate
tools/kb review-queue --kind debate-session
tools/kb review-queue --json
tools/kb review-packet
tools/kb review-packet --limit 3
tools/kb review-packet --ready-only
tools/kb review-packet --json
```

输出当前可执行工作队列，包括来源资料、待 promote 的沉淀候选和活跃研讨 session。来源资料和沉淀候选会附带 `check_ok`、`blocking_checks`、`next_action`、`preview_command` 和 `decision_commands`，用于让人或 Agent 直接进入下一步审阅。`--json` 可直接供 Obsidian 插件、脚本或其他 Agent 工作台读取。

`review-queue` 将队列压成按优先级排序的人工审阅任务，适合作为 Obsidian 工作台首页的“现在先处理什么”入口。`--ready-only` 只显示已准备好人工决策的任务；`--kind` 可按来源资料或沉淀候选过滤。

`review-packet` 会把最高优先级人工审阅任务的上下文、检查项和建议命令汇总成只读审阅包；它不执行 approve、review 或 promote。

`tools/kb refresh-index` 会同步生成 `_index/generated-workbench-queue.md/json`、`_index/generated-review-queue.md/json` 和 `_index/generated-review-packet.md/json`，用于不直接执行 CLI 的客户端读取。

`_index/generated-agent-brief.md/json`、`_index/generated-version-status.md/json` 和 `_index/generated-promote-audit.md/json` 包含本地 Git 状态，属于运行态快照，默认不提交进 Git。

`_index/generated-tool-catalog.md/json` 不包含本地 Git 状态，是可提交的工具契约快照，用于未来 MCP server、Obsidian 插件或其他 Agent 客户端适配。

`_index/generated-rag-scope.md/json` 不包含本地 Git 状态，是可提交的检索范围契约快照，用于 Khoj、Obsidian 插件、MCP resources 或其他 RAG 客户端决定哪些目录优先读取、谨慎读取或默认排除。

`_index/generated-workspace-ui.html` 不包含本地 Git 状态，是可提交的只读工作台浏览器入口。

### New Session

```bash
tools/kb new-session "企业技术部门在 Agent 时代的定位" --topic enterprise-ai-tech-org
```

按标准模板创建新的 `_workbench/sessions/` 文件。

### New Debate

```bash
tools/kb new-debate "企业技术部门 AI 转型红蓝攻防" --topic enterprise-ai-tech-org --session ws-20260608-002 --target-topic-path 主题库/企业技术部门AI转型/
tools/kb check-debate _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md
tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md
tools/kb draft-distillation-from-debate _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md
```

按标准模板创建新的 `_workbench/debates/` 文件，用于多专家持久化讨论、红蓝攻防和阶段性收敛。辩论文件必须关联已有 session，属于过程材料，不会自动进入正式知识库。

`check-debate` 检查 Round 1、Round 2、Round 3 和沉淀建议是否已有真实内容。`preview-debate-review` 输出只读审阅页和建议命令。`draft-distillation-from-debate` 只写入 `_workbench/distillations/` 草稿，并记录 `source_debates`，不会 approve 或 promote。

### New Topic

```bash
tools/kb new-topic "企业技术部门AI转型" --topic enterprise-ai-tech-org
```

在 `主题库/` 下创建正式主题骨架。默认是 `draft`，不会自动生成正式知识卡。

### New Source

```bash
tools/kb new-source "文章标题" --url "https://example.com" --topic enterprise-ai-tech-org
```

在 `_workbench/inbox/` 下创建来源资料 note。来源资料默认是 `inbox`，需要审阅后才能进入 session 或正式主题 sources。

### Link Source

```bash
tools/kb link-source _workbench/inbox/2026-06-08-文章标题.md ws-20260608-002
```

把来源资料受控关联到研讨 session。该命令会：

- 将 source note 路径写入 session 的 `source_inputs`
- 将 source note 的 `review_status` 更新为 `linked-to-session`
- 在 source note 中记录已关联 session
- 重复执行不会重复写入同一条 `source_inputs`

### Review Source

```bash
tools/kb check-source _workbench/inbox/2026-06-08-文章标题.md
tools/kb check-source _workbench/inbox/2026-06-08-文章标题.md --json
tools/kb prepare-source _workbench/inbox/2026-06-08-文章标题.md
tools/kb draft-source-summary _workbench/inbox/2026-06-08-文章标题.md
tools/kb apply-source-draft _workbench/inbox/2026-06-08-文章标题.md
tools/kb apply-source-draft _workbench/inbox/2026-06-08-文章标题.md --confirm
tools/kb preview-source-review _workbench/inbox/2026-06-08-文章标题.md
tools/kb preview-source-review _workbench/inbox/2026-06-08-文章标题.md --json
tools/kb review-source _workbench/inbox/2026-06-08-文章标题.md reviewed --note "摘要和来源可信"
tools/kb review-source _workbench/inbox/2026-06-08-文章标题.md needs-evidence --note "缺少原始链接"
tools/kb review-source _workbench/inbox/2026-06-08-文章标题.md rejected --note "与议题无关"
```

`check-source` 检查来源资料是否已关联 session、是否有摘要、是否有初步判断。`prepare-source` 会把未通过项写入 `## 补全任务` 并标记为 `needs-evidence`。`draft-source-summary` 从已关联 session 生成 `## 摘要草稿`，不覆盖正式摘要。`apply-source-draft` 默认只预览，`--confirm` 才会把草稿复制到正式 `## 摘要` 和 `## 初步判断`，但不会标记为 `reviewed`。`preview-source-review` 是只读人工审阅页，会展示正式摘要、初步判断、检查项、关联 session 和建议决定命令。`reviewed` 默认要求检查通过；`rejected` 会标记为 `deprecated`。

### Review Distillation

```bash
tools/kb check-distillation _workbench/distillations/2026-06-08-候选.md
tools/kb check-distillation _workbench/distillations/2026-06-08-候选.md --json
tools/kb preview-distillation-review _workbench/distillations/2026-06-08-候选.md
tools/kb preview-distillation-review _workbench/distillations/2026-06-08-候选.md --json
tools/kb review-distillation _workbench/distillations/2026-06-08-候选.md approve --note "同意进入正式入库前置状态"
tools/kb review-distillation _workbench/distillations/2026-06-08-候选.md needs-revision --note "需要补充来源"
tools/kb review-distillation _workbench/distillations/2026-06-08-候选.md reject --note "不进入正式知识库"
```

`check-distillation` 检查来源、目标目录、稳定判断、概念定义、决策候选、待验证问题和人工确认说明。`preview-distillation-review` 是只读人工审阅页，会展示沉淀内容、来源 session、目标文件计划、冲突风险、检查项和建议决定命令。`review-distillation approve` 默认要求检查通过，之后仍需显式执行 `promote --confirm` 才会写入 `主题库/`。

### Promote Dry Run

```bash
tools/kb promote --dry-run _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
tools/kb preview-promote _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
tools/kb preview-promote _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md --json
tools/kb promote-audit _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
tools/kb promote-audit _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md --json
```

检查沉淀候选是否满足 promote 前置条件，并预览将写入或追加的目标文件。预览发现知识卡或 ADR 文件冲突时会返回失败。以上命令不会写入正式知识库。

`promote-audit` 是正式入库前的只读审计包，会展示门禁、计划写入文件、当前 Git 状态、建议提交边界和回退方式；它不会执行 approve 或 promote。

### Approve Distillation

```bash
tools/kb approve-distillation _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
```

将沉淀候选从 `pending-human-review` 标记为 `approved-for-promotion`。这一步代表人工确认已经发生。

### Confirm Promote

```bash
tools/kb promote --confirm _workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md
```

在候选已经 `approved-for-promotion` 后，写入正式主题库文件并把候选标记为 `promoted`。

### Search

```bash
tools/kb search "Agent" --limit 10
```

在知识根目录中做轻量 Markdown 搜索。

### Refresh Index

```bash
tools/kb refresh-index
```

生成：

- `_index/generated-manifest.md`
- `_index/generated-promotion-queue.md`
- `_index/generated-promote-audit.md`
- `_index/generated-workbench-queue.md`
- `_index/generated-review-queue.md`
- `_index/generated-review-packet.md`
- `_index/generated-decision-guide.md`
- `_index/generated-rag-scope.md`
- `_index/generated-agent-brief.md`
- `_index/generated-tool-catalog.md`
- `_index/generated-workspace-dashboard.md`
- `_index/generated-version-status.md`
- `_index/generated-workspace-ui.html`
- `_index/generated-manifest.json`
- `_index/generated-promotion-queue.json`
- `_index/generated-promote-audit.json`
- `_index/generated-workbench-queue.json`
- `_index/generated-review-queue.json`
- `_index/generated-review-packet.json`
- `_index/generated-decision-guide.json`
- `_index/generated-rag-scope.json`
- `_index/generated-agent-brief.json`
- `_index/generated-tool-catalog.json`
- `_index/generated-workspace-dashboard.json`
- `_index/generated-version-status.json`

### Regression Test

```bash
python3 tools/test_kb.py
```

覆盖 validate、status JSON、version-status JSON、agent-brief JSON、tool-catalog JSON、workspace-dashboard JSON、workspace-ui HTML、decision-guide JSON、rag-scope JSON、queue JSON、review-queue JSON、review-packet JSON、check-source、preview-source-review、check-debate、preview-debate-review、draft-distillation-from-debate、check-distillation、preview-distillation-review、preview-promote、promote-audit、dry-run promote、未审批 confirm 拒绝、refresh-index、search、new-session/new-debate、new-topic、new-source、link-source、draft-source-summary、apply-source-draft、review-source 和 review-distillation。
