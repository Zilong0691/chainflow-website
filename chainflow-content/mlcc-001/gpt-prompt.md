# ChainFlow MLCC 001 — 公众号封面图 + 十页图文脚本与视觉提示词

---

## 公众号封面图

⚠️ 横构图 2.35:1，不是 3:4 竖版。公众号文章顶部头图。

### 文章标题
十张图拆解 MLCC：AI 算力军备竞赛背后，藏着一颗比米粒还小的器件

### 正向生图提示词

```
Premium WeChat article cover, 2.35:1 widescreen cinematic ratio, 1800x768px. Deep navy-blue to dark teal gradient background with subtle hexagonal grid and circuit-trace decorative elements at low opacity. A hyper-realistic 3D render of an 0402 MLCC capacitor (1.0x0.5mm, warm beige ceramic body, brilliant gold-metallic end caps) placed side-by-side with a single grain of white rice — symmetrical comparison, MLCC left, rice right, both floating above a dark reflective surface. Cinematic lighting from upper-left, sharp highlights, defined shadows, high contrast. The upper 30% of the frame is reserved as a dark gradient zone suitable for white Chinese title text overlay in post-production. Fine cyan annotation lines with precise dimension callouts (1.0mm, 0.5mm). Subtle copper-gold data nodes and connection lines weaving in the background, suggesting supply chain networks. Bottom-left corner: very small muted grey text "公众号：链流 ChainFlow". Faint translucent "MLCC" watermark ghosted at 6-8% opacity. Premium tech-industry magazine aesthetic — dark, sophisticated, high-contrast, precise. 8K resolution, hyper-detailed, professional product photography quality, cinematic lighting, --ar 2.35:1
```

### 负面提示词

```
warm cream paper background, beige tones, vintage style, hand-drawn, sketch, cartoon, illustration, bright daylight, overexposed, blurry, low contrast, minimalist poster, blog header, white background, light mode, pastel colors, organic texture, grunge, handwritten text, cluttered, flat design without depth
```

### 适配说明

- 吸收参考图优点：深色科技感背景 + 实物并置对比构图 + 电影级光影 + 技术标注线 + 高信息密度
- 匹配品牌规范：铜金数据节点呼应 ChainFlow 供应链视角，深蓝底色延续系列统一调性
- 标题安全区：上方30%暗色渐变，为白色中文标题预留空间

---

## 第01页 — 脚本

# 01｜封面

## 页面编号
01 / 10

## 页面标题
MLCC·多层片式陶瓷电容器

## 副标题
MLCC · 多层片式陶瓷电容器

## 一句话核心结论
MLCC 是电子供应链中最不可见、也最容易被低估的战略物资——它的供应弹性决定了众多电子产品的交付弹性。

## 外行可懂表达
你手机里上千颗、AI服务器里上万颗的微小电容，任何一颗断供都可能导致产线停滞。它不是高科技明星，却是所有高科技的地基。

## ChainFlow供应链视角
小器件、大数量、长认证周期、材料集中在上游——把供应商风险、库存策略和BOM管理同时放大了。供应链判断不能只看器件单价，要看替代难度、交期和认证锁定期。

## 非技术深度
来自供应链风险传导，而非器件性能参数。一颗MLCC断供→BOM缺料→整机无法交付→下游产线停滞。

## 页面正文
（本页不放置正文段落。）

## 图上标注文字
- 主视觉区域：MLCC 剖面结构图——展示陶瓷介质层、镍内电极、端电极的交替叠层关系。不需要完整剖面，半剖或局部剖面即可，作为封面的技术视觉锚点
- 本期看点（在主图下方或侧方，作为封面信息密度补充）：
  · 从矿山到纳米粉体：MLCC的上游穿透
  · 良率乘法：为什么造一亿颗一样的是壁垒
  · 2018 vs 2026：两次短缺，本质完全不同
  · 盯价格不如盯信号：供应链判断框架
- 覆盖范围：结构 · 材料 · 工艺 · 产业链 · 竞争格局 · 替代风险
- 不覆盖：投资建议 · 未经核验的市场份额与单机用量数字

## 必须出现的数据
无定量数据。但剖面结构图需体现层叠逻辑（介质层+内电极交替），不要求层数精确。

## 来源编号
ChainFlow 品牌文档。

## 事实风险
低。封面无定量事实。

## 可删减内容
本期看点中如与内页重复过多可精简条目，但至少保留 3 条。

## 视觉中心
暖纸白底。画面包含两个核心元素：① MLCC 剖面结构图（半剖或局部，展示内部叠层——陶瓷介质层与金属内电极的交替）② 流动数据线条/光点——两者的结合同时体现"技术解剖"和"链流/数据流动"的品牌基因。标题居中或偏上，本期看点和覆盖范围在主图下方。信息密度高于普通封面，有"杂志封面"的丰富感而非"海报"的极简感。

## 手机端三秒阅读顺序
① MLCC 剖面结构图 → ② "MLCC·多层片式陶瓷电容器" → ③ 本期看点（快速扫描知道这篇讲什么）

## Figma排版提醒
- 左上角：链流图解 001|陶瓷电容
- 左下角：公众号：链流 ChainFlow   chainflowlab.com
- 右下角：01/10
- 标题居中，宋体 Bold，暖纸白
- 不使用署名

---

## 第01页 — 视觉提示词

# 01｜封面 — 视觉锚点提示词

## image2-primary

```
WeChat official account cover image. 3:4 vertical, 1080x1440px. Warm ivory paper background with subtle fiber texture.

UPPER PORTION (top 30-40%): A large, bold, elegant Chinese title in deep navy/charcoal serif font — "MLCC·多层片式陶瓷电容器" — clean and prominent, like a magazine cover headline.

CENTER-LOWER: A human fingertip holding a tiny 0402 MLCC (1.0×0.5mm). The capacitor is shockingly small — a grain of sand, 5% of the frame. Razor-sharp focus: warm beige ceramic body, shiny silver end caps. Surrounding it, flowing data stream lines and glowing node points in muted copper and steel blue weave across the composition — supply chain data flows.

Bottom-left corner: "公众号：链流 ChainFlow" in very small subtle muted grey sans-serif. Faint translucent "MLCC" watermark ghosted across background.

The image should feel like a premium publication cover — magazine-quality, not a blog header. Clean, warm, authoritative, eye-catching.
```

画面主体：上方大字标题"MLCC·多层片式陶瓷电容器" + 下方指尖捏MLCC + 数据流线
标题要求：大号、粗体、衬线字体、深海军蓝/炭灰色、杂志封面感
禁止：剖面蓝图、多余文字

## image2-alternative

```
WeChat cover image. 3:4 vertical. Warm cream paper background.

TOP HALF: Large elegant Chinese title in deep navy serif — "MLCC·多层片式陶瓷电容器" — dominating the upper portion, clean and bold.

BOTTOM HALF: A single 0402 MLCC on a fingertip, tiny against the skin texture. Copper-gold data nodes and steel-blue connection lines radiate outward like a constellation. Bottom-left: small "公众号：链流 ChainFlow". Faint "MLCC" watermark. No other text.

Premium, warm, authoritative — a magazine cover, not a tech blog.
```


---

## 第02页 — 脚本

# 02｜尺度冲击

## 页面编号
02 / 10

## 页面标题
一部手机里上千颗，一颗比芝麻还小

## 副标题
比头发丝更薄的介质层 × 单设备数百至数千颗用量——理解 MLCC 供应链风险，从尺度开始

## 一句话核心结论
MLCC 的极端微小和极端大量共同制造了一个供应链悖论：单个器件不值钱，但任何一个缺货都会卡住整条产线。

## 外行可懂表达
你以为电路板上那些灰色小点是灰尘。它们是 MLCC——一部手机里有上千颗，一颗比芝麻小十倍。你没法靠"多囤点"来解决问题，因为一盘就是一万颗，而你根本不知道哪些型号会先缺。

## ChainFlow供应链视角
微小体积意味着：单颗便宜→批量采购→库存以盘为单位→一旦缺料，现货市场价格剧烈波动。大量使用意味着：BOM 上 MLCC 种类多→每种都要有替代料→替代料管理复杂度指数级上升。供应链风险不是来自"没有 MLCC"，而是来自"缺了某一个型号的 MLCC"。

