---
type: automation-plan
status: active
created: 2026-06-17
updated: 2026-06-17
topic: knowledge-ingestion-automation-harness
decision: build
related:
  - 03-architecture/knowledge-base-capability-blueprint.md
  - 06-iteration/docs-as-code-governance.md
  - 09-agents/feedback-driven-improvement-protocol.md
  - scripts/knowledge-base/triage-knowledge-intake.py
  - scripts/knowledge-base/run-kb-harness-weekly.py
  - 06-iteration/views/knowledge-automation-queue.base
---

# Knowledge Ingestion Automation Harness 迭代计划

## 1. 目标

本迭代把知识摄取从“人工记得去看”升级为可巡检、可视化、可提醒的 harness。

目标能力：

```text
new input / candidate asset / user feedback / ingest artifact
  -> daily triage
  -> quality gate cards
  -> weekly harness eval
  -> visual review queue
  -> follow-up heartbeat
  -> human promotion decision
```

本迭代不建设自动晋升系统。自动化只能生成候选判断、报告和提醒，不能绕过 review gate 修改 accepted truth。

## 2. Evidence / Assumption / Unknown

### evidence

- `agent.md` 已定义 Knowledge Base Capability 是 t-agent 平台建设工作台的基础能力。
- `03-architecture/knowledge-base-capability-blueprint.md` 已定义 Intake、SourceRef、EvidenceCard、LearningEvent、ImprovementProposal、EvalCase 等对象。
- `06-iteration/docs-as-code-governance.md` 已要求知识更新先分类、后晋升，并保护 accepted truth。
- ProductFactory `v0.7 Product Learning Loop` 的经验是：候选学习可以自动进入 review queue，但不能自动晋升为正式知识。

### assumption

- 团队希望先降低“漏看候选知识 / 漏跑 eval / 漏处理 feedback proposal”的风险。
- 当前阶段 Markdown 报告 + Obsidian Base 看板比定制 UI 更轻、更符合 docs-as-code 工作方式。
- 自动化第一版应该 report-only，再逐步允许写入 `06-iteration/reports/`。

### unknown

- external ingest pipeline 何时从 candidate 晋升为 accepted。
- 每日 triage 的误报率需要连续运行后校准。
- Review owner 是否固定为 Knowledge Librarian，还是由 Product Lead / Agent Architect 轮值。

## 3. 迭代目标与验收标准

| 阶段 | 目标 | Done 标准 |
|---|---|---|
| KBI-1.1 | Daily Triage 设计完成 | 有信息源清单、检索规则、质量门、卡片输出和本地脚本 |
| KBI-1.2 | Daily Triage 自动化试运行 | 连续 3 次运行能输出 report cards，且不修改 canonical docs |
| KBI-1.3 | Weekly Eval 可视化 | 每周报告包含 KB eval、external ingest check、triage cards 和 recommended review focus |
| KBI-1.4 | Obsidian Review Queue | 有 Base 看板能浏览 automation queue、stale candidates、failed gates、improvement proposals |
| KBI-1.5 | Follow-up Heartbeat | 能在当前 thread 提醒 top review items，并要求用户做 accept / reject / defer |

通过本迭代的最低标准：

- `python3 scripts/knowledge-base/triage-knowledge-intake.py --write-report` 可运行；
- `python3 scripts/knowledge-base/run-kb-harness-weekly.py --write-report` 可运行；
- `python3 scripts/knowledge-base/eval-kb-capability.py` 通过；
- `06-iteration/views/knowledge-automation-queue.base` YAML 可解析；
- 三条 Codex 自动化已配置或有明确建议配置；
- 自动化 prompt 明确禁止自动修改 accepted truth。

## 4. Daily Knowledge Intake Triage

定位：每日知识分拣，不是每日自动学习。

### 4.1 信息源

| 来源 | 扫描内容 |
|---|---|
| `06-iteration/inbox/` | 用户临时想法、外部输入、未分类材料 |
| `06-iteration/review-queue/` | candidate 是否堆积、是否缺 owner |
| `04-sources/evidence-cards/` | 新 evidence 是否缺来源、状态、边界 |
| `04-sources/external/manifest.json` | 外部 ingest 是否新增、失败、缺 metadata |
| `04-sources/external/extracted/` | extracted source 是否未进入 manifest / wiki |
| `06-iteration/learnings/` | 用户纠偏、工具失败、重复问题 |
| `06-iteration/improvement-proposals/` | proposed / approved / stale 状态 |
| `07-evals/eval-runs/` | 最近 eval 是否失败或过期 |
| `git status --short` | 未提交候选文件是否属于知识输入 |

### 4.2 检索规则

每日 triage 默认检索：

