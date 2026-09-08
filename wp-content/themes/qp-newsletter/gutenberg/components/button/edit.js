import { Link } from "@10up/block-components";
import { setSuffixedAttributes, getSpriteUri } from "@marameodesign/utils";
import get from "./get";

export default function Edit(props) {
  const {
    setAttributes,
    isSelected,
    className = "",
    blockProps = null,
    hideWhenInactive = false,
    suffix = "",
  } = props;
  const { buttonText, buttonUrl, buttonOpenInNewTab, buttonType } = get(
    props,
    suffix
  );

  /**
   * Link change
   */
  const handleLinkChange = value => {
    const { url, title, opensInNewTab } = value;
    setSuffixedAttributes(
      setAttributes,
      {
        buttonUrl: url,
        buttonOpenInNewTab: opensInNewTab,
        buttonText: title,
      },
      suffix
    );
  };

  /**
   * Text-only change
   */
  const handleTextChange = newVal => {
    setSuffixedAttributes(setAttributes, { buttonText: newVal }, suffix);
  };

  /**
   * Link remove
   */
  const handleLinkRemove = () => {
    setSuffixedAttributes(
      setAttributes,
      {
        buttonUrl: null,
        buttonOpenInNewTab: false,
      },
      suffix
    );
  };

  const mergedClassName = `${blockProps?.className || ''} ${className} mmd-button ${buttonType}`.trim();

  return (
    <div
      {...(blockProps || {})}
      className={mergedClassName}
      style={{
        display: hideWhenInactive && !buttonText && !isSelected ? "none" : null,
      }}
    >
      <Link
        value={buttonText}
        url={buttonUrl}
        opensInNewTab={buttonOpenInNewTab}
        onTextChange={handleTextChange}
        onLinkChange={handleLinkChange}
        onLinkRemove={handleLinkRemove}
        placeholder="Button Text"
      />

      {buttonType === "mod--variant--arrow" && (
        <svg className="icon" width="16" height="16">
          <use href={getSpriteUri("ArrowRight")}></use>
        </svg>
      )}
    </div>
  );
}
