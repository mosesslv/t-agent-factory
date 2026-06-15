---
type: index
status: active
created: 2026-06-13
updated: 2026-06-13
generated_by: tools/kb refresh-index
---

# Generated Tool Catalog

本文件是 Knowledge Workbench 的 MCP-ready 工具边界目录。它描述命令、资源、权限级别、写入范围和人工确认要求，不执行任何命令。

## Permission Classes

| Class | Risk | Auto-callable | Writes | Description |
|---|---|---|---|---|
| read-only | low | True | `-` | Only reads Markdown, generated indexes, or Git state. |
| index-write | low | True | `_index/` | Regenerates derived index snapshots without changing source knowledge. |
| workbench-write | medium | False | `_workbench/` | Creates or updates process materials, sessions, debates, sources, or distillation drafts. |
| review-decision | high | False | `_workbench/` | Records a human review decision. Must not be called without explicit human confirmation. |
| formal-structure-write | high | False | `主题库/` | Creates formal topic structure only; still requires explicit user intent. |
| formal-knowledge-write | critical | False | `主题库/, _workbench/` | Writes formal knowledge. Requires prior human approval and an explicit confirm command. |

## Resources

| ID | Runtime | Source Command | Path | JSON |
|---|---:|---|---|---|
| agent-brief | True | `tools/kb agent-brief --json` | `_index/generated-agent-brief.md` | `_index/generated-agent-brief.json` |
| tool-catalog | False | `tools/kb tool-catalog --json` | `_index/generated-tool-catalog.md` | `_index/generated-tool-catalog.json` |
| workspace-dashboard | False | `tools/kb workspace-dashboard --json` | `_index/generated-workspace-dashboard.md` | `_index/generated-workspace-dashboard.json` |
| workspace-ui | False | `tools/kb workspace-ui` | `_index/generated-workspace-ui.html` | `_index/generated-workspace-dashboard.json` |
| decision-guide | False | `tools/kb decision-guide --json` | `_index/generated-decision-guide.md` | `_index/generated-decision-guide.json` |
| rag-scope | False | `tools/kb rag-scope --json` | `_index/generated-rag-scope.md` | `_index/generated-rag-scope.json` |
| review-queue | False | `tools/kb review-queue --json` | `_index/generated-review-queue.md` | `_index/generated-review-queue.json` |
| review-packet | False | `tools/kb review-packet --json` | `_index/generated-review-packet.md` | `_index/generated-review-packet.json` |
| workbench-queue | False | `tools/kb queue --json` | `_index/generated-workbench-queue.md` | `_index/generated-workbench-queue.json` |
| promote-audit | True | `tools/kb promote-audit <distillation> --json` | `_index/generated-promote-audit.md` | `_index/generated-promote-audit.json` |
| version-status | True | `tools/kb version-status --json` | `_index/generated-version-status.md` | `_index/generated-version-status.json` |

## Tools

| ID | Class | Risk | Auto | Human | Confirm | Writes | Command |
|---|---|---|---:|---:|---:|---|---|
| validate | read-only | low | True | False | False | `-` | `tools/kb validate` |
| status | read-only | low | True | False | False | `-` | `tools/kb status --json` |
| version-status | read-only | low | True | False | False | `-` | `tools/kb version-status --json` |
| agent-brief | read-only | low | True | False | False | `-` | `tools/kb agent-brief --json` |
| tool-catalog | read-only | low | True | False | False | `-` | `tools/kb tool-catalog --json` |
| workspace-dashboard | read-only | low | True | False | False | `-` | `tools/kb workspace-dashboard --json` |
| workspace-ui | read-only | low | True | False | False | `-` | `tools/kb workspace-ui` |
| decision-guide | read-only | low | True | False | False | `-` | `tools/kb decision-guide --json` |
| rag-scope | read-only | low | True | False | False | `-` | `tools/kb rag-scope --json` |
| queue | read-only | low | True | False | False | `-` | `tools/kb queue --json` |
| review-queue | read-only | low | True | False | False | `-` | `tools/kb review-queue --json` |
| review-packet | read-only | low | True | False | False | `-` | `tools/kb review-packet --json` |
| search | read-only | low | True | False | False | `-` | `tools/kb search <query>` |
| source-preview | read-only | low | True | False | False | `-` | `tools/kb check-source <source>; tools/kb preview-source-review <source> --json` |
| debate-preview | read-only | low | True | False | False | `-` | `tools/kb check-debate <debate>; tools/kb preview-debate-review <debate> --json` |
| distillation-preview | read-only | low | True | False | False | `-` | `tools/kb check-distillation <distillation>; tools/kb preview-distillation-review <distillation> --json` |
| promote-preview | read-only | low | True | False | False | `-` | `tools/kb preview-promote <distillation> --json; tools/kb promote-audit <distillation> --json` |
| refresh-index | index-write | low | True | False | False | `_index/generated-*.md, _index/generated-*.json` | `tools/kb refresh-index` |
| new-session | workbench-write | medium | False | False | False | `_workbench/sessions/` | `tools/kb new-session <title> --topic <topic>` |
| new-debate | workbench-write | medium | False | False | False | `_workbench/debates/` | `tools/kb new-debate <title> --session <session-id> --target-topic-path <path>` |
| new-source | workbench-write | medium | False | False | False | `_workbench/inbox/` | `tools/kb new-source <title> --url <url> --topic <topic>` |
| link-source | workbench-write | medium | False | False | False | `_workbench/inbox/, _workbench/sessions/` | `tools/kb link-source <source> <session>` |
| prepare-source | workbench-write | medium | False | False | False | `_workbench/inbox/` | `tools/kb prepare-source <source>; tools/kb draft-source-summary <source>` |
| apply-source-draft | workbench-write | medium | False | False | True | `_workbench/inbox/` | `tools/kb apply-source-draft <source> --confirm` |
| draft-distillation-from-debate | workbench-write | medium | False | False | False | `_workbench/distillations/` | `tools/kb draft-distillation-from-debate <debate>` |
| review-source | review-decision | high | False | True | False | `_workbench/inbox/` | `tools/kb review-source <source> reviewed\|needs-evidence\|rejected --note <note>` |
| review-distillation | review-decision | high | False | True | False | `_workbench/distillations/` | `tools/kb review-distillation <distillation> approve\|needs-revision\|reject --note <note>` |
| approve-distillation | review-decision | high | False | True | False | `_workbench/distillations/` | `tools/kb approve-distillation <distillation>` |
| new-topic | formal-structure-write | high | False | True | False | `主题库/` | `tools/kb new-topic <title> --topic <topic>` |
| promote-confirm | formal-knowledge-write | critical | False | True | False | `主题库/, _workbench/distillations/` | `tools/kb promote --confirm <distillation>` |

## Guardrails

- Expose read-only tools and resources first.
- Do not auto-call review-decision, formal-structure-write, or formal-knowledge-write tools.
- Do not call promote-confirm unless the user explicitly approved the distillation and promote-audit gates are understood.
- Keep Markdown and Git as the source of truth; MCP clients are adapters, not owners of knowledge state.
- Refresh generated indexes after any accepted write.
