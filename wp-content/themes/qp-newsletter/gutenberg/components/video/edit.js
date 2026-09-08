import { MediaUpload } from "@wordpress/block-editor";
import { twMerge } from "tailwind-merge";

import { handleVideoSelection } from "./functions";
import get from "./get";
import { getSpriteUri, spriteUri } from "@marameodesign/utils";

export default function Edit(props) {
  const { attributes, setAttributes, className, wrapperClassName } = props;
  const { videoId, videoUri, videoMime, videoHeight, videoWidth } = get(props);
  // todo: @hart
  //  - optimize video element for performance (https://web.dev/articles/lazy-loading-video)
  //  - support for more attributes (muted, controls, etc.)

  /**
   * Classes
   */
  const componentClassName = twMerge("block w-full h-auto", className);
  const wrapperClasses = twMerge(
    "mmd-media-wrapper relative overflow-hidden ratio-4-3",
    videoId && "is-ratio-image",
    wrapperClassName
  );

  return (
    <MediaUpload
      onSelect={image => handleVideoSelection(setAttributes, image, attributes)}
      allowedTypes={["video"]}
      value={videoId}
      render={({ open }) => (
        <>
          {videoId ? (
            <figure
              onClick={open}
              className={wrapperClasses}
              style={{
                cursor: "pointer",
              }}
            >
              <video
                controls
                autoPlay
                muted
                playsInline={true}
                width={videoWidth}
                height={videoHeight}
                className={componentClassName}
                style={{
                  pointerEvents: "none",
                }}
              >
                <source src={videoUri} type={videoMime} />
                Your browser does not support the video tag.
              </video>
            </figure>
          ) : (
            <div
              className={wrapperClasses}
              onClick={open}
              style={{
                backgroundColor: "#333",
                cursor: "pointer",
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
                  color: "#fcfcfc",
                }}
              >
                <use href={getSpriteUri("Play")}/>
              </svg>
            </div>
          )}
        </>
      )}
    />
  );
}
