#!/usr/bin/env python3
"""Validate the t-agent knowledge-base capability wiring.

This is a lightweight repository-local eval runner. It does not judge model
quality; it checks whether the KB-1 operating assets exist and still satisfy
the minimum contracts behind KB-EVAL-001..008.
"""

from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import pathlib
import re
import sys
from typing import Iterable


ROOT = pathlib.Path(__file__).resolve().parents[2]


@dataclasses.dataclass(frozen=True)
class Case:
    case_id: str
    description: str
    required_files: tuple[str, ...]
    required_patterns: tuple[tuple[str, str], ...]


CASES: tuple[Case, ...] = (
    Case(
        "KB-EVAL-001",
        "External repo/source intake lands in source/evidence, not directly in roadmap.",
        (
            "04-sources/source-register.md",
            "04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md",
        ),
        (
            ("04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md", "peterskoett/self-improving-agent"),
            ("04-sources/evidence-cards/2026-06-15-docs-as-code-self-improvement-sources.md", "Matt Pocock productivity skills"),
            ("06-iteration/docs-as-code-governance.md", "不把长篇外部资料复制进仓库"),
        ),
    ),
    Case(
        "KB-EVAL-002",
        "User correction is recorded as learning and does not become an unchecked permanent rule.",
        (
            "06-iteration/learnings/2026-06-15-learning-events.md",
            "09-agents/self-improvement-protocol.md",
        ),
        (
            ("06-iteration/learnings/2026-06-15-learning-events.md", "不是光回答或者写文档"),
            ("09-agents/self-improvement-protocol.md", "review-gated"),
            ("09-agents/self-improvement-protocol.md", "不自动写入 `agent.md`"),
        ),
    ),
    Case(
        "KB-EVAL-003",
        "grill-me maps to Red Team/Product Lead/Eval Lead and durable outputs.",
        ("09-agents/productivity-skills-integration.md",),
        (
            ("09-agents/productivity-skills-integration.md", "`grill-me`"),
            ("09-agents/productivity-skills-integration.md", "red-team, product-lead, eval-lead"),
            ("09-agents/productivity-skills-integration.md", "roundtable"),
        ),
    ),
    Case(
        "KB-EVAL-004",
        "Recurring workflow can become a local skill with triggers and eval.",
        (
            ".agents/skills/t-agent-knowledge-base-capability/SKILL.md",
            "09-agents/productivity-skills-integration.md",
        ),
        (
            (".agents/skills/t-agent-knowledge-base-capability/SKILL.md", "description:"),
            (".agents/skills/t-agent-knowledge-base-capability/SKILL.md", "Use when"),
            ("09-agents/productivity-skills-integration.md", "反触发"),
        ),
    ),
    Case(
        "KB-EVAL-005",
        "New product idea has an inbox/review queue path before accepted truth.",
        (
            "06-iteration/inbox/README.md",
            "06-iteration/review-queue/README.md",
            "06-iteration/templates/knowledge-intake.md",
        ),
        (
            ("06-iteration/inbox/README.md", "Do not present inbox notes as accepted product direction"),
            ("06-iteration/templates/knowledge-intake.md", "status: raw | candidate | promoted | rejected"),
        ),
    ),
    Case(
        "KB-EVAL-006",
        "Default architecture/protocol changes require review gate and decision records.",
        (
            "06-iteration/docs-as-code-governance.md",
            "05-decisions/product-decisions/PDR-2026-06-15-knowledge-base-capability.md",
        ),
        (
            ("06-iteration/docs-as-code-governance.md", "Review Gate"),
            ("06-iteration/docs-as-code-governance.md", "PDR 或 ADR"),
            ("05-decisions/product-decisions/PDR-2026-06-15-knowledge-base-capability.md", "decision: build"),
        ),
    ),
    Case(
        "KB-EVAL-007",
        "Tool failure can be recorded without secrets and promoted only through review.",
        (
            "06-iteration/learnings/README.md",
            "06-iteration/templates/learning-event.md",
        ),
        (
            ("06-iteration/learnings/README.md", "secret"),
            ("06-iteration/templates/learning-event.md", "Sanitization Check"),
            ("06-iteration/templates/learning-event.md", "status: pending | review | promoted | rejected"),
        ),
    ),
    Case(
        "KB-EVAL-008",
        "Handoff has a resident-agent/productivity-skill path and should avoid duplicating canonical docs.",
        ("09-agents/productivity-skills-integration.md",),
        (
            ("09-agents/productivity-skills-integration.md", "`handoff`"),
            ("09-agents/productivity-skills-integration.md", "不应复制已有 PRD、PDR、ADR 和 diff"),
            ("09-agents/productivity-skills-integration.md", "knowledge-librarian, agent-architect"),
        ),
    ),
    Case(
        "KB-EVAL-009",
        "Knowledge-base status can be inspected through an Obsidian Base view.",
        (
            "06-iteration/views/knowledge-base-capability.base",
            "06-iteration/views/README.md",
        ),
        (
            ("06-iteration/views/knowledge-base-capability.base", "Knowledge Assets"),
            ("06-iteration/views/knowledge-base-capability.base", "Needs Status Or Type"),
            ("06-iteration/views/knowledge-base-capability.base", "formula.lifecycle"),
        ),
    ),
    Case(
        "KB-EVAL-010",
        "Promotion requests have a checklist before becoming accepted assets.",
        ("06-iteration/templates/promotion-checklist.md",),
        (
            ("06-iteration/templates/promotion-checklist.md", "Required Gates"),
            ("06-iteration/templates/promotion-checklist.md", "target_asset"),
            ("06-iteration/templates/promotion-checklist.md", "如果改变验收，已有 eval 更新"),
        ),
    ),
)


