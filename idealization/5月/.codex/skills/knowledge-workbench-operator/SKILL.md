---
name: knowledge-workbench-operator
description: Use in this Knowledge Workbench project when the user asks to inspect workspace state, continue knowledge work, find next actions, triage review queues, operate tools/kb, or hand off context to another agent. This is project-level and depends on the current Markdown/Git workspace structure.
---

# Knowledge Workbench Operator

## Scope

Use this skill only inside this Knowledge Workbench repository.

The durable source of truth is Markdown, frontmatter, generated indexes, and Git. Codex is one client of the workspace.

## First Read

Prefer read-only generated context first:

```bash
tools/kb agent-brief --json
tools/kb workspace-dashboard --json
tools/kb tool-catalog --json
tools/kb review-queue --json
tools/kb rag-scope --json
tools/kb version-status
```

If the CLI is unavailable, read:

- `00-知识工作台入口.md`
- `_index/generated-agent-brief.md`
- `_index/generated-workspace-dashboard.md`
- `_index/generated-tool-catalog.md`
- `_index/generated-review-queue.md`
- `_index/generated-rag-scope.md`
- `_meta/工作流说明.md`
- `_meta/知识入库规则.md`
- `_meta/版本管理规则.md`

## Operating Rules

1. Treat `主题库/` as formal knowledge.
2. Treat `_workbench/` as process material.
3. Treat `_agents/` as expert lenses, not factual evidence.
4. Treat `_index/generated-*` as derived state.
5. Use read-only commands before proposing writes.
6. Do not call review, approve, or promote commands unless the user explicitly confirms that exact decision.

## Typical Flows

For status:

```bash
tools/kb validate
tools/kb workspace-dashboard
tools/kb review-queue --limit 5
```

For handoff:

```bash
tools/kb agent-brief
tools/kb review-packet --limit 3
```

For search:

```bash
tools/kb search "<query>" --limit 10
```

After accepted structural writes:

```bash
tools/kb refresh-index
tools/kb validate
python3 tools/test_kb.py
```

## Output

Report:

- what workspace state was read
- what action is safe next
- which actions require human confirmation
- validation result, if commands were run