## 非技术深度
来自数量级对比揭示的供应链悖论，而非封装尺寸本身。每台设备需要的数量×设备出货量 = 每年数千亿颗的需求。任何一个型号的波动都是巨大的绝对值。

## 页面正文
（本页不放置正文段落。以下信息以标注和对比形式出现在图上。）

## 图上标注文字
- 封装尺寸对照（等比例轮廓）：1206(3.2mm) → 0805(2.0mm) → 0603(1.6mm) → 0402(1.0mm) → 0201(0.6mm) → 008004(0.25mm)
- 介质层厚度量级：高端产品＜1μm，比头发丝（~50-100μm）细 50-100 倍
- 设备用量量级（分栏对比，用数量级条形图）：
  - 智能手机：~500-1000 颗
  - 笔记本电脑：~1000-2000 颗
  - AI 服务器：数千至上万颗（方向性）
  - 新能源汽车：数千至上万颗（方向性）
- 量级标注均为范围，非精确数字

## 必须出现的数据
- 封装尺寸英制-公制对照
- 头发丝直径参照（50-100μm）
- 设备用量均为量级范围，不标精确数值

## 来源编号
MLCC-F014, F015, F020；封装尺寸来自 EIA 标准；设备用量量级来自产业共识范围，非精确统计。

## 事实风险
- 中：介质层厚度量级和叠层数量级需厂商资料确认
- 中：设备用量如找不到可靠溯源，仅做方向性比较，不标具体数
- 低：封装尺寸为标准信息

## 可删减内容
- 过多设备类型细分（手机+AI服务器+汽车三个场景足够）
- 毫米小数点过多时四舍五入

## 视觉中心
尺度对比链条——从硬币/米粒 → 各封装尺寸等比例轮廓 → 介质层厚度 vs 头发丝截面。用连续缩放的视觉机制，让读者直观感受从"看得见"到"看不见"的跨度。

## 手机端三秒阅读顺序
① 标题"一部手机里上千颗" → ② 最右侧的头发丝 vs 介质层对比 → ③ 底部设备用量对比条

## Figma排版提醒
- 构图：上下分段——上 60% 尺度对比链条（实物→封装→微观），下 40% 设备用量量级对比
- 背景：暖纸白底（暖象牙白 #F4F0E8），文字和标注用深墨色
- 尺度对比：从左到右三级缩放，每级用圆形放大镜窗口
- 用量对比：横向条形图，铜金色或工业蓝，非精确刻度
- 所有尺寸数字用大号字体，读者缩小后仍可读

---

## 第02页 — 视觉提示词

# 02｜尺度冲击 — 视觉锚点提示词

## image2-primary

```
Clean scale comparison photograph on a warm cream paper surface. A standard 0402 MLCC (1.0×0.5mm) photographed alongside a single grain of rice, a sesame seed, and a human hair — all arranged neatly in a row. The MLCC is in sharp focus: warm beige ceramic body, silver metallic end caps. Warm, soft natural daylight from above. Museum archival specimen photography style — like an exhibit in a science museum, not a cold laboratory shot. The image communicates "this is shockingly small" through visual comparison, without words. Warm ivory background. Clean, professional, inviting. 3:4 vertical. No text, no labels, no scale bars.
```

## image2-alternative

```
A single 0402 MLCC sitting on a warm-toned fingertip. The MLCC is perfectly sharp, revealing ceramic texture. The fingertip fills the lower portion of the frame, providing human scale — the component appears tiny against fingerprint ridges. Clean, soft natural lighting. Warm, editorial photography style. Cream-toned background. 3:4 vertical.
```


---

## 第03页 — 脚本

# 03｜技术结构

## 页面编号
03 / 10

## 页面标题
一颗 MLCC 里面，是几百层陶瓷和金属的精密三明治

## 副标题
陶瓷介质层与镍内电极交替堆叠，奇偶层分别连接左右端头——每个夹层都是一个独立电容单元

## 一句话核心结论
MLCC 不是"一片电容"，而是几百个微型电容的高密度并联矩阵。结构复杂度直接决定产品等级、制造难度和供应商可替代性。

## 外行可懂表达
想象你在一粒芝麻里面，用陶瓷和金属交替叠了 500 层——每层厚不到头发丝的百分之一，然后两端分别引出。这就是 MLCC 的内部。叠的层数越多，储能越强。但不是谁都能叠这么多层。

## ChainFlow供应链视角
结构不是工程师的专属问题——层数、介质厚度、内电极精度直接决定产品等级。能做 500 层的企业不一定能做 1000 层的。越是高端多层，能做好的企业越少，供应商替代越困难。采购替代时，不是一个料号换一个料号，而是判断供应商有没有这个结构能力。

## 非技术深度
来自"结构能力=供应能力"的判断链路，而非结构描述本身。层叠能力不足 → 高端产品做不出 → 供应集中在少数企业 → 替代窗口窄。

## 页面正文
（本页不放置正文段落。以下信息以标注形式出现在图上。）

## 图上标注文字
- 陶瓷介质层：BaTiO₃ 基陶瓷，隔开相邻电极，决定绝缘和介电特性
- 镍内电极（Ni）：奇数层伸向左端头，偶数层伸向右端头。BME（贱金属电极）体系
- 端电极：Cu 基底 → Ni 阻挡层 → Sn 镀层。将奇偶层分别引出到外部电路
- 结构逻辑：每两层电极之间 = 一个独立电容单元。左右端头把所有单元等效并联
- 等效公式：C_total ≈ n × εᵣ ε₀ A / d
- 标注：本图为通用技术示意，非特定厂商型号。层数和厚度因产品等级和厂商差异巨大

## 必须出现的数据
- 层数量级：可达数百层（待确认来源）
- 无精确厚度数据

## 来源编号
MLCC-F001, F002, F009。结构逻辑可靠。端接材料需厂商结构图复核。

## 事实风险
- 中：Ni/Sn 端接结构的普适性——不同厂商和产品线可能有差异（如部分高端用 Cu 端接、部分车规用 Ag-Pd 端接）
- 低：结构和公式为物理学基础

## 可删减内容
- 过多材料化学式
- 多种端接方案的逐一罗列

## 视觉中心
MLCC 剖面图——SEM 风格或高精度 3D 剖面渲染。灰阶为主，陶瓷介质层略偏暖。端电极的三层结构（Cu/Ni/Sn）清晰可辨。奇偶层左右交替连接的逻辑从图中直接可见。

## 手机端三秒阅读顺序
① 剖面图的彩色叠层（天然视觉焦点） → ② 标题"几百层" → ③ 奇偶层分别连接左右端头

## Figma排版提醒
- 构图：左右分栏。左栏 55% 放 SEM 风格剖面图，右栏 45% 暖纸白底 + 标注文字
- 标注从剖面图的各部件引出，连接线用工程蓝
- 等效公式用铜金色高亮
- 底部标注"通用技术示意"
- 不使用白底卡片——标注文字直接用深色在暖底上呈现

---

## 第03页 — 视觉提示词

# 03｜技术结构 — 视觉锚点提示词

## image2-primary

```
Clean technical cross-section illustration of an MLCC capacitor, perfectly cut through the vertical center. Alternating layers of warm beige ceramic dielectric and dark nickel internal electrodes — approximately 15-30 visible layer pairs. CRITICAL STRUCTURAL ACCURACY — THE DEFINING FEATURE OF MLCC:

Study this ASCII cross-section diagram carefully before generating:

```
LEFT TERMINATION          RIGHT TERMINATION
    |                          |
    |---[Ni electrode A]-------|xxxxx  ← A spans left→near-right, connects LEFT
    |   CERAMIC DIELECTRIC     |
    |xxxxx[Ni electrode B]-----|      ← B spans right→near-left, connects RIGHT
    |   CERAMIC DIELECTRIC     |
    |---[Ni electrode A]-------|xxxxx  ← A again, connects LEFT
    |   CERAMIC DIELECTRIC     |
    |xxxxx[Ni electrode B]-----|      ← B again, connects RIGHT
    |   CERAMIC DIELECTRIC     |
    |                          |
