# Task Results: Single Blog Page Template (T9)

**Status:** NEEDS REVIEW  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** PROJECT-SPEC.md §4.1 (Blog Field Group), ROADMAP.md Phase 4 Task T1 (Single Blog & News Page Template)  

---

## 1. Summary of Changes

We have implemented and verified the **Single Blog Page Template** (`templates/displays/single--blog.php`) for the IT Community Learning Platform, matching the layout, typography, and component structure of the Single News template (`single--news.php`), adhering to the Marameo Single-Post Template standard (`mmd-single-template`), and satisfying WCAG 2.2 AA accessibility requirements.

### Files Created / Modified:
1. **`tasks/09-single-blog-page/requirements.md`**:
   - Status updated to `NEEDS REVIEW`.
2. **`wp-content/themes/qp-newsletter/templates/displays/single--blog.php`**:
   - Automatically dispatched by `single.php` for `blog` custom post type entries.
   - Wrapped inside semantic `<article class="mmd-single-blog">`.
   - **Hero Banner Area (`.mmd-single-blog__hero`)**:
     - Light grey surface (`bg-neutral-light-grey`) with bottom border divider.
     - Breadcrumbs via `[seopress_breadcrumbs]` shortcode with semantic accessible HTML fallback (`Home / Blog / [Title]`).
     - Badges row:
       - Primary Category badge: Displays `blog_category` term name (`bg-primary-blue-50 text-primary border border-primary/20 hover:bg-primary-blue-200`) linking to term archive.
       - Sponsor badge: Conditional on `sponsor_content == 1`, displays "Sponsored by [Sponsor Name]" (`bg-primary-brass-300/20 text-primary-navy-900 border border-primary-brass-400/40`) linking to `sponsor_link` with screen-reader text. Omitted when `sponsor_content` is 0.
     - Blog Title: Semantic `<h1>` matching News template typography (`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 font-primary`).
     - Meta Bar & Action Row:
       - Published date with `calendar` SVG sprite icon and semantic `<time datetime="...">`.
       - Estimated reading time (`estimate_reading` mins read) with `clock` SVG sprite icon.
       - Associated URL ("Source / Reference") CTA button with external link icon, `target="_blank" rel="noopener noreferrer"`, and screen-reader notice. Omitted if field is empty.
     - Technology Tags: List of interactive tag badges (`#Docker`, `#Laravel`, `#API`) from `tech_tag` taxonomy.
     - Featured Image: Rendered responsively via `mmd_render_image_by_ris($thumbnail_id, 'blog-featured', ...)` with 16:9 aspect ratio (`aspect-video`) and rounded borders (`rounded-2xl lg:rounded-3xl`).
   - **Main Content & Sidebar Section (`.mmd-single-blog__body`)**:
     - Two-column content grid (`.mmd-content-grid`).
     - Main column (`.mmd-content-grid__main min-w-0`): `the_content()` styled with `.mmd-content.mmd-toc-content.mod--theme--light`.
     - Sticky sidebar (`.mmd-content-grid__sidebar min-w-0`): Reusable Table of Contents (`templates/partials/aside-toc.php`) and Social Share widget (`templates/partials/aside-share.php`).
   - **Bottom Section**:
     - Universal Related Posts partial `templates/partials/related-posts.php` automatically queries and outputs "Related Blogs" based on shared `tech_tag` and `blog_category` terms.
3. **`wp-content/themes/qp-newsletter/functions.php`**:
   - Registered `blog-featured` and `blog_featured` in `mmd_alter_responsive_image_styles_list` for 16:9 responsive image generation.
4. **`wp-content/themes/qp-newsletter/templates/displays/post--related.php`**:
   - Added `blog` case to badge switch statement to resolve primary `blog_category` taxonomy terms on blog cards.
5. **`wp-content/themes/qp-newsletter/templates/partials/related-posts.php`**:
   - Updated taxonomy switch mapping so that post type `blog` queries `blog_category` instead of default WordPress `category`.

---

## 2. Compilation & Standards Verification

