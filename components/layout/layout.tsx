import { NextSeo } from "next-seo";
import { NextRouter, useRouter } from "next/router";
import { Fragment } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

interface Props {
  title?: string;
  description: string;
  image?: string;
  children: JSX.Element | JSX.Element[];
}

export default function Admin({ title, description, image, children }: Props) {
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
        openGraph={
          image
            ? {
                type: "website",
                url,
                title: title,
                description: description,
                images: [
                  {
                    url: image,
                    alt: title,
                  },
                ],
              }
            : {
                type: "website",
                url,
                title: title,
                description: description,
              }
        }
      />
      <Header />
      {children}
      <Footer />
    </Fragment>
  );
}