```

KEY POINTS:
- Every Ni electrode connects to ONLY ONE side (left or right), never both
- Electrodes from left and right ALTERNATE in the vertical stack: A-B-A-B-A-B...
- Each electrode extends MOST of the way across but stops SHORT of the opposite termination
- The GAP (marked xxxxx) at the far end of each electrode prevents short-circuiting
- Between any adjacent A and B electrode is a thin ceramic dielectric layer
- The vertical overlap zone between adjacent A and B electrodes IS the capacitor
- This is repeated hundreds of times in a real MLCC

The image must show: electrodes cantilevered from alternating sides, NOT continuous plates spanning the full width. The left-right alternating pattern must be clearly visible in the cross-section. Left and right terminations show three distinct layers: copper base, nickel barrier, tin plating. Rendered as a precise engineering patent drawing on warm cream paper — navy blue and copper linework, like a vintage technical diagram but clean and modern. Neutral light grey background or warm paper tone. Scientific precision, editorial warmth. Not dark, not clinical. No text, no labels, no arrows. 3:4 vertical.

## image2-alternative

```
High-precision 3D cutaway render of an MLCC. The front half removed to reveal the interleaved internal electrode structure — cantilevered electrodes from alternating sides — odd layers from left, even from right — overlapping vertically through the dielectric layer, forming each capacitive unit. Warm beige ceramic dielectric, dark nickel electrodes, copper and tin terminations. Photorealistic materials with subtle grain on the ceramic. Soft studio lighting from upper left on a clean warm grey background. Technical illustration quality — engineering accuracy, magazine beauty. No text. 3:4 vertical.
```


---

## 第04页 — 脚本

# 04｜工作原理与参数选型

## 页面编号
04 / 10

## 页面标题
标称 10μF，接上电可能只剩 3μF——为什么一块板上需要几百颗，而不是一颗大的

## 副标题
温度、电压、频率、老化、封装尺寸共同决定有效容量。参数选型不是工程师的个人问题，而是采购替代的起点。

## 一句话核心结论
标称容量是料号表上的数字，有效容量是工作条件下的结果。不理解这个落差，就不能理解为什么高端 MLCC 难替代、为什么缺货不能随便换料。

## 外行可懂表达
你买的号称 10μF 的电容，接上电、加上温度、过了一段时间——实际可能只有 3μF。不是厂商骗你，而是陶瓷电容天生如此。工程师知道这个坑，所以每块板上要放很多颗不同型号的，各管各的频率区间。这就是"为什么不能一颗大的替代几百颗小的"的答案。

## ChainFlow供应链视角
参数落差 = 替代风险。同一容量电压封装的 MLCC，DC Bias 和温度行为可能完全不同。替代料不能只看 BOM 表格匹配，必须查原厂曲线。这意味着：①替代验证周期长 ②现货市场换料风险高 ③AI 可以从厂商曲线数据和 BOM 中自动识别替代风险。

## 非技术深度
来自"标称≠有效"对采购决策链的影响，而非参数定义。参数不是知识——参数是判断替代可行性的依据。

## 页面正文
（本页不放置正文段落。以下信息以图+标注呈现。）

## 图上标注文字
- 介质类别对比：
  - C0G/NP0：温度最稳定（±30ppm/°C），容量密度低，精密电路用。不受 DC Bias 和老化影响
  - X7R：-55~+125°C，±15%，DC Bias 降额严重。通用工业级主力
  - X5R：-55~+85°C，±15%。消费电子用，高温场景需谨慎
- DC Bias 降额：二类陶瓷（X7R/X5R）在接近额定电压时，有效容量可降至 20-50% 甚至更低
- 老化：二类陶瓷容量随对数时间下降，每十倍时间约降 2-5%，加热可恢复
- ESR/ESL：封装越小、ESL 越低，高频去耦需要 0402/0201 等小封装
- 频率分工：大容量 MLCC 管低频储能，小封装管高频去耦——不能互相替代
- 采购含义：替代时必须查原厂 DC Bias 曲线和温度特性曲线，不能只看料号表

## 必须出现的数据
- C0G/X7R/X5R 的温度/容量变化编码（来源：EIA-198 标准）
- DC Bias 降额量级范围（20-50%或更低）
- 老化率量级（每 decade hour 约 2-5%）
- 不写具体型号的精确 DC Bias 曲线（除非绑定具体来源）

## 来源编号
MLCC-F003, F004, F005, F006, F007, F013, F016。EIA-198 编码规则已从标准确认。

## 事实风险
- 高：DC Bias 降额幅度因型号差异巨大，范围表述需标注"强依赖型号和电压"
- 中：X7R/X5R 精确编码需 EIA-198 标准复核（已确认，置信度提升）
- 低：介质分类是基础工程知识

## 可删减内容
- 过多温度编码类型（C0G/X7R/X5R/Y5V 四个足够）
- 过于数学化的老化率推导

## 视觉中心
双板构图——左：温度特性对比矩阵（横轴温度、纵轴容量变化，四种介质类别各一条容差带）。右：DC Bias 降额漏斗（标称 100% → DC Bias → 温度 → 老化 → 有效容量 ?%）。

## 手机端三秒阅读顺序
① 标题"标称10μF可能只剩3μF" → ② 右侧降额漏斗 → ③ 左侧 C0G vs X7R 的稳定带对比

## Figma排版提醒
- 构图：左右分栏。左栏温度矩阵，右栏降额漏斗
- 背景：暖纸白底，文字深色。温度矩阵用铜金色轴线和标签
- 降额漏斗每个滤网标注"什么因素、影响幅度、用户能做什么"
- DC Bias 曲线如使用真实型号数据，必须标注型号、电压、来源
- 底部放一行"采购含义"红色小字总结

---

## 第04页 — 视觉提示词

# 04｜参数与选型 — 视觉锚点提示词

## image2-primary

```
Clean macro photograph of a circuit board surface. A cluster of tiny MLCC capacitors densely packed near a BGA chip. Shallow depth of field — foreground capacitors sharp, background softly blurred. The PCB's natural green-gold tones provide warmth. Warm, soft daylight — not dramatic, not moody. Like looking through a magnifying glass at a well-made circuit board. Clean, inviting, professional. No text. 3:4 vertical.

## image2-alternative

```
Conceptual still life: a single MLCC on a warm cream surface, casting a long soft shadow that transforms into a subtle waveform curve. Minimal, editorial, warm. The metaphor: a tiny component shapes signal integrity. Cream background, soft natural light. 3:4 vertical.
```


---

## 第05页 — 脚本

# 05｜材料壁垒

## 页面编号
05 / 10

## 页面标题
从一颗 MLCC 追溯到矿山——上游的卡点藏在地下

## 副标题
碳酸钡、二氧化钛、稀土掺杂剂、纳米镍粉——高端 MLCC 的瓶颈不在制造车间，而在矿山、化工厂和粉体合成工艺里

## 一句话核心结论
MLCC 的上游供应链是一条从矿山到纳米粉体的三级穿透链——碳酸钡（全球仅两家能量产5N级）、钛酸钡粉体（Top5占80%）、稀土掺杂剂（中国出口管制）——每一级都高度集中在少数企业和少数矿源上。

## 外行可懂表达
你以为 MLCC 是用陶瓷做的。没错——但"陶瓷"两个字背后是：从贵州地下的重晶石矿挖出钡，从钛铁矿里提钛，加稀土调配方，磨成比头发丝细一千倍的粉末。这条链条上，任何一级断了，MLCC 就造不出来。而全球能稳定供应关键环节材料的企业，一只手数得过来。

## ChainFlow供应链视角
1. 穿透不是好奇——是为了识别"单一故障点"。矿源、高纯化工厂、粉体合成——哪个节点只有一两家供应商，哪个节点就是整条链的脆弱点
2. 碳酸钡 5N 级全球仅红星发展+堺化学两家。贵州低锶重晶石矿有出口配额限制。万一其中一家停产或矿源收紧，下游全部 MLCC 厂受影响——不分品牌、不分等级
3. 稀土掺杂剂（氧化镝/氧化钇）中国占全球 90%+，出口管制。这不止影响中国 MLCC 厂，也影响所有依赖中国稀土的日本、韩国、欧美 MLCC 厂
4. 供应链判断：不能只看 MLCC 成品厂的交期，要看矿山开采许可、稀土出口配额、化工厂产能投资公告