def read_rel(path: str) -> str:
    return (ROOT / path).read_text(encoding="utf-8")


def file_exists(path: str) -> bool:
    return (ROOT / path).is_file()


def validate_case(case: Case) -> tuple[bool, list[str]]:
    failures: list[str] = []
    for path in case.required_files:
        if not file_exists(path):
            failures.append(f"missing file: {path}")

    for path, pattern in case.required_patterns:
        if not file_exists(path):
            continue
        text = read_rel(path)
        if re.search(re.escape(pattern), text, re.IGNORECASE) is None:
            failures.append(f"missing pattern in {path}: {pattern}")

    return not failures, failures


def render_markdown(results: Iterable[tuple[Case, bool, list[str]]]) -> str:
    now = dt.datetime.now().astimezone().isoformat(timespec="seconds")
    rows = []
    passed = 0
    total = 0
    for case, ok, failures in results:
        total += 1
        if ok:
            passed += 1
        detail = "pass" if ok else "<br>".join(failures)
        rows.append(f"| {case.case_id} | {'pass' if ok else 'fail'} | {case.description} | {detail} |")

    body = "\n".join(rows)
    return f"""---
type: eval-run
status: {'pass' if passed == total else 'fail'}
created: {now[:10]}
updated: {now[:10]}
eval_set: 07-evals/golden-questions/knowledge-base-capability-golden-questions.md
runner: scripts/knowledge-base/eval-kb-capability.py
---

# Knowledge Base Capability Eval Run

## Summary

- run_at: {now}
- result: {passed}/{total} pass

## Cases

| Case | Result | Description | Detail |
|---|---|---|---|
{body}
"""


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write-report", action="store_true", help="Write a markdown eval run report.")
    parser.add_argument("--report-path", default="", help="Optional report path relative to repo root.")
    args = parser.parse_args()

    results = [(case, *validate_case(case)) for case in CASES]
    report = render_markdown(results)
    print(report)

    if args.write_report:
        if args.report_path:
            report_path = ROOT / args.report_path
        else:
            today = dt.date.today().isoformat()
            report_path = ROOT / "07-evals" / "eval-runs" / f"{today}-knowledge-base-capability-eval-run.md"
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report_path.write_text(report, encoding="utf-8")
        print(f"\nWrote report: {report_path.relative_to(ROOT)}")

    return 0 if all(ok for _, ok, _ in results) else 1


if __name__ == "__main__":
    sys.exit(main())
