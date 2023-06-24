import AppTitle from "@/components/AppTitle";
import Card from "@/components/Card";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useMainContext } from "../context/mainContext";
import { transformObjectToArray } from "@/utils";

const ITEM_PER_PAGE = 16;

export default function MyList() {
  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pokemon, setPokemon] = useState([]);

  const { mainGetPokemon } = useMainContext();

  const fetchPokemonLocal = (offset = 0) => {
    const data = transformObjectToArray(mainGetPokemon());
    setPokemon(data);
    // setPageCount(pageCount);
  };

  useEffect(() => {
    fetchPokemonLocal(offset);
  }, [offset]);

  const handlePageClick = (event) => {
    setOffset(event.selected);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 gap-4`}
    >
      <AppTitle />
      <Tabs currentLink={"mylist"} />
      <div className="grid grid-cols-2 gap-6 gap-x-10 sm:gap-x-20 md:grid-cols-4 mb-6 border-t-2 border-[#7dca5c] ">
        {pokemon.map(({ name, id }) => (
          <Card key={name} name={name} id={id} />
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
