---
type: roundtable
status: accepted
created: 2026-06-15
updated: 2026-06-15
topic: knowledge-base-capability-and-productivity-skills
decision: build
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 09-agents/productivity-skills-integration.md
  - 09-agents/self-improvement-protocol.md
---

# 2026-06-15 Roundtable: 知识库能力与 Productivity Skills 搭配

## 1. Context

用户提出的问题不是“有没有一份 docs-as-code 规范”，而是：

> t-agent / DAgent 工作台能否把随机议题、Codex section 更新、外部来源、agent 评审、错误纠正和 productivity skills 组织成一项可持续建设的知识库能力。

本轮采用 resident agents roundtable 收敛，不把结果停留在聊天回答。

## 2. Source List

### project evidence

- `agent.md`: 当前项目 SSOT、中文默认、版本权威顺序。
- `06-iteration/operating-system.md`: 已有 Source -> Evidence -> Decision -> PRD -> Contract -> Eval -> Release 流程。
- `06-iteration/inbox/README.md`: rough / conflicting ideas 的入口。
- `06-iteration/review-queue/README.md`: 候选内容晋升路径。
- `09-agents/default-router.md`: 默认 resident agent 路由。
- `09-agents/roundtable-protocol.md`: roundtable 输出格式和证据纪律。

### ProductFactory evidence

- `17 Review Queue/openai-codex-skills.md`: Codex skills 作为可复用工作流候选。
- `17 Review Queue/openai-codex-subagents.md`: 子 agent / 分工模式候选。
- `17 Review Queue/openai-codex-memories.md`: 长期记忆和项目上下文候选。
- `16 Source Registry/外部思想源注册表.md`: 外部来源应先进 registry / review queue，不自动成为正式知识。
- `10 Research/2026-06-13 ProductFactory 接入架构研判.md`: ProductFactory = portable skills + Obsidian memory + bridge + per-project agent contract。

### external evidence

- OpenAI Cookbook: Agent improvement loop, https://cookbook.openai.com/examples/agents_sdk/agent_improvement_loop
- Anthropic: Building effective agents, https://www.anthropic.com/engineering/building-effective-agents
- Write the Docs: Docs as Code, https://www.writethedocs.org/guide/docs-as-code/
- Diataxis: documentation structure, https://diataxis.fr/
- peterskoett self-improving-agent, https://github.com/peterskoett/self-improving-agent/blob/master/SKILL.md
- Matt Pocock productivity skills, https://github.com/mattpocock/skills/tree/main/skills/productivity

## 3. Agent Positions

| Seat | Position |
|---|---|
| Product Lead | 这应定义为“Knowledge Base Capability for Product Iteration”，不是文档整理任务。最小产品价值是让 PM 和研发能把零散讨论变成可评审、可验收、可复用的项目资产。 |
| User Research | 高频用户是 AI 产品负责人、AI PM、Agent 研发、后端、知识编辑。痛点是随机讨论无法沉淀，下一次 Codex 不知道哪些是事实、候选、废弃或待验收。 |
| Knowledge Librarian | 必须建立来源状态、写入目标、晋升路径和冲突处理。任何随机 Codex 更新不能直接改 canonical truth，除非有 decision / eval / reviewer gate。 |
| Agent Architect | `grill-me`、`handoff`、`write-a-skill`、`teach` 不是玩具技能，应绑定 resident agents 和输出物。需要项目内 local skill 作为触发入口。 |
| Eval Lead | 能力要有 golden questions：给一个外部链接、用户纠正、失败样例或 PRD 变更时，系统是否会进入正确目录、生成正确证据、触发正确 agent、更新 eval。 |
| Red Team | 最大风险是“self-improve”变成自动污染知识库。必须保持候选优先、人工 review、Git diff 可审计、无后台自动写入。 |

## 4. Agreements

- Decision: `build`
- Product shape: 建设一项“知识库能力”，覆盖 intake、source、evidence、decision、PRD/contract/eval、learning、skill promotion。
- 不直接引入外部仓库作为运行依赖；先吸收其操作模式。
- Productivity skills 的定位是 resident agents 的协作模式，不是替代 resident agents。
- Self-improvement 必须是 human-led 和 review-gated。

## 5. Main Disagreement

| Disagreement | Resolution |
|---|---|
| 要不要把 `.learnings/` 放在根目录 | 暂不照搬外部仓库。t-agent 采用 `06-iteration/learnings/`，因为它是产品工作台的一部分，并可接入 review queue / source register / eval。 |
| 要不要马上做自动监听 / hooks | 不做。当前项目使用 `AGENTS.md` 和 local skills 作为显式触发，不创建全局后台自动化。 |
| Productivity skills 是否进入 Adopt now | `grill-me`、`handoff`、`write-a-skill` 进入 Adopt now 的协作协议；`teach` 进入 Trial；`caveman` 只作为低 token 沟通模式，默认不用于正式文档。 |

## 6. Product Committee Decision

`build`

建设一个可被 Codex / resident agents / 产品团队持续使用的知识库能力：

```text
Knowledge Base Capability
  = Docs-as-code governance
  + resident agent routing
  + productivity skill pairing
  + source / evidence / decision gates
  + learning and self-improvement loop
  + eval coverage
```

## 7. Non-goals

- 不把 t-agent 变成通用个人知识库。
- 不自动把所有聊天内容写入正式文档。
- 不创建全局 hooks、后台监听或跨项目自动写入。
- 不把外部 productivity skills 原样搬进项目并默认运行。
- 不绕过 `agent.md`、roadmap、PDR/ADR 和 eval。

## 8. Required Updates

- 新增 `03-architecture/knowledge-base-capability-blueprint.md`。
- 新增 `06-iteration/docs-as-code-governance.md`。
- 新增 `09-agents/productivity-skills-integration.md`。
- 新增 `09-agents/self-improvement-protocol.md`。
- 新增 `07-evals/golden-questions/knowledge-base-capability-golden-questions.md`。
- 新增 `.agents/skills/t-agent-knowledge-base-capability/SKILL.md`。
- 更新 `agent.md`、`AGENTS.md`、`09-agents/default-router.md`、`02-roadmap/backlog/product-backlog.md` 和来源登记。

## 9. Acceptance Check

给定任意一个用户输入：

```text
我看到一个新的 agent skill / 外部 repo / PRD 纠偏 / 失败案例，帮我放进项目。
```

Codex 应能：

1. 读取 `agent.md`。
2. 判断它是 raw idea、source、evidence、decision、PRD、contract、eval 还是 learning。
3. 选择 Knowledge Librarian + Product Lead / Agent Architect / Eval Lead / Red Team。
4. 把内容写入正确位置，不污染 canonical truth。
5. 必要时使用 `grill-me` 压测、`handoff` 交接、`write-a-skill` 提炼、`self-improvement` 记录学习。
6. 产出可审计 diff 和明确验收。
