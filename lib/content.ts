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
      { label: "Home", href: "#top" },
      { label: "Tools", href: "#skills" },
      { label: "Demo", href: "#demo" },
      { label: "Pricing", href: "#pricing" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    navCta: "Start a Pilot",
    hero: {
      eyebrow: "AI-native tools and intelligence for global supply chain flow.",
      brand: "ChainFlow",
      title: "让供应链，如水流动",
      subtitle: "给中小企业、采购人员和企业主的供应链 AI 工具箱。",
      body: "从一个小工具开始，帮你看懂、管好、省心、优化、高效你的供应链。",
      primaryCta: "Explore Tools",
      secondaryCta: "View Demo",
      tertiaryCta: "Start a Pilot"
    },
    threeWaysHeader: {
      eyebrow: "ChainFlow 做三件事",
      title: "省时间，做判断，看见网络。",
      subtitle: "Three ways ChainFlow helps supply chains flow better."
    },
    threeWays: [
      {
        layer: "Efficiency Layer",
        title: "帮你省时间",
        englishTitle: "Save Time",
        description: "把重复、耗时、容易出错的供应链工作做成 AI Skill。",
        englishDescription: "Turn repetitive supply chain work into practical AI Skills.",
        examples: ["Excel 处理", "采购邮件", "报价对比", "库存核对", "配送排线", "仓网初步评估"]
      },
      {
        layer: "Decision Layer",
        title: "帮你做判断",
        englishTitle: "Improve Decisions",
        description: "把库存、需求、采购、供应商和物流数据转化为更好的决策。",
        englishDescription: "Turn supply chain data into clearer decisions.",
        examples: ["库存预测", "需求风险判断", "供应商评估", "采购策略建议", "物流与仓网优化"]
      },
      {
        layer: "Network Layer",
        title: "帮你看见网络",
        englishTitle: "See the Network",
        description: "长期探索更深层的供应链风险、机会和连接。",
        englishDescription: "Explore deeper risks, opportunities, and connections across supply chains.",
        examples: ["多层供应链图谱", "Tier-2 / Tier-3 风险", "替代供应商路径", "全球机会发现", "中国企业出海连接"]
      }
    ],
    layersHeader: {
      eyebrow: "Efficiency → Decision → Network",
      title: "先解决一个具体问题，再逐步走向供应链智能。",
      subtitle: "客户先拿到可用结果，ChainFlow 再把一个个工具沉淀成更完整的供应链工作流。"
    },
    layers: [
      {
        number: "01",
        title: "Efficiency",
        summary: "把一线团队每天都在做的重复工作变成可交付的小工具。",
        scenes: ["订单整理", "表格清洗", "邮件草稿", "排线计算", "库存核对"],
        keywords: ["省时间", "少出错", "能交付"]
      },
      {
        number: "02",
        title: "Decision",
        summary: "把分散数据整理成老板和负责人能看懂的判断依据。",
        scenes: ["库存预测", "需求判断", "仓网评估", "供应商评分", "采购策略"],
        keywords: ["看懂数据", "比较方案", "辅助决策"]
      },
      {
        number: "03",
        title: "Network",
        summary: "长期探索多层供应链图谱、风险信号和全球机会发现。",
        scenes: ["供应商网络", "替代路径", "出海连接", "风险信号", "机会发现"],
        keywords: ["未来探索", "看见连接", "发现机会"]
      }
    ],
    toolsHeader: {
      eyebrow: "AI Skills for Supply Chain Work",
      title: "每个 Skill 都是一把瑞士军刀。",
      subtitle: "你可以只用一个小工具解决一个问题，也可以把多个 Skill 打包成完整服务。"
    },
    toolsDemoCta: "View Free Demo",
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
        title: "短途配送排线助手",
        value: "把订单表转化为车辆排线方案、配送顺序和可视化路线图。",
        problem: "人工排线耗时、易错、难以优化。",
        bestFor: ["同城配送", "小车队", "门店补货", "区域分拨"],
        inputs: ["订单表", "地址", "车辆", "时间窗", "货量"],
        outputs: ["路线方案", "司机任务表", "地图", "简短报告"],
        pricing: "Demo ¥0 / Lite ¥199 / Custom from ¥2999",
        status: "Demo Ready",
        cta: "View Demo",
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
        pricing: "Demo ¥0 / Lite ¥399 / Custom from ¥2999",
        status: "Demo Ready",
        cta: "View Demo",
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
    comingSoonHeader: "Coming Soon",
    comingSoonTools: [
      { name: "SupplierMail", title: "供应商沟通助手" },
      { name: "StockCheck", title: "库存核对助手" },
      { name: "QuoteCompare", title: "报价对比助手" },
      { name: "DemandLite", title: "轻量需求预测助手" }
    ],
    demoHeader: {
      eyebrow: "Demo",
      title: "先看示例效果，再决定从哪一个问题开始。",
      subtitle: "第一版 Demo 只展示脱敏 mock 输入、输出、地图预览和报告结构，不上传真实业务数据。"
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
    beyond: {
      eyebrow: "Beyond Scripts",
      title: "不止是一段代码",
      subtitle: "单个脚本很容易被复制，但真正有价值的是把供应链问题变成可运行、可交付、可复用的工作流。",
      cta: "Start a Pilot",
      items: ["真实场景理解", "数据模板设计", "字段和口径适配", "工作流搭建", "可读输出", "本地部署", "傻瓜教程", "持续优化"]
    },
    futureHeader: {
      eyebrow: "Long-term Exploration",
      title: "从一个 Skill，走向更深的供应链智能。"
    },
    futureDirections: [
      { title: "多层供应链图谱", description: "探索 Tier-2 / Tier-3 风险、替代路径和深层供应关系。" },
      { title: "早期风险信号", description: "从多源数据里识别还没有被命名的风险模式。" },
      { title: "动态采购策略", description: "把价格、汇率、关税、交期和替代料约束放在同一个判断框架里。" }
    ],
    about: {
      eyebrow: "About",
      title: "赵子龙 / 走了尤",
      subtitle: "Supply Chain × AI Builder",
      statement: "去掉冗余，保留本质，让复杂系统更轻、更顺、更有流动性。",
      paragraphs: [
        "ChainFlow 是一次长期探索：从实用工具开始，逐步走向决策智能、风险感知和全球连接。",
        "我关注真实业务里的小摩擦：一张表、一封邮件、一次排线、一个仓网选择，先把它们做成可用工具。"
      ],
      focusLabel: "我关注",
      focusAreas: ["汽车供应链", "采购运营", "物流优化", "供应链韧性", "中国企业出海", "AI Agent 在真实业务场景中的落地"]
    },
    contact: {
      eyebrow: "Pilot",
      title: "Looking for the first 5 pilot users.",
      subtitle: "正在寻找前 5 个真实供应链场景试点用户。",
      body: "你可以提供一个脱敏表格或一个真实流程问题。ChainFlow 会判断是否适合用 AI Skill 或决策智能方法解决，并给出一个小试点建议。",
      pilot: "适合中小企业老板、个人店铺老板、职业采购人员、物流 / 仓储 / 运营负责人和准备出海的小团队。",
      cta: "Start a Pilot",
      links: [
        { label: "Email", value: "your-email@example.com", href: "mailto:your-email@example.com" },
        { label: "WeChat", value: "待补充", href: "#contact" },
        { label: "GitHub", value: "待补充", href: "#contact" },
        { label: "Domain", value: "chainflowlab.com", href: "#contact" }
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
      { label: "Tools", href: "#skills" },
      { label: "Demo", href: "#demo" },
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
      primaryCta: "Explore Tools",
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
      eyebrow: "AI Skills for Supply Chain Work",
      title: "Each Skill is one tool in the Swiss army knife.",
      subtitle: "Use one focused tool for one problem, or combine multiple Skills into a service package."
    },
    toolsDemoCta: "View Free Demo",
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
        pricing: "Demo ¥0 / Lite ¥199 / Custom from ¥2999",
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
        pricing: "Demo ¥0 / Lite ¥399 / Custom from ¥2999",
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
      { name: "DemandLite", title: "Lightweight Demand Forecasting Assistant" }
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
        items: ["View RouteFlow / NetworkFlow samples", "See map and output previews", "No real data upload", "No source code access"],
        cta: "View Free Demo"
      },
      {
        name: "Skill Lite",
        price: "From ¥199",
        items: ["RouteFlow Lite: ¥199", "NetworkFlow Lite: ¥399", "Standard templates", "Sample data", "Basic tutorial", "One-time purchase"],
        cta: "Choose a Skill"
      },
      {
        name: "Custom Skill",
        price: "From ¥2999",
        items: ["Adapt your real spreadsheets", "Modify fields and templates", "Custom output reports", "Local deployment", "Remote walkthrough"],
        cta: "Customize a Skill"
      },
      {
        name: "AI Diagnosis",
        price: "¥999",
        items: ["60-minute interview", "Map one supply chain workflow", "Find 3 AI transformation points", "Prioritize next steps", "One-page recommendation"],
        cta: "Book Diagnosis"
      }
    ],
    pricingNotes: ["GoGlobal Supply Chain Diagnosis: ¥2999", "Decision Intelligence Project: From ¥8000"],
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
        { label: "Email", value: "your-email@example.com", href: "mailto:your-email@example.com" },
        { label: "WeChat", value: "Coming Soon", href: "#contact" },
        { label: "GitHub", value: "Coming Soon", href: "#contact" },
        { label: "Domain", value: "chainflowlab.com", href: "#contact" }
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
    price: "Lite ¥199 / Custom from ¥2999",
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
    price: "Lite ¥399 / Custom from ¥2999",
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
