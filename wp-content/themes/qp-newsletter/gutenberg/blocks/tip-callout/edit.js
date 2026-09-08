import { useBlockProps, InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextControl } from "@wordpress/components";
import { Preview } from "../../components/preview";

export default function Edit(props) {
  const { attributes, setAttributes } = props;
  const { type, title, content, preview } = attributes;

  const blockProps = useBlockProps({
    className: `mmd-tip-callout qp-tip-callout mod--type--${type}`,
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Callout Settings" initialOpen={true}>
          <SelectControl
            label="Callout Type"
            value={type}
            options={[
              { label: "Tip (Blue)", value: "tip" },
              { label: "Info (Teal)", value: "info" },
              { label: "Warning (Orange)", value: "warning" },
            ]}
            onChange={(value) => setAttributes({ type: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="mmd-tip-callout__container">
        <TextControl
          label="Callout Title"
          value={title}
          onChange={(value) => setAttributes({ title: value })}
          placeholder="e.g. Pro Tip: Use Docker volumes"
          className="mmd-tip-callout__title-input"
        />

        <RichText
          tagName="p"
          className="mmd-tip-callout__content font-sans"
          value={content}
          onChange={(value) => setAttributes({ content: value })}
          placeholder="Add explanatory callout content..."
          allowedFormats={["core/bold", "core/italic", "core/link", "core/code"]}
        />
      </div>
    </div>
  );
}
