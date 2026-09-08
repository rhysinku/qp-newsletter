import { TextControl } from "@wordpress/components";
import { useEffect } from "@wordpress/element";
import { twMerge } from "tailwind-merge";

import {
  convertYoutubeUrlToIframe,
  getYoutubeVideoThumbnail,
} from "./compose-iframe";
import YoutubePlaceholder from "./placeholder";
import { getSpriteUri } from "@marameodesign/utils";

export default function Edit(props) {
  const { attributes, setAttributes, wrapperClassName } = props;
  const { youtubeUrl, youtubeThumbnail } = attributes;
  const iframeElement = convertYoutubeUrlToIframe(youtubeUrl, true);

  /**
   * State management
   */
  useEffect(() => {
    const fetchThumbnail = async () => {
      const fetchedThumbnail = await getYoutubeVideoThumbnail(youtubeUrl);
      if (fetchedThumbnail !== youtubeThumbnail) {
        setAttributes({ youtubeThumbnail: fetchedThumbnail });
      }
    };

    fetchThumbnail().then();
  }, [youtubeUrl]);

  /**
   * Component wrapper classes
   */
  const componentClassName = twMerge(
    "mmd-media-wrapper embed-code-wrapper js-yt-facade relative ratio-4-3 overflow-hidden bg-black",
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#cccccc",
          }}
        >
          <svg
            aria-hidden={true}
            style={{
              width: "66px",
              height: "66px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "#FF0000",
            }}
          >
            <use href={getSpriteUri("Play")}/>
          </svg>
        </div>
      )}

      <div className="yt-floating-input">
        <div className="yt-floating-input__container">
          <TextControl
            __nextHasNoMarginBottom
            label="YouTube URL"
            value={youtubeUrl}
            onChange={newVal => setAttributes({ youtubeUrl: newVal })}
          />
        </div>
      </div>
    </div>
  );
}
