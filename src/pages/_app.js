import "@/styles/globals.css";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/pagination.css";
import "@/styles/carousel.css";
import MainProvider from "./context/mainContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
    </>
  );
}
