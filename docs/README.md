# Documentation · 项目知识库

本目录既是项目的工程设计文档，也是古籍内容维护的编辑规范。目标是使内容、设计、实现与部署可追溯、可验证、可持续维护。

## 导航

| 文档 | 解决的问题 | 读者 |
| --- | --- | --- |
| [PRODUCT-VISION.md](PRODUCT-VISION.md) | 产品定位、用户旅程、边界、成功标准 | 产品、设计 |
| [ARCHITECTURE.md](ARCHITECTURE.md) | 数据流、目录、状态、静态架构与安全 | 开发者 |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | 宣纸与墨色、排版、动效、响应式组件 | 设计、前端 |
| [CONTENT-MODEL.md](CONTENT-MODEL.md) | 81章数据契约、主题模型、版本扩展 | 编辑、开发 |
| [TEXTUAL-CRITICISM.md](TEXTUAL-CRITICISM.md) | 底本说明、异文、来源及校勘规则 | 校对、研究 |
| [TRANSLATION-PRINCIPLES.md](TRANSLATION-PRINCIPLES.md) | 原译对照、意译原则、含混词与禁忌 | 译者、编辑 |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Pages 设置、构建、故障处理、回滚 | 运维 |
| [ACCESSIBILITY.md](ACCESSIBILITY.md) | 语义、键盘、对比度、动效无障碍 | 设计、开发 |
| [QA-PLAN.md](QA-PLAN.md) | 内容、功能、性能和验收测试矩阵 | 测试 |
| [ROADMAP.md](ROADMAP.md) | V1→V2 分阶段里程碑及完成定义 | 全体 |
| [SENTENCE-READER.md](SENTENCE-READER.md) | 506句对齐、逐句揭晓状态机、键盘和验收 | 产品、前端、编辑 |
| [PHILOSOPHY-ATLAS.md](PHILOSOPHY-ATLAS.md) | 概念关系与可视化研究方向 | 内容、研究 |

## 贯穿全项目的四条原则

1. **文本优先：** 动效只服务于阅读，不凌驾于阅读之上。
2. **底本清晰：** 明确「参考王弼章序的通行简体阅读本」与「严格王弼校勘本」的区别。
3. **原译逐句：** 当前共有506条原文—译文对，桌面和手机均严格上下排列；用户点击该句后才看到对应的现代意译。
4. **可验证交付：** 文档中的功能与上线状态必须与代码、CI 和 GitHub Pages 实际状态一致。

## 工程检查入口

本地执行 npm test。所有静态发布内容来自根目录 index.html、styles.css、app.js、data/chapters.js、data/passages.js、data/sentence-parts/ 与 assets/。Pages 工作流从这些文件重新组装 dist，不发布研究草稿和管理文档。

## 编辑检查入口

参照 TEXTUAL-CRITICISM.md 对照原典，参照 TRANSLATION-PRINCIPLES.md 审校意译。自动校验只能证明章数、字段和结构正确，**不能证明古文逐字准确**。