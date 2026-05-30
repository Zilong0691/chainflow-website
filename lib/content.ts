export const navItems = [
  { label: "Vision", href: "#vision" },
  { label: "Skills", href: "#skills" },
  { label: "Cases", href: "#cases" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

export const flowSteps = [
  {
    term: "Data",
    description: "原始信息与业务数据"
  },
  {
    term: "Signal",
    description: "有价值的变化信号"
  },
  {
    term: "Insight",
    description: "对风险与机会的判断"
  },
  {
    term: "Action",
    description: "可执行的工具与建议"
  },
  {
    term: "Flow",
    description: "更顺畅的供应链流动"
  }
];

export const layers = [
  {
    number: "01",
    title: "Reduce Friction",
    summary: "AI 帮助供应链团队减少重复工作。",
    scenes: ["邮件", "表格", "采购", "库存", "调度", "数据清洗"],
    keywords: [
      "Excel Automation",
      "Procurement Assistant",
      "Inventory Check",
      "Logistics Scheduling",
      "Workflow Skill"
    ]
  },
  {
    number: "02",
    title: "Improve Decisions",
    summary: "AI 帮助企业做出更好的供应链决策。",
    scenes: ["需求预测", "库存优化", "采购策略", "供应商评估", "牛鞭效应分析"],
    keywords: [
      "Demand Forecasting",
      "Inventory Optimization",
      "Supplier Scoring",
      "Procurement Strategy",
      "Bullwhip Effect"
    ]
  },
  {
    number: "03",
    title: "Create Connections",
    summary: "AI 帮助企业发现供应商、客户、采购机会、替代路径和全球合作网络。",
    scenes: ["中国企业出海", "供应商发现", "采购机会匹配", "替代供应链路径", "全球供应链机会"],
    keywords: [
      "Supplier Matching",
      "Global Opportunities",
      "Risk Sensing",
      "Alternative Sourcing",
      "GoGlobal Network"
    ]
  }
];

export const skills = [
  {
    name: "RouteFlow",
    cnName: "短途配送排线助手",
    englishName: "RouteFlow — Short-haul Delivery Route Planner",
    value: "上传订单表，自动生成车辆排线方案、配送顺序和可视化路线图。",
    problem:
      "中小团队每天面对大量订单、车辆、地址和时间窗时，人工排线耗时、易错、难以优化。",
    inputs: ["订单 Excel", "收货地址", "货量", "时间窗", "车辆数量", "车辆容量", "仓库起点"],
    outputs: ["排线 Excel", "配送顺序", "路径结果", "JSON 结构化数据", "HTML 可视化地图", "简短分析报告"],
    scenes: ["同城配送", "门店补货", "区域分拨", "小型车队调度", "临时配送计划"],
    status: "Prototype Ready",
    cta: "Request Demo"
  },
  {
    name: "NetworkFlow",
    cnName: "仓网选址评估助手",
    englishName: "NetworkFlow — Warehouse Network Location Evaluator",
    value: "基于需求城市、候选仓点和成本参数，快速比较仓网布局方案。",
    problem:
      "仓网布局需要同时考虑固定成本、运输成本、需求分配、服务范围和风险，人工评估很难系统比较不同方案。",
    inputs: ["需求城市", "需求量", "候选仓城市", "固定成本", "单位运输成本", "服务半径", "时效要求"],
    outputs: ["推荐仓点", "需求分配", "成本拆分", "多方案比较", "Pareto 分析", "HTML 地图可视化", "决策报告"],
    scenes: ["区域仓规划", "出海仓布局", "经销网络优化", "仓库候选城市比较", "配送网络重构"],
    status: "Prototype Ready",
    cta: "Discuss Your Case"
  },
  {
    name: "Inventory Reconciliation Agent",
    cnName: "库存核对 Agent",
    englishName: "Inventory Reconciliation Agent",
    value: "辅助 WMS 库存、实物库存和表格记录之间的核对。",
    problem: "库存系统、实物和表格之间容易出现差异，人工核对耗时且易遗漏。",
    inputs: ["WMS 导出表", "盘点表", "库存台账"],
    outputs: ["核对清单", "差异记录", "处理建议"],
    scenes: ["库存盘点", "账实核对", "异常追踪"],
    status: "Coming Soon",
    cta: "Join Waitlist"
  },
  {
    name: "Supplier Communication Agent",
    cnName: "供应商沟通 Agent",
    englishName: "Supplier Communication Agent",
    value: "辅助采购询价、交期跟进、邮件生成和沟通记录沉淀。",
    problem: "采购沟通中存在大量重复邮件、交期跟进和信息整理工作。",
    inputs: ["询价需求", "供应商资料", "邮件记录"],
    outputs: ["邮件草稿", "供应商记录", "跟进清单"],
    scenes: ["采购询价", "交期跟进", "供应商信息整理"],
    status: "Coming Soon",
    cta: "Coming Soon"
  }
];

export const cases = [
  {
    number: "Case 01",
    title: "RouteFlow",
    problem: "多订单、多车辆、多地址、多时间窗下，人工排线耗时且难以优化。",
    method: "把订单 Excel 转化为路径优化问题，结合车辆容量、时间窗和地址坐标生成可执行路线。",
    output: "排线表、配送顺序、结构化数据、交互式地图。",
    status: "Prototype Ready",
    cta: "Request Demo"
  },
  {
    number: "Case 02",
    title: "NetworkFlow",
    problem: "仓网选址涉及固定成本、运输成本、需求分配和服务范围，人工比较方案效率低且不够系统。",
    method: "基于候选仓、需求城市和成本参数建立选址评估模型，输出推荐方案和多维分析结果。",
    output: "推荐仓点、需求分配、成本拆分、Pareto 分析、地图可视化。",
    status: "Prototype Ready",
    cta: "Discuss Your Case"
  },
  {
    number: "Case 03",
    title: "Inventory Reconciliation Workflow",
    problem: "库存系统、实物和表格之间容易出现差异，人工核对耗时且易遗漏。",
    method: "AI-assisted checklist and discrepancy detection workflow.",
    output: "核对清单、差异记录、处理建议。",
    status: "Coming Soon",
    cta: "Join Waitlist"
  },
  {
    number: "Case 04",
    title: "Supplier Communication Workflow",
    problem: "采购沟通中存在大量重复邮件、交期跟进和信息整理工作。",
    method: "AI-assisted supplier communication and procurement follow-up workflow.",
    output: "邮件草稿、供应商记录、跟进清单。",
    status: "Coming Soon",
    cta: "Coming Soon"
  }
];

export const services = [
  {
    name: "Starter",
    title: "AI Workflow Skill",
    fit: "个人、小团队、采购/物流/供应链从业者。",
    description: "Pilot available for early users.",
    items: ["诊断一个具体低效流程", "设计一个 Excel / 邮件 / 表格 / 库存相关 AI Skill", "提供本地运行版本", "配套标准模板", "配套傻瓜教程", "远程指导部署"],
    cta: "Start a Pilot"
  },
  {
    name: "Prototype",
    title: "Prototype Customization",
    fit: "对 RouteFlow 或 NetworkFlow 有类似需求的团队。",
    description: "把已有原型改造成更贴近真实数据的可演示版本。",
    items: ["按真实业务数据适配字段", "调整输入模板", "调整输出报告", "配置地图 / 成本 / 车辆 / 仓库参数", "生成可演示版本"],
    cta: "Customize a Prototype"
  },
  {
    name: "Decision",
    title: "Supply Chain Decision Support",
    fit: "中小制造企业、贸易公司、供应链团队。",
    description: "把分散数据整理成能辅助判断的轻量决策工具。",
    items: ["库存分析", "需求预测", "供应商评分", "采购策略建议", "简易可视化看板"],
    cta: "Discuss Your Data"
  },
  {
    name: "Global",
    title: "GoGlobal Supply Chain Intelligence",
    fit: "准备出海或正在出海的中国企业。",
    description: "为出海场景建立更顺畅的供应链路径判断。",
    items: ["目标市场供应链调研", "风险地图", "供应商 / 物流 / 海外仓伙伴发现", "本地化供应链路径建议"],
    cta: "Explore GoGlobal"
  }
];

export const beyondCode = [
  "理解真实供应链场景",
  "设计可用的数据模板",
  "清洗和适配企业数据",
  "构建完整工作流",
  "输出老板和一线团队都能看懂的结果",
  "提供本地部署、操作教程和持续优化"
];

export const roadmap = [
  {
    title: "Prototype",
    description: "已有可运行原型"
  },
  {
    title: "Template",
    description: "沉淀标准输入模板和输出格式"
  },
  {
    title: "Pilot",
    description: "基于真实业务数据试点"
  },
  {
    title: "Deployment",
    description: "本地部署、教程、培训和持续优化"
  }
];

export const futureDirections = [
  {
    title: "Supply Chain Intelligence",
    description: "把信息转化为判断，把判断转化为行动。"
  },
  {
    title: "Global Opportunity Discovery",
    description: "帮助企业发现供应商、客户、采购机会和合作网络。"
  },
  {
    title: "Industrial AI Services",
    description: "把 AI 从演示带到真实供应链流程中。"
  }
];

export const focusAreas = [
  "汽车供应链",
  "采购运营",
  "物流优化",
  "供应链韧性",
  "中国企业出海",
  "AI Agent 在真实业务场景中的落地"
];

export const contactLinks = [
  { label: "Email", value: "your-email@example.com", href: "mailto:your-email@example.com" },
  { label: "LinkedIn", value: "Coming Soon", href: "#contact" },
  { label: "GitHub", value: "Coming Soon", href: "#contact" },
  { label: "WeChat", value: "Coming Soon", href: "#contact" }
];