### 2.1 Asset Compilation
Ran `ddev exec npm --prefix wp-content/themes/qp-newsletter run tw-build`:
- Tailwind CSS v4 compiled successfully (`style.min.css` and `style-editor.min.css`).

### 2.2 Standards Greps (Definition of Done)
Ran from theme directory:
- Hardcoded hex colors in `single--blog.php`: **0 violations**.
- Arbitrary `rem`/`var` in class attributes: **0 violations**.
- `.wp-block-heading` selector violations: **0 violations**.

### 2.3 PHP Lint & Error Logs
- PHP syntax check (`php -l`): **All 4 files passed with zero syntax errors**.
- PHP execution with `error_reporting(E_ALL)`: **0 notices, 0 warnings**.
- WordPress `debug.log`: **Clean (0 errors)**.

---

## 3. DDEV Verification Evidence

- **Reviewer One-Time-Login:**  
  `https://qp-newsletter.ddev.site/wp-login.php?user_id=1&one_time_login_token=a3f6c469ae5eff2663597d8b1ceaddde428d87ec`

- **Test Post 1 (Sponsored Post with Tags & Reading Time):**  
  `https://qp-newsletter.ddev.site/blog/why-we-switched-from-rest-to-a-typed-api-layer/` (Post ID: 94)
  - **HTTP Status:** `200 OK`.
  - **Category Badge:** "Developer Thoughts" linking to `https://qp-newsletter.ddev.site/blog_category/developer-thoughts/`.
  - **Sponsor Badge:** "Sponsored by Stoplight" linking to `https://example.com/sponsors/stoplight` with `target="_blank" rel="noopener noreferrer"`.
  - **Title:** "Why We Switched From REST to a Typed API Layer" (`<h1>`).
  - **Meta Bar:** Published date `September 17, 2026` + Reading time `6 mins read`.
  - **Technology Tags:** `#API` and `#Laravel` badges linking to their respective `/tech_tag/{slug}/` archives.
  - **Featured Image:** Rendered via RIS with `srcset` (480w, 768w, 1024w, 1200w) and `aspect-video`.
  - **Sidebar:** Table of Contents populated with article headings; Share widget with post permalink.
  - **Related Posts:** Automatically displays "Related Blogs" section containing Post ID 92 ("Mastering Docker Network Drivers") with "Guides" badge, thumbnail, and reading time.

- **Test Post 2 (Non-Sponsored Post with Associated URL):**  
  `https://qp-newsletter.ddev.site/blog/mastering-docker-network-drivers/` (Post ID: 92)
  - **HTTP Status:** `200 OK`.
  - **Category Badge:** "Guides" linking to `https://qp-newsletter.ddev.site/blog_category/guides/`.
  - **Sponsor Content:** `0` — Sponsor badge is completely omitted from markup.
  - **Title:** "Mastering Docker Network Drivers" (`<h1>`).
  - **Meta Bar:** Published date `September 4, 2026` + Reading time `9 mins read`.
  - **Associated URL CTA:** "Source / Reference" button linking to `https://docs.docker.com/network/` with external arrow icon and `(opens in a new tab)` screen-reader notice.
  - **Technology Tags:** `#Docker` badge linking to `/tech_tag/docker/`.
  - **Related Posts:** Displays "Related Blogs" card for Post ID 94 ("Why We Switched From REST to a Typed API Layer") with "Developer Thoughts" badge.

---

## 4. Responsive & Accessibility Verification

- **Semantic Markup:** `<article class="mmd-single-blog">`, `<header>`, `<main>`, `<aside aria-label="Article navigation and tools">`, `<time datetime="...">`.
- **Heading Hierarchy:** Single `<h1>` for blog title; `<h2>` for article subsections and Related Blogs heading; `<h3>` for cards and share widget.
- **Focus Indicators:** Interactive buttons, links, and badges have visible `focus-visible:outline-2 focus-visible:outline-primary` outlines.
- **Screen Reader Support:** External links include `<span class="sr-only"> (opens in a new tab)</span>`.
- **Responsive Layout:** 2-column grid (`.mmd-content-grid`) on desktop viewports (>= 992px); single-column stacked layout on mobile viewports (< 992px).
