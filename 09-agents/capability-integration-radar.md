---
type: integration-radar
status: draft
created: 2026-06-15
updated: 2026-06-15
---

# t-agent Capability Integration Radar

## Purpose

This radar manages capabilities that may improve the t-agent product workspace.
New tools, community practices, Obsidian plugins, agent workflows, eval systems, MCP servers, and GitHub integrations should enter this radar before becoming default behavior.

## Levels

| Level | Meaning | Default action |
|---|---|---|
| Adopt now | Low risk, high value, directly useful for current workspace | Add to AGENTS, local skill, protocol, template, eval, or script |
| Trial | Promising but needs a bounded experiment | Define a small experiment and success criteria |
| Watch | Important direction, not ready for this workspace | Track sources and revisit later |
| Avoid for now | Adds complexity, risk, or unclear PM value | Do not integrate now |

## Adopt Now

| Capability | Tool / shape | Reason | Integration |
|---|---|---|---|
| Project default behavior | `AGENTS.md` | Best current hook-like project rule mechanism | Active in repo root |
| Product roundtable | `.agents/skills/t-agent-product-roundtable/` | Lets product topics silently route to resident agents | Active local skill |
| Iteration direction research | `.agents/skills/t-agent-iteration-direction-research/` | Default for next-step, roadmap, open-source, AI community, and 1.0/2.0 questions | Active local skill |
| Autonomous evolution intake | `.agents/skills/t-agent-autonomous-evolution/` | Manages new capability candidates, evidence cards, and radar updates | Active local skill |
| Knowledge-base capability | `.agents/skills/t-agent-knowledge-base-capability/` | Turns random knowledge updates, corrections, sources, and productivity skill requests into governed project assets | Active local skill |
| Agent router | `09-agents/default-router.md` | Keeps silent agent selection consistent | Active protocol |
| Iteration research protocol | `09-agents/iteration-direction-research-protocol.md` | Forces credible search and source quality classification | Active protocol |
| Docs-as-code governance | `06-iteration/docs-as-code-governance.md` | Defines how Codex section updates, sources, corrections, and accepted truth changes move through review | Active protocol |
| Productivity skill pairing | `09-agents/productivity-skills-integration.md` | Maps grill-me, handoff, write-a-skill, teach, and self-improvement to resident agents and outputs | Active protocol |
| Self-improvement loop | `09-agents/self-improvement-protocol.md` | Captures errors, corrections, missing capabilities, and recurring workflows with review gates | Active protocol |
| Decision records | Product Decisions / ADRs | Prevents chat-only conclusions | `05-decisions/` |
| Obsidian structure | Markdown frontmatter / Properties | Enables future Bases / Dataview dashboards | Use in new files |
| Visual synthesis | Obsidian Canvas | Useful for roadmap, capability, and debate maps | Manual first, no custom plugin |

## Trial

| Capability | Candidate | Experiment | Success criteria |
|---|---|---|---|
| Spec-driven delivery | GitHub Spec Kit style workflow | Create a local spec -> plan -> tasks -> eval template for V2 sales operating pilot | Can connect PRD, contract, eval, and backlog in one delivery package |
| AI SDLC roles | BMAD Method ideas | Map BMAD-style roles to t-agent resident agents | Reduces role confusion without adding ceremony |
| Fast capture | Obsidian QuickAdd / Templates | Create idea, source, roundtable, and failure-case capture templates | Inputs reliably land in inbox or review queue |
| Dashboard views | Obsidian Bases / Dataview / Tasks | Build decisions, sources, eval coverage, and open-question views | PM can see current state without asking Codex |
| Prompt regression | Promptfoo | Convert V2 golden questions into a CLI eval POC | Can detect output regressions across prompts / skills |
| LLM unit tests | DeepEval | Test answer relevancy / faithfulness for selected report outputs | Test result can guide prompt or skill changes |
| Knowledge dashboard | Obsidian Bases / Canvas | Create source, decision, learning, and eval coverage views | PM can see knowledge-base state without asking Codex |

## Watch

| Capability | Candidate | Why watch | Revisit when |
|---|---|---|---|
| RAG evaluation | Ragas | Useful once t-agent has real retrieval chains | Real retrieval pipeline exists |
| Observability | Langfuse / Arize Phoenix | Useful once t-agent has runtime traces and batch eval | Runtime or batch eval exists |
| GitHub integration | GitHub MCP Server | Could connect issues, PRs, and backlog later | Backlog needs to move into GitHub |
| MCP tool ecosystem | modelcontextprotocol/servers | Long-term tool integration standard | Tool allowlist and governance exist |
| Agent runtime | LangGraph / AutoGen / CrewAI | Product runtime candidates, not current workspace governance tools | t-agent implementation phase starts |
| Codex subagents | OpenAI Codex subagents | Possible future parallel review execution | Resident agent panels need actual parallel execution |

## Avoid For Now

| Capability | Reason |
|---|---|
| Custom Obsidian plugin | Current needs can be met with Markdown, Canvas, Bases, templates, and Codex skills |
| Large multi-agent runtime for workspace management | Current need is product asset convergence, not an execution platform |
| Global background listener that writes files | Too easy to cross workspace and consent boundaries |
| Merging ProductFactory into t-agent workspace | ProductFactory is cross-project product judgment; t-agent is project truth |
| X/Twitter-driven recommendations | Useful for trend discovery only; too weak for final decisions |

## Entry Criteria

A capability may move into `Adopt now` only when:

1. It clearly improves PM delivery quality or speed.
2. It has source evidence and a small experiment or low-risk adoption path.
3. It has a failure mode or anti-trigger.
4. It preserves ProductFactory / t-agent separation.
5. It has a durable home: AGENTS, skill, protocol, template, eval, dashboard, script, PDR, or ADR.

## Adopted Updates

### 2026-06-15: Default iteration direction research skill

Added:

- `.agents/skills/t-agent-iteration-direction-research/SKILL.md`
- `09-agents/iteration-direction-research-protocol.md`
- `06-iteration/templates/iteration-direction-research-report.md`
- `04-sources/evidence-cards/2026-06-15-iteration-direction-research-skill-sources.md`
- `05-decisions/ADR-2026-06-15-default-iteration-direction-research-skill.md`

Reason:

- Next-iteration questions are a recurring PM workflow.
- They require credible search, AI community signal handling, resident-agent debate, and durable artifact updates.

### 2026-06-15: Knowledge-base capability and productivity skills

Added:

- `.agents/skills/t-agent-knowledge-base-capability/SKILL.md`
- `03-architecture/knowledge-base-capability-blueprint.md`
- `06-iteration/docs-as-code-governance.md`
- `09-agents/productivity-skills-integration.md`
- `09-agents/self-improvement-protocol.md`
- `07-evals/golden-questions/knowledge-base-capability-golden-questions.md`
- `05-decisions/product-decisions/PDR-2026-06-15-knowledge-base-capability.md`

Reason:

- The user clarified that this must become a knowledge-base capability, not merely an answer or a documentation patch.
- Productivity skills such as `grill-me` should be paired with resident agents and durable outputs.
