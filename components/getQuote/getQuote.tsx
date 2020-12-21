import styles from "./getQuote.module.scss";
import { Input } from "antd";
import Phone from "../../public/icons/phone.svg";
import Mail from "../../public/icons/mail_closed.svg";
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
      name: name,
      phone: phone,
      email: email,
      message: message,
    };
    try {
      firestore.collection("quotes").add(data);
      // message.success("Message has been sent");
    } catch (error) {
      console.log(error);
      // message.error("Upload error. Check your internet connection!");
    }
  };
  return (
    <div className="container-fluid w-100">
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <p className="text-white fw-600 text-largest mt-1">Get a quote</p>
          <div>
            <p className={`${styles.pStyle}`}>
              Fill up the details and we'll get back to you
            </p>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          <div
            className={`container border border-primary rounded-1 ${styles.containerStyle}`}
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
            <button type="button" className="btn btn-primary w-100 mb-4">
              SEND MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
