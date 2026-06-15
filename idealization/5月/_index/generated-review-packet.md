---
type: index
status: active
created: 2026-06-13
updated: 2026-06-13
generated_by: tools/kb refresh-index
---

# Generated Review Packet

本文件汇总当前最高优先级人工审阅任务。它只展示上下文和建议命令，不代表已经人工确认。

## 1. _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md

- Kind: `source-note`
- Priority: `10`
- Reason: source ready for human review
- Topic: `agent-harness-skill-system`
- Next action: `preview-source-review`
- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md`
- Path: `_workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md`

### Decision Commands

- `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md reviewed --note "摘要和初步判断已人工确认"`
- `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md needs-evidence --note "需要补充或修订"`
- `tools/kb review-source _workbench/inbox/2026-06-13-Claude-Code-ToolSearch机制研究.md rejected --note "不采用该来源"`

### Summary

- 用户提供的材料判断：这里应称为 `ToolSearch`，它不是代码搜索，而是工具定义的搜索与延迟加载机制。
- 材料区分了教学仓库 `shareAI-lab/learn-claude-code` 与 Claude Code 官方产品：前者有工具注册、分发、任务工具和记忆/任务系统教学实现，但没有完整的 ToolSearch；后者公开工具清单中包含 ToolSearch，源码层面的更多细节来自非官方源码研究与结构推断。
- ToolSearch 的核心价值是把工具空间从“全量暴露”改为“按需发现”：常驻少量核心工具，把 MCP、插件和长尾业务工具作为 deferred tools，在需要时通过工具搜索加载完整 schema。
- 该机制解决的是工具数量膨胀后的上下文成本、工具选择噪音、MCP/插件生态扩展、prompt cache 稳定性和权限治理问题。
- 对本 Knowledge Workbench 的启发是：知识更新和记忆沉淀也不应只依赖当前会话的主观判断，应逐步设计“候选发现 -> 风险分层 -> 按需加载证据 -> 人工确认 -> 正式入库”的能力检索与受控沉淀链路。

### Initial Judgment

- 可信度：medium。材料综合了公开文档、教学仓库和非官方源码研究；其中“官方公开工具清单存在 ToolSearch”可信度较高，具体内部实现细节应标为结构推断，不能当作官方源码事实。
- 与当前知识库关系：补强 `Agent协作与Harness` 主题中的“能力空间治理”部分，也给当前 Knowledge Workbench 的主动/被动知识更新机制提供了设计类比。
- 是否建议进入 session：是，已进入 `ws-20260613-001`。建议后续把“ToolSearch 作为能力检索机制”与“知识沉淀候选发现机制”合并提炼成候选知识。

### Linked Sessions

- `ws-20260613-001` draft distillation `_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计.md`

### Checks

- PASS type is source-note
- PASS schema validation passes
- PASS topic is set
- PASS source title is set
- PASS source is linked to a session
- PASS summary has content
- PASS initial judgment has content
- PASS manual source may omit source_url

## 2. ds-20260613-001

- Kind: `distillation-candidate`
- Priority: `20`
- Reason: distillation ready for human review
- Topic: `agent-harness-skill-system`
- Next action: `preview-distillation-review`
- Preview: `tools/kb preview-distillation-review _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`
- Path: `_workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`

### Decision Commands

- `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md approve --note "沉淀内容和入库计划已人工确认"`
- `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md needs-revision --note "需要补充或修订"`
- `tools/kb review-distillation _workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md reject --note "不进入正式知识库"`

### Stable Judgments

- ToolSearch 的本质不是搜索代码或数据，而是面向 Agent 工具空间的能力检索与按需装载机制。
- 当工具、MCP server、插件和业务能力数量膨胀时，把所有 tool schema 常驻上下文会带来 token 成本、上下文污染、工具选择困难、prompt cache 不稳定和权限治理压力。
- 更可扩展的模式是：常驻少量核心工具，把长尾工具作为 deferred tools，通过轻量索引、`searchHint` 和按需 schema 加载缩小 action space。
- Knowledge Workbench 的知识更新机制可以借鉴 ToolSearch 的思想：不要把所有潜在沉淀直接写入正式知识库，而是先做候选发现、候选索引、风险分层和按需审阅。
- 当前 Knowledge Workbench 已有被动沉淀工作流、审阅队列、RAG scope、工具权限目录和项目级 reflection，但尚未形成完整的主动巡检与会话钩子闭环。
- 知识更新的自动化边界应是“自动发现候选、自动生成只读审阅包、自动刷新索引”，而不是自动 review、approve 或 promote。

### Decision Candidates

- 下一阶段不应直接建设“自动入库”，而应先建设“候选发现层”，把主动和被动发现的沉淀机会统一进入工作台队列。
- 自动化工具最多可写 `_workbench/capture-candidates/`、`_workbench/reflections/`、`_workbench/corrections/` 和 `_index/`，不得自动写 `主题库/`。
- 主动扫描应优先覆盖 Git 变更、Codex session 产物、review queue、validation 结果和高频用户确认，而不是泛化爬取所有内容。
- 被动捕获应绑定“非平凡会话结束检查”，避免每句话都沉淀，也避免重要用户纠正和可复用框架丢失。
- 候选评分应区分四类输出：source note、distillation candidate、reflection/correction、project rule update candidate。

### Source Sessions

- `ws-20260613-001` draft distillation `_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计.md`

### Source Debates

- none

### Planned Files

- append `topic-index` exists `主题库/Agent协作与Harness/README.md`
- create `knowledge-card` new `主题库/Agent协作与Harness/专业知识/01-ToolSearch-与知识库主动-被动更新机制.md`
- create `decision-record` new `主题库/Agent协作与Harness/决策记录/ADR-001-下一阶段不应直接建设“自动入库”，而应先建设“候选发现层”，把主动和被动发现的沉淀机会统一进入工作台队列。.md`
- update-status-on-confirm `distillation-candidate` exists `_workbench/distillations/2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md`

### Checks

- PASS type is distillation-candidate
- PASS schema validation passes
- PASS promotion_status is reviewable
- PASS source_sessions are set
- PASS source_sessions exist
- PASS source_debates exist when set
- PASS target_topic_path is under 主题库/
- PASS stable judgments are present
- PASS concept definitions are present
- PASS decision candidates are present
- PASS validation questions are present
- PASS knowledge relationship section is present
- PASS human confirmation is stated

## 3. db-20260609-001

- Kind: `debate-session`
- Priority: `88`
- Reason: debate already drafted a distillation
- Topic: `enterprise-ai-tech-org`
- Next action: `distillation-drafted`
- Preview: `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`
- Path: `_workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`

### Decision Commands

- `tools/kb preview-debate-review _workbench/debates/2026-06-09-企业技术部门-AI-转型红蓝攻防.md`
- `tools/kb preview-distillation-review _workbench/distillations/2026-06-08-企业技术部门在Agent时代的定位-沉淀候选.md`

### Round 3 Convergence

- 共识：企业技术部门在 Agent 时代应从项目交付和模型接入，升级为可信智能能力资产的建设和运营方。
- 共识：第一阶段应优先建设可问数据集、指标语义、权限治理、工具边界、运行留痕和评测闭环，而不是统一聊天入口。
- 共识：正式知识必须把“组织定位”“平台能力”“样板场景”“失败判据”拆清楚，避免宏大叙事。
- 分歧：是否需要统一 Agent Runtime 仍未定；当前更稳妥的表述是统一语义、治理、评测协议，运行框架可阶段性多元。
- 分歧：样板场景由哪个团队主导仍需结合组织实际，不能在知识库中写死。
- 最弱假设：技术部门的考核和资源配置能支持能力资产运营，而不是继续以项目需求吞吐为主。
- 最弱假设：业务侧愿意在受控数据集和可审计 Agent 下工作，而不是继续使用个人 AI 工具或影子 IT。
- 待验证：黄金问题集通过率、失败回放关闭率、复用资产数量、工具调用审计覆盖率是否能成为有效验收指标。
- ... 1 more

### Distillation Suggestions

- 是否生成沉淀候选：不生成重复候选；将本 debate 作为现有 `ds-20260608-002` 的 `source_debates` 补强来源。
- 建议来源 session：`ws-20260608-002`
- 建议目标主题：`主题库/企业技术部门AI转型/`
- 建议补强内容：在现有沉淀候选中加入失败判据、样板场景选择标准、统一 Runtime 的降级表述和审阅前置要求。

### Drafted Distillations

- `ds-20260608-002` promoted promoted `_workbench/distillations/2026-06-08-企业技术部门在Agent时代的定位-沉淀候选.md`

### Checks

- PASS type is debate-session
- PASS schema validation passes
- PASS source_sessions are set
- PASS source_sessions exist
- PASS issue is present
- PASS round 1 has at least three expert positions
- PASS round 2 has cross-examination
- PASS round 3 has convergence
- PASS distillation suggestion is present
- PASS debate setting has content
- PASS target_topic_path is set or supplied during draft

## 4. _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md

- Kind: `source-note`
- Priority: `90`
- Reason: source already reviewed
- Topic: `agent-harness-skill-system`
- Next action: `source-reviewed`
- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`
- Path: `_workbench/inbox/2026-06-09-Anthropic-Skills-官方仓库-skill-creator.md`

