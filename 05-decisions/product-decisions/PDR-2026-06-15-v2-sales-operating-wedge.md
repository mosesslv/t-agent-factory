---
type: product-decision
status: superseded
decision: superseded
updated: 2026-06-15
superseded_by:
  - 05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md
---

# PDR-2026-06-15：V2 收敛为销售经营分析试点

> Superseded on 2026-06-15 by `PDR-2026-06-15-version-roadmap-ssot.md`.
> Sales operating analysis remains a candidate golden workflow, but it no longer defines V2 scope.

## Decision

`narrow`

## 用户和痛点

经营分析人员、业务负责人、数据团队需要把销售经营数据从“能看报表、能问数”推进到“能解释、能生成报告、能追溯、能复用”。

## 产品形态

V2 不做完整企业级 Data Agent，而是做：

> 基于销售经营黄金数据集的可信问数 + 分析计划 + 经营报告生成 + 证据链 + 反馈评测闭环。

## 最小 wedge

- 1 个销售经营黄金数据集。
- 10-20 个黄金问题。
- 1 个经营周报或月报模板。
- AskRun / ReportRun / Artifact 最小对象。
- 报告结论引用链。

## 为什么不是别的方向

- 不先做完整 BI：会和 FineBI/QuickBI 重叠，且工程范围过大。
- 不先做完整企业知识库：治理成本高，短期不决定 Data Agent 成败。
- 不先做多 Agent 平台：当前最大风险是数据语义、SQL 安全、证据链和评测，不是 agent 数量。
- 不先做行动型 Agent：权限、审计和业务责任尚未成熟。

## 验收

- PRD V2 完成。
- 数据契约完成。
- 首批黄金问题集完成。
- Backlog P0 项有状态。
- 常驻产品 agents 有 roster 和 profile。

## 复查点

当真实黄金数据集、用户问题和报告模板确认后，复查 V2 是否从 `narrow` 升级为 `build`。
