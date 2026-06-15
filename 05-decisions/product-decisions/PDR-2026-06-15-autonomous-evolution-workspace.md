---
type: product-decision
status: draft
created: 2026-06-15
updated: 2026-06-15
decision: narrow
topic: autonomous-evolution-workspace
---

# PDR: t-agent 工作空间自主进化

## Decision

`narrow`

t-agent 工作空间应建设“自主进化闭环”，但短期不做通用 ProductFactory、通用 agent 平台、Obsidian 插件或大型 runtime。

## User and Job

产品经理持续把议题、材料、争议、工具、社区实践和产品设想投入当前项目，希望它们被自动讨论、归类、收敛，并转化成可执行的产品资产。

## Product Shape

```text
议题 / 材料 / 工具信号
  -> 静默 agent 路由
  -> ProductFactory 先例检索
  -> t-agent resident agents 评审
  -> evidence / radar / decision / PRD / contract / eval
  -> Git + Obsidian 可追踪工作区
```

## Why Not Build Bigger Now

- 大型 agent runtime 会提前引入执行复杂度，但当前核心问题是产品建设材料和决策收敛。
- Obsidian 插件开发会引入安全、维护和跨端成本，当前 Markdown + Canvas + Bases + Codex skill 足够。
- ProductFactory 是跨项目产品能力包，t-agent 是具体产品事实库；混在一起会污染边界。

## Scope

1. 建立 capability integration radar。
2. 建立 autonomous evolution 本地 skill。
3. 将开源工具和社区实践先做 evidence card，再进入 Trial / Watch / Adopt。
4. 1.0 阶段优先把来源、决策、PRD、contract、eval、agent protocol 串起来。
5. 2.0 阶段再评估 Promptfoo / DeepEval / Langfuse / Phoenix / MCP / GitHub integration。

## Non-goals

- 不自动安装外部工具。
- 不建立后台监听写入系统。
- 不把 ProductFactory vault 作为 t-agent 项目事实库。
- 不把每个新框架都接入默认工作流。

## Acceptance Checks

- 新能力候选必须能在 `09-agents/capability-integration-radar.md` 找到分类。
- 重要外部工具必须有 evidence card。
- Adopt now 的能力必须能说明 PM 交付收益、风险和维护边界。
- Trial 能力必须有最小实验和成功标准。
- 所有正式方向变化必须能追到 PDR / ADR / PRD / eval。

## Main Risk

工具体系越建越复杂，但产品经理实际交付没有更快、更清楚、更可验收。

## Review Date

2026-07-15

## Related

- `06-iteration/reports/2026-06-15-autonomous-evolution-roadmap.md`
- `09-agents/capability-integration-radar.md`
- `.agents/skills/t-agent-autonomous-evolution/SKILL.md`
- `04-sources/evidence-cards/2026-06-15-autonomous-evolution-tooling-radar.md`
