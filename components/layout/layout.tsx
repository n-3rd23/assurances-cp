import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";
import Header from "../header/header";

interface Props {
  title?: string;
  description: string;
  children: JSX.Element | JSX.Element[];
}

export default function Layout({ title, description, children }: Props) {
  const router: NextRouter = useRouter();
  return (
    <Fragment>
      <NextSeo
        title={title}
        description={description}
        canonical={
          router.pathname == "/"
            ? "https://assurances.co.in"
            : "https://assurances.co.in" + router.asPath
        }
        openGraph={{
          type: "website",
          url:
            router.pathname == "/"
              ? "https://assurances.co.in"
              : "https://assurances.co.in" + router.asPath,
          title: title,
          description: description,
        }}
      />
      <Header />
      {children}
    </Fragment>
  );
}
