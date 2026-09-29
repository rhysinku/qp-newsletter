# Task Requirements: People Card Block (10)

**Status:** NEEDS REVIEW  
**Assignee:** Gemini CLI (Implementer)
**Author:** Gemini CLI (Planner)  
**SOW Reference:** SOW §2.4, ROADMAP.md Phase 2 Molecule M3 (People / Speaker Profile Card)  
**User Feedback / Directives:**  
- Use native Tailwind grid (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-{cols} gap-6`).  
- **No row/spacing classes**: Do not use `mmd-spacing`, `mmd-padding-y`, or `mmd-row`.  
- **Columns setting**: Use `@marameodesign/components` `GridColumns.InspectorControl` with `choices={["2 Columns", "3 Columns", "4 Columns"]}` under the "Layout" sidebar panel (as pictured in `clipboard-1790582831344.png`), replacing `RangeControl`. Default: `lg:cols-2`.  
- Equal-height card items with bottom-aligned CTA buttons (`h-full flex flex-col justify-between`).  
- Visual design confirmed by screenshot `clipboard-1790328804046.png`.  
- Column row selection UI confirmed by screenshot `clipboard-1790582831344.png`.  
**Figma References:**  
- **Parent Collection / Section:** [Figma Node 69:7141](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=69-7141&m=dev)  
- **Variant With Image:** [Figma Node 110:5716](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=110-5716&m=dev)  
- **Variant Without Image:** [Figma Node 4763:7258](https://www.figma.com/design/S93LO8asy4FcRRUeKoU0Nc/-UI--The-Centre-for-Sex---Gender-Equity-in-Health---Medicine?node-id=4763-7258&m=dev)  

---

## 1. Scope & Objective

Design and build the custom Gutenberg **People Card Block** (`mmd/people-card`) for the QP NewsLetter / Centre for Sex & Gender Equity theme. This block serves as a flexible, standalone and nested profile card used to introduce committee members, speakers, key leaders, and staff across the website.

The block must be implemented as a **Client-Side Rendered (CSR)** Gutenberg block composed cleanly from the theme's `@marameodesign/components` library. It must support both variants identified in Figma:
1. **With Image**: Circular portrait avatar image at the top (`rounded-full`), followed by name, role, organization/affiliation, and a "View Profile" link with a chevron icon.
2. **Without Image**: Clean, text-only profile presentation without awkward gaps or empty image placeholders when no avatar is uploaded or when `hideImage` is toggled.

### Key Constraints:
- **Design Reference**: Match the Figma typography, proportions, and spacing while using the project's **existing theme color tokens** and design system.
- **Section Block Compatibility**: Must be context-aware when placed inside layout blocks like `mmd/section--1col`, `mmd/section--2cols`, `mmd/column`, or `mmd/grid--cards`, seamlessly inheriting and reacting to parent background colors and themes (`mod--theme--light` / `mod--theme--dark`).

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-gutenberg/SKILL.md` (CSR architecture, `AttributeObject`, component composition, `preview.png`).
- [ ] Read `skills/mmd-theming/SKILL.md` (theme class inheritance from parent context, `mod--theme--light` vs `mod--theme--dark` text/contrast flips).
- [ ] Read `skills/mmd-tailwindcss-v2/SKILL.md` (use project tokens via `@apply` and theme utilities, zero hardcoded hex values, zero arbitrary rem values).
- [ ] Read `skills/mmd-ris/SKILL.md` (image sizing, 1:1 square crop preset for circular avatar).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (semantic `<article>`, heading hierarchy, screen-reader text for "View Profile about [Name]", decorative image handling).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verification on DDEV, logged-in browser check, computed styles check, responsive 360/768/1440).

---

## 3. Visual & Architectural Specifications

### 3.1 Component Anatomy & Visual Hierarchy
```
┌──────────────────────────────────────────────┐
│             [ 120px Circular Avatar ]        │ (Optional / With Image)
│                                              │
│               Person Full Name               │ (H3 - font-bold, text-xl)
│             Job Title / Position             │ (font-medium, text-base)
│          Organization / Affiliation          │ (text-sm, text-neutral-grey-500)
│                                              │
│               View Profile >                 │ (Link button + chevron arrow)
└──────────────────────────────────────────────┘
```

