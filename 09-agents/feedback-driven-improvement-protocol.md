---
type: agent-protocol
status: accepted
created: 2026-06-16
updated: 2026-06-16
related:
  - 09-agents/self-improvement-protocol.md
  - 09-agents/productivity-skills-integration.md
  - 06-iteration/templates/improvement-proposal.md
  - 06-iteration/improvement-proposals/README.md
---

# t-agent Feedback-Driven Improvement Protocol

## 1. 目的

本协议定义 t-agent 如何从日常对话里的正向反馈、负向反馈、纠偏和重复偏好中逐步改进风格体系、resident agents、local skills 和 eval。

目标不是让 agent 偷偷重写自己，而是：

```text
FeedbackSignal
  -> immediate behavior adaptation
  -> learning event
  -> improvement proposal
  -> review / approval
  -> eval
  -> promoted rule / skill / style update
```

## 2. FeedbackSignal 分类

| 信号 | 例子 | 立即动作 | 持久化动作 |
|---|---|---|---|
| negative correction | “你又讲技术清单了，我要用户视角” | 立即改用用户/产品视角回答 | 记录 learning event；若重复或高影响，生成 proposal |
| positive reinforcement | “这个结构很好，以后都这样” | 当前会话继续采用该结构 | 记录 learning event；若用户说“以后”或重复出现，生成 proposal |
| preference drift | 用户多次偏好短、中文、具象、会议材料 | 调整当前输出风格 | 汇总为 style proposal |
| skill routing miss | 应该 grill-me / handoff / source intake 却没触发 | 当前补跑正确流程 | 生成 skill/protocol proposal |
| eval failure | KB eval 或人工验收失败 | 修正当前产物 | 生成 failure case + proposal |

## 3. 改进目标

| 反馈影响对象 | 默认改哪里 | 例子 |
|---|---|---|
| 回答风格 | `09-agents/expert-style-guide.md` | 更中文、更具象、更像产品负责人 |
| 项目默认行为 | `agent.md` 或 `AGENTS.md` | 路线图问题先给团队对齐视角 |
| agent 人设 / 分工 | `09-agents/profiles/` 或 `09-agents/default-router.md` | Red Team 必须先问验收和风险 |
| local skill | `.agents/skills/<skill>/SKILL.md` | knowledge-base skill 增加触发条件 |
| eval | `07-evals/` | 新增“用户纠偏后是否生成 proposal”检查 |
| 模板 / checklist | `06-iteration/templates/` | 增加 improvement proposal 模板 |

## 4. Proposal 规则

借鉴 BerriAI `self-improving-agent` 的安全形态，t-agent 的持久化改进默认先生成 proposal，不直接 apply。

每个 proposal 必须包含：

- `target_file`: 要改的 repo-relative path；
- `original_snippet`: 目标文件中唯一出现的原文；
- `proposed_snippet`: 替换内容；
- `reason`: 1-3 句，说明反馈、失败模式和修复；
- `risk`: `low | medium | high`；
- `feedback_source`: 触发反馈；
- `approval_state`: `proposed | approved | rejected | applied`；
- `eval_required`: 是否需要跑 eval。

约束：

- 一次 proposal 只改一个文件。
- `original_snippet` 必须精确且唯一。
- 没有明确批准时，不能把 proposal 自动应用到 accepted truth。
- 如果只是当前会话表达偏好，可以立即适配回答，但不要永久写规则。

## 5. 自动化边界

允许自动做：

- 识别反馈信号；
- 当前会话即时调整；
- 记录 learning event；
- 生成 improvement proposal；
- 提醒应运行的 eval；
- 把 proposal 放入 review queue 或 `06-iteration/improvement-proposals/`。

不允许自动做：

- 未经批准修改 `agent.md`、`AGENTS.md`、roadmap、PRD、contract、eval；
- 把一次正向反馈改成永久规则；
- 写入 secret、token、完整聊天记录或敏感日志；
- 用外部 GitHub token 自动开 PR，除非用户明确配置并批准。

## 6. Productivity Skills 搭配

| 模式 | 用法 |
|---|---|
| `grill-me` | 对 improvement proposal 做红队追问：这个规则会不会过拟合一次反馈？ |
| `handoff` | 长周期改进或跨会话时，把反馈、proposal、相关文件和未决问题交接出去。 |
| `write-a-skill` | 某类反馈反复出现时，把处理流程固化成 local skill。 |
| `self-improvement` | 记录 learning event，生成 proposal，等待 review gate。 |

## 7. 最小触发语

应触发本协议：

- “以后都这样”
- “别再这样回答”
- “你刚才这个方式很好”
- “你总是漏掉 X”
- “这类问题以后自动做 X”
- “这不是我要的视角”
- “把这个变成默认”

不应触发本协议：

- 普通产品反馈，例如“这个功能用户可能不用”；
- 对业务方案的反对；
- 单次闲聊夸奖；
- 没有指向 agent 行为、风格、skill、路由、工具或工作流的反馈。
