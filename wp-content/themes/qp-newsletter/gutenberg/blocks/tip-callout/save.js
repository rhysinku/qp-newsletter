import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save(props) {
  const { attributes } = props;
  const { type, title, content } = attributes;

  const blockProps = useBlockProps.save({
    className: `mmd-tip-callout qp-tip-callout mod--type--${type} border-l-4 p-5 rounded-r-md my-6`,
  });

  return (
    <div {...blockProps}>
      <div className="mmd-tip-callout__container">
        {title && (
          <h4 className="mmd-tip-callout__title font-bold text-lg mb-2">
            {title}
          </h4>
        )}
        <RichText.Content
          tagName="p"
          className="mmd-tip-callout__content text-base font-sans"
          value={content}
        />
      </div>
    </div>
  );
}
