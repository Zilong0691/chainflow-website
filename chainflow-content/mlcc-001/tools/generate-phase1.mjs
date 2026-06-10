import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const today = "2026-06-10";

function ensure(rel) {
  mkdirSync(path.join(root, rel), { recursive: true });
}

[
  "research",
  "evidence",
  "page-scripts",
  "copy",
  "templates/components",
  "assets/generated",
  "assets/verified",
  "assets/prompts",
  "editable/svg",
  "output",
  "qa"
].forEach(ensure);

function write(rel, content) {
  const target = path.join(root, rel);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, content.endsWith("\n") ? content : `${content}\n`, "utf8");
}

function j(rel, data) {
  write(rel, `${JSON.stringify(data, null, 2)}\n`);
}

const sourceRefs = {
  murataDcBias: "https://www.murata.com/en-us/support/faqs/capacitor/ceramiccapacitor/char/0005",
  murataAging: "https://www.murata.com/en-us/support/faqs/capacitor/ceramiccapacitor/char/0017",
  ceramicWiki: "https://en.wikipedia.org/wiki/Ceramic_capacitor",
  capacitanceWiki: "https://en.wikipedia.org/wiki/Capacitance",
  bariumWiki: "https://en.wikipedia.org/wiki/Barium_titanate",
  kdense: "https://github.com/K-Dense-AI/scientific-agent-skills",
  deepResearch: "https://github.com/Weizhena/Deep-Research-skills",
  paperbanana: "https://github.com/llmsresearch/paperbanana",
  anthropicFs: "https://github.com/anthropics/financial-services"
};

const files = {};

files["README.md"] = `# ChainFlow MLCC 001 第一阶段交付

项目：链流品类志 / CF Components 001

主题：MLCC，多层片式陶瓷电容器。

交付日期：${today}

## 本阶段已经完成

- 项目现状检查：已读取 ChainFlow 网站 README、package.json、docs、standards、templates、modules、chainflow.md、全局 CLAUDE.md；项目内未发现 AGENTS.md、CONTRIBUTING.md、design-system 目录或项目级 SKILL.md。
- 开源方案评估：见 open-source-review.md 与 evidence/open-source-review.md。
- MLCC 研究底稿：见 research/ 与 evidence/。
- 十张图页面脚本：见 page-scripts/。
- 公众号标题、导语、结语、来源说明和免责声明：见 copy/wechat-draft.md。
- ChainFlow 视觉 token、排版 CSS、页面布局 CSS：见 templates/。
- 三张样页：00 封面、01 内部结构、06 制造工艺。
- 可编辑源文件：见 editable/*.html 与 editable/svg/*.svg。
- PNG 输出：见 output/*.png。
- 第一阶段事实、同行和视觉审核：见 qa/。

## 重要边界

本期第一阶段没有制作剩余七张最终图片。市场规模、份额、AI 服务器/新能源汽车单机 MLCC 用量等数字在公开来源中口径差异较大，已经进入 disputed-claims.md，未进入三张样页。

## 文件打开方式

HTML 样页可以直接用浏览器打开；SVG 可用浏览器、Figma、Illustrator、Inkscape 或文本编辑器继续编辑。PNG 为 1080 x 1440 像素竖版样图。
`;

files["SKILL.md"] = `# ChainFlow Content Skill - MLCC 001

本文件记录本期样刊的可复用工作流，不作为通用大而全 Skill 发布。

## 适用范围

供应链视角的电子元器件图解内容：研究问题树、事实底稿、页面脚本、可编辑 SVG/HTML 样页、事实与视觉审核。

## 当前流程

1. 项目与品牌上下文检查。
2. 开源研究/图形工作流评估，只借鉴方法，不复制代码或视觉。
3. 先形成研究提纲和页面问题树，再检索事实。
4. 每条数字事实必须进入 fact-table.json。
5. 每页只保留一个主结论。
6. 技术图形用 SVG/HTML 绘制，文本、单位、来源不交给图像模型生成。
7. 三类审核：事实、专业同行、视觉。
`;

files["research/research-outline.md"] = `# MLCC 研究提纲

## 研究目标

用十张图回答 MLCC 的技术结构、关键参数、材料工艺、产业链、竞争能力与采购替代风险。内容目标不是泛泛介绍电容，而是让采购、工程、产品和产业研究读者知道：哪些参数表面相同，实际不能直接替代；哪些能力来自材料和制造；哪些供应链风险不能只看成品厂商。

## 问题树

### A. 器件与电路层

1. MLCC 在电路中承担哪些功能：储能、去耦、旁路、滤波、耦合。
2. 多层结构如何形成等效并联电容。
3. 标称容量、额定电压、温度特性、DC Bias、老化、ESR、ESL、尺寸如何共同决定有效容量。

### B. 材料与制造层

1. 陶瓷介质为什么常见 BaTiO3 基体系，同时不能把所有 MLCC 简化为同一种材料。
2. Ni 内电极、端电极、电镀层分别负责什么。
3. 制造壁垒集中在薄层化、粉体/浆料分散、印刷对位、叠层压合、共烧收缩一致性、缺陷控制和测试分选。

### C. 供应链与竞争层

1. 上游粉体、金属粉/浆料、设备与耗材对性能上限和良率有影响。
2. 企业竞争不是单一排名，而是小型化、高容量、高压、高频、高可靠、车规认证、客户验证、规模交付和成本稳定性的组合。
3. AI 服务器、汽车电子、新能源汽车增加了对高可靠、低 ESL、近端去耦和宽温产品的需求，但单机使用数量公开口径差异大，本阶段不写入确定数字。

### D. 工程和采购层

1. 替代料不能只比容量、电压和封装。
2. 有效容量、温度范围、DC Bias、ESR/ESL、板弯、声学噪声、焊接条件、可靠性等级、渠道和停产风险都要检查。
3. ChainFlow 判断：MLCC 是典型的小器件、大系统风险品类。

## 第一阶段样页策略

- 00 封面：验证 ChainFlow 出版物审美和品牌辨识度。
- 01 内部结构：验证复杂技术结构表达。
- 06 制造工艺：验证高信息密度流程排版。
`;

files["research/research-notes.md"] = `# 研究笔记与项目检查

## 项目现状检查

- 根目录：/Users/zhaozilong/chainflow。
- 已读取：README.md、package.json、chainflow.md、docs/module-briefs、standards、templates/module-template、modules/routeflow、modules/networkflow、modules/demandflow、app/globals.css、tailwind.config.ts、核心组件与 lib/content.ts。
- 全局 CLAUDE.md：要求始终使用简体中文回复。
- 未发现：项目内 AGENTS.md、CONTRIBUTING.md、design-system 目录、项目级 SKILL.md。
- 用户参考图片：本轮对话未附带可读取图片，项目目录内也未发现 MLCC 参考图。
- 工作树状态：主项目 package.json 和 package-lock.json 进入本轮前已有改动，本阶段未修改。

## 品牌与内容判断

ChainFlow 核心是供应链 AI 产品实验室，不是普通资讯聚合。本期内容应把 MLCC 放进“数据 -> 信号 -> 判断 -> 行动 -> 流动”的框架中：技术事实要服务工程选型、采购替代和供应风险判断。

## 已核验并进入样页的事实类型

- 多层交错结构与等效并联逻辑。
- C = εr ε0 A / d 对多层结构的解释。
- DC Bias 会导致高介电常数陶瓷电容容量下降。
- 高介电常数陶瓷电容存在老化效应。
- 制造流程为通用工艺框架，不加入未核验的层数、厚度、良率或产能数字。

## 暂缓进入图片的事实类型

- 全球市场规模与份额。
- 单车、单 AI 服务器、单手机 MLCC 使用数量。
- 具体企业产能、良率和细分产品排名。
- 未指定型号的介质层厚度、叠层数、额定电压上限。
`;

