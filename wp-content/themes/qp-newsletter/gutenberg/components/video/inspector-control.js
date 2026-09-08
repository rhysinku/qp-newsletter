import { Button } from "@wordpress/components";
import { MediaUpload } from "@wordpress/block-editor";

import { handleVideoRemoval, handleVideoSelection } from "./functions";
import get from "./get";

export default function InspectorControl(props) {
  const { attributes, setAttributes } = props;
  const { videoId, videoUri, videoMime } = get(props);

  return (
    <MediaUpload
      onSelect={video => handleVideoSelection(setAttributes, video, attributes)}
      multiple={false}
      allowedTypes={["video"]}
      render={({ open }) => (
        <>
          {videoId ? (
            <div className="m-custom-media-preview relative overflow-hidden">
              <video
                key={videoId}
                width="320"
                height="240"
                onClick={open}
                autoPlay="true"
                muted="true"
                style={{
                  width: "100%",
                  height: "170px",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  cursor: "pointer",
                }}
              >
                <source src={videoUri} type={videoMime} />
                Your browser does not support the video tag.
              </video>
              <div className="m-custom-media-buttons">
                <Button onClick={open} className="m-custom-media-button">
                  Replace
                </Button>
                <Button
                  onClick={() => handleVideoRemoval(setAttributes)}
                  className="m-custom-media-button"
                >
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <Button className="m-button--upload-new-media" onClick={open}>
              Insert Video
            </Button>
          )}
        </>
      )}
    />
  );
}
