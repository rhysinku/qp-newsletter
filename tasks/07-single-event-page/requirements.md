# Task Requirements: Single Event Page Template (T2)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** PROJECT-SPEC.md §4.3 (Event Field Group), SOW §3.2 / ROADMAP.md Phase 4 Task T2  

---

## 1. Scope & Objective

Design and implement the **Single Event Page Template** (`templates/displays/single--event.php`) for the IT Community Learning Platform. This template handles full-page routing and display for the `event` custom post type via WordPress `single.php`.

The template must adhere to the design system and architectural pattern proven in `single--news.php` and `single--resource.php`:
1. **Hero Banner Section**:
   - Breadcrumb navigation (`[seopress_breadcrumbs]` with accessible semantic HTML fallback).
   - Badge row:
     - **Location Format Badge**: "In-Person" or "Online (Virtual)".
     - **Entry Cost Badge**: e.g., "Free", "$15 AUD".
     - **Event Status Badge**: "Upcoming" vs. "Past Event" (calculated dynamically against current timestamp).
   - Event Title (`<h1>`).
   - Meta bar & Action row:
     - Event Date & Time range (formatted start and end times with calendar and clock icons).
     - Event Location/Format indicator (map pin icon for in-person venue, video icon for virtual webinar).
     - Primary Action CTA button: **"Register for Event"** / **"Book Ticket"** linking to `registration_url` (or `virtual_meeting`), opening in a new tab with screen-reader text.
   - Associated **Technology Tags** (`tech_tag`) badge list (`#Docker`, `#React`, etc.).
   - Featured Event Banner / Cover Image rendered responsively using `mmd_render_image_by_ris()`.
2. **Main Two-Column Content Grid (`.mmd-content-grid`)**:
   - **Main Article Column (`.mmd-content-grid__main`)**:
     - Rich event description and schedule rendered via `the_content()` styled with `.mmd-content`, `.mmd-toc-content`, and `.mod--theme--light`.
     - **Featured Speakers Section** (rendered when `speakers` repeater has entries):
       - Section heading: `<h2>Event Speakers</h2>` (discoverable by Table of Contents).
       - Responsive speaker cards displaying avatar image, speaker name (`<h3>`), professional title/company, and external profile link (LinkedIn/website).
   - **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
     - **Event Quick Info Card (`.mmd-event-meta-card`)**: Overview card displaying Event Date, Time Range, Format, Venue / Meeting details, Cost, and secondary registration CTA button.
     - **Table of Contents Widget**: Reusable partial `templates/partials/aside-toc.php`.
     - **Social Share Widget**: Reusable partial `templates/partials/aside-share.php`.
3. **Universal Related Posts Section**:
   - Reusable partial `templates/partials/related-posts.php` displaying "Related Events" based on shared `tech_tag` taxonomy terms.
