---
type: agent-protocol
status: draft
created: 2026-06-15
updated: 2026-06-15
---

# Iteration Direction Research Protocol

## Purpose

This protocol defines how t-agent answers "what should we do next" questions.
It exists to prevent shallow recommendations, tool-chasing, and ungrounded roundtable outputs.

## Default Decision Rule

Every iteration-direction recommendation must end in one of:

- `Adopt now`: make it part of the default workspace workflow.
- `Trial`: run a bounded experiment with success criteria.
- `Watch`: track the capability but do not spend implementation time yet.
- `Avoid for now`: explicitly defer because it adds complexity, risk, or unclear value.

## Source Quality Ladder

| Tier | Source type | Examples | How to use |
|---|---|---|---|
| S1 | Official / primary | vendor docs, official GitHub repos, standards docs, official release notes | Can support direct factual claims |
| S2 | Open-source primary | repo README, issues, discussions, changelog, stars, release cadence, examples | Can support ecosystem and maturity judgments |
| S3 | Technical community high-signal | Hacker News, Reddit technical communities, GitHub Discussions, maintainer comments, conference talks | Use for pain points, adoption friction, tradeoffs |
| S4 | Weak trend signal | X/Twitter posts, newsletters, podcasts, personal blogs | Use only as trend discovery; verify elsewhere |
| S5 | Low-confidence | SEO listicles, copied blog posts, unsourced comparison articles | Do not use for final recommendations unless corroborated |

## Required Search Surfaces

For comprehensive research, cover these surfaces:

### Local

- `AGENTS.md`
- `.productfactory/context.md`
- `09-agents/`
- `06-iteration/`
- `04-sources/`
- `07-evals/`
- existing PRD / roadmap / PDR / ADR files

### Official / Standards

- OpenAI Codex docs for AGENTS.md, skills, subagents, evals where relevant.
- AGENTS.md open format.
- Model Context Protocol official docs / repos when tool integration is involved.
- Obsidian official docs for Canvas, Bases, Properties, and core behavior.

### GitHub / Open Source

Search for:

- official repository README;
- activity and release signals;
- open issues and discussions;
- examples and templates;
- license and self-hosting constraints;
- eval / trace / CI integration maturity.

Useful recurring repositories:

- `github/spec-kit`
- `bmad-code-org/bmad-method`
- `promptfoo/promptfoo`
- `confident-ai/deepeval`
- `explodinggradients/ragas`
- `langfuse/langfuse`
- `Arize-ai/phoenix`
- `modelcontextprotocol/servers`
- `github/github-mcp-server`

### AI Community

Use community sources for real adoption friction, not as final truth:

- Hacker News: production agent frameworks, eval, spec-driven workflows, tool skepticism.
- Reddit: `r/ClaudeCode`, `r/LocalLLaMA`, `r/MachineLearning`, `r/OpenAI`, `r/ObsidianMD` when relevant.
- GitHub Discussions and Issues: highest-value community source because they connect to actual maintainers and users.
- X/Twitter: weak trend signal only; cite as discovery, not as evidence.

## Roundtable Roles

| Role | Must answer |
|---|---|
| Product Lead | Does this help PMs make better decisions or ship clearer artifacts? |
| User Research | Which user problem or workflow pain does it address? |
| Data Product | Does it improve datasets, metrics, semantics, permissions, or evidence? |
| Agent Architect | Does it fit our AGENTS/skills/MCP/tool boundary without overbuilding? |
| Eval Lead | How will we prove it works or catch regressions? |
| Knowledge Librarian | Where does the source, decision, and output live? |
| Red Team | What is the failure mode, hidden cost, or overclaim risk? |

## Report Shape

Every serious report should include:

1. Research scope.
2. Search surfaces and sources.
3. Source quality assessment.
4. Roundtable positions.
5. Disagreements.
6. Final recommendation.
7. 1.0 / 1.5 / 2.0 split.
8. Artifacts to update.
9. Risks and open questions.

## Anti-Patterns

- Do not recommend a tool because it is popular.
- Do not use X/Twitter as primary evidence.
- Do not treat HN/Reddit comments as facts.
- Do not collapse ProductFactory and t-agent project truth.
- Do not call research comprehensive if official docs, GitHub, and community sources were not all checked.
- Do not produce a roundtable without a decision.
