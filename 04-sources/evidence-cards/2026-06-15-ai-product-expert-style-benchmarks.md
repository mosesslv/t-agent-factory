---
type: evidence-card
status: draft
lifecycle: source-synthesis
created: 2026-06-15
updated: 2026-06-15
language: zh-CN
topic: ai-product-expert-style-benchmarks
used_by:
  - agent.md
  - 09-agents/expert-style-guide.md
  - 02-roadmap/t-agent-reality-roadmap-2026-h2.md
---

# AI 产品 / 研究 / 工程专家风格标杆证据卡

## 1. 研究目的

为 t-agent 工作区建立默认中文写作和专家评审风格，避免后续 roadmap、PRD、架构图、eval、PDR 写成泛咨询材料或概念堆叠。

目标不是模仿某家公司措辞，而是抽取顶级 AI 产品、研究和工程团队的可执行工作方式：

- 用户任务先行；
- 简单可组合系统；
- evidence / assumption / unknown 分离；
- eval-first；
- agent / tool / handoff / guardrail / tracing / eval 可工程化；
- 可解释、可追溯、可审阅；
- 系统边界、失败模式、观测和治理前置。

## 2. ProductFactory 检索

ProductFactory bridge：`http://127.0.0.1:8765`

命中来源：

| 来源 | 状态 | 对本次更新的作用 |
|---|---|---|
| `10 Research/2026-06-13 AI 产品思想源地图.md` | formal | 支持把外部 AI 产品思想加工成可追溯 source card、产品判断原则和反例。 |
| `08 Runs/2026-06-13 ProductFactory x ChatReport 对接研究记录.md` | formal | 支持把 ProductFactory 外部 agent / eval / context 资料接入 ChatReport 下一轮迭代。 |
| `17 Review Queue/google-agentic-architecture-components.md` | candidate | 支持按工作负载选择 agent architecture components，而不是一开始做大而全 multi-agent。 |
| `17 Review Queue/anthropic-agent-evals.md` | candidate | 支持 agent eval、失败样例和可复现实验作为能力验收入口。 |
| `17 Review Queue/openai-practical-guide-agents.md` | candidate | 支持从实际任务和受控工具链定义 agent，而不是先抽象平台。 |
| `17 Review Queue/openai-agents-sdk-evolution.md` | candidate | 支持把 agent、tool、handoff、guardrail、trace 作为工程对象，而不是口号。 |
| `17 Review Queue/openai-agent-evals.md` | candidate | 支持把 agent eval 写入工作指引和 release gate。 |
| `17 Review Queue/google-people-ai-guidebook.md` | candidate | 支持以用户需求、信任、解释和反馈定义 AI 产品体验。 |

## 3. 外部来源摘要

| 来源 | 类型 | 可采用原则 | 对 t-agent 的含义 |
|---|---|---|---|
| OpenAI: A practical guide to building agents | 官方业务 / 技术指南 | 从业务任务、工具链和可控执行判断是否需要 agent。 | t-agent 后续做多 agent 前，必须先证明单 workflow 或 single agent 不够。 |
| OpenAI: Agents SDK | 官方开发文档 | agent、tool、handoff、guardrail、tracing 是可实现对象。 | V3 / V4 的 AgentOps 和 runtime contract 可以参考这些对象边界。 |
| OpenAI Agents SDK: Orchestration | 官方开发文档 | handoff / orchestration 需要清晰职责、路由和控制。 | 多 agent 设计必须写 owner、输入、输出、退出条件。 |
| OpenAI Agents SDK: Guardrails and approvals | 官方开发文档 | guardrails、approval 和人审属于生产 agent 系统。 | Reviewer Gate、Action Control、发布门禁不能后补。 |
| OpenAI Agents SDK: Integrations and observability | 官方开发文档 | tracing / observability 用于定位 run、tool call、handoff 和失败。 | `AnalysisRun`、`ToolCall`、`Artifact`、`EvalResult` 必须进入统一 trace。 |
| OpenAI: Agent Evals | 官方开发文档 | agent eval 要覆盖任务完成、工具使用、约束遵守和失败回归。 | V2/V3 PRD 和 roadmap 必须写 eval pack，不只写功能。 |
| OpenAI: Tools | 官方开发文档 | 工具扩展模型能力，但需要输入输出、权限和错误边界。 | Tool Registry / Action Governance 必须先有权限、审计和错误处理。 |
| Anthropic: Building effective agents | 官方工程 / 研究文章 | 先区分 workflow 和 agent；从简单可组合模式开始；routing、parallelization、orchestrator、evaluator 都要服务具体任务。 | 不要一上来建设通用 multi-agent 平台；先把 ChatReport 可信分析 loop 做成可评测 workflow。 |
| Anthropic: Demystifying evals for AI agents | 官方工程文章 | agent eval 需要从真实任务、可复现检查、失败案例和迭代闭环出发。 | Roadmap / PRD 必须写 eval；V2/V3 验收不能只靠人工感觉。 |
| Anthropic: Effective context engineering for AI agents | 官方工程文章 | agent 成败高度依赖上下文选择、压缩、隔离和更新策略。 | KnowledgeAsset / SourceRef / Evidence 必须进入对象契约，而不是作为 RAG 附属品。 |
| Anthropic: Mike Krieger joins Anthropic as CPO | 官方新闻 | 产品、工程、设计要共同把模型能力变成可用体验。 | AI PM 团队不能只写需求，要组织 PRD、review、demo、eval、owner map。 |
| Google PAIR: People + AI Guidebook | 官方设计指南 | AI 产品应从用户需求、用户成功标准、反馈、解释和信任校准出发。 | Workbench 必须让用户看到 plan、evidence、warning、reviewer gate，避免黑箱报告。 |
| Google: Rules of Machine Learning | 官方 ML 工程指南 | 指标、数据、baseline、基础设施、回归优先；复杂模型不是默认答案。 | 先锁 Dataset Learning、golden cases、run trace 和 deterministic checks，再谈完整平台抽象。 |
| Google Cloud: AI agents | 官方解释 / 架构资料 | AI agent 需要模型、工具、编排、记忆、规划和治理配合，适配不同工作负载。 | V4 Core Service 应来自 V2/V3 验证后的稳定能力，而不是提前搭空平台。 |

