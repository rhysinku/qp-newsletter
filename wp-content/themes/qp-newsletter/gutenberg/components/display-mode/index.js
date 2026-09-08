import addAttributes from "./attributes";
import AttributesList from "./attributes-list";
import { InspectorControl, watchParentAttributes } from "./inspector-control";
import get from "./get";

export const DisplayMode = props => null;

DisplayMode.addAttributes = addAttributes;
DisplayMode.AttributesList = AttributesList;
DisplayMode.InspectorControl = InspectorControl;
DisplayMode.get = get;
DisplayMode.watchParentAttributes = watchParentAttributes;
