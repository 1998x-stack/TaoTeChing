# Architecture · 技术架构

## 总体

本项目为可由任何静态 HTTP 主机提供的单页阅读系统。无服务端运行逻辑、无数据库、无打包依赖。

~~~text
Browser
  ├─ index.html          页面语义骨架 / SEO / 阅读控件
  ├─ styles.css          Design tokens / CSS landscape / responsive
  └─ app.js              导航、过滤、展示、交互
       ├─ data/chapters.js   CHAPTERS[81] + THEMES + byNumber
       ├─ location.hash     可分享章节路由
       └─ localStorage      mode / theme / size / bookmarks / last
                       (浏览器本地，不发送远端)

GitHub main ─ CI (npm test) ─ Pages Actions ─ dist ─ GitHub Pages CDN
~~~

## 数据契约

CHAPTERS 每项包含 number (integer)、title (string)、theme (string)、original (string)、translation (string)。translation 是现代汉语意译，不冒充严格逐句翻译。数据文件通过原生 ES module 导出。

数据单一来源位于 data/chapters.js。不要在页面代码中复制和维护第二份章文。按 number 查询，按 theme 聚类，按词组检索 title / original / translation 等。

## 运行流程

1. 浏览器加载 index.html 和 styles.css。
2. app.js 导入 CHAPTERS 与 THEMES。
3. 初始化状态时检查哈希深链接，其次读取本地 last 状态。
4. 渲染章节卡片与当前章原译视图。
5. 搜索和主题筛选在本地处理 81 条数据；用户输入只影响 textContent 与 filter，不拼接 HTML。
6. 章节跳转更新 hash；视觉状态与书签以 localStorage 保存。

## 静态托管约束

- 使用相对路径 ./app.js / ./data/chapters.js，支持项目子路径 /TaoTeChing/。
- 本地必须通过 HTTP 服务访问，因为 file:// 会触发 ES module 跨源约束。
- GitHub Pages 工作流校验后，将指定文件复制到 dist；文档、工作流与脚本不公开到站点路径。
- .nojekyll 禁用 Jekyll 特殊处理。

## 安全与隐私

站点无输入回传、无服务端、无 Cookie。动态文本使用 textContent 而不是 innerHTML，外链使用 rel=noopener（需新窗口时）。本地保存的阅读偏好仅用于恢复用户体验，清理浏览器站点数据会清除。

## 扩展接口（计划）

后续若支持段级对齐，新增 per-chapter passages 数组，每项包含 passageId、original、translation、sourceRef、uncertainty。现有 original/translation 保留为向后兼容展示视图。