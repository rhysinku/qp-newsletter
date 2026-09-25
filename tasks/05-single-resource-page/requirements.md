# Task Requirements: Single Resource Page Template (T3)

**Status:** DONE
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** SOW Section 3.4 (Resources Model) & ROADMAP.md Phase 4 Task T3
**Figma Reference:** [Figma Node 4597:1717 - Single Resource Detail Page](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4597-1717&m=dev)

---

## 1. Scope & Objective

Design and implement the **Single Resource Page Template** (`templates/displays/single--resource.php`) for the IT Community Learning Platform. This template handles full-page routing for the `resource` custom post type via WordPress `single.php`.

The template must render a highly polished, responsive, and accessible layout that displays:
1. **Hero Banner Section**:
   - Breadcrumb navigation (`[seopress_breadcrumbs]` with accessible semantic fallback).
   - Badge row featuring the **Resource Type** and **Skill Level** badges.
   - Resource Title (`<h1>`).
   - Meta bar: Author attribution, publication date, and dynamic primary action Call-to-Action button based on resource type.
   - Associated **Technology Tags** (`tech_tag`) badge list.
   - Featured / Cover Image rendered responsively using custom helper `mmd_render_image_by_ris()`.
2. **Main Two-Column Content Grid (`.mmd-content-grid`)**:
   - **Main Article Column (`.mmd-content-grid__main`)**: Rich content rendered via `the_content()` styled with `.mmd-content` and `.mmd-toc-content`.
   - **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
     - **Resource Quick Info Card**: Summary meta card presenting resource type, skill level, author, file format/size (or external link reference), and secondary access button.
     - **Table of Contents Widget**: Reusable partial `templates/partials/aside-toc.php`.
     - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
3. **Universal Related Posts Section**:
   - Hooked via `templates/partials/related-posts.php` to display "Related Resources" automatically.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-single-template/SKILL.md` (template anatomy, data prep block, router resolution via `templates/displays/single--resource.php`).
- [ ] Read `skills/mmd-ris/SKILL.md` (render cover image via `mmd_render_image_by_ris()`, never `wp_get_attachment_image*`).
- [ ] Read `skills/mmd-theming/SKILL.md` & `skills/mmd-tailwindcss-v2/SKILL.md` (theme tokens, zero hardcoded hex colors, zero arbitrary `rem`/`var` classes).
- [ ] Read `skills/mmd-partials/SKILL.md` (reuse `aside-toc.php`, `aside-share.php`, and `related-posts.php`).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic HTML, heading hierarchy H1 -> H2 -> H3, keyboard navigation, visible focus indicators, external link warnings).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verify on DDEV, computed styles proof, responsive at 360/768/1440, clean `debug.log`).

---

## 3. Advanced Custom Fields (ACF) Specification & Display Mapping

The template must read and comprehensively display all fields defined in `group_resource_fields.json`:

| ACF Field Label | Field Name | Field Type | Stored Value / Options | Visual & Functional Display Treatment |
|---|---|---|---|---|
| **Resources Type** | `resources_type` | `select` | `internal`<br>`external_link`<br>`downloadable_file` | Rendered as a badge in the hero and meta summary in sidebar.<br>• `internal`: "Internal Guide"<br>• `external_link`: "External Resource"<br>• `downloadable_file`: "Downloadable File"<br>Controls which CTA and secondary details render. |
| **Skill Level** | `skill_level` | `select` | `all` (All Level)<br>`beginner` (Beginner)<br>`intermediate` (Intermediate)<br>`advance` (Advance) | Rendered as a prominent pill badge in the hero and in sidebar info card.<br>• `beginner`: Soft green/blue tone badge.<br>• `intermediate`: Amber/brass tone badge.<br>• `advance`: Indigo/purple tone badge.<br>• `all`: Neutral/slate tone badge. |
| **Author** | `author` | `text` | e.g. "QP NewsLetter Team", "Community Contributed" | Rendered in the hero meta bar with user icon (`mmd_sprite('user')`). If empty, gracefully falls back to post author `get_the_author()`. Also listed in sidebar card. |
| **External URL** | `external_url` | `url` | URL string (e.g. `https://...`) | **Conditional on `resources_type === 'external_link'`**.<br>• Rendered as primary hero CTA button: **"Access External Resource"** / **"Visit Resource"** with external link icon.<br>• `target="_blank" rel="noopener noreferrer"`.<br>• Screen reader notice `<span class="sr-only"> (opens in a new tab)</span>`.<br>• Rendered in sidebar meta box with clean domain name display. |
| **Downloadable File** | `downloadable_file` | `file` (ID) | Media Attachment ID | **Conditional on `resources_type === 'downloadable_file'`**.<br>• Resolves attachment URL via `wp_get_attachment_url($id)`.<br>• Resolves file mime/extension (e.g. `PDF`, `ZIP`) and file size via `size_format(filesize(get_attached_file($id)))`.<br>• Rendered as primary hero CTA button: **"Download Resource"** or **"Download PDF (2.4 MB)"** with download icon.<br>• Includes `download` attribute.<br>• Displayed in sidebar meta card with file details. |
| **Technology Tags** | `tech_tag` (Taxonomy) | Taxonomy Terms | Array of `WP_Term` objects | Rendered as a list of interactive tag badges (`#Docker`, `#Rust`, etc.) linking to `/tag/{slug}/`. |
| **Cover / Featured Image** | `_thumbnail_id` | Core Thumbnail | Attachment ID | Rendered via `mmd_render_image_by_ris($thumbnail_id, 'resource-featured' /* or 'news-featured' */, ...)` in 16:9 aspect ratio with rounded corners (`rounded-2xl lg:rounded-3xl`). |

