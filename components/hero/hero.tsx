import Quote from "../../public/icons/quote.svg";
import Button from "../button/button";
import styles from "./hero.module.scss";

export default function Hero() {
  return (
    <div className={`${styles.hero} position-relative`}>
      <div
        className={`${styles.heroText} position-absolute text-white col-md-4 col-sm-8 col-12 text-md-start text-center`}
      >
        <p className="mb-0">LIVE SECURE, LIVE HAPPY</p>
        <h1 className="mb-0 fw-800 text-white">
          RELIABLE INSURANCE FOR ANY PURPOSE
        </h1>
        <Button className="mt-3 fw-700 d-flex shadow-light mx-md-0 mx-auto">
          <Quote width={16} height={16} className="shadow-sm" />
          &nbsp;
          <p className="mb-0 ms-2">GET A QUOTE</p>
        </Button>
      </div>
    </div>
  );
}
