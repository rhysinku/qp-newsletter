import { twMerge } from "tailwind-merge";
import { convertYoutubeUrlToIframe } from "./compose-iframe";
import { getSpriteUri } from "@marameodesign/utils";

export default function Content(props) {
  const { attributes, wrapperClassName } = props;
  const { youtubeUrl, youtubeThumbnail } = attributes;
  const iframeElement = convertYoutubeUrlToIframe(youtubeUrl);
  const videoIsValid = youtubeUrl && iframeElement;

  /**
   * Component wrapper classes
   */
  const componentClassName = twMerge(
    "embed-code-wrapper js-yt-facade relative ratio-4-3 overflow-hidden bg-black",
    wrapperClassName,
  );

  return (
    <>
      {videoIsValid && (
        <div className={componentClassName}>
          <button
            type="button"
            className="js-play-btn block cursor-pointer"
            aria-label="Play button for YouTube video facade"
          >
            <img
              src={youtubeThumbnail}
              alt="YouTube video thumbnail"
              className="absolute inset-0 size-full object-cover object-center js-thumb"
              decoding="async"
              loading="lazy"
              width="1000"
              height="670"
            />
            <svg
              aria-hidden={true}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-2/4 z-10"
              style={{
                color: "#FF0000",
                width: "66px",
                height: "66px",
              }}
            >
              <use href={getSpriteUri("Play")} />
            </svg>
            <span data-yt-iframe={iframeElement} />
          </button>
          <noscript dangerouslySetInnerHTML={{ __html: iframeElement }} />
        </div>
      )}
    </>
  );
}
