import { Fragment } from "react";
import styles from "./footer.module.scss";
import Facebook from "../../public/icons/facebook.svg";
import Instagram from "../../public/icons/instagram.svg";
import Linkedin from "../../public/icons/linkedin.svg";
import Twitter from "../../public/icons/twitter.svg";

export default function Footer() {
  return (
    <Fragment>
      <div
        className={`container-fluid text-center text-white p-5 mt-4 ${styles.containerStyle}`}
      >
        <p className="text-extraLarge fw-700 ">Assurances</p>
        <p className={`fw-600 text-medium ${styles.subHead}`}>
          INSURANCE COMPANY
        </p>
        <div className="d-flex flex-column flex-md-row justify-content-center">
          <div className="px-3 py-2 text-middle fw-600">HOME</div>
          <div className="px-3 py-2 text-middle fw-600">SERVICES</div>
          <div className="px-3 py-2 text-middle fw-600">ABOUT</div>
          <div className="px-3 py-2 text-middle fw-600">CONTACT</div>
        </div>
        <div className="d-flex flex-row d-flex justify-content-center bd-highlight text-white">
          <div className="p-2 bd-highlight">
            <a href="https://facebook.com">
              <Facebook className="m-3" width={16} height={16} />
            </a>

            <a href="https://facebook.com">
              <Twitter className="m-3" width={16} height={16} />
            </a>

            <a href="https://facebook.com">
              <Linkedin className="m-3" width={16} height={16} />
            </a>

            <a href="https://facebook.com">
              <Instagram className="m-3" width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
      <div
        className={`container-fluid d-flex justify-content-center align-items-center ${styles.bottomBar}`}
      >
        <div className="p-3 text-white text-medium">
          2020, Assurances. All rights Reserved
        </div>
      </div>
    </Fragment>
  );
}
