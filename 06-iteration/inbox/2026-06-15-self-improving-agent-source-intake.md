---
type: knowledge-intake
status: promoted
created: 2026-06-15
updated: 2026-06-15
source_type: repo
owner: knowledge-librarian
promotion_target:
  - source-register
  - evidence-card
  - roundtable
  - pdr
  - eval
related:
  - https://github.com/peterskoett/self-improving-agent
  - 04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md
  - 09-agents/self-improvement-protocol.md
---

# Self-Improving Agent Source Intake

## 1. 输入摘要

用户提供 `peterskoett/self-improving-agent`，希望判断它对 t-agent / DAgent 工作台的意义，并思考如何让产品工作台持续自我改进。

来源：

- https://github.com/peterskoett/self-improving-agent
- https://github.com/peterskoett/self-improving-agent/blob/master/SKILL.md

## 2. 分类判断

| 维度 | 判断 |
|---|---|
| 输入类型 | external repo / self-improvement pattern |
| 是否改变 accepted truth | yes，改变知识库能力建设方式 |
| 推荐 agent panel | knowledge-librarian, agent-architect, eval-lead, red-team |
| 推荐写入位置 | evidence card, roundtable, self-improvement protocol, eval |
| 是否需要 ProductFactory | yes |
| 是否需要外部检索 | yes |

## 3. Evidence / Assumption / Unknown

### evidence

- 该 repo 的 skill 将错误、用户纠正、缺失能力、工具失败、过期知识和更好做法视为 learning 输入。
- 该 repo 强调不记录 secret，并把成熟 learning 晋升到 agent/workspace instruction。

### assumption

- t-agent 的 self-improvement 需要比该 repo 更强的 source/evidence/decision/eval gates。

### unknown

- 后续是否需要把 learning logs 暴露到正式 UI。

## 4. Promotion Result

- decision: promote
- promoted_to:
  - `04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md`
  - `09-agents/self-improvement-protocol.md`
  - `07-evals/golden-questions/knowledge-base-capability-golden-questions.md`
- reviewer: resident-agent roundtable
- date: 2026-06-15
