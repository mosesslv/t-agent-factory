# DB-GPT 企业级数据分析平台改造评估与建设计划

> 日期：2026-05-20  
> 仓库：`D:\Users\Desktop\项目\代码\AI_DB_GPT`  
> 目标：评估基于当前 DB-GPT v0.4.2 代码，建设企业级数据分析平台核心能力的二开范围、资源投入和用户可体验时间线。  
> 说明：`docs/research/enterprise-buildups.md` 当前为空，本计划按当前代码扫描、`mvt_demo`/fin-report MVT 现状、Quick BI 小Q公开文档和多角色评审结论反推。

## 1. 执行结论

当前 DB-GPT 更接近“数据 + LLM 场景框架”和演示级产品，不是现成的企业级分析平台。它已经具备可复用底座：

- 多场景 Chat 框架：`Chat Excel`、`Chat Data`、`Chat DB`、`Chat Dashboard`。
- 数据源连接和 SQL 执行：MySQL、SQLite、DuckDB、PostgreSQL、ClickHouse、MSSQL、Spark 等。
- LLM 调用和 Prompt 注册机制。
- Excel/CSV 上传后转 DuckDB 问数。
- Dashboard 场景的 SQL 生成、图表数据返回和 SQL/图表编辑 API。
- `mvt_demo` 已复现 fin-report 离线 JSON 到 4 章经营报告的最小链路。
- AWEL 已有 DAG、Operator、HTTP Trigger、Local Runner 基础，可作为后续问数、解读、洞察、报告确定性工作流的候选底座。

但要对标 Quick BI 小Q的“问数、解读、洞察、报告”体系，核心缺口不在权限这类周边功能，而在分析平台核心能力：

- 数据集/语义层：指标、维度、口径、同义词、维值、字段质量、数据集选择规则。
- 问数配置/学习：哪些数据可问、如何问、如何纠错、如何推荐问题。
- 可验证问数链路：意图识别、选数路由、SQL 生成、SQL 安全、执行结果、图表、解释、置信度和过程追踪。
- 数据解读/洞察：趋势、异常、归因、下钻、行动建议。
- 报告资产：报告任务、章节编排、素材引用、版本、人工审核、导出。
- 统一入口/Skill 路由：把 Chat Excel、Chat Data/DB、ChatBI Skill、Dashboard、Report 组织成一个“小Q式”超级入口。

推荐路线是“先体验闭环，后平台化”：先做 Chat Excel、Chat Data/DB、Chat Dashboard、Chat Report 四条主线的可体验版本，再补语义层和治理。不要一开始深改 DB-GPT 核心，也不要把长链路报告硬塞进 `/v1/chat/completions`。

## 2. Quick BI 小Q反推能力模型

Quick BI 小Q公开文档呈现出的产品抽象是：

- 小Q问数：自然语言问数据，支持数据集和上传文件，支持多轮对话、数据集选择、字段预览、历史会话。
- 小Q解读：对上传文件或仪表板数据做自动化解读，输出趋势、异常、变化和分析结论。
- 小Q洞察：围绕看板/报表做摘要、异常检测、原因拆解、下钻和建议。
- 小Q报告：基于自然语言和数据文件/数据集生成专业分析报告。
- 小Q Skill/Agent：把问数、报表、解读、报告等能力包装为可调用技能，并支持自动意图识别。

关键参考点：

- 小Q问数要求先完成数据集问数配置和问数权限，用户在对话界面选择数据集/上传文件后提问，支持多轮对话和历史会话。来源：阿里云 Quick BI《发起问数》  
  https://help.aliyun.com/zh/quick-bi/user-guide/user-guide-for-smart-q-a/
- 数据准备强调数据集问数配置、字段质量、数据集类型、维度字段映射、问数权限和知识库管理。来源：阿里云 Quick BI《数据准备》  
  https://help.aliyun.com/zh/quick-bi/user-guide/prepare-data/
- 小Q全局配置包含模型配置、数据解读开关、自动聚焦数据集、交互式选数据集、反问澄清。来源：阿里云 Quick BI《全局配置》  
  https://help.aliyun.com/zh/quick-bi/user-guide/global-configuration
