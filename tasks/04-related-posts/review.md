# Task Review: Universal Related Posts Section (T4)

**Status:** DONE
**Reviewer:** Gemini CLI (Reviewer)
**Author/Implementer:** Gemini CLI (Implementer)
**SOW Reference:** SOW Section 2.4 (Templates & Displays) & ROADMAP.md Phase 4
**Figma Reference:** [Figma Node 4592:1893 - Related Posts Section](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4592-1893&m=dev)

---

## 1. Review Summary
I have reviewed the code implementation, responsive layout, queries, and compiled assets for the **Universal Related Posts Section (T4)**. The implementation satisfies all functional, architectural, and accessibility requirements:
- Created universal partial `templates/partials/related-posts.php`, allowing any single post template (`News`, `Resources`, `Events`, `Newsletters`) to render related content seamlessly.
- Created reusable card display mode template `templates/displays/post--related.php`, fully integrated with `mmd_render_content_by_display($id, 'related')` and supporting post-type-specific variant overrides.
- Registered `card--related` and `related-card` responsive image styles in `functions.php` mapped to the `16:9` ratio crop with proper `sizes` constraints.
- Integrated the partial into `templates/displays/single--news.php`.
- Implemented a resilient two-stage `WP_Query` strategy that prioritizes taxonomy relevance (matching `tech_tag` or post-type categories) with automatic fallback to recent posts, excludes the current post, and guarantees a zero-result guard.
- Independently re-verified all claims on DDEV:
  - News single page (`/news/news-1/`) outputs "Related News" with exactly 3 related cards excluding current post ID 87.
  - Multi-post-type execution confirmed: Resource posts output "Related Resources", Event posts output "Related Events", Newsletter posts output "Related Newsletters".
  - Zero-result guard confirmed: Omit entire section without markup leak when no posts exist.
  - PHP execution under `error_reporting(E_ALL)`: 0 notices, 0 warnings.
  - `debug.log`: Clean.
  - Definition of Done standards greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` class attributes, 0 `.wp-block-heading` selectors.

---

## 2. Verdict & Checklists
**Verdict:** APPROVED (PASS)

- [x] **Universal Reusability**: Partial works across News, Resources, Events, and Newsletters.
- [x] **Intelligent Query**: Excludes current post, matches shared taxonomy terms, backfills to limit, and omits cleanly when empty.
- [x] **Responsive Image Styles (RIS)**: Card images rendered via `mmd_render_image_by_ris` with 16:9 crop candidates and zero CLS.
- [x] **Design & Responsiveness**: 3-column desktop layout (`>= 992px`), 2-column tablet, 1-column mobile; hover zoom and elevation transitions.
- [x] **Accessibility (WCAG 2.2 AA)**: Section heading `<h2>`, card headings `<h3>`, accessible full-card overlay link (`aria-label="Read {Title}"`), and visible `:focus-visible` focus rings.
- [x] **Code Quality**: Zero hardcoded hex colors, zero arbitrary `rem`/`var` classes, zero `.wp-block-heading` selectors, and clean logs.

---

## 3. Draft Commit Message
```text
feat(single): implement universal related posts section and card display template

- Build templates/partials/related-posts.php with intelligent taxonomy/fallback WP_Query
- Implement templates/displays/post--related.php card display template
- Register card--related and related-card RIS styles with 16:9 aspect ratio
- Integrate related posts partial into templates/displays/single--news.php
- Style 3-column responsive grid and hover elevation in related-articles.css
- Support dynamic headings across News, Resources, Events, and Newsletters
```
