---
type: workflow
status: active
created: 2026-06-09
updated: 2026-06-09
---

# Agent Improvement Rules

This file defines the project-level self-improvement loop for the `5月` Knowledge Workbench.

The goal is not to create global memory. The goal is to help agents working in this project notice repeated mistakes, capture user corrections, and propose small improvements to project rules and project-level skills.

## Storage Boundary

| Material | Path | Status |
|---|---|---|
| Iteration reflections | `_workbench/reflections/` | Process material |
| User corrections | `_workbench/corrections/` | Process material |
| Project improvement rules | `_meta/agent-improvement-rules.md` | Operating rule |
| Project skill routing | `_meta/skills-recommendation.md` | Operating rule |
| Agent entry instruction | `AGENTS.md` | Operating rule |

Do not write reflections or corrections to `主题库/`. They are process material unless the user explicitly asks to promote a stable methodology through the normal knowledge flow.

## When To Reflect

Create or update a reflection when a non-trivial project iteration finishes and at least one of these is true:

- files were added or modified
- `tools/kb` commands or tests were run
- a project-level skill was installed, created, or updated
- the user corrected behavior or clarified a durable project rule
- the task exposed a repeated failure mode
- the task changed `AGENTS.md`, `_meta/`, `.codex/skills/`, or `tools/`

For tiny answers or read-only questions, do not create reflection files.

## Reflection Template

Use a plain Markdown file under `_workbench/reflections/` with this shape:

```markdown
# Reflection: <short title>

- Date:
- Session:
- Task:
- Files changed:
- Validation:

## Goal

## What Changed

## Problems Or Friction

## User Corrections

## Reusable Rule Candidates

## Promotion Recommendation
```

## Correction Template

Use `_workbench/corrections/` only for explicit user correction or preference that should affect future project behavior:

```markdown
# Correction: <short title>

- Date:
- Source:
- Correction:
- Applies to:
- Recommended project rule update:
```

## Promotion Levels

| Level | Action | Human confirmation |
|---|---|---:|
| Reflection | Write `_workbench/reflections/` | No, when criteria are met |
| Correction record | Write `_workbench/corrections/` | No, if user correction is explicit |
| Recommendation | Mention in final answer | No |
| Project rule update | Edit `AGENTS.md`, `_meta/skills-recommendation.md`, or `.codex/skills/` | Yes, unless the user directly requested it |
| Formal knowledge | Use controlled promotion into `主题库/` | Yes |
| User-level memory | Use Codex memory update mechanism | Yes, only if explicitly requested |

## Promotion Filters

A reflection should not become a project rule if it is:

- a one-off path or temporary debugging detail
- already covered by `AGENTS.md` or existing system instructions
- merely a command transcript
- not likely to change future project behavior
- not backed by a concrete task outcome

A reflection is a good rule candidate if it:

- prevents repeated project mistakes
- clarifies a local boundary
- improves validation or handoff
- explains when to use or avoid a project skill
- captures an explicit user correction

## Default Validation

After changing project rules, project skills, or typed `_meta` files, run:

```bash
tools/kb refresh-index
tools/kb validate
python3 tools/test_kb.py
```

If validation fails, do not create a positive reflection until the failure is either fixed or explicitly recorded.
