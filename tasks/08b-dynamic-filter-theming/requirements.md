# Task Requirements: Dynamic Filter Block — Dark & Light Theme Adaptations (T8b)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**Parent Task:** `tasks/08-dynamic-filter-block/`  
**SOW Reference:** SOW §2.4 (Templates & Displays) & Design Tokens  
**Reference Screenshot:** `clipboard-1790322012506.png` (Dynamic Filter Block inside dark Navy Section block)

---

## 1. Scope & Objective

Audit, implement, and verify comprehensive **Dark Mode and Light Mode theming support** for the custom **Dynamic Filter Block** (`mmd/dynamic-filter`).

The block must operate flawlessly and meet WCAG 2.2 AA contrast standards in two configurations:
1. **Nested inside a Section Block (`mmd/section--1col`, etc.)**:
   - Responds automatically to the parent section's theme class (`mod--theme--light` vs `mod--theme--dark`) and background color (e.g. `bg-primary-navy-900` vs `bg-neutral-light-grey` / `bg-system-white`).
2. **Standalone Mode**:
   - Responds to the block's own `bgColor` inspector control and paired `blockTheme` attribute.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-theming/SKILL.md` (ancestor theme class cascade, token pattern, zero hardcoded hex).
- [ ] Read `skills/mmd-tailwindcss-v2/SKILL.md` (strict token usage, no arbitrary class values).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (WCAG 2.2 AA contrast ratio minimum 4.5:1 for body/count text, 3:1 for UI borders).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verify both editor canvas and frontend on DDEV).

---

## 3. Theming Matrix & Element Specifications

| Element | Light Mode (`mod--theme--light`) | Dark Mode (`mod--theme--dark`) |
|---|---|---|
| **Outer Section / Background** | `bg-neutral-light-grey` or `bg-system-white` | `bg-primary-navy-900` or `bg-primary-blue-800` |
| **Sidebar Card Surface** | `bg-white`, border `neutral-grey-200/80` | `bg-white`, border `neutral-grey-200/80` (elevated white surface) |
| **Sidebar Title & Facet Toggles** | `text-primary-navy-900` | `text-primary-navy-900` (on white sidebar surface) |
| **Search Input Box** | `bg-white`, border `neutral-grey-200`, text `neutral-grey-900` | `bg-white`, border `neutral-grey-200`, text `neutral-grey-900` |
| **Meta Bar Border (Divider)** | `border-neutral-grey-200/60` | `border-white/15` or `border-neutral-grey-700/60` |
| **Results Count Text** | `text-neutral-grey-600` | `text-neutral-grey-900` (`#CBD5E1`) or `text-white/80` (min 4.5:1 contrast) |
| **Sort Dropdown** | `bg-white`, text `primary-navy-900`, border `neutral-grey-200` | `bg-white`, text `primary-navy-900`, border `neutral-grey-200` |
| **Active Selection Pills** | `bg-primary-blue-200`, `text-primary` | `bg-white/15`, `text-white`, `border-white/20` (or high-contrast pill) |
| **Post Cards Grid** | White cards (`bg-white`), dark titles (`text-primary-navy-900`) | White cards (`bg-white`), dark titles (`text-primary-navy-900`) |
| **Empty State Card** | `bg-white`, border `neutral-grey-300`, text `neutral-grey-600` | `bg-white`, border `neutral-grey-300`, text `neutral-grey-600` |
| **Pagination Buttons** | `bg-white`, border `neutral-grey-200`, text `primary-navy-900` | `bg-white`, border `neutral-grey-200`, text `primary-navy-900` |
| **Mobile Filter Button** | `bg-white`, text `primary-navy-900`, border `neutral-grey-200` | `bg-white`, text `primary-navy-900`, border `neutral-grey-200` |

---

## 4. Acceptance Criteria

1. **Section Block Dark Mode (Navy Background):**
   - Placing `mmd/dynamic-filter` inside `mmd/section--1col` with background `bg-primary-navy-900` applies `mod--theme--dark`.
   - Results count text ("Showing X of Y results") is crisp, light-toned (`#CBD5E1` or `text-white/80`), and easily readable with >= 4.5:1 contrast against `#0F172A`.
   - The horizontal divider line below the search bar adapts to a subtle translucent white border (`border-white/15`).
   - Cards, sidebar card, search bar, sort dropdown, and pagination maintain their white surface styling with sharp contrast against the navy background.
2. **Standalone Dark Mode:**
   - Setting `bgColor` to `Navy Blue` (`bg-primary-navy-900`) in the standalone block's Appearance panel automatically applies `mod--theme--dark`.
   - The same high-contrast styles are rendered as when nested in a dark Section block.
3. **Light Mode Consistency:**
   - Under `mod--theme--light` (e.g. `bg-neutral-light-grey` or `bg-system-white`), results count is `text-neutral-grey-600` and the divider is `border-neutral-grey-200/60`.
4. **Editor Canvas & Frontend Parity:**
   - The Gutenberg editor `<ServerSideRender />` matches frontend styles in both dark and light modes.
5. **DoD Compliance:**
   - Zero hardcoded hex values in CSS/PHP templates.
   - Zero arbitrary Tailwind classes.
   - Clean verification in `debug.log`.

---

## 5. Verification Commands

```bash
# 1. Compile assets
npm run build

# 2. Check DoD greps
grep -rnE '#[0-9a-fA-F]{3,6}' wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/
grep -rnE '\[.*rem\]|\[.*var\(' wp-content/themes/qp-newsletter/gutenberg/blocks/dynamic-filter/

# 3. Test frontend render with dark section
ddev wp eval '
$content = "<!-- wp:mmd/section--1col {\"bgColor\":\"bg-primary-navy-900\",\"blockTheme\":\"mod--theme--dark\"} -->\n<section class=\"mmd-spacing mmd-spacing-md mmd-padding-y bg-primary-navy-900 mod--theme--dark\"><div class=\"container mmd-content\">\n<!-- wp:mmd/dynamic-filter {\"contentTypes\":[\"news\"]} /-->\n</div></section>\n<!-- /wp:mmd/section--1col -->";
echo do_blocks($content);
'
```
