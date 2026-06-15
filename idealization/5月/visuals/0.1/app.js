const routes = {
  "new-analysis": {
    title: "新建分析",
    desc: ""
  },
  market: {
    title: "Agent 广场",
    desc: "官方和个人沉淀的 Data Agent，可直接使用，也可复制改造成自己的 Agent。"
  },
  datasets: {
    title: "数据集",
    desc: "选择官方数据集，或创建自己的 AI 可分析数据集。"
  },
  knowledge: {
    title: "知识库",
    desc: "沉淀制度、口径、文档和网页内容，让 AI 生成报告时引用可信业务知识。"
  },
  skills: {
    title: "SkillHub",
    desc: "浏览、发布和管理 Skills，并在创建 Agent 时装配使用。"
  },
  chat: {
    title: "新建分析",
    desc: ""
  },
  history: {
    title: "历史报告",
    desc: "查看用户主动保存的正式报告产物。"
  }
};

const solutions = [
  {
    id: "retail-ops",
    name: "产销协同关键业务指标分析",
    solutionType: "report",
    solutionTypeLabel: "报告方案",
    defaultApp: "ChatReport",
    domain: "产销协同域",
    description: "围绕月度经营会、区域复盘和毛利异常分析，输出一份可编辑、可保存、可导出的经营分析报告。",
    audience: "经营负责人 / 区域经理 / 数据分析师",
    dataset: "零售经营黄金数据集",
    template: "经营复盘",
    reportType: "经营分析报告",
    hero: true,
    official: true,
    recommended: true,
    owner: "数据智能团队",
    version: "v1.5",
    updated: "2026/04/30 17:20",
    level: "L5",
    uses: "12,780",
    favorites: "90",
    assetCode: "PA",
    marketCategory: "经营分析 / 产销协同",
    scenario: "解决产销协同例会前，需要快速判断一级指标达成、DRP与AOP表现、库存健康度，以及区域和事业部差异的问题。",
    skills: ["目标达成分析", "指标波动识别", "维度拆解", "异常归因", "行动建议生成"],
    outputs: ["核心结论", "指标表现", "归因分析", "风险提示", "建议动作"],
    fields: ["月份", "事业部", "区域", "国家", "SI", "SO", "DRP2达成率", "AOP达成率"],
    dimensions: ["月份", "事业部", "区域", "国家"],
    measures: ["SI", "SO", "DRP2达成率", "AOP达成率", "库存周转天数", "超期库存占比"],
    metrics: ["DRP2达成率", "AOP达成率", "库存周转天数", "超期库存占比"],
    analysisItems: [
      {
        name: "一级指标达成",
        operations: [
          "使用字段：月份、DRP2达成率、智能机DRP2供应满足率、库存周转天数、超期库存占比、门槛值、目标值、挑战值",
          "分析操作：按月份汇总四个一级指标，生成月度与累计达成视图",
          "分析操作：逐项对比门槛值、目标值和挑战值，识别红黄绿状态",
          "分析操作：标记连续两个月低于目标值的指标，识别需重点跟进的异常项",
          "输出判断：给出一级指标整体达成结论，并指出当前最突出的风险指标"
        ]
      },
      {
        name: "DRP达成",
        operations: [
          "使用字段：月份、事业部、区域、国家、SI、SO、DRP2、DRP2达成率、门槛值、目标值、挑战值",
          "分析操作：按月份汇总 SI、SO 与 DRP2，计算 DRP2达成率并与目标值对比",
          "分析操作：按事业部拆解 DRP2达成率，识别低于目标的业务单元",
          "分析操作：按区域和国家拆解 DRP2达成率，定位拖累整体达成的重点区域",
          "分析操作：识别红黄绿状态，标记连续低于目标或明显低于挑战值的异常对象",
          "输出判断：给出当月 DRP 达成情况、差距来源和重点异常对象"
        ]
      },
      {
        name: "AOP达成",
        operations: [
          "使用字段：月份、事业部、区域、国家、AOP、AOP达成率、年度目标、累计实际",
          "分析操作：按月份汇总 AOP目标与实际完成值，计算月度及累计 AOP达成率",
          "分析操作：按事业部和区域拆解 AOP达成率，定位年度目标压力最大的单元",
          "分析操作：识别累计达成率低于计划节奏的国家和区域，判断后续追回难度",
          "输出判断：给出 AOP 当前节奏是否正常，以及年度目标风险点"
        ]
      },
      {
        name: "库存健康度",
        operations: [
          "使用字段：月份、事业部、区域、库存周转天数、超期库存占比、门槛值、目标值、挑战值",
          "分析操作：按月份汇总库存周转天数与超期库存占比，形成库存健康看板",
          "分析操作：对比门槛值、目标值和挑战值，识别库存异常风险",
          "分析操作：按事业部和区域拆解异常库存指标，定位高风险业务单元",
          "输出判断：判断库存是否健康，并指出超期库存和周转压力的主要来源"
        ]
      },
      {
        name: "区域达成",
        operations: [
          "使用字段：月份、区域、SI、SO、DRP2达成率、AOP达成率",
          "分析操作：按区域汇总 SI、SO 及核心达成率指标，形成区域对比视图",
          "分析操作：比较各区域达成率差异，识别对整体结果贡献最大和拖累最大的区域",
          "分析操作：结合月度趋势判断区域改善还是恶化，筛出需重点跟踪区域",
          "输出判断：给出区域达成排名、异常区域以及主要差异原因"
        ]
      },
      {
        name: "事业部达成",
        operations: [
          "使用字段：月份、事业部、SI、SO、DRP2达成率、AOP达成率、库存周转天数",
          "分析操作：按事业部汇总经营规模和达成率指标，形成事业部经营表现对比",
          "分析操作：识别高规模但低达成的事业部，以及低规模但高达成的事业部",
          "分析操作：对库存周转和超期库存表现同步对照，判断达成质量",
          "输出判断：给出事业部经营表现结论，并指出需专项跟进的事业部"
        ]
      },
      {
        name: "月预估达成",
        operations: [
          "使用字段：月份、当前SI、当前SO、月预估SI、月预估SO、DRP2预估达成率、AOP预估达成率",
          "分析操作：基于当前已发生 SI、SO 进度，汇总当月预估完成值",
          "分析操作：计算 DRP2 与 AOP 的月预估达成率，判断月底是否能追平目标",
          "分析操作：按事业部和区域拆解月预估结果，识别月底冲刺重点对象",
          "输出判断：给出本月预估达成结论，以及仍有明显缺口的业务单元"
        ]
      },
      {
        name: "年度预估达成",
        operations: [
          "使用字段：月份、累计SI、累计SO、年度AOP目标、年度预估AOP达成率、事业部、区域、国家",
          "分析操作：基于累计完成值和未来月份预测值，形成年度达成预估",
          "分析操作：按事业部、区域和国家拆解年度预估达成率，识别年度目标风险层级",
          "分析操作：比较不同国家和区域的年度缺口，判断需提前干预的重点市场",
          "输出判断：给出年度达成是否可实现，以及年度风险最高的对象"
        ]
      }
    ],
    requirements: ["月份字段", "事业部或区域维度", "SI / SO 指标", "DRP2或同类达成率指标", "AOP或年度目标字段", "库存周转天数或超期库存占比指标"],
    tags: ["DRP2", "AOP", "库存健康度", "区域达成", "事业部达成"],
    prompt: "请基于「产销协同关键业务指标分析」Agent 运行一份案例结果。报告需要覆盖一级指标达成、DRP达成、AOP达成、库存健康度、区域和事业部差异，以及月预估和年度预估判断。"
  },
  {
    id: "campaign-roi",
    name: "活动效果分析",
    solutionType: "excel",
    solutionTypeLabel: "Excel分析方案",
    defaultApp: "ChatExcel",
    domain: "营销活动",
    description: "从流量、转化、ROI 和人群贡献评估活动质量，输出下一轮投放建议。",
    audience: "营销负责人 / 活动运营",
    dataset: "618 活动黄金数据集",
    template: "活动效果分析",
    reportType: "活动复盘报告",
    official: true,
    owner: "营销数据团队",
    version: "v0.9",
    updated: "2026/04/12",
    level: "L4",
    uses: "5,487",
    favorites: "38",
    assetCode: "ROI",
    marketCategory: "营销活动",
    skills: ["渠道 ROI 计算", "转化漏斗定位", "人群贡献识别", "投放优化建议"],
    outputs: ["渠道表现", "漏斗卡点", "人群贡献", "预算建议"],
    fields: ["活动", "渠道", "人群", "曝光", "点击", "订单", "成本", "销售额"],
    dimensions: ["活动", "渠道", "人群"],
    measures: ["曝光", "点击", "订单", "成本", "销售额", "ROI"],
    flow: ["读取活动黄金数据集", "计算曝光/点击/订单转化", "拆解渠道 ROI 与人群贡献", "生成下一轮投放建议"],
    requirements: ["曝光、点击、订单字段", "渠道或投放来源", "投放成本", "活动销售额"],
    tags: ["ROI", "漏斗", "人群", "渠道"],
    prompt: "请基于「活动效果分析」Agent 运行一份案例结果，拆解渠道 ROI、转化漏斗、人群贡献和优化建议。"
  },
  {
    id: "finance-brief",
    name: "财务经营简报",
    solutionType: "report",
    solutionTypeLabel: "报告方案",
    defaultApp: "ChatReport",
    domain: "财务经营",
    description: "面向管理层说明收入、成本、利润和预算偏差，突出异常与风险。",
    audience: "财务 BP / 管理层",
    dataset: "财务经营黄金数据集",
    template: "财务简报",
    reportType: "管理层简报",
    official: true,
    owner: "财务 BP 团队",
    version: "v1.0",
    updated: "2026/04/18",
    level: "L4",
    uses: "3,204",
    favorites: "26",
    assetCode: "FIN",
    marketCategory: "财务经营",
    skills: ["预算偏差分析", "利润结构拆解", "异常费用识别", "风险提示生成"],
    outputs: ["收入表现", "成本变化", "利润归因", "预算风险"],
    fields: ["月份", "业务线", "收入", "成本", "费用", "预算", "利润"],
    dimensions: ["月份", "业务线"],
    measures: ["收入", "成本", "费用", "预算", "利润"],
    flow: ["读取财务经营黄金数据集", "识别收入/成本/利润口径", "对比预算与实际", "生成管理层简报"],
    requirements: ["收入和成本字段", "预算或目标字段", "业务线/部门维度", "月份字段"],
    tags: ["收入", "成本", "利润", "预算"],
    prompt: "请基于「财务经营简报」Agent 运行一份案例结果，说明收入、成本、利润和预算偏差，并给出风险提示。"
  },
  {
    id: "customer-visit",
    name: "客户拜访分析",
    solutionType: "data",
    solutionTypeLabel: "数据问答方案",
    defaultApp: "ChatData",
    domain: "销售管理",
    description: "识别高价值客户、风险客户和跟进优先级，帮助销售团队安排动作。",
    audience: "销售主管 / 客户成功",
    dataset: "CRM 客户黄金数据集",
    template: "销售诊断",
    reportType: "客户经营报告",
    official: false,
    owner: "销售运营团队",
    version: "v0.8",
    updated: "2026/04/08",
    level: "L3",
    uses: "2,918",
    favorites: "19",
    assetCode: "CRM",
    marketCategory: "销售管理",
    skills: ["客户价值分层", "拜访频次分析", "商机阶段诊断", "跟进优先级排序"],
    outputs: ["客户分层", "风险名单", "商机漏斗", "跟进动作"],
    fields: ["客户", "行业", "拜访次数", "商机阶段", "合同金额", "最近跟进", "风险标签"],
    dimensions: ["客户", "行业", "商机阶段", "风险标签"],
    measures: ["拜访次数", "合同金额", "最近跟进天数"],
    flow: ["读取 CRM 客户黄金数据集", "计算客户价值与跟进频次", "识别风险客户和高价值客户", "生成客户经营报告"],
    requirements: ["客户 ID 或客户名称", "拜访或跟进记录", "商机阶段", "合同或商机金额"],
    tags: ["客户分层", "拜访", "商机", "优先级"],
    prompt: "请基于「客户拜访分析」Agent 运行一份案例结果，识别高价值客户、风险客户和销售跟进优先级。"
  },
  {
    id: "business-qa-agent",
    name: "经营口径问答",
    solutionType: "knowledge",
    solutionTypeLabel: "知识问答 Agent",
    defaultApp: "ChatKnowledge",
    domain: "产销协同域",
    description: "基于经营口径、会议规范和业务规则回答产销协同相关问题，给出引用依据和适用边界。",
    audience: "经营分析师 / 区域经理 / 业务负责人",
    dataset: "",
    template: "经营口径问答",
    reportType: "业务问答",
    official: true,
    owner: "经营知识团队",
    version: "v1.0",
    updated: "2026/05/20",
    level: "L3",
    uses: "1,836",
    favorites: "22",
    assetCode: "QA",
    marketCategory: "知识问答",
    skills: ["知识检索", "引用摘录", "业务解释", "适用边界判断"],
    outputs: ["直接回答", "引用依据", "关键摘录", "适用边界"],
    fields: ["知识库", "文档", "段落", "业务口径"],
    dimensions: ["知识主题", "来源文档"],
    measures: [],
    flow: ["理解业务问题", "检索知识库", "提取关键片段", "组织回答和引用依据"],
    requirements: ["可选知识库", "业务问题"],
    tags: ["知识问答", "经营口径", "会议说明"],
    prompt: "请基于经营口径知识库回答：DRP2 达成率低于目标时，经营例会应该如何说明？"
  }
];

const datasets = [
  {
    id: "retail-gold",
    category: "gold",
    name: "零售经营黄金数据集",
    domain: "零售经营",
    sourceType: "官方样例",
    sourceName: "标准零售经营样例数据",
    granularity: "月 / 区域 / 门店 / 品类 / 渠道",
    description: "按门店、区域、品类、渠道沉淀的经营分析标准数据集，可直接用于经营复盘。",
    fields: 48,
    metrics: 16,
    completeness: "96%",
    updated: "今天 09:30",
    scenarios: ["经营复盘", "销售诊断", "毛利分析"],
    schema: ["日期", "区域", "门店", "品类", "渠道", "销售额", "毛利额", "订单数"],
    dimensions: ["日期", "区域", "门店", "品类", "渠道"],
    measures: ["销售额", "毛利额", "订单数", "GMV", "毛利率", "客单价"],
    metricsList: ["GMV = 销售额汇总", "毛利率 = 毛利额 / 销售额", "客单价 = 销售额 / 订单数"],
    questions: ["本月毛利率为什么下降？", "华东区域增长来自哪些品类？", "下月应该重点优化哪些渠道？"]
  },
  {
    id: "campaign-gold",
    category: "gold",
    name: "618 活动黄金数据集",
    domain: "营销活动",
    sourceType: "官方样例",
    sourceName: "活动投放与订单样例数据",
    granularity: "活动 / 渠道 / 人群 / 日期",
    description: "包含活动曝光、点击、转化、订单、成本和人群标签，适合活动复盘。",
    fields: 39,
    metrics: 12,
    completeness: "93%",
    updated: "昨天 18:20",
    scenarios: ["活动效果分析", "渠道 ROI", "人群贡献"],
    schema: ["活动", "渠道", "人群", "曝光", "点击", "订单", "成本", "销售额"],
    dimensions: ["活动", "渠道", "人群", "日期"],
    measures: ["曝光", "点击", "订单", "成本", "销售额", "ROI", "转化率"],
    metricsList: ["ROI = 销售额 / 投放成本", "转化率 = 订单数 / 点击数", "获客成本 = 投放成本 / 新客数"],
    questions: ["哪个渠道 ROI 最高？", "转化漏斗卡点在哪里？", "高价值人群贡献占比是多少？"]
  },
  {
    id: "crm-gold",
    category: "gold",
    name: "CRM 客户黄金数据集",
    domain: "销售管理",
    sourceType: "官方样例",
    sourceName: "CRM 客户经营样例数据",
    granularity: "客户 / 行业 / 商机 / 跟进周期",
    description: "沉淀客户画像、拜访、商机和成交记录，可用于客户经营与销售诊断。",
    fields: 42,
    metrics: 11,
    completeness: "91%",
    updated: "周三 11:12",
    scenarios: ["客户拜访分析", "销售诊断"],
    schema: ["客户", "行业", "拜访次数", "商机阶段", "合同金额", "最近跟进", "风险标签"],
    dimensions: ["客户", "行业", "商机阶段", "风险标签"],
    measures: ["拜访次数", "合同金额", "客户价值", "拜访频次"],
    metricsList: ["客户价值 = 合同金额 + 商机金额", "拜访频次 = 拜访次数 / 周期", "风险客户 = 超期未跟进客户"],
    questions: ["哪些客户应该优先跟进？", "销售漏斗主要卡在哪一层？", "高价值客户有什么共同特征？"]
  },
  {
    id: "retail-file",
    category: "mine",
    name: "retail_sales_q1.xlsx",
    domain: "个人上传",
    sourceType: "Excel 上传",
    sourceName: "retail_sales_q1.xlsx",
    granularity: "日期 / 门店 / SKU",
    description: "用户上传的门店销售 Excel，已识别字段和基础指标。",
    fields: 23,
    metrics: 6,
    completeness: "72%",
    updated: "刚刚",
    scenarios: ["临时经营分析"],
    schema: ["日期", "门店", "SKU", "销售额", "成本", "库存"],
    dimensions: ["日期", "门店", "SKU"],
    measures: ["销售额", "成本", "库存", "毛利", "库存周转"],
    metricsList: ["销售额", "毛利", "库存周转"],
    questions: ["哪些门店销售下滑？", "哪些 SKU 毛利偏低？"]
  },
  {
    id: "warehouse",
    category: "connection",
    name: "企业数仓连接",
    domain: "数据连接",
    description: "MySQL / PostgreSQL / ClickHouse 等连接入口，后续由数据开发维护表和数据集。",
    fields: "-",
    metrics: "-",
    completeness: "待配置",
    updated: "未连接",
    scenarios: ["数据集初始化"],
    schema: ["连接地址", "库表选择", "SQL 数据集", "字段语义"],
    metricsList: ["待配置"],
    questions: ["连接后可生成标准数据集"]
  }
];

const templates = [
  {
    id: "my-growth",
    taskType: "report",
    name: "用户增长分析",
    domain: "营销域",
    description: "我的方案，可复用拉新、留存、转化和生命周期分析框架。",
    audience: "增长负责人 / 运营同学",
    analysisIdea: "围绕拉新、留存、转化和生命周期分析用户增长表现，先判断总体增长是否达标，再拆解渠道、漏斗和分群差异，最后输出增长机会和行动建议。",
    dataSource: "CRM 订单数据集",
    knowledgeBase: "月度经营会报告规范",
    skillIds: ["skill-report-writer"],
    items: ["渠道", "留存", "漏斗", "分群"],
    shared: false
  },
  {
    id: "my-supply",
    taskType: "excel",
    name: "供应链分析",
    domain: "供应链域",
    description: "我的方案，适合库存、履约、缺货和周转效率分析。",
    audience: "供应链负责人 / 运营管理",
    analysisIdea: "重点分析库存、履约、缺货和周转效率，先识别异常节点，再定位区域、仓库和品类维度的问题，最后给出补货、调拨和预警建议。",
    dataSource: "supply_chain_analysis.xlsx",
    knowledgeBase: "",
    skillIds: ["skill-dataset-semantics"],
    items: ["库存", "履约", "周转", "预警"],
    shared: true
  }
];

const knowledgeBases = [
  {
    id: "kb-metrics",
    category: "official",
    knowledgeType: "business",
    name: "经营指标口径库",
    domain: "经营域",
    description: "沉淀 GMV、销售额、毛利率、客单价、ROI 等经营指标定义，用于报告中的口径解释和一致性校验。",
    sourceType: "官方预置",
    sources: ["经营指标口径.docx", "月度经营会指标说明.pdf", "指标口径飞书文档"],
    learnedTypes: ["指标口径", "报告规范", "业务规则"],
    snippets: [
      "GMV 用于衡量交易规模，默认按订单成交金额汇总。",
      "毛利率 = 毛利额 / 销售额，报告中需说明活动低毛利品类影响。",
      "客单价 = 销售额 / 订单数，用于判断单笔交易质量。"
    ],
    updated: "今天 10:20"
  },
  {
    id: "kb-retail-playbook",
    category: "official",
    knowledgeType: "business",
    name: "门店运营手册",
    domain: "零售域",
    description: "包含门店巡检、陈列、活动执行、区域经营复盘要求，可辅助解释门店和区域经营问题。",
    sourceType: "官方预置",
    sources: ["门店运营手册.pdf", "区域复盘标准.txt"],
    learnedTypes: ["流程制度", "业务规则"],
    snippets: [
      "区域复盘需同时关注目标达成、异常门店、重点品类和下月动作。",
      "门店活动后应复盘客流变化、转化率和活动毛利影响。"
    ],
    updated: "昨天 18:40"
  },
  {
    id: "kb-report-rule",
    category: "official",
    knowledgeType: "template",
    name: "月度经营会报告规范",
    domain: "报告规范",
    description: "定义经营会报告的结构、表达风格和证据要求，用于让 AI 产出更符合管理层阅读习惯的报告。",
    sourceType: "官方预置",
    sources: ["月度经营会报告规范.pdf", "优秀报告样例链接"],
    learnedTypes: ["报告规范", "表达偏好"],
    snippets: [
      "报告开头先给核心结论，再展示关键证据和行动建议。",
      "异常指标需说明影响范围、可能原因和下一步验证动作。"
    ],
    updated: "周一 09:05"
  },
  {
    id: "kb-my-policy",
    category: "mine",
    knowledgeType: "business",
    name: "华东区域活动规则",
    domain: "零售域",
    description: "上传的区域活动规则和价格策略，可用于解释华东门店活动表现。",
    sourceType: "用户上传",
    sources: ["华东区域活动规则.pdf", "活动价盘.xlsx"],
    learnedTypes: ["业务规则", "价格策略"],
    snippets: [
      "华东区域活动期间对家清品类设置价格保护线。",
      "低毛利活动需同步评估 GMV 和毛利率。"
    ],
    updated: "刚刚"
  }
];

