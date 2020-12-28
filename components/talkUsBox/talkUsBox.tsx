import styles from "./talkUsBox.module.scss";
import { Component } from "react";
import { Input } from "antd";
import React, { useState } from "react";
import { message } from "antd";
import { firestore, storage } from "../../firebase/firebase.util";
import Phone from "../../public/icons/phone.svg";
import Mail from "../../public/icons/mail_closed.svg";

export default function TalkUsBox() {
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
    <div className="container-fluid rounded-1 bg-white p-3 text-start">
      <p className="fw-700 mx-md-4 mt-4">Your Name</p>
      <Input
        value={name}
        onChange={handleChangeName}
        size="large"
        className={`mb-2 p-3 mx-md-4 ${styles.inputBoxStyle}`}
      />
      <p className="fw-700 mx-md-4 mt-2">Your Phone number</p>
      <Input
        value={phone}
        onChange={handleChangePhone}
        prefix={<Phone width={20} height={20} />}
        size="large"
        className={`mb-2 p-3 mx-md-4 ${styles.inputBoxStyle}`}
      />
      <p className="fw-700 mx-md-4 mt-2">Your Email address</p>
      <Input
        value={email}
        onChange={handleChangeEmail}
        prefix={<Mail width={20} height={20} />}
        size="large"
        className={`mb-2 p-3 mx-md-4 ${styles.inputBoxStyle}`}
      />
      <p className="fw-700 mx-md-4 mt-2">Your Message</p>
      <TextArea
        value={message}
        onChange={handleChangeMessage}
        className={`mb-4 p-3 mx-md-4 ${styles.inputBoxStyle}`}
        rows={4}
      />
      <button
        type="button"
        className={`btn btn-primary mb-4 mx-md-4 ${styles.buttStyle}`}
        onClick={uploadDB}
      >
        SEND MESSAGE
      </button>
    </div>
  );
}