### Decision Commands

- none

### Summary

- Anthropic 官方 `skills` 仓库展示了 Skills 的基本形态：每个 skill 是一个自包含文件夹，由 `SKILL.md`、可选脚本、参考资料、资产和评测/展示工具组成，用于让 Agent 在特定任务上形成可重复行为。
- `skills/skill-creator` 的核心价值不只是“写提示词”，而是把 skill 生命周期做成 harness：捕获意图、编写 skill、构造测试提示、跑 with-skill 与 baseline、让人审阅结果、用断言和 benchmark 评估，再迭代 skill 与触发描述。
- 对当前 Knowledge Workbench 的启发是：专家能力不能只沉淀为角色设定或长 prompt，而应封装成“触发条件 + 上下文加载 + 可执行资源 + 评测反馈 + 人类审阅”的可迁移工作单元。

### Initial Judgment

- 可信度：high。来源是 Anthropic 官方 GitHub 仓库，已固定到 commit `c30d329f5814647c1e2f071020c1e8c1c9893ef1`；但该仓库声明其示例主要用于演示和教育，不能等同于 Claude 产品的全部行为承诺。
- 与当前知识库关系：直接补强“人和 Agent 共同编织知识网络”的工程层。它把我们之前讨论的专家 profile、工作台、入库边界和多轮研讨，进一步推进到可验证的 agent harness 设计。
- 是否建议进入 session：是，已进入 `ws-20260609-001`。后续建议生成一个沉淀候选，主题为“真正的 Agent harness 思想”，但暂不直接进入 `主题库/`。
- 适配判断：应抽象为跨工具原则，而不是 Claude Code 专属实现。对 Codex、Claude Code、OpenAI Agents SDK、MCP、Obsidian 插件而言，可迁移的是结构、触发、资源、评测和审阅机制。
- 风险：如果只学习 `description` 和 `SKILL.md` 形式，会退化成提示词模板；如果忽略 baseline、eval、transcript、human review 和版本快照，就没有形成真正 harness。

