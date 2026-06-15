# ADR-2026-06-15：将当前根目录作为 t-agent 产品建设工作空间

## Status

Accepted

## Context

此前主要在 `idealization/5月/` 作为 Codex 项目和知识工作台进行建设，形成了企业 Data Agent、DB-GPT 改造、ChatExcel、ChatBI、ChatReport、Agent Harness、ToolSearch 和知识更新机制等大量材料。

当前用户明确：本目录本质上是关于 Data Agent 的单独建设产品工作空间。

## Decision

从 2026-06-15 起：

- `D:\Users\Desktop\项目\项目\知识库\working\notes\D-agents` 作为 t-agent / 企业级 Data Agent 的根工作空间。
- `idealization/5月/` 保留为历史输入源和归档区。
- 后续 Codex 项目应直接打开根目录，而不是继续把 `idealization/5月/` 作为主项目。
- 根目录新增产品、路线图、架构、来源和决策目录。
- Git 仓库在根目录初始化，并关联远端 `https://github.com/mosesslv/t-agent-factory.git`，但本次不 push。

## Why

1. 产品工作空间应该承载当前版本、路线图、决策和来源索引；`5月` 是时间切片，不适合作为长期产品根。
2. 继续在 `5月` 下迭代会把历史月份、当前产品、未来版本混在一起。
3. 根目录建仓后，Windows 和 Mac 端都可以在同一产品根路径下提交，避免子目录 Git 边界混乱。
4. 保留旧目录不搬迁，可以降低破坏历史链接和 Obsidian 链接的风险。

## Consequences

- 可以关闭或删除 Codex 里旧的“5月”项目入口，后续统一打开根目录。
- 不建议删除磁盘上的 `idealization/5月/`，因为它仍是来源材料。
- 若 Mac 端同步到本地，只要从根目录执行 `git status` / `git add` / `git commit`，提交范围就是完整 t-agent workspace。

