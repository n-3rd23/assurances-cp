import "antd/dist/antd.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import { pageview } from "../firebase/firebase.util";
import Head from "next/head";
import { Fragment, useEffect } from "react";
import SEO from "../next-seo.config";
import "../styles/globals.scss";
import { useRouter, NextRouter } from "next/router";
import { AuthProvider } from "../context/AuthContext";
import Whatsapp from "../components/whatsapp/whatsapp";

export default function MyApp({ Component, pageProps }: AppProps) {
  const router: NextRouter = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => pageview(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <AuthProvider>
        <Component {...pageProps} />
        <Whatsapp />
      </AuthProvider>
    </Fragment>
  );
}
