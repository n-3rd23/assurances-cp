import { Divider } from "antd";
import Link from "next/link";
import { Fragment } from "react";
import Facebook from "../../public/icons/facebook.svg";
import Instagram from "../../public/icons/instagram.svg";
import Linkedin from "../../public/icons/linkedin.svg";
import Twitter from "../../public/icons/twitter.svg";
import Info from "../info/info";
import styles from "./header.module.scss";
import Phone from "../../public/icons/phone.svg";
import Mail from "../../public/icons/mail_closed.svg";

export default function Header() {
  return (
    <Fragment>
      <div
        className={`d-flex flex-row d-flex justify-content-around bd-highlight px-md-5 px-4 ${styles.navMini}`}
      >
        <div className="p-2 bd-highlight flex-grow-1">
          <a href="https://facebook.com">
            <Facebook width={16} height={16} />
          </a>
          <Divider type="vertical" />
          <a href="https://facebook.com">
            <Twitter width={16} height={16} />
          </a>
          <Divider type="vertical" />
          <a href="https://facebook.com">
            <Linkedin width={16} height={16} />
          </a>
          <Divider type="vertical" />
          <a href="https://facebook.com">
            <Instagram width={16} height={16} />
          </a>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/services">
            <a className="text-medium text-primary">
              <small>
                <strong>SERVICES</strong>
              </small>
            </a>
          </Link>
        </div>
        <div className="p-2 bd-highlight">
          <Link href="/forms">
            <a className="text-medium text-primary">
              <small>
                <strong>FORMS</strong>
              </small>
            </a>
          </Link>
        </div>
      </div>
      <div className="container d-flex flex-md-row flex-column d-flex flex-wrap justify-content-between align-items-center bd-highlight py-md-4 py-3">
        <div className="p-2 bd-highlight smTextCenter">
          <Link href="/">
            <a className={styles.title}>
              <h2 className="fw-800 mb-0" style={{ color: "" }}>
                Assurances
              </h2>
              <small className={`d-block fw-600 ${styles.subtitle}`}>
                <em style={{ color: "var(--primary-main)" }}>
                  Necessities Been Secured
                </em>
              </small>
            </a>
          </Link>
        </div>
        <div className="d-flex flex-column flex-md-row p-2 bd-highlight justify-content-center align-items-center smTextCenter">
          <Info
            icon={<Mail width={20} height={20} />}
            title="thomasassurance@yahoo.com"
            subtitle="Send us a message"
            className="mx-4"
            titleAs="a"
            titleAsProps={{ href: "mailto:thomasassurance@yahoo.com" }}
          />
          <Info
            icon={<Phone width={20} height={20} />}
            title="+91 9846117476"
            subtitle="Give us a call"
            className="mx-4"
            titleAs="a"
            titleAsProps={{ href: "tel:+919846117476" }}
          />
        </div>
      </div>
      <div
        className={`container position-relative rounded bg-primary-main text-white px-4 py-3 shadow-light ${styles.navbar}`}
      >
        <div className="row justify-content-center text-center">
          <div className="col-md-8 col-sm-11 col-12">
            <div className="row">
              <div className="col">
                <Link href="/">
                  <a className="fw-600">HOME</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/services">
                  <a className="fw-600">SERVICES</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/about">
                  <a className="fw-600">ABOUT</a>
                </Link>
              </div>
              <div className="col">
                <Link href="/contact">
                  <a className="fw-600">CONTACT</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
