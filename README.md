This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 数据库配置说明

## 文件结构

- `schema.ts`: 数据库表结构定义
- `index.ts`: Drizzle ORM 实例

## 数据库表结构

### Products 表（产品表）
- `id`: UUID 主键
- `slug`: 唯一标识符（用于 URL）
- `name`: 产品名称
- `description`: 产品简介
- `imageUrl`: 图片存储路径
- `sopDocumentUrl`: SOP 文件路径
- `status`: 状态（draft | published）
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

### Nutrition 表（营养成分表）
- `id`: UUID 主键
- `productId`: 关联产品 ID（外键）
- `calories`: 卡路里
- `carbs`: 碳水化合物
- `fat`: 脂肪
- `protein`: 蛋白质
- `ingredientsJson`: 原料配方（JSON 格式）
- `createdAt`: 创建时间
- `updatedAt`: 更新时间

## 使用方法

### 1. 配置环境变量

复制 `.env.local.example` 为 `.env.local`，填入你的 Vercel Postgres 数据库连接信息。

### 2. 生成迁移文件

```bash
npm run db:generate
```

### 3. 推送到数据库

```bash
npm run db:push
```

### 4. 查看数据库（可选）

```bash
npm run db:studio
```

这将打开 Drizzle Studio，可以在浏览器中查看和管理数据库。


# 🥑 宝珠 AI 营养管理系统 (Baozhu AI Nutrition V2)

> **核心理念**: 稳健优先，零环境依赖。
> **当前版本**: V2.1.0 (重构版)

## 1. 项目简介
这是一个集“SOP 智能解析、AI 营养计算、前台瀑布流展示”于一体的全栈 Web 应用。
与 V1 版本相比，V2 彻底重构了 PDF 解析逻辑，移除了所有服务器端二进制依赖，确保极高的开发稳定性。

## 2. 技术栈 (Tech Stack)
- **Framework**: Next.js 15 (App Router)
  - *Constraint*: Strict Async Params Mode (`await params`)
- **UI**: Shadcn UI + Tailwind CSS
- **Database**: Neon (Serverless Postgres)
- **ORM**: Drizzle ORM
- **AI**: SiliconFlow API (DeepSeek-V3) + Vercel AI SDK
- **PDF Processing**: **Client-side Only** (PDF.js via CDN)
  - *Note*: No server-side `canvas` or `pdf-parse`.

## 3. 功能模块

### 3.1 数据库架构 (Schema)
* **Products 表**:
    * `id`: UUID
    * `name`: 产品名称
    * `slug`: URL 标识符 (唯一)
    * `image_url`: 产品图片 URL (用于瀑布流封面)
    * `description`: AI 生成的一句话简介
    * `sop_content`: 原始 SOP 文本
    * `status`: 'draft' | 'published'
* **Nutrition 表**:
    * `product_id`: 关联 ID
    * `calories`, `carbs`, `fat`, `protein`: 核心数值
    * `ingredients`: JSON 格式原料表

### 3.2 后台管理 (`/admin`)
* **客户端 PDF 解析**: 浏览器直接读取 PDF 提取文本，规避服务器环境问题。
* **智能填单**: 文本/PDF -> AI 分析 -> 自动填充表单。
* **数据入库**: 管理员人工复核后存入 Neon 数据库。

### 3.3 前台展示 (`/`)
* **首页**: 响应式瀑布流布局 (Masonry Layout)，展示产品卡片。
* **详情页**: 展示详细营养表 + AI 悬浮对话助手。

## 4. 开发规范 (Rules)
1. **Client Components**: 凡涉及 `useState`, `onClick` 或浏览器 API (如 `window`, `FileReader`) 的组件，必须在顶部标注 `"use client"`。
2. **Next.js 15 Params**: 页面组件中获取 `params` 必须使用 await，例如 `const { slug } = await params;`。
3. **No Native Modules**: 严禁安装 `canvas`, `sharp`, `node-gyp` 等原生依赖。

---
*Created by Baozhu Team & Cursor Agent*

