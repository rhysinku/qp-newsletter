import { TextControl } from "@wordpress/components";
import { twMerge } from "tailwind-merge";
import { composeVimeoIframe } from "./compose-iframe";
import VimeoPlaceholder from "./placeholder";

export default function Edit(props) {
  const { attributes, setAttributes, wrapperClassName } = props;
  const { vimeoUrl } = attributes;
  const iframeElement = composeVimeoIframe(vimeoUrl, {
    autoplay: 1,
    loop: 1,
  });

  /**
   * Component wrapper classes
   */
  const componentClassName = twMerge(
    "mmd-media-wrapper embed-code-wrapper relative ratio-4-3 overflow-hidden bg-system-black",
    wrapperClassName
  );

  return (
    <div className={componentClassName}>
      {iframeElement ? (
        <div
          dangerouslySetInnerHTML={{ __html: iframeElement }}
          style={{
            pointerEvents: "none",
          }}
        />
      ) : (
        <VimeoPlaceholder />
      )}

      <div className="yt-floating-input">
        <div className="yt-floating-input__container">
          <TextControl
            __nextHasNoMarginBottom
            label="Vimeo URL"
            value={vimeoUrl}
            onChange={newVal => setAttributes({ vimeoUrl: newVal })}
          />
        </div>
      </div>
    </div>
  );
}
