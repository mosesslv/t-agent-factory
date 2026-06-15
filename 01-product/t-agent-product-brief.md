# t-agent 产品建设整合简报

## 1. 产品定义

t-agent 是企业级 Data Agent 产品工作空间的当前产品名。它面向企业数据消费、经营分析和报告生成，不是单一聊天框、Text2SQL 工具或 DB-GPT 改造项目。

推荐定义：

> t-agent = LLM Orchestration / Adapter + 数据资产上下文 + 语义与指标上下文 + 分析应用矩阵 + Skill 沉淀体系 + 知识资产体系 + 运行评估闭环。

对应产品形态：

| 层级 | 说明 |
|---|---|
| 应用层 | ChatExcel、ChatBI、ChatDB、ChatDashboard、ChatReport、经营分析 Skill |
| 公共能力层 | Dataset Learning、Semantic & Metric、Knowledge、Skill Hub、Asset Hub、Run Trace、Eval |
| 运行层 | Agent Runtime、LLM Adapter、Tool & Execution Hub、SQL Guard、模型路由 |
| 适配层 | ChatBI、FineBI/QuickBI、数仓、指标平台、飞书文档、企业知识库 |

## 2. 非目标

- 不把 t-agent 做成完整 BI 替代品。
- 不绕过数仓、指标平台、权限和审计体系。
- 不把第一阶段做成万能问答或通用洞察引擎。
- 不把 Skill 理解为 prompt 集合。
- 不把 DB-GPT 直接等同为成熟企业 Data Agent。

## 3. 核心产品原则

| 原则 | 含义 | 为什么 |
|---|---|---|
| 数据先可问 | 先建设可问数据集、字段语义、样例问题和可问范围 | 没有语义上下文，模型会猜字段、猜口径 |
| 答案必须可信 | SQL、指标、图表、知识和报告结论都要可追踪 | 企业经营分析不能只看生成文本 |
| 结果必须沉淀 | 问数结果、洞察卡、报告片段、Skill、失败样例要进入资产 | 否则每次对话都是一次性消耗 |
| 应用体验分层 | ChatExcel、ChatBI、ChatReport 各自优化体验，公共能力平台化 | 避免能力被锁死在单一应用里 |
| 小闭环优先 | 先跑通 Dataset Learning、Knowledge Base、ChatBI Adapter、ChatExcel 单文件/单表分析报告，再扩展场景 | 防止范围扩散 |

## 4. 第一阶段用户与任务

| 用户     | Job-to-be-done            | t-agent 应提供                                 |
| ------ | ------------------------- | ------------------------------------------- |
| 业务人员   | 上传 Excel/CSV 后快速问数、看图、拿摘要 | ChatExcel + 数据集学习 + 推荐问题                    |
| 分析师    | 围绕正式数据集做问数、下钻、解释、复用分析步骤   | ChatBI/ChatDB + 语义层 + SQL Guard + Run Trace |
| 经营分析人员 | 生成销售周报/月报/异常归因专题          | ChatReport + 分析计划 + 报告素材池 + 引用链             |
| 数据团队   | 让数据集、字段、指标、知识和反馈持续变好      | Dataset Learning + Semantic Center + Eval   |
| 管理者    | 看可信经营结论和可追溯报告             | 报告产物 + 证据链 + 审批/分发                          |

## 5. 当前产品主线

推荐将近期主线定义为：

> V2 平台能力迭代：Dataset Learning + Knowledge Base，并通过现有 ChatBI 集成与 ChatExcel 单文件/先单表分析报告迭代验证公共能力。

主链路：

```text
进入 t-agent
  -> 选择现有 ChatBI 数据集或上传单文件
  -> Dataset Learning 生成字段、画像、样例问题和可问范围
  -> 绑定个人/项目知识并记录引用边界
  -> 通过 ChatBI Adapter 或 ChatExcel 执行问数/分析
  -> 展示可见分析过程、SQL/计算、图表、产物、证据和告警
  -> 生成可编辑的分析报告草稿
  -> 记录 run、artifact、feedback 和 eval case
```

销售经营分析仍可作为候选 golden workflow，但不再定义 V2。

## 6. 来源

本简报整合自：

- `idealization/5月/gather/基本共识.md`
- `idealization/5月/gather/能力清单.md`
- `idealization/5月/gather/v2/产品规划v1.md`
- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`
- `idealization/5月/enterprise-buildups.md`
- `idealization/5月/transsion-enterprise-data-agent-sharing-draft.md`
- `idealization/5月/datafun-speaker-submission-data-agent.md`