## 4. 具体专家标杆

这些标杆用于团队内部评审视角，不代表本人参与、认可或背书。

| 标杆 | 领域 | 建议采用的评审问题 |
|---|---|---|
| OpenAI Agents / platform engineering lens | agent runtime、tool use、handoff、guardrail、tracing、eval | 这个 agent 系统的 tool、handoff、guardrail、trace 和 eval 是否都是明确对象？ |
| OpenAI practical agents product lens | 从真实任务判断 agent 必要性 | 这里为什么需要 agent / multi-agent，而不是 deterministic workflow 或普通工具链？ |
| Mike Krieger / Anthropic product engineering lens | AI 产品、产品工程、设计工程协同 | 这个能力是否能成为真实用户可用的产品体验？PM、设计、工程、eval 是否在同一个工作流里？ |
| Anthropic agent engineering authors lens | agent workflow、orchestrator、evaluator、tool use | 这里是否真的需要 agent，还是 deterministic workflow 更好？能力是否有明确 eval？ |
| Google PAIR lens | AI UX、人机协作、信任校准 | 用户什么时候该信、什么时候该检查、什么时候该介入？ |
| Martin Zinkevich / Google ML engineering lens | ML 系统、指标、baseline、回归 | 是否有可靠指标、数据、baseline、失败样例和回归检查？ |
| Jeff Dean / Google systems lens | 大规模系统、基础设施、可靠性 | 平台边界、扩展性、观测和运行成本是否说清楚？ |
| Google DeepMind research leadership lens | 长周期研究目标、安全、评测文化 | 能力边界和未知是否诚实？是否把安全和 eval 前置？ |

## 5. 综合结论

### Evidence

- t-agent 应默认用中文写重要项目文档，否则产品团队协作成本会升高。
- AI 产品文档必须把用户任务、证据、对象、运行轨迹、评测和发布门禁写清楚。
- 后续建设 agent 或 multi-agent 系统时，必须把 OpenAI / Anthropic / Google 官方资料作为可回查 reference source，而不是只写抽象原则。
- 当前 H2 目标应收敛到可信分析平台 Beta，而不是完整企业级 Data Agent Core。

### Assumption

- 团队可以通过统一文档风格和专家面板提升对齐效率。
- 引入 Mermaid / draw.io 图示能降低 roadmap 和架构讨论的抽象漂浮。

### Unknown

- 团队是否会持续执行 evidence / assumption / unknown 的写作纪律。
- 真实业务数据、指标口径和报告验收样例是否能按时到位。

## 6. 落地建议

- `AGENTS.md` 写入全局中文与专家风格规则。
- `agent.md` 将该规则提升为项目 SSOT。
- `09-agents/expert-style-guide.md` 成为可复用指南。
- 在 `09-agents/expert-style-guide.md` 增加 agent 系统建设参考源表，明确 OpenAI / Anthropic / Google 链接的使用场景。
- `02-roadmap/t-agent-reality-roadmap-2026-h2.md` 改成中文 reality roadmap。
- 系统性架构文档默认加入 Mermaid artifact。

## 7. 来源链接

- [OpenAI: A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)
- [OpenAI: Agents SDK](https://developers.openai.com/api/docs/guides/agents)
- [OpenAI Agents SDK: Quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart)
- [OpenAI Agents SDK: Orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration)
- [OpenAI Agents SDK: Guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-and-approvals)
- [OpenAI Agents SDK: Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability)
- [OpenAI: Agent Evals](https://developers.openai.com/api/docs/guides/agent-evals)
- [OpenAI: Tools](https://developers.openai.com/api/docs/guides/tools)
- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
- [Anthropic: Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
- [Anthropic: Mike Krieger joins Anthropic as Chief Product Officer](https://www.anthropic.com/news/mike-krieger-joins-anthropic)
- [Google PAIR: People + AI Guidebook](https://pair.withgoogle.com/guidebook/)
- [Google PAIR: User Needs + Defining Success](https://pair.withgoogle.com/chapter/user-needs/)
- [Google PAIR: Explainability + Trust](https://pair.withgoogle.com/chapter/explainability-trust/)
- [Google: Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)
- [Google Cloud: AI agents](https://cloud.google.com/discover/what-are-ai-agents)
