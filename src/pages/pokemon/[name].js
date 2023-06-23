import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getPokemonDetail } from "../api/pokemon";

export default function PokemonDetail() {
  const router = useRouter();
  const { name } = router.query;

  const fetchDetail = async (name) => {
    await getPokemonDetail(name);
  };

  useEffect(() => {
    if (name) fetchDetail(name);
  }, [name]);
  // image, pokemon name, type, weight, height, abilities, moves, and stats.

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <p>pokemon detail</p>
    </main>
  );
}
