import { useBlockProps, MediaUpload, InspectorControls } from "@wordpress/block-editor";
import { PanelBody, TextControl, Button } from "@wordpress/components";
import { Preview } from "../../components/preview";

export default function Edit(props) {
  const { attributes, setAttributes } = props;
  const { sponsor_id, sponsor_logo_uri, sponsor_name, sponsor_url, preview } = attributes;

  const blockProps = useBlockProps({
    className: "mmd-sponsor-banner qp-sponsor-banner",
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  const onSelectLogo = (media) => {
    setAttributes({
      sponsor_id: media.id,
      sponsor_logo_uri: media.url,
    });
  };

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Sponsor Settings" initialOpen={true}>
          <TextControl
            label="Sponsor Name"
            value={sponsor_name}
            onChange={(value) => setAttributes({ sponsor_name: value })}
            placeholder="e.g. Acme Corporation"
          />
          <TextControl
            label="Sponsor URL"
            value={sponsor_url}
            onChange={(value) => setAttributes({ sponsor_url: value })}
            placeholder="https://example.com"
          />
        </PanelBody>
      </InspectorControls>

      <div className="mmd-sponsor-banner__editor-container flex items-center gap-4">
        <MediaUpload
          onSelect={onSelectLogo}
          allowedTypes={["image"]}
          value={sponsor_id}
          render={({ open }) => (
            <div className="mmd-sponsor-banner__logo-uploader">
              {sponsor_logo_uri ? (
                <img
                  src={sponsor_logo_uri}
                  alt="Sponsor logo preview"
                  className="max-h-12 max-w-[150px] object-contain cursor-pointer"
                  onClick={open}
                />
              ) : (
                <Button isSecondary onClick={open}>
                  Upload Logo
                </Button>
              )}
            </div>
          )}
        />

        <div className="mmd-sponsor-banner__details flex-1">
          <span className="text-xs uppercase text-neutral-grey-700 tracking-wide block">Sponsored By</span>
          <span className="text-sm font-bold text-system-base">{sponsor_name || "Sponsor Name (Edit in sidebar)"}</span>
          {sponsor_url && (
            <span className="text-xs text-primary-default block truncate">{sponsor_url}</span>
          )}
        </div>
      </div>
    </div>
  );
}
