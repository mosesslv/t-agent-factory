---
type: source-note
status: reviewed
created: 2026-06-09
updated: 2026-06-09
source_type: github-repo
source_url: "https://github.com/anthropics/skills/tree/c30d329f5814647c1e2f071020c1e8c1c9893ef1"
source_title: "Anthropic Skills 官方仓库 skill-creator"
topic: agent-harness-skill-system
review_status: reviewed
---

# 来源资料：Anthropic Skills 官方仓库 skill-creator

## 摘要

- Anthropic 官方 `skills` 仓库展示了 Skills 的基本形态：每个 skill 是一个自包含文件夹，由 `SKILL.md`、可选脚本、参考资料、资产和评测/展示工具组成，用于让 Agent 在特定任务上形成可重复行为。
- `skills/skill-creator` 的核心价值不只是“写提示词”，而是把 skill 生命周期做成 harness：捕获意图、编写 skill、构造测试提示、跑 with-skill 与 baseline、让人审阅结果、用断言和 benchmark 评估，再迭代 skill 与触发描述。
- 对当前 Knowledge Workbench 的启发是：专家能力不能只沉淀为角色设定或长 prompt，而应封装成“触发条件 + 上下文加载 + 可执行资源 + 评测反馈 + 人类审阅”的可迁移工作单元。

## 关键摘录

- `README.md`：Skills 被定义为动态加载的 instructions / scripts / resources 文件夹；官方也明确该仓库主要用于演示和教育，实际产品行为可能不同，关键是学习模式而不是照搬实现。
- `skills/skill-creator/SKILL.md`：`description` 是 skill 触发的主要入口，应同时说明“做什么”和“什么时候用”；正文负责执行流程，额外资料通过渐进式加载进入上下文。
- `skills/skill-creator/SKILL.md`：推荐用少量真实测试提示启动，再扩展测试集；每个测试同时跑 with-skill 和 baseline，以便比较 skill 是否真的带来增量。
- `skills/skill-creator/scripts/quick_validate.py`：校验 `SKILL.md` frontmatter、必需字段、kebab-case 命名、描述长度和允许字段，说明 skill harness 需要结构约束。
- `skills/skill-creator/scripts/run_eval.py`、`run_loop.py`、`improve_description.py`：把触发评测、失败触发、误触发、train/test 拆分和描述优化做成可重复脚本，避免只靠主观感觉调 prompt。
- `skills/skill-creator/agents/grader.md`、`comparator.md`、`analyzer.md`：评测不是只看最终答案，还要评估断言质量、盲测两版输出、分析 transcript 中的工具使用、浪费步骤、失败模式和泛化风险。

## 初步判断

- 可信度：high。来源是 Anthropic 官方 GitHub 仓库，已固定到 commit `c30d329f5814647c1e2f071020c1e8c1c9893ef1`；但该仓库声明其示例主要用于演示和教育，不能等同于 Claude 产品的全部行为承诺。
- 与当前知识库关系：直接补强“人和 Agent 共同编织知识网络”的工程层。它把我们之前讨论的专家 profile、工作台、入库边界和多轮研讨，进一步推进到可验证的 agent harness 设计。
- 是否建议进入 session：是，已进入 `ws-20260609-001`。后续建议生成一个沉淀候选，主题为“真正的 Agent harness 思想”，但暂不直接进入 `主题库/`。
- 适配判断：应抽象为跨工具原则，而不是 Claude Code 专属实现。对 Codex、Claude Code、OpenAI Agents SDK、MCP、Obsidian 插件而言，可迁移的是结构、触发、资源、评测和审阅机制。
- 风险：如果只学习 `description` 和 `SKILL.md` 形式，会退化成提示词模板；如果忽略 baseline、eval、transcript、human review 和版本快照，就没有形成真正 harness。

## 后续处理

- [x] 关联到研讨 session
- [x] 生成摘要
- [x] 判断是否进入正式主题 sources：先不进入，等待 human review 和沉淀候选。
- [ ] 人工审阅该 source note
- [ ] 映射到本地 Knowledge Workbench harness 设计
- [ ] 生成沉淀候选：真正的 Agent harness 思想

## 已关联 Session

- [[_workbench/sessions/2026-06-09-Anthropic-Skills-官方仓库与-harness-思想]] (`ws-20260609-001`)

## Ingest 记录

- 获取方式：`git clone --depth 1 https://github.com/anthropics/skills.git /tmp/anthropic-skills`
- 固定 commit：`c30d329f5814647c1e2f071020c1e8c1c9893ef1`
- 重点阅读路径：
  - `README.md`
  - `skills/skill-creator/SKILL.md`
  - `skills/skill-creator/scripts/`
  - `skills/skill-creator/agents/`
  - `skills/skill-creator/references/schemas.md`

## 审阅记录

- 2026-06-09 `reviewed` by `human`: 用户在 2026-06-09 明确回复：approve。然后继续
