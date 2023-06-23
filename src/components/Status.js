export default function Status({ valKey, value }) {
  return (
    <div className="w-full flex gap-2">
      <p className="w-[90px] text-[#ffe37b] font-semibold capitalize">
        {valKey}
      </p>
      <div>
        {value.map((val, idx) => (
          <p key={idx} className="text-white font-semibold">
            {val}
          </p>
        ))}
      </div>
    </div>
  );
}
