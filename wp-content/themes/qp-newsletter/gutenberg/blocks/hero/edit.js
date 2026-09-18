import {
  Preview,
  Image,
} from "@marameodesign/components";

import Inspector from "./inspector";
import { HeroSimple, HeroFeatured, HeroLarge } from "./variants";

import "./editor.scss";

export const Edit = (props) => {
  const { preview } = Preview.get(props);
  const { setAttributes } = props;
  const { showImageAsBackground } = props.attributes;
  const { imageId, imageUri, useFeaturedImage, imageRis } = Image.get(props);
  
  Image.useImageAttributesSync({
    imageUri,
    useFeaturedImage,
    imageRis,
    setAttributes,
  });

  if (preview) {
    return Preview.Content(props);
  }

  if (imageId) {
    if (showImageAsBackground) {
      return <>
        <Inspector {...props} />
        <HeroLarge.Edit {...props} />
      </>;
    }
    else {
      return <>
        <Inspector {...props} />
        <HeroFeatured.Edit {...props} />
      </>;
    }
  }
  else {
    return <>
      <Inspector {...props} />
      <HeroSimple.Edit {...props} />
    </>;
  }
}
