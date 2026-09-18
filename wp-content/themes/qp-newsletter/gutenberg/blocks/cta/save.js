import { CtaDefault, CtaSimple } from "./variants";

export const Save = props => {
  const { variant = "mod--variant--default" } = props.attributes;

  return (
    <>
      {variant === "mod--variant--default" ? (
        <CtaDefault.Save {...props} />
      ) : (
        <CtaSimple.Save {...props} />
      )}
    </>
  );
};
