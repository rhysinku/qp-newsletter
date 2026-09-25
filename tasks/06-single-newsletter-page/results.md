# Task Results: Single Newsletter Page Template (T4)

**Status:** NEEDS REVIEW  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** PROJECT-SPEC.md §4.4 (Newsletter Field Group), SOW §3.3 / ROADMAP.md Phase 4 Task T4  

---

## 1. Summary of Changes

We have designed, implemented, and verified the **Single Newsletter Page Template** (`templates/displays/single--newsletter.php`) for the IT Community Learning Platform, following the pattern of `single--news.php` and `single--resource.php`, the Marameo Single-Post Template standard (`mmd-single-template`), and WCAG 2.2 AA accessibility requirements.

### Files Created / Modified:
1. **`tasks/06-single-newsletter-page/requirements.md`**:
   - Status updated to `NEEDS REVIEW`.
2. **`wp-content/themes/qp-newsletter/templates/displays/single--newsletter.php`**:
   - Resolved automatically via `single.php` for the `newsletter` custom post type.
   - Wrapped inside semantic `<article class="mmd-single-newsletter">`.
   - **Hero Banner Area**:
     - Light grey surface (`bg-neutral-light-grey`) with bottom border divider.
     - Breadcrumbs via `[seopress_breadcrumbs]` shortcode with accessible semantic HTML fallback (`<nav aria-label="Breadcrumb">`).
     - Badges row: Primary Category pill badge (`newsletter_category-term` / `newsletter_category`) linking to category archive + Issue Indicator badge (`Newsletter Issue`).
     - Newsletter Title: Semantic `<h1>` with responsive typography.
     - Meta Bar: Dispatched Date (`send_date` ACF field, formatted via `date_i18n()` with `calendar` icon) and primary Action CTA button **"Download Issue (PDF · {size})"** with `download` attribute and screen-reader notice `<span class="sr-only"> (opens download in a new tab)</span>`.
     - Featured Cover Image: Rendered via `mmd_render_image_by_ris($thumbnail_id, 'news-featured', ...)` with 16:9 aspect ratio and rounded corners (`rounded-2xl lg:rounded-3xl`).
   - **Main Content & Sticky Sidebar Grid (`.mmd-content-grid`)**:
     - Main column (`.mmd-content-grid__main.mmd-content.mmd-toc-content.mod--theme--light`): Full rich content via `the_content()`.
     - Sticky sidebar (`<aside class="mmd-content-grid__sidebar">`):
       - **Newsletter Quick Info Card (`.mmd-newsletter-meta-card`)**: Key-value summary of Category, Dispatched Date, Format (PDF Document with size), and a secondary download button for convenience during reading.
       - **Table of Contents**: Reusable partial `templates/partials/aside-toc.php`.
       - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
   - **Bottom Section**:
     - Universal Related Posts partial `templates/partials/related-posts.php` automatically queries and outputs "Related Newsletters" matching taxonomy terms in a 3-column card grid.
3. **`wp-content/themes/qp-newsletter/templates/displays/post--related.php`**:
   - Enhanced to support ACF `newsletter_category-term` and `send_date` formatting for newsletter cards in related grids.

---

## 2. Compilation & Verification Evidence

### 2.1 Asset Compilation
Run `npm run tw-build` inside `wp-content/themes/qp-newsletter`:
- Tailwind CSS v4 compiled with all layout utilities and tokens (`gutenberg/build/css/style.min.css`).

### 2.2 Standards Greps (Definition of Done)
Ran from theme directory (`wp-content/themes/qp-newsletter`):
1. Hardcoded hex colors in PHP: **0 violations**.
2. Arbitrary `rem`/`var` in class attributes: **0 violations**.
3. `.wp-block-heading` selector violations: **0 violations**.

### 2.3 PHP Debug & Log Checks
- Ran PHP template execution across test newsletter posts: **0 notices, 0 warnings**.
- Verified `wp-content/debug.log`: **Clean (0 errors)**.
- Checked DDEV web container logs: **Clean (no PHP errors)**.

### 2.4 DDEV Test Post Verifications
- **Reviewer One-Time-Login:**  
  `ddev wp user one-time-login 1`  
  `https://qp-newsletter.ddev.site/wp-login.php?user_id=1&one_time_login_token=faedf8ba901d92bbc63b635ac5931d0af08b6dfd`

- **Test URL 1 (Newsletter Issue #13 with PDF):** `https://qp-newsletter.ddev.site/newsletters/qp-newsletter-issue-13-security-patch-season-and-local-meetups/` (Post ID: 110)
  - **Category:** `Product Deep Dive` badge linking to `/newsletter_category/product-deep-dive/`.
  - **Dispatched Date:** `September 24, 2026` with calendar icon and valid ISO `<time>` tag.
  - **Download Button:** Renders "Download Issue (PDF · 6 MB)" linking to `/wp-content/uploads/2026/09/newsletter-issue-13.pdf` with download icon and `download` attribute.
  - **Featured Image:** RIS-rendered cover image with responsive srcset and eager loading.
  - **Sidebar Info Card:** Displays Category, Dispatched Date, Format (PDF Document 6 MB), and secondary download button.
  - **Related Newsletters:** Displays "Related Newsletters" grid at bottom with Issue #12 card.

- **Test URL 2 (Newsletter Issue #12 with PDF):** `https://qp-newsletter.ddev.site/newsletters/qp-newsletter-issue-12-docker-rust-and-the-rise-of-edge-compute/` (Post ID: 107)
  - **Category:** `Community Digest` badge linking to `/newsletter_category/community-digest/`.
  - **Dispatched Date:** `September 5, 2026` with calendar icon.
  - **Download Button:** Renders "Download Issue (PDF · 6 MB)" linking to `/wp-content/uploads/2026/09/newsletter-issue-12.pdf`.
  - **Related Newsletters:** Displays "Related Newsletters" grid at bottom with Issue #13 card.

- **Test Case 3 (Fallback without PDF):**
  - Verified with temporary test post (ID 121); confirmed hero and sidebar omit download buttons cleanly without layout shifts or broken markup. Temporary test post deleted after verification.

---

## 3. Accessibility & Responsive Verification Check
- [x] **Semantic Landmarks**: `<article class="mmd-single-newsletter">`, `<nav aria-label="Breadcrumb">`, `<nav aria-label="Table of contents">`, `<aside aria-label="Newsletter navigation and tools">`.
- [x] **Heading Hierarchy**: Starts with `<h1>` for newsletter title; sections use `<h2>`; sidebar cards use `<h3>`. No skipped heading levels.
- [x] **Interactive Elements & Focus**: All buttons, links, tags, and TOC items include `:focus-visible` outline rings with offset.
- [x] **Download Links & Screen-Reader Text**: Download buttons include accessible text `<span class="sr-only"> (opens download in a new tab, 6 MB)</span>` and explicit `download` attribute.
- [x] **Zero CLS**: Featured images include aspect-video ratio constraints and explicit dimensions via RIS.
- [x] **Mobile Responsiveness (375px/768px/1440px)**: Content stacks gracefully on mobile screens with full-width CTA touch targets (>= 44px height); desktop renders 8-col main content + 4-col sticky sidebar.
