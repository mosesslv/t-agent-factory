---
type: architecture-diagram
status: draft
lifecycle: roadmap-artifact
created: 2026-06-15
updated: 2026-06-15
language: zh-CN
depends_on:
  - agent.md
  - 02-roadmap/t-agent-reality-roadmap-2026-h2.md
  - 09-agents/expert-style-guide.md
---

# Reality Roadmap 操作架构图

本文件是 `02-roadmap/t-agent-reality-roadmap-2026-h2.md` 的图示 artifact。

## 1. H2 阶段架构

```mermaid
flowchart LR
  A["AI_DB_GPT / ChatReport 毛坯基座"] --> B["6 月 Reality Lock"]
  B --> C["7-8 月 Platformization Alpha"]
  C --> D["9-10 月 Trusted Report Workspace Beta"]
  D --> E["11-12 月 Enterprise Beta / Governance Lite"]

  B --> B1["PRD / 对象边界 / Backlog / Eval"]
  C --> C1["共享契约候选：Dataset / SourceRef / Run / Artifact / Evidence / Eval"]
  D --> D1["工作台：ReportArtifact / EvidenceGraph / Reviewer Gate"]
  E --> E1["治理骨架：Policy / AuditLog / Action Gate / Release Gate"]

  S["中文 + 顶级 AI 产品/研究/工程风格"] --> B
  S --> C
  S --> D
  S --> E
```

## 2. 可信分析闭环

```mermaid
flowchart TD
  U["用户任务 / 业务问题"] --> DS["SourceRef / Dataset"]
  DS --> AR["AnalysisRun"]
  AR --> ST["StepRun / ToolCall"]
  ST --> AF["Artifact：表格 / 图表 / SQL / 文本片段"]
  AF --> EV["Evidence：数据 / 指标 / 知识 / 规则 / reviewer"]
  EV --> RP["ReportArtifact / Workbench"]
  RP --> EA["EvalResult"]
  EA --> RD{"ReviewerDecision"}
  RD -->|通过| PUB["可发布 / 可复用"]
  RD -->|阻断| FB["Feedback / Failure Case / Backlog"]
  FB --> DS
```

## 3. 文档与评审操作系统

```mermaid
flowchart TB
  AG["agent.md 项目 SSOT"] --> RM["canonical roadmap"]
  AG --> SG["expert-style-guide"]
  RM --> RR["reality roadmap"]
  SG --> RR
  RR --> PRD["V2 Reality PRD"]
  RR --> CT["platform object contracts"]
  RR --> EVL["golden cases / eval plan"]
  RR --> BL["backlog / owner map"]
  PRD --> RV["resident-agent review"]
  CT --> RV
  EVL --> RV
  BL --> RV
  RV --> DEC{"PDR / ADR needed?"}
  DEC -->|是| PDR["05-decisions"]
  DEC -->|否| ITER["06-iteration / backlog update"]
  PDR --> AG
  ITER --> RR
```

## 4. 专家面板路由

```mermaid
flowchart LR
  Q["用户议题 / 新材料 / 路线问题"] --> PF["ProductFactory 检索"]
  PF --> KL["Knowledge Librarian"]
  PF --> PL["Product Lead"]
  PF --> DP["Data Product"]
  PF --> AA["Agent Architect"]
  PF --> EL["Eval Lead"]
  PF --> RT["Red Team"]

  PL --> OUT["中文项目 artifact"]
  DP --> OUT
  AA --> OUT
  EL --> OUT
  RT --> OUT
  KL --> OUT

  OUT --> STORE["PRD / Roadmap / Contract / Eval / Decision / Source Card"]
```

## 5. 使用规则

- roadmap、PRD、architecture、eval 文档涉及三个以上组件时，优先补 Mermaid 图。
- 图必须表达结构、依赖、流转或门禁，不用于装饰。
- 若要对外汇报、导出图片、做精细视觉布局，再补 draw.io 版本。
- 图中的对象名必须与 contract / roadmap 中的对象名一致。