- 小Q Skill 明确把“小Q问数、小Q报告、小Q解读、小Q报表”封装为技能，问数过程包括推理分析、SQL 生成、OLAP 取数、结果可视化输出。来源：阿里云 Quick BI《智能小Q Skill操作手册》  
  https://help.aliyun.com/zh/quick-bi/user-guide/quick-bi-open-skill-manual
- Quick BI 智能小Q产品页强调智能问数、智能搭建、智能洞察，尤其是“取数过程可验证、展示图表可切换、报表摘要、异常原因拆解”。来源：阿里云 Quick BI 智能小Q  
  https://help.aliyun.com/zh/quick-bi/product-overview/intelligentq

因此，不能把“小Q对标”理解为只做一个 Text2SQL 对话框。成熟形态应是：

```text
数据对象准备 -> 问数配置/学习 -> 问数/解读/洞察/报告 -> 资产沉淀 -> 复用与集成
```

## 3. 当前代码能力地图

### 3.1 Chat 场景框架

证据：

- 场景枚举：`pilot/scene/base.py`
- 场景工厂：`pilot/scene/chat_factory.py`
- Chat 基类：`pilot/scene/base_chat.py`
- Chat API：`pilot/openapi/api_v1/api_v1.py`
- API 装配：`pilot/server/dbgpt_server.py`
- AWEL 基础：`pilot/awel/`

现状：

- `ChatScene` 已包含 `ChatWithDbExecute`、`ChatExcel`、`ChatWithDbQA`、`ChatDashboard` 等。
- `BaseChat` 提供 prompt 拼装、模型调用、流式/非流式响应、历史消息存储。
- `/api/v1/chat/completions` 按 `chat_mode` 获取 Scene 后调用。

判断：

- 可复用为交互式问数和统一入口。
- 不适合直接承载长链路报告任务，因为报告生成需要任务状态、重试、trace、产物管理和人工审核。
- `ChatFactory` 通过硬编码 lazy import 和 `BaseChat.__subclasses__()` 匹配实现，适合快速二开，不适合大型企业平台的插件治理和能力发布。

### 3.2 AWEL 工作流

证据：

- `pilot/awel/operator/base.py`
- `pilot/awel/trigger/http_trigger.py`
- `pilot/awel/runner/local_runner.py`

现状：

- 已有 DAG、Operator、HTTP Trigger、Local Runner 基础。
- `BaseChat` 内部模型调用已使用 AWEL DAG 包装模型算子。

判断：

- 后续可以承载“问数 -> SQL 校验 -> 执行 -> 解释 -> 洞察 -> 报告”的确定性工作流。
- 当前仍偏早期框架，缺工作流元数据、持久化运行态、重试策略、补偿、任务观测、权限、版本发布和运营后台。

### 3.3 Chat Excel

证据：

- `pilot/scene/chat_data/chat_excel/excel_analyze/chat.py`
- `pilot/scene/chat_data/chat_excel/excel_reader.py`
- 文档：`docs/docs/operation_manual/started_tutorial/chat_excel.md`

现状：

- 上传 Excel/CSV 后读取为 Pandas DataFrame，并注册到内存 DuckDB。
- LLM 生成 SQL，通过 DuckDB 执行后以图表/表格形式展示。
- 已有“上传后摘要和推荐问题”的产品雏形。

缺口：

- 文件资产管理、大小限制、脱敏、字段类型修正、多 Sheet、数据质量报告。
- 用户自定义字段含义、业务别名、指标口径。
- 结果加入报告/看板素材池。

### 3.4 Chat Data / Chat DB

证据：

- `pilot/scene/chat_db/auto_execute/chat.py`
- `pilot/scene/chat_db/auto_execute/prompt.py`
- `pilot/scene/chat_db/professional_qa/chat.py`
- `pilot/summary/db_summary_client.py`
- 文档：`docs/docs/operation_manual/started_tutorial/chat_data.md`、`chat_db.md`

现状：

- Chat Data 根据数据库 schema 生成 SQL 并执行。
- Chat DB 更偏 DBA/元数据问答、索引优化、慢查询诊断。
- DB Summary 可把表摘要写入向量库并用于相关表检索。

缺口：

