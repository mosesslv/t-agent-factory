const fs = require("fs");
const path = require("path");
const pptxgen = require("pptxgenjs");

const OUT_DIR = __dirname;
const OUT = path.join(OUT_DIR, "dbgpt-enterprise-analytics-strategy-v2.pptx");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Codex";
pptx.subject = "企业数据分析平台能力规划";
pptx.title = "企业数据分析平台能力规划汇报 v2";
pptx.company = "AI_DB_GPT";
pptx.lang = "zh-CN";
pptx.theme = {
  headFontFace: "Microsoft YaHei",
  bodyFontFace: "Microsoft YaHei",
  lang: "zh-CN",
};
pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
pptx.layout = "CUSTOM_WIDE";
pptx.margin = 0;

const C = {
  ink: "111827",
  muted: "5D6675",
  light: "F7F9FC",
  line: "C9D1DC",
  deep: "0B1F33",
  blue: "1D4F86",
  cyan: "0F8FA6",
  red: "C41230",
  amber: "C98600",
  green: "1F7A5A",
  purple: "7C3AED",
  paper: "FFFFFF",
  paleRed: "FFF8F8",
  paleBlue: "F6F9FD",
  paleAmber: "FFFAF0",
};

function addFooter(slide, page) {
  slide.addShape(pptx.ShapeType.line, { x: 0.56, y: 7.12, w: 12.22, h: 0, line: { color: "E2E6EC", width: 1 } });
  slide.addText(page === 1
    ? "Implication: 第一阶段不是做全功能 AI BI，而是把高频数据对象接入高价值业务场景"
    : page === 2
      ? "Key message: 黑字代表 BI 时代已有能力；红字代表 AI 时代需要重点补齐的建设项"
      : page === 3
        ? "Highlight: Data Agent 聚合数据资产、分析能力和业务入口，对外提供可调用、可追踪、可运营的智能分析服务"
        : page === 4
          ? "Architecture principle: Data Agent 做中间能力层，清晰连接上下游系统，而不是重做所有企业数据产品"
          : page === 5
            ? "Strategic answer: DB-GPT 不是小Q替代品；更适合作为开放可控的 Data Agent Runtime"
            : "Decision request: 先确认 MVP 范围、演示数据、真实 LLM 验收和第一批平台对象",
    { x: 0.56, y: 7.18, w: 9.8, h: 0.16, fontFace: "Microsoft YaHei", fontSize: 6.3, color: "87909E", margin: 0 });
  slide.addText(`${page} / 6`, { x: 12.35, y: 7.18, w: 0.42, h: 0.16, align: "right", fontFace: "Microsoft YaHei", fontSize: 6.5, bold: true, color: C.red, margin: 0 });
}

function addHeader(slide, kicker, title, subtitle, page) {
  slide.background = { color: C.paper };
  slide.addShape(pptx.ShapeType.rect, { x: 0.56, y: 0, w: 1.77, h: 0.052, fill: { color: C.red }, line: { color: C.red } });
  slide.addText(kicker, { x: 0.56, y: 0.56, w: 10.5, h: 0.18, fontFace: "Microsoft YaHei", fontSize: 7.2, bold: true, color: C.red, charSpace: 1.2, margin: 0 });
  slide.addText(title, { x: 0.56, y: 0.9, w: 11.4, h: 0.6, fontFace: "Microsoft YaHei", fontSize: page === 1 ? 23 : 25, bold: true, color: C.deep, breakLine: false, fit: "shrink", margin: 0 });
  if (subtitle) slide.addText(subtitle, { x: 0.56, y: 1.55, w: 11.6, h: 0.34, fontFace: "Microsoft YaHei", fontSize: 10, color: C.muted, fit: "shrink", margin: 0 });
  addFooter(slide, page);
}

function t(slide, txt, x, y, w, h, opts = {}) {
  slide.addText(txt, {
    x, y, w, h,
    fontFace: "Microsoft YaHei",
    fontSize: opts.size ?? 8,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    margin: opts.margin ?? 0.04,
    fit: opts.fit ?? "shrink",
    valign: opts.valign ?? "mid",
    align: opts.align ?? "left",
    breakLine: false,
  });
}

