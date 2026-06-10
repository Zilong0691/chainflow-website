# 资产保留、废弃与复用建议 — MLCC 001

编制日期：2026-06-10

---

## 一、保留并继续使用

| 资产 | 位置 | 复用方式 | 理由 |
|---|---|---|---|
| chainflow.md | 项目根目录 | 持续引用品牌战略 | 战略宪章，不可替代 |
| standards/ | 项目根目录 | 不直接用于内容 | 底层标准体系 |
| research-outline.md | mlcc-001/research/ | 作为研究问题树起点 | 四层问题结构仍有价值 |
| disputed-claims.md | mlcc-001/evidence/ | 继续维护，追加新争议项 | 事实审校底线 |
| glossary-zh-en.json | mlcc-001/evidence/ | 扩展后用于标注 | 术语对照基础 |
| wechat-draft.md 导语和结语 | mlcc-001/copy/ | 改写后复用 | 文案骨架可用 |
| qa/ 三篇审核报告 | mlcc-001/qa/ | 作为内容底线参考 | 事实/同行/视觉评审标准 |

## 二、保留作为参考（不进入新版）

| 资产 | 位置 | 用途 | 说明 |
|---|---|---|---|
| 三张现有 PNG | mlcc-001/output/ | Figma 00-References 中的反面样例 | 标注问题点，不描摹 |
| 三张现有 SVG | mlcc-001/editable/svg/ | 可拆解局部技术元素 | 端头连接逻辑线条可借鉴，不直接复用 |
| 三张现有 HTML | mlcc-001/editable/ | 不保留 | 只是 SVG 的包装器，无独立价值 |
| page-scripts/ | mlcc-001/page-scripts/ | 对照旧版叙事 | 不进入新工作流 |
| brand-tokens.json | mlcc-001/templates/ | 配色和字体基准参考 | 新版在 Figma 中重新建立 |
| typography.css | mlcc-001/templates/ | 字体尺寸参考 | 新版在 Figma 中重建 |
| layout.css | mlcc-001/templates/ | 布局尺寸参考 | 新版在 Figma 中重建 |

## 三、明确废弃

| 资产 | 位置 | 废弃理由 |
|---|---|---|
| generate-phase1.mjs | mlcc-001/tools/ | 硬编码 SVG 生成脚本（1292行），不可维护，且导致十页模板化 |
| render-png.mjs | mlcc-001/tools/ | 批量 PNG 导出跳过设计环节，违反新工作流 |
| pageBase() 函数逻辑 | generate-phase1.mjs 中 | 统一模板函数导致所有页面视觉趋同 |
| 旧版 SKILL.md | mlcc-001/ | v1 工作流描述已过时，v2 将建立新 Skill |
| 旧版 README.md | mlcc-001/ | 描述的是 v1 交付状态 |
| templates/components/README.md | mlcc-001/templates/ | 仅一行说明，无实际组件定义 |

## 四、需在第二阶段重建

| 资产类型 | 当前状态 | 新版计划 |
|---|---|---|
| Design System | 仅有 CSS 变量和 JSON token | Figma 组件库 + Styles |
| 组件库 | 无 | Figma Components 页面 |
| 来源表 | 5 个技术来源 | 扩展至 15-20 个来源（含企业官网/年报/标准） |
| 事实表 | 12 条（10 条二级来源） | 扩展至 20+ 条（增加一级来源验证） |
| Skill 定义 | v1 简单流程 | v2 完整内容生产 Skill |
| 视觉参考板 | 不存在 | 建立 moodboard/参考合集 |

## 五、文件系统处理

### 老目录 mlcc-001/

- **不删除、不覆盖**
- 标记为 deprecated（可在 README 中添加一行说明指向 v2）
- Figma 中引用时标注"Mlcc-001 v1 — 反面样例"
- 所有新产出进入 mlcc-001-v2/

### 新目录 mlcc-001-v2/

已建立完整结构：
```
mlcc-001-v2/
├── audit/           ✅ 已完成
│   ├── takeover-audit.md
│   ├── content-audit.md
│   └── asset-disposition.md
├── research/        ✅ 已完成
│   ├── fact-table-v2.json
│   └── source-list-v2.md
├── scripts-v2/      ✅ 已完成（10页）
├── visual-direction/ ✅ 已完成
│   ├── page-prototypes.md
│   └── composition-studies.md
├── assets/          ⏳ 待生成
│   ├── source/      (图像模型生成的原图)
│   ├── generated/   (Figma 导出的资产)
│   ├── vectors/     (SVG 技术矢量)
│   └── logos/       (品牌标识)
├── figma-handoff/   ✅ 已完成
│   └── figma-structure.md
├── exports/         ⏳ 待三张样页验收后
└── qa/              ⏳ 待三张样页高保真完成后
```

---

## 六、不碰触的边界

以下文件/目录**在本项目中不得修改**：
- 主站代码（app/, components/, lib/, public/）
- package.json / package-lock.json
- next.config.mjs / tailwind.config.ts / tsconfig.json
- middleware.ts
- .env.local / .env.example
- modules/ / templates/ / docs/（供应链工具模块）
- .vercel/ / .next/

---

*本建议在用户确认后生效。后续所有新建文件均放入 mlcc-001-v2/ 目录。*
