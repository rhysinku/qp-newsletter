import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl } from "@wordpress/components";
import ServerSideRender from "@wordpress/server-side-render";
import { Preview } from "../../components/preview";

export default function Edit(props) {
  const { attributes, setAttributes } = props;
  const { resource_id, button_label, preview } = attributes;

  const blockProps = useBlockProps({
    className: "mmd-resource-cta qp-resource-cta",
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Resource CTA Settings" initialOpen={true}>
          <TextControl
            label="Resource Post ID"
            value={resource_id ? String(resource_id) : ""}
            onChange={(value) => setAttributes({ resource_id: parseInt(value, 10) || 0 })}
            placeholder="e.g. 154"
            help="Enter the numerical database ID of the Resource post to link."
          />
          <TextControl
            label="Button Label"
            value={button_label}
            onChange={(value) => setAttributes({ button_label: value })}
            placeholder="Download Cheat Sheet"
          />
        </PanelBody>
      </InspectorControls>

      {resource_id ? (
        <ServerSideRender
          block="qp/resource-cta"
          attributes={attributes}
        />
      ) : (
        <div className="mmd-resource-cta__placeholder p-6 text-center border border-dashed border-neutral-grey-300 rounded-md" style={{ borderStyle: 'dashed', borderWidth: '1px', borderColor: '#94a3b8', borderRadius: '6px', padding: '1.5rem', textAlign: 'center' }}>
          <p className="text-sm text-neutral-grey-700" style={{ margin: 0, fontSize: '0.875rem', color: '#64748b' }}>Please enter a valid Resource Post ID in the sidebar settings to generate the CTA box.</p>
        </div>
      )}
    </div>
  );
}
