import { Preview, Image } from "@marameodesign/components";
import { useEffect } from "@wordpress/element";
import { useBlockParentAttributes } from "@10up/block-components";

import Inspector from "./inspector";

import "./editor.scss";

export const Edit = props => {
  const { attributes, setAttributes } = props;
  const { isContainedHeight } = attributes;
  const { imageFit } = Image.get(props);

  const [parentAttributes] = useBlockParentAttributes();
  useEffect(() => {
    // Set "containedHeight" to true if image is alone, false if not
    setAttributes({
      isContainedHeight: Boolean(
        imageFit === "contain" &&
          parentAttributes?.childCount &&
          parentAttributes?.childCount === 1
      ),
    });
  }, [parentAttributes, imageFit]);

  const { preview } = Preview.get(props);

  return (
    <>
      {preview && (
        <Preview.Content
          {...props}
          path="wp-content/themes/marameodesign/gutenberg/blocks/gallery/child"
        />
      )}
      {!preview && (
        <>
          <Inspector {...props} />

          <Image.Edit
            {...props}
            wrapperClassName="wp-block-mmd-image mmd-spacing mmd-spacing-md mmd-margin-y"
            ratioWrapperClassName="is-ratio-image ratio-3-2 mod--feature--preview"
            placeholder="1200x800"
            allowDescription={true}
            isContainedHeight={isContainedHeight}
          />
        </>
      )}
    </>
  );
};
