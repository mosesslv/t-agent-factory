<!-- BEGIN PRODUCTFACTORY ADAPTER -->
# ProductFactory Project Adapter

## Mandatory Project SSOT

Before any product, roadmap, PRD, architecture, eval, source-fusion, or resident-agent decision in this repository, read `agent.md`.

`agent.md` is the T-agent platform SSOT entry. It defines the current product truth, version meaning, authority order, superseded materials, and agent operating rules.

For product facts and version scope, `agent.md` and `02-roadmap/t-agent-roadmap.md` override older PRDs, old PDRs, historical `idealization/5月/` materials, AI_DB_GPT inspiration notes, and ProductFactory memories.

Use this `AGENTS.md` for operating behavior and routing rules. Use `agent.md` for T-agent project truth.

## Workspace Scope

This repository is the t-agent / enterprise Data Agent product construction workspace.
Treat `idealization/5月/` as historical source material, not as the long-term project root.
For new product briefs, roadmaps, architecture maps, source registers, ADRs, evals, and agent protocols, work from the repository root.

Use ProductFactory when discussing product strategy, technical product decisions, PRD, prototype design, roadmap tradeoffs, user evidence, market positioning, agent UI, workflow design, or A-grade product quality.

## Default Silent Agent Routing

For every substantive user message in this repository, silently classify the task and select resident agents from `09-agents/roster.md` using `09-agents/default-router.md`.

Do not require the user to explicitly say "ProductFactory", "roundtable", "agent", "Product Committee", or "Ship Pack".

Default behavior:

1. If the message is a product, roadmap, UX, PRD, scenario, positioning, feature, workflow, or strategy discussion, query ProductFactory first.
2. If the message is a technical product, architecture, data contract, runtime, tool, eval, or governance discussion, query ProductFactory when product implications exist, then use the relevant resident agents.
3. If the message contains raw material, ideas, notes, links, screenshots, or pasted context, use Knowledge Librarian first, then choose Product Lead / Data Product / Agent Architect / Red Team as needed.
4. If the message asks about next iteration direction, roadmap evolution, capability integration, AI community trends, GitHub/open-source tools, or what to build next, silently use `.agents/skills/t-agent-iteration-direction-research/SKILL.md` and `09-agents/iteration-direction-research-protocol.md`.
5. If the message asks to build or update project content, produce or update the smallest relevant artifact and keep source links explicit.
6. If the decision affects direction, create or update a Product Decision or ADR under `05-decisions/`.
7. If the decision affects acceptance, update or propose eval coverage under `07-evals/`.

The agent routing should usually be invisible. In final answers, mention selected agents only when it helps the user understand the decision, audit trail, or disagreement.

## Default Resident Agents

- `product-lead`: product shape, PRD, roadmap, scope, wedge, non-goals.
- `user-research`: users, scenarios, pains, evidence gaps, adoption path.
- `data-product`: datasets, metrics, semantics, permissions, data contracts.
- `agent-architect`: runtime, tools, skills, trace, artifacts, integration boundaries.
- `eval-lead`: golden questions, expected answers, regression, acceptance.
- `knowledge-librarian`: source intake, evidence cards, taxonomy, versioning.
- `red-team`: overclaim, product risk, safety, governance, edge cases.

## Roundtable Default

When a topic is ambiguous, high-impact, or contested, run a lightweight roundtable using `09-agents/roundtable-protocol.md`.

The default roundtable should produce:

- the decision: `build` / `narrow` / `research` / `kill`;
- the sharpest disagreement;
- smallest useful next artifact;
- non-goals;
- evidence / assumptions / unknowns;
- where the result should be stored.

## Iteration Direction Research Default

When the user asks "下一步做什么", "下一版怎么迭代", "后续能力怎么集成", "1.0/2.0 怎么走", "开源社区有什么可以借鉴", or any similar question, treat it as an iteration-direction research task.

Default requirements:

- Search local project context first.
- Attempt ProductFactory for precedent and product judgment, but keep ProductFactory separate from t-agent project truth.
- Use external research across official docs, GitHub/open-source primary sources, and AI community sources.
- Treat Hacker News, Reddit, GitHub Discussions, and maintainer comments as high-signal community sources.
- Treat X/Twitter as weak trend discovery only, not final evidence.
- Force a resident-agent roundtable before final convergence.
- Output a recommendation mapped to `Adopt now`, `Trial`, `Watch`, or `Avoid for now`.
- Split recommendations across t-agent `1.0`, `1.5`, and `2.0` when useful.
- Create or update the smallest durable artifact when the conclusion should persist.

## ProductFactory No-Memory Rule

The user should not need to remember ProductFactory commands. Treat normal product work phrases as triggers:

- "这个功能要不要做"
- "这个页面怎么设计"
- "下一步做什么"
- "帮我做这个需求"
- "这个产品形态对吗"
- "这个 workflow 怎么更好"
- "开始实现这个功能"
- "review 一下这个原型"
- "我扔一个议题，帮我和产品团队打磨"
- "把这个讨论收敛成方案 / PRD / ADR / backlog / eval"

Before giving product-facing recommendations:

- Read `.productfactory/context.md` if it exists.
- Query the ProductFactory bridge at `PRODUCTFACTORY_URL` or `http://127.0.0.1:8765`.
- Name the most relevant ProductFactory sources found when the answer depends on them.
- Mark major claims as `evidence`, `assumption`, or `unknown`.
- Treat ProductFactory memory as context, not unquestionable truth.

## Automation / Hooks Boundary

This project uses AGENTS.md as the hook-like default behavior. It is active when Codex is working in this repository.

Do not create global plugins, global skills, recurring automations, or background monitors unless the user explicitly asks for that wider behavior. Automations are suitable for scheduled review jobs, not for silently inspecting every message in an active chat.

## Default AI_DB_GPT Source Refresh

The user should not need to remember or type the AI_DB_GPT source-index command.

When a user message touches any of the following, run the refresh command automatically before reading generated AI_DB_GPT indexes, making recommendations, or editing project artifacts:

- AI_DB_GPT
- ChatReport / ChatExcel / DB-GPT source material
- `inspiration`
- `gather`
- PPT, HTML, report, deck, brief, material, consulting, presales, or product architecture output based on AI_DB_GPT material
- source integration, conflict detection, timeline, generated manifest, generated link map, or generated conflict candidates

Run from the repository root:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\ai-dbgpt\update-ai-dbgpt-source-index.ps1
```

If the command fails, do not silently continue from stale generated indexes. State the failure, then fall back to reading the original source files directly.

This is a per-task agent default, not a global background monitor. Do not create global plugins, scheduled automations, or always-on watchers unless the user explicitly asks for that wider behavior.

## Windows ProductFactory Context

Current system is Windows.

- ProductFactory vault: `D:\Users\Documents\Obsidian Vault`
- ProductFactory bridge: `PRODUCTFACTORY_URL=http://127.0.0.1:8765`
- Do not use `/Users/ALv/...` paths or macOS LaunchAgent scripts on this machine.
- Prefer the Python cross-platform installer and Windows bridge launcher if ProductFactory needs reinstalling.

## Git Boundary

This repository may have uncommitted user work. Never reset, revert, or overwrite user changes unless explicitly requested.
Do not push to GitHub unless the user explicitly asks.
<!-- END PRODUCTFACTORY ADAPTER -->
