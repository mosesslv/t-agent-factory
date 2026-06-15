---
type: template
status: active
created: 2026-06-15
updated: 2026-06-15
---

# Knowledge Intake Template

```yaml
---
type: knowledge-intake
status: raw | candidate | promoted | rejected
created: YYYY-MM-DD
updated: YYYY-MM-DD
source_type: user-input | external-link | repo | correction | failure | recurring-workflow
owner: product-lead | knowledge-librarian | agent-architect | eval-lead | red-team
promotion_target:
  - source-register
  - evidence-card
  - roundtable
  - pdr
  - adr
  - prd
  - contract
  - eval
  - backlog
related:
  - path/or/url
---
```

# 标题

## 1. 输入摘要

原始输入：

来源：

## 2. 分类判断

| 维度 | 判断 |
|---|---|
| 输入类型 |  |
| 是否改变 accepted truth | yes / no / unknown |
| 推荐 agent panel |  |
| 推荐写入位置 |  |
| 是否需要 ProductFactory | yes / no |
| 是否需要外部检索 | yes / no |

## 3. Evidence / Assumption / Unknown

### evidence

### assumption

### unknown

## 4. 下一步

- [ ] 登记来源。
- [ ] 生成 evidence card。
- [ ] 触发 roundtable。
- [ ] 生成 PDR / ADR。
- [ ] 更新 PRD / contract / eval / backlog。
- [ ] 记录 learning event。

## 5. Promotion Result

- decision: promote | keep-candidate | reject
- promoted_to:
- reviewer:
- date:
