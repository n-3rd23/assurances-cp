import styles from "./talkUsBox.module.scss";
import { Input, message } from "antd";
import { useState } from "react";
import { firestore } from "../../firebase/firebase.util";
import Phone from "../../public/icons/phone.svg";
import ClosedMail from "../../public/icons/closed_mail.svg";
import Location from "../../public/icons/location.svg";

export default function TalkUsBox() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [userMessage, setMessage] = useState("");
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
      Message: userMessage,
      View: false,
    };

    firestore
      .collection("qoutes")
      .add(data)
      .then(() => {
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
        message.success("Message has been sent");
      })
      .then(() => {
        fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            message: userMessage,
          }),
        })
          .then((res) => res.json())
          .then((result) => console.log(result))
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((error) => {
        console.error(error);
        // message.error("Upload error. Check your internet connection!");
      });
  };
  return (
    <div className="container-fluid rounded-1 bg-white p-3 text-start">
      <p className="fw-700  mt-4">Your Name</p>
      <Input
        value={name}
        onChange={handleChangeName}
        prefix={<Location width={20} height={20} fill={"#0c75ff"} />}
        size="large"
        className={`mb-2 p-3  ${styles.inputBoxStyle}`}
      />
      <p className="fw-700  mt-2">Your Phone number</p>
      <Input
        value={phone}
        onChange={handleChangePhone}
        prefix={<Phone style={{ color: "#0c75ff" }} width={20} height={20} />}
        size="large"
        className={`mb-2 p-3  ${styles.inputBoxStyle}`}
      />
      <p className="fw-700  mt-2">Your Email address</p>
      <Input
        value={email}
        onChange={handleChangeEmail}
        prefix={<ClosedMail width={20} height={20} />}
        size="large"
        className={`mb-2 p-3  ${styles.inputBoxStyle}`}
      />
      <p className="fw-700  mt-2">Your Message</p>
      <TextArea
        value={userMessage}
        onChange={handleChangeMessage}
        className={`mb-4 p-3  ${styles.inputBoxStyle}`}
        rows={4}
      />
      <button
        type="button"
        className={`btn btn-primary mb-4  ${styles.buttStyle}`}
        onClick={uploadDB}
      >
        SEND MESSAGE
      </button>
    </div>
  );
}
