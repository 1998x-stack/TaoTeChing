# Contributing

Thanks for helping make the Tao Te Ching more accessible. The first priority is textual fidelity; visual embellishment should never obscure reading.

## Before contributing

1. Read [docs/README.md](docs/README.md), [docs/CONTENT-MODEL.md](docs/CONTENT-MODEL.md) and [docs/TEXTUAL-CRITICISM.md](docs/TEXTUAL-CRITICISM.md).
2. For source-text edits, identify the chapter, exact witness/edition, reference URL, and intended editorial treatment of punctuation or simplified characters.
3. Never silently merge readings from Wang Bi, Heshang Gong, Mawangdui or Guodian.
4. For translations, distinguish literal meanings from interpretation; ambiguous lines should have documented alternatives, not confident invented explanations.
5. For code, avoid bundlers and new dependencies unless a measurable requirement justifies them.

## Change checklist

- Run npm test using Node.js 20+.
- Verify mobile width ~375px and desktop width ~1440px.
- Confirm original / translation modes, search, filters, chapter hash deep-link and prev/next.
- Verify keyboard and reduced-motion behavior.
- Do not commit user data, external API keys, or tracking scripts.
- Summarize editorial changes and cite sources in the pull request.

## Review

Changes to classical text require human proofreading. Automated tests check structure only; passing tests does not establish philological accuracy.