4. **Related Posts Card Update**:
   - Update `templates/displays/post--related.php` to handle `event` post type cards cleanly (displaying formatted `start_date` and `location_format` badge).

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-single-template/SKILL.md` (template anatomy, data preparation block, router resolution via `templates/displays/single--event.php`).
- [ ] Read `skills/mmd-ris/SKILL.md` (render banner and speaker avatars via `mmd_render_image_by_ris()`, never `wp_get_attachment_image*`).
- [ ] Read `skills/mmd-theming/SKILL.md` & `skills/mmd-tailwindcss-v2/SKILL.md` (theme tokens, zero hardcoded hex colors, zero arbitrary `rem`/`var` classes).
- [ ] Read `skills/mmd-partials/SKILL.md` (reuse `aside-toc.php`, `aside-share.php`, and `related-posts.php`).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic HTML, heading hierarchy H1 -> H2 -> H3, keyboard navigation, visible focus indicators, screen-reader external link text).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verify on DDEV, computed styles proof, responsive at 360/768/1440, clean `debug.log`).

---

## 3. Advanced Custom Fields (ACF) Specification & Display Mapping

The template must read and comprehensively display all fields defined in `wp-content/themes/qp-newsletter/acf-json/group_event_fields.json`:

| ACF Field Label | Field Name | Field Type | Stored Value / Format | Visual & Functional Display Treatment |
|---|---|---|---|---|
| **Start Date** | `start_date` | `date_time_picker` | `Y-m-d H:i:s` (e.g. `2026-10-09 03:56:07`) | Rendered in hero meta bar and sidebar info card.<br>• Display format: `F j, Y` (date) and `g:i a` (time).<br>• Encapsulated in semantic `<time datetime="...">`.<br>• Used to calculate whether the event is "Upcoming" or "Past Event". |
| **End Date** | `end_date` | `date_time_picker` | `Y-m-d H:i:s` (e.g. `2026-10-09 05:26:07`) | Rendered with start date to show complete event duration (e.g., `October 9, 2026 · 3:56 AM – 5:26 AM`).<br>• If on the same calendar day, displays unified date with start-to-end time range.<br>• If multi-day, displays start date to end date. |
| **Event Location Format** | `location_format` | `select` | `in_person`<br>`online` | Rendered as a pill badge in hero and in sidebar info card.<br>• `in_person`: "In-Person" badge (`bg-primary-blue-50 text-primary border-primary/20`).<br>• `online`: "Online (Virtual)" badge (`bg-system-green-50 text-system-green-700 border-system-green-700/20`). |
| **Entry Cost** | `entry_cost` | `text` | e.g. "Free", "$15 AUD", "Invite Only" | Rendered as a pill badge in hero badges row and in sidebar card.<br>• If empty, defaults or omits cleanly.<br>• Styled with brass/neutral accent (`bg-primary-brass-300/20 text-primary-navy-900 border-primary-brass-400/40`). |
| **Physical Venue** | `physical_venue` | `textarea` | Text / address string (multi-line) | **Conditional on `location_format === 'in_person'`**.<br>• Rendered in sidebar info card with pin icon and preserved line breaks (`nl2br(esc_html(...))`).<br>• Rendered as venue summary in hero meta bar. |
| **Virtual Meeting** | `virtual_meeting` | `url` | URL string (e.g. `https://zoom.us/j/...`) | **Conditional on `location_format === 'online'`**.<br>• Rendered in sidebar info card as direct join link.<br>• Secondary/Primary action if registration URL is not set. |
| **Registration URL** | `registration_url` | `url` | URL string (e.g. `https://example.com/register/...`) | **Primary Action CTA**:<br>• Hero CTA: **"Register for Event"** / **"Book Ticket"** with external link icon.<br>• `target="_blank" rel="noopener noreferrer"`.<br>• Accessible notice: `<span class="sr-only"> (opens in a new tab)</span>`.<br>• Duplicate CTA button rendered in sidebar quick info card. |
| **Speakers** | `speakers` | `repeater` | Array of sub-rows (`name`, `title`, `url`, `avatar`) | Rendered as a dedicated **Featured Speakers** section in the main column:<br>• `name`: Speaker full name (`<h3>`).<br>• `title`: Job title / organization.<br>• `url`: Profile / LinkedIn / website link (`target="_blank" rel="noopener noreferrer"`).<br>• `avatar`: Attachment ID rendered via `mmd_render_image_by_ris` (or circular avatar wrapper) with fallback initials/icon.<br>• Omitted gracefully if repeater is empty. |
| **Technology Tags** | `tech_tag-terms` / `tech_tag` | `taxonomy` (checkbox) | Term IDs / `WP_Term` array | Rendered in hero banner as interactive tag badges (`#Docker`, `#React`) linking to `/tag/{slug}/`. |
| **Featured Banner** | `_thumbnail_id` | Core Thumbnail | Attachment ID (int) | Rendered via `mmd_render_image_by_ris($thumbnail_id, 'news-featured', ['w-full', 'h-auto', 'aspect-video', 'object-cover'], $title, wrap_figure: false, eager: true)` in 16:9 container with `rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100`. |

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
        <a href="/events/" class="hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2">Events</a>
      </li>
      <li aria-hidden="true" class="text-neutral-grey-300">/</li>
      <li aria-current="page" class="text-neutral-grey-900 font-bold truncate max-w-[280px] sm:max-w-none">
        [Event Title]
      </li>
    </ol>
  </nav>
  ```

### 4.2 Hero Banner Area (`.mmd-single-event__hero`)
- **Background**: Light surface (`bg-neutral-light-grey pt-8 pb-12 border-b border-neutral-grey-200/60`).
- **Container**: `container mx-auto px-6 max-w-[1200px]`.
- **Badges Row**:
  - **Location Format Badge**: Pill badge indicating format ("In-Person" or "Online (Virtual)").
  - **Entry Cost Badge**: Pill badge indicating cost (e.g. "Free" or "$15 AUD").
  - **Status Indicator**: Pill badge denoting "Upcoming Event" (or "Past Event" if `end_date` is earlier than `time()`).
- **Title (`<h1>`)**:
  - Typography: `text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-navy-900 tracking-tight leading-tight mt-2 mb-6 font-primary`.
- **Meta Bar & Action Row**:
  - Left / Info Area:
    - **Date & Time**: Calendar icon + Formatted date (`October 9, 2026`) and time duration (`3:56 AM – 5:26 AM`).
    - **Location**: Format icon (Map Pin or Video/Monitor) + summary ("Online Webinar" or physical address snippet).
  - Right / Primary CTA:
    - Prominent button **"Register for Event"** / **"Book Ticket"**:
      - Styling: `inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-navy-900 text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2`.
      - Includes external link icon, `target="_blank" rel="noopener noreferrer"`, and `<span class="sr-only"> (opens in a new tab)</span>`.
- **Technology Tags Bar**:
  - Horizontal list of tags (`#Docker`, `#React`) with subtle borders and hover states linking to `/tag/{slug}/`.
