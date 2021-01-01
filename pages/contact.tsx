import Layout from "../components/layout/layout";
import Phone from "../public/icons/phone.svg";
import Mail from "../public/icons/mail_closed.svg";
import Facebook from "../public/icons/facebook.svg";
import Instagram from "../public/icons/instagram.svg";
import Linkedin from "../public/icons/linkedin.svg";
import Twitter from "../public/icons/twitter.svg";
import CallBack from "../public/icons/call-back.svg";
import { Input, notification } from "antd";
import Button from "../components/button/button";
import { useState } from "react";
import { firestore } from "../firebase/firebase.util";

export default function Contact() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const openNotificationSuccess = (type) => {
    notification[type]({
      message: "Success !",
      description: "Your request has been recieved we will call you as soon as possible 🙂"
    })
  }

  const clearField = () => {
    setName("");
    setPhone("");
    setEmail("");
    setMessage("");
  };

  const uploadCallMe = () => {
    firestore
      .collection("callme")
      .add({
        name: name,
        number: phone,
      })
      .then(() =>
        fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ name: name, phone: phone }),
        })
          .then((res) => res.json())
          .then((result) => console.log(result))
          .catch((err) => {
            console.error(err);
          })
      )
      .then(() => {
        clearField()
        openNotificationSuccess('success')
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const uploadMessage = () => {
    firestore
      .collection("qoutes")
      .add({
        Name: name,
        Email: email,
        Phone: phone,
        Message: message,
      })
      .then(() => {
        console.log("message uploaded");
        clearField();
        notification["success"]({
          message: "Success !",
          description: "Thank you for your enquiry we will contact you as soon as possible 🙂"
        })
      })
      .catch((err) => console.error(err));
  };

  return (
    <Layout title="About" description="About us">
      <div className="container my-5">
        {/* banner begins */}
        <div className="row">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <div>
              <span className="d-block fw-900 text-extraLarge">
                We love to{" "}
              </span>
              <span className="d-block fw-900 text-extraLarge">hear from</span>
              <span className="d-block fw-900 text-extraLarge">you</span>
            </div>
          </div>
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img
              src="/images/about_page_side.jpg"
              className="img-fluid"
              alt="image"
            />
          </div>
        </div>
        {/* banner ends */}

        {/* contact begins */}
        <div className="row my-5 d-flex w-100 justify-content-center align-items-center">
          <div className="container-fluid rounded-1 col-md-6 col-sm-9 col-xs-12 bg-light mb-5 p-2 position-relative">
            <div className="col-md-6 col-xs-12 col-sm-6">
              <span className="fw-900 text-largest">Contact Us</span>
              <p className="fw-700 mt-4">Your Name</p>
              <Input
                size="large"
                className="mb-1 p-2"
                value={name}
                onChange={handleNameChange}
              />
              <p className="fw-700 mt-2">Your Phone number</p>
              <Input
                prefix={<Phone width={20} height={20} />}
                size="large"
                className="mb-1 p-2"
                value={phone}
                onChange={handlePhoneChange}
              />
              <p className="fw-700 mt-2">Your Email address</p>
              <Input
                prefix={<Mail width={20} height={20} />}
                size="large"
                className="mb-1 p-2"
                value={email}
                onChange={handleEmailChange}
              />
              <p className="fw-700 mt-2">Your Message</p>
              <Input.TextArea
                className="mb-1 p-2"
                rows={4}
                value={message}
                onChange={handleMessageChange}
              />
              <button
                type="button"
                onClick={uploadMessage}
                className="btn btn-primary w-100 mb-4"
              >
                SEND MESSAGE
              </button>
            </div>
            {/* info start */}
            <div
              style={{
                top: "10%",
                left: "53%",
                height: "90%",
                backgroundColor: "#313541",
              }}
              className="position-absolute w-75 text-white p-5 d-none d-sm-block"
            >
              <div className="bd-highlight text-white">
                <div className="d-flex justify-content-md-start justify-content-center">
                  <Phone
                    className="m-4"
                    style={{ color: "#fff" }}
                    width={25}
                    height={25}
                  />
                  <p className="py-4 px-2">+91 9956845228 </p>
                </div>
                <div className="d-flex justify-content-md-start justify-content-center">
                  <Mail
                    className="m-4"
                    style={{ color: "#fff" }}
                    width={25}
                    height={25}
                  />
                  <p className="py-4 px-2">info@lifeassure.com</p>
                </div>
                <div className="d-flex justify-content-md-start justify-content-center">
                  <Phone
                    className="m-4"
                    style={{ color: "#fff" }}
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
            {/* info end */}
          </div>
        </div>
        {/* contact ends */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <div>
            <CallBack className="img-fluid" />
          </div>
          <div className="d-flex flex-column justify-content-center w-100 h-100">
            <div>
              <div className="mb-2">
                <span className="d-block text-larger fw-700">
                  Want us to call
                </span>
                <span className="d-block text-larger fw-700">you back?</span>
              </div>
              <div>
                <div className="form-group mb-2">
                  <small>Your name</small>
                  <Input
                    className="col-md-6 d-block col-sm-12 col-xs-12"
                    id="name"
                    onChange={handleNameChange}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <small>Your number</small>
                  <Input
                    className="d-block col-md-6 col-sm-12 col-xs-12"
                    id="phone"
                    onChange={handlePhoneChange}
                    value={phone}
                  />
                </div>
                <div className="mt-2 form-group">
                  <Button onClick={uploadCallMe}>Call Me</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
