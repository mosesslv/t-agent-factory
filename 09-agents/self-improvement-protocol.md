---
type: agent-protocol
status: accepted
created: 2026-06-15
updated: 2026-06-15
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 06-iteration/learnings/README.md
---

# t-agent Self-Improvement Protocol

## 1. 定义

t-agent 的 self-improvement 不是让 agent 自动重写自己。

它是一条 review-gated 的受控学习闭环：

```text
Error / Correction / Missing Capability / Recurring Pattern
  -> Learning Event
  -> Candidate Change
  -> Review Gate
  -> Eval / Regression Check
  -> Promotion to Protocol / Skill / Backlog / Decision
```

## 2. 可记录事件

| 事件 | 例子 | 默认位置 |
|---|---|---|
| user correction | 用户指出版本范围、事实、路线或风格错误 | `06-iteration/learnings/` |
| command / tool failure | 来源抓取失败、脚本失败、测试失败 | `06-iteration/learnings/` |
| missing capability | 用户要求一类当前流程覆盖不了的能力 | `06-iteration/learnings/` 或 backlog |
| recurring workflow | 同类更新、评审、来源处理多次出现 | skill candidate |
| outdated knowledge | 外部 API / 官方文档 / 项目事实变化 | evidence card + learning |
| better pattern | 发现更可靠的写入、评测、路由方式 | protocol candidate |

## 3. Promotion Rules

| 候选改进 | 晋升目标 | 条件 |
|---|---|---|
| 一次性纠正 | learning event | 记录即可 |
| 重复 2 次以上的纠正 | AGENTS.md / protocol candidate | 有复现和边界 |
| 重复 workflow | `.agents/skills/` | 有触发、反触发、输出和 eval |
| 产品方向变化 | PDR | Product Lead + Red Team 通过 |
| 架构或工具变化 | ADR | Agent Architect + Eval Lead + Red Team 通过 |
| 质量门禁变化 | eval pack | 有 golden question 或 failure case |
| 交付范围变化 | backlog / PRD | 有 owner、版本和验收 |

## 4. Self-Improvement Loop

```mermaid
flowchart LR
  A["Observe: error, correction, missing capability"] --> B["Record LearningEvent"]
  B --> C{"Classify"}
  C --> D["Docs / source rule"]
  C --> E["Skill candidate"]
  C --> F["Eval / failure case"]
  C --> G["Backlog / decision"]
  D --> H["Review gate"]
  E --> H
  F --> H
  G --> H
  H --> I{"Accepted?"}
  I -- "yes" --> J["Promote to protocol / skill / PRD / eval"]
  I -- "no" --> K["Keep in review queue"]
  J --> L["Git diff + iteration log"]
```

## 5. Guardrails

- 不记录 secret、token、私密凭据、完整敏感日志。
- 不把用户一次口头纠正直接改成全局永久规则。
- 不自动写入 `agent.md`、roadmap、PRD、contract 或 eval。
- 不创建后台监控、定时任务或跨项目同步，除非用户明确要求。
- 所有晋升都要保留 diff、来源、理由和验收方式。

## 6. Minimum Learning Event

每条 learning 至少包括：

- id；
- 时间；
- 类型；
- 来源；
- 发生了什么；
- 为什么重要；
- 建议动作；
- 是否需要 PDR/ADR/eval/backlog；
- 状态。

模板见 `06-iteration/templates/learning-event.md`。

## 7. Relationship to External `self-improving-agent`

外部 `peterskoett/self-improving-agent` 的价值在于：

- 明确哪些事件应该沉淀：错误、纠正、缺失能力、过期知识、重复模式；
- 区分 learning、error、feature request；
- 提醒不要记录敏感信息；
- 把成熟 learning 晋升到 agent instruction 或 workspace 文件。

t-agent 的增强点：

- 增加 source / evidence / decision / eval gate；
- learning 不放根目录 `.learnings/`，而纳入 `06-iteration/learnings/`；
- 所有改进必须经过 resident agents 和 review gate；
- 任何产品事实变化都受 `agent.md` 权威顺序约束。
