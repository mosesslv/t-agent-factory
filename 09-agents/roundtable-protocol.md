# Roundtable Protocol

## When To Run

Run a t-agent product roundtable when a topic is:

- strategically ambiguous;
- likely to change roadmap, PRD, data contract, architecture, or eval criteria;
- contested across product, data, architecture, or governance concerns;
- based on many raw materials that need synthesis;
- a candidate for a Product Decision, ADR, PRD, or backlog reshaping.

Do not run a full roundtable for typo fixes, simple formatting, file moves, command output, or narrow source registration.

## Default Seats

| Seat | Resident agent | Core question |
|---|---|---|
| Product | product-lead | What should this become, and what should it not become? |
| User / Market | user-research | Who feels the pain, how often, and what evidence is missing? |
| Data Product | data-product | What data, metrics, semantics, permissions, and contracts make it trustworthy? |
| Agent Architecture | agent-architect | What runtime, tool, skill, trace, and artifact boundary is needed? |
| Eval | eval-lead | How will we know this works and does not regress? |
| Knowledge | knowledge-librarian | What sources support this, and where should the result live? |
| Red Team | red-team | Where are we overclaiming, overbuilding, or creating governance risk? |

## Lightweight Output

Use this form for normal conversations:

```text
Decision: build | narrow | research | kill
Why: evidence / assumption / unknown
Smallest useful next artifact:
Non-goals:
Main disagreement:
Acceptance check:
Storage target:
```

## Full Output

Use this form when writing project artifacts:

1. Context and source list.
2. Agent positions.
3. Agreements.
4. Disagreements.
5. Product Committee decision.
6. Scope and non-goals.
7. Architecture / data / eval implications.
8. Required updates to PRD, roadmap, contracts, evals, or source register.
9. Open questions.

## Decision Storage

- Product shape or roadmap changes: `05-decisions/product-decisions/`
- Architecture or workspace governance changes: `05-decisions/`
- PRD changes: `01-product/prd/`
- Backlog changes: `02-roadmap/backlog/`
- Eval changes: `07-evals/`
- Unconfirmed or messy material: `06-iteration/review-queue/`

## Source Discipline

Every roundtable conclusion should be labeled:

- `evidence`: supported by current project files, ProductFactory memory, or external sources.
- `assumption`: plausible but not yet verified.
- `unknown`: still needs data, stakeholder confirmation, or implementation proof.
