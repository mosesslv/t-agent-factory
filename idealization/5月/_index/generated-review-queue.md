---
type: index
status: active
created: 2026-06-13
updated: 2026-06-13
generated_by: tools/kb refresh-index
---

# Generated Review Queue

本文件由 `tools/kb refresh-index` 生成，用于给人提供按优先级排序的当前审阅入口。

## Top Tasks

| Priority | Kind | Reason | Next Action | Topic | Preview | Path |
|---:|---|---|---|---|---|---|
| 10 | source-note | source ready for human review | preview-source-review | agent-harness-skill-system | `tools/kb preview-source-review _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md` | `_workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md` |
| 20 | distillation-candidate | distillation ready for human review | preview-distillation-review | agent-harness-skill-system | `tools/kb preview-distillation-review _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md` | `_workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md` |
| 88 | debate-session | debate already drafted a distillation | distillation-drafted | enterprise-ai-tech-org | `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md` | `_workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md` |
| 90 | source-note | source already reviewed | source-reviewed | agent-harness-skill-system | `tools/kb preview-source-review _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md` | `_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md` |
| 90 | source-note | source already reviewed | source-reviewed | enterprise-ai-tech-org | `tools/kb preview-source-review _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md` | `_workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md` |

## Decision Commands

### 1. _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md

- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md`

Decision commands:

- `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md reviewed --note "摘要和初步判断已人工确认"`
- `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md needs-evidence --note "需要补充或修订"`
- `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md rejected --note "不采用该来源"`

### 2. ds-20260613-001

- Preview: `tools/kb preview-distillation-review _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`

Decision commands:

- `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md approve --note "沉淀内容和入库计划已人工确认"`
- `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md needs-revision --note "需要补充或修订"`
- `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md reject --note "不进入正式知识库"`

### 3. db-20260609-001

- Preview: `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`

Decision commands:

- `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`
- `tools/kb preview-distillation-review _workbench/distillations/2026-06-08-企业技术部门在Agent时代的定位-沉淀候选.md`

### 4. _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md

- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`

Decision commands:

- none

### 5. _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md

- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md`

Decision commands:

- none
