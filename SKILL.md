---
name: tao-te-ching
description: Source-aware Tao Te Ching research, 81-chapter editorial maintenance, aligned classical/modern Chinese reading, and the TaoTeChing GitHub Pages application.
version: 1.0.0
license: MIT
---

# Tao Te Ching · Source-aware Editorial & Product Skill

## Purpose

Use this Skill when asked to study, translate, annotate, compare, explain, visualize, or maintain the Tao Te Ching (道德经 / 老子), or to modify this repository's interactive reading site.

**Core promise:** every interpretation is close to its original text, every ancient-text variant has a witness, and every code change is independently checked.

## Activation triggers

- 「道德经第 N 章原文及翻译」「逐句对照」「解释无为/道/德/柔弱」「王弼与帛书差异」
- Generate educational notes, research citations, chapter comparison tables, conceptual graphs, or editorial corrections.
- Implement UI, navigation, data schema, accessibility, SEO, CI or GitHub Pages in 1998x-stack/TaoTeChing.
- Audit questionable quotations, author attributions, textual readings or AI-generated interpretations.

## Source hierarchy

1. **Original witness:** identify the actual edition, fixed revision, published facsimile or critical text.
2. **Received reading edition:** the project data/chapters.js, described accurately as a *simplified received reading text following Wang Bi chapter sequence*.
3. **Interpretive paraphrase:** the project translation fields, NOT a uniquely correct literal or academic translation.
4. **Modern reflection:** explicitly separate optional philosophical interpretation from classical wording.

Never silently blend readings from Wang Bi, Heshang Gong, Mawangdui and Guodian. Do not invent missing bamboo-slip passages or mislabel chapter nicknames as original headings.

## Required workflow

### A. Understand and scope

Determine chapter(s), target edition, desired output (original / literal / paraphrase / annotated / concept map), and whether the user asks for edits or analysis. For unspecified versions, default to the project's received reading edition and state the limitation.

### B. Retrieve the primary evidence

For content tasks, read data/chapters.js and [references/sources.md](references/sources.md). For ambiguous or historically consequential variant claims, consult externally verifiable texts and record URLs or printed bibliographic coordinates.

### C. Compose paired passages

Always place original and modern Chinese close together. For exact studies, use:

Original: [verbatim passage]  
Literal: [close translation]  
Interpretation: [clearly marked explanation]  
Variant note: [witness / uncertainty, only if checked]

V1 website has chapter-level original/translation pairs. When implementing passage-level alignment, stable IDs and reviewer metadata are mandatory; never fabricate positional alignment.

### D. Verify the meaning

Follow [references/translation-guide.md](references/translation-guide.md). Explain philosophical terms without forcing modern scientific or political meanings into ancient words. Present interpretive alternatives where the text admits them.

### E. Implement product changes if requested

Read [references/engineering.md](references/engineering.md) and docs/ARCHITECTURE.md. Preserve a static, portable, accessible frontend. Use relative asset URLs for the repository's GitHub Pages subpath.

### F. Quality gate

Run npm test and the manual checks in [references/verification.md](references/verification.md). A structural check does not establish historical text accuracy. Claim production deployment only after verifying the Pages workflow and publicly served URL.

## Outputs by task

| Request | Deliverable | Hard requirements |
| --- | --- | --- |
| Chapter explanation | Original / translation / interpretation | Original and translation adjacent |
| Translation edit | Exact chapter id, before/after, ambiguity, evidence | No unattributed modern copied translation |
| Manuscript comparison | Edition table, cited source, confidence | No inferred missing witnesses |
| Concept diagram | Nodes/edges with passage anchors | Interpretation distinct from quotation |
| Website feature | Source changes, tests, runbook updates | Accessible, responsive, site path safe |
| Documentation | docs/ records and linked references | Clearly mark implemented vs planned |

## Reference map

- [references/sources.md](references/sources.md): textual witness hierarchy, known variant problems.
- [references/translation-guide.md](references/translation-guide.md): vocabulary, literal/interpretive translation style, ambiguity.
- [references/chapter-map.md](references/chapter-map.md): 1–81 index and Dao/De division.
- [references/engineering.md](references/engineering.md): architecture, UI principles, GitHub Pages.
- [references/verification.md](references/verification.md): test and review criteria.

## Non-goals and constraints

Do not claim spiritual certainty, supernatural evidence, universally agreed authorship, or historical unicity of a single edition. Do not claim that generated paraphrases are vetted academic translations. Avoid modern copyrighted translations unless a lawful brief quotation is strictly necessary.

**Ready means:** source verified where claimed, interpretive boundaries clear, site tested, and deployment status reported accurately.