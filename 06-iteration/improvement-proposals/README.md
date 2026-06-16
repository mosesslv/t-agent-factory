---
type: proposal-index
status: active
created: 2026-06-16
updated: 2026-06-16
related:
  - 09-agents/feedback-driven-improvement-protocol.md
  - 06-iteration/templates/improvement-proposal.md
---

# Improvement Proposals

本目录存放用户反馈驱动的改进提案。

适用范围：

- 回答风格；
- resident agent 路由；
- local skill 触发条件或工作流；
- 项目默认行为；
- eval 缺口；
- 文档治理规则。

使用规则：

1. 每个 proposal 只修改一个目标文件。
2. 必须包含 `original_snippet` 和 `proposed_snippet`。
3. `original_snippet` 必须在目标文件中唯一出现。
4. 没有明确 approval，不得应用到 `agent.md`、`AGENTS.md`、roadmap、PRD、ADR、contract、eval 或 local skill。
5. 影响默认行为、skill、协议或验收的 proposal，必须声明应运行的 eval。

标准模板见 `06-iteration/templates/improvement-proposal.md`。
