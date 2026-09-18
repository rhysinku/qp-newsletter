import { useBlockProps } from "@wordpress/block-editor";
import { Image } from "@marameodesign/components";

export default function save(props) {
  const { attributes } = props;
  const { logoLink, openInNewTab } = attributes;

  const blockProps = useBlockProps.save({
    className: "mmd-logo-group-item mmd-col",
  });

  return (
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
  );
}

/**c
 * Logo image
 */
const LogoImage = props => {
  return (
    <Image.Content
      {...props}
      className="object-contain object-center w-full h-auto"
      ratioWrapperClassName="w-full"
      captionClassName="text-center lg:text-left"
    />
  );
};
