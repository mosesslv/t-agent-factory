---
id: kc-20260609-ai-dbgpt-trusted-data-agent-platform
type: knowledge-card
topic: enterprise-data-agent-platform
status: promoted
confidence: medium
created: 2026-06-09
updated: 2026-06-09
source_files:
  - D:/Users/Desktop/项目/代码/AI_DB_GPT/docs/research/inspiration/02_report_engine_to_ai_dbgpt_platform.md
  - D:/Users/Desktop/项目/代码/AI_DB_GPT/docs/research/inspiration/05_snowflake_data_agent_platform_inspiration.md
tags:
  - data-agent
  - dbgpt
  - semantic-layer
  - report-engine
---

# DB-GPT 作为可信数据智能底座

## 核心判断

DB-GPT / AI_DB_GPT 的下一阶段不应被定义为“建设统一聊天入口”，而应定义为“建设可信数据智能底座”。商业分析报告引擎是这个底座的第一个高价值样板。

```text
Trusted Data Agent Platform
= Governed Data Runtime
+ Dataset Learning Center
+ Semantic/Metric Center
+ Knowledge/Rule Center
+ Agent Harness Runtime
+ Tool/Action Governance
+ Artifact Hub
+ Run Trace & Eval
+ App Matrix
```

## 从 report-engine-v1 得到的启发

`report-engine-v1` 证明商业分析报告需要：

1. 原始数据和数据版本。
2. 数据字典和元数据。
3. 指标合同和语义层。
4. 知识层和规则层。
5. 业务词汇和叙事风格约束。
6. Markdown 主报告。
7. Dashboard view model 和 HTML 渲染。
8. runtime trace。
9. claim evidence map。
10. recommendation candidates。
11. quality gate 和 reviewer gate。

这些不应停留在单个项目脚本里，而应迁移为 AI_DB_GPT 平台对象。

## 平台对象

| 对象 | 作用 |
|---|---|
| Dataset / DatasetVersion | 管理数据来源、版本、字段和质量。 |
| MetricContract / SemanticModel | 管理指标口径、维度、时间窗、关系和可问边界。 |
| KnowledgeAsset / RuleContract | 管理 SOP、历史报告、规则、个人知识和企业口径。 |
| AnalysisRun / StepRun / Event | 管理分析执行过程。 |
| EvidenceGraph | 管理 claim 到 metric/rule/source/status 的证据关系。 |
| ReportArtifact / DashboardArtifact | 管理报告、看板、view model、HTML、飞书文档等产物。 |
| EvalResult / ReviewerDecision | 管理质量门禁和人类/agent reviewer 决策。 |
| ToolAction / ShareRecord | 管理发布、外发、写回等行动治理。 |

## 关键原则

1. 先可信底座，后应用矩阵。
2. 先 semantic/metric contract，后自由问数体验。
3. 先 trace/eval，后自动建议。
4. ChatExcel、ChatBI、Chat Report、Dashboard 都是应用层，不是平台边界。
5. 管理建议必须区分数据事实、规则触发、AI 草案和人工确认。

## 关联

- [[../../专业知识/01-Snowflake-Summit-26-信号]]
- [[../../专业知识/02-企业Data-Agent能力分层]]
- [[00-索引]]
