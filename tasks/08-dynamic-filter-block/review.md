# Task Review: Dynamic Filter Block (T8)

**Status:** DONE  
**Reviewer:** Gemini CLI (Reviewer)  
**Author/Implementer:** Gemini CLI (Implementer)  
**SOW Reference:** SOW §2.4 (Templates & Displays), ROADMAP.md Phase 3 Task O4 (Content Grid & Unified Tag Filtering Section), and PROJECT-SPEC.md §3 & §5  
**Figma References:**  
- **Desktop Filter Block:** [Figma Node 4597:1676 - Dynamic Filter Section](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4597-1676&m=dev)  
- **Mobile Filter Overview:** [Figma Node 1404:8939 - Mobile Dynamic Filter View](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=1404-8939&m=dev)  
- **Mobile Filter Drawer:** [Figma Node 1413:8971 - Mobile Filter Flyout Drawer](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=1413-8971&m=dev)  

---

## 1. Review Summary

I have reviewed the code implementation, FacetWP configuration, Gutenberg Server-Side Render (SSR) block, frontend styles, interactive JavaScript controller, and responsive mobile behavior for the **Dynamic Filter Block (T8)**.

### Architectural & Functional Verification:
- **FacetWP Configuration (`includes/facetwp.php`)**:
  - Automatically included via `includes/index.php`.
  - Enabled built-in accessibility through `add_filter('facetwp_load_a11y', '__return_true')`.
  - Code-registered 10 platform facets via `facetwp_facets`: keyword search (`search`), cross-cutting tags (`tax_tech_tag`), CPT category facets (`tax_news_category`, `tax_resource_category`, `tax_event_category`, `tax_newsletter_category`), content type selector (`content_type`), sort options (`results_sort`), pagination (`results_pager`), and count display (`results_count`).
  - Added required PHP 8 `$pager_defaults` to eliminate undefined array key warnings.
  - Suppressed raw `.facetwp-counter` count badges.
  - Enhanced active selection pills with `role="button"`, `tabindex="0"`, and keyboard handlers (`facetwp_scripts`).
  - Suppressed default PNG background close icon to prevent duplicate `× ×` markers.
- **Custom SSR Gutenberg Block (`gutenberg/blocks/dynamic-filter/`)**:
  - Registered under category `mmd-grid-blocks` with schema attributes for querying and display.
  - Editor preview rendered via `@wordpress/server-side-render` with placeholder fallbacks and Preview component support.
  - Rich Inspector controls for post type filtering, posts per page slider, column selector (2 or 3 columns), and interface toggles.
  - Server-side template `render.php` wraps the loop inside `<div class="facetwp-template">` for AJAX updates.
  - Defaults to a balanced 2-column grid (`grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8`) next to the sidebar, giving cards ~400px width for optimal breathing room.
  - Reuses `post--related.php` card display mode via `mmd_render_content_by_display($id, 'related')`.
  - Includes a fallback empty state card with a "Reset All Filters" CTA when zero posts match.
- **Card Display Enhancements (`templates/displays/post--related.php`)**:
  - Omitted `<figure class="mmd-card__image">` when `$thumbnail_id` is empty, avoiding grey placeholder boxes on text-only posts.
  - Scaled down category/tech badge to compact `text-[11px] font-semibold uppercase tracking-normal px-2 py-0.5 whitespace-nowrap`.
  - Added `shrink-0 whitespace-nowrap` to reading time indicator (`3m read`) to prevent awkward line breaks.
  - Adjusted card body padding to `p-5 sm:p-6`.
- **Responsive Mobile Layout & Flyout Drawer**:
  - Structured mobile controls row with "Filters" trigger button on the left and styled Sort dropdown on the right (`justify-between`), with results count placed cleanly on a dedicated mobile row.
  - Implemented `DynamicFilter` JavaScript controller in `assets/js/main.js` with event delegation for accordion toggles, backdrop overlay, focus trap, Escape key listener, and body scroll lock (`overflow: hidden`).
- **Independent DDEV Re-Verification**:
  - Tested `/news/` with block inserted: verified 2-column layout, sticky sidebar, and live filtering.
  - Tested faceted queries:
    - `?_tax_tech_tag=laravel` correctly filtered to 2 news posts.
    - `?_tax_news_category=community-updates` correctly filtered to 1 news post.
    - `?_tax_tech_tag=docker` displayed empty state fallback with reset CTA.
  - Tested post without thumbnail (Post ID 119): confirmed figure is cleanly omitted.
  - Verified error logs: zero notices, warnings, or errors in `wp-content/debug.log` and web container logs.
  - DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.

---

## 2. Verdict & Checklists
**Verdict:** APPROVED (PASS)

- [x] **FacetWP Integration**: 10 facets code-registered, indexed, and accessible.
- [x] **Card Reuse**: Reuses `templates/displays/post--related.php` with thumbnail fallback and badge polish.
- [x] **Layout & Responsiveness**: 2-column grid with generous card breathing room; mobile drawer with scroll lock, backdrop, and focus trap.
- [x] **Accessibility (WCAG 2.2 AA)**: Semantic outline (`H2 -> H3`), `role="dialog"` on drawer, ARIA expanded/controls on toggles and triggers, keyboard accessibility on active selection pills.
- [x] **Code Quality**: Zero hardcoded hex colors, zero arbitrary `rem`/`var` class attributes, zero `.wp-block-heading` selectors, clean error logs.

---

## 3. Commit Execution

**Target Files:**
- `tasks/08-dynamic-filter-block/requirements.md`
- `tasks/08-dynamic-filter-block/results.md`
- `tasks/08-dynamic-filter-block/review.md`
- `wp-content/themes/qp-newsletter/includes/facetwp.php`
- `wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/block.json`
- `wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/index.js`
- `wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/edit.js`
- `wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/inspector.js`
- `wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/render.php`
- `wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/preview.png`
- `wp-content/themes/qp-newsletter/assets/css/blocks/dynamic-filter.css`
- `wp-content/themes/qp-newsletter/assets/css/blocks/index.css`
- `wp-content/themes/qp-newsletter/assets/js/main.js`
- `wp-content/themes/qp-newsletter/assets/js/main.min.js`
- `wp-content/themes/qp-newsletter/templates/displays/post--related.php`
