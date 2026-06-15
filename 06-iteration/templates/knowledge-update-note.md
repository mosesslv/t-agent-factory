---
type: template
status: active
created: 2026-06-15
updated: 2026-06-15
---

# Knowledge Update Note Template

```yaml
type: knowledge-update-note
status: raw | candidate | review | accepted | superseded
created: YYYY-MM-DD
updated: YYYY-MM-DD
source_type: user-input | external-link | repo | codebase | correction | eval-failure
related:
  - path/or/url
```

# 标题

## 1. 输入

原始输入摘要：

来源：

## 2. 分类

- 输入类型：
- 影响范围：
- 推荐 agent panel：
- 推荐写入位置：

## 3. Evidence / Assumption / Unknown

### evidence

### assumption

### unknown

## 4. 建议动作

- 是否需要 source register：
- 是否需要 evidence card：
- 是否需要 roundtable：
- 是否需要 PDR / ADR：
- 是否需要 PRD / contract / eval / backlog：

## 5. 验收

- [ ] 来源明确。
- [ ] 状态明确。
- [ ] 未污染 accepted truth。
- [ ] 如影响验收，已补 eval。
