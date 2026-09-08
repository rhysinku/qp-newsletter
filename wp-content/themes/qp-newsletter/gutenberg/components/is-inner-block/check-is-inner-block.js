import { useRootParentBlock } from "@marameodesign/utils";
import { useEffect } from "@wordpress/element";

export default function checkIfInnerBlock(props) {
  const { clientId, setAttributes } = props;
  const parentBlock = useRootParentBlock(clientId);

  useEffect(() => {
    setAttributes({ isInnerBlock: parentBlock?.clientId !== props.clientId });
  }, []);
}
