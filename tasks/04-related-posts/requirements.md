# Task Requirements: Universal Related Posts Section (T4)

**Status:** DONE
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** SOW Section 2.4 (Templates & Displays) & ROADMAP.md Phase 4
**Figma Reference:** [Figma Node 4592:1893 - Related Posts Section](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4592-1893&m=dev)

---

## 1. Scope & Objective
Design and implement a reusable, modular **Related Posts Section** component that automatically renders on all single post templates across the site, including:
- **News** (`single--news.php`)
- **Resources** (`single--resource.php`)
- **Events** (`single--event.php`)
- **Newsletters** (`single--newsletter.php`)

The section dynamically queries and renders related items of the same post type via `WP_Query`, displaying a context-aware section heading (`Related <Post Type Plural/Singular>`, e.g., **"Related News"**, **"Related Resources"**, **"Related Events"**, **"Related Newsletters"**) and a clean 3-column card grid matching the Figma design reference.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)
- [ ] Read `skills/mmd-display-mode/SKILL.md` (display templates `templates/displays/post--related.php` and `render_content_by_display()`).
- [ ] Read `skills/mmd-partials/SKILL.md` (reusable template partials `templates/partials/related-posts.php`).
- [ ] Read `skills/mmd-ris/SKILL.md` (render card images via `mmd_render_image_by_ris()`, never direct `wp_get_attachment_image`).
- [ ] Read `skills/mmd-theming/SKILL.md` & `skills/mmd-tailwindcss-v2/SKILL.md` (theme tokens, zero hardcoded hex colors, zero arbitrary `rem`/`var` classes).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic HTML, heading outline `<h2>` for section, `<h3>` for cards, accessible full-card links, WCAG 2.2 AA).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (test on DDEV, computed styles, responsive at 360/768/1440, clean `debug.log`).

---

## 3. Architecture & File Structure

### 3.1 Template Partial
- **Path:** `templates/partials/related-posts.php`
- **Inclusion:** Included at the bottom of each single template before `get_footer()`, e.g.:
  ```php
  get_template_part('templates/partials/related-posts');
  ```
- **Context Awareness:** Automatically discovers the current post ID (`get_the_ID()`) and post type (`get_post_type()`). Accepts optional override parameters through `$args` (e.g. `'post_type'`, `'title'`, `'posts_per_page'`).

### 3.2 Display Mode Card Template
- **Path:** `templates/displays/post--related.php`
- **Invoked via:** `mmd_render_content_by_display($post_id, 'related', $options)`
- **Post-Type Specific Overrides (Optional):** Supports automatic resolution to `post--related--{post_type}.php` (e.g. `post--related--event.php` for event-specific date/location displays) falling back to `post--related.php`.

### 3.3 Integration Sites
- `templates/displays/single--news.php`: Append the related posts section below the main article body.
- Future single templates (`single--resource.php`, `single--event.php`, `single--newsletter.php`): Hook or include the same partial.

---

## 4. Query & Logic Specifications

### 4.1 WP_Query Strategy
The query must be optimized, relevant, and robust:
1. **Post Type:** Match current post's post type (`$post_type = get_post_type()`).
2. **Exclusion:** Always exclude the currently viewed post (`'post__not_in' => [$current_post_id]`).
3. **Count:** Limit to 3 posts (`'posts_per_page' => 3`).
4. **Status:** Only published posts (`'post_status' => 'publish'`).
5. **Relevance / Fallback:**
   - Attempt to query posts sharing the same taxonomy terms:
     - Primary: Shared `tech_tag` terms if present.
     - Secondary: Shared category terms (`news_category`, `resource_category`, `event_category`, etc.).
   - If fewer than 3 posts are found by taxonomy match, fill or fallback to the most recent published posts of the same post type.
6. **Zero-Result Safety:** If no other posts exist for that post type, the entire section must return empty (no empty container or broken heading).

### 4.2 Dynamic Heading Label
The section heading must dynamically resolve based on the post type object labels:
- `news` → **"Related News"**
- `resource` → **"Related Resources"**
- `event` → **"Related Events"**
- `newsletter` → **"Related Newsletters"**
- Fallback: `Related ` . `$post_type_object->labels->name`

