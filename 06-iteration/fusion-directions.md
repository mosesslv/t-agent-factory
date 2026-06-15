# 后续知识更新需要融合的建设方向

本文件回答：基于后续迭代和知识更新，t-agent 还需要融合哪些建设内容和方向，以及为什么。

## 1. Agent Harness 化

要融合：

- Skill 的触发契约、输入输出契约、资源引用、工具权限、测试样例、baseline、版本和审阅记录。
- 将“分析师”“报告撰写”“指标归因”“知识编辑”等专家能力从角色 prompt 升级为可评测 harness。

为什么：

- 企业 Data Agent 的高价值能力不是一次性 prompt，而是可复用、可验证、可迁移的分析能力包。
- 没有 eval 和 baseline，无法证明 Skill 比普通对话更好。

主要来源：

- `idealization/5月/_workbench/sessions/2026-06-09-Anthropic-Skills-官方仓库与-harness-思想.md`
- `idealization/5月/主题库/Agent协作与Harness/专业知识/01-真正的-Agent-harness-思想.md`

## 2. ToolSearch / Capability Search

要融合：

- 工具和能力不全量暴露，采用轻量索引、按需检索、延迟加载完整 schema。
- 将 SQL、图表、报告、BI API、飞书、知识检索、评测工具纳入能力注册和权限分层。

为什么：

- t-agent 的工具空间会快速变大，全量暴露会增加错误调用、权限风险和上下文成本。
- 企业环境需要“可发现但受控”的能力空间。

主要来源：

- `idealization/5月/_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计.md`
- ProductFactory source: `Local Vault: Agent Harness Workbench`

## 3. 主动/被动知识更新闭环

要融合：

- 候选发现层：会话结束、Git diff、失败样例、用户纠正、重复问题、通过验证的分析套路都可以生成候选。
- 候选只进入 review queue，不自动进入正式知识。

为什么：

- t-agent 的产品知识、业务口径、失败案例、分析模板会持续变化。
- 没有候选发现层，经验会散落在聊天和一次性报告里；自动入库又会污染正式知识。

主要来源：

- `idealization/5月/_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计.md`

## 4. Agent Evals 与运行观测

要融合：

- 黄金问题集、标准 SQL、标准答案、失败样例、用户反馈、回归测试。
- AskRun / ReportRun / ToolCall / Trace / Cost / Latency / Accuracy 的观测面板。

为什么：

- 企业级 Data Agent 的核心风险是“看起来能答，但口径错、SQL 错或报告不可追溯”。
- 没有持续 eval，NL-to-SQL、归因和报告生成无法进入生产运营。

ProductFactory 相关来源：

- `Demystifying Evals for AI Agents`
- `Agent Evals`

## 5. 单 Agent 主线优先，谨慎多 Agent

要融合：

- 优先建设单一 orchestrator + 工具/Skill 编排。
- 只有当任务天然需要角色分工、并行评审或人类可理解的交接时，再引入多 Agent。

为什么：

- 多 Agent 容易带来状态同步、责任边界和评测复杂度。
- 经营报告和可信问数的第一风险不是 agent 数量不足，而是数据语义、工具安全和证据链不足。

ProductFactory 相关来源：

- `Dont Build Multi-Agents`
- `Investing in Multi-Agent AI Safety Research`

## 6. 飞书 / 文档 / 协作输出

要融合：

- 报告输出到飞书文档、飞书群、任务或审批。
- 报告保留章节、图表、SQL、指标口径、知识引用和人工编辑记录。

为什么：

- 经营分析最终消费场景通常不是聊天窗口，而是管理层材料、会议讨论和团队协作。
- 如果报告不能分发、审阅和订阅，Data Agent 很难进入真实业务流程。

主要来源：

- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`

## 7. 数据产品化与黄金数据集

要融合：

- 把黄金数据集定义成带语义口径、负责人、质量说明、样例问题、权限边界和报告适用范围的数据产品。
- 从“宽表可选”升级为“可问、可报告、可评测、可复用”的数据资产。

为什么：

- 企业问数准确率不是靠模型单点提升，而是靠高质量数据上下文和稳定口径。
- 销售经营报告试点需要明确的数据产品承载。

主要来源：

- `idealization/5月/gather/v2/v2.0需求收敛与版本边界.md`
- `idealization/5月/gather/能力清单.md`

## 8. 推荐近期整合顺序

1. 先完成根目录工作空间和来源索引。
2. 使用 `02-roadmap/t-agent-roadmap.md` 作为 V1/V2/V3/V4 SSOT。
3. 把 V2 拆成 Dataset Learning、Knowledge Base、ChatBI Adapter、ChatExcel 单文件/单表分析报告。
4. 同步设计 Dataset / Knowledge / QueryRun / Artifact / Eval Lite 最小对象。
5. 将销售经营分析降级为候选 golden workflow / eval pack。
6. 再设计 Skill Hub 的 harness 规范。
7. 最后接入 ToolSearch / capability search 和主动候选发现。
