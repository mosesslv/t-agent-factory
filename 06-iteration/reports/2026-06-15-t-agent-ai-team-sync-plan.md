---
type: planning-report
status: superseded-draft
topic: t-agent-ai-team-sync
created: 2026-06-15
updated: 2026-06-15
superseded_by:
  - 02-roadmap/t-agent-roadmap.md
  - 05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md
audience:
  - AI product
  - AI engineering
  - agent engineering
  - data platform
  - BI / analytics
source_scope:
  - idealization/5月/gather
  - AI_DB_GPT/docs/research/inspiration
  - current t-agent PRD / roadmap / contracts / evals
---

# t-agent 建设规划：AI 团队同步版

> Superseded draft.
> This sync plan was written before the 2026-06-15 version-roadmap SSOT.
> Use `02-roadmap/t-agent-roadmap.md` for V1/V2/V3/V4 boundaries.
> Current V2 is Dataset Learning + Knowledge Base + ChatBI Adapter + ChatExcel single-file / initially single-table analysis-report iteration.

## 0. 本轮对齐目标

这份规划用于面向 AI 团队同步 t-agent 的建设方向、阶段边界、核心对象、工程主线和验收方式。

本规划基于三类材料收敛：

1. `idealization/5月/gather/` 历史共识：Data Agent 不是聊天入口，而是企业数据分析能力操作系统。
2. `AI_DB_GPT/docs/research/inspiration/` 启发材料：Report Engine 暴露了可信分析运行时、证据链、Artifact、Eval、Reviewer Gate 的平台价值。
3. 当前 t-agent 工作区：V2 销售经营分析 PRD、roadmap、dataset contract、run/artifact contract、golden questions。

本轮 ProductFactory bridge 不可用，因此本规划不把 ProductFactory 作为事实来源；ProductFactory 后续只应作为跨项目产品判断和先例检索，不应替代 t-agent 项目事实库。

## 1. 一句话定位

> t-agent 是企业级 Data Agent 平台：把数据资产上下文、语义指标上下文、知识规则、分析技能、运行留痕、证据链、报告产物和评估反馈组织成可运营、可治理、可复用的智能分析能力。

t-agent 不应被定义为：

- 一个聊天框。
- 一个 Text2SQL 工具。
- 一个 DB-GPT 改造项目。
- ChatExcel / ChatBI / ChatReport 的简单合集。
- 一个通用多 Agent 平台。

更准确的产品公式是：

```text
t-agent
= Agent Runtime
+ Data Center
+ Dataset Learning Center
+ Semantic & Metric Center
+ Knowledge Center
+ Tool & Execution Hub
+ Skill Hub
+ Asset Hub
+ Governance & Security
+ Run Trace & Eval
+ Vertical Data Applications
```

## 2. 为什么现在要这样建

### 2.1 企业数据分析的痛点已经从“能查数”升级为“可信分析交付”

历史 gather 材料的核心判断是：企业问数的难点不在于能不能生成 SQL，而在于能不能按正确业务口径、权限边界和证据链生成可信答案。

因此 t-agent 的建设重点不是“让模型更会聊天”，而是：

- 让模型知道有哪些数据、字段和指标。
- 让用户知道哪些数据可问、哪些问题不适合问。
- 让结果能追溯到数据、SQL、图表、指标、知识和运行记录。
- 让失败问题进入评估和改进闭环。
- 让一次分析沉淀为后续可复用资产。

### 2.2 Report Engine 启发说明：报告不是写作问题，而是可信运行时问题

AI_DB_GPT inspiration 材料明确指出：`report-engine-v1` 的价值不是生成一份 HTML 报告，而是把可信经营分析拆成了平台对象：

```text
Dataset / SourceSnapshot
MetricContract / SemanticModel
KnowledgeAsset / RuleKnowledge
AnalysisRun / StepRun / EventTrace
EvidenceGraph
ReportArtifact / DashboardArtifact
EvalResult / ReviewerDecision / ShareRecord
```

这意味着 ChatReport 不能只是章节 prompt；它必须消费受控 evidence package，并在发布前通过 eval / reviewer gate。

### 2.3 平台公共能力必须先沉淀，否则应用会继续割裂

历史共识里已经反复强调：

- Dataset Learning 不属于 ChatExcel。
- Personal Knowledge 不属于 ChatBI。
- Run Trace 不属于某个页面。
- Artifact 不属于某次结果展示。

这些都应该成为平台公共能力，被 ChatExcel、ChatBI、ChatReport、Dashboard、Skill 共同消费。

## 3. 产品分层

## 3.1 L0-A：通用平台能力

