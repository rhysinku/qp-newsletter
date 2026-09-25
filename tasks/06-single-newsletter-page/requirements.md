# Task Requirements: Single Newsletter Page Template (T4)

**Status:** DONE  
**Assignee:** Implementer  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** PROJECT-SPEC.md §4.4 (Newsletter Field Group), SOW §3.3 / ROADMAP.md Phase 4 Task T4  

---

## 1. Scope & Objective

Design and implement the **Single Newsletter Page Template** (`templates/displays/single--newsletter.php`) for the IT Community Learning Platform. This template handles full-page rendering for the `newsletter` custom post type via WordPress `single.php`.

The template must adhere to the proven architectural pattern of `single--news.php` and `single--resource.php`:
1. **Hero Banner Section**:
   - Breadcrumb navigation (`[seopress_breadcrumbs]` with accessible semantic HTML fallback).
   - Badge row featuring the primary **Newsletter Category** badge (`newsletter_category`).
   - Newsletter Title (`<h1>`).
   - Meta bar: Dispatched / Send Date (`send_date` ACF field) with calendar icon, plus prominent **Download PDF** CTA button (`pdf_download` ACF field).
   - Featured Cover Image rendered responsively using custom helper `mmd_render_image_by_ris()`.
2. **Main Two-Column Content Grid (`.mmd-content-grid`)**:
   - **Main Article Column (`.mmd-content-grid__main`)**: Post content rendered via `the_content()` styled with `.mmd-content`, `.mmd-toc-content`, and `.mod--theme--light`.
   - **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
     - **Newsletter Quick Info Card (`.mmd-newsletter-meta-card`)**: Overview card displaying Category, Dispatched Date, PDF format & file size, and secondary download button.
     - **Table of Contents Widget**: Reusable partial `templates/partials/aside-toc.php`.
     - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
