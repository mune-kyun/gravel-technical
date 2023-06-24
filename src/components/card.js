import { formatName, getIdByUrl } from "@/utils";
import Link from "next/link";
import Image from "next/image";

const imgBaseURL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

export default function Card({ name, url, id }) {
  const idPath = id ? id : url ? getIdByUrl(url) : "";
  const formattedName = formatName(name);

  return (
    <Link href={`/pokemon/${name}`} key={name} className="hover:-translate-y-2">
      <div className="shadow-[0px_10px_1px_rgba(221,_221,_221,_1),_0_10px_20px_rgba(204,_204,_204,_1)] p-5 flex flex-col items-center">
        <Image
          src={`${imgBaseURL}${idPath}.png`}
          width={90}
          height={90}
          alt="Pokemon"
        />
        <p className="text-[#313131] text-lg text-center font-semibold capitalize">
          {formattedName}
        </p>
      </div>
    </Link>
  );
}