## 非技术深度
来自"矿→化工→粉体→MLCC"的物料追溯链和单一故障点识别。穿透不是为了炫技，是为了告诉你"如果这个地方断了，整条链多久会停"。

## 页面正文
（本页以物料追溯图为主体，以下文字以标注形式呈现。）

## 图上标注文字
**物料追溯链（从下到上，五级穿透）：**

一级｜MLCC 成品
- 村田、三星电机、TDK、太阳诱电、国巨、风华高科等
- 标注：全球 MLCC 年出货量数千亿颗

二级｜钛酸钡粉体（BaTiO₃）
- 成本占 MLCC 可变成本 35-45%
- 全球 Top5 约 80% 份额（企业标注见下方，均标注"产业估算范围"）
  - 堺化学（日）~28%｜全球第一，水热法纳米级
  - 国瓷材料（中）~22%｜中国唯一量产 4N5 级以上
  - Ferro/Vibrantz（美）~18%
  - 日本化学（日）~12%
  - 富士钛/三环集团（日/中）~5-8%
- 技术壁垒：水热法纳米级合成（≤80nm），国瓷材料是国内唯一量产企业

三级｜高纯中间体（5N级合成）
- 碳酸钡 BaCO₃（5N）：全球仅 2 家量产——红星发展（中）+ 堺化学（日）
  - 矿源：贵州低锶重晶石矿——全球关键矿源，出口配额限制
  - 国内另有关键企业：厦门钨业子公司贝思科（5000吨电子级碳酸钡）
- 二氧化钛 TiO₂（5N）：龙佰集团（国内最大，市占28%），高端仍有一部分依赖进口
- 纳米镍粉（内电极用）：粒径 50-200nm，主要供应商集中在日本

四级｜稀土掺杂剂（微量但关键）
- 氧化镝 Dy₂O₃：提升温度稳定性和耐压。中国占全球 90%+，出口管制
- 氧化钇 Y₂O₃：晶格调控。中国主导供应
- ✱ 标注：稀土出口管制→影响全球 MLCC 厂，不只是中国企业

五级｜矿源
- 重晶石（BaSO₄）：贵州低锶矿——全球稀缺
- 钛铁矿/金红石（TiO₂）：中国、澳大利亚为主产区
- 稀土矿：中国白云鄂博、南方离子型稀土矿——全球最大

**关键卡点总结（红色标注）：**
- 碳酸钡 5N = 全球双寡头供应，扩产慢
- 稀土掺杂剂 = 中国出口管制，全球受制约
- 钛酸钡纳米级 = 日系主导，国瓷材料独撑国产

## 必须出现的数据
- 钛酸钡粉体 Top5 份额（标注"产业估算范围"）
- 5N 碳酸钡：全球仅 2 家量产
- 氧化镝：中国占全球 90%+
- 所有份额数字标注"约""估算""产业共识"

## 来源编号
MLCC-F008, F012。碳酸钡/稀土/矿源数据来自产业研究报告——标注"估算范围"，需逐家企业和矿源核实。稀土出口管制信息来自中国商务部公告——可溯源。

## 事实风险
- 高：粉体企业份额数字来自产业研究报告（"约""估算"），非企业官方数据
- 高：矿源出口配额和开采许可信息需核实最新政策状态
- 中：5N 级碳酸钡的"仅两家量产"表述需确认是否有新兴企业进入（如厦门钨业贝思科）
- 必须标注：所有上游数据为公开资料整理，非实地调研，不构成投资建议

## 可删减内容
- 稀土的具体化学作用机理（标"微量但关键"即可）
- 矿源的过多地理细节

## 视觉中心
物料追溯链——从矿源（底）到 MLCC 成品（顶），五级纵向穿透。每个节点左侧标注企业名，右侧标注风险等级（颜色编码）。关键卡点用红色高亮。不是普通流程图——是"供应链脆弱性地图"。

## 手机端三秒阅读顺序
① 标题"追溯到矿山" → ② 中间红色卡点标注（碳酸钡/稀土）→ ③ 底部矿源

## Figma排版提醒
- 构图：纵向五级穿透主图，从上到下排列。顶部 MLCC 成品、底部矿源
- 背景：暖纸白底，物料流用铜金色连线
- 每个节点：左侧企业名（白色），右侧风险标签（绿/黄/红）
- 关键卡点用红色粗框+红色文字，醒目但不闪烁
- 底部总结三行卡点用红色小字
- 不使用白底卡片，信息直接在暖底上呈现

---

## 第05页 — 视觉提示词

# 05｜材料壁垒 — 视觉锚点提示词

## image2-primary

```
Scientific micrograph of barium titanate ceramic powder particles at nanoscale. Spherical particles 100-300nm, densely packed but individually distinguishable. Clean greyscale with subtle warm tones — genuine research documentation aesthetic. Light neutral grey background. Suitable as full-page texture or section image. No text, no scale bars. 3:4 vertical.

## image2-alternative

```
Industrial documentary photograph: ceramic powder production facility, cleanroom interior with stainless steel milling equipment. Soft natural light through viewing windows. A worker in cleanroom suit in the distance. Observational, not staged — the upstream of the upstream. Clean, airy, professional. No logos, no brand names, no identifiable faces. 3:4 vertical.
```


---

## 第06页 — 脚本

# 06｜制造流程

## 页面编号
06 / 10

## 页面标题
造一颗容易，造一亿颗一样的是壁垒

## 副标题
流延、印刷对位、叠层、共烧和测试分选——MLCC 制造壁垒不是某一台设备或某一道工序，而是连续精度控制

## 一句话核心结论
MLCC 良率是 11 道工序的乘法结果，不是加法。任何一道失控，良率归零。这种连续精度控制能力需要十年以上积累，新进入者的时间壁垒极高。

## 外行可懂表达
造一颗 MLCC 像做千层蛋糕：先摊一层薄到透明的陶瓷面糊，印上金属线路，再摊一层。叠几百层后切开，送进烤箱。问题是——面糊和金属在烤箱里收缩不一样，差了一点就全裂了。更狠的是，做出来还要一颗一颗测试分选。良率做到 90% 不够，因为 11 步的 90% 乘下来只有 31%。

## ChainFlow供应链视角
良率 = 产能弹性。良率高的厂商在需求波动时可以快速增产（多投料），良率低的增产等于多报废。这意味着：①高端产能扩张比低端慢得多 ②新工厂产能爬坡期长（1-2 年甚至更久）③需求紧缺时，供给端没法快速响应 ④供应链团队需要关注主要厂商的产能利用率和新产线投建节点，而不是只看当前交期和价格。

## 非技术深度
来自"良率→产能弹性→供应稳定性→采购策略"的推演，而非制造流程的描述。工序之间的乘数效应才是真正的深度。

## 页面正文
（本页不放置正文段落。以下信息以图+标注呈现。）

## 图上标注文字
- 核心工序（12 步简化为 4 组关键瓶颈，不均匀展示）：
  ① 流延成膜：陶瓷浆料铺成 μm 级均匀薄膜——厚度波动直接影响容量一致性
  ② 内电极印刷：在绿片上精确印刷交错电极图案——对位精度决定层间短路风险
  ③ 叠层+压合+切割+排胶+烧结：陶瓷与 Ni 在 1100-1300°C 下共烧——收缩不匹配 = 分层/裂纹/电极断裂
  ④ 端接+电镀+测试分选：每颗单独测容量、ESR、绝缘、外观并分等级——速度与精度很难兼得

- 良率乘数效应：0.95¹¹ ≈ 0.57（每步 95% 良率，乘完只剩 57%）。如果想做到 90% 以上整体良率，每一步都得做到 99%+

- 设备依赖：流延机、高精度丝网印刷机、叠层机、气氛控制烧结炉、高速测试分选机——核心设备集中在日本和欧洲

## 必须出现的数据
- 良率乘数公式（0.95¹¹）
- 烧结温度量级 1100-1300°C（标注待确认来源）
- 不写具体良率数字或设备品牌

## 来源编号
MLCC-F010, F017。制造流程为通用工艺框架。良率乘数公式为数学推导，非特定厂商数据。

## 事实风险
- 中：每步良率 95% 是假设值——仅用于展示乘数逻辑，不代表任何厂商的实际良率
- 中：设备集中度信息需补强（可标注"待第二阶段确认"）
- 低：制造流程的通用架构风险低

## 可删减内容
- 非瓶颈步骤的详细描述（流延/印刷/叠层/共烧/测试五个核心即可）
- 设备品牌名称（如无可靠来源）

## 视觉中心
不是均匀的十一张卡片。是四组关键瓶颈的视觉化——四列纵向排列，每列突出一个核心挑战（厚度控制/对位精度/收缩匹配/速度精度），辅助步骤用细线连接。瓶颈用红色/铜金色标注。

## 手机端三秒阅读顺序
① 标题"造一亿颗一样的是壁垒" → ② 四组瓶颈中最红的那组（共烧收缩）→ ③ 底部 0.95¹¹ 公式

## Figma排版提醒
- 构图：工艺流程横向四列，每列一个瓶颈组
- 背景：暖纸白底 + 微妙的工业网格纹理
- 瓶颈工序用红色/铜金色粗线框标识，非瓶颈工序用灰色细线
- 底部良率乘数公式用铜金色大号字体高亮
- 每个瓶颈下方标注"为什么难"和"供应链含义"

---

## 第06页 — 视觉提示词

# 06｜制造流程 — 视觉锚点提示词

## image2-primary

```
Cleanroom interior of an electronic component manufacturing facility. Rows of precision machinery under soft diffused lighting. Shot from mezzanine looking down the production line. The atmosphere is sterile yet warm — not cold or clinical. Warm ambient tones from the cleanroom lighting. No people visible or distant silhouettes only. Clean, professional, like an architectural photograph of advanced manufacturing. No logos, no brand names, no text. 3:4 vertical.

