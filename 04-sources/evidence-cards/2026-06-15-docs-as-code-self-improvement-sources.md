---
type: evidence-card
status: accepted
topic: docs-as-code-self-improvement
created: 2026-06-15
updated: 2026-06-15
confidence: medium
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 09-agents/self-improvement-protocol.md
---

# Docs-as-Code 与 Self-Improvement 来源证据卡

## 1. 结论摘要

t-agent 可以借鉴 docs-as-code、agent improvement loop、skills 和 learning logs，但必须增强为企业级产品工作台能力。

推荐路线：

```text
docs-as-code discipline
  + resident agent routing
  + source / evidence / decision gates
  + productivity skill pairing
  + eval-based learning loop
```

## 2. ProductFactory Sources

| 来源 | 状态 | 对本项目的启发 |
|---|---|---|
| `17 Review Queue/openai-codex-skills.md` | candidate | skills 适合作为可复用工作流，不适合承载所有项目事实。 |
| `17 Review Queue/openai-codex-subagents.md` | candidate | resident agents 可以逐步走向可执行 subagent，但当前先用 routing + protocol。 |
| `17 Review Queue/openai-codex-memories.md` | candidate | memory 有价值，但不能替代项目 SSOT 和 Git 记录。 |
| `16 Source Registry/外部思想源注册表.md` | formal | 外部思想源应先进 registry/review queue，再经过 evidence card 和 review。 |
| `10 Research/2026-06-13 ProductFactory 接入架构研判.md` | formal | ProductFactory 是跨项目产品判断能力包；t-agent 是本项目事实工作区。 |

## 3. External Sources

| 来源 | 类型 | 启发 |
|---|---|---|
| OpenAI Cookbook Agent improvement loop: https://cookbook.openai.com/examples/agents_sdk/agent_improvement_loop | official / cookbook | agent 改进应由 trace、评测、人工判断和回归组成，不是盲目自动改 prompt。 |
| Anthropic Building effective agents: https://www.anthropic.com/engineering/building-effective-agents | official / engineering | 先用简单、可组合、可观察的 patterns，再在需要时增加复杂 agent。 |
| Write the Docs Docs as Code: https://www.writethedocs.org/guide/docs-as-code/ | community guide | 文档可用代码工作流管理：版本、review、issue、自动化和发布。 |
| Diataxis: https://diataxis.fr/ | documentation framework | 文档应区分 tutorials、how-to、reference、explanation，避免所有材料混成一个知识堆。 |
| Microsoft Learn contributor guide: https://learn.microsoft.com/en-us/contribute/content/ | official | 文档贡献需要 Markdown、metadata、review 和可发布规范。 |
| Google developer documentation style guide: https://developers.google.com/style | official | 技术文档需要一致术语、清晰句子和面向用户任务的表达。 |
| peterskoett self-improving-agent: https://github.com/peterskoett/self-improving-agent/blob/master/SKILL.md | open-source | 错误、用户纠正、缺失能力、外部工具失败应记录为 learnings，并谨慎晋升。 |
| Matt Pocock productivity skills: https://github.com/mattpocock/skills/tree/main/skills/productivity | open-source | `grill-me`、`handoff`、`write-a-skill` 等可作为 agent 协作模式，而不是产品事实源。 |

## 4. Evidence

- t-agent 已有 source register、evidence cards、PDR/ADR、review queue、agent router 和 eval 目录，具备 docs-as-code 能力的基础。
- 外部 `self-improving-agent` 强调学习日志和晋升路径，但缺少 t-agent 所需的产品决策、source/evidence 和 eval gate。
- Productivity skills 适合成为 resident agents 的协作工具：压测、交接、固化 skill、教学。

## 5. Assumption

- 产品团队后续会持续以 Codex section、外部 repo、口头纠正和方案草稿的形式输入材料。
- 当前阶段 Markdown + Git + resident agents + local skills 足以支撑 KB-0 / KB-1，不需要先开发 UI。

## 6. Unknown

- 团队是否会把 GitHub Issues / Projects 作为正式 backlog 系统。
- 后续知识库能力是否需要连接 Obsidian Bases / Canvas 形成 dashboard。
- 真实研发环境中 local `.agents/skills` 的触发效果还需要多轮使用验证。

## 7. 建议

1. 立即采用 docs-as-code governance 和 productivity skill pairing。
2. 把 self-improvement 限制在 learning event -> review -> eval -> promotion。
3. 将“知识库能力”纳入 backlog 和 eval，而不是只作为文档规范。
