import { Preview, Image } from "@marameodesign/components";
import Inspector from "./inspector";
import { HeroFeatured, HeroSimple } from "./variants";
import "./editor.scss";

export const Edit = props => {
  const { preview } = Preview.get(props);
  const { setAttributes, attributes } = props;
  const { heroType = "featured" } = attributes;
  const { imageUri, useFeaturedImage, imageRis } = Image.get(props);

  Image.useImageAttributesSync({
    imageUri,
    useFeaturedImage,
    imageRis,
    setAttributes,
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  return (
    <>
      <Inspector {...props} />
      {heroType === "simple" ? (
        <HeroSimple.Edit {...props} />
      ) : (
        <HeroFeatured.Edit {...props} />
      )}
    </>
  );
};
