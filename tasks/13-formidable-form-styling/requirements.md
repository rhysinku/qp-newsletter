# Task Requirements: Formidable Form Custom Tailwind Styling (13)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** General Theme Components & Form Styling  
**Reference Screenshot:** `clipboard-1790820354658.png` (Unstyled Formidable Form Preview)  

---

## 1. Scope & Objective

Formidable Forms is currently rendering raw, unstyled HTML because the active theme explicitly dequeues Formidable's default stylesheet (`wp_dequeue_style('formidable');` in `wp-content/themes/qp-newsletter/includes/assets.php`) to avoid plugin CSS bloat.

The objective of this task is to implement a complete, bespoke form styling suite for Formidable Forms within the theme's Tailwind CSS pipeline:
- **Location:** `wp-content/themes/qp-newsletter/assets/css/components/form.css` (imported by `components/index.css` and compiled into `gutenberg/build/css/style.min.css`).
- **Design Alignment:** Enforce the Marameo Design System and token values defined in `website-config.json` (typography, colors, borders, focus rings, transitions, and button variants).
- **Responsive Grid:** Provide a clean 12-column grid layout supporting Formidable's grid layout classes (`.frm_half`, `.frm_third`, `.frm_fourth`, `.frm_two_thirds`, `.frm_full`, `.frm_inline_container`, etc.) with mobile collapse (< 640px).

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-tailwindcss-v2/SKILL.md` (pixel-to-token conversions, token variables, zero hardcoded hex).
- [ ] Read `skills/mmd-theming/SKILL.md` (contrast tokens, theme variables).
- [ ] Read `skills/mmd-accessibility/SKILL.md` (WCAG 2.2 AA compliant focus states, color contrast >= 4.5:1 for body/labels, >= 3:1 for form control boundaries).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verification gate on DDEV).

---

## 3. Design Token & Element Specification

| Form Element | Selector(s) | Design Token / Value |
|---|---|---|
| **Form Container** | `.with_frm_style, .frm_forms` | Full width, font family inherit, clear margins |
| **Grid System** | `.frm_fields_container, .frm_grid_container` | `display: grid; grid-template-columns: repeat(12, 1fr); column-gap: 1.5rem (24px); row-gap: 1rem (16px);` |
| **Column Spans** | `.frm_half` / `.frm6`<br>`.frm_third` / `.frm4`<br>`.frm_two_thirds` / `.frm8`<br>`.frm_fourth` / `.frm3`<br>`.frm_full` / `.frm12` | `grid-column: span 6 / span 6;`<br>`grid-column: span 4 / span 4;`<br>`grid-column: span 8 / span 8;`<br>`grid-column: span 3 / span 3;`<br>`grid-column: span 12 / span 12;` |
| **Mobile Grid (< 640px)** | `@media (max-width: 639px)` | All columns collapse to `grid-column: span 12 / span 12;` |
| **Field Labels** | `.with_frm_style .frm_primary_label` | `font-semibold`, `text-sm` (14px), color `var(--color-primary-navy-900)`, `margin-bottom: 0.375rem (6px)` |
| **Sub-labels / Descriptions** | `.with_frm_style .frm_description` | `text-xs` (12px), color `var(--color-neutral-grey-500)`, `margin-top: 0.25rem (4px)` |
| **Required Asterisk** | `.with_frm_style .frm_required` | `font-bold`, color `var(--color-system-error)`, `margin-left: 0.25rem` |
| **Text Controls** | `input[type="text"]`, `input[type="email"]`, `input[type="url"]`, `input[type="tel"]`, `input[type="number"]`, `input[type="password"]`, `select`, `textarea` | Width `100%`, min-height `44px` (touch target), padding `0.625rem 0.875rem (10px 14px)`, border `1px solid var(--color-neutral-grey-200)`, border-radius `var(--radius-3px, 3px)`, background `var(--color-system-white)`, text `var(--color-neutral-default)`, font size `1rem` (16px to prevent iOS auto-zoom) |
| **Focus State** | Form controls `:focus-visible, :focus` | `outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px var(--color-primary-blue-200);` |
| **Textarea** | `.with_frm_style textarea` | Min-height `120px`, vertical resize only |
| **Checkboxes & Radios** | `input[type="checkbox"]`, `input[type="radio"]` | Size `1.125rem` (18px), border `1px solid var(--color-neutral-grey-300)`, accent/active color `var(--color-primary)`, aligned with labels |
| **Submit Button** | `.with_frm_style input[type="submit"]`, `.with_frm_style button[type="submit"]` | Styled matching `.mmd-button.mod--variant--primary`: background `var(--color-primary)`, text `var(--color-system-white)`, font weight `700`, padding `0.75rem 1.5rem`, border-radius `var(--radius-3px, 3px)`, border `2px solid transparent`, cursor `pointer`, transition `all 200ms ease-in-out` |
| **Submit Button Hover** | `input[type="submit"]:hover, button[type="submit"]:hover` | Background `var(--color-primary-blue-50)`, text `var(--color-primary-navy-900)`, border `2px solid var(--color-primary-blue-50)` |
| **Error State** | `.with_frm_style .frm_blank_field input`, `.with_frm_style .frm_error` | Border `1px solid var(--color-system-error)`, error text `var(--color-system-error)`, font size `text-xs` (12px), `margin-top: 0.25rem` |
| **Success Message** | `.with_frm_style .frm_message` | Padding `1rem (16px)`, border-radius `var(--radius-3px, 3px)`, background `var(--color-system-green-50)`, border `1px solid var(--color-system-success)`, text `var(--color-system-green-700)` |
| **Error Banner** | `.with_frm_style .frm_error_style` | Padding `1rem (16px)`, border-radius `var(--radius-3px, 3px)`, background `var(--color-system-red-50)`, border `1px solid var(--color-system-error)`, text `var(--color-system-red-700)` |

---

## 4. Acceptance Criteria

1. **Pixel-Clean Form Controls:**
   - Text inputs, emails, selects, and textareas have consistent heights, paddings, borders, and border radiuses matching the QP Newsletter design standard.
   - Text inputs never zoom on mobile Safari (minimum 16px font size on inputs).
2. **Responsive Multi-Column Grid:**
   - Multi-field rows (such as "First Name" and "Last Name" inside a Name field group or side-by-side fields) render in two equal 50% columns on tablet/desktop.
   - All multi-column fields collapse cleanly into full width single column on mobile (< 640px).
3. **Interactive & Accessible States:**
   - Focus states display a crisp, visible ring (`var(--color-primary-blue-200)`) with high contrast against the field background.
   - Hover and active states on submit buttons match `.mmd-button.mod--variant--primary`.
4. **Validation & Notifications:**
   - Invalid / missing required fields highlight with `var(--color-system-error)` borders.
   - Success and error banners display readable, accessible text against tokenized alert backgrounds.
5. **No Style Leaks / Breakages:**
   - The Formidable Testing Mode container (`.frm_preview_page`) remains functional and does not disrupt the preview layout.
   - Theme stylesheet compiles without errors (`npm run build`).
6. **DoD Compliance:**
   - Zero hardcoded hex values in `form.css`.
   - Zero arbitrary Tailwind rem/px overrides when tokens exist.

---

## 5. Verification Commands

```bash
# 1. Compile Tailwind and Gutenberg assets
npm --prefix wp-content/themes/qp-newsletter run build

# 2. Check for hardcoded hex or improper token usage
grep -rnE '#[0-9a-fA-F]{3,6}' wp-content/themes/qp-newsletter/assets/css/components/form.css

# 3. Test Formidable direct preview page response
ddev exec "curl -sk 'https://127.0.0.1/wp-admin/admin-ajax.php?action=frm_forms_preview&form=contact-form' -H 'Host: qp-newsletter.ddev.site'" | head -n 30
```