const skills = [
  {
    id: "skill-dataset-semantics",
    category: "official",
    title: "数据集语义识别",
    summary: "识别字段名、物理字段名、日期、维度和指标，帮助 Agent 理解数据。",
    intro: "适用于上传 Excel 或从企业数据源创建数据集后的字段学习。该 Skill 会根据字段名称和样例值生成业务解释，供用户确认后保存到数据集。",
    author: "数据智能团队"
  },
  {
    id: "skill-kpi-attainment",
    category: "official",
    title: "关键指标达成分析",
    summary: "围绕目标、门槛、挑战值判断指标达成状态，并识别异常对象。",
    intro: "适用于经营复盘、产销协同和管理层报告。该 Skill 会按时间、组织和区域拆解指标表现，输出红黄绿状态和重点风险对象。",
    author: "经营分析团队"
  },
  {
    id: "skill-report-writer",
    category: "enterprise",
    title: "经营报告生成",
    summary: "把分析结论、图表和动作建议组织成管理层可读的报告。",
    intro: "适用于 AI报告类型 Agent。该 Skill 会优先输出核心结论，再补充指标证据、归因和行动建议，报告可继续手动修改、保存和导出。",
    author: "企业模板组"
  },
  {
    id: "skill-web-research",
    category: "enterprise",
    title: "网页搜索",
    summary: "在 Agent 允许联网时，用于补充外部公开信息和行业背景。",
    intro: "适用于需要外部资料佐证的分析场景。该 Skill 不会在自由分析中自动触发，需要被配置进 Agent 并开启联网后使用。",
    author: "平台能力组"
  },
  {
    id: "skill-my-summary",
    category: "mine",
    title: "会议纪要提炼",
    summary: "把长文档或会议纪要整理为报告可引用的业务要点。",
    intro: "适用于知识库问答和报告补充说明。输入为会议纪要、飞书文档或 PDF，输出为关键结论、待办事项和风险提醒。",
    author: "曹海肖"
  }
];

const agentProjects = [
  {
    id: "project-retail-ops",
    agentId: "retail-ops",
    name: "产销协同关键业务指标分析",
    conversations: [
      { id: "agent-chat-retail-1", title: "5月21日 DRP 达成分析", time: "6分", status: "报告已生成" },
      { id: "agent-chat-retail-2", title: "5月22日 AOP 预估分析", time: "21小时", status: "等待补充需求" }
    ]
  },
  {
    id: "project-campaign-roi",
    agentId: "campaign-roi",
    name: "活动效果分析",
    conversations: [
      { id: "agent-chat-campaign-1", title: "618 活动复盘", time: "昨天", status: "草稿" }
    ]
  }
];

const analyses = [
  { id: "free-chat-quota", title: "查询额度可用性", source: "普通对话", time: "1周", status: "已完成" },
  { id: "free-chat-models", title: "列出可用模型", source: "普通对话", time: "2周", status: "已完成" },
  { id: "free-chat-analysis", title: "自由分析 5月21日", source: "普通对话", time: "刚刚", status: "等待需求" }
];

const savedReports = [
  {
    title: "春节活动效果分析",
    type: "活动复盘报告",
    status: "已分享",
    time: "昨天 11:48",
    format: "HTML / PPT",
    summary: "复盘春节促销活动的渠道 ROI、转化漏斗和高价值人群表现。"
  },
  {
    title: "华东区域销售诊断",
    type: "销售诊断报告",
    status: "草稿",
    time: "周二 09:12",
    format: "DOCX",
    summary: "定位华东区域销售波动原因，拆解门店、品类和客户贡献。"
  }
];

const filterSets = {
  dataSelectBtn: {
    title: "选择数据",
    options: datasets.filter((item) => item.category !== "connection").map((item) => [item.name, `${item.domain} · 语义完整度 ${item.completeness}`, item.name])
  },
  knowledgeBtn: {
    title: "选择知识库",
    options: []
  }
};

const routeButtons = document.querySelectorAll("[data-route]");
const pages = document.querySelectorAll(".page");
const title = document.getElementById("pageTitle");
const desc = document.getElementById("pageDesc");
const projectList = document.getElementById("projectList");
const solutionGrid = document.getElementById("solutionGrid");
const myTemplateBoard = document.getElementById("myTemplateBoard");
const officialTemplatesPanel = document.getElementById("officialTemplatesPanel");
const myTemplatesPanel = document.getElementById("myTemplatesPanel");
const marketSegmentButtons = document.querySelectorAll("[data-market-segment]");
const agentOwnerButtons = document.querySelectorAll("[data-agent-owner]");
const createTemplateBtn = document.getElementById("createTemplateBtn");
const manageSolutionsBtn = document.getElementById("manageSolutionsBtn");
const appEntryCards = document.querySelectorAll("[data-app-entry]");
const datasetGrid = document.getElementById("datasetGrid");
const myDatasetGrid = document.getElementById("myDatasetGrid");
const datasetPageFileInput = document.getElementById("datasetPageFileInput");
const availableDatasetsPanel = document.getElementById("availableDatasetsPanel");
const createDatasetsPanel = document.getElementById("createDatasetsPanel");
const datasetSegmentButtons = document.querySelectorAll("[data-dataset-segment]");
const createDatasetBtn = document.getElementById("createDatasetBtn");
const knowledgeGrid = document.getElementById("knowledgeGrid");
const myKnowledgeGrid = document.getElementById("myKnowledgeGrid");
const officialKnowledgePanel = document.getElementById("officialKnowledgePanel");
const myKnowledgePanel = document.getElementById("myKnowledgePanel");
const knowledgeSegmentButtons = document.querySelectorAll("[data-knowledge-segment]");
const knowledgeTypeButtons = document.querySelectorAll("[data-knowledge-type]");
const createKnowledgeBtn = document.getElementById("createKnowledgeBtn");
const skillHubGrid = document.getElementById("skillHubGrid");
const skillSegmentButtons = document.querySelectorAll("[data-skill-segment]");
const publishSkillBtn = document.getElementById("publishSkillBtn");
const chatWorkspace = document.getElementById("chatWorkspace");
const emptyTemplateGrid = document.getElementById("emptyTemplateGrid");
const chatStream = document.getElementById("chatStream");
const chatScroll = document.getElementById("chatScroll");
const excelInput = document.getElementById("excelInput");
const uploadSub = document.getElementById("uploadSub");
const conversationModuleMeta = document.getElementById("conversationModuleMeta");
const contextChips = document.getElementById("contextChips");
const composerTop = document.getElementById("composerTop");
const moduleEntryBar = document.getElementById("modeTabs");
const composerStatus = document.getElementById("composerStatus");
const analysisText = document.getElementById("analysisText");
const reportComposer = document.querySelector(".report-composer");
const activeModeChip = document.getElementById("activeModeChip");
const activeModeIcon = document.getElementById("activeModeIcon");
const activeModeLabel = document.getElementById("activeModeLabel");
const activeModeTitle = document.getElementById("activeModeTitle");
const clearTaskModeBtn = document.getElementById("clearTaskModeBtn");
const reportModal = document.getElementById("reportModal");
const reportEditable = document.getElementById("reportEditable");
const manualEditBtn = document.getElementById("manualEditBtn");
const reportModeStatus = document.getElementById("reportModeStatus");
const reportTitle = document.getElementById("reportTitle");
const inlineReportPanel = document.getElementById("inlineReportPanel");
const inlineReportTitle = document.getElementById("inlineReportTitle");
const inlineReportEditable = document.getElementById("inlineReportEditable");
const inlineManualEditBtn = document.getElementById("inlineManualEditBtn");
const inlineReportModeStatus = document.getElementById("inlineReportModeStatus");
const inlineReportSaveStatus = document.getElementById("inlineReportSaveStatus");
const inlineSaveReportBtn = document.getElementById("inlineSaveReportBtn");
const closeInlineReportBtn = document.getElementById("closeInlineReport");
const inlineExportReportBtn = document.getElementById("inlineExportReportBtn");
const drawerOverlay = document.getElementById("drawerOverlay");
const sideDrawer = document.getElementById("sideDrawer");
const modeTabs = document.getElementById("modeTabs");

let selectedSolution = "";
let selectedData = "";
let selectedTemplate = "";
let selectedKnowledge = "";
let selectedAgentId = "";
let webSearchEnabled = false;
let knowledgeEnabled = false;
let running = false;
let activeDatasetFilter = "gold";
let activeDatasetId = datasets[0].id;
let activeAnalysisId = analyses[0].id;
let activeProjectId = "";
let activeProjectConversationId = "";
let savedGeneratedReport = false;
let sourceDatasetMode = "single";
let selectedSourceTables = ["crm_customer_profile"];
let datasetWizardType = "source";
let datasetWizardStep = 1;
let datasetWizardFileName = "";
let datasetFieldConfig = [];
let knowledgeDraftSources = [];
let chatMode = "empty";
let currentMarketSegment = "all";
let currentAppEntry = "";
let currentSkillSegment = "all";
let currentAgentOwner = "official";
let currentKnowledgeType = "all";

function setRoute(route) {
  if (route === "new-analysis") {
    createAnalysis();
    return;
  }
  routeButtons.forEach((button) => button.classList.toggle("active", button.dataset.route === route));
  pages.forEach((page) => page.classList.toggle("active", page.id === `page-${route}`));
  title.textContent = routes[route].title;
  desc.textContent = routes[route].desc;
  if (route !== "chat") setChatMode("chatting");
}

function setChatMode(mode) {
  chatMode = mode;
  chatWorkspace.classList.toggle("empty", mode === "empty");
  chatWorkspace.classList.toggle("chatting", mode === "chatting");
  chatWorkspace.classList.toggle("report-view", mode === "report-view");
  inlineReportPanel.classList.toggle("hidden", mode !== "report-view");
  if (mode !== "report-view") setInlineReportEditMode(false);
}

function getShortDomain(domain) {
  const map = {
    "零售经营": "零售域",
    "营销活动": "营销域",
    "财务经营": "财务域",
    "销售管理": "销售域",
    "供应链": "供应链域",
    "供应链管理": "供应链域"
  };
  return map[domain] || domain;
}

function getCardSummary(solution) {
  const source = solution.scenario || solution.description || "";
  return source.length > 50 ? `${source.slice(0, 50)}...` : source;
}

function getTaskModeLabel(type) {
  const map = {
    report: "AI报告",
    data: "AI问数",
    excel: "AI表格",
    knowledge: "AI知识"
  };
  return map[type] || "AI报告";
}

function getComposerTaskLabel(type) {
  const map = {
    data: "小T问数",
    excel: "小T表格",
    report: "小T报告",
    knowledge: "小T问答"
  };
  return map[type] || "自由分析";
}

function getDefaultOrchestrationText(type) {
  if (type === "data") return "答案优先：直接结论、计算依据、结果表、可展开过程和追问建议。";
  if (type === "excel") return "表格优先：文件识别、字段学习、任务选择，再进入问数或报告。";
  if (type === "knowledge") return "引用优先：直接回答、引用依据、关键摘录、适用边界和后续动作。";
  if (type === "report") return "计划先行：思考过程、执行计划、执行过程、报告卡片和报告工作区。";
  return "自由分析：根据问题自动组织简短回答和下一步建议。";
}

function getActiveAgent() {
  return selectedAgentId ? solutions.find((item) => item.id === selectedAgentId) : null;
}

function getActiveTaskType() {
  const activeAgent = getActiveAgent();
  return activeAgent?.solutionType || currentAppEntry || "";
}

function getMessageRequestTitle() {
  const type = getActiveTaskType();
  if (type === "data") return "数据问题";
  if (type === "excel") return "表格分析需求";
  if (type === "knowledge") return "知识问答";
  if (type === "report") return "报告需求";
  return "你的问题";
}

function getComposerTaskMeta(type) {
  const map = {
    data: { label: "小T问数", title: "我的问数", icon: "◉" },
    excel: { label: "小T表格", title: "我的表格", icon: "▦" },
    report: { label: "小T报告", title: "我的报告", icon: "◫" },
    knowledge: { label: "小T问答", title: "我的问答", icon: "✦" }
  };
  return map[type] || { label: "", title: "", icon: "" };
}

function getAgentSectionOrder() {
  return ["report", "excel", "knowledge", "data"];
}

function getGroupedSectionTitle(type) {
  return getComposerTaskLabel(type);
}

function getMyTemplateTaskType(template) {
  if (template.taskType) return template.taskType;
  if ((template.domain || "").includes("供应链")) return "excel";
  if ((template.domain || "").includes("营销")) return "report";
  if ((template.domain || "").includes("知识")) return "knowledge";
  return "report";
}

function setAgentOwner(owner) {
  currentAgentOwner = owner;
  agentOwnerButtons.forEach((item) => {
    const active = item.dataset.agentOwner === currentAgentOwner;
    item.classList.toggle("active", active);
    item.setAttribute("aria-selected", String(active));
  });
  renderSolutions();
}

function getKnowledgeTypeLabel(type) {
  return type === "template" ? "分析模版" : "业务知识";
}

function getFilteredKnowledgeBases(category) {
  return knowledgeBases.filter((item) => {
    if (item.category !== category) return false;
    if (currentKnowledgeType === "all") return true;
    return item.knowledgeType === currentKnowledgeType;
  });
}

function syncTaskModeUI() {
  const inAgentConversation = Boolean(activeProjectId);
  reportComposer?.classList.toggle("data-mode", currentAppEntry === "data");
  moduleEntryBar?.classList.toggle("hidden", inAgentConversation);
  composerTop?.classList.add("hidden");
  syncConversationModuleMeta();
}

function syncConversationModuleMeta() {
  if (!conversationModuleMeta) return;
  if (!activeProjectId || !selectedAgentId) {
    conversationModuleMeta.classList.add("hidden");
    conversationModuleMeta.textContent = "";
    return;
  }
  const solution = solutions.find((item) => item.id === selectedAgentId);
  const label = solution ? getComposerTaskLabel(solution.solutionType) : "";
  conversationModuleMeta.textContent = label ? `当前模块：${label}` : "";
  conversationModuleMeta.classList.toggle("hidden", !label);
}

function resetTaskMode() {
  currentAppEntry = "";
  appEntryCards.forEach((card) => card.classList.remove("active"));
  modeTabs?.querySelectorAll("[data-task-mode]").forEach((button) => {
    button.classList.remove("active");
  });
  analysisText.placeholder = "";
  syncTaskModeUI();
  if (selectedSolution) {
    uploadSub.textContent = "";
  } else {
    uploadSub.textContent = "";
  }
}

function getAgentKnowledge(solution) {
  if (solution.solutionType === "knowledge") return "业务经验知识库";
  if (solution.id === "retail-ops") return "产销协同业务口径";
  if (solution.solutionType === "report") return "月度经营会报告规范";
  return "";
}

function getAgentSkillNames(solution) {
  return solution.skills || ["数据读取", "分析生成", "报告输出"];
}

function getMyTemplateDomain(template) {
  if (template.domain) return template.domain;
  if (template.name.includes("供应链")) return "供应链域";
  if (template.name.includes("增长")) return "营销域";
  if (template.name.includes("财务")) return "财务域";
  if (template.name.includes("客户") || template.name.includes("销售")) return "销售域";
  return "自定义";
}

function getTemplateSummary(template) {
  const source = template.description || "";
  return source.length > 50 ? `${source.slice(0, 50)}...` : source;
}

function getTemplateAvatar(template) {
  const domain = getMyTemplateDomain(template);
  if (domain.includes("供应链")) return "SC";
  if (domain.includes("营销")) return "MK";
  if (domain.includes("财务")) return "FIN";
  if (domain.includes("销售")) return "CRM";
  if (template.name.includes("增长")) return "UG";
  return "ME";
}

function renderSolutions() {
  solutionGrid.classList.add("grouped-market-grid");
  if (currentAgentOwner === "mine") {
    officialTemplatesPanel.classList.remove("active");
    myTemplatesPanel.classList.add("active");
    createTemplateBtn.classList.remove("hidden");
    renderMyTemplates();
    return;
  }

  officialTemplatesPanel.classList.add("active");
  myTemplatesPanel.classList.remove("active");
  createTemplateBtn.classList.remove("hidden");

  const visibleSolutions = solutions;

  if (visibleSolutions.length === 0) {
    solutionGrid.innerHTML = `
      <div class="empty-dataset-state">
        <strong>暂无该类型 Agent</strong>
        <p>可以从右上角创建一个新的 Agent，或切换到全部查看官方样例。</p>
      </div>
    `;
    return;
  }

  const sections = getAgentSectionOrder().map((type) => {
    const items = visibleSolutions.filter((solution) => solution.solutionType === type);
    if (!items.length) return "";
    return `
      <section class="agent-module-section">
        <h3 class="agent-module-heading">${getGroupedSectionTitle(type)}</h3>
        <div class="agent-section-grid">
          ${items.map((solution) => `
            <article class="solution-card ${solution.hero ? "featured-solution" : "compact-solution"}" data-solution-id="${solution.id}">
              <div class="solution-strip"></div>
              <div class="solution-top">
                <span class="solution-domain">${getShortDomain(solution.domain)}</span>
                <span class="solution-app">${getComposerTaskLabel(solution.solutionType)}</span>
              </div>
              <div class="solution-title-row">
                <div class="solution-avatar">${solution.assetCode || "PA"}</div>
                <div>
                  <h3>${solution.name}</h3>
                </div>
              </div>
              <p>${getCardSummary(solution)}</p>
              <div class="agent-context-line">
                <span>${solution.dataset ? `默认数据：${solution.dataset}` : "默认数据：按需选择"}</span>
                <span>${getAgentKnowledge(solution) ? `默认知识：${getAgentKnowledge(solution)}` : "默认知识：按需选择"}</span>
              </div>
              <div class="solution-actions">
                <button class="dark-btn solution-start">运行示例</button>
                <button class="plain-btn solution-detail">查看详情</button>
                <button class="plain-btn solution-copy-agent">复制为我的 Agent</button>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).filter(Boolean).join("");

  solutionGrid.innerHTML = `<div class="agent-module-sections">${sections}</div>`;

  solutionGrid.querySelectorAll(".solution-card").forEach((card) => {
    const solution = solutions.find((item) => item.id === card.dataset.solutionId);
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      showSolutionDetail(solution);
    });
    card.querySelector(".solution-start").addEventListener("click", () => runAgentExampleFromSolution(solution));
    card.querySelector(".solution-detail").addEventListener("click", () => showSolutionDetail(solution));
    card.querySelector(".solution-copy-agent").addEventListener("click", () => showCreateSolutionDrawer(solution, { copy: true }));
  });
}

function renderEmptyTemplates() {
  const cases = [
    {
      type: "data",
      domain: "产销协同域",
      title: "7月 DRP2 达成率最低的区域是谁？",
      summary: "先返回答案，再展示计算依据、结果表和可展开过程。"
    },
    {
      type: "report",
      domain: "产销协同域",
      title: "生成一份产销协同关键业务指标分析报告",
      summary: "先确认计划，再执行多步分析并输出报告卡片。"
    },
    {
      type: "excel",
      domain: "产销协同域",
      title: "上传产销月度 Excel，识别字段并分析 DRP / AOP 表现",
      summary: "先学习字段语义，再进入问数、分析或报告。"
    },
    {
      type: "knowledge",
      domain: "产销协同域",
      title: "DRP2 达成率低于目标时，经营例会应该如何说明？",
      summary: "先给业务回答，再展示引用依据和适用边界。"
    }
  ];
  emptyTemplateGrid.innerHTML = cases.map((item, index) => `
    <article class="empty-template-card" data-empty-case-index="${index}">
      <span>${getComposerTaskLabel(item.type)} · ${item.domain}</span>
      <strong>${item.title}</strong>
      <p>${item.summary}</p>
      <button class="dark-btn">填入问题</button>
    </article>
  `).join("");

  emptyTemplateGrid.querySelectorAll(".empty-template-card").forEach((card) => {
    const item = cases[Number(card.dataset.emptyCaseIndex)];
    card.addEventListener("click", () => {
      selectAppEntry(item.type);
      analysisText.value = item.title;
      if (item.type !== "knowledge") selectedData = selectedData || "产销协同关键业务指标数据集";
      if (item.type === "knowledge") selectedKnowledge = selectedKnowledge || "产销协同业务口径";
      renderContextChips();
      analysisText.focus();
    });
  });
}

function prepareSolutionInComposer(solution) {
  selectedSolution = solution.name;
  selectedAgentId = solution.id;
  selectedData = solution.dataset;
  selectedTemplate = "";
  const knowledge = getAgentKnowledge(solution);
  if (knowledge) selectedKnowledge = knowledge;
  analysisText.value = solution.prompt;
  uploadSub.textContent = "";
  composerStatus.textContent = `${getTaskModeLabel(solution.solutionType)} Agent 已带入`;
  renderContextChips();
  setRoute("chat");
  setChatMode("empty");
  analysisText.focus();
}

function ensureAgentProject(solution) {
  let project = agentProjects.find((item) => item.agentId === solution.id);
  if (!project) {
    project = {
      id: `project-${solution.id}-${Date.now()}`,
      agentId: solution.id,
      name: solution.name,
      conversations: []
    };
    agentProjects.unshift(project);
  }
  return project;
}

function createProjectConversation(project, solution) {
  const next = {
    id: `agent-chat-${Date.now()}`,
    title: `${new Date().getMonth() + 1}月${new Date().getDate()}日 ${solution.name}`,
    time: "刚刚",
    status: "等待需求"
  };
  project.conversations.unshift(next);
  return next;
}

function createExampleConversation(project, solution) {
  const next = {
    id: `agent-example-${Date.now()}`,
    title: `${new Date().getMonth() + 1}月${new Date().getDate()}日 ${solution.name}运行示例`,
    time: "刚刚",
    status: "运行示例"
  };
  project.conversations.unshift(next);
  return next;
}

