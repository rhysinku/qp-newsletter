export const isInPostWithSidebar = postType => {
  return [
    "article",
    "mmr-article",
    "event",
    "project",
    "event",
    "resource",
  ].includes(postType);
};
