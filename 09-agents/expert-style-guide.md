---
type: agent-style-guide
status: draft
lifecycle: operating-standard
created: 2026-06-15
updated: 2026-06-15
language: zh-CN
depends_on:
  - agent.md
  - AGENTS.md
  - 02-roadmap/t-agent-reality-roadmap-2026-h2.md
source_card:
  - 04-sources/evidence-cards/2026-06-15-ai-product-expert-style-benchmarks.md
---

# t-agent 中文与专家风格指南

本文件定义 t-agent 工作区的默认写作语言、专家风格、文档结构和图示要求。

## 1. 默认语言

本仓库默认使用中文。

适用范围：

- roadmap；
- PRD；
- PDR / ADR；
- architecture note；
- eval plan；
- source register；
- agent protocol；
- review report；
- team handoff；
- backlog explanation。

允许保留英文的情况：

- 产品名、公司名、论文名、官方文档标题；
- API、类名、表名、对象名、字段名；
- 版本标签，例如 `V2 Reality PRD`、`Trusted Analysis Platform Beta`；
- 行业内短语，例如 `agent loop`、`eval`、`artifact`、`context engineering`。

写法要求：中文解释必须覆盖英文术语的实际含义，不能只堆英文名词。

## 2. 总体风格

目标风格：

> 中文为主，像顶级 AI 产品经理、AI researcher、AI systems engineer 共同写出来的文档：清楚、克制、可验证、有边界。

不要写成：

- 泛咨询口号；
- 大而全平台愿景；
- 没有 owner 的路线图；
- 没有 eval 的 AI 能力描述；
- 没有 code path / contract / artifact 的平台化主张；
- 只讲功能，不讲用户、失败模式和验收。

## 3. Anthropic 风格提炼

采用的风格：

- 简单优先：先用 workflow 解决明确任务，不急着抽象通用 agent。
- 组合优先：routing、parallelization、orchestrator、evaluator 都是可组合模式，不是概念包装。
- Eval-first：每个 agent 能力必须有任务、预期输出、失败样例和回归检查。
- Context engineering：明确给 agent 什么上下文、什么时候给、如何压缩、如何避免上下文污染。
- 可信透明：展示 plan、tool、artifact、evidence、warning、eval，不展示隐藏模型思维链。
- Skills 不是 prompt：Skill 应包含触发、资源、工具、运行流程、限制、评测和版本。

在 t-agent 中的使用：

- 写 Agent Runtime 时先画出输入、上下文、工具、输出和 eval。
- 写 ChatReport / ChatExcel 时必须展示可审计运行过程。
- 写 Skill Hub / Tool Registry 时不能只写“能力市场”，必须写权限、版本、触发、测试和失败处理。

## 4. OpenAI 风格提炼

采用的风格：

- 从真实任务判断是否需要 agent：不是所有 LLM 应用都要做 agent，只有当任务需要多步骤决策、工具使用、外部系统交互或长流程执行时才引入 agent。
- Agent = model + tools + instructions + handoffs + guardrails + tracing + evals，而不是一个聊天入口。
- 先定义工具和权限边界，再定义 orchestration / handoff；multi-agent 只在职责天然分离时使用。
- Handoff 必须有明确 owner、输入输出和退出条件，避免“多个 agent 互相甩锅”。
- Guardrails 和 human review 是生产系统的一部分，不是上线后的补丁。
- Tracing / observability 要贯穿 agent run，方便定位工具调用、handoff、模型输出和失败原因。
- Agent evals 要覆盖任务成功率、工具调用正确性、约束遵守、幻觉/越权、人工评审结果和回归。

在 t-agent 中的使用：

- 写 ChatReport / ChatExcel runtime 时，参考 OpenAI Agents SDK 的 agent、tool、handoff、guardrail、trace 结构，但不要为了对齐 SDK 而提前抽象平台。
- 写多 agent 方案前，必须先说明为什么单 workflow / single agent 不够。
- 写 V3 / V4 的 AgentOps、EvalOps、Action Control 时，把 OpenAI tracing、guardrails、evals 作为参考源。
- 写后续技术方案时，应把 OpenAI 官方链接放入来源章节，便于 agent 在实现时回查。

