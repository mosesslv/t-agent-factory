# 企业数据分析场景地图、能力矩阵与 DB-GPT 建设映射

> 日期：2026-05-20  
> 路径：`D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\plan`  
> 目标：补充定义企业数据分析平台的场景地图，讨论大数据部门面向企业分析需求应提供的资产与产品能力，并映射 DB-GPT 当前能力、缺口和 L1/L2 必建模块。  
> 关系：本文是 [DB-GPT 企业级数据分析平台改造评估与建设计划](dbgpt-enterprise-analytics-platform-plan.md) 的补充，不替代其中的人天和路线评估。

## 1. 核心判断

如果把企业级数据分析平台理解为“用户输入自然语言，系统给一个答案”，会低估建设复杂度。更合理的抽象是：

```text
数据对象粒度 x 分析自由度 x 交付资产形态
```

其中：

- 数据对象粒度决定“系统能理解的数据边界”：个人 Excel、领域宽表/数据集、指标、看板、报告、业务知识。
- 分析自由度决定“用户任务复杂度”：查数、解释、诊断、归因、预测、报告、决策建议。
- 交付资产形态决定“大数据部门要沉淀什么”：黄金数据集、指标口径、问数 Skill、报告模板、知识库、BI 看板、数据 Agent 底座。

这意味着大数据部门未来不能只提供报表，也不能只提供 ChatBI 工具，而要提供一组分层资产：

```text
黄金数据集 + 指标体系 + 问数/解读/报告 Skills + 报告模板/知识库 + 传统 BI 产品 + Data Agent 底座
```

DB-GPT 的合理定位不是替代所有产品，而是作为“Data Agent 底座”的候选：连接数据源、编排 LLM/SQL/工具、沉淀问数和报告 runtime；ChatBI、小Q、FineBI 这类产品分别作为专用工具或外部能力接入。

## 2. 数据分析场景地图

### 2.1 两个主轴

主轴一：数据对象粒度。

| 粒度 | 数据对象 | 典型拥有者 | 特征 |
|---|---|---|---|
| D0 | 个人 Excel / CSV / 临时文件 | 个人业务用户 | 临时、低治理、字段不稳定、适合即问即答 |
| D1 | 单表 / 领域宽表 | 数据开发/数据分析师 | 已经建模但语义有限，适合主题域问数 |
| D2 | 数据集 / 语义数据集 | 大数据部门/BI 团队 | 定义字段、关系、维度、口径，是问数核心对象 |
| D3 | 指标 / 指标体系 | 指标治理团队/业务负责人 | 口径稳定、可复用、可治理，是管理决策对象 |
| D4 | 报表 / 看板 / 仪表板 | BI 团队/业务团队 | 已完成可视化组织，适合解读、追问、洞察 |
| D5 | 报告 / 经营分析材料 | 分析师/经营管理团队 | 多章节叙事、图文结合、需要审核和版本 |
| D6 | 业务知识 / 方法论 / SOP | 业务专家/数据专家 | 定义为什么、怎么判断、异常如何解释 |

主轴二：分析自由度。

| 自由度 | 用户任务 | 典型问题 | 系统复杂度 |
|---|---|---|---|
| F0 | 查询事实 | “上月销售额是多少？” | 低：选字段、过滤、聚合 |
| F1 | 切片探索 | “按区域看 TOP10” | 中低：维度组合、排序、图表 |
| F2 | 指标解释 | “为什么毛利率下降？” | 中：同比环比、结构拆解、异常定位 |
| F3 | 多步诊断 | “哪个事业部拖累利润？” | 中高：多指标、多维度、归因链 |
| F4 | 经营洞察 | “下月应重点看什么风险？” | 高：规则、统计、LLM、业务知识结合 |
| F5 | 报告生成 | “生成本月经营分析报告” | 高：多数据源、多章节、模板、审核 |
| F6 | 行动建议/Agent 执行 | “把异常生成任务并通知负责人” | 很高：权限、工作流、外部系统动作 |

### 2.2 场景地图矩阵

