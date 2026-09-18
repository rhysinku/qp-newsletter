import { PanelBody, ToggleControl } from "@wordpress/components";
import { InspectorControls } from "@wordpress/block-editor";

export default function CustomInspector(props) {
  const { attributes, setAttributes } = props;
  const { enableStickySidebar, wrapperClassName, columns } = attributes;

  const handleStickySidebarChange = value => {
    // Filter out any existing sticky-sidebar class from wrapperClassName
    const filteredWrapperClassName = wrapperClassName.filter(
      className => className !== "sticky-sidebar"
    );

    // Add the sticky-sidebar class if enabled
    const updatedWrapperClassName = value
      ? [...filteredWrapperClassName, "sticky-sidebar"]
      : filteredWrapperClassName;

    setAttributes({
      enableStickySidebar: value,
      wrapperClassName: updatedWrapperClassName,
    });
  };

  return (
    <>
      {["lg:cols-30-70", "lg:cols-70-30"].includes(columns) && (
        <InspectorControls>
          <PanelBody title="Sidebar Settings">
            <ToggleControl
              label="Enable Sticky Sidebar"
              checked={enableStickySidebar}
              onChange={handleStickySidebarChange}
            />
          </PanelBody>
        </InspectorControls>
      )}
    </>
  );
}
