/**
 * Set multiple attributes with support for suffixes
 */
export const setSuffixedAttributes = (
  setAttributes,
  attributes,
  suffix = ""
) => {
  const suffixedAttributes = Object.entries(attributes).reduce(
    (acc, [key, value]) => {
      acc[`${key}${suffix}`] = value;
      return acc;
    },
    {}
  );

  setAttributes(suffixedAttributes);
};