| 能力域 | 职责 | V2 是否重点 |
|---|---|---|
| Portal & Workspace | 统一入口、项目、会话、分析上下文 | 轻量 |
| Data Center | 数据源、数据集、数据资产、数据说明卡 | P0 |
| Dataset Learning Center | 字段学习、画像、质量、样例问题、人工校正 | P0 |
| Semantic & Metric Center | 指标口径、维度、默认过滤、业务术语 | P0 轻量 |
| Knowledge Center | 个人/企业知识、分析框架、规则、引用 | P0 轻量 |
| Agent Runtime | Context Builder、Planner、Tool Calling、Guardrails | P0 |
| Tool & Execution Hub | SQL、DuckDB、Chart、Report Renderer、Tool Registry | P0 |
| Skill Hub | 分析技能定义、调用、版本、评估 | P1 / V2 先做首批 skill |
| Asset Hub | 表格、图表、洞察、报告片段、案例沉淀 | P0 Lite |
| Governance & Security | 权限、SQL Guard、脱敏、审计 | P0 |
| Run Trace & Eval | 运行留痕、失败样例、评估、反馈 | P0 |
| Integration & Adapter | ChatBI、FineBI、飞书、数据源、模型适配 | P0 / P1 |
| Admin / Ops / FinOps | 模型配置、成本、配额、运维 | P1 |

## 3.2 L0-B：垂直数据应用

| 应用 | 定位 | V2 边界 |
|---|---|---|
| ChatExcel | 个人文件/临时数据分析入口 | 可消费 Dataset Learning、Knowledge、Run Trace |
| ChatBI / ChatDB | 正式数据源问数入口 | 通过 Adapter 接入，不成为平台资产中心 |
| ChatReport | 经营分析报告生成入口 | V2 做主链路最小闭环，不做完整报告平台 |
| ChatDashboard | 看板解读和洞察 | V2 暂缓，保留素材和引用接口 |
| Data Steward Studio | 数据学习和语义配置工作台 | V2 做字段/指标/可问范围的最小人工校正 |
| Skill & Asset Hall | 技能和资产大厅 | V2 只做内部资产沉淀，不做市场化 |

## 4. 当前阶段判断

当前不应继续泛化概念，而应进入：

> V2 销售经营分析平台化试点：基于黄金数据集、知识和权限，把 ChatExcel / ChatBI / ChatReport / Skills 串成一条可验收主链路。

当前阶段的核心验证问题：

1. 黄金数据集能否被平台化管理，而不是只作为表名或文件。
2. 数据集学习结果能否被 ChatExcel / ChatBI / ChatReport 共同消费。
3. 报告结论能否追溯到数据、SQL、指标、图表或知识。
4. 运行过程能否留痕，并沉淀失败样例。
5. AI 团队能否通过 eval 判断本轮是否变好。

## 5. V2 主线

V2 主线建议保持为：

> 销售经营黄金数据集 + 可信问数 + 分析计划 + 过程可视 + 经营报告生成 + 飞书交付 + 运行评估。

主链路：

```text
进入 t-agent
  -> 选择销售经营黄金数据集
  -> 查看数据集说明卡和可问范围
  -> 输入经营问题或报告议题
  -> 系统加载数据集语义、权限、知识和模型配置
  -> 生成分析计划
  -> 执行问数 / 图表 / 知识检索 / 报告片段生成
  -> 展示 SQL、图表、中间结论、引用和错误
  -> 用户调整时间、维度、指标、报告目标或大纲
  -> 生成经营分析报告
  -> 输出 Markdown / HTML / 飞书文档
  -> 记录 ReportRun、Artifact、Feedback、EvalCase
```

## 6. V2 必须做

## 6.1 黄金数据集和 Dataset Card

必须定义一个销售经营黄金数据集，并补齐：

- `dataset_id`、名称、业务域、来源、负责人、权限范围。
- 字段列表、字段解释、语义类型、同义词、样例值。
- P0 指标、口径、owner、版本。
- 可问范围和不适合回答的问题。
- 数据刷新时间和质量说明。

为什么：这是所有问数、报告、eval 的基础。如果黄金数据集不稳定，后续能力无法验收。

## 6.2 Dataset Learning Center v0

必须支持：

- 字段语义识别。
- 指标/维度/时间/标识符分类。
- 字段同义词和业务展示名。
- 推荐问题生成。
- 数据画像和质量说明。
- 人工校正入口。
- 学习结果版本。

为什么：模型不能靠猜字段完成企业问数。数据集学习是 Data Agent 的数据理解层。

