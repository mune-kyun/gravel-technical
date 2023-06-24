import "@/styles/globals.css";
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import "@/styles/pagination.css";
import "@/styles/carousel.css";
import MainProvider from "./context/mainContext";
import { DefaultSeo } from "next-seo";

const siteTitle = "PokéDexu";
const siteDescription = "Catch pokemon easily to kill some time.";
const siteUrl = "localhost:3000";

export default function App({ Component, pageProps }) {
  return (
    <>
      <MainProvider>
        <DefaultSeo
          title={siteTitle}
          description={siteDescription}
          openGraph={{
            type: "website",
            url: siteUrl,
            title: siteTitle,
            description: siteDescription,
            images: [{ url: "/pokemon-main.png" }],
          }}
          twitter={{
            cardType: "summary_large_image",
            url: siteUrl,
            title: siteTitle,
            description: siteDescription,
            images: [{ url: "/pokemon-main.png" }],
          }}
        />
        <Component {...pageProps} />
      </MainProvider>
    </>
  );
}
