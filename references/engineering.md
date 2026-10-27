# Engineering guide

## Invariants

- Native HTML/CSS/JS modules, no required npm dependencies.
- Data is imported only from data/chapters.js; never duplicate 81 chapter text in HTML.
- Do not use innerHTML for dynamic chapter or search content; set textContent.
- Keep root-relative URLs out of assets (use ./ paths) for Pages at /TaoTeChing/.
- Maintain chapter hash links #chapter-1 .. #chapter-81.
- Read/write preferences only in localStorage and gracefully handle blocked storage.
- CSS motion honors prefers-reduced-motion; interaction must not depend on animation.
- Avoid giant image assets; prefer authored SVG and CSS with reduced-motion support.
- No secrets, login, remote tracking or arbitrary user-supplied scripts.

## Visual direction

Ink green #101816, parchment #f4f0e6, warm gold #cbb27c, system Songti-style CJK serif. Use large editorial type and deliberate whitespace. Hero can be theatrical; reading mode must be quiet.

## Product state

Reader controls: original+interpretation, original only, paraphrase only; size; theme; bookmarks; previous and next chapter; source context. Navigation through chapter grid, Dao/De tabs, concepts and keyboard.

## Testing and publishing

1. npm test (Node 20+).
2. Serve with python3 -m http.server 4173.
3. Verify chapter direct links, search and mobile view.
4. Check workflow .github/workflows/pages.yml success.
5. Verify public Pages endpoint, not just the workflow presence.

Authoritative details: docs/ARCHITECTURE.md, docs/DESIGN-SYSTEM.md, docs/DEPLOYMENT.md and docs/QA-PLAN.md.