import styles from "./getQuote.module.scss";
import { Input } from "antd";
import Phone from "../../public/icons/phone.svg";
import Mail from "../../public/icons/mail_closed.svg";
import Facebook from "../../public/icons/facebook.svg";
import Instagram from "../../public/icons/instagram.svg";
import Linkedin from "../../public/icons/linkedin.svg";
import Twitter from "../../public/icons/twitter.svg";
import React, { useState } from "react";
import TalkUsBox from "./../talkUsBox/talkUsBox";

export default function GetQuote() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 col-sm-12 text-md-start text-center d-flex flex-column justify-content-between">
          <div className="bd-highlight">
            <p className="text-white fw-600 text-largest mt-1">Get a quote</p>
            <p className={styles.pStyle}>
              Fill up the details and we'll get back to you
            </p>
          </div>
          <div className="bd-highlight text-white">
            <div className="d-flex justify-content-md-start justify-content-center">
              <Phone
                className="m-4"
                style={{ color: "#0c75ff" }}
                width={25}
                height={25}
              />
              <p className="py-4 px-2">+91 9956845228 </p>
            </div>
            <div className="d-flex justify-content-md-start justify-content-center">
              <Phone
                className="m-4"
                style={{ color: "#0c75ff" }}
                width={25}
                height={25}
              />
              <p className="py-4 px-2">info@lifeassure.com</p>
            </div>
            <div className="d-flex justify-content-md-start justify-content-center">
              <Phone
                className="m-4"
                style={{ color: "#0c75ff" }}
                width={25}
                height={25}
              />
              <p className="py-4 px-2">Angamaly</p>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-md-start justify-content-center bd-highlight text-white mt-md-5">
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
        <div className="col-md-6 col-sm-12">
          <TalkUsBox />
        </div>
      </div>
    </div>
  );
}
