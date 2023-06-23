export default function InfoContainer({ children, bgColor = "#7dca5c" }) {
  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className="p-4 rounded-xl flex flex-col gap-3 h-fit items-center"
    >
      {children}
    </div>
  );
}
