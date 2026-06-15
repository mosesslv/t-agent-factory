---
type: adr
status: draft
created: 2026-06-15
updated: 2026-06-15
decision: accepted-for-current-workspace
---

# ADR: Default Iteration Direction Research Skill

## Context

t-agent workspace is becoming a long-running product construction workspace.
The user will repeatedly ask next-step, roadmap, capability-integration, AI-community-research, and 1.0/2.0 direction questions.

Manual prompting for each roundtable would be brittle.
The workspace needs a default, silent, project-local workflow that consistently:

- searches local context;
- checks ProductFactory when available;
- researches official, GitHub/open-source, and AI community sources;
- runs resident-agent roundtable synthesis;
- converges into durable project artifacts.

## Decision

Adopt `.agents/skills/t-agent-iteration-direction-research/SKILL.md` as the default project-local skill for iteration-direction questions.

Default triggers include:

- next step / next iteration / next version;
- 1.0 / 2.0 roadmap direction;
- capability integration;
- open-source or GitHub research;
- AI community research;
- product team roundtable;
- comprehensive synthesis request.

## Consequences

Positive:

- The user can ask naturally without naming the skill.
- Research answers have a consistent source-quality standard.
- Roundtable output is tied to durable artifacts.
- ProductFactory remains a precedent source, not the t-agent truth store.

Tradeoffs:

- Serious answers take longer because they require real search.
- The skill must explicitly say when ProductFactory or web search is unavailable.
- Community sources must be handled carefully to avoid over-weighting hype.

## Implementation

- Add local skill: `.agents/skills/t-agent-iteration-direction-research/SKILL.md`
- Add protocol: `09-agents/iteration-direction-research-protocol.md`
- Update default router: `09-agents/default-router.md`
- Update project rules: `AGENTS.md`
- Add report template: `06-iteration/templates/iteration-direction-research-report.md`
- Add evidence card: `04-sources/evidence-cards/2026-06-15-iteration-direction-research-skill-sources.md`

## Review

Review after three serious iteration-direction uses.
If the workflow is too heavy, split into shallow / standard / comprehensive modes.
