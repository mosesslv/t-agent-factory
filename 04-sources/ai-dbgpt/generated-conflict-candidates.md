---
type: generated-conflict-candidates
status: review
updated: 2026-06-15
---

# AI_DB_GPT Conflict Candidates

These are candidate conflicts. They identify exact source lines that need review; they do not prove a real contradiction by themselves.

## Completion claim vs warning or blocked status

Signal A:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:30 [canonical] - doc/prd/v1.0/chatreport-vprd-1.0-real-business-quality-closure-v1.0.md
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:110 [canonical] | `chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` | VPRD 1.0 候选执行包：Trusted Report Run / Real-Business Quality Closure，把下一轮从 `Accepted with Warning` 推进到真实业务质量关闭路径 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:183 [canonical] | VPRD 1.0 | Trusted Report Run / Real-Business Quality Closure | proposal | `chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:232 [canonical] 第一轮验收结论：`Accepted with Warning`。自动化和本地 mini/reference 验收已证明 Phase 4.1 集成到 DB-GPT ChatReport 应用路径；完整 `Done` 仍等待用户用完整 raw Excel 本地手工验证。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:375 [proposal] - 三类专家全部给出 `Pass`。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:377 [proposal] - 任一专家给出 `Pass with Warning`，必须记录 warning、owner、后续处理版本。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:403 [proposal] | 应用入口可见 | 必须 Pass | 了解即可 | 必须 Pass | 前端应用管理能看到可用 ChatReport |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:404 [proposal] | 用户无需手工配置内部 Agent | 必须 Pass | 必须 Pass | 必须 Pass | ChatReport 是模板/默认应用，不是通用 Agent 手工拼装 |

Signal B:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:110 [canonical] | `chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` | VPRD 1.0 候选执行包：Trusted Report Run / Real-Business Quality Closure，把下一轮从 `Accepted with Warning` 推进到真实业务质量关闭路径 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:113 [canonical] | `chatreport-goal-6-e2e-acceptance-round1-v1.0.md` | Goal 6 第一轮本地 E2E 验收记录：synthetic fixture 链路 Accepted with Warning，真实业务质量待用户数据追加验收 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:114 [canonical] | `chatreport-phase-4.1-controlled-capability-selection-acceptance-round1-v1.0.md` | Phase 4.1 Controlled Capability Selection 第一轮验收记录：DB-GPT ChatReport 应用路径已集成，自动化验收 Accepted with...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:115 [canonical] | `chatreport-report-engine-v1-reference-pack-v1.0.md` | report-engine-v1 参考包边界：raw Excel external-only，reference assets 入库，脱敏 mini fixture 可跑，商业质量保持 warning |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:118 [canonical] | `chatreport-goal-0-5-acceptance-round1-v1.0.md` | Goal 0-5 第一轮专家验收记录：Goal 0 待产品/技术最终确认，Goal 1-5 因缺实现证据保持 Blocked |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:119 [canonical] | `chatreport-goal-1-2-acceptance-round2-v1.0.md` | Goal 1-2 第二轮验收记录：平台对象、SourceRef、Excel Dataset 基础闭环已实现并 Accepted with Warning |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:162 [canonical] 15. 用户在 Web 中查看报告、trace、artifact、evidence、warning。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:175 [canonical] -> 生成有证据、有引用、有 warning 的报告

Review action: decide whether this is historical evolution, a real conflict, or a term that should be normalized in 06-iteration/drafts or a formal ADR.

## Demo/API route vs native app route

Signal A:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:61 [canonical] ChatReport v1.0 不再按“独立 demo/API”或“后端 scene 能跑”验收。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:73 [canonical] Excel demo
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:76 [canonical] /api/chatreport/v1/demo 的增强版
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:122 [canonical] | `chatreport-development-alignment-v1.0.md` | 开发对齐守门文档：防止后续实现回到旧 demo/API、伪多 agent、平台边界混乱 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:124 [canonical] | `chatreport-local-demo-guide-v1.0.md` | 仅保留为历史原型和开发调试说明，不再作为 V1.0 产品验收入口 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:132 [canonical] - “demo/API 可跑”等同于产品 1.0 完成。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:135 [canonical] - “/api/chatreport/v1/demo” 作为用户验收入口。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:192 [canonical] - 优先 DB-GPT 原生产品闭环，不优先 demo 页面扩展。

Signal B:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:3 [proposal] title: ChatReport v1.0 Native App Management Template
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:30 [proposal] Native app management template for ChatReport v1.0 productization.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:327 [proposal] > ChatReport Native App Template + Default Usable App。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-e2e-acceptance-round1-v1.0.md:33 [acceptance-record] reason: Go6 native app, start-chat, run, workbench, acceptance service.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-manus-style-agent-workbench-v1.0.md:45 [proposal] Accepted Go6 iteration target: default ChatReport native app plus isolated Manus-style task-first agent workbench without changing DB-GPT base frontend modules.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:39 [proposal] reason: Next iteration must implement additive ChatReport native app, start-chat, workbench, and E2E verification APIs here unless a formal app module is introduced.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:61 [proposal] - ChatReport v1.0 is a DB-GPT/T-agent native Report Agent vertical app, not a demo API.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:67 [proposal] 1. Additive native app template APIs for ChatReport:

Review action: decide whether this is historical evolution, a real conflict, or a term that should be normalized in 06-iteration/drafts or a formal ADR.

## Open dynamic agents vs controlled runtime

Signal A:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:49 [canonical] Canonical index for the rebaselined ChatReport v1.0: DB-GPT native Report Agent vertical application, Excel-first Dataset-ready path, controlled dynamic Data-Agent runtime, Phase 0...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-prd-v1.0.md:41 [canonical] Canonical PRD for ChatReport v1.0 as a DB-GPT native Report Agent vertical app: Excel-first, Dataset-ready, controlled dynamic Data-Agent runtime, artifact/evidence-driven Markdown...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\ai-risk\chatreport-risk-register.md:55 [research] | AIR-004 | needs_future_hardening | Review planner/tool inputs from uploaded Excel and user prompts. | V1 uses fixed tool scopes and no arbitrary DAG. | Runtime contract review |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\decisions\0008-chatreport-controlled-capability-selection.md:37 [canonical] reason: ChatReport planner/runtime must implement controlled capability selection without becoming an open SkillHub.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\decisions\0008-chatreport-controlled-capability-selection.md:42 [canonical] Accepted decision: ChatReport should adopt Capability Registry Lite and Controlled Capability Selection for internal report runtime, while explicitly deferring open Tool Search, Sk...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\decisions\0008-chatreport-controlled-capability-selection.md:64 [canonical] Those patterns are valuable, but directly copying an open SkillHub or dynamic Tool Search platform would exceed ChatReport v1.0 scope.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\decisions\0008-chatreport-controlled-capability-selection.md:100 [canonical] - arbitrary dynamic DAGs;
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\decisions\0008-chatreport-controlled-capability-selection.md:128 [canonical] - open Tool Search;

Signal B:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:34 [canonical] - doc/prd/v1.0/chatreport-phase-4.1-controlled-capability-selection-acceptance-round1-v1.0.md
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:43 [canonical] - docs/research/decisions/0008-chatreport-controlled-capability-selection.md
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:49 [canonical] Canonical index for the rebaselined ChatReport v1.0: DB-GPT native Report Agent vertical application, Excel-first Dataset-ready path, controlled dynamic Data-Agent runtime, Phase 0...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:114 [canonical] | `chatreport-phase-4.1-controlled-capability-selection-acceptance-round1-v1.0.md` | Phase 4.1 Controlled Capability Selection 第一轮验收记录：DB-GPT ChatReport 应用路径已集成，自动化验收 Accepted with...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:131 [canonical] - “Controlled Multi-Agent Report Run + 3 个固定 workflow pattern + 6 个固定 AgentProfile”作为唯一主线。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:157 [canonical] 10. PlanValidator 校验 agent、工具、数据范围、预算和 topology。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:212 [canonical] ## 8.1 Controlled Capability Selection
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:214 [canonical] 下一步 runtime 迭代目标是 `Controlled Capability Selection`：

Review action: decide whether this is historical evolution, a real conflict, or a term that should be normalized in 06-iteration/drafts or a formal ADR.

## Manus reference vs product copying

Signal A:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:31 [canonical] - doc/prd/v1.0/chatreport-goal-6-manus-style-agent-workbench-v1.0.md
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:41 [canonical] - docs/research/decisions/0005-chatreport-go6-manus-style-agent-workbench.md
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:111 [canonical] | `chatreport-goal-6-manus-style-agent-workbench-v1.0.md` | Go6 下一迭代目标：默认 ChatReport 原生应用 + Manus-style 任务优先 agent workbench，采用隔离最小化前端策略 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:238 [canonical] - `doc/prd/v1.0/chatreport-goal-6-manus-style-agent-workbench-v1.0.md`
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:240 [canonical] - `docs/research/inspiration/07_manus_uiux_reference_for_chatreport_go6.md`
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:242 [canonical] 执行口径：学习 Manus 的任务优先 agent workbench 体验，但不复制 Manus 品牌、素材或页面；实现上优先 isolated/additive，避免影响 DB-GPT 底座和其他团队前端迭代。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-app-management-native-template-v1.0.md:27 [proposal] - docs/research/decisions/0005-chatreport-go6-manus-style-agent-workbench.md
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-e2e-acceptance-round1-v1.0.md:26 [acceptance-record] - doc/prd/v1.0/chatreport-goal-6-manus-style-agent-workbench-v1.0.md

Signal B:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:64 [proposal] - Learn from Manus UI/UX only as interaction principles: central task input, low-noise layout, capability chips, execution timeline, artifact shelf, evidence drawer. Do not reuse M...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-iteration-plan-v1.0.md:286 [canonical] - 完整 raw data 经过 Dataset / SourceRef 注册，而不是引用静态 HTML 或 reference-only 资产。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-report-engine-v1-reference-pack-v1.0.md:42 [proposal] reason: Reference-only assets and external source manifest.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-report-engine-v1-reference-pack-v1.0.md:62 [proposal] quality docs / HTML / screenshots / manifests: reference-only assets
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-report-engine-v1-reference-pack-v1.0.md:77 [proposal] | QA 截图 | `assets/references/report-engine-v1/screenshots/` | 视觉参考和报告输出对比 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-report-engine-v1-reference-pack-v1.0.md:125 [proposal] | HTML / screenshot | acceptance comparison only | 不进入 runtime generation |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-vprd-1.0-real-business-quality-closure-v1.0.md:125 [proposal] | HTML / screenshot | acceptance comparison only |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\docs\research\context-packs\current-route.md:146 [canonical] - 把 Manus logo、截图、页面组合或品牌文案放进产品 UI。

Review action: decide whether this is historical evolution, a real conflict, or a term that should be normalized in 06-iteration/drafts or a formal ADR.

## Real business quality vs synthetic fixture

Signal A:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:110 [canonical] | `chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` | VPRD 1.0 候选执行包：Trusted Report Run / Real-Business Quality Closure，把下一轮从 `Accepted with Warning` 推进到真实业务质量关闭路径 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:183 [canonical] | VPRD 1.0 | Trusted Report Run / Real-Business Quality Closure | proposal | `chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-e2e-acceptance-round1-v1.0.md:40 [acceptance-record] Round 1 Goal 6 acceptance result: local v1.0 E2E is accepted with warning using synthetic fixture; real business quality requires user-provided data and golden questions.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-e2e-acceptance-round1-v1.0.md:237 [acceptance-record] Can claim real-business production quality: no
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:94 [proposal] - The only missing input allowed for full business validation is user-provided real business data, golden questions, and expected report quality criteria.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:270 [proposal] Warning: Synthetic fixture proves the chain; real business report quality waits for user-provided data and golden questions.
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-6-next-iteration-e2e-prompt-v1.0.md:272 [proposal] Can claim real-business production quality: no
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\chatreport-goal-iteration-plan-v1.0.md:266 [canonical] ## 6.2 Phase 4.2：VPRD 1.0 Real-Business Quality Closure（候选下一步）

