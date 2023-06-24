import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

import { getPokemon } from "./api/pokemon";
import Card from "@/components/Card";
import Tabs from "@/components/Tabs";
import AppTitle from "@/components/AppTitle";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { page: pageParam } = router.query;

  const [offset, setOffset] = useState(pageParam);
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
    router.push({
      pathname: "",
      query: { page: event.selected + 1 },
    });
    setOffset(event.selected);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 md:px-10 gap-4`}
    >
      <AppTitle />
      <Tabs currentLink={"home"} />
      <div className="grid grid-cols-2 gap-6 gap-x-10 sm:gap-x-20 md:grid-cols-4 mb-6 border-t-2 border-[#7dca5c] ">
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
        initialPage={pageParam ? pageParam - 1 : 0}
      />
    </main>
  );
}
