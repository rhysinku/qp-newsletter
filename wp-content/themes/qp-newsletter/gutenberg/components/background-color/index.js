import addAttributes from "./attributes";
import { InspectorControl } from "./inspector-control";
import get from "./get";
import useAutoAdjustedBlockTheme from "@marameodesign/components/background-color/use-auto-adjust-block-theme";

export const BackgroundColor = props => null;

BackgroundColor.addAttributes = addAttributes;
BackgroundColor.InspectorControl = InspectorControl;
BackgroundColor.get = get;
BackgroundColor.useAutoAdjustedBlockTheme = useAutoAdjustedBlockTheme;