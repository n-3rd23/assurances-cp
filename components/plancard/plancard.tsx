import { Fragment } from "react";
import styles from "./plancard.module.scss";

interface Props {
  children ?: JSX.Element;
  cardTitle?: string;
  clientNumber?: number;
  description ?: string;
}

export default function PlanCard({ cardTitle,description }: Props) {
  return (
    <Fragment>
      <div className="container-fluid my-2">
        <div className="row">
          <div
            className={`${styles.card_body} p-3 col-md-12 shadow-sm bg-white rounded`}
          >
            <div className="row align-items-center pl-5">
              <div className="col-md-6">
                <span>{cardTitle}</span>
                <small className="text-muted d-block">
                  {
                  description.substring(0,150)
                  }...
                </small>
              </div>
              <div className="col-md-3 text-center">
                <span>Clients</span>
                <small className="text-muted d-block">12</small>
              </div>
              <div className="col-md-3 text-center">
                <img
                  style={{ width: "25px" }}
                  src="/icons/trash_red.svg"
                  alt="delete"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