## image2-alternative

```
Abstract close-up: a thin translucent ceramic green sheet emerging from a tape casting machine. The sheet glows with warm backlight, revealing its uniform thickness. Smooth, organic texture like handmade paper but with machine precision. Warm cream and amber tones. Clean light background. No text. 3:4 vertical.
```


---

## 第07页 — 脚本

# 07｜控制力地图

## 页面编号
07 / 10

## 页面标题
控制力不只在成品厂——越是上游越集中，越是高端越难替代

## 副标题
陶瓷粉体Top5占全球八成，车规认证把新供应商锁在门外两年以上。MLCC供应链的脆弱点，不在"谁会做"，在"谁控制了关键节点"和"替代的时间窗口有多长"。

## 一句话核心结论
MLCC供应链有三个结构性控制点——上游材料集中度、车规认证周期、高端良率爬坡速度——它们共同决定了：不是有技术就能替代，而是要同时具备材料、认证和量产记录。

## 外行可懂表达
MLCC供应链像一条越来越窄的河道。下游是汪洋大海——几千种电子设备、几百个品牌。往上游走，河道越来越窄：成品制造还有几十家企业，陶瓷粉体只有五家主导，高纯碳酸钡全球就两家能量产。最上游卡住了，下游都得等。更关键的是，就算你有了技术，车规认证的大门打开也得两年——不是不让你进，是进去之前你得先证明自己能过17项零失效测试。

## ChainFlow供应链视角
1. 供应链风险判断不靠"供应商名单"——靠识别控制点。三个控制点：材料谁供应、认证过了没、良率稳不稳
2. 替代窗口长短不取决于企业大小，取决于产品等级。消费级通用品替代窗口宽（数月），车规高压品替代窗口窄（数年）
3. 信号优先级：上游材料扩产公告 ＞ 成品厂产能利用率 ＞ 现货市场价格波动。看上游比看下游更能预判风险
4. AI 可以帮助的是：自动识别 BOM 里每个料号的产品等级 → 匹配有认证记录的供应商 → 计算替代窗口 → 标记高风险料号。这不靠企业排名，靠数据匹配

## 非技术深度
来自"控制点识别"和"替代窗口长度"的框架，而非企业间的横比。深度不是"知道每家企业的优势"，而是"知道替代到底卡在哪个环节"。

## 页面正文
（本页以控制力地图为主体，以下文字以标注形式呈现。）

## 图上标注文字

**上游→下游，控制力从集中到分散**

图示：一条从窄到宽的梯形，代表 MLCC 供应链从上游到下游的控制力变化

上游｜材料端（极窄·极高控制力）
- 陶瓷粉体：全球 Top5 约 80%。堺化学（日）、国瓷材料（中）、Ferro（美）、日本化学（日）、富士钛（日）
- 更上游——碳酸钡 5N 级：全球仅红星发展（中）+ 堺化学（日）两家量产
- 稀土掺杂剂：氧化镝中国占全球 90%+，出口管制
- 核心设备：流延机、叠层机、测试分选机——日欧主导
- ✱ 控制力含义：这个环节的任何一家停产或矿源收紧，下游全线受影响。产能扩张以年为单位

中游｜制造端（中等宽度·高控制力）
- 成品 MLCC 制造：全球主要企业集中在东亚——日本、韩国、中国台湾、中国大陆
- 控制力体现在产品等级的差异化：能做 006003 的极少，能做 0402 通用品的较多
- 高端产能集中在少数企业（材料+工艺+认证三重门槛）
- 通用品产能分布较广，替代窗口宽
- ✱ 控制力含义：不缺通用品，缺的是特定等级（超小型、车规、高容、高可靠）的产品。缺的不是企业数量，是认证记录和产能

下游｜应用端（极宽·分散）
- 汽车电子、AI 服务器、工业电源、通信基站、智能手机、PC、IoT、家电
- 需求极度分散，任何单一应用都无法支配供应端
- ✱ 控制力含义：下游议价能力弱。当高端产能紧张时，车规和 AI 服务器客户优先——消费电子客户被挤出

---

**替代的时间窗口：不是"能不能做"，是"要多久才能用"**

产品等级 ↓ | 替代窗口 | 卡在哪里
消费通用品 | 1-3 个月 | 工程验证为主，供应商可选范围宽
工业级 | 3-6 个月 | 可靠性验证+少量认证
车规级 | 2-3 年 | AEC-Q200 17项零失效+客户PPAP+量产审核。即使技术达标，认证周期不走完无法供货

✱ 所有周期均为典型范围，因具体产品、客户和认证要求而异

---

**三个控制点的判断逻辑**

① 材料控制点：看上游供应商数量和扩产周期。供应商越少、扩产越慢 → 控制力越集中 → 供应中断风险越高

② 认证控制点：看产品等级和客户要求。等级越高、认证越严 → 替代窗口越窄 → 切换供应商的时间成本越高

③ 良率控制点：看产品复杂度和工艺成熟度。层数越多、封装越小 → 良率爬坡越慢 → 新产能的释放越滞后

---

**底部总结**

缺货时，第一个信号不是价格上涨——是交期延长。
交期延长时，第一个动作不是找新供应商——是区分你手上的料号属于哪个产品等级。
消费通用品 → 找替代，有窗口。
车规高压品 → 锁产能、建库存，没窗口。

## 必须出现的数据
- 陶瓷粉体 Top5 约 80%（产业估算范围）
- 碳酸钡 5N 全球仅两家
- 氧化镝中国占 90%+（中国商务部公告可溯源）
- 替代窗口量级（消费/工业/车规）
- 不使用具体企业排名、不标精确份额、不做企业评价

## 来源编号
MLCC-F012, F015, F016, F018, F019。粉体和碳酸钡数据来自产业研究报告——标注"估算范围"。AEC-Q200 标准已确认。稀土出口管制来自公开政策文件。

## 事实风险
- 中：粉体份额和碳酸钡供应商数量为产业估算范围，标注"约""公开资料整理"
- 中：替代窗口为典型范围，因具体产品等级、客户流程和认证要求差异大
- 低：控制力集中的结构性判断是产业共识
- 不构成投资建议
- 企业名称仅用于说明供应链结构，非评价或推荐

## 可删减内容
- 任何带有企业能力评价性质的表述
- 过于细节的企业数量统计
- 矿源地理信息

## 视觉中心
一条从窄到宽的"控制力漏斗"——上游（窄、色深）→中游（中等）→下游（宽、色浅）。每个环节标注控制力来源（材料集中/认证锁定/良率爬坡），不标注具体企业排名。右侧配以"替代窗口时间轴"——消费短、车规长。

## 手机端三秒阅读顺序
① 标题"控制力不只在成品厂" → ② 漏斗的上游窄口 → ③ 右侧替代窗口"2-3年"