function applyProjectAgentContext(project, conversation) {
  const solution = solutions.find((item) => item.id === project.agentId);
  selectedSolution = project.name;
  selectedAgentId = project.agentId;
  selectedTemplate = "";
  selectedData = solution?.dataset || "";
  selectedKnowledge = solution ? getAgentKnowledge(solution) : "";
  analysisText.value = solution?.prompt || "";
  uploadSub.textContent = "";
  composerStatus.textContent = `Agent：${project.name}`;
  title.textContent = conversation.title;
  desc.textContent = `${project.name} 下的独立对话`;
  renderContextChips();
}

function startFromSolution(solution) {
  const project = ensureAgentProject(solution);
  const conversation = createProjectConversation(project, solution);
  renderProjects();
  openProjectConversation(project.id, conversation.id);
}

async function runAgentExampleFromSolution(solution) {
  if (running) return;
  const project = ensureAgentProject(solution);
  const conversation = createExampleConversation(project, solution);
  renderProjects();
  openProjectConversation(project.id, conversation.id);
  analysisText.value = solution.prompt || `请运行「${solution.name}」案例结果。`;
  await runExampleGeneration(solution);
}

function openSampleReport(solution) {
  reportTitle.textContent = `${solution.name}样例报告`;
  setReportPreviewContent(solution);
  openReport();
}

function getSolutionByName(name) {
  return solutions.find((item) => item.name === name);
}

function getRetailReportDemoHtml() {
  return `
    <div class="retail-report-demo">
      <section class="retail-section">
        <h3>一、一级指标达成</h3>
        <table class="retail-report-table highlight">
          <thead>
            <tr>
              <th>关键绩效指标</th>
              <th>指标定义与核算公式</th>
              <th>门槛值</th>
              <th>目标值</th>
              <th>挑战值</th>
              <th>1月</th>
              <th>2月</th>
              <th>3月</th>
              <th>4月</th>
              <th>5月</th>
              <th>6月</th>
              <th>7月</th>
              <th>2024累计</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DRP2达成率</td>
              <td>DRP2执行率</td>
              <td>85%</td>
              <td>90%</td>
              <td>95%</td>
              <td class="good">100.0%</td>
              <td class="bad">81.5%</td>
              <td class="bad">83.8%</td>
              <td class="bad">81.8%</td>
              <td class="good">100.0%</td>
              <td class="good">95.5%</td>
              <td class="good">96.3%</td>
              <td class="good">91.3%</td>
            </tr>
            <tr>
              <td>智能机DRP2供应满足率</td>
              <td>DRP2供应满足率</td>
              <td>96%</td>
              <td>98%</td>
              <td>99%</td>
              <td class="good">100.0%</td>
              <td class="good">99.1%</td>
              <td class="good">100.0%</td>
              <td class="good">100.0%</td>
              <td class="good">100.0%</td>
              <td class="good">99.8%</td>
              <td class="good">99.3%</td>
              <td class="good">99.7%</td>
            </tr>
            <tr>
              <td>库存周转天数</td>
              <td>存货周转天数</td>
              <td>53天</td>
              <td>46天</td>
              <td>41天</td>
              <td class="neutral">38.2</td>
              <td class="bad">57.0</td>
              <td class="neutral">41.7</td>
              <td class="warn">47.6</td>
              <td class="good">43.8</td>
              <td class="neutral">39.9</td>
              <td class="neutral">42.0</td>
              <td class="good">43.8</td>
            </tr>
            <tr>
              <td>超期库存占比</td>
              <td>超期库存占比</td>
              <td>15%</td>
              <td>13%</td>
              <td>12%</td>
              <td class="warn">14.2%</td>
              <td class="bad">25.4%</td>
              <td class="bad">25.9%</td>
              <td class="bad">26.3%</td>
              <td class="bad">26.2%</td>
              <td class="bad">27.5%</td>
              <td class="bad">26.1%</td>
              <td class="bad">24.3%</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section class="retail-section">
        <h3>二、DRP达成</h3>
        <h4>2.1 7月达成复盘</h4>
        <p class="retail-callout">智能机集团 DRP2 815.9万，SI 785.9W，DRP2达成率 96%。</p>
        <div class="retail-dashboard-grid">
          <div class="retail-dashboard-card">
            <b>集团2024年07月达成</b>
            <div class="retail-kpi-strip">
              <span><strong>96%</strong><small>月度DRP2达成率</small></span>
              <span><strong>93%</strong><small>年度累计DRP2达成率</small></span>
              <span><strong>91%</strong><small>月度AOP达成率</small></span>
            </div>
          </div>
          <div class="retail-dashboard-card">
            <b>集团DRP达成趋势</b>
            <div class="trend-line-demo">
              <span style="left:4%;top:62%"></span>
              <span style="left:18%;top:58%"></span>
              <span style="left:32%;top:44%"></span>
              <span style="left:46%;top:49%"></span>
              <span style="left:60%;top:55%"></span>
              <span style="left:74%;top:47%"></span>
              <span style="left:88%;top:43%"></span>
            </div>
          </div>
        </div>

        <h4>2.2 8月达成预估</h4>
        <p class="retail-paragraph">
          当前达成（SI截止至08/15）：DRP2达成 29%，发货进度 11%。分BU达成率为 TECNO 21%、Infinix 38%、itel 29%、战略业务 63%。
        </p>
        <div class="retail-mini-metrics">
          <div><span>月至今SI</span><strong>231.3</strong><small>环比 +11%</small></div>
          <div><span>月至今SO</span><strong>467.4</strong><small>环比 -29%</small></div>
          <div><span>DRP2达成率</span><strong>29%</strong><small class="bad-text">低于目标</small></div>
          <div><span>AOP达成率</span><strong>27%</strong><small class="bad-text">低于目标</small></div>
        </div>
        <div class="retail-split-tables">
          <table class="retail-report-table compact">
            <thead>
              <tr>
                <th>事业部</th>
                <th>月至今SI</th>
                <th>月至今SO</th>
                <th>月至今DRP2达成率</th>
                <th>月至今AOP达成率</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>TECNO</td><td>80.6</td><td>196.4</td><td class="bad-text">21%</td><td class="bad-text">25%</td></tr>
              <tr><td>Infinix</td><td>94.3</td><td>179.2</td><td class="bad-text">38%</td><td class="bad-text">27%</td></tr>
              <tr><td>itel</td><td>48.0</td><td>82.7</td><td class="bad-text">29%</td><td class="bad-text">30%</td></tr>
              <tr><td>战略业务</td><td>8.4</td><td>9.2</td><td class="good-text">63%</td><td class="bad-text">30%</td></tr>
            </tbody>
          </table>
          <table class="retail-report-table compact">
            <thead>
              <tr>
                <th>区域</th>
                <th>月至今SI</th>
                <th>月至今SO</th>
                <th>月至今DRP2达成率</th>
                <th>月至今AOP达成率</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>SSA</td><td>59.2</td><td>135</td><td class="bad-text">23%</td><td class="bad-text">24%</td></tr>
              <tr><td>新市场</td><td>112.5</td><td>202</td><td class="bad-text">33%</td><td class="bad-text">30%</td></tr>
              <tr><td>拉美</td><td>19.6</td><td>47.5</td><td class="bad-text">19%</td><td class="bad-text">19%</td></tr>
              <tr><td>印度</td><td>27.4</td><td>38.6</td><td>40%</td><td>45%</td></tr>
              <tr><td>孟加拉</td><td>7.8</td><td>10.3</td><td>42%</td><td class="bad-text">31%</td></tr>
            </tbody>
          </table>
        </div>

        <h4>2.3 年度AOP达成预估</h4>
        <p class="retail-paragraph">
          年度AOP预估达成率：集团 104%，TECNO 102%，Infinix 105%，itel 114%，战略业务 70%。SSA 102%，新市场 102%，拉美 104%，印度 107%，孟加拉 70%。
        </p>
        <table class="retail-report-table compact">
          <thead>
            <tr>
              <th>指标名称</th>
              <th>202401</th>
              <th>202402</th>
              <th>202403</th>
              <th>202404</th>
              <th>202405</th>
              <th>202406</th>
              <th>202407</th>
              <th>202408</th>
              <th>全年</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>集团AOP达成率</td><td>134%</td><td class="bad-text">94%</td><td>104%</td><td class="bad-text">82%</td><td class="bad-text">96%</td><td>96%</td><td class="bad-text">89%</td><td class="bad-text">92%</td><td>104%</td></tr>
            <tr><td>TECNO</td><td>144%</td><td>97%</td><td>106%</td><td class="bad-text">78%</td><td class="bad-text">91%</td><td>91%</td><td class="bad-text">85%</td><td>118%</td><td>102%</td></tr>
            <tr><td>Infinix</td><td>123%</td><td class="bad-text">91%</td><td>106%</td><td class="bad-text">86%</td><td>100%</td><td>100%</td><td class="bad-text">87%</td><td class="bad-text">67%</td><td>105%</td></tr>
            <tr><td>itel</td><td>134%</td><td>92%</td><td>97%</td><td class="bad-text">86%</td><td>106%</td><td>107%</td><td>110%</td><td>102%</td><td>114%</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  `;
}

function getReportPreviewHtml(solution) {
  if (!solution || solution?.id === "retail-ops" || solution?.name === "产销协同关键业务指标分析") {
    return getRetailReportDemoHtml();
  }

  return `
    <div class="metric-row">
      <div><span>GMV</span><strong>¥18.6M</strong><small>环比 +8.4%</small></div>
      <div><span>毛利率</span><strong>31.2%</strong><small>环比 -2.1pp</small></div>
      <div><span>ROI</span><strong>2.8</strong><small>低于目标 0.4</small></div>
    </div>
    <div class="fake-chart"><span style="height:42%"></span><span style="height:70%"></span><span style="height:55%"></span><span style="height:82%"></span><span style="height:48%"></span><span style="height:64%"></span></div>
    <h3>核心结论</h3>
    <p>本期收入达成率为 104%，增长主要来自华东和华南区域；但毛利率连续两周下滑，主要受低毛利活动品类占比提升影响。</p>
    <h3>建议动作</h3>
    <p>下月建议将直播渠道从单纯 GMV 目标切换为“GMV + 毛利保护”双目标，并对家清品类设置活动价格下限。</p>
  `;
}

function setReportPreviewContent(solution) {
  const html = getReportPreviewHtml(solution);
  reportEditable.innerHTML = html;
  inlineReportEditable.innerHTML = html;
}

function getSolutionDatasetPreviewRows(solution) {
  if (solution.id === "retail-ops") {
    return [
      ["2024-07", "TECNO", "SSA", "尼日利亚", "815.9", "785.9", "96%", "91%"],
      ["2024-07", "Infinix", "新市场", "巴基斯坦", "179.2", "94.3", "38%", "27%"],
      ["2024-07", "itel", "印度", "印度", "82.7", "48.0", "29%", "30%"],
      ["2024-08", "TECNO", "SSA", "肯尼亚", "467.4", "231.3", "29%", "27%"],
      ["2024-08", "战略业务", "拉美", "秘鲁", "9.2", "8.4", "63%", "30%"]
    ];
  }

  return Array.from({ length: 5 }, (_, index) => solution.fields.map((field, fieldIndex) => {
    if (fieldIndex === 0) return `样例${index + 1}`;
    if (fieldIndex < 3) return `${field}${index + 1}`;
    return String((index + 2) * (fieldIndex + 11) * 37);
  }));
}

function renderDatasetPreviewTable(solution) {
  const columns = solution.fields.slice(0, 8);
  const rows = getSolutionDatasetPreviewRows(solution);
  return `
    <div class="dataset-preview-table-wrap">
      <table class="dataset-preview-table">
        <thead>
          <tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.map((row) => `<tr>${columns.map((_, index) => `<td>${row[index] || "-"}</td>`).join("")}</tr>`).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderFieldRoleRows() {
  const rows = [
    ["时间维度", "日期、月份、统计周期", "判断趋势、环比、同比"],
    ["组织/地域维度", "国家、地区、区域、门店", "做维度拆解和贡献分析"],
    ["业务对象维度", "品类、产品、渠道、客户", "做归因分析"],
    ["规模指标", "销售额、GMV、销量、激活数", "判断业务规模和目标达成"],
    ["效率/质量指标", "毛利额、毛利率、转化率、客单价", "判断经营质量"],
    ["目标/对照指标", "目标值、预算、去年同期", "做达成率和差异分析"]
  ];

  return rows.map((row) => `
    <div class="field-role-row">
      <span>${row[0]}</span>
      <span>${row[1]}</span>
      <span>${row[2]}</span>
    </div>
  `).join("");
}

function showSolutionDetail(solution) {
  sideDrawer.classList.add("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="solution-detail-page">
      <div class="solution-detail-hero">
        <div class="solution-detail-title">
          <div class="detail-avatar">${solution.assetCode || "PA"}</div>
          <h2>${solution.name}</h2>
        </div>
        <div class="detail-head-actions">
          <button class="plain-btn" id="previewSolutionReport">案例结果</button>
          <button class="plain-btn" id="copySolutionAgent">复制为我的 Agent</button>
          <button class="dark-btn" id="startSolutionReport">运行示例</button>
          <button class="drawer-close" id="closeDrawer">×</button>
        </div>
      </div>
      <div class="solution-detail-content">
        <section class="solution-summary-panel">
          <div class="summary-row">
            <b>任务类型</b>
            <p>${getTaskModeLabel(solution.solutionType)}</p>
          </div>
          <div class="summary-row">
            <b>默认编排</b>
            <p>${getDefaultOrchestrationText(solution.solutionType)}</p>
          </div>
          <div class="summary-row">
            <b>Agent 概要</b>
            <p>${solution.scenario || `帮助${solution.audience}快速产出${solution.reportType}，把数据变化、原因拆解和下一步动作放到同一份报告里。`}</p>
          </div>
          <div class="summary-row">
            <b>业务领域</b>
            <p>${solution.domain}</p>
          </div>
          <div class="summary-row">
            <b>适用对象</b>
            <p>${solution.audience}</p>
          </div>
        </section>
        <section class="solution-detail-section">
          <span>可用知识库</span>
          <p>${getAgentKnowledge(solution) || "未配置默认知识库"}</p>
        </section>
        <section class="solution-detail-section">
          <span>数据集及相关信息</span>
          <div class="dataset-overview-card">
            <div class="dataset-title-row">
              <div>
                <p>已预置字段说明、指标口径和适用场景，可直接作为样例数据运行；用户也可以用结构相近的数据复刻该方案。</p>
              </div>
            </div>
          </div>
          <div class="dataset-field-groups">
            <div class="dataset-field-group dimension">
              <div class="field-group-head">
                <b>维度字段</b>
                <span>用于切分和对比数据</span>
              </div>
              <div class="detail-chip-list">${(solution.dimensions || solution.fields.slice(0, 4)).map((field) => `<span>${field}</span>`).join("")}</div>
            </div>
            <div class="dataset-field-group measure">
              <div class="field-group-head">
                <b>指标字段</b>
                <span>用于计算和衡量表现</span>
              </div>
              <div class="detail-chip-list">${(solution.measures || solution.metrics || []).map((metric) => `<span>${metric}</span>`).join("")}</div>
            </div>
          </div>
          <div class="dataset-preview-action">
            <button class="plain-btn" id="previewDatasetRows">预览前5条</button>
          </div>
          <div class="dataset-preview-panel hidden" id="datasetPreviewPanel">
            <div class="dataset-preview-head">
              <b>数据预览</b>
              <span>前 5 条样例数据</span>
            </div>
            ${renderDatasetPreviewTable(solution)}
          </div>
        </section>
        <section class="solution-detail-section">
          <span>分析方法</span>
          ${solution.analysisItems ? `
            <div class="analysis-accordion" id="analysisAccordion">
              ${solution.analysisItems.map((item) => `
                <article class="analysis-item">
                  <button class="analysis-item-toggle" type="button">
                    <span class="analysis-item-arrow">›</span>
                    <span class="analysis-item-label">${item.name}</span>
                  </button>
                  <div class="analysis-item-body">
                    <ul class="analysis-operation-list">
                      ${item.operations.map((operation) => `<li>${operation}</li>`).join("")}
                    </ul>
                  </div>
                </article>
              `).join("")}
            </div>
          ` : `<ol class="detail-steps">${solution.flow.map((step) => `<li>${step}</li>`).join("")}</ol>`}
        </section>
        <section class="solution-detail-section">
          <span>使用要求</span>
          <p>使用自己的数据时，不要求字段名称完全一致，只需要能映射到该 Agent 所需的字段角色。系统会优先自动识别字段含义，也支持用户手动调整映射。</p>
          <div class="field-role-table">
            <div class="field-role-head">
              <span>字段角色</span>
              <span>示例字段名</span>
              <span>用途</span>
            </div>
            ${renderFieldRoleRows()}
          </div>
          <p class="field-role-note">例如 Agent 里的「国家」可以映射为用户数据里的「地区」「区域」；「激活」可以映射为「销量」「销售额」「GMV」等业务规模指标。</p>
        </section>
        <section class="solution-detail-section">
          <span>已配置 Skills</span>
          <div class="detail-chip-list">${getAgentSkillNames(solution).map((item) => `<span>${item}</span>`).join("")}</div>
        </section>
        <section class="solution-detail-section">
          <span>运行示例</span>
          <p>可直接体验该 Agent 已配置好的数据、知识库、分析方法和 Skills，运行后会生成思考过程、执行计划、执行过程和最终报告卡片。</p>
        </section>
      </div>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("previewSolutionReport").addEventListener("click", () => openSampleReport(solution));
  document.getElementById("copySolutionAgent").addEventListener("click", () => showCreateSolutionDrawer(solution, { copy: true }));
  document.getElementById("startSolutionReport").addEventListener("click", () => {
    closeDrawer();
    runAgentExampleFromSolution(solution);
  });
  document.getElementById("previewDatasetRows").addEventListener("click", () => {
    const panel = document.getElementById("datasetPreviewPanel");
    panel.classList.toggle("hidden");
  });
  document.querySelectorAll(".analysis-item-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const item = button.closest(".analysis-item");
      if (!item) return;
      item.classList.toggle("open");
      item.querySelector(".analysis-item-arrow").textContent = item.classList.contains("open") ? "⌄" : "›";
    });
  });
}

function copySolutionTemplate(solution) {
  templates.unshift({
    id: `template-${Date.now()}`,
    name: `${solution.name}副本`,
    description: `从 Agent 广场复制，可基于 ${solution.dataset} 调整为团队自己的 Agent。`,
    items: ["数据集", "指标口径", "分析结构", "输出样式"],
    shared: false
  });
  renderMyTemplates();
}

function useMyTemplate(template) {
  selectedSolution = template.name;
  selectedAgentId = template.id;
  selectedTemplate = "";
  if (template.dataSource) selectedData = template.dataSource;
  selectedKnowledge = template.knowledgeBase || "";
  analysisText.value = template.analysisIdea || `请按「${template.name}」Agent 生成报告，先给核心结论，再展示关键指标、归因分析和建议动作。`;
  uploadSub.textContent = "";
  composerStatus.textContent = "已应用我的 Agent";
  renderContextChips();
  setRoute("chat");
  analysisText.focus();
}

function showMyTemplateDetail(template) {
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.classList.add("my-template-detail-drawer");
  sideDrawer.innerHTML = `
    <div class="my-template-detail-page">
      <div class="drawer-head my-template-titlebar">
        <div>
          <span class="card-kicker">MY TEMPLATE</span>
          <h3>${template.name}</h3>
        </div>
        <div class="detail-head-actions">
          <button class="plain-btn" id="detailShareTemplate">分享</button>
          <button class="dark-btn" id="detailUseTemplate">使用 Agent</button>
          <button class="drawer-close" id="closeDrawer">×</button>
        </div>
      </div>
      <div class="my-template-detail-content">
        <section class="template-summary-panel my-template-summary-panel">
          <div class="summary-row">
            <b>Agent 概要</b>
            <p>${template.description}</p>
          </div>
          <div class="summary-row">
            <b>业务领域</b>
            <p>${getMyTemplateDomain(template)}</p>
          </div>
          <div class="summary-row">
            <b>适用对象</b>
            <p>${template.audience || "未设置"}</p>
          </div>
        </section>
        <section class="my-template-detail-section">
          <span>分析思路</span>
          <p>${template.analysisIdea || "未设置分析思路"}</p>
        </section>
        <section class="my-template-detail-section">
          <span>数据来源</span>
          <p>${template.dataSource || "未设置"}</p>
        </section>
        <section class="my-template-detail-section">
          <span>分析结构</span>
          <div class="template-structure-list">${(template.items || []).map((item) => `<span>${item}</span>`).join("")}</div>
        </section>
      </div>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("detailUseTemplate").addEventListener("click", () => {
    closeDrawer();
    useMyTemplate(template);
  });
  document.getElementById("detailShareTemplate").addEventListener("click", () => showTemplateShareDrawer(template.id));
}

function renderDatasetOptions() {
  return datasets.map((dataset) => `<option value="${escapeHtml(dataset.name)}">${escapeHtml(dataset.name)}</option>`).join("");
}

function getDatasetNames() {
  return datasets.map((dataset) => dataset.name);
}

function getKnowledgeOptionsByType(type, includeBlank = false) {
  const items = knowledgeBases.filter((item) => {
    if (type === "all") return true;
    return item.knowledgeType === type;
  });
  const options = items.map((item) => `<option value="${escapeHtml(item.name)}">${escapeHtml(item.name)}${item.category === "official" ? "（官方）" : ""}</option>`);
  if (includeBlank) options.unshift(`<option value="">暂不绑定</option>`);
  return options.join("");
}

function getSkillCheckboxes(selectedSkillIds = []) {
  return skills.map((skill) => `
    <label class="agent-skill-check">
      <input type="checkbox" data-agent-skill="${skill.id}" ${selectedSkillIds.includes(skill.id) ? "checked" : ""}>
      <span>${skill.title}</span>
    </label>
  `).join("");
}

