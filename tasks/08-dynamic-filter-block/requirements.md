# Task Requirements: Dynamic Filter Block (T8)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** SOW §2.4 (Templates & Displays), ROADMAP.md Phase 3 Task O4 (Content Grid & Unified Tag Filtering Section), and PROJECT-SPEC.md §3 & §5  
**Figma References:**  
- **Desktop Filter Block:** [Figma Node 4597:1676 - Dynamic Filter Section](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4597-1676&m=dev)  
- **Mobile Filter Overview:** [Figma Node 1404:8939 - Mobile Dynamic Filter View](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=1404-8939&m=dev)  
- **Mobile Filter Drawer:** [Figma Node 1413:8971 - Mobile Filter Flyout Drawer](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=1413-8971&m=dev)  

---

## 1. Scope & Objective

Design and implement the **Dynamic Filter Block** (`mmd/dynamic-filter`) — a custom Server-Side Rendered (SSR) Gutenberg block powered by **FacetWP** and **TailwindCSS**. 

Since CPT archives are disabled (`has_archive => false`) in favor of static Gutenberg hub pages (`/news/`, `/resources/`, `/events/`, `/newsletters/`), this block serves as the core dynamic listing engine for the entire platform. Content editors can drop this block onto any standard page, configure the post type(s) and query criteria in the sidebar, and deliver an interactive, faceted search-and-filter experience.

### Key Objectives:
1. **Reuse Existing Card Component**: Cards rendered within the listing grid must reuse the existing, proven `post--related` display template (`templates/displays/post--related.php` invoked via `mmd_render_content_by_display($post_id, 'related')`). This ensures 100% visual consistency with the Related Posts section built in Task 04.
2. **FacetWP Code Registration**: All facets must be registered via PHP code in `includes/facetwp.php` (never via the admin GUI) to remain version-controlled and portable across environments.
3. **Desktop Two-Column Layout (Figma 4597:1676)**:
   - **Sticky Sidebar (Left)**: Collapsible accordion facet groups, checkboxes with custom checkmark styling, clear-all action.
   - **Main Content (Right)**: Top control bar (keyword search, result count, sort dropdown, active selection pills) and a responsive 3-column card grid wrapped in `<div class="facetwp-template">`.
4. **Mobile Slide-In Drawer Layout (Figma 1404:8939 & 1413:8971)**:
   - On viewports `< 1024px` (`lg`), the sidebar collapses into a hidden drawer.
   - An interactive "Filter" button with sliders icon (`#mmd-mobile-filter-open`) triggers a full-height slide-in filter drawer with backdrop overlay.
   - Includes accessible focus trapping, body scroll lock, close button (`#mmd-mobile-filter-close`), and a sticky drawer footer with "Clear all" and "Show Results" buttons.
