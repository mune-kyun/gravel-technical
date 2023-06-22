import { useEffect, useState } from "react";
import { getPokemon } from "../api/pokemon";

export default function Pokemon() {
  const [page, setPage] = useState(1);
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { pokemon } = await getPokemon();
      setPokemon(pokemon);
    };

    fetchData();
  }, [page]);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <p>pokemon</p>
      {pokemon.map(({ name }) => {
        return <p key={name}>{name}</p>;
      })}
    </main>
  );
}
