---
name: workbench-index-maintainer
description: Use in this Knowledge Workbench project when generated indexes, dashboards, queues, review packets, RAG scope, tool catalogs, agent briefs, or static workspace UI need to be refreshed, validated, inspected, or repaired.
---

# Workbench Index Maintainer

## Generated Artifacts

The generated index layer lives under `_index/` and is derived from source Markdown and `tools/kb`.

Key artifacts:

- `generated-manifest`
- `generated-workbench-queue`
- `generated-review-queue`
- `generated-review-packet`
- `generated-decision-guide`
- `generated-rag-scope`
- `generated-agent-brief`
- `generated-tool-catalog`
- `generated-workspace-dashboard`
- `generated-version-status`
- `generated-workspace-ui.html`

## Refresh

```bash
tools/kb refresh-index
```

Then verify:

```bash
tools/kb validate
python3 tools/test_kb.py
```

## Inspection

Use read-only commands:

```bash
tools/kb workspace-dashboard
tools/kb review-queue --limit 5
tools/kb review-packet --limit 3
tools/kb decision-guide --limit 3
tools/kb rag-scope
tools/kb tool-catalog
tools/kb agent-brief
```

## Repair Heuristics

1. If an index is stale, run `refresh-index`.
2. If validation fails, inspect frontmatter and required fields first.
3. If queues look wrong, inspect typed files under `_workbench/` and `主题库/`.
4. If tool boundaries look wrong, inspect `_meta/知识入库规则.md`, `_meta/工作流说明.md`, and `tools/README.md`.

## Guardrails

- Generated indexes should reflect source files; do not manually patch generated files unless debugging a generator issue.
- Do not use index refresh as a substitute for source review or promote confirmation.
