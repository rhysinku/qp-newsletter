import addAttributes from "./attributes";
import InspectorControl from "./inspector-control";
import { get, getClassName } from "./get";
import Content from "./content";

export const BackgroundDecoration = props => null;

BackgroundDecoration.addAttributes = addAttributes;
BackgroundDecoration.InspectorControl = InspectorControl;
BackgroundDecoration.get = get;
BackgroundDecoration.getClassName = getClassName;
BackgroundDecoration.Content = Content;
