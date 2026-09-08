export default function get(props, suffix = "") {
  if (suffix) {
    return {
      heading: props.attributes[`heading${suffix}`],
      headingLevel: props.attributes[`headingLevel${suffix}`],
      preHeading: props.attributes[`preHeading${suffix}`],
      enablePreHeading: props.attributes[`enablePreHeading${suffix}`],
      usePostTitle: props.attributes[`usePostTitle${suffix}`],
      headingIcon: props.attributes[`headingIcon${suffix}`],
      headingIconPosition: props.attributes[`headingIconPosition${suffix}`],
      preHeadingTextColor: props.attributes[`preHeadingTextColor${suffix}`],
      headingAlignment: props.attributes[`headingAlignment${suffix}`],
      variant: props.attributes[`variant${suffix}`],
    };
  }

  return {
    heading: props.attributes.heading,
    headingLevel: props.attributes.headingLevel,
    preHeading: props.attributes.preHeading,
    enablePreHeading: props.attributes.enablePreHeading,
    usePostTitle: props.attributes.usePostTitle,
    headingIcon: props.attributes.headingIcon,
    headingIconPosition: props.attributes.headingIconPosition,
    preHeadingTextColor: props.attributes.preHeadingTextColor,
    headingAlignment: props.attributes.headingAlignment,
    variant: props.attributes[`variant${suffix}`],
  };
}
