export default function InfoContainer({
  children,
  bgColor = "#7dca5c",
  wFit = false,
  wFull = false,
}) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={`p-4 rounded-xl flex flex-col gap-3 h-fit items-center ${
        wFull ? "w-full" : "w-3/5"
      } ${wFit ? "md:w-2/6" : "md:w-3/5"}`}
    >
      {children}
    </div>
  );
}