- **Featured Banner Image**:
  - RIS-rendered 16:9 container with `mt-8 overflow-hidden rounded-2xl lg:rounded-3xl shadow-md border border-neutral-grey-200/50 bg-neutral-grey-100`.

### 4.3 Two-Column Content Grid (`.mmd-content-grid`)
- **Main Article Content Column (`.mmd-content-grid__main`)**:
  - Event description and schedule rendered via `the_content()`.
  - Typography classes: `.mmd-content.mmd-toc-content.mod--theme--light.min-w-0`.
  - **Speakers Section** (`.mmd-event-speakers`):
    - Placed directly below `the_content()` when speakers repeater is populated.
    - Heading: `<h2 class="text-2xl font-extrabold text-primary-navy-900 mt-10 mb-6 font-primary">Featured Speakers</h2>`.
    - Grid layout: `grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6`.
    - Speaker Card (`.mmd-speaker-card`):
      - Container: `bg-white rounded-2xl border border-neutral-grey-200/80 p-5 shadow-sm flex items-start gap-4`.
      - Avatar: `w-14 h-14 rounded-full overflow-hidden flex-shrink-0 bg-neutral-grey-100 border border-neutral-grey-200 object-cover`.
      - Content:
        - Name: `<h3 class="text-base font-bold text-primary-navy-900 font-primary">...</h3>`.
        - Title: `<p class="text-xs text-neutral-grey-600 mt-0.5">...</p>`.
        - Link: External link button or icon with screen-reader text (`<span class="sr-only"> (opens speaker profile in a new tab)</span>`).
- **Sticky Sidebar Column (`.mmd-content-grid__sidebar`)**:
  - Sticky container on desktop: `lg:sticky lg:top-28 flex flex-col gap-6 min-w-0`.
  - Semantic `<aside aria-label="Event navigation and details">`.
  - **Event Quick Info Card (`.mmd-event-meta-card`)**:
    - Styling: `bg-white rounded-2xl border border-neutral-grey-200/80 p-6 shadow-sm flex flex-col gap-4`.
    - Heading: `<h3 class="text-base font-bold text-primary-navy-900 pb-3 border-b border-neutral-grey-200/60 font-primary">Event Details</h3>`.
    - Key-value metadata rows (`<dl class="space-y-3.5 text-xs">`):
      - **Date:** Formatted start date (and end date if multi-day).
      - **Time:** Start time – End time.
      - **Format:** In-Person / Online.
      - **Venue / Location:** Full physical venue address with preserved line breaks or Virtual Meeting indicator.
      - **Cost:** Entry cost (e.g. Free, $15 AUD).
    - Secondary Action Button (Registration URL / Join link) duplicate for convenient scrolling.
  - **Table of Contents Widget**:
    - Included via `get_template_part('templates/partials/aside-toc');`.
    - Automatically discovers headings inside `.mmd-toc-content`.
  - **Share Buttons Widget**:
    - Included via `get_template_part('templates/partials/aside-share', null, ['url' => $permalink, 'title' => $title]);`.

