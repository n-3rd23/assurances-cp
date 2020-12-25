import Admin from "../../components/layout/admin"
import { Fragment, useEffect, useState } from "react"
import CounterCard from "../../components/counter_card/counter_card"
import MessageCard from "../../components/message_card/message_card"
import { Collapse } from "antd"
import { firestore } from "../../firebase/firebase.util"
import { spawn } from "child_process"

export default function Messages() {

  useEffect(() => {
    fetchMessages()
  }, [])

  const [messages, setMessages] = useState([])
  const [totalMessageCount, setTotalMessageCount] = useState(0)
  const { Panel } = Collapse

  const fetchMessages = async () => {
    try {
      var tmp = []
      const messagesRef = await firestore.collection("qoutes")
      const messagesDoc = await messagesRef.get()
      messagesDoc.forEach((doc) => {
        tmp.push({ id: doc.id, ...doc.data() })
      })
      setTotalMessageCount(tmp.length)
      setMessages(tmp)
    } catch(error) {
      console.log("error while fetching messages", error)
    }
  }

  console.log(messages)

  return (
    <Admin title="messages" description="admin messages">
      <Fragment>
        <div className="container mt-5 ml-5">
          <div className="row">
            <div className="col-md-6">
              <CounterCard>
                <Fragment>
                  <div className={`p-4`} style={{ borderRadius: "50%", backgroundColor: "rgba(0, 52, 120, 0.2)" }}>
                    <img src="/icons/mail_closed.svg" alt="icon" />
                  </div>
                  <div>
                    <span style={{ color: "#5A6371" }} className="fw-600">Overall Messages</span>
                    <div><strong className="text-large">{totalMessageCount}</strong>  <small> <strong>Messages</strong> </small> </div>
                  </div>
                </Fragment>
              </CounterCard>
            </div>
            <div className="col-md-6">
              <CounterCard>
                <Fragment>
                  <div className={`p-4`} style={{ borderRadius: "50%", backgroundColor: "rgba(0, 52, 120, 0.2)" }}>
                    <img src="/icons/mail_open.svg" alt="icon" />
                  </div>
                  <div>
                    <span style={{ color: "#5A6371" }} className="fw-600">Unread Messages</span>
                    <div><strong className="text-large">21 </strong> <small> <strong>Messages</strong> </small> </div>
                  </div>
                </Fragment>
              </CounterCard>
            </div>
            {/* <div className="col-md-12 mt-4">
                     <MessageCard title="Joseph Mukery" title2="LIFE INSURANCE" description="Happy to be here...." />
                     <MessageCard title="Marshall" title2="CAR INSURANCE" description="Ineed car insurance to insure my car also i need bike insurance to insure my bike." />
                  </div> */}
            <Collapse className="mt-4 border-0" bordered={false}>
              {
                messages
                  ?
                  messages.length > 0
                    ?
                      messages.map((message) => {
                        return (
                          <Panel
                            header={<MessageCard title={message.Name} title2="LIFE INSURANCE" description={message.Message} />}
                            key={message.id}
                            showArrow={false}
                            className="border-0"
                          >
                            <div className="bg-light shadow-sm p-3">
                              <p>
                                {message.Message}
                              </p>
                              <p>
                                {message.Email}
                              </p>
                              <p className="fw-600">
                                {message.Phone}
                              </p>
                            </div>
                          </Panel>
                        )
                      })
                    : <span>no messages :)</span>
                  :null
              }
            </Collapse>
          </div>
        </div>
      </Fragment>
    </Admin>
  );
}