- 只能“对库/表问”，没有 Quick BI 式数据集层。
- 缺指标、维度、口径、主题域、可问范围、字段质量、样例问题。
- 缺多数据集命中后的交互式选数、自动聚焦数据集、反问澄清。
- SQL 安全不足，不能直接作为生产问数链路。

### 3.5 Chat Dashboard

证据：

- `pilot/scene/chat_dashboard/chat.py`
- `pilot/scene/chat_dashboard/data_loader.py`
- `pilot/scene/chat_dashboard/out_parser.py`
- `pilot/scene/chat_dashboard/data_preparation/report_schma.py`
- Editor API：`pilot/openapi/api_v1/editor/api_editor_v1.py`
- 文档：`docs/docs/operation_manual/started_tutorial/chat_dashboard.md`

现状：

- LLM 生成图表 SQL，执行后返回 `ReportData` 和 `ChartData`。
- 支持 preview/edit，SQL 修改后可同步图表。
- 有图表类型约束和基础模板。

缺口：

- Dashboard 现在是“生成图表集合”，不是企业看板资产。
- 缺仪表板结构理解、图表语义、筛选器、联动关系、分析框架。
- 缺小Q解读所需的趋势/异常/归因能力。
- 缺图表和报告章节的 provenance、版本、审批、引用关系。

### 3.6 Chat Report / fin-report MVT

证据：

- `mvt_demo/run_mvt.py`
- `mvt_demo/engine/chapter_writer.py`
- `mvt_demo/adapter/llm_client.py`
- `mvt_demo/wiki/INDEX.md`

现状：

- 已封装 fin-report `*_result.json` 到 4 章经营报告的 MVT 链路。
- 支持 mock/standalone LLM。
- `summary_chapter` 约 10 次 LLM 调用，全链路约 13 次 LLM 调用。
- 输出 Markdown 到 `mvt_demo/output/`。

缺口：

- 仍是脚本，不是服务。
- 缺 report run API、状态、trace、失败恢复、产物 DB、前端查看。
- 只消费已计算好的 `*_result.json`，尚未从真实数据库重建 7 类分析模型。
- README/历史文档里部分输出契约仍不一致，需要统一。

## 4. 模块拆解与二开范围

### 4.1 Chat Excel：个人级临时数据分析

目标用户：

- 业务人员上传 Excel/CSV，直接提问、看图表、拿结论。

当前可复用：

- Excel/CSV 读取、DuckDB 执行、SQL 生成、图表展示。

必须二开：

| 能力 | 为什么需要 | 估算 |
|---|---|---:|
| 上传文件资产化 | 支持历史文件、预览、重命名、删除、复用 | 5-8 人天 |
| 字段学习和数据质量 | 提升问数准确率，避免字段名/类型误判 | 8-12 人天 |
| 多 Sheet/多文件合并 | 企业 Excel 常见场景 | 8-12 人天 |
| 问数工作台体验 | 支持字段预览、快捷问题、图表切换、SQL/过程查看 | 10-15 人天 |
| 结果加入报告素材 | 连接 Chat Report | 5-8 人天 |

阶段建议：

- MVP：单文件 Excel/CSV 上传、摘要、推荐问题、问数出表/图。
- P1：字段语义配置、多 Sheet、结果加入报告。
- P2：文件共享、权限、脱敏和质量评分。

### 4.2 Chat Data / Chat DB：数据源到数据集问数

目标用户：

- 分析师/业务用户连接数仓数据源，选择数据集或主题域，进行自然语言问数。

当前可复用：

- 数据源连接、表/字段读取、DB Summary、Text2SQL、SQL 执行、SQL 编辑。

必须二开：

| 能力 | 为什么需要 | 估算 |
|---|---|---:|
| 数据集对象层 | Quick BI 小Q不是直接对数据源裸表问数，而是基于数据集和问数配置 | 15-25 人天 |
| 语义层：指标/维度/口径 | 通用 Text2SQL 不足以保证业务准确性 | 20-35 人天 |
| 问数配置/学习 | 字段别名、维值匹配、样例问题、推荐问题、数据集类型 | 20-30 人天 |
| 意图识别与选数路由 | 支持自动选数据集、多数据集候选、手动选择 | 15-25 人天 |
| 反问澄清 | 缺时间、指标、维度时提高成功率 | 8-15 人天 |
| SQL 安全网关 | 只读、限行、超时、白名单、AST 校验、审计 | 20-30 人天 |
| 查询解释和错误修复 | 让用户可验证、可修正 | 10-18 人天 |

