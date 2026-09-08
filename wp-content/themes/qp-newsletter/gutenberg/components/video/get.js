export default function get(props) {
  return {
    videoId: props.attributes.videoId,
    videoUri: props.attributes.videoUri,
    videoWidth: props.attributes.videoWidth,
    videoHeight: props.attributes.videoHeight,
  };
}
