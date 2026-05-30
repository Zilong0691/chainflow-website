# ChainFlow 官网 V0.2

ChainFlow 是一个基于 Next.js、React 和 Tailwind CSS 的供应链 AI 工具箱网站。当前版本围绕“省时间 / 做判断 / 看见网络”组织首页，重点展示 RouteFlow、NetworkFlow、Pricing 和第一批试点入口。

## 本地运行

```bash
cd /Users/zhaozilong/chainflow
npm install
npm run dev
```

打开本地地址：

```text
http://localhost:3000
```

生产构建检查：

```bash
npm run build
```

## GitHub 上传步骤

先在 GitHub 创建一个空仓库，建议仓库名：

```text
chainflow-website
```

创建时不要勾选 README、.gitignore 或 License，避免和本地仓库冲突。创建完成后复制 GitHub 给你的仓库地址。

```bash
cd /Users/zhaozilong/chainflow
git init
git add .
git commit -m "Launch ChainFlow website"
git branch -M main
git remote add origin https://github.com/YOUR_USER/chainflow-website.git
git push -u origin main
```

如果已经在 GitHub 创建了仓库，把 `YOUR_USER/chainflow-website.git` 换成你的实际仓库地址。

## Vercel 部署步骤

1. 打开 Vercel 并使用 GitHub 登录。
2. 点击 `Add New` -> `Project`。
3. 选择 GitHub 里的 `chainflow-website` 仓库。
4. Framework Preset 选择 `Next.js`。
5. Build Command 使用默认的 `next build`。
6. 点击 `Deploy`。
7. 部署成功后，复制 Vercel 生成的 `*.vercel.app` 公网网址。

今晚先不绑定自定义域名，先确保 `vercel.app` 公网网址可访问。

## 自定义域名绑定步骤

后续需要绑定自定义域名时：

1. 在 Vercel 项目中进入 `Settings` -> `Domains`。
2. 添加你的域名，例如 `chainflowlab.com` 或 `www.chainflowlab.com`。
3. 按 Vercel 提示到域名服务商添加 DNS 记录。
4. 等待 DNS 生效后，Vercel 会自动签发 HTTPS 证书。

## 后续修改

- 修改导航、工具、Pricing、未来方向、联系信息：`lib/content.ts`
- 修改首页组件结构：`app/page.tsx`
- 修改 Demo 页面：`app/tools/routeflow/page.tsx`、`app/tools/networkflow/page.tsx` 和 `components/ToolDemoPage.tsx`
- 修改各区块视觉和布局：`components/`
- 修改全局配色、按钮、动效：`app/globals.css` 和 `tailwind.config.ts`
- 替换首屏视觉资产：替换 `public/chainflow-hero-flow.png`，保持文件名不变即可

当前占位联系方式在 `lib/content.ts` 的 `siteContent.zh.contact.links` 和 `siteContent.en.contact.links` 中。