5. **Gutenberg SSR Integration**:
   - Registered under category `mmd-grid-blocks`.
   - Rich Inspector controls for post type selection (`news`, `resource`, `event`, `newsletter`, `blog`), posts per page, default sort order, and toggleable facets.
   - Editor canvas preview rendered via `<ServerSideRender />`.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-gutenberg/SKILL.md` (SSR block architecture: `block.json`, `index.js`, `edit.js`, `inspector.js`, `render.php`).
- [ ] Read `skills/mmd-facetwp/SKILL.md` (PHP facet registration, built-in a11y, accordion toggles, mobile drawer, counter suppression, active selection enhancement).
- [ ] Read `skills/mmd-display-mode/SKILL.md` (card rendering via `mmd_render_content_by_display($post_id, 'related')`).
- [ ] Read `skills/mmd-ris/SKILL.md` (responsive image sizing using preset `card--related`).
- [ ] Read `skills/mmd-theming/SKILL.md` & `skills/mmd-tailwindcss-v2/SKILL.md` (theme tokens, zero hardcoded hex, zero arbitrary `rem`/`var` classes).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic HTML, heading outline H2 -> H3, ARIA expanded/controls, mobile drawer focus trap & Escape key listener, WCAG 2.2 AA).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verify on DDEV, computed styles proof, responsive at 360/768/1440, clean `debug.log`).

---

## 3. Architecture & File Structure

```
wp-content/themes/qp-newsletter/
├── includes/
│   └── facetwp.php                      # FacetWP configuration, facet registrations, a11y hooks
├── gutenberg/
│   └── blocks/
│       └── dynamic-filter/              # Source directory for custom Gutenberg block
│           ├── block.json               # SSR block schema & attribute definitions
│           ├── index.js                 # Block registration entry
│           ├── edit.js                  # Editor canvas UI with ServerSideRender
│           ├── inspector.js             # Sidebar controls (post types, per-page, toggles)
│           ├── render.php               # Server-side PHP template for frontend output
│           └── preview.png              # Block preview thumbnail for editor inserter
├── assets/
│   ├── css/
│   │   └── blocks/
│   │       └── dynamic-filter.css       # FacetWP custom styling (checkboxes, drawer, transitions)
│   └── js/
│       └── dynamic-filter.js            # Mobile drawer open/close, accordion toggles, a11y scripts
```

---

## 4. FacetWP Specification (`includes/facetwp.php`)

All facets must be code-registered using the `facetwp_facets` filter. Never configure facets manually through WP Admin.

### 4.1 Accessibility & Defaults Setup
```php
// Enable FacetWP built-in a11y (adds roles, aria-* and keyboard support)
add_filter('facetwp_load_a11y', '__return_true');
```

### 4.2 Code-Registered Facets List
| Facet Name | Label | Type | Data Source | Details & Configuration |
|---|---|---|---|---|
| `search` | Search | `search` | `post_title` / `post_content` | Placeholder: "Search by keyword...", instant AJAX typing search. |
| `tax_tech_tag` | Technology | `checkboxes` | `tax/tech_tag` | Multi-select checkboxes, `ghosts => 'yes'`, `preserve_ghosts => 'yes'`, `orderby => 'count'`. |
| `tax_news_category` | Category | `checkboxes` | `tax/news_category` | Multi-select checkboxes for news hub. |
| `tax_resource_category`| Category | `checkboxes` | `tax/resource_category` | Multi-select checkboxes for resources hub. |
| `tax_event_category` | Category | `checkboxes` | `tax/event_category` | Multi-select checkboxes for events hub. |
| `tax_newsletter_cat` | Category | `checkboxes` | `tax/newsletter_category` | Multi-select checkboxes for newsletters hub. |
| `content_type` | Content Type | `checkboxes` | `post_type` | Used when querying multiple post types on a unified hub. |
| `results_sort` | Sort | `sort` | N/A | Options: Newest first (`post_date DESC`), Oldest first (`post_date ASC`), Title A–Z (`post_title ASC`), Title Z–A (`post_title DESC`). |
| `results_pager` | Pagination | `pager` | N/A | Type: `numbers`. Must carry all `$pager_defaults` (PHP 8 warning safety). |
| `results_count` | Result Count | `pager` | N/A | Type: `counts`. Must carry all `$pager_defaults`. Singular: "Showing 1 result", Plural: "Showing [upper] of [total] results". |

### 4.3 Pager Defaults Definition (PHP 8 Protection)
```php
$pager_defaults = [
  'inner_size'          => 2,
  'dots_label'          => '…',
  'prev_label'          => '← Prev',
  'next_label'          => 'Next →',
  'count_text_singular' => 'Showing 1 result',
  'count_text_plural'   => 'Showing [upper] of [total] results',
  'count_text_none'     => 'No results found',
  'load_more_text'      => 'Load more',
];
```

### 4.4 Hide Facet Result Counters & Style Checkboxes
Per `mmd-facetwp` §6, suppress `.facetwp-counter` so raw counts like `(4)` do not break clean design:
```css
.facetwp-counter { display: none !important; }
```

### 4.5 Keyboard Accessibility for Selection Pills
Inject custom JS via `facetwp_scripts` to ensure `.facetwp-selection-value` elements have `tabindex="0"`, `role="button"`, and trigger on Enter/Space.

---

## 5. Visual & Layout Specifications

### 5.1 Desktop Layout (>= 1024px / lg) — Figma 4597:1676
- **Outer Wrapper**: `<section class="mmd-dynamic-filter py-12 lg:py-16 bg-neutral-light-grey">`
- **Inner Container**: `<div class="container mx-auto px-4 sm:px-6 lg:px-8">`
- **Two-Column Flex/Grid Layout**:
  - `flex flex-col lg:flex-row gap-8 lg:gap-12 items-start`

#### A. Sidebar Filter Column (`<aside class="mmd-filter-sidebar ...">`)
- **Width**: `w-full lg:w-72 xl:w-80 flex-shrink-0`
- **Positioning**: Sticky desktop sidebar (`lg:sticky lg:top-28`)
- **Container Styling**: `bg-white rounded-2xl border border-neutral-grey-200/80 p-6 shadow-sm`
- **Sidebar Header**:
  - Heading: `<h2 class="text-xl font-extrabold text-primary-navy-900 font-primary">Filters</h2>`
  - Action: `<button type="button" class="facetwp-clear-all-btn text-xs font-bold text-primary hover:text-primary-navy-900 uppercase tracking-wider transition-colors" onclick="FWP.reset();">Clear all</button>`
- **Accordion Facet Groups (`.mmd-facet-group`)**:
  - Border separator between groups (`border-b border-neutral-grey-150/60 py-4 last:border-b-0 last:pb-0`).
  - Toggle Button (`.mmd-facet-toggle`):
    - `flex items-center justify-between w-full py-2 text-left font-bold text-primary-navy-900 font-primary focus-visible:outline-2 focus-visible:outline-primary`
    - `aria-expanded="true"`, `aria-controls="facet-content-{name}"`
    - Label text (e.g. "Technology", "Category")
    - Chevron Icon: Decorative SVG with `aria-hidden="true"`, rotates 180° when expanded (`group-[.is-open]:rotate-180 transition-transform duration-200`).
  - Content Panel (`.mmd-facet-content`):
    - `id="facet-content-{name}"`
    - Contains `facetwp_display('facet', '{name}')`.
    - Custom styled checkboxes: Accent color `--color-primary`, rounded corners (`rounded`), clean label spacing.

#### B. Main Content Section (`<main class="mmd-filter-main ...">`)
- **Width**: `flex-1 min-w-0 w-full`
- **Top Bar Controls (`.mmd-filter-controls`)**:
  - **Search Input Row**:
    - Full-width search bar or integrated input field: `facetwp_display('facet', 'search')`.
    - Styled with search icon (`mmd_sprite('search')`), clean border, and rounded-xl styling.
  - **Meta Bar (Results Count & Sort)**:
    - `flex flex-wrap items-center justify-between gap-4 py-4 mb-2`
    - Left: Results count (`facetwp_display('facet', 'results_count')` - styled as `text-sm font-medium text-neutral-grey-600`) and Mobile Filter Trigger Button (hidden on desktop).
    - Right: Sort control (`facetwp_display('facet', 'results_sort')` - styled dropdown with custom arrow).
  - **Active Selection Pills Row**:
    - `facetwp_display('selections')`
    - Output styled as pills: `bg-primary-blue-50 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-bold flex items-center gap-1.5`.
    - Includes remove icon (`×`) and "Clear all filters" tag when > 1 filter is active.

#### C. Card Grid Listing (`<div class="facetwp-template ...">`)
- **Container**: MUST have class `facetwp-template` for FacetWP AJAX replacement.
- **Grid Layout**: `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8`
- **Card Rendering**:
  - Loop through `$query->have_posts()` / `the_post()`.
  - For each post, execute:
    ```php
    echo mmd_render_content_by_display(get_the_ID(), 'related');
    ```
  - Reuses the existing `templates/displays/post--related.php` card display template:
    - Aspect-ratio thumbnail with RIS `card--related`.
    - Dynamic post type / category badge.
    - Title (`<h3>`) with line-clamp-2.
    - Excerpt summary.
    - Footer with date and "Read More" arrow.
    - Accessible full-card overlay link (`<a class="absolute inset-0 z-10">`).

#### D. Empty State UI
When `!$query->have_posts()`, render a clean fallback card inside `facetwp-template`:
- Icon: Search/file icon (`mmd_sprite('file')` or search SVG).
- Heading: `<h3 class="text-lg font-bold text-primary-navy-900 mt-4 mb-2">No matching results found</h3>`
- Description: `<p class="text-sm text-neutral-grey-600 mb-6">Try adjusting or clearing your filters to find what you are looking for.</p>`
- Reset Action: `<button type="button" class="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-bold shadow hover:bg-primary-navy-900 transition-colors" onclick="FWP.reset();">Reset All Filters</button>`

#### E. Pagination Section
- Centered container below grid: `mt-10 lg:mt-14 flex justify-center`
- `facetwp_display('facet', 'results_pager')`
- Styled numbers, active page pill (`bg-primary text-white`), and accessible next/prev buttons.

---

### 5.2 Mobile View & Slide-In Filter Drawer (< 1024px) — Figma 1404:8939 & 1413:8971

#### A. Mobile Filter Trigger Button (Figma 1404:8939)
- Placed prominently above the card grid on mobile:
  ```html
  <button type="button"
          id="mmd-mobile-filter-open"
          aria-expanded="false"
          aria-controls="mmd-filter-drawer"
          class="lg:hidden inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-neutral-grey-300 bg-white text-sm font-bold text-primary-navy-900 shadow-sm hover:bg-neutral-grey-50 focus-visible:outline-2 focus-visible:outline-primary">
    <svg class="w-4 h-4 fill-none stroke-current" aria-hidden="true">
      <use href="<?php echo esc_url(mmd_sprite('sliders-horizontal')); ?>"></use>
    </svg>
    <span>Filters</span>
    <span class="mmd-mobile-filter-count hidden px-2 py-0.5 rounded-full text-xs bg-primary text-white font-bold"></span>
  </button>
  ```

#### B. Flyout Drawer Panel (Figma 1413:8971)
- **Overlay & Wrapper**:
  ```html
  <div id="mmd-filter-drawer"
       class="hidden fixed inset-0 z-50 lg:static lg:z-auto lg:block"
       role="dialog"
       aria-modal="true"
       aria-labelledby="mmd-drawer-title">
    
    <!-- Backdrop Overlay (Mobile only) -->
    <div class="mmd-drawer-backdrop fixed inset-0 bg-neutral-navy-900/60 backdrop-blur-xs transition-opacity lg:hidden" aria-hidden="true"></div>

    <!-- Drawer Surface -->
    <div class="mmd-drawer-panel fixed inset-y-0 right-0 z-10 w-full max-w-sm sm:max-w-md bg-white shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:w-full lg:max-w-none lg:shadow-none lg:transform-none">
      
      <!-- Drawer Header (Mobile only) -->
      <div class="flex items-center justify-between px-6 py-4 border-b border-neutral-grey-200 lg:hidden">
        <h2 id="mmd-drawer-title" class="text-lg font-bold text-primary-navy-900 font-primary">Filters</h2>
        <button type="button"
                id="mmd-mobile-filter-close"
                class="p-2 text-neutral-grey-500 hover:text-primary-navy-900 focus-visible:outline-2 focus-visible:outline-primary rounded-lg"
                aria-label="Close filters">
          <svg class="w-5 h-5 fill-none stroke-current" aria-hidden="true">
            <use href="<?php echo esc_url(mmd_sprite('x')); ?>"></use>
          </svg>
        </button>
      </div>

      <!-- Drawer Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-6 lg:p-0">
        <!-- Facet Accordion Groups -->
      </div>

      <!-- Drawer Sticky Footer (Mobile only) -->
      <div class="p-4 border-t border-neutral-grey-200 bg-white flex items-center gap-3 lg:hidden">
        <button type="button"
                class="flex-1 py-3 px-4 rounded-xl border border-neutral-grey-300 text-sm font-bold text-neutral-grey-700 text-center hover:bg-neutral-grey-50"
                onclick="FWP.reset();">
          Clear all
        </button>
        <button type="button"
                id="mmd-mobile-filter-apply"
                class="flex-1 py-3 px-4 rounded-xl bg-primary text-white text-sm font-bold text-center shadow hover:bg-primary-navy-900">
          Show Results
        </button>
      </div>

    </div>
  </div>
  ```

#### C. Mobile Drawer JS Controller Behavior
- **Open Action**:
  - Removes `hidden` class from drawer.
  - Sets `aria-expanded="true"` on open trigger.
  - Adds `overflow-hidden` to `document.body` to prevent background scroll.
  - Traps keyboard focus inside `#mmd-filter-drawer`.