1. **Card Container (`.mmd-people-card`)**:
   - Card surface with rounded corners (`rounded-[16px]`), padding (`p-6` / `24px`), and centered content layout (`flex flex-col items-center text-center`).
   - Sits on a light neutral card surface (e.g. `bg-neutral-light-grey` / `bg-neutral-white` with subtle border `border border-neutral-grey-200` or `--mmd-hairline`).
2. **Circular Avatar (`.mmd-people-card__image`)**:
   - Size: `120px × 120px` (or `size-[120px]`), `rounded-full`, `overflow-hidden`.
   - Responsive image with 1:1 aspect ratio (`whratio => '1:1'`).
   - Image rendered with `object-cover object-center`.
   - Hidden completely if `hideImage` is active or if no image is uploaded.
3. **Person Name (`.mmd-people-card__name`)**:
   - Semantic Heading (default `<h3>`, level selectable in Inspector).
   - Styled with `font-bold text-[20px] md:text-[22px] leading-snug`.
   - In light theme: dark text (`text-neutral-grey-900` / `#0F172A`).
   - In dark theme: white/light text (`text-neutral-white`).
4. **Role / Position (`.mmd-people-card__role`)**:
   - Styled with `font-semibold text-[15px] md:text-[16px] text-neutral-grey-700 mt-1`.
5. **Organization / Affiliation (`.mmd-people-card__organization`)**:
   - Styled with `font-normal text-[13px] md:text-[14px] text-neutral-grey-500 mt-1 max-w-[280px]`.
6. **Action CTA Link (`.mmd-people-card__cta`)**:
   - Arrow variant button (`mod--variant--arrow`).
   - Label defaults to "View Profile".
   - Includes accessible chevron right icon.
   - Includes screen-reader context for WCAG AA: `<span class="sr-only">about {Name}</span>`.
   - Supports opening in new tab if external link.

---

## 4. Section Block Compatibility & Context Awareness

The block must seamlessly operate in three modes:
1. **Inside `mmd/section--1col` or `mmd/section--2cols`**:
   - Inherits `context.blockTheme` and `context.bgColor` via `usesContext: ["blockTheme", "bgColor"]`.
   - When inside a dark section (`mod--theme--dark`):
     - Card background automatically switches to a dark surface (`bg-primary-navy-900` or semi-transparent overlay) with white text.
   - When inside a light section (`mod--theme--light`):
     - Card background uses clean light surface (`bg-neutral-white` or `bg-neutral-light-grey`).
2. **Inside `mmd/grid--cards`**:
   - Works as an allowed child block within grid layouts (`allowedBlocks` updated in `grid--cards` to include `mmd/people-card`).
3. **Standalone / Root Level**:
   - Automatically grouped by `includes/auto-section-wrapper.php` if placed at root level on landing pages.
   - Provides a standalone background color control in Inspector for individual card customization.

---

## 5. Technical Implementation Details

### 5.1 File Structure
The block is structured as a two-block compound architecture (Container Grid + Child Item):
```
wp-content/themes/qp-newsletter/gutenberg/blocks/
├── people-card-grid/             # Container Block (mmd/people-card-grid)
│   ├── block.json                # Block metadata, category: mmd-generic-blocks
│   ├── schema.js                 # Preview + GridColumns attribute composition
│   ├── index.js                  # Block registration
│   ├── edit.js                   # InnerBlocks container with admin selection bar
│   ├── inspector.js              # Layout panel with GridColumns.InspectorControl
│   ├── save.js                   # Native Tailwind grid markup persistence
│   ├── style.scss                # Grid gap and styling rules
│   ├── editor.scss               # Clickable editor padding and hover outline
│   └── preview.png               # Block inserter preview
└── people-card-item/             # Child Item Block (mmd/people-card-item)
    ├── block.json                # "parent": ["mmd/people-card-grid"]
    ├── schema.js                 # Heading, Image, Text, Button composition
    ├── index.js                  # Block registration
    ├── edit.js                   # Inline editable card canvas UI
    ├── inspector.js              # Name level, hide image, CTA controls
    ├── save.js                   # Saved HTML markup for individual card
    ├── style.scss                # Card tokens, border, button styling
    ├── editor.scss               # Canvas editing fixes (white text on primary button)
    └── ris.php                   # 1:1 circular avatar crop preset
```

### 5.2 Attributes (Schema)

