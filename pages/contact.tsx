import Layout from "../components/layout/layout";
import Phone from "../public/icons/phone.svg";
import Location from "../public/icons/location_white.svg";
import ClosedMail from "../public/icons/mail_closed_white.svg";
import Facebook from "../public/icons/facebook.svg";
import Instagram from "../public/icons/instagram.svg";
import Linkedin from "../public/icons/linkedin.svg";
import Twitter from "../public/icons/twitter.svg";
import TalkUsBox from "./../components/talkUsBox/talkUsBox";
import CallUsBack from "../components/callUsBack/callUsBack";

export default function Contact() {
  return (
    <Layout title="Contact" description="Contact us">
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
              <TalkUsBox />
              {/* <p className="fw-700 mt-4">Your Name</p>
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
              </button> */}
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
                  <p className="py-4 px-2">+91 9846117476 </p>
                </div>
                <div className="d-flex justify-content-md-start justify-content-center">
                  <ClosedMail className="m-4" width={25} height={25} />
                  <p className="py-4 px-2">thomasassurance@yahoo.com</p>
                </div>
                <div className="d-flex justify-content-md-start justify-content-center">
                  <Location className="m-4" width={25} height={25} />
                  <p className="py-4 px-2">Chembumukku Jn, Kakkanad, Kochi</p>
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
        <CallUsBack />
      </div>
    </Layout>
  );
}
