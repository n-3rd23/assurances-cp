import Layout from "../../components/layout/layout"
import { Fragment } from "react"
import CounterCard from "../../components/counter_card/counter_card"
import MessageCard from "../../components/message_card/message_card"

export default function Messages() {
    return(
        <Layout title="messages" description="admin messages">
            <Fragment>
                <div className="container mt-5 ml-5">
                    <div className="row">
                        <div className="col-md-6">
                            <CounterCard>
                                <Fragment>
                                    <img src="/icons/mail_closed.svg" alt="icon"/>
                                    <div>
                                        <span>Overall Messages</span>
                                        <div><strong>121</strong>  <small> <strong>Messages</strong> </small> </div>
                                    </div>
                                </Fragment>
                            </CounterCard>
                        </div>
                        <div className="col-md-6">
                            <CounterCard>
                                <Fragment>
                                    <img src="/icons/mail_open.svg" alt="icon"/>
                                    <div>
                                        <span>Unread Messages</span>
                                        <div><strong>21 </strong> <small> <strong>Messages</strong> </small> </div>
                                    </div>
                                </Fragment>
                            </CounterCard>
                        </div>
                        <div className="col-md-12 mt-4">
                            <MessageCard>
                                
                            </MessageCard>
                        </div>
                    </div>
                </div>
            </Fragment>
        </Layout>
    );
}