files["open-source-review.md"] = `# 开源方案评估与许可证记录

访问日期：${today}

## 总原则

本阶段不安装、不复制、不改写这些开源项目代码；只借鉴研究与图形工作流。未确认许可证或许可证不清晰的项目，一律按“只读方法参考”处理。

## 1. K-Dense-AI/scientific-agent-skills

- 仓库：${sourceRefs.kdense}
- 当前状态：GitHub main 分支，README 展示一组科学研究 Agent Skills。
- 许可证：GitHub 页面显示 MIT License。
- 与本任务相关能力：scientific visualization、schematics、literature/research lookup、peer review、citation verification、report generation 等。
- 可借鉴机制：结构化研究问题、事实和引用绑定、专业示意图、同行审查门槛、交付前 QA。
- 使用方式：只借鉴方法，不复制代码、Skill 内容或模板。

## 2. Weizhena/Deep-Research-skills

- 仓库：${sourceRefs.deepResearch}
- 当前状态：GitHub main/master 可访问，项目围绕 Deep Research Skill。
- 许可证名称记录：未确认；访问到的 README/GitHub 摘要中未稳定确认显式 LICENSE，按未授权代码处理。
- 可借鉴机制：先形成研究提纲和问题树，再进入深入检索，防止资料堆积。
- 改造为本期流程：第一阶段输出 research-outline.md 和页面脚本；第二阶段再按确认后的页面结构补一级来源和数据。
- 使用方式：只借鉴两阶段研究方法。

## 3. llmsresearch/paperbanana

- 仓库：${sourceRefs.paperbanana}
- 当前状态：GitHub main 分支，项目强调论文/图形生成工作流。
- 许可证名称记录：未确认；访问页面未稳定确认显式 LICENSE，按只读参考处理。
- 可借鉴机制：Retriever、Planner、Stylist、Visualizer、Critic 的图形生产流水线。
- 本期改造：Retriever 找厂商与技术结构；Planner 设计一页一问题；Stylist 固定 ChainFlow token；Visualizer 用 SVG/HTML 绘制；Critic 做事实、同行、视觉审核。
- 使用限制：不让图像模型直接生成含中文、参数、单位和企业名称的整页最终图。

## 4. anthropics/financial-services

- 仓库：${sourceRefs.anthropicFs}
- 当前状态：Anthropic 金融服务示例仓库，其中 market researcher 插件/Skill 对行业研究结构有参考价值。
- 许可证名称记录：未确认；本轮未稳定提取到明确许可证名称，按只读方法参考处理，不复制代码。
- 可借鉴机制：行业定义、竞争格局、同行比较、研究工作底稿、结论审查。
- 使用限制：不输出荐股、评级、目标价、资本市场炒作或缺乏技术基础的受益公司名单。

## 对 ChainFlow 的方法提取

1. 研究问题先行：每页一个问题，一个结论。
2. 来源分级：一级来源优先；二级来源只能补充或作为线索。
3. 事实绑定：fact-table.json 绑定来源、口径、使用页面。
4. 图形流程：结构检索 -> 信息规划 -> 统一视觉 -> SVG 绘制 -> Critic 审核。
5. 竞争格局不做简单排行榜，转为能力维度矩阵。
`;

files["evidence/open-source-review.md"] = files["open-source-review.md"];

files["evidence/source-list.md"] = `# 来源清单

访问日期：${today}

## 一级来源

1. Murata FAQ: What is the DC Bias Characteristic in Ceramic Capacitors?  
   类型：厂商技术 FAQ  
   URL: ${sourceRefs.murataDcBias}  
   用途：DC Bias 与有效容量说明。

2. Murata FAQ: What is the Aging Characteristic in Ceramic Capacitors?  
   类型：厂商技术 FAQ  
   URL: ${sourceRefs.murataAging}  
   用途：高介电常数陶瓷电容老化效应。

## 二级来源

3. Wikipedia: Ceramic capacitor  
   类型：技术综述  
   URL: ${sourceRefs.ceramicWiki}  
   用途：MLCC 基本结构、陶瓷电容类别、温度特性编码、制造流程线索。

4. Wikipedia: Capacitance  
   类型：物理基础综述  
   URL: ${sourceRefs.capacitanceWiki}  
   用途：电容量公式和多层结构解释基础。

5. Wikipedia: Barium titanate  
   类型：材料综述  
   URL: ${sourceRefs.bariumWiki}  
   用途：BaTiO3 高介电/铁电材料背景。

## 开源方法来源

6. K-Dense-AI/scientific-agent-skills  
   URL: ${sourceRefs.kdense}

7. Weizhena/Deep-Research-skills  
   URL: ${sourceRefs.deepResearch}

8. llmsresearch/paperbanana  
   URL: ${sourceRefs.paperbanana}

9. anthropics/financial-services  
   URL: ${sourceRefs.anthropicFs}

## 待第二阶段补强的一级来源

- Murata、TDK、Taiyo Yuden、Samsung Electro-Mechanics 的产品目录、应用指南与制造/结构资料。
- AEC-Q200 或汽车电子相关可靠性标准说明。
- 企业年报或投资者资料中的产能、产品组合和应用口径。
`;

