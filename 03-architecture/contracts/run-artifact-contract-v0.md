---
type: contract
status: draft
version: v0
updated: 2026-06-15
---

# Run / Artifact Contract v0

## 1. AskRun

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `ask_run_id` | string | yes | 问数运行 ID |
| `user_id` | string | yes | 发起用户 |
| `dataset_id` | string | yes | 使用数据集 |
| `dataset_version` | string | yes | 数据集版本 |
| `question` | text | yes | 用户问题 |
| `interpreted_intent` | text | no | 意图解释 |
| `generated_sql` | text | no | 生成 SQL |
| `approved_sql` | text | no | 执行 SQL |
| `safety_status` | enum | yes | `passed`, `blocked`, `needs_review` |
| `execution_status` | enum | yes | `pending`, `running`, `succeeded`, `failed`, `cancelled` |
| `result_ref` | string | no | 结果引用 |
| `error` | text | no | 错误信息 |
| `created_at` | datetime | yes | 创建时间 |

## 2. ReportRun

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `report_run_id` | string | yes | 报告运行 ID |
| `topic` | text | yes | 报告议题 |
| `dataset_ids` | list | yes | 数据集 |
| `knowledge_refs` | list | no | 知识来源 |
| `plan` | object | yes | 分析计划 |
| `outline` | object | yes | 报告大纲 |
| `status` | enum | yes | `drafting`, `running`, `review`, `accepted`, `failed`, `cancelled` |
| `artifact_refs` | list | no | 产物引用 |
| `output_refs` | list | no | Markdown / HTML / 飞书文档 |
| `created_at` | datetime | yes | 创建时间 |

## 3. Artifact

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `artifact_id` | string | yes | 产物 ID |
| `type` | enum | yes | `table`, `chart`, `insight_card`, `report_section`, `report` |
| `title` | string | yes | 标题 |
| `source_run_id` | string | yes | 来源运行 |
| `data_refs` | list | no | 数据引用 |
| `sql_refs` | list | no | SQL 引用 |
| `metric_refs` | list | no | 指标引用 |
| `knowledge_refs` | list | no | 知识引用 |
| `content_ref` | string | yes | 内容存储引用 |
| `status` | enum | yes | `draft`, `accepted`, `rejected`, `superseded` |

## 4. Feedback

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `feedback_id` | string | yes | 反馈 ID |
| `target_type` | enum | yes | `ask_run`, `report_run`, `artifact`, `eval_case` |
| `target_id` | string | yes | 反馈对象 |
| `user_id` | string | yes | 反馈人 |
| `rating` | enum | yes | `accepted`, `wrong`, `unclear`, `unsafe`, `irrelevant` |
| `comment` | text | no | 说明 |
| `action` | enum | no | `create_failure_case`, `update_metric`, `update_dataset`, `no_action` |

## 5. 证据链要求

V2 的关键问数、分析报告草稿或解释结论必须至少引用以下一种对象：

- `AskRun`
- `Artifact`
- `Metric`
- `DataSet`
- `Knowledge`