阶段建议：

- MVP：选择一个 DB，基于 schema 问数，SQL 可预览/编辑，结果出图。
- P1：数据集层、字段学习、样例问题、选数路由、反问澄清。
- P2：指标目录、血缘、行列权限、查询加速和审计。

### 4.3 ChatBI 对接 / Skill：统一小Q式入口

目标用户：

- 用户不关心底层是 Excel、DB、Dashboard 还是 Report，只在超级入口表达意图。

当前可复用：

- `ChatScene`、插件/Agent 基础、Prompt 注册、历史会话。

必须二开：

| 能力 | 为什么需要 | 估算 |
|---|---|---:|
| Skill Registry | 把问数、解读、报告、外部 ChatBI 接口封装为能力 | 10-15 人天 |
| 意图路由 | 自动识别走 Excel 问数、DB 问数、Dashboard 解读或报告生成 | 12-20 人天 |
| 执行计划确认 | 复杂问题需让用户确认数据对象和步骤 | 8-12 人天 |
| ChatBI 产品接口适配 | 若复用已有 ChatBI 产品，需要 API/认证/结果协议适配 | 15-30 人天 |
| 过程流式输出 | 输出推理、SQL、图表、结论，增强可信度 | 10-15 人天 |

阶段建议：

- MVP：手动选择场景，不做自动路由。
- P1：统一超级框 + Skill 路由 + 执行计划确认。
- P2：外部系统集成、嵌入和多 Agent 编排。

### 4.4 Chat Dashboard：看板生成、解读与洞察

目标用户：

- 管理者/分析师围绕看板图表追问、解读异常、生成洞察。

当前可复用：

- Dashboard SQL/chart 生成、图表数据结构、SQL/图表编辑 API。

必须二开：

| 能力 | 为什么需要 | 估算 |
|---|---|---:|
| 仪表板资产模型 | 当前只有会话返回的图表集合，没有 dashboard 资产 | 15-25 人天 |
| 图表上下文抽取 | 小Q解读需要理解图表字段、筛选器、布局、分析意图 | 15-25 人天 |
| 数据解读 Prompt/服务 | 趋势、异常、同比环比、结构变化、行动建议 | 20-30 人天 |
| 洞察/归因算法 | 不能只靠 LLM 文本总结，需要贡献度、下钻和异常检测 | 25-45 人天 |
| 洞察卡片和引用 | 用户需看到来源图表、SQL、数据切片 | 10-18 人天 |

阶段建议：

- MVP：自然语言生成图表 + SQL 可编辑。
- P1：单图表/单看板一键解读。
- P2：异常检测、贡献度归因、多维下钻、订阅推送。

### 4.5 Chat Report：经营分析报告生成

目标用户：

- 财务/经营分析人员一键生成经营分析报告，并基于问数/看板结果补充材料。

当前可复用：

- `mvt_demo` 的 4 章 fin-report 编排、Prompt、mock/standalone LLM。
- Dashboard 的图表数据结构可作为报告素材。

必须二开：

| 能力 | 为什么需要 | 估算 |
|---|---|---:|
| Report Run API | 报告是长任务，不适合 chat completion | 12-18 人天 |
| 任务状态和事件流 | 支持进度、失败、重试、取消、耗时/token | 10-18 人天 |
| 产物管理 | 保存 Markdown/JSON、图表、Prompt/Response trace、版本 | 15-25 人天 |
| 报告编辑器 | 人工调整章节、插入图表/问数结果、导出 | 20-35 人天 |
| 数据输入适配 | 支持 JSON、DB SQL、上传文件三种来源 | 20-35 人天 |
| 真实指标模型重建 | 从 DB 重建 fin-report 7 类模型，而非消费结果 JSON | 60-90 人天 |

阶段建议：

- MVP：JSON 驱动报告服务化，输出 4 章报告。
- P1：报告任务/trace/产物管理 + 前端查看编辑。
- P2：真实数据库指标计算、模板库、审批、导出。

## 5. 推荐技术架构

### 5.1 不建议的方式

不要把所有能力都塞进现有 `BaseChat` / `/v1/chat/completions`。

