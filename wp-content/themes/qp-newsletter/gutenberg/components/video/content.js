import { twMerge } from "tailwind-merge";
import get from "./get";

export default function Content(props) {
  const { className, wrapperClassName } = props;
  const { videoId, videoUri, videoMime, videoHeight, videoWidth } = get(props);
  const isValid = videoId && videoUri;

  return (
    <>
      {isValid && (
        <figure
          className={twMerge(
            "relative isolate overflow-hidden ratio-4-3",
            wrapperClassName,
          )}
        >
          <video
            controls
            width={videoWidth}
            height={videoHeight}
            preload="false"
            playsInline={true}
            className={twMerge(
              "block absolute inset-0 size-full object-center object-cover",
              className,
            )}
          >
            <source src={videoUri} type={videoMime} />
            Your browser does not support the video tag.
          </video>
        </figure>
      )}
    </>
  );
}
