import { useBlockProps } from "@wordpress/block-editor";
import { Text, SVG } from "@marameodesign/components";

import "./style.scss";

export const Save = props => {
  const blockProps = useBlockProps.save({
    className:
      "mmd-quote leading-tight relative isolate lg:flex flex-row items-start gap-4 lg:gap-6 py-6 lg:px-4",
  });

  return (
    <blockquote {...blockProps}>
      <SVG.Content
        className="mmd-quote__mark mr-4 lg:mr-0 text-current flex-shrink-0 float-left lg:float-none"
        width="30"
        height="20"
        sprite="DoubleQuote"
      />

      <div className="mmd-quote__content flex-1 space-y-4">
        <Text.Content
          {...props}
          className="text-[1.55rem] lg:text-[2rem] font-bold italic leading-tight m-0"
        />

        {/* Author attribution */}
        <Text.Content
          {...props}
          suffix="Author"
          className="mmd-quote__attribution block mt-4 not-italic"
          tagName="cite"
        />
      </div>
    </blockquote>
  );
};
