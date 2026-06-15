---
type: project-agent-ssot
status: canonical
lifecycle: single-source-of-truth
updated: 2026-06-15
canonical_artifacts:
  - 02-roadmap/t-agent-roadmap.md
  - 02-roadmap/t-agent-reality-roadmap-2026-h2.md
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 09-agents/expert-style-guide.md
  - 09-agents/productivity-skills-integration.md
  - 09-agents/self-improvement-protocol.md
  - 05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md
  - 05-decisions/product-decisions/PDR-2026-06-15-knowledge-base-capability.md
  - 01-product/prd/PRD-V2-platform-capability-and-entry-apps.md
  - 02-roadmap/backlog/product-backlog.md
---

# t-agent 平台 SSOT

本文件是任何 agent 进入本仓库时必须先读的项目级入口。

它定义 t-agent 当前产品事实、版本含义、来源优先级、写作风格、知识库能力和冲突处理规则。详细版本边界见 `02-roadmap/t-agent-roadmap.md`，现实执行排期见 `02-roadmap/t-agent-reality-roadmap-2026-h2.md`。

## 1. 产品事实

t-agent 是企业级 Data Agent 产品建设工作台。

它不是：

- 通用聊天框；
- Text2SQL 单点工具；
- DB-GPT 皮肤；
- 一次性销售报告项目；
- 泛 multi-agent 平台。

产品目标是让企业数据分析变得可信、可复用、可治理：把数据集上下文、知识上下文、运行轨迹、产物、证据、评测和受控应用入口组织成可迭代的平台能力。

## 2. 当前版本事实

`02-roadmap/t-agent-roadmap.md` 是详细版本路线图 SSOT。

当前接受的版本含义：

| 版本 | 含义 |
|---|---|
| V1 | 历史基线 / 双入口 MVP 验证。 |
| V2 | Dataset Learning + Knowledge Base + 现有 ChatBI 集成 + ChatExcel 单文件 / 初期单主表分析报告迭代。 |
| V3 | 可信洞察与报告工作台：ChatReport、Dashboard Insight、EvidenceGraph、ReportArtifact、Reviewer Gate、报告/看板评测。 |
| V4 | 企业级 Data Agent Core：核心服务 API、治理、Action Control、AgentOps、EvalOps、FinOps、多租户准备。 |

销售经营分析只是候选 golden workflow / eval pack，不再定义 V2。

## 3. V2 当前范围

V2 必须保持收敛：

```text
平台能力：
  Dataset Learning
  Knowledge Base

垂直入口：
  现有 ChatBI Adapter
  ChatExcel 单文件 / 初期单主表分析报告流
```

V2 必须展示可审计的分析过程：

- plan；
- 被选中的数据 / 字段；
- SQL 或计算步骤；
- tool call；
- table / chart / artifact 输出；
- evidence link；
- warning；
- 可编辑 checkpoint。

不要暴露隐藏模型 chain-of-thought。

## 4. 写作与专家风格事实

本仓库默认使用中文。所有重要文档默认写成中文，包括 roadmap、PRD、PDR、ADR、architecture note、eval plan、source register、agent protocol、review report 和 handoff plan。

允许保留英文的情况：

- 产品名、API 名、版本名、代码标识符；
- 外部来源标题；
- 精确术语，例如 `Dataset`、`AnalysisRun`、`Artifact`、`Evidence`、`Eval`、`AgentOps`；
- 少量直接引用，但必须配中文解释。

写作风格遵循 `09-agents/expert-style-guide.md`：

- 产品口径：像顶级 AI 产品经理一样，先写用户、场景、工作流、非目标、验收和取舍。
- 研究口径：像顶级 AI researcher 一样，区分 evidence / assumption / unknown，保留来源和反例。
- 工程口径：像顶级 AI systems engineer 一样，写清边界、数据流、控制流、失败模式、评测、观测、权限和成本。
- 可信 AI 口径：不夸大，不用概念堆叠替代验收，不把 demo 成功当作产品可用。
- 可视化口径：系统性文档涉及三个以上组件时，优先加入 Mermaid 架构图；需要精细编辑和导出时再使用 draw.io。

外部公司和专家只能作为风格标杆，不作为背书，也不能假装代表他们说话。

## 5. 权威顺序

当文档冲突时，按以下顺序判断：

