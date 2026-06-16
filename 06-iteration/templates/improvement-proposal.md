---
type: template
status: active
created: 2026-06-16
updated: 2026-06-16
---

# 改进提案模板

默认存放位置：`06-iteration/improvement-proposals/`。

本模板用于把用户对 Codex / t-agent 行为、风格、路由、skill 或 eval 的反馈，转成可评审、可批准、可回滚的一文件改进提案。

```yaml
---
type: improvement-proposal
status: proposed | approved | rejected | applied
created: YYYY-MM-DD
updated: YYYY-MM-DD
feedback_type: negative-correction | positive-reinforcement | preference | routing-miss | eval-failure
risk: low | medium | high
target_file: path
approval_state: proposed | approved | rejected | applied
eval_required: true | false
related:
  - path/or/url
---
```

# Improvement Proposal: 标题

## 1. Feedback Source

- source:
- quote / summary:
- feedback_type:

## 2. Proposed Change

- target_file:
- risk:
- reason:

### original_snippet

```text
复制目标文件里唯一出现的原文。
```

### proposed_snippet

```text
替换后的内容。
```

## 3. Review

| Gate | Pass? | Evidence |
|---|---|---|
| original_snippet 唯一 |  |  |
| 一次只改一个文件 |  |  |
| 不是单次反馈过拟合 |  |  |
| 未包含 secret / 私密内容 |  |  |
| 需要 eval 时已声明 |  |  |
| 有明确 reviewer / approval |  |  |

## 4. Decision

- decision: approve | reject | defer
- reviewer:
- date:
- eval:
