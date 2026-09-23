# Task Requirements: Global Navigation Footer (O2)

**Status:** DONE
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)
**SOW Reference:** Section 2.4.1 & ROADMAP.md Task O2

---

## 1. Scope & Objective
Design and implement the **Global Navigation Footer** for the platform. The footer must represent a highly polished, responsive, and accessible layout that integrates dynamic navigation, administrative content fields, and partner logos.

The footer must render:
- **Our Partners Logo Section**: A dynamic section rendering partner logos uploaded via an ACF Repeater field under Theme Settings. Each partner logo must support responsive image loading (via RIS) and an optional external website link.
- **Acknowledgement of Country**: A WYSIWYG-managed section to display the cultural recognition of traditional land owners.
- **Cite This Website**: A WYSIWYG-managed citation text area to allow easy copying/referencing of the platform.
- **Dynamic Navigation Menu**: The standard footer menu registered under the `footer-menu` theme location.
- **Legal & Privacy Links**: A WYSIWYG-managed list of inline links (e.g., Privacy Policy, Terms & Conditions, Disclaimer) rendered cleanly alongside the copyright statement.

---

## 2. Visual & Architectural Constraints

### 2.1 Colors & Theme Tokens (From `color.css`)
- **Footer Background**: Deep Navy (`var(--color-primary-navy-900)` / `#1B365D`) background. All text must flip to white/light grey (`var(--color-neutral-white)` / `#FFFFFF` or `var(--color-neutral-grey-300)`).
- **Divider Lines**: Subtle borders using `--color-neutral-grey-700` or equivalent token suitable for dark backgrounds.
- **Interactive Links**: Light grey (`var(--color-neutral-grey-100)`) transitioning to primary brass (`var(--color-primary-brass-300)` / `#EDC372`) on hover/focus.

### 2.2 Layout & Structure
- Divided into logical rows/columns:
  - **Top Row**: Partner Logos wrapped in a responsive flex/grid container, centered and separated by appropriate spacing.
  - **Middle Row**: Multi-column layout containing:
    - **Column 1**: Acknowledgement of Country (WYSIWYG)
    - **Column 2**: Cite This Website (WYSIWYG)
    - **Column 3**: Footer Navigation Menu (`footer-menu` registered menu)
  - **Bottom Row**: Copyright text & Privacy Policy/Legal Links (WYSIWYG links rendered inline).
- Standard container constraints (`container mx-auto px-6`) to match header alignment.

### 2.3 Admin Controls (Extend `group_theme_settings_fields.json`)
The following new fields must be added to the **Theme Settings** ACF field group (`group_theme_settings`):
1. **Footer Partners** (`footer_partners` - Repeater):
   - **Partner Logo** (`partner_logo` - Image Array, preview: medium)
   - **Partner Link** (`partner_link` - URL)
2. **Acknowledgement of Country** (`footer_acknowledgement` - WYSIWYG):
   - Simple visual editor with basic formatting.
3. **Cite This Website** (`footer_cite_website` - WYSIWYG):
   - Simple visual editor with basic formatting.
4. **Privacy Policy Links** (`footer_privacy_policy_links` - WYSIWYG):
   - Simple editor allowing inline links.

---

## 3. Detailed Acceptance Criteria

### 3.1 Markup & Semantics (HTML5)
- [ ] Wrapper uses semantic `<footer role="contentinfo" class="mmd-site-footer bg-primary-navy-900 text-neutral-white">`.
- [ ] Contains a semantic `<nav role="navigation" aria-label="Footer">` element for footer links.
- [ ] Responsive partner images must render via the custom wrapper helper `mmd_render_image_by_ris()` or matching RIS utilities to prevent layout shift.

### 3.2 Responsive Behavior & Layout
- **Desktop (>= 992px / lg)**:
  - [ ] Middle row displays as a balanced 3-column layout (`grid grid-cols-1 md:grid-cols-3 gap-8`).
  - [ ] Bottom row aligns Copyright to the left, and Privacy Links to the right.
- **Mobile (< 992px)**:
  - [ ] Vertically stack all sections (`flex-col`) with logical spacing (`gap-8`).
  - [ ] Text and links should be centered or cleanly aligned for mobile readability.

### 3.3 Dynamic Partner Logos
- [ ] Loop through the `footer_partners` repeater field dynamically.
- [ ] If an optional link is provided, wrap the logo image in an `<a>` tag with `target="_blank"` and `rel="noopener noreferrer"`.
- [ ] Gracefully hide the section if no partners are added.

### 3.4 Accessibility (WCAG 2.2 AA Checklist)
- [ ] **Tab Order**: Ensure footer links tab in logical visual order.
- [ ] **ARIA**: Partner links must have explicit screen-reader labels if the image `alt` text is empty, or the image `alt` must accurately describe the logo (e.g., `alt="[Partner Name] Logo"`).
- [ ] **Contrast**: All text must maintain a minimum contrast ratio of 4.5:1 against the footer background.

---

## 4. Verification Plan
1. **Admin Config**: Verify that "Footer Partners", "Acknowledgement of Country", "Cite This Website", and "Privacy Policy Links" fields are active under **Theme Settings** in WP Admin.
2. **Visual Layout (1440px)**: Confirm the multi-column alignment, clean margins, and background colors.
3. **Mobile View (376px / 768px)**: Verify seamless vertical stacking and appropriate touch targets for footer links.
4. **Interactive States**: Verify hover and keyboard focus outlines on all partner logos and footer links.
5. **Console & Logs**: Ensure there are no PHP warnings/notices in `debug.log` and no console errors.