const facts = [
  {
    id: "MLCC-F001",
    claim_zh: "MLCC 是由多层陶瓷介质和金属内电极交替叠层形成的陶瓷电容器。",
    claim_en: "An MLCC is a ceramic capacitor built from alternating ceramic dielectric layers and metal internal electrodes.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "MLCC generic structure",
    source_title: "Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["01-structure"],
    notes: "第二阶段需用 Murata/TDK/Samsung 结构图作最终校核。"
  },
  {
    id: "MLCC-F002",
    claim_zh: "电容量与介电常数和电极有效面积成正比，与介质厚度成反比；多层结构可把多个小电容等效并联。",
    claim_en: "Capacitance increases with dielectric permittivity and electrode area and decreases with dielectric thickness; multilayer structures act like many capacitors in parallel.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "capacitor physics",
    source_title: "Capacitance",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.capacitanceWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "high",
    used_in_pages: ["02-mechanism", "01-structure"],
    notes: "物理公式用于机制解释，不涉及具体型号数据。"
  },
  {
    id: "MLCC-F003",
    claim_zh: "C0G/NP0 属于一类陶瓷电容，温度稳定性高、容量密度较低。",
    claim_en: "C0G/NP0 is a Class I ceramic capacitor class with high temperature stability and lower volumetric capacitance.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "ceramic capacitor class",
    source_title: "Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["03-classification"],
    notes: "第二阶段需用标准或厂商资料复核编码表。"
  },
  {
    id: "MLCC-F004",
    claim_zh: "X7R 表示工作温度范围通常为 -55 到 +125 摄氏度，容量变化等级通常为 ±15%。",
    claim_en: "X7R commonly denotes -55 to +125 °C operation with ±15% capacitance change.",
    value: null,
    unit: "°C; %",
    date: "accessed 2026-06-10",
    scope: "EIA class II temperature characteristic code",
    source_title: "Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["03-classification", "04-parameters"],
    notes: "进入最终全套图前应以 IEC/EIA 或厂商目录复核。"
  },
  {
    id: "MLCC-F005",
    claim_zh: "X5R 表示工作温度范围通常为 -55 到 +85 摄氏度，容量变化等级通常为 ±15%。",
    claim_en: "X5R commonly denotes -55 to +85 °C operation with ±15% capacitance change.",
    value: null,
    unit: "°C; %",
    date: "accessed 2026-06-10",
    scope: "EIA class II temperature characteristic code",
    source_title: "Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["03-classification", "04-parameters"],
    notes: "进入最终全套图前应以 IEC/EIA 或厂商目录复核。"
  },
  {
    id: "MLCC-F006",
    claim_zh: "高介电常数陶瓷电容在施加直流偏压时，实际电容量会下降。",
    claim_en: "High-dielectric-constant ceramic capacitors can lose capacitance under applied DC bias.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "ceramic capacitors, especially high-k class II behavior",
    source_title: "What is the DC Bias Characteristic in Ceramic Capacitors?",
    source_organization: "Murata Manufacturing Co., Ltd.",
    source_url: sourceRefs.murataDcBias,
    source_type: "primary",
    manufacturer_claim: true,
    confidence: "high",
    used_in_pages: ["04-parameters", "09-checklist"],
    notes: "样页不写入具体下降百分比，因为强依赖型号、尺寸和电压。"
  },
  {
    id: "MLCC-F007",
    claim_zh: "高介电常数陶瓷电容存在老化特性，容量会随时间逐步下降。",
    claim_en: "High-dielectric-constant ceramic capacitors exhibit aging, with capacitance gradually decreasing over time.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "high-k ceramic capacitors",
    source_title: "What is the Aging Characteristic in Ceramic Capacitors?",
    source_organization: "Murata Manufacturing Co., Ltd.",
    source_url: sourceRefs.murataAging,
    source_type: "primary",
    manufacturer_claim: true,
    confidence: "high",
    used_in_pages: ["04-parameters", "09-checklist"],
    notes: "不在图片中给出未指定型号的老化率。"
  },
  {
    id: "MLCC-F008",
    claim_zh: "BaTiO3 是常见高介电陶瓷材料基础，但不同 MLCC 类别和型号并非完全相同材料体系。",
    claim_en: "BaTiO3 is a common high-permittivity ceramic material basis, but MLCC categories and part series are not all the same material system.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "ceramic capacitor dielectric materials",
    source_title: "Barium titanate; Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: `${sourceRefs.bariumWiki}; ${sourceRefs.ceramicWiki}`,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["05-materials"],
    notes: "最终版需要厂商材料白皮书或产品目录补强。"
  },
  {
    id: "MLCC-F009",
    claim_zh: "许多现代 MLCC 使用镍等 base-metal electrode 体系，以匹配高层数、大规模制造和成本要求。",
    claim_en: "Many modern MLCCs use base-metal electrode systems such as nickel to support high-layer-count mass production and cost requirements.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "modern commodity and high-volume MLCC manufacturing",
    source_title: "Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["01-structure", "05-materials"],
    notes: "避免写成所有 MLCC 必然为 Ni 内电极。"
  },
  {
    id: "MLCC-F010",
    claim_zh: "典型 MLCC 制造流程包括粉体/浆料制备、流延、内电极印刷、叠层、压合、切割、排胶、烧结、端接、电镀、测试分选。",
    claim_en: "A typical MLCC manufacturing flow includes powder/slurry preparation, tape casting, internal electrode printing, stacking, pressing, cutting, binder burnout, firing, termination, plating, and testing/sorting.",
    value: null,
    unit: "",
    date: "accessed 2026-06-10",
    scope: "generic MLCC manufacturing flow",
    source_title: "Ceramic capacitor",
    source_organization: "Wikipedia contributors",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["06-process"],
    notes: "样页用通用流程，不写具体设备品牌、厚度、良率。"
  },
  {
    id: "MLCC-F011",
    claim_zh: "同容量、同电压、同封装的 MLCC，不一定有相同有效容量、温度行为、ESR/ESL、机械可靠性和认证状态。",
    claim_en: "MLCCs with the same nominal capacitance, voltage, and package can differ in effective capacitance, temperature behavior, ESR/ESL, mechanical reliability, and qualification status.",
    value: null,
    unit: "",
    date: "2026-06-10",
    scope: "engineering and procurement synthesis",
    source_title: "Synthesis from DC bias, aging, class code and procurement risk facts",
    source_organization: "ChainFlow analysis",
    source_url: `${sourceRefs.murataDcBias}; ${sourceRefs.murataAging}; ${sourceRefs.ceramicWiki}`,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "high",
    used_in_pages: ["04-parameters", "09-checklist"],
    notes: "综合判断，不是单一来源原文。"
  },
  {
    id: "MLCC-F012",
    claim_zh: "MLCC 产业链不能只看成品厂商，上游粉体、金属粉/浆料、设备、耗材和测试分选能力都会影响供应稳定性。",
    claim_en: "MLCC supply-chain analysis should not stop at finished capacitor makers; powders, metal pastes, equipment, consumables, and test/sorting capability all affect supply stability.",
    value: null,
    unit: "",
    date: "2026-06-10",
    scope: "ChainFlow supply-chain synthesis",
    source_title: "Synthesis from manufacturing flow and ChainFlow supply-chain framework",
    source_organization: "ChainFlow analysis",
    source_url: sourceRefs.ceramicWiki,
    source_type: "secondary",
    manufacturer_claim: false,
    confidence: "medium",
    used_in_pages: ["07-supply-chain", "06-process"],
    notes: "第二阶段应补企业年报和材料/设备厂资料。"
  }
];

j("evidence/fact-table.json", facts);

j("evidence/glossary-zh-en.json", {
  "MLCC": { zh: "多层片式陶瓷电容器", en: "Multilayer Ceramic Chip Capacitor" },
  "陶瓷介质层": { zh: "陶瓷介质层", en: "ceramic dielectric layer" },
  "内电极": { zh: "内电极", en: "internal electrode" },
  "端电极": { zh: "端电极", en: "termination electrode" },
  "镍层": { zh: "镍层", en: "nickel barrier layer" },
  "锡层": { zh: "锡层", en: "tin plating layer" },
  "DC Bias": { zh: "直流偏压效应", en: "DC bias effect" },
  "有效容量": { zh: "有效容量", en: "effective capacitance" },
  "ESR": { zh: "等效串联电阻", en: "equivalent series resistance" },
  "ESL": { zh: "等效串联电感", en: "equivalent series inductance" },
  "C0G/NP0": { zh: "一类陶瓷温度特性", en: "Class I temperature characteristic" },
  "X7R": { zh: "二类陶瓷温度特性", en: "Class II temperature characteristic" },
  "X5R": { zh: "二类陶瓷温度特性", en: "Class II temperature characteristic" },
  "BaTiO3": { zh: "钛酸钡", en: "barium titanate" },
  "BME": { zh: "贱金属电极", en: "base-metal electrode" },
  "共烧": { zh: "共烧", en: "co-firing" },
  "排胶": { zh: "排胶", en: "binder burnout" },
  "端接": { zh: "端接", en: "termination" },
  "分选": { zh: "测试与分选", en: "testing and sorting" }
});

files["evidence/disputed-claims.md"] = `# 争议数据与暂不采用口径

## 不进入第一阶段样页的数字

| 主题 | 常见说法 | 问题 | 本阶段处理 |
|---|---|---|---|
| 全球 MLCC 市场规模 | 不同报告给出数十亿美元到百亿美元级 | 统计年份、是否只含 MLCC、出厂/销售口径不同 | 不采用 |
| 全球厂商份额 | 村田、三星电机、国巨、太阳诱电、TDK 等排名和份额常被引用 | 多为二手研究机构或媒体转述，年份不一 | 不做份额排行榜 |
| 新能源汽车 MLCC 用量 | 常见 1 万颗、1.5 万颗、2 万颗等说法 | 车型、域控制器架构、是否含所有陶瓷电容口径不明 | 只写“用量和可靠性要求提升”，不写数量 |
| AI 服务器 MLCC 用量 | 常见数千到上万颗说法 | GPU 数量、主板/加速卡/电源口径不明 | 不写数量 |
| 介质层厚度与叠层数 | 常见“亚微米”“上千层” | 依型号、厂商、代际差异巨大，宣传口径多 | 不写确定数字 |
| 国产化率 | 常见按厂商、销售额、产能或高端型号分别统计 | 统计范围不一致 | 只做产业链瓶颈判断 |

## 进入最终图片前的处理规则

1. 找不到一级来源时，不写精确数字。
2. 不同来源冲突时，不平均。
3. 能解释差异时标注口径；不能解释则继续留在本表。
4. 企业自称的“领先”“最大”“首创”必须标注企业口径。
`;

files["evidence/source-quality-report.md"] = `# 来源质量报告

## 总体结论

第一阶段样页没有使用市场规模、份额、产能、层数、厚度、单机用量等高风险数字。进入样页的事实以厂商 FAQ 和基础技术综述为主，适合样页验证；但剩余七页正式制作前，仍需补强厂商结构图、产品目录、应用指南、年报和标准来源。

## 来源分级

- 高可信：Murata 技术 FAQ，用于 DC Bias 和老化。
- 中可信：Wikipedia 技术综述，用于结构、分类、材料和制造流程线索；需在最终全套图前用一级来源复核。
- 本地品牌来源：chainflow.md、README、docs、standards，用于 ChainFlow 定位和表达边界。
- 方法来源：四个开源项目，只用于工作流借鉴，不进入 MLCC 技术事实。

## 阻断级风险

当前三张样页没有阻断级事实风险。若后续七页加入份额、产能、使用数量或具体型号参数，必须新增 fact-table 条目并完成来源复核。
`;

