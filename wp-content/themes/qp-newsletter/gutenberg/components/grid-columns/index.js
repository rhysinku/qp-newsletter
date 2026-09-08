import addAttributes from "./attributes";
import { InspectorControl, watchParentAttributes } from "./inspector-control";
import get from "./get";

export const GridColumns = props => null;

GridColumns.addAttributes = addAttributes;
GridColumns.InspectorControl = InspectorControl;
GridColumns.get = get;
GridColumns.watchParentAttributes = watchParentAttributes;
