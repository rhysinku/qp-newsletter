import {
  Button,
  SelectControl,
  TextControl,
  // TextareaControl,
  ToggleControl,
} from "@wordpress/components";
import { MediaUpload } from "@wordpress/block-editor";

import { setSuffixedAttributes } from "@marameodesign/utils";
import { CustomLabel } from "./components";
import { handleImageRemoval, handleImageSelection } from "./functions";
import get from "./get";

const defaultOptions = {
  // allowCaption: true,
  allowFeaturedImage: true,
  allowFit: false,
  // allowDescription: false,
};

export default function InspectorControl(props) {
  const { attributes, setAttributes, customOptions = {}, suffix = "" } = props;
  const {
    imageId,
    imageUri,
    useFeaturedImage,
    imageAlt,
    imageWidth,
    imageHeight,
    imageCaption,
    imageFit,
    imageDescription,
    containedHeight,
  } = get(props, suffix);

  // Merge customOptions over defaultOptions
  const options = {
    ...defaultOptions,
    ...customOptions,
  };

  return (
    <>
      <MediaUpload
        onSelect={image =>
          handleImageSelection(props, image)
        }
        multiple={false}
        allowedTypes={["image"]}
        render={({ open }) => (
          <>
            {((imageId || imageUri) && (
              <div className="m-custom-media-preview">
                {!useFeaturedImage ? (
                  <img
                    src={imageUri}
                    alt={imageAlt}
                    width={imageWidth}
                    height={imageHeight}
                    decoding="async"
                    loading="lazy"
                    onClick={!useFeaturedImage ? open : null}
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                      objectPosition: "center",
                      display: "block",
                      cursor: "pointer",
                    }}
                  />
                ) : (
                  <CustomLabel text="Featured image applied" />
                )}

                {!useFeaturedImage && (
                  <div className="m-custom-media-buttons">
                    <button
                      type="button"
                      onClick={open}
                      className="m-custom-media-button"
                    >
                      Replace
                    </button>
                    <button
                      type="button"
                      onClick={() => handleImageRemoval(setAttributes)}
                      className="m-custom-media-button"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            )) || (
              <>
                {!useFeaturedImage ? (
                  <Button className="m-button--upload-new-media" onClick={open}>
                    Insert Image
                  </Button>
                ) : (
                  <CustomLabel text="No featured image uploaded yet." />
                )}
              </>
            )}
          </>
        )}
      />

      <br />

      {/*{options?.allowCaption && (*/}
      {/*  <TextControl*/}
      {/*    __nextHasNoMarginBottom*/}
      {/*    __next40pxDefaultSize*/}
      {/*    label="Caption"*/}
      {/*    value={imageCaption}*/}
      {/*    onChange={newValue =>*/}
      {/*      setSuffixedAttributes(setAttributes, { imageCaption: newValue }, suffix)*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}

      {/*{options?.allowDescription && (*/}
      {/*  <TextareaControl*/}
      {/*    __nextHasNoMarginBottom*/}
      {/*    __next40pxDefaultSize*/}
      {/*    label="Description"*/}
      {/*    value={imageDescription}*/}
      {/*    onChange={newValue =>*/}
      {/*    setSuffixedAttributes(setAttributes, { imageDescription: newValue }, suffix)*/}
      {/*    }*/}
      {/*  />*/}
      {/*)}*/}

      {options?.allowFit && (
        <SelectControl
          label="Image fit"
          value={imageFit}
          options={[
            { label: "Cover", value: "cover" },
            { label: "Contain", value: "contain" },
          ]}
          onChange={newVal => {
            setSuffixedAttributes(setAttributes, {
              imageFit: newVal,
              imageIsResponsive: Boolean(String(newVal) === "cover"),
            }, suffix)
          }}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />
      )}

      {options?.allowFeaturedImage && (
        <ToggleControl
          label="Use featured image of this post"
          checked={useFeaturedImage}
          onChange={() =>
            setSuffixedAttributes(setAttributes, {
              useFeaturedImage: !useFeaturedImage,
            }, suffix)
          }
        />
      )}

      {options?.allowContainedHeight && (
        <ToggleControl
          label="Contained height"
          help="Off: crop to the block ratio (equal height when side by side). On: show the whole image at its natural height."
          checked={!!containedHeight}
          onChange={value =>
            setSuffixedAttributes(setAttributes, { containedHeight: value }, suffix)
          }
        />
      )}
    </>
  );
}