## 5. Google / Google PAIR 风格提炼

采用的风格：

- 用户需求先于模型能力：先定义用户任务、现有痛点、用户如何判断成功。
- 信任校准：系统要让用户知道什么时候该信、什么时候该检查、什么时候该介入。
- 可解释交互：把模型输出背后的数据、证据、限制和不确定性显性化。
- Human-in-the-loop：重要业务结论、报告发布、外发、写回需要 reviewer 或 approval gate。
- 指标与反馈：每个迭代要有用户反馈、质量指标、失败样例和改进闭环。

在 t-agent 中的使用：

- PRD 不能只写“生成报告”，要写谁会用、为什么要信、错了怎么发现、谁能拦截。
- Workbench 设计必须有 evidence drawer、warning state、reviewer decision。
- Roadmap 不能只按能力域拆，要按真实工作流和验收拆。

## 6. Google ML / 系统工程风格提炼

采用的风格：

- 先建立可靠数据、指标、基线和回归，再追求复杂模型或复杂 agent。
- 简单 baseline 是必要参照，不要把复杂系统当成默认起点。
- 基础设施和观测不是后补项：trace、eval、日志、成本、权限、失败率要进入设计。
- 平台化必须来自重复验证过的工作流，而不是来自概念完整性。

在 t-agent 中的使用：

- V2 要先锁 Dataset / Knowledge / Trace / Artifact / Eval Lite。
- V3 才扩大到 ChatReport / Dashboard Insight / Reviewer Gate。
- V4 才抽 Core Service、AgentOps、EvalOps、FinOps 和 Governance。

## 7. 专家标杆面板

这些人名是风格标杆和能力透镜，不是模拟本人，也不是声称他们参与本项目。

| 标杆 | 采用的能力 | 适用 agent |
|---|---|---|
| OpenAI Agents / platform engineering lens | agent、tool、handoff、guardrail、tracing、evals 的工程化组合 | agent-architect, eval-lead, data-product |
| OpenAI practical agents product lens | 从真实业务任务判断是否需要 agent，先做可控工具链和验收 | product-lead, agent-architect |
| Mike Krieger / Anthropic product engineering lens | PM、设计、工程一体化；把 AI 能力变成可交付产品体验 | product-lead, user-research |
| Anthropic agent engineering authors lens | workflow / agent 区分、routing、orchestrator、evaluator、eval-first | agent-architect, eval-lead |
| Anthropic context / eval lens | 上下文组织、失败样例、agent eval、回归门禁 | eval-lead, knowledge-librarian |
| Google PAIR lens | 用户需求、信任校准、可解释、人机协作 | product-lead, user-research, red-team |
| Martin Zinkevich / Google ML engineering lens | 指标、数据、baseline、回归、基础设施 | data-product, eval-lead |
| Jeff Dean / Google systems lens | 大规模系统、工程边界、稳定性和基础设施 | agent-architect |
| Google DeepMind research leadership lens | 长周期研究目标、能力边界、安全和评测文化 | red-team, agent-architect |
| Google Cloud agent architecture lens | 按工作负载选择 agent 组件、工具、编排和治理 | agent-architect, data-product |

## 8. 文档模板要求

### Roadmap

必须包含：

- 当前 decision：`build` / `narrow` / `research` / `kill`；
- evidence / assumption / unknown；
- 版本北极星和 reality overlay 的关系；
- 阶段目标、非目标、验收；
- owner 或 owner lens；
- 主要风险；
- 至少一个图示。

### PRD

必须包含：

- 用户和任务；
- 当前痛点；
- 目标工作流；
- 产品承诺；
- 非目标；
- 复用的现有资产；
- 对象 / contract；
- eval / acceptance；
- rollout / fallback；
- 风险和未知。

### Architecture Note

必须包含：

- 系统边界；
- 组件图或数据流图；
- 对象契约；
- 状态流转；
- 权限 / audit / policy；
- failure mode；
- observability；
- cost / latency / scale assumption；
- migration path。

### Eval Plan

必须包含：

- golden cases；
- expected answer / artifact；
- deterministic checks；
- reviewer rubric；
- failure taxonomy；
- replay method；
- release gate；
- regression owner。