原因：

- `BaseChat` 是单轮/多轮对话抽象，适合问答，不适合报告长任务。
- 报告生成需要 10+ 次 LLM 调用、多个中间结果、失败恢复、状态查询和产物落库。
- 强行复用会导致 trace、重试、审核、导出和前端进度体验都很难做。
- AWEL 可作为 P1/P2 后的工作流执行层，但 P0 不建议为了“框架正确”先重写为 AWEL；应先把任务服务、状态、产物和安全边界跑通。

### 5.2 推荐新增服务层

```text
Enterprise Analytics App
├── Unified Chat / Skill Router
├── Dataset & Semantic Layer
│   ├── DatasetService
│   ├── MetricSemanticService
│   ├── QuestionConfigService
│   └── Knowledge/GlossaryService
├── Ask Data Runtime
│   ├── IntentRouter
│   ├── DatasetSelector
│   ├── SQLPlanner
│   ├── SqlSafetyGateway
│   ├── QueryExecutor
│   └── AnswerRenderer
├── Insight Runtime
│   ├── ChartContextService
│   ├── InterpretationService
│   ├── AnomalyDetector
│   └── AttributionService
└── Report Runtime
    ├── ReportRunService
    ├── ReportDataService
    ├── ChapterWriterService
    ├── ReportArtifactService
    └── ExportService
```

建议新增 API：

```text
POST /api/v1/datasets
GET  /api/v1/datasets
POST /api/v1/datasets/{id}/question-config
POST /api/v1/ask/runs
GET  /api/v1/ask/runs/{id}
GET  /api/v1/ask/runs/{id}/events
POST /api/v1/insights/runs
POST /api/v1/reports/runs
GET  /api/v1/reports/runs/{id}
GET  /api/v1/reports/runs/{id}/events
GET  /api/v1/reports/runs/{id}/artifacts
POST /api/v1/reports/runs/{id}/approve
```

## 6. 用户可体验时间线

| 时间 | 用户能体验什么 | 对标小Q能力 | 建设重点 |
|---|---|---|---|
| T+1 周 | Excel/CSV 上传问数，返回表格/图表/简短结论 | 小Q问数雏形 | 复用 Chat Excel，补最小体验闭环 |
| T+2 周 | 选择数据库问数，生成 SQL，预览/编辑，图表展示 | 数据集问数弱版 | 复用 Chat Data/DB 和 Editor |
| T+3-4 周 | Dashboard 生成图表，SQL 可编辑，图表集合可查看 | 小Q搭建/报表弱版 | 复用 Chat Dashboard |
| T+4-6 周 | fin-report JSON 生成 4 章经营报告，前端可查看 | 小Q报告雏形 | MVT 服务化、报告任务和产物 |
| T+6-10 周 | 数据集问数配置：字段别名、指标口径、样例问题、选数路由 | 小Q问数 P1 | 数据集语义层和问数配置 |
| T+8-12 周 | 图表/看板一键解读，输出趋势、异常、建议 | 小Q解读 | 图表上下文和解读服务 |
| T+12-16 周 | 问数、解读、报告统一入口，结果可入报告 | 小Q Skill/Agent | Skill 路由和素材联动 |
| T+16-24 周 | 指标目录、归因洞察、报告模板库、生产安全网关 | 小Q企业版核心 | 语义层深化、洞察算法、生产化 |

## 7. 资源投入估算

### 7.1 MVP：4-6 周可演示闭环

范围：

- Chat Excel 问数最小闭环。
- Chat Data/DB 问数最小闭环。
- Chat Dashboard 图表生成和编辑。
- Chat Report JSON 驱动报告服务化。
- 基础前端入口和演示流程。

| 角色 | 人天 | 主要职责 |
|---|---:|---|
| 产品经理 | 5-8 | 场景包、用户路径、验收口径、Quick BI 对标拆解 |
| BI/数据产品专家 | 4-6 | 问数样例、指标口径样例、报告验收标准 |
| 后端研发 | 20-30 | API、Report Run、DB-GPT 场景封装、SQL 执行、trace |
| 前端研发 | 18-25 | 统一入口、问数页、Dashboard/Report 查看页 |
| LLM/Prompt 工程师 | 8-12 | NL2SQL prompt、报告 prompt、错误修复策略 |
| 数据工程师 | 5-8 | 示例数据、schema 摘要、数据准备脚本 |
| 测试/交付 | 4-6 | E2E 演示、回归用例、部署说明 |
| 合计 | 64-95 人天 | 3-5 人小队约 4-6 周 |

