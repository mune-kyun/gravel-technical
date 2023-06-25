import { useWindowWidth } from "@react-hook/window-size";
import { useRouter } from "next/router";

export default function CustomLayout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const widthNow = useWindowWidth();
  const showBg = widthNow > 640 && (pathname == "/my-list" || pathname == "/");

  return (
    <div
      style={
        showBg
          ? {
              backgroundImage: `url("/pokemon-bg.jpg")`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }
          : {}
      }
      className={`flex items-center justify-center ${showBg && "py-6"}`}
    >
      {children}
    </div>
  );
}
