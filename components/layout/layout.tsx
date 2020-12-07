import { NextSeo } from "next-seo";
import { Fragment } from "react";

interface Props {
  title: string;
  children: JSX.Element;
}

export default function Layout({ title, children }: Props) {
  return (
    <Fragment>
      <NextSeo />
      {children}
    </Fragment>
  );
}
