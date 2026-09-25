# Task Requirements: Single Blog Page Template (T9)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** PROJECT-SPEC.md §4.1 (Blog Field Group), ROADMAP.md Phase 4 Task T1 (Single Blog & News Page Template)  
**Design Reference:** Same design, structure, and layout as Single News Post (`templates/displays/single--news.php`)  

---

## 1. Scope & Objective

Design and implement the **Single Blog Page Template** (`templates/displays/single--blog.php`) for the IT Community Learning Platform. This template handles full-page routing and display for the `blog` custom post type via WordPress `single.php`.

The template must replicate the layout and visual hierarchy proven in `templates/displays/single--news.php`, adapting it cleanly for the `blog` post type and displaying all custom fields configured in `wp-content/themes/qp-newsletter/acf-json/group_blog_fields.json`:

1. **Hero Banner Section (`.mmd-single-blog__hero`)**:
   - Breadcrumb navigation (`[seopress_breadcrumbs]` with semantic HTML fallback `Home / Blog / [Title]`).
   - Badges row:
     - **Blog Category Badge**: Primary term from the `blog_category` taxonomy (field `blog_category-term`).
     - **Sponsor Badge**: Displayed if `sponsor_content` is enabled, linking to `sponsor_link` with `sponsor_name`.
   - Blog Title (`<h1>`).
   - Meta bar & Action row:
     - Publication Date (formatted with calendar icon).
     - Estimated Reading Time (field `estimate_reading`, formatted with clock icon).
     - Associated Source / Reference button (field `associated_url`, rendered only if populated).
   - Technology Tags (`tech_tag`) badge list (`#Docker`, `#React`, etc.).
   - Featured Image rendered responsively via `mmd_render_image_by_ris()`.
2. **Main Two-Column Content Grid (`.mmd-content-grid`)**:
   - **Main Article Column (`.mmd-content-grid__main`)**: Rich content rendered via `the_content()` styled with `.mmd-content`, `.mmd-toc-content`, and `.mod--theme--light`.
   - **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
     - **Table of Contents Widget**: Reusable partial `templates/partials/aside-toc.php`.
     - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
3. **Universal Related Posts Section**:
   - Hooked via `templates/partials/related-posts.php` to render related blog posts based on shared `tech_tag` and `blog_category` terms.
4. **Supporting Template Updates**:
   - Update `templates/displays/post--related.php` to resolve `blog_category` terms when rendering `blog` cards.
   - Update `templates/partials/related-posts.php` to query `blog_category` instead of core WordPress `category` for `blog` post types.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-single-template/SKILL.md` (template anatomy, data prep block, router resolution via `templates/displays/single--blog.php`).
- [ ] Read `skills/mmd-ris/SKILL.md` (render cover image via `mmd_render_image_by_ris()`, never `wp_get_attachment_image*`).
- [ ] Read `skills/mmd-theming/SKILL.md` & `skills/mmd-tailwindcss-v2/SKILL.md` (theme tokens, zero hardcoded hex colors, zero arbitrary `rem`/`var` classes).
- [ ] Read `skills/mmd-partials/SKILL.md` (reuse `aside-toc.php`, `aside-share.php`, and `related-posts.php`).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic HTML, heading hierarchy H1 -> H2 -> H3, keyboard navigation, visible focus indicators, external link warnings).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verify on DDEV, computed styles proof, responsive at 360/768/1440, clean `debug.log`).

---

## 3. Advanced Custom Fields (ACF) Specification & Display Mapping

All custom fields defined in `wp-content/themes/qp-newsletter/acf-json/group_blog_fields.json` must be extracted and rendered:

| ACF Field Label | Field Name | Field Type | Stored Value / Format | Visual & Functional Display Treatment |
|---|---|---|---|---|
| **Blog Category** | `blog_category-term` | `taxonomy` (select) | Term ID (`int`) or `WP_Term` | Rendered as a pill badge in hero badges row.<br>• Resolves term from `blog_category` taxonomy.<br>• Fallback to `get_the_terms($post_id, 'blog_category')` if meta is empty.<br>• Links to term archive with hover transition.<br>• Styling: `bg-primary-blue-50 text-primary border border-primary/20 hover:bg-primary-blue-200`. |
| **Technology Tags** | `tech_tag-terms` | `taxonomy` (checkbox) | Array of Term IDs or `WP_Term` objects | Rendered as a badge list below meta bar.<br>• Resolves terms from `tech_tag` taxonomy.<br>• Fallback to `get_the_terms($post_id, 'tech_tag')` if meta is empty.<br>• Each badge renders `#Tag` linking to tag archive.<br>• Styling: `bg-white text-neutral-grey-700 border border-neutral-grey-200 hover:border-primary hover:text-primary`. |
| **Estimate Reading Time** | `estimate_reading` | `number` | Positive integer (e.g. `5`) | Rendered in hero meta bar alongside publication date.<br>• Displays clock icon via `mmd_sprite('clock')`.<br>• Output: `[N] mins read`.<br>• Gracefully omitted if empty or not set. |
| **Associated URL** | `associated_url` | `url` | URL string (e.g. `https://example.com`) | Rendered as a primary external source button in the hero meta bar.<br>• Button text: "Source / Reference" with external link arrow icon.<br>• `target="_blank" rel="noopener noreferrer"`.<br>• Includes accessible screen-reader notice `<span class="sr-only"> (opens in a new tab)</span>`.<br>• Omitted cleanly if field is empty. |
| **Sponsor Content** | `sponsor_content` | `true_false` | `0` or `1` | Controls display of sponsor badge.<br>• If `1` (true), renders sponsored badge in hero badges row.<br>• If `0` (false), all sponsor markup is omitted. |
| **Sponsor Name** | `sponsor_name` | `text` | e.g. "Google Cloud" | **Conditional on `sponsor_content == 1`**.<br>• Displays sponsor organization name in badge.<br>• Styled: `bg-primary-brass-300/20 text-primary-navy-900 border border-primary-brass-400/40`. |
| **Sponsor Link** | `sponsor_link` | `url` | e.g. `https://cloud.google.com` | **Conditional on `sponsor_content == 1`**.<br>• Wraps sponsor name in external link.<br>• `target="_blank" rel="noopener noreferrer"`.<br>• Includes accessible screen-reader notice `<span class="sr-only"> (opens in a new tab)</span>`. |
| **Featured Image** | `_thumbnail_id` | Core Thumbnail | Attachment ID (`int`) | Rendered via `mmd_render_image_by_ris($thumbnail_id, 'news-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true)` in 16:9 container with `rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100`. |

