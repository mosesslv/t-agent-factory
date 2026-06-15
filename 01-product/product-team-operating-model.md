# t-agent 产品团队工作方式

## 1. 当前项目阶段判断

基于当前 `D-agents` 根目录和上一层 `CC-Learn` 的实施状态，t-agent 当前不应被视为“工程开发中后期”，而应被视为：

> 产品定义已形成、历史材料已归档、正进入 V2 SSOT 对齐后的 PRD / 数据契约 / 评测基线建设阶段。

证据：

- `D-agents` 已有产品 brief、路线图、能力地图、来源登记和 workspace ADR。
- `02-roadmap/t-agent-roadmap.md` 已成为 V1/V2/V3/V4 single source of truth。
- `idealization/5月/` 已沉淀了 Data Agent、DB-GPT、ChatExcel、ChatBI、ChatReport、Agent Harness、ToolSearch 等历史材料。
- 上一层 `CC-Learn` 已实施出一套可迁移的知识库治理模式：`product / technology / agent-harness` 三库分离、inbox draft、dimension registry、proposal、promote、graph health。

因此本工作空间下一阶段不是继续扩写概念，而是把材料转成可被产品团队执行和复盘的资产：

```text
Source -> Evidence -> Decision -> PRD -> Contract -> Eval -> Release -> Iteration Log
```

## 2. 产品团队视角的目录职责

| 目录 | 谁主要使用 | 管什么 | 不管什么 |
|---|---|---|---|
| `01-product/` | 产品负责人、PM、业务分析 | 产品定义、PRD、用户、场景、术语 | 技术实现细节 |
| `02-roadmap/` | 产品负责人、项目负责人 | 版本路线、backlog、release | 长篇研究材料 |
| `03-architecture/` | 架构、研发、Agent 工程 | 能力地图、对象契约、集成边界 | 用户故事 |
| `04-sources/` | PM、研究、知识编辑 | 来源登记、证据卡、竞品材料 | 未标来源的结论 |
| `05-decisions/` | 产品委员会、架构委员会 | Product Decision、ADR | 日常想法 |
| `06-iteration/` | 所有人 | 本轮迭代日志、review queue、融合方向 | 已确认正式需求 |
| `07-evals/` | PM、QA、数据团队、Agent 工程 | 黄金问题、失败样例、评测结果 | 纯产品叙事 |
| `08-design-prototypes/` | 产品、设计、前端 | 用户流程、页面草图、demo | 正式架构契约 |
| `09-agents/` | 产品负责人、Agent 管理者 | 常驻 agents、系统知识、工具、评测 | 随意人设 prompt |
| `idealization/5月/` | 所有人只读参考 | 历史来源、旧工作台、旧材料 | 新主线迭代 |

## 3. 文档状态

每个稳定文档建议使用以下状态：

| 状态 | 含义 |
|---|---|
| `draft` | 初稿，可改动，不能作为团队承诺 |
| `review` | 已可评审，等待产品/架构/业务确认 |
| `accepted` | 已接受，当前版本按此执行 |
| `superseded` | 被新版本替代，保留历史 |
| `deprecated` | 明确废弃，不再使用 |

## 4. 产品文档类型

| 类型 | 位置 | 最低要求 |
|---|---|---|
| Product Brief | `01-product/` | 定义、用户、原则、主线、非目标 |
| PRD | `01-product/prd/` | 背景、用户、流程、功能、非目标、验收、风险 |
| Scenario | `01-product/users-and-scenarios/` | 角色、任务、频率、痛点、成功标准 |
| Backlog | `02-roadmap/backlog/` | Epic、Feature、优先级、版本、状态 |
| Release Note | `02-roadmap/releases/` | 版本、范围、变更、验证、遗留 |
| Contract | `03-architecture/contracts/` | 对象、字段、状态机、权限、引用关系 |
| Evidence Card | `04-sources/evidence-cards/` | 来源、结论、可信度、适用范围 |
| Product Decision | `05-decisions/product-decisions/` | build/narrow/research/kill、原因、风险、复查点 |
| ADR | `05-decisions/` | 架构或工作空间决策 |
| Eval Set | `07-evals/` | 问题、期望 SQL/答案、判断标准 |
| Agent Profile | `09-agents/profiles/` | 职责、触发条件、输入输出、工具、评测 |

## 5. 迭代节奏

建议每轮迭代只做一种主动作：

1. `research`：补来源和证据卡。
2. `shape`：更新产品定义、用户场景、PRD。
3. `decide`：新增 Product Decision 或 ADR。
4. `spec`：补数据契约、接口契约、验收集。
5. `review`：用常驻 agents 做产品/架构/评测/知识审查。
6. `release`：更新 release note 和 iteration log。

## 6. 每轮收尾清单

- `git status` clean 或说明未提交文件。
- 新来源进入 `04-sources/source-register.md` 或 evidence card。
- 影响产品方向的结论进入 `05-decisions/`。
- 影响交付的内容进入 PRD / backlog / contract / eval。
- 只是不确定想法的内容进入 `06-iteration/review-queue/`。
