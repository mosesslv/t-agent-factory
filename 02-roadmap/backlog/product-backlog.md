---
type: backlog
status: active
updated: 2026-06-15
source_of_truth:
  - 02-roadmap/t-agent-roadmap.md
  - 05-decisions/product-decisions/PDR-2026-06-15-version-roadmap-ssot.md
---

# t-agent Product Backlog

This backlog follows `02-roadmap/t-agent-roadmap.md`.

## 1. 状态定义

| 状态 | 含义 |
|---|---|
| `candidate` | 候选，未承诺 |
| `shaped` | 范围已收敛，可进入 PRD / contract |
| `ready` | PRD / 契约 / 验收已具备 |
| `in-progress` | 正在实现或整理 |
| `accepted` | 已通过验收 |
| `blocked` | 被数据、权限、资源或决策阻塞 |
| `superseded` | 被新路线替代，只保留历史参考 |

## 2. V2 Backlog

V2 scope:

```text
Dataset Learning + Knowledge Base
+ existing ChatBI integration
+ ChatExcel single-file / initially single-table analysis-report iteration
```

| ID | Epic | Feature | Priority | Version | Status | Source |
|---|---|---|---:|---|---|---|
| TA-V2-001 | Dataset Learning | Dataset / DatasetVersion / SourceRef 最小对象 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-002 | Dataset Learning | 单文件 / 单表字段识别、字段画像、样例值、类型推断 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-003 | Dataset Learning | 字段业务名、解释、同义词、可问范围、敏感标记人工校正 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-004 | Dataset Learning | LearningJob 状态、失败原因、学习结果版本 | P0 | V2 | candidate | AI_DB_GPT research |
| TA-V2-005 | Knowledge Base | KnowledgeAsset Lite：个人/项目知识导入、来源、scope、trust level | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-006 | Knowledge Base | 知识绑定到用户、会话、数据集或分析任务，并在输出中引用 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-007 | ChatBI Adapter | 现有 ChatBI 接入边界：请求、权限上下文、结果标准化 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-008 | ChatBI Adapter | ChatBI 结果写入 QueryRun / ToolTrace / Artifact Lite | P0 | V2 | candidate | AI_DB_GPT current-route |
| TA-V2-009 | ChatExcel | 单文件上传或文件资源选择，初期限制单主表分析 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-010 | ChatExcel | 基于 Dataset Learning 的问数、表格、图表、摘要输出 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-011 | Analysis Report | 可见分析过程：计划、步骤、SQL/计算、工具调用、产物、证据、告警 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-012 | Safety | SQL / calculation guard：只读、限行、超时、错误分类 | P0 | V2 | shaped | Roadmap SSOT |
| TA-V2-013 | Run Trace Lite | QueryRun / AnalysisRun Lite、ToolTrace、FieldHit、KnowledgeHit | P0 | V2 | candidate | AI_DB_GPT research |
| TA-V2-014 | Artifact Lite | 表格、图表、SQL、分析摘要、报告草稿作为可引用 artifact | P0 | V2 | candidate | AI_DB_GPT research |
| TA-V2-015 | Eval Lite | 10-20 条 V2 golden cases，覆盖 Dataset Learning、知识引用、ChatBI、ChatExcel | P0 | V2 | candidate | Roadmap SSOT |
| TA-V2-016 | Feedback | 采纳、纠错、失败样例沉淀 | P1 | V2 | candidate | Roadmap SSOT |
| TA-V2-017 | Sales Workflow Pack | 销售经营数据 / 问题 / 报告作为候选 golden workflow | P1 | V2/V3 | candidate | Historical V2 docs |

## 2.5 Reality Roadmap Work Items

These items come from `02-roadmap/t-agent-reality-roadmap-2026-h2.md`. They convert the north-star roadmap into June-to-H2 execution work.

| ID | Epic | Feature | Priority | Version | Status | Source |
|---|---|---|---:|---|---|---|
| TA-RR-001 | Reality Lock | AI_DB_GPT codebase baseline demo / handoff map | P0 | 2026-H2 | shaped | `04-sources/ai-dbgpt/project-baseline-index.md` |
| TA-RR-002 | Reality Lock | V2 Reality PRD: platformization + ChatReport real-business closure | P0 | 2026-H2 | candidate | Reality Roadmap |
| TA-RR-003 | Contracts | Platform object gap map: Dataset / SourceRef / AnalysisRun / Artifact / Evidence / Eval | P0 | 2026-H2 | candidate | Reality Roadmap |
| TA-RR-004 | Eval | Real-business validation intake: data, golden questions, metric definitions, report standards | P0 | 2026-H2 | candidate | AI_DB_GPT current-route |
| TA-RR-005 | Workbench | Trusted analysis workbench flow: run, plan, artifact, evidence, warning, eval state | P0 | 2026-H2 | candidate | Reality Roadmap |
| TA-RR-006 | Delivery | Product + agent engineering + backend owner map and sprint split | P0 | 2026-H2 | candidate | Reality Roadmap |
| TA-RR-007 | Governance Lite | PermissionAdapter / Policy / AuditLog / action gate skeleton | P1 | 2026-H2 | candidate | Reality Roadmap |