### 7.2 P1：10-16 周平台雏形

范围：

- 数据集对象层。
- 问数配置/学习。
- 统一 Skill 路由。
- Dashboard 解读。
- 报告编辑与产物管理。

| 角色 | 人天 | 主要职责 |
|---|---:|---|
| 产品经理 | 10-15 | 数据对象、问数配置、解读/报告流程 |
| BI/数据产品专家 | 12-18 | 指标/维度/口径、样例问题、洞察解释框架 |
| 后端研发 | 45-70 | 数据集/语义层、问数 runtime、Skill、报告产物 |
| 前端研发 | 45-65 | 应用管理、数据对象、问数配置、解读、报告编辑 |
| LLM/Prompt 工程师 | 20-35 | 意图识别、反问澄清、解读、报告链路 |
| 数据工程师 | 20-30 | 数据集配置、样例数仓、质量校验 |
| 算法/数据科学 | 15-25 | 趋势、异常、归因初版 |
| 测试/交付 | 15-25 | 自动化回归、演示环境、验收集 |
| 合计 | 182-283 人天 | 5-7 人小队约 8-12 周 |

### 7.3 P2：16-24 周企业级核心增强

范围：

- 指标目录和口径版本。
- 真实 fin-report 7 类业务模型从数据库重建。
- 归因洞察、多维下钻、订阅推送。
- SQL 沙箱、审计、租户、脱敏。
- 报告模板库、协同审批、导出。

| 角色 | 人天 |
|---|---:|
| 产品经理 | 20-30 |
| BI/数据产品专家 | 25-40 |
| 后端研发 | 90-140 |
| 前端研发 | 70-110 |
| LLM/Prompt 工程师 | 35-55 |
| 数据工程师 | 50-80 |
| 算法/数据科学 | 40-70 |
| 测试/交付/运维 | 35-60 |
| 合计 | 365-585 人天 |

## 8. 模块优先级

| 优先级 | 模块 | 理由 |
|---|---|---|
| P0 | Chat Excel | 最快让非技术用户感知“上传即问” |
| P0 | Chat Data/DB | 复用 DB-GPT 强项，建立结构化数据问数能力 |
| P0 | Chat Report MVT 服务化 | 已有 fin-report MVT，是差异化经营分析能力 |
| P0 | SQL 安全最小网关 | 问数产品必须默认安全，不可裸执行 LLM SQL |
| P1 | 数据集/语义层 | 从 demo 走向企业分析平台的核心分水岭 |
| P1 | 问数配置/学习 | 对标 Quick BI 小Q的关键产品能力 |
| P1 | Dashboard 解读 | 从“出图”升级到“看懂图” |
| P1 | Skill 统一入口 | 把多个场景合成小Q式体验 |
| P2 | 洞察归因 | 进入企业级智能分析核心壁垒 |
| P2 | 真实业务模型重建 | 让报告从 mock/结果文件走向生产数据 |

## 9. 风险与应对

| 风险 | 影响 | 应对 |
|---|---|---|
| DB-GPT v0.4.2 依赖老旧 | 当前 MVT 文档已记录 pydantic v2 兼容问题 | MVP 避免深改核心；锁定环境或隔离新服务 |
| 工程编码/中文链路 | 当前部分源码/文档在 PowerShell 输出有 mojibake，可能影响 prompt、日志、文档和验收 | 统一 UTF-8 检查，关键 prompt/文档做渲染校验 |
| Text2SQL 准确性不足 | 错表、错字段、错口径会直接影响信任 | 建数据集语义层和问数配置，不依赖裸 schema |
| LLM SQL 自动执行安全 | 可能执行 DDL/写操作或大查询 | SQL AST 校验、只读账号、限行、超时、白名单、审计 |
| 报告链路长且失败点多 | 用户体验不稳定，调试困难 | Report Run、事件流、trace、分步重试、产物落库 |
| fin-report 价值在业务模型 | 只接 DB-GPT Text2SQL 无法复现经营分析质量 | 指标/模型服务化，保留业务口径和章节编排 |
| 前后端对象模型不统一 | 问数、解读、报告难互通 | 先定义 Dataset、QuestionRun、InsightRun、ReportRun、Artifact |
| 过早做完整治理 | 拖慢核心体验 | 权限/租户/审计分阶段做，P0 只做安全底线 |

