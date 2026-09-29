import { HeroFeatured, HeroSimple } from "./variants";
import "./style.scss";

export const Save = props => {
  const { heroType = "featured" } = props.attributes;

  if (heroType === "simple") {
    return <HeroSimple.Save {...props} />;
  }

  return <HeroFeatured.Save {...props} />;
};
