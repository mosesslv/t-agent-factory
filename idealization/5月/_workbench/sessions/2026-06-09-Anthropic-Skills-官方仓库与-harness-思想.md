---
id: ws-20260609-001
type: discussion-session
topic: agent-harness-skill-system
status: draft
created: 2026-06-09
updated: 2026-06-09
stage: distillation
participants:
  - human
  - product-manager
  - architect
  - knowledge-editor
  - red-team
  - delivery-lead
source_inputs:
  - _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md
related_knowledge:
  - _workbench/sessions/2026-06-08-人和Agent共同编织知识网络.md
  - _meta/workflows/knowledge-promotion-workflow.md
  - _index/00-知识工作台入口.md
---

# 研讨 Session：Anthropic Skills 官方仓库与 harness 思想

## 议题

Anthropic Skills 官方仓库与 harness 思想

## 背景

用户新增一个外部知识输入：Anthropic 官方 `anthropics/skills` 仓库，尤其是 `skills/skill-creator`。这不是单纯补充一个工具链接，而是要从官方 skill repo 中学习“真正的 harness 思想”，反向校准当前 Knowledge Workbench 的专家协作、知识沉淀、评测和迁移设计。

当前工作台已经有正式知识区、过程区、专家 profile、索引和 promote 边界，但仍缺少一层清晰的 agent harness 规范：一个专家或工作流到底如何被触发、如何拿上下文、如何使用脚本/资料、如何评测、如何让人审阅，以及如何跨 Codex / Claude Code / Obsidian / 其他 Agent runtime 保持可迁移。

## 已调取知识

- `_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`：本轮新增 source note，来源固定到官方 GitHub commit `c30d329f5814647c1e2f071020c1e8c1c9893ef1`。
- Anthropic repo `README.md`：确认 Skills 是动态加载的 instructions / scripts / resources 文件夹；仓库定位为演示和教育参考。
- Anthropic repo `skills/skill-creator/SKILL.md`：确认 skill lifecycle 包括意图捕获、draft、测试提示、with-skill / baseline、人工审阅、断言、benchmark、迭代和打包。
- Anthropic repo `skills/skill-creator/scripts/`：确认官方示例把校验、触发评测、描述优化、benchmark 聚合和 review viewer 做成脚本，而不是只依赖一次性对话。
- Anthropic repo `skills/skill-creator/agents/`：确认 grader / comparator / analyzer 被拆成专门的评测视角，用于检查断言质量、盲测输出和 transcript 模式。
- 本地 Codex `skill-creator` skill：与官方思路一致，强调渐进式披露、可执行资源、独立验证和反馈循环。

## 人类输入

用户原始意图摘要：

- 新增官方 Anthropic Skills 仓库作为知识 ingest。
- 特别关注 `skills/skill-creator`。
- 目的不是学习某个提示词模板，而是从中学习真正的 harness 思想。

## 专家观点

### 产品经理

- 核心观点：skill 的产品价值不是“更长的人设”，而是把一类高价值工作变成可复用、可触发、可评测、可交付的能力单元。
- 对工作台的启发：未来每个专家团队不应只写 `_agents/*.md` 角色说明，还应有适用场景、输入输出、可调用资源、校验方式和人工审阅入口。
- 最小下一步：先把“harness checklist”作为本地工作台规范，而不是立刻开发大型多 Agent 平台。

### 架构专家

- 核心观点：真正的 harness 至少有五层：触发层、上下文加载层、资源/工具层、执行记录层、评测反馈层。
- Anthropic skill 形态的可迁移部分：
  1. `description` 类似路由/触发契约。
  2. `SKILL.md` 类似工作流入口。
  3. `scripts/`、`references/`、`assets/` 类似可执行能力和长上下文外置资源。
  4. eval workspace、benchmark、review viewer 类似质量回路。
  5. grader / comparator / analyzer 类似独立评审 agent。