| 数据对象 x 自由度 | F0 查数 | F1 探索 | F2 解释 | F3 诊断/归因 | F4 洞察 | F5 报告 | F6 行动 |
|---|---|---|---|---|---|---|---|
| D0 个人 Excel | Chat Excel 查表 | 上传文件探索 | 文件摘要/异常解释 | 多 Sheet 关联分析 | 临时洞察卡 | 文件报告 | 低优先级 |
| D1 领域宽表 | 宽表问数 | 维度下钻 | 同比环比解释 | 结构贡献拆解 | 主题域洞察 | 主题域简报 | 异常通知 |
| D2 数据集 | 小Q式问数核心 | 自助分析 | 指标解释 | 跨维归因 | 自动洞察 | 数据集报告 | 任务编排 |
| D3 指标 | 指标查询 | 指标对比 | 口径解释 | 指标树归因 | 指标预警 | 指标月报 | 指标治理动作 |
| D4 报表/看板 | 看板追问 | 图表切换/下钻 | 小Q解读 | 看板归因 | 看板洞察 | 看板总结报告 | 订阅/告警 |
| D5 报告 | 查报告片段 | 报告素材追问 | 报告解读 | 跨期报告对比 | 管理建议 | 自动生成报告 | 审批/分发 |
| D6 业务知识 | 术语问答 | SOP 检索 | 口径解释 | 诊断框架 | 方法论推荐 | 模板生成 | 流程触发 |

优先级建议：

- P0：D0-F0/F1、D1-F0/F1、D5-F5 的可体验闭环。
- P1：D2-F0/F1/F2、D4-F2、D5-F5 的产品化闭环。
- P2：D3-F2/F3、D4-F3/F4、D6 全链路知识增强。
- P3：F6 行动型 Agent，只有在权限、安全、审计成熟后再做。

### 2.3 建议补充的第三维：可信度/治理等级

同样是“问销售额”，个人 Excel、宽表、指标系统的可信度不同。建议为每个场景标注治理等级：

| 等级 | 含义 | 适用场景 |
|---|---|---|
| G0 临时分析 | 用户自担口径，系统只提示字段和数据质量 | 个人 Excel、临时 CSV |
| G1 可复用分析 | 数据对象可保存复用，有基础字段描述 | 宽表、单表数据集 |
| G2 标准问数 | 字段、指标、维度、口径可治理 | 企业数据集、主题域 |
| G3 管理决策 | 指标经业务确认，结果可审计 | 指标体系、看板、经营报告 |
| G4 自动行动 | 可触发任务/通知/流程，需要权限审批 | 告警、订阅、Agent 执行 |

这个维度很重要：它决定大数据部门是交付“工具”，还是交付“可信数据产品”。

## 3. 大数据部门未来应提供什么

### 3.1 从“交付报表”转向“交付分析资产”

传统模式：

```text
业务提需求 -> 数据部门取数/做报表 -> 业务看报表 -> 再提新需求
```

面向 AI 数据分析平台，目标模式应变成：

```text
大数据部门沉淀 AI-ready 数据资产和分析能力 -> 业务用户通过问数/解读/报告自助消费 -> 高价值问题沉淀回模板和知识库
```

大数据部门的核心职责应从“每个问题都人工取数”转为：

- 提供标准数据对象：黄金数据集、指标、维度、口径、数据质量说明。
- 提供分析能力资产：问数 Skills、解读 Skills、报告 Skills、归因模板。
- 提供可信上下文：业务知识库、术语表、SOP、异常解释规则。
- 提供平台底座：数据连接、模型路由、SQL 安全、审计、权限、运行态。
- 提供消费工具组合：ChatBI、小Q、FineBI、DB-GPT/Data Agent 底座的协同。

### 3.2 资产分层

| 层级 | 资产 | 提供什么 | 为什么重要 |
|---|---|---|---|
| L0 原始连接 | 数据源、库表、权限账号 | 可访问数据 | 没有连接就没有问数基础 |
| L1 黄金数据集 | 领域宽表、主题数据集、AI-ready dataset | 业务可理解、字段稳定、质量可控的数据入口 | 降低 NL2SQL 难度，提高可信度 |
| L2 指标体系 | 指标、维度、口径、时间粒度、派生指标 | 标准答案和管理语言 | 避免“同名不同义、同义不同数” |
| L3 分析知识 | 术语表、字段别名、业务规则、诊断框架、few-shot 样例 | 让 LLM 理解业务 | 提升问数准确率和解释质量 |
| L4 Skills/Templates | 问数 Skill、解读 Skill、报告 Skill、归因模板、报告模板 | 可复用的分析动作 | 把专家经验产品化 |
| L5 分析产品 | ChatBI、小Q、FineBI、DB-GPT/Data Agent 平台 | 用户消费入口 | 满足不同用户和不同复杂度任务 |
| L6 运营治理 | 评测集、反馈闭环、审计、成本、SLA | 持续改进和可信运行 | AI 分析系统必须运营，不是一次性交付 |

