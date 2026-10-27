# 逐句阅读室 · Progressive Disclosure Design

## 目标行为

《道德经》不是左右两个长文本栏：每条古文必须在同一纵向阅读流中，位于对应译文之上。读者先读原典，若有疑惑，点击该句下的“轻触见译 ＋”，仅此条揭示白话。再次点击“收起此句译文 −”则隐藏。无论设备宽度，始终上下结构。

## 结构示例

第一句：**上善若水。**

按键：轻触见译 ＋

（点击后展开）**最高的善如同水。**

第二句：**水善利万物而不争，处众人之所恶，故几于道。**

按键：轻触见译 ＋

第二句默认仍隐藏，直到点击它自己的按钮。

## 数据结构

- data/chapters.js：原始章节文字（保留）。
- data/sentence-parts/01-27.js、28-54.js、55-81.js：人工撰写对应的506个译句。
- data/passages.js：按「。！？；」编排句界，ID形如08-01；回拼原文必须无损。
- 当前是一种**编辑性句界**，不是所有古注或出土文本认可的唯一分句方案。
- 部分古代长句内部仍含多个逗号分句；目前严格做到每个编辑性句子对应一条译文。

## 可访问的状态机

~~~text
CHAPTER_ENTER -> all sentences CLOSED
CLOSED -- click own button --> OPEN
OPEN -- click own button --> CLOSED
COLLAPSE_ALL -> all sentences CLOSED
CHAPTER_SWITCH -> rebuild cards, all CLOSED
FONT_CHANGE -> change variable only, keep OPEN states
~~~

- 控件类型：原生 button，aria-expanded=false/true，aria-controls 指向独立译文节点。
- 译文节点默认使用 hidden=true，从布局、视觉和辅助技术的可访问树中隐藏。
- 禁止使用单纯 blur、透明度、遮罩来假装隐藏。
- “全部收起”只影响当前章的译文，不会更改书签与阅读位置。
- 使用 textContent 避免内容注入。

## 验收与校勘

自动测试：81章、506句、源文字节恢复一致、ID连续、人工译文数量一致、UI关键绑定存在。

人工测试：选择1/8/11/38/64/81章，在桌面、手机和键盘上分别完成点开某句、收起某句、切换章节后重置。审校原文和白话解释质量需独立进行，结构校验不意味着权威定本或完全精确的语义翻译。

## 暂未实现

独立的词语悬浮注释、多底本字句差异、细粒度词义歧义版本列表、句级语音朗读。