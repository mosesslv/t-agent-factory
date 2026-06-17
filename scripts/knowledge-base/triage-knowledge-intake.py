#!/usr/bin/env python3
"""Generate review cards for t-agent knowledge ingestion queues."""

from __future__ import annotations

import argparse
import dataclasses
import datetime as dt
import json
import pathlib
import re
import subprocess
import sys
from typing import Iterable


ROOT = pathlib.Path(__file__).resolve().parents[2]
REPORTS = ROOT / "06-iteration" / "reports"

SCAN_DIRS = (
    "06-iteration/inbox",
    "06-iteration/review-queue",
    "06-iteration/improvement-proposals",
    "06-iteration/learnings",
    "04-sources/evidence-cards",
    "04-sources/external",
    "07-evals/eval-runs",
)

STATUS_REVIEW = {"raw", "candidate", "review", "proposed", "pending"}
SECRET_PATTERNS = (
    r"sk-[A-Za-z0-9_-]{20,}",
    r"AKIA[0-9A-Z]{16}",
    r"BEGIN (RSA |OPENSSH |PRIVATE )?PRIVATE KEY",
    r"(?i)(password|passwd|api[_-]?key|secret)\s*[:=]\s*['\"]?[A-Za-z0-9_./+=-]{12,}",
)

QUALITY_GATES = (
    "G0 Source",
    "G1 Metadata",
    "G2 Boundary",
    "G3 Safety",
    "G4 Routing",
    "G5 Action",
)


@dataclasses.dataclass
class Item:
    path: str
    asset_type: str
    status: str
    updated: str
    owner: str
    age_days: int
    gates: dict[str, bool]
    buckets: list[str]
    next_action: str
    risk: str
    reason: str


def now() -> dt.datetime:
    return dt.datetime.now().astimezone()


def rel(path: pathlib.Path) -> str:
    return path.relative_to(ROOT).as_posix()


def read_text(path: pathlib.Path) -> str:
    try:
        return path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return path.read_text(encoding="utf-8", errors="replace")


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        return {}
    end = text.find("\n---", 4)
    if end == -1:
        return {}
    data: dict[str, str] = {}
    for line in text[4:end].splitlines():
        if not line.strip() or line.startswith(" ") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        value = value.strip().strip("\"'")
        data[key.strip()] = value
    return data


def discover_files() -> list[pathlib.Path]:
    files: list[pathlib.Path] = []
    for folder in SCAN_DIRS:
        base = ROOT / folder
        if not base.exists():
            continue
        for path in base.rglob("*"):
            if path.is_file() and path.suffix in {".md", ".base", ".json"}:
                files.append(path)
    return sorted(files)


def git_status_candidates() -> list[str]:
    try:
        result = subprocess.run(
            ["git", "status", "--short"],
            cwd=ROOT,
            check=False,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
        )
    except OSError:
        return []
    candidates: list[str] = []
    for line in result.stdout.splitlines():
        path = line[3:].strip()
        if path.startswith(("06-iteration/", "04-sources/", "07-evals/", "09-agents/", ".agents/skills/")):
            candidates.append(line)
    return candidates


def has_source(path: str, text: str, fm: dict[str, str]) -> bool:
    if path.startswith("04-sources/external/"):
        return True
    if path.startswith("04-sources/evidence-cards/"):
        return bool(re.search(r"https?://|source|来源", text, re.I))
    return bool(fm.get("source") or fm.get("related") or re.search(r"https?://|source:|来源", text, re.I))


def has_boundary(text: str) -> bool:
    lowered = text.lower()
    return all(term in lowered for term in ("evidence", "assumption", "unknown")) or "证据" in text


def has_action(text: str) -> bool:
    return bool(re.search(r"next action|recommended action|下一步|follow-up|reviewer|promotion|decision", text, re.I))


def safety_ok(text: str) -> bool:
    return not any(re.search(pattern, text) for pattern in SECRET_PATTERNS)


