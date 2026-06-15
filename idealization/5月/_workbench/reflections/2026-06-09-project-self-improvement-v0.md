# Reflection: Project self-improvement V0

- Date: 2026-06-09
- Session: current Codex thread
- Task: Build project-level self-improvement for the `5月` Knowledge Workbench.
- Files changed: `AGENTS.md`, `_meta/agent-improvement-rules.md`, `_meta/skills-recommendation.md`, `.codex/skills/project-iteration-retrospective/SKILL.md`, `_workbench/reflections/`, `_workbench/corrections/`, generated `_index/` snapshots.
- Validation: `tools/kb refresh-index`, `tools/kb validate`, and `python3 tools/test_kb.py` passed.

## Goal

Create a project-level reflection loop before attempting global Codex memory hooks.

## What Changed

- Added `_workbench/reflections/` for lightweight iteration retrospectives.
- Added `_workbench/corrections/` for explicit user corrections.
- Added `_meta/agent-improvement-rules.md` to define when and how project reflections should be created.
- Added `project-iteration-retrospective` as a project-level skill.
- Updated `_meta/skills-recommendation.md` and `AGENTS.md` so future agents understand the self-improvement loop.

## Problems Or Friction

- The current `tools/kb` schema does not define `reflection` or `correction` typed documents. V0 avoids schema changes by keeping these records as plain Markdown process material.
- Project self-improvement should not bypass the existing formal knowledge promotion gates.

## User Corrections

- None in this implementation step. The user explicitly narrowed scope from user-level/default hooks to project-level self-improvement inside `5月`.

## Reusable Rule Candidates

- Start self-improvement mechanisms at the project level before installing global hooks.
- Keep reflections and corrections outside `主题库/` unless the user explicitly asks to promote stable methodology.
- Do not convert every reflection into a rule; use reflection as evidence for later project-rule updates.

## Promotion Recommendation

Keep this as process material. Do not promote to formal knowledge.
