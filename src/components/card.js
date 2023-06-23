import { getIdByUrl } from "@/utils";
import Link from "next/link";
import Image from "next/image";

const imgBaseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function Card({ name, url }) {
  const idPath = getIdByUrl(url);

  return (
    <Link href={`/pokemon/${name}`} key={name}>
      <Image
        src={`${imgBaseURL}${idPath}.png`}
        width={90}
        height={90}
        alt="Picture of the author"
      />
      <p>{name}</p>
    </Link>
  );
}