def classify(path: pathlib.Path, run_at: dt.datetime) -> Item:
    text = read_text(path)
    fm = parse_frontmatter(text)
    rel_path = rel(path)
    stat = path.stat()
    age_days = max(0, int((run_at.timestamp() - stat.st_mtime) // 86400))

    asset_type = fm.get("type", "missing-type")
    status = fm.get("status", "missing-status")
    updated = fm.get("updated", "")
    owner = fm.get("owner", "")
    normalized_status = status.lower()

    gates = {
        "source": has_source(rel_path, text, fm),
        "metadata": bool(asset_type != "missing-type" and status != "missing-status" and updated),
        "boundary": has_boundary(text) or asset_type in {"eval-run", "automation-index", "proposal-index"},
        "safety": safety_ok(text),
        "routing": any(rel_path.startswith(prefix + "/") for prefix in SCAN_DIRS),
        "action": has_action(text) or normalized_status in {"accepted", "active", "pass"},
    }

    buckets: list[str] = []
    if not gates["source"]:
        buckets.append("Needs Source")
    if not gates["metadata"]:
        buckets.append("Needs Metadata")
    if not gates["boundary"]:
        buckets.append("Needs Boundary")
    if not gates["safety"]:
        buckets.append("Risk / Blocked")
    if normalized_status in STATUS_REVIEW and ("agent.md" in text or "roadmap" in text.lower() or "PRD" in text or "ADR" in text):
        buckets.append("Needs Review Gate")
    if normalized_status in STATUS_REVIEW and age_days >= 3:
        buckets.append("Stale Candidates")
    if all(gates.values()) and normalized_status in STATUS_REVIEW:
        buckets.append("Ready For Review")

    if not buckets and normalized_status in {"fail", "blocked"}:
        buckets.append("Risk / Blocked")

    risk = "low"
    reason = "No immediate issue found."
    if "Risk / Blocked" in buckets or not gates["safety"]:
        risk = "high"
        reason = "Safety, blocked, or failed state needs review."
    elif "Needs Review Gate" in buckets:
        risk = "high"
        reason = "Candidate may affect canonical product or architecture truth."
    elif "Stale Candidates" in buckets:
        risk = "medium"
        reason = "Candidate has not moved for at least 3 days."
    elif any(bucket.startswith("Needs") for bucket in buckets):
        risk = "medium"
        reason = "Quality gate is incomplete."

    if not gates["source"]:
        next_action = "补来源或退回。"
    elif not gates["metadata"]:
        next_action = "补 type / status / updated / owner。"
    elif not gates["boundary"]:
        next_action = "补 evidence / assumption / unknown。"
    elif "Needs Review Gate" in buckets:
        next_action = "进入 Product / Architecture / Eval review gate。"
    elif "Ready For Review" in buckets:
        next_action = "提交 promotion review。"
    elif "Stale Candidates" in buckets:
        next_action = "确认 accept / reject / defer。"
    else:
        next_action = "无需立即处理。"

    return Item(
        path=rel_path,
        asset_type=asset_type,
        status=status,
        updated=updated,
        owner=owner,
        age_days=age_days,
        gates=gates,
        buckets=buckets,
        next_action=next_action,
        risk=risk,
        reason=reason,
    )


def collect() -> tuple[list[Item], list[str], dt.datetime]:
    run_at = now()
    items = [classify(path, run_at) for path in discover_files()]
    git_items = git_status_candidates()
    return items, git_items, run_at


def bucket_items(items: Iterable[Item]) -> dict[str, list[Item]]:
    buckets: dict[str, list[Item]] = {}
    for item in items:
        for bucket in item.buckets:
            buckets.setdefault(bucket, []).append(item)
    return buckets


def render_item(item: Item) -> str:
    gates = ", ".join(f"{name}={'pass' if ok else 'fail'}" for name, ok in item.gates.items())
    return (
        f"- `{item.path}`\n"
        f"  - type/status: `{item.asset_type}` / `{item.status}`\n"
        f"  - owner: `{item.owner or 'missing-owner'}`; age_days: `{item.age_days}`; risk: `{item.risk}`\n"
        f"  - gates: {gates}\n"
        f"  - why: {item.reason}\n"
        f"  - next_action: {item.next_action}"
    )


def render_markdown(items: list[Item], git_items: list[str], run_at: dt.datetime) -> str:
    buckets = bucket_items(items)
    high_risk = sum(1 for item in items if item.risk == "high")
    medium_risk = sum(1 for item in items if item.risk == "medium")
    needs_review = len(buckets.get("Ready For Review", [])) + len(buckets.get("Needs Review Gate", []))

    lines = [
        "---",
        "type: automation-report",
        "status: review",
        f"created: {run_at.date().isoformat()}",
        f"updated: {run_at.date().isoformat()}",
        "automation: daily-knowledge-intake-triage",
        "---",
        "",
        "# Daily Knowledge Intake Triage",
        "",
        "## Summary",
        "",
        f"- run_at: {run_at.isoformat(timespec='seconds')}",
        f"- scanned_items: {len(items)}",
        f"- high_risk: {high_risk}",
        f"- medium_risk: {medium_risk}",
        f"- review_candidates: {needs_review}",
        f"- git_status_candidates: {len(git_items)}",
        "",
        "## Cards",
        "",
    ]

    for bucket in (
        "Risk / Blocked",
        "Needs Review Gate",
        "Stale Candidates",
        "Needs Source",
        "Needs Metadata",
        "Needs Boundary",
        "Ready For Review",
    ):
        cards = buckets.get(bucket, [])
        lines.extend([f"### {bucket}", ""])
        if not cards:
            lines.extend(["- none", ""])
            continue
        for item in sorted(cards, key=lambda x: (x.risk != "high", -x.age_days, x.path))[:12]:
            lines.append(render_item(item))
        lines.append("")

    lines.extend(["## Git Status Knowledge Candidates", ""])
    if git_items:
        lines.extend(f"- `{line}`" for line in git_items[:40])
    else:
        lines.append("- none")

    lines.extend(
        [
            "",
            "## Safety Boundary",
            "",
            "本报告只提供 triage 建议。不得自动修改 `agent.md`、`AGENTS.md`、roadmap、PRD、ADR、contract、eval 或 local skill。",
            "",
        ]
    )
    return "\n".join(lines)


def to_json(items: list[Item], git_items: list[str], run_at: dt.datetime) -> str:
    payload = {
        "run_at": run_at.isoformat(timespec="seconds"),
        "items": [dataclasses.asdict(item) for item in items],
        "git_status_candidates": git_items,
        "buckets": {name: [item.path for item in values] for name, values in bucket_items(items).items()},
    }
    return json.dumps(payload, ensure_ascii=False, indent=2)


def write_report(markdown: str, report_path: pathlib.Path | None, run_at: dt.datetime) -> pathlib.Path:
    if report_path is None:
        report_path = REPORTS / f"{run_at.date().isoformat()}-knowledge-intake-triage.md"
    report_path.parent.mkdir(parents=True, exist_ok=True)
    report_path.write_text(markdown, encoding="utf-8")
    return report_path


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--write-report", action="store_true")
    parser.add_argument("--report-path")
    parser.add_argument("--json", action="store_true")
    args = parser.parse_args()

    items, git_items, run_at = collect()
    if args.json:
        print(to_json(items, git_items, run_at))
        return 0

    markdown = render_markdown(items, git_items, run_at)
    if args.write_report:
        report = write_report(markdown, pathlib.Path(args.report_path) if args.report_path else None, run_at)
        print(f"Wrote triage report: {report.relative_to(ROOT)}")
    else:
        print(markdown)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