请依次复制以下指令发送给 Cursor。每完成一个 Phase，建议手动在终端运行 git add . 和 git commit -m "完成 Phase X" 进行存档。

🛠️ Phase 1: 基础设施搭建 (UI & Layout)
@Codebase

我们正在构建 README.md 中描述的 V2 版本。

Task 1: 安装 Shadcn UI 请指导我运行 npx shadcn@latest init (使用默认配置, Slate风格)，并安装以下组件：button, input, textarea, card, dialog, label, badge, scroll-area。

Task 2: 全局布局

修改 app/globals.css 和 app/layout.tsx。

创建一个极简、现代的深色模式 (Dark Mode) 基础风格。

字体使用系统默认 sans-serif。

请一步步给出终端命令和代码修改。

🗄️ Phase 2: 数据库层 (核心资产移植)
(⚠️ 执行此步前，请确保你已经把旧项目的 .env.local 复制到了新项目根目录)

@Codebase

Task: 数据库配置

Dependencies: 请帮我安装 drizzle-orm, drizzle-kit, @neondatabase/serverless, dotenv。

Schema: 请在 db/schema.ts 中创建数据库结构。

参考 README.md 中的 Schema 定义。

重点：确保 products 表包含 image_url 和 description 字段。

Config: 创建根目录下的 drizzle.config.ts。

Client: 创建 lib/db.ts 用于导出数据库实例。

请生成代码，并告诉我如何运行 npx drizzle-kit push 来同步数据库。

🖥️ Phase 3: 后台与客户端 PDF (关键避坑点)
@Codebase

Task: 后台管理与 PDF 解析 (/admin)

核心约束: 必须使用 Client-side PDF Parsing (浏览器端解析)。严禁引入服务端 canvas 依赖。

Step 1: 依赖安装 请告诉我安装 pdfjs-dist (纯 JS 版) 和 react-dropzone。

Step 2: PDF 上传组件 创建 app/admin/_components/ClientPdfUploader.tsx:

必须标注 "use client"。

使用 pdfjs-dist 读取文件。

Critical: 配置 GlobalWorkerOptions.workerSrc 指向 //unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js (使用 CDN)。

提取文本后通过 onTextExtracted 回调返回。

Step 3: 后台页面逻辑 创建 app/admin/page.tsx:

包含：产品名称、Slug、图片 URL 输入框、ClientPdfUploader、SOP 文本框 (Textarea)。

当 Uploader 返回文本时，自动填充到 SOP 文本框。

请生成完整代码。

🧠 Phase 4: AI 分析与入库 (Server Actions)
@Codebase

Task: AI 智能分析

Step 1: Server Action 创建 app/actions/product.ts。

引入 ai SDK 和 openai provider (配置 baseurl 为 SiliconFlow)。

创建 analyzeProduct(sopText: string):

Prompt: "你是一个营养师。分析这段 SOP，提取：1.简短描述(description) 2.卡路里/碳水/脂肪/蛋白质 3.原料列表(json)。返回纯 JSON。"

创建 saveProduct(data): 使用 Drizzle 将数据写入数据库。

Step 2: 集成到后台

在 /admin 页面增加 "AI Analyze" 按钮。

点击后调用 analyzeProduct，将返回数据填入表单供管理员修改。

点击 "Save" 调用 saveProduct。

请生成代码。

🌊 Phase 5: 前台瀑布流与详情页 (Final)
@Codebase

Task: 前台展示系统

约束: Next.js 15 异步 Params 规则 (await params)。

Step 1: 首页瀑布流 (/)

创建 app/_components/ProductCard.tsx: 展示图片、标题、描述、卡路里 Badge。

在 app/page.tsx 中获取所有 published 状态的产品。

使用 Tailwind Columns (columns-2 md:columns-3 gap-4) 实现瀑布流布局。

Step 2: 详情页 (/product/[slug])

创建动态路由页面。

展示完整营养成分表、原料表。

集成 Vercel AI SDK 的 useChat，实现悬浮聊天窗口 (Floating Chat)，将当前产品数据注入 System Prompt。

请生成代码。