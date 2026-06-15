---
type: source-register
status: active
updated: 2026-06-15
---

# AI_DB_GPT Material Reference Register

This file records AI_DB_GPT assets found during the material-production search.

## Found References

| Source | Type | How to Use | Boundary |
|---|---|---|---|
| `docs/research/enterprise-buildups.md` | platform strategy / consulting-style research | Business value narrative, capability ladder, roadmap, investment framing | Research source, not current t-agent decision by itself |
| `doc/prd/v1.0/chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` | product quality closure proposal | Report quality objects: `StyleGuide`, `WritingRubric`, `ReportSpec`, `QualityRule`, `GoldenQuestion` | Proposal; use as design pattern, not accepted t-agent scope |
| `docs/research/inspiration/07_manus_uiux_reference_for_chatreport_go6.md` | UI/UX inspiration | Task-first workbench, artifact/evidence visibility, low-noise layout | Reference-only; do not copy Manus brand, assets, or page composition |
| `assets/references/report-engine-v1/html/*.html` | report HTML reference | Inspect report structure and quality expectations for management reports | Acceptance comparison only; do not treat reference HTML as runtime fact |
| `skills/chatreport-artifact-acceptance/` | acceptance skill | Evidence-linked report acceptance principles | ChatReport-specific; adapt concepts to t-agent materials |
| `skills/go6-frontend-handoff-review/` | frontend handoff skill | Workbench/UI review boundaries | Go6-specific; adapt as visual review checklist only |

## Gap

No complete AI_DB_GPT skill was found for consulting-style PPT/HTML material production across business, product, presales, and consulting modes.

The local replacement is:

```text
.agents/skills/t-agent-material-strategy/
```