## 2.6 Knowledge Base Capability Work Items

These items make the t-agent workspace itself capable of managing knowledge updates as product assets.

| ID | Epic | Feature | Priority | Version | Status | Source |
|---|---|---|---:|---|---|---|
| TA-KB-001 | Docs-as-code | Knowledge update governance for random Codex section, source, correction, and eval updates | P0 | KB-0 | accepted | `06-iteration/docs-as-code-governance.md` |
| TA-KB-002 | Agent Routing | Resident agent routing for knowledge-base updates and productivity skill pairing | P0 | KB-0 | accepted | `09-agents/default-router.md` |
| TA-KB-003 | Productivity Skills | `grill-me`, `handoff`, `write-a-skill`, `teach`, `self-improvement` pairing protocol | P0 | KB-0 | accepted | `09-agents/productivity-skills-integration.md` |
| TA-KB-004 | Self-improvement | Learning event loop with promotion gates and no automatic canonical rewrites | P0 | KB-0 | accepted | `09-agents/self-improvement-protocol.md` |
| TA-KB-005 | Local Skill | `.agents/skills/t-agent-knowledge-base-capability/` triggerable project skill | P0 | KB-0 | accepted | Local skill |
| TA-KB-006 | Eval | Golden questions for knowledge-base capability behavior | P0 | KB-0 | draft | `07-evals/golden-questions/knowledge-base-capability-golden-questions.md` |
| TA-KB-007 | Views | Obsidian Bases / Canvas or lightweight dashboard for sources, decisions, evals, learnings | P1 | KB-1 | candidate | Capability blueprint |
| TA-KB-008 | Promotion Automation | Scripted checks for missing source, status, related files, and eval links | P1 | KB-1 | candidate | Docs-as-code governance |

## 3. V3 Backlog Seeds

| ID | Epic | Feature | Priority | Version | Status | Source |
|---|---|---|---:|---|---|---|
| TA-V3-001 | ChatReport | Report Planner + ReportArtifact MVP | P0 | V3 | candidate | AI_DB_GPT ADR 0003 |
| TA-V3-002 | Evidence | EvidenceGraph：claim -> data / SQL / metric / knowledge / artifact | P0 | V3 | candidate | AI_DB_GPT inspiration |
| TA-V3-003 | Workbench | Task-first report / insight workbench：timeline、artifact shelf、evidence drawer | P0 | V3 | candidate | AI_DB_GPT ADR 0005 |
| TA-V3-004 | Dashboard Insight | DashboardArtifact / ViewModel + chart/dashboard explanation | P1 | V3 | candidate | AI_DB_GPT inspiration |
| TA-V3-005 | Reviewer Gate | Product / business / governance reviewer harness | P1 | V3 | candidate | AI_DB_GPT inspiration |
| TA-V3-006 | Report Eval | 数字准确性、引用完整性、证据支持、叙事边界 | P1 | V3 | candidate | AI_DB_GPT inspiration |

## 4. V4 Backlog Seeds

| ID | Epic | Feature | Priority | Version | Status | Source |
|---|---|---|---:|---|---|---|
| TA-V4-001 | Core Service | dataset_learning / knowledge / run_trace / artifact / eval service boundary | P0 | V4 | candidate | AI_DB_GPT current-route |
| TA-V4-002 | Governance | Tool / Action registry, risk level, approval, dry-run, rollback, audit | P0 | V4 | candidate | Snowflake inspiration |
| TA-V4-003 | Enterprise Permission | IAM / SSO / RBAC / ABAC and data / field / knowledge / export policy | P1 | V4 | candidate | AI_DB_GPT research |
| TA-V4-004 | AgentOps | capability versioning, runtime trace, model routing, regression gates | P1 | V4 | candidate | AI_DB_GPT ADR 0008 |
| TA-V4-005 | Asset / Skill Ops | Skill Hub, Asset Hub, case library, controlled publication | P1 | V4 | candidate | Historical V3.5 docs |

## 5. Backlog Rules

- `02-roadmap/t-agent-roadmap.md` defines version meaning.
- `02-roadmap/t-agent-reality-roadmap-2026-h2.md` defines the current execution overlay and should be checked before staffing or delivery commitments.
- Any P0 requirement must have at least one PRD, contract, eval, or accepted decision source before entering `ready`.
- Historical sales operating materials can seed eval/workflow packs, but they do not define V2 scope.
- Any route change must update `05-decisions/` and this backlog together.
- Knowledge-base capability changes must update docs-as-code governance, productivity skill pairing, self-improvement protocol, and eval cases together when relevant.
- Each release review must label P0 items as `accepted`, `blocked`, or explicitly removed from scope.
