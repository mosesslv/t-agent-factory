---
type: rehearsal-report
status: accepted
created: 2026-06-15
updated: 2026-06-15
scope: KB-1
related:
  - 06-iteration/inbox/2026-06-15-self-improving-agent-source-intake.md
  - 04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md
  - 09-agents/self-improvement-protocol.md
  - scripts/knowledge-base/eval-kb-capability.py
---

# KB-1 真实案例演练：self-improving-agent

## 1. 目标

验证 KB-1 能否把一个外部 repo 从用户输入转成项目资产，而不是只停留在聊天解释。

## 2. 输入

用户关注：

- `peterskoett/self-improving-agent`
- Matt Pocock `productivity` skills
- 如何让 DAgent / t-agent 产品工作台持续 self-improve
- 如何让这些能力成为知识库能力，而不是单次回答或文档

## 3. 运行路径

```text
external repo
  -> knowledge intake
  -> ProductFactory search
  -> evidence card
  -> resident-agent roundtable
  -> PDR
  -> protocol / local skill / eval
  -> eval runner
```

## 4. 实际产物

| 阶段 | 产物 | 结果 |
|---|---|---|
| intake | `06-iteration/inbox/2026-06-15-self-improving-agent-source-intake.md` | pass |
| source/evidence | `04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md` | pass |
| roundtable | `06-iteration/roundtables/2026-06-15-knowledge-base-capability-and-productivity-skills.md` | pass |
| decision | `05-decisions/product-decisions/PDR-2026-06-15-knowledge-base-capability.md` | pass |
| protocol | `09-agents/self-improvement-protocol.md` | pass |
| productivity pairing | `09-agents/productivity-skills-integration.md` | pass |
| local skill | `.agents/skills/t-agent-knowledge-base-capability/SKILL.md` | pass |
| eval | `07-evals/golden-questions/knowledge-base-capability-golden-questions.md` | pass |

## 5. 结论

### evidence

- KB-1 已经支持一个外部 repo 从输入到 evidence、roundtable、decision、protocol、skill、eval 的闭环。
- `self-improving-agent` 的学习日志模式已经被吸收，但没有被直接照搬成自动改写 accepted truth。

### assumption

- 下一步如果要让产品经理不依赖 Codex 命令，需要增加 Obsidian / Web UI 状态视图和表单化入口。

### unknown

- 团队真实使用时，intake 入口更偏 Obsidian、Codex、GitHub Issue，还是未来 t-agent UI。

## 6. 下一步

- 将 `knowledge-base-capability.base` 用作 Obsidian 状态视图。
- 定期运行 `scripts/knowledge-base/eval-kb-capability.py --write-report`。
- 在真实 PRD / 外部 repo / 用户纠偏场景中继续补 failure cases。
