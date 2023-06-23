import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { getPokemon } from "./api/pokemon";
import Card from "@/components/card";

export default function Home() {
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pokemon, setPokemon] = useState([]);

  const fetchPokemon = async (offset = 0) => {
    const { pokemon, pageCount } = await getPokemon(offset);
    setPokemon(pokemon);
    setPageCount(pageCount);
  };

  useEffect(() => {
    fetchPokemon(offset);
  }, [offset]);

  const handlePageClick = (event) => {
    setOffset(event.selected);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 gap-4`}
    >
      <h1 className="text-[#7dca5c] text-2xl sm:text-4xl font-bold">Pokédex</h1>
      <div className="grid grid-cols-2 gap-6 gap-x-10 sm:gap-x-20 md:grid-cols-4 mb-6">
        {pokemon.map(({ name, url }) => (
          <Card key={name} name={name} url={url} />
        ))}
      </div>
      <ReactPaginate
        breakLabel="..."
        previousLabel={"prev"}
        nextLabel={"next"}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </main>
  );
}