## 4. 能力矩阵：不同产品和资产提供什么

### 4.1 ChatBI、DataClaw Skills、小Q Skills 提供的资产

这里的 “Skill” 本质不是一个 prompt，而是一组可复用的分析能力包，通常包含：

- 能力说明：适合解决什么问题，不适合什么问题。
- 输入契约：需要数据集、图表、文件、指标、时间范围还是自然语言问题。
- 工具链：NL2SQL、OLAP 查询、图表生成、解读、报告、外部系统 API。
- Prompt/模板：意图识别、SQL 生成、解释、报告章节、错误修复。
- 安全边界：可访问哪些数据、可执行哪些 SQL、是否需要审批。
- 输出契约：表格、图表、洞察卡、报告、任务、链接。
- 评测样例：典型问题、标准 SQL、标准答案、失败案例。

| 能力资产 | ChatBI 已上线能力 | DataClaw Skills | Quick BI 小Q Skills | 对企业的价值 |
|---|---|---|---|---|
| 问数 Skill | 提供成熟问数入口和结果展示 | 可基于 ChatBI 封装问数技能 | 小Q问数 Skill，支持自然语言到数据结果 | 降低取数门槛 |
| 解读 Skill | 可对问数结果或图表做解释 | 可把解读 prompt/工具封装成技能 | 小Q解读 Skill，面向文件/仪表板/结果解释 | 从“有数”到“看懂数” |
| 报告 Skill | 若已有报告能力可直接复用 | 可调用报告模板和 ChapterWriter | 小Q报告 Skill，生成分析报告 | 从分析到可交付材料 |
| 报表/看板 Skill | 可对接 BI 看板和图表 | 可封装看板查询/摘要能力 | 小Q报表/搭建相关 Skill | 把传统 BI 资产 AI 化 |
| Agent 路由 | 通常需要外部编排补足 | 适合做统一路由和工具编排 | 官方 Skill 有意图识别 | 降低用户选择成本 |
| 评测资产 | 通常需要补 | 可沉淀企业内部评测集 | 官方产品内置一部分 | 保证持续迭代质量 |

### 4.2 报告模板与知识库提供什么

报告模板不是文档样式，而是分析方法的结构化表达。

| 资产 | 提供什么 | 示例 |
|---|---|---|
| 报告结构模板 | 章节、段落、图表槽位、数据依赖 | 月度经营报告、财务分析报告、销售复盘 |
| 分析方法模板 | 每章应该看哪些指标、如何排序、如何判断好坏 | PVM、目标达成、同比环比、结构贡献 |
| Prompt 模板 | 章节写作口径、语气、约束、禁忌 | “必须引用数据，不得虚构原因” |
| 知识库 | 术语、指标定义、组织结构、业务规则、SOP | “DOS 达成阈值”“事业部口径” |
| 样例库 | 高质量历史报告、好问题、标准答案 | few-shot 和验收基线 |
| 证据链 | 每段文字引用哪个数据、SQL、图表 | 支撑审计和人工复核 |

报告模板和知识库的价值是：把分析师经验变成可复用资产，减少每次报告都从空白开始。

### 4.3 黄金数据集提供什么

黄金数据集是企业问数和智能分析的关键前提。它不是简单宽表，而是 AI-ready 的领域数据产品。

| 组成 | 内容 | 对 AI 分析的作用 |
|---|---|---|
| 主题边界 | 销售、库存、费用、利润、渠道、客户等 | 限定问题空间 |
| 字段语义 | 字段名、业务别名、描述、枚举值、单位 | 帮助 LLM 选字段 |
| 指标口径 | 指标公式、过滤条件、时间粒度、适用范围 | 保证答案一致 |
| 维度体系 | 区域、组织、产品、客户、渠道等层级 | 支撑下钻和归因 |
| 质量画像 | 空值率、唯一性、分布、刷新时间、可信等级 | 提醒系统和用户风险 |
| 样例问题 | 高频问题、标准 SQL、标准图表 | 提高问数准确率 |
| 权限标签 | 敏感字段、行列权限、数据等级 | 控制安全边界 |
| 版本信息 | schema 版本、口径版本、变更记录 | 支撑可追溯 |

