import { Image } from "@marameodesign/components";

export const Save = props => {
  const { isContainedHeight } = props.attributes;

  return (
    <Image.Content
      {...props}
      wrapperClassName="wp-block-mmd-image mmd-spacing mmd-spacing-md mmd-margin-y"
      ratioWrapperClassName="is-ratio-image ratio-3-2 mod--feature--preview"
      isContainedHeight={isContainedHeight}
    />
  );
};
