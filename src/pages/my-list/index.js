import AppTitle from "@/components/AppTitle";
import Card from "@/components/Card";
import Tabs from "@/components/Tabs";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useMainContext } from "../context/mainContext";
import { transformObjectToArray } from "@/utils";
import { useRouter } from "next/router";
import Image from "next/image";
import Modal from "@/components/Modal";
import ConfirmationButton from "@/components/ConfirmationButton";
import Link from "next/link";

const ITEM_PER_PAGE = 16;

export default function MyList() {
  const router = useRouter();
  const { page: pageParam } = router.query;

  const [offset, setOffset] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [pokemon, setPokemon] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { mainGetPokemon, mainRemoveAllPokemon } = useMainContext();

  const fetchPokemonLocal = (offset = 0) => {
    let data = transformObjectToArray(mainGetPokemon());
    const pageCount = data.length / ITEM_PER_PAGE;

    data = data.slice(offset * ITEM_PER_PAGE, offset + ITEM_PER_PAGE);
    setPokemon(data);

    setPageCount(pageCount);
  };

  useEffect(() => {
    fetchPokemonLocal(offset);
  }, [offset]);

  const handlePageClick = (event) => {
    router.push({
      pathname: "/my-list",
      query: { page: event.selected + 1 },
    });
    setOffset(event.selected);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleReleaseAll = () => {
    mainRemoveAllPokemon();
    fetchPokemonLocal();
    closeModal();
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 md:px-10 gap-4`}
    >
      <AppTitle />
      <Tabs currentLink={"mylist"} />
      <div className="grid grid-cols-2 gap-6 gap-x-10 sm:gap-x-20 md:grid-cols-4 mb-6 border-t-2 border-[#7dca5c]">
        {pokemon.map(({ name, id, owned }) => (
          <Card
            key={name}
            name={name}
            mode={"mylist"}
            id={id}
            owned={owned}
            callbackAfterRemove={fetchPokemonLocal}
          />
        ))}
      </div>
      {pokemon.length > 0 && (
        <button
          onClick={openModal}
          className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex gap-2 items-center"
        >
          <Image
            className=""
            src={`/pokemon-release.png`}
            width={30}
            height={30}
            alt="remove"
          />
          <p>Release All</p>
        </button>
      )}
      {pokemon.length == 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="text-[#a2a0a5] font-semibold text-xl">
            Nothing to see here...
          </h2>
          <Link href="/">
            <button className="text-[#7dca5c] hover:text-white border border-[#7dca5c] hover:bg-[#7dca5c] font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 flex gap-2 items-center">
              <p>
                <span className="mr-1 relative bottom-[0.15rem]">👈 </span>Catch
                some pokemon
              </p>
            </button>
          </Link>
        </div>
      )}
      {pokemon.length > 0 && (
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
      )}
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center gap-4">
          <h2 className={`text-center font-semibold text-xl text-[#d0342c]`}>
            You sure you want to release all pokemon?
          </h2>
          <div className="flex gap-3">
            <ConfirmationButton
              mode={"green"}
              text={"YES 😐"}
              handleClick={handleReleaseAll}
            />
            <ConfirmationButton
              mode={"red"}
              text={"NO 😢"}
              handleClick={closeModal}
            />
          </div>
        </div>
      </Modal>
    </main>
  );
}
