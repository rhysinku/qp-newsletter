export const minifyId = (id) => {
  const compressedId = id.replace(/-/g, '');
  return compressedId.substring(0, 6);
}
