import { getSpriteUri } from "@marameodesign/utils";

export default function Content(props) {
  const {
    className = "",
    width = 100,
    height = 100,
    sprite = "",
    version = 9,
  } = props;

  return (
    <svg className={className} width={width} height={height} aria-hidden="true">
      <use href={getSpriteUri(sprite)}></use>
    </svg>
  );
}