---

## 4. Visual & Architectural Layout Specifications

The layout must match `templates/displays/single--news.php` exactly:

### 4.1 Breadcrumb Area
- Checks `shortcode_exists('seopress_breadcrumbs')`.
- Fallback semantic HTML breadcrumb:
  ```html
  <nav aria-label="Breadcrumb" class="mmd-breadcrumbs text-xs font-semibold text-neutral-grey-500 mb-6">
    <ol class="flex items-center flex-wrap gap-2 list-none p-0 m-0">
      <li>
        <a href="/" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Home</a>
      </li>
      <li aria-hidden="true" class="text-neutral-grey-300">/</li>
      <li>
        <a href="/blog/" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Blog</a>
      </li>
      <li aria-hidden="true" class="text-neutral-grey-300">/</li>
      <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
        [Blog Title]
      </li>
    </ol>
  </nav>
  ```

### 4.2 Hero Banner Section (`.mmd-single-blog__hero`)
- **Background & Spacing**: `bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60`.
- **Inner Container**: `container mx-auto px-6 max-w-[1200px]`.
- **Badges Row**: Category pill badge and optional Sponsored badge.
- **Title (`<h1>`)**: `text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary`.
- **Meta Bar**: Flex row container (`border-y border-neutral-grey-200/60 py-4 text-sm text-neutral-grey-700`).
  - Left group: Publication date (`calendar` sprite icon) and Reading time (`clock` sprite icon).
  - Right group: Associated URL CTA button (`bg-primary text-white rounded-full text-xs font-bold uppercase tracking-wider`).
- **Tags Row**: Interactive tags prefixed with `#` under label `Tags:`.
- **Featured Image**: Rounded container (`rounded-2xl lg:rounded-3xl overflow-hidden shadow-md mt-8`).

### 4.3 Main Content & Sidebar Section (`.mmd-single-blog__body`)
- **Container**: `container mx-auto px-6 max-w-[1200px] py-12 lg:py-16`.
- **Layout Grid**: `.mmd-content-grid`.
- **Main Article Column (`.mmd-content-grid__main`)**:
  - Semantic container for body content (`the_content()`).
  - Classes: `mmd-content mmd-toc-content mod--theme--light min-w-0`.
- **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
  - Semantic `<aside aria-label="Article navigation and tools">`.
  - Inner sticky wrapper: `lg:sticky lg:top-28 flex flex-col gap-6`.
  - Renders `templates/partials/aside-toc.php`.
  - Renders `templates/partials/aside-share.php` with `url` and `title` arguments.

### 4.4 Universal Related Posts Section
- Appended at bottom of template via `get_template_part('templates/partials/related-posts')`.
- Displays related posts based on shared `tech_tag` and `blog_category`.

---

## 5. Supporting Theme Files to Update

