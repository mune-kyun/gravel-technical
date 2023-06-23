import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getPokemonDetail } from "../api/pokemon";
import { formatName, getImagesFromSprites } from "@/utils";
import { Carousel } from "react-responsive-carousel";
import Breadcrumb from "@/components/Breadcrumb";
import TypeLabel from "@/components/TypeLabel";
import Status from "@/components/Status";
import StatusContainer from "@/components/StatusContainer";
import InfoContainer from "@/components/InfoContainer";

export default function PokemonDetail() {
  const router = useRouter();
  const { name } = router.query;

  const [data, setData] = useState(null);
  const [images, setImages] = useState(null);

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

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 gap-4`}
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
      <div className="flex flex-col gap-2 md:flex-row">
        <StatusContainer>
          <Status valKey={"Weight"} value={[data?.weight]} />
          <Status valKey={"Height"} value={[data?.height]} />
        </StatusContainer>
        <StatusContainer>
          {data?.stats.map(({ name, base }, idx) => (
            <Status key={idx + name} valKey={name} value={[base]} />
          ))}
        </StatusContainer>
      </div>
      <InfoContainer bgColor="#b4ca5c">
        <div>
          <h2>Abilities</h2>
          <div>
            {data?.abilities.map((ability, idx) => (
              <p key={idx + ability}>{ability}</p>
            ))}
          </div>
        </div>
      </InfoContainer>
      <InfoContainer bgColor="#b4ca5c">
        <div>
          <h2>Moves</h2>
          <div>
            {data?.moves.map(({ name }, idx) => (
              <p key={idx + name} className="capitalize">
                {formatName(name)}
              </p>
            ))}
          </div>
        </div>
      </InfoContainer>
    </main>
  );
}
