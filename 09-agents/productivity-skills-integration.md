---
type: agent-skill-integration
status: accepted
created: 2026-06-15
updated: 2026-06-15
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 09-agents/default-router.md
  - 09-agents/feedback-driven-improvement-protocol.md
---

# Productivity Skills 与 Resident Agents 搭配协议

## 1. 判断

Matt Pocock 的 productivity skills 提供的是可移植工作模式：追问、交接、写 skill、教学、压缩沟通。

在 t-agent 中，它们不应作为独立人格或独立产品功能出现，而应被 resident agents 调用，用来提升知识库能力的输入质量、压测质量和交接质量。

## 2. Skill Mapping

| Skill | 触发场景 | 搭配 resident agents | 输出物 | 默认状态 |
|---|---|---|---|---|
| `grill-me` | PRD、roadmap、架构、agent skill、能力设计存在关键不确定性 | red-team, product-lead, eval-lead | 决策树、风险清单、追问记录、验收补丁 | Adopt now |
| `handoff` | 长任务、跨会话、跨 agent、上下文即将中断 | knowledge-librarian, agent-architect | handoff 摘要、下一步、相关文件路径 | Adopt now |
| `write-a-skill` | 同类 workflow 出现 2 次以上，或已有明确触发词和输出契约 | agent-architect, knowledge-librarian, eval-lead | `.agents/skills/<name>/SKILL.md` 候选、eval checklist | Adopt now |
| `teach` | 新 PM / 研发 / agent 需要理解工作台规则 | product-lead, knowledge-librarian | onboarding note、练习任务、FAQ | Trial |
| `caveman` | 用户明确要求极简沟通或低 token 交接 | product-lead | 极简摘要，不进入 canonical docs | Watch |
| `self-improvement` | 错误、用户纠正、外部 API 失败、知识过期、重复模式 | knowledge-librarian, eval-lead, red-team | learning event、候选修复、promotion request | Adopt now |
| `feedback improvement` | 用户对 agent 自身的风格、路由、skill、提示词或行为给出正/负反馈 | knowledge-librarian, agent-architect, eval-lead, red-team | learning event、improvement proposal、eval patch | Adopt now |

## 3. `grill-me` 在本项目中的用法

`grill-me` 不是让 agent 一直问问题，而是让 Red Team 有结构地压测方案。

适合触发：

- “这个 PRD 是否完整？”
- “这个版本边界是不是合理？”
- “这个 skill 该不该做？”
- “这个知识库更新规则会不会污染 SSOT？”
- “这个 self-improvement 机制会不会过度自动化？”

输出必须落到至少一个地方：

- `06-iteration/roundtables/`
- `05-decisions/`
- `07-evals/`
- `02-roadmap/backlog/`
- `06-iteration/review-queue/`

## 4. `handoff` 在本项目中的用法

`handoff` 不应复制已有 PRD、PDR、ADR 和 diff。

必须包含：

- 当前目标；
- 已读关键文件；
- 已形成的判断；
- 未完成事项；
- 建议下一 session 使用的 local skill；
- 敏感信息已移除。

如果 handoff 产生了可长期复用的规则，不能直接写入 `agent.md`，应先进入 review queue 或 learning event。

## 5. `write-a-skill` 在本项目中的用法

只有满足以下条件时才创建 local skill：

1. workflow 至少复现 2 次，或用户明确要求固化；
2. 有明确触发条件和反触发条件；
3. 有输入、输出、检查清单；
4. 有对应 eval 或人工验收方式；
5. 不依赖未授权外部服务；
6. 不绕过 `agent.md` 和 `AGENTS.md`。

Local skill 默认位置：

```text
.agents/skills/<skill-name>/SKILL.md
```

如果 skill 仍不成熟，先放：

```text
06-iteration/review-queue/
```

## 6. `teach` 在本项目中的用法

`teach` 用于团队 onboarding，不用于正式产品承诺。

候选课程：

- t-agent 项目 SSOT 怎么读；
- 如何把外部链接变成 evidence card；
- 如何从 PRD 生成 eval；
- 如何使用 `grill-me` 压测方案；
- 如何把重复 workflow 变成 skill。

## 7. 禁止用法

- 用 `grill-me` 替代用户访谈和真实业务验证。
- 用 `handoff` 当长期知识库。
- 用 `write-a-skill` 包装一次性流程。
- 用 `self-improvement` 自动改 accepted docs。
- 用一次正向反馈直接改永久风格规则。
- 在没有 explicit approval / review gate 的情况下 apply improvement proposal。
- 用 productivity skills 绕过 PDR/ADR/eval。

## 8. Feedback-Driven Improvement

当用户说“以后都这样”“别再这样”“你这个方式很好”“你总是漏掉 X”“把这个变成默认”时，默认进入 `09-agents/feedback-driven-improvement-protocol.md`。

处理顺序：

1. 先在当前回答中适配反馈。
2. 判断反馈是否指向 agent 自身，而不是普通产品方案。
3. 一次性反馈进入 learning event。
4. 重复或高影响反馈生成 improvement proposal。
5. 使用 `grill-me` 压测 proposal 是否过拟合。
6. 使用 eval runner 检查 KB 行为是否仍通过。
