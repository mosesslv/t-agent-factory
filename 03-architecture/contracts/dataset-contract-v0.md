---
type: contract
status: draft
version: v0
updated: 2026-06-15
---

# Dataset Contract v0

## 1. 目标

定义 V2 Dataset Learning 中 `Dataset` / `DatasetField` / `Metric` 的最小对象契约。

本契约默认是 domain-neutral。销售经营数据集只能作为示例或候选 golden workflow，不能反向定义 V2 范围。

## 2. DataSet

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `dataset_id` | string | yes | 稳定 ID |
| `name` | string | yes | 展示名称 |
| `domain` | string | yes | 业务域，例如 sales |
| `source_type` | enum | yes | `starrocks_table`, `excel`, `bi_dataset`, `view` |
| `source_ref` | string | yes | 表、视图、文件或 BI 数据集引用 |
| `owner` | string | yes | 数据负责人 |
| `status` | enum | yes | `draft`, `active`, `frozen`, `deprecated` |
| `permission_scope` | string | yes | 可访问人群或权限组 |
| `description` | text | yes | 数据集说明 |
| `askable_scope` | text | yes | 可问范围 |
| `non_goals` | text | no | 不适合回答的问题 |
| `refresh_time` | datetime | no | 数据刷新时间 |
| `quality_note` | text | no | 质量说明 |
| `version` | string | yes | 数据集版本 |

## 3. DataField

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `field_id` | string | yes | 稳定 ID |
| `dataset_id` | string | yes | 所属数据集 |
| `physical_name` | string | yes | 物理字段名 |
| `display_name` | string | yes | 业务展示名 |
| `description` | text | yes | 字段解释 |
| `semantic_type` | enum | yes | `dimension`, `measure`, `time`, `identifier`, `attribute` |
| `data_type` | string | yes | 数据类型 |
| `aliases` | list | no | 同义词 |
| `sample_values` | list | no | 样例值 |
| `is_sensitive` | boolean | yes | 是否敏感 |
| `askable` | boolean | yes | 是否可问 |
| `default_aggregation` | string | no | 默认聚合 |
| `unit` | string | no | 单位 |

## 4. Metric

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `metric_id` | string | yes | 指标 ID |
| `name` | string | yes | 指标名称 |
| `definition` | text | yes | 业务口径 |
| `formula` | text | no | 计算表达式或 SQL 片段 |
| `grain` | string | no | 粒度 |
| `default_filters` | text | no | 默认过滤条件 |
| `owner` | string | yes | 口径负责人 |
| `status` | enum | yes | `draft`, `active`, `deprecated` |
| `version` | string | yes | 指标版本 |

## 5. 最小验收

- 每个 V2 数据集必须有 DataSet 说明卡。
- P0 字段必须有 display name、description、semantic type、askable。
- P0 指标必须有 definition、owner、version。
- 问数和报告运行时必须记录使用的数据集版本。
