---
id: ds-20260609-003
type: distillation-candidate
topic: agent-harness-skill-system
status: promoted
created: 2026-06-09
updated: 2026-06-09
source_sessions:
  - ws-20260609-001
target_topic_path: 主题库/Agent协作与Harness/
promotion_status: promoted
---

# 沉淀候选：真正的 Agent harness 思想

## 来源

- Session：`_workbench/sessions/2026-06-09-Anthropic-Skills-官方仓库与-harness-思想.md`
- Source note：`_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`
- 外部资料：Anthropic 官方 `skills` 仓库，固定 commit `c30d329f5814647c1e2f071020c1e8c1c9893ef1`
- 重点路径：
  - `README.md`
  - `skills/skill-creator/SKILL.md`
  - `skills/skill-creator/scripts/`
  - `skills/skill-creator/agents/`
  - `skills/skill-creator/references/schemas.md`

## 建议入库内容

### 稳定判断

1. 真正的 Agent harness 不是一段 prompt，也不是单纯角色设定，而是把一类任务能力封装为可触发、可执行、可评测、可审阅、可迭代的工作单元。
2. Harness 的核心结构应包括触发契约、执行入口、渐进式上下文、外置资源、可运行脚本、评测集、baseline 对照、人类审阅和版本回退。
3. Anthropic `skill-creator` 的关键启发是：创建和改进 skill 本身也需要 harness，而不是依赖一次性人工感觉。
4. `description` 类字段不是普通说明文字，而是任务路由和触发契约；它应能被 should-trigger、should-not-trigger 和 near-miss 测试验证。
5. 一个专家 profile 只有角色、口吻和偏好还不够；如果要进入持久化协作系统，应升级为可测试 harness。
6. 对当前 Knowledge Workbench 来说，可迁移的是 harness 思想和文件化结构，不是 Claude Code 的具体命令或产品行为。

### 概念定义

1. Agent harness：围绕一个可复用任务能力建立的触发、上下文、工具、评测、审阅和版本控制封装。
2. 触发契约：说明某个专家、skill 或 workflow 应在什么用户意图、输入形态和上下文条件下被调用。
3. 渐进式上下文：短描述常驻，执行入口按需读取，长资料、脚本、模板和资产外置，避免一次性污染上下文窗口。
4. Baseline 对照：同一任务同时比较 with-harness 和 without-harness，或比较新旧 harness，用于判断增量价值。
5. Human review artifact：让人的反馈进入循环的审阅记录，可是 review packet、HTML viewer、Obsidian 页面或结构化 feedback 文件。

### 可复用框架

```text
Agent harness
= trigger contract
+ context loading policy
+ executable workflow entry
+ scripts / references / assets
+ eval prompts and assertions
+ baseline comparison
+ transcript / run trace
+ human review artifact
+ iteration and rollback policy
```

### 本地 Knowledge Workbench 适配

1. `_agents/` 继续保存专家 profile，但下一阶段应为关键专家增加 harness checklist。
2. `_workbench/` 继续保存 session、debate、source note 和 distillation，作为 harness 的运行与审阅记录。
3. `_meta/` 应保存跨工具的 harness 规范，不绑定 Codex、Claude Code、OpenAI Agents SDK 或 Obsidian 插件。
4. `tools/kb` 应承担轻量校验、索引、队列和 promote 边界，避免把知识质量完全交给每次对话的上下文理解。
5. Obsidian 可以作为人的 review viewer；如果后续需要更强交互，再生成 HTML review 包或 Web 工作台。

### 决策记录候选

1. 下一阶段不把专家系统升级理解为“写更多人设 prompt”，而是逐步把高频专家协作升级为可评测 harness。
2. 不把 Claude Code 的 skills 结构直接作为本地标准；本地标准应抽象为跨 runtime 的 harness contract。
3. 第一个 POC harness 应选择已有工作流中高频、可验证、边界清晰的角色，例如知识编辑专家或红蓝攻防研讨。
4. 没有 baseline、eval 或 human review artifact 的专家能力，不应宣称已经形成可复用 harness。

## 不建议入库内容

- Anthropic 仓库中的 Claude 专属命令细节。
- 未在本地跑通的脚本执行假设。
- 将 `SKILL.md` 形式等同于完整 harness 的简化判断。
- 对某个 Agent runtime 的强绑定技术选型。

## 待验证问题

- 当前 Markdown + CLI 是否足以表达 V1 轻量 harness。
- `_agents/<expert>/SKILL.md` 风格和另建 `_harness/` 目录，哪种更适合本项目。
- Obsidian 是否足够承担 human review artifact 的展示层。
- Codex、Claude Code、OpenAI Agents SDK、MCP 客户端之间的 adapter 差异是否需要单独建模。
- 哪一个专家角色最适合作为第一个 POC harness。

## 与已有知识的关系

- 新增：为“人和 Agent 共同编织知识网络”补上工程化 harness 视角。
- 更新：把专家 profile 从“协作视角”进一步升级为“可触发、可评测、可回退的协作能力”。
- 复用：工作台边界、source note、distillation、promote、Git 回退和 review queue。
- 冲突：暂无直接冲突。
- 可能废弃：如果后续引入成熟 runtime，应保留文件化 contract，但可替换具体执行 adapter。

## Promote 建议

- 建议目标目录：`主题库/Agent协作与Harness/`
- 建议文件类型：
  - `README.md`
  - `专业知识/01-真正的-Agent-harness-思想.md`
  - `决策记录/ADR-001-专家系统升级为可评测-harness.md`
- 是否需要人工确认：是

## 审阅记录

- 2026-06-09 `approve` by `human`: 用户在 2026-06-09 明确回复：approve。然后继续
