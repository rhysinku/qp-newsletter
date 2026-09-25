# Task Results: Single News Page Template (T1)

**Status:** NEEDS REVIEW
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** ROADMAP.md Phase 4 Task T1 & SOW Section 3.1 (News Model)

---

## 1. Summary of Changes
We have implemented the full **Single News Page Template** (`templates/displays/single--news.php`) and its supporting sidebar partials, layout styles, responsive image styles, and client-side widgets, fully compliant with the Marameo Design System and WCAG 2.2 AA accessibility standards.

### Files Created / Modified:
1. **`tasks/03-single-news-page/requirements.md`**: Upgraded task status to `NEEDS REVIEW`.
2. **`wp-content/themes/qp-newsletter/functions.php`**:
   - Registered dedicated `16:9` image size set (`480x270|768x432|1024x576|1440x810`) via `mmd_alter_image_size_sets_list`.
   - Also registered `3:2` and `27:10` image size sets to ensure existing block styles resolve cleanly without PHP notices.
   - Registered responsive image style `news-featured` (`whratio: 16:9`) with responsive `sizes` definition.
3. **`wp-content/themes/qp-newsletter/templates/displays/single--news.php`**:
   - Wrapped inside semantic `<article class="mmd-single-news">`.
   - **Hero Banner Area**: Light grey background (`bg-neutral-light-grey`) with hairline divider.
   - **Breadcrumbs**: Evaluates `[seopress_breadcrumbs]` shortcode with fallback to an accessible, semantic breadcrumb navigation (`<nav aria-label="Breadcrumb">` with `aria-current="page"`).
   - **Badges**:
     - Dynamic Primary Category badge from `news_category-term` linking to category archive.
     - Dynamic Sponsor indicator badge when `sponsor_content` is enabled, rendering sponsor name and external link with new-window announcement.
   - **Title**: Semantic `<h1>` styled with responsive typography tokens.
   - **Meta Bar**: Publication date (`<time>` element with calendar icon), estimated reading time (`estimate_reading` with clock icon), and prominent external reference button (`associated_url`) with external link icon.
   - **Technology Tags**: Badge list of related `tech_tag` terms (`#Laravel`, `#React`, etc.) with links to tag archives.
   - **Featured Image**: High-resolution image rendered responsively using custom helper `mmd_render_image_by_ris($thumbnail_id, 'news-featured', ..., eager: true)` with full `srcset` and zero Cumulative Layout Shift (CLS).
   - **Content Grid**: Two-column layout grid (`.mmd-content-grid`) containing the main article column (`.mmd-content-grid__main.mmd-content.mmd-toc-content`) and sidebar (`<aside class="mmd-content-grid__sidebar">`).
4. **`wp-content/themes/qp-newsletter/templates/partials/aside-toc.php`**:
   - Reusable Table of Contents sidebar widget (`.mmd-toc-wrapper`).
   - Includes accessible accordion toggle button (`<button aria-expanded="true" aria-controls="mmd-toc-nav">`) and navigation container (`<nav id="mmd-toc-nav">`).
5. **`wp-content/themes/qp-newsletter/templates/partials/aside-share.php`**:
   - Reusable Social Share buttons widget (`.mmd-share-wrapper`).
   - Provides accessible sharing links for X (Twitter), LinkedIn, Facebook, and a one-click Copy Link button with live-region tooltip feedback (`Copied!`).
6. **`wp-content/themes/qp-newsletter/assets/css/layout/content-grid.css`**:
   - Two-column CSS Grid: 8-column main content + 4-column sidebar on desktop (`>= 992px`), single-column on mobile.
   - Styled TOC active highlight indicator (`.is-active`), nested indentation (`.toc-h3`), and accordion collapse state.
