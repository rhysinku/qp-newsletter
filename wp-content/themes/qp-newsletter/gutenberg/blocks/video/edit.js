import { useBlockProps } from "@wordpress/block-editor";
import { Preview, Media } from "@marameodesign/components";
import Inspector from "./inspector";

export default function edit(props) {
  const { preview } = Preview.get(props);

  const blockProps = useBlockProps({
    className: "mmd-video mmd-spacing mmd-spacing-md mmd-margin-y",
  });

  return (
    <>
      <Preview.Content {...props} />

      {!preview && (
        <>
          <Inspector {...props} />

          <div {...blockProps}>
            <Media.Edit {...props} />
          </div>
        </>
      )}
    </>
  );
}
