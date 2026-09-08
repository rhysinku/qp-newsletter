import { useEffect } from "@wordpress/element";
import {
  setSuffixedAttributes,
  useDirectParentBlock,
} from "@marameodesign/utils";
import { BackgroundColor } from "@marameodesign/components";

/**
 * Auto adjust the block theme based on the parent if bgColor === "bg-parent"
 * Note: Added this as the existing bg-parent option is not working
 */
const useAutoAdjustedBlockTheme = props => {
  const { clientId, setAttributes, suffix = "" } = props;
  const { bgColor } = BackgroundColor.get(props, suffix);

  const parentBlock = useDirectParentBlock(clientId);
  useEffect(() => {
    if (bgColor === "bg-parent" && parentBlock) {
      /**
       * NOTE:
       *  I used "mod--theme--inherit" here to fix CSS specificity issues.
       *  This class as of this writing has no specific styles yet.
       *  This is just to prevent "mod--theme--dark/light" styles to override "bg-*"-specific styles.
       *  Check `marameodesign/assets/css/components/button.css` for an example (inside the @layer base block).
       */
      setSuffixedAttributes(
        setAttributes,
        {
          blockTheme: "mod--theme--inherit",
        },
        suffix
      );
    }
  }, [bgColor, parentBlock]);
};

export default useAutoAdjustedBlockTheme;