如果没有黄金数据集，Data Agent 会退化为“让 LLM 猜表猜字段”。这也是当前 DB-GPT 和小Q成熟形态之间的最大差距之一。

### 4.4 底座平台产品提供什么

如果 DB-GPT 未来作为 Data Agent 底座，应提供以下能力：

| 底座能力 | DB-GPT 应提供什么 | 不应承担什么 |
|---|---|---|
| 数据连接 | 连接多类数据库、文件、BI 系统、指标平台 | 不替代企业数仓建模 |
| 语义上下文 | 数据集、指标、字段、知识库注入 runtime | 不独自定义所有业务口径 |
| LLM/工具编排 | Skill 路由、SQL 生成、执行、解释、报告工作流 | 不把所有能力写成单一 Chat |
| 安全网关 | SQL 只读、限行、超时、审计、权限裁剪 | 不绕过已有企业权限体系 |
| 运行态 | Run、Event、Trace、Artifact、Feedback | 不只保存聊天记录 |
| 资产市场 | Skill、模板、prompt、评测集、连接器 | 不只提供代码插件 |
| 评测运营 | 准确率、成功率、延迟、成本、反馈闭环 | 不把上线视为结束 |

DB-GPT 的定位应是“开放可控的 Data Agent Runtime”，而不是直接和 FineBI 争传统可视化报表能力，也不是简单复制小Q闭源产品。

## 5. 完整能力矩阵

| 能力域 | 大数据部门资产 | DB-GPT/Data Agent 底座 | ChatBI/小Q类工具 | FineBI/传统 BI | 为什么这样分工 |
|---|---|---|---|---|---|
| 数据接入 | 数据源规范、权限账号、数据目录 | 连接器、连接管理、运行时访问 | 消费已接入数据 | 数据连接和抽取 | 接入要统一，但消费入口可多样 |
| 数据建模 | 数仓模型、领域宽表 | 读取模型元数据 | 依赖数据集 | 可做数据集建模 | 核心口径应由数据部门控制 |
| 黄金数据集 | AI-ready 数据集、字段语义、质量画像 | DatasetService、语义注入 | 直接问数消费 | 数据集/自助分析 | 黄金数据集是 AI 问数准确率基础 |
| 指标体系 | 指标目录、口径、版本 | MetricSemanticService | 指标问答/解释 | 指标卡/看板 | 指标是管理语言，不能散落在 prompt |
| 问数 | 样例问题、标准 SQL、评测集 | AskRun、SQL Planner、安全网关 | 用户入口、对话体验 | 部分自然语言能力 | 工具负责体验，底座负责可信运行 |
| 解读 | 解读框架、异常规则 | InterpretationService | 一键解读 | 看板摘要 | 解读需要业务知识和图表上下文 |
| 洞察 | 归因模型、分析算法 | InsightRuntime、AWEL 编排 | 洞察 Skill | 部分预警/分析 | 洞察是从“解释”到“发现问题” |
| 报告 | 模板、知识库、历史样例 | ReportRun、Artifact、模板引擎 | 报告 Skill | 报表导出/门户 | 报告要资产化和审核 |
| 可视化 | 视觉规范、图表规范 | 图表数据协议 | 自动图表 | 强可视化编辑 | FineBI 仍适合复杂报表和看板制作 |
| 安全治理 | 权限规则、审计要求 | SQL/RBAC/Trace/Policy | 调用权限 | 报表权限 | AI 分析必须可审计 |
| 运营评测 | 标注集、反馈机制 | Eval、Run metrics、Prompt 版本 | 产品反馈入口 | 使用统计 | AI 能力需要持续运营 |

## 6. 映射回 DB-GPT：当前满足哪些场景

### 6.1 满足度总览