---

## 5. Visual & Layout Constraints (Figma Node 4592:1893)

### 5.1 Section Styling
- **Background:** Light surface (`bg-neutral-light-grey` / `#F3F4F7` or `bg-white` with a clean hairline border `border-t border-neutral-grey-200`).
- **Spacing:** Generous vertical padding (`py-12 lg:py-16`).
- **Container:** Standard container width (`container mx-auto px-6 max-w-[1200px]`).
- **Heading:** Section heading (`<h2>`) styled with `text-heading-2` / `font-extrabold text-primary-navy-900 mb-8 lg:mb-10`.

### 5.2 Card Grid Layout
- **Desktop (>= 992px / lg):** 3-column grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`).
- **Tablet (768px - 991px):** 2-column grid.
- **Mobile (< 768px):** 1-column vertically stacked cards.

### 5.3 Card Component Design (`post--related.php`)
- **Container:** Semantic `<article class="mmd-card ...">` with rounded corners (`rounded-2xl`), subtle border (`border border-neutral-grey-150/60`), white card background (`bg-white`), and smooth hover transition.
- **Aspect Ratio & Image:**
  - Ratio wrapper: 16:9 (`aspect-video`) or 3:2 responsive image crop.
  - Image loaded via `mmd_render_image_by_ris($thumbnail_id, 'news-card' /* or matching RIS preset */, ['w-full', 'h-full', 'object-cover', 'rounded-t-2xl'])`.
  - Placeholder / fallback styling when thumbnail is missing.
- **Badge / Category:** Small uppercase pill/badge (`text-xs font-bold uppercase tracking-wider text-primary bg-primary-blue-50 px-2.5 py-0.5 rounded-full`) indicating category or term.
- **Card Title (`<h3>`):** Clear, legible heading styled with `text-lg font-bold text-primary-navy-900 group-hover:text-primary transition-colors`.
- **Date & Meta:** Published date (`<time>`) and optional read time or event details formatted cleanly.
- **Excerpt / Summary:** 1–2 line trimmed excerpt or summary text (`text-sm text-neutral-grey-700`).
- **Full-Area Clickable Overlay:** Overlay link pattern per `mmd-display-mode` (`<a href="..." class="absolute inset-0 z-10" aria-label="Read more about {Title}"></a>`) so the entire card is an intuitive touch/click target.

---

## 6. Accessibility Criteria (WCAG 2.2 AA)
- [ ] **Heading Outline:** Section title is an `<h2>`; each card title is an `<h3>`. No skipped levels.
- [ ] **Accessible Card Links:** Card link has an explicit accessible name (`aria-label="Read {Title}"` or `aria-label="View {Title}"`).
- [ ] **Non-text Contrast:** Card borders and hover states maintain >= 3:1 contrast against adjacent backgrounds.
- [ ] **Keyboard Nav & Focus Rings:** Cards display visible `:focus-visible` outline rings with offset on Tab focus.
- [ ] **Zero Cumulative Layout Shift:** Featured images include explicit width/height and responsive ratio constraints.

---

## 7. Verification Steps (DDEV)
1. **News Single Verification:**
   - Create at least 4 news posts with shared tags/categories.
   - Navigate to `https://qp-newsletter.ddev.site/news/news-1/`.
   - Verify the "Related News" section displays exactly 3 related cards excluding the current post.
2. **Resource / Event / Newsletter Verification:**
   - Verify query behavior for `resource`, `event`, and `newsletter` post types.
   - Confirm section titles flip to "Related Resources", "Related Events", etc.
3. **Empty Query Verification:**
   - Test a post type with 0 other posts; confirm the entire section is omitted gracefully without PHP notices or empty containers.
4. **Standards & Greps Verification:**
   - Run DoD greps for hardcoded hex, arbitrary `rem`/`var`, and `.wp-block-heading`.
   - Check `debug.log` for zero errors/warnings.
