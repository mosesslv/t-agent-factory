---
type: operating-note
status: active
updated: 2026-06-15
---

# AI_DB_GPT Integration Operating Note

Use this lane when AI_DB_GPT research, inspiration, gather notes, PRDs, report HTML references, or skills need to inform t-agent.

```text
AI_DB_GPT source
  -> 04-sources/ai-dbgpt/generated-manifest.md
  -> 04-sources/ai-dbgpt/generated-link-map.md
  -> 04-sources/ai-dbgpt/generated-timeline.md
  -> 04-sources/ai-dbgpt/generated-conflict-candidates.md
  -> 06-iteration/inbox
  -> 06-iteration/drafts
  -> 06-iteration/reports
  -> PRD / ADR / contract / eval only after review
```

Generated files are review aids, not automatic truth promotion.

## Default Refresh Behavior

The user should not need to run the refresh command manually.

For normal Codex use in this repository, the agent must run the refresh automatically before handling any task that depends on AI_DB_GPT source material, generated link maps, conflict candidates, timeline, `inspiration`, `gather`, report material, PPT, HTML, consulting narrative, or product architecture narrative.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\ai-dbgpt\update-ai-dbgpt-source-index.ps1
```

If the command fails, generated files may be stale. The agent should report the failure and read the original AI_DB_GPT source paths directly for the current task.

If a conflict is found, use `generated-conflict-candidates.md` to inspect exact source lines, then decide whether it is:

- historical evolution
- a real contradiction
- a term-normalization issue
- an accepted t-agent direction change that needs ADR / PDR capture

For PPT, HTML, consulting, product architecture, presales, or value narrative materials, use:

```text
.agents/skills/t-agent-material-strategy/
```

## Where to Edit

| Work | Edit Here | Why |
|---|---|---|
| rough idea from inspiration / gather | `06-iteration/inbox` | loose capture without promoting truth |
| structured theme | `06-iteration/drafts` | can be reviewed and merged later |
| PPT / HTML / report narrative | `06-iteration/reports` | readable materials before formal acceptance |
| HTML prototype | `08-design-prototypes/material-system` | visual artifact workspace |
| accepted product direction | `05-decisions` or `05-decisions/product-decisions` | durable decision trail |
| accepted requirement | `01-product/prd` | product contract |
| accepted object / runtime contract | `03-architecture/contracts` | architecture contract |
| accepted quality gate | `07-evals` | regression and acceptance |
