---
type: source-note
status: draft
created: 2026-06-13
updated: 2026-06-13
source_type: codex-attachment
source_url: "attachment://8fc1e2be-5fb5-4b64-ae5a-4a43c2af50b9/pasted-text.txt"
source_title: "Claude Code ToolSearch 机制研究摘录"
topic: agent-harness-skill-system
review_status: linked-to-session
---

# 来源资料：Claude Code ToolSearch 机制研究摘录

## 摘要

- 用户提供的材料判断：这里应称为 `ToolSearch`，它不是代码搜索，而是工具定义的搜索与延迟加载机制。
- 材料区分了教学仓库 `shareAI-lab/learn-claude-code` 与 Claude Code 官方产品：前者有工具注册、分发、任务工具和记忆/任务系统教学实现，但没有完整的 ToolSearch；后者公开工具清单中包含 ToolSearch，源码层面的更多细节来自非官方源码研究与结构推断。
- ToolSearch 的核心价值是把工具空间从“全量暴露”改为“按需发现”：常驻少量核心工具，把 MCP、插件和长尾业务工具作为 deferred tools，在需要时通过工具搜索加载完整 schema。
- 该机制解决的是工具数量膨胀后的上下文成本、工具选择噪音、MCP/插件生态扩展、prompt cache 稳定性和权限治理问题。
- 对本 Knowledge Workbench 的启发是：知识更新和记忆沉淀也不应只依赖当前会话的主观判断，应逐步设计“候选发现 -> 风险分层 -> 按需加载证据 -> 人工确认 -> 正式入库”的能力检索与受控沉淀链路。

## 关键摘录

- ToolSearch 的搜索对象是工具定义，而不是文件、代码或互联网内容；它更接近面向 Agent 能力空间的 capability search。
- Deferred tools 只先暴露工具名或轻量索引，模型需要时再调用 ToolSearch 获取完整 tool reference 和 schema。
- `searchHint` 一类字段是工具被发现的触发线索，承担能力路由作用，而不是普通说明文字。
- MCP 工具适合默认延迟加载，因为企业内部工具和插件工具数量可能快速膨胀。
- 完整执行链路应包含：工具存在、是否 deferred、是否被搜索找到、是否加载完整定义、是否通过权限和 sandbox、是否执行。

## 初步判断

- 可信度：medium。材料综合了公开文档、教学仓库和非官方源码研究；其中“官方公开工具清单存在 ToolSearch”可信度较高，具体内部实现细节应标为结构推断，不能当作官方源码事实。
- 与当前知识库关系：补强 `Agent协作与Harness` 主题中的“能力空间治理”部分，也给当前 Knowledge Workbench 的主动/被动知识更新机制提供了设计类比。
- 是否建议进入 session：是，已进入 `ws-20260613-001`。建议后续把“ToolSearch 作为能力检索机制”与“知识沉淀候选发现机制”合并提炼成候选知识。

## 后续处理

- [x] 关联到研讨 session
- [x] 生成摘要
- [ ] 人工审阅该 source note
- [ ] 根据需要补充官方 Claude Code 工具文档证据
- [ ] 生成或审阅沉淀候选

## 已关联 Session

- [[_workbench/sessions/2026-06-13-ToolSearch与知识更新机制审计]] (`ws-20260613-001`)
