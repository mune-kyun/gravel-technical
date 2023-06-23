import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

import { getPokemon, itemPerPage } from "./api/pokemon";

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
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <p>pokemon</p>
      {pokemon.map(({ name }) => {
        return (
          <Link href={`/pokemon/${name}`} key={name}>
            <p>{name}</p>
          </Link>
        );
      })}
      <ReactPaginate
        breakLabel="..."
        previousLabel={"prev"}
        nextLabel={"next"}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </main>
  );
}
