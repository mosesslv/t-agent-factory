---
type: research-report
status: draft
topic: autonomous-evolution
created: 2026-06-15
updated: 2026-06-15
decision: narrow
---

# t-agent 工作空间自主进化路线

## Product Committee Decision

Decision: `narrow`

不要把 t-agent 工作空间短期做成通用 ProductFactory、通用 agent 平台或 Obsidian 插件。
当前应聚焦为：

> 一个服务 t-agent 产品建设的智能工作区，能持续吸收外部工具和社区实践，并把输入议题自动收敛成来源、证据、决策、PRD、数据契约、eval 和 agent 协议。

## ProductFactory 与 t-agent 的分工

| 系统 | 职责 | 不做什么 |
|---|---|---|
| ProductFactory | 跨项目产品判断、先例检索、产品委员会方法论、A 级产品品味 | 不成为 t-agent 的事实库，不替 t-agent 保存 PRD/ADR/eval |
| t-agent workspace | 本产品自身材料、方案、路线、架构、数据契约、eval、agent 协议、迭代日志 | 不沉淀跨项目产品方法论，不扩展成通用产品咨询库 |

两者关系：

```text
ProductFactory = 外部产品判断引擎
t-agent workspace = 本产品事实和交付资产
Codex = 执行和收敛 agent
Obsidian = 人类阅读、链接、可视化和复盘界面
Git = 版本边界和跨机器同步
```

## 开源和社区研究结论

### 1. 规格驱动比“多 agent 热闹”更重要

GitHub Spec Kit、BMAD Method、Reddit / HN 关于 spec-driven workflow 的讨论都指向同一件事：AI 辅助开发和产品建设最容易失败在上下文漂移、需求不清、验收缺失，而不是缺少更多 agent 名字。

对 t-agent 的启发：

- 每个重要议题都应收敛为 spec / decision / eval 中的一种。
- resident agents 的价值是审查角度稳定，不是表演角色扮演。
- 1.0 不追求全自动实现，先追求“每次讨论都能变成项目资产”。

### 2. Obsidian 应当作为原生工作台，而不是被替代

Obsidian Canvas、Bases、Properties 已经覆盖：

- 视觉地图：能力图、版本图、争议图。
- 数据库视图：source、decision、eval、backlog、agent profile。
- 结构化元数据：状态、类型、版本、来源、信心等级。

对 t-agent 的启发：

- 先规范 Markdown frontmatter，再做 Bases/Dataview。
- Canvas 用于战略和系统图，不承担正式真理。
- QuickAdd/Templater 可用于捕获，但需要谨慎安装插件。

### 3. Eval 和 observability 要前置

Promptfoo、DeepEval、Ragas、Langfuse、Phoenix 共同说明：agent 产品长期可靠性来自可运行 eval、trace 和 failure loop。

对 t-agent 的启发：

- 1.0 先做离线 eval：golden questions + expected answer + review rubric。
- 2.0 再接入 tracing / observability。
- 每个新 skill / prompt / agent 协议都要能被失败样例约束。

### 4. MCP / GitHub / agent runtime 是二阶段能力

MCP reference servers、GitHub MCP Server、LangGraph、AutoGen、CrewAI 等很重要，但当前工作空间还处于产品定义和交付资产治理阶段。

对 t-agent 的启发：

- 先把工具作为 radar 候选，不进入默认流程。
- 等 t-agent 产品 runtime 或真实 backlog 协作需要出现，再做 MCP/GitHub 集成。

## 1.0 阶段：智能工作区闭环

目标：

> 让产品经理把议题扔进来后，Codex 能自动选择 agent panel，查询 ProductFactory 先例，收敛成正确项目资产，并留下可追踪证据。

### 1.0 交付物

| 模块 | 交付物 | 完成标准 |
|---|---|---|
| 静默路由 | `AGENTS.md`, `09-agents/default-router.md` | 普通议题无需点名 agent 即可路由 |
| 本地 skill | `.agents/skills/t-agent-product-roundtable/` | 产品议题自动进入圆桌/收敛流程 |
| 自主进化 skill | `.agents/skills/t-agent-autonomous-evolution/` | 新工具/新材料能进入证据卡和能力雷达 |
| 能力雷达 | `09-agents/capability-integration-radar.md` | 候选工具按 Adopt / Trial / Watch / Avoid 管理 |
| 证据卡 | `04-sources/evidence-cards/` | 每个外部能力有来源、判断、风险 |
| 结构化属性 | frontmatter schema | PRD/PDR/ADR/source/eval/profile 可被 Obsidian 查询 |
| Review queue | `06-iteration/review-queue/` | 未确认材料不污染正式文档 |
| Eval baseline | `07-evals/golden-questions/` | 至少 10-20 个 V2 黄金问题和判断标准 |