function rect(slide, x, y, w, h, fill = C.paper, line = C.line, width = 0.7) {
  slide.addShape(pptx.ShapeType.rect, { x, y, w, h, fill: { color: fill }, line: { color: line, width } });
}

function cell(slide, txt, x, y, w, h, opts = {}) {
  rect(slide, x, y, w, h, opts.fill ?? C.paper, opts.line ?? C.line, opts.width ?? 0.7);
  if (opts.bar) slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.045, h, fill: { color: opts.bar }, line: { color: opts.bar } });
  if (txt) t(slide, txt, x + 0.1, y + 0.06, w - 0.16, h - 0.1, { size: opts.size ?? 7.3, bold: opts.bold, color: opts.color ?? C.ink, valign: "top", fit: "shrink" });
}

function markText(label, body) {
  return [
    { text: label + "\n", options: { bold: true, color: C.red } },
    { text: body, options: { color: C.ink } },
  ];
}

function richCell(slide, runs, x, y, w, h, opts = {}) {
  rect(slide, x, y, w, h, opts.fill ?? C.paper, C.line, 0.7);
  if (opts.bar) slide.addShape(pptx.ShapeType.rect, { x, y, w: 0.045, h, fill: { color: opts.bar }, line: { color: opts.bar } });
  slide.addText(runs, { x: x + 0.1, y: y + 0.06, w: w - 0.16, h: h - 0.1, fontFace: "Microsoft YaHei", fontSize: opts.size ?? 7.2, fit: "shrink", breakLine: false, margin: 0.02, valign: "top" });
}

function slide1() {
  const s = pptx.addSlide();
  addHeader(s, "1. SCENARIO MAP | 能力 × 场景", "未来企业数据分析体系全景图",
    "以“数据对象 × 使用场景层级”组织分析资产：从百花齐放的个人探索，逐步沉淀为企业共识。", 1);

  const x0 = 2.08, y0 = 2.18, tableW = 10.7, tableH = 4.45;
  const axisX = 0.84, axisW = 1.12;
  rect(s, axisX, y0, axisW, tableH, "D7EBFF", "2D86E8", 1.2);
  t(s, "多样程度：百花启发 → 企业共识", axisX + 0.15, y0 + 0.25, axisW - 0.3, tableH - 0.45, { size: 9, bold: true, color: C.deep, align: "center", rotate: 90 });

  const col = [1.75, 2.86, 2.86, 2.86];
  const rowH = [0.38, 0.68, 0.68, 0.68, 0.68, 0.68, 0.68];
  let y = y0, x = x0;
  const heads = ["数据对象 \\ 场景层级", "个人探索", "领域 / 部门共享", "企业经营"];
  heads.forEach((h, i) => { cell(s, h, x, y, col[i], rowH[0], { fill: C.deep, line: C.deep, color: "FFFFFF", bold: true, size: 7.2 }); x += col[i]; });
  y += rowH[0];
  const rows = [
    ["个人文件\nExcel / CSV",
      { runs: markText("P0", "业务人员临时取数、快速探索、一次性图表。"), fill: C.paleRed, bar: C.red },
      { txt: "高频个人文件通过治理流程升级到数仓宽表。" },
      { txt: "" }],
    ["个人分析知识\n历史产物 Artifact",
      { txt: "个人历史问数、分析过程和结论复用。" },
      { runs: markText("P2 未来建设", "基于部门/企业级场景沉淀分析模板、样例问题、经营报告素材和复盘知识，未来演进为模板市场。"), fill: C.paleAmber, bar: C.amber, span: 2 }],
    ["数仓宽表",
      { txt: "仅限专业用户：数据开发、分析师做验证和排查。" },
      { runs: markText("P0", "部门高频问数、维度下钻、专题分析底表。"), fill: C.paleRed, bar: C.red },
      { runs: [{ text: "历史舒适区\n", options: { bold: true, color: C.muted } }, { text: "宽表支撑经营专题和跨部门分析；非未来建设重点。", options: { color: C.ink } }] }],
    ["领域黄金数据集\n语义数据集",
      { runs: markText("P1 未来建设", "从数仓宽表升级为领域黄金数据集：补语义、口径、样例问题和反问澄清，个人、部门、企业场景通用。"), fill: C.paleBlue, bar: C.blue, span: 3 }],
    ["指标",
      { runs: markText("P2 未来建设", "统一口径的指标体系，支撑个人查询、部门解释、企业经营目标跟踪和跨期对比。"), fill: C.paleAmber, bar: C.amber, span: 3 }],
    ["看板 / 报表",
      { runs: [{ text: "历史舒适区\n", options: { bold: true, color: C.muted } }, { text: "个人、部门、企业都可消费看板/报表；固定摘要、订阅和常规报表服务属于已有 BI 能力，非未来重点建设。", options: { color: C.ink } }], span: 3 }],
  ];
  for (const r of rows) {
    x = x0;
    cell(s, r[0], x, y, col[0], rowH[1], { fill: "F7F9FC", bold: true, size: 7.2 }); x += col[0];
    for (let c = 1; c < r.length; c++) {
      const v = r[c];
      const span = v.span || 1;
      const w = col.slice(c, c + span).reduce((a,b)=>a+b,0);
      if (v.runs) richCell(s, v.runs, x, y, w, rowH[1], { fill: v.fill, bar: v.bar, size: 7.0 });
      else cell(s, v.txt, x, y, w, rowH[1], { fill: v.fill, bar: v.bar, size: 7.0 });
      x += w;
    }
    y += rowH[1];
  }
  s.addShape(pptx.ShapeType.line, { x: x0, y: y + 0.08, w: tableW, h: 0, line: { color: C.deep, width: 2 } });
  t(s, "场景层级：个人探索 → 领域 / 部门共享 → 企业经营", x0 + 3.0, y + 0.18, 5.2, 0.22, { size: 11, bold: true, color: C.deep, align: "center" });
}