| 场景 | 当前 DB-GPT 满足度 | 为什么 | 如何满足/缺什么 |
|---|---|---|---|
| D0-F0/F1 个人 Excel 查数探索 | 中 | 已有 ExcelReader、DuckDB、ChatExcel | 缺文件资产、字段质量、多 Sheet、报告素材 |
| D1-F0/F1 宽表/数据库问数 | 中 | ChatWithDbAutoExecute 可生成 SQL 并执行 | 缺 SQL 安全、业务语义、错误修复 |
| D2-F0/F2 数据集问数 | 低 | 当前没有 Dataset 对象和问数配置 | 需建 DatasetService、QuestionConfigService |
| D3-F2/F3 指标解释/归因 | 低 | 没有指标体系和指标树 | 需建 MetricSemanticService、AttributionService |
| D4-F1 Dashboard 图表生成 | 中 | ChatDashboard 能生成图表 SQL 和 ChartData | 缺 dashboard 资产、筛选器、联动、模板管理 |
| D4-F2/F4 Dashboard 解读/洞察 | 低 | 只有图表描述 thoughts，不是解读引擎 | 需建 ChartContextService、InterpretationService |
| D5-F5 报告生成 | 中低 | mvt_demo 已有 fin-report 4 章 MVT | 缺服务化、产物、前端、真实 DB 指标计算 |
| D6 业务知识增强 | 中低 | 有 ChatKnowledge/RAG 基础 | 缺业务术语到 SQL/指标/模板的结构化映射 |
| F6 行动型 Agent | 低 | 有 Agent/Plugin 基础 | 缺权限、审批、外部系统动作、审计 |

### 6.2 能力差距的根因

DB-GPT 当前强在“运行时框架”：

- 能连数据源。
- 能组织 Chat Scene。
- 能调用模型。
- 能把模型输出解析为 SQL/图表。
- 能保存会话历史。

DB-GPT 当前弱在“企业分析资产层”：

- 没有数据集语义层。
- 没有指标体系。
- 没有问数配置/学习。
- 没有报告资产和模板管理。
- 没有洞察和归因引擎。
- 没有 Run/Trace/Artifact 级别的运行态资产。

所以它可以作为底座，但需要补齐企业分析资产层，才能对标小Q式体验。

## 7. DB-GPT 需要建设的 L1/L2 模块

### 7.1 L1 模块总览

| L1 模块 | 目标 | 优先级 |
|---|---|---|
| M1 Data Object Layer | 统一 Excel、DB 表、数据集、指标、Dashboard、Report 的对象模型 | P0 |
| M2 Semantic & Question Config | 建数据集语义层、指标口径、问数配置和知识库映射 | P0/P1 |
| M3 Ask Data Runtime | 可验证问数链路：意图、选数、SQL、执行、解释、反馈 | P0/P1 |
| M4 Insight Runtime | 解读、异常检测、归因、洞察卡 | P1/P2 |
| M5 Report Runtime | 报告任务、模板、章节、产物、审核、导出 | P0/P1 |
| M6 Skill Marketplace | ChatBI/DataClaw/小Q式 Skill 注册、路由、编排 | P1 |
| M7 Governance & Safety | SQL 安全、权限、审计、敏感字段、成本控制 | P0/P1 |
| M8 Evaluation & Operations | 测试集、准确率、成功率、反馈、Prompt/Skill 版本 | P1 |
| M9 Integration Layer | ChatBI、FineBI、指标平台、任务系统、消息系统对接 | P1/P2 |

### 7.2 L2 模块拆解

#### M1 Data Object Layer

| L2 | 说明 | 当前对应 |
|---|---|---|
| FileDataset | Excel/CSV 文件对象、schema、profile、版本 | ChatExcel/ExcelReader |
| PhysicalTable | 数据库表、字段、采样、连接信息 | Connections、DBSummaryClient |
| SemanticDataset | 数据集、JOIN、字段别名、可问范围 | 缺失 |
| MetricCatalog | 指标、维度、口径、时间粒度、指标树 | 缺失 |
| DashboardAsset | 看板、图表、筛选器、联动、SQL、上下文 | ChatDashboard 弱相关 |
| ReportAsset | 报告、章节、图表、文本、版本、审核状态 | mvt_demo 弱相关 |

#### M2 Semantic & Question Config

