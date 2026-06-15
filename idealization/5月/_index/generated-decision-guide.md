---
type: index
status: active
created: 2026-06-13
updated: 2026-06-13
generated_by: tools/kb refresh-index
---

# Generated Decision Guide

本文件用于人工审阅前决策。它只列出证据摘要、可选动作、适用条件、风险和 note 模板，不代表已经人工确认。

## Guardrails

- This guide is read-only and must not be treated as human approval.
- Use preview commands before any review decision.
- Only run review-source, review-distillation, approve-distillation, or promote --confirm after explicit human confirmation.
- Prefer needs-revision when evidence, wording, target path, or scope is uncertain.

## 1. _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md

- Kind: `source-note`
- Priority: `10`
- Reason: source ready for human review
- Topic: `agent-harness-skill-system`
- Protected action: `True`
- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md`
- Path: `_workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md`

### Evidence Summary

- summary_items: `5`
- judgment_items: `3`
- linked_sessions: `1`
- blocking_checks: `-`
- warnings: `-`

### Decision Options

| Option | When To Use | Effect | Risk | Command | Note Template |
|---|---|---|---|---|---|
| Mark source reviewed | 摘要、初步判断、关联 session 都已人工确认，且该来源可作为后续沉淀依据。 | Only marks the source note reviewed; it does not promote formal knowledge. | A weak source can later bias distillation if reviewed too early. | `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md reviewed --note "摘要和初步判断已人工确认"` | 摘要、初步判断和关联 session 已人工确认，可作为来源。 |
| Request more evidence | 来源可信度、摘要、判断或与 session 的关系仍不够清楚。 | Keeps the source in workbench for completion. | Slows down promotion, but avoids weak evidence entering the chain. | `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md needs-evidence --note "需要补充或修订"` | 需要补充原始链接、可信度说明或与当前议题的关系。 |
| Reject source | 来源与议题无关、质量过低、重复或不应进入当前知识链。 | Marks the source deprecated/rejected. | Rejected sources will be deprioritized for future distillation. | `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md rejected --note "不采用该来源"` | 该来源与当前议题关系弱或不采用。 |

## 2. ds-20260613-001

- Kind: `distillation-candidate`
- Priority: `20`
- Reason: distillation ready for human review
- Topic: `agent-harness-skill-system`
- Protected action: `True`
- Preview: `tools/kb preview-distillation-review _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`
- Path: `_workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`

### Evidence Summary

- stable_judgments: `6`
- concept_definitions: `5`
- decision_candidates: `5`
- source_sessions: `1`
- source_debates: `0`
- planned_files: `4`
- conflicts: `0`
- blocking_checks: `-`

### Decision Options

| Option | When To Use | Effect | Risk | Command | Note Template |
|---|---|---|---|---|---|
| Approve for promotion preflight | 稳定判断、概念定义、决策候选、来源和目标文件计划均已人工确认。 | Marks the candidate approved-for-promotion; formal knowledge is still not written until promote --confirm. | Approval unlocks formal promotion, so weak claims should be revised first. | `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md approve --note "沉淀内容和入库计划已人工确认"` | 沉淀内容、来源链和入库计划已人工确认，可进入 promote 前置状态。 |
| Request revision | 结论表达、证据链、目标主题、冲突处理或待验证问题还需要打磨。 | Keeps the candidate in pending-human-review and records a revision request. | Delays formalization, but protects the knowledge base from premature consensus. | `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md needs-revision --note "需要补充或修订"` | 需要补充证据、收敛表达或调整入库计划。 |
| Reject candidate | 该候选不应成为正式知识，或议题方向已被推翻。 | Marks the candidate rejected/deprecated without writing formal knowledge. | Rejected candidate will no longer be the main promotion path. | `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md reject --note "不进入正式知识库"` | 该候选不进入正式知识库。 |

## 3. db-20260609-001

- Kind: `debate-session`
- Priority: `88`
- Reason: debate already drafted a distillation
- Topic: `enterprise-ai-tech-org`
- Protected action: `False`
- Preview: `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`
- Path: `_workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`

### Evidence Summary

- round_1_items: `35`
- round_2_items: `8`
- round_3_items: `9`
- distillation_suggestions: `4`
- drafted_distillations: `1`
- blocking_checks: `-`

### Decision Options

| Option | When To Use | Effect | Risk | Command | Note Template |
|---|---|---|---|---|---|
| Preview debate | 需要先阅读红蓝攻防材料、收敛结论和沉淀建议。 | No state change. | Low. | `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md` | 先阅读辩论材料和已生成的沉淀候选。 |
| Review drafted distillation | 辩论已经转成沉淀候选，应在候选层面做人工审阅决定。 | No state change unless a separate review-distillation command is explicitly run. | Low while previewing; high if later approving without human confirmation. | `tools/kb preview-distillation-review _workbench/distillations/2026-06-08-企业技术部门在Agent时代的定位-沉淀候选.md` | 转入沉淀候选审阅，不直接处理辩论文件。 |

## 4. _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md

- Kind: `source-note`
- Priority: `90`
- Reason: source already reviewed
- Topic: `agent-harness-skill-system`
- Protected action: `True`
- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`
- Path: `_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`

### Evidence Summary

- summary_items: `3`
- judgment_items: `5`
- linked_sessions: `1`
- blocking_checks: `-`
- warnings: `-`

### Decision Options

| Option | When To Use | Effect | Risk | Command | Note Template |
|---|---|---|---|---|---|
| Mark source reviewed | 摘要、初步判断、关联 session 都已人工确认，且该来源可作为后续沉淀依据。 | Only marks the source note reviewed; it does not promote formal knowledge. | A weak source can later bias distillation if reviewed too early. | `` | 摘要、初步判断和关联 session 已人工确认，可作为来源。 |
| Request more evidence | 来源可信度、摘要、判断或与 session 的关系仍不够清楚。 | Keeps the source in workbench for completion. | Slows down promotion, but avoids weak evidence entering the chain. | `` | 需要补充原始链接、可信度说明或与当前议题的关系。 |
| Reject source | 来源与议题无关、质量过低、重复或不应进入当前知识链。 | Marks the source deprecated/rejected. | Rejected sources will be deprioritized for future distillation. | `` | 该来源与当前议题关系弱或不采用。 |

## 5. _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md

- Kind: `source-note`
- Priority: `90`
- Reason: source already reviewed
- Topic: `enterprise-ai-tech-org`
- Protected action: `True`
- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md`
- Path: `_workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md`

### Evidence Summary

- summary_items: `4`
- judgment_items: `5`
- linked_sessions: `1`
- blocking_checks: `-`
- warnings: `-`

### Decision Options

| Option | When To Use | Effect | Risk | Command | Note Template |
|---|---|---|---|---|---|
| Mark source reviewed | 摘要、初步判断、关联 session 都已人工确认，且该来源可作为后续沉淀依据。 | Only marks the source note reviewed; it does not promote formal knowledge. | A weak source can later bias distillation if reviewed too early. | `` | 摘要、初步判断和关联 session 已人工确认，可作为来源。 |
| Request more evidence | 来源可信度、摘要、判断或与 session 的关系仍不够清楚。 | Keeps the source in workbench for completion. | Slows down promotion, but avoids weak evidence entering the chain. | `` | 需要补充原始链接、可信度说明或与当前议题的关系。 |
| Reject source | 来源与议题无关、质量过低、重复或不应进入当前知识链。 | Marks the source deprecated/rejected. | Rejected sources will be deprioritized for future distillation. | `` | 该来源与当前议题关系弱或不采用。 |
