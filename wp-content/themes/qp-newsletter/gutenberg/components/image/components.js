export const CustomLabel = ({ text }) => {
  return (
    <>
      {text && <div style={{ margin: "2em 0", fontWeight: 700 }}>{text}</div>}
    </>
  );
};
