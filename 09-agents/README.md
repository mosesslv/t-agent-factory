# t-agent Resident Agents

## Purpose

This directory defines the resident product-team agents for the t-agent workspace.
They are not free-form roleplay prompts. They are lightweight harnesses:

```text
Agent = Role + Trigger + Anti-trigger + Knowledge + Tools + Output Contract + Eval
```

## Default Mode

The user should not need to name agents.

When a substantive topic arrives, Codex should:

1. classify the topic;
2. select the smallest useful agent panel;
3. query ProductFactory if product judgment is involved;
4. apply `expert-style-guide.md` for Chinese writing, evidence discipline, and diagram expectations;
5. produce a recommendation, debate summary, or project artifact update;
6. for knowledge-base capability work, apply `productivity-skills-integration.md`, `self-improvement-protocol.md`, and `docs-as-code-governance.md`;
7. store durable conclusions in the correct project folder.

The routing rules live in:

- `default-router.md`
- `roundtable-protocol.md`
- `iteration-direction-research-protocol.md`
- `.agents/skills/t-agent-product-roundtable/SKILL.md`
- `.agents/skills/t-agent-iteration-direction-research/SKILL.md`

## Initial Roster

| Agent | Responsibility | Main folders |
|---|---|---|
| Product Lead Agent | Product shape, PRD, roadmap, wedge, non-goals | `01-product/`, `02-roadmap/`, `05-decisions/` |
| User Research Agent | Users, scenarios, pains, adoption evidence | `01-product/users-and-scenarios/`, `04-sources/` |
| Data Product Agent | Golden datasets, metrics, semantics, permissions | `03-architecture/contracts/`, `07-evals/` |
| Agent Architect Agent | Runtime, tools, skills, trace, artifacts, integration | `03-architecture/`, `09-agents/` |
| Eval Lead Agent | Golden questions, expected answers, failure samples | `07-evals/` |
| Knowledge Librarian Agent | Sources, evidence cards, taxonomy, versioning | `04-sources/`, `06-iteration/` |
| Red Team Agent | Overclaim, security, governance, product risk | all folders |

## Normal Use

You can drop topics naturally:

```text
我们是不是应该先做报告生成，而不是可信问数？
```

Codex should silently select a panel, for example:

```text
product-lead + data-product + agent-architect + eval-lead + red-team
```

Then it should converge the discussion into the smallest useful next artifact.

## Files

- `roster.md`: list of resident agents.
- `profiles/`: individual agent profiles.
- `default-router.md`: silent routing matrix.
- `roundtable-protocol.md`: debate and decision protocol.
- `iteration-direction-research-protocol.md`: source quality, AI community search, and roundtable synthesis protocol for next-iteration questions.
- `expert-style-guide.md`: Chinese-first writing standard and Anthropic / Google / Google DeepMind inspired expert review style.
- `productivity-skills-integration.md`: how `grill-me`, `handoff`, `write-a-skill`, `teach`, and `self-improvement` pair with resident agents.
- `self-improvement-protocol.md`: review-gated learning loop for corrections, errors, recurring workflows, and skill promotion.
- `obsidian-codex-workflow.md`: how Obsidian, Codex, ProductFactory, and Git fit together.
- `agent-harness-spec.md`: profile structure and quality rules.

## Constraints

- Agents can suggest, review, and generate candidates.
- Accepted product truth should live in Product Decisions, ADRs, PRDs, contracts, evals, or source records.
- Do not promote raw discussion into accepted truth without an explicit decision artifact.
- Do not use `idealization/5月/` as the active project root.
- Do not let self-improvement or productivity skills bypass source, decision, or eval gates.