## 6.3 Semantic & Metric Lite

必须支持轻量指标语义：

- 指标口径文本。
- 默认聚合。
- 时间口径。
- 默认过滤条件占位。
- 指标 owner 和版本。

不做完整指标平台、审批流、跨数据集指标血缘。

为什么：V2 的目标是可信问数和可信报告，不是建设完整 Metric Store。

## 6.4 Knowledge Center Lite

必须区分：

- 个人知识：用户上传的分析说明、报告样例、口径补充。
- 企业知识：平台配置的只读口径、业务术语、销售分析框架、历史标准报告。

必须记录知识引用。

为什么：知识是报告解释和业务口径的补充，但不能自动改写正式语义层。

## 6.5 Agent Context Runtime

必须形成稳定上下文组装：

```text
Context = Dataset + Field + Metric + Permission + Knowledge + History + Task + Model Config
```

至少支持：

- 意图识别。
- 数据集上下文加载。
- 知识检索注入。
- 缺少时间/指标/维度时澄清。
- Prompt/模型版本记录。
- 结构化输出。

为什么：t-agent 不能依赖临时 prompt 拼接；后续 ChatReport 和 Skill 都依赖统一 runtime。

## 6.6 SQL Guard 和执行留痕

必须支持：

- 只读 SQL。
- 限行、超时、危险函数拦截。
- 敏感字段拦截或脱敏。
- 执行错误分类。
- SQL、字段命中、知识命中、模型调用、工具调用留痕。

为什么：企业数据分析必须有安全底线；Run Trace 是后续 eval 和审计基础。

## 6.7 AskRun / ReportRun / Artifact / Feedback

必须落地当前 contract 中的最小对象：

- `AskRun`：记录问题、数据集、SQL、安全状态、执行状态、错误。
- `ReportRun`：记录议题、数据集、知识、分析计划、大纲、状态、输出。
- `Artifact`：记录表格、图表、洞察卡、报告片段、报告。
- `Feedback`：记录采纳、错误、不清楚、不安全、无关，以及后续动作。

为什么：这决定 t-agent 是否能从“问一次”变成“可沉淀、可评测、可复用”。

## 6.8 报告生成最小闭环

V2 不做完整 ChatReport 产品，但必须跑通：

- 报告议题理解。
- 分析目标确认。
- 分析计划生成。
- 报告大纲生成。
- 分章节撰写。
- 关键结论引用数据/SQL/图表/指标/知识。
- 输出 Markdown / HTML / 飞书文档。

为什么：报告是销售经营分析试点的交付形态，也是平台能力整合的最好验证场景。

## 6.9 首批 Skills

建议第一批对外/内部可调用 Skills：

| Skill | 说明 |
|---|---|
| DatasetSelectSkill | 选择和读取黄金数据集 |
| MetricQuerySkill | 基于权限和语义问指标 |
| TableAnalysisSkill | 基于表格做明细分析 |
| KnowledgeRetrievalSkill | 检索个人/企业知识 |
| SalesReportSkill | 生成销售经营分析报告 |
| FeishuExportSkill | 输出报告到飞书文档或群 |

为什么：Skills 化能避免 ChatExcel、ChatBI、ChatReport 各自重做同一能力。

## 7. V2 明确不做

为了避免范围失控，V2 不做：

- 完整 BI 替代。
- 完整多数据源连接器平台。
- 完整指标平台 / Metric Store。
- 完整企业知识审批流。
- 完整 Notebook。
- 完整 ChatDashboard。
- 完整 Skill 市场。
- 独立 Data Agent Core Service。
- 自动业务 action。
- 自动写回正式指标口径或企业知识。

这些能力应放到 V3 / V3.5 / V4。

## 8. 8 周交付拆分

## Week 0-1：范围冻结与合同对齐

交付：

- V2 PRD 冻结。
- 黄金数据集候选确认。
- Dataset / Metric / AskRun / ReportRun / Artifact / Feedback contract 冻结。
- 首批 10-20 条黄金问题补齐 dataset_id、预期 SQL/答案、验收标准。
- ChatBI 权限表和用户映射调研。
- 飞书读写权限调研。

AI 团队重点：

- 产品负责人砍范围。
- AI PM 固化用户流程和验收样例。
- Agent 研发设计 Context Builder 和 prompt 模板。
- 后端定义数据模型和 API。

## Week 1-2：Data Center + Dataset Learning

交付：

- 黄金数据集列表和详情。
- Dataset Card。
- 字段学习、字段解释、推荐问题。
- 字段/指标/维度/可问范围人工校正。
- 学习状态和学习失败原因。

