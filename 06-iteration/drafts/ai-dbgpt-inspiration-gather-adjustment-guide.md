---
type: workflow-guide
status: draft
updated: 2026-06-15
sources:
  - 04-sources/ai-dbgpt/generated-manifest.md
  - 04-sources/ai-dbgpt/generated-link-map.md
  - 04-sources/ai-dbgpt/generated-conflict-candidates.md
  - 04-sources/ai-dbgpt/material-reference-register.md
---

# AI_DB_GPT Inspiration / Gather Adjustment Guide

## Decision

Do not use AI_DB_GPT `inspiration` and `gather` as the active editing surface for t-agent material.

Use them as source inputs. The active t-agent editing surface is:

```text
06-iteration/inbox
06-iteration/drafts
06-iteration/reports
08-design-prototypes/material-system
```

## Why

AI_DB_GPT `inspiration` and `gather` contain useful vocabulary, research, architecture clues, and report/product ideas, but they are mixed with intermediate versions, partial conclusions, and project-specific ChatReport scope.

Editing them directly for t-agent creates four risks:

- source history and current t-agent conclusion become mixed
- historical AI_DB_GPT constraints look like current t-agent decisions
- rough report material accidentally becomes PRD truth
- conflicts become hard to trace because the source changed under the reviewer

## Operating Loop

1. Codex agent auto-refreshes the source index before AI_DB_GPT-backed work:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\ai-dbgpt\update-ai-dbgpt-source-index.ps1
```

If you are only editing by chatting in one Codex session, you do not need to type this command. The repository default in `AGENTS.md` requires the agent to run it before using generated AI_DB_GPT indexes.

2. The agent reads generated review aids:

```text
04-sources/ai-dbgpt/generated-manifest.md
04-sources/ai-dbgpt/generated-link-map.md
04-sources/ai-dbgpt/generated-timeline.md
04-sources/ai-dbgpt/generated-conflict-candidates.md
```

3. Pick one source fragment and classify it:

| Fragment Type | Target |
|---|---|
| raw idea | `06-iteration/inbox` |
| reusable theme | `06-iteration/drafts` |
| management / presales / consulting material | `06-iteration/reports` |
| visual HTML prototype | `08-design-prototypes/material-system` |
| direction change | `05-decisions` or `05-decisions/product-decisions` |
| requirement | `01-product/prd` |
| object / runtime contract | `03-architecture/contracts` |
| acceptance gate | `07-evals` |

4. Use the material skill when the output is a deck, HTML, brief, or report:

```text
.agents/skills/t-agent-material-strategy/
```

5. Promote only after review. Generated links are candidate dispatch, not automatic writes.

## How to Adjust `inspiration`

Treat `inspiration` as idea mining.

Recommended extraction units:

- external reference
- product principle
- architecture vocabulary
- UI/UX pattern
- report quality pattern
- risk / anti-pattern

For each useful unit, create an idea note using:

```text
06-iteration/templates/ai-dbgpt-idea-note.md
```

Then move it toward one of:

- product narrative draft
- material section
- architecture mapping
- eval implication
- explicit non-goal

## How to Adjust `gather`

Treat `gather` as version-direction and rough convergence material.

Recommended extraction units:

- version boundary
- next-step candidate
- capability grouping
- roadmap claim
- delivery assumption
- unresolved question

For each useful unit:

1. Check `generated-timeline.md` to understand whether it is older than current PRD / ADR.
2. Check `generated-conflict-candidates.md` for conflicting status or route claims.
3. If still useful, rewrite it into `06-iteration/drafts` with evidence / assumption / unknown.
4. If it changes t-agent V2 direction, create a decision candidate instead of silently editing PRD.

## Conflict Handling

When generated conflict output finds exact source lines:

1. Open both source files and inspect the lines.
2. Decide the conflict type:
   - historical evolution
   - true contradiction
   - terminology drift
   - scope mismatch between AI_DB_GPT and t-agent
3. If it is only historical evolution, add a note in the draft.
4. If it changes current t-agent direction, create an ADR / PDR.
5. If it affects acceptance, update eval coverage.

## Material Production

For PPT / HTML / report material:

1. Start in `06-iteration/reports`.
2. Pick material mode:
   - business
   - product
   - presales
   - consulting
3. Use `06-iteration/templates/report-draft.md` or the templates under `.agents/skills/t-agent-material-strategy/assets/templates`.
4. Cite source paths from `04-sources/ai-dbgpt/generated-manifest.md`.
5. If a visual prototype is needed, create it under `08-design-prototypes/material-system`.

## Original AI_DB_GPT Repo Write-Back

Do not write back to AI_DB_GPT for t-agent-only material.

Only consider writing back to `D:\Users\Desktop\项目\代码\AI_DB_GPT` when the change is genuinely about AI_DB_GPT project truth, such as:

- correcting source metadata
- updating its own document governance
- adding an AI_DB_GPT-specific ADR / PRD / acceptance note
- fixing a stale route inside AI_DB_GPT

For t-agent material, keep edits in this repository.