| L2 | 说明 | 为什么必要 |
|---|---|---|
| FieldProfileService | 字段类型、质量、枚举、分布、刷新时间 | 降低 LLM 误选字段 |
| BusinessGlossary | 业务术语、同义词、字段映射 | 让用户用业务语言提问 |
| QueryTemplateRegistry | 高频问题到 SQL 模板/参数模板 | 常见问题不依赖 LLM 猜 |
| DatasetQuestionConfig | 可问字段、默认时间、推荐问题、反问策略 | 对标小Q数据准备 |
| MetricDefinitionService | 指标公式、过滤条件、适用范围、口径版本 | 保证答案一致 |
| FewShotExampleStore | 高质量 NL-SQL-Answer 样例 | 提高模型稳定性 |

#### M3 Ask Data Runtime

| L2 | 说明 | 当前对应 |
|---|---|---|
| IntentRouter | 判断查数/解读/报告/知识问答 | 缺失 |
| DatasetSelector | 自动或交互式选择数据集 | 缺失 |
| QueryPlanner | 生成查询计划，确认指标/维度/时间 | ChatWithDbAutoExecute 弱相关 |
| SQLGenerator | 基于语义层生成 SQL | 现有 prompt 可改造 |
| SqlSafetyGateway | AST 校验、只读、限行、超时、白名单 | 缺失，P0 必建 |
| QueryExecutor | 执行 SQL 并返回结构化结果 | Connections 可复用 |
| AnswerRenderer | 表格、图表、解释、引用、置信度 | 现有图表协议可复用 |
| ErrorRepairLoop | SQL 错误修复、字段候选、反问澄清 | 缺失 |

#### M4 Insight Runtime

| L2 | 说明 | 为什么必要 |
|---|---|---|
| InterpretationService | 对查询结果/图表做趋势和结论解释 | 对标小Q解读 |
| AnomalyDetector | Z-score/IQR/同比环比异常 | 不能只靠 LLM 感觉 |
| AttributionService | 维度贡献、PVM、结构拆解 | 支撑“为什么变化” |
| RecommendationService | 下一步分析建议、关注风险 | 从解释到洞察 |
| InsightCardStore | 洞察卡沉淀、引用数据和图表 | 可复用进报告 |

#### M5 Report Runtime

| L2 | 说明 | 当前对应 |
|---|---|---|
| ReportRunService | 创建、查询、取消、重试报告任务 | 缺失 |
| TemplateManager | 报告模板、章节、槽位、数据依赖 | dashboard.json 弱相关 |
| ChapterWriterService | 章节生成、润色、引用证据 | mvt_demo 可迁移 |
| ArtifactService | Markdown/JSON/图表/prompt/response trace | 缺失 |
| ReviewWorkflow | 人工编辑、审核、版本 | 缺失 |
| ExportService | Word/PDF/PPT/HTML 导出 | 缺失 |

#### M6 Skill Marketplace

| L2 | 说明 |
|---|---|
| Skill Registry | 注册 ChatBI、DataClaw、小Q式技能 |
| Skill Contract | 输入/输出/权限/工具/模型/错误码 |
| Skill Router | 根据意图和数据对象选择技能 |
| Skill Template | 问数、解读、报告、归因、报表摘要模板 |
| Skill Evaluation | 每个 Skill 的标准问题、成功率、成本、延迟 |

#### M7 Governance & Safety

| L2 | 说明 |
|---|---|
| DataPolicyService | 数据对象访问策略 |
| Column/Row Permission | 行列权限裁剪 |
| SensitiveDataMasking | 敏感字段识别和脱敏 |
| AuditLog | 用户、问题、SQL、结果、导出、审批全链路审计 |
| CostQuota | token、查询、导出、Skill 调用配额 |
| ModelPolicy | 哪些场景可用哪些模型 |

#### M8 Evaluation & Operations

| L2 | 说明 |
|---|---|
| GoldenQuestionSet | 标准问题集、标准 SQL、标准答案 |
| RegressionRunner | 每次 prompt/模型/数据集变更后自动回归 |
| FeedbackLoop | 用户纠错、收藏、采纳、差评 |
| PromptVersioning | prompt 版本、AB 测试、回滚 |
| RuntimeMetrics | 准确率、成功率、延迟、成本、SQL 修复率 |

## 8. 建议的建设顺序

### 8.1 第一阶段：先让场景地图里的 P0 能跑

