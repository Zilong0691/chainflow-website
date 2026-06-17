# 3D 地球交接文档

## 写给 Codex

ChainFlow 项目需要把首页右侧的 SVG 地球替换为 Three.js 3D 地球。

### 要求

- Three.js 3D 地球，科技蓝/金色风格
- 星空粒子背景
- 全球航线曲弧（上海/深圳/东京/新加坡/迪拜/伦敦/纽约等枢纽）
- 城市蓝/金色节点 + 人口热力红点
- 经纬网格
- 鼠标拖拽旋转 + 滚轮缩放 + 缓慢自转
- 玻璃拟态边框叠加层
- 与 ChainFlow 品牌色（bg-graphite / text-rice / text-gold）协调

### 当前状态

**分支**: `release/dual-tools-v1`
**Hero 组件**: `components/Hero.tsx` — 使用 `dynamic(() => import("./Globe3D"), { ssr: false })` 加载
**Globe3D 组件**: `components/Globe3D.tsx` — 已写完整 Three.js 逻辑，但地球不显示
**Three.js 文件**: `public/three.min.js` (654KB) — 从 jsdelivr 下载的 0.160.0 版本

### 我遇到了什么问题

Next.js 14 的 webpack 无法处理 `import * as THREE from "three"`：
- three.js 0.160+ 是纯 ESM 模块 (`"type": "module"`)，webpack 处理时报错
- 试过 `transpilePackages: ["three"]`、`serverExternalPackages`、`esmExternals: "loose"` — 都不行
- 试过 `require("three/build/three.cjs")` — TypeScript 报错
- 试过 CDN unpkg/jsdelivr 动态加载 — 国内网络不通
- 最终方案：把 three.min.js 放 `public/` 通过 `<script>` 标签加载到 `window.THREE`，组件无任何 THREE import。本地构建通过，但 Vercel Preview 上地球不渲染。

### 当前 Globe3D.tsx 结构

```tsx
"use client";
// 无任何 import THREE — 完全通过 window.THREE 访问

const SCRIPT_URL = "/three.min.js";

function loadThree(): Promise<any> {
  // 动态创建 <script> 标签加载 public/three.min.js
  // 如果 window.THREE 已存在则直接返回
}

export default function Globe3D() {
  // useEffect 中调用 loadThree().then((THREE) => { ... })
  // 创建 scene/camera/renderer
  // 渲染海洋球 + 大陆层 + 经纬网 + 航线 + 城市点 + 星空
  // 鼠标拖拽 + 滚轮 + 自转动画
  // 返回 <div ref={ref} />
}
```

### Hero.tsx 集成

```tsx
import dynamic from "next/dynamic";
const Globe3D = dynamic(() => import("./Globe3D"), { ssr: false });

// JSX 中:
<div className="relative flex min-h-[18rem] ... lg:min-h-[34rem]">
  <Globe3D />
</div>
```

### 你可能想尝试的方向

1. **降级 Three.js 版本** — 试试 0.157 或更早版本，CJS 支持更好
2. **用 react-three-fiber** — `@react-three/fiber` + `@react-three/drei` 封装了 THREE，可能有更好的 Next.js 兼容性（但包很大 40MB+）
3. **完全不同的方案** — CSS 3D 地球、Canvas 2D 地球、WebGL 原生（不用 THREE）
4. **检查浏览器控制台** — Preview URL 上打开 DevTools，看是否有 JS 错误
5. **检查 three.min.js 是否加载** — DevTools Network 面板确认 `/three.min.js` 返回 200

### 相关命令

```bash
npm run build    # 构建（当前通过，13页）
npm run dev      # 本地开发 localhost:3000
npm test         # 测试（28项通过）
```

### GitHub

- 仓库: `Zilong0691/chainflow-website`
- 分支: `release/dual-tools-v1`
- 最新 Preview: 每次 push 到该分支后 Vercel 自动部署

### 其他

- `git checkout 882ebc9 -- components/Hero.tsx` 可恢复旧 SVG 地球
- 不要改 `origin/main`（生产环境）
- 不要删 `public/demos/` 下的旧 Demo HTML
