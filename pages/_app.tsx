import "antd/dist/antd.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import SEO from "../next-seo.config";
import "../styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </Fragment>
  );
}
