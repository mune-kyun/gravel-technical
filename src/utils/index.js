export const getIdByUrl = (url) => {
  const parts = url.split("/");
  return parts[6];
};

export const formatName = (name) => {
  const transformed = name.replaceAll("-", " ");
  return transformed;
};