function slide2() {
  const s = pptx.addSlide();
  addHeader(s, "2. BIG DATA DEPARTMENT OFFERING | 资产全景 L0-L6", "大数据部门的资产应从“能取数”升级为“能被业务和智能体直接使用”",
    "传统数仓能力已经覆盖底层数据供给，但越靠近 AI 分析消费，当前成熟度越低；下一步重点是补齐可问数据、分析技能、报告资产和运营反馈。", 2);
  const x0 = 0.84, y0 = 1.78;
  const col = [0.75, 1.95, 5.78, 1.15, 2.1];
  const rh = 0.55;
  const heads = ["层级", "资产名称", "建设重点：BI 时代 → AI 时代", "当前满足度", "主要提供方式"];
  let x = x0;
  heads.forEach((h,i)=>{ cell(s,h,x,y0,col[i],0.48,{fill:C.deep,line:C.deep,color:"FFFFFF",bold:true,size:7.0}); x+=col[i]; });
  const rows = [
    ["L0","数据连接与原始数据",["BI 时代：数据源接入、权限账号、连接管理。","AI 时代：统一给智能分析安全访问。"],"80%+","传统数据平台 / 数据源管理集成。",C.green],
    ["L1","标准表与领域宽表",["BI 时代：主题宽表、标准字段、稳定刷新。","AI 时代：成为可被问数和解释的领域数据底座。"],"80%+","传统数仓建设、主题域宽表、数据质量治理。",C.green],
    ["L2","可问数据集",["BI 时代：数据集主要服务报表和自助分析。","AI 时代：补字段含义、别名、样例问题和可问范围。"],"30%","",C.amber],
    ["L3","指标与业务知识",["BI 时代：指标用于看板展示和经营监控。","AI 时代：把口径、术语、诊断框架注入分析过程。"],"40%","",C.amber],
    ["L4","分析技能",["BI 时代：分析动作依赖个人经验和人工操作。","AI 时代：沉淀问数、解读、归因、报告技能。"],"10%","",C.red],
    ["L5","分析产物",["BI 时代：看板和报表是主要交付物。","AI 时代：沉淀问数结果、洞察卡、报告素材和引用关系。"],"20%","",C.red],
    ["L6","运营反馈",["BI 时代：主要看访问量和报表使用情况。","AI 时代：运营准确率、成功率、成本、延迟和反馈。"],"起步","评测运营看板 + 人工反馈闭环。",C.purple],
  ];
  let y = y0 + 0.48;
  for (let i=0; i<rows.length; i++) {
    const r = rows[i]; x=x0;
    cell(s, r[0], x, y, col[0], rh, { bold:true, size:20, color:C.deep, align:"center" }); x+=col[0];
    cell(s, r[1], x, y, col[1], rh, { bold:true, size:8.5 }); x+=col[1];
    richCell(s, [
      { text: r[2][0] + "\n", options: { bold:true, color:C.ink } },
      { text: r[2][1], options: { bold:true, color:C.red } },
    ], x, y, col[2], rh, { size:7.0 }); x+=col[2];
    cell(s, "", x, y, col[3], rh, { }); 
    s.addShape(pptx.ShapeType.roundRect, { x:x+0.2, y:y+0.16, w:0.75, h:0.24, rectRadius:0.08, fill:{color:r[5]}, line:{color:r[5]} });
    t(s, r[3], x+0.2, y+0.18, 0.75, 0.18, { size:7.5, bold:true, color:"FFFFFF", align:"center" });
    x+=col[3];
    if (i === 2) {
      rect(s, x, y, col[4], rh*4, "FFF8F8", C.line, 0.7);
      s.addShape(pptx.ShapeType.rect, { x, y, w:0.045, h:rh*4, fill:{color:C.red}, line:{color:C.red} });
      t(s, "Data Agent 提供", x+0.12, y+0.1, col[4]-0.2, 0.18, { size:8, bold:true, color:C.red });
      t(s, "• 可问数据包装：字段别名、样例问题、可问范围\n• 语义与知识注入：指标口径、业务术语、诊断框架\n• Skill 编排：问数、解读、归因、报告能力组合\n• 产物沉淀：洞察卡、报告素材、引用关系和反馈", x+0.15, y+0.34, col[4]-0.25, rh*4-0.4, { size:6.3, color:C.muted, fit:"shrink" });
    } else if (i < 2 || i > 5) {
      cell(s, r[4], x, y, col[4], rh, { size:7.0, color:C.muted });
    }
    y += rh;
  }
  const ny = 6.62;
  [["已有优势","底层连接、标准表和领域宽表属于传统大数据能力，成熟度较高。",C.red],
   ["核心缺口","可问数据集、分析技能、报告产物和运营反馈还没有平台化沉淀。",C.blue],
   ["建设抓手","Data Agent + Skill Hub + 指标/知识库集成，把数据资产变成可消费服务。",C.amber]].forEach((n,i)=>{
    const x=0.84+i*4.0;
    s.addShape(pptx.ShapeType.line,{x,y:ny,w:3.75,h:0,line:{color:n[2],width:3}});
    t(s,n[0],x,ny+0.1,1.2,0.2,{size:11,bold:true,color:C.deep});
    t(s,n[1],x,ny+0.36,3.7,0.34,{size:7.5,color:C.muted});
  });
}

