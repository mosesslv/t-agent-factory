---
id: kc-20260609-003
type: knowledge-card
topic: agent-harness-skill-system
status: promoted
confidence: medium
created: 2026-06-09
updated: 2026-06-09
source_sessions:
  - ws-20260609-001
source_files:
  - _workbench/distillations/2026-06-09-真正的-Agent-harness-思想-沉淀候选.md
tags:
  - knowledge-workbench
  - human-agent-collaboration
---

# 真正的 Agent harness 思想

## 核心判断

1. 真正的 Agent harness 不是一段 prompt，也不是单纯角色设定，而是把一类任务能力封装为可触发、可执行、可评测、可审阅、可迭代的工作单元。
2. Harness 的核心结构应包括触发契约、执行入口、渐进式上下文、外置资源、可运行脚本、评测集、baseline 对照、人类审阅和版本回退。
3. Anthropic `skill-creator` 的关键启发是：创建和改进 skill 本身也需要 harness，而不是依赖一次性人工感觉。
4. `description` 类字段不是普通说明文字，而是任务路由和触发契约；它应能被 should-trigger、should-not-trigger 和 near-miss 测试验证。
5. 一个专家 profile 只有角色、口吻和偏好还不够；如果要进入持久化协作系统，应升级为可测试 harness。
6. 对当前 Knowledge Workbench 来说，可迁移的是 harness 思想和文件化结构，不是 Claude Code 的具体命令或产品行为。

## 概念定义

1. Agent harness：围绕一个可复用任务能力建立的触发、上下文、工具、评测、审阅和版本控制封装。
2. 触发契约：说明某个专家、skill 或 workflow 应在什么用户意图、输入形态和上下文条件下被调用。
3. 渐进式上下文：短描述常驻，执行入口按需读取，长资料、脚本、模板和资产外置，避免一次性污染上下文窗口。
4. Baseline 对照：同一任务同时比较 with-harness 和 without-harness，或比较新旧 harness，用于判断增量价值。
5. Human review artifact：让人的反馈进入循环的审阅记录，可是 review packet、HTML viewer、Obsidian 页面或结构化 feedback 文件。

## 工作流

本卡来自工作台沉淀候选。详细研讨过程见来源 session。

## 适用边界

- 适用于本主题相关战略研讨和后续知识沉淀。
- 不替代后续实践验证、组织评审或技术方案设计。

## 来源

- [[_workbench/distillations/2026-06-09-真正的-Agent-harness-思想-沉淀候选]]
