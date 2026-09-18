import { BackgroundColor, Preview, NoToc } from "@marameodesign/components";
import { CtaDefault, CtaSimple } from "./variants";
import Inspector from "./inspector";
import "./editor.scss";

export const Edit = props => {
  const { variant } = props.attributes;

  const { preview } = Preview.get(props);

  BackgroundColor.useAutoAdjustedBlockTheme(props);

  return (
    <>
      {preview.preview && <Preview.Content {...props} />}

      {!preview.preview && (
        <>
          <Inspector {...props} />
          <NoToc.BlockControl {...props} />

          {variant === "mod--variant--default" ? (
            <CtaDefault.Edit {...props} />
          ) : (
            <CtaSimple.Edit {...props} />
          )}
        </>
      )}
    </>
  );
};
