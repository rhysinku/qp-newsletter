import { PanelBody, SelectControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { PostPicker } from "@marameodesign/components";

import { GridColumns } from "@marameodesign/components";

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { cardsDisplayMode } = attributes;

  return (
    <InspectorControls>
      <PanelBody title="Display">
        <SelectControl
          label="Cards Display Mode"
          value={cardsDisplayMode}
          options={[
            { label: "Standard", value: "standard" },
            { label: "Document Card", value: "document" },
          ]}
          onChange={val => setAttributes({ cardsDisplayMode: val })}
          __next40pxDefaultSize
        />
        <GridColumns.InspectorControl
          {...props}
          choices={["2 Columns", "3 Columns", "4 Columns"]}
          __hasSpacingBottom
        />
      </PanelBody>
      <PanelBody title="Item Settings">
        <div className="mmd-editor-label">Select Content</div>
        <PostPicker.InspectorControl
          {...props}
          contentTypeChoices={[
            "mmr",
            "mmr-article",
            "article",
            "project",
            "event",
            "media-press",
            "resource",
            "page",
          ]}
          // maxContentItems={10}
        />
      </PanelBody>
    </InspectorControls>
  );
}
