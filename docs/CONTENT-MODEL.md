# Content Model · 81章与506句的可校验模型

## 第一层：章节

data/chapters.js 导出 CHAPTERS、THEMES、byNumber。每章含 number、title、theme、original、translation。

- number：1—81，唯一、连续。
- title / theme：现代编辑导航信息，不是古文原始章题或唯一学术分类。
- original：当前简体、现代标点通行阅读文本，尚未完全逐字校勘。
- translation：旧的整章意译，用于概览和旧兼容，不作为句级翻译来源。

## 第二层：手写逐句译文

data/sentence-parts/01-27.js、28-54.js、55-81.js 各导出 PART_A/B/C，结构是 {章节号: [译句1,译句2,...]}。

**人工分别撰写**506句白话译文，与原文分句顺序一一对应，不允许把整章概览机械切成若干份。句子边界由编辑标点「。！？；」确定，长句可以包含多个逗号分句。

data/passages.js 将它们与原文相配，输出：

~~~js
{
 id: "08-01",
 chapter: 8,
 index: 1,
 original: "上善若水。",
 translation: "最高的善如同水。"
}
~~~

id = 两位数章号 + 两位数句序。当前全部分句数为506。后续若改变古文标点，需要明确迁移 ID、链接及测试；不要静默改变阅读单元。

## 发布前自动检查

npm test 应验证81章连续、506句总数、每句有真实译文、章节重拼接与 original 完全一致、正确章节范围、基本 UI 渲染绑定，以及译文初始隐藏。

**自动化验证不了语言学质量**。修订需要人审，参照 docs/TEXTUAL-CRITICISM.md 和 docs/TRANSLATION-PRINCIPLES.md。

## 未来扩展

按句引入 edition、sourceRevision、literalTranslation、annotation、variantIds、reviewStatus、relations 等。句级意译不等于精确逐字训诂，尤其存在不同出土版本时，必须留有异文和审校空间。