### 5.1 `templates/displays/post--related.php`
Add case for `blog` post type in the badge switch statement:
```php
case 'blog':
  $cat_id = $fields['blog_category-term'] ?? get_post_meta($post_id, 'blog_category-term', true);
  if (!empty($cat_id) && is_numeric($cat_id)) {
    $term = get_term((int) $cat_id, 'blog_category');
    if ($term && !is_wp_error($term)) {
      $badge_text = $term->name;
    }
  }
  if (empty($badge_text)) {
    $terms = get_the_terms($post_id, 'blog_category');
    if (!empty($terms) && !is_wp_error($terms)) {
      $badge_text = $terms[0]->name;
    }
  }
  break;
```

### 5.2 `templates/partials/related-posts.php`
Update taxonomy lookup so that `blog` maps to `blog_category`:
```php
case 'blog':
  $cat_taxonomy = 'blog_category';
  break;
case 'post':
  $cat_taxonomy = 'category';
  break;
```

---

## 6. Detailed Acceptance Criteria

### 6.1 Markup & Semantics (HTML5)
- [ ] Root template wrapped inside `<article class="mmd-single-blog">`.
- [ ] Semantic sections used for Hero (`<section class="mmd-single-blog__hero">`) and Body (`<section class="mmd-single-blog__body">`).
- [ ] Single `<h1>` for blog title; no skipped heading levels.
- [ ] Sidebar wrapped in `<aside>` with appropriate `aria-label`.
- [ ] Semantic `<time datetime="...">` tag with ISO 8601 date.

### 6.2 ACF Blog Fields Handling
- [ ] `blog_category-term`: Displays primary category name linked to category archive.
- [ ] `tech_tag-terms`: Displays list of `#Tag` pills linked to their respective tag archives.
- [ ] `estimate_reading`: Displays reading time with `clock` icon (e.g. `5 mins read`) if set; hides cleanly if empty.
- [ ] `associated_url`: Displays "Source / Reference" CTA button with external link icon and screen-reader notice; hides cleanly if empty.
- [ ] `sponsor_content`:
  - When enabled (`1`), displays "Sponsored by [Sponsor Name]" badge with working link to `sponsor_link`.
  - When disabled (`0`), completely suppresses sponsor markup.
- [ ] Featured Image: Renders via `mmd_render_image_by_ris()` with aspect ratio `aspect-video` and rounded borders; fallback gracefully if no featured image exists.

### 6.3 Responsive Layout & Styling
- [ ] Desktop (>= 992px / 1024px): Two-column layout with main content on the left and sticky sidebar on the right.
- [ ] Mobile (< 992px): Single-column layout with content and sidebar stacking naturally.
- [ ] Zero arbitrary hex colors or hardcoded arbitrary margins outside project design tokens.

### 6.4 Accessibility (WCAG 2.2 AA)
- [ ] All interactive elements (badges, buttons, links) have visible focus indicators (`focus-visible:outline-2 focus-visible:outline-primary`).
- [ ] External links (`associated_url`, `sponsor_link`) include `<span class="sr-only"> (opens in a new tab)</span>`.
- [ ] Text contrast meets minimum 4.5:1 ratio against background surfaces.

---

## 7. Verification Plan

1. **Test Post Setup (DDEV)**:
   - Create a test `blog` post with:
     - Title: "Deep Dive into Kubernetes Networking and CNI Plugins"
     - Rich content with H2, H3 headings, code blocks, lists, and paragraphs.
     - Featured Image uploaded.
     - Category selected: e.g. "Tutorials" or "Guides" (`blog_category`).
     - Tech Tags selected: e.g. "Docker", "Kubernetes", "DevOps" (`tech_tag`).
     - Estimated Reading Time: `8`.
     - Associated URL: `https://kubernetes.io/docs/concepts/cluster-administration/networking/`.
     - Sponsor Content: Checked, Sponsor Name: "Cloud Native Foundation", Sponsor Link: `https://cncf.io`.
2. **Visual & Layout Verification**:
   - Access single blog page URL on DDEV (`/blog/deep-dive-into-kubernetes-networking/`).
   - Confirm layout matches `single--news.php`.
   - Verify breadcrumb path shows `Home / Blog / [Title]`.
   - Verify category badge, sponsor badge, title, date, reading time, and source button.
   - Verify Table of Contents populates headings and share buttons point to the correct URL.
3. **Field Variations Verification**:
   - Create/test second blog post with `sponsor_content` toggled OFF: verify sponsor badge is completely hidden.
   - Create/test blog post without `associated_url` or `estimate_reading`: verify those meta items are omitted without layout breakage.
4. **Related Posts Verification**:
   - Confirm Related Posts section renders below article content and displays related blog cards with correct category badges and thumbnails.
5. **Responsive & A11y Verification**:
   - Inspect layout at 360px, 768px, and 1440px viewports.
   - Test keyboard navigation (`Tab` key through links, buttons, and TOC).
   - Check `ddev wp eval '...'` or `wp-content/debug.log` to confirm zero PHP notices or warnings.