1. `agent.md`
2. `02-roadmap/t-agent-roadmap.md`
3. `09-agents/expert-style-guide.md`
4. `02-roadmap/t-agent-reality-roadmap-2026-h2.md`
5. `03-architecture/knowledge-base-capability-blueprint.md` 和 `06-iteration/docs-as-code-governance.md`
6. `05-decisions/` 下已接受的 Product Decision / ADR
7. `01-product/prd/` 下 active PRD
8. `02-roadmap/backlog/` 下 active backlog
9. `03-architecture/contracts/` 下 active contract
10. `07-evals/` 下 active eval pack
11. AI_DB_GPT canonical context 和 accepted ADR
12. AI_DB_GPT research / inspiration
13. `idealization/5月/` 历史材料

ProductFactory 可以提供产品判断和先例，但不是 t-agent 项目事实源。

## 5.1 知识库能力事实

t-agent 工作台需要把知识更新作为产品能力建设，而不是只靠聊天回答或零散文档。

当前接受的能力定义：

```text
Knowledge Base Capability
  = Docs-as-code governance
  + resident agent routing
  + productivity skill pairing
  + source / evidence / decision gates
  + self-improvement loop
  + eval coverage
```

默认规则：

- 随机 Codex section 更新、外部链接、repo、用户纠正、失败样例、重复 workflow，先按 `06-iteration/docs-as-code-governance.md` 分类。
- `grill-me`、`handoff`、`write-a-skill`、`teach`、`self-improvement` 等 productivity skills 必须按 `09-agents/productivity-skills-integration.md` 搭配 resident agents。
- self-improvement 是 review-gated 学习闭环，不能自动修改 accepted truth。
- 任何改变产品方向、架构边界或验收标准的知识更新，必须同步 PDR/ADR、backlog 或 eval。

## 6. 已降级材料

以下材料是历史或候选输入，不是当前 V2 权威：

- `01-product/prd/PRD-V2-sales-operating-analysis.md`
- `05-decisions/product-decisions/PDR-2026-06-15-v2-sales-operating-wedge.md`
- `07-evals/golden-questions/V2-sales-operating-golden-questions.md`
- `06-iteration/reports/2026-06-15-t-agent-ai-team-sync-plan.md`
- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`
- `idealization/5月/gather/v2/v2迭代方向.md`

使用这些材料前，必须先检查当前 SSOT。

## 7. Agent 操作规则

在做产品、路线图、PRD、架构、eval 或 agent-routing 工作前：

1. 读取本文件。
2. 读取 `02-roadmap/t-agent-roadmap.md`。
3. 读取 `09-agents/expert-style-guide.md`。
4. 读取与任务最相关的窄文档。
5. 如果工作涉及 roadmap 可行性、人员配置、实施范围、企业化准备或 V2/V3/V4 交付，并且依赖 AI_DB_GPT，读取 `04-sources/ai-dbgpt/project-baseline-index.md`，把 AI_DB_GPT 视为已有毛坯 / 半成品代码基座，而不是从零开始。
6. 如果涉及 AI_DB_GPT 材料，先刷新来源索引：

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\ai-dbgpt\update-ai-dbgpt-source-index.ps1
```

7. 如果结论改变产品方向，更新或新增 Product Decision。
8. 如果改变版本含义，同步更新本文件和 `02-roadmap/t-agent-roadmap.md`。
9. 如果改变承诺范围，同步更新 PRD 和 backlog。
10. 如果改变验收标准，同步更新 eval coverage。
11. 如果改变写作/专家风格标准，同步更新 `09-agents/expert-style-guide.md`。
12. 如果改变知识库写入、晋升、learning 或 productivity skill 搭配规则，同步更新 `03-architecture/knowledge-base-capability-blueprint.md`、`06-iteration/docs-as-code-governance.md`、`09-agents/productivity-skills-integration.md` 和相关 eval。

## 8. 当前下一步

下一批最重要的产物是：

1. V2 Reality PRD：围绕 AI_DB_GPT / ChatReport 基座，定义下一轮平台化和真实业务质量关闭。
2. V2 domain-neutral eval pack：覆盖 Dataset Learning、Knowledge Base、ChatBI Adapter、ChatExcel 单文件 / 单表分析报告。
3. ChatReport 可信分析工作台 flow：展示 run、plan、artifact、evidence、warning、eval、reviewer decision。
4. 平台对象 gap map：Dataset、SourceRef、AnalysisRun、Artifact、Evidence、Eval。
5. V3 report / dashboard eval plan。
6. V4 governance 与 action-control 架构说明。
7. Knowledge Base Capability KB-1：把 docs-as-code、learning、productivity skills 和 eval 串成可反复运行的团队工作流。

## 9. Git 边界

除非用户明确要求，不要 push 到 GitHub。

保护用户已有工作区变更。不要 reset、revert 或覆盖不相关改动。
