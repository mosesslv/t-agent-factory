---
name: project-iteration-retrospective
description: Use in this Knowledge Workbench project after non-trivial iterations, project skill changes, AGENTS.md or _meta updates, validation failures, or explicit user corrections. Creates lightweight project-level reflection or correction notes under _workbench without promoting them to formal knowledge.
---

# Project Iteration Retrospective

## Scope

Use this skill only in the `5月` Knowledge Workbench project.

This skill creates project-level process records. It does not update global memory and does not write formal knowledge.

## Read First

- `_meta/agent-improvement-rules.md`
- `_meta/skills-recommendation.md`
- `AGENTS.md`

## When To Use

Use after a non-trivial iteration when:

- files were changed
- project-level skills were installed, created, or updated
- `AGENTS.md`, `_meta/`, `.codex/skills/`, or `tools/` changed
- validation failed and was fixed
- the user gave explicit correction or durable local preference
- the task revealed a repeatable project workflow gap

Do not use for tiny read-only answers.

## Workflow

1. Summarize the task goal.
2. List changed files or directories.
3. Record validation commands and results.
4. Identify friction, failures, or ambiguity.
5. Capture user corrections separately from agent inferences.
6. Decide whether the finding is:
   - reflection only
   - correction record
   - project rule update candidate
   - project skill update candidate
   - formal knowledge candidate
7. Write only lightweight process notes unless the user explicitly requests rule updates.

## Reflection File

Create a file under `_workbench/reflections/`:

```text
YYYY-MM-DD-<short-slug>.md
```

Use this structure:

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

## Correction File

If the user explicitly corrects behavior, create a separate file under `_workbench/corrections/`:

```markdown
# Correction: <short title>

- Date:
- Source:
- Correction:
- Applies to:
- Recommended project rule update:
```

## Guardrails

- Do not write to `主题库/`.
- Do not edit `AGENTS.md` or project skills unless the user asked for that update or confirms it.
- Do not convert every reflection into a rule.
- Keep entries concise and evidence-based.
- If validation was not run, say so in the reflection.