Signal B:
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:110 [canonical] | `chatreport-vprd-1.0-real-business-quality-closure-v1.0.md` | VPRD 1.0 候选执行包：Trusted Report Run / Real-Business Quality Closure，把下一轮从 `Accepted with Warning` 推进到真实业务质量关闭路径 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:113 [canonical] | `chatreport-goal-6-e2e-acceptance-round1-v1.0.md` | Goal 6 第一轮本地 E2E 验收记录：synthetic fixture 链路 Accepted with Warning，真实业务质量待用户数据追加验收 |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:114 [canonical] | `chatreport-phase-4.1-controlled-capability-selection-acceptance-round1-v1.0.md` | Phase 4.1 Controlled Capability Selection 第一轮验收记录：DB-GPT ChatReport 应用路径已集成，自动化验收 Accepted with...
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:115 [canonical] | `chatreport-report-engine-v1-reference-pack-v1.0.md` | report-engine-v1 参考包边界：raw Excel external-only，reference assets 入库，脱敏 mini fixture 可跑，商业质量保持 warning |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:119 [canonical] | `chatreport-goal-1-2-acceptance-round2-v1.0.md` | Goal 1-2 第二轮验收记录：平台对象、SourceRef、Excel Dataset 基础闭环已实现并 Accepted with Warning |
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:162 [canonical] 15. 用户在 Web 中查看报告、trace、artifact、evidence、warning。
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:175 [canonical] -> 生成有证据、有引用、有 warning 的报告
- D:\Users\Desktop\项目\代码\AI_DB_GPT\doc\prd\v1.0\00-index-v1.0.md:184 [canonical] | VPRD 2.0 | Report Collaboration & Learning Loop | research/candidate | 待 VPRD 1.0 真实业务质量 warning 关闭后再提升 |

Review action: decide whether this is historical evolution, a real conflict, or a term that should be normalized in 06-iteration/drafts or a formal ADR.

