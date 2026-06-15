---
type: integration-plan
status: draft
created: 2026-06-09
updated: 2026-06-09
scope: v2-agent-framework-radar
---

# Agent 框架雷达 2026-06

本页记录 2025-06 至 2026-06 期间值得关注的 Agent、RAG、工作台和前端交互框架。它是集成研究草案，不代表已经选型，也不引入任何依赖。

## 结论

当前最小迭代不应直接上重型 agent runtime。建议按三层推进：

- 工作台 UI 和人机协作事件层：优先评估 Vercel AI SDK 5 与 AG-UI。
- 多专家持久化 runtime：优先小范围评估 LangChain DeepAgents 和 Microsoft Agent Framework。
- 本地轻量 Python 自动化：保留 OpenAI Agents SDK、Pydantic AI 和 LightAgent 作为候选，不作为第一批主线依赖。

## 当前最适合本库的路线

| 优先级 | 候选 | 用法 | 判断 |
|---:|---|---|---|
| 1 | Vercel AI SDK 5 | 未来工作台 UI、流式对话、工具事件、语音输入 | 适合先做前端工作台原型，不改变 Markdown/Git 真相源 |
| 2 | AG-UI | Agent 与前端的事件协议 | 虽然仓库创建略早于 2025-06，但它正好补“人看 UI、Agent 走后台事件”的协议层 |
| 3 | LangChain DeepAgents | 长周期多专家、文件系统上下文、子 agent、记忆 | 适合后续独立 sandbox POC，不适合直接写入 `主题库/` |
| 4 | Microsoft Agent Framework | 企业级多 agent、治理、观测、Python/.NET | 适合企业技术部门议题验证，但重量偏高 |
| 5 | OpenAI AgentKit / Agents SDK | OpenAI-native agent 构建、ChatKit、评估、SDK runtime | 适合 OpenAI 平台深度绑定场景；AgentKit 部分能力仍有 beta 边界 |
| 6 | Mastra | TypeScript agent、workflow、RAG、memory、MCP | 候选强，但不是严格 2025-06 后新出现；可作为 TypeScript 后端参考 |
| 7 | Pydantic AI | 类型安全 Python agent、eval、observability | 成熟度高，适合局部工具化，不适合承担 UI 工作台 |
| 8 | LightAgent | 轻量 Python、多 agent、MCP、memory | 适合低成本实验，生态和星标规模小于主流候选 |

## 候选快照

GitHub 指标来自 GitHub REST API，采集时间为 2026-06-09，星标会随时间变化。

| 候选 | 严格 2025-06+ | 仓库创建 | Stars | Forks | 语言 | 主要价值 |
|---|---:|---|---:|---:|---|---|
| LangChain DeepAgents | 是 | 2025-07-27 | 24194 | 3425 | Python | 长周期 agent harness、子 agent、文件系统上下文、LangGraph runtime |
| Microsoft Agent Framework | 部分是 | 2025-04-28 | 11140 | 1864 | Python | Python/.NET 多 agent workflow、治理、观测、Azure/Foundry 路线 |
| OpenAI AgentKit | 是 | 产品发布 2025-10-06 | - | - | 平台能力 | Agent Builder、ChatKit、Connector Registry、Evals |
| Vercel AI SDK 5 | 是 | 仓库 2023-05-23，v5 发布 2025-07-31 | 24733 | 4552 | TypeScript | 前端 chat、agentic loop control、工具生命周期、MCP 命名一致性 |
| LightAgent | 部分是 | 2025-01-20，v0.4 发布 2025-06-12 | 1088 | 141 | Python | 轻量 agent、memory、MCP、skills、多 agent 协作 |
| AG-UI | 略早 | 2025-05-07 | 14140 | 1265 | TypeScript | Agent 到前端应用的事件协议、人机交互、状态同步 |
| Mastra | 否，但活跃 | 2024-08-06 | 24883 | 2202 | TypeScript | Agent、workflow、RAG、memory、MCP、observability |
| Pydantic AI | 否，但活跃 | 2024-06-21 | 17619 | 2192 | Python | 类型安全 agent、模型无关、Logfire/OTel observability |
| OpenAI Agents SDK | 否，但活跃 | 2025-03-11 | 27000 | 4173 | Python | 多 agent workflows、handoffs、guardrails、sessions、tracing、sandbox agents |

## 来源判断

