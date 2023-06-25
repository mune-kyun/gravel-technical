import { useWindowWidth } from "@react-hook/window-size";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CustomLayout({ children }) {
  const router = useRouter();
  const { pathname } = router;
  const widthNow = useWindowWidth();

  const [showBg, setShowBg] = useState(false);

  useEffect(() => {
    setShowBg(widthNow > 640 && (pathname == "/my-list" || pathname == "/"));
  }, [pathname, widthNow]);

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
