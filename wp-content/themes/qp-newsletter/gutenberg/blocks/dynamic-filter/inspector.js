import {
  PanelBody,
  SelectControl,
  TextControl,
  ToggleControl,
  RangeControl,
} from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

const POST_TYPE_CHOICES = [
  { label: "News", value: "news" },
  { label: "Resources", value: "resource" },
  { label: "Events", value: "event" },
  { label: "Newsletters", value: "newsletter" },
  { label: "Blog Posts", value: "blog" },
];

export default function Inspector(props) {
  const { setAttributes, attributes } = props;
  const {
    contentTypes = ["news"],
    postsPerPage = 9,
    columns = "xl:cols-2",
    showSearch = true,
    showSort = true,
    sidebarTitle = "Filters",
    showTechTags = true,
    showCategories = true,
    showContentTypes = false,
  } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Content Query" initialOpen={true}>
        <SelectControl
          label="Filter by Post Types"
          value={contentTypes}
          options={POST_TYPE_CHOICES}
          multiple={true}
          onChange={(val) =>
            setAttributes({
              contentTypes: Array.isArray(val) ? val : [val],
            })
          }
          help="Hold Ctrl (Windows) or Cmd (Mac) to select multiple post types."
        />

        <RangeControl
          label="Posts Per Page"
          value={postsPerPage}
          onChange={(val) => setAttributes({ postsPerPage: val })}
          min={3}
          max={24}
          step={3}
        />

        <SelectControl
          label="Desktop Grid Columns"
          value={columns}
          options={[
            { label: "2 Columns", value: "xl:cols-2" },
            { label: "3 Columns", value: "xl:cols-3" },
          ]}
          onChange={(val) => setAttributes({ columns: val })}
        />
      </PanelBody>

      <PanelBody title="Interface Controls" initialOpen={true}>
        <TextControl
          label="Sidebar Title"
          value={sidebarTitle}
          onChange={(val) => setAttributes({ sidebarTitle: val })}
        />

        <ToggleControl
          label="Show Search Input"
          checked={showSearch}
          onChange={(val) => setAttributes({ showSearch: val })}
        />

        <ToggleControl
          label="Show Sort Dropdown"
          checked={showSort}
          onChange={(val) => setAttributes({ showSort: val })}
        />

        <ToggleControl
          label="Show Technology Tag Facet"
          checked={showTechTags}
          onChange={(val) => setAttributes({ showTechTags: val })}
        />

        <ToggleControl
          label="Show Category Facet"
          checked={showCategories}
          onChange={(val) => setAttributes({ showCategories: val })}
          help="Displays category facet matching the selected post types."
        />

        <ToggleControl
          label="Show Content Type Facet"
          checked={showContentTypes}
          onChange={(val) => setAttributes({ showContentTypes: val })}
          help="Enable when multiple post types are queried simultaneously."
        />
      </PanelBody>
    </InspectorControls>
  );
}
