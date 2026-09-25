# Task Requirements: Single News Page Template (T1)

**Status:** DONE
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** ROADMAP.md Phase 4 Task T1 & SOW Section 3.1 (News Model)

---

## 1. Scope & Objective
Design and implement the **Single News Page Template** (`templates/displays/single--news.php`) for the IT Community Learning Platform. This template handles the full-page view for individual `news` post type entries.

The template must render a highly polished, responsive, and accessible layout that displays:
- **Hero Banner Area**: A light-grey, clean section containing the post title, post date, core news metadata, and the featured image.
- **Dynamic News Metadata**:
  - **Category Badge**: Primary category term from the `news_category` taxonomy (field `news_category-term`).
  - **Estimated Reading Time**: Dynamic reading time suffix "mins" (field `estimate_reading`).
  - **Technology Tags**: Badge list of related `tech_tag` taxonomy terms (field `tech_tag-terms`).
  - **Associated URL**: A prominent external reference/source button (field `associated_url`) with an external link icon, rendered only if populated.
  - **Sponsor Content Info**: If `sponsor_content` is toggled on, render a prominent "Sponsored" indicator or badge that displays the `sponsor_name` and links to `sponsor_link` (opening in a new tab with `noopener noreferrer`).
- **Featured Image**: High-quality post thumbnail rendered responsively using the custom RIS helper `mmd_render_image_by_ris()`.
- **Main Content**: Rendered via `the_content()` in a two-column grid.
- **Sidebar**: Sticky Table of Contents and standard Share buttons widget matching the existing theme partial designs.

---

## 2. Visual & Architectural Constraints

### 2.1 Colors & Theme Tokens (From `color.css`)
- **Hero Background**: Light background (`bg-accent-super-light-blue` or matching theme color).
- **Primary Text**: Dark charcoal (`var(--color-neutral-grey-900)` / `#1D1D1D`).
- **Category Badge**: Primary brand colors (e.g. text/border using `--color-primary` or `--color-primary-navy-900` over a soft background).
- **Technology Tags**: Light grey backgrounds with subtle borders and dark text.
- **Sponsor Indicator**: Accent color (e.g. brass `--color-primary-brass-300` or warm border highlights) to denote partner/sponsored content distinctively.

### 2.2 Layout & Structure
- **Two-Column Layout Grid (`.mmd-content-grid`)**:
  - **Left / Main Column (`.mmd-content-grid__main`)**: Container for metadata and full post content (`the_content()`), styled with standard typography classes (`mmd-content`, `mmd-toc-content`).
  - **Right / Sidebar Column (`.mmd-content-grid__sidebar`)**: Contains the table of contents widget (`.mmd-toc-wrapper`) and social share buttons. This column must stick on scroll (`lg:sticky lg:top-20`) on desktop viewports.
- **Featured Image Placement**: Large, centered visual element within or directly below the hero banner, styled with rounded corners (`rounded-2xl` or `rounded-3xl` per design guidelines) to create an elegant aesthetic.

### 2.3 Image Crop & Responsive Image Styles (RIS)
- Register/use a dedicated RIS crop (such as a 16:9 ratio, e.g., `content_media_large` or custom `news_featured` size) inside the templates.
- Always load the featured image via `mmd_render_image_by_ris()` to enforce responsive scaling and aspect-ratio stability, ensuring **zero Cumulative Layout Shift (CLS)**.

---

## 3. Detailed Acceptance Criteria

### 3.1 Markup & Semantics (HTML5)
- [ ] Entire template wrapped inside an `<article class="mmd-single-news">` element.
- [ ] Breadcrumbs rendered at the top of the section using `[seopress_breadcrumbs]` shortcode wrapper.
- [ ] Heading hierarchy starts with `<h1>` for the news post title. No skipped heading levels.
- [ ] Sidebar elements wrapped within a semantic `<aside>` tag.

### 3.2 Dynamic ACF News Fields Handling
- **Category & Tags**:
  - [ ] Fetch the single select primary category term (`news_category-term`) and display its name.
  - [ ] Fetch the multi-select technology tags (`tech_tag-terms`) and output them as a list of badges.
- **Estimate Reading Time**:
  - [ ] Display estimated reading time dynamically if populated (e.g., `5 mins read`), gracefully fallback or hide if empty.
- **Associated URL**:
  - [ ] Render a "Source / Reference" button using `associated_url` only when the field is not empty.
  - [ ] Link must include screen-reader text for external redirection and have `target="_blank" rel="noopener noreferrer"`.
- **Sponsor Content Handling**:
  - [ ] If `sponsor_content` is checked:
    - [ ] Render a clear "Sponsored Content" notice or badge.
    - [ ] Display `sponsor_name` and link it to the `sponsor_link` URL.
    - [ ] Link must open in a new tab with `target="_blank" rel="noopener noreferrer"`.
  - [ ] If `sponsor_content` is unchecked:
    - [ ] Ensure sponsor-specific markup is completely hidden.

### 3.3 Responsive Behavior & Layout
- **Desktop (>= 992px)**:
  - [ ] Render as a dynamic 2-column layout (`grid grid-cols-12 gap-8` or `.mmd-content-grid`) with the sticky sidebar on the right side.
  - [ ] Featured image spans the full width of the content container with rounded corners and clean padding.
- **Mobile (< 992px)**:
  - [ ] Stacks content vertically (`flex-col` or single-column layout).
  - [ ] Sticky Table of Contents behaves gracefully or collapses dynamically.
  - [ ] Metas and badges stack logically with adequate spacing (minimum touch targets of 44x44px for links/badges).

### 3.4 Accessibility (WCAG 2.2 AA Checklist)
- [ ] **Semantic Elements**: Proper use of `<article>`, `<header>`, `<main>`, `<aside>`, and `<nav>`.
- [ ] **Contrast**: Ensure text colors of badges, tags, and reading time are compliant with minimum 4.5:1 ratio against their background.
- [ ] **Focus Indicator**: All links (including tags, category, associated URL, and sponsor link) must feature a prominent focus outline.
- [ ] **External Links**: Redirections to external websites must have `aria-label` or inline screen-reader text notifying users that it opens in a new tab.

---

## 4. Verification Plan

1. **Admin Setup & Field Verification**:
   - Create a test `news` item in WordPress.
   - Fill in standard fields (Title, Content, Featured Image) and custom fields (Primary Category, Estimate Reading Time, Tech Tags, Associated URL, Sponsor details).
2. **Standard News Verification**:
   - Verify that the page loads cleanly with Title, Excerpt/Intro, Date, and Featured Image.
   - Confirm Category and Tech Tag badges show correct term names and link appropriately.
   - Confirm "Estimate Reading Time" displays correctly with correct minutes.
3. **Associated URL / Link Check**:
   - Confirm the external link button displays and behaves correctly when populated, and disappears when left empty.
4. **Sponsored Content Variations**:
   - Toggle "Sponsor Content" ON and verify the sponsor name and link display as styled.
   - Toggle "Sponsor Content" OFF and verify all sponsor-related fields are completely removed from the page.
5. **Responsive and Accessibility Audit**:
   - Inspect on mobile (375px/768px) and desktop (1440px) to verify layouts and margins.
   - Run keyboard walkthrough (`Tab` key) to ensure logical focus order and visible focus states.
   - Verify `debug.log` is clean of notices/warnings.
