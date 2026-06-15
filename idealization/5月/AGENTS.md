# Project Instructions: Knowledge Workbench

This project is an Obsidian/Markdown knowledge workspace. Treat Codex as one client of the workspace, not as the system of record.

## Boundary Rules

- `主题库/` contains formal knowledge: stable claims, frameworks, decisions, evidence, and reports.
- `_workbench/` contains process material: inbox notes, discussion sessions, debates, hypotheses, and distillation candidates.
- `_agents/` contains reusable expert profiles and memories. These are collaboration lenses, not formal domain knowledge.
- `_meta/` contains operating rules, templates, and workflow documentation.
- `_index/` contains human and agent-facing indexes.
- `.codex/skills/` contains project-level Codex skills. These are workflow helpers, not formal knowledge.
- Do not move, rewrite, or delete existing knowledge unless explicitly asked.
- Do not promote workbench content into `主题库/` without an explicit human confirmation step.

## Project Skills

- Before using project-level skills, read `_meta/skills-recommendation.md`.
- Use workbench-specific skills first for this repository: `knowledge-workbench-operator`, `controlled-knowledge-promotion`, `multi-expert-strategy-session`, `workbench-index-maintainer`, `mcp-boundary-designer-for-kb`, and `obsidian-workbench-view-designer`.
- Imported Composio skills are installed project-locally for narrow recurring workflows: `mcp-builder`, `webapp-testing`, `changelog-generator`, `content-research-writer`, `internal-comms`, `paperjsx`, and `agent-deep-links`.
- Use `project-iteration-retrospective` after non-trivial project iterations, project skill changes, validation failures, or explicit user corrections. Reflections go under `_workbench/reflections/`; corrections go under `_workbench/corrections/`.
- Do not batch-install broad connector or app automation skills unless the user names a concrete integration target.

## Project Self-Improvement

- Read `_meta/agent-improvement-rules.md` before creating project reflections or correction records.
- Reflections and corrections are process material, not formal knowledge.
- Do not update `AGENTS.md`, `_meta/skills-recommendation.md`, or `.codex/skills/` based only on a reflection unless the user explicitly requests or confirms the change.
- For non-trivial project changes, run validation before final reporting when practical:
  - `tools/kb refresh-index`
  - `tools/kb validate`
  - `python3 tools/test_kb.py`

## Strategic Discussion Workflow

For strategic discussion requests:

1. Identify the topic and likely related existing knowledge.
2. Read relevant files from `主题库/`, `gather/`, `plan/`, or `_index/` before answering when practical.
3. Use expert roles from `_agents/` when the user asks for multi-expert discussion.
4. Keep raw discussion in `_workbench/`.
5. Produce a distillation candidate before writing formal knowledge.
6. Only write formal knowledge cards or decision records after the user confirms promotion.

## Version Discipline

- Keep changes surgical.
- Prefer adding new files over modifying historical source files.
- Use Git commits as recovery points when making structural changes.
- Deprecate superseded knowledge with metadata instead of deleting it.
