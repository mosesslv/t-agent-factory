---
id: ws-20260613-001
type: discussion-session
topic: agent-harness-skill-system
status: draft
created: 2026-06-13
updated: 2026-06-13
stage: distillation
participants:
  - human
  - codex
  - knowledge-editor
  - architect
  - red-team
source_inputs:
  - _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md
related_knowledge:
  - 主题库/Agent协作与Harness/专业知识/01-真正的-Agent-harness-思想.md
  - 主题库/人和Agent共同编织知识网络/专业知识/01-人和-Agent-共同编织知识网络.md
  - _meta/工作流说明.md
  - _meta/知识入库规则.md
  - _meta/agent-improvement-rules.md
  - _integrations/mcp/README.md
---

# 研讨 Session：ToolSearch 与知识更新机制审计

## 议题

基于用户提供的 ToolSearch 研究材料，新增一条工作台知识更新，并检查当前 Knowledge Workbench 是否同时具备主动和被动的记忆/知识更新机制。

## 背景

用户关注两个问题：

1. Claude Code 生态中的 ToolSearch 是否是一种能力检索与延迟加载机制，以及它本质上解决什么问题。
2. 当前知识库是否具备主动更新记忆和知识的机制，包括定时巡检 Codex 迭代中值得沉淀的知识，以及会话过程中被动判断哪些内容应进入沉淀链路。

## 已调取知识

- `_meta/工作流说明.md`：当前主链路是“输入碎片 -> 调取已有知识 -> 多专家研讨 -> 沉淀候选 -> 人确认 -> 正式知识”。
- `_meta/知识入库规则.md`：正式知识必须通过 source/session、distillation、review、promote 确认，不能直接从原始对话写入 `主题库/`。
- `_meta/agent-improvement-rules.md`：存在项目级 reflection/correction 机制，用于非平凡迭代后的项目自改进；它明确不是全局记忆，也不是正式知识。
- `_integrations/mcp/README.md` 与 `_index/generated-tool-catalog.json`：已有 MCP/tool 边界、read-only/index-write/workbench-write/review-decision/formal-knowledge-write 权限分层。
- `tools/kb` 与生成索引：已有 queue、review-queue、review-packet、decision-guide、rag-scope、workspace-dashboard、refresh-index 等人工/Agent 可读入口。

## 人类输入

- 将粘贴材料中的 ToolSearch 研究新增到本次知识库。
- 检查当前知识库是否同时存在主动和被动的记忆/知识更新机制。
- 如果没有，说明如何迭代以及为什么。

## 机制审计

### 已有被动机制

- 用户或 Agent 可把来源资料写入 `_workbench/inbox/`，再关联 session。
- 战略研讨或知识沉淀需求可创建 `_workbench/sessions/`、`_workbench/debates/` 和 `_workbench/distillations/`。
- `review-queue`、`review-packet`、`decision-guide` 会把待审任务暴露出来，但不会替代人工确认。
- 非平凡项目迭代后已有 `_workbench/reflections/` 与 `_workbench/corrections/` 机制，用于记录过程改进和用户纠正。

判断：被动机制基本存在，但主要依赖当前 Agent 按规则主动执行；它不是自动的会话监听器。

### 已有主动机制

- `tools/kb refresh-index` 可以主动刷新索引，`review-queue` 可以主动列出待审事项。
- `_index/generated-*` 为其他客户端、MCP server 或 Obsidian 插件提供机器可读状态。

判断：主动机制只到“可由人或外部任务触发的主动检查”，没有看到定时任务、后台巡检、Codex 会话历史扫描、Git diff 智能候选发现或自动提醒机制。

### 缺口

1. 没有定时任务或后台 worker 去周期性运行 `agent-brief`、`review-queue`、`git log/diff`、会话记录扫描并生成候选。
2. 没有“会话结束/阶段结束”钩子，系统不会自动判断本轮是否产生 source note、distillation candidate、reflection 或 correction。
3. 没有候选评分标准来判断哪些 Codex 迭代值得沉淀，例如重复出现、用户确认、可复用框架、修改了规则、通过验证、暴露风险等。
4. 没有把主动扫描结果落到固定队列，例如 `_workbench/capture-candidates/` 或 typed `capture-candidate`。
5. 没有为自动发现候选定义权限边界：它应只能写入工作台候选，不能自动 review、approve 或 promote。

## 阶段结论

- ToolSearch 的第一性原理是：当 Agent 能力空间变大时，应把能力做成可搜索、可延迟加载、可权限治理、可按需激活的资源。
- 当前 Knowledge Workbench 已经有受控入库链路、审阅队列、RAG scope、工具权限目录和项目级 reflection，但尚未形成完整的主动/被动知识更新闭环。
- 最合理的演进不是让系统直接自动入库，而是先新增“候选发现层”：主动巡检和被动会话钩子都只生成候选，候选再进入现有 review/promotion 闸门。

## 下一步

- 已生成沉淀候选：`_workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`
- 若要进入正式知识，需要先人工审阅该候选，再按 `review-distillation -> promote-audit -> promote --confirm` 流程推进。
