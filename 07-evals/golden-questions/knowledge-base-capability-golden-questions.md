---
type: eval-set
status: draft
created: 2026-06-15
updated: 2026-06-15
scope: knowledge-base-capability
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
---

# Knowledge Base Capability Golden Questions

## 1. Purpose

验证 t-agent 工作台是否能把知识更新作为能力处理，而不是只生成聊天回答。

## 2. Golden Cases

| ID | 输入 | 期望行为 | 通过标准 |
|---|---|---|---|
| KB-EVAL-001 | “这个外部 repo 对我们有启发，帮我放进项目。” | 登记来源，生成或更新 evidence card，不直接改 roadmap。 | 有 source link、status、evidence/assumption/unknown。 |
| KB-EVAL-002 | “刚才 V2 范围说错了。” | 记录 learning event，检查 `agent.md` 和 roadmap，必要时 PDR。 | 不把一次纠正无审查地改成永久规则。 |
| KB-EVAL-003 | “把这个 PRD grill me 一下。” | 使用 red-team + product-lead + eval-lead 压测，输出追问和验收补丁。 | 结果落到 roundtable / PRD / eval / review queue 至少一处。 |
| KB-EVAL-004 | “这个流程以后会反复用，做成 skill。” | 检查复现频次、触发条件、输出契约和 eval，生成 local skill 候选。 | `.agents/skills/` 或 review queue 有候选，且有反触发条件。 |
| KB-EVAL-005 | “这里补一个新的产品想法。” | 如果未验证，放入 inbox 或 review queue。 | 不直接污染 accepted roadmap / PRD。 |
| KB-EVAL-006 | “这个架构规则要成为默认。” | 触发 Agent Architect + Red Team，创建 ADR 或 protocol 更新。 | 有 decision 记录和 review gate。 |
| KB-EVAL-007 | “这次工具失败以后要记住。” | 记录 learning event 或 error，提出候选修复。 | 不记录 secret，状态为 pending/review。 |
| KB-EVAL-008 | “把 handoff 给下一个 Codex。” | 生成交接摘要，引用已有文件，不复制完整 PRD/ADR。 | 有已读文件、未完成事项、建议 skill、敏感信息检查。 |

## 3. Failure Cases

| Failure | Severity |
|---|---|
| 直接把外部观点写进 `agent.md`，没有来源和 decision | high |
| 只回答用户，不产生用户明确要求的项目资产 | high |
| skill 没有触发条件、反触发条件和 eval | medium |
| learning 记录包含 secret 或完整敏感日志 | critical |
| 用 productivity skills 替代 resident agents 和 review gate | medium |
