# Task Requirements: Global Navigation Header (O1)

**Status:** DONE
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** Section 2.4.1 & ROADMAP.md Task O1

---

## 1. Scope & Objective
Design and implement the **Global Navigation Header** for the IT Community Learning Platform. The header must represent a highly polished, floating pill-style layout with a modern rounded aesthetic overlaying a soft background, responsive, highly accessible, and utilizing the existing theme color tokens in the codebase.

The header must render:
- **ACF Theme Settings Logo**: A custom logo dynamically uploaded via an ACF Theme Options field (`header_logo`). If no logo is uploaded, it must gracefully fall back to displaying the site name.
- **Dynamic Navigation Menu**: The primary menu registered under the `header-menu` theme location, supporting multi-level dropdowns (Mega Menu or List variants).
- **ACF Header CTA Button**: A custom editable Call-to-Action button (e.g., "Support us") managed dynamically via ACF Options fields (`header_cta_label` and `header_cta_link`), styled as a prominent rounded button on the right side.
- **Mobile Menu Drawer**: A functional hamburger button that slides out a mobile navigation panel with smooth, hardware-accelerated transitions and collapsible submenus using carets.
- **Sticky Transition Effects**: Smooth sticky transitions (hide on scroll down, show on scroll up) using `requestAnimationFrame` throttling.

---

## 2. Visual & Architectural Constraints

### 2.1 Colors & Theme Tokens (From `color.css`)
- **Header Pill Background**: Clean solid white (`var(--color-neutral-white)` / `#FFFFFF`).
- **Main Text Links**: Dark charcoal (`var(--color-neutral-grey-900)` / `#1D1D1D`) with active states using the primary brand blue (`var(--color-primary)` / `#064B8D`).
- **Accent/CTA Button**: Primary Navy (`var(--color-primary-navy-900)` / `#1B365D`) or Primary Blue (`var(--color-primary)` / `#064B8D`) background, with white text (`var(--color-neutral-white)`).
- **Borders & Dividers**: Subtle hairline borders (`var(--mmd-hairline)`).
- **Shadows**: Elegant floating box-shadow (`shadow-md` or `shadow-lg`) to create depth.

### 2.2 Layout & Pill Shape
- The header is styled as a **floating pill container** (`mx-auto`, `rounded-full` or `rounded-xl`, with custom margins to keep it suspended off the page boundaries, matching the Figma look: `top-4`, `w-[calc(100%-2rem)]` or within a max-width wrapper).
- Rounded padding and custom z-index (`z-50`) to sit above all content.
- Responsive breakpoint: Desktop navigation is `lg:flex` (>= 992px), mobile layout with hamburger icon is used below `lg`.

### 2.3 Logo and CTA Admin Controls
- Fields must be registered under a **Theme Settings Options Page** (`menu_slug => 'theme-settings'`) with a new field group (`group_theme_settings`):
  - **Header Logo** (`header_logo`): Image field (returns Image Array).
  - **Header CTA Label** (`header_cta_label`): Text field (e.g. "Support us").
  - **Header CTA Link** (`header_cta_link`): URL or Link field.

---

## 3. Detailed Acceptance Criteria

### 3.1 Markup & Semantics (HTML5)
- [ ] Wrapper uses semantic `<header role="banner" class="mmd-site-header">`.
- [ ] Contains an accessible skip-link: `<a class="mmd-skip-link sr-only focus:not-sr-only" href="#main">Skip to content</a>`.
- [ ] Contains a semantic `<nav role="navigation" aria-label="Primary">` element.
- [ ] Brand logo links back to the home URL with a clean screen-reader helper description (`aria-label`).

### 3.2 Responsive Behavior & Layout
- **Desktop (>= 992px / lg)**:
  - [ ] Rendered as a horizontal flex-row pill containing Logo, Central Menu list, and CTA Button.
  - [ ] Hover and focus states on navigation links must use theme colors (`--color-primary`) with subtle underline or transition indicators.
  - [ ] Multi-level dropdowns are positioned absolute relative to parent items, using CSS `opacity`, `visibility`, and `transform` transitions.
- **Mobile (< 992px)**:
  - [ ] Hamburger toggle button on the right side.
  - [ ] Clicking the hamburger opens a slide-over/fade-in menu drawer overlay (`#mobile-navigation`).
  - [ ] Lock scrolling (`overflow: hidden` on `body`) and activate backdrop overlay while the mobile drawer is open.
  - [ ] Provide collapsible submenu toggle carets for items with children to ensure smooth mobile navigation.

### 3.3 Sticky Header Interactions
- [ ] Fixed/Absolute top-offset positioning.
- [ ] **Scroll Down**: Header translates upwards to hide smoothly (`-translate-y-full` or equivalent relative offset).
- [ ] **Scroll Up**: Header translates back to show smoothly (`translate-y-0`).
- [ ] High-performance listening throttled via `requestAnimationFrame` with an 8px scroll tolerance.

### 3.4 Accessibility (WCAG 2.2 AA Checklist)
- [ ] **Keyboard Nav**: Fully traversable via the `Tab` key.
- [ ] **Aria States**: Hamburger uses toggled `aria-expanded="true/false"` and `aria-controls="mobile-navigation"`.
- [ ] **Focus Contrast**: Interactive elements must feature highly visible outline rings on focus.
- [ ] **Zero CLS**: Preserve appropriate empty page margins at the top of the body to guarantee no Cumulative Layout Shift.

---

## 4. Verification Plan
1. **Theme Options Config**: Confirm the logo and CTA ACF fields are registered and editable under **Theme Settings** in the WordPress admin panel.
2. **Desktop View (1440px)**: Verify the floating rounded pill look, drop shadows, hover dropdowns, and dynamic logo/CTA loading.
3. **Mobile View (376px / 768px)**: Verify hamburger toggling, scroll lock on body, backdrop overlay click closes the drawer, and collapsible caret submenus.
4. **Keyboard Walkthrough**: Tab through all links and buttons to ensure logical focus flow and visible focus indicators.
5. **Console & Logs**: Confirm zero Javascript console errors and zero WP `debug.log` notices.