### 1.0 不做

- 不接入大型 runtime 管理工作区。
- 不开发 Obsidian 插件。
- 不把 ProductFactory 变成本项目子系统。
- 不自动写 accepted 文档。
- 不连接真实企业数据系统。

## 1.5 阶段：工具化和可视化

目标：

> 把 1.0 的 Markdown 规则变成 Obsidian 可查询、Codex 可检查、Git 可审计的工作流。

### 1.5 候选交付

| 能力 | 做法 |
|---|---|
| Obsidian dashboard | 用 Bases/Dataview 展示 decisions、sources、eval coverage、open questions |
| Capture templates | idea/source/roundtable/eval/failure-case 模板 |
| Consistency checker | 脚本检查 frontmatter、broken links、PRD 是否有 eval、PDR 是否有 owner/status |
| Weekly audit automation | 可选：每周扫描 review queue 和 stale decisions |
| Promptfoo POC | 对 V2 golden questions 做一次 prompt/agent 输出回归 |

## 2.0 阶段：可评测的产品交付操作系统

目标：

> t-agent 工作空间不只是资料库，而是一个能辅助产品经理持续推进产品定义、交付验收和学习闭环的操作系统。

### 2.0 候选交付

| 能力 | 候选工具 | 进入条件 |
|---|---|---|
| Spec-driven package | Spec Kit 思路 / 本地模板 | V2 PRD 进入开发或原型阶段 |
| Eval suite | Promptfoo + DeepEval | golden questions 稳定后 |
| Retrieval eval | Ragas | 出现真实知识检索或 RAG 流程 |
| Observability | Langfuse / Phoenix | 出现真实 t-agent runtime 或批量 LLM 调用 |
| GitHub integration | GitHub MCP Server | 需要 issues / PR / backlog 与 repo 双向同步 |
| MCP tool catalog | MCP servers + local allowlist | 有明确工具权限、来源和审计需求 |
| Runtime experiments | LangGraph / AutoGen / CrewAI | 进入产品实现，不再只是工作区治理 |

## 自主进化循环

每次出现新材料、新工具、新社区实践、新议题时：

```text
1. Intake
   进入 inbox 或 source register。

2. Triage
   Knowledge Librarian 判断来源、类型、可信度。

3. Product/Architecture Review
   Product Lead / Data Product / Agent Architect / Eval Lead / Red Team 按需参与。

4. Radar Update
   放入 Adopt / Trial / Watch / Avoid。

5. Small Experiment
   只对 Trial 项做最小验证。

6. Decision
   成功后进入 PDR / ADR / PRD / skill / eval / script。

7. Regression
   新能力必须有反触发、失败样例或验收检查。
```

## 当前最小下一步

1. 新增 `t-agent-autonomous-evolution` local skill。
2. 为核心文档统一 frontmatter schema。
3. 建一个 Obsidian Bases/Dataview dashboard 草案。
4. 用 Promptfoo 对 V2 golden questions 做一次离线评测 POC。
5. 每周只运行一次“能力雷达复查”，避免持续打断主线。

## 主要风险

- 工具崇拜：看到新框架就接，最终工作区变复杂。
- 自动化幻觉：没有 eval 的自动化只会更快地产生不可信材料。
- 边界混乱：ProductFactory 是跨项目产品智慧，t-agent 是本产品事实库。
- Obsidian 插件风险：社区插件权限较大，先使用核心能力和少量成熟插件。

## Sources

- OpenAI Codex AGENTS.md: https://developers.openai.com/codex/guides/agents-md
- OpenAI Codex Skills: https://developers.openai.com/codex/skills
- AGENTS.md open format: https://agents.md/
- GitHub Spec Kit: https://github.com/github/spec-kit
- BMAD Method: https://github.com/bmad-code-org/bmad-method
- MCP reference servers: https://github.com/modelcontextprotocol/servers
- GitHub MCP Server: https://github.com/github/github-mcp-server
- Obsidian Canvas: https://obsidian.md/help/plugins/canvas
- Obsidian Bases: https://obsidian.md/help/bases
- Obsidian Properties: https://obsidian.md/help/properties
- Promptfoo: https://github.com/promptfoo/promptfoo
- DeepEval: https://github.com/confident-ai/deepeval
- Ragas: https://github.com/explodinggradients/ragas
- Langfuse: https://github.com/langfuse/langfuse
- Arize Phoenix: https://github.com/Arize-ai/phoenix
- HN project management for Claude Code: https://news.ycombinator.com/item?id=44960594
- HN agent framework production discussion: https://news.ycombinator.com/item?id=46265482
- Reddit spec-driven frameworks discussion: https://www.reddit.com/r/ClaudeCode/comments/1t2mym5/are_specdriven_frameworks_like_agent_os_bmad/
