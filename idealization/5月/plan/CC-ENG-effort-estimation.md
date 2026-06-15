# DB-GPT v0.4.2 企业级数据分析平台 -- 工程工作量估算

**文档编号**: CC-ENG-2026-001
**版本**: v1.0
**日期**: 2026-05-20
**作者**: AI Engineering Lead
**状态**: Draft

---

## 目录

1. [Codebase 技术债务评估](#1-codebase-技术债务评估)
2. [实施任务分解 (WBS)](#2-实施任务分解-wbs)
3. [资源估算与排期](#3-资源估算与排期)
4. [风险登记册](#4-风险登记册)
5. [技术栈决策](#5-技术栈决策)

---

## 1. Codebase 技术债务评估

### 1.1 评估方法说明

以下评估基于对 DB-GPT v0.4.2 核心模块的逐文件深度审查。评分标准：1-3 分为重度债务需重构，4-6 分为中度债务需改良，7-8 分为轻度债务可扩展，9-10 分为生产级质量可直接复用。

---

### 1.2 模块逐一评估

#### 1.2.1 BaseChat (`pilot/scene/base_chat.py`, 672 行)

**代码质量评分: 5/10**

| 维度 | 评估 |
|------|------|
| 架构设计 | 生命周期模型清晰: generate_input_values -> prompt format -> LLM call -> output parse -> do_action -> view render |
| 抽象层级 | ABC 抽象合理，generate_input_values 为子类扩展点 |
| 异步处理 | stream_call/nostream_call 双路径实现完整 |
| 错误处理 | except 块内使用 print + logger.error，未向上层传播结构化异常 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-BC-01 | `__call_base()` 职责过重 | High | 673 行文件中 `__call_base` 同时完成 input 组装、prompt format、message 构建、payload 构建，建议拆分为独立阶段 |
| TD-BC-02 | 重复的 Config class 定义 | Low | 第 39-43 行和第 101-105 行重复定义了 `class Config`（pydantic Extra.forbid + arbitrary_types_allowed） |
| TD-BC-03 | 废弃方法未清理 | Medium | `_blocking_stream_call()` 和 `_blocking_nostream_call()` 标注了 "will be deleted soon" 但仍保留 |
| TD-BC-04 | 全局变量耦合 | High | `CFG = Config()` 全局单例，所有子类直接引用，不利于测试和配置隔离 |
| TD-BC-05 | 错误处理不一致 | Medium | stream_call 中 `ai_response_text` 变量在 except 块使用但为空字符串（第 232 行），对用户展示 raw error |
| TD-BC-06 | `_build_model_operator()` 内联在 base_chat.py | Medium | DAG 构建逻辑（466-548 行）应独立为 factory 模块，当前耦合过紧 |
| TD-BC-07 | message 格式兼容性 hack | Low | 第 171-172 行 `if not CFG.NEW_SERVER_MODE` 的 dict 转换是历史遗留兼容代码 |

**扩展前必须重构:**
- 拆分 `__call_base()` 为 3 个独立方法：`_build_prompt()`, `_build_payload()`, `_build_messages()`
- 提取 `_build_model_operator()` 为独立的 `ModelOperatorFactory`
- 将 `CFG` 全局引用改为构造函数注入

**估算重构工时: 8 person-days**

---

#### 1.2.2 ChatFactory (`pilot/scene/chat_factory.py`, 36 行)

**代码质量评分: 4/10**

| 维度 | 评估 |
|------|------|
| 设计模式 | Singleton + 懒加载导入，模式选择正确 |
| 扩展性 | 使用 `BaseChat.__subclasses__()` 自动发现，但每次调用都遍历所有子类 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-CF-01 | 所有 scene 类硬编码导入 | High | 第 9-21 行将所有实现类 import 写死，新增 scene 必须修改此文件，违反 OCP |
| TD-CF-02 | O(n) 遍历查找 | Medium | 每次 `get_implementation` 都遍历 `__subclasses__()`，应使用 dict 注册 |
| TD-CF-03 | 异常信息不充分 | Low | 仅抛出 Exception，无 error code，不利于前端处理 |

**扩展前必须重构:**
- 改为 registry 模式，各 scene 自注册（使用 decorator 或 metaclass）
- 预构建 `scene_code -> class` 的 dict 映射

**估算重构工时: 3 person-days**

---

#### 1.2.3 ChatDashboard (`pilot/scene/chat_dashboard/chat.py`, 131 行)

**代码质量评分: 5/10**

| 维度 | 评估 |
|------|------|
| 继承实现 | 正确继承 BaseChat，实现 generate_input_values + do_action |
| 数据流 | 向量检索 -> 表信息组装 -> LLM -> SQL 解析 -> 图表数据生成，流程完整 |
| 模板系统 | dashboard.json 模板驱动，但模板格式固定 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-CD-01 | 模板加载路径硬编码 | Medium | `__load_dashboard_template` 使用 `os.path.dirname(__file__)` 拼接，不支持外部模板 |
| TD-CD-02 | do_action 错误静默吞没 | High | 第 123-125 行 `except Exception as e: print(str(e))`，SQL 执行失败被完全忽略，无 fallback |
| TD-CD-03 | 单次生成无迭代修正 | High | LLM 生成的 SQL 如果执行失败，没有重试/修正机制 |
| TD-CD-04 | ReportData schema 过于简单 | Medium | 无章节结构、无布局定义、无样式配置，无法支撑多章节报告 |

**扩展前必须重构:**
- do_action 增加错误收集和 SQL 自修正重试
- ReportData schema 扩展为支持章节树的嵌套结构
- 模板系统改为支持自定义模板注册

**估算重构工时: 6 person-days**

---

#### 1.2.4 ChatDashboard Prompt (`pilot/scene/chat_dashboard/prompt.py`, 116 行)

**代码质量评分: 6/10**

| 维度 | 评估 |
|------|------|
| 模板设计 | 中英双语支持，response_format 结构化输出定义清晰 |
| Prompt 质量 | 指导 LLM 生成 4-8 个分析维度的 SQL，基本满足 dashboard 场景 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-DP-01 | 无 few-shot examples | Medium | prompt 无示例选择器（example_selector=None），LLM 输出格式不稳定 |
| TD-DP-02 | 图表类型硬编码 | Medium | supported_chat_type 来自模板 JSON，但类型固定为 5 种，无法扩展 |
| TD-DP-03 | 无分析深度控制 | Low | 无法指定生成分析的深度级别（概览/详细/深入） |

**扩展前需改良，工时: 3 person-days**

---

#### 1.2.5 ChatDashboard OutputParser (`pilot/scene/chat_dashboard/out_parser.py`, 48 行)

**代码质量评分: 6/10**

| 维度 | 评估 |
|------|------|
| 解析逻辑 | JSON 提取 + ChartItem NamedTuple 组装，简洁有效 |
| 容错能力 | 依赖 BaseOutputParser 的 JSON 提取，具备基本容错 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-OP-01 | NamedTuple 不可扩展 | Medium | ChartItem 为 NamedTuple，新增字段需修改定义，建议改为 Pydantic model |
| TD-OP-02 | 无 SQL 校验 | Medium | 不验证 SQL 语法正确性，将错误 SQL 直接传递给数据库执行 |
| TD-OP-03 | parse_view_response 直接 JSON dump | Low | 无格式化、无模板渲染能力 |

**扩展前需改良，工时: 2 person-days**

---

#### 1.2.6 DashboardDataLoader (`pilot/scene/chat_dashboard/data_loader.py`, 61 行)

**代码质量评分: 4/10**

| 维度 | 评估 |
|------|------|
| 数据转换 | SQL 结果 -> ValueItem 列表，逻辑可用 |
| 数据模型 | 假设第一列为名称、其余为数值，仅支持 2D 数据 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-DL-01 | 数据格式假设过强 | High | 假设 field_names[0] 为 name，其余为 value，不支持多维数据 |
| TD-DL-02 | 无数据聚合能力 | High | 不支持数据聚合、排序、分页等操作 |
| TD-DL-03 | Decimal 类型处理不完整 | Medium | ValueItem.value 为 float，Decimal 精度丢失 |

**扩展前必须重构，工时: 4 person-days**

---

#### 1.2.7 ChatWithDbAutoExecute (`pilot/scene/chat_db/auto_execute/chat.py`, 89 行)

**代码质量评分: 5/10**

| 维度 | 评估 |
|------|------|
| NL-to-SQL 流程 | DBSummaryClient 向量检索 + 表信息注入 -> LLM -> SQL 执行，流程完整 |
| 安全性 | 无 SQL 注入防护，LLM 生成的 SQL 直接执行 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-DB-01 | SQL 直接执行无安全检查 | Critical | do_action 返回 `self.database.run_to_df`，但未对 SQL 做 ANY 校验 |
| TD-DB-02 | do_action 未使用 prompt_response | High | 第 88-89 行 `do_action` 接收 prompt_response 但返回的是 `self.database.run_to_df` 属性引用，非方法调用 |
| TD-DB-03 | 向量检索失败 fallback 逻辑简陋 | Medium | 第 68-71 行 catch 后 fallback 到 `table_simple_info()`，无日志告警 |
| TD-DB-04 | 无 SQL 执行超时控制 | Medium | 大表查询可能无限阻塞 |

**扩展前必须重构:**
- SQL 安全白名单/黑名单检查
- do_action 正确使用 prompt_response
- 增加查询超时和结果行数限制

**估算重构工时: 5 person-days**

---

#### 1.2.8 ExcelReader (`pilot/scene/chat_data/chat_excel/excel_reader.py`, 335 行)

**代码质量评分: 4/10**

| 维度 | 评估 |
|------|------|
| 功能完整性 | xlsx/xls/csv 文件读取 + DuckDB 内存分析，基本可用 |
| SQL 处理 | 中文列名引号处理逻辑存在，但代码混乱 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-ER-01 | 大量死代码 | High | 第 57-260 行 parse_sql / add_quotes / deep_quotes 等函数未被调用，属于废弃代码 |
| TD-ER-02 | 全列强制数值转换 | High | 第 295-298 行 try 将所有列转为 numeric，失败后 fillna(0)，日期列和字符串列被破坏 |
| TD-ER-03 | logger.error 用于正常流程日志 | Medium | 第 267 行编码检测使用 `logger.error` |
| TD-ER-04 | 无大数据文件支持 | Medium | 全量加载到内存 pandas DataFrame，无分块读取 |
| TD-ER-05 | SQL 注入风险 | High | run() 方法直接执行拼接 SQL，无参数化查询 |

**扩展前必须重构:**
- 删除第 57-260 行所有死代码
- 修复列类型推断逻辑（参考 pandas dtype inference）
- 增加 data size limit 和 streaming read
- SQL 参数化或白名单校验

**估算重构工时: 6 person-days**

---

#### 1.2.9 PromptTemplate 系统 (`pilot/prompts/prompt_new.py`, 92 行 + `prompt_template.py` 363 行)

**代码质量评分: 6/10**

| 维度 | 评估 |
|------|------|
| 模板引擎 | 支持 f-string 和 jinja2 双引擎，设计合理 |
| 模型 | Pydantic BaseModel，结构化定义 input_variables/template/response_format |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-PT-01 | 两套 PromptTemplate 共存 | High | `prompt_new.py` 和 `prompt_template.py` 功能重叠，实际使用 prompt_new 版本，旧版为历史遗留 |
| TD-PT-02 | 无 prompt 版本管理 | Medium | 模板硬编码在 Python 文件中，无 A/B 测试能力 |
| TD-PT-03 | response_format 仅用于字符串注入 | Low | response_format 被 JSON 序列化后注入 template 变量 `{response}`，非结构化约束 |

**扩展前需清理，保留 prompt_new.py，工时: 2 person-days**

---

#### 1.2.10 BaseOutputParser (`pilot/out_parser/base.py`, 272 行)

**代码质量评分: 5/10**

| 维度 | 评估 |
|------|------|
| JSON 提取 | 括号匹配 + 非法 JSON 修复，鲁棒性尚可 |
| 流式解析 | 支持 stream/nostream 双模式 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-BP-01 | 模型特定硬编码 | High | 第 57-69 行 `if "vicuna" in CFG.LLM_MODEL` 等判断，模型适配应通过 adapter 模式 |
| TD-BP-02 | 文本处理过于 ad-hoc | Medium | 多处 replace("\_", "_") 和 replace("\*", "*") 为 Markdown 转义修复，应统一处理 |
| TD-BP-03 | parse_model_nostream_resp 脆弱 | High | 第 105-118 行基于 sep 分割 + "assistant:" 字符串查找来定位 AI 回复，极度脆弱 |

**扩展前需重构为 adapter 模式，工时: 4 person-days**

---

#### 1.2.11 Database 连接层 (`pilot/common/sql_database.py` + `pilot/connections/`)

**代码质量评分: 5/10**

| 维度 | 评估 |
|------|------|
| SQLAlchemy 封装 | 标准 SQLAlchemy session + inspector 模式 |
| 多库支持 | 通过 LOCAL_DB_MANAGE 管理多数据库连接 |

**技术债务清单:**

| ID | 债务项 | 严重程度 | 说明 |
|----|--------|----------|------|
| TD-SQL-01 | Database 构造函数类型错误 | High | 第 55-64 行多个 `set()` 赋值，如 `self._sample_rows_in_table_info = set()` 应为 int |
| TD-SQL-02 | BaseConnect 接口不完整 | Medium | 所有方法均为 pass，无类型提示和文档 |
| TD-SQL-03 | 无连接池监控 | Low | scoped_session 使用但无连接泄漏检测 |

**扩展前修复类型错误，工时: 2 person-days**

---

### 1.3 技术债务汇总

| 模块 | 评分 | 债务数(Critical/High) | 重构工时(person-days) |
|------|------|----------------------|----------------------|
| BaseChat | 5/10 | 0/2 | 8 |
| ChatFactory | 4/10 | 0/1 | 3 |
| ChatDashboard (chat) | 5/10 | 0/2 | 6 |
| ChatDashboard (prompt) | 6/10 | 0/0 | 3 |
| ChatDashboard (parser) | 6/10 | 0/0 | 2 |
| DashboardDataLoader | 4/10 | 0/2 | 4 |
| ChatWithDbAutoExecute | 5/10 | 1/1 | 5 |
| ExcelReader | 4/10 | 0/2 | 6 |
| PromptTemplate | 6/10 | 0/1 | 2 |
| BaseOutputParser | 5/10 | 0/2 | 4 |
| Database 层 | 5/10 | 0/1 | 2 |
| **合计** | **5.0/10** | **1/14** | **45 person-days** |

---

## 2. 实施任务分解 (WBS)

### 2.0 Phase 0: 技术债务清理 (Prerequisite)

> 以下任务必须在功能开发前完成，为后续扩展奠定基础。

| Task ID | 任务名称 | 描述 | 工时(人天) | 复杂度 | 依赖 | 所属模块 |
|---------|---------|------|-----------|--------|------|---------|
| P0-01 | BaseChat 生命周期重构 | 拆分 `__call_base()` 为独立阶段方法；提取 ModelOperatorFactory；CFG 注入改造 | 8 | L | 无 | pilot/scene |
| P0-02 | ChatFactory Registry 改造 | 改为 decorator 自注册模式；预构建 scene_code dict 映射 | 3 | M | 无 | pilot/scene |
| P0-03 | ChatDashboard do_action 健壮性 | SQL 执行错误收集；SQL 自修正重试（LLM re-generate）；ReportData schema 扩展 | 6 | L | P0-01 | pilot/scene/chat_dashboard |
| P0-04 | DashboardDataLoader 重构 | 多维数据支持；数据聚合/排序/分页；类型安全 | 4 | M | P0-03 | pilot/scene/chat_dashboard |
| P0-05 | ChatWithDbAutoExecute 安全加固 | SQL 安全检查机制；do_action 修复；查询超时控制 | 5 | L | P0-01 | pilot/scene/chat_db |
| P0-06 | ExcelReader 清理重构 | 删除死代码；修复列类型推断；大数据文件支持 | 6 | M | 无 | pilot/scene/chat_data |
| P0-07 | OutputParser Adapter 化 | 移除模型硬编码；统一文本清洗；增强 nostream 解析鲁棒性 | 4 | M | P0-01 | pilot/out_parser |
| P0-08 | PromptTemplate 统一 | 清理旧版 prompt_template.py；保留 prompt_new.py | 2 | S | 无 | pilot/prompts |
| P0-09 | Database 层修复 | 构造函数类型修复；BaseConnect 接口补全；连接池监控 | 2 | S | 无 | pilot/common |
| P0-10 | 前端 TypeScript 类型定义 | 为所有 API response 生成 TypeScript type definitions | 3 | M | P0-03, P0-04 | frontend |

**Phase 0 合计: 43 person-days (8.6 person-weeks)**

---

### 2.1 Module A: ChatExcel Enhancement (个人级升级)

> 目标: 将 ChatExcel 从 "上传文件+自然语言查询" 升级为 "个人数据分析助手"，支持智能数据解读和自动洞察。

| Task ID | 任务名称 | 描述 | 工时(人天) | 复杂度 | 依赖 | 所属模块 |
|---------|---------|------|-----------|--------|------|---------|
| **A-Backend** | | | | | | |
| A-BE-01 | Excel 数据画像系统 | 扩展 ExcelReader，增加数据画像生成：字段类型自动推断、统计摘要（均值/中位数/分位数/方差）、数据分布直方图、缺失值分析、唯一值分析 | 8 | L | P0-06 | pilot/scene/chat_data |
| A-BE-02 | 智能字段语义理解 | 增强 ExcelLearning prompt，支持字段语义标注：枚举值识别、日期格式推断、度量 vs 维度自动分类、关联字段识别 | 6 | L | A-BE-01 | pilot/scene/chat_data |
| A-BE-03 | 数据质量评估引擎 | 新建 DataQualityEngine 类：完整性评分（缺失率）、一致性评分（异常值检测）、时效性评分（日期字段 freshness）、唯一性评分（重复率）、综合质量分 | 10 | XL | A-BE-01 | pilot/scene/chat_data |
| A-BE-04 | 自动洞察生成 | 新建 InsightGenerator：基于统计检验的自动洞察（同比/环比异常、趋势变化点、top-N 排序、相关性发现）；洞察优先级排序 | 12 | XL | A-BE-01, A-BE-02 | pilot/scene/chat_data |
| A-BE-05 | 异常检测模块 | 新建 AnomalyDetector：基于 z-score / IQR 的数值异常检测；时序数据突变点检测（PELT 算法）；异常严重等级标记 | 10 | XL | A-BE-01 | pilot/scene/chat_data |
| A-BE-06 | 趋势分析与预测 | 新建 TrendAnalyzer：线性回归趋势提取；季节性分解（STL）；简单 ARIMA 预测（statsmodels）；趋势描述文本生成 | 8 | L | A-BE-01 | pilot/scene/chat_data |
| A-BE-07 | 根因分析 Pipeline | 新建 RootCauseAnalyzer：基于维度下钻的根因定位（逐层分解）；贡献度计算（每个维度值对总变化的贡献百分比）；根因链路可视化数据输出 | 12 | XL | A-BE-04, A-BE-05 | pilot/scene/chat_data |
| A-BE-08 | 数据解读 Prompt 工程 | 新建 ChatExcelInterpret scene：设计解读专用 prompt template（结构化分析框架：现状-异常-原因-建议）；多轮对话上下文管理 | 6 | L | A-BE-04 | pilot/scene/chat_data |
| A-BE-09 | 多格式文件支持 | 扩展 ExcelReader：支持 .json / .parquet / .tsv 文件；大文件分块读取（chunked read）；编码自动检测增强 | 5 | M | P0-06 | pilot/scene/chat_data |
| **A-Frontend** | | | | | | |
| A-FE-01 | 数据质量仪表盘组件 | React 组件：DataQualityScorecard（环形进度条 + 分维度评分）；DataProfilingPanel（字段卡片列表，展示统计信息）；DataPreviewTable（增强型数据预览，高亮异常值） | 8 | L | A-BE-03 | frontend |
| A-FE-02 | 智能洞察卡片组件 | React 组件：InsightCard（洞察摘要 + 严重度标签 + 展开详情）；InsightTimeline（时间线排列的洞察列表）；InsightChart（内嵌迷你图） | 6 | M | A-BE-04 | frontend |
| A-FE-03 | 异常标注图表 | React 组件：AnomalyChart（在现有图表上标注异常点 + tooltip 显示异常描述）；AnomalyTable（异常数据表格，按严重度排序） | 6 | M | A-BE-05 | frontend |
| A-FE-04 | 趋势分析面板 | React 组件：TrendPanel（趋势线 + 预测区间 + 关键拐点标注）；TrendSummary（自然语言趋势描述卡片） | 5 | M | A-BE-06 | frontend |
| A-FE-05 | 根因分析下钻面板 | React 组件：RootCauseTree（维度下钻树形结构）；ContributionBar（贡献度条形图）；DrillDownBreadcrumb（下钻路径面包屑） | 8 | L | A-BE-07 | frontend |
| A-FE-06 | 文件上传增强 | 支持拖拽上传、多文件选择、上传进度条、文件类型图标、数据预览（上传后立即展示前 5 行） | 4 | M | A-BE-09 | frontend |

**Module A 合计: 114 person-days (22.8 person-weeks)**
- Backend: 67 person-days
- Frontend: 37 person-days
- Data/ML (含在 Backend 中): 约 30 person-days

---

### 2.2 Module B: ChatDB/ChatData 问数配置 (Data Preparation)

> 目标: 构建数据准备层，支持字段质量评估、学习加速、知识库管理、数据集类型分类。

| Task ID | 任务名称 | 描述 | 工时(人天) | 复杂度 | 依赖 | 所属模块 |
|---------|---------|------|-----------|--------|------|---------|
| **B-Backend** | | | | | | |
| B-BE-01 | 字段元数据管理服务 | 新建 FieldMetadataService：字段类型分类（维度/度量/时间/标识符）；字段语义标注（枚举值、范围、格式）；字段关系映射（外键、层级关系） | 8 | L | P0-05 | pilot/scene/chat_db |
| B-BE-02 | 字段质量评估系统 | 新建 FieldQualityAssessor：完整率、唯一率、格式合规率、值域覆盖率、枚举值匹配率；综合字段质量评分；质量评估报告生成 | 10 | XL | B-BE-01 | pilot/scene/chat_db |
| B-BE-03 | 学习加速模块 | 新建 LearningAccelerator：历史查询模式学习（记录 NL query -> SQL mapping）；高频查询自动缓存；Few-shot example 自动构建（从历史对话中提取优质 QA 对）；Schema 版本管理 | 12 | XL | B-BE-01 | pilot/scene/chat_db |
| B-BE-04 | 业务知识库系统 | 新建 BusinessKnowledgeBase：业务术语 -> 数据库字段映射（如 "GMV" -> "SUM(order_amount)"）；业务规则正则匹配（如 "同比" -> YoY 计算逻辑）；行业领域知识注入（预置电商/金融/SaaS 模板）；知识条目 CRUD API | 15 | XL | B-BE-01 | pilot/scene/chat_db |
| B-BE-05 | 数据集类型分类引擎 | 新建 DatasetClassifier：单表类型识别（事实表/维度表/快照表）；多表关系推断（外键 + 命名模式匹配）；聚合表自动识别（包含 SUM/COUNT 等聚合指标）；时序表识别（含时间戳 + 有序数据） | 10 | L | B-BE-01 | pilot/scene/chat_db |
| B-BE-06 | 数据集配置 API | RESTful API 层：数据集注册/更新/删除；配置导入导出（JSON/YAML）；配置校验（字段映射合法性、SQL 语法检查）；配置版本管理 | 6 | M | B-BE-04, B-BE-05 | pilot/server |
| B-BE-07 | NL-to-SQL Prompt 增强 | 增强 ChatWithDbAutoExecute prompt：注入字段质量信息（低质量字段加 warning）；注入业务术语映射；注入数据集类型信息；支持 few-shot example 动态选择 | 5 | L | B-BE-03, B-BE-04 | pilot/scene/chat_db |
| **B-Frontend** | | | | | | |
| B-FE-01 | 数据配置向导（Wizard） | React 多步骤向导组件：Step1 数据源选择；Step2 字段质量预览 + 字段类型标注；Step3 业务术语映射配置；Step4 数据集类型选择；Step5 配置确认 + 测试查询 | 12 | XL | B-BE-06 | frontend |
| B-FE-02 | 字段质量可视化面板 | React 组件：QualityRadarChart（雷达图展示各质量维度）；FieldQualityGrid（字段级质量热力图）；QualityTimeline（质量变化趋势） | 6 | M | B-BE-02 | frontend |
| B-FE-03 | 业务知识库管理界面 | React CRUD 界面：术语词条列表（支持搜索/过滤/分页）；词条编辑表单（术语名/映射SQL/描述/正则规则）；批量导入导出；词条测试（输入 NL，验证映射结果） | 8 | L | B-BE-04 | frontend |
| B-FE-04 | 数据集类型管理界面 | React 界面：数据集列表（类型标签/状态/最后更新时间）；数据集详情（关联表/字段映射/示例查询）；数据集配置对比视图 | 5 | M | B-BE-05 | frontend |
| B-FE-05 | 学习进度仪表盘 | React 组件：LearningProgressChart（学习曲线/查询准确率趋势）；TopQueriesList（高频查询排名）；ExampleQualityScore（few-shot 示例质量评分） | 5 | M | B-BE-03 | frontend |

**Module B 合计: 102 person-days (20.4 person-weeks)**
- Backend: 56 person-days
- Frontend: 36 person-days
- Data/ML (含在 Backend 中): 约 25 person-days

---

### 2.3 Module C: ChatDB/ChatData 数据解读 (Interpretation Engine)

> 目标: 构建智能数据解读引擎，支持自动化数据解读、异常检测、趋势分析和根因分析。

| Task ID | 任务名称 | 描述 | 工时(人天) | 复杂度 | 依赖 | 所属模块 |
|---------|---------|------|-----------|--------|------|---------|
| **C-Backend** | | | | | | |
| C-BE-01 | 解读 Pipeline 框架 | 新建 InterpretationPipeline（继承 BaseChat 生命周期）：query 分析 -> 数据获取 -> 统计计算 -> 模式识别 -> 解读生成 -> 结果格式化；支持多 stage 串联 | 10 | XL | P0-01 | pilot/scene/chat_interpret |
| C-BE-02 | 统计计算引擎 | 新建 StatisticsEngine：描述性统计（均值/中位数/分位数/标准差）；对比统计（同比/环比/排名变化）；显著性检验（t-test / chi-square）；效果量计算 | 8 | L | C-BE-01 | pilot/scene/chat_interpret |
| C-BE-03 | 解读 Prompt 系统 | 设计解读专用 prompt 模板家族：数据概况解读模板、异常解读模板（现象-原因-影响）、趋势解读模板（趋势-拐点-预测）、对比解读模板（差异-显著性-原因）；支持 Jinja2 条件组合 | 8 | L | C-BE-01 | pilot/scene/chat_interpret |
| C-BE-04 | DB 级异常检测 | 新建 DBAnomalyDetector：SQL 层面异常检测（查询结果中标记异常值）；多维度交叉异常检测（时间和空间维度交叉）；阈值规则引擎（可配置阈值） | 10 | XL | C-BE-02 | pilot/scene/chat_interpret |
| C-BE-05 | DB 级趋势分析 | 新建 DBTrendAnalyzer：时间序列趋势提取（SQL window functions）；移动平均 / 指数平滑；趋势分类（上升/下降/平稳/波动）；趋势转折点识别 | 8 | L | C-BE-02 | pilot/scene/chat_interpret |
| C-BE-06 | DB 级根因分析 | 新建 DBRootCauseAnalyzer：维度下钻 SQL 自动生成（GROUP BY 逐层细化）；贡献度计算 SQL（占比 / delta / delta_pct）；归因排序（Top-K 贡献因素）；下钻路径推荐 | 12 | XL | C-BE-04, C-BE-05 | pilot/scene/chat_interpret |
| C-BE-07 | 解读结果缓存与复用 | 新建 InterpretationCache：相同查询解读结果缓存；解读结果 diff（当数据更新时标记变化部分）；解读版本管理 | 5 | M | C-BE-01 | pilot/scene/chat_interpret |
| C-BE-08 | 解读 API 层 | RESTful API：触发解读（同步/异步）、获取解读结果、解读历史查询、解读结果导出（JSON/PDF） | 4 | M | C-BE-01, C-BE-07 | pilot/server |
| **C-Frontend** | | | | | | |
| C-FE-01 | 解读结果渲染框架 | React 组件框架：InterpretationContainer（解读结果容器）；InterpretationSection（解读段落卡片）；InterpretationSummary（摘要面板）；支持 markdown 渲染 + 内嵌图表 | 8 | L | C-BE-08 | frontend |
| C-FE-02 | 异常解读可视化 | React 组件：AnomalyInterpretationCard（异常描述 + 严重度 + 关联指标变化）；AnomalyContributionChart（异常因素贡献度瀑布图）；AnomalyDrillDown（异常下钻交互面板） | 8 | L | C-BE-04 | frontend |
| C-FE-03 | 趋势解读可视化 | React 组件：TrendInterpretationPanel（趋势线 + 关键节点标注 + 自然语言描述）；TrendForecastChart（历史趋势 + 预测区间）；TrendComparisonChart（多指标趋势对比） | 6 | M | C-BE-05 | frontend |
| C-FE-04 | 根因分析可视化 | React 组件：RootCauseTreeMap（根因贡献度树图）；DrillDownSankey（下钻路径桑基图）；DimensionBreakdownTable（维度分解数据表） | 8 | L | C-BE-06 | frontend |
| C-FE-05 | 解读交互面板 | React 组件：InterpretationToolbar（解读触发/刷新/导出）；InterpretationChatPanel（追问式解读对话）；InterpretationComparePanel（两个时段解读对比） | 6 | M | C-BE-08 | frontend |

**Module C 合计: 101 person-days (20.2 person-weeks)**
- Backend: 57 person-days
- Frontend: 36 person-days
- Data/ML (含在 Backend 中): 约 32 person-days

---

### 2.4 Module D: ChatBI Integration

> 目标: 设计与现有 ChatBI 产品的集成接口，实现数据格式桥接和双向通信。

| Task ID | 任务名称 | 描述 | 工时(人天) | 复杂度 | 依赖 | 所属模块 |
|---------|---------|------|-----------|--------|------|---------|
| **D-Backend** | | | | | | |
| D-BE-01 | ChatBI Adapter 接口设计 | 定义 ChatBIIntegrationAdapter 抽象接口：数据源连接桥接、查询翻译层、结果格式转换 | 5 | M | 无 | pilot/integration |
| D-BE-02 | 数据格式桥接层 | 新建 DataFormatBridge：ChatBI 数据模型 -> DB-GPT ChartData/ReportData 转换；DB-GPT 查询参数 -> ChatBI API 参数转换；自定义字段映射配置 | 8 | L | D-BE-01 | pilot/integration |
| D-BE-03 | ChatBI API Client | 新建 ChatBIClient：认证鉴权（OAuth2 / API Key）；数据源列表获取；查询执行与结果获取；异步查询支持 | 6 | L | D-BE-01 | pilot/integration |
| D-BE-04 | 集成测试与 Mock | ChatBI API mock server；集成测试套件（连接/查询/转换）；性能基准测试 | 5 | M | D-BE-02, D-BE-03 | tests |
| **D-Frontend** | | | | | | |
| D-FE-01 | ChatBI 数据源选择器 | React 组件：ChatBI 连接配置面板；数据源浏览器（树形结构展示 ChatBI 数据源/表/字段）；连接状态指示器 | 5 | M | D-BE-03 | frontend |
| D-FE-02 | 跨平台图表桥接 | React 组件：BridgeChart（适配 ChatBI 图表渲染引擎）；BridgeTable（适配 ChatBI 表格组件）；样式一致性保证 | 5 | M | D-BE-02 | frontend |

**Module D 合计: 34 person-days (6.8 person-weeks)**
- Backend: 19 person-days
- Frontend: 10 person-days
- Integration: 5 person-days

---

### 2.5 Module E: ChatDashboard -> 报告编排 (Report Orchestration)

> 目标: 将 ChatDashboard 从单次图表生成升级为完整的多章节报告编排系统。

| Task ID | 任务名称 | 描述 | 工时(人天) | 复杂度 | 依赖 | 所属模块 |
|---------|---------|------|-----------|--------|------|---------|
| **E-Backend** | | | | | | |
| E-BE-01 | 报告 Schema 重设计 | 新建 ReportSchema v2：Report（报告元信息 + 章节列表）；Chapter（标题 + 数据源 + 分析配置 + 内容区块列表）；ContentBlock（文本/图表/表格/洞察卡片）；LayoutConfig（网格布局定义）| 8 | L | P0-03, P0-04 | pilot/scene/chat_report |
| E-BE-02 | 报告编排引擎 | 新建 ReportOrchestrator：报告模板解析 -> 章节并行生成 -> 内容组装 -> 全局一致性检查；支持 DAG 依赖编排（AWEL 集成） | 15 | XL | E-BE-01 | pilot/scene/chat_report |
| E-BE-03 | 章节生成器 | 新建 ChapterGenerator：每个 chapter 独立的 LLM 调用上下文；章节间数据传递机制（前序章节的分析结果可作为后序章节的输入）；章节生成 prompt template（按章节类型区分：概述型/分析型/结论型） | 12 | XL | E-BE-02 | pilot/scene/chat_report |
| E-BE-04 | 数据驱动叙事生成 | 新建 NarrativeGenerator：数据 -> 叙事模板匹配 -> 叙事文本生成；叙事风格控制（正式/简洁/详细）；多语言叙事支持；叙事与图表联动（引用图表中的数据点） | 10 | XL | E-BE-03 | pilot/scene/chat_report |
| E-BE-05 | 报告模板系统 | 新建 ReportTemplateManager：模板注册与发现；模板变量解析（数据源/时间范围/筛选条件）；模板继承与组合（基础模板 + 行业扩展模板）；模板版本管理 | 8 | L | E-BE-01 | pilot/scene/chat_report |
| E-BE-06 | 报告存储与版本管理 | 新建 ReportStorage：报告持久化（数据库存储）；报告版本 diff；报告快照（每次生成的结果归档）；报告分享链接生成（带过期时间和权限控制） | 6 | M | E-BE-01 | pilot/scene/chat_report |
| E-BE-07 | 报告导出服务 | 新建 ReportExporter：PDF 导出（WeasyPrint / Playwright）；Word 导出（python-docx）；HTML 导出（带完整样式）；导出任务队列（大报告异步导出） | 10 | L | E-BE-02 | pilot/scene/chat_report |
| E-BE-08 | 报告定时生成 | 新建 ReportScheduler：Cron 表达式配置；数据更新触发；报告变更检测（数据变化超过阈值才重新生成）；生成失败告警与重试 | 6 | M | E-BE-06 | pilot/scene/chat_report |
| E-BE-09 | 报告 API 层 | RESTful API：报告 CRUD、报告生成（同步/异步）、报告预览、报告导出、报告分享、模板管理 | 5 | M | E-BE-02, E-BE-06 | pilot/server |
| **E-Frontend** | | | | | | |
| E-FE-01 | 报告编辑器框架 | React 组件：ReportEditor（拖拽式报告编排界面）；ChapterPanel（章节列表面板，支持排序/折叠）；ContentBlockEditor（内容区块编辑器，支持富文本/图表/表格混合编排） | 15 | XL | E-BE-09 | frontend |
| E-FE-02 | 报告预览与阅读器 | React 组件：ReportViewer（报告阅读模式，支持目录导航 + 锚点跳转）；ReportPrintView（打印优化布局）；ReportResponsiveView（移动端适配） | 8 | L | E-BE-09 | frontend |
| E-FE-03 | 报告模板选择器 | React 组件：TemplateGallery（模板画廊，卡片式展示 + 预览）；TemplateConfigurator（模板配置面板，填写变量值）；TemplatePreview（实时预览） | 6 | M | E-BE-05 | frontend |
| E-FE-04 | 叙事文本渲染器 | React 组件：NarrativeRenderer（Markdown + 数据引用渲染）；NarrativeEditor（可编辑叙事文本 + 数据联动）；NarrativeStyleSelector（叙事风格选择器） | 5 | M | E-BE-04 | frontend |
| E-FE-05 | 报告导出与分享 | React 组件：ExportDialog（导出格式选择 + 进度条）；ShareDialog（分享链接生成 + 权限设置 + 二维码）；ReportHistoryList（报告版本历史列表） | 5 | M | E-BE-07 | frontend |
| E-FE-06 | 报告定时配置面板 | React 组件：ScheduleConfigurator（Cron 表达式可视化编辑器）；ScheduleMonitor（定时任务状态监控 + 执行历史） | 4 | M | E-BE-08 | frontend |

**Module E 合计: 123 person-days (24.6 person-weeks)**
- Backend: 70 person-days
- Frontend: 43 person-days
- Data/ML (含在 Backend 中): 约 22 person-days

---

### 2.6 WBS 总汇总

| Module | Backend (pd) | Frontend (pd) | Total (pd) | Total (pw) |
|--------|-------------|---------------|-----------|-----------|
| Phase 0: 技术债务清理 | 40 | 3 | 43 | 8.6 |
| Module A: ChatExcel Enhancement | 67 | 37 | 114 | 22.8 |
| Module B: 问数配置 | 56 | 36 | 102 | 20.4 |
| Module C: 数据解读 | 57 | 36 | 101 | 20.2 |
| Module D: ChatBI Integration | 19 | 10 | 34 | 6.8 |
| Module E: 报告编排 | 70 | 43 | 123 | 24.6 |
| **Total** | **309** | **165** | **517** | **103.4** |

---

## 3. 资源估算与排期

### 3.1 团队组成

| 角色 | Headcount | 职责范围 |
|------|-----------|---------|
| Backend Engineer (Senior) | 3 | BaseChat 重构、解读 Pipeline、报告编排引擎、ChatBI 集成 |
| Backend Engineer (Mid) | 2 | CRUD API、数据加载器、存储层、导出服务 |
| Frontend Engineer (Senior) | 2 | 报告编辑器、数据解读可视化、配置向导 |
| Frontend Engineer (Mid) | 1 | 通用组件、管理界面、导出/分享 |
| Data/ML Engineer | 2 | 统计计算引擎、异常检测、趋势分析、Prompt 工程 |
| DevOps / SRE | 1 | CI/CD、监控、部署自动化 |
| QA Engineer | 1 | 测试策略、自动化测试、性能测试 |
| Product Manager (Part-time) | 0.5 | 需求细化、优先级调整、验收 |
| Tech Lead / Architect | 1 | 架构决策、代码审查、技术风险管理 |
| **Total** | **13.5 FTE** | |

### 3.2 分阶段排期

#### Phase 0: 技术债务清理 (Sprint 1-2, Week 1-4)

```
Week 1-2:
  [BE-Senior-1] P0-01 BaseChat 重构 (8d)
  [BE-Senior-2] P0-05 ChatDB 安全加固 (5d) + P0-07 OutputParser (4d)
  [BE-Senior-3] P0-03 ChatDashboard do_action (6d) + P0-04 DataLoader (4d)
  [BE-Mid-1]   P0-06 ExcelReader 重构 (6d)
  [BE-Mid-2]   P0-02 ChatFactory (3d) + P0-08 PromptTemplate (2d) + P0-09 Database (2d)

Week 3-4:
  [FE-Senior-1] P0-10 TypeScript 类型定义 (3d) + A-FE-01 开始
  [BE-Senior-1] Code review + integration testing
  [DevOps] CI/CD pipeline 搭建
  [QA] 测试策略制定 + Phase 0 回归测试
```

#### Phase 1: ChatExcel Enhancement + 问数配置基础 (Sprint 3-6, Week 5-12)

```
Week 5-8 (Sprint 3-4):
  [BE-Senior-1] A-BE-04 自动洞察生成 (12d)
  [BE-Senior-2] B-BE-04 业务知识库系统 (15d)
  [BE-Senior-3] A-BE-07 根因分析 Pipeline (12d)
  [BE-Mid-1]   A-BE-01 数据画像 (8d) + A-BE-02 字段语义 (6d)
  [BE-Mid-2]   B-BE-01 字段元数据 (8d) + B-BE-02 质量评估 (10d)
  [ML-1]       A-BE-05 异常检测 (10d)
  [ML-2]       A-BE-06 趋势分析 (8d) + A-BE-08 Prompt 工程 (6d)
  [FE-Senior-1] A-FE-01 数据质量仪表盘 (8d)
  [FE-Senior-2] B-FE-01 配置向导 (12d)
  [FE-Mid-1]   A-FE-02 洞察卡片 (6d) + A-FE-03 异常标注 (6d)

Week 9-12 (Sprint 5-6):
  [BE-Senior-1] C-BE-01 解读 Pipeline 框架 (10d)
  [BE-Senior-2] B-BE-03 学习加速 (12d)
  [BE-Senior-3] B-BE-05 数据集分类 (10d)
  [BE-Mid-1]   A-BE-09 多格式支持 (5d) + B-BE-06 配置 API (6d)
  [ML-1]       C-BE-04 DB 级异常检测 (10d)
  [ML-2]       C-BE-05 DB 级趋势分析 (8d) + C-BE-02 统计引擎 (8d)
  [FE-Senior-1] A-FE-04 趋势面板 (5d) + A-FE-05 根因面板 (8d)
  [FE-Senior-2] B-FE-02 质量可视化 (6d) + B-FE-03 知识库管理 (8d)
  [FE-Mid-1]   A-FE-06 文件上传增强 (4d) + B-FE-04 数据集管理 (5d)
```

#### Phase 2: 数据解读 + ChatBI 集成 (Sprint 7-10, Week 13-20)

```
Week 13-16 (Sprint 7-8):
  [BE-Senior-1] C-BE-06 DB 级根因分析 (12d)
  [BE-Senior-2] C-BE-03 解读 Prompt 系统 (8d) + C-BE-07 缓存复用 (5d)
  [BE-Senior-3] D-BE-01 Adapter 接口 (5d) + D-BE-03 ChatBI Client (6d) + D-BE-02 桥接层 (8d)
  [BE-Mid-1]   B-BE-07 Prompt 增强 (5d) + C-BE-08 解读 API (4d)
  [ML-1]       C-BE-04 异常检测收尾 + 集成测试
  [ML-2]       E-BE-01 报告 Schema (8d) + E-BE-05 模板系统 (8d)
  [FE-Senior-1] C-FE-01 解读渲染框架 (8d) + C-FE-02 异常可视化 (8d)
  [FE-Senior-2] C-FE-04 根因可视化 (8d) + C-FE-05 解读交互 (6d)
  [FE-Mid-1]   D-FE-01 ChatBI 选择器 (5d) + D-FE-02 图表桥接 (5d)

Week 17-20 (Sprint 9-10):
  [BE-Senior-1] E-BE-02 报告编排引擎 (15d) - 开始
  [BE-Senior-2] E-BE-03 章节生成器 (12d)
  [BE-Senior-3] D-BE-04 集成测试 (5d)
  [BE-Mid-1]   E-BE-06 报告存储 (6d) + E-BE-08 定时生成 (6d)
  [FE-Senior-1] C-FE-03 趋势可视化 (6d) + B-FE-05 学习仪表盘 (5d)
  [FE-Senior-2] E-FE-03 模板选择器 (6d) + E-FE-04 叙事渲染器 (5d)
  [FE-Mid-1]   E-FE-05 导出分享 (5d) + E-FE-06 定时配置 (4d)
```

#### Phase 3: 报告编排 + 系统集成 (Sprint 11-14, Week 21-28)

```
Week 21-24 (Sprint 11-12):
  [BE-Senior-1] E-BE-02 报告编排引擎 (15d) - 完成
  [BE-Senior-2] E-BE-04 叙事生成 (10d)
  [BE-Senior-3] E-BE-07 报告导出 (10d)
  [BE-Mid-1]   E-BE-09 报告 API (5d)
  [FE-Senior-1] E-FE-01 报告编辑器 (15d) - 开始
  [FE-Senior-2] E-FE-02 报告阅读器 (8d)
  [QA]         系统集成测试 + 性能测试

Week 25-28 (Sprint 13-14):
  [FE-Senior-1] E-FE-01 报告编辑器 (15d) - 完成
  [All]         系统集成联调
  [All]         Bug 修复 + 性能优化
  [QA]         UAT + 回归测试
  [DevOps]     生产环境部署 + 监控配置
```

### 3.3 关键路径分析

```
关键路径 (Critical Path):

P0-01 BaseChat重构
  -> C-BE-01 解读Pipeline框架
    -> C-BE-06 DB级根因分析
      -> E-BE-02 报告编排引擎
        -> E-BE-03 章节生成器
          -> E-BE-04 叙事生成
            -> E-FE-01 报告编辑器
              -> 系统集成测试

关键路径总工时: 8+10+12+15+12+10+15 = 82 person-days
并行路径最大工时: A-BE-07 根因分析 (12d) -> C-BE-06 集成 -> E 模块

关键路径日历时间: 82 / 1 (串行) = 82 working days = 16.4 weeks
考虑并行 + 资源约束: 实际关键路径约 24-28 weeks
```

### 3.4 总体时间与资源估算

| 指标 | 数值 |
|------|------|
| 总工作量 | 517 person-days = **103.4 person-weeks** |
| 团队规模 | 13.5 FTE |
| 理论最短时间 (完全并行) | 103.4 / 13.5 = 7.7 weeks |
| 实际排期 (含依赖约束) | **28 weeks (7 months)** |
| 效率系数 | 103.4 / (28 * 13.5) = 0.27 (资源利用率) |
| 含 Buffer (15%) | **32 weeks (8 months)** |

---

## 4. 风险登记册

### 4.1 技术风险

| Risk ID | 风险描述 | 概率 | 影响 | 风险等级 | 缓解策略 | 应急预案 |
|---------|---------|------|------|---------|---------|---------|
| R-01 | LLM 输出格式不稳定导致 JSON 解析频繁失败 | High | High | **Critical** | 1. 使用 function calling / structured output 替代自由文本 JSON<br>2. 多层 fallback 解析（JSON extract -> regex -> LLM re-format）<br>3. 输出格式校验 + 自动修正 | 引入 guardrails-ai 框架，对 LLM 输出做 schema 校验和自动修正 |
| R-02 | BaseChat 重构引入回归 bug，影响所有现有 scene | Medium | Critical | **High** | 1. 重构前补全现有 scene 的集成测试<br>2. 逐个 scene 迁移，保持旧接口兼容<br>3. feature flag 控制新旧路径切换 | 保留旧 BaseChat 实现作为 fallback，通过配置切换 |
| R-03 | NL-to-SQL 准确率不达标（目标 > 85%，当前约 60-70%） | High | High | **Critical** | 1. 模块 B 的学习加速系统提升准确率<br>2. 引入 SQL 执行反馈循环（执行结果 -> 错误 -> LLM 修正）<br>3. Few-shot example 精选和动态匹配 | 对高复杂度查询降级为 "建议 SQL + 人工确认" 模式 |
| R-04 | 报告编排引擎 LLM 调用次数过多，延迟和成本不可控 | Medium | High | **High** | 1. 章节并行生成（asyncio.gather）<br>2. LLM 调用缓存（相同 prompt + model -> cache）<br>3. 章节模板分级（简单章节用规则引擎，复杂章节用 LLM） | 引入 LLM router：简单文本用小模型（fast/cheap），复杂分析用大模型 |
| R-05 | ExcelReader 大文件处理 OOM | Medium | Medium | **Medium** | 1. 实现分块读取（pandas chunksize）<br>2. DuckDB lazy loading + 流式查询<br>3. 文件大小上限配置 | 超大文件降级为 "仅读取前 N 行 + 提示用户" |
| R-06 | 前端报告编辑器拖拽性能问题 | Medium | Medium | **Medium** | 1. 使用 react-dnd 或 dnd-kit（虚拟化拖拽）<br>2. 大报告分页渲染（虚拟列表）<br>3. 编辑操作批处理 + debounce | 简化编辑器为 "模板选择 + 参数配置" 模式，跳过拖拽 |
| R-07 | 异常检测算法误报率过高 | Medium | Medium | **Medium** | 1. 算法参数可配置（z-score 阈值、IQR 倍数）<br>2. 多算法投票（z-score + IQR + isolation forest）<br>3. 用户反馈循环（标记误报 -> 调参） | 提供手动标注功能，允许用户排除已知正常波动 |
| R-08 | 多模块并行开发导致 API 接口频繁变更 | High | Medium | **High** | 1. Phase 0 阶段定义核心 API contract<br>2. API versioning（/api/v1/）<br>3. 每周 API review 会议 | 使用 API mock server 解耦前后端开发 |

### 4.2 项目管理风险

| Risk ID | 风险描述 | 概率 | 影响 | 缓解策略 |
|---------|---------|------|------|---------|
| R-09 | 关键人员离职导致知识断层 | Medium | High | 强制 code review + pair programming；核心模块至少 2 人熟悉 |
| R-10 | 需求变更导致已完成模块返工 | High | Medium | 每 2 周产品评审；变更影响评估流程；模块间松耦合设计 |
| R-11 | 第三方依赖（LLM API）不稳定或价格上涨 | Medium | High | 支持多 LLM provider 切换；本地模型 fallback 方案 |
| R-12 | 测试覆盖率不足导致生产 bug | Medium | High | 强制 80% 单测覆盖率；每周质量报告；自动化回归测试 |

---

## 5. 技术栈决策

### 5.1 Build vs Integrate 决策矩阵

| 能力 | 决策 | 理由 | 推荐 Library/Framework |
|------|------|------|----------------------|
| 字段质量评估 | **Build** | 业务特定性强，通用库不满足（需要度量/维度分类、业务语义理解） | 自建，基于 pandas-profiling 简化版 |
| 异常检测 | **Integrate + Build** | 底层算法用成熟库，上层业务逻辑自建 | scipy.stats (z-score), statsmodels (STL), scikit-learn (IsolationForest) |
| 趋势分析 | **Integrate + Build** | 时间序列分析用 statsmodels，趋势描述生成用 LLM | statsmodels (STL, ARIMA), prophet (可选) |
| 根因分析 | **Build** | 业务特定（维度下钻 + 贡献度计算），无成熟通用方案 | 自建，基于 SQL window functions + 统计分解 |
| NL-to-SQL | **Integrate + Enhance** | 基于 DB-GPT 现有能力增强 | DB-GPT ChatWithDbAutoExecute + few-shot dynamic selection |
| 报告模板引擎 | **Build** | 需要与 ChatDashboard schema 深度集成 | 自建 Jinja2-based 模板引擎 |
| 报告导出 | **Integrate** | 成熟方案 | WeasyPrint (HTML->PDF), python-docx (Word), Playwright (高质量 PDF) |
| 前端报告编辑器 | **Integrate + Build** | 拖拽基础用 dnd-kit，编排逻辑自建 | react-dnd-kit, tiptap (富文本), @antv/g2 (图表) |
| 前端图表库 | **Integrate** | 现有 antv 体系 | @antv/g2plot, @antv/s2 (透视表) |
| 智能洞察生成 | **Build** | 核心差异化能力，需要 LLM + 统计结合 | 自建 InsightGenerator + LLM narrative |
| ChatBI 集成 | **Build** | 特定产品集成，无通用方案 | 自建 HTTP Client + Adapter |
| Prompt 管理 | **Integrate + Build** | Prompt 模板用 Jinja2，版本管理自建 | Jinja2 + 自建 PromptRegistry |
| LLM 调用 | **Integrate** | 使用 DB-GPT AWEL 模型调用层 | DB-GPT ModelOperator + AWEL DAG |

### 5.2 LLM 模型需求

| 任务类型 | 推荐模型 | 原因 | 预估调用量 |
|---------|---------|------|-----------|
| NL-to-SQL | GPT-4o / Qwen-Max | SQL 生成需要强推理能力，准确率优先 | 每用户每天 10-30 次 |
| 数据解读叙事生成 | GPT-4o / Claude-3.5-Sonnet | 中文文本生成质量要求高 | 每次解读 1-3 次 |
| 报告章节生成 | GPT-4o / Qwen-Max | 长文本生成 + 上下文理解 | 每份报告 5-10 次 |
| Excel 字段学习 | GPT-4o-mini / Qwen-Plus | 结构化输出，成本低，速度优先 | 每文件 1 次 |
| Few-shot example 选择 | text-embedding-3-small | 语义相似度匹配 | 每次查询 1 次 |
| 异常描述生成 | GPT-4o-mini / Qwen-Plus | 短文本生成，成本敏感 | 每个异常 1 次 |
| SQL 自修正 | GPT-4o / Qwen-Max | 错误理解 + 修正需要强推理 | 失败时 1-2 次 |

### 5.3 关键技术选型

| 层级 | 技术 | 版本要求 | 说明 |
|------|------|---------|------|
| Backend Runtime | Python | >= 3.10 | 需要 match-case 等语法 |
| Web Framework | FastAPI | >= 0.100 | 已有，继续使用 |
| ORM | SQLAlchemy | >= 2.0 | 现有代码使用 1.x 风格，需评估升级 |
| 异步任务 | Celery + Redis | >= 5.3 | 报告生成等长任务异步化 |
| 数据处理 | pandas + DuckDB | >= 2.0 / >= 0.9 | ExcelReader 已使用 DuckDB |
| 统计计算 | scipy + statsmodels | 最新稳定版 | 异常检测 + 趋势分析 |
| 前端框架 | React | >= 18 | |
| 状态管理 | Zustand | >= 4.0 | 轻量级，适合中型应用 |
| UI 组件库 | Ant Design | >= 5.0 | |
| 图表库 | @antv/g2plot | >= 2.4 | 与现有 antv 体系一致 |
| 富文本编辑 | Tiptap | >= 2.0 | 报告叙事编辑 |
| 拖拽库 | dnd-kit | >= 6.0 | 报告布局编排 |
| PDF 导出 | WeasyPrint / Playwright | 最新稳定版 | 服务端 PDF 生成 |
| 监控 | Prometheus + Grafana | 最新稳定版 | LLM 调用监控 + 系统监控 |
| 日志 | structlog | >= 23.0 | 结构化日志，替代 print |

### 5.4 架构边界约定

```
+------------------------------------------------------------------+
|                        Frontend (React)                           |
|  Report Editor | Interpretation Panel | Config Wizard | Charts   |
+------------------------------------------------------------------+
         | REST API (JSON)          | WebSocket (stream)
+------------------------------------------------------------------+
|                     API Gateway (FastAPI)                          |
+------------------------------------------------------------------+
    |              |              |              |              |
+--------+  +----------+  +----------+  +----------+  +----------+
| ChatDB |  | ChatExcel|  | ChatInter |  | ChatReport|  | ChatBI   |
| Scene  |  | Scene    |  | pret Scene|  | Scene     |  | Adapter  |
+--------+  +----------+  +----------+  +----------+  +----------+
    |              |              |              |              |
+------------------------------------------------------------------+
|                     BaseChat Lifecycle                             |
|  generate_input_values -> prompt -> LLM -> parse -> do_action     |
+------------------------------------------------------------------+
    |              |              |              |
+--------+  +----------+  +----------+  +------------------+
| DB     |  |ExcelReader|  |Statistics|  | AWEL DAG Engine   |
| Layer  |  | (DuckDB) |  | Engine  |  | (Model Operator)  |
+--------+  +----------+  +----------+  +------------------+
    |                                          |
+--------+                              +----------+
| SQL DB |                              | LLM APIs |
+--------+                              +----------+
```

**模块间通信规则:**
1. Scene 之间通过事件总线通信，不直接调用
2. 共享服务通过依赖注入（如 StatisticsEngine, KnowledgeBase）
3. 数据库访问统一通过 Database 抽象层
4. LLM 调用统一通过 AWEL ModelOperator DAG

---

## 附录

### A. 估算方法说明

- 工时估算采用 **Expert Judgment + Delphi Method**，基于对源代码的逐行分析
- 1 person-day = 8 有效工作小时（扣除会议/沟通/review 时间后约 5-6 小时编码时间）
- 复杂度定义:
  - **S (Small)**: 纯 CRUD 或配置变更，风险低
  - **M (Medium)**: 需要设计决策但方案明确
  - **L (Large)**: 需要架构决策，涉及多模块交互
  - **XL (Extra Large)**: 核心算法/引擎，技术方案需验证

### B. 假设与约束

1. 假设团队在项目启动时已到位，无 ramp-up 延迟
2. 假设 LLM API（GPT-4o 等）可用且延迟稳定（< 5s per call）
3. 假设现有 DB-GPT 部署环境可用，无需额外基础设施搭建
4. 假设前端 React 项目结构已建立（DB-GPT v0.4.2 含前端项目）
5. 约束: 不修改 DB-GPT 核心框架代码（pilot/ 目录外扩展），但 Phase 0 重构为例外
6. 约束: 所有 LLM 调用需要支持 token 用量追踪和成本控制

### C. 关键文件索引

| 文件 | 路径 | 行数 | 分析重点 |
|------|------|------|---------|
| BaseChat | `pilot/scene/base_chat.py` | 672 | 生命周期模型，核心扩展点 |
| ChatFactory | `pilot/scene/chat_factory.py` | 36 | Scene 路由，需改为 registry |
| ChatDashboard | `pilot/scene/chat_dashboard/chat.py` | 131 | 报告生成流程，do_action 是扩展关键 |
| ReportSchema | `pilot/scene/chat_dashboard/data_preparation/report_schma.py` | 50 | 数据模型，需大幅扩展 |
| DashboardDataLoader | `pilot/scene/chat_dashboard/data_loader.py` | 61 | 数据转换，需重构 |
| DashboardOutputParser | `pilot/scene/chat_dashboard/out_parser.py` | 48 | ChartItem 定义，需改为 Pydantic model |
| ChatWithDbAutoExecute | `pilot/scene/chat_db/auto_execute/chat.py` | 89 | NL-to-SQL 流程，安全加固 |
| ExcelReader | `pilot/scene/chat_data/chat_excel/excel_reader.py` | 335 | 数据加载，需清理+增强 |
| ChatExcel | `pilot/scene/chat_data/chat_excel/excel_analyze/chat.py` | 133 | Excel 分析流程 |
| ExcelLearning | `pilot/scene/chat_data/chat_excel/excel_learning/chat.py` | 70 | 字段学习流程 |
| PromptTemplate (new) | `pilot/prompts/prompt_new.py` | 92 | 模板系统，保留此版本 |
| PromptTemplate (old) | `pilot/prompts/prompt_template.py` | 363 | 历史遗留，需清理 |
| BaseOutputParser | `pilot/out_parser/base.py` | 272 | 输出解析，需 adapter 化 |
| Database | `pilot/common/sql_database.py` | 80+ | SQLAlchemy 封装，需修复类型 |
| ChatScene Enum | `pilot/scene/base.py` | 130 | Scene 定义，需新增 scene 类型 |

---

*Document End -- CC-ENG-2026-001 v1.0*
