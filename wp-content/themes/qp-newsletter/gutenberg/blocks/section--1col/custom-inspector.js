import { SelectControl, PanelBody } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";
import { getContentWidthClassName } from "@marameodesign/utils";

const CONTENT_WIDTH_CHOICES = [
  {
    label: "Narrow",
    value: "narrow",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Fullwidth",
    value: "fullwidth",
  },
];

export default function CustomInspector(props) {
  const { attributes, setAttributes } = props;
  const { contentWidth, containerClassName } = attributes;

  const handleContentWidthChange = (newValue) => {
    // Get the content width class name
    const contentWidthClass = getContentWidthClassName(newValue);
    
    // Filter out any existing content width classes from containerClassName
    const filteredContainerClassName = containerClassName.filter(className => 
      !className.includes('max-w-screen-md') && 
      !className.includes('max-w-screen-2xl') && 
      !className.includes('max-w-none')
    );
    
    // Add the new content width class
    const updatedContainerClassName = contentWidthClass 
      ? [...filteredContainerClassName, contentWidthClass]
      : filteredContainerClassName;
    
    setAttributes({ 
      contentWidth: newValue,
      containerClassName: updatedContainerClassName
    });
  };

  return (
    <InspectorControls>
      <PanelBody title="Item Display Settings">
        <SelectControl
          label="Content Width"
          value={contentWidth}
          options={CONTENT_WIDTH_CHOICES}
          onChange={handleContentWidthChange}
          __next40pxDefaultSize
          __nextHasNoMarginBottom
        />
      </PanelBody>
    </InspectorControls>
  );
}
