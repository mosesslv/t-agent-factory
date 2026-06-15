# Project Context

## One-liner

t-agent-factory 是企业级 Data Agent / 可信分析平台的产品建设工作区，围绕 AI_DB_GPT / ChatReport 毛坯代码基座，把 Dataset、Knowledge、Run、Artifact、Evidence、Eval、Reviewer Gate 和 Governance Lite 逐步产品化。

## Product Stage

prototype -> beta planning

当前处于 V2 SSOT 对齐和 2026 H2 reality roadmap 锁定阶段。

## Target Users

- 企业 AI 产品负责人；
- AI 产品经理团队；
- Agent / 算法研发工程师；
- 后端工程师；
- 数据分析师 / 商分；
- 负责报告质量、指标口径、权限和审计的 reviewer。

## Current Bet

下一个可交付切片不是完整企业级 Data Agent Core，而是：

> 基于 AI_DB_GPT / ChatReport 的可信分析平台 Beta：让用户能看到 plan、run、artifact、evidence、warning、eval 和 reviewer decision。

## Current Roadmap

- Canonical roadmap: `02-roadmap/t-agent-roadmap.md`
- Reality roadmap: `02-roadmap/t-agent-reality-roadmap-2026-h2.md`
- Project SSOT: `agent.md`
- Expert style guide: `09-agents/expert-style-guide.md`

## Current Non-goals

- 不在 2026 H2 承诺完整 V4 Enterprise Data Agent Core。
- 不直接建设开放 SkillHub / marketplace。
- 不支持任意动态 multi-agent DAG。
- 不把销售经营分析定义为 V2 本身。
- 不把 demo 成功当作真实业务质量关闭。

## Technical Constraints

- AI_DB_GPT 是已有毛坯 / 半成品代码基座，不是从零开始。
- 当前最强切片是 ChatReport v1.0，需要从中提取共享对象。
- 后端资源和资深 Agent 研发资源可能不足，平台化必须收敛。
- 关键对象包括 `Dataset`、`SourceRef`、`AnalysisRun`、`Artifact`、`Evidence`、`Eval`。

## Validation Commands

当前主要是文档和产品工作区，常用验证：

```bash
git status --short
rg -n "TODO|TBD|unknown|待补" .
```

涉及 AI_DB_GPT source index 时，从仓库根目录运行：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\ai-dbgpt\update-ai-dbgpt-source-index.ps1
```

## UX / Product Acceptance

- Core user path: 从业务问题进入 ChatReport / ChatExcel，看到 plan、run、artifact、evidence、warning、eval、reviewer decision。
- Empty/loading/error states: 后续 workbench prototype 必须覆盖。
- Browser or screenshot checks: 进入 `08-design-prototypes/` 后补。
- Metrics or qualitative signal: golden cases pass/fail、unsupported claim 阻断率、报告 reviewer 通过率、失败样例回归。

## Current Product Questions

- V2 Reality PRD 如何从 ChatReport 单点试点收敛为平台对象和工作台闭环？
- 哪些对象应该现在变成共享 contract，哪些继续留在 ChatReport 局部？
- 真实业务质量关闭需要哪些数据、golden questions、指标定义和预期报告标准？
- 资深 Agent 研发和后端应该优先补哪个风险点？

## ProductFactory Skills To Use

- productfactory
- ai-rd-plan-reviewer
- enterprise-data-agent-planner
- agent-harness-designer
- codebase-to-roadmap-auditor

## ProductFactory Bridge

```text
PRODUCTFACTORY_URL=http://127.0.0.1:8765
```

## Write-back Target

ProductFactory vault:

```text
/Users/ALv/Desktop_Local/Study/prod/peronalBlog/ProductFactory/ProductFactory
```

## Ship Pack Reminder

Before non-trivial implementation, ProductFactory should confirm the Product Committee decision is `build` or `narrow`, then produce or update:

- `.productfactory/shipping-package/ship-pack.md`
- `.productfactory/shipping-package/delivery-harness.md`
- `.productfactory/shipping-package/ship-review.md`
- `.productfactory/shipping-package/impact-log.md`

Plain trigger:

```text
这个任务先走 ProductFactory shipping package，别急着写代码。
```

After completion, append an impact row that records ProductFactory sources used, guidance adopted, verification performed, rework avoided, and whether anything should enter Review Queue.

## No-Memory Usage

The user does not need to remember ProductFactory commands. Treat normal product work phrases as triggers:

- "这个功能要不要做"
- "下一步做什么"
- "开始实现这个功能"
- "这个页面怎么设计"
- "review 一下这个原型"
- "这个产品形态对吗"

Agent behavior:

1. If product direction is unclear, run a short Product Committee pass first.
2. If decision is `research` or `kill`, do not implement.
3. If decision is `build` or `narrow`, use the shipping package.
4. After meaningful work, update `impact-log.md`.
