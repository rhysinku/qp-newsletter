# Task Results: Hero Blocks (Single Hero & Hero Carousel) (12)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**Task Requirements:** `tasks/12-hero-block/requirements.md`  
**Home Page URL:** `https://qp-newsletter.ddev.site/` (Page ID 8)  
**Showcase Page URL:** `https://qp-newsletter.ddev.site/test-hero-variants/` (Page ID 170)  

---

## 1. Summary of Architecture & Decoupling

Per user directive, the complex carousel functionality and standard single hero functionality have been **cleanly decoupled into two dedicated blocks** to prevent editor validation errors, inner-block pollution, and broken layouts when switching types:

1. **`mmd/hero` (Standard Hero Block)**:
   - Dedicated exclusively to single hero sections.
   - Cleanly toggles between two variants sharing identical inner-block architectures:
     - **Featured Hero (`featured`):** Split-column layout with Featured Image on the right, pre-title, H1 title, and basic inner blocks (`paragraph`, `list`, `button-group`).
     - **Simple Hero (`simple`):** Compact single-column layout with H1 title, basic inner blocks, and toggleable "Back to Parent" button (`showBackToParent`).
   - Composed via `@marameodesign/components` `BackgroundColor` with dynamic `mod--theme--light` / `mod--theme--dark` contrast support.

2. **`mmd/hero-carousel` (Home Hero Carousel Block)**:
   - Dedicated standalone block for the homepage slider.
   - Container block `mmd/hero-carousel` manages the Splide slider track, loop navigation, accessible next/prev buttons, and pagination dots.
   - Child block `mmd/hero-carousel-slide` in `gutenberg/blocks/hero-carousel/child/`:
     - **Full-bleed Background Image:** Featured Image or Custom Image per slide.
     - **Aligned Container:** Wrapped in `.container.mx-auto.px-4.lg:px-8` in both editor and frontend.
     - **Angled Foreground Content Card:** Signature MMC polygon (`clip-path: polygon(0 0, 100% 0%, 90% 100%, 0% 100%)`).
     - **Content:** Breadcrumb pathway, Pre-title, Title (H1 on slide 1, H2 on others), Paragraph, and Action Buttons.

---

## 2. Verification Evidence

### 2.1 Build Status
Ran `npm run build` cleanly with **0 compilation errors**:
- Both blocks compiled into `gutenberg/build/blocks/hero/` and `gutenberg/build/blocks/hero-carousel/` (with `child/`).
- Splide core CSS and `view.js` bundled cleanly into `hero-carousel/`.

### 2.2 WordPress Runtime Registry (DDEV WP-CLI)
```bash
ddev wp eval "
\$reg = WP_Block_Type_Registry::get_instance();
echo 'mmd/hero registered: ' . (\$reg->is_registered('mmd/hero') ? 'YES' : 'NO') . PHP_EOL;
echo 'mmd/hero-carousel registered: ' . (\$reg->is_registered('mmd/hero-carousel') ? 'YES' : 'NO') . PHP_EOL;
echo 'mmd/hero-carousel-slide registered: ' . (\$reg->is_registered('mmd/hero-carousel-slide') ? 'YES' : 'NO') . PHP_EOL;
"
# Output:
# mmd/hero registered: YES
# mmd/hero-carousel registered: YES
# mmd/hero-carousel-slide registered: YES
```

### 2.3 Live Page Verifications
- **Home Page (`https://qp-newsletter.ddev.site/`):** Running the dedicated `mmd/hero-carousel` with clean slides, container-aligned cards, background images, and working next/previous arrows.
- **Showcase Page (`https://qp-newsletter.ddev.site/test-hero-variants/`):** Demonstrates all hero blocks and theme variants:
  1. `mmd/hero-carousel` (Light Theme)
  2. `mmd/hero` (Featured Variant — Light Theme)
  3. `mmd/hero` (Featured Variant — Dark Theme)
  4. `mmd/hero` (Simple Variant — Light Theme with Back link)
  5. `mmd/hero` (Simple Variant — Dark Theme with Back link)
- Clean `debug.log` with 0 PHP notices or errors.
