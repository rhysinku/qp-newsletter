# Task Results: People Card Grid & Item Blocks (10)

**Status:** DONE  
**Assignee:** Gemini CLI (Implementer)  
**Author:** Gemini CLI (Planner)  
**Task Requirements:** `tasks/10-people-card-block/requirements.md`  
**Test Page URL:** `https://qp-newsletter.ddev.site/test-people-card/`  

---

## 1. Summary of Architecture & Implementation

Per your feedback regarding parent grid selection UX and card styling:

1. **Card Background Color Removed**:
   - The card background is **fixed to clean white (`bg-neutral-white`)** by default.
   - Removed the `BackgroundColor` component and the "BACKGROUND COLOR" circle picker in the Inspector sidebar.

2. **Primary Button Display Fixed**:
   - Scoped button styles in `people-card-item/style.scss` and `people-card-item/editor.scss`:
     - **Primary Button (`mod--variant--primary`)**: Solid blue background (`var(--color-primary-blue-800)`), crisp white text (`var(--color-system-white)`), `0.625rem 1.25rem` padding, rounded corners.
     - In the editor canvas, explicitly styled `.tenup-block-components-link__label`, `input`, and `span` with `color: var(--color-system-white) !important` on primary buttons so text is sharp and editable.
     - **Arrow Link (`mod--variant--arrow`)**: Transparent background with blue text and right chevron icon.
     - **Secondary Button (`mod--variant--secondary`)**: Transparent background with navy outline and navy text.

3. **Editor Parent Selection UX Improvements**:
   To ensure users can easily select and configure the `People Card Grid` even when child cards fill the canvas:
   - **Clickable Editor Grid Border & Padding**: Added 12px editor padding and a subtle dashed border (`border: 1px dashed rgba(59, 130, 246, 0.25)`) with hover states around the grid container, giving users an intuitive clickable area to select the grid block directly.
   - **Interactive Admin Header Bar**: When the grid or any of its inner cards is active, a top admin bar renders above the grid:
     `People Card Grid ({columns} Columns) — [Select Grid to change columns →]`.
     Clicking anywhere on this bar instantly selects the parent `People Card Grid`.
   - **Child Toolbar Shortcut (`BlockControls`)**: When any `People Card Item` is selected, a dedicated `Select Grid` toolbar button (with a grid icon) appears in the floating block toolbar to jump directly to the parent grid settings.
   - **Child Inspector Shortcut**: At the top of the `People Card Item` sidebar panel, a "Grid Parent" panel displays:
     `This card is inside a People Card Grid ({columns} columns) — [Select Grid to change columns →]`, allowing instant selection of the parent block from the sidebar.

4. **Strict Grid Parent Constraint**:
   - Enforced `"parent": ["mmd/people-card-grid"]` in `people-card-item/block.json`.

5. **GridColumns Layout Control (`@marameodesign/components`)**:
   - Replaced custom numeric `RangeControl` with `GridColumns.InspectorControl` under the `Layout` panel in `people-card-grid/inspector.js`.
   - Filtered choices to `["2 Columns", "3 Columns", "4 Columns"]` matching visual icons (`2-cols.svg`, `3-cols.svg`, `4-cols.svg`).
   - Integrated `GridColumns.addAttributes(attrObject)` with default `"lg:cols-2"` in `people-card-grid/schema.js`.
   - Updated `people-card-grid/edit.js` and `people-card-grid/save.js` to read columns via `GridColumns.get(props)`, mapping `"lg:cols-2"`, `"lg:cols-3"`, `"lg:cols-4"` to native Tailwind grid classes (`grid-cols-2`, `grid-cols-3`, `grid-cols-4`).
   - Maintained backward compatibility for existing blocks saved with integer values (`2`, `3`, `4`).
   - Sanitized column display text in `people-card-item/inspector.js` (`displayCols = parentColumns.replace("lg:cols-", "")`).

---

## 2. Verification Evidence

### 2.1 Build Status
- `npm run build` ran cleanly with **0 errors**.
- Webpack compiled all blocks cleanly into `gutenberg/build/blocks/`.

### 2.2 Standards Greps (Definition-of-Done)
- **0 hardcoded hex colors** across both block directories.
- **0 arbitrary rem/var in class attributes**.
- **0 `.wp-block-heading` selector uses**.

### 2.3 WordPress Runtime Registry & Constraints
Verified via DDEV WP-CLI:
```bash
# Parent constraint:
ddev wp eval "\$block = WP_Block_Type_Registry::get_instance()->get_registered('mmd/people-card-item'); print_r(\$block->parent);"
# Output: Array ( [0] => mmd/people-card-grid )
```

### 2.4 Clean Log Verification
- `wp-content/debug.log`: **0 PHP warnings or errors**.