- **Close Action**:
  - Triggered by Close button, backdrop click, Escape key press, or "Show Results" button.
  - Adds `hidden` class, sets `aria-expanded="false"`, restores body scroll, and returns focus to the open button.

---

## 6. Gutenberg Block Attributes & Editor Schema (`block.json`)

```json
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "api_version": 3,
  "name": "mmd/dynamic-filter",
  "title": "Dynamic Filter Listing",
  "description": "Faceted search and filter listing powered by FacetWP.",
  "category": "mmd-grid-blocks",
  "icon": "filter",
  "supports": {
    "anchor": true,
    "customClassName": true
  },
  "attributes": {
    "postTypes": {
      "type": "array",
      "default": ["news"]
    },
    "postsPerPage": {
      "type": "number",
      "default": 9
    },
    "columns": {
      "type": "string",
      "default": "xl:grid-cols-3"
    },
    "enableSearch": {
      "type": "boolean",
      "default": true
    },
    "enableSort": {
      "type": "boolean",
      "default": true
    },
    "sidebarTitle": {
      "type": "string",
      "default": "Filters"
    },
    "activeTaxonomies": {
      "type": "array",
      "default": ["tech_tag", "news_category"]
    },
    "preview": {
      "type": "boolean",
      "default": false
    }
  },
  "example": {
    "attributes": {
      "preview": true
    }
  },
  "editorScript": "file:./index.js",
  "render": "file:./render.php"
}
```