3. **Universal Related Posts Section**:
   - Reusable partial `templates/partials/related-posts.php` displaying "Related Newsletters" matching taxonomy terms.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-single-template/SKILL.md` (template anatomy, data preparation block, router resolution via `templates/displays/single--newsletter.php`).
- [ ] Read `skills/mmd-ris/SKILL.md` (render cover image via `mmd_render_image_by_ris()`, never `wp_get_attachment_image*`).
- [ ] Read `skills/mmd-theming/SKILL.md` & `skills/mmd-tailwindcss-v2/SKILL.md` (theme tokens, zero hardcoded hex colors, zero arbitrary `rem`/`var` classes).
- [ ] Read `skills/mmd-partials/SKILL.md` (reuse `aside-toc.php`, `aside-share.php`, and `related-posts.php`).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic HTML, heading hierarchy H1 -> H2 -> H3, keyboard navigation, visible focus indicators, screen-reader download context).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verify on DDEV, computed styles proof, responsive at 360/768/1440, clean `debug.log`).

---

## 3. Advanced Custom Fields (ACF) Specification & Display Mapping

The template must read and comprehensively display all fields defined in `wp-content/themes/qp-newsletter/acf-json/group_newsletter_fields.json`:

| ACF Field Label | Field Name | Field Type | Stored Value / Format | Visual & Functional Display Treatment |
|---|---|---|---|---|
| **Newsletter Category** | `newsletter_category-term` | `taxonomy` (select) | Term ID (int) from `newsletter_category` | Rendered as a pill badge in hero and in sidebar info card.<br>• Resolves term object via `get_term($id, 'newsletter_category')` with fallback to `get_the_terms($post_id, 'newsletter_category')`.<br>• Links to category archive `/newsletter-category/{slug}/`.<br>• Styled with `bg-primary-blue-50 text-primary border border-primary/20 hover:bg-primary-blue-200 transition-colors`. |
| **Send Date** | `send_date` | `date_picker` | `Y-m-d` (e.g. `2026-10-15`) | Rendered in hero meta bar with calendar icon (`mmd_sprite('calendar')`).<br>• Formatted as "Dispatched on [F j, Y]" (e.g., "October 15, 2026").<br>• Encapsulated in `<time datetime="Y-m-d">`.<br>• Falls back to post published date `get_the_date('F j, Y')` if empty.<br>• Also displayed in sidebar quick info card. |
| **PDF Download** | `pdf_download` | `file` | Attachment ID (int) | **Primary Action CTA**:<br>• Resolves download URL via `wp_get_attachment_url($id)`.<br>• Resolves file size via `size_format(filesize(get_attached_file($id)))`.<br>• Hero CTA: **"Download Issue (PDF · {size})"** or **"Download PDF"** with download/file icon.<br>• Declares `download` attribute and `target="_blank" rel="noopener noreferrer"`.<br>• Includes accessible screen-reader note: `<span class="sr-only"> (PDF document, size)</span>`.<br>• Displayed in sidebar meta card with file size and duplicate download button.<br>• Gracefully omitted if no PDF is attached. |
| **Cover / Featured Image** | `_thumbnail_id` | Core Thumbnail | Attachment ID (int) | Rendered via `mmd_render_image_by_ris($thumbnail_id, 'news-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true)` in 16:9 aspect ratio container with `rounded-2xl lg:rounded-3xl overflow-hidden shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100`. |

---

## 4. Visual & Architectural Layout Specifications

### 4.1 Breadcrumb Area
- Evaluates `[seopress_breadcrumbs]` shortcode if SEOPress is active.
- Semantic HTML fallback:
  ```html
  <nav aria-label="Breadcrumb" class="mmd-breadcrumbs text-xs font-semibold text-neutral-grey-500 mb-6">
    <ol class="flex items-center flex-wrap gap-2 list-none p-0 m-0">
      <li>
        <a href="/" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Home</a>
      </li>
      <li aria-hidden="true" class="text-neutral-grey-300">/</li>
      <li>
        <a href="/newsletters/" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Newsletters</a>
      </li>
      <li aria-hidden="true" class="text-neutral-grey-300">/</li>
      <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
        [Newsletter Title]
      </li>
    </ol>
  </nav>
  ```

### 4.2 Hero Banner Area (`.mmd-single-newsletter__hero`)
- **Background**: Light surface (`bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60`).
- **Container**: `container mx-auto px-6 max-w-[1200px]`.
- **Badges Row**:
  - **Category Badge**: Pill with uppercase label linking to category archive.
  - **Issue Indicator**: Pill badge noting "Newsletter Issue" or edition indicator.
- **Title (`<h1>`)**:
  - Typography: `text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary`.
- **Meta Bar & Action Row**:
  - Left: Flex row with Dispatched / Send Date (`calendar` icon + formatted date).
  - Right: Prominent primary CTA button **"Download PDF"** / **"Download Issue (PDF · {size})"**:
    - Styling: `inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`.
    - Download icon with `download` attribute and screen-reader context.
- **Cover Image**:
  - RIS-rendered 16:9 container with `mt-8 overflow-hidden rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100`.

### 4.3 Two-Column Content Grid (`.mmd-content-grid`)
- **Main Article Content Column (`.mmd-content-grid__main`)**:
  - Renders `the_content()`.
  - Typography classes: `.mmd-content.mmd-toc-content.mod--theme--light.min-w-0`.
- **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
  - Sticky container on desktop: `lg:sticky lg:top-28 flex flex-col gap-6 min-w-0`.
  - Semantic `<aside aria-label="Newsletter navigation and tools">`.
  - **Newsletter Quick Info Card (`.mmd-newsletter-meta-card`)**:
    - Styling: `bg-white rounded-2xl border border-neutral-grey-150/60 p-6 shadow-sm flex flex-col gap-4`.
    - Heading: `<h3 class="text-base font-bold text-primary-navy-900 pb-3 border-b border-neutral-grey-200/60 font-primary">Issue Details</h3>`.
    - Key-value metadata rows:
      - **Category:** Category name/badge
      - **Dispatched:** Formatted send date
      - **Format:** PDF document (with file size if available)
    - Duplicate Action button if PDF is attached for reader convenience.
  - **Table of Contents Widget**:
    - Included via `get_template_part('templates/partials/aside-toc');`.
    - Automatically discovers and links headings inside `.mmd-toc-content`.
  - **Share Buttons Widget**:
    - Included via `get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title]);`.

### 4.4 Related Newsletters Section
- Included directly above footer via:
  ```php
  get_template_part('templates/partials/related-posts');
  ```
- Automatically resolves to "Related Newsletters" heading and renders 3 related newsletter cards matching `newsletter_category`.

---

## 5. Responsive Behavior & Viewport Breakpoints

- **Desktop (>= 992px / lg)**:
  - Hero action button aligns horizontally with metadata.
  - Content grid renders as two columns: 8-column main content (`.mmd-content-grid__main`) + 4-column sticky sidebar (`.mmd-content-grid__sidebar`).
  - Sidebar sticks at `top-28`.
- **Tablet (768px - 991px)**:
  - Content grid stacks with main content followed by sidebar widgets.
- **Mobile (< 768px)**:
  - Single-column layout.
  - Hero download CTA expands to full width (`w-full sm:w-auto`) for minimum 44px touch accessibility.
  - Badges and meta items wrap neatly without horizontal overflow.

---

## 6. Accessibility Criteria (WCAG 2.2 AA)

- [ ] **Semantic Structure**: `<article class="mmd-single-newsletter">`, `<nav aria-label="Breadcrumb">`, `<aside aria-label="Newsletter navigation and tools">`.
- [ ] **Heading Outline**: Exactly one `<h1>` for issue title; sections use `<h2>`; sidebar cards use `<h3>`. Zero skipped heading levels.
- [ ] **Download Links**: PDF button must declare `download` attribute and state file type and size for screen reader accessibility (`<span class="sr-only"> (PDF document, 2.4 MB)</span>`).
- [ ] **Color Contrast**: All badge labels, meta text, and buttons must achieve at least 4.5:1 contrast against their backgrounds.
- [ ] **Keyboard Navigation**: All interactive elements (CTA buttons, category link, TOC links, share buttons) must display visible `:focus-visible` outline rings with offset.
- [ ] **Zero Cumulative Layout Shift**: Featured images include explicit width/height and responsive ratio constraints via `mmd_render_image_by_ris()`.

---

## 7. Verification Plan (DDEV)

1. **Verify Newsletter with PDF & Full Data**:
   - Create or inspect a `newsletter` post on DDEV (e.g. Issue #1).
   - Ensure `newsletter_category-term`, `send_date`, and `pdf_download` are populated along with title, thumbnail, and content.
   - Confirm Category badge displays with correct link.
   - Confirm Dispatched Date displays with calendar icon and valid `<time>` tag.
   - Confirm "Download Issue (PDF · {size})" button appears and successfully downloads the attached PDF file.
   - Confirm Sidebar "Issue Details" card displays accurate metadata and secondary download button.
2. **Verify Newsletter without PDF (Fallback Handling)**:
   - Create a newsletter issue without a `pdf_download` attachment.
   - Verify hero and sidebar omit the download button gracefully without layout shift or broken markup.
3. **Verify Table of Contents & Social Share**:
   - Confirm TOC dynamically renders headings found in `the_content()`.
   - Confirm Social Share links populate with the newsletter URL and title.
4. **Verify Universal Related Newsletters**:
   - Confirm "Related Newsletters" section renders up to 3 cards with same category or recent newsletters fallback.
5. **Standards & Code Quality Greps**:
   - Run DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.
   - Verify `debug.log` is clean of notices and warnings.
