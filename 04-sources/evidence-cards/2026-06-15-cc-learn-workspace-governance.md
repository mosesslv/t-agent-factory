---
type: evidence-card
status: accepted
updated: 2026-06-15
source: "../CC-Learn"
---

# Evidence：CC-Learn 工作空间治理可迁移经验

## 1. 观察

上一层 `CC-Learn` 不是临时笔记目录，已经实施成一个 Obsidian 兼容的工程 handbook：

- `knowledge/product/`
- `knowledge/technology/`
- `knowledge/agent-harness/`
- `raw/inbox/` 和 `inbox/pending/`
- `knowledge/inbox-drafts/`
- `knowledge/dimensions/registry.json`
- `knowledge/dimension-proposals/`
- `scripts/ingest-inbox.ps1`
- `scripts/promote-inbox-draft.ps1`
- `scripts/accept-dimension-proposal.ps1`

## 2. 对 t-agent 的启发

t-agent 不应只管理长文档，而应管理“产品资产流”：

```text
source -> evidence -> decision -> PRD -> contract -> eval -> release
```

可迁移设计：

- 使用稳定目录承载不同工作类型。
- 对新材料先进入候选/草稿，不直接变成正式结论。
- 对新分类通过 proposal 管理，避免目录膨胀。
- 用 graph / index / registry 让人和 Agent 都能找到当前状态。

## 3. 不直接照搬的地方

CC-Learn 是学习手册；t-agent 是产品建设工作空间。

因此 t-agent 的顶层维度不是 `product / technology / agent-harness` 三库，而是：

- Product
- Roadmap
- Architecture
- Sources
- Decisions
- Iteration
- Evals
- Design
- Agents

## 4. 结论

当前 t-agent 应进入“产品工作空间操作系统”阶段：建立 PRD、backlog、契约、eval、agent roster 和 review queue，而不是继续堆单篇总结。

