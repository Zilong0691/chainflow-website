export type Language = "zh" | "en";

export const languageOptions: Array<{ code: Language; label: string }> = [
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" }
];

const commonToolLinks = {
  routeflow: "/tools/routeflow",
  networkflow: "/tools/networkflow"
};

export const siteContent = {
  zh: {
    nav: [
      { label: "首页", href: "#top" },
      { label: "工具包", href: "#skills" },
      { label: "案例", href: "#cases" },
      { label: "价格", href: "#pricing" },
      { label: "共创", href: "#community" },
      { label: "关于", href: "#about" },
      { label: "联系", href: "#contact" }
    ],
    navCta: "预约试点",
    hero: {
      eyebrow: "A Supply Chain × AI portfolio and product lab",
      brand: "ChainFlow",
      title: "让供应链，如水流动",
      subtitle: "给中小企业、采购人员和企业主的供应链 AI 工具箱。",
      body: "AI-native tools and intelligence for global supply chain flow. 从一个小工具开始，帮你看懂、管好、省心、优化、高效你的供应链。",
      primaryCta: "Explore Tools",
      secondaryCta: "体验 Demo",
      tertiaryCta: "Start a Pilot"
    },
    portfolio: {
      eyebrow: "Portfolio / Product Lab / Community Pilot",
      title: "一个更真实的 Supply Chain × AI 产品实验室。",
      body: "ChainFlow 既沉淀供应链 × AI 的作品与案例，也通过小而实用的 AI Skill 验证真实业务场景。它服务职业叙事，也面向认真经营的小企业、商家和供应链从业者，探索一个具体问题能否被更好地解决。",
      points: ["AI 供应链作品集", "产品实验室", "真实场景共创平台"]
    },
    threeWaysHeader: {
      eyebrow: "ChainFlow 做三件事",
      title: "省时间，做判断，看见网络。",
      subtitle: "从日常效率、业务判断到供应链网络，把复杂问题拆成可落地的工具。"
    },
    threeWays: [
      {
        layer: "效率层",
        title: "帮你省时间",
        englishTitle: "Save Time",
        description: "把重复、耗时、容易出错的供应链工作做成 AI Skill。",
        englishDescription: "",
        examples: ["Excel 处理", "采购邮件", "报价对比", "库存核对", "配送排线", "仓网初步评估"]
      },
      {
        layer: "决策层",
        title: "帮你做判断",
        englishTitle: "Improve Decisions",
        description: "把库存、需求、采购、供应商和物流数据转化为更好的决策。",
        englishDescription: "",
        examples: ["库存预测", "需求风险判断", "供应商评估", "采购策略建议", "物流与仓网优化", "牛鞭效应遏制"]
      },
      {
        layer: "网络层",
        title: "帮你看见网络",
        englishTitle: "See the Network",
        description: "长期探索更深层的供应链风险、机会和连接。",
        englishDescription: "",
        examples: ["多层供应链图谱", "Tier-2 / Tier-3 风险", "替代供应商路径", "全球机会发现", "中国企业出海连接"]
      }
    ],
    flowLogic: {
      eyebrow: "Why ChainFlow",
      title: "企业不缺更多资讯，缺的是能变成行动的判断。",
      body: "ChainFlow 不做普通供应链资讯推送。真正有价值的不是更多信息，而是和自己有关、被判断过、能省时间、做决策、找机会、降风险的信息。",
      steps: [
        { label: "Data", cn: "数据", description: "原始表格、邮件、订单、库存和物流信息。" },
        { label: "Signal", cn: "信号", description: "从杂乱数据里识别有价值的变化与异常。" },
        { label: "Insight", cn: "判断", description: "把信号转化为风险、机会和方案比较。" },
        { label: "Action", cn: "行动", description: "输出可执行的工具、报告、路线、清单或建议。" },
        { label: "Flow", cn: "流动", description: "让工作流、决策流和供应链连接更顺畅。" }
      ]
    },
    layersHeader: {
      eyebrow: "效率 → 决策 → 网络",
      title: "先解决一个具体问题，再逐步走向供应链智能。",
      subtitle: "客户先拿到可用结果，ChainFlow 再把一个个工具沉淀成更完整的供应链工作流。"
    },
    layers: [
      {
        number: "01",
        title: "效率工具",
        summary: "把一线团队每天都在做的重复工作变成可交付的小工具。",
        scenes: ["订单整理", "表格清洗", "邮件草稿", "排线计算", "库存核对"],
        keywords: ["省时间", "少出错", "能交付"]
      },
      {
        number: "02",
        title: "决策辅助",
        summary: "把分散数据整理成老板和负责人能看懂的判断依据。",
        scenes: ["库存预测", "需求判断", "仓网评估", "供应商评分", "采购策略"],
        keywords: ["看懂数据", "比较方案", "辅助决策"]
      },
      {
        number: "03",
        title: "网络智能",
        summary: "长期探索多层供应链图谱、风险信号和全球机会发现。",
        scenes: ["供应商网络", "替代路径", "出海连接", "风险信号", "机会发现"],
        keywords: ["未来探索", "看见连接", "发现机会"]
      }
    ],
    toolsHeader: {
      eyebrow: "Tools / Skills",
      title: "每个 Skill，先解决一个具体问题。",
      subtitle: "Tools 是瑞士军刀里的每一把刀：明确问题、输入、输出，并提供 Free Demo、Lite Version 和 Custom Development 三个入口。"
    },
    toolsDemoCta: "先试 Demo",
    labels: {
      problem: "解决什么问题",
      bestFor: "适合谁",
      input: "输入数据",
      output: "输出结果",
      pricing: "价格"
    },
    tools: [
      {
        slug: "routeflow",
        name: "RouteFlow",
        title: "短途配送排线助手",
        value: "把订单表转化为车辆排线方案、配送顺序和可视化路线图。",
        problem: "人工排线耗时、易错、难以优化。",
        bestFor: ["同城配送", "小车队", "门店补货", "区域分拨"],
        inputs: ["订单表", "地址", "车辆", "时间窗", "货量"],
        outputs: ["路线方案", "司机任务表", "地图", "简短报告"],
        pricing: "Free Demo ¥0 / Lite Version ¥199 买断 / Custom Development From ¥2999",
        status: "可体验 Demo",
        cta: "体验 Demo",
        href: commonToolLinks.routeflow,
        demoInput: ["18 个订单", "3 台车辆", "2 个时间窗", "单仓出发"],
        demoOutput: ["3 条配送路线", "预计里程 86.4 公里", "车辆装载率 82%", "异常地址 1 个"],
        plans: [
          { name: "Free Demo", price: "¥0", cta: "View Demo" },
          { name: "Lite Version", price: "¥199 买断", cta: "Get Lite Version" },
          { name: "Custom Development", price: "From ¥2999", cta: "Customize This Skill" }
        ]
      },
      {
        slug: "networkflow",
        name: "NetworkFlow",
        title: "仓网选址评估助手",
        value: "基于需求城市、候选仓点和成本参数，快速比较仓网布局方案。",
        problem: "仓库设哪里、客户怎么分配、成本怎么比较，难以系统判断。",
        bestFor: ["区域仓规划", "出海仓布局", "经销网络优化"],
        inputs: ["需求城市", "候选仓", "成本参数", "服务范围"],
        outputs: ["推荐仓点", "分配方案", "成本拆分", "地图", "决策报告"],
        pricing: "Free Demo ¥0 / Lite Version ¥399 买断 / Custom Development From ¥2999",
        status: "可体验 Demo",
        cta: "体验 Demo",
        href: commonToolLinks.networkflow,
        demoInput: ["9 个需求城市", "5 个候选仓", "固定成本约束", "服务半径 350 公里"],
        demoOutput: ["推荐 2 个仓点", "覆盖率 94%", "成本下降 11.8%", "备用方案 2 个"],
        plans: [
          { name: "Free Demo", price: "¥0", cta: "View Demo" },
          { name: "Lite Version", price: "¥399 买断", cta: "Get Lite Version" },
          { name: "Custom Development", price: "From ¥2999", cta: "Customize This Skill" }
        ]
      }
    ],
    comingSoonHeader: "后续工具包",
    comingSoonTools: [
      { name: "SupplierMail", title: "供应商沟通助手" },
      { name: "StockCheck", title: "库存核对助手" },
      { name: "QuoteCompare", title: "报价对比助手" },
      { name: "DemandFlow", title: "需求预测助手" }
    ],
    demoHeader: {
      eyebrow: "工具包 Demo",
      title: "先看示例效果，再决定从哪一个问题开始。",
      subtitle: "每个 Demo 都使用脱敏 mock 数据，只展示输入结构、输出结果和报告形态。"
    },
    pricingHeader: {
      eyebrow: "Pricing",
      title: "Start Small. Solve One Real Problem.",
      subtitle: "Try a demo, buy one focused Skill, or customize it with your own data."
    },
    pricingCards: [
      {
        name: "Free Demo",
        price: "¥0",
        items: ["查看 RouteFlow / NetworkFlow 示例", "查看地图和输出", "不上传真实数据", "不开放源码"],
        cta: "View Free Demo"
      },
      {
        name: "Skill Lite",
        price: "From ¥199",
        items: ["RouteFlow Lite：¥199", "NetworkFlow Lite：¥399", "标准模板", "示例数据", "基础教程", "买断使用"],
        cta: "Choose a Skill"
      },
      {
        name: "Custom Skill",
        price: "From ¥2999",
        items: ["用你的真实表格适配", "修改字段和模板", "输出定制报告", "本地部署", "远程讲解"],
        cta: "Customize a Skill"
      },
      {
        name: "AI Diagnosis",
        price: "¥999",
        items: ["60 分钟访谈", "梳理一个供应链流程", "找出 3 个 AI 可改造点", "给出优先级", "输出一页建议"],
        cta: "Book Diagnosis"
      }
    ],
    pricingNotes: ["GoGlobal Supply Chain Diagnosis：¥2999", "Decision Intelligence Project：From ¥8000"],
    casesHeader: {
      eyebrow: "Portfolio Case Library",
      title: "把供应链问题，沉淀成可讲清楚的 AI 应用案例。",
      subtitle: "每个案例都用 Problem / Data / Method / Output / Value / Limitation / Next Step 记录，服务作品集展示和真实试点验证。"
    },
    cases: [
      {
        title: "RouteFlow: 短途配送排线",
        audience: "同城配送 / 小车队 / 门店补货",
        problem: "多订单、多车辆、多约束下，人工排线耗时、易错，且很难解释为什么这样安排。",
        data: "订单表、地址、车辆容量、时间窗、货量和仓库起点。",
        method: "订单表 → 地址处理 → 约束建模 → 路径求解 → 地图与司机任务表输出。",
        output: "路线方案、配送顺序、司机任务表、异常地址提醒和地图预览。",
        value: "减少人工排线时间，提高路线沟通效率，让一线团队更快看到可执行方案。",
        limitation: "真实地址解析、异常订单和临时插单仍需要人工校验。",
        nextStep: "接入更真实的地址数据、司机偏好和动态订单变更。"
      },
      {
        title: "NetworkFlow: 仓网选址评估",
        audience: "区域仓规划 / 出海仓布局 / 经销网络优化",
        problem: "仓库设在哪里、客户如何分配、固定成本和运输成本如何权衡，人工评估难以系统比较。",
        data: "需求城市、候选仓点、固定成本、运输成本、服务半径和需求量。",
        method: "候选点筛选 → 成本建模 → 需求分配 → 多方案比较 → 地图与报告输出。",
        output: "推荐仓点、需求分配、覆盖率、成本拆分、备用方案和决策报告。",
        value: "把模糊的仓网讨论转化为可比较的方案，帮助业务负责人更快做出初步判断。",
        limitation: "模型仍依赖输入参数质量，暂未覆盖库存策略、税务和真实运营约束。",
        nextStep: "加入多场景参数、服务水平约束和敏感性分析。"
      },
      {
        title: "QuoteCompare: 采购报价对比",
        audience: "采购人员 / 供应商管理 / 小团队采购流程",
        problem: "不同供应商报价口径不一致，交期、MOQ、运费、付款条件和隐藏成本混在一起。",
        data: "供应商报价表、交期、MOQ、运费、付款条件、币种和备注。",
        method: "字段标准化 → 报价口径统一 → 隐藏成本识别 → 谈判点提示。",
        output: "标准化报价表、差异标注、隐藏成本提示和采购建议摘要。",
        value: "帮助采购人员更快看清真实总成本和谈判重点。",
        limitation: "仍需人工判断供应商质量、关系风险和合同条款细节。",
        nextStep: "沉淀为 StockCheck / SupplierMail 之后的采购工作流案例。"
      }
    ],
    beyond: {
      eyebrow: "不止脚本",
      title: "不止是一段代码",
      subtitle: "单个脚本很容易被复制，但真正有价值的是把供应链问题变成可运行、可交付、可复用的工作流。",
      cta: "预约试点",
      items: ["真实场景理解", "数据模板设计", "字段和口径适配", "工作流搭建", "可读输出", "本地部署", "傻瓜教程", "持续优化"]
    },
    community: {
      eyebrow: "Community Pilot",
      title: "真实场景共创计划",
      subtitle: "每月 3 个免费部署名额。",
      body: "ChainFlow 不只是一个作品集或产品实验。它也希望验证：实用 AI 工具能否真正帮助真实商家和小企业解决供应链难题。",
      fitTitle: "适合对象",
      includesTitle: "免费试点包含",
      excludesTitle: "免费试点不包含",
      fit: ["业务确实存在供应链、采购、库存、物流、仓储或配送问题", "商家或小企业口碑良好", "认真经营", "对员工友善", "愿意提供脱敏数据", "愿意提供真实反馈", "认可这是一次小规模试点，而不是长期免费服务"],
      includes: ["一个明确的供应链相关问题", "一个 ChainFlow AI Skill", "一次脱敏数据试跑", "一次基础结果演示", "一份简短说明或操作建议", "一次反馈沟通"],
      excludes: ["长期运维", "多轮复杂定制", "ERP / WMS / SRM 系统对接", "大规模数据清洗", "无限修改", "敏感数据处理", "商业机密责任承担", "长期免费顾问服务"],
      primaryCta: "Apply for Free Pilot",
      secondaryCta: "Start a Paid Pilot"
    },
    openNotes: {
      eyebrow: "Open Notes",
      title: "开放笔记",
      body: "ChainFlow 会开放部分非敏感模板、示例和方法笔记，供供应链从业者参考。可运行工具包、部署版本和定制工作流，将通过试点和服务交付。",
      cta: "View GitHub Notes"
    },
    futureHeader: {
      eyebrow: "长期探索",
      title: "从一个工具包，走向更深的供应链智能。"
    },
    futureDirections: [
      { title: "多层供应链图谱", description: "探索 Tier-2 / Tier-3 风险、替代路径和深层供应关系。" },
      { title: "早期风险信号", description: "从多源数据里识别还没有被命名的风险模式。" },
      { title: "动态采购策略", description: "把价格、汇率、关税、交期和替代料约束放在同一个判断框架里。" }
    ],
    about: {
      eyebrow: "关于",
      title: "ChainFlow Lab",
      subtitle: "Personal Product Lab",
      statement: "ChainFlow Lab 是一个个人产品实验室，探索 AI 在真实供应链工作流中的应用。",
      paragraphs: [
        "由赵子龙（走了尤）发起，关注汽车供应链、采购运营、物流优化、供应链韧性、中国企业出海，以及 AI Agent 在业务流程中的落地。",
        "ChainFlow 会从小而实用的工具开始，逐步探索决策智能与供应链网络洞察。"
      ],
      focusLabel: "我关注",
      focusAreas: ["汽车供应链", "采购运营", "物流优化", "供应链韧性", "中国企业出海", "AI Agent 在真实业务场景中的落地"]
    },
    contact: {
      eyebrow: "试点",
      title: "寻找前 5 个真实供应链场景试点用户。",
      subtitle: "正在寻找前 5 个真实供应链场景试点用户。",
      body: "你可以提供一个脱敏表格或一个真实流程问题。ChainFlow 会判断是否适合用 AI 工具包或决策智能方法解决，并给出一个小试点建议。",
      pilot: "适合中小企业老板、个人店铺老板、职业采购人员、物流 / 仓储 / 运营负责人和准备出海的小团队。",
      cta: "预约试点",
      links: [
        { label: "邮箱", value: "zilong@chainflowlab.com", href: "mailto:zilong@chainflowlab.com" },
        { label: "微信", value: "邮件联系获取", href: "mailto:zilong@chainflowlab.com" },
        { label: "GitHub", value: "Zilong0691", href: "https://github.com/Zilong0691" },
        { label: "网站", value: "chainflowlab.com", href: "https://chainflowlab.com" }
      ]
    },
    footer: {
      brand: "ChainFlow Lab",
      line: "AI-native tools and intelligence for global supply chain flow."
    }
  },
  en: {
    nav: [
      { label: "Home", href: "#top" },
      { label: "Toolkits", href: "#skills" },
      { label: "Cases", href: "#cases" },
      { label: "Pricing", href: "#pricing" },
      { label: "Community", href: "#community" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    navCta: "Start a Pilot",
    hero: {
      eyebrow: "A Supply Chain × AI portfolio and product lab",
      brand: "ChainFlow",
      title: "Let supply chains flow like water",
      subtitle: "A supply chain AI toolbox for small businesses, buyers, and operators.",
      body: "AI-native tools and intelligence for global supply chain flow. Start with one focused tool to understand, manage, simplify, optimize, and improve supply chain work.",
      primaryCta: "Explore Tools",
      secondaryCta: "View Demo",
      tertiaryCta: "Start a Pilot"
    },
    portfolio: {
      eyebrow: "Portfolio / Product Lab / Community Pilot",
      title: "A more grounded Supply Chain × AI product lab.",
      body: "ChainFlow documents Supply Chain × AI work, tests small practical AI Skills, and learns from real workflows. It supports career storytelling while also serving small businesses, merchants, buyers, and operators with concrete supply chain problems.",
      points: ["Supply Chain × AI portfolio", "Product lab", "Community pilot platform"]
    },
    threeWaysHeader: {
      eyebrow: "What ChainFlow Does",
      title: "Save time, improve decisions, and see the network.",
      subtitle: "Three ways ChainFlow helps supply chains flow better."
    },
    threeWays: [
      {
        layer: "Efficiency Layer",
        title: "Save Time",
        englishTitle: "Save Time",
        description: "Turn repetitive, time-consuming, error-prone supply chain work into AI Skills.",
        englishDescription: "Turn repetitive supply chain work into practical AI toolkits.",
        examples: ["Excel processing", "Procurement email", "Quote comparison", "Inventory checks", "Delivery routing", "Warehouse screening"]
      },
      {
        layer: "Decision Layer",
        title: "Improve Decisions",
        englishTitle: "Improve Decisions",
        description: "Turn inventory, demand, procurement, supplier, and logistics data into clearer decisions.",
        englishDescription: "Turn supply chain data into clearer decisions.",
        examples: ["Inventory forecasting", "Demand risk", "Supplier evaluation", "Procurement strategy", "Logistics and warehouse optimization", "Bullwhip mitigation"]
      },
      {
        layer: "Network Layer",
        title: "See the Network",
        englishTitle: "See the Network",
        description: "A long-term exploration into deeper risks, opportunities, and connections across supply chains.",
        englishDescription: "Explore deeper risks, opportunities, and connections across supply chains.",
        examples: ["Multi-tier supply maps", "Tier-2 / Tier-3 risk", "Alternative supplier paths", "Global opportunity discovery", "Outbound supply chain links"]
      }
    ],
    flowLogic: {
      eyebrow: "Why ChainFlow",
      title: "Businesses do not need more generic information. They need judgment that turns into action.",
      body: "ChainFlow is not a supply chain news feed. The useful layer is information that is relevant, interpreted, actionable, and able to save time, support decisions, find opportunities, or reduce risk.",
      steps: [
        { label: "Data", cn: "Data", description: "Raw spreadsheets, emails, orders, inventory, and logistics information." },
        { label: "Signal", cn: "Signal", description: "Useful changes, exceptions, and patterns found inside messy data." },
        { label: "Insight", cn: "Insight", description: "Risk, opportunity, and scenario judgment built from signals." },
        { label: "Action", cn: "Action", description: "Executable tools, reports, routes, checklists, or recommendations." },
        { label: "Flow", cn: "Flow", description: "Smoother workflows, decisions, and supply chain connections." }
      ]
    },
    layersHeader: {
      eyebrow: "Efficiency → Decision → Network",
      title: "Start with one concrete workflow, then grow toward supply chain intelligence.",
      subtitle: "Customers get useful outputs first. ChainFlow turns individual tools into reusable operating workflows over time."
    },
    layers: [
      {
        number: "01",
        title: "Efficiency",
        summary: "Turn repeated frontline work into deliverable focused tools.",
        scenes: ["Order cleanup", "Spreadsheet processing", "Email drafts", "Routing", "Inventory checks"],
        keywords: ["Save time", "Reduce errors", "Deliver outputs"]
      },
      {
        number: "02",
        title: "Decision",
        summary: "Turn scattered data into judgment that owners and operators can understand.",
        scenes: ["Inventory forecasting", "Demand judgment", "Warehouse evaluation", "Supplier scoring", "Procurement strategy"],
        keywords: ["Understand data", "Compare scenarios", "Support decisions"]
      },
      {
        number: "03",
        title: "Network",
        summary: "A long-term exploration into multi-tier maps, risk signals, and global opportunities.",
        scenes: ["Supplier networks", "Alternative paths", "Global expansion", "Risk signals", "Opportunity discovery"],
        keywords: ["Long-term exploration", "See connections", "Find opportunities"]
      }
    ],
    toolsHeader: {
      eyebrow: "Tools / Skills",
      title: "Each Skill solves one concrete problem first.",
      subtitle: "Tools are the individual blades inside the toolkit: clear problem, input, output, and three entries: Free Demo, Lite Version, and Custom Development."
    },
    toolsDemoCta: "Try Demo",
    labels: {
      problem: "Problem",
      bestFor: "Best for",
      input: "Input",
      output: "Output",
      pricing: "Pricing"
    },
    tools: [
      {
        slug: "routeflow",
        name: "RouteFlow",
        title: "Short-haul Delivery Route Planner",
        value: "Turn an order sheet into vehicle routes, delivery sequences, and visual route maps.",
        problem: "Manual routing is slow, error-prone, and hard to optimize.",
        bestFor: ["Local delivery", "Small fleets", "Store replenishment", "Regional distribution"],
        inputs: ["Order sheet", "Address", "Vehicle", "Time window", "Volume"],
        outputs: ["Route plan", "Driver task sheet", "Map", "Short report"],
        pricing: "Free Demo ¥0 / Lite Version ¥199 one-time / Custom Development From ¥2999",
        status: "Demo Ready",
        cta: "View Demo",
        href: commonToolLinks.routeflow,
        demoInput: ["18 orders", "3 vehicles", "2 time windows", "Single depot"],
        demoOutput: ["3 delivery routes", "86.4 km estimated distance", "82% load rate", "1 address exception"],
        plans: [
          { name: "Free Demo", price: "¥0", cta: "View Demo" },
          { name: "Lite Version", price: "¥199 one-time", cta: "Get Lite Version" },
          { name: "Custom Development", price: "From ¥2999", cta: "Customize This Skill" }
        ]
      },
      {
        slug: "networkflow",
        name: "NetworkFlow",
        title: "Warehouse Network Location Evaluator",
        value: "Compare warehouse layouts using demand cities, candidate sites, and cost parameters.",
        problem: "Choosing warehouse locations, assigning customers, and comparing costs is hard to judge systematically.",
        bestFor: ["Regional warehouse planning", "Outbound warehouse layout", "Dealer network optimization"],
        inputs: ["Demand cities", "Candidate warehouses", "Cost parameters", "Service range"],
        outputs: ["Recommended sites", "Allocation plan", "Cost breakdown", "Map", "Decision report"],
        pricing: "Free Demo ¥0 / Lite Version ¥399 one-time / Custom Development From ¥2999",
        status: "Demo Ready",
        cta: "View Demo",
        href: commonToolLinks.networkflow,
        demoInput: ["9 demand cities", "5 candidate sites", "Fixed cost constraints", "350 km service radius"],
        demoOutput: ["2 recommended sites", "94% coverage", "11.8% cost reduction", "2 backup scenarios"],
        plans: [
          { name: "Free Demo", price: "¥0", cta: "View Demo" },
          { name: "Lite Version", price: "¥399 one-time", cta: "Get Lite Version" },
          { name: "Custom Development", price: "From ¥2999", cta: "Customize This Skill" }
        ]
      }
    ],
    comingSoonHeader: "Coming Soon",
    comingSoonTools: [
      { name: "SupplierMail", title: "Supplier Communication Assistant" },
      { name: "StockCheck", title: "Inventory Reconciliation Assistant" },
      { name: "QuoteCompare", title: "Quote Comparison Assistant" },
      { name: "DemandFlow", title: "Demand Forecasting Assistant" }
    ],
    demoHeader: {
      eyebrow: "Demo",
      title: "See sample outputs before choosing where to start.",
      subtitle: "The first demo pages use sanitized mock inputs, outputs, map previews, and report structures. No real business data upload yet."
    },
    pricingHeader: {
      eyebrow: "Pricing",
      title: "Start Small. Solve One Real Problem.",
      subtitle: "Try a demo, buy one focused Skill, or customize it with your own data."
    },
    pricingCards: [
      {
        name: "Free Demo",
        price: "¥0",
        items: ["View RouteFlow / NetworkFlow examples", "View maps and outputs", "No real data upload", "No source code access"],
        cta: "View Free Demo"
      },
      {
        name: "Skill Lite",
        price: "From ¥199",
        items: ["RouteFlow Lite: ¥199", "NetworkFlow Lite: ¥399", "Standard templates", "Sample data", "Basic tutorial", "One-time use package"],
        cta: "Choose a Skill"
      },
      {
        name: "Custom Skill",
        price: "From ¥2999",
        items: ["Adapt to your real spreadsheet", "Modify fields and templates", "Custom report outputs", "Local deployment", "Remote walkthrough"],
        cta: "Customize a Skill"
      },
      {
        name: "AI Diagnosis",
        price: "¥999",
        items: ["60-minute interview", "Map one supply chain workflow", "Find 3 AI improvement points", "Prioritize next actions", "One-page recommendation"],
        cta: "Book Diagnosis"
      }
    ],
    pricingNotes: ["GoGlobal Supply Chain Diagnosis: ¥2999", "Decision Intelligence Project: From ¥8000"],
    casesHeader: {
      eyebrow: "Portfolio Case Library",
      title: "Turn supply chain problems into clear AI application cases.",
      subtitle: "Each case is documented through Problem / Data / Method / Output / Value / Limitation / Next Step, so it can support both career storytelling and real pilot validation."
    },
    cases: [
      {
        title: "RouteFlow: Short-haul delivery routing",
        audience: "Local delivery / small fleets / store replenishment",
        problem: "With multiple orders, vehicles, and constraints, manual routing is slow, error-prone, and hard to explain.",
        data: "Order sheets, addresses, vehicle capacity, time windows, volume, and depot location.",
        method: "Order sheet → address processing → constraint modeling → route solving → map and driver task outputs.",
        output: "Route plan, delivery sequence, driver task sheet, address exception alerts, and map preview.",
        value: "Reduce manual routing time and make route decisions easier to communicate.",
        limitation: "Real address parsing, abnormal orders, and last-minute changes still need human review.",
        nextStep: "Add richer address data, driver preferences, and dynamic order updates."
      },
      {
        title: "NetworkFlow: Warehouse network evaluation",
        audience: "Regional warehouse planning / outbound warehouse layout / dealer network optimization",
        problem: "Choosing warehouse locations, assigning demand, and balancing fixed cost with transport cost is hard to compare systematically.",
        data: "Demand cities, candidate sites, fixed cost, transport cost, service radius, and demand volume.",
        method: "Candidate screening → cost modeling → demand allocation → scenario comparison → map and report output.",
        output: "Recommended sites, demand allocation, coverage, cost breakdown, backup scenarios, and decision report.",
        value: "Turn a fuzzy warehouse-location discussion into comparable scenarios for faster first-round judgment.",
        limitation: "The model depends on input quality and does not yet cover inventory policy, tax, or detailed operating constraints.",
        nextStep: "Add multi-scenario parameters, service-level constraints, and sensitivity analysis."
      },
      {
        title: "QuoteCompare: Procurement quote comparison",
        audience: "Buyers / supplier management / small procurement teams",
        problem: "Supplier quotes use inconsistent formats and mix lead time, MOQ, freight, payment terms, and hidden costs.",
        data: "Supplier quote tables, lead time, MOQ, freight, payment terms, currency, and notes.",
        method: "Field standardization → quote normalization → hidden cost detection → negotiation point generation.",
        output: "Normalized quote table, difference highlights, hidden cost notes, and procurement recommendation summary.",
        value: "Help buyers understand true total cost and negotiation priorities faster.",
        limitation: "Supplier quality, relationship risk, and contract details still require professional judgment.",
        nextStep: "Turn it into a procurement workflow case together with StockCheck and SupplierMail."
      }
    ],
    beyond: {
      eyebrow: "Beyond Scripts",
      title: "More than a script",
      subtitle: "A single script is easy to copy. The real value is turning a supply chain problem into a usable, deliverable, reusable workflow.",
      cta: "Start a Pilot",
      items: ["Real context understanding", "Data template design", "Field and metric adaptation", "Workflow building", "Readable outputs", "Local deployment", "Simple tutorials", "Continuous improvement"]
    },
    community: {
      eyebrow: "Community Pilot",
      title: "Real Workflow Co-creation Program",
      subtitle: "3 free deployment spots per month.",
      body: "ChainFlow is not only a portfolio or a product experiment. It is also a way to test whether practical AI tools can help real businesses solve real supply chain problems.",
      fitTitle: "Who it fits",
      includesTitle: "What the free pilot includes",
      excludesTitle: "What it does not include",
      fit: ["A real supply chain, procurement, inventory, logistics, warehousing, or delivery problem", "A merchant or small business with a good reputation", "Serious long-term operation", "Friendly treatment of employees", "Willingness to provide sanitized data", "Willingness to provide real feedback", "Understanding that this is a small pilot, not a long-term free service"],
      includes: ["One clearly defined supply-chain-related problem", "One ChainFlow AI Skill", "One sanitized data trial run", "One basic result demo", "A short explanation or operating suggestion", "One feedback conversation"],
      excludes: ["Long-term maintenance", "Multiple rounds of complex customization", "ERP / WMS / SRM integration", "Large-scale data cleaning", "Unlimited revisions", "Sensitive data processing", "Commercial secret liability", "Long-term free consulting"],
      primaryCta: "Apply for Free Pilot",
      secondaryCta: "Start a Paid Pilot"
    },
    openNotes: {
      eyebrow: "Open Notes",
      title: "Selected non-sensitive notes",
      body: "ChainFlow may share selected non-sensitive templates, notes, and demo materials for supply chain practitioners to learn from. Production-ready tools, deployment packages, and customized workflows are provided through pilots and services.",
      cta: "View GitHub Notes"
    },
    futureHeader: {
      eyebrow: "Long-term Exploration",
      title: "From one toolkit toward deeper supply chain intelligence."
    },
    futureDirections: [
      { title: "Multi-tier Supply Maps", description: "Explore Tier-2 / Tier-3 risk, alternative paths, and deeper supplier relationships." },
      { title: "Early Risk Signals", description: "Detect unnamed risk patterns across heterogeneous signals." },
      { title: "Dynamic Procurement Strategy", description: "Bring price, FX, tariffs, lead time, and substitute constraints into one decision frame." }
    ],
    about: {
      eyebrow: "About",
      title: "Zilong Zhao / Zouleyou",
      subtitle: "Personal Product Lab",
      statement: "ChainFlow Lab is a personal product lab exploring practical AI applications in real supply chain workflows.",
      paragraphs: [
        "It is built by Zilong Zhao, a Supply Chain × AI practitioner focused on automotive supply chain, procurement operations, logistics optimization, supply chain resilience, Chinese companies going global, and AI agents for business workflows.",
        "ChainFlow starts from small, useful tools and gradually explores decision intelligence and network-level supply chain insight."
      ],
      focusLabel: "Focus areas",
      focusAreas: ["Automotive supply chains", "Procurement operations", "Logistics optimization", "Supply chain resilience", "China outbound business", "AI agents in real operating workflows"]
    },
    contact: {
      eyebrow: "Pilot",
      title: "Looking for the first 5 pilot users.",
      subtitle: "Bring one real supply chain problem.",
      body: "You can provide a sanitized spreadsheet or a real workflow problem. ChainFlow will judge whether it fits an AI toolkit or decision intelligence approach, then suggest a small pilot.",
      pilot: "Built for small business owners, shop owners, professional buyers, logistics / warehouse / operations leads, and teams expanding globally.",
      cta: "Start a Pilot",
      links: [
        { label: "Email", value: "zilong@chainflowlab.com", href: "mailto:zilong@chainflowlab.com" },
        { label: "WeChat", value: "Available by email", href: "mailto:zilong@chainflowlab.com" },
        { label: "GitHub", value: "Zilong0691", href: "https://github.com/Zilong0691" },
        { label: "Website", value: "chainflowlab.com", href: "https://chainflowlab.com" }
      ]
    },
    footer: {
      brand: "ChainFlow Lab",
      line: "AI-native tools and intelligence for global supply chain flow."
    }
  }
} as const;

export type ToolSlug = "routeflow" | "networkflow";

export const demoPages = {
  routeflow: {
    name: "RouteFlow",
    title: "短途配送排线助手",
    subtitle: "把订单表转化为车辆排线方案、司机任务表和地图预览。",
    price: "Free Demo ¥0 / Lite Version ¥199 买断 / Custom Development From ¥2999",
    inputTitle: "示例输入结构",
    outputTitle: "示例输出预览",
    reportTitle: "示例报告结构",
    inputs: ["订单编号", "收货地址", "货量", "时间窗", "车辆容量", "仓库起点"],
    outputs: ["车辆 A：7 单，预计 31.2 公里", "车辆 B：6 单，预计 28.7 公里", "车辆 C：5 单，预计 26.5 公里", "发现 1 个地址需人工复核"],
    report: ["路线概览", "司机任务表", "异常地址提示", "里程与装载率摘要"],
    primaryCta: "Get Lite Version",
    secondaryCta: "Customize This Skill"
  },
  networkflow: {
    name: "NetworkFlow",
    title: "仓网选址评估助手",
    subtitle: "基于需求城市、候选仓点和成本参数，快速比较仓网布局方案。",
    price: "Free Demo ¥0 / Lite Version ¥399 买断 / Custom Development From ¥2999",
    inputTitle: "示例输入结构",
    outputTitle: "示例输出预览",
    reportTitle: "示例报告结构",
    inputs: ["需求城市", "需求量", "候选仓城市", "固定成本", "运输成本", "服务半径"],
    outputs: ["推荐仓点：苏州 + 武汉", "覆盖率：94%", "成本下降：11.8%", "保留 2 个备用方案"],
    report: ["候选仓对比", "需求分配表", "成本拆分", "服务范围地图", "决策建议"],
    primaryCta: "Get Lite Version",
    secondaryCta: "Customize This Skill"
  }
} as const;
