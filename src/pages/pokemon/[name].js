import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { getPokemonDetail } from "../api/pokemon";
import { getImagesFromSprites } from "@/utils";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumb";
import TypeLabel from "@/components/TypeLabel";

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
  //  weight, height, abilities, moves, and stats.

  return (
    <main
      className={`flex min-h-screen flex-col items-center py-12 px-6 gap-4`}
    >
      <Breadcrumb textNow={name} />
      <Carousel showIndicators={false}>
        {images?.map((url) => {
          return (
            <div key={url}>
              <img src={url} width={90} height={90} alt="pokemon" />
            </div>
          );
        })}
      </Carousel>
      <h1>{name}</h1>
      <div className="flex flex-wrap gap-3">
        {data?.types?.map(({ slot, type }) => (
          <TypeLabel key={slot} type={type.name} />
        ))}
      </div>
    </main>
  );
}
