---
type: index
status: draft
created: 2026-06-08
updated: 2026-06-08
---

# Manifest

本文件是当前知识库的初始人工盘点索引。V0 阶段只索引，不迁移旧文件。

## 目录盘点

| 路径 | 类型 | 状态 | 说明 |
|---|---|---|---|
| `主题库/大数据AI智能范式/` | formal-topic | active | 当前最完整的正式主题库 |
| `gather/` | source-material | legacy-active | 共识、能力清单、v1/v2 需求与方案 |
| `plan/` | source-material | legacy-active | 企业分析平台规划、架构、产品、工程拆解 |
| `presentation/` | presentation-material | legacy | HTML 汇报与构建脚本 |
| `内部分享/` | source-material | legacy-active | 分享稿、口播稿、原始内容 |
| `visuals/` | demo-material | legacy | 可视化 demo 资源 |
| `模版表/` | external-template | legacy | 演讲、提纲和过程设计模板 |
| `_workbench/` | workbench | active | 研讨过程、攻防、沉淀候选 |
| `_agents/` | agent-profiles | active | 专家角色和长期视角 |
| `_meta/` | operating-system | active | 工作流、模板、规则 |
| `_index/` | index | active | 人和 Agent 使用的索引 |
| `_meta/schema/` | schema | active | V1 frontmatter 校验规则 |
| `tools/kb` | cli | active | V1 本地状态、校验、session、dry-run promote 工具 |
| `_integrations/` | integration-plan | active | V2 Obsidian/Khoj 等集成规划 |
| `主题库/企业技术部门AI转型/` | formal-topic | draft | 企业技术部门 AI 转型主题骨架 |
| `_workbench/inbox/` | source-inbox | active | 外部资料和手工来源资料入口 |

## 正式知识入口

- [[主题库/大数据AI智能范式/README]]

## 待补充

- 为每个正式主题补 `topic.yaml` 或主题 frontmatter。
- 为历史材料补充更细粒度索引。
- 识别重复、过时和可 promote 的旧知识。
- 根据 `tools/kb status` 定期更新状态视图。
- 使用 `tools/kb refresh-index` 更新 generated manifest 和 promotion queue。