function pageScript(p) {
  return `页面编号：${p.no}
章节名称：${p.name}
本页研究问题：${p.question}
问题型主标题：${p.title}
专业型副标题：${p.subtitle}
目标读者：${p.reader}
核心结论：${p.conclusion}
主要视觉：${p.visual}
信息层级：${p.hierarchy}
辅助模块1：${p.m1}
辅助模块2：${p.m2}
辅助模块3：${p.m3}
必须出现的术语：${p.terms}
必须标注的数据：${p.data}
事实来源：${p.sources}
需要生成的视觉资产：${p.assets}
需要使用SVG绘制的内容：${p.svg}
ChainFlow页尾判断：${p.footer}
下一页提示：${p.next}
风险与不确定性：${p.risk}
`;
}

const scripts = [
  {
    file: "00-cover.md", no: "00", name: "封面与研究定位",
    question: "为什么一颗很小的 MLCC 值得用供应链视角研究？",
    title: "10张图读懂MLCC",
    subtitle: "从材料、工艺与核心参数，到产业链、竞争格局与采购风险",
    reader: "采购、工程、产品经理、产业研究和非技术读者",
    conclusion: "MLCC 是电子系统里的基础器件，也是材料、工艺、认证和供应链稳定性共同决定的小型高壁垒品类。",
    visual: "一颗放大的 MLCC 立体结构，辅以 AI 服务器、汽车电子、工业电源、消费电子场景图标。",
    hierarchy: "品牌栏 -> 主标题 -> 一句话重要性 -> 四个应用场景 -> 覆盖范围 -> 页尾判断。",
    m1: "正式名称：Multilayer Ceramic Chip Capacitor。",
    m2: "覆盖范围：结构、参数、材料、工艺、产业链、竞争能力、替代风险。",
    m3: "不覆盖：投资建议、目标价、未经核验的份额和使用量。",
    terms: "MLCC，多层片式陶瓷电容器，effective capacitance，DC Bias。",
    data: "无定量数据。",
    sources: "ChainFlow 品牌文档；MLCC 基础事实见 MLCC-F001 到 F012。",
    assets: "封面产品主视觉，可用 SVG 绘制；后续可替换为无文字产品渲染图。",
    svg: "MLCC 外观、应用场景图标、覆盖范围标签、页码与来源。",
    footer: "小器件，大系统风险；真正的壁垒藏在材料、工艺和验证里。",
    next: "下一页：一颗 MLCC 内部究竟有什么？",
    risk: "封面不放未经核验的市场和用量数字；避免营销号式夸张。"
  },
  {
    file: "01-structure.md", no: "01", name: "内部结构",
    question: "一颗 MLCC 内部究竟有什么？",
    title: "一颗MLCC内部，不是一片电容",
    subtitle: "交错内电极与陶瓷介质层，把许多微型电容并联到两个端头",
    reader: "工程、采购、非技术读者",
    conclusion: "MLCC 的核心不是外观尺寸，而是介质层、内电极与端电极之间的交错连接关系。",
    visual: "剖面叠层结构图，左右端头连接交错内电极，标注陶瓷介质层、内电极、端电极、Ni/Sn 电镀。",
    hierarchy: "主剖面图 -> 四个结构标签 -> 等效并联小公式 -> 页尾判断。",
    m1: "端头连接逻辑：奇偶层内电极分别连接左右端。",
    m2: "材料边界：常见 Ni/BME 不能写成所有 MLCC 必然如此。",
    m3: "功能解释：每两层电极之间形成一个电容单元。",
    terms: "ceramic dielectric layer, internal electrode, termination electrode, Ni barrier, Sn plating。",
    data: "不标注层数、厚度或容量。",
    sources: "MLCC-F001, MLCC-F002, MLCC-F009。",
    assets: "无需图像模型；全 SVG 技术线稿。",
    svg: "多层介质与电极剖面、端头分层、箭头标注、等效并联示意。",
    footer: "看懂端头连接，才看得懂为什么同样封装也会有不同性能边界。",
    next: "下一页：MLCC 如何储能并稳定电路？",
    risk: "厂商结构细节会因系列不同变化；最终版需要用厂商结构图复核端头材料表述。"
  },
  {
    file: "02-mechanism.md", no: "02", name: "工作原理与系统作用",
    question: "MLCC 如何储能，又如何帮助电路稳定工作？",
    title: "它不只是在“存电”",
    subtitle: "储能、去耦、旁路、滤波、耦合，是不同电路语境下的不同任务",
    reader: "产品经理、采购、非电路专业读者",
    conclusion: "MLCC 的价值来自在不同频段、不同电源轨和不同信号路径中提供低阻抗通路。",
    visual: "电路系统分区示意：电源轨、芯片、噪声、信号路径。",
    hierarchy: "工作原理公式 -> 五类作用分区 -> 频率/位置提示 -> 页尾判断。",
    m1: "储能：电场储能。",
    m2: "去耦/旁路：靠近 IC 抑制电源波动和噪声。",
    m3: "滤波/耦合：按电路目标选择容量、ESR/ESL 和位置。",
    terms: "decoupling, bypass, filtering, coupling, impedance, ESR, ESL。",
    data: "只标注公式 C = εrε0A/d，不标注具体参数。",
    sources: "MLCC-F002。",
    assets: "电路板局部抽象图。",
    svg: "电源轨、芯片、旁路电容、噪声路径和频率提示。",
    footer: "采购替代的第一步，是确认它在电路里承担的任务。",
    next: "下一页：C0G、X7R、X5R 到底代表什么？",
    risk: "不要把储能、去耦、旁路、滤波和耦合混为同一件事。"
  },
  {
    file: "03-classification.md", no: "03", name: "产品分类",
    question: "C0G、X7R、X5R 到底代表什么？",
    title: "三个字母，不是材料名称",
    subtitle: "它们首先表达温度特性与容量稳定性，再影响应用取舍",
    reader: "工程选型、采购替代、非技术读者",
    conclusion: "C0G、X7R、X5R 是温度特性和稳定性的选型语言，不应被简化为单一化学材料。",
    visual: "一类/二类陶瓷对比矩阵与温度编码拆解。",
    hierarchy: "类别对比 -> 编码拆解 -> 应用取舍 -> 页尾判断。",
    m1: "C0G/NP0：稳定、低容量密度。",
    m2: "X7R：较高容量密度，宽温通用。",
    m3: "X5R：更偏消费/空间效率，温度上限较低。",
    terms: "Class I, Class II, C0G/NP0, X7R, X5R, temperature characteristic。",
    data: "C0G、X7R、X5R 温度/容量变化编码，最终版需标准或厂商目录复核。",
    sources: "MLCC-F003, MLCC-F004, MLCC-F005, MLCC-F008。",
    assets: "编码拆解图和对比表。",
    svg: "矩阵、标签、温度轴、稳定性/容量密度取舍箭头。",
    footer: "先看介质类别，再谈替代料。",
    next: "下一页：标称 10μF，为什么实际可能不到？",
    risk: "编码数据目前为二级来源，最终图片前要补 IEC/EIA 或厂商目录。"
  },
  {
    file: "04-parameters.md", no: "04", name: "关键参数与有效容量",
    question: "标称 10μF，为什么实际工作时可能达不到 10μF？",
    title: "标称容量，不等于上板后的有效容量",
    subtitle: "电压、温度、老化、尺寸和介质类型共同改变真实表现",
    reader: "硬件工程、采购、质量和供应链人员",
    conclusion: "有效容量是工作条件下的结果，不是料号表里一个孤立数字。",
    visual: "漏斗或因果网络：标称容量经 DC Bias、温度、老化、ESR/ESL、机械应力后变成有效容量。",
    hierarchy: "关键参数网络 -> DC Bias 强调 -> 替代风险提示 -> 页尾判断。",
    m1: "额定电压与实际工作电压。",
    m2: "温度特性和老化。",
    m3: "ESR/ESL 与封装尺寸。",
    terms: "rated voltage, DC Bias, effective capacitance, ESR, ESL, aging。",
    data: "不写未指定型号的容量下降百分比。",
    sources: "MLCC-F006, MLCC-F007, MLCC-F011。",
    assets: "参数约束网络。",
    svg: "节点图、箭头、风险红线。",
    footer: "参数表是起点，工作条件才是答案。",
    next: "下一页：关键材料如何决定性能上限？",
    risk: "DC Bias 曲线强依赖型号，必须用具体型号数据才能画精确曲线。"
  },
  {
    file: "05-materials.md", no: "05", name: "关键材料",
    question: "钛酸钡、镍内电极和端电极如何决定性能上限？",
    title: "材料不是背景，是性能上限",
    subtitle: "介质粉体、添加剂、金属电极和端接体系共同决定薄层化与可靠性",
    reader: "产业研究、采购、工程和供应链人员",
    conclusion: "MLCC 壁垒不只在成品厂，关键材料和共烧匹配决定了可制造性与良率。",
    visual: "材料栈：介质粉体、添加剂/配方、内电极、端电极、电镀层。",
    hierarchy: "材料栈 -> 作用解释 -> 供应链瓶颈 -> 页尾判断。",
    m1: "BaTiO3 基材料：高介电基础但非唯一体系。",
    m2: "Ni 内电极：与共烧气氛和收缩控制相关。",
    m3: "端接/电镀：电连接、焊接和可靠性接口。",
    terms: "BaTiO3, powder purity, particle size distribution, additive, Ni internal electrode, termination, co-firing。",
    data: "不写纯度、粒径、厚度具体数字。",
    sources: "MLCC-F008, MLCC-F009, MLCC-F012。",
    assets: "粉体颗粒概念视觉和材料栈。",
    svg: "材料层级图、供应链瓶颈标注。",
    footer: "国产化不能只看成品料号，还要看材料和工艺接口。",
    next: "下一页：从粉体到成品经历哪些工序？",
    risk: "不同介质类别和厂商配方差异大，不能把所有 MLCC 写成同一材料体系。"
  },
  {
    file: "06-process.md", no: "06", name: "制造工艺",
    question: "从陶瓷粉体到一颗 MLCC，要经历哪些工序？",
    title: "很多层，如何稳定做成一颗",
    subtitle: "薄膜、印刷、叠层、共烧和分选，把材料能力变成规模化良率",
    reader: "产业研究、采购、工程和非技术读者",
    conclusion: "MLCC 制造壁垒来自多工序的连续精度控制，而不是某一道孤立步骤。",
    visual: "11 步制造流程图，底部串联四个关键控制点。",
    hierarchy: "流程主线 -> 工艺控制点 -> 供应链含义 -> 页尾判断。",
    m1: "粉体/浆料、流延、印刷决定薄层均匀性。",
    m2: "叠层、压合、切割、排胶、烧结决定结构完整性。",
    m3: "端接、电镀、测试分选决定可焊性、可靠性和交付一致性。",
    terms: "slurry, tape casting, screen printing, lamination, binder burnout, sintering, termination, plating, sorting。",
    data: "不写层数、厚度、良率。",
    sources: "MLCC-F010, MLCC-F012。",
    assets: "工艺流程线稿。",
    svg: "流程卡片、箭头、关键控制点、风险标签。",
    footer: "材料是上限，工艺把上限变成良率。",
    next: "下一页：MLCC 价值如何沿产业链形成？",
    risk: "不同厂商细节不同，本页只表达通用流程和控制逻辑。"
  },
  {
    file: "07-supply-chain.md", no: "07", name: "产业链",
    question: "MLCC 的价值如何沿产业链形成？",
    title: "产业链，不止成品厂",
    subtitle: "粉体、浆料、设备、制造、分销和终端验证共同决定供应弹性",
    reader: "采购、供应链、产业研究人员",
    conclusion: "看 MLCC 供应风险，要从材料和设备延伸到客户验证与渠道稳定性。",
    visual: "上游 -> 中游 -> 分销 -> 下游的价值链地图。",
    hierarchy: "产业链地图 -> 高壁垒环节 -> 风险信号 -> 页尾判断。",
    m1: "上游：陶瓷粉体、金属粉/浆料、添加剂、设备和耗材。",
    m2: "中游：MLCC 制造、测试、分选、质量体系。",
    m3: "下游：汽车、AI 服务器、工业、消费电子与 EMS/OEM。",
    terms: "upstream materials, equipment, MLCC maker, distributor, OEM, EMS, qualification。",
    data: "不写份额和集中度百分比，除非第二阶段补一级来源。",
    sources: "MLCC-F010, MLCC-F012。",
    assets: "产业链桑基或分层地图。",
    svg: "价值链分层、瓶颈标签、风险提示。",
    footer: "供应链判断不能停在 BOM 上的一个料号。",
    next: "下一页：全球企业究竟在竞争什么？",
    risk: "主要厂商和材料设备企业需逐一用官网/年报核验后纳入。"
  },
  {
    file: "08-competition.md", no: "08", name: "竞争格局",
    question: "全球 MLCC 企业究竟在竞争什么？",
    title: "不要先排座次，先看能力维度",
    subtitle: "小型化、高容量、高压、高频、高可靠、车规和规模交付共同构成竞争力",
    reader: "产业研究、采购、供应链负责人",
    conclusion: "MLCC 竞争不是单一份额排名，而是材料、工艺、产品组合、客户验证和交付稳定性的组合。",
    visual: "能力雷达/矩阵，列出企业类型但不做未经核验的份额排行。",
    hierarchy: "能力维度 -> 企业纳入规则 -> 采购含义 -> 页尾判断。",
    m1: "能力维度：小型化、高容量、高压、高频、高可靠。",
    m2: "体系能力：材料自制、制造良率、车规认证、客户验证。",
    m3: "交付能力：规模、区域供应、成本和渠道稳定。",
    terms: "miniaturization, high capacitance, high voltage, high frequency, automotive grade, qualification, yield。",
    data: "暂不标注市场份额、排名、产能。",
    sources: "待第二阶段逐家厂商官网、目录、年报核验。",
    assets: "能力矩阵。",
    svg: "企业类型矩阵、能力标签。",
    footer: "对采购来说，第二来源不是名字相似，而是能力匹配。",
    next: "下一页：选型和替代最容易忽视什么？",
    risk: "不输出荐股、评级、份额排名或未经核验的受益公司名单。"
  },
  {
    file: "09-checklist.md", no: "09", name: "工程与采购检查表",
    question: "选择和替代 MLCC 时，最容易忽视什么？",
    title: "替代料，不能只对三项参数",
    subtitle: "容量、电压、封装只是起点；有效容量、可靠性、渠道和验证才决定能否替代",
    reader: "工程、采购、SQE、供应链和产品团队",
    conclusion: "MLCC 替代风险来自电性能、可靠性和供应链三条线同时不确定。",
    visual: "工程检查与采购检查双栏清单。",
    hierarchy: "工程检查 -> 采购检查 -> ChainFlow 判断 -> 来源和免责声明。",
    m1: "工程检查：工作电压、有效容量、温度、DC Bias、ESR/ESL、板弯、噪声、焊接、可靠性。",
    m2: "采购检查：渠道、交期、产地、停产、第二来源、料号映射、车规批准、假货风险、产能财务风险。",
    m3: "替代流程：先参数筛选，再工程验证，再供应链验证。",
    terms: "effective capacitance, derating, AEC-Q200, PCN, EOL, second source, counterfeit risk。",
    data: "无定量数据。",
    sources: "MLCC-F006, MLCC-F007, MLCC-F011；AEC-Q200 待补标准来源。",
    assets: "检查表图标与风险红线。",
    svg: "双栏清单、勾选框、风险标签。",
    footer: "ChainFlow 判断：MLCC 是小器件、大系统风险；替代的本质是重新验证。",
    next: "本期结束。",
    risk: "车规和可靠性标准必须在最终版补一级来源。"
  }
];