## Figma排版提醒
- 构图：左 55% 控制力漏斗（从上到下，宽→窄），右 45% 替代窗口时间轴 + 三个控制点总结
- 背景：暖纸白底
- 控制力漏斗用颜色深浅表达集中度，不用企业 Logo
- 替代窗口时间轴：消费（短）、工业（中）、车规（长）——用条长表达，不标具体公司
- 底部三行控制点逻辑，铜金色小字
- 企业名称仅在漏斗上游材料段出现，作为控制力的结构锚点，不是评价对象
- 不使用白底卡片、不使用排行榜

---

## 第07页 — 视觉提示词

# 07｜控制力地图 — 视觉锚点提示词

## image2-primary

```
Clean, minimalist world map focused on East Asia — Japan, Korea, Taiwan, southern China coastline. Rendered as a light-toned cartographic illustration with subtle warm beige landmasses and steel blue ocean. Small copper-gold node points scattered along the coast indicating manufacturing clusters. Clean, professional, like an intelligence briefing map but warm and editorial — not military or surveillance aesthetic. Light cream background. No country labels, no borders marked. 3:4 vertical.

## image2-alternative

```
A bright, well-organized electronics components distribution center. Floor-to-ceiling shelves with neatly arranged component reels. Soft natural light. Clean, orderly, professional. The scale is impressive but the mood is calm and organized — not ominous. No logos, no text. 3:4 vertical.
```


---

## 第08页 — 脚本

# 08｜两次危机

## 页面编号
08 / 10

## 页面标题
2018 vs 2026：两次 MLCC 短缺，本质完全不同

## 副标题
上一次是渠道囤货撑起的泡沫，价格暴涨后崩盘。这一次是 AI 服务器的真实需求撞上高端产能的刚性约束——交期突破 20 周，渠道库存仅够一个月。不是周期重演，是结构性缺货。

## 一句话核心结论
2018 年的短缺是"中间商囤货→价格暴涨→需求萎缩→泡沫破裂"的库存游戏。2026 年的短缺是"AI 需求暴增→高端产能不足→扩产需要两年→库存极薄"的供需断裂。两次看起来都是涨价缺货，但供应链逻辑完全相反。

## 外行可懂表达
2018 年 MLCC 能涨 30 倍，不是真缺货——是中间商把货囤起来了，造了一个虚假的紧张感。泡沫破了以后，价格跌回去，赔了一堆人。2026 年这次不一样。这次是真的不够用。一台 AI 服务器用的 MLCC 是普通服务器的十几倍，而能造高端货的产线两年才能建好。更关键的是——2018 年渠道库存有 6 个月，够消化。现在库存就 1 个月，根本没缓冲。

## ChainFlow供应链视角
1. 同样的"涨价""缺货"，供应链根因完全不同。只看价格涨跌不分析根因=瞎判断
2. 2018 年是需求端的虚假信号（渠道囤货放大订单）。2026 年是供给端的刚性约束（材料、设备、良率、认证锁死产能）。前者是"有人不让你买到"，后者是"真做不出来"
3. 当前库存仅 1-1.5 个月——远低于 2018 年的 6-7 个月和历史均值 4.5 个月。这意味着需求即使小幅回落，也不会出现 2018 年式的崩盘。缺货有韧性
4. 信号优先级：这一次，看产能投资公告 ＞ 看现货价格波动。村田 800 亿日元新投资全部投高端，三星天津厂扩产 20%——都是 2027 年 Q4 以后才释放

## 非技术深度
来自"区分两类短缺"的分析方法论。不是堆数据，是教会读者：涨价的背后可能是一个故事，也可能是相反的故事。供应链判断的第一步是区分信号和噪音。

## 页面正文
（本页以双栏对比图为主体，以下文字以标注形式呈现。）

## 图上标注文字

**2018｜渠道囤货驱动的泡沫**

触发原因：
- 村田、TDK 等日系厂商将产能转向车规（利润率更高），削减消费级通用品产能
- 消费电子（手机、PC）需求回暖 → 通用品供应出现缺口
- 渠道商看到缺口 → 开始囤货 → 订单被放大 → 缺口看起来更大 → 更多囤货
- 现货价格最高涨幅达 30 倍

结果：
- 2018 年末，消费电子需求走弱 → 囤货的渠道商抢着出货 → 价格暴跌
- 2019-2020 年，MLCC 进入漫长的去库存周期，价格持续低迷
- 渠道库存顶峰 6-7 个月，远超正常水平

根因：需求信号被渠道放大。不是真缺货，是"所有人以为缺货"。

---

**2026｜AI 需求 + 供给刚性的结构性缺货**

触发原因：
- AI 服务器 MLCC 用量暴增。英伟达 VR200 单机柜 MLCC 物料成本从上一代 GB300 的 1530 美元跃升至 4320 美元，增幅 182%（来源：摩根士丹利 BOM 拆解）。单机柜用量从 44 万颗升至 60 万颗，增幅 36%
- MLCC 已成为 AI 服务器 BOM 中仅次于 GPU 和存储芯片的第三大成本项（来源：高盛研报）
- AI 服务器 MLCC 市场约 13 亿美元，正以约 80% 复合年增长率扩张（来源：高盛）
- 高端产能消耗巨大：一颗 AI 用高端 MLCC 消耗的产能相当于 4-7 颗普通品。AI 服务器仅占出货量 2-3%，却消耗约 10% 的行业产能
- 设备瓶颈：禾伸堂董事长在股东会上披露，高阶被动元件设备交期已达 1-1.5 年。今年下半年导入的设备是两年前已下单的——不是想扩就能扩
- 台系三巨头（国巨、华新科、禾伸堂）在股东会上异口同声：本轮缺货将超越 2017-2018 年，或为史上最长。国巨 B/B 值已攀升至 1.3 以上。华新科总经理将缺货时间轴直接延伸至 2027 年以后（来源：工商时报、各公司股东会公开谈话）

当前状态（2026 年 6 月）：
- 高端交期：16-24 周（正常 8 周）
- 渠道库存：仅 1-1.5 个月（正常 4.5 个月，2018 年顶峰 6-7 个月）
- 国巨 B/B 值（订单出货比）升至 1.3 以上——每接 100 块订单只能出 77 块的货（来源：工商时报）
- 台系三巨头股东会同声确认：本轮缺货将超越 2017-2018 年超级周期
- 设备交期 1-1.5 年，禾伸堂今年导入的设备是两年前下的单（来源：禾伸堂股东会）
- 全球 MLCC CR5（金额口径）约 77.3%：村田 31.8%、三星电机 22.9%、太阳诱电 11.2%、TDK 5.9%、京瓷 5.5%（来源：2024 年行业数据）
- 高盛将 MLCC 称为"下一个存储芯片"——AI 服务器 BOM 中仅次于 GPU 和存储的第三大成本项

根因：供需两端全部是刚性约束。需求不是被放大的，是真的——AI 服务器出货量在持续增长。供给不是被藏起来的，是真的不够——产能扩张需要两年。

---

**一线情报｜2026 年 6 月，一个元器件销售说了什么**

我们向一位行业销售了解了当前的真实状况。以下是经过脱敏的对话要点：

- 国巨品牌的 MLCC 处于缺货状态。厂方执行"价高者得"——谁出价高给谁，不是先到先得
- 真正紧缺的是高容 MLCC。常规物料目前没有感受到明显缺料——缺货不是全品类，是结构性的
- AI 领域占用了高容 MLCC 产能。这种占用传导到了其他需要高容 MLCC 的行业
- 涨价幅度：部分紧缺型号价格涨幅显著，不同物料差异较大
  - 注：现货市场与合约价涨幅口径不同，不能直接对比。现货反映即时供需，合约反映长期协议（来源：一线市场反馈，具体信息已脱敏）
- 现在囤货已经晚了——市场上到处都没货。这意味着渠道库存确实极薄
- 本轮缺货最紧的品牌是三星电机和村田

这些信息印证了前面的判断：
- 这是高容品类的结构性短缺，不是全品类泡沫——和 2018 年本质不同
- "价高者得"意味着卖方定价权极强——这不是渠道炒作，是真实的供给不足
- "囤货已经晚了"意味着库存极薄，没有缓冲——这和 2018 年渠道堆积 6-7 个月库存完全相反
- 三星和村田最紧——他们是 AI 服务器高端 MLCC 的主力供应商，和前面的产能分析完全吻合

---

**交叉对比表**

| | 2018 | 2026 |
|---|---|---|
| 短缺性质 | 渠道囤货放大需求信号 | 真实需求撞上供给刚性 |
| 核心驱动力 | 消费电子回暖 + 产能转车规 | AI 服务器用量暴增 |
| 渠道库存 | 6-7 个月（严重过剩） | 1-1.5 个月（历史低位） |
| 涨价幅度 | 现货最高 30 倍（部分型号） | 合约价温和上涨，现货市场部分紧缺型号波动剧烈（合约与现货价差扩大） |
| 涨价路径 | 现货暴涨→合约跟涨 | 合约先涨→现货更紧。现货涨幅远大于合约——反映渠道库存极薄 |
| 产能扩张 | 厂商扩产犹豫 | 村田追加 800 亿日元、三星天津扩产、禾伸堂产能年增 20-30% |
| 新增产能时间 | 1-2 年 | 设备交期 1-1.5 年，大规模新产能 2027 Q4 起释放 |
| 厂商判断 | — | 台系三巨头股东会异口同声：超越 2017-2018，或为史上最长 |
| 泡沫风险 | 高。库存太多，跌起来踩踏 | 低。库存太薄，没有崩盘燃料 |
| 结束方式 | 需求下降→渠道抛货→价格崩盘 | 新产能释放→供需逐步平衡 |

---

**对供应链人的含义**

2018 教我们：涨价的时候，先看库存。库存高→泡沫。库存低→真缺。

2026 教我们：AI 不是概念。它已经变成 MLCC 产能的实际消耗者。一台 Vera Rubin 机柜消耗的 MLCC，抵得上 150 台普通服务器。这个需求不是一次性的——英伟达下一代还会更多。

该看的信号：
- 村田、三星的季度稼动率和资本开支
- AI 服务器出货量（不仅是芯片，看整机柜）
- 交期变化——如果从 20 周继续拉长到 30 周，说明缺口在恶化

## 必须出现的数据
- 2018 年渠道库存 6-7 个月 vs 2026 年 1-1.5 个月
- AI 服务器单机柜 MLCC 用量（GB200 44 万颗、Vera Rubin 300-350 万颗）
- 高端交期 16-24 周
- 扩产时间 18-24 个月
- 不标精确份额、不预测价格走势

## 来源编号
2018 年复盘来自产业共识和公开报道。2026 年数据来自村田、三星电机投资者沟通、高盛/摩根士丹利研报、中国电子元器件行业协会。具体交期、库存数字以公开调研为准——标注来源机构和时间。

## 事实风险
- 高：当前交期、库存等数字实时变化，标注数据日期（2026 年 6 月）
- 中：2018 年"涨 30 倍"为个别型号极端案例，标注"部分型号"
- 中：未来预测（如"持续到 2030 年"）来自投行和厂商管理层，非确定事实，标注引用来源
- 不构成投资建议或价格预测

## 可删减内容
- 2018 年危机的过多细节
- 未来的过多预测窗口

## 视觉中心
双栏对比——左栏 2018，右栏 2026。每栏由上到下：触发原因→库存状态→价格变化→结果走向。中间是交叉对比表。视觉上 2018 用"泡沫"隐喻（膨胀然后碎裂），2026 用"刚性约束"隐喻（需求往上撞，供给墙挡着）。

## 手机端三秒阅读顺序
① 标题"两次短缺，本质完全不同" → ② 中间对比表 → ③ 底部库存数字"1-1.5个月 vs 6-7个月"

## Figma排版提醒
- 构图：左右双栏 + 底部对比表
- 左栏（2018）偏灰冷，暗示泡沫破碎后的萧条
- 右栏（2026）偏暖铜，暗示真实需求驱动的热度
- 交叉对比表用简洁的行列格式，不用卡片
- 库存数字用大号字体——这是两页之间最关键的差异

---

## 第08页 — 视觉提示词

# 08｜两次危机 — 视觉锚点提示词

## image2-primary

```
A clean split-screen diptych on warm cream background. LEFT (2018): A stack of uniform ceramic blocks neatly arranged but slightly tilted — suggesting an orderly inventory that became excess. Warm grey-beige tones. RIGHT (2026): A single ceramic block showing intricate internal layering, glowing slightly from within with copper and amber warmth — suggesting real value and structural complexity. The two sides separated by a thin gap. Clean, editorial, conceptual. Warm, professional, not dark or ominous. No text. 3:4 vertical.

