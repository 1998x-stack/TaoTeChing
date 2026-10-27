# 道德经 · Tao Te Ching

> **道可道，非常道。** ——《道德经》第一章

以东方审美设计的《道德经》数字阅读站，同时提供可直接供 **Codex / OpenCode** 使用的「以道观事」AI Skill：引用真实经文，帮助思考现实问题，给出有分寸的建议。

[**在线阅读**](https://1998x-stack.github.io/TaoTeChing/) · [**AI Skill**](./SKILL.md) · [**专业文档**](./docs/README.md) · [**GitHub Actions**](https://github.com/1998x-stack/TaoTeChing/actions)

## 主要功能

| 模块 | 功能与实现 |
| --- | --- |
| 经典阅读 | **81章、506个逐句对照单元**。古文在上、译文在下；单句点击后才揭晓，切章自动恢复遮挡 |
| 内容发现 | 章目导航、全文检索、六类主题、支持链接直达特定章节 |
| 阅读体验 | 墨色 / 宣纸主题、可调字号、书签和上次阅读位置、移动端适配及减少动效 |
| 以道解题 | [SKILL.md](./SKILL.md) 与 [references/](./references/)：洞察现实矛盾、引用原文与章号、通俗解释并提出行动 |
| 工程能力 | 原生 ES Modules、无后端与运行时依赖、内容结构校验、GitHub Actions CI 与 Pages |

网站中的译文为项目编写的**白话意译**，并非已完成学术校勘的权威译本。古文采用通行八十一章次序、简体及现代标点；详见[版本与校勘](./docs/TEXTUAL-CRITICISM.md)。

## 一、让 Codex / OpenCode 直接使用本 Skill

### 方式 A：在 Codex / OpenCode 对话中直接粘贴（最快）

以下内容适合在**已克隆此仓库的目录**中使用；无需先安装其他工具：

~~~text
请阅读当前仓库根目录 SKILL.md，并按需阅读 references/practical-wisdom.md、references/translation-guide.md、data/chapters.js。
从现在起，把 tao-te-ching-wisdom 作为回答问题的指导 Skill：
1. 先分析我真实的问题、约束与进退得失，不要机械套格言。
2. 使用《道德经》恰切的思想解决现实问题，以古朴、清朗、克制而易懂的道家语气作答。
3. 必须引用可核对的《道德经》原文，并明确章号；紧随白话释义，说明它为何适用于当前处境。
4. 至少给出一项可执行、可验证的下一步；同时指出经义的适用边界。
5. 不得编造古文，不得把自创的仿古语句标为老子原文；不得用哲学替代医学、法律、财务等专业事实。
我的问题是：________
~~~

### 方式 B：自动发现 Skill（推荐长期使用）

本仓库内置 [`.agents/skills/tao-te-ching-wisdom/SKILL.md`](./.agents/skills/tao-te-ching-wisdom/SKILL.md)，同时兼容 Codex 和 OpenCode 的项目级 Skill 扫描。进入仓库启动任一客户端即可按任务自动匹配，亦可显式调用。

~~~bash
git clone https://github.com/1998x-stack/TaoTeChing.git
cd TaoTeChing

# 在此目录中启动 Codex 或 OpenCode
codex
# 或
opencode
~~~

**在 Codex 输入**（支持显式引用 Skill）：

~~~text
$tao-te-ching-wisdom
请从《道德经》的角度分析：遇到职业发展与个人自由之间的取舍，我该如何衡量？请引用真实原文与章号，并给具体建议。
~~~

**在 OpenCode 输入**（明确提示加载项目 Skill）：

~~~text
请使用当前项目的 tao-te-ching-wisdom Skill（若未自动加载，请读取 .agents/skills/tao-te-ching-wisdom/SKILL.md），以《道德经》风格分析我的问题，引用准确经文与章节，解释并提出可行行动：我在重要项目上过度控制细节，如何调整？
~~~

### 方式 C：作为全局 Skill 跨仓库使用

~~~bash
git clone https://github.com/1998x-stack/TaoTeChing.git "$HOME/tao-te-ching-skill"
mkdir -p "$HOME/.agents/skills"
ln -s "$HOME/tao-te-ching-skill/.agents/skills/tao-te-ching-wisdom" \
  "$HOME/.agents/skills/tao-te-ching-wisdom"
~~~

已存在同名目录时，请先检查，不要直接覆盖。全局路径是 Codex 与 OpenCode 共同支持的 Skill 发现目录。使用新 Skill 若未立即生效，可重启客户端。

[Codex Skills 官方说明](https://learn.chatgpt.com/docs/build-skills) · [OpenCode Skills 官方说明](https://docs.opencode.ai/docs/skills/)

## 二、本地开发与测试

~~~bash
git clone https://github.com/1998x-stack/TaoTeChing.git
cd TaoTeChing
npm test
npm run serve
# 打开 http://localhost:4173
~~~

需要 Node.js 20+ 和 Python 3（仅本地静态服务）。由于原生 ES Modules 的浏览器安全限制，请通过 HTTP 服务打开，不要直接使用 `file://`。

| 目录 | 职责 |
| --- | --- |
| `data/chapters.js`、`data/passages.js`、`data/sentence-parts/` | 原文与506条句级意译、无损重组与索引 |
| `index.html`、`app.js`、`styles.css` | 静态 UI、逐句点击、交互与动效 |
| `SKILL.md`、`references/`、`.agents/skills/` | AI 行为规范、证据与客户端发现入口 |
| `docs/`、`scripts/`、`.github/workflows/` | 设计/内容规范、验证、CI 和 Pages |

## 三、质量、溯源与边界

- **自动校验：** 81章编号、506个句对、回拼原文不丢字、关键 DOM 交互约束；`npm test`。
- **人文校勘：** 需逐字复核通行王弼阅读本及异文；自动测试不证明翻译唯一正确。
- **Skill 的目标：** 用经典**启发非暴力的现实决策**，而不是把古书当作现代事实依据。
- **数据保护：** 书签与字号只保留在当前浏览器，本项目无登录和阅读行为上传。

[内容与版本](./docs/TEXTUAL-CRITICISM.md) · [逐句交互](./docs/SENTENCE-READER.md) · [设计系统](./docs/DESIGN-SYSTEM.md) · [发布说明](./docs/DEPLOYMENT.md) · [贡献指南](./CONTRIBUTING.md)

代码采用 [MIT](./LICENSE)；古代经文为公有领域，现代编辑性译文与注释见[内容授权说明](./CONTENT-LICENSE.md)。

---

**知人者智，自知者明。** ——《道德经》第三十三章