for (const p of scripts) write(`page-scripts/${p.file}`, pageScript(p));

files["copy/wechat-draft.md"] = `# 公众号正文草稿

## 正式标题

10张图读懂 MLCC：从材料、工艺与核心参数，到产业链、竞争格局与采购风险

## 简短导语

MLCC，多层片式陶瓷电容器，是电子系统里最常见、也最容易被低估的元器件之一。它看起来只是 BOM 上的一行小料号，但实际表现会被介质类别、DC Bias、温度、老化、尺寸、制造工艺、认证和供应链稳定性共同影响。

链流 ChainFlow 第一篇“品类志”，选择用 10 张图拆解 MLCC。我们关心的不只是“它是什么”，更关心工程选型、采购替代和供应风险如何被看见。

## 十张图位置

00 封面与研究定位  
01 内部结构  
02 工作原理与系统作用  
03 产品分类  
04 关键参数与有效容量  
05 关键材料  
06 制造工艺  
07 产业链  
08 竞争格局  
09 工程与采购检查表

## 必要补充说明

本期不把公开资料中的市场规模、厂商份额、单车或单服务器使用数量直接写成确定结论。相关数字常见于二手报告和媒体转述，年份、统计口径和应用边界差异较大。除非能追溯到厂商、标准、年报或可靠研究机构的明确口径，否则只作为研究线索。

## 简短结语

ChainFlow 的判断很简单：MLCC 是典型的小器件、大系统风险。真正的替代，不是把容量、电压和封装对齐，而是把工作条件、有效容量、可靠性、验证周期和供应稳定性一起重新确认。

## 来源说明

主要参考 Murata 技术 FAQ、陶瓷电容与电容量基础资料、材料与制造流程综述。完整来源清单和事实表见本期 evidence 目录。

## 免责声明

本文用于产业研究和工程采购知识整理，不构成投资建议、采购指令或对任何厂商产品的背书。具体设计和替代决策应以原厂规格书、应用指南、客户验证和质量体系要求为准。
`;