function slide3() {
  const s = pptx.addSlide();
  addHeader(s, "3. 能力矩阵 | 产品与资产分工", "Data Agent 的定位是把底层数据、分析能力和业务入口聚合起来，形成企业级智能分析平台",
    "它不替代 ChatBI、小Q或传统 BI，而是在中间层统一数据对象、业务口径、问数过程、解读结果和报告产物，让不同入口都能调用同一套可信分析能力。", 3);
  const x0=0.84, y0=2.08;
  const labelW=1.55, modW=7.65, valW=2.55, gap=0.12, bandH=0.84;
  function band(y,label,sub,mods,value,isAgent=false){
    const fill=isAgent?"FFF8F8":C.light, line=isAgent?"F0C5CC":"DCE3EC";
    rect(s,x0,y,labelW,bandH,isAgent?C.red:C.deep,isAgent?C.red:C.deep,0.8);
    t(s,label,x0+0.18,y+0.22,labelW-0.3,0.25,{size:13,bold:true,color:"FFFFFF"});
    t(s,sub,x0+0.18,y+0.48,labelW-0.3,0.18,{size:7.5,color:isAgent?"FFFFFF":"B9C6D6"});
    rect(s,x0+labelW+gap,y,modW,bandH,fill,line,0.7);
    const mW=(modW-0.5)/4;
    mods.forEach((m,i)=>{
      const mx=x0+labelW+gap+0.12+i*(mW+0.09);
      rect(s,mx,y+0.1,mW,bandH-0.2,"FFFFFF","EDF1F6",0.5);
      s.addShape(pptx.ShapeType.rect,{x:mx,y:y+0.1,w:mW,h:0.04,fill:{color:[C.blue,C.cyan,C.amber,C.red][i]},line:{color:[C.blue,C.cyan,C.amber,C.red][i]}});
      t(s,m[0],mx+0.1,y+0.22,mW-0.16,0.18,{size:8.2,bold:true,color:C.deep});
      t(s,m[1],mx+0.1,y+0.43,mW-0.16,0.28,{size:6.6,color:C.muted});
    });
    rect(s,x0+labelW+gap+modW+gap,y,valW,bandH,"FBFCFE",line,0.7);
    t(s,"解决问题",x0+labelW+gap+modW+gap+0.12,y+0.12,valW-0.2,0.16,{size:8,bold:true,color:C.deep});
    t(s,value,x0+labelW+gap+modW+gap+0.12,y+0.33,valW-0.2,0.42,{size:6.8,color:C.muted});
  }
  band(y0,"业务入口层","用户在哪里使用",[["ChatBI / 小Q","自然语言提问、多轮追问、结果解释"],["FineBI / 看板","稳定报表、图表门户、日常经营监控"],["经营报告","月报、专题分析、管理汇报材料"],["业务系统","嵌入问数、订阅提醒、流程触发"]],"让业务人员在熟悉的入口使用能力，不要求所有人切换到同一个新工具。");
  t(s,"↓",6.55,y0+0.88,0.2,0.18,{size:15,bold:true,color:C.red,align:"center"});
  band(y0+1.03,"分析能力层","平台对外提供什么",[["问数服务","把问题变成安全查询，返回表格和图表"],["解读服务","解释趋势、异常、变化和关键影响因素"],["洞察服务","发现异常模式，给出原因线索和建议"],["报告服务","按模板生成章节化经营分析材料"]],"把一次性分析动作沉淀为可复用服务，避免每个入口重复建设。");
  t(s,"↓",6.55,y0+1.91,0.2,0.18,{size:15,bold:true,color:C.red,align:"center"});
  band(y0+2.06,"Data Agent","统一编排和治理",[["领域黄金数据集","沉淀可问的数据对象、字段含义、指标口径和数据质量说明"],["分析知识库","沉淀业务术语、诊断框架、样例问题、报告模板和历史经验"],["分析 Agent 系统人设","定义角色边界、分析风格、追问方式、输出标准和风险提示"],["分析任务编排","组织问数、解读、洞察、报告等多步骤分析过程"]],"把单点 Chat 能力升级为承载企业分析服务的平台底座。",true);
  t(s,"↓",6.55,y0+2.94,0.2,0.18,{size:15,bold:true,color:C.red,align:"center"});
  band(y0+3.09,"数据资产层","大数据部门提供什么",[["文件与库表","Excel、CSV、数据库表和接口数据"],["主题宽表","经营、销售、财务、供应链等分析对象"],["指标与口径","指标定义、维度层级、计算规则"],["业务知识","术语、样例问题、诊断框架和历史报告"]],"提供“业务能理解、系统能执行”的数据基础，决定分析质量上限。");
}

