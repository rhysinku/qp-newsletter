import { twMerge } from "tailwind-merge";
import { composeVimeoIframe } from "./compose-iframe";

export default function Content(props) {
  const { attributes, wrapperClassName } = props;
  const { vimeoUrl } = attributes;
  const iframeElement = composeVimeoIframe(vimeoUrl);

  /**
   * Component wrapper classes
   */
  const componentClassName = twMerge(
    "embed-code-wrapper relative ratio-4-3 overflow-hidden bg-system-black",
    wrapperClassName,
  );

  return (
    <>
      {vimeoUrl && (
        <div className={componentClassName}>
          <div data-vimeo-iframe={iframeElement} />
          <noscript dangerouslySetInnerHTML={{ __html: iframeElement }} />
        </div>
      )}
    </>
  );
}
