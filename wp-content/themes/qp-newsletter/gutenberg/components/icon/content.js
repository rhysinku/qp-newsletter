import get from "./get";
import { SVG } from "@marameodesign/components";

export default function Content(props) {
  const {
    width = 24,
    height = 24,
    className = "",
    loading = "lazy",
    ariaHidden = true,
    suffix = "",
  } = props;
  const { icon, iconAlt } = get(props, suffix);

  /**
   * NOTE:
   *  Switched from SVG sprite to SVG as image due to:
   *  - Complex icon design resulting in bloated SVG code (HTML)
   *  - Using SVG as sprite for the brand icons resulted in broken icons
   */

  return (
    <>
      {icon && (
        <img
          src={icon}
          alt={iconAlt}
          className={className}
          width={width}
          height={height}
          decoding="async"
          loading={loading}
          aria-hidden={ariaHidden}
        />
      )}
    </>
  );
}
