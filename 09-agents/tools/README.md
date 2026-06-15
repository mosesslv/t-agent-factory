# Agent Tools

这里记录常驻产品 agents 可使用或建议使用的工具契约。

当前先只做文档级工具登记，不实现 runtime。

工具分层：

- `read`: 读取工作空间文档、Git 状态、来源索引。
- `index-write`: 更新 source register、review queue、iteration log。
- `product-write`: 更新 PRD、roadmap、backlog。
- `decision-write`: 新增 Product Decision 或 ADR。
- `eval-write`: 更新黄金问题、失败样例和 eval run。

任何写入 accepted 文档的动作都需要明确任务意图。

