# Task Requirements: Hero Blocks (Single Hero & Hero Carousel) (12)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** SOW §2.4, ROADMAP.md Phase 3 Organism (Hero Section Layouts)  
**Figma References:**  
- [Figma Node 596:6925 — MMC Mixed Migration Review](https://www.figma.com/design/JF5SCvaKxWSDkSJ0eFOHkw/-UI--MMC-Mixed-Migration-Review?node-id=596-6925&m=dev)  
- [Figma Node 661:7183 — MMC Mixed Migration Review (Home Carousel)](https://www.figma.com/design/JF5SCvaKxWSDkSJ0eFOHkw/-UI--MMC-Mixed-Migration-Review?node-id=661-7183&m=dev)  

---

## 1. Architectural Decoupling

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

## 2. File Structure

```
wp-content/themes/qp-newsletter/gutenberg/blocks/
├── hero/                          # Standard Single Hero Block (mmd/hero)
│   ├── block.json                 # Name: mmd/hero
│   ├── index.js                   # Registration
│   ├── schema.js                  # Attributes (heroType: featured | simple, Heading, Image, BackgroundColor)
│   ├── edit.js                    # Dispatches to HeroFeatured or HeroSimple
│   ├── inspector.js               # Type dropdown, BackgroundColor, variant options
│   ├── save.js                    # Static saved markup
│   ├── render.php                 # Breadcrumbs and Back to Parent dynamic resolver
│   ├── style.scss                 # Themed styles for featured and simple heroes
│   ├── editor.scss                # Editor canvas overrides
│   └── variants/
│       ├── HeroFeatured.js        # Featured hero layout
│       ├── HeroSimple.js          # Simple hero layout
│       └── index.js
└── hero-carousel/                 # Dedicated Hero Carousel Block (mmd/hero-carousel)
    ├── block.json                 # Name: mmd/hero-carousel
    ├── index.js                   # Registration
    ├── schema.js                  # Carousel background color attributes
    ├── edit.js                    # InnerBlocks container restricted to mmd/hero-carousel-slide
    ├── inspector.js               # Background color and carousel info
    ├── save.js                    # Splide wrapper structure with track and arrows
    ├── render.php                 # Breadcrumbs dynamic resolver
    ├── view.js                    # Splide slider runtime initialization
    ├── style.scss                 # Bundled Splide CSS, arrow positioning, and angled card styles
    ├── editor.scss                # Editor canvas contrast enforcement
    └── child/                     # Slide Block (mmd/hero-carousel-slide)
        ├── block.json             # Name: mmd/hero-carousel-slide, parent: [mmd/hero-carousel]
        ├── index.js               # Registration
        ├── schema.js              # Heading (H1/H2, pre-title), Image, showBreadcrumbs
        ├── edit.js                # Canvas editor UI with container alignment and card
        ├── inspector.js           # Slide media picker, heading controls, breadcrumb toggle
        ├── save.js                # Slide markup (.splide__slide, background image, angled card)
        ├── style.scss             # Slide dimensions
        └── editor.scss            # Slide card contrast rules
```
