# 视觉资产需求清单 — MLCC 001

生成日期：2026-06-10

---

## 使用说明

本清单列出需要通过图像生成模型或外部素材获取的视觉资产。所有资产：
- **不能包含中英文文字**（文字由 Figma 图层叠加）
- **不能包含数据、标注、页码**
- **优先透明背景**，便于在 Figma 中灵活构图
- **标注"必须人工核验"的项目在生成后需要逐项检查**

---

## 资产清单

### A-01｜封面 MLCC 多米诺序列

**用途**：00 封面主视觉（方案 A3）
**画面描述**：3-5 颗 MLCC 元件，从左到右排列——第一颗完整外观，第二颗半剖（露出一半内部叠层），第三颗全剖面展示内部结构。背景深色/中性灰，有工业摄影质感。
**构图**：微倾斜排列（约 15° 对角线），从左下到右上。景深较浅（f/8-f/11），焦点在第二颗半剖器件上。
**视角**：微距摄影视角（约 3-5× 放大），平视或微俯视。
**技术要求**：
- 尺寸：至少 2000×2000 px，300 dpi
- 陶瓷材质应有亚光/半哑光质感，非塑料感
- 端电极金属应有真实的金属光泽（非铬色镜面）
- 剖面内部叠层应可见（但不需要文字标注级别精度——Figma 后续叠矢量标注层）
**透明背景**：是（PNG，物件周围干净去背）
**禁止元素**：任何文字、品牌 logo、刻度尺、数据标签、水印
**图像生成提示词**：
```
Professional macro product photography of 3 multilayer ceramic chip capacitors arranged in a slight diagonal row, left to right: first one intact showing ceramic body with silver metal end caps, second one half-cut revealing internal alternating layers, third one fully cross-sectioned showing complete internal layer structure. Dark graphite background. Industrial editorial lighting, soft shadows, museum-quality precision. Ceramic material with matte warm beige tone, metal terminations with subtle brushed nickel finish. No text, no labels, no logos, no watermark. Clean product photography style, supply chain research publication quality.
```
**生成后需核验**：
- [ ] 陶瓷颜色不过于饱和（偏暖灰白，不是亮黄）
- [ ] 金属端头色泽真实（银灰/镍色，不是金色或镜面铬）
- [ ] 剖面叠层交替关系正确（层线不混乱）
- [ ] 无 AI 生成的假文字或乱码
- [ ] 去背干净（边缘无白边或锯齿）

---

### A-02｜MLCC 微距剖面渲染

**用途**：01 尺度页微观级对比、02 技术解剖页参考
**画面描述**：一颗 0402 封装 MLCC 的精密剖面图。纵向从中线切开，清晰展示陶瓷介质层（暖米色）与镍内电极（深灰金属色）的交替结构。两端为端电极（铜色基底+镍层+锡层）。
**构图**：正剖面，器件水平放置，剖面占据画面中央。
**视角**：正视剖面（正投影），微距级。
**技术要求**：
- 尺寸：至少 2000×1500 px
- 层间界面清晰但不生硬（渲染而非 CAD 线稿感）
- 介质层和电极层的厚度比例大致合理（介质层厚于电极层）
- 端头的多层镀层可见
**透明背景**：是
**禁止元素**：任何文字、标注、尺寸、箭头
**图像生成提示词**：
```
Precision technical cross-section render of an 0402 MLCC capacitor, cut perfectly vertically through the center. Alternating layers of warm beige ceramic dielectric and dark grey nickel internal electrodes visible. Left and right terminations showing copper base, nickel barrier, and tin plating layers. Clean neutral light grey background. Scientific instrument photography style, electron microscope aesthetic but with warm material tones. No text, no labels, no scale bars, no annotations.
```
**生成后需核验**：
- [ ] 左右端头连接逻辑正确（奇偶层分别连接左右）
- [ ] 介质层和电极层数量合理（不是只有 3-4 层）
- [ ] 材质颜色区分明确
- [ ] 无 AI 乱码

---

### A-03｜工业制造场景图

**用途**：05 材料与工艺页背景氛围、06 产业格局页点缀
**画面描述**：电子元器件制造工厂的局部场景——可以是流延机、烧结炉、测试分选设备或洁净室产线。不需要全景或特定设备品牌。
**构图**：浅景深，前景虚化，中远景清晰。氛围偏工业档案摄影（不是宣传照）。
**视角**：平视或微俯视。
**技术要求**：
- 尺寸：至少 2000×1500 px
- 风格：工业档案摄影——低调、真实、不过度美化
- 色调：偏冷灰，与 ChainFlow 暖纸底色形成对比
**透明背景**：不需要（作为背景或半透明叠层使用）
**禁止元素**：可辨识的企业 logo、设备品牌名、工人面部特写、中文标识
**图像生成提示词**：
```
Industrial documentary photography of an electronic component manufacturing cleanroom, shallow depth of field. Ceramic capacitor production line with precision machinery, subdued cool grey-blue tone. Archival industrial photography aesthetic, not corporate promotional style. Muted colors, realistic factory lighting. No visible logos, no brand names, no identifiable faces, no text.
```
**生成后需核验**：
- [ ] 无识别性设备品牌
- [ ] 无人物面部（如有工人应虚化或背面）
- [ ] 整体质感与页面风格协调

---

### A-04｜陶瓷粉体微观纹理

**用途**：05 材料栈页粉体层级背景纹理、02 技术剖面的介质层微观纹理
**画面描述**：BaTiO3 陶瓷粉体的 SEM（扫描电子显微镜）风格图像——微米/亚微米级颗粒分布。
**构图**：均匀颗粒分布，不需要特定构图。
**视角**：俯视（SEM 标准视角）。
**技术要求**：
- 尺寸：至少 1500×1500 px
- 颗粒应在亚微米到微米级视觉量级
- 黑白或单色调，便于在 Figma 中着色叠加
**透明背景**：不需要（作为纹理叠加层）
**禁止元素**：任何标注、比例尺
**图像生成提示词**：
```
Scanning electron microscope style image of barium titanate ceramic powder particles, sub-micron to micron scale, uniform particle distribution, high contrast black and white, scientific imaging quality. Monochrome, suitable for use as texture overlay. No scale bars, no labels, no annotations.
```
**生成后需核验**：
- [ ] 颗粒尺度感大致合理（不是毫米级大颗粒）
- [ ] 无文字或标尺

---

## 不需要图像模型生成的资产（明确排除）

以下全部由 Figma 中矢量绘制或文本排版完成，**不需要图像模型生成**：
- 所有流程图、标注线、箭头
- 所有数据图表、曲线、矩阵
- 所有文字（标题、标注、来源、判断、署名、页码）
- 等效电路图
- 封装尺寸对比图
- 温度特性编码图
- 替代三线图
- 品牌标识
- 页码和页眉页脚

---

## 总需求汇总

| 编号 | 资产 | 用途页面 | 优先级 | 类型 |
|---|---|---|---|---|
| A-01 | MLCC 多米诺序列 | 00 封面 | P0 | 产品渲染 |
| A-02 | MLCC 微距剖面 | 01, 02 | P0 | 剖面渲染 |
| A-03 | 工业制造场景 | 05, 06 | P1 | 氛围图 |
| A-04 | 粉体微观纹理 | 02, 05 | P1 | 纹理贴图 |

P0 = 三张样页必需，P1 = 剩余七页加分项。

---

*本清单将在第二阶段进入图像生成前，逐项与用户确认后执行。生成结果放入 assets/source/，核验后移入 assets/verified/。*
