import { formatName, getIdByUrl } from "@/utils";
import Link from "next/link";
import Image from "next/image";
import Modal from "./Modal";
import { useState } from "react";
import ConfirmationButton from "./ConfirmationButton";
import { useMainContext } from "@/pages/context/mainContext";

const imgBaseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function Card({
  name,
  url,
  id,
  owned,
  mode = "default",
  callbackAfterRemove = () => {},
}) {
  const idPath = id ? id : url ? getIdByUrl(url) : "";
  const formattedName = formatName(name);

  const [isOpen, setIsOpen] = useState(false);
  const [src, setSrc] = useState(`${imgBaseURL}${idPath}.png`);

  const { mainRemovePokemonByName } = useMainContext();

  const handleRelease = (e) => {
    e.preventDefault();

    openModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleRemove() {
    mainRemovePokemonByName(name);
    closeModal();
    callbackAfterRemove();
  }

  return (
    <Link href={`/pokemon/${name}`} key={name} className="hover:-translate-y-2">
      <div className="shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] p-5 flex flex-col items-center relative">
        <Image
          src={src}
          width={90}
          height={90}
          alt="img"
          onError={() => setSrc("/question.png")}
        />
        <p className="text-[#313131] text-lg text-center font-semibold capitalize">
          {formattedName}
        </p>
        {mode == "mylist" && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="mt-1 text-[#7dca5c] font-bold">
              <span className="font-semibold">Owned:</span> {owned}
            </h2>
            <div className="group relative flex justify-center">
              <Image
                className="opacity-75 md:hover:opacity-100 md:hover:scale-125"
                src={`/pokemon-release.png`}
                width={30}
                height={30}
                alt="remove"
                onClick={handleRelease}
              />
              <span className="absolute top-12 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white md:group-hover:scale-100">
                Release
              </span>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="flex flex-col items-center gap-4">
          <h2 className={`text-center font-semibold text-xl text-[#d0342c]`}>
            You sure you want to release{" "}
            <span className="text-black font-bold capitalize">
              {formattedName}
            </span>{" "}
            ?
          </h2>
          <div className="flex gap-3">
            <ConfirmationButton
              mode={"green"}
              text={"YES 😐"}
              handleClick={handleRemove}
            />
            <ConfirmationButton
              mode={"red"}
              text={"NO 😢"}
              handleClick={closeModal}
            />
          </div>
        </div>
      </Modal>
    </Link>
  );
}
