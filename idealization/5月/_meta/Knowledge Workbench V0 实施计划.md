---
type: implementation-plan
status: active
created: 2026-06-08
updated: 2026-06-08
scope: knowledge-workbench-v0
---

# Knowledge Workbench V0 实施计划

## 目标

把当前目录升级为一个最小可运行的 Knowledge Workbench V0：

```text
人输入碎片议题
→ Agent / 专家团队在工作台持续研讨
→ 形成沉淀候选
→ 人确认
→ 进入正式知识库
→ 全过程可追踪、可回退、可被 Obsidian 阅读
```

V0 不建设复杂 Agent 平台，不迁移旧知识，不开发 Web App。V0 的重点是边界、入口、模板、版本纪律和最小闭环。

## 当前基线

当前项目已经初始化 Git，基线提交：

```text
8fe6be9 chore: establish knowledge base baseline
```

现有材料保持原位：

- `gather/`: 共识、能力清单、v1/v2 方案
- `plan/`: 平台规划、架构、产品、工程拆解
- `presentation/`: 展示材料
- `主题库/`: 正式知识库雏形
- `内部分享/`: 分享稿和原始材料
- `模版表/`: 外部模板素材

## V0 新增结构

```text
00-知识工作台入口.md
AGENTS.md

_meta/
  Knowledge Workbench V0 实施计划.md
  工作流说明.md
  知识入库规则.md
  版本管理规则.md
  templates/

_workbench/
  inbox/
  sessions/
  debates/
  distillations/

_agents/

_index/
  manifest.md
  topic-map.md
```

## 层级职责

| 层级 | 目录 | 职责 |
|---|---|---|
| 正式知识库 | `主题库/` | 稳定判断、框架、决策、证据、报告 |
| 工作台 | `_workbench/` | 输入、讨论、攻防、假设、沉淀候选 |
| 专家层 | `_agents/` | 专家角色、长期视角、判断偏好 |
| 元规则 | `_meta/` | 工作流、模板、入库规则、版本规则 |
| 索引 | `_index/` | 给人和 Agent 使用的导航与盘点 |

## 迭代路线

### V0: Markdown + Obsidian + Git

- 建立工作台结构。
- 建立 Obsidian 入口。
- 建立专家 profile。
- 建立 session、distillation、knowledge card、decision record 模板。
- 建立入库规则和版本规则。
- 用一个真实议题完成闭环。

### V1: Obsidian 展示增强 + 本地校验

- 使用 Dataview 或 Bases 展示最近研讨、待沉淀、已共识、正式主题。
- 使用 Web Clipper 将网页资料进入 `sources/` 或 `_workbench/inbox/`。
- 完善 `_index/manifest.md` 和 `_index/topic-map.md`。
- 增加 `_meta/schema/`，定义 session、distillation、knowledge-card、decision-record 的必填字段。
- 增加 `tools/kb`，提供 `status`、`validate`、`new-session`、`promote --dry-run`。
- Promote 在 V1 仍不自动写正式知识库，只做前置检查。

### V2: CLI 和轻量索引

- 引入更完整的本地索引或搜索命令。
- 评估 Khoj 作为 Obsidian/Markdown 知识问答层。
- 建立 Web Clipper 输入规范。
- 继续保持 Markdown/Git 为真相源。
- V2 初始搜索能力由 `tools/kb search` 提供，先做本地 Markdown 搜索，不引入向量库。
- V2 初始索引快照由 `tools/kb refresh-index` 提供，生成当前 typed Markdown manifest 和 promote queue。
- V2 机器可读入口由 `tools/kb status --json` 和 `_index/generated-*.json` 提供。
- V2 跨客户端接手入口由 `tools/kb agent-brief --json` 和 `_index/generated-agent-brief.md/json` 提供，确保 Codex、Claude Code、ChatGPT、自写脚本或未来 MCP 工具能读取同一套首读入口、安全边界和下一步任务。
- V2 MCP-ready 工具边界由 `tools/kb tool-catalog --json` 和 `_index/generated-tool-catalog.md/json` 提供，明确只读、工作台写入、人工审阅决定和正式入库工具的权限级别。
- V2 Obsidian 人类前端由 `tools/kb workspace-dashboard --json` 和 `_index/generated-workspace-dashboard.md/json` 提供，首屏聚合决策焦点、门禁状态、工作台层级和受保护动作。
- V2 静态只读工作台 UI 由 `tools/kb workspace-ui` 和 `_index/generated-workspace-ui.html` 提供，允许人用浏览器查看审阅焦点、门禁、RAG 范围和安全命令。
- V2 人工审阅决策辅助由 `tools/kb decision-guide --json` 和 `_index/generated-decision-guide.md/json` 提供，列出每个待审任务的证据摘要、可选动作、适用条件、风险和 note 模板。
- V2 检索/RAG 边界由 `tools/kb rag-scope --json` 和 `_index/generated-rag-scope.md/json` 提供，明确 include、cautious、exclude 路径和检索风险。
- V2 框架雷达由 `_integrations/agent-framework-radar-2026-06.md` 提供，先记录来源、筛选窗口、GitHub 指标和 POC 顺序，不直接引入依赖。
- V2 主题和来源入口由 `tools/kb new-topic` 与 `tools/kb new-source` 提供。

