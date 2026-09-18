import {
  InspectorControls,
  __experimentalLinkControl as LinkControl,
} from "@wordpress/block-editor";
import { PanelBody } from "@wordpress/components";
import { Image } from "@marameodesign/components";

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { logoLink, openInNewTab } = attributes;

  const handleLinkChange = newLink => {
    setAttributes({
      logoLink: newLink?.url || "",
      openInNewTab: newLink?.opensInNewTab || false,
    });
  };
  const handleResetLink = () => {
    setAttributes({
      logoLink: "",
      openInNewTab: false,
    });
  };

  return (
    <InspectorControls>
      <PanelBody>
        <Image.InspectorControl
          {...props}
          customOptions={{ caption: false, useFeaturedImage: false }}
        />
      </PanelBody>

      <PanelBody
        title="Logo Link"
        initialOpen={true}
        className="mmd-link-field"
      >
        <LinkControl
          value={{
            url: logoLink,
            opensInNewTab: openInNewTab,
          }}
          onChange={handleLinkChange}
          onRemove={handleResetLink}
          settings={[{ id: "opensInNewTab", title: "Open in new tab" }]}
          withCreateSuggestion={true}
          searchInputPlaceholder="Paste or search for a link..."
        />
      </PanelBody>
    </InspectorControls>
  );
}
