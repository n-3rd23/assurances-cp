import styles from "./getQuote.module.scss";
import { Input } from "antd";
import Phone from "../../public/icons/phone.svg";
import Mail from "../../public/icons/mail_closed.svg";
import Facebook from "../../public/icons/facebook.svg";
import Instagram from "../../public/icons/instagram.svg";
import Linkedin from "../../public/icons/linkedin.svg";
import Twitter from "../../public/icons/twitter.svg";
import { Divider } from "antd";
import React, { useState } from "react";
import { message } from "antd";
import { firestore, storage } from "../../firebase/firebase.util";

export default function GetQuote() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { TextArea } = Input;
  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };
  const uploadDB = async () => {
    const data = {
      Name: name,
      Phone: phone,
      Email: email,
      Message: message,
    };
    try {
      firestore.collection("qoutes").add(data);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
      // message.success("Message has been sent");
    } catch (error) {
      console.log(error);
      // message.error("Upload error. Check your internet connection!");
    }
  };
  return (
    <div className={`container-fluid ${styles.mainStyle}`}>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <p className="text-white fw-600 text-largest mt-1">Get a quote</p>
          <div>
            <p className={`${styles.pStyle}`}>
              Fill up the details and we'll get back to you
            </p>
            <div className={`container text-white ${styles.infoStyle}`}>
              <div className="d-flex">
                <Phone
                  className="m-4"
                  style={{ color: "#0c75ff" }}
                  width={25}
                  height={25}
                />
                <p className="py-4 px-2">+91 9956845228 </p>
              </div>
              <div className="d-flex">
                <Phone
                  className="m-4"
                  style={{ color: "#0c75ff" }}
                  width={25}
                  height={25}
                />
                <p className="py-4 px-2">info@lifeassure.com</p>
              </div>
              <div className="d-flex">
                <Phone
                  className="m-4"
                  style={{ color: "#0c75ff" }}
                  width={25}
                  height={25}
                />
                <p className="py-4 px-2">Angamaly</p>
              </div>
              <div className="d-flex flex-row d-flex justify-content-start bd-highlight text-white mt-md-5">
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
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div
            className={`container-fluid border border-primary rounded-1 ${styles.containerStyle}`}
          >
            <p className="fw-700 mt-4">Your Name</p>
            <Input
              value={name}
              onChange={handleChangeName}
              size="large"
              className={`mb-2 p-3 ${styles.inputBoxStyle}`}
            />
            <p className="fw-700 mt-2">Your Phone number</p>
            <Input
              value={phone}
              onChange={handleChangePhone}
              prefix={<Phone width={20} height={20} />}
              size="large"
              className={`mb-2 p-3 ${styles.inputBoxStyle}`}
            />
            <p className="fw-700 mt-2">Your Email address</p>
            <Input
              value={email}
              onChange={handleChangeEmail}
              prefix={<Mail width={20} height={20} />}
              size="large"
              className={`mb-2 p-3 ${styles.inputBoxStyle}`}
            />
            <p className="fw-700 mt-2">Your Message</p>
            <TextArea
              value={message}
              onChange={handleChangeMessage}
              className={`mb-4 p-3 ${styles.inputBoxStyle}`}
              rows={4}
            />
            <button
              type="button"
              className="btn btn-primary w-100 mb-4"
              onClick={uploadDB}
            >
              SEND MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
