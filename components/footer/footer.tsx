import styles from "./footer.module.scss";
import Facebook from "../../public/icons/facebook.svg";
import Instagram from "../../public/icons/instagram.svg";
import Linkedin from "../../public/icons/linkedin.svg";
import Twitter from "../../public/icons/twitter.svg";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import CustomInput from "../custom_input/custom_input";
import Button from "../button/button";
import firebase, { firestore } from "../../firebase/firebase.util";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [nameWarning, setNameWarning] = useState("");
  const [emailWarning, setEmailWarning] = useState("");
  const [phoneWarning, setPhoneWarning] = useState("");
  const [messageWarning, setMessageWarning] = useState("");

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "success", text: "" });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // let flag = 0;
    // if (name == "") {
    //   flag = 1;
    //   setNameWarning("Name is required");
    // } else {
    //   setNameWarning("");
    // }
    // if (email == "") {
    //   flag = 1;
    //   setEmailWarning("Email is required");
    // } else {
    //   setEmailWarning("");
    // }
    // if (phone == "") {
    //   flag = 1;
    //   setPhoneWarning("Phone number is required");
    // } else {
    //   setPhoneWarning("");
    // }
    // if (message == "") {
    //   flag = 1;
    //   setMessageWarning("Message is required");
    // } else {
    //   setMessageWarning("");
    // }

    // if (flag == 1) return;

    setFeedback({ type: "success", text: "" });
    setLoading(true);

    firestore
      .collection("enquiries")
      .add({
        name,
        email,
        phone,
        message,
        received_on: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        setFeedback({ type: "success", text: "We'll get back to you soon." });
        setLoading(false);
        fetch(`/api/subscribe`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            phone: phone,
            email: email,
            message: message,
          }),
        })
          .then((res) => res.json())
          .then((result) => console.log(result))
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        setFeedback({
          type: "error",
          text: "Something went wrong. Please try again",
        });
        setLoading(false);
      });
  }
  return (
    <div
      className={`container-fluid text-white text-md-start text-center mt-5 p-5 ${styles.footer}`}
    >
      <div className="row">
        <div className="col-md-4 col-sm-12 col-12">
          <h1 className="text-white mb-0">
            <strong>Assurances</strong>
          </h1>
          <small>
            <em>Necessities Being Secured</em>
          </small>
          <p className="mt-5 text-medium">AFFILIATED TO</p>
          <div className="d-flex flex justify-content-center justify-content-sm-start">
            <div className="p-0">
              <a href="https://licindia.in/" target="_blank">
                <img
                  src="/images/lic_logo.png"
                  width="100px"
                  height="50px"
                ></img>
              </a>
            </div>
            <div className="px-3">
              <a href="https://www.newindia.co.in/portal/" target="_blank">
                <img
                  src="/images/New_India_Assurance.png"
                  width="50px"
                  height="50px"
                  style={{ backgroundColor: "white" }}
                ></img>
              </a>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-md-start justify-content-center bd-highlight my-3">
            <div className="p-2 bd-highlight">
              <a
                href="https://www.facebook.com/pages/category/Insurance-Agent/Assurance-102337221598665/"
                target="_blank"
              >
                {" "}
                <Facebook width={12} height={12} />
              </a>
            </div>
            <div className="p-2 bd-highlight">
              <Twitter width={12} height={12} />
            </div>
            <div className="p-2 bd-highlight">
              <Linkedin width={12} height={12} />
            </div>
            <div className="p-2 bd-highlight">
              <a
                href="https://instagram.com/thomasbabulic?igshid=1u3utsgnf9c7i"
                target="_blank"
              />
              <Instagram width={12} height={12} />
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-12">
          <h6 className="py-2 text-white">
            <strong>Pages</strong>
          </h6>
          <div className="d-flex flex-row justify-content-md-start justify-content-center bd-highlight mb-3">
            <div className="d-flex flex-column pe-5 bd-highlight">
              <div className="p-1 bd-highlight">
                <Link href="/">
                  <a className={styles.pages}>HOME</a>
                </Link>
              </div>
              <div className="p-1 bd-highlight">
                <Link href="/services">
                  <a className={styles.pages}>SERVICES</a>
                </Link>
              </div>
              <div className="p-1 bd-highlight">
                <Link href="/about">
                  <a className={styles.pages}>ABOUT</a>
                </Link>
              </div>
            </div>
            <div className="d-flex flex-column bd-highlight">
              <div className="p-1 bd-highlight">
                <Link href="/contact">
                  <a className={styles.pages}>CONTACT</a>
                </Link>
              </div>
              <div className="p-1 bd-highlight">
                <Link href="/forms">
                  <a className={styles.pages}>FORMS</a>
                </Link>
              </div>
              <div className="p-1 bd-highlight">
                <Link href="/gallery">
                  <a className={styles.pages}>GALLERY</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-12">
          <form
            onSubmit={handleSubmit}
            method="post"
            className="d-flex flex-column bd-highlight p-3"
          >
            <div className="p-2 bd-highlight">
              <h6 className="text-white">
                <strong>Get in touch</strong>
              </h6>
            </div>
            <div className="p-2 bd-highlight">
              <CustomInput
                placeholder="Your name"
                value={name}
                variant="ghost"
                className="w-100 shadow-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
                warning={nameWarning}
              />
            </div>
            <div className="p-2 bd-highlight">
              <CustomInput
                placeholder="Your email"
                type="email"
                value={email}
                variant="ghost"
                className="w-100 shadow-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                warning={emailWarning}
              />
            </div>
            <div className="p-2 bd-highlight">
              <CustomInput
                placeholder="Your phone number"
                value={phone}
                variant="ghost"
                className="w-100 shadow-sm"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPhone(e.target.value)
                }
                warning={phoneWarning}
              />
            </div>
            <div className="p-2 bd-highlight">
              <CustomInput
                placeholder="Your message"
                value={message}
                variant="ghost"
                className="w-100 shadow-sm"
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  setMessage(e.target.value)
                }
                warning={messageWarning}
                isTextArea
              />
            </div>
            <div className="p-2 bd-highlight">
              <small
                className={
                  feedback.type == "success" ? "text-success" : "text-danger"
                }
              >
                {feedback.text}
              </small>
            </div>
            <div className="p-2 bd-highlight">
              <Button
                type="submit"
                className="shadow-sm"
                loading={loading}
                variant="ghost"
              >
                SEND MESSAGE
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="row">
        <small className={styles.copyright}>
          © {new Date().getFullYear()}. All rights reserved.
        </small>
      </div>
    </div>
  );
}
