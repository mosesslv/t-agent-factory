<!-- BEGIN PRODUCTFACTORY ADAPTER -->
# ProductFactory Project Adapter

## Mandatory Project SSOT

Before any product, roadmap, PRD, architecture, eval, source-fusion, or resident-agent decision in this repository, read `agent.md`.

`agent.md` is the T-agent platform SSOT entry. It defines the current product truth, version meaning, authority order, superseded materials, writing style, and agent operating rules.

For product facts and version scope, `agent.md` and `02-roadmap/t-agent-roadmap.md` override older PRDs, old PDRs, historical `idealization/5月/` materials, AI_DB_GPT inspiration notes, ProductFactory memories, and external research notes.

Use this `AGENTS.md` for operating behavior and routing rules. Use `agent.md` for T-agent project truth.

## Workspace Scope

This repository is the t-agent / enterprise Data Agent product construction workspace.
Treat `idealization/5月/` as historical source material, not as the long-term project root.
For new product briefs, roadmaps, architecture maps, source registers, ADRs, evals, and agent protocols, work from the repository root.

Use ProductFactory when discussing product strategy, technical product decisions, PRD, prototype design, roadmap tradeoffs, user evidence, market positioning, agent UI, workflow design, or A-grade product quality.

## 中文与专家风格默认规则

本仓库默认使用中文。

规则：

1. 重要项目产物默认必须写成中文，包括 roadmap、PRD、PDR、ADR、architecture note、eval plan、source register、agent protocol、review report 和 handoff plan。
2. 产品名、API 名、版本标签、来源标题、代码标识符，以及翻译会降低精度的短概念，可以保留英文。
3. 使用英文外部来源时，必须写中文提炼，并保留来源链接。
4. 不写泛咨询话术。默认采用清晰、克制、可验证的 AI 产品 / 研究 / 工程风格，吸收 OpenAI / Anthropic / Google / Google DeepMind 强团队的实践：
   - 用户问题和工作流优先；
   - 区分 evidence、assumption、unknown；
   - 先做简单可组合系统，再抽象平台；
   - 展示 plan、trace、artifact、evidence、warning、eval；
   - 写清可度量验收和回归门禁；
   - 校准信任，不夸大；
   - 明确非目标和影响半径。
5. 产品文档应该像顶级 AI 产品经理和 AI researcher 共同写成：准确、有证据、有人味、有判断、可测试。
6. 技术文档应该像顶级 AI systems engineer 写成：架构边界、数据流、控制流、失败模式、eval、observability、成本和治理都要显性化。
7. 当文档解释三个以上组件构成的系统时，优先加入视觉 artifact：Git-native Markdown 默认用 Mermaid；需要精细视觉或导出时再使用 draw.io。
8. 不要假装代表真实 Anthropic、Google 或 Google DeepMind 人员发言。提到真实人名时，只能作为带来源和边界的风格标杆。

长期风格指南见 `09-agents/expert-style-guide.md`。

## Default Silent Agent Routing

For every substantive user message in this repository, silently classify the task and select resident agents from `09-agents/roster.md` using `09-agents/default-router.md`.

Do not require the user to explicitly say "ProductFactory", "roundtable", "agent", "Product Committee", or "Ship Pack".

Default behavior:

1. If the message is a product, roadmap, UX, PRD, scenario, positioning, feature, workflow, or strategy discussion, query ProductFactory first.
2. If the message is a technical product, architecture, data contract, runtime, tool, eval, or governance discussion, query ProductFactory when product implications exist, then use the relevant resident agents.
3. If the message contains raw material, ideas, notes, links, screenshots, or pasted context, use Knowledge Librarian first, then choose Product Lead / Data Product / Agent Architect / Red Team as needed.
4. If the message asks about next iteration direction, roadmap evolution, capability integration, AI community trends, GitHub/open-source tools, or what to build next, silently use `.agents/skills/t-agent-iteration-direction-research/SKILL.md` and `09-agents/iteration-direction-research-protocol.md`.
5. If the message asks to update project knowledge, add external sources, change Codex sections, record corrections, integrate productivity skills, or improve knowledge-base behavior, use `.agents/skills/t-agent-knowledge-base-capability/SKILL.md`, `03-architecture/knowledge-base-capability-blueprint.md`, and `06-iteration/docs-as-code-governance.md`.
6. If the message asks to build or update project content, produce or update the smallest relevant artifact and keep source links explicit.
7. If the decision affects direction, create or update a Product Decision or ADR under `05-decisions/`.
8. If the decision affects acceptance, update or propose eval coverage under `07-evals/`.
9. If the decision changes writing or expert-review standards, update `09-agents/expert-style-guide.md` and reference it from `agent.md`.
10. If the decision changes knowledge-base governance, local skills, learning loops, or productivity skill pairing, update `03-architecture/knowledge-base-capability-blueprint.md`, `06-iteration/docs-as-code-governance.md`, `09-agents/productivity-skills-integration.md`, `09-agents/self-improvement-protocol.md`, and related evals.

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
- Write final project artifacts in Chinese unless the user explicitly asks otherwise.

