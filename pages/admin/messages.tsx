import Admin from "../../components/layout/admin";
import { Fragment, useEffect, useState } from "react";
import CounterCard from "../../components/counter_card/counter_card";
import MessageCard from "../../components/message_card/message_card";
import { Collapse } from "antd";
import { firestore } from "../../firebase/firebase.util";

export default function Messages() {
  // useEffect(() => {
  //   fetchMessages();
  //   fetchCallbacks();
  // }, []);

  const [messages, setMessages] = useState([]);
  const [totalMessageCount, setTotalMessageCount] = useState(0);
  const [callBacks, setCallbacks] = useState([]);
  const [callBackCount, setCallBackCount] = useState(0);
  const [displayContent, setDisplayContent] = useState(null);
  const { Panel } = Collapse;

  useEffect(() => {
    const unsubscribeQuotes = firestore.collection("qoutes").onSnapshot(
      function (querySnapshot) {
        const qoutes = [];
        querySnapshot.forEach(function (doc) {
          qoutes.push(doc.data());
        });
        setMessages(qoutes);
      },
      function (error) {
        console.error(error);
      }
    );

    const unsubscribeCallbacks = firestore.collection("callme").onSnapshot(
      function (querySnapshot) {
        const callme = [];
        querySnapshot.forEach(function (doc) {
          callme.push(doc.data());
        });
        setCallbacks(callme);
      },
      function (error) {
        console.error(error);
      }
    );
    return () => {
      unsubscribeQuotes();
      unsubscribeCallbacks();
    };
  }, []);

  // const fetchMessages = async () => {
  //   try {
  //     var tmp = [];
  //     const messagesRef = await firestore
  //       .collection("qoutes")
  //       .where("View", "==", false);
  //     const messagesDoc = await messagesRef.get();
  //     messagesDoc.forEach((doc) => {
  //       tmp.push({ id: doc.id, ...doc.data() });
  //     });
  //     setTotalMessageCount(tmp.length);
  //     setMessages(tmp);
  //     setDisplayContent(tmp);
  //   } catch (error) {
  //     console.log("error while fetching messages", error);
  //   }
  // };

  // const fetchCallbacks = async () => {
  //   try {
  //     var tmp = [];
  //     const callBackRef = await firestore
  //       .collection("callme")
  //       .where("view", "==", false);
  //     const callBackDoc = await callBackRef.get();
  //     callBackDoc.forEach((doc) => {
  //       tmp.push({ id: doc.id, ...doc.data() });
  //     });
  //     setCallBackCount(tmp.length);
  //     setCallbacks(tmp);
  //   } catch (error) {
  //     console.log("Unabel to fetch callbacks!");
  //   }
  // };

  const displayMessages = () => {
    setDisplayContent(messages);
  };

  const displayCallbacks = () => {
    setDisplayContent(callBacks);
  };

  return (
    <Admin title="Messages" description="admin messages">
      <Fragment>
        <div className="container mt-5 ml-5">
          <div className="row">
            <div
              style={{ cursor: "pointer" }}
              onClick={displayMessages}
              className="col-md-6"
            >
              <CounterCard>
                <Fragment>
                  <div
                    className={`p-4`}
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 52, 120, 0.2)",
                    }}
                  >
                    <img src="/icons/mail_closed.svg" alt="icon" />
                  </div>
                  <div>
                    <span style={{ color: "#5A6371" }} className="fw-600">
                      Overall Messages
                    </span>
                    <div>
                      <strong className="text-large">
                        {totalMessageCount}
                      </strong>{" "}
                      <small>
                        {" "}
                        <strong>Messages</strong>{" "}
                      </small>{" "}
                    </div>
                  </div>
                </Fragment>
              </CounterCard>
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={displayCallbacks}
              className="col-md-6"
            >
              <CounterCard>
                <Fragment>
                  <div
                    className={`p-4`}
                    style={{
                      borderRadius: "50%",
                      backgroundColor: "rgba(0, 52, 120, 0.2)",
                    }}
                  >
                    <img
                      src="/icons/call-back.svg"
                      style={{ height: "40px", width: "40px" }}
                      alt="icon"
                    />
                  </div>
                  <div>
                    <span style={{ color: "#5A6371" }} className="fw-600">
                      Call Back Requests
                    </span>
                    <div>
                      <strong className="text-large">{callBackCount} </strong>{" "}
                      <small>
                        {" "}
                        <strong>Requests</strong>{" "}
                      </small>{" "}
                    </div>
                  </div>
                </Fragment>
              </CounterCard>
            </div>
            {/* <div className="col-md-12 mt-4">
                     <MessageCard title="Joseph Mukery" title2="LIFE INSURANCE" description="Happy to be here...." />
                     <MessageCard title="Marshall" title2="CAR INSURANCE" description="Ineed car insurance to insure my car also i need bike insurance to insure my bike." />
                  </div> */}
            <Collapse className="mt-4 border-0" bordered={false}>
              {displayContent ? (
                displayContent.length > 0 ? (
                  displayContent.map((message, index) => {
                    return (
                      <Panel
                        header={
                          <MessageCard
                            title={message.Name ? message.Name : message.name}
                            title2="LIFE INSURANCE"
                            description={
                              message.Message
                                ? message.Message
                                : "requesting callback"
                            }
                          />
                        }
                        key={index}
                        showArrow={false}
                        className="border-0"
                      >
                        <div className="bg-light shadow-sm p-3">
                          <p>
                            {message.Message ? message.Message : message.name}
                          </p>
                          <p>{message.Email}</p>
                          <p className="fw-600">
                            {message.Phone ? message.Phone : message.number}
                          </p>
                        </div>
                      </Panel>
                    );
                  })
                ) : (
                  <span>no messages :)</span>
                )
              ) : null}
            </Collapse>
          </div>
        </div>
      </Fragment>
    </Admin>
  );
}
