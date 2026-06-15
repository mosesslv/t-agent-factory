# t-agent Factory

本目录是 t-agent / 企业级 Data Agent 的产品建设工作空间。

当前工作方式：

- `00-入口.md` 是后续 Codex / Obsidian / 人工协作的第一入口。
- 重要文档默认使用中文，并按 `09-agents/expert-style-guide.md` 执行专家风格、来源标注和图示要求。
- `01-product/` 存放产品定义、边界、用户和验收。
- `02-roadmap/` 存放版本规划、阶段目标和非目标。
- `03-architecture/` 存放能力地图、对象模型和技术边界。
- `04-sources/` 存放历史材料登记、来源分类和关联。
- `05-decisions/` 存放 ADR 和工作空间治理决策。
- `06-iteration/` 存放后续需要融合的新建设方向。
- `07-evals/` 存放黄金问题、失败样例和评测运行记录。
- `08-design-prototypes/` 存放流程、页面、demo 和原型资料。
- `09-agents/` 存放常驻产品 agents、agent harness 规范和评测。
- `.agents/skills/` 存放可被 Codex 触发的本地工作流入口。
- `idealization/5月/` 是 2026 年 5 月以来的历史输入和知识工作台材料，暂不搬迁。

## 当前核心判断

t-agent 不应被定义为一个聊天入口、Text2SQL 工具或 DB-GPT 改造项目，而应定义为：

> 企业级数据分析 Agent 平台：把数据资产上下文、语义与指标上下文、分析应用矩阵、技能沉淀体系、知识资产体系和运行评估闭环组织成可运营、可治理、可复用的智能分析产品。

## 快速入口

- [[00-入口]]
- [[agent]]
- [[01-product/t-agent-product-brief]]
- [[01-product/product-team-operating-model]]
- [[02-roadmap/t-agent-roadmap]]
- [[02-roadmap/t-agent-reality-roadmap-2026-h2]]
- [[09-agents/expert-style-guide]]
- [[03-architecture/knowledge-base-capability-blueprint]]
- [[06-iteration/docs-as-code-governance]]
- [[06-iteration/views/knowledge-base-capability.base]]
- [[09-agents/productivity-skills-integration]]
- [[09-agents/self-improvement-protocol]]
- [[03-architecture/diagrams/reality-roadmap-operating-architecture]]
- [[01-product/prd/PRD-V2-platform-capability-and-entry-apps]]
- [[02-roadmap/backlog/product-backlog]]
- [[03-architecture/capability-map]]
- [[03-architecture/contracts/dataset-contract-v0]]
- [[03-architecture/contracts/run-artifact-contract-v0]]
- [[04-sources/source-register]]
- [[05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot]]
- [[05-decisions/product-decisions/PDR-2026-06-15-v2-sales-operating-wedge]]
- [[06-iteration/fusion-directions]]
- [[06-iteration/operating-system]]
- [[07-evals/golden-questions/knowledge-base-capability-golden-questions]]
- [[07-evals/eval-runs/2026-06-15-knowledge-base-capability-eval-run]]
- [[07-evals/golden-questions/V2-sales-operating-golden-questions]]
- [[09-agents/README]]

## 本地验证

```bash
python3 scripts/knowledge-base/eval-kb-capability.py
```
