---
name: multi-expert-strategy-session
description: Use in this Knowledge Workbench project when the user asks for strategic discussion, multi-expert debate, red-blue attack and defense, topic distillation, or durable session notes. Writes process material under _workbench only unless the user separately confirms promotion.
---

# Multi-Expert Strategy Session

## Purpose

Turn strategic questions into durable workbench material without polluting formal knowledge.

## Context Read

Before answering or writing, identify the topic and read relevant context from:

- `主题库/`
- `gather/`
- `plan/`
- `_index/generated-rag-scope.md`
- `_agents/`

Use `_workbench/` as process context, not formal evidence.

## Expert Set

Use the local expert roles as needed:

- 产品经理
- 战略专家
- 架构专家
- 产品专家
- 红队专家
- 知识编辑专家
- 研发交付专家

Each expert output should include:

- Claim
- Evidence
- Risk
- Question
- Recommendation

## Session Flow

For a new durable session:

```bash
tools/kb new-session "<title>" --topic <topic-id>
```

For red-blue debate:

```bash
tools/kb new-debate "<title>" --topic <topic-id> --session <session-id> --target-topic-path <topic-path>
```

For mature debate review:

```bash
tools/kb check-debate <debate-file>
tools/kb preview-debate-review <debate-file>
```

For distillation draft:

```bash
tools/kb draft-distillation-from-debate <debate-file>
```

## Boundaries

- Write raw discussion only to `_workbench/sessions/` or `_workbench/debates/`.
- Write distilled candidates only to `_workbench/distillations/`.
- Do not write formal knowledge without the controlled promotion flow.
- Make claims traceable to files or clearly mark them as assumptions.
