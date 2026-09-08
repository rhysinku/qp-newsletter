export const getContentWidthClassName = (width) => {
  const classes = {
    narrow: "max-w-screen-md",
    normal: "max-w-screen-2xl",
    "narrow-center": "lg:max-w-[75%]",
    "narrow-left": "lg:max-w-[75%] lg:ml-0 lg:mr-auto",
    fullwidth: "max-w-none px-0",
  };


  const className = classes[width] ?? null;
  if (!className) {
    console.error("ContentWidth Component: Could not generate content width class");
    return;
  }

  return className;
}