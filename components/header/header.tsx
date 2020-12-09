import Link from "next/link";
import { Fragment } from "react";
import InfoHeading from "../infoHeading/infoHeading";
import Navbar from "../navbar/navbar";
import styles from "./header.module.scss";

export default function Header() {
  return (
    <Fragment>
      <div
        className={`d-flex flex-row d-flex justify-content-around bd-highlight px-md-5 px-4 ${styles.navMini}`}
      >
        <div className="p-2 bd-highlight flex-grow-1">
          <Link href="/">
            <a>
              <small>Kooi</small>
            </a>
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/">
            <a className="text-medium midnightBlue">
              <small>
                <strong>MAKE A CLAIM</strong>
              </small>
            </a>
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/">
            <a className="text-medium midnightBlue">
              <small>
                <strong>SERVICES</strong>
              </small>
            </a>
          </Link>
        </div>
      </div>
      <div className="d-flex flex-row d-flex justify-content-between bd-highlight px-md-5 px-4 py-md-4 py-3">
        <div className="p-2 bd-highlight">
          <Link href="/">
            <a className={styles.title}>
              <h2 className="fw-800 mb-0">Assurances</h2>
              <small className={`d-block fw-600 ${styles.subtitle}`}>
                INSURANCE&nbsp;
                <span style={{ color: "var(--primary-main)" }}>COMPANY</span>
              </small>
            </a>
          </Link>
        </div>
        <div className="d-flex p-2 bd-highlight">
          <InfoHeading
            title="info@lifeassure.com"
            subtitle="Send us a message"
          />
          <InfoHeading title="+91 9872369874" subtitle="Give us a call" />
        </div>
      </div>
      {/* <div className={`container-fluid ${styles.sndContainer}`}>
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-6">
              <div className="d-block">
                <div className="d-inline text-largest fw-700">Life</div>
                <div className="d-inline text-largest fw-700 midnightBlue">
                  Assure
                </div>
              </div>
              <div
                className={`d-block text-medium fw-700 ${styles.headSizing}`}
              >
                INSURANCE COMPANY
              </div>
            </div>

            <div className="col-md-3 mt-4">
              <InfoHeading
                title="info@lifeassure.com"
                subtitle="Send us a message"
              />
            </div>
            <div className="col-md-3 mt-4">
              <InfoHeading title="+91 9872369874" subtitle="Give us a call" />
            </div>
          </div>
        </div>
      </div> */}
      <Navbar />
    </Fragment>
  );
}
