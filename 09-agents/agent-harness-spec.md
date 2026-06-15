# t-agent Agent Harness Spec

## 1. Agent Profile 必填字段

每个常驻 agent profile 必须包含：

- Purpose
- Trigger
- Anti-trigger
- Inputs
- Knowledge
- Tools
- Output contract
- Review checklist
- Eval

## 2. 推荐 frontmatter

```yaml
---
type: agent-profile
status: draft
agent_id:
owner:
updated: YYYY-MM-DD
---
```

## 3. 工具分层

| 工具类型 | 说明 | 默认权限 |
|---|---|---|
| read | 读取工作空间文档、Git 状态、来源索引 | allowed |
| index-write | 更新索引、review queue、iteration log | allowed with review |
| product-write | 更新 PRD、roadmap、brief | requires human intent |
| decision-write | 新增 ADR / PDR | requires explicit task |
| formal-promote | 将候选变成 accepted | human confirmation |

## 4. 输出要求

Agent 输出必须区分：

- evidence
- assumption
- unknown
- recommendation
- required change

## 5. 评测方式

每个 agent 至少有三类评测：

- 正触发：什么任务应该调用它。
- 反触发：什么任务不该调用它。
- 输出质量：是否给出可执行、可追溯、不过度承诺的结果。

