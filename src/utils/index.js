export const getIdByUrl = (url) => {
  const parts = url.split("/");
  return parts[6];
};
