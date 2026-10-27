# Content Model · 结构与内容契约

## 当前 V1 数据

位置：data/chapters.js。使用 JavaScript 原生 module，包含三个出口：CHAPTERS、THEMES、byNumber。

~~~js
{
  number: 8,
  title: "上善若水",
  theme: "柔弱与不争",
  original: "上善若水。……",
  translation: "最高的善如水。……"
}
~~~

字段说明：
- **number**: 1–81 的整数，唯一且连续，属于通行 81 章导航编号。
- **title**: 编辑性章题，并非古代原本固定题名；UI 要明确其导航作用。
- **theme**: 编辑分类，仅一个主主题，不是古籍固有分类。
- **original**: 通行阅读文本，不是附带详尽异文的校勘文本。
- **translation**: 新编白话意译，属于辅助理解的现代概括，不是其他译者作品。

## 六个主题

- 道与自然
- 辩证与转化
- 无为与治理
- 柔弱与不争
- 修身与知足
- 德与仁义

分类是用于导航的编辑标签，不应作为学术主张。新主题必须更新全部相关说明、测试和 README。

## 未来内容模型

~~~json
{
  "chapter": 8,
  "edition": "wangbi-received-readers-edition",
  "editorialStatus": "reviewed",
  "passages": [
    {
      "id": "08-01",
      "original": "上善若水。",
      "literalTranslation": "最高的善如同水。",
      "interpretation": "……",
      "source": "wikisource-wangbi-fixed-revision",
      "variantIds": [],
      "confidence": "reviewed"
    }
  ],
  "relations": [{"concept": "water", "type": "exemplifies"}]
}
~~~

这是未来示例，不是当前已实现字段。为后续句级对照保留 passageId 和 sourceRef 是为了避免散文意译掩盖原意。

## 数据完整性约束

1. 章号完整且不重复，1–37/38–81 两部分严格对应。
2. 原文与译文字段不能为空，所有章节可由首页和直接 hash 链接访问。
3. 修改原典前必须标注版本与来源；异文单独保存，不覆盖现有底本。
4. 新增解释应具备状态标志：draft / reviewed / contested / needs-source。
5. 所有自动生成的解释必须由人审校，禁止未核对而标记为权威。

## 当前技术限制

目前一章是一个原文单元和一个意译单元；不是逐句锚点对齐，不支持逐字搜索规范化、繁简异体聚合、影像校勘或版本差异高亮。