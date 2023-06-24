import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getPokemonDetail } from "../api/pokemon";
import { formatName, getFifty, getImagesFromSprites } from "@/utils";
import { Carousel } from "react-responsive-carousel";
import Breadcrumb from "@/components/Breadcrumb";
import TypeLabel from "@/components/TypeLabel";
import Status from "@/components/Status";
import StatusContainer from "@/components/StatusContainer";
import InfoContainer from "@/components/InfoContainer";
import Image from "next/image";

const MOVE_LIMIT_BASE = 12;

export default function PokemonDetail() {
  const router = useRouter();
  const { name } = router.query;

  const [data, setData] = useState(null);
  const [images, setImages] = useState(null);
  const [moveLimit, setMoveLimit] = useState(MOVE_LIMIT_BASE);

  const fetchDetail = async (name) => {
    const res = await getPokemonDetail(name);
    setData(res);
  };

  useEffect(() => {
    if (name) fetchDetail(name);
  }, [name]);

  useEffect(() => {
    if (!data) return;

    const foundImages = getImagesFromSprites(data.sprites);
    setImages(foundImages);
  }, [data]);

  const handleMoveLimit = (mode = "inc") => {
    if (mode === "reset") setMoveLimit(MOVE_LIMIT_BASE);
    else setMoveLimit((val) => val + 12);
  };

  const handleCatch = () => {
    alert(getFifty());
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center pt-12 pb-14 px-6 gap-4`}
    >
      <Breadcrumb textNow={name} />
      <Carousel showIndicators={false}>
        {images?.map((url, idx) => {
          return (
            <div key={idx + url}>
              <img src={url} width={90} height={90} alt="pokemon" />
            </div>
          );
        })}
      </Carousel>
      <h1 className="text-2xl sm:text-4xl font-bold capitalize">
        {formatName(name)}
      </h1>
      <div className="flex flex-wrap gap-3">
        {data?.types?.map(({ slot, type }) => (
          <TypeLabel key={slot} type={type.name} />
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4 md:flex-row w-3/5 md:w-auto">
        <StatusContainer>
          <Status valKey={"Weight"} value={[data?.weight + " lbs"]} />
          <Status valKey={"Height"} value={[data?.height + " inches"]} />
        </StatusContainer>
        <StatusContainer>
          {data?.stats.map(({ name, base }, idx) => (
            <Status key={idx + name} valKey={name} value={[base]} />
          ))}
        </StatusContainer>
        <InfoContainer bgColor="#b4ca5c" wMD={true} wFull={true}>
          <div className="text-center md:text-left">
            <h2 className="text-[#725cca] font-bold">Abilities</h2>
            <div className="flex flex-col items-center md:items-start gap-2 mt-2">
              {data?.abilities.map((ability, idx) => (
                <div
                  key={idx + ability}
                  className="py-1 px-2 bg-[rgba(0,0,0,0.1)] w-fit rounded-md"
                >
                  <p className="capitalize text-white font-semibold">
                    {formatName(ability)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </InfoContainer>
      </div>
      <InfoContainer bgColor="#b4ca5c">
        <div>
          <h2 className="text-[#725cca] font-bold">
            Moves <span>{`(${data?.moves.length})`}</span>
          </h2>
          <ul className="flex flex-wrap gap-3 list-disc list-inside my-2 text-[#a95cca] font-medium">
            {data?.moves.slice(0, moveLimit).map(({ name }, idx) => (
              <li key={idx + name} className="capitalize">
                {formatName(name)}
              </li>
            ))}
          </ul>
          <div className="flex justify-between">
            {data?.moves.length > moveLimit && (
              <p
                className="text-[#5c7dca] cursor-pointer"
                onClick={handleMoveLimit}
              >
                More ...
              </p>
            )}
            {moveLimit != MOVE_LIMIT_BASE && (
              <p
                className="text-[#ca5cb4] cursor-pointer"
                onClick={() => handleMoveLimit("reset")}
              >
                Show Less
              </p>
            )}
          </div>
        </div>
      </InfoContainer>
      <div class="group relative mt-4 mb-2 flex justify-center">
        <button
          class="rounded bg-transparent px-4 py-2 text-sm text-white shadow-sm lg:group-hover:scale-125"
          onClick={handleCatch}
        >
          <Image src={`/pokeball.svg`} width={90} height={90} alt="Catch" />
        </button>
      </div>
      <div class="rounded bg-gray-800 p-2 text-xs text-white capitalize">
        👆 Catch {formatName(name)}
      </div>
    </main>
  );
}
