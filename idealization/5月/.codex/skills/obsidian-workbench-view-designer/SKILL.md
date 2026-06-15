---
name: obsidian-workbench-view-designer
description: Use in this Knowledge Workbench project when designing or updating Obsidian-facing workspace views, Dataview/Bases queries, static dashboard embeds, review queue views, or human-readable navigation for the Markdown knowledge workbench.
---

# Obsidian Workbench View Designer

## Goal

Make the human-facing Obsidian entry point show state, decisions, and safe next actions without turning process material into formal knowledge.

## Read First

- `00-知识工作台入口.md`
- `_integrations/obsidian/V1-视图说明.md`
- `_index/generated-workspace-dashboard.md`
- `_index/generated-review-queue.md`
- `_index/generated-decision-guide.md`
- `_index/generated-rag-scope.md`

## View Priorities

The first screen should show:

1. workspace snapshot
2. decision focus
3. gate status
4. top review tasks
5. safe read commands
6. protected actions

## Suggested Embeds

Use generated Markdown sections before custom UI:

```markdown
![[_index/generated-workspace-dashboard#Snapshot]]
![[_index/generated-workspace-dashboard#Decision Focus]]
![[_index/generated-review-queue#Top Tasks]]
```

## Dataview Patterns

Recent sessions:

```dataview
TABLE status, topic, stage, updated
FROM "_workbench/sessions"
WHERE type = "discussion-session"
SORT updated DESC
```

Formal knowledge:

```dataview
TABLE status, topic, confidence, updated
FROM "主题库"
WHERE type = "knowledge-card"
SORT updated DESC
```

## Guardrails

- Keep human review actions visible but not automatic.
- Do not make `_workbench/inbox/` a default evidence view.
- Prefer generated indexes for operational state.
- Run `tools/kb refresh-index` after accepted structural changes.
