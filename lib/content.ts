export type Language = "zh" | "en";

export const languageOptions: Array<{ code: Language; label: string }> = [
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" }
];

export const siteContent = {
  zh: {
    nav: [
      { label: "愿景", href: "#vision" },
      { label: "工具", href: "#skills" },
      { label: "案例", href: "#cases" },
      { label: "服务", href: "#services" },
      { label: "关于", href: "#about" },
      { label: "联系", href: "#contact" }
    ],
    navCta: "预约交流",
    hero: {
      eyebrow: "从任务到决策，从风险到机会",
      brand: "ChainFlow",
      title: "让供应链，如水流动",
      subtitle: "面向供应链场景的 AI 工具原型与决策智能探索。",
      body: "ChainFlow 从具体业务问题出发，把订单、仓网、库存、采购沟通等工作流变成更清晰、更可执行的 AI 工具。",
      primaryCta: "查看工具原型",
      secondaryCta: "预约交流"
    },
    why: {
      eyebrow: "为什么是 ChainFlow",
      title: "全球供应链正在变得更加复杂。",
      subtitle: "企业出海、地缘变化、市场波动、库存压力、供应商风险和信息不对称，都在增加系统中的摩擦。",
      paragraphs: [
        "ChainFlow 相信：未来最有价值的企业，不是拥有更多信息，而是拥有更好的判断能力、连接能力和行动能力。",
        "第一版从可落地的 AI 工具原型开始，用真实工具减少重复劳动，让数据和经验逐步沉淀成可以复用的供应链智能。"
      ]
    },
    flowSteps: [
      { term: "数据", description: "原始信息与业务数据" },
      { term: "信号", description: "有价值的变化信号" },
      { term: "洞察", description: "对风险与机会的判断" },
      { term: "行动", description: "可执行的工具与建议" },
      { term: "流动", description: "更顺畅的供应链协同" }
    ],
    layersHeader: {
      eyebrow: "能力层级",
      title: "从具体任务，到业务决策，再到供应链网络",
      subtitle: "先从可落地的小工具开始，逐步沉淀成可复用的业务智能。"
    },
    layers: [
      {
        number: "01",
        title: "减少摩擦",
        summary: "用 AI 减少供应链团队里的重复劳动。",
        coversLabel: "覆盖场景",
        scenes: ["邮件", "表格", "采购", "库存", "调度", "数据清洗"],
        keywords: ["表格自动化", "采购助手", "库存核对", "物流调度", "工作流工具"]
      },
      {
        number: "02",
        title: "改善决策",
        summary: "把分散数据整理成更清晰的判断依据。",
        coversLabel: "覆盖场景",
        scenes: ["需求预测", "库存优化", "采购策略", "供应商评估", "牛鞭效应分析"],
        keywords: ["需求预测", "库存优化", "供应商评分", "采购策略", "风险判断"]
      },
      {
        number: "03",
        title: "创造连接",
        summary: "帮助企业发现供应商、客户、采购机会、替代路径和全球合作网络。",
        coversLabel: "覆盖场景",
        scenes: ["中国企业出海", "供应商发现", "采购机会匹配", "替代供应链路径", "全球供应链机会"],
        keywords: ["供应商匹配", "全球机会", "风险感知", "替代采购", "出海供应链"]
      }
    ],
    skillsHeader: {
      eyebrow: "工具原型",
      title: "先展示两个可用原型，另外两个作为后续方向。",
      subtitle: "RouteFlow 和 NetworkFlow 已可用样例演示；库存核对与供应商沟通目前是规划中的下一批工作流。"
    },
    skillsDemoCta: "查看样例",
    skills: [
      {
        name: "RouteFlow",
        title: "短途配送排线助手",
        value: "上传订单表，生成车辆排线方案、配送顺序和路线结果。",
        problem: "中小团队每天面对大量订单、车辆、地址和时间窗时，人工排线耗时、易错、难以优化。",
        inputs: ["订单表", "收货地址", "货量", "时间窗", "车辆数量", "车辆容量", "仓库起点"],
        outputs: ["排线表", "配送顺序", "路径结果", "结构化数据", "地图样例", "简短分析报告"],
        scenes: ["同城配送", "门店补货", "区域分拨", "小型车队调度", "临时配送计划"],
        status: "原型可演示",
        cta: "预约演示",
        demoTitle: "网页样例演示",
        demoInputLabel: "样例输入",
        demoOutputLabel: "样例输出",
        demoInput: ["18 个订单", "3 台车辆", "2 个时间窗", "单仓出发"],
        demoOutput: ["3 条配送路线", "预计里程 86.4 公里", "车辆装载率 82%", "异常地址 1 个"]
      },
      {
        name: "NetworkFlow",
        title: "仓网选址评估助手",
        value: "基于需求城市、候选仓点和成本参数，快速比较仓网布局方案。",
        problem: "仓网布局需要同时考虑固定成本、运输成本、需求分配、服务范围和风险，人工评估很难系统比较不同方案。",
        inputs: ["需求城市", "需求量", "候选仓城市", "固定成本", "运输成本", "服务半径", "时效要求"],
        outputs: ["推荐仓点", "需求分配", "成本拆分", "多方案比较", "地图样例", "决策报告"],
        scenes: ["区域仓规划", "出海仓布局", "经销网络优化", "候选城市比较", "配送网络重构"],
        status: "原型可演示",
        cta: "讨论场景",
        demoTitle: "网页样例演示",
        demoInputLabel: "样例输入",
        demoOutputLabel: "样例输出",
        demoInput: ["9 个需求城市", "5 个候选仓", "固定成本约束", "服务半径 350 公里"],
        demoOutput: ["推荐 2 个仓点", "覆盖率 94%", "成本下降 11.8%", "备用方案 2 个"]
      },
      {
        name: "Inventory Agent",
        title: "库存核对助手",
        value: "辅助系统库存、实物库存和表格记录之间的核对。",
        problem: "库存系统、实物和表格之间容易出现差异，人工核对耗时且易遗漏。",
        inputs: ["系统导出表", "盘点表", "库存台账"],
        outputs: ["核对清单", "差异记录", "处理建议"],
        scenes: ["库存盘点", "账实核对", "异常追踪"],
        status: "规划中",
        cta: "加入等待",
        demoTitle: "暂不提供网页演示",
        demoInputLabel: "计划输入",
        demoOutputLabel: "计划输出",
        demoInput: ["库存表", "盘点表", "异常记录"],
        demoOutput: ["差异识别", "处理优先级", "复核清单"]
      },
      {
        name: "Supplier Agent",
        title: "供应商沟通助手",
        value: "辅助采购询价、交期跟进、邮件生成和沟通记录沉淀。",
        problem: "采购沟通中存在大量重复邮件、交期跟进和信息整理工作。",
        inputs: ["询价需求", "供应商资料", "邮件记录"],
        outputs: ["邮件草稿", "供应商记录", "跟进清单"],
        scenes: ["采购询价", "交期跟进", "供应商信息整理"],
        status: "规划中",
        cta: "后续开放",
        demoTitle: "暂不提供网页演示",
        demoInputLabel: "计划输入",
        demoOutputLabel: "计划输出",
        demoInput: ["询价单", "联系人", "历史沟通"],
        demoOutput: ["邮件草稿", "跟进提醒", "供应商摘要"]
      }
    ],
    labels: {
      problem: "问题",
      input: "输入",
      output: "输出",
      method: "方法",
      covers: "适用场景"
    },
    casesHeader: {
      eyebrow: "案例库",
      title: "把课堂原型，整理成可展示的供应链工作流。",
      subtitle: "前两个案例已具备样例演示基础，后两个用于说明后续产品方向。"
    },
    cases: [
      {
        number: "案例 01",
        title: "短途配送排线助手",
        product: "RouteFlow",
        problem: "多订单、多车辆、多地址、多时间窗下，人工排线耗时且难以优化。",
        method: "把订单表转化为路径优化问题，结合车辆容量、时间窗和地址坐标生成可执行路线。",
        output: "排线表、配送顺序、结构化数据、交互式地图样例。",
        status: "原型可演示",
        cta: "预约演示"
      },
      {
        number: "案例 02",
        title: "仓网选址评估助手",
        product: "NetworkFlow",
        problem: "仓网选址涉及固定成本、运输成本、需求分配和服务范围，人工比较方案效率低且不够系统。",
        method: "基于候选仓、需求城市和成本参数建立选址评估模型，输出推荐方案和多维分析结果。",
        output: "推荐仓点、需求分配、成本拆分、方案比较、地图样例。",
        status: "原型可演示",
        cta: "讨论场景"
      },
      {
        number: "案例 03",
        title: "库存核对工作流",
        product: "Inventory Agent",
        problem: "库存系统、实物和表格之间容易出现差异，人工核对耗时且易遗漏。",
        method: "规划为差异检测、复核清单和处理建议组合的工作流。",
        output: "核对清单、差异记录、处理建议。",
        status: "规划中",
        cta: "加入等待"
      },
      {
        number: "案例 04",
        title: "供应商沟通工作流",
        product: "Supplier Agent",
        problem: "采购沟通中存在大量重复邮件、交期跟进和信息整理工作。",
        method: "规划为询价、邮件草稿、交期跟进和供应商摘要组合的工作流。",
        output: "邮件草稿、供应商记录、跟进清单。",
        status: "规划中",
        cta: "后续开放"
      }
    ],
    beyond: {
      eyebrow: "不止脚本",
      title: "不止是一段代码",
      subtitle: "单个脚本很容易被复制，真正有价值的是把供应链问题变成可运行、可交付、可复用的工作流。",
      cta: "讨论你的场景",
      items: ["理解真实供应链场景", "设计可用的数据模板", "清洗和适配业务数据", "构建完整工作流", "输出一线团队能看懂的结果", "提供部署、教程和持续优化"]
    },
    roadmapHeader: {
      eyebrow: "产品化路径",
      title: "原型 → 模板 → 试点 → 部署",
      subtitle: "ChainFlow 不把粗糙脚本包装成产品，而是从可运行原型走向真实业务采用。"
    },
    roadmap: [
      { title: "原型", description: "已有可运行样例" },
      { title: "模板", description: "沉淀标准输入模板和输出格式" },
      { title: "试点", description: "基于真实业务数据测试" },
      { title: "部署", description: "本地部署、教程、培训和持续优化" }
    ],
    servicesHeader: {
      eyebrow: "供应链 AI 服务",
      title: "从一个具体痛点开始，做成可用工具。",
      subtitle: "适合想先从一个真实供应链流程试点，再逐步产品化的小团队和企业。"
    },
    servicesCta: "开始试点",
    services: [
      {
        name: "入门",
        title: "AI 工作流工具",
        fit: "个人、小团队、采购/物流/供应链从业者。",
        description: "适合第一批早期试点用户。",
        items: ["诊断一个具体低效流程", "设计表格、邮件、库存或采购相关工具", "提供本地运行版本", "配套标准模板", "配套操作教程", "远程指导部署"],
        cta: "开始试点"
      },
      {
        name: "原型",
        title: "原型定制",
        fit: "对 RouteFlow 或 NetworkFlow 有类似需求的团队。",
        description: "把已有原型改造成更贴近真实数据的可演示版本。",
        items: ["按真实业务数据适配字段", "调整输入模板", "调整输出报告", "配置地图、成本、车辆和仓库参数", "生成可演示版本"],
        cta: "定制原型"
      },
      {
        name: "决策",
        title: "供应链决策支持",
        fit: "中小制造企业、贸易公司、供应链团队。",
        description: "把分散数据整理成能辅助判断的轻量决策工具。",
        items: ["库存分析", "需求预测", "供应商评分", "采购策略建议", "简易可视化看板"],
        cta: "讨论数据"
      },
      {
        name: "出海",
        title: "出海供应链情报",
        fit: "准备出海或正在出海的中国企业。",
        description: "为出海场景建立更顺畅的供应链路径判断。",
        items: ["目标市场供应链调研", "风险地图", "供应商、物流和海外仓伙伴发现", "本地化供应链路径建议"],
        cta: "探索出海"
      }
    ],
    futureHeader: {
      eyebrow: "长期方向",
      title: "做供应链流动背后的智能层。"
    },
    futureDirections: [
      { title: "供应链智能", description: "把信息转化为判断，把判断转化为行动。" },
      { title: "全球机会发现", description: "帮助企业发现供应商、客户、采购机会和合作网络。" },
      { title: "产业 AI 服务", description: "把 AI 从演示带到真实供应链流程中。" }
    ],
    about: {
      eyebrow: "关于建设者",
      title: "赵子龙",
      subtitle: "供应链 × AI 建设者",
      statement: "我关注的是一个很朴素的问题：怎样让复杂的供应链流程变得更轻、更顺、更可执行。",
      paragraphs: [
        "ChainFlow 是一次长期探索：从实用工具开始，逐步走向决策智能、风险感知和全球连接。",
        "它不是一套宏大的空中系统，而是先进入真实流程，理解重复劳动、信息断点、库存压力和供应商协同中的小摩擦。"
      ],
      focusLabel: "关注方向",
      focusAreas: ["汽车供应链", "采购运营", "物流优化", "供应链韧性", "中国企业出海", "AI 工具在真实业务场景中的落地"]
    },
    contact: {
      eyebrow: "联系",
      title: "一起把供应链做得更顺。",
      subtitle: "让供应链，如水流动。",
      body: "如果你正在探索供应链 AI、企业出海、物流优化、库存预测、采购流程自动化，欢迎交流。",
      pilot: "正在寻找第一批真实供应链场景与试点用户。",
      cta: "预约交流",
      links: [
        { label: "邮箱", value: "your-email@example.com", href: "mailto:your-email@example.com" },
        { label: "领英", value: "待补充", href: "#contact" },
        { label: "GitHub", value: "待补充", href: "#contact" },
        { label: "微信", value: "待补充", href: "#contact" }
      ]
    },
    footer: {
      brand: "ChainFlow",
      line: "让供应链，如水流动。"
    }
  },
  en: {
    nav: [
      { label: "Vision", href: "#vision" },
      { label: "Tools", href: "#skills" },
      { label: "Cases", href: "#cases" },
      { label: "Services", href: "#services" },
      { label: "About", href: "#about" },
      { label: "Contact", href: "#contact" }
    ],
    navCta: "Book",
    hero: {
      eyebrow: "From tasks to decisions, from risks to opportunities",
      brand: "ChainFlow",
      title: "Let supply chains flow like water",
      subtitle: "AI tool prototypes and decision intelligence for supply chain work.",
      body: "ChainFlow starts from concrete operational problems and turns routing, warehouse networks, inventory checks, and procurement communication into clearer AI-powered workflows.",
      primaryCta: "Explore Tools",
      secondaryCta: "Book a Conversation"
    },
    why: {
      eyebrow: "Why ChainFlow",
      title: "Global supply chains are becoming more complex.",
      subtitle: "Global expansion, geopolitics, market volatility, inventory pressure, supplier risk, and information gaps all add friction to the system.",
      paragraphs: [
        "ChainFlow believes the most valuable teams will not just have more information. They will have better judgment, better connections, and better ability to act.",
        "The first version starts with practical AI tool prototypes, reducing repetitive work and turning data and experience into reusable supply chain intelligence."
      ]
    },
    flowSteps: [
      { term: "Data", description: "Raw records and operating data" },
      { term: "Signal", description: "Meaningful changes and patterns" },
      { term: "Insight", description: "Judgment on risks and opportunities" },
      { term: "Action", description: "Tools and recommendations that can be used" },
      { term: "Flow", description: "Smoother supply chain coordination" }
    ],
    layersHeader: {
      eyebrow: "Operating Layers",
      title: "From tasks, to decisions, to supply chain networks",
      subtitle: "Start with usable tools, then grow them into reusable business intelligence."
    },
    layers: [
      {
        number: "01",
        title: "Reduce Friction",
        summary: "Use AI to reduce repetitive work in supply chain teams.",
        coversLabel: "Covers",
        scenes: ["Email", "Spreadsheets", "Procurement", "Inventory", "Scheduling", "Data cleanup"],
        keywords: ["Spreadsheet automation", "Procurement assistant", "Inventory check", "Logistics scheduling", "Workflow tools"]
      },
      {
        number: "02",
        title: "Improve Decisions",
        summary: "Turn scattered data into clearer support for business judgment.",
        coversLabel: "Covers",
        scenes: ["Demand forecasting", "Inventory optimization", "Procurement strategy", "Supplier evaluation", "Bullwhip analysis"],
        keywords: ["Demand forecasting", "Inventory optimization", "Supplier scoring", "Procurement strategy", "Risk judgment"]
      },
      {
        number: "03",
        title: "Create Connections",
        summary: "Help companies discover suppliers, customers, sourcing opportunities, alternative routes, and global partner networks.",
        coversLabel: "Covers",
        scenes: ["China outbound", "Supplier discovery", "Sourcing match", "Alternative supply paths", "Global opportunities"],
        keywords: ["Supplier matching", "Global opportunities", "Risk sensing", "Alternative sourcing", "Global supply chain"]
      }
    ],
    skillsHeader: {
      eyebrow: "Tool Prototypes",
      title: "Two demo-ready prototypes, plus two future workflow directions.",
      subtitle: "RouteFlow and NetworkFlow can be shown with sample demos. Inventory and supplier communication are planned next workflows."
    },
    skillsDemoCta: "View Sample",
    skills: [
      {
        name: "RouteFlow",
        title: "Short-haul Delivery Route Planner",
        value: "Upload an order sheet and generate vehicle routes, delivery sequences, and route results.",
        problem: "Small teams often face many orders, vehicles, addresses, and time windows. Manual routing is slow, error-prone, and hard to optimize.",
        inputs: ["Order sheet", "Addresses", "Volume", "Time windows", "Vehicle count", "Vehicle capacity", "Depot"],
        outputs: ["Route plan", "Delivery sequence", "Route results", "Structured data", "Map sample", "Short report"],
        scenes: ["Local delivery", "Store replenishment", "Regional distribution", "Small fleet scheduling", "Temporary delivery plans"],
        status: "Demo Ready",
        cta: "Request Demo",
        demoTitle: "Web Sample",
        demoInputLabel: "Sample Input",
        demoOutputLabel: "Sample Output",
        demoInput: ["18 orders", "3 vehicles", "2 time windows", "Single depot"],
        demoOutput: ["3 delivery routes", "86.4 km estimated distance", "82% load rate", "1 address exception"]
      },
      {
        name: "NetworkFlow",
        title: "Warehouse Network Location Evaluator",
        value: "Compare warehouse network layouts based on demand cities, candidate sites, and cost parameters.",
        problem: "Warehouse network planning has to balance fixed cost, transportation cost, demand allocation, service coverage, and risk. Manual comparison is hard to scale.",
        inputs: ["Demand cities", "Demand volume", "Candidate sites", "Fixed cost", "Transport cost", "Service radius", "Lead time"],
        outputs: ["Recommended sites", "Demand allocation", "Cost breakdown", "Scenario comparison", "Map sample", "Decision report"],
        scenes: ["Regional warehouse planning", "Outbound network design", "Dealer network optimization", "Candidate city comparison", "Distribution redesign"],
        status: "Demo Ready",
        cta: "Discuss Your Case",
        demoTitle: "Web Sample",
        demoInputLabel: "Sample Input",
        demoOutputLabel: "Sample Output",
        demoInput: ["9 demand cities", "5 candidate sites", "Fixed cost constraints", "350 km service radius"],
        demoOutput: ["2 recommended sites", "94% coverage", "11.8% cost reduction", "2 backup scenarios"]
      },
      {
        name: "Inventory Agent",
        title: "Inventory Reconciliation Assistant",
        value: "Support reconciliation between system inventory, physical counts, and spreadsheet records.",
        problem: "Inventory mismatches across systems, physical stock, and spreadsheets are common. Manual checks are slow and easy to miss.",
        inputs: ["System export", "Count sheet", "Inventory ledger"],
        outputs: ["Reconciliation checklist", "Discrepancy records", "Action suggestions"],
        scenes: ["Stock counting", "Book-to-physical checks", "Exception tracking"],
        status: "Planned",
        cta: "Join Waitlist",
        demoTitle: "No Web Demo Yet",
        demoInputLabel: "Planned Input",
        demoOutputLabel: "Planned Output",
        demoInput: ["Inventory table", "Count sheet", "Exception logs"],
        demoOutput: ["Difference detection", "Action priority", "Review checklist"]
      },
      {
        name: "Supplier Agent",
        title: "Supplier Communication Assistant",
        value: "Support RFQs, delivery follow-ups, email drafting, and communication records.",
        problem: "Procurement communication involves many repetitive emails, delivery follow-ups, and information summaries.",
        inputs: ["RFQ request", "Supplier profiles", "Email records"],
        outputs: ["Email drafts", "Supplier records", "Follow-up list"],
        scenes: ["RFQ", "Delivery follow-up", "Supplier information management"],
        status: "Planned",
        cta: "Coming Soon",
        demoTitle: "No Web Demo Yet",
        demoInputLabel: "Planned Input",
        demoOutputLabel: "Planned Output",
        demoInput: ["RFQ sheet", "Contacts", "Past communication"],
        demoOutput: ["Email drafts", "Follow-up reminders", "Supplier summary"]
      }
    ],
    labels: {
      problem: "Problem",
      input: "Input",
      output: "Output",
      method: "Method",
      covers: "Use Cases"
    },
    casesHeader: {
      eyebrow: "Case Library",
      title: "Turn classroom prototypes into presentable supply chain workflows.",
      subtitle: "The first two cases have sample demo foundations. The next two show future product directions."
    },
    cases: [
      {
        number: "Case 01",
        title: "Short-haul Delivery Route Planner",
        product: "RouteFlow",
        problem: "Manual routing is slow and hard to optimize across many orders, vehicles, addresses, and time windows.",
        method: "Turn order sheets into a routing problem, then generate executable routes with capacity, time windows, and geocoded addresses.",
        output: "Route plan, delivery sequence, structured data, and interactive map sample.",
        status: "Demo Ready",
        cta: "Request Demo"
      },
      {
        number: "Case 02",
        title: "Warehouse Network Location Evaluator",
        product: "NetworkFlow",
        problem: "Warehouse location planning requires cost, allocation, coverage, and risk comparison. Manual analysis is inefficient and inconsistent.",
        method: "Build a location evaluation model from candidate sites, demand cities, and cost parameters.",
        output: "Recommended sites, demand allocation, cost breakdown, scenario comparison, and map sample.",
        status: "Demo Ready",
        cta: "Discuss Your Case"
      },
      {
        number: "Case 03",
        title: "Inventory Reconciliation Workflow",
        product: "Inventory Agent",
        problem: "Inventory mismatches across systems, physical counts, and spreadsheets are common. Manual checks are slow and easy to miss.",
        method: "Planned workflow for discrepancy detection, review checklists, and action suggestions.",
        output: "Reconciliation checklist, discrepancy records, and action suggestions.",
        status: "Planned",
        cta: "Join Waitlist"
      },
      {
        number: "Case 04",
        title: "Supplier Communication Workflow",
        product: "Supplier Agent",
        problem: "Procurement communication involves many repetitive emails, delivery follow-ups, and information summaries.",
        method: "Planned workflow for RFQs, email drafts, delivery follow-ups, and supplier summaries.",
        output: "Email drafts, supplier records, and follow-up list.",
        status: "Planned",
        cta: "Coming Soon"
      }
    ],
    beyond: {
      eyebrow: "Beyond Scripts",
      title: "More than a script",
      subtitle: "A single script is easy to copy. The real value is turning a supply chain problem into a usable, deliverable, reusable workflow.",
      cta: "Discuss Your Case",
      items: ["Understand the real operating context", "Design usable data templates", "Clean and adapt business data", "Build an end-to-end workflow", "Deliver outputs operators can understand", "Support deployment, docs, and iteration"]
    },
    roadmapHeader: {
      eyebrow: "Productization Path",
      title: "Prototype → Template → Pilot → Deployment",
      subtitle: "ChainFlow does not package rough scripts as products. It moves from working prototypes toward real workflow adoption."
    },
    roadmap: [
      { title: "Prototype", description: "Working samples are available" },
      { title: "Template", description: "Standard input and output formats" },
      { title: "Pilot", description: "Test with real business data" },
      { title: "Deployment", description: "Local deployment, tutorials, training, and iteration" }
    ],
    servicesHeader: {
      eyebrow: "Supply Chain AI Services",
      title: "Start from one concrete pain point and make it usable.",
      subtitle: "For teams that want to pilot one real supply chain workflow before moving toward productization."
    },
    servicesCta: "Start a Pilot",
    services: [
      {
        name: "Starter",
        title: "AI Workflow Tool",
        fit: "Individuals, small teams, procurement, logistics, and supply chain operators.",
        description: "A fit for early pilot users.",
        items: ["Diagnose one inefficient workflow", "Design a tool for spreadsheets, email, inventory, or procurement", "Provide a local runnable version", "Provide standard templates", "Provide operating instructions", "Remote deployment guidance"],
        cta: "Start a Pilot"
      },
      {
        name: "Prototype",
        title: "Prototype Customization",
        fit: "Teams with needs similar to RouteFlow or NetworkFlow.",
        description: "Adapt an existing prototype into a demo closer to real business data.",
        items: ["Adapt fields to real data", "Adjust input templates", "Adjust output reports", "Configure maps, costs, vehicles, and warehouses", "Generate a demo-ready version"],
        cta: "Customize Prototype"
      },
      {
        name: "Decision",
        title: "Supply Chain Decision Support",
        fit: "Small manufacturers, trading companies, and supply chain teams.",
        description: "Turn scattered data into lightweight decision support tools.",
        items: ["Inventory analysis", "Demand forecasting", "Supplier scoring", "Procurement strategy suggestions", "Simple dashboards"],
        cta: "Discuss Data"
      },
      {
        name: "Global",
        title: "Global Supply Chain Intelligence",
        fit: "Chinese companies preparing for or already expanding overseas.",
        description: "Build clearer supply chain path judgment for global expansion.",
        items: ["Target market supply chain research", "Risk maps", "Supplier, logistics, and overseas warehouse discovery", "Localized supply chain path suggestions"],
        cta: "Explore Global"
      }
    ],
    futureHeader: {
      eyebrow: "Long-term Direction",
      title: "An intelligence layer behind supply chain flow."
    },
    futureDirections: [
      { title: "Supply Chain Intelligence", description: "Turn information into judgment, and judgment into action." },
      { title: "Global Opportunity Discovery", description: "Help companies discover suppliers, customers, sourcing opportunities, and partner networks." },
      { title: "Industrial AI Services", description: "Bring AI from demos into real supply chain workflows." }
    ],
    about: {
      eyebrow: "About the Builder",
      title: "Zilong Zhao",
      subtitle: "Supply Chain × AI Builder",
      statement: "I focus on a simple question: how can complex supply chain workflows become lighter, smoother, and more actionable?",
      paragraphs: [
        "ChainFlow is a long-term exploration, starting from practical tools and moving toward decision intelligence, risk sensing, and global connection.",
        "It begins inside real workflows, where repetitive work, information gaps, inventory pressure, and supplier coordination create everyday friction."
      ],
      focusLabel: "Focus areas",
      focusAreas: ["Automotive supply chains", "Procurement operations", "Logistics optimization", "Supply chain resilience", "China outbound business", "AI tools in real operating workflows"]
    },
    contact: {
      eyebrow: "Contact",
      title: "Let supply chains flow better.",
      subtitle: "Let supply chains flow like water.",
      body: "If you are exploring supply chain AI, global expansion, logistics optimization, inventory forecasting, or procurement automation, I would be glad to talk.",
      pilot: "Looking for the first pilot users and real supply chain problems to build with.",
      cta: "Book a Conversation",
      links: [
        { label: "Email", value: "your-email@example.com", href: "mailto:your-email@example.com" },
        { label: "LinkedIn", value: "Coming Soon", href: "#contact" },
        { label: "GitHub", value: "Coming Soon", href: "#contact" },
        { label: "WeChat", value: "Coming Soon", href: "#contact" }
      ]
    },
    footer: {
      brand: "ChainFlow",
      line: "Let supply chains flow like water."
    }
  }
} as const;
