---
type: prd
status: superseded
version: V2
updated: 2026-06-15
superseded_by:
  - 01-product/prd/PRD-V2-platform-capability-and-entry-apps.md
  - 02-roadmap/t-agent-roadmap.md
---

# PRD V2：销售经营分析平台化试点

> Superseded on 2026-06-15.
> This document remains a historical / candidate golden workflow source.
> Current V2 scope is defined by `02-roadmap/t-agent-roadmap.md` and `PRD-V2-platform-capability-and-entry-apps.md`.

## 1. 背景

t-agent 的当前产品判断是：企业 Data Agent 不是聊天框，而是把数据资产、语义口径、知识、分析技能、运行留痕、报告产物和评测反馈组织成一套可运营的智能分析平台。

V2 不追求完整企业级平台，先聚焦一个可验收的试点：

> 基于销售经营黄金数据集，打通可信问数、分析计划、过程可视、经营报告生成、产物沉淀和反馈评测。

## 2. 用户

| 用户 | 目标 | 成功标准 |
|---|---|---|
| 经营分析人员 | 快速生成销售周报/月报/异常归因专题 | 报告可编辑、可追溯、可分发 |
| 业务负责人 | 理解销售变化、风险和重点关注对象 | 结论可信，能看到证据链 |
| 数据团队 | 管理黄金数据集、字段、指标和失败样例 | 能持续提升问数和报告质量 |
| 分析师 | 对分析计划、SQL、图表、结论做人工修正 | 修正能沉淀为后续资产 |

## 3. 试点范围

### 做

- 销售经营黄金数据集注册和说明卡。
- 字段解释、指标口径、同义词、样例问题和可问范围。
- ChatBI / ChatDB 问数：问题理解、SQL 预览、安全校验、结果解释。
- ChatReport 报告：议题理解、分析计划、过程展示、报告大纲、章节撰写。
- 报告引用：每段结论关联数据、SQL、图表、指标或知识来源。
- Run Trace：记录 AskRun、ReportRun、ToolCall、Artifact、Feedback。
- 反馈：采纳、纠错、失败样例、人工修正说明。

### 不做

- 完整多数据源泛化。
- 完整指标平台。
- 完整知识审批流。
- 完整 Notebook。
- 自动触发业务行动。
- 替代 BI 的报表编辑器。

## 4. 核心用户流程

```text
进入 t-agent
  -> 选择销售经营黄金数据集
  -> 查看数据集说明卡和可问范围
  -> 输入报告议题或经营问题
  -> 系统生成分析计划
  -> 用户确认或调整时间范围、维度、指标、报告目标
  -> 系统执行问数 / 图表 / 知识检索 / 分析片段生成
  -> 用户查看 SQL、图表、过程和中间结论
  -> 系统生成报告大纲和章节
  -> 用户编辑、采纳、纠错
  -> 输出 Markdown / HTML / 飞书文档
  -> 保存 ReportRun、Artifact、Feedback 和失败样例
```

## 5. 功能需求

| 编号 | 功能 | 优先级 | 验收 |
|---|---|---:|---|
| F1 | 黄金数据集说明卡 | P0 | 展示字段、指标、样例问题、负责人、更新时间、可问范围 |
| F2 | 问数语义注入 | P0 | 问题执行前能加载字段解释、指标口径、样例问题 |
| F3 | SQL 安全网关 | P0 | 只读、限行、超时、敏感字段、审计至少有最小实现 |
| F4 | AskRun 记录 | P0 | 保存问题、数据集、SQL、结果摘要、错误、反馈 |
| F5 | 分析计划 | P0 | 报告前先生成可审阅的分析计划 |
| F6 | 报告大纲 | P0 | 用户可确认或调整报告章节 |
| F7 | ReportRun 记录 | P0 | 保存章节、引用、产物、状态、错误 |
| F8 | Artifact 管理 | P0 | 表格、图表、洞察、报告片段可被报告引用 |
| F9 | 反馈闭环 | P1 | 支持采纳、纠错、差评、失败样例沉淀 |
| F10 | 飞书输出 | P1 | 能输出到飞书文档或生成可复制的 Markdown |
| F11 | Eval 面板 | P1 | 展示黄金问题通过率、失败原因、修复状态 |

## 6. 数据与对象依赖

- DataSet
- DataField
- Metric
- AskRun
- ReportRun
- Artifact
- Feedback
- EvalCase

对象契约见：

- `03-architecture/contracts/dataset-contract-v0.md`
- `03-architecture/contracts/run-artifact-contract-v0.md`

## 7. 验收指标

| 指标 | V2 建议目标 |
|---|---:|
| 黄金问题可执行率 | >= 80% |
| SQL 安全拦截覆盖 | 100% P0 规则 |
| 报告生成成功率 | >= 80% |
| 报告结论引用覆盖 | >= 90% 关键结论 |
| 失败样例沉淀率 | 100% 失败 P0 case |
| 人工可修正关键节点 | 分析计划、SQL、报告大纲、报告正文 |

## 8. 风险

| 风险 | 影响 | 缓解 |
|---|---|---|
| 黄金数据集未确认 | PRD 无法进入交付 | 先选 1 个销售经营宽表作为试点 |
| 指标口径不清 | 结果不可信 | 指标以文本口径 + Owner + 样例问题先管理 |
| 报告像纯文本总结 | 业务不敢用 | 强制引用数据、SQL、图表和知识 |
| Agent 流程过重 | 时延和失败率高 | 先用单 orchestrator + 工具链，不做复杂多 Agent |
| 缺评测 | 不知道是否变好 | 首批 10-20 条黄金问题作为 V2 gate |

## 9. 来源

- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`
- `idealization/5月/gather/v2/产品规划v1.md`
- `idealization/5月/transsion-enterprise-data-agent-sharing-draft.md`
- `idealization/5月/enterprise-buildups.md`
- `06-iteration/fusion-directions.md`
