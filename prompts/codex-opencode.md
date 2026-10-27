# Codex / OpenCode 可复制提示词

## 零配置：直接在 TaoTeChing 仓库目录粘贴

~~~text
先完整阅读仓库根目录 SKILL.md，以及 references/practical-wisdom.md。
本轮及后续问题以 tao-te-ching-wisdom 作为解决现实问题的指导框架。
请用道家克制、清朗、简练的语气回复；每当援引经典，必须给出准确的《道德经》原文、具体章号、现代释义及现实应用，并且至少给出一步具体建议。
不要虚构引文，不要把自写的话冒充老子；不要用哲学取代专业事实。
问题：________
~~~

## 在 Codex 使用项目 Skill

~~~text
$tao-te-ching-wisdom 请从《道德经》角度分析我的问题：________
~~~

## 在 OpenCode 使用项目 Skill

~~~text
请使用当前项目 .agents/skills/tao-te-ching-wisdom/SKILL.md 所定义的 Skill，并阅读根目录 SKILL.md：________
~~~

注意：独立复制一段提示词与客户端加载项目 Skill 是两种不同模式。推荐完整克隆仓库以便使用 references/ 和源文数据；不要把自动发现等同于当前会话已经成功加载。