### Inspector Controls (`inspector.js`)
- **Content Query Settings**:
  - `SelectControl` or checkbox group for `postTypes` (choose from `news`, `resource`, `event`, `newsletter`, `blog`).
  - `RangeControl` for `postsPerPage` (e.g. 6 to 24, default 9).
  - `SelectControl` for `columns` layout (2-column or 3-column desktop grid).
- **Interface Toggles**:
  - `ToggleControl` for "Enable Keyword Search Bar".
  - `ToggleControl` for "Enable Sort Dropdown".
  - `TextControl` for "Sidebar Title" (default: "Filters").

---

## 7. Accessibility Criteria (WCAG 2.2 AA)

- [ ] **Semantic Structure**: Use `<section>`, `<aside aria-label="Search filters">`, `<main>`, `<article>` for cards.
- [ ] **Heading Outline**:
  - Section title or Filters title is `<h2>`.
  - Post cards are `<h3>`.
  - Zero skipped heading levels.
- [ ] **Mobile Drawer ARIA & Focus Management**:
  - Open button toggles `aria-expanded="true/false"` and targets `aria-controls="mmd-filter-drawer"`.
  - Drawer has `role="dialog"`, `aria-modal="true"`, and `aria-labelledby="mmd-drawer-title"`.
  - Focus is trapped within the drawer while open, and pressing the `Escape` key immediately closes the drawer.