## Knowledge Base Capability Default

When the user says things like "补进知识库", "更新这个 Codex section", "把这个链接/仓库放进项目", "这个以后要记住", "这类 grill-me / handoff / write-a-skill 怎么配", "让这个工作台自我改进", or similar, treat it as knowledge-base capability work.

Default requirements:

- Read `agent.md` first.
- Use `.agents/skills/t-agent-knowledge-base-capability/SKILL.md`.
- Classify the input as raw idea, source, evidence, decision, PRD, contract, eval, learning, or skill.
- Use Knowledge Librarian by default, then add Product Lead, Agent Architect, Eval Lead, and Red Team as needed.
- Do not write directly into accepted truth unless the required PDR/ADR/eval/backlog updates are included.
- For productivity skills, follow `09-agents/productivity-skills-integration.md`:
  - `grill-me`: Red Team + Product Lead + Eval Lead stress test.
  - `handoff`: Knowledge Librarian + Agent Architect cross-session transfer.
  - `write-a-skill`: Agent Architect + Knowledge Librarian + Eval Lead local skill candidate.
  - `self-improvement`: Knowledge Librarian + Eval Lead + Red Team learning event.
- Treat self-improvement as review-gated. Do not create global hooks, background monitors, or automatic canonical rewrites unless explicitly requested.

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
- Read `.productfactory/README.md` and `.productfactory/prompt-cards.md` if they exist.
- Query the ProductFactory bridge at `PRODUCTFACTORY_URL` or `http://127.0.0.1:8765`.
- Name the most relevant ProductFactory sources found when the answer depends on them.
- Mark major claims as `evidence`, `assumption`, or `unknown`.
- Treat ProductFactory memory as context, not unquestionable truth.

For implementation requests, check whether there is already a `build` or `narrow` decision. If not, do a lightweight Product Committee pass before implementation.

For non-trivial product or web coding work, produce a short Ship Pack before implementation:

- Product Committee handoff: confirm the task has a `build` or `narrow` decision before engineering work starts.
- Decision: `build` / `narrow` / `research` / `kill`.
- User and job: who this helps and what they are trying to do.
- Scope: what this iteration will ship.
- Non-goals: three things not to build now.
- Acceptance: tests, browser checks, UX states, or evidence needed to call it done.
- Risk: the main way coding could succeed while the product still fails.

For repeated product delivery work, append a row to `.productfactory/shipping-package/impact-log.md` when practical.

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

## Local ProductFactory Context

Current local execution environment for this repository is macOS / zsh.

- ProductFactory bridge: `PRODUCTFACTORY_URL=http://127.0.0.1:8765`
- ProductFactory vault: `/Users/ALv/Desktop_Local/Study/prod/peronalBlog/ProductFactory/ProductFactory`
- If ProductFactory needs reinstalling on this machine, prefer:

```bash
/Users/ALv/Desktop_Local/Study/prod/peronalBlog/ProductFactory/ProductFactory/integrations/productfactory_bridge/manage_launch_agent.sh install
```

## Git Boundary

This repository may have uncommitted user work. Never reset, revert, or overwrite user changes unless explicitly requested.
Do not push to GitHub unless the user explicitly asks.
<!-- END PRODUCTFACTORY ADAPTER -->
