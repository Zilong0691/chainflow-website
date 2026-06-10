# Figma 文件结构规划 — MLCC 001

编制日期：2026-06-10

---

## Figma 文件信息

**文件名**（建议）：ChainFlow — MLCC 001 品牌定调样刊
**连接状态**：待确认（用户需提供 Figma 文件链接或新建文件权限）
**MCP 状态**：当前环境尚待确认 Figma MCP 是否可用

---

## 页面结构

```
00 — References（参考页，不可编辑）
01 — Foundations（基础系统）
02 — Components（组件库）
03 — Concepts（构图草稿）
04 — Drafts（样页草稿）
05 — Approved Masters（验收通过的母版）
06 — Exports（导出区）
```

---

## 00 — References

**用途**：集中存放所有参考素材，本页内容不进入最终输出。

**内容**：
- 三张旧版 PNG（00-cover.png, 01-structure.png, 06-process.png）——标注为"反面样例"
- 用户提供的范本截图（如有）
- 竞品/参考号的内容截图（如有）

**规则**：
- 旧版 PNG 旁标注：旧版问题——统一卡片模板 / 缺乏主视觉 / SVG 硬编码不可维护 / 无 Figma 协作
- 不直接描摹任何参考图

---

## 01 — Foundations

**用途**：全刊统一的设计基础。

**Frame 内容**：
- **Color Palette**：品牌色板
  - Paper: #F6F0E6（暖象牙白，主背景）
  - Ink: #1B1F24（深石墨，正文）
  - Navy: #102B4E（海军蓝，强调）
  - Blue: #246A93（工程蓝，连接线/次要强调）
  - Red: #B33A3A（警示红，风险标注专用）
  - Muted: #5F6974（灰蓝，辅助文字）
  - Line: #C7CED2（浅灰线，分隔线/框线）
  - Ceramic-Tone: #D8C7A0（陶瓷色，介质层表达）
  - Electrode-Tone: #15385E（电极色，金属层表达）
  
- **Typography Scale**：字体层级
  - Hero Title: 宋体 72px / 1.08 / Bold（封面主标）
  - Page Title: 宋体 56-64px / 1.12 / Bold（内页主标）
  - Subtitle: 黑体 24-27px / 1.38 / Medium
  - Body: 黑体 21-24px / 1.48 / Regular
  - Callout: 黑体 17-19px / 1.35 / Regular
  - Caption: 黑体 14-15px / 1.35 / Regular（来源、页码）
  - 宋体备选：Songti SC, Noto Serif CJK SC
  - 黑体备选：PingFang SC, Noto Sans SC

- **Layout Grid**：
  - Frame: 1080 × 1440 px
  - Margin: 70px（左右）
  - Header: Y=58-92（品牌栏 + 分隔线）
  - Footer: Y=1322-1385（判断 + 来源）
  - Safe Zone: X=70-1010, Y=100-1300

- **Line Styles**：
  - Divider: 1.5px, #C7CED2
  - Callout Line: 2px, #102B4E 或 #246A93
  - Dashed: 2px dash 7-8, #102B4E, 45% opacity
  - Risk/Alert: 2px, #B33A3A

---

## 02 — Components

**用途**：可复用的 Figma 组件。

**组件清单**：
1. **Brand-Header**（品牌页眉）
   - 左侧：链流品类志 / CF Components 001
   - 右侧：页码 XX / 09
   - 下方：分隔线

2. **Page-Title-Group**（页面标题组）
   - 主标题（宋体，可编辑）
   - 副标题（黑体，可编辑）

3. **ChainFlow-Footer**（页尾判断）
   - "ChainFlow 判断"标签
   - 判断文本（可编辑）
   - 来源/事实标注（可编辑）

4. **Callout-Line**（标注引出线）
   - 端点样式（圆点/箭头）
   - 折线/直线变体

5. **Callout-Text**（标注文本块）
   - 标题 + 描述，两行

6. **Info-Box**（信息框）
   - 白底半透明框 + 浅灰描边
   - 深色底框（navy 背景+白字）

7. **Flow-Arrow**（流程箭头）
   - 直箭头 / 弯箭头
   - 蓝色主题

8. **Risk-Tag**（风险标签）
   - 红色文字 + 红色边框/底色

---

## 03 — Concepts

**用途**：构图草稿和低保真线框。

**Frame 内容**：
- 00-Cover：三种构图方案的草稿 Frame（A1/A2/A3）
- 02-Structure：三种构图方案的草稿 Frame（C1/C2/C3）
- 06-Landscape：三种构图方案的草稿 Frame（E1/E2/E3）

每个草稿 Frame 只需：
- 灰色矩形代指主视觉区域（标注"主视觉：XXX"）
- 文字块代指标题位置（标注字号）
- 箭头代指阅读路径
- 不做任何精修

在用户确认方案选择后，选中方案移入 Drafts。

---

## 04 — Drafts

**用途**：三张关键样页的高保真设计稿。

**Frame 内容**：
- 00-Cover-Draft（封面页草稿）
- 02-Structure-Draft（技术解剖页草稿）
- 06-Landscape-Draft（产业格局页草稿）

**重要规则**：
- 每个 Draft Frame 为一整页 1080×1440
- 图层按脚本中建议的 Figma 图层结构组织
- 所有文字可编辑
- 图像资产用链接或占位符，不内嵌超大 PNG
- 标注"草稿—待验收"

---

## 05 — Approved Masters

**用途**：验收通过的三张母版页。

**入库条件**（同时满足 12 项）：
1. 手机缩小后仍有明确视觉中心
2. 三秒内能看懂本页讲什么
3. 有一个值得读者记住的新认知
4. 信息足够，主次清楚
5. 文字不是简单塞进卡片
6. 主视觉真实、专业或明确标注为示意
7. 数据与来源准确
8. 视觉不像课程讲义或咨询模板
9. 与其他页面统一，但构图不重复
10. 符合 ChainFlow 专业、克制、流动和产业研究气质
11. 所有关键元素在 Figma 中可编辑
12. 具备公众号首篇品牌定调作品的质量

入库后：
- 标记为 Approved Master XX
- 从此 Frame 衍生剩余七页
- 后续修改不直接在 Master 上进行，先复制到 Drafts

---

## 06 — Exports

**用途**：最终高清输出。

**输出规格**：
- 格式：PNG（RGB）
- 尺寸：1080 × 1440 px
- 分辨率：144 dpi（公众号标准）
- 命名：chainflow-mlcc-001-XX.png

---

## Figma MCP 连接后的第一步操作

1. 确认 MCP 连接正常
2. 读取已有 Figma 文件（如有）
3. 不破坏已有页面
4. 新建页面 "MLCC 001 — Redesign"
5. 按照以上六页结构建立 Frame
6. 先搭建 01 Foundations（调色板、字体、网格、线条样式）
7. 再搭建 02 Components
8. 然后在 03 Concepts 中建立低保真构图

---

*本结构在 Figma MCP 连接确认后执行。在此之前不创建 Figma 元素。*
