import { useBlockProps, RichText } from "@wordpress/block-editor";

export default function Save(props) {
  const { attributes } = props;
  const { code, language, caption } = attributes;

  const blockProps = useBlockProps.save({
    className: `mmd-code-snippet qp-code-snippet mod--lang--${language}`,
  });

  return (
    <div {...blockProps} data-language={language}>
      <div className="mmd-code-snippet__header">
        <span className="mmd-code-snippet__lang">{language.toUpperCase()}</span>
        <button type="button" className="mmd-code-snippet__copy-btn" data-code={code}>
          Copy
        </button>
      </div>
      <pre className="mmd-code-snippet__pre">
        <code className={`language-${language} font-mono`}>{code}</code>
      </pre>
      {caption && (
        <RichText.Content
          tagName="p"
          className="mmd-code-snippet__caption text-center text-sm"
          value={caption}
        />
      )}
    </div>
  );
}
