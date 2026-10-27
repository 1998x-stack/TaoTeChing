# Architecture · 静态网站与逐句阅读

## 架构

无框架、无后端、原生 ES Modules。所有内容在构建时由源码确定，不调用大模型接口，也不需要用户账号。

~~~text
Browser
 ├─ index.html           结构语义 / 读者控件
 ├─ styles.css           深墨、宣纸、竖向逐句卡片、减少动态
 └─ app.js               目录检索、章节导航、单句揭晓、字体、书签
     ├─ data/chapters.js         CHAPTERS[81] / THEMES / byNumber
     └─ data/passages.js         PASSAGE_INDEX[81], PASSAGE_COUNT=506
         ├─ sentence-parts/01-27.js
         ├─ sentence-parts/28-54.js
         └─ sentence-parts/55-81.js

LocalStorage: theme / size / bookmarks / last (不保存译文展开状态)
location.hash: #chapter-N
Github main -> CI (npm test) -> Pages Actions -> dist -> GitHub Pages
~~~

## 内容层级

data/chapters.js 内 original 是权威于本仓库的**现有原文字符串**；translation 是早期编辑性的整章概览，网站现在不再用它生成逐句阅读区。三个 sentence-parts 文件包含逐句撰写的白话翻译。passages.js 按「。！？；」分割原文并构造每句一条的 {id,chapter,index,original,translation}。

**完整性约束：** 一章原文经过分割、再连接必须与原 original 逐字一致；分句数组和人工译文数组长度必须相等。任何不符都在模块装载 / npm test 时抛错，阻止部署。

## 页面状态

每次 renderChapter 都重新生成当前章的句卡。初始 translation.hidden=true，aria-expanded=false。点击独立按钮后才使该句译文可见；再次点击收起。切章或者刷新时不会保留已揭晓的内容。

“全部收起”按钮可以恢复本章所有译文隐藏，字号变化只更改 CSS variable，**不重建已展开的译文**。

## 搜索与路由

目录可按题名、原文、编辑意译和主题搜索。章节通过 hash 深链恢复。所有来自经文或搜索的内容通过 textContent 写入，不使用 innerHTML，减少注入风险。

## Pages 发布

.github/workflows/pages.yml 将 HTML、CSS、JS、SVG、data/*.js 与 data/sentence-parts/*.js 都复制到 dist。所有 ES Module import 使用相对路径，可在 /TaoTeChing/ 子路径托管。必须先在仓库 Settings / Pages 启用 GitHub Actions 来源，工作流成功不自动代表官网可访问。

## 不属于目前实现

详细词级注释、底本差异、专业校勘结论、可追溯多版本影印或经文语义图谱，均属后续阶段。