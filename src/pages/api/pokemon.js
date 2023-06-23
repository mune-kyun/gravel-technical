export const itemPerPage = 16;

export const getPokemon = async (offset = 0) => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${
      offset * itemPerPage
    }&limit=${itemPerPage}`
  );
  const json = await res.json();

  return { pokemon: json.results, pageCount: json.count / itemPerPage };
};

export default {
  getPokemon,
  itemPerPage,
};
