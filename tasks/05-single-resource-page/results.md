# Task Results: Single Resource Page Template (T3)

**Status:** NEEDS REVIEW
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** SOW Section 3.4 (Resources Model) & ROADMAP.md Phase 4 Task T3
**Figma Reference:** [Figma Node 4597:1717 - Single Resource Detail Page](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4597-1717&m=dev)

---

## 1. Summary of Changes

We have designed, implemented, and verified the **Single Resource Page Template** (`templates/displays/single--resource.php`) for the IT Community Learning Platform, following the Figma design reference (Node `4597:1717`), the Marameo Single-Post Template standard (`mmd-single-template`), and WCAG 2.2 AA accessibility requirements.

### Files Created / Modified:
1. **`tasks/05-single-resource-page/requirements.md`**:
   - Status updated to `NEEDS REVIEW`.
2. **`wp-content/themes/qp-newsletter/functions.php`**:
   - Registered `resource-featured` and `resource_featured` responsive image styles mapped to the `16:9` ratio crop set with responsive `sizes`: `(min-width: 1200px) 1200px, (min-width: 768px) 90vw, 100vw`.
3. **`wp-content/themes/qp-newsletter/templates/displays/single--resource.php`**:
   - Resolved automatically via `single.php` for the `resource` custom post type.
   - Wrapped inside semantic `<article class="mmd-single-resource">`.
   - **Hero Banner Area**:
     - Light grey surface (`bg-neutral-light-grey`) with bottom border divider.
     - Breadcrumbs via `[seopress_breadcrumbs]` shortcode with accessible fallback (`<nav aria-label="Breadcrumb">`).
     - Badges row: Skill Level badge (`All Level`, `Beginner`, `Intermediate`, `Advance`) with level-appropriate theme colors + Resource Type badge (`Downloadable File`, `External Resource`, `Internal Guide`).
     - Resource Title: Semantic `<h1>` with responsive typography.
     - Meta Bar: Curated author attribution (`user` icon) falling back to post author, and publication date (`calendar` icon).
     - Dynamic Primary Action Button:
       - `downloadable_file`: Direct file download CTA button with download icon, format label (`PDF`, `ZIP`, etc.), file size display, and `download` attribute.
       - `external_link`: External access CTA button with external link icon, `target="_blank" rel="noopener noreferrer"`, and screen reader notice `<span class="sr-only"> (opens in a new tab)</span>`.
       - `internal`: "Read Full Guide" smooth anchor button targeting main content.
     - Technology Tags list: Badges linking to `/tag/{slug}/`.
     - Featured Cover Image: Rendered via `mmd_render_image_by_ris($thumbnail_id, 'resource-featured', ...)` with 16:9 aspect ratio and rounded corners (`rounded-2xl lg:rounded-3xl`).
   - **Main Content & Sticky Sidebar Grid (`.mmd-content-grid`)**:
     - Main column (`.mmd-content-grid__main.mmd-content.mmd-toc-content.mod--theme--light`): Full rich content via `the_content()`.
     - Sticky sidebar (`<aside class="mmd-content-grid__sidebar">`):
       - **Resource Quick Info Card (`.mmd-resource-meta-card`)**: Key-value summary of Type, Skill Level, Author/Curator, and Format/Size or Host Domain, plus a secondary action button for convenience during reading.
       - **Table of Contents**: Reusable partial `templates/partials/aside-toc.php`.
       - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
   - **Bottom Section**:
     - Universal Related Posts partial `templates/partials/related-posts.php` automatically queries and outputs "Related Resources" in a 3-column card grid.

---

## 2. Compilation & Verification Evidence

### 2.1 Asset Compilation
Run `npm run build` inside `wp-content/themes/qp-newsletter`:
- Tailwind CSS v4 compiled with all layout utilities and tokens.
- JS minification completed.
- Gutenberg blocks built with zero errors.

