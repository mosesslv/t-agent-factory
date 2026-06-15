---
type: template
status: active
created: 2026-06-15
updated: 2026-06-15
---

# Knowledge Promotion Checklist Template

```yaml
---
type: promotion-checklist
status: review | accepted | rejected
created: YYYY-MM-DD
updated: YYYY-MM-DD
source_item: path/or/url
target_asset: path
reviewers:
  - knowledge-librarian
  - product-lead
  - agent-architect
  - eval-lead
  - red-team
---
```

# Promotion Checklist: 标题

## 1. Candidate

- candidate source:
- target asset:
- proposed change:

## 2. Required Gates

| Gate | Pass? | Evidence |
|---|---|---|
| 来源明确 |  |  |
| 状态明确 |  |  |
| evidence / assumption / unknown 已区分 |  |  |
| 不直接污染 accepted truth |  |  |
| 如果改变产品方向，已有 PDR |  |  |
| 如果改变架构或协议，已有 ADR / protocol 更新 |  |  |
| 如果改变验收，已有 eval 更新 |  |  |
| 如果改变交付，已有 backlog 更新 |  |  |
| 如果来自外部资料，保留 URL 且未复制长文 |  |  |
| 如果涉及 self-improvement，已通过 review gate |  |  |

## 3. Decision

- decision: accept | reject | defer
- reason:
- follow-up:
