import { Fragment } from "react"
import styles from "./plancard.module.scss"

interface Props {
    children: JSX.Element;
    cardTitle : string;
    clientNumber : number;
}

export default function PlanCard({children} : Props) {
    return(
        <Fragment>
            <div className="container-fluid my-2">
                <div className="row">
                    <div className={`${styles.card_body} p-3 col-md-12 shadow-sm bg-white rounded`}>
                        <div className="row align-center pl-5">
                            <div className="col-md-6">
                                <span>Car Insurance</span>
                                <small className="text-muted d-block">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque nihil explicabo assumenda necessitatibus aut, pariatur nemo non numquam eum ut consequatur est ullam et expedita sed velit, cupiditate omnis iste.
                                </small>
                            </div>
                            <div className="col-md-3">
                                <span>Clients</span>
                                <small className="text-muted d-block">12</small>
                            </div>
                            <div className="col-md-3 text-right pr-5">
                                <img style={{width:"25px"}} src="/icons/trash_red.svg" alt="delete"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}