const brandTokens = {
  brand: {
    zh: "链流",
    en: "ChainFlow",
    vision_zh: "让供应链，如水一般。",
    vision_en: "Let supply chains flow like water.",
    series: "链流品类志",
    issue: "CF Components 001"
  },
  canvas: { width: 1080, height: 1440, ratio: "3:4" },
  colors: {
    paper: "#F6F0E6",
    paperWarm: "#EFE5D6",
    ink: "#1B1F24",
    muted: "#5F6974",
    navy: "#102B4E",
    blue: "#246A93",
    blueGray: "#71869A",
    line: "#C7CED2",
    gold: "#C8A45D",
    red: "#B33A3A",
    ceramic: "#D8C7A0",
    electrode: "#15385E",
    nickel: "#9EABB4",
    tin: "#C8D6DC"
  },
  typography: {
    sans: "-apple-system, BlinkMacSystemFont, 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif",
    serif: "'Songti SC', 'Noto Serif CJK SC', 'STSong', SimSun, serif",
    title: { size: 72, lineHeight: 1.08, weight: 700 },
    subtitle: { size: 27, lineHeight: 1.38, weight: 500 },
    body: { size: 24, lineHeight: 1.48, weight: 400 },
    caption: { size: 17, lineHeight: 1.35, weight: 400 }
  },
  layout: {
    marginX: 70,
    headerY: 58,
    footerY: 1345,
    radius: 8,
    stroke: 2
  }
};

j("templates/brand-tokens.json", brandTokens);

files["templates/typography.css"] = `:root {
  --cf-font-sans: -apple-system, BlinkMacSystemFont, "PingFang SC", "Noto Sans SC", "Microsoft YaHei", Arial, sans-serif;
  --cf-font-serif: "Songti SC", "Noto Serif CJK SC", "STSong", SimSun, serif;
  --cf-title-size: 72px;
  --cf-subtitle-size: 27px;
  --cf-body-size: 24px;
  --cf-caption-size: 17px;
}

body {
  font-family: var(--cf-font-sans);
  color: #1B1F24;
}

.cf-title {
  font-family: var(--cf-font-serif);
  font-size: var(--cf-title-size);
  line-height: 1.08;
  font-weight: 700;
  letter-spacing: 0;
}

.cf-subtitle {
  font-size: var(--cf-subtitle-size);
  line-height: 1.38;
  font-weight: 500;
}

.cf-body {
  font-size: var(--cf-body-size);
  line-height: 1.48;
}

.cf-caption {
  font-size: var(--cf-caption-size);
  line-height: 1.35;
}`;

files["templates/layout.css"] = `:root {
  --cf-paper: #F6F0E6;
  --cf-ink: #1B1F24;
  --cf-navy: #102B4E;
  --cf-muted: #5F6974;
  --cf-line: #C7CED2;
  --cf-red: #B33A3A;
}

html,
body {
  margin: 0;
  min-height: 100%;
  background: #e5e1d7;
}

.page-frame {
  width: 1080px;
  height: 1440px;
  margin: 0 auto;
  background: var(--cf-paper);
  overflow: hidden;
}

.page-frame img,
.page-frame object {
  display: block;
  width: 1080px;
  height: 1440px;
}`;

files["templates/components/README.md"] = `# 组件说明

当前样页使用 SVG 内联组件：页眉、标题区、页尾判断、来源注记、技术标注、流程卡片。后续七页可从 editable/svg 中抽取为独立组件。
`;

function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function text(x, y, lines, cls = "body", opts = {}) {
  const arr = Array.isArray(lines) ? lines : [lines];
  const size = opts.size || (cls === "title" ? 72 : cls === "subtitle" ? 27 : cls === "caption" ? 17 : 24);
  const lh = opts.lh || Math.round(size * 1.38);
  const anchor = opts.anchor ? ` text-anchor="${opts.anchor}"` : "";
  const weight = opts.weight ? ` font-weight="${opts.weight}"` : "";
  const fill = opts.fill ? ` style="fill:${opts.fill}"` : "";
  const family = opts.family ? ` font-family="${opts.family}"` : "";
  return `<text x="${x}" y="${y}" class="${cls}"${anchor}${weight}${fill}${family}>${arr
    .map((line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lh}">${esc(line)}</tspan>`)
    .join("")}</text>`;
}

function pageBase({ no, name, title, subtitle, next, source, body, titleSize = 70 }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440">
<defs>
  <linearGradient id="softEdge" x1="0" x2="1">
    <stop offset="0" stop-color="#F6F0E6"/>
    <stop offset="1" stop-color="#EFE5D6"/>
  </linearGradient>
  <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
    <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#102B4E" flood-opacity="0.10"/>
  </filter>
</defs>
<style>
  .sans{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC","Microsoft YaHei",Arial,sans-serif}
  .serif{font-family:"Songti SC","Noto Serif CJK SC","STSong",SimSun,serif}
  text{font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC","Microsoft YaHei",Arial,sans-serif;fill:#1B1F24;letter-spacing:0}
  .title{font-family:"Songti SC","Noto Serif CJK SC","STSong",SimSun,serif;font-size:70px;font-weight:700}
  .subtitle{font-size:27px;font-weight:500;fill:#41505D}
  .body{font-size:24px;fill:#1B1F24}
  .caption{font-size:17px;fill:#65717D}
  .label{font-size:21px;font-weight:650;fill:#102B4E}
  .mini{font-size:15px;fill:#65717D}
  .num{font-size:18px;font-weight:700;fill:#102B4E}
  .line{stroke:#C7CED2;stroke-width:2;fill:none}
  .navy{fill:#102B4E}
  .red{fill:#B33A3A}
</style>
<rect width="1080" height="1440" fill="#F6F0E6"/>
<path d="M0 0 H1080 V1440 H0 Z" fill="url(#softEdge)" opacity="0.55"/>
<path d="M70 92 H1010" stroke="#C7CED2" stroke-width="1.5"/>
${text(70, 62, "链流品类志  /  CF Components 001", "caption", { weight: 600, fill: "#102B4E" })}
${text(1010, 62, `${no} / 09`, "caption", { anchor: "end", weight: 700, fill: "#102B4E" })}
${text(70, 170, title, "title", { size: titleSize })}
${text(72, 218, subtitle, "subtitle")}
${body}
<path d="M70 1322 H1010" stroke="#C7CED2" stroke-width="1.5"/>
${text(70, 1353, "ChainFlow 判断", "caption", { weight: 700, fill: "#102B4E" })}
${text(192, 1353, next, "caption", { fill: "#1B1F24" })}
${text(70, 1385, source, "mini")}
</svg>`;
}

