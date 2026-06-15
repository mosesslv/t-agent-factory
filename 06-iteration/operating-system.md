# t-agent 迭代操作系统

## 1. 当前状态

当前工作空间已经完成：

- Git 根目录基线。
- 产品 brief。
- 路线图。
- 能力地图。
- 来源登记。
- V2 SSOT 和新 V2 PRD skeleton。
- 数据契约初稿。
- 销售经营候选黄金问题集。
- 常驻产品 agents 初版。
- Docs-as-code 知识库治理规范。
- Knowledge Base Capability 蓝图、productivity skills 搭配协议和 self-improvement protocol。

当前阶段：

> V2 SSOT 对齐阶段：从历史销售经营试点口径转向 Dataset Learning、Knowledge Base、ChatBI Adapter、ChatExcel 单文件/单表分析报告的 PRD / contract / eval / backlog / agent review。

现实执行 overlay：

> 2026 H2 先按 `02-roadmap/t-agent-reality-roadmap-2026-h2.md` 推进，把 AI_DB_GPT / ChatReport 里的垂直试点固化成团队可执行的 Trusted Analysis Platform Beta，而不是直接承诺完整 V2/V3/V4 全量完成。

## 2. 标准流转

```text
输入材料
  -> 04-sources/source-register.md
  -> evidence-card
  -> product decision / ADR
  -> PRD / roadmap / contract / eval
  -> agent review
  -> iteration log
  -> git commit
```

知识库能力相关议题的最小流转：

```text
随机 Codex section / 外部链接 / 用户纠正 / 失败样例 / 重复 workflow
  -> 06-iteration/docs-as-code-governance.md
  -> resident agent routing
  -> inbox / source-register / learning / review-queue
  -> evidence-card / roundtable
  -> PDR / ADR / PRD / contract / eval / backlog
  -> git diff / iteration log
```

Reality roadmap 相关议题的最小流转：

```text
AI_DB_GPT baseline / 用户补充
  -> 04-sources/ai-dbgpt/project-baseline-index.md
  -> 02-roadmap/t-agent-reality-roadmap-2026-h2.md
  -> 05-decisions/product-decisions/
  -> 01-product/prd/
  -> 03-architecture/contracts/
  -> 07-evals/
  -> 02-roadmap/backlog/
```

## 3. 文档晋升规则

| 来源状态 | 可以进入 | 条件 |
|---|---|---|
| raw idea | review queue | 记录来源和问题 |
| source | evidence-card | 有明确出处和结论 |
| evidence | decision | 影响产品方向 |
| decision | PRD / roadmap | 已接受 |
| PRD | backlog / eval | 有验收项 |
| eval | release | 有结果记录 |
| learning | protocol / skill / eval | 有复现、边界和 review gate |

## 4. 常驻 agents 参与点

| 阶段 | 推荐 agent |
|---|---|
| 来源进入 | Knowledge Librarian |
| 产品收敛 | Product Lead, User Research |
| 数据契约 | Data Product, Agent Architect |
| 评测设计 | Eval Lead |
| 方案风险 | Red Team |
| grill-me 压测 | Red Team, Product Lead, Eval Lead |
| skill 固化 | Agent Architect, Knowledge Librarian, Eval Lead |
| self-improvement | Knowledge Librarian, Eval Lead, Red Team |
| 版本发布 | Product Lead, Knowledge Librarian |

## 5. 每周维护动作

- 更新 backlog 状态。
- 检查 review queue。
- 补充 evidence-card。
- 检查 PRD 是否有对应 eval。
- 检查 ADR / PDR 是否有对应执行文档。
- 检查 `06-iteration/learnings/` 是否有需要晋升的重复问题。
- 检查 productivity skills 是否被正确落到 roundtable、eval、backlog 或 local skill。
- 运行 `python3 scripts/knowledge-base/eval-kb-capability.py` 检查知识库能力基础链路。
- 提交 Git。
