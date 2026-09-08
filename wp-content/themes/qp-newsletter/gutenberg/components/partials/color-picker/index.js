import { Button } from "@wordpress/components";

const wrapperStyles = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: ".5rem",
};

export function ColorPicker(props) {
  const { choices } = props;

  /**
   * choices example
   * [
   *       { label: 'White', key: 'white', color: '#fff' },
   *       { label: 'Black', key: 'black', color: '#000' },
   *       { label: 'Grey', key: 'grey', color: '#eee' },
   *     ]
   */
  if (!choices) {
    console.error(
      "ColorPicker partial component: Choices prop is not detected."
    );
    return;
  }

  return (
    <div style={wrapperStyles}>
      {choices.map(option => (
        <Button
          key={option.key}
          isPrimary={selectedColor === option.key}
          onClick={() => setAttributes({ bgColor: option.key })}
          className={"m-custom--colorpicker--button"}
          title={option.label}
          style={{ backgroundColor: option.color }}
        />
      ))}
    </div>
  );
}
