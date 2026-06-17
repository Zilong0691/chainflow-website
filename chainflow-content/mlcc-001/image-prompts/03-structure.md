# 03｜技术结构 — 视觉锚点提示词


> **REFERENCE IMAGE**: Use the provided 三环 MLCC cross-section diagram as the authoritative reference for electrode structure. Follow its alternating left-right electrode pattern exactly, but render it in our style: warm ivory paper background, hyper-realistic 3D, copper-gold electrodes, warm lighting.
## ⚠️ 生图前先确认（发给GPT，确认理解后再生图）

在生成图片之前，请先确认你理解了MLCC内部电极的"对插梳子"结构。如果你理解的是"所有电极都对齐""金属贯穿整个宽度""左右电极在中间连在一起""S形或Z形连接"——这些都是错的。正确的结构是：左侧梳子齿只连左柄，右侧梳子齿只连右柄，两把梳子齿对插但不接触。请确认理解后，再按下面的提示词生图。

---

## image2-primary

```
TECHNICAL CROSS-SECTION OF MLCC CAPACITOR — THE MOST CRITICAL INSTRUCTION COMES FIRST:

THE ELECTRODE STRUCTURE IS TWO INTERLOCKING COMBS, NOT STACKED PANCAKES, NOT S-CURVES, NOT Z-SHAPES.

HERE IS EXACTLY WHAT TO DRAW:
1. Draw a horizontal rectangle. Left side = Left Terminal cap (silver). Right side = Right Terminal cap (silver).
2. Draw Layer 1 (dielectric): a beige band spanning the full width.
3. Draw Layer 2 (electrode A): a gold line starting FROM the LEFT terminal, extending RIGHT about 70% across, then STOPPING. There is a GAP of empty beige space between this line's right end and the Right Terminal.
4. Draw Layer 3 (dielectric): another beige band spanning full width.
5. Draw Layer 4 (electrode B): a gold line starting FROM the RIGHT terminal, extending LEFT about 70% across, then STOPPING. There is a GAP of empty beige space between this line's left end and the Left Terminal.
6. REPEAT this alternating pattern 20-30 times. Layer A, Layer B, Layer A, Layer B... NEVER the same direction twice in a row.

WHAT YOU MUST NEVER DRAW:
- NEVER draw a gold line that touches BOTH terminals. Every electrode touches only ONE side.
- NEVER draw electrodes that meet in the middle. The gap must be visible.
- NEVER draw S-shaped or Z-shaped connections between layers. Each electrode is a straight horizontal line.
- NEVER draw all electrodes starting from the same side. They MUST alternate.

THE CORRECT VISUAL: Looking at the cross-section from left to right, you should see a ZIGZAG pattern of gaps — gap on the right, gap on the left, gap on the right, gap on the left... alternating with every layer.

---

REST OF THE IMAGE:
3:4 vertical, 1080x1440px. Warm ivory paper background.
White/cream ceramic dielectric layers — matte, slightly textured.
Gold/copper metallic electrode layers — glossy, reflective.
Approximately 20-30 layer pairs.
Left and right terminations: copper base (warm brown) → nickel barrier (grey) → tin plating (bright silver).
LAYOUT: Left 60% — cross-section. Right 40% — annotation cards. Bottom — formula: C_total ≈ n × εr ε0 A / d.
Clean, warm, premium technical illustration. Not dark. Not clinical.
```

## image2-alternative

```
SAME ELECTRODE RULES AS PRIMARY — two interlocking combs, NOT stacked pancakes, NOT S-curves.

3D exploded-view render. 3:4 vertical. Warm ivory paper background. The MLCC is split open vertically — ceramic body halves pulled apart to reveal the internal alternating electrode structure fanned out like pages of a book. White ceramic layers, gold electrodes, silver terminations. Each electrode clearly extends from only ONE side. Clean, precise, warm. Not dark.
```
