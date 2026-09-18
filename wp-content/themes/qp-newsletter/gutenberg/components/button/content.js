import { getSpriteUri } from "@marameodesign/utils";
import get from "./get";

export default function Content(props) {
  const { className, suffix = "" } = props;
  const {
    buttonText,
    buttonUrl,
    buttonType,
    buttonTarget,
    buttonRelation,
    enableNewsletterType,
  } = get(props, suffix);

  return (
    <>
      {buttonText && (
        <>
          {enableNewsletterType ? (
            <button
              type="button"
              className={`${className} mmd-button ${buttonType}`}
              data-component="newsletter-subscribe-button"
              aria-label="Open newsletter sign up form"
            >
              {buttonText}
            </button>
          ) : buttonUrl ? (
            <a
              className={`${className} mmd-button ${buttonType}`}
              href={buttonUrl}
              target={buttonTarget}
              rel={buttonRelation}
            >
              {buttonText}
              {buttonType === "mod--variant--arrow" && (
                <svg className="icon" width="16" height="16">
                  <use href={getSpriteUri("ArrowRight")}></use>
                </svg>
              )}
            </a>
          ) : null}
        </>
      )}
    </>
  );
}