目标：

- D0 个人 Excel 问数。
- D1 数据库/宽表问数。
- D5 fin-report 报告生成。

必建：

- `SqlSafetyGateway`
- `AskRunService`
- `ReportRunService`
- `ArtifactService`
- `FileDataset` / `PhysicalTable` 最小对象

### 8.2 第二阶段：把问数从“猜表”升级为“问数据集”

目标：

- D2 数据集问数。
- D4 看板解读。

必建：

- `SemanticDataset`
- `DatasetQuestionConfig`
- `BusinessGlossary`
- `FewShotExampleStore`
- `InterpretationService`
- `DashboardAsset`

### 8.3 第三阶段：把解读升级为洞察和报告资产

目标：

- D3 指标解释/归因。
- D4 洞察。
- D5 报告模板化和审核。

必建：

- `MetricCatalog`
- `AttributionService`
- `InsightCardStore`
- `TemplateManager`
- `ReviewWorkflow`
- `ExportService`

### 8.4 第四阶段：平台和生态

目标：

- DB-GPT 成为 Data Agent 底座。
- ChatBI、DataClaw Skills、小Q/FineBI 等能力可接入。

必建：

- `Skill Registry`
- `Skill Router`
- `Skill Evaluation`
- `Integration Layer`
- `Governance & Safety`

## 9. 与现有 DB-GPT 代码的落点

| 建设模块 | 建议落点 | 原因 |
|---|---|---|
| AskRunService | 新增 `pilot/server/analytics` 或独立 `mvt_demo` 外服务层 | 不污染现有 Chat API |
| DatasetService | 新增服务和元数据表 | 当前只有连接配置，没有数据集对象 |
| SqlSafetyGateway | 包装 `pilot/connections` 查询入口 | 所有 LLM SQL 必须统一过网关 |
| ReportRunService | 新增 report API | 报告是长任务，不适合 `/v1/chat/completions` |
| ChapterWriterService | 从 `mvt_demo/engine/chapter_writer.py` 迁移 | 保留已验证 fin-report 逻辑 |
| ArtifactService | 新增产物存储 | 会话历史不足以管理报告和 trace |
| Skill Registry | 新增 capability/skill 层 | 替代硬编码 `ChatFactory` 扩展方式 |
| InterpretationService | 可先挂在 Chat Dashboard/AskRun 后处理 | 从查询结果生成解释和洞察 |

## 10. 外部资料参考

- Quick BI 小Q问数操作：  
  https://www.alibabacloud.com/help/zh/quick-bi/user-guide/user-guide-for-smart-q-a
- Quick BI 数据准备：  
  https://help.aliyun.com/zh/quick-bi/user-guide/prepare-data/
- Quick BI 智能小Q Skill 操作手册：  
  https://www.alibabacloud.com/help/tc/doc-detail/3026669.html
- Quick BI 仪表板小Q解读：  
  https://www.alibabacloud.com/help/zh/quick-bi/user-guide/dashboard-data-interpretation
- Quick BI 小Q问数概述：  
  https://www.alibabacloud.com/help/zh/doc-detail/2673601.html
- FineBI 产品页：  
  https://www.finebi.com/product

## 11. 最终建议

大数据部门应把企业数据分析能力拆成三类交付：

1. 数据资产：黄金数据集、指标体系、业务知识库。
2. 分析能力：问数、解读、洞察、报告的 Skill 和模板。
3. 平台底座：连接、语义注入、LLM/SQL 编排、安全、运行态、评测运营。

DB-GPT 应优先建设第三类“平台底座”，并补最小的数据资产管理能力；ChatBI、小Q、FineBI 等可以作为上层工具或外部能力被接入。这样不是重复造 BI，而是让企业数据资产具备 Agent 化消费能力。

第一批最重要的不是做更多图表，而是：

- 建 `DatasetService` 和 `MetricSemanticService`，让系统知道什么数据可以问。
- 建 `SqlSafetyGateway` 和 `AskRunService`，让问数可信、可追踪、可修复。
- 建 `ReportRunService` 和 `ArtifactService`，让报告成为资产，而不是一次性 LLM 输出。
- 建 `Skill Registry`，让 ChatBI/DataClaw/小Q式能力可以被统一编排和评测。

