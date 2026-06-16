---
type: evidence-card
status: accepted
topic: feedback-driven-self-improvement
created: 2026-06-16
updated: 2026-06-16
confidence: medium
related:
  - 09-agents/feedback-driven-improvement-protocol.md
  - 06-iteration/templates/improvement-proposal.md
---

# Feedback-Driven Self-Improvement 来源证据卡

## 1. 结论摘要

t-agent 应吸收两类外部模式：

- Matt Pocock productivity skills：把 `grill-me`、`handoff`、`write-a-skill` 作为可触发协作动作；
- BerriAI self-improving-agent：把用户对 agent 自身的反馈转成最小 diff proposal，并在明确批准后再 apply。

t-agent 的本地化做法：

```text
feedback signal
  -> current-response adaptation
  -> learning event
  -> improvement proposal
  -> review gate / approval
  -> eval
  -> style / agent / skill / protocol update
```

## 2. External Sources

| 来源 | 类型 | 启发 |
|---|---|---|
| Matt Pocock productivity skills: https://github.com/mattpocock/skills/tree/main/skills/productivity | open-source | productivity skills 是可移植协作模式库，适合映射到 resident agents 的动作。 |
| `grill-me`: https://github.com/mattpocock/skills/blob/main/skills/productivity/grill-me/SKILL.md | open-source | 用一问一答方式压测设计树；t-agent 应把它用于 proposal / PRD / roadmap 风险压测。 |
| `write-a-skill`: https://github.com/mattpocock/skills/blob/main/skills/productivity/write-a-skill/SKILL.md | open-source | skill 需要明确 description、trigger、结构和 review checklist。 |
| `handoff`: https://github.com/mattpocock/skills/blob/main/skills/productivity/handoff/SKILL.md | open-source | 跨会话交接应引用已有产物，避免复制 PRD/ADR/diff。 |
| BerriAI self-improving-agent: https://github.com/BerriAI/self-improving-agent | open-source | 通过 `write_improvement_proposal` 和 `apply_proposal` 建立 proposal -> approval -> PR 的安全闭环。 |
| BerriAI feedback skill: https://github.com/BerriAI/self-improving-agent/blob/main/skills/feedback.md | open-source | 只在用户批评 agent 自身行为时触发，不处理普通产品反馈。 |

## 3. ProductFactory Sources

| 来源 | 状态 | 启发 |
|---|---|---|
| `11 Architecture/ProductFactory v0.7 Product Learning Loop.md` | formal | 学习循环应从真实项目回流、社区信号和专家源生成 candidate，再由 review gate 晋升。 |
| `06 Decision Log/2026-06-15 ProductFactory v0.7 Product Learning Loop.md` | formal | ProductFactory 已接受“候选学习不自动变正式知识”的规则。 |
| `03 Skills/product-learning-review.md` | formal | 复盘和反馈应成为可触发 harness，而不是散落在聊天里。 |

## 4. Evidence

- BerriAI 明确要求提案先生成 proposal，`apply` 需要最新用户消息中的明确批准。
- BerriAI 的 proposal 模型要求目标文件、原始片段、替换片段、原因和风险等级。
- Matt Pocock 的 skill 写法强调 description 是 agent 选择 skill 的关键，需要清楚触发条件。
- t-agent 已有 KB-1 的 learning event、promotion checklist、Obsidian Base 和 eval runner，适合扩展为 feedback-driven improvement。

## 5. Assumption

- 用户希望日常反馈能够影响未来行为，但仍希望重要项目事实保持可审计。
- 当前阶段先做本地 proposal / review gate，比接入 GitHub PAT 自动 PR 更安全。

## 6. Unknown

- 后续是否需要真的接入 BerriAI npm 包并开 GitHub draft PR。
- feedback proposal 的批准动作应该由用户本人、产品负责人，还是 resident agents roundtable 完成。
