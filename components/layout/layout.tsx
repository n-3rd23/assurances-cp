import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

interface Props {
  title?: string;
  description: string;
  children: JSX.Element | JSX.Element[];
}

export default function Admin({ title, description, children }: Props) {
  const router: NextRouter = useRouter();
  const url =
    router.pathname == "/"
      ? "https://assurances.co.in"
      : "https://assurances.co.in" + router.asPath;
  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          type: "website",
          url,
          title: title,
          description: description,
        }}
      />
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
