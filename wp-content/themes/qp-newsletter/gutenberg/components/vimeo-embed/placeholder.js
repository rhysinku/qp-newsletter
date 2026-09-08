import { getSpriteUri } from "@marameodesign/utils";

const VimeoPlaceholder = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "#353535",
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
          color: "#17D5FF",
        }}
      >
        <use href={getSpriteUri("Play")}/>
      </svg>
    </div>
  );
};

export default VimeoPlaceholder;
