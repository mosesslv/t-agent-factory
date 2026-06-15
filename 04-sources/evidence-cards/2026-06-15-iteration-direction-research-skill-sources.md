---
type: evidence-card
status: draft
topic: iteration-direction-research-skill
created: 2026-06-15
updated: 2026-06-15
confidence: medium
---

# Evidence Card: Default Iteration Direction Research Skill

## Claim

t-agent should have a repository-local default skill for iteration-direction research.
The skill should require local context search, ProductFactory attempt, official/GitHub primary-source research, AI community search, resident-agent roundtable, and artifact-oriented synthesis.

## Why

The user's recurring workflow is not one-off Q&A.
It is a product-building loop:

```text
topic -> research -> debate -> convergence -> roadmap / PRD / decision / eval / skill update
```

This needs a default skill because repeated manual prompting would lose consistency.

## Source Quality Ladder

| Tier | Source type | Examples | Role |
|---|---|---|---|
| S1 | Official / primary | OpenAI Codex docs, Obsidian docs, MCP docs, official GitHub repos | Factual basis |
| S2 | Open-source primary | repo README, issues, discussions, changelog, releases | Maturity and integration judgment |
| S3 | Technical community high-signal | Hacker News, Reddit technical communities, GitHub Discussions | Adoption friction and tradeoff discovery |
| S4 | Weak trend signal | X/Twitter, newsletters, podcasts, personal blogs | Trend discovery only |
| S5 | Low-confidence | SEO listicles, copied comparisons | Avoid as final evidence |

## Sources Used

| Source | Tier | URL | Use |
|---|---|---|---|
| OpenAI Codex Agent Skills | S1 | https://developers.openai.com/codex/skills | Confirms skills are task-specific capability bundles for reliable workflows. |
| OpenAI Codex AGENTS.md | S1 | https://developers.openai.com/codex/guides/agents-md | Confirms repository-level project instructions are appropriate for default behavior. |
| AGENTS.md open format | S1/S2 | https://agents.md/ | Supports AGENTS.md as a predictable README-like instruction file for agents. |
| OpenAI Codex Subagents | S1 | https://developers.openai.com/codex/subagents | Useful future reference for specialized parallel review workflows, not adopted now. |
| GitHub Spec Kit | S2 | https://github.com/github/spec-kit | Supports spec-driven workflow: clarify requirements before planning. |
| GitHub Spec Kit blog | S1/S2 | https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/ | Supports spec-driven development as a structured agent workflow. |
| BMAD Method | S2 | https://github.com/bmad-code-org/bmad-method | Useful reference for AI SDLC roles and staged product delivery, but should be adapted lightly. |
| Promptfoo | S2 | https://github.com/promptfoo/promptfoo | Candidate eval/red-team framework for later prompt and agent-output regression. |
| DeepEval | S2 | https://github.com/confident-ai/deepeval | Candidate LLM unit-test framework for later eval phase. |
| Langfuse | S2 | https://github.com/langfuse/langfuse | Candidate observability / prompt / eval platform for later runtime phase. |
| MCP reference servers | S2 | https://github.com/modelcontextprotocol/servers | Candidate tool integration ecosystem; requires allowlist and governance. |
| GitHub MCP Server | S2 | https://github.com/github/github-mcp-server | Candidate for future issue/PR/backlog integration. |
| Obsidian Canvas | S1 | https://obsidian.md/help/plugins/canvas | Supports native visual maps for roadmap, capability, and debate mapping. |
| Obsidian Bases | S1 | https://obsidian.md/help/bases | Supports structured views over Markdown properties. |
| Obsidian Properties | S1 | https://obsidian.md/help/properties | Supports structured frontmatter for dashboards. |
| Hacker News agent framework discussion | S3 | https://news.ycombinator.com/item?id=46265482 | Community signal: production agent work values control, observability, cost, determinism, and evals. |
| Hacker News framework skepticism | S3 | https://news.ycombinator.com/item?id=42691946 | Community signal: avoid adopting frameworks only because they are popular. |
| Reddit spec-driven frameworks discussion | S3 | https://www.reddit.com/r/ClaudeCode/comments/1t2mym5/are_specdriven_frameworks_like_agent_os_bmad/ | Community signal: spec-driven tools remain useful but can become process-heavy. |
| Reddit agent framework operations pain | S3 | https://www.reddit.com/r/LocalLLaMA/comments/1ltxiy4/langchaincrewautogen_made_it_easy_to_build_agents/ | Community signal: prototypes are easy; operations need logs, traceability, and evals. |

## Interpretation

### evidence

- Repository-local skills are the right mechanism for repeatable project workflows.
- AGENTS.md is the right mechanism for default project behavior.
- Comprehensive iteration research should not rely only on AI community chatter; it needs official and repository corroboration.
- AI community sources are useful for discovering failure modes and friction.

### assumption

- The highest-value t-agent next-step answers will be those that turn research into project artifacts, not only chat summaries.

### unknown

- Whether future Codex versions will expose stronger native hooks for per-message routing.
- Whether t-agent will later need GitHub Issues / MCP integration as a first-class backlog source.

## Recommendation

Adopt now:

- `.agents/skills/t-agent-iteration-direction-research/SKILL.md`
- `09-agents/iteration-direction-research-protocol.md`
- AGENTS.md default trigger for next-iteration questions

Trial later:

- Promptfoo / DeepEval eval POC
- Obsidian Bases dashboards
- GitHub MCP backlog integration
