---
type: agent-router
status: draft
created: 2026-06-15
updated: 2026-06-15
---

# Default Agent Router

## Purpose

This file defines the default, mostly silent routing behavior for t-agent product work.
The user should be able to drop topics, notes, objections, ideas, links, source material, product questions, or iteration-direction questions without naming agents.

## Routing Principles

- Route every substantive task to 2-4 resident agents.
- Use the full panel only when product direction, architecture, roadmap, or acceptance may change.
- Keep routing mostly invisible; mention selected agents only when it clarifies the result.
- Always separate evidence, assumptions, unknowns, and recommendations.
- If an output changes project truth, store it in the right artifact instead of leaving it only in chat.
- Do not call research comprehensive unless local, official, GitHub/open-source, and AI community sources were all checked.

## Task Classifier

| User message pattern | Default agents | Output target |
|---|---|---|
| New product idea, feature, user pain, roadmap question | product-lead, user-research, red-team | `01-product/`, `02-roadmap/`, `05-decisions/` |
| PRD, scope, MVP, version boundary | product-lead, user-research, eval-lead, red-team | `01-product/prd/`, `02-roadmap/`, `07-evals/` |
| Data asset, metric, semantic layer, dataset, permission | data-product, agent-architect, eval-lead | `03-architecture/contracts/`, `07-evals/` |
| Agent runtime, skills, tools, trace, artifacts, MCP, workflow | agent-architect, data-product, red-team | `03-architecture/`, `09-agents/`, `05-decisions/` |
| Raw notes, external links, pasted source material | knowledge-librarian, product-lead, red-team | `04-sources/`, `06-iteration/review-queue/` |
| Docs-as-code, knowledge-base governance, random Codex section update, source promotion | knowledge-librarian, agent-architect, eval-lead, red-team | `03-architecture/knowledge-base-capability-blueprint.md`, `06-iteration/docs-as-code-governance.md`, `04-sources/`, `07-evals/` |
| Productivity skills such as grill-me, handoff, write-a-skill, teach, self-improvement | agent-architect, knowledge-librarian, eval-lead, red-team | `09-agents/productivity-skills-integration.md`, `.agents/skills/`, `06-iteration/learnings/`, `07-evals/` |
| User correction, tool failure, outdated knowledge, recurring workflow | knowledge-librarian, eval-lead, red-team | `06-iteration/learnings/`, `06-iteration/review-queue/`, `09-agents/self-improvement-protocol.md` |
| Product disagreement or strategic ambiguity | product-lead, user-research, data-product, agent-architect, eval-lead, red-team | `05-decisions/` |
| Next iteration direction, 1.0 / 2.0, capability integration, open-source or AI community research | product-lead, user-research, data-product, agent-architect, eval-lead, knowledge-librarian, red-team | `.agents/skills/t-agent-iteration-direction-research/`, `09-agents/capability-integration-radar.md`, `06-iteration/reports/`, `05-decisions/product-decisions/` |
| Evaluation, golden questions, failure samples | eval-lead, data-product, product-lead | `07-evals/` |
| Workspace organization, taxonomy, versioning | knowledge-librarian, product-lead | `00-入口.md`, `04-sources/`, `06-iteration/` |

## Default Conversation Loop

For each non-trivial topic:

1. Classify the task.
2. Select resident agents.
3. Read only the most relevant current project artifacts.
4. Query ProductFactory if product direction, scope, UX, roadmap, or technical product judgment is involved and the bridge is available.
5. For iteration-direction questions, follow `09-agents/iteration-direction-research-protocol.md`.
6. For knowledge-base capability questions, follow `06-iteration/docs-as-code-governance.md` and `.agents/skills/t-agent-knowledge-base-capability/SKILL.md`.
7. Produce the narrowest useful answer or artifact.
8. If the decision changes product direction, add or update a Product Decision / ADR.
9. If the decision changes acceptance, add or update eval coverage.
10. If the topic is not yet ready for formal artifacts, place it in the review queue.

## Anti-Patterns

- Do not run every ordinary topic through every agent.
- Do not invent source evidence.
- Do not promote raw discussion into accepted product truth without an explicit decision artifact.
- Do not treat productivity skills as a substitute for resident-agent routing, source evidence, or eval.
- Do not create global hooks, global skills, or scheduled automations for this project unless the user explicitly asks.
- Do not treat `idealization/5月/` as the active product root.
- Do not use community sentiment as final evidence without official or repository corroboration.
