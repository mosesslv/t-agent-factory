---
type: integration-plan
status: draft
created: 2026-06-08
updated: 2026-06-08
scope: v2-web-clipper-input
---

# Web Clipper 输入规范

## 目标

让外部网页、文章、产品资料和框架材料先进入可控输入区，而不是直接污染正式知识库。

## 默认落点

外部资料默认进入：

```text
_workbench/inbox/
```

也可以用 CLI 创建同结构来源：

```bash
tools/kb new-source "来源标题" --url "https://example.com" --topic pending-classification
```

如果资料已经明确属于某个正式主题，也可以进入对应主题的 `sources/`，但仍需要标记为 source，不直接写成知识卡。

## 建议 frontmatter

```yaml
---
type: source-note
status: inbox
created: {{date}}
updated: {{date}}
source_type: web
source_url: "{{url}}"
source_title: "{{title}}"
topic: pending-classification
review_status: unreviewed
---
```

可复用模板见：

- [[_meta/templates/来源资料模板]]

## 处理流程

```text
Web Clipper 输入
→ _workbench/inbox/
→ Agent 摘要与可信度判断
→ 关联到 session 或 distillation
→ 人确认后才可能进入正式主题 sources 或知识卡
```

## 禁止事项

- 不把网页摘录直接 promote 成正式知识。
- 不把来源材料和稳定判断混写在同一文件。
- 不把未读完的网页资料标记为 reviewed。
