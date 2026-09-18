import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, ToggleControl } from "@wordpress/components";
import { usePost } from "@10up/block-components";

const ALLOWED_POST_TYPES_FOR_IMAGE_BLEED = [
  "mmr-article",
  "article",
  "event",
  "press-release",
  "project",
];

export default function Inspector(props) {
  const { attributes, setAttributes } = props;
  const { bleedRight } = attributes;
  const { postType } = usePost();
  const postSupportsBleedRight =
    ALLOWED_POST_TYPES_FOR_IMAGE_BLEED.includes(postType);

  return (
    <>
      {postSupportsBleedRight && (
        <InspectorControls>
          <PanelBody>
            <ToggleControl
              label="Bleed Right"
              checked={bleedRight}
              onChange={value => setAttributes({ bleedRight: value })}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </>
  );
}
