---
name: mcp-boundary-designer-for-kb
description: Use in this Knowledge Workbench project when designing MCP resources, tool definitions, permission classes, connector boundaries, or agent-safe exposure of tools/kb. Focuses on safe read-first integration and human-confirmed write gates.
---

# MCP Boundary Designer For KB

## Goal

Expose Knowledge Workbench capabilities to MCP clients without letting automation bypass review or formal knowledge gates.

## Read First

- `_integrations/mcp/README.md`
- `_index/generated-tool-catalog.md`
- `_index/generated-rag-scope.md`
- `_meta/知识入库规则.md`
- `tools/README.md`

## Permission Classes

Use the project classes:

- `read-only`: safe auto-call
- `index-write`: safe after accepted writes
- `workbench-write`: user intent required
- `review-decision`: explicit human review required
- `formal-structure-write`: explicit human intent required
- `formal-knowledge-write`: explicit approval and confirm required

## Resource Strategy

Expose these first:

- `agent-brief`
- `tool-catalog`
- `workspace-dashboard`
- `workspace-ui`
- `rag-scope`
- `review-queue`
- `review-packet`
- `workbench-queue`

Prefer resources for context and read-only tools for previews.

## Tool Strategy

Auto-callable:

- `validate`
- `status`
- `search`
- `source-preview`
- `debate-preview`
- `distillation-preview`
- `promote-preview`

Never auto-call:

- `review-source`
- `review-distillation`
- `approve-distillation`
- `promote --confirm`

## Output

When designing an MCP boundary, produce:

- resource list
- tool list
- permission class
- write paths
- human confirmation requirement
- failure and rollback behavior
