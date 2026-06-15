---
type: product-decision
status: accepted
decision: build
created: 2026-06-15
updated: 2026-06-15
topic: knowledge-base-capability
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 09-agents/productivity-skills-integration.md
  - 09-agents/self-improvement-protocol.md
  - 07-evals/golden-questions/knowledge-base-capability-golden-questions.md
---

# PDR-2026-06-15: Knowledge Base Capability

## Decision

`build`

把 docs-as-code、resident agents、productivity skills、source/evidence/decision gates 和 self-improvement loop 建设成 t-agent 工作台的一项知识库能力。

不要只把它当成文档规范，也不要直接做成无人值守自动更新系统。

## Why

当前项目已经有 `inbox`、`review-queue`、`source-register`、evidence cards、PDR/ADR、evals 和 agent router，但缺少一条明确能力链：

```text
随机输入 / 外部链接 / 用户纠正 / 失败样例 / 重复 workflow
  -> 分类
  -> resident agent routing
  -> 正确写入
  -> review gate
  -> eval
  -> 晋升为项目资产
```

如果不建设这项能力，后续知识库会继续依赖聊天记忆和人工感觉，无法支撑企业级 Data Agent 的长期迭代。

## Scope

本次接受的能力范围：

- docs-as-code 知识更新规范；
- resident agents 对知识更新的默认路由；
- `grill-me`、`handoff`、`write-a-skill`、`self-improvement` 等 productivity skills 的搭配协议；
- learning event 和 promotion path；
- local `.agents/skills/t-agent-knowledge-base-capability/`；
- knowledge-base capability golden questions；
- backlog 和 source register 对齐。

## Non-goals

- 不建设完整 UI。
- 不自动监听所有聊天或文件变化。
- 不把外部 skills 仓库作为运行时依赖。
- 不把 ProductFactory 变成 t-agent 项目事实源。
- 不允许 self-improvement 自动修改 accepted truth。

## Acceptance

- 有可引用的 architecture blueprint。
- 有可执行的 docs-as-code governance。
- 有 productivity skills 与 resident agents 的搭配协议。
- 有 self-improvement protocol。
- 有 local skill 入口。
- 有 eval cases。
- 有 backlog items。
- `agent.md`、`AGENTS.md`、router、source register 已链接。

## Review Date

2026-06-30