验收：

- 至少 1 个销售经营黄金数据集可以被展示、学习、校正、版本化。

## Week 3-4：Knowledge + Trusted Asking

交付：

- 个人知识上传、解析、绑定。
- 企业知识只读接入或配置。
- 问数链路加载 dataset + semantic + knowledge。
- SQL Guard 最小实现。
- AskRun 记录。
- ChatExcel / ChatBI 共用上下文。

验收：

- 黄金问题中的基础问数类能跑通，并记录 SQL、知识命中和反馈。

## Week 5-6：ReportRun + Artifact + Eval

交付：

- 分析计划。
- 报告大纲。
- ReportRun。
- Artifact 管理。
- 关键结论引用。
- 失败样例沉淀。
- Eval 初版看板或报告。

验收：

- GQ-009 / GQ-010 类型报告问题能生成带引用的 3-4 章报告草稿。

## Week 7-8：飞书交付 + 内测准备

交付：

- Markdown / HTML / 飞书文档输出。
- 分享留痕。
- 错误分类和重跑机制。
- 内测演示脚本。
- V2 评审报告。
- V2.1 / V3 决策建议。

验收：

- 能面向 5-10 个内部用户做小范围内测。

## 9. 团队分工建议

| 角色 | 主要职责 |
|---|---|
| AI 产品负责人 | 定义 V2 目标、砍范围、组织验收、对齐业务和研发 |
| AI PM | PRD、用户流程、黄金问题、报告样例、知识材料、验收脚本 |
| 后端研发 | Dataset / Knowledge / Run / Artifact / Permission / Feishu API |
| 前端研发 | 数据集页、字段校正、问数/报告工作台、Run 详情、反馈入口 |
| Agent 研发 | Context Builder、Prompt、Planner、Tool Calling、SQL 修复、报告生成 |
| 数据/BI SME | 黄金数据集、指标口径、销售经营报告样例、问数验收 |
| QA / Eval | 黄金问题回归、失败样例分类、发布前检查 |
| 外包后端可选 | CRUD、日志、素材管理、低耦合后台页面，不碰核心 runtime |

## 10. AI 团队工作方式

建议每个迭代工作都按以下链路落地：

```text
议题 / 需求
  -> Source / Evidence
  -> Product Decision / ADR
  -> PRD / Contract / Eval
  -> Development Task
  -> Run / Artifact / Feedback
  -> Eval Result
  -> Iteration Log
```

每个关键能力必须回答：

1. 对应哪个用户任务？
2. 消费哪个数据集或知识？
3. 使用哪个对象契约？
4. 如何留下 trace？
5. 如何进入 eval？
6. 失败后沉淀在哪里？

## 11. 验收指标

## 11.1 产品可用性

| 指标 | V2 建议目标 |
|---|---:|
| 内测用户 | 5-10 人 |
| 黄金数据集 | 1 个 P0，2-3 个候选 |
| 黄金问题 | 10-20 条 P0，30-50 条候选 |
| 基础问数成功率 | >= 70% |
| 报告生成成功率 | >= 70% |
| 用户可完成字段校正 | 是 |
| 用户可上传知识并被引用 | 是 |

## 11.2 可信与治理

| 指标 | V2 建议目标 |
|---|---:|
| SQL Guard 覆盖 | 100% 问数路径 |
| AskRun 留痕覆盖 | >= 95% |
| ReportRun 留痕覆盖 | >= 90% |
| 关键报告结论引用覆盖 | >= 80% |
| 失败样例沉淀 | 100% P0 失败 case |
| 敏感字段拦截或脱敏 | P0 规则 100% |

## 11.3 平台化

| 指标 | V2 建议目标 |
|---|---|
| ChatExcel / ChatBI 是否共用 Dataset 对象 | 是 |
| ChatExcel / ChatBI / ChatReport 是否共用 Knowledge 对象 | 是 |
| 问数结果是否能成为 Artifact | 是 |
| 报告是否只基于受控 Artifact / AskRun / Knowledge 引用 | 是 |
| Eval 是否能复跑黄金问题 | 是 |

## 12. 关键依赖和待确认问题

## 12.1 业务和数据依赖

1. 销售经营黄金数据集是哪张或哪几张 StarRocks 宽表？
2. 是否已有字段说明、指标口径、owner 和刷新机制？
3. 第一版销售经营报告是周报、月报还是异常归因专题？
4. 是否有 1-2 份真实历史报告作为结构和口径参考？

## 12.2 权限和系统依赖

