# Task Results: Single Event Page Template (T2)

**Status:** NEEDS REVIEW  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** PROJECT-SPEC.md §4.3 (Event Field Group), SOW §3.2 / ROADMAP.md Phase 4 Task T2  

---

## 1. Summary of Changes

We have designed, implemented, and verified the **Single Event Page Template** (`templates/displays/single--event.php`) for the IT Community Learning Platform, adhering to the design patterns established in `single--news.php` and `single--resource.php`, the Marameo Single-Post Template standard (`mmd-single-template`), and WCAG 2.2 AA accessibility requirements.

### Files Created / Modified:
1. **`tasks/07-single-event-page/requirements.md`**:
   - Status updated to `NEEDS REVIEW`.
2. **`wp-content/themes/qp-newsletter/templates/displays/single--event.php`**:
   - Automatically resolved via `single.php` for the `event` custom post type.
   - Wrapped inside semantic `<article class="mmd-single-event">`.
   - **Hero Banner Area**:
     - Light grey surface (`bg-neutral-light-grey`) with bottom border divider.
     - Breadcrumbs via `[seopress_breadcrumbs]` shortcode with accessible semantic HTML fallback (`<nav aria-label="Breadcrumb">`).
     - Badges row:
       - Format badge: "In-Person" (`bg-primary-blue-50 text-primary border-primary/20`) or "Online (Virtual)" (`bg-system-green-50 text-system-green-700 border-system-green-700/20`).
       - Entry Cost badge (`bg-primary-brass-300/20 text-primary-navy-900 border-primary-brass-400/40`), e.g., "Cost: Free" or "Cost: $15 AUD".
       - Event Status badge: Dynamically computed against current timestamp ("Upcoming" vs. "Past Event").
     - Event Title: Semantic `<h1>` with responsive typography matching News (`font-primary font-extrabold`).
     - Meta Bar & Action Row:
       - Date & Time range (e.g. `October 9, 2026 · 3:56 AM – 5:26 AM`) formatted with calendar icon and semantic `<time datetime="...">`.
       - Location summary (Map Pin icon + physical venue snippet for in-person; Video icon + "Online Webinar / Virtual" for online events).
       - Primary Action CTA button: **"Register for Event"** / **"Join Meeting"** with external link icon, `target="_blank" rel="noopener noreferrer"`, and accessible screen-reader note.
     - Technology Tags bar: Interactive tag badges (`#Docker`, `#Laravel`, `#React`) linking to `/tag/{slug}/`.
     - Featured Event Banner: Rendered via `mmd_render_image_by_ris($thumbnail_id, 'event-featured', ...)` with 16:9 aspect ratio and rounded corners (`rounded-2xl lg:rounded-3xl`).
   - **Main Content & Sticky Sidebar Grid (`.mmd-content-grid`)**:
     - Main column (`.mmd-content-grid__main min-w-0`):
       - Full rich description and schedule via `the_content()` styled with `.mmd-content.mmd-toc-content.mod--theme--light`.
       - **Featured Speakers Section (`.mmd-event-speakers`)**:
         - Section heading: `<h2 id="event-speakers-heading">Featured Speakers</h2>` (discoverable by Table of Contents).
         - Responsive 2-column card grid (`grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6`).
         - Speaker cards with circular avatar (using attachment image or initials fallback), speaker name (`<h3>`), professional title/organization, and external profile link with accessible new-tab notice.
     - Sticky sidebar (`<aside class="mmd-content-grid__sidebar">`):
       - **Event Quick Info Card (`.mmd-event-meta-card`)**: Key-value summary of Date, Time range, Format, Venue / Meeting link, Cost, and secondary registration CTA button.
       - **Table of Contents Widget**: Reusable partial `templates/partials/aside-toc.php`.
       - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
   - **Bottom Section**:
     - Universal Related Posts partial `templates/partials/related-posts.php` automatically queries and outputs "Related Events" matching shared `tech_tag` terms in a 3-column card grid.
3. **`wp-content/themes/qp-newsletter/functions.php`**:
   - Registered `event-featured` and `event_featured` 16:9 responsive image styles in `mmd_alter_responsive_image_styles_list`.
4. **`wp-content/themes/qp-newsletter/templates/displays/post--related.php`**:
   - Enhanced to support ACF `start_date` formatting and `location_format` badge ("In-Person" or "Online") for `event` post type cards in related grids.

---

## 2. Compilation & Verification Evidence

### 2.1 Asset Compilation
Run `npm run tw-build` inside `wp-content/themes/qp-newsletter`:
- Tailwind CSS v4 compiled successfully (`gutenberg/build/css/style.min.css` and `style-editor.min.css`).

