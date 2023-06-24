import Image from "next/image";

export default function AppTitle() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Image src={`/pokemon-main.png`} width={30} height={30} alt="Main" />
      <h1 className="text-[#7dca5c] text-2xl sm:text-4xl font-bold">Pokédex</h1>
    </div>
  );
}
