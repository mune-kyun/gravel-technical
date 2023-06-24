export default function ConfirmationButton({ mode, text, handleClick }) {
  const appliedClass =
    mode == "green"
      ? "text-green-700 hover:text-white border border-green-700 hover:bg-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
      : "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2";

  return (
    <button onClick={handleClick} className={`${appliedClass} font-bold`}>
      {text}
    </button>
  );
}
