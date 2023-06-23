import { transformPokemonDetailData } from "@/utils";

const pokeAPIURL = "https://pokeapi.co/api/v2/";
export const itemPerPage = 16;

export const getPokemon = async (offset = 0) => {
  const res = await fetch(
    `${pokeAPIURL}pokemon?offset=${offset * itemPerPage}&limit=${itemPerPage}`
  );
  const json = await res.json();

  return { pokemon: json.results, pageCount: json.count / itemPerPage };
};

export const getPokemonDetail = async (name) => {
  const res = await fetch(`${pokeAPIURL}pokemon/${name}`);
  const json = await res.json();

  return transformPokemonDetailData(json);
};
