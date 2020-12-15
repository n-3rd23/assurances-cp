import "antd/dist/antd.css";
import { DefaultSeo } from "next-seo";
import { AppProps } from "next/app";
import Head from "next/head";
import { Fragment } from "react";
import SEO from "../next-seo.config";
import "../styles/globals.scss";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase.util";

export default function MyApp({ Component, pageProps }: AppProps) {

  let unSubscribeFromAuth;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    unSubscribeFromAuth = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })
    
    // component will unmount
    return () => {
      unSubscribeFromAuth()
    }
  },[])

  return (
    <Fragment>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component currentUser={currentUser} {...pageProps} />
    </Fragment>
  );
}
