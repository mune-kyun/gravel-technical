import Link from "next/link";

const activeStyle = {
  backgroundColor: "#7dca5c",
  color: "white",
};

const normalStyle = {
  backgroundColor: "transparent",
  color: "#a0aec0",
};

export default function Tabs({ currentLink }) {
  return (
    <ul className="flex flex-wrap justify-center text-sm font-medium text-center w-fit px-4">
      <li className="mr-2">
        <Link
          href="/"
          className="inline-block px-4 py-3 rounded-lg"
          style={currentLink == "home" ? activeStyle : normalStyle}
        >
          All Pokemon
        </Link>
      </li>
      <li className="mr-2">
        <Link
          href="/my-list"
          className="inline-block px-4 py-3 rounded-lg hover:text-gray-900 hover:bg-gray-100"
          style={currentLink == "mylist" ? activeStyle : normalStyle}
        >
          My Pokemon
        </Link>
      </li>
    </ul>
  );
}