## image2-alternative

```
A single MLCC photographed twice, side by side on warm cream surface. LEFT: surrounded by multiple identical clones arranged neatly — abundance that was inventory illusion. RIGHT: standing alone, lit by a clean focused beam from above — real scarcity driven by real demand. The contrast is clear but presented with editorial restraint, not drama. Clean, warm, professional. 3:4 vertical.
```


---

## 第09页 — 脚本

# 09｜需求、风险与替代决策

## 页面编号
09 / 10

## 页面标题
需求在涨，但产能弹性不在高端——从哪里会先断？

## 副标题
AI 服务器和新能源汽车拉动的不是简单的"量增长"，而是对小型化、高可靠、低 ESL 产品的结构性需求。这些品类恰好是供应扩张最慢的。替代不是找一个料号，是过三道关。

## 一句话核心结论
高端 MLCC 的供需错配来自三个慢变量：上游材料扩产慢、车规认证周期长、新产线良率爬坡慢。需求可以半年翻倍，但供给需要 3 年响应——断开往往从高端、小众、单一来源的料号开始。

## 外行可懂表达
AI 火了，GPU 不够。GPU 里面 MLCC 也不够。但 MLCC 和 GPU 不一样——GPU 你排队等几个月可能就有了，高端 MLCC 你等不了，因为全世界就那几家能做，车规还要先测两年。你突然发现，这颗比芝麻还小的电容，成了卡脖子的东西。更麻烦的是，替代一颗 MLCC 不是换个料号那么简单——你要验容量、验电压、验温度、验寿命、验渠道——三关全过才算数。

## ChainFlow供应链视角
1. 需求传导：AI 服务器 → GPU 供电架构升级 → 近端去耦 MLCC 需求↑ → 小封装低 ESL 品类紧缺
2. 供给约束：高端粉体设备产能扩张 2-3 年 + 车规认证周期 2-3 年 = 供给弹性极低
3. 替代逻辑（三关）：
   - 参数关：容量/电压/封装/DC Bias 曲线/温度特性 → 工程判断
   - 验证关：热循环/板弯/焊接/寿命/可靠性等级 → 质量判断
   - 供应关：交期/渠道/产地/PCN/第二来源/假货风险 → 供应链判断
   三关全过，替代才成立。
4. 替代时效：消费数周至数月，车规可长达 12-18 个月
5. AI 机会：从 BOM、订单、交期和供应商数据中提前识别高风险料号、自动匹配替代候选、标记验证缺口

## 非技术深度
来自供需传导机制和替代决策复杂度，而非技术参数。供需错配不是"需求多供应少"，而是"需求在高端品类快增、供给在高端品类慢爬"——结构性问题，不是周期性问题。

## 页面正文
（本页不放置正文段落。以下信息以图+标注呈现。）

## 图上标注文字
- 需求端（上半）：
  - AI 服务器 GPU/加速卡 → 近端去耦 MLCC ↑（低 ESL、小封装、高数量）
  - 新能源汽车域控/ADAS/电驱 → 车规 MLCC ↑（高可靠、宽温、长寿命）
- 供给端（下半）：
  - 高端粉体产能：新产线 2-3 年
  - 车规产线：建设+认证 2-3 年
  - 新供应商客户批准：消费数月、车规 12-18 月+
- 供需错配：高端品类缺口—不是短期缺货，是结构性供给不足
- 替代三关流程（纵向排列）：
  ① 参数筛选（工程）—容量/电压/封装/DC Bias/温度
  ② 工程验证（质量）—热循环/板弯/焊接/老化/可靠性等级
  ③ 供应确认（采购）—交期/渠道/产地/PCN·EOL/第二来源/假货
  → 三关全绿 = 可替代
