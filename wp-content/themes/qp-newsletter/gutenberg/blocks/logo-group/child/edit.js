import { useBlockProps } from "@wordpress/block-editor";
import { Image } from "@marameodesign/components";
import Inspector from "./inspector";

import "./editor.scss";

export default function edit(props) {
  const { attributes } = props;
  const { logoLink, openInNewTab } = attributes;

  const blockProps = useBlockProps({
    className: "mmd-logo-group-item mmd-col",
  });

  return (
    <>
      <Inspector {...props} />

      <div {...blockProps}>
        {logoLink ? (
          <a
            href={logoLink}
            className="block"
            target={openInNewTab ? "_blank" : "_self"}
            rel={openInNewTab ? "noopener noreferrer" : null}
          >
            <LogoImage {...props} />
          </a>
        ) : (
          <LogoImage {...props} />
        )}
      </div>
    </>
  );
}

/**
 * Logo image
 */
const LogoImage = props => {
  return (
    <Image.Edit
      {...props}
      isClickable={false}
      className="object-contain object-center w-full h-auto"
      ratioWrapperClassName="w-full"
      captionClassName="text-center lg:text-left"
    />
  );
};
