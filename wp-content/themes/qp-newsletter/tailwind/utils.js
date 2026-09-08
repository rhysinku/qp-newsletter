const pxToRem = (value, base = 16) => {
  const pxValue = parseFloat(value);
  return `${pxValue / base}rem`;
};

const combineSelectors = (selectorsArray) => {
  return selectorsArray.join(', ');
};

export {pxToRem, combineSelectors};