---

## 4. Visual & Architectural Layout Specifications (Figma Node 4597:1717)

### 4.1 Breadcrumb Area
- Evaluates `[seopress_breadcrumbs]` shortcode if SEOPress is active.
- Fallback semantic markup:
  ```html
  <nav aria-label="Breadcrumb" class="mmd-breadcrumbs ...">
    <ol class="flex items-center flex-wrap gap-2 list-none p-0 m-0">
      <li><a href="/">Home</a></li>
      <li aria-hidden="true">/</li>
      <li><a href="/resources/">Resources</a></li>
      <li aria-hidden="true">/</li>
      <li aria-current="page">[Resource Title]</li>
    </ol>
  </nav>
  ```

### 4.2 Hero Banner Area (`.mmd-single-resource__hero`)
- **Background**: Light surface (`bg-neutral-light-grey` / `#F3F4F7` with subtle bottom border `border-b border-neutral-grey-200/60`).
- **Badges Row**:
  - **Skill Level Badge**: Pill with uppercase text (e.g. `BEGINNER`, `INTERMEDIATE`, `ADVANCE`, `ALL LEVEL`).
  - **Resource Type Badge**: Pill indicating format (`DOWNLOADABLE FILE`, `EXTERNAL LINK`, `INTERNAL GUIDE`).
- **Title (`<h1>`)**:
  - Typography: `text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary`.
- **Meta Bar & Action Row**:
  - Left: Flex row with Author (`user` icon + author name) and Publication Date (`calendar` icon + formatted date).
  - Right / Prominent Position: Primary Action CTA button:
    - If `downloadable_file`: Download CTA button with download/file icon and file size label (e.g., "Download PDF · 1.4 MB").
    - If `external_link`: External Access CTA button with external link icon ("Access External Resource").
    - If `internal`: "Internal Guide" indicator or in-page anchor button ("Read Full Guide").
- **Technology Tags Bar**:
  - Horizontal list of tags (`#Docker`, `#Rust`, `#Laravel`) with subtle borders and hover states linking to tag archives.
- **Featured Cover Image**:
  - RIS-rendered 16:9 responsive image container with `rounded-2xl lg:rounded-3xl overflow-hidden shadow-md`.

### 4.3 Two-Column Content Grid (`.mmd-content-grid`)
- **Main Content Column (`.mmd-content-grid__main`)**:
  - Semantic container for body content (`the_content()`).
  - Typography classes: `.mmd-content.mmd-toc-content.mod--theme--light.min-w-0`.