- 替代时效参考：参数筛选数天 · 工程验证数周至数月 · 供应确认数周至数月 · 客户批准数月

## 必须出现的数据
- 认证周期量级（消费 vs 车规）
- 替代时效量级
- 不标注精确增长率或数字

## 来源编号
MLCC-F006, F007, F011, F012, F019。供需趋势为定性方向性表达。

## 事实风险
- 高：供需趋势为定性判断，必须标注"方向性表达，非精确预测"
- 中：AI 服务器/新能源汽车需求驱动机型不应在图中指定具体型号
- 不构成投资建议，不预测价格走势

## 可删减内容
- 过多应用场景细分
- 地缘政治展开

## 视觉中心
上下双板构图——上半：供需剪刀差图（AI/汽车需求 ↑ vs 高端供给 ↗ 缓慢）。下半：替代三关纵向流程图。

## 手机端三秒阅读顺序
① 标题"从哪里会先断" → ② 供需剪刀差开口 → ③ 替代三关的"三关全过才算数"

## Figma排版提醒
- 构图：上下分段——上 45% 供需剪刀差，下 55% 替代三关
- 背景：暖纸白底
- 供需曲线为方向性示意，用铜金色/警示红分别标注需求侧和供给侧
- 替代三关用纵向流程图，每关左侧有关卡图标（参数/验证/供应），右侧检查项列表
- 三关全过的"绿灯"标识用绿色（仅此一处使用）
- 底部替代时效参考用横向时间轴

---

## 第09页 — 视觉提示词

# 09｜需求风险与替代 — 视觉锚点提示词

## image2-primary

```
Clean conceptual still life: a single MLCC capacitor standing on a circuit board trace, like a bridge over a small gap. The perspective is from slightly above, looking down. The PCB provides warm green-gold tones. Soft, natural lighting. The metaphor is subtle: this tiny component connects two sides — without it, the circuit breaks. Editorial restraint, not drama. Warm cream and green-gold tones. No text. 3:4 vertical.

## image2-alternative

```
A clean hourglass on a warm cream surface. Instead of sand, the upper half contains a cascade of tiny MLCC capacitors. Some are flowing smoothly through the neck, a few paused at the narrowest point. The lower half is nearly empty. The metaphor: supply is running thin, and the bottleneck is visible. Clean, warm, editorial — not ominous or dark. Natural soft lighting. 3:4 vertical. No text.
```


---

## 第10页 — 脚本

# 10｜ChainFlow 判断

## 页面编号
10 / 10

## 页面标题
盯价格，不如盯信号——供应链视角的五个跟踪维度

## 副标题
数据→信号→判断→行动→流动。MLCC 供应链的真正风险，藏在那几个需要以年为单位才能改变的慢变量里。

## 一句话核心结论
MLCC 的供应链健康度不取决于此刻有没有货，而取决于需要 2-3 年才能改变的慢变量：上游材料扩产信号、车规产线利用率、国产认证进展、技术代际差距和替代材料渗透。日常盯价格不如盯这些信号。

## 外行可懂表达
你不需要每天都查 MLCC 报价。你真正需要盯的是五件事：上游材料厂有没有扩产新闻、高端产线是不是已经排满了、中国企业的车规认证进度、日本企业下一代产品比现在小了多少、有没有别的技术开始替代 MLCC。这五个信号，比今天的价格更能告诉你明年会不会缺货。

## ChainFlow供应链视角
ChainFlow 核心框架：数据 → 信号 → 判断 → 行动 → 流动
- 数据：BOM、库存水位、交期、价格、产能利用率、供应商财报、认证进度
- 信号：上游扩产公告、交期延长趋势、客户结构变化、某型号被多家客户同时询价
- 判断：未来 3-6 个月的供应松紧、哪些品类风险最高、替代是否可行
- 行动：提前建安全库存、启动第二来源验证、与供应商锁产能、调整产品设计物料清单
- 流动：供应链不是静止的。信息和物料一起流动才是健康的供应链。

AI 在每个环节可以做什么：
- 从 BOM 和 ERP 数据中自动提取 MLCC 型号→匹配厂商规格书和曲线
- 监控多来源的交期和价格数据→自动识别异常波动
- 对比 BOM 和供应商能力矩阵→标记替代风险等级
- 追踪主要厂商的财报、产能公告和认证进展→生成供应链周报

## 非技术深度
来自信号识别和供应链判断框架，而非对 MLCC 本身的进一步技术详解。这一页的价值不是"讲得更细"，而是"告诉你该看什么"。

## 页面正文
（本页以五个信号卡片和 ChainFlow 框架图为主体。以下文字分布在图中。）

## 图上标注文字
五个信号卡片：

1. 上游材料扩产信号
   看什么：陶瓷粉体厂和浆料厂的投资公告
   为什么：粉体产线从投资到量产 2-3 年。如果现在不扩产，两年后必定瓶颈
   当前：日系主导，中国国瓷材料扩产中

2. 车规产线利用率
   看什么：主要厂商的资本开支和产能利用率指引
   为什么：车规产线满载→非车规客户被挤出→消费/工业级交期恶化
   当前：高端产线普遍偏紧

3. 国产认证进展
   看什么：中国 MLCC 厂进入 Tier1 供应链的数量和等级
   为什么：每多一家通过车规认证，替代窗口就宽一分
   当前：通用级有进展，车规级仍在早期

4. 技术代际差距
   看什么：日系最新产品尺寸和容量密度 vs 国内同类产品
   为什么：如果代差拉大，高端替代时间表将推迟 3-5 年
   当前：村田已到 006003，国内主力仍在 0201-0402 区间

5. 替代方案渗透
   看什么：硅电容、薄膜电容、嵌入式电容在特定场景的采用率
   为什么：如果高频/高可靠场景出现替代方案，MLCC 需求结构将变化
   当前：部分高频场景已有硅电容渗透，但 MLCC 仍为主流

## 必须出现的数据
无精确定量数据。五个信号均为定性分析框架。

## 来源编号
综合前九页所有来源。ChainFlow 框架来自 brand docs。

## 事实风险
- 中：五个信号的选择和权重是 ChainFlow 编辑判断，不是量化模型
- 低：不涉及定量预测
- 必须标注：本文为产业研究与供应链判断交流，不构成投资建议或采购指令

## 可删减内容
- 过于宽泛的"未来展望"
- 过多的 AI 功能描述（保留概念方向即可）

## 视觉中心
五个信号卡片——错落排列，每张卡片一个信号名+图标+为什么盯+当前状态。底部 ChainFlow 框架（数据→信号→判断→行动→流动）的可视化连线。

## 手机端三秒阅读顺序
① 标题"盯价格不如盯信号" → ② 前两个信号卡片（材料扩产+产线利用率）→ ③ 底部"数据→信号→判断→行动→流动"

## Figma排版提醒
- 构图：五个信号卡片错落排列（3+2 或 2+1+2），底部 ChainFlow 框架
- 背景：暖纸白底
- 信号卡片用暖底微色差区分（不是白卡），每个信号对应一个小图标
- ChainFlow 框架用五个节点+箭头连线，铜金色或工程蓝
- 全文结语放在框架下方，短而克制
- 署名 + 来源总说明 + 免责声明放在最底部
- 最后一行：全系列来源见 chainflowlab.com / 或本期 evidence 目录

---

## 第10页 — 视觉提示词

# 10｜ChainFlow 判断 — 视觉锚点提示词

## image2-primary

```
A calm, expansive waterscape at dawn — a wide river or lake with gentle ripples catching soft morning light. The water is clear and flowing, reflecting pale sky tones. In the distance, faint silhouettes of industrial infrastructure — ports, cranes, warehouses — visible through soft morning haze. The metaphor: supply chains flowing like water, infrastructure fading into the background, flow itself is the focus. Clean, serene, professional. Soft blue-grey and warm ivory tones. Not dark — gentle and hopeful. 3:4 vertical. No text.

## image2-alternative

```
Abstract overhead photograph of clear water flowing over smooth pale stones. Intricate flow patterns — some rushing, some pooling, some finding alternative paths around obstacles. Clean, bright, zen-like but professional. Pale blue-grey and warm stone tones. Supply chains adapt and find paths, like water. 3:4 vertical. No text.
```

