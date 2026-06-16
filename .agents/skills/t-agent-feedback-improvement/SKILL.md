---
name: t-agent-feedback-improvement
description: Capture user feedback about Codex/t-agent behavior, style, routing, agents, or skills and turn it into learning events or improvement proposals. Use when the user says the assistant should "以后这样/别这样", critiques the assistant's framing, praises a reusable response pattern, reports a repeated miss, or asks to make a behavior default.
---

# t-agent Feedback Improvement

## Quick Start

1. Read `agent.md`.
2. Read `09-agents/feedback-driven-improvement-protocol.md`.
3. Classify the feedback signal:
   - negative correction;
   - positive reinforcement;
   - preference drift;
   - skill routing miss;
   - eval failure.
4. Adapt the current response immediately when safe.
5. Decide whether to persist:
   - one-off feedback: learning event only;
   - repeated/high-impact feedback: improvement proposal;
   - accepted rule change: review gate + eval.

## Output Targets

| Feedback scope | Target |
|---|---|
| Style / wording | `09-agents/expert-style-guide.md` |
| Project default behavior | `agent.md` or `AGENTS.md` |
| Resident agent behavior | `09-agents/default-router.md` or `09-agents/profiles/` |
| Skill trigger / workflow | `.agents/skills/` or `09-agents/productivity-skills-integration.md` |
| Eval gap | `07-evals/` |
| Candidate proposal | `06-iteration/templates/improvement-proposal.md` + `06-iteration/improvement-proposals/` |

## Hard Rules

- Do not apply persistent changes to accepted truth without review/approval.
- Do not convert a single compliment into a permanent rule.
- Do not store secrets, private credentials, or full raw transcripts.
- Improvement proposals should be one file at a time and include exact original/proposed snippets.
- When the feedback is about product work, not agent behavior, route to Product Lead / User Research instead.
