import { useBlockProps, InspectorControls, RichText } from "@wordpress/block-editor";
import { PanelBody, SelectControl, TextareaControl } from "@wordpress/components";
import { Preview } from "../../components/preview";

export default function Edit(props) {
  const { attributes, setAttributes } = props;
  const { code, language, caption, preview } = attributes;

  const blockProps = useBlockProps({
    className: "mmd-code-snippet qp-code-snippet",
  });

  if (preview) {
    return <Preview.Content {...props} />;
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title="Code Settings" initialOpen={true}>
          <SelectControl
            label="Language"
            value={language}
            options={[
              { label: "JavaScript", value: "javascript" },
              { label: "PHP", value: "php" },
              { label: "Rust", value: "rust" },
              { label: "Bash / Shell", value: "bash" },
              { label: "HTML", value: "html" },
              { label: "CSS", value: "css" },
              { label: "Python", value: "python" },
            ]}
            onChange={(value) => setAttributes({ language: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div className="mmd-code-snippet__header">
        <span className="mmd-code-snippet__lang">{language.toUpperCase()}</span>
        <button type="button" className="mmd-code-snippet__copy-btn" disabled>
          Copy
        </button>
      </div>

      <TextareaControl
        label="Code Snippet"
        value={code}
        onChange={(value) => setAttributes({ code: value })}
        placeholder="// Paste or write your code snippet here..."
        className="mmd-code-snippet__textarea font-mono"
      />

      <RichText
        tagName="p"
        className="mmd-code-snippet__caption"
        value={caption}
        onChange={(value) => setAttributes({ caption: value })}
        placeholder="Add optional caption..."
        allowedFormats={["core/bold", "core/italic", "core/link"]}
      />
    </div>
  );
}
