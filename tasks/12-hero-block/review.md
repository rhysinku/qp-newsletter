# Task Review: Hero Blocks (Single Hero & Hero Carousel) (12)

**Status:** DONE  
**Reviewer:** Gemini CLI (Reviewer)  
**Author/Implementer:** Gemini CLI (Implementer)  
**Parent Requirements:** `tasks/12-hero-block/requirements.md`  
**Parent Results:** `tasks/12-hero-block/results.md`  

---

## 1. Review Summary

I have reviewed the code architecture, Gutenberg block registrations, editor UX, theming contrast, and live frontend output for **Task 12: Hero Block Alignment & Decoupled Hero Carousel**.

### Architectural & Functional Verification:
1. **Decoupled Block Architecture**:
   - The complex slide repeater functionality has been cleanly separated from single hero sections:
     - **`mmd/hero` (Standard Hero Block):** Exclusively manages `Featured Hero` (split-screen with media, pre-title, H1 heading) and `Simple Hero` (single-column with H1 heading and toggleable "Back to Parent" link).
     - **`mmd/hero-carousel` (Home Hero Carousel Block):** Dedicated standalone block managing the Splide slider track, with child slide block `mmd/hero-carousel-slide`.
   - Eliminates all block-invalidation errors, inner-block pollution, and broken layouts when switching hero types.
2. **Figma Polygon Card & Container Alignment**:
   - Each carousel slide features a full-bleed background image with `object-cover`.
   - The foreground content card implements the signature MMC angled polygon (`clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%)`).
   - Aligned using `.container.mx-auto.px-4.lg:px-8` with `justify-start`, so the card anchors cleanly to the left content container.
   - Cleaned out arrows and pagination dots per user directive for an unobstructed, sleek presentation.
3. **Theming & Contrast**:
   - Background color selection aligned across all hero and section blocks via `website-config.json` (`white`, `navy-900`, `blue-50`, `light-grey`, `blue-800`, `grey-100`).
   - Slide card explicitly enforces light-mode text colors (`#0F172A` headings, `#3B82F6` pre-titles, `#334155` paragraphs) in both the editor canvas and frontend, completely preventing headings from turning white on white card backgrounds.
4. **Verification Evidence**:
   - Assets compiled with `npm run build` with **0 errors**.
   - DDEV WP-CLI confirms all three blocks registered: `mmd/hero`, `mmd/hero-carousel`, `mmd/hero-carousel-slide`.
   - Tested live on Home page (`https://qp-newsletter.ddev.site/`) and Showcase page (`https://qp-newsletter.ddev.site/test-hero-variants/`).
   - `wp-content/debug.log` clean (0 warnings or errors).

---

## 2. Verdict

**APPROVED & DONE**
