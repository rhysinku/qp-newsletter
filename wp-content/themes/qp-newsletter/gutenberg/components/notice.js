export const Notice = ({ message }) => {
  return (
    <div
      className="mmd-editor-notice"
      dangerouslySetInnerHTML={{ __html: message }}
    />
  );
}
