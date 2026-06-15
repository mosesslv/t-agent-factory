#!/usr/bin/env python3
import datetime as dt
import json
import shutil
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
KB = ROOT / "tools" / "kb"
DISTILLATION = ROOT / "_workbench" / "distillations" / "2026-06-08-人和Agent共同编织知识网络-沉淀候选.md"
TOOLSEARCH_SOURCE = ROOT / "_workbench" / "inbox" / "2026-06-13-Claude-Code-ToolSearch机制研究.md"
TOOLSEARCH_DISTILLATION = ROOT / "_workbench" / "distillations" / "2026-06-13-ToolSearch与知识库主动被动更新机制-沉淀候选.md"
TODAY = dt.date.today().isoformat()
DAY = TODAY.replace("-", "")
TEST_SESSION_ID = f"ws-{DAY}-testlink"


def run(args, expect=0):
    result = subprocess.run(
        [str(KB), *args],
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if result.returncode != expect:
        print(f"Command failed: tools/kb {' '.join(args)}", file=sys.stderr)
        print(result.stdout, file=sys.stderr)
        print(result.stderr, file=sys.stderr)
        raise SystemExit(1)
    return result


def main():
    run(["validate"])
    home = (ROOT / "00-知识工作台入口.md").read_text(encoding="utf-8")
    assert "![[_index/generated-review-queue#Top Tasks]]" in home
    assert "[[_index/generated-workspace-dashboard#Snapshot]]" in home
    assert "[[_index/generated-workspace-dashboard#Decision Focus]]" in home
    assert "[[_index/generated-review-packet]]" in home
    assert "[[_index/generated-decision-guide]]" in home
    assert "[[_index/generated-rag-scope]]" in home
    assert "[[_index/generated-agent-brief]]" in home
    assert "[[_index/generated-tool-catalog]]" in home
    assert "generated-workspace-ui.html" in home
    assert "tools/kb agent-brief" in home
    assert "tools/kb tool-catalog" in home
    assert "tools/kb workspace-dashboard" in home
    assert "tools/kb workspace-ui" in home
    assert "tools/kb decision-guide" in home
    assert "tools/kb rag-scope" in home
    assert "tools/kb review-queue --limit 3" in home

    status = run(["status", "--json"]).stdout
    payload = json.loads(status)
    assert "files" in payload
    assert "pending_promotion_review" in payload
    assert any(
        item["path"] == str(TOOLSEARCH_DISTILLATION.relative_to(ROOT))
        for item in payload["pending_promotion_review"]
    )
    files_by_path = {item["path"]: item for item in payload["files"]}
    assert files_by_path[str(TOOLSEARCH_SOURCE.relative_to(ROOT))]["status"] == "draft"
    assert files_by_path[str(TOOLSEARCH_DISTILLATION.relative_to(ROOT))]["status"] == "draft"
    assert files_by_path["_workbench/distillations/2026-06-08-人和Agent共同编织知识网络-沉淀候选.md"]["status"] == "promoted"
    assert files_by_path["_workbench/distillations/2026-06-09-真正的-Agent-harness-思想-沉淀候选.md"]["status"] == "promoted"
    assert files_by_path["主题库/人和Agent共同编织知识网络/专业知识/01-人和-Agent-共同编织知识网络.md"]["status"] == "promoted"
    assert files_by_path["主题库/Agent协作与Harness/专业知识/01-真正的-Agent-harness-思想.md"]["status"] == "promoted"
    version_status = json.loads(run(["version-status", "--json", "--limit", "2"]).stdout)
    assert version_status["head"]
    assert isinstance(version_status["dirty"], bool)
    assert len(version_status["recent_commits"]) <= 2
    assert "changed_files" in version_status
    agent_brief = json.loads(run(["agent-brief", "--json", "--limit", "3"]).stdout)
    assert agent_brief["mode"] == "read-only-handoff"
    assert agent_brief["workspace_root"] == str(ROOT)
    assert agent_brief["version_status"]["head"]
    assert len(agent_brief["version_status"]["recent_commits"]) <= 3
    assert agent_brief["entrypoints"]
    assert any(item["role"] == "human-home" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "review-packet" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "tool-catalog" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "workspace-dashboard" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "workspace-ui" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "decision-guide" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "rag-scope" for item in agent_brief["entrypoints"])
    assert any(item["role"] == "promote-audit" and item.get("runtime") for item in agent_brief["entrypoints"])
    assert agent_brief["top_review_tasks"]
    assert "items" in agent_brief["promote_audit_summary"]
    assert agent_brief["safety_rules"]
    assert any("Do not write to 主题库/" in item for item in agent_brief["safety_rules"])
    assert agent_brief["recommended_commands"]
    assert "tools/kb refresh-index" in agent_brief["recommended_commands"]
    assert "tools/kb workspace-dashboard" in agent_brief["recommended_commands"]
    assert "tools/kb workspace-ui > _index/generated-workspace-ui.html" in agent_brief["recommended_commands"]
    assert "tools/kb decision-guide --limit 3" in agent_brief["recommended_commands"]
    assert "tools/kb rag-scope --json" in agent_brief["recommended_commands"]
    assert "tools/kb tool-catalog --json" in agent_brief["recommended_commands"]
    assert run(["agent-brief", "--limit", "1"]).stdout.startswith("---\n")
    tool_catalog = json.loads(run(["tool-catalog", "--json"]).stdout)
    assert tool_catalog["catalog_id"] == "knowledge-workbench-tool-catalog"
    assert {item["id"] for item in tool_catalog["permission_classes"]} >= {
        "read-only",
        "workbench-write",
        "review-decision",
        "formal-knowledge-write",
    }
    assert any(item["id"] == "agent-brief" for item in tool_catalog["resources"])
    assert any(item["id"] == "tool-catalog" for item in tool_catalog["resources"])
    assert any(item["id"] == "workspace-dashboard" for item in tool_catalog["resources"])
    assert any(item["id"] == "workspace-ui" for item in tool_catalog["resources"])
    assert any(item["id"] == "decision-guide" for item in tool_catalog["resources"])
    assert any(item["id"] == "rag-scope" for item in tool_catalog["resources"])
    assert any(item["id"] == "workspace-dashboard" and item["permission_class"] == "read-only" for item in tool_catalog["tools"])
    assert any(item["id"] == "workspace-ui" and item["permission_class"] == "read-only" for item in tool_catalog["tools"])
    assert any(item["id"] == "decision-guide" and item["permission_class"] == "read-only" for item in tool_catalog["tools"])
    assert any(item["id"] == "rag-scope" and item["permission_class"] == "read-only" for item in tool_catalog["tools"])
    promote_tool = next(item for item in tool_catalog["tools"] if item["id"] == "promote-confirm")
    assert promote_tool["permission_class"] == "formal-knowledge-write"
    assert promote_tool["risk"] == "critical"
    assert promote_tool["requires_human_confirmation"] is True
    assert promote_tool["auto_callable"] is False
    assert any(item["id"] == "review-distillation" and item["requires_human_confirmation"] for item in tool_catalog["tools"])
    assert run(["tool-catalog"]).stdout.startswith("---\n")
    workspace_dashboard = json.loads(run(["workspace-dashboard", "--json", "--limit", "3"]).stdout)
    assert workspace_dashboard["summary"]["source_review_ready"] >= 1
    assert workspace_dashboard["summary"]["distillation_review_ready"] >= 1
    assert any(
        item["path"] == str(TOOLSEARCH_SOURCE.relative_to(ROOT))
        for item in workspace_dashboard["decision_focus"]
    )
    assert any(
        item["path"] == str(TOOLSEARCH_DISTILLATION.relative_to(ROOT))
        for item in workspace_dashboard["decision_focus"]
    )
    assert workspace_dashboard["decision_focus"]
    assert workspace_dashboard["gate_status"]
    assert workspace_dashboard["workspace_layers"]
    assert "tools/kb workspace-ui" in workspace_dashboard["safe_read_commands"]
    assert "tools/kb decision-guide --limit 3" in workspace_dashboard["safe_read_commands"]
    assert "tools/kb rag-scope --json" in workspace_dashboard["safe_read_commands"]
    assert "tools/kb promote --confirm <distillation>" in workspace_dashboard["protected_actions"]
    assert any(item["label"] == "只读工作台 UI" for item in workspace_dashboard["entry_links"])
    assert any(item["label"] == "决策指南" for item in workspace_dashboard["entry_links"])
    assert any(item["label"] == "RAG 范围" for item in workspace_dashboard["entry_links"])
    assert any(item["label"] == "工具边界目录" for item in workspace_dashboard["entry_links"])
    assert run(["workspace-dashboard", "--limit", "1"]).stdout.startswith("---\n")
    workspace_ui_html = run(["workspace-ui", "--limit", "2"]).stdout
    assert workspace_ui_html.startswith("<!doctype html>")
    assert "Knowledge Workbench" in workspace_ui_html
    assert 'id="workspace-data"' in workspace_ui_html
    assert "Read-only export" in workspace_ui_html
    assert "data-filter" in workspace_ui_html
    rag_scope = json.loads(run(["rag-scope", "--json"]).stdout)
    assert rag_scope["catalog_id"] == "knowledge-workbench-rag-scope"
    assert rag_scope["guardrails"]
    assert rag_scope["scope_counts"]["include"] >= 1
    assert rag_scope["scope_counts"]["exclude"] >= 1
    formal_scope = next(item for item in rag_scope["items"] if item["id"] == "formal-topic-library")
    assert formal_scope["path"] == "主题库/"
    assert formal_scope["scope"] == "include"
    assert formal_scope["priority"] == "high"
    raw_inbox_scope = next(item for item in rag_scope["items"] if item["id"] == "raw-inbox")
    assert raw_inbox_scope["path"] == "_workbench/inbox/"
    assert raw_inbox_scope["scope"] == "exclude"
    assert any(item["scope"] == "cautious" for item in rag_scope["items"])
    assert run(["rag-scope"]).stdout.startswith("---\n")
    decision_guide = json.loads(run(["decision-guide", "--json", "--limit", "2"]).stdout)
    assert decision_guide["items"]
    assert decision_guide["guardrails"]
    assert decision_guide["items"][0]["evidence_summary"]
    assert decision_guide["items"][0]["decision_options"]
    assert any(item["protected"] is True for item in decision_guide["items"])
    assert any(
        option["id"] in {"reviewed", "approve"}
        for item in decision_guide["items"]
        for option in item["decision_options"]
    )
    distillation_decision_guide = json.loads(run(["decision-guide", "--json", "--kind", "distillation-candidate", "--limit", "1"]).stdout)
    assert any(
        item["path"] == str(TOOLSEARCH_DISTILLATION.relative_to(ROOT))
        for item in distillation_decision_guide["items"]
    )
    assert run(["decision-guide", "--limit", "1"]).stdout.startswith("---\n")

    queue = json.loads(run(["queue", "--json"]).stdout)
    assert "source_notes" in queue
    assert "pending_promotions" in queue
    assert "active_sessions" in queue
    assert any(
        item["path"] == str(TOOLSEARCH_DISTILLATION.relative_to(ROOT))
        for item in queue["pending_promotions"]
    )
    assert all("check_ok" in item for item in queue["source_notes"])
    assert all("next_action" in item for item in queue["source_notes"])
    assert all("preview_command" in item for item in queue["source_notes"])
    assert all("decision_commands" in item for item in queue["source_notes"])
    assert all("type" in item for item in queue["active_sessions"])
    assert all("next_action" in item for item in queue["active_sessions"])
    assert all("preview_command" in item for item in queue["active_sessions"])
    assert all("decision_commands" in item for item in queue["active_sessions"])
    review_queue = json.loads(run(["review-queue", "--json"]).stdout)
    assert review_queue["items"]
    assert review_queue["items"][0]["priority"] <= review_queue["items"][-1]["priority"]
    assert review_queue["items"][0]["next_action"] in {"preview-source-review", "preview-distillation-review", "distillation-drafted", "source-reviewed"}
    assert review_queue["items"][0]["preview_command"].startswith("tools/kb preview-")
    assert "decision_commands" in review_queue["items"][0]
    limited_review_queue = json.loads(run(["review-queue", "--limit", "2", "--json"]).stdout)
    assert len(limited_review_queue["items"]) <= 2
    source_review_queue = json.loads(run(["review-queue", "--kind", "source-note", "--json"]).stdout)
    assert source_review_queue["items"]
    assert all(item["kind"] == "source-note" for item in source_review_queue["items"])
    ready_review_queue = json.loads(run(["review-queue", "--ready-only", "--json"]).stdout)
    assert any(
        item["path"] == str(TOOLSEARCH_SOURCE.relative_to(ROOT))
        for item in ready_review_queue["items"]
    )
    assert any(
        item["path"] == str(TOOLSEARCH_DISTILLATION.relative_to(ROOT))
        for item in ready_review_queue["items"]
    )
    review_packet = json.loads(run(["review-packet", "--limit", "2", "--json"]).stdout)
    assert review_packet["items"]
    assert len(review_packet["items"]) <= 2
    assert "detail" in review_packet["items"][0]
    assert "checks" in review_packet["items"][0]["detail"]
    assert run(["review-packet", "--limit", "1"]).stdout.startswith("---\n")

    check = json.loads(run(["check-distillation", str(DISTILLATION.relative_to(ROOT)), "--json"], expect=1).stdout)
    assert check["ok"] is False
    assert any(item["name"] == "promotion_status is reviewable" and not item["ok"] for item in check["checks"])
    preview = json.loads(run(["preview-promote", str(DISTILLATION.relative_to(ROOT)), "--json"], expect=1).stdout)
    assert preview["ok"] is False
    assert preview["conflicts"]
    promote_audit = json.loads(run(["promote-audit", str(DISTILLATION.relative_to(ROOT)), "--json"]).stdout)
    assert promote_audit["check_ok"] is False
    assert promote_audit["promotion_conflict_free"] is False
    assert promote_audit["human_approved"] is False
    assert promote_audit["promote_ready"] is False
    assert promote_audit["rollback"]["preferred"].startswith("git revert")
    assert any(item["name"] == "human review approved promotion" and not item["ok"] for item in promote_audit["gates"])
    assert any(item["name"] == "promotion target has no conflicts" and not item["ok"] for item in promote_audit["gates"])
    distillation_review = json.loads(run(["preview-distillation-review", str(DISTILLATION.relative_to(ROOT)), "--json"], expect=1).stdout)
    assert distillation_review["check_ok"] is False
    assert distillation_review["promotion_conflict_free"] is False
    assert distillation_review["review_ready"] is False
    assert distillation_review["promote_ready"] is False
    assert distillation_review["stable_judgments"]
    assert distillation_review["concept_definitions"]
    assert distillation_review["decision_candidates"]
    assert distillation_review["source_sessions"][0]["id"] == "ws-20260608-001"
    assert any(item["role"] == "knowledge-card" for item in distillation_review["planned_files"])
    assert any("check-distillation" in command for command in distillation_review["recommended_commands"])
    assert any("preview-promote" in command for command in distillation_review["recommended_commands"])

    run(["promote", "--dry-run", str(DISTILLATION.relative_to(ROOT))], expect=1)
    run(["promote", "--confirm", str(DISTILLATION.relative_to(ROOT))], expect=1)

    run(["refresh-index"])
    manifest = ROOT / "_index" / "generated-manifest.json"
    queue = ROOT / "_index" / "generated-promotion-queue.json"
    promote_audit_path = ROOT / "_index" / "generated-promote-audit.json"
    promote_audit_md = ROOT / "_index" / "generated-promote-audit.md"
    workbench_queue = ROOT / "_index" / "generated-workbench-queue.json"
    workbench_queue_md = ROOT / "_index" / "generated-workbench-queue.md"
    review_queue_path = ROOT / "_index" / "generated-review-queue.json"
    review_queue_md = ROOT / "_index" / "generated-review-queue.md"
    review_packet_path = ROOT / "_index" / "generated-review-packet.json"
    review_packet_md = ROOT / "_index" / "generated-review-packet.md"
    decision_guide_path = ROOT / "_index" / "generated-decision-guide.json"
    decision_guide_md = ROOT / "_index" / "generated-decision-guide.md"
    rag_scope_path = ROOT / "_index" / "generated-rag-scope.json"
    rag_scope_md = ROOT / "_index" / "generated-rag-scope.md"
    agent_brief_path = ROOT / "_index" / "generated-agent-brief.json"
    agent_brief_md = ROOT / "_index" / "generated-agent-brief.md"
    tool_catalog_path = ROOT / "_index" / "generated-tool-catalog.json"
    tool_catalog_md = ROOT / "_index" / "generated-tool-catalog.md"
    workspace_dashboard_path = ROOT / "_index" / "generated-workspace-dashboard.json"
    workspace_dashboard_md = ROOT / "_index" / "generated-workspace-dashboard.md"
    workspace_ui_path = ROOT / "_index" / "generated-workspace-ui.html"
    version_status_path = ROOT / "_index" / "generated-version-status.json"
    version_status_md = ROOT / "_index" / "generated-version-status.md"
    assert manifest.exists()
    assert queue.exists()
    assert promote_audit_path.exists()
    assert promote_audit_md.exists()
    assert workbench_queue.exists()
    assert workbench_queue_md.exists()
    assert review_queue_path.exists()
    assert review_queue_md.exists()
    assert review_packet_path.exists()
    assert review_packet_md.exists()
    assert decision_guide_path.exists()
    assert decision_guide_md.exists()
    assert rag_scope_path.exists()
    assert rag_scope_md.exists()
    assert agent_brief_path.exists()
    assert agent_brief_md.exists()
    assert tool_catalog_path.exists()
    assert tool_catalog_md.exists()
    assert workspace_dashboard_path.exists()
    assert workspace_dashboard_md.exists()
    assert workspace_ui_path.exists()
    assert version_status_path.exists()
    assert version_status_md.exists()
    assert json.loads(manifest.read_text(encoding="utf-8"))["summary"]["total_typed_files"] >= 1
    generated_promotion_queue = json.loads(queue.read_text(encoding="utf-8"))
    assert "items" in generated_promotion_queue
    generated_promote_audit = json.loads(promote_audit_path.read_text(encoding="utf-8"))
    assert "items" in generated_promote_audit
    if generated_promote_audit["items"]:
        assert "rollback" in generated_promote_audit["items"][0]
    assert "Generated Promote Audit" in promote_audit_md.read_text(encoding="utf-8")
    workbench_payload = json.loads(workbench_queue.read_text(encoding="utf-8"))
    assert "source_notes" in workbench_payload
    assert "pending_promotions" in workbench_payload
    assert "active_sessions" in workbench_payload
    assert all("blocking_checks" in item for item in workbench_payload["source_notes"])
    assert all("preview_command" in item for item in workbench_payload["source_notes"])
    assert all("preview_command" in item for item in workbench_payload["pending_promotions"])
    assert all("type" in item for item in workbench_payload["active_sessions"])
    assert all("next_action" in item for item in workbench_payload["active_sessions"])
    assert all("preview_command" in item for item in workbench_payload["active_sessions"])
    generated_review_payload = json.loads(review_queue_path.read_text(encoding="utf-8"))
    assert generated_review_payload["items"]
    assert generated_review_payload["items"][0]["preview_command"].startswith("tools/kb preview-")
    generated_review_packet = json.loads(review_packet_path.read_text(encoding="utf-8"))
    assert generated_review_packet["items"]
    assert "detail" in generated_review_packet["items"][0]
    assert "Generated Review Packet" in review_packet_md.read_text(encoding="utf-8")
    generated_decision_guide = json.loads(decision_guide_path.read_text(encoding="utf-8"))
    assert generated_decision_guide["items"]
    assert generated_decision_guide["items"][0]["decision_options"]
    assert "Generated Decision Guide" in decision_guide_md.read_text(encoding="utf-8")
    generated_rag_scope = json.loads(rag_scope_path.read_text(encoding="utf-8"))
    assert generated_rag_scope["scope_counts"]["include"] >= 1
    assert any(item["id"] == "raw-inbox" and item["scope"] == "exclude" for item in generated_rag_scope["items"])
    assert "Generated RAG Scope" in rag_scope_md.read_text(encoding="utf-8")
    generated_agent_brief = json.loads(agent_brief_path.read_text(encoding="utf-8"))
    assert generated_agent_brief["mode"] == "read-only-handoff"
    assert generated_agent_brief["entrypoints"]
    assert generated_agent_brief["top_review_tasks"]
    assert "items" in generated_agent_brief["promote_audit_summary"]
    assert "Generated Agent Brief" in agent_brief_md.read_text(encoding="utf-8")
    generated_tool_catalog = json.loads(tool_catalog_path.read_text(encoding="utf-8"))
    assert generated_tool_catalog["catalog_id"] == "knowledge-workbench-tool-catalog"
    assert any(item["id"] == "promote-confirm" and item["risk"] == "critical" for item in generated_tool_catalog["tools"])
    assert "Generated Tool Catalog" in tool_catalog_md.read_text(encoding="utf-8")
    generated_workspace_dashboard = json.loads(workspace_dashboard_path.read_text(encoding="utf-8"))
    assert generated_workspace_dashboard["decision_focus"]
    assert generated_workspace_dashboard["gate_status"]
    assert "Generated Workspace Dashboard" in workspace_dashboard_md.read_text(encoding="utf-8")
    generated_workspace_ui = workspace_ui_path.read_text(encoding="utf-8")
    assert "Knowledge Workbench" in generated_workspace_ui
    assert "workspace-data" in generated_workspace_ui
    assert "tools/kb refresh-index" in generated_workspace_ui
    generated_version_payload = json.loads(version_status_path.read_text(encoding="utf-8"))
    assert generated_version_payload["head"]
    assert isinstance(generated_version_payload["dirty"], bool)

    run(["search", "Agent", "--limit", "1"])

    topic_dir = ROOT / "主题库" / "测试主题"
    if topic_dir.exists():
        shutil.rmtree(topic_dir)
    run(["new-topic", "测试主题", "--topic", "test-topic"])
    assert (topic_dir / "README.md").exists()
    shutil.rmtree(topic_dir)

    source_note = ROOT / "_workbench" / "inbox" / f"{TODAY}-测试来源.md"
    if source_note.exists():
        source_note.unlink()
    run(["new-source", "测试来源", "--topic", "test-topic", "--url", "https://example.com"])
    assert source_note.exists()
    source_note.unlink()

    temp_session_note = ROOT / "_workbench" / "sessions" / f"{TODAY}-测试研讨.md"
    if temp_session_note.exists():
        temp_session_note.unlink()
    run(["new-session", "测试研讨", "--topic", "test-topic"])
    temp_session_text = temp_session_note.read_text(encoding="utf-8")
    assert "type: discussion-session" in temp_session_text
    assert f"id: ws-{DAY}-" in temp_session_text
    temp_session_note.unlink()

    session_note = ROOT / "_workbench" / "sessions" / f"{TODAY}-测试来源关联.md"
    source_note = ROOT / "_workbench" / "inbox" / f"{TODAY}-测试来源关联.md"
    for path in (session_note, source_note):
        if path.exists():
            path.unlink()
    session_note.write_text(
        "\n".join(
            [
                "---",
                f"id: {TEST_SESSION_ID}",
                "type: discussion-session",
                "topic: test-topic",
                "status: draft",
                "created: 2026-06-08",
                "updated: 2026-06-08",
                "stage: framing",
                "participants:",
                "  - human",
                "source_inputs: []",
                "related_knowledge: []",
                "---",
                "",
                "# 研讨 Session：测试来源关联",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    debate_note = ROOT / "_workbench" / "debates" / f"{TODAY}-测试辩论.md"
    debate_distillation = ROOT / "_workbench" / "distillations" / f"{TODAY}-测试辩论-沉淀候选.md"
    if debate_note.exists():
        debate_note.unlink()
    if debate_distillation.exists():
        debate_distillation.unlink()
    run(["new-debate", "测试辩论", "--topic", "test-topic"], expect=2)
    run(["new-debate", "测试辩论", "--topic", "test-topic", "--session", TEST_SESSION_ID, "--target-topic-path", "主题库/测试主题/"])
    debate_text = debate_note.read_text(encoding="utf-8")
    assert "type: debate-session" in debate_text
    assert f"id: db-{DAY}-" in debate_text
    assert f"  - {TEST_SESSION_ID}" in debate_text
    assert "### 红队专家" in debate_text
    incomplete_debate = json.loads(run(["check-debate", str(debate_note.relative_to(ROOT)), "--json"], expect=1).stdout)
    assert incomplete_debate["next_action"] == "fill-debate-round-1"
    for expert_index in range(3):
        debate_text = debate_text.replace("- Claim:\n", f"- Claim: 测试专家{expert_index + 1}主张\n", 1)
        debate_text = debate_text.replace("- Evidence:\n", f"- Evidence: 测试专家{expert_index + 1}证据\n", 1)
        debate_text = debate_text.replace("- Risk:\n", f"- Risk: 测试专家{expert_index + 1}风险\n", 1)
        debate_text = debate_text.replace("- Question:\n", f"- Question: 测试专家{expert_index + 1}问题\n", 1)
        debate_text = debate_text.replace("- Recommendation:\n", f"- Recommendation: 测试专家{expert_index + 1}建议\n", 1)
    debate_text = debate_text.replace("## Round 2：交叉质询\n\n-\n", "## Round 2：交叉质询\n\n- Question: 红队追问证据链是否足够。\n")
    debate_text = debate_text.replace(
        "- 共识：\n- 分歧：\n- 最弱假设：\n- 待验证：",
        "- 共识：测试共识需要进入沉淀候选。\n- 分歧：测试分歧仍需保留。\n- 最弱假设：测试假设需要后续验证。\n- 待验证：测试证据链是否充分。",
    )
    debate_text = debate_text.replace(
        "- 是否生成沉淀候选：\n- 建议来源 session：\n- 建议目标主题：",
        "- 是否生成沉淀候选：是。\n- 建议来源 session：测试 session。\n- 建议目标主题：测试主题。",
    )
    debate_note.write_text(debate_text, encoding="utf-8")
    checked_debate = json.loads(run(["check-debate", str(debate_note.relative_to(ROOT)), "--json"]).stdout)
    assert checked_debate["ok"] is True
    assert checked_debate["next_action"] == "draft-distillation-from-debate"
    debate_review = json.loads(run(["preview-debate-review", str(debate_note.relative_to(ROOT)), "--json"]).stdout)
    assert debate_review["review_ready"] is True
    assert debate_review["round_1_items"]
    assert debate_review["round_2_items"]
    assert debate_review["round_3_items"]
    assert debate_review["distillation_suggestions"]
    debate_queue = json.loads(run(["queue", "--json"]).stdout)
    debate_item = next(item for item in debate_queue["active_sessions"] if item["path"] == str(debate_note.relative_to(ROOT)))
    assert debate_item["next_action"] == "draft-distillation-from-debate"
    debate_review_queue = json.loads(run(["review-queue", "--kind", "debate-session", "--ready-only", "--json"]).stdout)
    assert any(item["path"] == str(debate_note.relative_to(ROOT)) for item in debate_review_queue["items"])
    run(["draft-distillation-from-debate", str(debate_note.relative_to(ROOT))])
    assert debate_distillation.exists()
    drafted_text = debate_distillation.read_text(encoding="utf-8")
    assert "type: distillation-candidate" in drafted_text
    assert "source_debates:" in drafted_text
    assert "target_topic_path: 主题库/测试主题/" in drafted_text
    run(["check-distillation", str(debate_distillation.relative_to(ROOT))])
    debate_distillation_review = json.loads(run(["preview-distillation-review", str(debate_distillation.relative_to(ROOT)), "--json"]).stdout)
    assert debate_distillation_review["source_debates"][0]["id"].startswith(f"db-{DAY}-")
    drafted_debate_review = json.loads(run(["preview-debate-review", str(debate_note.relative_to(ROOT)), "--json"]).stdout)
    assert drafted_debate_review["next_action"] == "distillation-drafted"
    assert drafted_debate_review["drafted_distillations"]
    run(["draft-distillation-from-debate", str(debate_note.relative_to(ROOT))], expect=1)
    run(["validate"])
    debate_distillation.unlink()
    debate_note.unlink()

    run(["new-source", "测试来源关联", "--topic", "test-topic"])
    run(["link-source", str(source_note.relative_to(ROOT)), TEST_SESSION_ID])
    linked_session = session_note.read_text(encoding="utf-8")
    linked_source = source_note.read_text(encoding="utf-8")
    assert f"  - _workbench/inbox/{TODAY}-测试来源关联.md" in linked_session
    assert "review_status: linked-to-session" in linked_source
    assert "- [x] 关联到研讨 session" in linked_source
    assert f"[[_workbench/sessions/{TODAY}-测试来源关联]]" in linked_source
    run(["link-source", str(source_note.relative_to(ROOT)), str(session_note.relative_to(ROOT))])
    assert session_note.read_text(encoding="utf-8").count(f"_workbench/inbox/{TODAY}-测试来源关联.md") == 1
    run(["check-source", str(source_note.relative_to(ROOT))], expect=1)
    run(["review-source", str(source_note.relative_to(ROOT)), "reviewed", "--reviewer", "test"], expect=1)
    prepared = json.loads(run(["prepare-source", str(source_note.relative_to(ROOT)), "--json"]).stdout)
    assert prepared["check_ok"] is False
    prepared_source = source_note.read_text(encoding="utf-8")
    assert "## 补全任务" in prepared_source
    assert "补充 `## 摘要`" in prepared_source
    run(["prepare-source", str(source_note.relative_to(ROOT))])
    assert source_note.read_text(encoding="utf-8").count("## 补全任务") == 1
    drafted = json.loads(run(["draft-source-summary", str(source_note.relative_to(ROOT)), "--json"]).stdout)
    assert drafted["summary_items"]
    assert drafted["sessions"] == [str(session_note.relative_to(ROOT))]
    drafted_source = source_note.read_text(encoding="utf-8")
    assert "## 摘要草稿" in drafted_source
    assert "### 摘要候选" in drafted_source
    run(["draft-source-summary", str(source_note.relative_to(ROOT))])
    assert source_note.read_text(encoding="utf-8").count("## 摘要草稿") == 1
    applied_preview = json.loads(run(["apply-source-draft", str(source_note.relative_to(ROOT)), "--json"]).stdout)
    assert applied_preview["confirm_required"] is True
    preview_source = source_note.read_text(encoding="utf-8")
    assert "- 可信度：\n- 与当前知识库关系：\n- 是否建议进入 session：" in preview_source
    run(["apply-source-draft", str(source_note.relative_to(ROOT)), "--confirm"])
    applied_source = source_note.read_text(encoding="utf-8")
    assert "review_status: draft-summary-applied" in applied_source
    assert "- 可信度：medium" in applied_source
    assert "- 是否建议进入 session：是" in applied_source
    review_preview = json.loads(run(["preview-source-review", str(source_note.relative_to(ROOT)), "--json"]).stdout)
    assert review_preview["check_ok"] is True
    assert review_preview["review_ready"] is True
    assert review_preview["summary_items"]
    assert review_preview["judgment_items"]
    assert review_preview["linked_sessions"][0]["id"] == TEST_SESSION_ID
    assert any(" reviewed " in command for command in review_preview["recommended_commands"])
    assert any(" needs-evidence " in command for command in review_preview["recommended_commands"])
    assert any(" rejected " in command for command in review_preview["recommended_commands"])
    checked_source = json.loads(run(["check-source", str(source_note.relative_to(ROOT)), "--json"]).stdout)
    assert checked_source["ok"] is True
    assert checked_source["linked_sessions"] == [TEST_SESSION_ID]
    run(["review-source", str(source_note.relative_to(ROOT)), "reviewed", "--reviewer", "test"])
    assert "review_status: reviewed" in source_note.read_text(encoding="utf-8")
    run(["review-source", str(source_note.relative_to(ROOT)), "needs-evidence", "--reviewer", "test", "--note", "missing summary"])
    reviewed_source = source_note.read_text(encoding="utf-8")
    assert "status: draft" in reviewed_source
    assert "review_status: needs-evidence" in reviewed_source
    assert "`needs-evidence` by `test`: missing summary" in reviewed_source
    source_note.unlink()
    session_note.unlink()

    distillation_note = ROOT / "_workbench" / "distillations" / "2026-06-08-测试沉淀审阅.md"
    if distillation_note.exists():
        distillation_note.unlink()
    distillation_note.write_text(
        "\n".join(
            [
                "---",
                "id: ds-20260608-testreview",
                "type: distillation-candidate",
                "topic: test-topic",
                "status: draft",
                "created: 2026-06-08",
                "updated: 2026-06-08",
                "source_sessions:",
                "  - ws-20260608-001",
                "target_topic_path: 主题库/测试主题/",
                "promotion_status: pending-human-review",
                "---",
                "",
                "# 沉淀候选：测试沉淀审阅",
                "",
                "### 稳定判断",
                "",
                "1. 测试判断",
            ]
        )
        + "\n",
        encoding="utf-8",
    )
    run(["review-distillation", str(distillation_note.relative_to(ROOT)), "needs-revision", "--reviewer", "test", "--note", "too thin"])
    reviewed_distillation = distillation_note.read_text(encoding="utf-8")
    assert "promotion_status: pending-human-review" in reviewed_distillation
    assert "status: draft" in reviewed_distillation
    assert "`needs-revision` by `test`: too thin" in reviewed_distillation
    run(["check-distillation", str(distillation_note.relative_to(ROOT))], expect=1)
    run(["review-distillation", str(distillation_note.relative_to(ROOT)), "approve", "--reviewer", "test"], expect=1)
    distillation_note.write_text(
        distillation_note.read_text(encoding="utf-8")
        + "\n### 概念定义\n\n1. 测试定义\n\n### 决策记录候选\n\n1. 测试决策\n\n"
        + "## 待验证问题\n\n- 测试问题\n\n## 与已有知识的关系\n\n- 新增：测试关系\n\n"
        + "## Promote 建议\n\n- 是否需要人工确认：是\n",
        encoding="utf-8",
    )
    run(["check-distillation", str(distillation_note.relative_to(ROOT))])
    preview = json.loads(run(["preview-promote", str(distillation_note.relative_to(ROOT)), "--json"]).stdout)
    assert preview["ok"] is True
    assert preview["planned_files"][1]["operation"] == "create"
    conflict_card = ROOT / preview["planned_files"][1]["path"]
    conflict_card.parent.mkdir(parents=True, exist_ok=True)
    conflict_card.write_text("conflict\n", encoding="utf-8")
    conflict_preview = json.loads(run(["preview-promote", str(distillation_note.relative_to(ROOT)), "--json"], expect=1).stdout)
    assert conflict_preview["ok"] is False
    assert conflict_preview["conflicts"]
    conflict_card.unlink()
    shutil.rmtree(ROOT / "主题库" / "测试主题")
    run(["review-distillation", str(distillation_note.relative_to(ROOT)), "approve", "--reviewer", "test"])
    approved_distillation = distillation_note.read_text(encoding="utf-8")
    assert "promotion_status: approved-for-promotion" in approved_distillation
    assert "status: reviewed" in approved_distillation
    run(["review-distillation", str(distillation_note.relative_to(ROOT)), "approve"], expect=1)
    distillation_note.unlink()

    print("tools/test_kb.py passed")


if __name__ == "__main__":
    main()
