# t-agent 能力地图

## 1. 总体架构

```text
业务入口层
Web UI / REST API / WebSocket / ChatBI / FineBI / 飞书 / BI Portal

应用层
ChatExcel / ChatBI / ChatDB / ChatDashboard / ChatReport / Analysis Skill

公共能力层
Dataset Learning / Semantic & Metric / Knowledge / Skill Hub / Asset Hub

Agent 运行层
Intent Router / Planner / Context Builder / Tool Calling / Guardrails / Structured Output

执行与治理层
SQL Executor / DuckDB / Python Sandbox / Chart Engine / Report Renderer / SQL Guard / Trace

资产层
DataSource / DataSet / DataField / Metric / Knowledge / AskRun / InsightRun / ReportRun / Artifact / Feedback / Eval
```

## 2. L0-A 通用平台能力

| 编号 | 能力域 | 核心职责 |
|---:|---|---|
| A1 | Portal & Workspace | 统一入口、项目、会话、上下文和应用间 handoff |
| A2 | Data Center | 数据源、数据目录、数据资产、元数据和数据服务 |
| A3 | Dataset Learning Center | 字段学习、画像、质量、推荐问题、可问范围 |
| A4 | Semantic & Metric Center | 指标、维度、口径、业务术语、语义映射 |
| A5 | Knowledge Center | 文档知识、分析框架、业务规则、RAG 和引用 |
| A6 | Agent Runtime & LLM Adapter | 模型适配、任务规划、工具调用、结构化输出、护栏 |
| A7 | Tool & Execution Hub | SQL、DuckDB、Python、图表、报告渲染、沙箱执行 |
| A8 | Skill Hub | 分析技能创建、发布、复用、版本、评测 |
| A9 | Asset Hub / Artifact Hall | 数据集、图表、洞察、报告、案例和分析素材 |
| A10 | Governance, Permission & Security | 权限、脱敏、SQL Guard、审计、合规 |
| A11 | Run Trace, Eval & Observability | 运行留痕、质量评估、反馈、观测、优化闭环 |
| A12 | Integration & Adapter Framework | ChatBI、BI、数据源、文档、外部系统和模型适配 |
| A13 | Admin, Ops & FinOps | 配置、多租户、成本、模型路由、配额、运维 |

## 3. 核心对象

| 对象 | 作用 |
|---|---|
| DataSource | 数据源连接、认证和权限边界 |
| DataSet | 可问数据对象，承载字段、主题、可问范围和质量画像 |
| DataField | 字段名、别名、描述、类型、单位、维度/度量属性 |
| MetricCatalog | 指标口径、公式、维度层级和版本 |
| KnowledgeBase | 业务术语、SOP、诊断框架和历史报告 |
| Skill Registry | 问数、解读、归因、报告等能力注册和路由 |
| AskRun | 一次问数任务的状态、SQL、结果、错误和审计 |
| InsightRun | 一次解读/洞察任务的输入、算法、结论和证据 |
| ReportRun | 一次报告生成任务的章节、素材、输出和版本 |
| Artifact | 表格、图表、洞察卡、报告片段和引用关系 |
| Feedback/Eval | 用户反馈、评测样例、准确率和回归测试 |

## 4. 架构边界

| 系统/能力 | 更适合承担 | 不建议承担 |
|---|---|---|
| FineBI / 传统 BI | 固定报表、经营看板、复杂可视化编辑和门户分发 | 深度推理、自动归因、长文本经营报告生成 |
| ChatBI | 正式数据源上的专业问数引擎和自然语言入口 | 平台统一数据资产中心、所有应用入口 |
| DB-GPT / t-agent Runtime | 深度分析、报告生成、Skill 编排、私有化、模型自由度 | 替代完整 BI、替代数仓建模、绕过指标口径 |
| 数仓/指标/知识平台 | 数据正确性、指标口径、业务术语、诊断框架 | 直接承担所有前台交互体验 |

## 5. 为什么要补 Harness 与 ToolSearch 思想

历史知识更新明确指出：Skill 不是 prompt，而是一套可触发、可拿上下文、可使用资源/工具、可记录执行、可评测反馈、可版本化的 harness。

这对 t-agent 的意义是：

- Skill Hub 必须包含触发契约、输入输出契约、工具权限、测试样例和版本。
- Tool Registry 不应把所有工具一次性暴露给 Agent，而应支持能力检索、延迟加载和权限治理。
- 知识更新不应自动进入正式知识，而应进入候选发现层，再经过 review / promote。

## 6. 来源

- `idealization/5月/gather/能力清单.md`
- `idealization/5月/gather/v2/产品规划v1.md`
- `idealization/5月/plan/CC-ARCH-architecture-evaluation.md`
- `idealization/5月/enterprise-buildups.md`
- `idealization/5月/_workbench/sessions/2026-06-09-Anthropic-Skills-官方仓库与-harness-思想.md`
- `idealization/5月/_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计.md`

