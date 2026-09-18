# Custom gutenberg-block implementation instructions

## Resources
- Block dir: wp-content/themes/marameodesign/gutenberg/blocks
- Component dir: wp-content/themes/marameodesign/gutenberg/components

## Block Types
### Client-Side Rendering (CSR)
- this is the common type of block

### Server-Side Rendering (SSR)
- marked by render_callback from block.json. This type of block is used for cases where we need php codes for query data from database dynamically

## Components
- They are packaged entities/units for constructing custom blocks. Some are for data like Heading, Text, Media, Image, etc. The others are for block options like layout, background-color.
- By saying "packaged", components include implementations for defining attributes, get, edit: Edit, inspector-control, etc around so they will later be used conveniently.
- Some components allow "suffix" to have multiple "instances" of the same component for the same block

## Block structure

### index.js
- the index file to register the block

### block.json
- for defining the block. 
- Some important elements are:
-- providesContext: often be used for passing value from a parent/wrapping block to its children block(s)/inner block(s)
-- render_callback: used for SSR
-- attributes: used for SSR. For CSR, schema.js is used

### schema.js
- this is available only for CSR blocks
- defines attributes available for the block either via including attributes from pre-defined components or defining block-specific attributes
- sets default values for attributes

### edit.js
- defines the edit method for the block

### inspector.js
- defines block settings for side-bar either by including inspectors from components or declaring block-specific inspectors

### save.js
- defines the save method for the block

### index.php
- available only for SSR blocks where the render_callback function is implemented

### ris.php
- defines any responsive-image styles that the block requires

## Block displays
We define different displays for a block when the html structures are so different. Each display has its own edit and save methods

## Block variants
Is the default variation from wordpress gutenberg block. This creates a new block in the list of blocks for the system.