### V3: 可选工作台 UI 和真实 Agent Runtime

- Mastra + Vercel AI SDK: 本地 Web 工作台和多专家交互 UI。
- Khoj: Obsidian/Markdown 知识问答层。
- LangGraph / OpenAI Agents SDK / Letta: 仅在需要真实持久化多 Agent runtime 时评估。

## 验收标准

- 打开 `00-知识工作台入口.md` 可以看到正式知识、工作台、专家、规则入口。
- 新议题可以按模板创建 session。
- 工作台内容默认不会进入 `主题库/`。
- 沉淀候选必须人工确认后才能 promote。
- 每个正式知识卡可以追溯到来源 session。
- 所有结构性修改可以通过 Git 回退。
- Agent 下次进入项目时可以通过 `AGENTS.md` 和 `_meta/工作流说明.md` 理解协作方式。

## V1 验收标准

- `tools/kb validate` 能检查 typed Markdown frontmatter。
- `tools/kb status` 能列出 session、distillation、agent、index、正式知识等状态。
- `tools/kb new-session "议题名称"` 能创建标准 session。
- `tools/kb promote --dry-run <distillation>` 能检查来源、目标目录、promotion_status 和人工确认要求。
- `00-知识工作台入口.md` 能显示 Dataview 状态视图。

## V2 初始验收标准

- `tools/kb search "<关键词>"` 能在知识根目录中搜索 Markdown 内容。
- `tools/kb refresh-index` 能生成 `_index/generated-manifest.md` 和 `_index/generated-promotion-queue.md`。
- `tools/kb refresh-index` 能生成 `_index/generated-manifest.json` 和 `_index/generated-promotion-queue.json`。
- `tools/kb status --json` 能输出机器可读状态。
- `tools/kb agent-brief --json` 能输出跨客户端接手上下文，包括版本状态、首读入口、审阅任务、安全规则和推荐命令。
- `tools/kb tool-catalog --json` 能输出 MCP-ready 工具目录，包括 resources、permission classes、risk、writes、auto-callable 和人工确认要求。
- `tools/kb workspace-dashboard --json` 能输出 Obsidian 首屏总览，包括 snapshot、decision_focus、gate_status、workspace_layers 和 protected_actions。
- `tools/kb workspace-ui` 能输出静态只读 HTML，并由 `tools/kb refresh-index` 生成 `_index/generated-workspace-ui.html`。
- `tools/kb decision-guide --json` 能输出人工审阅决策指南，包括 evidence_summary、decision_options、guardrails 和 note_template。
- `tools/kb rag-scope --json` 能输出检索/RAG 范围目录，包括 include、cautious、exclude 路径、priority、conditions、risk 和 guardrails。
- `_integrations/agent-framework-radar-2026-06.md` 能列出 2025-06 之后的新候选、相邻候选、来源、风险和最小 POC 顺序。
- `tools/kb new-topic` 能创建正式主题骨架。
- `tools/kb new-source` 能把外部资料放入 `_workbench/inbox/`。
- `tools/kb approve-distillation` 和 `tools/kb promote --confirm` 能完成显式确认后的受控入库。
- `_integrations/khoj/README.md` 明确 Khoj 接入边界。
- `_integrations/obsidian/Web-Clipper输入规范.md` 明确外部资料先进入 inbox 或 sources，而不是直接进入正式知识。

## V2 准入条件

- V1 校验稳定通过。
- 至少完成一次真实 promote。
- `主题库/` 内正式知识卡具备可追溯 `source_sessions`。
- 明确哪些目录进入 RAG，哪些目录默认排除，并可通过 `_index/generated-rag-scope.json` 被非 Codex 客户端读取。

## 第一条建议试运行议题

```text
人和 Agent 共同编织知识网络
```

试运行产出：

- `_workbench/sessions/2026-06-08-人和Agent共同编织知识网络.md`
- `_workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md`
- 由人确认后，最多 promote 1-2 条正式知识卡到 `主题库/`。
