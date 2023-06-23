import { types } from "./types";

export const getIdByUrl = (url) => {
  const parts = url.split("/");
  return parts[6];
};

export const formatName = (name) => {
  if (!name) return "";

  const transformed = name.replaceAll("-", " ");
  return transformed;
};

export const getImagesFromSprites = (sprites) => {
  let arr = [];
  Object.keys(sprites)
    .filter((key) => sprites[key] && typeof sprites[key] == "string")
    .map((key) => arr.push(sprites[key]));
  arr = arr.reverse();

  if (arr.length > 4) return arr.slice(0, 4);
  return arr;
};

export const getTypeColor = (color) => {
  if (color in types) return types[color];
  return types["unknown"];
};
