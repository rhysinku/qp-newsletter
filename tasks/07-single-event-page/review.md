# Task Review: Single Event Page Template (T2)

**Status:** DONE  
**Reviewer:** Gemini CLI (Reviewer)  
**Author/Implementer:** Gemini CLI (Implementer)  
**SOW Reference:** PROJECT-SPEC.md §4.3 (Event Field Group), SOW §3.2 / ROADMAP.md Phase 4 Task T2  

---

## 1. Review Summary

I have reviewed the code implementation, responsive layout, dynamic ACF field rendering, accessibility semantics, and compiled assets for the **Single Event Page Template (T2)**. The implementation satisfies all functional, architectural, and visual requirements:

- **Template Routing & Single Page Resolution**:
  - Implemented `templates/displays/single--event.php`, which seamlessly resolves single `event` post type items through WordPress `single.php`.
- **Comprehensive ACF Field Display**:
  - `start_date` and `end_date`: Formatted cleanly as event date and time range (e.g. `October 9, 2026 · 3:56 AM – 5:26 AM`) using `date_i18n()` and semantic `<time datetime="...">` tags.
  - Status indicator: Dynamically computes "Upcoming" vs. "Past Event" badge by comparing event timestamps against `current_time('timestamp')`.
  - `location_format`: Renders "In-Person" (`bg-primary-blue-50 text-primary`) or "Online (Virtual)" (`bg-system-green-50 text-system-green-700`) badge in the hero row and in the sidebar card.
  - `entry_cost`: Displays admission badge (e.g. "Cost: Free", "Cost: $15 AUD") styled with brand brass accent.
  - `physical_venue`: Preserves line breaks (`nl2br(esc_html(...))`) in the sidebar card and provides a venue summary in the hero meta bar with map-pin icon.
  - `virtual_meeting` and `registration_url`: Renders primary CTA button **"Register for Event"** / **"Join Meeting"** with external link icon, `target="_blank" rel="noopener noreferrer"`, and screen-reader notice `<span class="sr-only"> (opens in a new tab)</span>`. Duplicated in sidebar card.
  - `speakers` repeater: Renders a dedicated **Featured Speakers** section directly below `the_content()` in a responsive 2-column grid. Displays speaker avatars, names (`<h3>`), titles/organizations, and profile links.
  - `tech_tag`: Interactive tag badges (`#Docker`, `#Laravel`, `#React`) linking to `/tag/{slug}/`.
  - `_thumbnail_id`: Rendered via `mmd_render_image_by_ris($thumbnail_id, 'event-featured', ...)` with 16:9 aspect ratio and rounded corners.
- **Visual & Layout Alignment**:
  - Two-column responsive content grid (`.mmd-content-grid`) on desktop (8-col main + 4-col sticky sidebar) collapsing gracefully to single-column on mobile.
  - Sidebar contains an Event Details card (`.mmd-event-meta-card`) with metadata summary and secondary registration button, Table of Contents partial (`aside-toc.php`), and Social Share buttons (`aside-share.php`) explicitly titled "Share This Event".
  - Universal related posts partial `templates/partials/related-posts.php` automatically queries and outputs "Related Events" in a 3-column card grid.
- **Related Cards Enhancement**:
  - Updated `templates/displays/post--related.php` to support ACF `start_date` formatting and `location_format` badge for event cards in related grids.
- **Independent DDEV Re-Verification**:
  - Tested Post 100 (Online Webinar: "Docker Security Best Practices"): Confirmed "Online (Virtual)" badge, "Cost: Free", "Upcoming", "October 9, 2026 · 3:56 AM – 5:26 AM", "Register for Event" CTA button, Priya Nandakumar speaker card with avatar, and Related Events grid.
  - Tested Post 103 (In-Person Mixer: "Laravel + React Q4 Local Mixer"): Confirmed "In-Person" badge, "Cost: $15 AUD", physical venue (*The Foundry Coworking Space*), multiple speaker cards (Lena Vogel and Marcus Webb), and Related Events grid.
  - Verified HTTP responses: Both single page URLs return `HTTP/1.1 200 OK`.
  - Semantic landmark and heading checks: Strict sequential `H1 -> H2 -> H3` outline with zero skipped levels.
  - Clean error logs: `wp-content/debug.log` clean (0 PHP notices/warnings), web container logs clean.
  - DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.

---

## 2. Verdict & Checklists
**Verdict:** APPROVED (PASS)

- [x] **Template Resolution**: Single `event` items properly route to `templates/displays/single--event.php`.
- [x] **ACF Data Integrity**: Complete handling for `start_date`, `end_date`, `location_format`, `entry_cost`, `physical_venue`, `virtual_meeting`, `registration_url`, and `speakers`.
- [x] **Responsive Image Styles (RIS)**: Featured images rendered via `mmd_render_image_by_ris` with 16:9 aspect ratio and zero CLS.
- [x] **Layout & Responsiveness**: 2-column desktop layout with sticky sidebar (`top-28`); clean single-column stacking on tablet and mobile.
- [x] **Accessibility (WCAG 2.2 AA)**: Semantic structure (`<article>`, `<nav>`, `<aside>`, `<time>`), accessible names, external link notices (`sr-only`), visible focus rings (`:focus-visible`), and high contrast ratios.
- [x] **Code Quality**: Zero hardcoded hex colors, zero arbitrary `rem`/`var` class attributes, zero `.wp-block-heading` selectors, and clean logs.

---

## 3. Commit Execution

**Target Files:**
- `tasks/07-single-event-page/requirements.md`
- `tasks/07-single-event-page/results.md`
- `tasks/07-single-event-page/review.md`
- `wp-content/themes/qp-newsletter/functions.php`
- `wp-content/themes/qp-newsletter/templates/displays/post--related.php`
- `wp-content/themes/qp-newsletter/templates/displays/single--event.php`

**Commit Message:**
```text
feat(event): implement single event page template with dynamic ACF displays

- Route single event posts through templates/displays/single--event.php
- Render hero with location format badge, entry cost, and upcoming status
- Display date and time duration with semantic time tags and registration CTA
- Render responsive featured banner via mmd_render_image_by_ris with 16:9 aspect ratio
- Add dedicated Featured Speakers section with speaker avatars, titles, and profile links
- Implement sticky sidebar with event info card, TOC, and social share partials
- Integrate universal related posts partial for related events
- Support start_date and location_format in post--related.php
- Register event-featured RIS responsive image style in functions.php
- Document task requirements, results, and review under tasks/07-single-event-page/
```
