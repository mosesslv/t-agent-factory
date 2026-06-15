---
id: adr-20260609-003
type: decision-record
topic: agent-harness-skill-system
status: accepted
created: 2026-06-09
updated: 2026-06-09
source_sessions:
  - ws-20260609-001
supersedes: []
---

# ADR：下一阶段不把专家系统升级理解为“写更多人设 prompt”，而是逐步把高频专家协作升级为可评测 harness。

## 背景

本决策来自 `真正的 Agent harness 思想` 的工作台沉淀候选。

## 决策

1. 下一阶段不把专家系统升级理解为“写更多人设 prompt”，而是逐步把高频专家协作升级为可评测 harness。
2. 不把 Claude Code 的 skills 结构直接作为本地标准；本地标准应抽象为跨 runtime 的 harness contract。
3. 第一个 POC harness 应选择已有工作流中高频、可验证、边界清晰的角色，例如知识编辑专家或红蓝攻防研讨。
4. 没有 baseline、eval 或 human review artifact 的专家能力，不应宣称已经形成可复用 harness。

## 影响

- `_workbench/` 保留研讨过程。
- `主题库/` 只接收确认后的正式知识。
- Promote 必须显式确认，并保留来源 session。

## 回退方式

- 通过 Git revert 回退本次 promote 提交。
- 如知识判断过时，优先标记 deprecated，而不是删除历史。

## 来源

- [[_workbench/distillations/2026-06-09-真正的-Agent-harness-思想-沉淀候选]]
