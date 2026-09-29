import { PanelBody, SelectControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { PostPicker, GridColumns } from "@marameodesign/components";

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { cardsDisplayMode } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Layout & Display">
        <GridColumns.InspectorControl
          {...props}
          choices={["2 Columns", "3 Columns", "4 Columns"]}
          __hasSpacingBottom
        />
        <SelectControl
          label="Cards Display Mode"
          value={cardsDisplayMode}
          options={[
            { label: "Standard Card", value: "standard" },
          ]}
          onChange={val => setAttributes({ cardsDisplayMode: val })}
          __next40pxDefaultSize
        />
      </PanelBody>
      <PanelBody title="Content Selection">
        <div className="mmd-editor-label">Select Posts</div>
        <PostPicker.InspectorControl
          {...props}
          contentTypeChoices={[
            "news",
            "resource",
            "newsletter",
            "event",
            "blog",
            "page",
          ]}
          maxContentItems={24}
        />
      </PanelBody>
    </InspectorControls>
  );
}
