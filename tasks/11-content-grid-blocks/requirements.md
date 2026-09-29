# Task Requirements: Content Grid Blocks Alignment (11)

**Status:** NEEDS REVIEW  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**SOW Reference:** SOW §2.4, ROADMAP.md Phase 2 Organism O4 (Content Grid & Dynamic Query / Manual Picker)  

---

## 1. Scope & Objective

Align and modernize the two starter content grid blocks inherited from the theme boilerplate to match the current QP NewsLetter data structure, post types, taxonomies, and card display components:

1. **`mmd/grid--content-picker` ("Grid of Content (Manual)")**:
   - Allows editorial curation by selecting specific posts one-by-one via `PostPicker.InspectorControl`.
   - Must support all project post types: `news`, `resource`, `newsletter`, `event`, `blog`, and `page`.
   - Renders each post using the unified card display template.

2. **`mmd/grid--query` ("Grid of Content (Dynamic Query)")**:
   - Automatically queries and displays posts using dynamic parameters (`WP_Query`).
   - Must support filtering across all project post types: `news`, `resource`, `newsletter`, `event`, and `blog`.
   - Must support filtering by the project's actual public taxonomies:
     - `news_category` (News Categories)
     - `newsletter_category` (Newsletter Categories)
     - `blog_category` (Blog Categories)
     - `tech_tag` (Technology Tags)
   - Supports post count (`numPostsToShow`), single post per content type (`onePostPerCT`), and column options (2, 3, 4 columns).

3. **Shared Card Display & Helper Pipeline**:
   - Create `templates/displays/post--standard.php` so that `mmd_render_content_by_display($id, 'standard')` properly renders the unified post card across all post types.
   - Populate `gutenberg/render-helpers.php` with robust helper implementations (`mmd_block_require_posts`, `mmd_block_render_post_columns`, `mmd_block_apply_tax_filters`, `mmd_block_render_card`).
   - Replace any legacy `is_gutenberg_edit_mode()` calls with `mmd_is_gutenberg_edit_mode()`.

---

## 2. Pre-Flight Checklist (Implementer Must Verify)

- [ ] Read `skills/mmd-gutenberg/SKILL.md` (SSR block architecture, `ServerSideRender`, block attributes).
- [ ] Read `skills/mmd-tailwindcss-v2/SKILL.md` (Tailwind token system, zero hardcoded hex values, zero arbitrary rem values).
- [ ] Read `skills/mmd-display-mode/SKILL.md` (card rendering via `mmd_render_content_by_display`).
- [ ] Read `skills/mmd-definition-of-done/SKILL.md` (verification on DDEV, clean build, clean `debug.log`).

---

## 3. Technical Specifications

### 3.1 `mmd/grid--content-picker`
- **Location:** `wp-content/themes/qp-newsletter/gutenberg/blocks/grid--content-picker/`
- **Inspector (`inspector.js`):**
  - Update `contentTypeChoices` in `PostPicker.InspectorControl` to `["news", "resource", "newsletter", "event", "blog", "page"]`.
- **Render (`render.php`):**
  - Use `mmd_is_gutenberg_edit_mode()` to detect editor environment.
  - If posts array is empty: in editor show helpful placeholder ("No posts selected. Choose items in block settings."); on frontend return early cleanly.
  - For each post, render via `mmd_render_content_by_display($post_id, 'standard')` inside `.mmd-col`.
  - Grid wrapper: `.mmd-grid-content-picker.mmd-row.mmd-row-static.{columns}.gap-y-6`.

### 3.2 `mmd/grid--query`
- **Location:** `wp-content/themes/qp-newsletter/gutenberg/blocks/grid--query/`
- **Block Schema (`block.json`):**
  - Default `contentTypes` to `["news", "blog", "resource", "event", "newsletter"]`.
  - Replace legacy taxonomy attributes (`articleTypeTerms`, `regionTerms`, `themeTerms`, `countryTerms`) with:
    - `newsCategoryTerms` (array, default `[]`)
    - `newsletterCategoryTerms` (array, default `[]`)
    - `blogCategoryTerms` (array, default `[]`)
    - `techTagTerms` (array, default `[]`)
- **Inspector (`inspector.js`):**
  - Update `CONTENT_TYPE_CHOICES` to:
    - News (`news`)
    - Resources (`resource`)
    - Newsletters (`newsletter`)
    - Events (`event`)
    - Blogs (`blog`)
  - Update taxonomy pickers with `ContentPicker` (mode `term`):
    - Filter by News Categories (`contentTypes: ["news_category"]`)
    - Filter by Newsletter Categories (`contentTypes: ["newsletter_category"]`)
    - Filter by Blog Categories (`contentTypes: ["blog_category"]`)
    - Filter by Tech Tags (`contentTypes: ["tech_tag"]`)
- **Render (`render.php`):**
  - Use `mmd_is_gutenberg_edit_mode()` for editor detection.
  - Build `tax_query` extracting term IDs from `newsCategoryTerms`, `newsletterCategoryTerms`, `blogCategoryTerms`, and `techTagTerms`.
  - Build query for `contentTypes` with `numPostsToShow` and optional `onePostPerCT`.
  - Render posts via `mmd_render_content_by_display(get_the_ID(), 'standard')`.
  - In editor, if no posts match query, show helpful empty placeholder.

### 3.3 Displays & Helpers
- **`templates/displays/post--standard.php`:**
  - Create file loading `templates/displays/post--related.php` so `mmd_render_content_by_display($post_id, 'standard')` functions seamlessly.
- **`gutenberg/render-helpers.php`:**
  - Implement shared helper functions for SSR blocks.

---

## 4. Acceptance Criteria

1. **Build Success:** `npm run build` runs cleanly with 0 compilation errors.
2. **Editor Verification:** Both blocks render preview and live SSR previews in Gutenberg editor without PHP or JS exceptions.
3. **Manual Content Picker:** Can select posts from `news`, `resource`, `newsletter`, `event`, `blog`, and `page`; renders cards accurately.
4. **Dynamic Query Grid:** Accurately queries selected post types, respects post limit, supports taxonomy filtering by `news_category`, `newsletter_category`, `blog_category`, and `tech_tag`.
5. **No Regressions:** Clean PHP logs in `wp-content/debug.log` (0 fatal errors, warnings, or notices).
