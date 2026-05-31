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
      { label: "关于", href: "#about" },
      { label: "联系", href: "#contact" }
    ],
    navCta: "预约试点",
    hero: {
      eyebrow: "供应链 AI 工具包与决策智能",
      brand: "ChainFlow",
      title: "让供应链，如水流动",
      subtitle: "给中小企业、采购人员和企业主的供应链 AI 工具箱。",
      body: "从一个小工具开始，帮你看懂、管好、省心、优化、高效你的供应链。",
      primaryCta: "查看工具包",
      secondaryCta: "体验 Demo",
      tertiaryCta: "预约试点"
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
        description: "把重复、耗时、容易出错的供应链工作做成 AI 工具包。",
        englishDescription: "",
        examples: ["Excel 处理", "采购邮件", "报价对比", "库存核对", "配送排线", "仓网初步评估"]
      },
      {
        layer: "决策层",
        title: "帮你做判断",
        englishTitle: "Improve Decisions",
        description: "把库存、需求、采购、供应商和物流数据转化为更好的决策。",
        englishDescription: "",
        examples: ["库存预测", "需求风险判断", "供应商评估", "采购策略建议", "物流与仓网优化"]
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
      eyebrow: "供应链 AI 工具包",
      title: "每个工具包，先解决一个具体问题。",
      subtitle: "你可以先免费体验一个脱敏 Demo，再选择单个标准版工具，或把多个工具包组合成完整服务。"
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
        pricing: "Demo ¥0 / 标准版 ¥199 / 定制开发 ¥2999（一周交付）",
        status: "可体验 Demo",
        cta: "体验 Demo",
        href: commonToolLinks.routeflow,
        demoInput: ["18 个订单", "3 台车辆", "2 个时间窗", "单仓出发"],
        demoOutput: ["3 条配送路线", "预计里程 86.4 公里", "车辆装载率 82%", "异常地址 1 个"],
        plans: [
          { name: "Demo", price: "¥0", cta: "体验 Demo" },
          { name: "标准版", price: "¥199", cta: "购买标准版" },
          { name: "定制开发", price: "¥2999", cta: "一周交付" }
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
        pricing: "Demo ¥0 / 标准版 ¥399 / 定制开发 ¥2999（一周交付）",
        status: "可体验 Demo",
        cta: "体验 Demo",
        href: commonToolLinks.networkflow,
        demoInput: ["9 个需求城市", "5 个候选仓", "固定成本约束", "服务半径 350 公里"],
        demoOutput: ["推荐 2 个仓点", "覆盖率 94%", "成本下降 11.8%", "备用方案 2 个"],
        plans: [
          { name: "Demo", price: "¥0", cta: "体验 Demo" },
          { name: "标准版", price: "¥399", cta: "购买标准版" },
          { name: "定制开发", price: "¥2999", cta: "一周交付" }
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
      eyebrow: "价格",
      title: "从一个真实问题开始，小步验证价值。",
      subtitle: "Demo 免费，标准版适合直接使用，定制开发适合接入你的真实字段和流程。"
    },
    pricingCards: [
      {
        name: "Demo",
        price: "¥0",
        items: ["体验脱敏可交互界面", "查看地图、指标和报告样式", "不上传真实数据", "适合先判断工具是否有用"],
        cta: "体验 Demo"
      },
      {
        name: "标准版",
        price: "¥199 / ¥399",
        items: ["RouteFlow 标准版：¥199", "NetworkFlow 标准版：¥399", "标准模板和示例数据", "基础教程", "适合单点问题快速落地"],
        cta: "选择工具包"
      },
      {
        name: "定制开发",
        price: "¥2999",
        items: ["一周交付首版", "适配你的真实表格字段", "修改计算逻辑和报告模板", "本地部署或私有交付", "远程讲解"],
        cta: "定制开发"
      },
      {
        name: "组合服务",
        price: "¥999 起",
        items: ["梳理一个供应链流程", "找出 3 个 AI 可改造点", "组合多个工具包", "给出优先级和实施路径", "适合老板和负责人快速判断"],
        cta: "预约诊断"
      }
    ],
    pricingNotes: ["标准版适合单个问题快速试用", "定制开发默认一周交付可运行首版"],
    casesHeader: {
      eyebrow: "案例与学习资料",
      title: "把供应链人的日常问题，变成可演示、可交付的工具包。",
      subtitle: "这些案例既可以作为学习材料，也可以直接说明某个工具包适合解决什么问题。"
    },
    cases: [
      {
        title: "门店补货线路太乱",
        audience: "个人店铺老板 / 小车队负责人",
        pain: "每天订单地址变化，人工排线靠经验，司机路线绕、临时改动多。",
        skill: "使用 RouteFlow",
        result: "10 分钟生成车辆分配、配送顺序、异常地址提醒和司机任务表。"
      },
      {
        title: "区域仓应该放在哪",
        audience: "企业主 / 运营负责人",
        pain: "几个候选城市都看似合理，但租金、覆盖率、运输成本很难同时比较。",
        skill: "使用 NetworkFlow",
        result: "快速比较 2 仓 / 3 仓方案，输出覆盖率、成本拆分和备用方案。"
      },
      {
        title: "采购报价表看不清",
        audience: "职业采购人员",
        pain: "不同供应商报价口径不一致，交期、MOQ、运费和付款条件混在一起。",
        skill: "后续 QuoteCompare",
        result: "把报价统一口径，标出隐藏成本和推荐谈判点。"
      }
    ],
    beyond: {
      eyebrow: "不止脚本",
      title: "不止是一段代码",
      subtitle: "单个脚本很容易被复制，但真正有价值的是把供应链问题变成可运行、可交付、可复用的工作流。",
      cta: "预约试点",
      items: ["真实场景理解", "数据模板设计", "字段和口径适配", "工作流搭建", "可读输出", "本地部署", "傻瓜教程", "持续优化"]
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
      subtitle: "供应链 × AI 工具构建",
      statement: "去掉冗余，保留本质，让复杂系统更轻、更顺、更有流动性。",
      paragraphs: [
        "ChainFlow 是一次长期探索：从实用工具开始，逐步走向决策智能、风险感知和全球连接。",
        "我关注真实业务里的小摩擦：一张表、一封邮件、一次排线、一个仓网选择，先把它们做成可用工具。"
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
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    navCta: "Start a Pilot",
    hero: {
      eyebrow: "AI-native tools and intelligence for global supply chain flow.",
      brand: "ChainFlow",
      title: "Let supply chains flow like water",
      subtitle: "A supply chain AI toolbox for small businesses, buyers, and operators.",
      body: "Start with one focused tool to understand, manage, optimize, and simplify your supply chain work.",
      primaryCta: "Explore Toolkits",
      secondaryCta: "View Demo",
      tertiaryCta: "Start a Pilot"
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
        englishDescription: "Turn repetitive supply chain work into practical AI Skills.",
        examples: ["Excel processing", "Procurement email", "Quote comparison", "Inventory checks", "Delivery routing", "Warehouse screening"]
      },
      {
        layer: "Decision Layer",
        title: "Improve Decisions",
        englishTitle: "Improve Decisions",
        description: "Turn inventory, demand, procurement, supplier, and logistics data into clearer decisions.",
        englishDescription: "Turn supply chain data into clearer decisions.",
        examples: ["Inventory forecasting", "Demand risk", "Supplier evaluation", "Procurement strategy", "Logistics and warehouse optimization"]
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
      eyebrow: "Supply Chain AI Toolkits",
      title: "Each toolkit solves one concrete problem first.",
      subtitle: "Try a sanitized interactive demo, buy one standard toolkit, or combine multiple toolkits into a service package."
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
        pricing: "Demo ¥0 / Standard ¥199 / Custom Development ¥2999 (one-week delivery)",
        status: "Demo Ready",
        cta: "View Demo",
        href: commonToolLinks.routeflow,
        demoInput: ["18 orders", "3 vehicles", "2 time windows", "Single depot"],
        demoOutput: ["3 delivery routes", "86.4 km estimated distance", "82% load rate", "1 address exception"],
        plans: [
          { name: "Demo", price: "¥0", cta: "View Demo" },
          { name: "Standard", price: "¥199", cta: "Get Standard" },
          { name: "Custom Development", price: "¥2999", cta: "One-week delivery" }
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
        pricing: "Demo ¥0 / Standard ¥399 / Custom Development ¥2999 (one-week delivery)",
        status: "Demo Ready",
        cta: "View Demo",
        href: commonToolLinks.networkflow,
        demoInput: ["9 demand cities", "5 candidate sites", "Fixed cost constraints", "350 km service radius"],
        demoOutput: ["2 recommended sites", "94% coverage", "11.8% cost reduction", "2 backup scenarios"],
        plans: [
          { name: "Demo", price: "¥0", cta: "View Demo" },
          { name: "Standard", price: "¥399", cta: "Get Standard" },
          { name: "Custom Development", price: "¥2999", cta: "One-week delivery" }
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
      title: "Start with one real problem and prove value quickly.",
      subtitle: "Demo is free, Standard is ready to use, and Custom Development adapts to your real fields and workflow."
    },
    pricingCards: [
      {
        name: "Demo",
        price: "¥0",
        items: ["Try sanitized interactive interfaces", "View maps, metrics, and report samples", "No real data upload", "Best for evaluating fit first"],
        cta: "Try Demo"
      },
      {
        name: "Standard",
        price: "¥199 / ¥399",
        items: ["RouteFlow Standard: ¥199", "NetworkFlow Standard: ¥399", "Standard templates and sample data", "Basic tutorial", "Built for one focused workflow"],
        cta: "Choose a Toolkit"
      },
      {
        name: "Custom Development",
        price: "¥2999",
        items: ["First working version in one week", "Adapt your real spreadsheet fields", "Modify logic and report templates", "Local or private delivery", "Remote walkthrough"],
        cta: "Customize"
      },
      {
        name: "Service Package",
        price: "From ¥999",
        items: ["Map one supply chain workflow", "Find 3 AI transformation points", "Combine multiple toolkits", "Prioritize implementation", "For owners and operators"],
        cta: "Book Diagnosis"
      }
    ],
    pricingNotes: ["Standard is for one focused problem", "Custom Development includes a working first version in one week"],
    casesHeader: {
      eyebrow: "Cases and Learning",
      title: "Turn everyday supply chain problems into demonstrable, deliverable toolkits.",
      subtitle: "These cases can work as learning materials and as clear examples of which toolkit solves which problem."
    },
    cases: [
      {
        title: "Store replenishment routes are messy",
        audience: "Shop owners / small fleet leads",
        pain: "Orders change every day, routes depend on experience, and drivers keep making last-minute adjustments.",
        skill: "Use RouteFlow",
        result: "Generate vehicle assignment, delivery sequence, exception alerts, and driver task sheets in minutes."
      },
      {
        title: "Where should the regional warehouse go?",
        audience: "Business owners / operations leads",
        pain: "Several cities look reasonable, but rent, coverage, and transport cost are hard to compare together.",
        skill: "Use NetworkFlow",
        result: "Compare 2-warehouse and 3-warehouse scenarios with coverage, cost breakdowns, and backup options."
      },
      {
        title: "Procurement quotes are hard to read",
        audience: "Professional buyers",
        pain: "Supplier quotes use different terms, mixing lead time, MOQ, freight, and payment conditions.",
        skill: "Upcoming QuoteCompare",
        result: "Normalize quote terms, expose hidden costs, and highlight negotiation points."
      }
    ],
    beyond: {
      eyebrow: "Beyond Scripts",
      title: "More than a script",
      subtitle: "A single script is easy to copy. The real value is turning a supply chain problem into a usable, deliverable, reusable workflow.",
      cta: "Start a Pilot",
      items: ["Real context understanding", "Data template design", "Field and metric adaptation", "Workflow building", "Readable outputs", "Local deployment", "Simple tutorials", "Continuous improvement"]
    },
    futureHeader: {
      eyebrow: "Long-term Exploration",
      title: "From one Skill toward deeper supply chain intelligence."
    },
    futureDirections: [
      { title: "Multi-tier Supply Maps", description: "Explore Tier-2 / Tier-3 risk, alternative paths, and deeper supplier relationships." },
      { title: "Early Risk Signals", description: "Detect unnamed risk patterns across heterogeneous signals." },
      { title: "Dynamic Procurement Strategy", description: "Bring price, FX, tariffs, lead time, and substitute constraints into one decision frame." }
    ],
    about: {
      eyebrow: "About",
      title: "Zilong Zhao / Zouleyou",
      subtitle: "Supply Chain × AI Builder",
      statement: "Remove the redundant, keep the essential, and make complex systems lighter, smoother, and more fluid.",
      paragraphs: [
        "ChainFlow is a long-term exploration, starting from practical tools and moving toward decision intelligence, risk sensing, and global connection.",
        "I focus on small frictions inside real workflows: one sheet, one email, one route plan, one warehouse choice, and turning them into usable tools."
      ],
      focusLabel: "Focus areas",
      focusAreas: ["Automotive supply chains", "Procurement operations", "Logistics optimization", "Supply chain resilience", "China outbound business", "AI agents in real operating workflows"]
    },
    contact: {
      eyebrow: "Pilot",
      title: "Looking for the first 5 pilot users.",
      subtitle: "Bring one real supply chain problem.",
      body: "You can provide a sanitized spreadsheet or a real workflow problem. ChainFlow will judge whether it fits an AI Skill or decision intelligence approach, then suggest a small pilot.",
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
    price: "Demo ¥0 / 标准版 ¥199 / 定制开发 ¥2999（一周交付）",
    inputTitle: "示例输入结构",
    outputTitle: "示例输出预览",
    reportTitle: "示例报告结构",
    inputs: ["订单编号", "收货地址", "货量", "时间窗", "车辆容量", "仓库起点"],
    outputs: ["车辆 A：7 单，预计 31.2 公里", "车辆 B：6 单，预计 28.7 公里", "车辆 C：5 单，预计 26.5 公里", "发现 1 个地址需人工复核"],
    report: ["路线概览", "司机任务表", "异常地址提示", "里程与装载率摘要"],
    primaryCta: "购买标准版",
    secondaryCta: "定制开发"
  },
  networkflow: {
    name: "NetworkFlow",
    title: "仓网选址评估助手",
    subtitle: "基于需求城市、候选仓点和成本参数，快速比较仓网布局方案。",
    price: "Demo ¥0 / 标准版 ¥399 / 定制开发 ¥2999（一周交付）",
    inputTitle: "示例输入结构",
    outputTitle: "示例输出预览",
    reportTitle: "示例报告结构",
    inputs: ["需求城市", "需求量", "候选仓城市", "固定成本", "运输成本", "服务半径"],
    outputs: ["推荐仓点：苏州 + 武汉", "覆盖率：94%", "成本下降：11.8%", "保留 2 个备用方案"],
    report: ["候选仓对比", "需求分配表", "成本拆分", "服务范围地图", "决策建议"],
    primaryCta: "购买标准版",
    secondaryCta: "定制开发"
  }
} as const;