function showCreateTemplateDrawer() {
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">NEW TEMPLATE</span>
        <h3>新建方案</h3>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <div class="template-form">
      <section class="drawer-section">
        <span>基础信息</span>
        <label>
          <b>模板名称</b>
          <input id="newTemplateName" type="text" placeholder="例如：区域经营复盘">
        </label>
        <label>
          <b>业务领域</b>
          <select id="newTemplateDomain">
            <option value="零售域">零售域</option>
            <option value="财务域">财务域</option>
            <option value="销售域">销售域</option>
            <option value="供应链域">供应链域</option>
            <option value="营销域">营销域</option>
          </select>
        </label>
        <label>
          <b>模板概要</b>
          <textarea id="newTemplateDescription" placeholder="说明这个模板适合解决什么问题，会产出什么报告。"></textarea>
        </label>
        <label>
          <b>适用对象</b>
          <input id="newTemplateAudience" type="text" placeholder="例如：经营负责人 / 区域经理">
        </label>
      </section>
      <section class="drawer-section">
        <span>分析思路</span>
        <label>
          <b>自由描述</b>
          <textarea id="newTemplateIdea" class="large" placeholder="可以描述你希望 AI 如何分析，例如先看目标达成，再拆区域、品类和渠道，最后输出异常原因和行动建议。"></textarea>
        </label>
      </section>
      <section class="drawer-section">
        <span>数据来源</span>
        <label>
          <b>选择已有数据集</b>
          <select id="newTemplateDataset">${renderDatasetOptions()}</select>
        </label>
        <div class="template-upload-row">
          <button class="plain-btn" id="newTemplateUploadBtn">上传 Excel / CSV</button>
          <span id="newTemplateUploadName">未上传文件</span>
          <input id="newTemplateFile" class="hidden-file-input" type="file" accept=".xls,.xlsx,.csv">
        </div>
      </section>
      <p class="drawer-form-status" id="newTemplateStatus">请选择已有数据集，或上传一个 Excel / CSV 作为模板数据来源。</p>
      <div class="drawer-actions">
        <button class="plain-btn" id="cancelCreateTemplate">取消</button>
        <button class="dark-btn" id="saveNewTemplate">保存模板</button>
      </div>
    </div>
  `;
  openDrawer();
  const fileInput = document.getElementById("newTemplateFile");
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("cancelCreateTemplate").addEventListener("click", closeDrawer);
  document.getElementById("newTemplateUploadBtn").addEventListener("click", () => fileInput.click());
  fileInput.addEventListener("change", (event) => {
    const fileName = event.target.files[0]?.name || "";
    document.getElementById("newTemplateUploadName").textContent = fileName || "未上传文件";
  });
  document.getElementById("saveNewTemplate").addEventListener("click", saveNewTemplate);
}

function saveNewTemplate() {
  const name = document.getElementById("newTemplateName").value.trim();
  const domain = document.getElementById("newTemplateDomain").value;
  const description = document.getElementById("newTemplateDescription").value.trim();
  const audience = document.getElementById("newTemplateAudience").value.trim();
  const analysisIdea = document.getElementById("newTemplateIdea").value.trim();
  const selectedDatasetName = document.getElementById("newTemplateDataset").value;
  const fileName = document.getElementById("newTemplateFile").files[0]?.name || "";
  const status = document.getElementById("newTemplateStatus");

  if (!name || !description || !analysisIdea) {
    status.textContent = "请补充模板名称、模板概要和分析思路。";
    status.classList.add("error");
    return;
  }

  const dataSource = fileName || selectedDatasetName;
  templates.unshift({
    id: `template-${Date.now()}`,
    name,
    domain,
    description,
    audience,
    analysisIdea,
    dataSource,
    items: ["分析思路", "数据来源", "报告生成"],
    shared: false
  });
  renderMyTemplates();
  closeDrawer();
}

function renderMyTemplates() {
  myTemplateBoard.classList.add("grouped-market-board");
  const sections = getAgentSectionOrder().map((type) => {
    const items = templates.filter((template) => getMyTemplateTaskType(template) === type);
    if (!items.length) return "";
    return `
      <section class="agent-module-section">
        <h3 class="agent-module-heading">${getGroupedSectionTitle(type)}</h3>
        <div class="agent-section-grid">
          ${items.map((template) => `
            <article class="solution-card my-template-card" data-template-id="${template.id}" data-template-name="${template.name}">
              <div class="solution-strip"></div>
              <div class="solution-top">
                <span class="solution-domain">${getMyTemplateDomain(template)}</span>
                <span class="solution-app">我的 Agent</span>
              </div>
              <div class="solution-title-row">
                <div class="solution-avatar">${getTemplateAvatar(template)}</div>
                <div>
                  <h3>${template.name}</h3>
                </div>
              </div>
              <p>${getTemplateSummary(template)}</p>
              <div class="solution-actions">
                <button class="dark-btn template-use">使用 Agent</button>
                <button class="plain-btn template-detail">查看详情</button>
                <button class="plain-btn template-share">分享</button>
                <button class="plain-btn template-edit">编辑</button>
              </div>
            </article>
          `).join("")}
        </div>
      </section>
    `;
  }).filter(Boolean).join("");

  myTemplateBoard.innerHTML = `<div class="agent-module-sections">${sections}</div>`;

  myTemplateBoard.querySelectorAll(".my-template-card").forEach((card) => {
    const template = templates.find((item) => item.id === card.dataset.templateId);
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      showMyTemplateDetail(template);
    });
    card.querySelector(".template-use").addEventListener("click", () => {
      useMyTemplate(template);
    });
    card.querySelector(".template-detail").addEventListener("click", () => showMyTemplateDetail(template));
    card.querySelector(".template-share").addEventListener("click", () => showTemplateShareDrawer(card.dataset.templateId));
    card.querySelector(".template-edit").addEventListener("click", () => showCreateSolutionDrawer(template));
  });
}

function setMarketSegment(segment) {
  currentMarketSegment = segment;
  marketSegmentButtons.forEach((button) => {
    const isActive = button.dataset.marketSegment === segment;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  renderSolutions();
}

function renderSkillHub() {
  const visibleSkills = currentSkillSegment === "all"
    ? skills
    : skills.filter((skill) => skill.category === currentSkillSegment);
  skillHubGrid.innerHTML = visibleSkills.map((skill) => `
    <article class="skillhub-card" data-skill-id="${skill.id}">
      <div class="skillhub-icon">${skill.title.slice(0, 1).toUpperCase()}</div>
      <div class="skillhub-main">
        <div class="skillhub-title-row">
          <h3>${skill.title}</h3>
          <span>${skill.category === "official" ? "官方" : skill.category === "enterprise" ? "企业" : "我的"}</span>
        </div>
        <p>${skill.summary}</p>
        <small>${skill.intro}</small>
        <div class="skillhub-meta">
          <span>${skill.author}</span>
          <button class="plain-btn skill-detail">查看详情</button>
        </div>
      </div>
    </article>
  `).join("");
  skillHubGrid.querySelectorAll(".skillhub-card").forEach((card) => {
    const skill = skills.find((item) => item.id === card.dataset.skillId);
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      showSkillDetail(skill);
    });
    card.querySelector(".skill-detail").addEventListener("click", () => showSkillDetail(skill));
  });
}

function setSkillSegment(segment) {
  currentSkillSegment = segment;
  skillSegmentButtons.forEach((button) => {
    const active = button.dataset.skillSegment === segment;
    button.classList.toggle("active", active);
    button.setAttribute("aria-selected", String(active));
  });
  renderSkillHub();
}

function showSkillDetail(skill) {
  if (!skill) return;
  sideDrawer.classList.remove("solution-detail-drawer", "dataset-wizard-drawer", "dataset-detail-drawer", "my-template-detail-drawer", "knowledge-detail-drawer", "knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">SKILL DETAIL</span>
        <h2>${skill.title}</h2>
        <p>${skill.author} · ${skill.category === "official" ? "官方 Skill" : skill.category === "enterprise" ? "企业 Skill" : "我的 Skill"}</p>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <section class="drawer-section">
      <span>摘要</span>
      <p>${skill.summary}</p>
    </section>
    <section class="drawer-section">
      <span>技能介绍</span>
      <p>${skill.intro}</p>
    </section>
    <div class="drawer-actions">
      <button class="plain-btn" id="addSkillToAgent">添加到 Agent</button>
      <button class="dark-btn" id="closeSkillDetail">完成</button>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("closeSkillDetail").addEventListener("click", closeDrawer);
  document.getElementById("addSkillToAgent").addEventListener("click", () => {
    composerStatus.textContent = `可在新建 Agent 时添加 Skill：${skill.title}`;
    closeDrawer();
  });
}

function showPublishSkillDrawer() {
  sideDrawer.classList.remove("solution-detail-drawer", "dataset-wizard-drawer", "dataset-detail-drawer", "my-template-detail-drawer", "knowledge-detail-drawer", "knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">PUBLISH SKILL</span>
        <h2>发布 Skill</h2>
        <p>按统一格式填写标题、摘要和技能介绍，保存后可在新建 Agent 时使用。</p>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <div class="solution-form-preview">
      <label>标题<input id="newSkillTitle" value="指标异常识别"></label>
      <label>摘要<textarea id="newSkillSummary">识别关键指标中异常波动的对象，并输出需要关注的业务单元。</textarea></label>
      <label>技能介绍<textarea id="newSkillIntro">适用于经营分析和管理报告。输入字段包括时间、组织、区域、指标值和目标值，输出异常对象、波动方向和可能原因。</textarea></label>
      <button class="dark-btn" id="saveNewSkill">发布 Skill</button>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("saveNewSkill").addEventListener("click", () => {
    skills.unshift({
      id: `skill-${Date.now()}`,
      category: "mine",
      title: document.getElementById("newSkillTitle").value.trim() || "我的 Skill",
      summary: document.getElementById("newSkillSummary").value.trim() || "自定义 Skill 摘要",
      intro: document.getElementById("newSkillIntro").value.trim() || "自定义 Skill 介绍",
      author: "曹海肖"
    });
    currentSkillSegment = "mine";
    setSkillSegment("mine");
    closeDrawer();
  });
}

function showSolutionManagementDrawer() {
  sideDrawer.classList.remove("solution-detail-drawer", "dataset-wizard-drawer", "dataset-detail-drawer", "my-template-detail-drawer", "knowledge-detail-drawer", "knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-content solution-management">
      <div class="drawer-head">
        <div>
          <span class="card-kicker">AGENT MANAGEMENT</span>
          <h2>Agent 管理</h2>
          <p>统一管理官方 Agent 和我的 Agent。这里先用静态原型表达启用、编辑、分享和发布入口。</p>
        </div>
        <button class="drawer-close" id="closeDrawer">×</button>
      </div>
      <div class="management-tabs">
        <span class="active">全部 ${solutions.length + templates.length}</span>
        <span>AI报告 ${solutions.filter((item) => item.solutionType === "report").length}</span>
        <span>AI表格 ${solutions.filter((item) => item.solutionType === "excel").length}</span>
        <span>知识问答 1</span>
      </div>
      <div class="management-list">
        ${solutions.map((solution) => `
          <article>
            <div>
              <b>${solution.name}</b>
              <p>${getTaskModeLabel(solution.solutionType)} · ${solution.domain} · 官方 Agent</p>
            </div>
            <span class="status green">已启用</span>
            <button class="plain-btn" data-manage-solution="${solution.id}">查看</button>
          </article>
        `).join("")}
        ${templates.slice(0, 2).map((template) => `
          <article>
            <div>
              <b>${template.name}</b>
              <p>我的 Agent · ${getMyTemplateDomain(template)}</p>
            </div>
            <span class="status">草稿</span>
            <button class="plain-btn">编辑</button>
          </article>
        `).join("")}
      </div>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  sideDrawer.querySelectorAll("[data-manage-solution]").forEach((button) => {
    button.addEventListener("click", () => {
      const solution = solutions.find((item) => item.id === button.dataset.manageSolution);
      if (solution) showSolutionDetail(solution);
    });
  });
}

function getOfficialDatasets() {
  return datasets.filter((item) => item.category === "gold");
}

function getMyDatasets() {
  return datasets.filter((item) => item.category === "mine");
}

function setDatasetSegment(segment) {
  const showOfficial = segment === "official";
  availableDatasetsPanel.classList.toggle("active", showOfficial);
  createDatasetsPanel.classList.toggle("active", !showOfficial);
  createDatasetBtn.classList.toggle("hidden", showOfficial);
  datasetSegmentButtons.forEach((button) => {
    const isActive = button.dataset.datasetSegment === segment;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

function selectDataset(dataset) {
  selectedData = dataset.name;
  uploadSub.textContent = "";
  composerStatus.textContent = "已选择数据";
  renderContextChips();
  setRoute("chat");
  analysisText.focus();
}

function renderDatasets() {
  datasetGrid.innerHTML = renderDatasetCards(getOfficialDatasets());
  myDatasetGrid.innerHTML = renderDatasetCards(getMyDatasets(), "my-dataset-card");
  bindDatasetCards(datasetGrid);
  bindDatasetCards(myDatasetGrid);
}

function renderDatasetCards(items, extraClass = "") {
  if (items.length === 0) {
    return `
      <div class="empty-dataset-state">
        <strong>还没有自己的数据集</strong>
        <p>可以先从下方上传 Excel / CSV，或从企业已接入数据源创建。</p>
      </div>
    `;
  }
  return items.map((dataset) => `
    <article class="dataset-card available-dataset-card ${extraClass}" data-dataset-id="${dataset.id}">
      <div class="dataset-card-top">
        <span class="dataset-domain">${getDatasetShortDomain(dataset.domain)}</span>
        <span class="dataset-origin">${dataset.sourceType || "可用数据集"}</span>
      </div>
      <div class="dataset-card-title-row">
        <div class="solution-avatar dataset-avatar">${dataset.category === "gold" ? "OFF" : "MY"}</div>
        <div>
          <strong>${dataset.name}</strong>
        </div>
      </div>
      <p>${dataset.description}</p>
      <div class="dataset-actions">
        <button class="plain-btn dataset-detail-btn">查看详情</button>
        <button class="dark-btn dataset-use-btn">选择数据</button>
      </div>
    </article>
  `).join("");
}

function bindDatasetCards(container) {
  container.querySelectorAll(".available-dataset-card").forEach((card) => {
    const dataset = datasets.find((item) => item.id === card.dataset.datasetId);
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      showDatasetDetail(dataset);
    });
    card.querySelector(".dataset-detail-btn").addEventListener("click", () => showDatasetDetail(dataset));
    card.querySelector(".dataset-use-btn").addEventListener("click", () => selectDataset(dataset));
  });
}

function getDatasetShortDomain(domain) {
  const map = {
    "零售经营": "零售域",
    "营销活动": "营销域",
    "销售管理": "销售域",
    "个人上传": "我的数据",
    "数据连接": "数据连接"
  };
  return map[domain] || domain || "数据集";
}

function showCreateDatasetEntryDrawer() {
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  datasetWizardType = "";
  datasetWizardStep = 1;
  datasetWizardFileName = "";
  datasetFieldConfig = [];
  sourceDatasetMode = "single";
  selectedSourceTables = ["crm_customer_profile"];
  renderDatasetWizardStep();
}

function getDatasetPreviewRows(dataset) {
  const columns = dataset.schema.slice(0, 6);
  return Array.from({ length: 5 }, (_, rowIndex) => columns.map((column, colIndex) => {
    if (column.includes("日期")) return `2026-0${(rowIndex % 5) + 1}`;
    if (column.includes("区域")) return ["华东", "华南", "华北", "西南", "华中"][rowIndex];
    if (column.includes("门店")) return ["上海徐汇店", "深圳南山店", "北京朝阳店", "成都高新店", "杭州滨江店"][rowIndex];
    if (column.includes("客户")) return `客户 ${rowIndex + 1}`;
    if (column.includes("渠道")) return ["线下", "小程序", "外卖", "直播", "社群"][rowIndex];
    if (colIndex > 2) return String((rowIndex + 2) * (colIndex + 8) * 137);
    return `${column}${rowIndex + 1}`;
  }));
}

function renderDatasetPreview(dataset) {
  const columns = dataset.schema.slice(0, 6);
  const rows = getDatasetPreviewRows(dataset);
  return `
    <div class="dataset-preview-table-wrap">
      <table class="dataset-preview-table">
        <thead><tr>${columns.map((column) => `<th>${column}</th>`).join("")}</tr></thead>
        <tbody>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
    </div>
  `;
}

function getDefaultFieldConfig(type = datasetWizardType) {
  if (type === "source") {
    return [
      { name: "客户", physicalName: "customer_name", role: "dimension", dateFormat: "yyyy-MM-dd", meaning: "CRM 中的客户主体" },
      { name: "行业", physicalName: "industry_name", role: "dimension", dateFormat: "yyyy-MM-dd", meaning: "客户所属行业" },
      { name: "最近跟进", physicalName: "last_follow_date", role: "date", dateFormat: "yyyy-MM-dd", meaning: "最近一次客户跟进日期" },
      { name: "商机阶段", physicalName: "opportunity_stage", role: "dimension", dateFormat: "yyyy-MM-dd", meaning: "当前商机所处阶段" },
      { name: "拜访次数", physicalName: "visit_count", role: "measure", dateFormat: "yyyy-MM-dd", meaning: "统计周期内的客户拜访次数，按拜访记录求和统计" },
      { name: "合同金额", physicalName: "contract_amount", role: "measure", dateFormat: "yyyy-MM-dd", meaning: "已成交或预计成交的合同金额，按合同金额求和统计" },
      { name: "风险标签", physicalName: "risk_tag", role: "dimension", dateFormat: "yyyy-MM-dd", meaning: "客户当前的风险类型标记" }
    ];
  }
  return [
    { name: "日期", physicalName: "日期", role: "date", dateFormat: "yyyy-MM", meaning: "业务发生月份" },
    { name: "区域", physicalName: "区域", role: "dimension", dateFormat: "yyyy-MM", meaning: "门店或业务所属区域" },
    { name: "门店", physicalName: "门店", role: "dimension", dateFormat: "yyyy-MM", meaning: "产生交易的门店" },
    { name: "品类", physicalName: "品类", role: "dimension", dateFormat: "yyyy-MM", meaning: "商品或业务品类" },
    { name: "销售额", physicalName: "销售额", role: "measure", dateFormat: "yyyy-MM", meaning: "交易销售金额，按明细销售额求和统计" },
    { name: "毛利额", physicalName: "毛利额", role: "measure", dateFormat: "yyyy-MM", meaning: "销售收入减去成本后的毛利金额，按毛利额求和统计" },
    { name: "订单数", physicalName: "订单数", role: "measure", dateFormat: "yyyy-MM", meaning: "成交订单数量，按订单记录求和统计" }
  ];
}

function ensureDatasetFieldConfig() {
  if (datasetFieldConfig.length === 0) datasetFieldConfig = getDefaultFieldConfig();
}

function getDatasetProfileFromFieldConfig(type = datasetWizardType) {
  const fields = datasetFieldConfig.length ? datasetFieldConfig : getDefaultFieldConfig(type);
  const dimensions = fields.filter((field) => field.role === "dimension").map((field) => field.name);
  const measures = fields.filter((field) => field.role === "measure").map((field) => field.name);
  return {
    schema: fields.filter((field) => field.role !== "ignore").map((field) => field.name),
    dimensions,
    measures,
    dateFields: fields.filter((field) => field.role === "date").map((field) => ({
      name: field.name,
      physicalName: field.physicalName,
      dateFormat: field.dateFormat
    })),
    fields
  };
}

function getRoleLabel(role) {
  const labels = { date: "日期", dimension: "维度", measure: "指标", ignore: "不使用" };
  return labels[role] || role;
}

function getDateFormats() {
  return [
    "yyyy",
    "yyyyMM",
    "yyyy/MM",
    "yyyy-MM",
    "MM/yyyy",
    "MM-yyyy",
    "M/yyyy",
    "M-yyyy",
    "yyyyMMdd",
    "yyyy/MM/dd",
    "yyyy-MM-dd",
    "ddMMyyyy",
    "dd/MM/yyyy",
    "dd-MM-yyyy",
    "yyyy/M/d",
    "yyyy-M-d",
    "yyyyMMdd hh:mi:ss",
    "yyyy/MM/dd hh:mi:ss",
    "yyyy-MM-dd hh:mi:ss",
    "hh",
    "hh:mi",
    "hh:mi:ss"
  ];
}

function getFieldMeaningPlaceholder(role) {
  if (role === "date") return "说明这个日期代表什么，例如订单发生日期";
  if (role === "measure") return "说明指标含义和计算方式，例如销售额按订单金额求和";
  if (role === "dimension") return "说明这个维度代表什么，例如门店所属区域";
  return "说明这个字段是否需要参与分析";
}

function renderFieldSemanticConfig() {
  ensureDatasetFieldConfig();
  return `
    <p class="field-semantic-note">AI 已自动带出字段，请业务确认字段名、字段类型和字段解释；指标的计算方式也写在字段解释里。</p>
    <div class="field-semantic-table">
      <div class="field-semantic-head">
        <span>字段名</span>
        <span>物理字段名</span>
        <span>字段类型</span>
        <span>字段解释</span>
      </div>
      ${datasetFieldConfig.map((field, index) => `
        <div class="field-semantic-row" data-field-row="${index}">
          <span><input class="field-display-name-input" data-field-index="${index}" value="${field.name || ""}" placeholder="字段名"></span>
          <span class="field-physical-name">${field.physicalName || field.name}</span>
          <span>
            <div class="field-type-cell">
              <select class="field-role-select" data-field-index="${index}">
                ${["date", "dimension", "measure", "ignore"].map((role) => `<option value="${role}" ${field.role === role ? "selected" : ""}>${getRoleLabel(role)}</option>`).join("")}
              </select>
              ${field.role === "date" ? `
                <select class="field-format-select" data-field-index="${index}">
                  ${getDateFormats().map((format) => `<option value="${format}" ${field.dateFormat === format ? "selected" : ""}>${format}</option>`).join("")}
                </select>
              ` : ""}
            </div>
          </span>
          <span><input class="field-meaning-input" data-field-index="${index}" value="${field.meaning || ""}" placeholder="${getFieldMeaningPlaceholder(field.role)}"></span>
        </div>
      `).join("")}
    </div>
  `;
}

function getDatasetLearningSummary(type = datasetWizardType) {
  if (type === "source") {
    return {
      kind: sourceDatasetMode === "multi" ? "CRM 客户经营宽表" : "CRM 客户主表",
      granularity: sourceDatasetMode === "multi" ? "一行代表一个客户在一次拜访或商机阶段的经营状态" : "一行代表一个客户档案",
      timeRange: "2024-01 至 2024-07",
      dimensions: ["区域", "行业", "客户等级", "销售阶段"],
      measures: ["拜访次数", "合同金额", "商机金额"],
      risks: ["客户名称存在少量空值", "部分商机阶段未填写更新时间"]
    };
  }
  return {
    kind: "产销月度指标表",
    granularity: "一行代表一个区域 / 事业部 / 月份的产销指标",
    timeRange: "2024-01 至 2024-07",
    dimensions: ["月份", "区域", "国家", "事业部", "品类"],
    measures: ["SI", "SO", "DRP2达成率", "AOP达成率", "库存周转天数"],
    risks: ["部分国家缺少 7 月库存数据", "DRP2达成率字段存在百分号格式"]
  };
}

function renderDatasetUnderstandingSummary() {
  const summary = getDatasetLearningSummary();
  const cells = [
    ["数据类型", summary.kind],
    ["数据粒度", summary.granularity],
    ["时间范围", summary.timeRange],
    ["主要维度", summary.dimensions.join(" / ")],
    ["主要指标", summary.measures.join(" / ")]
  ];
  return `
    <section class="drawer-section">
      <span>AI 扫描数据</span>
      <p class="field-semantic-note">AI 已完成初步理解，请先确认这张表大体是否被看懂。</p>
      <div class="learning-summary-grid">
        ${cells.map(([label, value]) => `<div><b>${label}</b><span>${value}</span></div>`).join("")}
      </div>
      <div class="learning-risk-box">
        <b>风险提示</b>
        <ul>${summary.risks.map((risk) => `<li>${risk}</li>`).join("")}</ul>
      </div>
    </section>
  `;
}

function getAnalysisCapabilitySuggestions() {
  return [
    "可做趋势分析：月份 + SI / SO / DRP2达成率",
    "可做区域对比：区域 / 国家 + DRP2达成率 / AOP达成率",
    "可做库存风险识别：库存周转天数 / 超期库存占比",
    "可做目标达成分析：目标值 / 实际值 / 达成率"
  ];
}

function renderAnalysisCapabilitySuggestions(items = getAnalysisCapabilitySuggestions()) {
  return `
    <section class="drawer-section">
      <span>分析能力建议</span>
      <p class="field-semantic-note">AI 根据字段关系生成可分析方向，业务用户可以删除不合适的建议。</p>
      <div class="capability-list">
        ${items.map((item) => `
          <div class="capability-item">
            <span>${item}</span>
            <button type="button" class="plain-btn capability-remove">删除</button>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function getTrialQuestions() {
  return [
    "7月 DRP2 达成率最低的区域是谁？",
    "哪些事业部库存周转天数超过目标？",
    "本月 SI 和 SO 的差距主要集中在哪些国家？",
    "AOP 年度预估达成风险最高的是谁？"
  ];
}

function renderTrialValidation() {
  return `
    <section class="drawer-section">
      <span>试问验证</span>
      <p class="field-semantic-note">选择一个问题试跑，确认字段识别和业务语义是否符合预期。</p>
      <div class="trial-question-list">
        ${getTrialQuestions().map((question, index) => `
          <div class="trial-question-item">
            <button type="button" class="plain-btn trial-question" data-trial-index="${index}">${question}</button>
            <p class="trial-result hidden">试跑结果：${index === 0 ? "7月 DRP2 达成率最低的是巴基斯坦，31%。" : "已返回轻量结果，字段映射和计算口径可用。"}</p>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function showDatasetDetail(dataset) {
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.classList.add("dataset-detail-drawer");
  sideDrawer.innerHTML = `
    <div class="dataset-detail-page">
      <div class="drawer-head dataset-detail-titlebar">
        <div>
          <span class="card-kicker">DATASET DETAIL</span>
          <h3>${dataset.name}</h3>
        </div>
        <button class="drawer-close" id="closeDrawer">×</button>
      </div>
      <div class="dataset-detail-content">
      <section class="dataset-detail-section">
        <span>数据集概要</span>
        <p>${dataset.description}</p>
      </section>
      <section class="dataset-detail-section">
        <span>数据理解摘要</span>
        ${renderDatasetLearningSummaryForDetail(dataset)}
      </section>
      <section class="dataset-detail-section">
        <span>AI 学习配置</span>
        <div class="dataset-learning-table">
          <div class="field-semantic-head">
            <span>字段名</span>
            <span>物理字段名</span>
            <span>字段类型</span>
            <span>字段解释</span>
          </div>
          ${getDatasetDetailFieldRows(dataset)}
        </div>
      </section>
      <section class="dataset-detail-section">
        <span>分析能力建议</span>
        <div class="detail-learning-list">
          ${(dataset.analysisCapabilities || getAnalysisCapabilitySuggestions()).map((item) => `<p>${item}</p>`).join("")}
        </div>
      </section>
      <section class="dataset-detail-section">
        <span>试问验证</span>
        <div class="detail-learning-list">
          ${(dataset.validationQuestions || getTrialQuestions()).map((item, index) => `<p>${item}<em>${index === 0 ? "已验证" : "可验证"}</em></p>`).join("")}
        </div>
      </section>
      <section class="dataset-detail-section">
        <span>数据预览</span>
        <div class="dataset-preview-action">
          <button class="plain-btn" id="previewDatasetRowsInDrawer">预览前5条</button>
        </div>
        <div class="dataset-preview-panel hidden" id="datasetPreviewPanel">${renderDatasetPreview(dataset)}</div>
      </section>
    </div>
    </div>
    <div class="drawer-actions">
      <button class="dark-btn" id="useDatasetFromDrawer">选择数据</button>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("previewDatasetRowsInDrawer").addEventListener("click", () => {
    document.getElementById("datasetPreviewPanel").classList.toggle("hidden");
  });
  document.getElementById("useDatasetFromDrawer").addEventListener("click", () => {
    closeDrawer();
    selectDataset(dataset);
  });
}

function renderDatasetLearningSummaryForDetail(dataset) {
  const summary = dataset.learningSummary || getDatasetLearningSummary(dataset.sourceType === "已接入数据源" ? "source" : "upload");
  return `
    <div class="learning-summary-grid detail-summary">
      <div><b>数据类型</b><span>${summary.kind}</span></div>
      <div><b>数据粒度</b><span>${summary.granularity}</span></div>
      <div><b>时间范围</b><span>${summary.timeRange}</span></div>
      <div><b>主要维度</b><span>${summary.dimensions.join(" / ")}</span></div>
      <div><b>主要指标</b><span>${summary.measures.join(" / ")}</span></div>
    </div>
  `;
}

function getDatasetDetailFieldRows(dataset) {
  const fields = dataset.fieldConfig && dataset.fieldConfig.length
    ? dataset.fieldConfig
    : buildDatasetDetailFieldConfig(dataset);
  return fields.map((field) => `
    <div class="field-semantic-row detail-row">
      <span>${field.name}</span>
      <span class="field-physical-name">${field.physicalName || field.name}</span>
      <span>${getRoleLabel(field.role)}</span>
      <span>${field.meaning || "-"}</span>
    </div>
  `).join("");
}

function buildDatasetDetailFieldConfig(dataset) {
  const dateFields = dataset.dateFields || [];
  const dimensions = dataset.dimensions || [];
  const measures = dataset.measures || [];
  const schema = dataset.schema || [];
  return schema.map((field) => {
    if (dateFields.some((item) => item.name === field) || field.includes("日期")) {
      return { name: field, physicalName: field, role: "date", meaning: `${field} 对应业务发生时间` };
    }
    if (measures.includes(field)) {
      return { name: field, physicalName: field, role: "measure", meaning: `${field} 用于衡量业务表现` };
    }
    if (dimensions.includes(field)) {
      return { name: field, physicalName: field, role: "dimension", meaning: `${field} 用于切分和对比数据` };
    }
    return { name: field, physicalName: field, role: "dimension", meaning: `${field} 用于业务分析` };
  });
}

function buildUploadedDataset(fileName) {
  const safeName = fileName || "uploaded_sales.xlsx";
  const profile = getDatasetProfileFromFieldConfig("upload");
  return {
    id: `dataset-file-${Date.now()}`,
    category: "mine",
    name: safeName,
    domain: "个人上传",
    sourceType: "Excel 上传",
    sourceName: safeName,
    granularity: "AI 自动识别",
    description: "从本地文件创建的数据集，已模拟完成字段含义、维度字段和指标字段学习。",
    fields: 18,
    metrics: 5,
    completeness: "78%",
    updated: "刚刚",
    scenarios: ["临时分析", "经营复盘"],
    schema: profile.schema,
    dimensions: profile.dimensions,
    measures: profile.measures,
    dateFields: profile.dateFields,
    fieldConfig: profile.fields,
    learningSummary: getDatasetLearningSummary("upload"),
    analysisCapabilities: getAnalysisCapabilitySuggestions(),
    validationQuestions: getTrialQuestions(),
    questions: ["主要变化来自哪个维度？", "哪些业务对象表现异常？", "下一步应该重点看哪里？"]
  };
}

function createDatasetFromFile(fileName) {
  const dataset = buildUploadedDataset(fileName);
  datasets.unshift(dataset);
  activeDatasetId = dataset.id;
  renderDatasets();
  setDatasetSegment("mine");
  closeDrawer();
  showDatasetDetail(dataset);
}

function renderDatasetWizardStep() {
  const totalSteps = datasetWizardType === "upload" ? 7 : datasetWizardType === "source" ? 8 : 4;
  const title = datasetWizardType === "upload" ? "上传 Excel / CSV" : datasetWizardType === "source" ? "从已接入数据源创建" : "新建数据集";
  const stepLabels = datasetWizardType === "upload"
    ? ["创建方式", "选择文件", "数据理解", "字段确认", "分析能力", "试问验证", "保存数据集"]
    : datasetWizardType === "source"
      ? ["创建方式", "选择数据源", "选择表", "数据理解", "字段确认", "分析能力", "试问验证", "保存数据集"]
      : ["创建方式", "选择来源", "AI 学习", "保存数据集"];
  const content = datasetWizardStep === 1
    ? renderDatasetCreationTypeContent()
    : datasetWizardType === "upload"
      ? renderUploadWizardContent()
      : renderSourceWizardContent();
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.classList.add("dataset-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">CREATE DATASET</span>
        <h3>${title}</h3>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <div class="dataset-wizard">
      <div class="wizard-steps">
        ${stepLabels.map((label, index) => `<span class="${datasetWizardStep === index + 1 ? "active" : datasetWizardStep > index + 1 ? "done" : ""}">${index + 1}. ${label}</span>`).join("")}
      </div>
      ${content}
      <div class="drawer-actions">
        <button class="plain-btn" id="cancelDatasetWizard">${datasetWizardStep === 1 ? "取消" : "上一步"}</button>
        ${datasetWizardStep === 1 ? "" : `<button class="dark-btn" id="nextDatasetWizard">${datasetWizardStep === totalSteps ? "保存数据集" : "下一步"}</button>`}
      </div>
    </div>
  `;
  openDrawer();
  bindDatasetWizardEvents(totalSteps);
}

function renderDatasetCreationTypeContent() {
  return `
    <section class="drawer-section">
      <span>选择创建方式</span>
      <p class="drawer-form-status">数据集创建完成后，会继续进入字段语义学习和保存步骤。</p>
      <div class="drawer-options compact-source-options">
        <button class="drawer-option" id="createDatasetByUpload">
          <strong>上传 Excel / CSV</strong>
          <span>适合临时分析个人表格，上传后确认字段类型和字段解释。</span>
        </button>
        <button class="drawer-option" id="createDatasetBySource">
          <strong>从已接入数据源创建</strong>
          <span>基于管理员已接入的 CRM、ERP、数仓等数据源选择表并生成数据集。</span>
        </button>
      </div>
    </section>
  `;
}

function renderUploadWizardContent() {
  if (datasetWizardStep === 2) {
    return `
      <section class="drawer-section">
        <span>选择文件</span>
        <div class="drawer-upload-card">
          <span class="upload-icon">↑</span>
          <strong>${datasetWizardFileName || "选择 Excel / CSV 文件"}</strong>
          <p>上传后会模拟识别字段、维度和指标，保存为可用于报告生成的数据集。</p>
          <button class="plain-btn" id="chooseDatasetWizardFile">选择文件</button>
        </div>
      </section>
    `;
  }
  if (datasetWizardStep === 3) {
    return renderDatasetUnderstandingSummary();
  }
  if (datasetWizardStep === 4) {
    return `
      <section class="drawer-section">
        <span>字段语义确认</span>
        ${renderFieldSemanticConfig()}
      </section>
    `;
  }
  if (datasetWizardStep === 5) return renderAnalysisCapabilitySuggestions();
  if (datasetWizardStep === 6) return renderTrialValidation();
  return `
    <section class="drawer-section">
      <span>保存数据集</span>
      <p>${datasetWizardFileName || "uploaded_sales.xlsx"} 将保存为可用数据集，后续可直接选择用于生成报告。</p>
    </section>
  `;
}

function renderSourceWizardContent() {
  if (datasetWizardStep === 2) {
    return `
      <section class="drawer-section">
        <span>选择企业已接入数据源</span>
        <p class="drawer-form-status">由管理员提前接入，用户可基于这些数据源创建数据集。</p>
        <div class="drawer-options compact-source-options">
          ${getConnectedSources().map((source, index) => `
            <button class="drawer-option source-option ${index === 0 ? "active" : ""}" data-source-id="${source.id}">
              <strong>${source.name}</strong>
              <span>${source.desc}</span>
            </button>
          `).join("")}
        </div>
      </section>
    `;
  }
  if (datasetWizardStep === 3) {
    return `
      <section class="drawer-section">
        <span>选择表</span>
        <div class="dataset-mode-switch">
          <button class="${sourceDatasetMode === "single" ? "active" : ""}" data-table-mode="single">单表</button>
          <button class="${sourceDatasetMode === "multi" ? "active" : ""}" data-table-mode="multi">多表 / SQL</button>
        </div>
        <div class="source-table-list">
          <label><input type="checkbox" value="crm_customer_profile" ${selectedSourceTables.includes("crm_customer_profile") ? "checked" : ""}> crm_customer_profile 客户主表</label>
          <label><input type="checkbox" value="crm_visit_record" ${selectedSourceTables.includes("crm_visit_record") ? "checked" : ""}> crm_visit_record 拜访记录</label>
          <label><input type="checkbox" value="crm_opportunity" ${selectedSourceTables.includes("crm_opportunity") ? "checked" : ""}> crm_opportunity 商机明细</label>
        </div>
        <div class="sql-editor-wrap ${sourceDatasetMode === "multi" ? "" : "hidden"}" id="sqlEditorWrap">
          <b>组合多表生成分析宽表</b>
          <textarea id="datasetSql">select c.customer_id, c.industry, v.visit_count, o.stage, o.contract_amount
from crm_customer_profile c
left join crm_visit_record v on c.customer_id = v.customer_id
left join crm_opportunity o on c.customer_id = o.customer_id</textarea>
        </div>
      </section>
    `;
  }
  if (datasetWizardStep === 4) {
    return renderDatasetUnderstandingSummary();
  }
  if (datasetWizardStep === 5) {
    return `
      <section class="drawer-section">
        <span>字段语义确认</span>
        ${renderFieldSemanticConfig()}
      </section>
    `;
  }
  if (datasetWizardStep === 6) return renderAnalysisCapabilitySuggestions();
  if (datasetWizardStep === 7) return renderTrialValidation();
  return `
    <section class="drawer-section">
      <span>保存数据集</span>
      <p>${sourceDatasetMode === "multi" ? "CRM 客户经营宽表数据集" : "CRM 客户主表数据集"} 将保存到可用数据集。</p>
    </section>
  `;
}

function bindDatasetWizardEvents(totalSteps) {
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("cancelDatasetWizard").addEventListener("click", () => {
    if (datasetWizardStep === 1) {
      closeDrawer();
      return;
    }
    if (datasetWizardStep === 2) {
      datasetWizardType = "";
      datasetFieldConfig = [];
      datasetWizardFileName = "";
      sourceDatasetMode = "single";
      selectedSourceTables = ["crm_customer_profile"];
      datasetWizardStep = 1;
    } else {
      datasetWizardStep -= 1;
    }
    renderDatasetWizardStep();
  });
  document.getElementById("nextDatasetWizard")?.addEventListener("click", () => {
    if (datasetWizardStep === totalSteps) {
      if (datasetWizardType === "upload") createDatasetFromFile(datasetWizardFileName);
      else saveSourceDataset();
      return;
    }
    datasetWizardStep += 1;
    renderDatasetWizardStep();
  });
  document.getElementById("createDatasetByUpload")?.addEventListener("click", () => {
    datasetWizardType = "upload";
    datasetWizardStep = 2;
    datasetWizardFileName = datasetWizardFileName || "uploaded_sales.xlsx";
    datasetFieldConfig = [];
    renderDatasetWizardStep();
  });
  document.getElementById("createDatasetBySource")?.addEventListener("click", () => {
    datasetWizardType = "source";
    datasetWizardStep = 2;
    sourceDatasetMode = "single";
    selectedSourceTables = ["crm_customer_profile"];
    datasetFieldConfig = [];
    renderDatasetWizardStep();
  });
  document.getElementById("chooseDatasetWizardFile")?.addEventListener("click", () => datasetPageFileInput.click());
  bindFieldSemanticEvents();
  sideDrawer.querySelectorAll(".capability-remove").forEach((button) => {
    button.addEventListener("click", () => button.closest(".capability-item").remove());
  });
  sideDrawer.querySelectorAll(".trial-question").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".trial-question-item").querySelector(".trial-result").classList.remove("hidden");
    });
  });
  sideDrawer.querySelectorAll("[data-table-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      sourceDatasetMode = button.dataset.tableMode;
      if (sourceDatasetMode === "single") selectedSourceTables = [selectedSourceTables[0] || "crm_customer_profile"];
      if (sourceDatasetMode === "multi" && selectedSourceTables.length < 2) selectedSourceTables = ["crm_customer_profile", "crm_visit_record"];
      datasetFieldConfig = [];
      renderDatasetWizardStep();
    });
  });
  sideDrawer.querySelectorAll(".source-table-list input").forEach((input) => {
    input.addEventListener("change", () => {
      selectedSourceTables = [...sideDrawer.querySelectorAll(".source-table-list input:checked")].map((item) => item.value);
      if (selectedSourceTables.length === 0) selectedSourceTables = ["crm_customer_profile"];
      sourceDatasetMode = selectedSourceTables.length > 1 ? "multi" : "single";
      datasetFieldConfig = [];
      renderDatasetWizardStep();
    });
  });
}

function bindFieldSemanticEvents() {
  sideDrawer.querySelectorAll(".field-role-select").forEach((select) => {
    select.addEventListener("change", () => {
      const index = Number(select.dataset.fieldIndex);
      datasetFieldConfig[index].role = select.value;
      if (select.value === "date" && !datasetFieldConfig[index].dateFormat) datasetFieldConfig[index].dateFormat = "yyyy-MM-dd";
      renderDatasetWizardStep();
    });
  });
  sideDrawer.querySelectorAll(".field-display-name-input").forEach((input) => {
    input.addEventListener("input", () => {
      datasetFieldConfig[Number(input.dataset.fieldIndex)].name = input.value;
    });
  });
  sideDrawer.querySelectorAll(".field-format-select").forEach((select) => {
    select.addEventListener("change", () => {
      datasetFieldConfig[Number(select.dataset.fieldIndex)].dateFormat = select.value;
    });
  });
  sideDrawer.querySelectorAll(".field-meaning-input").forEach((input) => {
    input.addEventListener("input", () => {
      datasetFieldConfig[Number(input.dataset.fieldIndex)].meaning = input.value;
    });
  });
}

function showUploadDatasetWizard(file) {
  datasetWizardType = "upload";
  datasetWizardStep = 2;
  datasetWizardFileName = file?.name || "uploaded_sales.xlsx";
  datasetFieldConfig = [];
  renderDatasetWizardStep();
}

function getConnectedSources() {
  return [
    { id: "crm", name: "CRM 客户系统", desc: "管理员已接入，包含客户、商机、拜访和合同数据。" },
    { id: "erp", name: "ERP 经营系统", desc: "管理员已接入，包含订单、库存、成本和财务数据。" },
    { id: "warehouse", name: "企业数仓", desc: "管理员已接入，支持选择数仓表或视图。" },
    { id: "so", name: "产销 SO 明细", desc: "管理员已接入，适合产销协同和销售订单分析。" }
  ];
}

function showCreateDatasetWizard() {
  datasetWizardType = "source";
  datasetWizardStep = 2;
  sourceDatasetMode = "single";
  selectedSourceTables = ["crm_customer_profile"];
  datasetFieldConfig = [];
  renderDatasetWizardStep();
}

function saveSourceDataset() {
  const profile = getDatasetProfileFromFieldConfig("source");
  const dataset = {
    id: `dataset-source-${Date.now()}`,
    category: "mine",
    name: sourceDatasetMode === "multi" ? "CRM 客户经营宽表数据集" : "CRM 客户主表数据集",
    domain: "销售管理",
    sourceType: "已接入数据源",
    sourceName: sourceDatasetMode === "multi" ? "CRM 客户系统 / SQL 宽表" : "CRM 客户系统 / 单表",
    granularity: sourceDatasetMode === "multi" ? "客户 / 拜访 / 商机" : "客户",
    description: sourceDatasetMode === "multi" ? "从 CRM 多张表通过 SQL 组合生成，已模拟完成 AI 字段学习和字段解释补齐。" : "从 CRM 客户主表创建，已模拟完成 AI 字段学习。",
    fields: sourceDatasetMode === "multi" ? 32 : 16,
    metrics: sourceDatasetMode === "multi" ? 9 : 4,
    completeness: sourceDatasetMode === "multi" ? "86%" : "80%",
    updated: "刚刚",
    scenarios: ["客户经营分析", "销售诊断", "拜访效率复盘"],
    schema: profile.schema,
    dimensions: profile.dimensions,
    measures: profile.measures,
    dateFields: profile.dateFields,
    fieldConfig: profile.fields,
    learningSummary: getDatasetLearningSummary("source"),
    analysisCapabilities: getAnalysisCapabilitySuggestions(),
    validationQuestions: getTrialQuestions(),
    questions: ["哪些客户应该优先跟进？", "拜访投入是否带来商机推进？", "销售漏斗主要卡在哪一层？"]
  };
  datasets.unshift(dataset);
  activeDatasetId = dataset.id;
  renderDatasets();
  setDatasetSegment("mine");
  closeDrawer();
  showDatasetDetail(dataset);
}

function getOfficialKnowledgeBases() {
  return knowledgeBases.filter((item) => item.category === "official");
}

function getMyKnowledgeBases() {
  return knowledgeBases.filter((item) => item.category === "mine");
}

function setKnowledgeSegment(segment) {
  const showOfficial = segment === "official";
  officialKnowledgePanel.classList.toggle("active", showOfficial);
  myKnowledgePanel.classList.toggle("active", !showOfficial);
  createKnowledgeBtn.classList.toggle("hidden", showOfficial);
  knowledgeSegmentButtons.forEach((button) => {
    const isActive = button.dataset.knowledgeSegment === segment;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  renderKnowledgeBases();
}

function setKnowledgeType(type) {
  currentKnowledgeType = type;
  knowledgeTypeButtons.forEach((button) => {
    const isActive = button.dataset.knowledgeType === type;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
  renderKnowledgeBases();
}

function getKnowledgeAvatar(item) {
  if (item.domain.includes("零售")) return "RT";
  if (item.domain.includes("经营")) return "OP";
  if (item.domain.includes("报告")) return "RP";
  return item.category === "official" ? "KB" : "MY";
}

function renderKnowledgeBases() {
  knowledgeGrid.innerHTML = renderKnowledgeCards(getFilteredKnowledgeBases("official"));
  myKnowledgeGrid.innerHTML = renderKnowledgeCards(getFilteredKnowledgeBases("mine"), "my-knowledge-card");
  bindKnowledgeCards(knowledgeGrid);
  bindKnowledgeCards(myKnowledgeGrid);
}

function renderKnowledgeCards(items, extraClass = "") {
  if (items.length === 0) {
    return `
      <div class="empty-dataset-state">
        <strong>还没有自己的知识库</strong>
        <p>可以上传 Word、TXT、PDF、图片，或添加飞书 URL、网站 URL，保存为可复用知识库。</p>
      </div>
    `;
  }
  return items.map((item) => `
    <article class="solution-card knowledge-card ${extraClass}" data-knowledge-id="${item.id}">
      <div class="solution-strip"></div>
      <div class="solution-top">
        <span class="solution-domain">${item.domain}</span>
        <span class="dataset-origin">${getKnowledgeTypeLabel(item.knowledgeType)}</span>
      </div>
      <div class="solution-title-row">
        <div class="solution-avatar">${getKnowledgeAvatar(item)}</div>
        <div>
          <h3>${item.name}</h3>
        </div>
      </div>
      <p>${item.description}</p>
      <div class="solution-actions">
        <button class="dark-btn knowledge-use">选择知识库</button>
        <button class="plain-btn knowledge-detail">查看详情</button>
      </div>
    </article>
  `).join("");
}

function bindKnowledgeCards(container) {
  container.querySelectorAll(".knowledge-card").forEach((card) => {
    const knowledge = knowledgeBases.find((item) => item.id === card.dataset.knowledgeId);
    card.addEventListener("click", (event) => {
      if (event.target.closest("button")) return;
      showKnowledgeDetail(knowledge);
    });
    card.querySelector(".knowledge-detail").addEventListener("click", () => showKnowledgeDetail(knowledge));
    card.querySelector(".knowledge-use").addEventListener("click", () => selectKnowledgeBase(knowledge));
  });
}

function selectKnowledgeBase(knowledge) {
  selectedKnowledge = knowledge.name;
  knowledgeEnabled = true;
  document.getElementById("knowledgeBtn").classList.add("active");
  composerStatus.textContent = "已选择知识库";
  renderContextChips();
  setRoute("chat");
  analysisText.focus();
}

function getKnowledgeSourceType(source) {
  const lower = source.toLowerCase();
  if (lower.includes("http") || source.includes("链接") || source.includes("URL")) return "URL";
  if (lower.endsWith(".pdf")) return "PDF";
  if (lower.endsWith(".doc") || lower.endsWith(".docx")) return "Word";
  if (lower.endsWith(".txt")) return "TXT";
  if (lower.endsWith(".png") || lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "图片";
  return "文件";
}

function renderKnowledgeSourceList(knowledge, editable = false) {
  return knowledge.sources.map((source, index) => `
    <div data-source-index="${index}">
      <b>${source}</b>
      <span>${getKnowledgeSourceType(source)}</span>
      <div class="knowledge-source-actions">
        <button class="plain-btn knowledge-preview-source" data-source-index="${index}">预览</button>
        ${editable ? `<button class="plain-btn danger knowledge-delete-source" data-source-index="${index}">删除</button>` : ""}
      </div>
    </div>
  `).join("");
}

function renderKnowledgePreview(source) {
  return `
    <div class="knowledge-file-preview">
      <div class="knowledge-file-head">
        <b>${source}</b>
        <span>${getKnowledgeSourceType(source)} 预览</span>
      </div>
      <div class="knowledge-file-body">
        <p>这里展示文件或链接中的前几段内容，便于确认知识库材料是否正确。</p>
        <p>示例片段：报告生成时应优先引用材料中的定义、规则和表述要求；当出现经营异常时，需要说明影响范围、可能原因和下一步动作。</p>
      </div>
    </div>
  `;
}

function showKnowledgeDetail(knowledge) {
  const editable = knowledge.category === "mine";
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.add("knowledge-detail-drawer");
  sideDrawer.innerHTML = `
    <div class="knowledge-detail-page">
      <div class="drawer-head knowledge-detail-titlebar">
        <div>
          <span class="card-kicker">KNOWLEDGE BASE</span>
          <h3>${knowledge.name}</h3>
        </div>
        <div class="detail-head-actions">
          <button class="dark-btn" id="useKnowledgeFromDrawer">选择知识库</button>
          <button class="drawer-close" id="closeDrawer">×</button>
        </div>
      </div>
      <div class="knowledge-detail-content">
        <section class="knowledge-detail-section">
          <span>知识库概要</span>
          <p>${knowledge.description}</p>
        </section>
        <section class="knowledge-detail-section">
          <span>内容来源</span>
          <div class="knowledge-source-list">
            ${renderKnowledgeSourceList(knowledge, editable)}
          </div>
          <div class="knowledge-preview-slot hidden" id="knowledgePreviewSlot"></div>
          ${editable ? `
            <div class="knowledge-add-source">
              <input id="knowledgeDetailFileInput" class="hidden-file-input" type="file" accept=".doc,.docx,.txt,.pdf,.png,.jpg,.jpeg">
              <button class="plain-btn" id="addKnowledgeFile">新增文件</button>
              <input id="addKnowledgeUrlInput" type="text" placeholder="粘贴飞书 URL 或网站 URL">
              <button class="plain-btn" id="addKnowledgeUrl">新增链接</button>
            </div>
          ` : ""}
        </section>
      </div>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("useKnowledgeFromDrawer").addEventListener("click", () => {
    closeDrawer();
    selectKnowledgeBase(knowledge);
  });
  bindKnowledgeDetailEvents(knowledge);
}

function bindKnowledgeDetailEvents(knowledge) {
  sideDrawer.querySelectorAll(".knowledge-preview-source").forEach((button) => {
    button.addEventListener("click", () => {
      const source = knowledge.sources[Number(button.dataset.sourceIndex)];
      const slot = document.getElementById("knowledgePreviewSlot");
      slot.innerHTML = renderKnowledgePreview(source);
      slot.classList.remove("hidden");
    });
  });
  sideDrawer.querySelectorAll(".knowledge-delete-source").forEach((button) => {
    button.addEventListener("click", () => {
      knowledge.sources.splice(Number(button.dataset.sourceIndex), 1);
      showKnowledgeDetail(knowledge);
      renderKnowledgeBases();
    });
  });
  document.getElementById("addKnowledgeFile")?.addEventListener("click", () => {
    document.getElementById("knowledgeDetailFileInput").click();
  });
  document.getElementById("knowledgeDetailFileInput")?.addEventListener("change", (event) => {
    const fileName = event.target.files[0]?.name || "新增材料.pdf";
    knowledge.sources.push(fileName);
    showKnowledgeDetail(knowledge);
    renderKnowledgeBases();
  });
  document.getElementById("addKnowledgeUrl")?.addEventListener("click", () => {
    const input = document.getElementById("addKnowledgeUrlInput");
    knowledge.sources.push(input.value.trim() || "新增知识链接");
    showKnowledgeDetail(knowledge);
    renderKnowledgeBases();
  });
}

function showCreateKnowledgeDrawer() {
  knowledgeDraftSources = ["经营规则.pdf", "门店活动说明.docx", "飞书知识链接"];
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.add("knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">NEW KNOWLEDGE BASE</span>
        <h3>新建知识库</h3>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <div class="knowledge-form">
      <section class="knowledge-form-section">
        <div class="knowledge-section-title">
          <span>基础信息</span>
        </div>
        <div class="inline-type-segment" role="tablist" aria-label="知识库分类">
          <button class="active" type="button" data-new-knowledge-type="business">业务知识</button>
          <button type="button" data-new-knowledge-type="template">分析模版</button>
        </div>
        <label class="knowledge-field">
          <span>知识库名称</span>
          <input id="newKnowledgeName" type="text" placeholder="例如：华东区域活动规则">
        </label>
        <label class="knowledge-field">
          <span>知识库说明</span>
          <textarea id="newKnowledgeDescription" placeholder="说明这批知识用于解决什么问题，例如活动规则、指标口径、报告规范或客户资料。"></textarea>
        </label>
      </section>
      <section class="knowledge-form-section">
        <div class="knowledge-section-title">
          <span>添加内容</span>
        </div>
        <div class="knowledge-source-picker">
          <button class="knowledge-source-option active" data-source-kind="file">
            <i>↑</i>
            <strong>上传文件</strong>
            <span>Word / TXT / PDF / 图片</span>
          </button>
          <button class="knowledge-source-option" data-source-kind="feishu">
            <i>↗</i>
            <strong>添加飞书 URL</strong>
            <span>粘贴飞书文档链接</span>
          </button>
          <button class="knowledge-source-option" data-source-kind="web">
            <i>⌕</i>
            <strong>添加网站 URL</strong>
            <span>粘贴网页链接</span>
          </button>
        </div>
        <input class="knowledge-url-input" id="newKnowledgeUrl" type="text" placeholder="粘贴飞书 URL 或网站 URL">
        <input id="newKnowledgeFileInput" class="hidden-file-input" type="file" accept=".doc,.docx,.txt,.pdf,.png,.jpg,.jpeg">
        <div class="knowledge-add-actions">
          <button class="plain-btn" id="addDraftKnowledgeFile">添加文件</button>
          <button class="plain-btn" id="addDraftKnowledgeUrl">添加链接</button>
        </div>
        <div class="knowledge-source-list compact" id="knowledgeDraftSourceList">
          ${renderKnowledgeDraftSourceList()}
        </div>
        <p class="drawer-form-status" id="newKnowledgeSourceStatus">已模拟添加 3 个内容来源。</p>
      </section>
      <div class="drawer-actions">
        <button class="plain-btn" id="cancelCreateKnowledge">取消</button>
        <button class="dark-btn" id="saveNewKnowledge">保存知识库</button>
      </div>
    </div>
  `;
  openDrawer();
  let newKnowledgeType = "business";
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("cancelCreateKnowledge").addEventListener("click", closeDrawer);
  sideDrawer.querySelectorAll("[data-new-knowledge-type]").forEach((button) => {
    button.addEventListener("click", () => {
      newKnowledgeType = button.dataset.newKnowledgeType;
      sideDrawer.querySelectorAll("[data-new-knowledge-type]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
    });
  });
  sideDrawer.querySelectorAll("[data-source-kind]").forEach((button) => {
    button.addEventListener("click", () => {
      sideDrawer.querySelectorAll("[data-source-kind]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      document.getElementById("newKnowledgeSourceStatus").textContent = `已选择添加方式：${button.querySelector("strong").textContent}。`;
    });
  });
  document.getElementById("addDraftKnowledgeFile").addEventListener("click", () => {
    document.getElementById("newKnowledgeFileInput").click();
  });
  document.getElementById("newKnowledgeFileInput").addEventListener("change", (event) => {
    const fileName = event.target.files[0]?.name || "新增材料.pdf";
    addKnowledgeDraftSource(fileName);
  });
  document.getElementById("addDraftKnowledgeUrl").addEventListener("click", () => {
    const input = document.getElementById("newKnowledgeUrl");
    addKnowledgeDraftSource(input.value.trim() || "新增知识链接");
    input.value = "";
  });
  refreshKnowledgeDraftSources();
  document.getElementById("saveNewKnowledge").addEventListener("click", () => saveNewKnowledge(newKnowledgeType));
}

function renderKnowledgeDraftSourceList() {
  return knowledgeDraftSources.map((source, index) => `
    <div data-draft-source="${index}">
      <b>${source}</b>
      <span>${getKnowledgeSourceType(source)}</span>
      <div class="knowledge-source-actions">
        <button class="plain-btn danger knowledge-remove-draft-source" data-draft-source="${index}">删除</button>
      </div>
    </div>
  `).join("");
}

function refreshKnowledgeDraftSources() {
  document.getElementById("knowledgeDraftSourceList").innerHTML = renderKnowledgeDraftSourceList();
  document.getElementById("newKnowledgeSourceStatus").textContent = `已添加 ${knowledgeDraftSources.length} 个内容来源。`;
  sideDrawer.querySelectorAll(".knowledge-remove-draft-source").forEach((button) => {
    button.addEventListener("click", () => {
      knowledgeDraftSources.splice(Number(button.dataset.draftSource), 1);
      refreshKnowledgeDraftSources();
    });
  });
}

function addKnowledgeDraftSource(source) {
  knowledgeDraftSources.push(source);
  refreshKnowledgeDraftSources();
}

function saveNewKnowledge(newKnowledgeType = "business") {
  const name = document.getElementById("newKnowledgeName").value.trim() || "我的经营知识库";
  const description = document.getElementById("newKnowledgeDescription").value.trim() || "从上传文件和链接中学习业务规则、指标口径和报告规范。";
  knowledgeBases.unshift({
    id: `kb-${Date.now()}`,
    category: "mine",
    knowledgeType: newKnowledgeType,
    name,
    domain: "自定义",
    description,
    sourceType: "用户维护",
    sources: knowledgeDraftSources.length ? [...knowledgeDraftSources] : ["经营规则.pdf"],
    learnedTypes: ["指标口径", "业务规则", "报告规范"],
    snippets: [
      "业务规则中要求报告先说明异常影响，再给出原因假设。",
      "指标口径可在生成报告时用于解释数据含义。",
      "报告规范要求所有建议动作可追踪、可执行。"
    ],
    updated: "刚刚"
  });
  currentKnowledgeType = newKnowledgeType;
  renderKnowledgeBases();
  setKnowledgeSegment("mine");
  setKnowledgeType(newKnowledgeType);
  closeDrawer();
  showKnowledgeDetail(knowledgeBases[0]);
}

function renderAnalyses() {
  document.getElementById("analysisList").innerHTML = analyses.slice(0, 6).map((item) => `
    <button class="conversation-item ${item.id === activeAnalysisId ? "active" : ""}" data-analysis-id="${item.id}">
      <b>${item.title}</b>
      <small>${item.time}</small>
    </button>
  `).join("");
  document.querySelectorAll("[data-analysis-id]").forEach((button) => {
    button.addEventListener("click", () => openAnalysis(button.dataset.analysisId));
  });
}

function renderProjects() {
  projectList.innerHTML = agentProjects.map((project) => `
    <div class="project-group ${project.id === activeProjectId ? "active" : ""}">
      <button class="project-root" data-project-id="${project.id}">
        <span>▱</span>
        <b>${project.name}</b>
      </button>
      <div class="project-conversation-list">
        ${project.conversations.slice(0, 4).map((conversation) => `
          <button class="conversation-item project-chat ${conversation.id === activeProjectConversationId ? "active" : ""}" data-project-id="${project.id}" data-project-conversation-id="${conversation.id}">
            <b>${conversation.title}</b>
            <small>${conversation.time}</small>
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");
  projectList.querySelectorAll("[data-project-id].project-root").forEach((button) => {
    button.addEventListener("click", () => {
      const project = agentProjects.find((item) => item.id === button.dataset.projectId);
      if (!project) return;
      const conversation = project.conversations[0] || createProjectConversation(project, solutions.find((item) => item.id === project.agentId));
      renderProjects();
      openProjectConversation(project.id, conversation.id);
    });
  });
  projectList.querySelectorAll("[data-project-conversation-id]").forEach((button) => {
    button.addEventListener("click", () => openProjectConversation(button.dataset.projectId, button.dataset.projectConversationId));
  });
}

function openProjectConversation(projectId, conversationId) {
  const project = agentProjects.find((item) => item.id === projectId);
  const conversation = project?.conversations.find((item) => item.id === conversationId);
  if (!project || !conversation) return;
  activeProjectId = project.id;
  activeProjectConversationId = conversation.id;
  activeAnalysisId = "";
  applyProjectAgentContext(project, conversation);
  renderProjects();
  renderAnalyses();
  routeButtons.forEach((button) => button.classList.remove("active"));
  pages.forEach((page) => page.classList.toggle("active", page.id === "page-chat"));
  document.querySelector('[data-route="new-analysis"]')?.classList.add("active");
  resetTaskMode();
  setChatMode("chatting");
  analysisText.focus();
}

function openAnalysis(id) {
  const item = analyses.find((analysis) => analysis.id === id);
  if (!item) return;
  activeAnalysisId = id;
  activeProjectId = "";
  activeProjectConversationId = "";
  selectedSolution = "";
  selectedAgentId = "";
  selectedTemplate = "";
  routes.chat.title = item.title;
  routes.chat.desc = `${item.title} 的对话工作台`;
  title.textContent = item.title;
  desc.textContent = "普通对话 / 自由分析";
  analysisText.value = "";
  resetTaskMode();
  renderAnalyses();
  renderProjects();
  renderContextChips();
  routeButtons.forEach((button) => button.classList.remove("active"));
  setRoute("chat");
  setChatMode("chatting");
  document.querySelector('[data-route="new-analysis"]')?.classList.add("active");
  analysisText.focus();
}

function createAnalysis() {
  const next = {
    id: `analysis-${Date.now()}`,
    title: `新建分析 ${analyses.length + 1}`,
    source: "空白对话",
    time: "刚刚",
    status: "等待需求"
  };
  analyses.unshift(next);
  activeAnalysisId = next.id;
  activeProjectId = "";
  activeProjectConversationId = "";
  selectedSolution = "";
  selectedAgentId = "";
  selectedData = "";
  selectedTemplate = "";
  selectedKnowledge = "";
  analysisText.value = "";
  resetTaskMode();
  routes.chat.title = "新建分析";
  routes.chat.desc = "";
  renderAnalyses();
  renderProjects();
  renderContextChips();
  setRoute("chat");
  setChatMode("empty");
  document.querySelector('[data-route="new-analysis"]')?.classList.add("active");
  analysisText.focus();
}

function selectAppEntry(app) {
  currentAppEntry = app;
  appEntryCards.forEach((card) => card.classList.toggle("active", card.dataset.appEntry === app));
  modeTabs?.querySelectorAll("[data-task-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.taskMode === app);
  });
  syncTaskModeUI();
  if (app === "report") {
    uploadSub.textContent = "";
    analysisText.placeholder = "";
    analysisText.focus();
    return;
  }
  if (app === "excel") {
    uploadSub.textContent = "";
    analysisText.placeholder = "";
    analysisText.focus();
    return;
  }
  if (app === "knowledge") {
    uploadSub.textContent = "";
    analysisText.placeholder = "";
    analysisText.focus();
    return;
  }
  if (app === "data") {
    uploadSub.textContent = "";
    analysisText.placeholder = "";
    analysisText.focus();
  }
}

function showCreateSolutionDrawer(template = null, options = {}) {
  const copyMode = Boolean(options.copy);
  const editing = Boolean(template) && !copyMode;
  const sourceTaskType = template?.taskType || template?.solutionType || "report";
  let draftType = sourceTaskType;
  const sourceData = template?.dataSource || template?.dataset || "";
  let draftDataMode = draftType === "report" && sourceData && !String(sourceData).match(/\.(xls|xlsx|csv)$/i) ? "dataset" : "upload";
  const draft = {
    name: copyMode && template?.name ? `${template.name} 副本` : (template?.name || ""),
    domain: template?.domain || "",
    prompt: template?.analysisIdea || template?.scenario || template?.description || "",
    dataset: sourceData && !String(sourceData).match(/\.(xls|xlsx|csv)$/i) ? sourceData : (getDatasetNames()[0] || ""),
    uploadedFile: sourceData && String(sourceData).match(/\.(xls|xlsx|csv)$/i) ? sourceData : "",
    knowledge: template?.knowledgeBases ? [...template.knowledgeBases] : (template?.knowledgeBase ? [template.knowledgeBase] : []),
    skillIds: [...(template?.skillIds || [])],
  };
  if (copyMode && !draft.knowledge.length) {
    const knowledge = getAgentKnowledge(template);
    if (knowledge) draft.knowledge = [knowledge];
  }
  if (copyMode && !draft.skillIds.length && template?.skills?.length) {
    draft.skillIds = skills.filter((skill) => template.skills.includes(skill.title)).map((skill) => skill.id);
  }

  sideDrawer.classList.remove("solution-detail-drawer", "dataset-wizard-drawer", "dataset-detail-drawer", "my-template-detail-drawer", "knowledge-detail-drawer", "knowledge-wizard-drawer");
  sideDrawer.classList.add("agent-config-drawer");

  const renderAgentForm = () => {
    const reportMode = draftType === "report";
    const excelMode = draftType === "excel";
    const knowledgeMode = draftType === "knowledge";
    const selectedSkillIds = draft.skillIds;
    const defaultDataset = draftDataMode === "dataset" ? draft.dataset : "";
    const defaultKnowledge = [...(draft.knowledge || [])];
    const defaultFileName = draft.uploadedFile;

    sideDrawer.innerHTML = `
      <div class="drawer-content create-solution-drawer agent-editor codex-settings">
        <div class="drawer-head agent-editor-head">
          <div>
            <span class="card-kicker">${editing ? "EDIT AGENT" : copyMode ? "COPY AGENT" : "CREATE AGENT"}</span>
            <h2>${editing ? "编辑 Agent" : copyMode ? "复制为我的 Agent" : "新建 Agent"}</h2>
          </div>
          <button class="drawer-close" id="closeDrawer">×</button>
        </div>

        <div class="agent-editor-tabs" role="tablist" aria-label="Agent类型">
          <button class="agent-editor-tab ${reportMode ? "active" : ""}" type="button" data-create-solution-type="report" aria-selected="${reportMode}">AI数据报告</button>
          <button class="agent-editor-tab ${excelMode ? "active" : ""}" type="button" data-create-solution-type="excel" aria-selected="${excelMode}">AI表格分析</button>
          <button class="agent-editor-tab ${knowledgeMode ? "active" : ""}" type="button" data-create-solution-type="knowledge" aria-selected="${knowledgeMode}">AI知识问答</button>
        </div>

        <div class="agent-editor-body agent-config-form">
          <section class="agent-settings-section">
            <h3>基础信息</h3>
            <label class="agent-settings-row">
              <span class="agent-settings-label">Agent 名称</span>
              <span class="agent-settings-control">
                <input id="agentNameInput" value="${escapeHtml(draft.name)}" placeholder="例如：华东经营分析 Agent">
              </span>
            </label>
            <label class="agent-settings-row">
              <span class="agent-settings-label">所属领域</span>
              <span class="agent-settings-control">
                <input id="agentDomainInput" value="${escapeHtml(draft.domain)}" placeholder="例如：产销协同域">
              </span>
            </label>
            <label class="agent-settings-row agent-settings-row-top">
              <span class="agent-settings-label">Agent 概要</span>
              <span class="agent-settings-control">
                <textarea id="agentPromptInput" class="large" placeholder="请输入 Agent 的提示词或分析思路">${escapeHtml(draft.prompt)}</textarea>
              </span>
            </label>
          </section>

          <section class="agent-settings-section">
            <h3>默认数据</h3>
            <div class="agent-settings-row">
              <span class="agent-settings-label">数据来源</span>
              <span class="agent-settings-control">
                <span class="agent-editor-segment" role="tablist" aria-label="默认数据来源">
                  <button class="${draftDataMode === "dataset" ? "active" : ""}" type="button" data-agent-data-mode="dataset">使用已有数据集</button>
                  <button class="${draftDataMode === "upload" ? "active" : ""}" type="button" data-agent-data-mode="upload">上传 Excel</button>
                </span>
              </span>
            </div>
            ${draftDataMode === "dataset" ? `
              <label class="agent-settings-row">
                <span class="agent-settings-label">数据集</span>
                <span class="agent-settings-control">
                  <select id="agentDatasetSelect">
                    <option value="">不选择</option>
                    ${getDatasetNames().map((name) => `<option value="${escapeHtml(name)}" ${name === defaultDataset ? "selected" : ""}>${escapeHtml(name)}</option>`).join("")}
                  </select>
                </span>
              </label>
            ` : `
              <div class="agent-settings-row">
                <span class="agent-settings-label">文件</span>
                <span class="agent-settings-control agent-editor-upload">
                  <button class="plain-btn" id="agentUploadBtn" type="button">上传 Excel / CSV</button>
                  <span class="agent-editor-upload-name" id="agentUploadName">${escapeHtml(defaultFileName || "未上传文件")}</span>
                  <input id="agentFileInput" class="hidden-file-input" type="file" accept=".xls,.xlsx,.csv">
                </span>
              </div>
            `}
          </section>

          <section class="agent-settings-section">
            <h3>知识库</h3>
            <label class="agent-settings-row">
              <span class="agent-settings-label">知识库</span>
              <span class="agent-settings-control">
                ${renderMultiSelect("agentKnowledgeSelect", getKnowledgeOptionsArrayAll(true), defaultKnowledge, "不选择")}
              </span>
            </label>
          </section>

          <section class="agent-settings-section">
            <h3>技能</h3>
            <label class="agent-settings-row">
              <span class="agent-settings-label">技能</span>
              <span class="agent-settings-control">
                ${renderMultiSelect("agentSkillSelect", getSkillOptionsArray(), selectedSkillIds, "不选择")}
              </span>
            </label>
          </section>

          <div class="agent-config-footer agent-editor-footer">
            <span></span>
            <div class="drawer-actions">
                <button class="plain-btn" id="cancelAgentConfig">${editing ? "取消编辑" : "取消"}</button>
                <button class="dark-btn" id="saveAgentConfig">${editing ? "保存修改" : "保存我的 Agent"}</button>
            </div>
          </div>
          <p class="drawer-form-status" id="agentConfigStatus"></p>
        </div>
      </div>
    `;

    document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
    document.getElementById("cancelAgentConfig").addEventListener("click", closeDrawer);
    const syncDraft = () => {
      draft.name = document.getElementById("agentNameInput")?.value || draft.name;
      draft.domain = document.getElementById("agentDomainInput")?.value || draft.domain;
      draft.prompt = document.getElementById("agentPromptInput")?.value || draft.prompt;
      draft.dataset = document.getElementById("agentDatasetSelect")?.value || draft.dataset;
      draft.knowledge = getMultiSelectValues("agentKnowledgeSelect");
      draft.skillIds = getMultiSelectValues("agentSkillSelect");
    };
    sideDrawer.querySelectorAll("[data-create-solution-type]").forEach((button) => {
      button.addEventListener("click", () => {
        syncDraft();
        draftType = button.dataset.createSolutionType;
        renderAgentForm();
      });
    });
    sideDrawer.querySelectorAll("[data-agent-data-mode]").forEach((button) => {
      button.addEventListener("click", () => {
        syncDraft();
        draftDataMode = button.dataset.agentDataMode;
        renderAgentForm();
      });
    });
    bindMultiSelect("agentKnowledgeSelect");
    bindMultiSelect("agentSkillSelect");
    document.getElementById("agentUploadBtn")?.addEventListener("click", () => document.getElementById("agentFileInput").click());
    document.getElementById("agentFileInput")?.addEventListener("change", (event) => {
      const fileName = event.target.files[0]?.name || "未上传文件";
      draft.uploadedFile = fileName === "未上传文件" ? "" : fileName;
      document.getElementById("agentUploadName").textContent = fileName;
    });
    document.getElementById("saveAgentConfig").addEventListener("click", () => saveAgentConfig(editing ? template : null, draftType, draftDataMode));
  };

  renderAgentForm();
  openDrawer();
}

function getKnowledgeOptionsArrayByType(knowledgeType, allowEmpty) {
  // knowledgeType: "template" | "business" | "all"
  const options = [];
  if (allowEmpty) options.push({ value: "", label: "不选择", empty: true });
  getFilteredKnowledgeBases(knowledgeType).forEach((kb) => {
    options.push({ value: kb.name, label: `${kb.name}${kb.category === "official" ? "（官方）" : ""}` });
  });
  return options;
}

function getKnowledgeOptionsArrayAll(allowEmpty) {
  const options = [];
  if (allowEmpty) options.push({ value: "", label: "不选择", empty: true });
  knowledgeBases.forEach((kb) => {
    options.push({ value: kb.name, label: `${kb.name}${kb.category === "official" ? "（官方）" : ""}` });
  });
  return options;
}

function getSkillOptionsArray() {
  return skills.map((s) => ({ value: s.id, label: s.title }));
}

function renderMultiSelect(id, options, selectedValues, placeholder) {
  const selected = Array.isArray(selectedValues) ? selectedValues.filter(Boolean) : [];
  const selectedLabels = new Map(options.filter((o) => o && o.value).map((o) => [String(o.value), o.label]));
  const chips = selected
    .map((v) => `<span class="ms-chip" data-ms-chip="${escapeHtml(String(v))}">${escapeHtml(selectedLabels.get(String(v)) || String(v))}<button class="ms-chip-x" type="button" data-ms-remove="${escapeHtml(String(v))}">×</button></span>`)
    .join("");
  return `
    <div class="ms" data-ms id="${id}" data-ms-values="${escapeHtml(JSON.stringify(selected))}" data-ms-placeholder="${escapeHtml(placeholder || "")}">
      <button class="ms-trigger" type="button" data-ms-trigger>
        <div class="ms-chips">${chips || `<span class="ms-placeholder">${escapeHtml(placeholder || "")}</span>`}</div>
        <span class="ms-caret" aria-hidden="true"></span>
      </button>
      <div class="ms-pop" data-ms-pop hidden>
        <div class="ms-list">
          ${options
            .filter((o) => o && !o.empty)
            .map((o) => {
              const checked = selected.includes(o.value);
              return `<button type="button" class="ms-item ${checked ? "active" : ""}" data-ms-item="${escapeHtml(String(o.value))}">${escapeHtml(o.label)}</button>`;
            })
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function getMultiSelectValues(id) {
  const el = document.getElementById(id);
  if (!el) return [];
  try {
    const raw = el.getAttribute("data-ms-values") || "[]";
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    return [];
  }
}

function setMultiSelectValues(id, values) {
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("data-ms-values", JSON.stringify(Array.isArray(values) ? values.filter(Boolean) : []));
}

function bindMultiSelect(id) {
  const root = document.getElementById(id);
  if (!root) return;
  const trigger = root.querySelector("[data-ms-trigger]");
  const pop = root.querySelector("[data-ms-pop]");
  const list = root.querySelector(".ms-list");

  const rerenderChips = () => {
    const values = getMultiSelectValues(id);
    const optionButtons = Array.from(root.querySelectorAll("[data-ms-item]"));
    const labelByValue = new Map(
      optionButtons.map((btn) => [btn.dataset.msItem, btn.textContent.trim()])
    );
    const chipsWrap = root.querySelector(".ms-chips");
    const chips = values
      .map((v) => `<span class="ms-chip" data-ms-chip="${escapeHtml(String(v))}">${escapeHtml(labelByValue.get(String(v)) || String(v))}<button class="ms-chip-x" type="button" data-ms-remove="${escapeHtml(String(v))}">×</button></span>`)
      .join("");
    chipsWrap.innerHTML = chips || `<span class="ms-placeholder">${escapeHtml(root.dataset.msPlaceholder || "")}</span>`;
    optionButtons.forEach((btn) => btn.classList.toggle("active", values.includes(btn.dataset.msItem)));
  };

  const close = () => {
    pop.hidden = true;
    root.classList.remove("open");
  };

  trigger.addEventListener("click", (e) => {
    e.preventDefault();
    const opening = pop.hidden;
    document.querySelectorAll(".ms.open").forEach((other) => {
      if (other !== root) {
        other.classList.remove("open");
        const otherPop = other.querySelector("[data-ms-pop]");
        if (otherPop) otherPop.hidden = true;
      }
    });
    pop.hidden = !opening;
    root.classList.toggle("open", opening);
  });

  root.addEventListener("click", (e) => {
    const remove = e.target.closest("[data-ms-remove]");
    if (remove) {
      e.preventDefault();
      const v = remove.dataset.msRemove;
      const next = getMultiSelectValues(id).filter((x) => String(x) !== String(v));
      setMultiSelectValues(id, next);
      rerenderChips();
      return;
    }
    const item = e.target.closest("[data-ms-item]");
    if (!item) return;
    e.preventDefault();
    const v = item.dataset.msItem;
    const current = getMultiSelectValues(id);
    const next = current.includes(v) ? current.filter((x) => x !== v) : [...current, v];
    setMultiSelectValues(id, next);
    rerenderChips();
  });

  document.addEventListener(
    "click",
    (e) => {
      if (!root.classList.contains("open")) return;
      if (root.contains(e.target)) return;
      close();
    },
    { capture: true }
  );

  rerenderChips();
}

function saveAgentConfig(template, draftType, draftDataMode) {
  const status = document.getElementById("agentConfigStatus");
  const name = document.getElementById("agentNameInput").value.trim();
  const domain = document.getElementById("agentDomainInput").value.trim();
  const prompt = document.getElementById("agentPromptInput").value.trim();
  const knowledge = getMultiSelectValues("agentKnowledgeSelect");
  const uploadedFile = document.getElementById("agentFileInput")?.files?.[0]?.name || document.getElementById("agentUploadName")?.textContent?.trim() || "";
  const selectedDataset = document.getElementById("agentDatasetSelect")?.value || "";
  const skillIds = getMultiSelectValues("agentSkillSelect");

  if (!name || !domain || !prompt) {
    status.textContent = "请先补充 Agent 名称、所属领域和 Agent 概要。";
    status.classList.add("error");
    return;
  }

  let dataSource = "";
  dataSource = draftDataMode === "dataset" ? selectedDataset : (uploadedFile === "未上传文件" ? "" : uploadedFile);

  const target = template || {
    id: `template-${Date.now()}`,
    shared: false
  };

  target.taskType = draftType;
  target.name = name;
  target.domain = domain;
  target.description = prompt;
  target.analysisIdea = prompt;
  target.dataSource = dataSource;
  target.knowledgeBases = knowledge;
  target.knowledgeBase = knowledge[0] || "";
  target.skillIds = skillIds;
  target.items = [getComposerTaskLabel(draftType), knowledge.length ? "知识库" : null, dataSource ? "数据" : null].filter(Boolean);

  if (!template) templates.unshift(target);

  setAgentOwner("mine");
  renderMyTemplates();
  composerStatus.textContent = template ? `已更新 Agent：${name}` : `已保存我的 Agent：${name}`;
  closeDrawer();
}

function getContextItems() {
  const items = [];
  if (selectedTemplate) items.push({ type: "template", label: "临时思路", value: selectedTemplate, icon: "✦" });
  if (selectedData) items.push({ type: "data", label: "数据", value: selectedData, icon: "◎" });
  if (selectedKnowledge) items.push({ type: "knowledge", label: "知识库", value: selectedKnowledge, icon: "▣" });
  return items;
}

function renderContextChips() {
  const items = getContextItems();
  contextChips.classList.toggle("empty", items.length === 0);
  contextChips.innerHTML = items.map((item) => `
    <span class="context-chip" data-context-type="${item.type}">
      <i>${item.icon}</i>
      <b>${item.label}</b>
      <em>${escapeHtml(item.value)}</em>
      <button class="context-remove" data-context-type="${item.type}">×</button>
    </span>
  `).join("");
  contextChips.querySelectorAll(".context-remove").forEach((button) => {
    button.addEventListener("click", () => clearContextChip(button.dataset.contextType));
  });
}

function clearContextChip(type) {
  if (type === "agent") {
    selectedSolution = "";
    selectedAgentId = "";
  }
  if (type === "data") selectedData = "";
  if (type === "template") selectedTemplate = "";
  if (type === "knowledge") {
    selectedKnowledge = "";
    knowledgeEnabled = false;
    document.getElementById("knowledgeBtn").classList.remove("active");
  }
  renderContextChips();
}

function appendUserMessage(text) {
  const message = document.createElement("div");
  message.className = "message user";
  const contextItems = getContextItems();
  const contextMarkup = contextItems.length ? `
    <div class="message-context">
      ${contextItems.map((item) => `<span><i>${item.icon}</i><b>${item.label}</b>${escapeHtml(item.value)}</span>`).join("")}
    </div>
  ` : "";
  const toolMarkup = webSearchEnabled ? `<div class="meta-line">联网搜索已开启</div>` : "";
  message.innerHTML = `
    <div class="avatar">你</div>
    <div class="bubble">
      <strong>${getMessageRequestTitle()}</strong>
      ${contextMarkup}
      <p>${escapeHtml(text)}</p>
      ${toolMarkup}
    </div>
  `;
  chatStream.appendChild(message);
  scrollChatToBottom();
}

function getExecutionPlan() {
  const agentName = selectedSolution || "自由分析";
  const dataName = selectedData || "当前数据";
  const activeAgent = selectedAgentId ? solutions.find((item) => item.id === selectedAgentId) : null;
  const taskType = currentAppEntry || activeAgent?.solutionType || "";
  return {
    thought: [
      `识别当前任务属于 ${getComposerTaskLabel(taskType)}。`,
      `确认上下文：${agentName}，数据：${dataName}。`,
      "将先产出执行计划，确认后再生成结果。"
    ],
    steps: [
      {
        title: "确认数据与字段",
        detail: `读取 ${dataName} 的字段、维度、指标和时间口径，确认本次分析可用的数据范围。`
      },
      {
        title: "拆解分析目标",
        detail: "把用户需求拆成指标达成、维度拆解、异常识别和结论组织等子任务。"
      },
      {
        title: "执行指标分析",
        detail: "按时间、区域、事业部等维度汇总指标，计算达成率、差异和趋势变化。"
      },
      {
        title: "生成报告草稿",
        detail: "把分析结论、关键证据和图表摘要组织成可预览的报告草稿。"
      },
      {
        title: "检查并输出结果",
        detail: "检查口径、结论和报告结构，输出最终报告卡片。"
      }
    ]
  };
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function appendPlanCard() {
  const message = document.createElement("div");
  message.className = "message assistant";
  message.innerHTML = `
    <div class="avatar">AI</div>
    <div class="bubble">
      <div class="plan-card">
        <details class="thinking-box">
          <summary>思考过程</summary>
          <ul class="thinking-list"></ul>
        </details>
        <div class="plan-head">
          <div>
            <b>执行计划</b>
          </div>
        </div>
        <ol class="plan-list" contenteditable="false"></ol>
        <div class="plan-actions">
          <button class="plain-btn plan-edit" disabled>修改</button>
          <button class="dark-btn plan-confirm" disabled>确定</button>
        </div>
      </div>
    </div>
  `;
  chatStream.appendChild(message);
  scrollChatToBottom();
  return message;
}

async function streamPlanCard(message, plan, autoRun = false) {
  const thinkingList = message.querySelector(".thinking-list");
  const planList = message.querySelector(".plan-list");
  const editButton = message.querySelector(".plan-edit");
  const confirmButton = message.querySelector(".plan-confirm");

  for (const item of plan.thought) {
    await sleep(180);
    const li = document.createElement("li");
    li.textContent = item;
    thinkingList.appendChild(li);
    scrollChatToBottom();
  }

  for (const step of plan.steps) {
    await sleep(220);
    const li = document.createElement("li");
    li.innerHTML = `<strong>${escapeHtml(step.title)}</strong><p>${escapeHtml(step.detail)}</p>`;
    planList.appendChild(li);
    scrollChatToBottom();
  }

  editButton.disabled = false;
  confirmButton.disabled = false;

  editButton.addEventListener("click", () => {
    const editing = planList.contentEditable !== "true";
    planList.contentEditable = editing ? "true" : "false";
    editButton.textContent = editing ? "完成" : "修改";
    if (editing) planList.focus();
  });

  confirmButton.addEventListener("click", () => {
    planList.contentEditable = "false";
    editButton.textContent = "修改";
    confirmButton.disabled = true;
    confirmButton.textContent = "已确认";
    executeGeneration(readPlanSteps(planList, plan.steps));
  }, { once: true });

  if (autoRun) {
    await sleep(260);
    editButton.disabled = true;
    confirmButton.disabled = true;
    confirmButton.textContent = "已确认";
    running = false;
    executeGeneration(readPlanSteps(planList, plan.steps));
  }
}

function readPlanSteps(planList, fallbackSteps) {
  const parsed = [...planList.querySelectorAll("li")].map((item) => ({
    title: item.querySelector("strong")?.textContent?.trim() || item.textContent.trim(),
    detail: item.querySelector("p")?.textContent?.trim() || ""
  })).filter((item) => item.title);
  return parsed.length ? parsed : fallbackSteps;
}

function appendAssistantStageCard(planSteps = getExecutionPlan().steps) {
  const message = document.createElement("div");
  message.className = "message assistant";
  const activeAgent = selectedAgentId ? solutions.find((item) => item.id === selectedAgentId) : null;
  const skillLine = activeAgent
    ? `调用：${getAgentSkillNames(activeAgent).slice(0, 3).join(" / ")}`
    : "平台基础能力";
  message.innerHTML = `
    <div class="avatar">AI</div>
    <div class="bubble">
      <div class="stage-card">
        <div class="stage-title"><b>执行过程</b><span id="stageText">准备执行</span></div>
        <ul class="stage-list" id="stageList">
          ${planSteps.map((step, index) => `
            <li class="stage-step" data-stage-index="${index}">
              <button type="button"><span>${escapeHtml(step.title)}</span><i>›</i></button>
              <p>${escapeHtml(step.detail)}${index === 2 ? ` ${escapeHtml(skillLine)}。` : ""}</p>
            </li>
          `).join("")}
        </ul>
      </div>
    </div>
  `;
  chatStream.appendChild(message);
  message.querySelectorAll(".stage-step button").forEach((button) => {
    button.addEventListener("click", () => button.closest(".stage-step").classList.toggle("open"));
  });
  scrollChatToBottom();
  return message;
}

function setStage(stageMessage, index) {
  const items = [...stageMessage.querySelectorAll(".stage-step")];
  const stageText = stageMessage.querySelector("#stageText");
  items.forEach((item, itemIndex) => {
    item.classList.toggle("done", itemIndex < index);
    item.classList.toggle("active", itemIndex === index);
  });
  stageText.textContent = items[index]?.querySelector("span")?.textContent || "分析完成";
  scrollChatToBottom();
}

function appendReportResultCard() {
  const reportName = getProductionReportName();
  const message = document.createElement("div");
  message.className = "message assistant";
  message.innerHTML = `
    <div class="avatar">AI</div>
    <div class="bubble">
      <div class="result-card">
        <div class="doc-icon">▤</div>
        <div>
          <strong>${reportName}已生成</strong>
          <p>包含核心结论、指标拆解、归因分析、建议动作和图表摘要。</p>
        </div>
        <div class="result-actions">
          <button class="plain-btn result-open">预览报告</button>
          <button class="plain-btn">导出文档</button>
          <button class="plain-btn result-save">保存报告</button>
        </div>
      </div>
    </div>
  `;
  chatStream.appendChild(message);
  message.querySelector(".result-open").addEventListener("click", () => {
    openInlineReport(reportName);
  });
  message.querySelector(".result-save").addEventListener("click", () => {
    saveGeneratedReport(reportName);
    message.querySelector(".result-save").textContent = "已保存";
  });
  composerStatus.textContent = "报告草稿已生成";
  scrollChatToBottom();
}

function getProductionReportName() {
  return "产销协同关键业务指标分析报告";
}

function appendAssistantFlowCard(markup) {
  const message = document.createElement("div");
  message.className = "message assistant";
  message.innerHTML = `
    <div class="avatar">AI</div>
    <div class="bubble">
      ${markup}
    </div>
  `;
  chatStream.appendChild(message);
  message.querySelectorAll("[data-toggle-detail]").forEach((button) => {
    button.addEventListener("click", () => button.closest(".flow-toggle-item").classList.toggle("open"));
  });
  scrollChatToBottom();
  return message;
}

async function runTaskFlow(taskType, autoRun = false) {
  if (taskType === "report") {
    const plan = getExecutionPlan();
    const planMessage = appendPlanCard();
    await streamPlanCard(planMessage, plan, autoRun);
    if (!autoRun) running = false;
    return;
  }
  if (taskType === "data") {
    await runDataAnswerFlow();
    return;
  }
  if (taskType === "excel") {
    await runExcelLearningFlow();
    return;
  }
  if (taskType === "knowledge") {
    await runKnowledgeAnswerFlow();
    return;
  }
  await runFreeConversationFlow();
}

async function runDataAnswerFlow() {
  await sleep(260);
  appendAssistantFlowCard(`
    <div class="flow-card answer-flow-card chatbi-answer-card">
      <div class="chatbi-answer-head">
        <div>
          <strong>ChatBI</strong>
          <span>产销协同域 · 指标趋势</span>
        </div>
        <button class="plain-btn">展开 ▾</button>
      </div>
      <div class="chatbi-filter-list">
        <div><b>* 统计年月</b><span>近12个月</span><i>日历</i></div>
        <div><b>* 二级区域</b><span>东非地区</span><i>›</i></div>
      </div>
      <div class="chatbi-chart-card">
        <div class="chatbi-chart-toolbar">
          <span class="active">趋势图</span>
          <span>表格</span>
          <em>单位：万</em>
        </div>
        <div class="chatbi-chart-title">指标说明</div>
        <svg class="chatbi-line-chart" viewBox="0 0 720 230" role="img" aria-label="SI 和 SO 趋势图">
          <defs>
            <linearGradient id="chartFade" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stop-color="#f8fafc"/>
              <stop offset="100%" stop-color="#ffffff"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="720" height="230" rx="12" fill="url(#chartFade)"/>
          <g stroke="#e6e9ef" stroke-width="1">
            <line x1="42" y1="40" x2="690" y2="40"/><line x1="42" y1="82" x2="690" y2="82"/>
            <line x1="42" y1="124" x2="690" y2="124"/><line x1="42" y1="166" x2="690" y2="166"/>
          </g>
          <polyline fill="none" stroke="#2f6feb" stroke-width="3" points="58,106 118,86 178,84 238,88 298,116 358,118 418,92 478,132 538,172 598,140 658,142 690,202"/>
          <polyline fill="none" stroke="#079455" stroke-width="3" points="58,122 118,116 178,108 238,112 298,120 358,116 418,118 478,122 538,156 598,158 658,160 690,168"/>
          <g fill="#fff" stroke-width="3">
            <circle cx="58" cy="106" r="5" stroke="#2f6feb"/><circle cx="118" cy="86" r="5" stroke="#2f6feb"/><circle cx="178" cy="84" r="5" stroke="#2f6feb"/><circle cx="418" cy="92" r="5" stroke="#2f6feb"/><circle cx="690" cy="202" r="5" stroke="#2f6feb"/>
            <circle cx="58" cy="122" r="5" stroke="#079455"/><circle cx="178" cy="108" r="5" stroke="#079455"/><circle cx="538" cy="156" r="5" stroke="#079455"/><circle cx="690" cy="168" r="5" stroke="#079455"/>
          </g>
          <g font-size="12" fill="#4b5563">
            <circle cx="310" cy="24" r="4" fill="#2f6feb"/><text x="320" y="28">销量</text>
            <circle cx="372" cy="24" r="4" fill="#079455"/><text x="382" y="28">激活量</text>
          </g>
        </svg>
        <div class="chatbi-result-summary">
          <b>结论</b>
          <span>东非地区近12个月 SI 与 SO 整体下行，最近一个月 SI 下探更明显，建议继续查看数据解读和波动归因。</span>
        </div>
      </div>
      <div class="chatbi-action-row">
        <button class="plain-btn">数据解读</button>
        <button class="plain-btn">波动归因</button>
        <button class="plain-btn">追问</button>
      </div>
    </div>
  `);
  composerStatus.textContent = "问数结果已返回";
  running = false;
}

async function runExcelLearningFlow() {
  await sleep(260);
  appendAssistantFlowCard(`
    <div class="flow-card excel-flow-card">
      <div class="flow-section">
        <span>文件识别结果</span>
        <strong>已识别产销月度 Excel</strong>
        <div class="basis-grid">
          <p><b>表格</b>${selectedData || "产销月度分析.xlsx"}</p>
          <p><b>规模</b>1,284 行 / 18 列</p>
          <p><b>时间范围</b>2024-01 至 2024-07</p>
        </div>
      </div>
      <div class="flow-section">
        <span>字段配置确认</span>
        <p>AI 已识别日期、维度和指标字段。你可以进入字段配置确认字段名、物理字段名、字段类型和字段解释。</p>
        <button class="plain-btn" id="openExcelLearningWizard">进入字段配置</button>
      </div>
      <div class="task-choice-grid">
        <button class="plain-btn" id="excelContinueData">继续问数</button>
        <button class="plain-btn" id="excelGenerateReport">生成报告</button>
        <button class="plain-btn" id="excelSaveDataset">保存为数据集</button>
      </div>
    </div>
  `);
  document.getElementById("openExcelLearningWizard")?.addEventListener("click", () => showUploadDatasetWizard({ name: "产销月度分析.xlsx" }));
  document.getElementById("excelContinueData")?.addEventListener("click", async () => {
    if (running) return;
    running = true;
    await runDataAnswerFlow();
  });
  document.getElementById("excelGenerateReport")?.addEventListener("click", () => {
    appendReportResultCard();
  });
  document.getElementById("excelSaveDataset")?.addEventListener("click", () => {
    createDatasetFromFile("产销月度分析.xlsx");
  });
  composerStatus.textContent = "表格字段等待确认";
  running = false;
}

async function runKnowledgeAnswerFlow() {
  await sleep(260);
  appendAssistantFlowCard(`
    <div class="flow-card knowledge-flow-card">
      <div class="flow-section">
        <span>直接回答</span>
        <strong>经营例会中应先说明达成缺口，再拆分目标、供给、渠道和区域因素，最后明确下月动作。</strong>
        <p>如果 DRP2 低于目标，建议避免只报结果，要把“差多少、差在哪、为什么差、谁负责、下月怎么补”讲清楚。</p>
      </div>
      <div class="flow-section">
        <span>引用依据</span>
        <div class="basis-grid">
          <p><b>知识库</b>${selectedKnowledge || "产销协同业务口径"}</p>
          <p><b>文档</b>月度经营会报告规范</p>
          <p><b>片段</b>DRP/AOP 达成说明口径</p>
        </div>
      </div>
      <div class="flow-section">
        <span>关键摘录</span>
        <p>低于目标时需要同步展示目标值、实际值、达成率、主要拖累区域和补救动作，避免只有单点指标。</p>
      </div>
      <div class="flow-section">
        <span>适用边界</span>
        <p>适用于产销例会、月度经营复盘和区域达成说明；不适合替代财务审计或正式绩效考核口径。</p>
      </div>
      <div class="followup-row">
        <button class="plain-btn">整理成汇报话术</button>
        <button class="plain-btn">生成报告说明段落</button>
      </div>
    </div>
  `);
  composerStatus.textContent = "知识问答已返回";
  running = false;
}

async function runFreeConversationFlow() {
  await sleep(220);
  appendAssistantFlowCard(`
    <div class="flow-card free-flow-card">
      <div class="flow-section">
        <span>自由分析</span>
        <strong>我已收到你的问题。</strong>
        <p>你可以继续直接描述需求，也可以选择小T问数、小T报告、小T表格或小T问答后再发送。</p>
      </div>
    </div>
  `);
  running = false;
}

async function runFakeGeneration() {
  if (running) return;
  const text = analysisText.value.trim();
  if (!text) {
    analysisText.focus();
    return;
  }

  running = true;
  savedGeneratedReport = false;
  appendUserMessage(text);
  setChatMode("chatting");
  analysisText.value = "";
  await runTaskFlow(getActiveTaskType());
}

async function runExampleGeneration(solution) {
  if (running) return;
  const text = analysisText.value.trim() || solution.prompt || `运行「${solution.name}」示例。`;
  running = true;
  savedGeneratedReport = false;
  chatStream.innerHTML = "";
  appendUserMessage(text);
  setChatMode("chatting");
  analysisText.value = "";
  await runTaskFlow(solution.solutionType || getActiveTaskType(), true);
}

function executeGeneration(planSteps) {
  if (running) return;
  running = true;
  composerStatus.textContent = "执行中";
  const stageMessage = appendAssistantStageCard(planSteps);
  const stageCount = stageMessage.querySelectorAll(".stage-list li").length;
  Array.from({ length: stageCount }).forEach((_, index) => {
    setTimeout(() => setStage(stageMessage, index), 350 + index * 520);
  });

  setTimeout(() => {
    appendReportResultCard();
    running = false;
  }, 900 + stageCount * 520);
}

function saveGeneratedReport(reportName) {
  if (!savedGeneratedReport) {
    savedReports.unshift({
      title: reportName,
      type: selectedTemplate || selectedSolution || "标准报告",
      status: "已保存",
      time: "刚刚",
      format: "HTML / DOCX",
      summary: `基于 ${selectedData || "示例数据"} 生成，包含核心结论、指标拆解、归因分析和行动建议。`
    });
    savedGeneratedReport = true;
  }
  renderSavedReports();
}

function renderSavedReports() {
  document.getElementById("savedReportsTable").innerHTML = `
    <div class="report-library">
      ${savedReports.map((report) => `
        <button class="report-library-card">
          <div class="report-card-top">
            <span class="doc-icon small">▤</span>
            <span class="status ${report.status === "已分享" || report.status === "已保存" ? "green" : ""}">${report.status}</span>
          </div>
          <strong>${report.title}</strong>
          <p>${report.summary}</p>
          <div class="report-card-meta">
            <span>${report.type}</span>
            <span>${report.format}</span>
            <span>${report.time}</span>
          </div>
        </button>
      `).join("")}
    </div>
  `;
}

function showFilter(buttonId) {
  const config = filterSets[buttonId];
  if (!config) return;
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  if (buttonId === "knowledgeBtn") {
    config.options = knowledgeBases.map((item) => [item.name, `${item.domain} · ${item.sourceType}`, item.name]);
  }
  const dataUploadMarkup = buttonId === "dataSelectBtn" ? `
    <section class="drawer-upload-card">
      <div>
        <span class="upload-icon">↑</span>
        <strong>上传 Excel / CSV</strong>
        <p>用于一次性分析本地表格，上传后会作为当前对话的数据附件。</p>
      </div>
      <label class="small-upload" for="excelInput">选择文件</label>
    </section>
  ` : "";

  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">SELECT</span>
        <h2>${config.title}</h2>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <p class="drawer-desc">选择后会更新当前对话上下文。Skills 不在这里选择，需要在 Agent 配置中装配。</p>
    <div class="drawer-options">
      ${config.options.map(([name, text, value]) => `
        <button class="drawer-option" data-source="${buttonId}" data-value="${escapeHtml(value)}">
          <strong>${name}</strong>
          <span>${text}</span>
        </button>
      `).join("")}
    </div>
    ${dataUploadMarkup}
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  sideDrawer.querySelectorAll(".drawer-option").forEach((option) => {
    option.addEventListener("click", () => applyFilterOption(buttonId, option.dataset.value));
  });
}

function applyFilterOption(buttonId, value) {
  closeDrawer();
  if (buttonId === "dataSelectBtn") {
    selectedData = value;
  uploadSub.textContent = "";
    composerStatus.textContent = "已选择数据";
    renderContextChips();
    return;
  }
  if (buttonId === "knowledgeBtn") {
    knowledgeEnabled = true;
    selectedKnowledge = value;
    document.getElementById("knowledgeBtn").classList.add("active");
    renderContextChips();
  }
}

function optionLabelFromValue(buttonId, value) {
  const found = filterSets[buttonId]?.options.find((option) => option[2] === value);
  return found?.[0] || "自定义模板";
}

function fakeUpload(file) {
  selectedData = file?.name || "retail_sales_q1.xlsx";
  uploadSub.textContent = "";
  composerStatus.textContent = "数据已就绪";
  renderContextChips();
  setRoute("chat");
}

function showTemplateShareDrawer(templateId) {
  const template = templates.find((item) => item.id === templateId);
  if (!template) return;
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">SHARE TEMPLATE</span>
        <h2>分享模板</h2>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <p class="drawer-desc">将「${template.name}」分享给同事或部门，对方可以在 Agent 广场里使用它。</p>
    <section class="share-section">
      <span>分享对象</span>
      <div class="share-search">搜索同事 / 部门</div>
      <div class="share-people"><span>曹海肖</span><span>王敏</span></div>
    </section>
    <section class="share-section">
      <span>权限</span>
      <div class="permission-options">
        <button class="permission-option active">仅使用</button>
        <button class="permission-option">可复制</button>
        <button class="permission-option">可编辑副本</button>
      </div>
    </section>
    <div class="drawer-footer">
      <button class="plain-btn" id="cancelShare">取消</button>
      <button class="dark-btn" id="confirmShare">分享模板</button>
    </div>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
  document.getElementById("cancelShare").addEventListener("click", closeDrawer);
  document.getElementById("confirmShare").addEventListener("click", () => shareTemplate(templateId));
}

function shareTemplate(templateId) {
  const template = templates.find((item) => item.id === templateId);
  if (!template) return;
  template.shared = true;
  renderMyTemplates();
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">SHARED</span>
        <h2>分享成功</h2>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <div class="share-success">
      <strong>${template.name}</strong>
      <p>已分享给 2 位同事，对方可在 Agent 广场中使用该 Agent。</p>
    </div>
  `;
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
}

function showSettings() {
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
  sideDrawer.innerHTML = `
    <div class="drawer-head">
      <div>
        <span class="card-kicker">SETTINGS</span>
        <h2>设置</h2>
      </div>
      <button class="drawer-close" id="closeDrawer">×</button>
    </div>
    <section class="settings-section">
      <span>账号信息</span>
      <div class="account-card">
        <div class="account-avatar">曹</div>
        <div>
          <strong>曹海肖</strong>
          <p>工号 100782</p>
        </div>
      </div>
    </section>
  `;
  openDrawer();
  document.getElementById("closeDrawer").addEventListener("click", closeDrawer);
}

function openDrawer() {
  drawerOverlay.classList.remove("hidden");
  sideDrawer.classList.remove("hidden");
}

function closeDrawer() {
  drawerOverlay.classList.add("hidden");
  sideDrawer.classList.add("hidden");
  sideDrawer.classList.remove("agent-config-drawer");
  sideDrawer.classList.remove("solution-detail-drawer");
  sideDrawer.classList.remove("dataset-wizard-drawer");
  sideDrawer.classList.remove("dataset-detail-drawer");
  sideDrawer.classList.remove("my-template-detail-drawer");
  sideDrawer.classList.remove("knowledge-detail-drawer");
  sideDrawer.classList.remove("knowledge-wizard-drawer");
}

function openReport() {
  reportModal.classList.remove("hidden");
  setReportEditMode(false);
}

function closeReport() {
  setReportEditMode(false);
  reportModal.classList.add("hidden");
}

function setReportEditMode(isEditing) {
  reportEditable.contentEditable = isEditing ? "true" : "false";
  reportEditable.classList.toggle("editing", isEditing);
  manualEditBtn.textContent = isEditing ? "完成" : "手动修改";
  reportModeStatus.textContent = isEditing ? "编辑模式" : "预览模式";
  reportModeStatus.classList.toggle("editing", isEditing);
  if (isEditing) reportEditable.focus();
}

function openInlineReport(reportName) {
  const solution = getSolutionByName(selectedTemplate) || getSolutionByName(selectedSolution);
  inlineReportTitle.textContent = reportName;
  inlineReportSaveStatus.textContent = savedGeneratedReport ? "已保存" : "未保存";
  inlineSaveReportBtn.textContent = savedGeneratedReport ? "已保存" : "保存报告";
  setReportPreviewContent(solution);
  setInlineReportEditMode(false);
  setChatMode("report-view");
  scrollChatToBottom();
}

function closeInlineReport() {
  setInlineReportEditMode(false);
  setChatMode("chatting");
}

function setInlineReportEditMode(isEditing) {
  inlineReportEditable.contentEditable = isEditing ? "true" : "false";
  inlineReportEditable.classList.toggle("editing", isEditing);
  inlineManualEditBtn.textContent = isEditing ? "完成" : "手动修改";
  inlineReportModeStatus.textContent = isEditing ? "编辑模式" : "预览模式";
  inlineReportModeStatus.classList.toggle("editing", isEditing);
  if (isEditing) inlineReportEditable.focus();
}

function scrollChatToBottom() {
  requestAnimationFrame(() => {
    chatScroll.scrollTop = chatScroll.scrollHeight;
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

routeButtons.forEach((button) => button.addEventListener("click", () => setRoute(button.dataset.route)));
document.querySelectorAll("[data-template]").forEach((button) => {
  button.addEventListener("click", () => {
    selectedTemplate = button.dataset.template;
    analysisText.value = `请按「${button.dataset.template}」思路生成一份图文报告，包含核心结论、指标拆解、原因分析、图表建议和行动计划。`;
    renderContextChips();
    analysisText.focus();
  });
});

marketSegmentButtons.forEach((button) => {
  button.addEventListener("click", () => setMarketSegment(button.dataset.marketSegment));
});
agentOwnerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentAgentOwner = button.dataset.agentOwner;
    agentOwnerButtons.forEach((item) => {
      const active = item.dataset.agentOwner === currentAgentOwner;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderSolutions();
  });
});
createTemplateBtn.addEventListener("click", showCreateSolutionDrawer);
manageSolutionsBtn?.addEventListener("click", showSolutionManagementDrawer);
appEntryCards.forEach((card) => {
  card.addEventListener("click", () => selectAppEntry(card.dataset.appEntry));
});
datasetSegmentButtons.forEach((button) => {
  button.addEventListener("click", () => setDatasetSegment(button.dataset.datasetSegment));
});
createDatasetBtn.addEventListener("click", showCreateDatasetEntryDrawer);
knowledgeSegmentButtons.forEach((button) => {
  button.addEventListener("click", () => setKnowledgeSegment(button.dataset.knowledgeSegment));
});
knowledgeTypeButtons.forEach((button) => {
  button.addEventListener("click", () => setKnowledgeType(button.dataset.knowledgeType));
});
createKnowledgeBtn.addEventListener("click", showCreateKnowledgeDrawer);
skillSegmentButtons.forEach((button) => {
  button.addEventListener("click", () => setSkillSegment(button.dataset.skillSegment));
});
publishSkillBtn.addEventListener("click", showPublishSkillDrawer);
datasetPageFileInput.addEventListener("change", (event) => {
  if (datasetWizardType === "upload") {
    datasetWizardFileName = event.target.files[0]?.name || "uploaded_sales.xlsx";
    renderDatasetWizardStep();
    return;
  }
  showUploadDatasetWizard(event.target.files[0]);
});
document.getElementById("sendPrompt").addEventListener("click", runFakeGeneration);
document.getElementById("dataSelectBtn").addEventListener("click", () => showFilter("dataSelectBtn"));
document.getElementById("webSearchBtn").addEventListener("click", (event) => {
  webSearchEnabled = !webSearchEnabled;
  event.currentTarget.classList.toggle("active", webSearchEnabled);
});
document.getElementById("knowledgeBtn").addEventListener("click", () => showFilter("knowledgeBtn"));
modeTabs?.querySelectorAll("[data-task-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    if (currentAppEntry === button.dataset.taskMode) {
      resetTaskMode();
      return;
    }
    selectAppEntry(button.dataset.taskMode);
  });
});
clearTaskModeBtn?.addEventListener("click", resetTaskMode);
excelInput.addEventListener("change", (event) => fakeUpload(event.target.files[0]));
analysisText.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") runFakeGeneration();
});
document.getElementById("closeModal").addEventListener("click", closeReport);
reportModal.addEventListener("click", (event) => {
  if (event.target === reportModal) closeReport();
});
manualEditBtn.addEventListener("click", () => setReportEditMode(reportEditable.contentEditable !== "true"));
closeInlineReportBtn.addEventListener("click", closeInlineReport);
inlineManualEditBtn.addEventListener("click", () => setInlineReportEditMode(inlineReportEditable.contentEditable !== "true"));
inlineSaveReportBtn.addEventListener("click", () => {
  saveGeneratedReport(inlineReportTitle.textContent || "AI 数据分析报告");
  inlineReportSaveStatus.textContent = "已保存";
  inlineSaveReportBtn.textContent = "已保存";
});
inlineExportReportBtn.addEventListener("click", () => {
  inlineReportSaveStatus.textContent = "已准备导出";
});
drawerOverlay.addEventListener("click", closeDrawer);
document.getElementById("settingsBtn").addEventListener("click", showSettings);

renderSolutions();
renderEmptyTemplates();
renderMyTemplates();
renderDatasets();
renderKnowledgeBases();
renderSkillHub();
renderProjects();
renderAnalyses();
renderSavedReports();
renderContextChips();
resetTaskMode();
