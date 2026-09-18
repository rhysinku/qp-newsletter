import { Image } from "@marameodesign/components";
import { HeroSimple, HeroFeatured, HeroLarge } from "./variants";

import "./style.scss";

export const Save = (props) => {
  const { showImageAsBackground } = props.attributes;
  const { imageId } = Image.get(props);
  
  if (imageId) {
    if (showImageAsBackground) {
      return <HeroLarge.Save {...props} />;
    }
    else {
      return <HeroFeatured.Save {...props} />;
    }
  }
  else {
    return <HeroSimple.Save {...props} />;
  }
}
