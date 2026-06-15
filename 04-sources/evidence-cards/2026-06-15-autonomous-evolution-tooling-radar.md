---
type: evidence-card
status: draft
topic: autonomous-evolution-tooling
created: 2026-06-15
updated: 2026-06-15
confidence: medium
---

# 自主进化工具体系证据卡

## 结论摘要

t-agent 工作空间的下一步不应先做成大型 agent 平台，也不应把 ProductFactory 混入项目内部治理。
更稳妥的路线是把本项目建设成一个“可持续吸收外部能力的产品交付工作区”：

```text
外部信号 -> 来源登记 -> 证据卡 -> 能力雷达 -> 小实验 -> 决策 -> 工作区协议/skill/eval 更新
```

ProductFactory 负责跨项目产品判断和先例检索；t-agent 工作空间负责本产品自身的材料、决策、PRD、数据契约、eval 和 agent 工作协议。

## 关键来源

| 来源 | 类型 | 对 t-agent 的启发 |
|---|---|---|
| OpenAI Codex AGENTS.md docs: https://developers.openai.com/codex/guides/agents-md | official | `AGENTS.md` 适合作为项目级默认工作规则，而不是把每个流程做成外部插件。 |
| OpenAI Codex Skills docs: https://developers.openai.com/codex/skills | official | 仓库内 `.agents/skills` 适合封装可复用工作流，支持按需触发和随 Git 跨机器同步。 |
| AGENTS.md open format: https://agents.md/ | community / standard | 社区已把 `AGENTS.md` 作为“给 agent 的 README”使用，适合承载项目协作规范。 |
| GitHub Spec Kit: https://github.com/github/spec-kit | open-source | 规格驱动工作流强调先明确场景、需求和预期结果，再交给 agent 实现；适合 t-agent 的 PRD / contract / eval 闭环。 |
| BMAD Method: https://github.com/bmad-code-org/bmad-method | open-source | 用命名角色、文件化上下文和阶段化交付组织 AI SDLC；可借鉴其角色边界，但不直接引入整套框架。 |
| MCP reference servers: https://github.com/modelcontextprotocol/servers | open-source | 能力集成应有工具目录、权限边界和来源治理，不能随意接入长尾工具。 |
| GitHub MCP Server: https://github.com/github/github-mcp-server | open-source | 后续可让 agent 与 GitHub issues/PR/repo 元数据连接，但当前阶段先保留为候选。 |
| Obsidian Canvas docs: https://obsidian.md/help/plugins/canvas | official | Canvas 适合做能力地图、路线图、争议地图和产品系统图。 |
| Obsidian Bases docs: https://obsidian.md/help/bases | official | Bases 适合把 Markdown frontmatter 变成项目数据库视图。 |
| Obsidian Properties docs: https://obsidian.md/help/properties | official | 结构化 frontmatter 是后续 dashboards、来源治理和 eval 覆盖的基础。 |
| QuickAdd: https://github.com/chhoumann/quickadd | open-source | 适合 Obsidian 内快速收集 idea/source/topic，但需要注意插件权限。 |
| Promptfoo: https://github.com/promptfoo/promptfoo | open-source | 适合低成本 prompt / agent 输出回归测试和红队评测。 |
| DeepEval: https://github.com/confident-ai/deepeval | open-source | 适合把 LLM app 的质量检查写成类似 pytest 的测试。 |
| Ragas: https://github.com/explodinggradients/ragas | open-source | 适合 RAG / knowledge retrieval 相关 eval。 |
| Langfuse: https://github.com/langfuse/langfuse | open-source | 适合后续做 LLM tracing、prompt、dataset、eval 的观测平台。 |
| Arize Phoenix: https://github.com/Arize-ai/phoenix | open-source | 适合 agent/RAG observability 和 eval 实验。 |
| Hacker News: https://news.ycombinator.com/item?id=44960594 | community signal | 社区痛点集中在 AI-driven development 的上下文消失和项目管理断裂。 |
| Hacker News: https://news.ycombinator.com/item?id=46265482 | community signal | 生产 agent 关注控制、可观测、可组合、成本、确定性和 eval。 |
| Reddit ClaudeCode spec discussion: https://www.reddit.com/r/ClaudeCode/comments/1t2mym5/are_specdriven_frameworks_like_agent_os_bmad/ | community signal | spec-driven 框架仍有价值，但容易过度流程化；应小步吸收。 |
| X/Twitter public search: https://x.com/arungupta/status/2016514607775699400 | weak community signal | spec-driven、AGENTS.md、skills 被频繁一起讨论；只作为趋势信号，不作为事实依据。 |
| X/Twitter public search: https://x.com/dexhorthy/status/2033392483674264044 | weak community signal | “spec as harness” 是社区反复出现的表述；需要回到官方/开源仓库验证。 |

## 证据判断

### evidence

- 项目级 `AGENTS.md` + repo-local skills 是当前最小可控的默认化机制。
- Obsidian 原生 Canvas / Bases / Properties 能覆盖可视化、结构化查询和项目视图，不需要先开发 Obsidian 插件。
- 社区 spec-driven / agent PM workflow 的共同方向是：把上下文、角色、规格、测试和交付记录文件化。
- Eval / observability 是 agent 工作区长期可用的核心能力，不应等到产品编码后才补。
- X/Twitter 的公开搜索结果可用来发现趋势，但不适合作为主要依据；本报告只把它作为弱信号。

### assumption

- t-agent 产品经理最需要的不是更多聊天能力，而是“输入议题后自动变成可讨论、可决策、可验收、可追踪的项目资产”。
- 现阶段使用轻量脚本和 Markdown schema，比引入 LangGraph / CrewAI / AutoGen 这类 runtime 更符合工作区建设阶段。

### unknown

- 用户最终更常在 Obsidian 端输入，还是在 Codex 端输入。
- 是否需要把 GitHub Issues / Projects 作为正式产品 backlog。
- 当前 t-agent 是否需要连接真实企业数据系统，还是先停留在产品工作区和材料治理。

## 风险

- 如果过早接入太多开源框架，会把 t-agent 工作区变成工具拼盘。
- 如果只做 Markdown 管理，不加 eval 和自动检查，会变成静态资料库。
- 如果 ProductFactory 与 t-agent 混用，会导致跨项目产品方法论和本项目事实边界混乱。

## 建议

1. 1.0 阶段只建设工作区自主进化闭环：来源登记、能力雷达、决策、skill、eval。
2. 2.0 阶段再接入 GitHub/MCP/eval/observability 工具链。
3. 所有外部工具先进入 radar，不直接进入默认工作流。
