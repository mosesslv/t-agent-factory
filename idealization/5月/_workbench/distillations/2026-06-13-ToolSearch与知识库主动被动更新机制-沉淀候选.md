---
id: ds-20260613-001
type: distillation-candidate
topic: agent-harness-skill-system
status: draft
created: 2026-06-13
updated: 2026-06-13
source_sessions:
  - ws-20260613-001
target_topic_path: 主题库/Agent协作与Harness/
promotion_status: pending-human-review
---

# 沉淀候选：ToolSearch 与知识库主动/被动更新机制

## 来源

- Session：`_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计.md`
- Source note：`_workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md`
- 相关正式知识：
  - `主题库/Agent协作与Harness/专业知识/01-真正的-Agent-harness-思想.md`
  - `主题库/人和Agent共同编织知识网络/专业知识/01-人和-Agent-共同编织知识网络.md`

## 建议入库内容

### 稳定判断

1. ToolSearch 的本质不是搜索代码或数据，而是面向 Agent 工具空间的能力检索与按需装载机制。
2. 当工具、MCP server、插件和业务能力数量膨胀时，把所有 tool schema 常驻上下文会带来 token 成本、上下文污染、工具选择困难、prompt cache 不稳定和权限治理压力。
3. 更可扩展的模式是：常驻少量核心工具，把长尾工具作为 deferred tools，通过轻量索引、`searchHint` 和按需 schema 加载缩小 action space。
4. Knowledge Workbench 的知识更新机制可以借鉴 ToolSearch 的思想：不要把所有潜在沉淀直接写入正式知识库，而是先做候选发现、候选索引、风险分层和按需审阅。
5. 当前 Knowledge Workbench 已有被动沉淀工作流、审阅队列、RAG scope、工具权限目录和项目级 reflection，但尚未形成完整的主动巡检与会话钩子闭环。
6. 知识更新的自动化边界应是“自动发现候选、自动生成只读审阅包、自动刷新索引”，而不是自动 review、approve 或 promote。

### 概念定义

1. Capability search：面向 Agent 可调用能力的检索机制，搜索对象是工具、技能、工作流或 adapter 的定义，而不是业务数据本身。
2. Deferred tool：默认不把完整 schema 暴露给模型，只在被搜索命中或明确选择后加载完整定义的工具。
3. 主动知识更新机制：由定时任务、后台 worker 或显式巡检命令触发，扫描 Git diff、工作台队列、会话产物、验证结果和高价值变更，生成可审阅的沉淀候选。
4. 被动知识更新机制：在用户与 Agent 会话过程中，Agent 根据规则判断当前内容是否值得沉淀，并在工作台生成 source note、session、distillation candidate、reflection 或 correction。
5. Capture candidate：自动或半自动发现的“可能值得沉淀”条目，只能进入工作台队列，不能直接成为正式知识。

### 可复用框架

```text
Knowledge update loop
= passive capture during session
+ active scheduled scan
+ candidate scoring
+ workbench candidate queue
+ read-only review packet
+ human review decision
+ controlled promote
+ index refresh and validation
```

主动扫描建议最小实现：

```text
daily or on-demand job
-> tools/kb agent-brief --json
-> tools/kb review-queue --json
-> git log/diff since last scan
-> scan _workbench/sessions, distillations, reflections, corrections
-> score candidates
-> write _workbench/capture-candidates/YYYY-MM-DD-*.md
-> tools/kb refresh-index
```

被动捕获建议最小实现：

```text
end of non-trivial Codex turn
-> ask: did this create reusable knowledge, a rule, a correction, or a decision?
-> if yes, write only to _workbench/
-> never auto-review or auto-promote
-> surface next review command to human
```

### 决策记录候选

1. 下一阶段不应直接建设“自动入库”，而应先建设“候选发现层”，把主动和被动发现的沉淀机会统一进入工作台队列。
2. 自动化工具最多可写 `_workbench/capture-candidates/`、`_workbench/reflections/`、`_workbench/corrections/` 和 `_index/`，不得自动写 `主题库/`。
3. 主动扫描应优先覆盖 Git 变更、Codex session 产物、review queue、validation 结果和高频用户确认，而不是泛化爬取所有内容。
4. 被动捕获应绑定“非平凡会话结束检查”，避免每句话都沉淀，也避免重要用户纠正和可复用框架丢失。
5. 候选评分应区分四类输出：source note、distillation candidate、reflection/correction、project rule update candidate。

## 不建议入库内容

- 把非官方源码研究中的内部实现细节当成 Claude Code 官方源码事实。
- 把 ToolSearch 误写成代码搜索、Web 搜索或 RAG 搜索。
- 直接把自动扫描结果 promote 到 `主题库/`。
- 为主动更新机制一开始引入复杂平台或全局记忆 hook；当前更适合从项目内 Markdown + CLI + 定时脚本开始。

## 待验证问题

- Codex desktop 是否能提供可靠的 session 结束 hook 或自动化提醒入口。
- 是否需要新增 typed schema：`capture-candidate`、`scheduled-scan-report` 或 `knowledge-update-audit`。
- 主动扫描的最小周期应是 daily、weekly，还是只在 Git commit/session end 后触发。
- 候选评分阈值如何避免噪音：哪些内容只是过程材料，哪些应该进入 review queue。
- 是否需要为 Codex、Claude Code、Obsidian、MCP server 分别设计 adapter。

## 与已有知识的关系

- 新增：为 `Agent协作与Harness` 补充“能力检索/延迟加载”视角。
- 新增：为 Knowledge Workbench 补充“主动/被动知识更新闭环”的演进方向。
- 更新：把已有 reflection/correction 机制定位为被动项目自改进的一部分，而不是完整知识更新系统。
- 复用：现有 source note、session、distillation、review queue、decision-guide、rag-scope、tool-catalog 和 promote gate。
- 冲突：暂无直接冲突；但会限制任何“自动正式入库”的设计。

## Promote 建议

- 建议目标目录：`主题库/Agent协作与Harness/`
- 建议文件类型：knowledge-card + decision-record
- 是否需要人工确认：是
