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

const statReplaceCase = {
  hp: "HP",
};

export const transformPokemonDetailData = (data) => {
  const transformedData = {};
  transformedData["weight"] = data["weight"];
  transformedData["height"] = data["height"];
  transformedData["types"] = data["types"];
  transformedData["id"] = data["id"];
  transformedData["name"] = data["name"];

  transformedData["stats"] = [];
  data.stats.map((stat) => {
    const base = stat.base_stat;
    let name = stat.stat.name;
    name =
      name in statReplaceCase
        ? statReplaceCase[name]
        : name.replaceAll("-", " ");
    transformedData["stats"].push({ name, base });
  });

  transformedData["sprites"] = data["sprites"];

  transformedData["abilities"] = [];
  data.abilities.map((ability) => {
    transformedData["abilities"].push(ability.ability.name);
  });

  transformedData["moves"] = [];
  data.moves.map((move) => {
    transformedData["moves"].push(move.move);
  });

  return transformedData;
};

export const getFifty = () => {
  return Math.random() < 0.5;
};
