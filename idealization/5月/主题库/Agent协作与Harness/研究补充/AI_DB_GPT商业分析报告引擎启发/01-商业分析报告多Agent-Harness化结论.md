---
id: kc-20260609-business-report-agent-harness
type: knowledge-card
topic: agent-harness-business-report
status: promoted
confidence: medium
created: 2026-06-09
updated: 2026-06-09
source_files:
  - D:/Users/Desktop/项目/代码/AI_DB_GPT/docs/research/inspiration/01_roundtable_20_rounds.md
  - D:/Users/Desktop/项目/代码/AI_DB_GPT/docs/research/inspiration/03_multi_agent_report_runtime_architecture.md
tags:
  - agent-harness
  - business-analysis
  - eval
  - report-artifact
---

# 商业分析报告多 Agent Harness 化结论

## 核心判断

商业分析报告可以使用多 agent，但事实生产层必须是 workflow。多 agent 的价值在解释、争议发现、知识检索、建议候选、报告撰写和 reviewer gate。

```text
workflow 生产可审计事实
agent 在 harness 内做有限增强
trace/eval 阻断越界输出
```

## 什么必须 workflow

- 原始数据入库。
- 数据字典和元数据。
- 指标计算。
- 规则触发。
- 数据质量校验。
- Markdown/HTML 渲染。
- runtime trace 生成。

## 什么适合 agent

- 复杂问题规划。
- 知识检索和证据整理。
- 异常解释和下钻方向。
- 管理层叙事撰写。
- 建议候选生成。
- 商分/产品/治理 reviewer。

## Harness 合同

专家不是人设 prompt，而应具备：

1. 触发条件。
2. 输入 schema。
3. 输出 schema。
4. 允许工具。
5. 禁止读取源。
6. 证据引用要求。
7. 失败处理。
8. 人工确认点。
9. baseline。
10. eval set。
11. 版本和回退策略。

## 管理层看板原则

主阅读面讲业务，证据层讲来源，调试层讲工程。

主界面不应展示：

- raw metric id。
- 英文字段名。
- 工程状态码。
- prompt 痕迹。
- 未翻译的小数比较值。
- “本页只把 DuckDB 事实...”这类工程自我约束。

主界面应展示：

- 经营结论。
- 关键异常。
- 预算压力。
- 驱动因素。
- 下钻方向。
- 建议状态和未确认项。

## Eval 分层

- 数据正确性 eval。
- 规则触发 eval。
- 叙事忠实度 eval。
- 引用完整性 eval。
- 建议边界 eval。
- 人工复核一致性 eval。
- 成本/延迟/工具效率 eval。

LLM-as-Judge 只能作为补充，不应替代黄金数据集和确定性断言。

## 关联

- [[../../专业知识/01-真正的-Agent-harness-思想]]
- [[../../../../大数据AI智能范式/研究补充/AI_DB_GPT商业分析报告引擎启发/00-索引]]