#### `mmd/people-card-grid` (Container):
Compose using `@marameodesign/components`:
- `Preview.addAttributes(attrObject)`
- `GridColumns.addAttributes(attrObject)`
- Default columns override: `attrObject.updateDefaultValue("columns", "lg:cols-2")`
- Supported column presets:
  - `"lg:cols-2"`: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6`
  - `"lg:cols-3"`: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`
  - `"lg:cols-4"`: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`

#### `mmd/people-card-item` (Card Item):
Compose using `@marameodesign/components`:
- `Preview.addAttributes(attrObject)`
- `Heading.addAttributes(attrObject)` (Person Name, default level 3)
- `Image.addAttributes(attrObject)` (Person Portrait)
- `Text.addAttributes(attrObject, "Role")` (Position / Role)
- `Text.addAttributes(attrObject, "Org")` (Organization / Subtitle)
- `Button.addAttributes(attrObject)` (CTA Link & Label)
- Custom Attributes:
  - `hideImage`: `{ type: "boolean", default: false }`

### 5.3 RIS Preset (`ris.php`)
```php
<?php
add_filter('mmd_alter_responsive_image_styles_list', function ($ris) {
  $ris['people-avatar'] = [
    'sizes' => '120px',
    'whratio' => '1:1',
  ];
  return $ris;
});
```

---

## 6. Detailed Acceptance Criteria

### 6.1 Editor Functionality
- [ ] Block appears in the Gutenberg block inserter under **MMD Generic Blocks**.
- [ ] Block inserter displays the `preview.png` preview.
- [ ] **Grid Column Layout Control**:
  - `mmd/people-card-grid` Inspector panel titled "Layout" uses `GridColumns.InspectorControl`.
  - Displays visual column icons for **2 Columns**, **3 Columns**, and **4 Columns** (`choices={["2 Columns", "3 Columns", "4 Columns"]}`), matching screenshot `clipboard-1790582831344.png`.
  - Selecting an icon immediately updates the editor canvas grid column distribution.
  - Active button highlights with blue background (`.is-selected`).
- [ ] Avatar image can be uploaded, selected from media library, or replaced directly on the canvas.
- [ ] Name, Role, Organization, and Button Text are editable directly via inline RichText.
- [ ] Inspector controls provide:
  - Heading level selector (H2–H5) for Name.
  - "Hide Image" toggle to switch to the image-free variant.
  - Profile URL and "Open in new tab" toggle.
  - Parent Grid selection shortcuts from the child block.
- [ ] No JavaScript console errors during insertion, editing, or page save.

### 6.2 Frontend Output & Styling
- [ ] Semantic HTML: Card is wrapped in an `<article class="mmd-people-card ...">`.
- [ ] Circular image: Avatar renders with `120px` width/height and `rounded-full`.
- [ ] Text hierarchy: Heading is cleanly differentiated from Role and Organization.
- [ ] "View Profile" link renders with Chevron icon and passes WCAG screen-reader label test.
- [ ] No image variant: When `hideImage` is true or no image is set, the image markup is completely omitted, and remaining content is properly centered.
- [ ] Theming: On dark section backgrounds, text and border contrast automatically adapt without unreadable dark-on-dark text.

### 6.3 Responsive & Cross-Device Behavior
- [ ] **Mobile (360px–480px)**: Card scales neatly, avatar stays centered, no horizontal scrolling.
- [ ] **Tablet (768px)**: Card maintains proportions whether in 2-column or 3-column grid.
- [ ] **Desktop (1440px)**: Matches Figma visual presentation in single or multi-column grids.

---

## 7. Verification Plan & Test Evidence Required

The Implementer must provide real verification evidence in `results.md`:
1. **WP-CLI / Build Verification**:
   - `npm run build` runs cleanly with zero webpack or tailwind errors.
   - `wp-scripts build` generates `gutenberg/build/blocks/people-card/`.
2. **Editor Test**:
   - Create a test page (`/test-people-card/`) via WP-CLI or logged-in WordPress session.
   - Insert:
     - 1 People Card with Image.
     - 1 People Card without Image.
     - 1 People Card inside a `Section (1 Column)` with a dark background (`bg-primary-navy-900`).
3. **Frontend Proof**:
   - Screenshots of all 3 test cards on frontend.
   - Computed CSS table for:
     - Avatar dimensions (`120px × 120px`, `border-radius: 50%`).
     - Heading font-size, line-height, and color.
     - Role and organization typography.
     - Card padding and background colors.
4. **Log Cleanliness**:
   - Confirm `wp-content/debug.log` has zero PHP notices or warnings during page render.