const coverBody = `
<g transform="translate(540 650)" filter="url(#shadow)">
  <path d="M-305 -116 L190 -190 L318 -105 L-175 -28 Z" fill="#E0CDA5" stroke="#A89267" stroke-width="3"/>
  <path d="M-175 -28 L318 -105 L318 120 L-175 210 Z" fill="#D2B77B" stroke="#9B8457" stroke-width="3"/>
  <path d="M-305 -116 L-175 -28 L-175 210 L-305 105 Z" fill="#AAB7BD" stroke="#7E8B93" stroke-width="3"/>
  <path d="M190 -190 L318 -105 L318 120 L190 27 Z" fill="#C2D1D7" stroke="#7E8B93" stroke-width="3"/>
  ${Array.from({ length: 10 }, (_, i) => {
    const y = -7 + i * 21;
    return `<path d="M-154 ${y} L300 ${y - 82}" stroke="${i % 2 ? "#15385E" : "#F6F0E6"}" stroke-width="${i % 2 ? 5 : 7}" opacity="${i % 2 ? 0.95 : 0.82}"/>`;
  }).join("")}
  <path d="M-250 103 L248 15" stroke="#15385E" stroke-width="4" opacity="0.25"/>
  <path d="M-250 132 L248 43" stroke="#15385E" stroke-width="4" opacity="0.20"/>
</g>
<path d="M92 375 C210 330 297 365 390 338 S573 252 716 316 S884 352 994 285" fill="none" stroke="#246A93" stroke-width="3" opacity="0.35"/>
<path d="M94 1190 C226 1140 342 1185 454 1150 S676 1070 816 1122 S930 1164 1004 1125" fill="none" stroke="#246A93" stroke-width="3" opacity="0.24"/>
${text(94, 840, ["正式名称：多层片式陶瓷电容器", "Multilayer Ceramic Chip Capacitor"], "body", { fill: "#102B4E", weight: 700, size: 28, lh: 40 })}
<g transform="translate(90 940)">
  ${["AI服务器", "汽车电子", "工业电源", "消费电子"].map((label, i) => {
    const x = i * 235;
    const icon = [
      `<rect x="${x}" y="0" width="56" height="68" rx="6" fill="#102B4E"/><path d="M${x+12} 18 H${x+44} M${x+12} 34 H${x+44} M${x+12} 50 H${x+44}" stroke="#F6F0E6" stroke-width="4"/>`,
      `<path d="M${x+3} 42 L${x+18} 18 H${x+48} L${x+64} 42 Z" fill="#102B4E"/><circle cx="${x+18}" cy="51" r="8" fill="#102B4E"/><circle cx="${x+50}" cy="51" r="8" fill="#102B4E"/>`,
      `<rect x="${x+2}" y="15" width="64" height="44" rx="5" fill="#102B4E"/><path d="M${x+12} 37 H${x+56}" stroke="#F6F0E6" stroke-width="5"/>`,
      `<rect x="${x+10}" y="6" width="46" height="68" rx="8" fill="#102B4E"/><circle cx="${x+33}" cy="61" r="3" fill="#F6F0E6"/>`
    ][i];
    return `<g>${icon}${text(x + 80, 43, label, "label")}</g>`;
  }).join("")}
</g>
<rect x="70" y="1098" width="940" height="116" rx="8" fill="#FFFFFF" opacity="0.60" stroke="#C7CED2"/>
${text(102, 1140, "本期覆盖", "label")}
${text(228, 1139, "结构 / 参数 / 材料 / 工艺 / 产业链 / 竞争能力 / 替代风险", "body", { size: 24 })}
${text(228, 1180, "不输出投资建议，不使用未经核验的市场份额和单机用量数字", "caption", { size: 18, fill: "#B33A3A" })}
`;

const svg00 = pageBase({
  no: "00",
  name: "封面",
  title: "10张图读懂MLCC",
  subtitle: "从材料、工艺与核心参数，到产业链、竞争格局与采购风险",
  next: "小器件，大系统风险；壁垒藏在材料、工艺和验证里。",
  source: "来源说明：本页为研究定位页；不含市场规模、份额或使用量数字。",
  body: coverBody
});

const layers = Array.from({ length: 13 }, (_, i) => {
  const y = 400 + i * 27;
  const dielectric = `<rect x="230" y="${y}" width="610" height="18" fill="${i % 2 ? "#E7DAC2" : "#D8C7A0"}" stroke="#BDAE92" stroke-width="1"/>`;
  const electrode = i < 12 ? (i % 2 === 0
    ? `<rect x="250" y="${y + 17}" width="500" height="8" fill="#15385E"/>`
    : `<rect x="320" y="${y + 17}" width="500" height="8" fill="#15385E"/>`) : "";
  return dielectric + electrode;
}).join("");

const structureBody = `
<rect x="118" y="365" width="92" height="442" rx="5" fill="#B8C7CE" stroke="#73828C" stroke-width="3"/>
<rect x="870" y="365" width="92" height="442" rx="5" fill="#B8C7CE" stroke="#73828C" stroke-width="3"/>
<rect x="140" y="383" width="38" height="406" fill="#8D9AA3" opacity="0.62"/>
<rect x="902" y="383" width="38" height="406" fill="#D6E2E6" opacity="0.78"/>
<rect x="210" y="385" width="660" height="414" rx="4" fill="#F1E8D8" stroke="#897B61" stroke-width="3"/>
${layers}
${Array.from({ length: 6 }, (_, i) => `<path d="M210 ${425 + i * 54} H250" stroke="#15385E" stroke-width="8"/>`).join("")}
${Array.from({ length: 6 }, (_, i) => `<path d="M820 ${452 + i * 54} H870" stroke="#15385E" stroke-width="8"/>`).join("")}
<path d="M164 355 V828" stroke="#102B4E" stroke-width="2" stroke-dasharray="7 8" opacity="0.45"/>
<path d="M916 355 V828" stroke="#102B4E" stroke-width="2" stroke-dasharray="7 8" opacity="0.45"/>

<g>
  <path d="M300 344 L356 415" class="line"/>
  <circle cx="300" cy="344" r="5" fill="#102B4E"/>
  ${text(125, 332, ["陶瓷介质层", "隔开相邻电极，决定介电性能"], "caption", { fill: "#102B4E", weight: 700, size: 20, lh: 28 })}
</g>
<g>
  <path d="M760 325 L705 444" class="line"/>
  <circle cx="760" cy="325" r="5" fill="#102B4E"/>
  ${text(775, 318, ["内电极", "交错伸向左右端头"], "caption", { fill: "#102B4E", weight: 700, size: 20, lh: 28 })}
</g>
<g>
  <path d="M139 838 L154 775" class="line"/>
  <circle cx="139" cy="838" r="5" fill="#102B4E"/>
  ${text(115, 878, ["端电极", "把奇偶层分别引出"], "caption", { fill: "#102B4E", weight: 700, size: 20, lh: 28 })}
</g>
<g>
  <path d="M930 850 L910 775" class="line"/>
  <circle cx="930" cy="850" r="5" fill="#102B4E"/>
  ${text(742, 878, ["Ni / Sn 电镀", "改善阻挡层与焊接界面"], "caption", { fill: "#102B4E", weight: 700, size: 20, lh: 28 })}
</g>

<rect x="95" y="940" width="890" height="220" rx="8" fill="#FFFFFF" opacity="0.62" stroke="#C7CED2"/>
${text(126, 990, "结构逻辑", "label", { size: 24 })}
${text(126, 1040, ["每两片相邻内电极之间形成一个电容单元。", "交错端头把许多单元等效并联。", "容量随有效面积、介电常数和层数增加。"], "body", { size: 24, lh: 35 })}
<rect x="655" y="1018" width="285" height="76" rx="8" fill="#102B4E"/>
${text(797, 1063, "C_total ≈ n × εrε0A / d", "caption", { size: 22, fill: "#F6F0E6", anchor: "middle", weight: 700 })}
${text(126, 1148, "边界：Ni 内电极和端接材料随厂商、系列和应用等级变化，本图表达通用连接逻辑。", "caption", { size: 18, fill: "#B33A3A" })}
`;

const svg01 = pageBase({
  no: "01",
  name: "内部结构",
  title: "一颗MLCC内部，不是一片电容",
  subtitle: "交错内电极与陶瓷介质层，把许多微型电容并联到两个端头",
  next: "看懂端头连接，才看得懂为什么同样封装也会有不同性能边界。",
  source: "事实来源：MLCC-F001/F002/F009；结构为通用示意，非特定厂商型号。",
  body: structureBody
});