- `status: raw | candidate | review | proposed`
- 缺 `type`、`status`、`updated`、`owner`
- `TODO`、`TBD`、`unknown`、`待补`
- 外部链接、repo、文章但未登记 source
- evidence card 没有 `evidence / assumption / unknown`
- proposal 没有 `original_snippet / proposed_snippet / risk`
- 超过 3 天未处理的 candidate / proposed / raw
- 涉及 `agent.md`、roadmap、PRD、ADR、eval 的高影响候选

### 4.3 初步质量门

| Gate | 通过标准 |
|---|---|
| G0 Source | 有来源路径、URL、source 字段或可追溯本地文件 |
| G1 Metadata | 有 `type`、`status`、`updated`，高影响项最好有 `owner` |
| G2 Boundary | 明确 `evidence / assumption / unknown`，或标记不适用 |
| G3 Safety | 不含 secret、私密凭据、完整敏感日志、版权长文 |
| G4 Routing | 能归类到 inbox / evidence / learning / proposal / eval / external |
| G5 Action | 有下一步动作：reject、补来源、生成 evidence card、roundtable、promotion review 或 eval |

### 4.4 输出卡片

Daily Triage 输出 Markdown 卡片：

- `Needs Source`
- `Needs Metadata`
- `Needs Boundary`
- `Needs Review Gate`
- `Ready For Review`
- `Risk / Blocked`
- `Stale Candidates`

默认报告位置：

```text
06-iteration/reports/YYYY-MM-DD-knowledge-intake-triage.md
```

## 5. Weekly KB Harness Eval

定位：每周检查 harness 是否仍健康，并用卡片方式输出。

默认运行：

```bash
python3 scripts/knowledge-base/eval-kb-capability.py
python3 scripts/knowledge-base/triage-knowledge-intake.py --json
python3 scripts/external-ingest/check-external-ingest.py
```

`scripts/external-ingest/check-external-ingest.py` 是 optional check：如果 external ingest pipeline 还未被接受或脚本不存在，周报标记为 `skipped`。

默认报告位置：

```text
06-iteration/reports/YYYY-MM-DD-kb-harness-weekly.md
```

报告必须包含：

- KB eval pass/fail；
- external ingest check pass/fail/skipped；
- stale / high risk / missing metadata 数量；
- top review cards；
- recommended review focus；
- 不自动修改 canonical docs 的安全声明。

## 6. 可视化输出

| 层级 | 形式 | 本迭代采用 |
|---|---|---|
| L1 | Markdown card report | 采用 |
| L2 | Obsidian Base queue view | 采用 |
| L3 | Obsidian Canvas / Data Analytics dashboard | 后续 trial |

当前 Base 入口：

```text
06-iteration/views/knowledge-automation-queue.base
```

## 7. Review Follow-up Heartbeat

定位：在当前 Codex thread 中提醒用户进行人工 review。

触发策略：

- 每周固定提醒一次；
- 如果 triage / weekly report 中有 high-risk、stale、failed eval，应优先列出；
- 如果没有高风险项，只给简短状态，不要求用户处理无意义事项。

输出格式：

```text
本次需要你看的 3-5 张卡片：
- item:
- why now:
- recommended action: accept | reject | defer | ask source | run eval
```

## 8. 自动化安全边界

允许：

- 运行检查脚本；
- 生成 `06-iteration/reports/` 下的报告；
- 汇总 top review items；
- 提醒用户 review；
- 标记建议动作。

不允许：

- 自动修改 `agent.md`、`AGENTS.md`、roadmap、PRD、ADR、contract、eval 或 local skill；
- 自动晋升 candidate 为 accepted；
- 自动保存版权长文；
- 自动提交或推送未经用户确认的改动；
- 自动删除来源或候选材料。

## 9. Codex Automations

| Automation | Kind | Cadence | Output |
|---|---|---|---|
| Daily Knowledge Intake Triage | cron | 每日早上 | triage report cards |
| Weekly KB Harness Eval | cron | 每周一上午 | weekly harness report |
| Review Follow-up Heartbeat | heartbeat | 每周五下午 | 当前 thread review reminder |

自动化创建后，仍应以本文件为验收依据。

## 10. 当前已创建的自动化

| Automation ID | Name | Kind | Schedule | Write Scope |
|---|---|---|---|---|
| `daily-knowledge-intake-triage` | Daily Knowledge Intake Triage | cron | 每日 09:00 | 仅可写 triage report |
| `weekly-kb-harness-eval` | Weekly KB Harness Eval | cron | 每周一 10:00 | 仅可写 weekly harness report |
| `knowledge-review-follow-up` | Knowledge Review Follow-up | heartbeat | 每周五 16:30 | 当前 thread 提醒，不写文件 |

这些自动化的 prompt 都包含安全边界：不得修改 accepted truth，不得提交或推送。