### 4.4 Related Events Section
- Included directly above footer via:
  ```php
  get_template_part('templates/partials/related-posts');
  ```
- Automatically resolves to "Related Events" heading and renders 3 related event cards matching shared `tech_tag` terms.

---

## 5. Responsive Behavior & Viewport Breakpoints

- **Desktop (>= 992px / lg)**:
  - Hero registration button aligns horizontally with event meta.
  - Content grid renders as two columns: 8-column main content (`.mmd-content-grid__main`) + 4-column sticky sidebar (`.mmd-content-grid__sidebar`).
  - Sidebar sticks at `top-28`.
  - Speakers render in a 2-column grid.
- **Tablet (768px - 991px)**:
  - Content grid stacks with main content followed by sidebar widgets.
  - Speakers render in a 2-column grid.
- **Mobile (< 768px)**:
  - Single-column layout throughout.
  - Hero registration button expands to full width (`w-full sm:w-auto`) for minimum 44px touch target.
  - Badges and meta items wrap neatly without horizontal overflow.
  - Speaker cards stack in a single column.

---

## 6. Accessibility Criteria (WCAG 2.2 AA)

- [ ] **Semantic Structure**: `<article class="mmd-single-event">`, `<nav aria-label="Breadcrumb">`, `<aside aria-label="Event navigation and details">`.
- [ ] **Heading Outline**: Exactly one `<h1>` for event title; sections use `<h2>`; speaker cards and sidebar widgets use `<h3>`. Zero skipped heading levels.
- [ ] **External Links**: Registration and speaker links must declare `target="_blank" rel="noopener noreferrer"` and screen-reader text `<span class="sr-only"> (opens in a new tab)</span>`.
- [ ] **Date & Time Semantics**: Start and end dates must use valid `<time datetime="...">` tags.
- [ ] **Color Contrast**: All badge labels, meta text, and buttons must achieve at least 4.5:1 contrast against their backgrounds.
- [ ] **Keyboard Navigation**: All interactive elements (registration buttons, tags, speaker links, TOC links, share buttons) must display visible `:focus-visible` outline rings with offset.
- [ ] **Zero Cumulative Layout Shift**: Featured image and speaker avatars include explicit dimensions and aspect ratios.

---

## 7. Verification Plan (DDEV)

1. **Verify Online Event with Registration & Speakers (Post ID 100)**:
   - Test against Post ID 100 ("Docker Security Best Practices").
   - Confirm "Online (Virtual)" format badge, "Free" entry cost badge, and "Upcoming Event" status render.
   - Confirm Start Date and Time range display accurately.
   - Confirm "Register for Event" CTA links to `https://example.com/register/docker-security-best-practices` with `(opens in a new tab)`.
   - Confirm Speaker card for Priya Nandakumar renders with avatar (ID 101), title ("Staff Platform Engineer, Nimbus Cloud"), and external profile link.
   - Confirm `#Docker` tag links to `/tag/docker/`.
   - Confirm Sidebar "Event Details" card displays matching metadata.
2. **Verify In-Person Event with Physical Venue & Multiple Speakers (Post ID 103)**:
   - Test against Post ID 103 ("Laravel + React Q4 Local Mixer").
   - Confirm "In-Person" format badge and "$15 AUD" entry cost badge render.
   - Confirm physical venue address ("The Foundry Coworking Space, 88 Wentworth Avenue, Surry Hills NSW 2010") renders cleanly in sidebar and meta area.
   - Confirm multiple speaker cards render (Lena Vogel and Marcus Webb) with respective avatars (104, 105), titles, and profile links.
   - Confirm `#Laravel` and `#React` tags render.
3. **Verify Table of Contents & Social Share**:
   - Confirm TOC dynamically renders headings found in `the_content()` and speaker section.
   - Confirm Social Share links populate with the event URL and title.
4. **Verify Universal Related Events**:
   - Confirm "Related Events" section renders at the bottom displaying related event cards.
   - Confirm `post--related.php` outputs event date and format badge properly.
5. **Standards & Code Quality Greps**:
   - Run DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.
   - Verify `debug.log` is clean of notices and warnings.
