import addAttributes from "./attributes";
import Edit from "./edit";
import Content from "./content";
import InspectorControl from "./inspector-control";
import ToolbarControl from "./toolbar-control";
import get from "./get";

export const Heading = props => null;

Heading.addAttributes = addAttributes;
Heading.Edit = Edit;
Heading.Content = Content;
Heading.InspectorControl = InspectorControl;
Heading.ToolbarControl = ToolbarControl;
Heading.get = get;
