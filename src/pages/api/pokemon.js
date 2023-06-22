const itemLimit = 12;

export const getPokemon = async () => {
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${itemLimit}`
  );
  const json = await res.json();

  return { pokemon: json.results, pageCount: json.count / itemLimit };
};

export default {
  getPokemon,
};