const processSteps = [
  ["01", "粉体与浆料", "粉体、添加剂、溶剂和粘结剂形成稳定浆料"],
  ["02", "流延成膜", "把浆料形成薄而均匀的陶瓷绿片"],
  ["03", "内电极印刷", "在绿片上印刷交错内电极图案"],
  ["04", "叠层", "按电极方向交替堆叠并保持对位"],
  ["05", "压合", "把多层绿片压成整体胚体"],
  ["06", "切割", "切成单颗芯片尺寸"],
  ["07", "排胶", "去除有机物，避免烧结缺陷"],
  ["08", "烧结/共烧", "陶瓷与内电极共同致密化"],
  ["09", "端接", "形成两端电连接与机械接口"],
  ["10", "电镀", "形成阻挡层和可焊表面"],
  ["11", "测试分选", "按容量、耐压、损耗与外观分级"]
];

const processCards = processSteps.map((s, i) => {
  const col = i % 3;
  const row = Math.floor(i / 3);
  const x = 80 + col * 315;
  const y = 340 + row * 188;
  const arrow = i < processSteps.length - 1 && col !== 2
    ? `<path d="M${x + 280} ${y + 66} H${x + 314}" stroke="#246A93" stroke-width="3" marker-end="url(#arr)"/>`
    : "";
  return `<g>
  <rect x="${x}" y="${y}" width="270" height="132" rx="8" fill="#FFFFFF" opacity="0.72" stroke="#C7CED2"/>
  <circle cx="${x + 36}" cy="${y + 38}" r="22" fill="#102B4E"/>
  ${text(x + 36, y + 46, s[0], "caption", { size: 18, fill: "#F6F0E6", anchor: "middle", weight: 800 })}
  ${text(x + 72, y + 43, s[1], "label", { size: 23 })}
  ${text(x + 24, y + 88, [s[2].slice(0, 16), s[2].slice(16)], "caption", { size: 18, lh: 25 })}
  ${arrow}
</g>`;
}).join("");

const processBody = `
<defs>
  <marker id="arr" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
    <path d="M0,0 L0,6 L9,3 z" fill="#246A93"/>
  </marker>
</defs>
${text(72, 286, "通用制造流程", "label", { size: 26 })}
${processCards}
<path d="M920 472 V528 H174 V528" stroke="#246A93" stroke-width="3" fill="none" marker-end="url(#arr)" opacity="0.75"/>
<path d="M920 660 V716 H174 V716" stroke="#246A93" stroke-width="3" fill="none" marker-end="url(#arr)" opacity="0.75"/>
<path d="M920 848 V904 H174 V904" stroke="#246A93" stroke-width="3" fill="none" marker-end="url(#arr)" opacity="0.75"/>

<rect x="70" y="1115" width="940" height="148" rx="8" fill="#102B4E"/>
${text(102, 1160, "关键控制点", "caption", { size: 22, fill: "#F6F0E6", weight: 700 })}
${["薄层均匀性", "印刷对位", "共烧收缩一致", "缺陷控制", "测试分选"].map((s, i) => {
  const x = 102 + i * 177;
  return `<g><rect x="${x}" y="1185" width="150" height="46" rx="8" fill="#F6F0E6" opacity="0.95"/>${text(x + 75, 1215, s, "caption", { size: 18, fill: "#102B4E", anchor: "middle", weight: 700 })}</g>`;
}).join("")}
${text(102, 1280, "供应链含义：任何一个环节失控，都会变成良率、可靠性或交付稳定性问题。", "caption", { size: 19, fill: "#B33A3A", weight: 700 })}
`;

const svg06 = pageBase({
  no: "06",
  name: "制造工艺",
  title: "很多层，如何稳定做成一颗",
  subtitle: "薄膜、印刷、叠层、共烧和分选，把材料能力变成规模化良率",
  next: "材料是上限，工艺把上限变成良率。",
  source: "事实来源：MLCC-F010/F012；流程为通用示意，不含未核验层数、厚度或良率。",
  body: processBody
});

write("editable/svg/00-cover.svg", svg00);
write("editable/svg/01-structure.svg", svg01);
write("editable/svg/06-process.svg", svg06);

function html(file, title) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=1080, initial-scale=1">
  <title>${title}</title>
  <link rel="stylesheet" href="../templates/typography.css">
  <link rel="stylesheet" href="../templates/layout.css">
</head>
<body>
  <main class="page-frame">
    <img src="./svg/${file}.svg" alt="${title}">
  </main>
</body>
</html>`;
}

write("editable/00-cover.html", html("00-cover", "ChainFlow MLCC 00 封面"));
write("editable/01-structure.html", html("01-structure", "ChainFlow MLCC 01 内部结构"));
write("editable/06-process.html", html("06-process", "ChainFlow MLCC 06 制造工艺"));

files["assets/prompts/00-cover-visual-prompt.md"] = `# 可选封面无文字产品渲染 Prompt

如果后续使用图像模型，只生成无文字背景资产，不让模型生成中文、参数、页码或来源。

Prompt:
Professional editorial product render of a multilayer ceramic chip capacitor, warm ivory paper background, precise ceramic block with metallic terminations, subtle supply-chain research publication style, no text, no labels, no logo, no watermark.
`;

files["qa/factual-review.md"] = `# 第一阶段事实审核报告

## 结论

通过第一阶段样页审核。三张样页未使用市场规模、份额、产能、单机用量、层数、厚度或具体型号参数，因此没有未核验数字进入图片。

## 已检查项

- 00 封面：无定量事实；只做研究定位和范围说明。
- 01 内部结构：表达交错内电极、介质层、端电极和等效并联逻辑；未写具体层数和材料绝对化判断。
- 06 制造工艺：表达通用流程；未写良率、厚度、产能或设备品牌。

## 待第二阶段补强

- 用 Murata、TDK、Samsung Electro-Mechanics、Taiyo Yuden 等厂商结构/工艺资料复核 01、05、06 细节。
- 用 IEC/EIA 或厂商目录复核 C0G、X7R、X5R 编码。
- 用标准或车规资料补强 AEC-Q200 和汽车可靠性表述。
`;

files["qa/peer-review.md"] = `# 第一阶段专业同行审核

## MLCC 产品工程师视角

- 通过：没有把 X7R/X5R 写成固定化学材料；没有写未指定型号的 DC Bias 数值。
- 建议：最终版 01 页端接材料应按厂商结构图复核，避免过度泛化 Ni/Sn 层。

## 电子元器件采购视角

- 通过：封面和脚本已强调替代不能只看容量、电压、封装。
- 建议：后续 09 页需要加入 PCN/EOL、渠道授权和批次追溯。

## 汽车电子供应链视角

- 通过：没有未经来源写单车用量。
- 建议：后续补 AEC-Q200、PPAP/客户批准、板弯和热循环验证边界。

## 产业研究员视角

- 通过：竞争格局转向能力维度，避免简单排行榜。
- 建议：后续 08 页纳入企业前需逐家核验产品组合和公开资料。

## 普通非技术读者视角

- 通过：三张样页主结论清晰，每页只讲一个问题。
- 建议：02 页后续应更直观地区分去耦、旁路、滤波和耦合。
`;

files["qa/visual-review.md"] = `# 第一阶段视觉审核报告

## 结论

三张样页已按 1080 x 1440 竖版建立统一出版物视觉：米白纸张背景、炭黑正文、海军蓝强调、红色只用于风险提示。技术文字由 SVG/HTML 绘制，无 AI 乱码风险。

## 00 封面

- 通过：品牌、标题、产品主视觉和应用场景明确；无数据堆砌。
- 注意：后续可替换为更精细的无文字产品渲染，但不能改变技术文本层。

## 01 内部结构

- 通过：叠层结构、左右端头连接和等效并联逻辑可读。
- 注意：手机缩略图下公式区仍可读；后续若加入更多材料标注，不应缩小主图。

## 06 制造工艺

- 通过：11 步流程在竖版内可读，底部关键控制点形成供应链判断。
- 注意：本页信息密度高，后续正式版可进一步优化箭头路径和步骤卡片留白。

## 统一性

- 页眉、主标题、页脚、来源和 ChainFlow 判断层级一致。
- 没有使用廉价科技渐变、爆炸贴纸、卡通表情或过度光效。

## 已完成迭代

- 01 内部结构：修复公式盒文字对比度不足和说明文字轻微遮挡。
- 06 制造工艺：将过长标题改为“很多层，如何稳定做成一颗”，修复右侧裁切问题。
`;

for (const [rel, content] of Object.entries(files)) write(rel, content);

console.log(`Generated ChainFlow MLCC phase 1 files in ${root}`);
