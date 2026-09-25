# Task Review: Single Newsletter Page Template (T4)

**Status:** DONE  
**Reviewer:** Gemini CLI (Reviewer)  
**Author/Implementer:** Gemini CLI (Implementer)  
**SOW Reference:** PROJECT-SPEC.md §4.4 (Newsletter Field Group), SOW §3.3 / ROADMAP.md Phase 4 Task T4  

---

## 1. Review Summary

I have reviewed the code implementation, responsive layout, dynamic field rendering, and compiled assets for the **Single Newsletter Page Template (T4)**. The implementation satisfies all functional, architectural, and accessibility requirements:

- **Template Routing & Single Page Resolution**:
  - Implemented `templates/displays/single--newsletter.php`, which seamlessly resolves single `newsletter` post type items through WordPress `single.php`.
- **Comprehensive ACF Field Display**:
  - `newsletter_category-term`: Accurately queries and displays the primary category term as a pill badge in the hero banner and in the sidebar quick info card, linking to the category archive.
  - `send_date`: Formatted cleanly as "Dispatched on [F j, Y]" using WordPress `date_i18n()` and semantic `<time datetime="...">` with calendar icon, falling back to post publication date when unpopulated.
  - `pdf_download`: Dynamically resolves attachment URL, mime type, and file size via `size_format()`. Renders prominent primary hero CTA button **"Download Issue (PDF · {size})"** with `download` attribute and screen-reader notice `<span class="sr-only"> (opens download in a new tab)</span>`. Omitted gracefully when no PDF is attached.
  - `_thumbnail_id`: Rendered via `mmd_render_image_by_ris($thumbnail_id, 'news-featured', ...)` with 16:9 aspect ratio and rounded corners.
- **Visual & Layout Alignment**:
  - Two-column responsive content grid (`.mmd-content-grid`) on desktop (8-col main + 4-col sticky sidebar) collapsing gracefully to single-column on mobile.
  - Sidebar contains a Newsletter Quick Info card (`.mmd-newsletter-meta-card`) with metadata summary and secondary download button, Table of Contents partial (`aside-toc.php`), and Social Share buttons (`aside-share.php`).
  - Universal related posts partial `templates/partials/related-posts.php` automatically queries and outputs "Related Newsletters" in a 3-column card grid.
- **Related Cards Enhancement**:
  - Updated `templates/displays/post--related.php` to support ACF `newsletter_category-term` and `send_date` formatting for newsletter cards in related grids.
- **Independent DDEV Re-Verification**:
  - Tested Post 110 (Issue #13 with PDF): Confirmed "Product Deep Dive" badge, "September 24, 2026" dispatch date, "Download Issue (PDF · 6 MB)" button, RIS cover image, sidebar info card, and Related Newsletters grid.
  - Tested Post 107 (Issue #12 with PDF): Confirmed "Community Digest" badge, "September 5, 2026" dispatch date, PDF download link, and Related Newsletters grid.
  - Tested fallback handling with temporary post: Confirmed hero and sidebar omit download buttons cleanly when no PDF is attached.
  - Verified HTTP responses: Both single page URLs and both PDF downloads return `HTTP/1.1 200 OK`.
  - Semantic landmark and heading checks: Exactly 1 `<h1>` per page, zero skipped levels, balanced semantic tags.
  - Clean error logs: `wp-content/debug.log` clean, web container logs clean (0 PHP notices/warnings).
  - DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.

---

## 2. Verdict & Checklists
**Verdict:** APPROVED (PASS)

- [x] **Template Resolution**: Single `newsletter` items properly route to `templates/displays/single--newsletter.php`.
- [x] **ACF Data Integrity**: Complete handling for `newsletter_category-term`, `send_date`, and `pdf_download`.
- [x] **Responsive Image Styles (RIS)**: Cover images rendered via `mmd_render_image_by_ris` with 16:9 aspect-video and zero CLS.
- [x] **Layout & Responsiveness**: 2-column desktop layout with sticky sidebar (`top-28`); clean single-column stacking on tablet and mobile.
- [x] **Accessibility (WCAG 2.2 AA)**: Semantic structure (`<article>`, `<nav>`, `<aside>`, `<time>`), accessible names, download notices (`sr-only`), visible focus rings (`:focus-visible`), and high contrast ratios.
- [x] **Code Quality**: Zero hardcoded hex colors, zero arbitrary `rem`/`var` class attributes, zero `.wp-block-heading` selectors, and clean logs.

---

## 3. Commit Execution

**Target Files:**
- `tasks/06-single-newsletter-page/requirements.md`
- `tasks/06-single-newsletter-page/results.md`
- `tasks/06-single-newsletter-page/review.md`
- `wp-content/themes/qp-newsletter/templates/displays/single--newsletter.php`
- `wp-content/themes/qp-newsletter/templates/displays/post--related.php`

**Commit Message:**
```text
feat(newsletter): implement single newsletter page template with dynamic ACF displays

- Route single newsletter posts through templates/displays/single--newsletter.php
- Render hero with newsletter category badge, dispatch date, and PDF download CTA
- Display responsive cover image via mmd_render_image_by_ris with 16:9 aspect ratio
- Implement sticky sidebar with issue quick info card, TOC, and social share partials
- Integrate universal related posts partial for related newsletters
- Support send_date and newsletter_category-term in post--related.php
- Document task requirements, results, and review under tasks/06-single-newsletter-page/
```
