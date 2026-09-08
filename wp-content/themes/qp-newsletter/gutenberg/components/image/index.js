import addAttributes from "./attributes";
import InspectorControl from "./inspector-control";
import get from "./get";
import Edit from "./edit";
import Content from "./content";

import { useImageAttributesSync } from "./use-image-attributes-sync";

export const Image = props => null;

Image.Edit = Edit;
Image.Content = Content;
Image.addAttributes = addAttributes;
Image.InspectorControl = InspectorControl;
Image.get = get;
Image.useImageAttributesSync = useImageAttributesSync;
