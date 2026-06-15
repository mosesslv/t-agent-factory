---
name: t-agent-knowledge-base-capability
description: Manage t-agent knowledge-base updates as product capability work. Use when the user asks to add external sources, update Codex sections, change project knowledge, record corrections, integrate productivity skills, create reusable agent workflows, or improve the workspace knowledge system.
---

# t-agent Knowledge Base Capability

## Quick Start

Before changing project knowledge:

1. Read `agent.md`.
2. Read `06-iteration/docs-as-code-governance.md`.
3. Classify the input: raw idea, source, evidence, decision, PRD, contract, eval, learning, skill.
4. Select the smallest resident-agent panel from `09-agents/default-router.md`.
5. Write to the smallest correct artifact.
6. If accepted truth changes, update PDR/ADR, backlog, eval, and source register as needed.

## Routing

| Input | Default output |
|---|---|
| Rough idea | `06-iteration/inbox/` |
| External link / repo | `04-sources/source-register.md` + evidence card |
| Product direction | `05-decisions/product-decisions/` + roadmap / PRD |
| Architecture / skill / protocol | `03-architecture/`, `09-agents/`, `05-decisions/` |
| Evaluation or failure | `07-evals/` |
| User correction or tool error | `06-iteration/learnings/` |

## Productivity Skill Pairing

Use `09-agents/productivity-skills-integration.md`.

- Use `grill-me` mode for PRD, roadmap, architecture, skill, and protocol stress tests.
- Use `handoff` mode for cross-session continuation.
- Use `write-a-skill` mode only when a workflow is recurring or explicitly requested.
- Use `self-improvement` mode for errors, corrections, missing capability, and outdated knowledge.

## Acceptance

The update is not done until:

- source links are explicit;
- status is explicit;
- evidence / assumption / unknown are separated when product judgment is involved;
- accepted truth is not changed without PDR/ADR when required;
- eval or backlog is updated when acceptance or delivery changes;
- `git diff --check` passes.