1. ChatBI 权限表覆盖到什么粒度：用户、角色、组织、数据集、库表、字段、行权限？
2. DB-GPT / t-agent 用户与 ChatBI 用户如何映射？
3. 飞书开放平台是否允许读取文档、创建文档、群分享？
4. 分享到飞书群是否需要校验群成员权限？

## 12.3 Agent 和模型依赖

1. 可用模型有哪些？分别适合 SQL、字段学习、报告撰写、摘要、推理吗？
2. Deep Research 是否允许联网？允许哪些来源？
3. 代码可编辑是否进入 V2？建议只做分析师可选能力，不作为普通用户主路径。
4. Prompt / 模型版本如何记录？

## 13. 主要风险和缓解

| 风险 | 影响 | 缓解 |
|---|---|---|
| 黄金数据集迟迟不定 | 全链路无法验收 | Week 0 冻结 1 个 P0 数据集 |
| 报告变成纯文本总结 | 业务不敢用 | 强制关键结论引用 AskRun / Artifact / Metric / Knowledge |
| 语义治理做太重 | 8 周无法交付 | V2 只做 Semantic Lite |
| 权限集成复杂 | 查询和分享阻塞 | 先做 ChatBI 权限 Adapter 最小映射 |
| Agent 流程过重 | 时延高、失败率高 | 单 orchestrator + tools，暂不做复杂多 agent runtime |
| 没有 eval | 质量无法判断 | 黄金问题和失败样例作为 V2 gate |
| 飞书分享权限不清 | 外发风险 | 先做受控静态报告输出 + 分享留痕 |

## 14. V2 之后怎么走

## V2.1：企业试点增强，4-6 周

目标：让 V2 Beta 能在一个真实业务小团队持续使用。

重点：

- 稳定性和错误修复。
- 权限和审计增强。
- 黄金问题扩展到 50-100 条。
- 项目级知识库。
- 数据集模板。
- 用户运营和使用手册。
- 性能和上下文压缩。

## V3：Insight & Report Agent

目标：从问数进入洞察和报告。

重点：

- ChatReport MVP。
- Report Planner。
- Citation / Evidence Graph。
- Dashboard Insight Lite。
- Report eval。
- Reviewer Gate。

## V3.5：Skill Hub + Asset Hub + Data Steward Studio

目标：从功能进入分析资产运营。

重点：

- Skill 定义、发布、调用、评估。
- Artifact / Case / Report / Chart / Insight Gallery。
- Data Steward Studio P1。
- 领域知识发布和轻治理。

## V4：Enterprise Data Agent Core

目标：从 DB-GPT 内平台模块走向企业级核心服务。

重点：

- Core Service 独立化。
- OpenAPI。
- 多租户。
- 模型网关。
- AgentOps / FinOps。
- 企业治理和行业 Agent。

## 15. 面向 AI 团队的同步结论

1. t-agent 的短期目标不是多做几个聊天入口，而是把数据、语义、知识、运行、产物和评估打成闭环。
2. V2 的主线应聚焦销售经营黄金数据集，不应泛化成多场景平台。
3. Dataset Learning、Knowledge、Run Trace、Artifact、Eval 必须平台化，不能留在单个应用里。
4. ChatBI 是专业问数引擎，应 Adapter 化集成，不应成为平台资产中心。
5. ChatReport 是平台能力整合的验证场景，但 V2 只做最小可信报告闭环。
6. 所有重要结论必须能追到数据、SQL、图表、指标、知识或运行记录。
7. 没有黄金问题和失败样例，不能声称质量提升。
8. V2 成功的标志不是 demo 好看，而是 5-10 个内部用户能围绕 1 个黄金数据集持续问数、生成报告、反馈、复盘。

## 16. Source Map

### 历史 gather

- `idealization/5月/gather/基本共识.md`
- `idealization/5月/gather/能力清单.md`
- `idealization/5月/gather/产品功能共识.md`
- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`
- `idealization/5月/gather/v2/v2迭代方向.md`

### inspiration

- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\inspiration\00_INDEX.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\inspiration\02_report_engine_to_ai_dbgpt_platform.md`
- `D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\inspiration\04_v2_v3_gap_and_roadmap.md`
- `04-sources/ai-dbgpt/generated-manifest.md`

### 当前 t-agent 工作区

- `01-product/t-agent-product-brief.md`
- `01-product/prd/PRD-V2-sales-operating-analysis.md`
- `02-roadmap/t-agent-roadmap.md`
- `03-architecture/contracts/dataset-contract-v0.md`
- `03-architecture/contracts/run-artifact-contract-v0.md`
- `07-evals/golden-questions/V2-sales-operating-golden-questions.md`