### 2.2 Standards Greps (Definition of Done)
Ran from theme directory (`wp-content/themes/qp-newsletter`):
1. Hardcoded hex colors in PHP: **0 violations**.
2. Arbitrary `rem`/`var` in class attributes: **0 violations**.
3. Arbitrary font-weight classes (`font-[xxx]`): **0 violations**.

### 2.3 PHP Debug & Log Checks
- Ran PHP template execution under `error_reporting(E_ALL)` across all test resource posts: **0 notices, 0 warnings**.
- Verified `wp-content/debug.log`: **Clean (0 errors)**.

### 2.4 DDEV Test Post Verifications
- **Reviewer One-Time-Login:**
  `ddev wp user one-time-login 1`
  `https://qp-newsletter.ddev.site/wp-login.php?user_id=1&one_time_login_token=53fa4a6795ade9292b9597fa8430803436ab4218`

- **Test URL 1 (Downloadable File):** `https://qp-newsletter.ddev.site/resources/docker-compose-cheatsheet/` (Post ID: 113)
  - **Type:** `Downloadable File` badge.
  - **Skill:** `Beginner` badge with soft green styling.
  - **Author:** "By QP NewsLetter Editorial Team".
  - **Download Button:** Renders "Download PDF (38.8 KB)" linking to attachment file with download icon and `download` attribute.
  - **Sidebar Info Card:** Displays Type, Skill Level, Curator, Format (PDF · 38.8 KB), and secondary download button.
  - **Related Resources:** Displays "Related Resources" grid at bottom.

- **Test URL 2 (External Link):** `https://qp-newsletter.ddev.site/resources/awesome-rust-community-curated-link-list/` (Post ID: 116)
  - **Type:** `External Resource` badge.
  - **Skill:** `Intermediate` badge with amber styling.
  - **Author:** "By Community Contributed".
  - **Access Button:** Renders "Access External Resource" linking to `https://example.com/community/awesome-rust` with `target="_blank" rel="noopener noreferrer"` and screen reader text `(opens in a new tab)`.
  - **Sidebar Info Card:** Displays Type, Skill Level, Curator, Host domain (`example.com`), and secondary access button.
  - **Related Resources:** Displays "Related Resources" grid at bottom.

- **Test URL 3 (Internal Content):** `https://qp-newsletter.ddev.site/resources/advanced-kubernetes-deployment-guide/` (Post ID: 119)
  - **Type:** `Internal Guide` badge.
  - **Skill:** `Advance` badge with primary blue styling.
  - **Author:** "By Kubernetes Core WG".
  - **Action Button:** Renders "Read Full Guide" smooth scroll button.
  - **Table of Contents:** Dynamically discovers `Architecture Overview`, `Control Plane Security`, and `High Availability Configurations` headings with active state tracking.
  - **Related Resources:** Displays "Related Resources" grid at bottom.

---

## 3. Accessibility & Responsive Verification Check
- [x] **Semantic Landmarks**: `<article class="mmd-single-resource">`, `<nav aria-label="Breadcrumb">`, `<nav aria-label="Table of contents">`, `<aside aria-label="Resource navigation and tools">`.
- [x] **Heading Hierarchy**: Starts with `<h1>` for resource title; sections use `<h2>`; sidebar cards use `<h3>`. No skipped heading levels.
- [x] **Interactive Elements & Focus**: All buttons, links, tags, and TOC items include `:focus-visible` outline rings with offset.
- [x] **External Link & Download Notices**: External URLs include `<span class="sr-only"> (opens in a new tab)</span>`. Download links declare file type and size.
- [x] **Zero CLS**: Featured images include aspect-video ratio constraints and explicit dimensions via RIS.
- [x] **Mobile Responsiveness (375px/768px/1440px)**: Content stacks gracefully on mobile screens with full-width CTA touch targets (>= 44px height); desktop renders 8-col main content + 4-col sticky sidebar.