function slide4() {
  const s = pptx.addSlide();
  addHeader(s, "4. PLATFORM PRODUCT SCOPE | DATA AGENT 产品边界", "Data Agent 是连接数据资产与业务入口的中间平台，让分析能力可用、可信、可复用",
    "向下接入数仓、指标、知识和 BI 资产；向上服务 T-claw、ChatBI、小Q式入口和管理报告。自身聚焦把问数、解读、洞察、报告做成可运营的企业服务。", 4);
  const y=2.18;
  function side(x,title,items,color){
    s.addShape(pptx.ShapeType.line,{x,y,w:2.05,h:0,line:{color,width:3}});
    t(s,title,x,y+0.08,1.8,0.25,{size:13,bold:true,color:C.deep});
    items.forEach((it,i)=>{
      const yy=y+0.5+i*0.78;
      rect(s,x,yy,2.05,0.62,C.light,"FFFFFF",0);
      s.addShape(pptx.ShapeType.rect,{x,y:yy,w:0.045,h:0.62,fill:{color},line:{color}});
      t(s,it[0],x+0.18,yy+0.08,1.65,0.15,{size:8.2,bold:true,color:C.deep});
      t(s,it[1],x+0.18,yy+0.28,1.7,0.25,{size:6.4,color:C.muted});
    });
  }
  side(0.56,"向下连接",[["数据平台 / 数仓","物理表、主题宽表、数据质量、血缘、刷新规则。"],["指标平台","指标定义、口径版本、维度层级、计算规则。"],["知识库 / 模板库","业务术语、SOP、诊断框架、历史报告。"],["BI 资产","看板、图表、报表门户、筛选上下文。"]],C.blue);
  rect(s,2.8,y,7.1,3.85,"FFF8F8","E6C1C8",1);
  t(s,"Data Agent 提供的六类平台能力",4.3,y+0.12,4.2,0.28,{size:14,bold:true,color:C.red,align:"center"});
  const caps=[["接得上","统一接入数据、指标、知识、图表和文件，避免分析入口各自接一套。"],["问得准","把字段别名、指标口径、业务术语和样例问题带入问数过程。"],["跑得稳","组织问数、解读、洞察、报告的多步骤流程，并记录状态。"],["管得住","控制只读、限量、超时、敏感字段、权限和审计。"],["留得下","沉淀结果、图表、洞察、报告、引用关系和人工反馈。"],["评得清","持续看准确率、成功率、响应时间、成本和用户反馈。"]];
  caps.forEach((c,i)=>{
    const cx=3.05+(i%3)*2.18, cy=y+0.62+Math.floor(i/3)*1.33;
    rect(s,cx,cy,1.95,1.12,"FFFFFF","F0D6DB",0.5);
    s.addShape(pptx.ShapeType.rect,{x:cx,y:cy,w:1.95,h:0.05,fill:{color:[C.red,C.blue,C.amber][i%3]},line:{color:[C.red,C.blue,C.amber][i%3]}});
    t(s,c[0],cx+0.12,cy+0.18,1.2,0.18,{size:10,bold:true,color:C.deep});
    t(s,c[1],cx+0.12,cy+0.42,1.7,0.52,{size:6.7,color:C.muted});
  });
  s.addShape(pptx.ShapeType.line,{x:3.0,y:y+3.22,w:6.65,h:0,line:{color:"EFCBD2",width:1}});
  t(s,"Data Agent 不重做数仓、不重做 BI、不替代 T-claw；它负责把分析过程变成可信服务。",3.2,y+3.34,6.2,0.24,{size:8,bold:true,color:C.deep,align:"center"});
  side(10.15,"服务接口",[["T-claw","企业智能体入口、身份、对话、任务分发和消息触达。"],["ChatBI / 小Q式入口","自然语言问数、多轮追问、结果解释和交互体验。"],["FineBI / 看板门户","稳定报表、经营看板、图表展示和门户分发。"],["报告生成接口","面向月报、专题分析和管理汇报，提供生成、审批和导出能力。"]],C.red);
  [["边界 1：数据和口径仍归源头系统","数仓负责数据正确，指标平台负责口径正确，知识库负责业务解释。"],["边界 2：体验入口可多样化","T-claw、ChatBI、小Q和 BI 门户都可以调用同一套 Data Agent 能力。"]].forEach((b,i)=>{
    const x=0.56+i*6.25; s.addShape(pptx.ShapeType.line,{x,y:6.32,w:5.7,h:0,line:{color:i?C.blue:C.red,width:3}});
    t(s,b[0],x,y:6.42,w:3.0,h:0.2,{});
  });
}
