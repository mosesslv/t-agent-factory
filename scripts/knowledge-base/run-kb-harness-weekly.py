#!/usr/bin/env python3
"""Run weekly KB harness checks and write a visual markdown report."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import pathlib
import subprocess
import sys


ROOT = pathlib.Path(__file__).resolve().parents[2]
REPORTS = ROOT / "06-iteration" / "reports"


def run_cmd(args: list[str]) -> tuple[int, str]:
    result = subprocess.run(
        args,
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    return result.returncode, result.stdout.strip()


def extract_eval_result(output: str) -> str:
    for line in output.splitlines():
        if line.strip().startswith("- result:"):
            return line.split(":", 1)[1].strip()
    return "unknown"


def load_triage_json() -> dict:
    code, output = run_cmd([sys.executable, "scripts/knowledge-base/triage-knowledge-intake.py", "--json"])
    if code != 0:
        return {"error": output, "items": [], "buckets": {}, "git_status_candidates": []}
    return json.loads(output)


def render_report(run_at: dt.datetime, write_eval_report: bool = False) -> str:
    eval_cmd = [sys.executable, "scripts/knowledge-base/eval-kb-capability.py"]
    if write_eval_report:
        eval_cmd.append("--write-report")
    eval_code, eval_output = run_cmd(eval_cmd)
    eval_result = extract_eval_result(eval_output)

    external_script = ROOT / "scripts" / "external-ingest" / "check-external-ingest.py"
    if external_script.is_file():
        external_code, external_output = run_cmd([sys.executable, str(external_script.relative_to(ROOT))])
        external_result = "pass" if external_code == 0 else "fail"
    else:
        external_code, external_output = 0, "external ingest check skipped: script not present"
        external_result = "skipped"

    triage = load_triage_json()
    items = triage.get("items", [])
    buckets = triage.get("buckets", {})
    high_risk = [item for item in items if item.get("risk") == "high"]
    medium_risk = [item for item in items if item.get("risk") == "medium"]
    stale = buckets.get("Stale Candidates", [])
    ready = buckets.get("Ready For Review", [])
    needs_gate = buckets.get("Needs Review Gate", [])

    focus: list[str] = []
    if eval_code != 0:
        focus.append("KB eval failed: inspect `scripts/knowledge-base/eval-kb-capability.py` output.")
    if external_result == "fail":
        focus.append("External ingest check failed: inspect external source pipeline.")
    if needs_gate:
        focus.append("Review high-impact candidates before any accepted-truth change.")
    if stale:
        focus.append("Clear stale candidates with accept / reject / defer.")
    if not focus:
        focus.append("No urgent harness issue; review ready candidates if capacity allows.")

    def card(item: dict) -> str:
        return (
            f"- `{item.get('path')}`\n"
            f"  - status: `{item.get('status')}`; type: `{item.get('asset_type')}`; risk: `{item.get('risk')}`\n"
            f"  - next_action: {item.get('next_action')}"
        )

    lines = [
        "---",
        "type: automation-report",
        "status: review",
        f"created: {run_at.date().isoformat()}",
        f"updated: {run_at.date().isoformat()}",
        "automation: weekly-kb-harness-eval",
        "---",
        "",
        "# Weekly KB Harness Eval",
        "",
        "## Summary Cards",
        "",
        f"- KB eval: `{eval_result}`",
        f"- external ingest check: `{external_result}`",
        f"- high_risk_items: `{len(high_risk)}`",
        f"- medium_risk_items: `{len(medium_risk)}`",
        f"- stale_candidates: `{len(stale)}`",
        f"- ready_for_review: `{len(ready)}`",
        f"- needs_review_gate: `{len(needs_gate)}`",
        "",
        "## Recommended Review Focus",
        "",
    ]
    lines.extend(f"- {item}" for item in focus)
    lines.extend(["", "## Top Risk Cards", ""])
    if high_risk:
        for item in high_risk[:8]:
            lines.append(card(item))
    else:
        lines.append("- none")
    lines.extend(["", "## Ready For Review", ""])
    if ready:
        for path in ready[:12]:
            lines.append(f"- `{path}`")
    else:
        lines.append("- none")
    lines.extend(["", "## Check Output", "", "### KB Eval", "", "```text", eval_output[-4000:], "```", ""])
    lines.extend(["### External Ingest", "", "```text", external_output[-3000:], "```", ""])
    lines.extend(
        [
            "## Safety Boundary",
            "",
            "本周报只提供 harness 验收和 review 建议。不得自动修改 `agent.md`、`AGENTS.md`、roadmap、PRD、ADR、contract、eval 或 local skill。",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write-report", action="store_true")
    parser.add_argument("--write-eval-report", action="store_true")
    parser.add_argument("--report-path")
    args = parser.parse_args()

    run_at = dt.datetime.now().astimezone()
    markdown = render_report(run_at, write_eval_report=args.write_eval_report)
    if args.write_report:
        report_path = pathlib.Path(args.report_path) if args.report_path else REPORTS / f"{run_at.date().isoformat()}-kb-harness-weekly.md"
        report_path.parent.mkdir(parents=True, exist_ok=True)
        report_path.write_text(markdown, encoding="utf-8")
        print(f"Wrote weekly report: {report_path.relative_to(ROOT)}")
    else:
        print(markdown)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