### 2.2 Standards Greps (Definition of Done)
Ran from theme directory (`wp-content/themes/qp-newsletter`):
1. Hardcoded hex colors in `single--event.php`: **0 violations**.
2. Arbitrary `rem`/`var` in class attributes: **0 violations**.
3. `.wp-block-heading` selector violations: **0 violations**.

### 2.3 PHP Debug & Log Checks
- Ran PHP template execution across test event posts: **0 notices, 0 warnings**.
- Verified `wp-content/debug.log`: **Clean (0 errors)**.
- Checked DDEV web container logs: **Clean (no PHP errors)**.

### 2.4 DDEV Test Post Verifications
- **Reviewer One-Time-Login:**  
  `https://qp-newsletter.ddev.site/wp-login.php?user_id=1&one_time_login_token=43135c7d20cd2777a6562107e4145ecf6500cd20`

- **Test URL 1 (Online Event with Speakers & Registration):**  
  `https://qp-newsletter.ddev.site/events/docker-security-best-practices/` (Post ID: 100)
  - **HTTP Status:** `200 OK`.
  - **Format Badge:** `Online (Virtual)` badge in green tone.
  - **Cost Badge:** `Cost: Free` badge.
  - **Status Badge:** `Upcoming` badge.
  - **Date/Time:** `October 9, 2026 · 3:56 AM – 5:26 AM` with calendar icon and `<time>` tag.
  - **Primary CTA:** "Register for Event" button linking to `https://example.com/register/docker-security-best-practices`.
  - **Technology Tags:** `#Docker` linking to `/tag/docker/`.
  - **Speakers Section:** "Featured Speakers" (`<h2>`) with speaker card for Priya Nandakumar, avatar image (ID 101), Staff Platform Engineer title, and profile link.
  - **Sidebar:** Event Details card with Date, Time, Format, Online Event link, Admission (Free), and secondary registration CTA button.
  - **Related Events:** Renders "Related Events" section displaying Post ID 103 ("Laravel + React Q4 Local Mixer") with "In-Person" badge and formatted date.

- **Test URL 2 (In-Person Event with Physical Venue & Multiple Speakers):**  
  `https://qp-newsletter.ddev.site/events/laravel-react-q4-local-mixer/` (Post ID: 103)
  - **HTTP Status:** `200 OK`.
  - **Format Badge:** `In-Person` badge in blue tone.
  - **Cost Badge:** `Cost: $15 AUD` badge.
  - **Status Badge:** `Upcoming` badge.
  - **Date/Time:** `October 16, 2026 · 3:56 AM – 6:56 AM`.
  - **Location:** "The Foundry Coworking Space, 88 Wentworth Avenue, Surry Hills NSW 2010" rendered in hero meta bar and preserved line breaks in sidebar card.
  - **Technology Tags:** `#Laravel` and `#React` linking to their respective tag archives.
  - **Speakers Section:** 2 speaker cards rendering Lena Vogel (avatar 104) and Marcus Webb (avatar 105) with titles and links.
  - **Sidebar:** Event Details card displaying complete in-person details.
  - **Related Events:** Renders "Related Events" displaying Post ID 100 ("Docker Security Best Practices") with "Online" badge and `October 9, 2026` date.

---

## 3. Accessibility & Responsive Verification Check
- [x] **Semantic Landmarks**: `<article class="mmd-single-event">`, `<nav aria-label="Breadcrumb">`, `<aside aria-label="Event navigation and details">`, `<section class="mmd-event-speakers">`.
- [x] **Heading Hierarchy**: Strictly sequential heading tree with zero skipped levels:
  - `H1: [Event Title]`
  - `H2: [Content Headings / Agenda]`
  - `H2: Featured Speakers` -> `H3: [Speaker Name]`
  - `H3: Event Details` (sidebar)
  - `H3: Share This Event` (sidebar)
  - `H2: Related Events` -> `H3: [Related Event Title]`
- [x] **Interactive Elements & Focus**: All CTA buttons, tags, speaker links, and share buttons feature visible `:focus-visible` outline rings with offset.
- [x] **External Links**: Registration and profile links include accessible screen-reader text `<span class="sr-only"> (opens in a new tab)</span>` and `rel="noopener noreferrer"`.
- [x] **Date Semantics**: Dates and time ranges encapsulated in valid `<time datetime="...">` tags.
- [x] **Zero CLS**: Featured banners and speaker avatars include responsive aspect ratios and explicit dimensions.
- [x] **Mobile Responsiveness (375px/768px/1440px)**: 2-column desktop layout (8-col main + 4-col sticky sidebar) collapsing gracefully to single-column on mobile with touch-accessible buttons (>= 44px height).
