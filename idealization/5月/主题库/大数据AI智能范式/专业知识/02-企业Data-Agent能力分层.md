# 企业 Data Agent 能力分层

## 总公式

```text
Enterprise Data Agent Platform
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
+ Integration & Adapter Framework
+ App Matrix
```

## 七层资产

| 层级 | 资产 | 作用 |
|---|---|---|
| L0 | 数据连接与原始数据 | 给 Agent 安全访问数据的入口 |
| L1 | 标准表与领域宽表 | 稳定、可复用的数据底座 |
| L2 | 可问数据集 | 字段解释、别名、质量画像、推荐问题 |
| L3 | 指标与语义 | 指标口径、维度、时间语义、业务术语 |
| L4 | 分析 Skill | 问数、解读、归因、报告、导出、行动 |
| L5 | 分析产物 | 图表、洞察卡、报告素材、引用关系 |
| L6 | 运行反馈 | 准确率、成功率、成本、延迟、评测集 |

## 平台层与应用层边界

平台层负责可复用、可治理、可评测的公共能力；应用层负责具体用户工作流。

| 应放平台层 | 应放应用层 |
|---|---|
| Dataset、Field、Profile | ChatExcel 上传体验 |
| Metric、Dimension、Glossary | ChatBI 问数页面 |
| Knowledge、Chunk、Citation | ChatReport 编辑器 |
| SQL Guard、Permission、Audit | Dashboard 交互 |
| Tool Registry、MCP Gateway | 飞书分享按钮 |
| QueryRun、EvalCase、Feedback | 具体图表布局 |

## 关联

- [gather/能力清单.md](../../../gather/能力清单.md)
- [gather/基本共识.md](../../../gather/基本共识.md)
- [[../万象链接映射]]