- Microsoft Agent Framework 在 2025-10-01 进入 public preview，官方说明它统一 AutoGen 与 Semantic Kernel 基础，面向多 agent orchestration、observability、durability、compliance、A2A 和 MCP。来源：[Microsoft Azure Blog](https://azure.microsoft.com/en-us/blog/introducing-microsoft-agent-framework/)；仓库：[microsoft/agent-framework](https://github.com/microsoft/agent-framework)。
- LangChain DeepAgents 仓库创建于 2025-07-27；官方博客在 2025-10-28 说明它面向 long-horizon work，核心元素包括 planning tool、filesystem、subagents 和 prompts，并在 0.2 增加 pluggable backends。来源：[LangChain Blog](https://www.langchain.com/blog/doubling-down-on-deepagents)；仓库：[langchain-ai/deepagents](https://github.com/langchain-ai/deepagents)。
- DeepAgents 2026-05 v0.6 把 streaming、Agent Server endpoints、SDK、delta channels、checkpoint storage 优化推到前台，说明它正在从 harness 往生产运行时体验靠近。来源：[Deep Agents v0.6](https://www.langchain.com/blog/deep-agents-0-6)。
- OpenAI AgentKit 于 2025-10-06 发布，包括 Agent Builder、Connector Registry、ChatKit、Evals 和 RFT 相关能力；ChatKit 和新 Evals 已 GA，Agent Builder 仍是 beta。来源：[OpenAI AgentKit](https://openai.com/index/introducing-agentkit/)。
- Vercel AI SDK 5 于 2025-07-31 发布，强调 type-safe chat、agentic loop control、tool improvements、V2 specs，并把 tool schema 命名向 MCP 对齐。来源：[Vercel AI SDK 5](https://vercel.com/blog/ai-sdk-5)；仓库：[vercel/ai](https://github.com/vercel/ai)。
- LightAgent v0.4.0 于 2025-06-12 发布，后续 2025-2026 持续增强 session toolset constraints、debug、structured streaming events 和 LightSwarm。来源：[wanxingai/LightAgent](https://github.com/wanxingai/LightAgent)。
- AG-UI 是面向 Agent-User Interaction 的开放事件协议，说明自己补 MCP 和 A2A 之外的前端交互层，支持 streaming、双向状态同步、generative UI、human-in-the-loop，并列出 Microsoft Agent Framework、Mastra、Pydantic AI 等集成。来源：[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)。
- Mastra 是 TypeScript AI agent/workflow/RAG/memory/MCP 框架，仓库和产品资料显示它适合 TypeScript 全栈团队，但严格新出现时间早于本次筛选窗口。来源：[Mastra](https://mastra.ai/)；仓库：[mastra-ai/mastra](https://github.com/mastra-ai/mastra)。
- Pydantic AI 是 Python agent framework，强调 production grade、模型无关、Logfire/OpenTelemetry observability；它不满足“2025-06 后新出”硬条件，但适合作为局部 typed tool/eval 层。来源：[pydantic/pydantic-ai](https://github.com/pydantic/pydantic-ai)。
- OpenAI Agents SDK 仓库创建早于 2025-06，但当前已覆盖 handoffs、tools、guardrails、human-in-the-loop、sessions、tracing 和 sandbox agents；适合 OpenAI-native Python POC。来源：[openai/openai-agents-python](https://github.com/openai/openai-agents-python)。

## 建议试验顺序

### POC 1: 只读工作台 UI

- 候选：Vercel AI SDK 5 + AG-UI。
- 当前基线：`tools/kb workspace-ui` 已能生成 `_index/generated-workspace-ui.html` 静态只读工作台。
- 目标：后续若升级为 Vercel AI SDK 5 + AG-UI，继续复用 `_index/generated-workspace-dashboard.json`、`generated-review-queue.json`、`generated-rag-scope.json` 的信息架构。
- 禁止：直接写 `_workbench/` 或 `主题库/`。
- 成功标准：能看见审阅焦点、RAG 范围、只读审阅包，并能复制建议命令。

### POC 2: 多专家持久化讨论 sandbox

- 候选：LangChain DeepAgents 或 Microsoft Agent Framework。
- 目标：在 sandbox 里读取 `_agents/` 和 `_workbench/sessions/`，生成 `_workbench/debates/` 草稿。
- 禁止：自动 review、approve、promote。
- 成功标准：能保留每轮专家观点、分歧、证据请求和沉淀建议，输出符合现有 `new-debate` / `draft-distillation-from-debate` 结构。

### POC 3: Python 轻量工具代理

- 候选：OpenAI Agents SDK、Pydantic AI、LightAgent。
- 目标：封装 `tools/kb` 只读命令和 `rag-scope` 资源。
- 禁止：默认开放 review-decision 或 formal-knowledge-write 工具。
- 成功标准：代理能解释当前工作台状态，并明确哪些动作需要人工确认。

## 暂不做

- 暂不把任何框架引入主链路。
- 暂不建设完整 MCP server。
- 暂不让外部 agent runtime 直接写 `主题库/`。
- 暂不把 `_workbench/inbox/` 接入默认 RAG。

## 下一步

- 基于 `_index/generated-workspace-ui.html` 做浏览器和 Obsidian 打开体验检查。
- 若静态 HTML 不够，再为 POC 1 写 Next.js 或 Obsidian 插件规格。
- 为 POC 2 定义 sandbox 输入输出契约。
- 为 POC 3 从 `_index/generated-tool-catalog.json` 生成只读 tool definitions。
