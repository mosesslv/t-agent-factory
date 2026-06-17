---
type: automation-index
status: active
created: 2026-06-17
updated: 2026-06-17
related:
  - 06-iteration/automation/knowledge-ingestion-automation-plan.md
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
---

# Knowledge Ingestion Automation

本目录管理 t-agent 知识摄取与 harness 验收自动化。

自动化只负责：

- 巡检；
- 生成报告；
- 输出 review cards；
- 提醒人工评审；
- 运行 eval / check。

自动化不负责：

- 自动修改 `agent.md`、`AGENTS.md`、roadmap、PRD、ADR、contract、eval 或 local skill；
- 自动把外部来源晋升为 accepted truth；
- 自动保存版权长文或敏感内容；
- 自动合并或推送未经 review 的改动。

当前计划见 `06-iteration/automation/knowledge-ingestion-automation-plan.md`。