### Linked Sessions

- `ws-20260609-001` draft distillation `_workbench/sessions/2026-06-09-Anthropic-Skills-官方仓库与-harness-思想.md`

### Checks

- PASS type is source-note
- PASS schema validation passes
- PASS topic is set
- PASS source title is set
- PASS source is linked to a session
- PASS summary has content
- PASS initial judgment has content
- PASS manual source may omit source_url

## 5. _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md

- Kind: `source-note`
- Priority: `90`
- Reason: source already reviewed
- Topic: `enterprise-ai-tech-org`
- Next action: `source-reviewed`
- Preview: `tools/kb preview-source-review _workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md`
- Path: `_workbench/inbox/2026-06-08-Agent时代企业技术部门资料占位.md`

### Decision Commands

- none

### Summary

- 该来源与研讨议题相关：Agent / LLM 冲击下，企业技术部门未来应提供什么、建设什么，以及如何避免停留在“接入模型和聊天入口”的浅层改造。
- 企业技术部门在 Agent 时代的定位应升级为企业智能能力提供方。
- 核心建设对象不是聊天入口，而是数据、语义、知识、工具、治理、评测和资产运营底座。
- 技术部门应把能力沉淀为可被人、Agent、BI、业务系统共同消费的资产。

### Initial Judgment

- 可信度：medium，来自已关联 session 的阶段性研讨上下文，仍需人工确认。
- 与当前知识库关系：用于补充来源资料，不直接代表正式知识。
- 是否建议进入 session：是，已作为 session source input。
- 待验证：企业技术部门是否具备从项目交付转向能力资产运营的组织条件。
- 待验证：业务侧是否愿意通过受控数据集、指标语义和可审计 Agent 进行自助分析。

### Linked Sessions

- `ws-20260608-002` reviewed distillation `_workbench/sessions/2026-06-08-企业技术部门在Agent时代的定位.md`

### Checks

- PASS type is source-note
- PASS schema validation passes
- PASS topic is set
- PASS source title is set
- PASS source is linked to a session
- PASS summary has content
- PASS initial judgment has content
- PASS manual source may omit source_url
