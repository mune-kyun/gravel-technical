import { getTypeColor } from "@/utils";

export default function TypeLabel({ type }) {
  const bgColor = getTypeColor(type);

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={`flex items-center py-1 px-4 text-white text-center rounded-3xl capitalize font-semibold`}
    >
      <p className="w-full">{type}</p>
    </div>
  );
}
