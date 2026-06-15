---
type: workflow
status: active
created: 2026-06-09
updated: 2026-06-09
---

# Skills Recommendation

This file explains how agents should use project-level skills in this Knowledge Workbench.

The project-level skills live under `.codex/skills/`. They are collaboration aids, not formal knowledge. Formal claims still belong in `主题库/` only after the controlled promotion flow.

## First Principle

Use project-specific workbench skills first when operating this repository. Use imported Composio skills only when the task matches their trigger.

Do not install or trigger broad app automation skills by default. Prefer narrow workflow skills that support this project's current work: knowledge operations, MCP/tool boundaries, web UI testing, release notes, research writing, internal communication, document generation, and cross-agent handoff links.

## Always Relevant Project Skills

| Skill | Use when |
|---|---|
| `knowledge-workbench-operator` | Inspecting workspace state, next actions, queues, agent handoff, or `tools/kb` status. |
| `controlled-knowledge-promotion` | Moving source/session/debate/distillation material toward formal knowledge. |
| `multi-expert-strategy-session` | Running strategic discussion, red-blue debate, or durable multi-expert workbench sessions. |
| `workbench-index-maintainer` | Refreshing or repairing generated indexes, dashboards, review queues, RAG scope, or workspace UI. |
| `mcp-boundary-designer-for-kb` | Designing MCP resources, tool definitions, permission classes, or connector boundaries for this workbench. |
| `obsidian-workbench-view-designer` | Designing Obsidian-facing views, Dataview/Bases queries, or human dashboard entry points. |
| `project-iteration-retrospective` | Reflecting after non-trivial project iterations, project skill changes, validation failures, or explicit user corrections. |

## Imported Composio Skills

These were installed from `ComposioHQ/awesome-codex-skills` as project-level skills because they match this workspace's recurring work.

| Skill | Use when | Notes |
|---|---|---|
| `mcp-builder` | Building or reviewing an MCP server or external-service tool boundary. | Pair with `mcp-boundary-designer-for-kb` for local permission rules. |
| `webapp-testing` | Testing local workspace UI, static HTML dashboards, future Obsidian/web workbench screens, or frontend behavior. | Use for Playwright-style verification after UI changes. |
| `changelog-generator` | Turning Git commit history into readable product or project updates. | Useful after dense `tools/kb` or knowledge-workbench iterations. |
| `content-research-writer` | Writing sourced articles, strategic briefs, research reports, or technical explainers. | Keep citations and distinguish formal knowledge from workbench process material. |
| `internal-comms` | Writing leadership updates, project updates, FAQs, incident reports, or team-facing summaries. | Adapt output to enterprise internal communication. |
| `paperjsx` | Generating PPTX, DOCX, XLSX, or PDF artifacts from structured JSON input. | Useful for internal sharing decks and report artifacts. |
| `agent-deep-links` | Creating or validating links that open Codex, Cursor, VS Code, Visual Studio, files, folders, settings, or threads. | Useful for cross-agent or team handoff messages. |

## Recommended Task Routing

For knowledge operations:

1. Use `knowledge-workbench-operator`.
2. Read `_index/generated-agent-brief.md`, `_index/generated-workspace-dashboard.md`, and `_index/generated-tool-catalog.md`.
3. Use `controlled-knowledge-promotion` only if the task touches review or promote.

For MCP/tool integration:

1. Use `mcp-boundary-designer-for-kb` for local safety and permission boundaries.
2. Use `mcp-builder` for MCP server design quality.
3. Expose read-only resources before write tools.

For UI work:

1. Use `obsidian-workbench-view-designer` for Obsidian-facing structure.
2. Use `webapp-testing` for browser verification.
3. Keep generated indexes as the information source.

For communication and artifacts:

1. Use `content-research-writer` for sourced long-form content.
2. Use `internal-comms` for leadership/team updates.
3. Use `paperjsx` when the output needs a generated document, deck, spreadsheet, or PDF.
4. Use `changelog-generator` when summarizing commit history.

For project self-improvement:

1. Use `project-iteration-retrospective` after non-trivial iterations that change project rules, skills, `_meta/`, `AGENTS.md`, `tools/`, or generated indexes.
2. Write lightweight reflections under `_workbench/reflections/`.
3. Write explicit user corrections under `_workbench/corrections/`.
4. Do not update `AGENTS.md`, `_meta/skills-recommendation.md`, or `.codex/skills/` from a reflection unless the user requests or confirms the update.

## Installation Policy For Other Projects

When connecting another project to Codex:

1. Create a project-local `.codex/skills/` directory.
2. Add a project-local skills recommendation document under that project's governance/docs area.
3. Update that project's `AGENTS.md` or equivalent agent instruction file to point agents at the recommendation document.
4. Install only skills that match that project's recurring workflows.
5. Keep project-level skills separate from user-level skills unless the workflow is truly cross-project.

## Guardrails

- Do not treat `.codex/skills/` content as formal domain knowledge.
- Do not bypass `tools/kb` review and promote gates because a skill suggests an action.
- Do not batch-install large connector sets without a concrete use case.
- Do not treat `_workbench/reflections/` or `_workbench/corrections/` as formal knowledge.
- After project-level skill or workflow changes, run:

```bash
tools/kb validate
python3 tools/test_kb.py
```