- **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
  - Sticky container on desktop: `lg:sticky lg:top-28 flex flex-col gap-6 min-w-0`.
  - **Resource Quick Info Card (`.mmd-resource-meta-card`)**:
    - Clean white card (`bg-white rounded-2xl border border-neutral-grey-150/60 p-6 shadow-sm`).
    - Heading: `<h3>Resource Details</h3>`.
    - Key-value list:
      - **Type:** Internal Content / External Link / Downloadable File
      - **Skill Level:** All Level / Beginner / Intermediate / Advance
      - **Curated By:** Author name
      - **Format / Size:** e.g. PDF (2.4 MB) or External Host Domain
    - Action button duplicate for convenience while scrolling.
  - **Table of Contents**: Included via `get_template_part('templates/partials/aside-toc');`. Automatically parses headings in `the_content()`.
  - **Share Buttons**: Included via `get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title]);`.

### 4.4 Related Resources Section
- Placed directly above the footer via:
  ```php
  get_template_part('templates/partials/related-posts');
  ```
- Automatically queries and renders "Related Resources" using the 3-column card grid implemented in Task 04.

---

## 5. Responsive Behavior & Viewport Breakpoints

- **Desktop (>= 992px / lg)**:
  - Hero action button aligns horizontally with metadata.
  - Content grid renders as 8-column main content + 4-column sticky sidebar (`.mmd-content-grid`).
  - Sidebar sticks smoothly at `top-28`.
- **Tablet (768px - 991px)**:
  - Content grid stacks with main content followed by sidebar widgets.
- **Mobile (< 768px)**:
  - Single-column stacked layout.
  - Hero action button expands to full width (`w-full sm:w-auto`) for high-contrast touch accessibility (min 44px height).
  - Badges and tags wrap cleanly without horizontal scroll overflow.

---

## 6. Accessibility Criteria (WCAG 2.2 AA)

- [ ] **Semantic Structure**: `<article class="mmd-single-resource">`, `<nav aria-label="Breadcrumb">`, `<aside aria-label="Resource navigation and tools">`.
- [ ] **Heading Outline**: Exactly one `<h1>` for resource title; sections use `<h2>`; sidebar cards use `<h3>`. Zero skipped heading levels.
- [ ] **External Links**: Links opening externally must feature `target="_blank" rel="noopener noreferrer"` and screen reader text `<span class="sr-only"> (opens in a new tab)</span>`.
- [ ] **Download Links**: Download CTA must declare `download` attribute and state file type and size for screen reader accessibility.
- [ ] **Color Contrast**: All badge labels, meta text, and buttons must achieve at least 4.5:1 contrast against their backgrounds.
- [ ] **Keyboard Navigation**: All interactive elements (CTA buttons, tag links, TOC links, share buttons) must display visible `:focus-visible` outline rings with offset.

---

## 7. Verification Plan (DDEV)

1. **Verify Downloadable File Resource**:
   - Test against Post ID 113 ("Docker Compose Cheatsheet").
   - Confirm "Downloadable File" badge and "Beginner" skill badge render.
   - Confirm "Download Resource" button displays with PDF format/size and downloads the file.
   - Confirm author "QP NewsLetter Editorial Team" displays.
2. **Verify External Link Resource**:
   - Test against Post ID 116 ("Awesome Rust — Community Curated Link List").
   - Confirm "External Resource" badge and "Intermediate" skill badge render.
   - Confirm "Access External Resource" button displays linking to `https://example.com/community/awesome-rust` with `(opens in a new tab)`.
   - Confirm author "Community Contributed" displays.
3. **Verify Internal Content Resource**:
   - Create or test an internal resource with rich Gutenberg blocks and headings.
   - Confirm "Internal Guide" badge renders.
   - Confirm TOC dynamically populates headings.
4. **Verify Universal Related Posts**:
   - Confirm "Related Resources" section renders at the bottom displaying up to 3 cards.
5. **Standards & Code Quality Greps**:
   - Run DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.
   - Verify `debug.log` is clean of notices and warnings.
