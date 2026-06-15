# Obsidian + Codex Workflow

## Goal

Make t-agent product construction feel natural:

- Obsidian is the human-facing product knowledge workspace.
- Codex is the product-team operating agent.
- ProductFactory is the cross-project product judgment memory.
- Git is the version boundary.

## Recommended Stack

| Layer | Tooling | Role |
|---|---|---|
| Default agent behavior | `AGENTS.md` | Always-on project instructions when Codex works in this repo |
| Dynamic task capability | `.agents/skills/t-agent-product-roundtable/` | Repo-local skill for product roundtable, debate, synthesis, and artifact updates |
| Product memory | ProductFactory bridge | Cross-project product judgment and precedent search |
| Knowledge workspace | Obsidian Markdown | Reading, linking, editing, and long-term sensemaking |
| Visual synthesis | Obsidian Canvas | Product map, version map, capability map, stakeholder debate map |
| Query/dashboard | Dataview or Bases | Review queue, decisions, sources, eval coverage, open questions |
| Task execution | Obsidian Tasks or Markdown checkboxes | Follow-ups, unresolved questions, artifact gaps |
| Version control | Git | Cross-machine sync and Mac/Windows local commits |

## Why Not Use Automations As The Main Mechanism

Automations are useful for scheduled reviews, such as weekly backlog cleanup or daily review-queue summaries.
They are not the right primary mechanism for this project because the core need is conversation-time routing: each new topic needs context-sensitive agent selection.

Use automations later for:

- weekly review queue audit;
- stale source detection;
- eval coverage checklist;
- release-readiness review.

## Why Not Start With A Plugin

A plugin is appropriate only when multiple projects or teammates need the same installed behavior.
This workspace is still shaping the operating model, so a repo-local skill plus `AGENTS.md` is safer:

- versioned with the project;
- easy to edit;
- no global side effects;
- portable to Mac through Git;
- enough for Codex to discover the behavior.

## Obsidian Native Structure

Recommended entry notes:

- `00-入口.md`: home note and navigation.
- `06-iteration/review-queue/README.md`: unresolved topics and raw discussion candidates.
- `05-decisions/`: accepted Product Decisions and ADRs.
- `07-evals/`: acceptance coverage and golden questions.
- `09-agents/default-router.md`: how Codex picks agents.
- `09-agents/roundtable-protocol.md`: how debate becomes decisions.

Recommended dashboards:

- Product status dashboard: PRD, roadmap, backlog, decision status.
- Evidence dashboard: sources, evidence cards, confidence, linked decisions.
- Eval dashboard: golden questions, failure samples, coverage by capability.
- Agent dashboard: active profiles, triggers, recent roundtables, open protocol issues.

## Suggested Obsidian Queries

If Dataview is enabled, create dashboards that query frontmatter like:

```dataview
TABLE status, updated, type
FROM "05-decisions"
SORT updated DESC
```

```dataview
TABLE topic, confidence, source_type
FROM "04-sources"
WHERE status != "deprecated"
SORT updated DESC
```

```dataview
TASK
FROM "06-iteration"
WHERE !completed
GROUP BY file.link
```

## Conversation-Time Pattern

The user can simply paste a topic:

```text
我们是不是应该先做报告生成，而不是可信问数？
```

Codex should silently route:

```text
product-lead + data-product + agent-architect + eval-lead + red-team
```

Then output a product decision candidate or update the relevant artifact.

## Escalation Pattern

Use three levels:

1. Silent panel: default for normal questions.
2. Lightweight roundtable: for ambiguous decisions.
3. Formal artifact update: for accepted or high-impact outcomes.

Only create formal files when the discussion needs to become project state.
