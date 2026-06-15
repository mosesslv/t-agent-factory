---
name: controlled-knowledge-promotion
description: Use in this Knowledge Workbench project when moving material from inbox, sessions, debates, or distillation candidates toward formal knowledge in 主题库. Enforces source review, distillation review, promote preview, explicit human confirmation, and Git-friendly boundaries.
---

# Controlled Knowledge Promotion

## Core Boundary

Never promote raw discussion directly into `主题库/`.

Formal knowledge requires:

1. source or session context
2. distillation candidate
3. checks and preview
4. explicit human review decision
5. explicit promote confirmation
6. refreshed indexes and validation

## Read Rules First

Read before acting:

- `_meta/知识入库规则.md`
- `_meta/工作流说明.md`
- `_index/generated-review-queue.md`
- `_index/generated-decision-guide.md`

## Source Review Flow

Use read-only checks first:

```bash
tools/kb check-source <source-note>
tools/kb preview-source-review <source-note>
tools/kb decision-guide --kind source-note --limit 3
```

Only after explicit human decision:

```bash
tools/kb review-source <source-note> reviewed --note "<human note>"
```

Use `needs-evidence` or `rejected` when the human chooses those outcomes.

## Distillation Review Flow

Use read-only checks first:

```bash
tools/kb check-distillation <distillation-file>
tools/kb preview-distillation-review <distillation-file>
tools/kb decision-guide --kind distillation-candidate --limit 3
```

Only after explicit human approval:

```bash
tools/kb review-distillation <distillation-file> approve --note "<human note>"
```

## Promote Flow

Preview before writing formal knowledge:

```bash
tools/kb preview-promote <distillation-file>
tools/kb promote-audit <distillation-file>
```

Only after explicit promote confirmation:

```bash
tools/kb promote --confirm <distillation-file>
tools/kb refresh-index
tools/kb validate
```

## Guardrails

- Do not invent human confirmation.
- Do not silently fix unrelated formal knowledge.
- If a formal file conflicts with the planned target, stop and explain the conflict.
- Keep promote commits separate from workflow or tool changes when committing.