- [ ] **Accordion Group Toggles**:
  - Toggles are `<button type="button">` with `aria-expanded` and `aria-controls="facet-content-{name}"`.
  - Decorative chevrons carry `aria-hidden="true"`.
- [ ] **Selection Pills**:
  - Each active filter tag has `role="button"`, `tabindex="0"`, and explicit `aria-label="Remove {Filter} filter"`.
- [ ] **Touch Targets**:
  - All interactive buttons, checkboxes, and pills maintain a minimum 44x44px touch target on mobile viewports.
- [ ] **Contrast Compliance**:
  - All text, labels, badges, and focus rings maintain >= 4.5:1 text contrast and >= 3:1 non-text boundary contrast.

---

## 8. Verification Plan (DDEV)

1. **FacetWP Plugin Verification**:
   - Activate plugin via `ddev wp plugin activate facetwp`.
   - Run `ddev wp eval "echo function_exists('facetwp_display') ? 'active' : 'inactive';"` and confirm active.
2. **Build Custom Block**:
   - Run `npm run build` in `wp-content/themes/qp-newsletter/` to compile block scripts and CSS.
   - Confirm `gutenberg/build/blocks/dynamic-filter/` is generated.
3. **Editor Setup & Configuration**:
   - Open WordPress Admin page for News (`/wp-admin/post.php?post=16&action=edit`).
   - Insert the `Dynamic Filter Listing` block.
   - Test Inspector settings: toggle search, sort, change posts per page, and select `news` post type.
   - Save the page.
4. **Desktop Frontend Verification (`/news/`)**:
   - View `/news/` at 1440px desktop width.
   - Verify 2-column layout: Sticky filter sidebar on the left, card grid on the right.
   - Verify cards use the `post--related.php` card layout (thumbnail, category badge, reading time, line-clamp title, date, "Read More").
   - Test keyword search: Type a query and verify AJAX update without full page reload.
   - Test checkboxes: Click category and technology tag checkboxes; confirm URL updates and posts filter accordingly.
   - Test active filter tags: Confirm pills appear, clicking `×` removes the filter, and "Clear all" resets all facets.
   - Test sort dropdown: Confirm switching sort order updates cards immediately.
   - Test pagination: Confirm clicking page numbers navigates results smoothly.
5. **Mobile Drawer Verification (375px / 768px)**:
   - Resize viewport to 375px.
   - Confirm sidebar is hidden and the "Filters" trigger button is visible.
   - Click "Filters": Confirm drawer slides in with backdrop and body scrolling is locked.
   - Select facet options inside drawer.
   - Test Escape key: Confirm drawer closes and returns focus to the filter button.
   - Click "Show Results": Confirm drawer closes and updated results appear.
6. **Standards & Code Quality Greps**:
   - Run DoD greps: 0 hardcoded hex colors, 0 arbitrary `rem`/`var` classes, 0 `.wp-block-heading` selector violations.
   - Check `ddev logs -s web` and `wp-content/debug.log` for zero PHP notices, warnings, or errors.