- 对本项目的落地建议：在 `_agents/` 或未来 `_harness/` 中建立统一结构，但先从 Markdown + CLI 校验开始，不引入过重 runtime。

### 知识编辑专家

- 核心观点：本轮资料应先留在 `_workbench/inbox` 和 session 中；正式入库前要提炼为“Agent harness 设计原则”和“本地 Knowledge Workbench 适配方案”。
- 可沉淀内容：渐进式披露、触发描述、baseline 对照、断言质量、盲测、transcript 分析、人工审阅。
- 不应沉淀内容：Claude Code 专用命令、官方示例中的环境细节、未经本地验证的脚本运行假设。

### 红队专家

- 反对点：把 Anthropic skill repo 简化成“写一个更好的提示词模板”会错过重点。
- 最弱假设：认为只要有 `SKILL.md`，Agent 就会稳定执行。官方 repo 实际上用 eval、baseline、viewer 和 grader 来约束这种不稳定性。
- 风险：如果没有 false-trigger / should-not-trigger 测试，专家能力会污染任务路由；如果没有 baseline，无法证明新 harness 比普通对话更好。

### 研发交付专家

- 实施判断：当前阶段只做 ingest 和结构化理解，不做 promote，不改正式知识。
- 后续工程路线：先新增一个本地 harness 规范或 checklist，再挑一个现有专家 profile 做 POC，例如“知识编辑专家”或“红蓝攻防研讨”。
- 验证方式：POC 至少要有 3 个真实任务提示、baseline 对照、输出路径、人工审阅记录和一次迭代 diff。

## 阶段结论

### 共识

1. “真正的 harness”不是 prompt，而是可重复任务能力的封装。
2. 一个可用 harness 至少要包含触发契约、执行入口、外置资源、可运行脚本、评测集、baseline、审阅界面或审阅包、版本和迭代记录。
3. Anthropic `skill-creator` 的关键启发是把“创建 skill”本身做成可评测流程，并把人的反馈放在循环中。
4. 对当前 Knowledge Workbench 来说，下一步不是复制 Claude 的 skill 文件结构，而是抽象出跨工具的本地 harness 规范。
5. 本轮内容先作为 source note 和 session 保存，等待人工审阅；不得自动进入 `主题库/`。

### 可迁移设计原则

- 触发必须可测试：不仅要有 should-trigger，还要有 should-not-trigger 和 near-miss。
- 上下文必须分层：短描述常驻，流程入口按需读取，长资料和脚本外置。
- 执行必须留痕：每次 run 的输入、输出、耗时、资源、失败和人工反馈都应可回看。
- 评测必须能区分增量：有 baseline，才知道 harness 是否比普通对话更好。
- 审阅必须在闭环内：人的判断不是最后口头评价，而是进入 feedback / review artifact。
- 版本必须可回退：每轮变更都应能通过 Git 或工作区快照回到上一版。

### 待验证假设

1. 本地 Markdown + CLI 是否足够表达一个轻量 harness，而不需要先引入完整 Agent runtime。
2. 当前 `_agents/` 是否应该升级为 `_agents/<expert>/SKILL.md` 风格，还是另建 `_harness/` 目录。
3. Obsidian 是否适合作为 review viewer 的人类入口，还是需要生成独立 HTML review 包。
4. Codex 和 Claude Code 的 skill / subagent / MCP 能力差异，是否要求同一 harness 有多种 adapter。

## 下一步

- 人工审阅 source note：`_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`
- 已生成沉淀候选：`_workbench/distillations/2026-06-09-真正的-Agent-harness-思想-沉淀候选.md`
- 设计本地最小 harness checklist，约束未来专家 profile：
  - trigger / when-to-use
  - input / output contract
  - context loading policy
  - allowed writes and promotion boundary
  - scripts / references / assets
  - eval prompts and assertions
  - baseline comparison
  - human review artifact
  - version and rollback policy
- 选择一个 POC expert，把现有 `_agents/*.md` 从角色说明升级为可评测 harness。
