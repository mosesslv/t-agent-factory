---
type: template
status: active
created: 2026-06-15
updated: 2026-06-15
---

# Learning Event Template

```yaml
type: learning-event
status: pending | review | promoted | rejected
id: LRN-YYYYMMDD-XXX
created: YYYY-MM-DD
updated: YYYY-MM-DD
category: correction | error | missing-capability | recurring-workflow | outdated-knowledge | better-pattern
priority: low | medium | high | critical
related:
  - path/or/url
```

# LRN-YYYYMMDD-XXX: 标题

## 1. Summary

一句话说明学到了什么。

## 2. Trigger

发生了什么：

来源：

## 3. Why It Matters

为什么这会影响 t-agent 工作台质量：

## 4. Suggested Action

- 候选动作：
- 需要更新的文件：
- 是否需要 PDR/ADR：
- 是否需要 eval：

## 5. Promotion Decision

- decision: promote | keep-candidate | reject
- reviewer:
- date:

## 6. Sanitization Check

- [ ] 没有 secret / token / 私密凭据。
- [ ] 没有未脱敏个人隐私。
- [ ] 没有复制大段外部版权内容。
