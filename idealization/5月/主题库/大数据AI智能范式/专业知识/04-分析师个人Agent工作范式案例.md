# 分析师个人 Agent 工作范式案例

## 原始案例

第一次对话中的架构图表达了一种业务分析师视角的未来工作模式：

```text
企业知识 + 数据库双输入
-> 多 Agent 协作
-> 飞书 & Quick BI 输出
```

![企业知识 + 数据库双输入 -> 多 Agent 协作 -> 飞书 & Quick BI 输出架构示意图](C:/Users/Administrator/AppData/Roaming/LarkShell-ka-transsion/sdk_storage/df3bfc79b2088f868bdf2405c1e5a589/resources/images/img_v3_0212f_9184584d-1238-4851-97d2-04b6b23ada8g.jpg)

## 用户诉求

- 保留个人 Obsidian 知识库作为分析上下文。
- 同时调用企业数据库和个人知识。
- 用多个 Agent 做方案、反思、问数、报告、输出。
- 结果进入飞书文档、任务、群协作和 Quick BI。

## 平台解读

这张图是很好的用户侧愿景，但不是完整平台架构。它缺少企业级 Data Agent 必须补齐的底座：

| 图中能力 | 背后需要的大数据平台能力 |
|---|---|
| 企业数据库输入 | 数据目录、权限、SQL Guard、审计 |
| Obsidian 知识输入 | 知识索引、权限隔离、引用溯源 |
| 多 Agent 协作 | Agent Runtime、Tool Registry、Handoff、Trace |
| Codex / DeepSeek 协作 | 模型路由、Prompt 版本、输出评测 |
| 飞书输出 | 文档导出、群分享、成员鉴权、任务 API |
| Quick BI 输出 | BI Adapter、Dataset 发布、Dashboard 素材 |
| 反馈迭代 | QueryRun、Eval、Feedback、Skill 沉淀 |

## 报告引用位置

- [[../完整报告-大数据技术演进与企业数据智能范式迭代#5. 案例引用：商业分析师个人 Agent 工作范式]]

