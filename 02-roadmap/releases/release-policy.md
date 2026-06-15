# t-agent Release Policy

## 1. 产品版本与 Git 的关系

Git commit 记录文件变化，产品版本记录产品承诺。

推荐：

- Git branch: `main`, `docs/*`, `research/*`, `prd/*`, `agents/*`
- Git tag: 只在形成稳定产品工作区版本时使用，例如 `workspace-v0.1`
- Product version: `V1 MVP`, `V2 Pilot`, `V3 Enterprise`

## 2. Release Note 最低内容

每次产品版本发布需要一个 release note：

```text
02-roadmap/releases/YYYY-MM-DD-vX-name.md
```

包含：

- 版本目标
- 本次新增/更新文档
- 关键决策
- 验收状态
- 未解决问题
- 下一轮入口

## 3. 提交粒度

建议 commit message：

- `docs: add V2 sales operating PRD`
- `decision: record V2 wedge decision`
- `eval: add V2 golden questions`
- `agents: add resident product agent roster`
- `architecture: add dataset and run contracts`

避免：

- 把来源、PRD、ADR、eval、agent profiles 混在一个没有主题的提交里。
- 修改历史材料又不更新 source register。
- 没有说明原因地移动旧目录。

