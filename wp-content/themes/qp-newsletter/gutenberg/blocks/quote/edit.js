import { useBlockProps } from "@wordpress/block-editor";
import { Text, Preview, SVG } from "@marameodesign/components";

import "./editor.scss";

export const Edit = props => {
  const { preview } = Preview.get(props);

  const blockProps = useBlockProps({
    className:
      "mmd-quote leading-tight relative isolate lg:flex flex-row items-start gap-4 lg:gap-6 py-6 lg:px-4",
  });

  return (
    <>
      {preview && <Preview.Content {...props} />}

      {!preview && (
        <blockquote {...blockProps}>
          <SVG.Content
            className="mmd-quote__mark mr-4 lg:mr-0 text-current flex-shrink-0 float-left lg:float-none"
            width="30"
            height="20"
            sprite="DoubleQuote"
          />

          <div className="mmd-quote__content flex-1 space-y-4">
            <Text.Edit
              {...props}
              className="text-[2rem] font-bold italic leading-tight m-0"
              placeholder="Enter your quote here..."
            />

            {/* Author attribution */}
            <Text.Edit
              {...props}
              suffix="Author"
              className="mmd-quote__attribution block mt-4 not-italic"
              placeholder="Enter author name..."
              tagName="cite"
            />
          </div>
        </blockquote>
      )}
    </>
  );
};
