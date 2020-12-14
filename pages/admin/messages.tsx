import Admin from "../../components/layout/admin"
import { Fragment } from "react"
import CounterCard from "../../components/counter_card/counter_card"
import MessageCard from "../../components/message_card/message_card"

export default function Messages() {
    return(
        <Admin title="messages" description="admin messages">
            <Fragment>
                <div className="container mt-5 ml-5">
                    <div className="row">
                        <div className="col-md-6">
                            <CounterCard>
                                <Fragment>
                                    <div className={`p-4`} style={{borderRadius:"50%", backgroundColor:"rgba(0, 52, 120, 0.2)"}}>
                                        <img src="/icons/mail_closed.svg" alt="icon"/>
                                    </div>
                                    <div>
                                        <span style={{color:"#5A6371"}} className="fw-600">Overall Messages</span>
                                        <div><strong className="text-large">121</strong>  <small> <strong>Messages</strong> </small> </div>
                                    </div>
                                </Fragment>
                            </CounterCard>
                        </div>
                        <div className="col-md-6">
                            <CounterCard>
                                <Fragment>
                                    <div className={`p-4`} style={{borderRadius:"50%", backgroundColor:"rgba(0, 52, 120, 0.2)"}}>
                                        <img src="/icons/mail_open.svg" alt="icon"/>
                                    </div>
                                    <div>
                                        <span style={{color:"#5A6371"}} className="fw-600">Unread Messages</span>
                                        <div><strong className="text-large">21 </strong> <small> <strong>Messages</strong> </small> </div>
                                    </div>
                                </Fragment>
                            </CounterCard>
                        </div>
                        <div className="col-md-12 mt-4">
                            <MessageCard title="Joseph Mukery" title2="LIFE INSURANCE" description="Happy to be here...." />
                            <MessageCard title="Marshall" title2="CAR INSURANCE" description="Ineed car insurance to insure my car also i need bike insurance to insure my bike." />
                        </div>
                    </div>
                </div>
            </Fragment>
        </Admin>
    );
}