## 10. 推荐落地计划

### Phase 0：方案冻结与验收集，3-5 人天

交付：

- 明确目标演示数据和 8-12 个高频问题。
- 明确 Excel、DB、Dashboard、Report 四条主线的验收。
- 固化对象模型草案。
- 锁定 Python/pydantic/DB-GPT 依赖边界，明确新服务与 DB-GPT 核心的隔离策略。
- 检查关键中文 prompt、日志、文档和 API 输出编码。

### Phase 1：MVP 闭环，4-6 周

交付：

- Chat Excel：上传、字段预览、推荐问题、问数结果。
- Chat Data/DB：选择 DB、生成 SQL、预览/编辑、图表。
- Chat Dashboard：图表集合生成、SQL/图表编辑。
- Chat Report：新增 Report Run API，服务化 `mvt_demo`，前端查看 4 章报告。
- 最小 SQL 安全：只读、限行、超时、DDL/DML 拦截、错误展示。
- AWEL 只做调研验证，不作为 P0 主路径改造目标。

用户体验：

- 业务用户可以上传 Excel 问数。
- 分析师可以连 DB 问趋势、排行、异常。
- 管理者可以看到由 JSON 输入生成的经营报告。

### Phase 2：平台雏形，6-10 周

交付：

- 数据集对象层：表、字段、指标、维度、业务别名。
- 问数配置：字段质量、样例问题、推荐问题、数据集类型、权限占位。
- 统一 Skill 路由：用户输入后自动路由到问数、解读、报告。
- Dashboard 解读：趋势、异常、摘要、引用图表/SQL。
- 报告编辑：章节编辑、插入问数/图表、版本保存。

用户体验：

- 用户不再直接面对裸表，而是面对“可问数据集”。
- 问数过程可解释，可看到 SQL、图表、结论和错误修正。
- 看板可以一键解读，结果可以进入报告。

### Phase 3：企业级核心增强，8-12 周

交付：

- 指标目录和口径版本。
- fin-report 7 类业务模型从真实 DB 计算。
- 异常检测和贡献度归因。
- 报告模板库、审批、导出。
- 审计、脱敏、租户、行列权限、嵌入集成。

用户体验：

- 用户可以基于企业数据集稳定问数、解读、归因和生成报告。
- 管理者可以把看板、问数和报告串成固定经营分析流程。

## 11. 建议的第一批需求切片

1. `ReportRunService`：把 `mvt_demo` 从脚本改为 API 可触发任务。
2. `ReportArtifactService`：保存章节 Markdown、输入摘要、prompt/response trace。
3. `SqlSafetyGateway`：所有 LLM SQL 执行前做只读校验、限行、超时、审计。
4. `DatasetService`：先做最小数据集对象，包装现有 DB 表和 Excel 文件。
5. `QuestionConfigService`：字段别名、样例问题、推荐问题。
6. `AskRunService`：问数任务记录，统一保存 SQL、结果、图表和解释。
7. 前端统一入口：显示 Chat Excel、Chat Data/DB、Dashboard、Report 四个应用卡片和最近运行。

## 12. 最终判断

基于当前代码，改造成企业级数据分析平台是可行的，但不是“配置一下 DB-GPT”即可完成。当前最值得复用的是 DB-GPT 的数据源连接、场景框架、LLM 调用、SQL 执行、图表编辑和 fin-report MVT。真正需要投入的核心是数据集语义层、问数配置、可验证问数 runtime、解读/洞察算法、报告任务和产物管理。

若目标是 4-6 周形成可演示产品，建议投入 3-5 人小队、约 64-95 人天。若目标是 3-4 个月形成平台雏形，需要 5-7 人小队、约 180-280 人天。若目标是企业级核心产品，需要继续投入约 365-585 人天，重点建设语义层、洞察归因、真实业务模型和生产安全能力。
