import { Input, notification } from "antd";
import Button from "../../components/button/button";
import CallBack from "../../public/icons/call-back.svg";
import { useState } from "react";
import firebase, { firestore } from "../../firebase/firebase.util";

export default function CallUsBack() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const openNotificationSuccess = (type) => {
    notification[type]({
      message: "Success !",
      description:
        "Your request has been recieved we will call you as soon as possible 🙂",
    });
  };

  const clearField = () => {
    setName("");
    setPhone("");
  };
  const uploadCallMe = () => {
    firestore
      .collection("callme")
      .add({
        name: name,
        number: phone,
        view: false,
        received_on: firebase.firestore.FieldValue.serverTimestamp(),
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
        clearField();
        openNotificationSuccess("success");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "#f3f5f7",
      }}
      className="p-5"
    >
      <div>
        <CallBack className="img-fluid" />
      </div>
      <div className="d-flex flex-column justify-content-center w-100 h-100">
        <div>
          <div className="mb-2">
            <span className="d-block text-larger fw-700">Want us to call</span>
            <span className="d-block text-larger fw-700">you back?</span>
          </div>
          <div>
            <div className="form-group mb-2">
              <small className="fw-600">Your Name</small>
              <Input
                className="col-md-6 d-block col-sm-12 col-xs-12"
                id="name"
                onChange={handleNameChange}
                value={name}
              />
            </div>
            <div className="form-group">
              <small className="fw-600">Your Number</small>
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
  );
}
