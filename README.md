# 道德经 · Tao Te Ching

**An immersive, open, source-aware reading experience for the 81 chapters of the Tao Te Ching.**

[![CI](https://github.com/1998x-stack/TaoTeChing/actions/workflows/ci.yml/badge.svg)](https://github.com/1998x-stack/TaoTeChing/actions/workflows/ci.yml)
[![Pages](https://github.com/1998x-stack/TaoTeChing/actions/workflows/pages.yml/badge.svg)](https://github.com/1998x-stack/TaoTeChing/actions/workflows/pages.yml)
[![License: MIT](https://img.shields.io/badge/code-MIT-c7ac78)](./LICENSE)

**[在线阅读 / Live site](https://1998x-stack.github.io/TaoTeChing/)** · **[专业文档 / Documentation](./docs/README.md)** · **[内容与版本说明](./docs/TEXTUAL-CRITICISM.md)**

> 道可道，非常道。名可名，非常名。
>
> 原文在左，译文在右。让古老的思想，重新成为可以被认真阅读的文本。

## Project at a glance

A static GitHub Pages publication built without a runtime server or third-party UI framework. It brings together all **81 chapters** of the received Tao Te Ching, a clearly labeled **editorial Chinese paraphrase** (白话意译), and an accessible, responsive experience inspired by Chinese ink landscapes and contemporary editorial motion.

### Highlights

- **81 chapters, one canonical dataset:** chapter number, title, thematic taxonomy, original Chinese, and modern Chinese interpretive paraphrase.
- **Parallel reading:** original text and paraphrase side by side on desktop, stacked on mobile; original-only and translation-only modes.
- **Navigation:** Dao Jing (chapters 1–37), De Jing (38–81), deep links using #chapter-N, prev/next and keyboard arrows.
- **Discovery:** full-text keyword search and thematic browsing across six editorial themes.
- **Personal reading:** saved chapters, last-read chapter, color theme and font size, stored locally in the browser.
- **Design:** responsive ink-landscape hero, parchment color palette, subtle motion and reduced-motion support.
- **Publishing:** dependency-free static frontend; GitHub Actions checks and GitHub Pages deploy workflow.

## Quick start

Requirements: a modern browser; Node.js 20+ for validation; Python 3 for the optional local server.

~~~bash
git clone https://github.com/1998x-stack/TaoTeChing.git
cd TaoTeChing
npm test
python3 -m http.server 4173
~~~

Visit http://localhost:4173 . Opening index.html directly using file:// is **not** supported because browser ES modules require an HTTP origin.

## Repository layout

~~~text
TaoTeChing/
├── index.html                 # Landing page, catalogue and reader semantics
├── styles.css                 # Design tokens, ink landscapes, responsive styles
├── app.js                     # Search, routing, state and reader interactions
├── data/chapters.js           # 81-chapter primary dataset
├── assets/                    # Favicon and open-graph cover (SVG)
├── docs/                      # Product, architecture, design, editorial and QA
├── SKILL.md                   # AI/agent-facing editorial workflow and constraints
├── references/               # Skill reference guides and verification checklist
├── scripts/validate.mjs       # Content and integration sanity checks
└── .github/workflows/         # CI and GitHub Pages deployment
~~~

## Engineering decisions

| Concern | Decision | Why |
| --- | --- | --- |
| Site architecture | HTML + CSS + native ES modules | Zero bundle, easy Pages deployment, inspectable source |
| Content | Versioned JS dataset | Deterministic, offline after site load, easy validation |
| Client state | Browser localStorage | No account, no collection of reading behavior |
| UI security | DOM textContent for corpus and user input | Avoid unsafe HTML injection |
| Hosting | GitHub Pages via Actions | Free static publication and reproducible deploy |
| Accessibility | Native controls, keyboard, reduced motion | Readability takes precedence over effects |

## Textual integrity

The received text is aligned **in chapter order** with a modern Chinese paraphrase. It is **not yet an authoritative critical edition or a clause-level translation**. The editorial base is the commonly received Wang Bi chapter sequence; simplified glyphs and modern punctuation are used for accessibility. Versions differ: Mawangdui silk manuscripts, Guodian bamboo slips and other witnesses do not share identical readings and ordering. Do not conflate them.

See [Textual Criticism](./docs/TEXTUAL-CRITICISM.md) for source links, known issues and future collation gates. Original text is public domain; the supplied paraphrases are newly written for this project and **should not be represented as historical translations**.

## Roadmap

**V1 · Foundation:** complete 81-chapter dataset; reader; search; bookmarks; responsive visual design; documentation; Pages automation.

**V1.1 · Philology:** chapter-by-chapter proofreading against fixed source revisions; variant apparatus; reviewer sign-off; exact original/translation span alignment.

**V1.2 · Exploration:** concept graph, semantic connections, citation-backed notes, offline reading, exports and optional traditional Chinese display.

Track milestones in [docs/ROADMAP.md](./docs/ROADMAP.md).

## Publishing

Push to main to run CI and Pages deployment. **First-time activation requires the repository administrator to select Settings → Pages → Build and deployment → Source: GitHub Actions.** Workflow presence alone does not prove the site is live. See [Deployment Runbook](./docs/DEPLOYMENT.md) for full instructions and troubleshooting.

## Contributing

Read [CONTRIBUTING.md](./CONTRIBUTING.md), [Design System](./docs/DESIGN-SYSTEM.md), and [Textual Criticism](./docs/TEXTUAL-CRITICISM.md) before editing chapters. All changes to classical text require a documented edition/source and careful human review.

## License and attribution

- Source code: [MIT](./LICENSE).
- Classical Tao Te Ching: public domain.
- Editorial paraphrases and interpretive content: see [CONTENT-LICENSE.md](./CONTENT-LICENSE.md); appropriate attribution is required.
- Reference transcription and critical context: [Chinese Wikisource — Wang Bi](https://zh.wikisource.org/wiki/道德經_(王弼本)) and the sources listed in the textual-criticism document.

---

**以古为镜，以静观心。**