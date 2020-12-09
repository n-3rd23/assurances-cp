import { Fragment } from "react";
import { Container } from "react-bootstrap";
import Header from "../components/header/header";
import HomeMain from "../components/homeMain/homeMain";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <HomeMain />
    </Fragment>
  );
}