7. **`wp-content/themes/qp-newsletter/assets/js/main.js`**:
   - Added `TableOfContents` class: Scans `.mmd-toc-content` for `<h2>` and `<h3>` headings, assigns auto-generated anchor IDs, constructs the TOC list, handles smooth scrolling, and uses `IntersectionObserver` to track the active section during scroll. Gracefully hides the TOC widget if no headings exist.
   - Added `ShareWidgets` class: Handles clipboard copy with native `navigator.clipboard` (and fallback) and displays temporary feedback tooltip.
   - Transpiled and minified to `assets/js/main.min.js`.

---

## 2. Compilation & Verification Evidence

### 2.1 Build Execution
Run `npm run build` inside `wp-content/themes/qp-newsletter`:
- Tailwind CSS v4 compiled layout styles into `gutenberg/build/css/style.min.css`.
- Gulp successfully minified `assets/js/main.js` to `assets/js/main.min.js`.
- Gutenberg blocks compiled with zero errors.

### 2.2 Standards Greps (Definition of Done)
1. Hardcoded hex colors in PHP/CSS: **0 violations**.
2. Arbitrary `rem`/`var` in class attributes: **0 violations**.
3. `.wp-block-heading` selector violations: **0 violations**.

### 2.3 PHP Debug & Log Checks
- Ran template execution under `error_reporting(E_ALL)`: **Clean execution, zero notices, zero warnings**.
- Verified `wp-content/debug.log`: **Clean (no errors)**.

### 2.4 DDEV Test Post Verification
- **Test URL:** `https://qp-newsletter.ddev.site/news/news-1/` (Post ID: 87)
- **One-time-login URL for Reviewer:** `ddev wp user one-time-login 1`
  `https://qp-newsletter.ddev.site/wp-login.php?user_id=1&one_time_login_token=9b167f75ef2513c8c16cb419a49aa090e2fed946`
- **Field State Verifications:**
  - **Primary Category:** Renders `Security & AI` badge linked to `/news_category/security-ai/`.
  - **Sponsor Content ON:** Renders `Sponsored by CyberGuard Cloud` linked to promo URL with `(opens in a new tab)`.
  - **Sponsor Content OFF:** Toggled `sponsor_content` to `0` and confirmed all sponsor markup is completely omitted.
  - **Associated URL ON:** Renders "Source / Reference" button linking to source URL with `target="_blank" rel="noopener noreferrer"`.
  - **Associated URL OFF:** Emptied `associated_url` and confirmed the button is completely omitted.
  - **Reading Time:** Displays `5 mins read` with clock icon.
  - **Tech Tags:** Displays `#Laravel` and `#React` badges with links to taxonomy archives.
  - **Featured Image (RIS):** Renders attachment 14 using `mmd_render_image_by_ris` with 16:9 `srcset` candidates (`480w`, `768w`, `1024w`, `1200w`), `aspect-video`, and `loading="eager"`.
  - **Sidebar:** Table of Contents dynamically lists sections from post content (`Overview of the New Protocol`, `Impact on Application Developers`, `Key Milestones and Timeline`), with active state highlighting and smooth scrolling.

---

## 3. Accessibility & Responsive Verification Check
- [x] **Semantic Landmarks**: `<article class="mmd-single-news">`, `<nav aria-label="Breadcrumb">`, `<nav aria-label="Table of contents">`, `<aside aria-label="Article navigation and tools">`.
- [x] **Heading Hierarchy**: Starts with `<h1>` for post title, followed sequentially by `<h2>` and `<h3>` in the content.
- [x] **Keyboard Navigation & Visible Focus**: All interactive elements (badges, buttons, links, TOC items, copy button) possess visible `:focus-visible` outline rings with offset.
- [x] **External Link Indications**: All external links (`associated_url`, `sponsor_link`, social share links) include screen-reader text `<span class="sr-only">(opens in a new tab)</span>`.
- [x] **Zero CLS**: Featured image has explicit width/height attributes and responsive ratio constraints.
- [x] **Mobile Display (375px/768px/1440px)**: Content stacks neatly on mobile screens; desktop displays 8-col article + 4-col sticky sidebar.
