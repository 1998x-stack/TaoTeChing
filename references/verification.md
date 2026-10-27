# Verification checklist

## Classical text

- [ ] Correct chapter number and Dao/De part
- [ ] Original prose compared with named witness/revision
- [ ] Punctuation and simplified conversion explicitly editorial
- [ ] No silent blend of received, silk, or bamboo texts
- [ ] No fabricated passages, variant strings or edition attributions
- [ ] Modern paraphrase accurately marked as interpretive
- [ ] Ambiguous lines are discussed rather than falsely resolved
- [ ] Necessary quotations and notes are supported by citations

## Application

- [ ] npm test passes
- [ ] All 81 chapter cards render
- [ ] Search works in title, original and translation
- [ ] Theme filter and no-results case function
- [ ] #chapter-1 / #chapter-38 / #chapter-81 work on refresh
- [ ] Prev/next boundaries disable safely
- [ ] Original, translation and parallel display are correct
- [ ] Bookmark, size and light/dark state persist in this browser
- [ ] No horizontal overflow on mobile
- [ ] Reduced-motion preference honored
- [ ] Keyboard and screen reader smoke test complete
- [ ] Public Pages endpoint reachable, assets load

## Truthfulness of status

Code committed ≠ CI passing. CI passing ≠ Pages enabled. Pages deployment recorded ≠ verified user-facing site. Report each stage separately. If an item is unchecked, describe it as pending rather than completed.