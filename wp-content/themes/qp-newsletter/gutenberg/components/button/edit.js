import { RichText } from "@wordpress/block-editor";
import { Link } from "@10up/block-components";
import { setSuffixedAttributes, getSpriteUri } from "@marameodesign/utils";
import get from "./get";

export default function Edit(props) {
  const {
    setAttributes,
    isSelected,
    className = "",
    hideWhenInactive = false,
    suffix = "",
  } = props;
  const {
    buttonText,
    buttonUrl,
    buttonOpenInNewTab,
    buttonType,
    enableNewsletterType,
  } = get(props, suffix);

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

  return (
    <div
      className={`${className} mmd-button ${buttonType}`}
      style={{
        display: hideWhenInactive && !buttonText && !isSelected ? "none" : null,
      }}
    >
      {enableNewsletterType ? (
        <RichText
          tagName="div"
          value={buttonText}
          allowedFormats={[]}
          onChange={handleTextChange}
          placeholder="Button Text"
        />
      ) : (
        <Link
          value={buttonText}
          url={buttonUrl}
          opensInNewTab={buttonOpenInNewTab}
          onTextChange={handleTextChange}
          onLinkChange={handleLinkChange}
          onLinkRemove={handleLinkRemove}
          placeholder="Button Text"
        />
      )}
      {buttonType === "mod--variant--arrow" && (
        <svg className="icon" width="16" height="16">
          <use href={getSpriteUri("ArrowRight")}></use>
        </svg>
      )}
    </div>
  );
}
