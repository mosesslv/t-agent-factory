# ADR-2026-06-15：在 t-agent 工作空间建立常驻产品 agents

## Status

Accepted

## Context

t-agent 是长期产品建设工作空间。后续会持续出现产品定位、PRD、架构、数据契约、证据、评测、路线图、用户场景等多类文档。

如果每次都临时让通用 Agent 重新理解上下文，会导致：

- 重复解释产品边界。
- 评审标准不稳定。
- 证据和决策容易脱节。
- 产品、架构、评测、知识治理混在一起。

## Decision

在 `09-agents/` 建立常驻产品 agents 体系。

常驻 agents 不是“人设 prompt”，而是轻量 harness：

- 明确职责。
- 明确触发条件。
- 明确输入输出。
- 明确可用知识。
- 明确可用工具。
- 明确评测和反触发条件。

## Initial Roster

- Product Lead Agent
- User Research Agent
- Data Product Agent
- Agent Architect Agent
- Eval Lead Agent
- Knowledge Librarian Agent
- Red Team Agent

## Non-goals

- 不建设复杂多 Agent runtime。
- 不让 agents 自动修改正式结论。
- 不把 agents 当作替代产品负责人或业务 owner。

## Consequences

- 后续 PRD、ADR、eval、source register 更新时可以指定 agent 角色审查。
- 每个 agent 的知识和工具边界可以逐步增强。
- 如果 agent profile 变更影响工作方式，需要更新本 ADR 或新增 ADR。