### PDR / ADR

必须包含：

- 背景；
- 决策；
- 备选方案；
- 取舍；
- evidence / assumption / unknown；
- 影响文件；
- 何时复审。

## 9. 图示规则

默认使用 Mermaid，因为它适合 Git-native Markdown 和 Obsidian。

使用 draw.io 的场景：

- 对外汇报需要更精致视觉；
- 需要 PNG / SVG / PDF 导出；
- 需要复杂泳道、云厂商图标、精细布局；
- 图要被非技术同学反复编辑。

最小图示类型：

- roadmap flow；
- capability map；
- system architecture；
- data/control flow；
- object lifecycle；
- review / eval gate。

图示必须服务理解，不为了装饰。

## 10. 来源使用规则

外部资料必须进入以下任一位置：

- `04-sources/evidence-cards/`
- `04-sources/source-register.md`
- 具体 PRD / roadmap 的来源章节

写结论时必须标注：

- evidence：有来源或当前项目事实支持；
- assumption：合理假设但未验证；
- unknown：缺口或需要调研；
- decision：已经被接受的项目决定。

## 11. Agent 系统建设参考源

当后续讨论或设计 agent / multi-agent / tool-use / eval / tracing / guardrail / handoff 时，优先 reference 下表来源。写项目文档时，把相关链接放在来源章节；实现前需要回查官方文档。

| 任务 | 优先参考源 | 采用方式 |
|---|---|---|
| 判断是否应该做 agent | [OpenAI: A practical guide to building agents](https://openai.com/business/guides-and-resources/a-practical-guide-to-building-ai-agents/)；[Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 先判断任务是否真的需要 agent；优先 workflow，避免过早 multi-agent。 |
| 设计 agent 基本结构 | [OpenAI Agents SDK quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart)；[OpenAI Agents SDK](https://developers.openai.com/api/docs/guides/agents) | 对齐 agent、instructions、tools、handoffs、guardrails、tracing 的基本对象。 |
| 设计工具调用 | [OpenAI: Tools](https://developers.openai.com/api/docs/guides/tools)；[Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) | 明确工具权限、输入输出、错误处理、审计和可观测性。 |
| 设计多 agent / handoff | [OpenAI Agents SDK: Orchestration](https://developers.openai.com/api/docs/guides/agents/orchestration)；[OpenAI Agents SDK quickstart](https://developers.openai.com/api/docs/guides/agents/quickstart) | 只有职责边界天然分离时才做 handoff；每个 handoff 要有 owner、输入、输出、退出条件。 |
| 设计 guardrails / 人审 | [OpenAI Agents SDK: Guardrails and approvals](https://developers.openai.com/api/docs/guides/agents/guardrails-and-approvals)；[Google PAIR: Explainability + Trust](https://pair.withgoogle.com/chapter/explainability-trust/) | 高风险输出、发布、外发、写回默认需要 guardrail 或 reviewer gate。 |
| 设计 tracing / observability | [OpenAI Agents SDK: Integrations and observability](https://developers.openai.com/api/docs/guides/agents/integrations-observability) | 每个 run 要能追 tool call、handoff、artifact、evidence、eval 和失败原因。 |
| 设计 agent eval | [OpenAI: Agent Evals](https://developers.openai.com/api/docs/guides/agent-evals)；[Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents) | 覆盖任务成功率、工具正确性、约束遵守、unsupported claim、人工 reviewer rubric 和回归。 |
| 设计 AI 产品体验 | [Google PAIR: People + AI Guidebook](https://pair.withgoogle.com/guidebook/)；[Google PAIR: User Needs + Defining Success](https://pair.withgoogle.com/chapter/user-needs/) | 从用户任务、信任校准、解释、反馈和控制权设计工作台。 |
| 建设生产级 ML / Agent 系统 | [Google: Rules of Machine Learning](https://developers.google.com/machine-learning/guides/rules-of-ml)；[OpenAI: Building agents](https://developers.openai.com/api/docs/guides/agents) | 先锁指标、baseline、数据、eval、trace，再扩大平台抽象。 |

## 12. 参考来源

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
