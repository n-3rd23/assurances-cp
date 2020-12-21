import { Fragment } from "react";
import styles from "./feature_card.module.scss";
import Safe from "../../public/icons/safe.svg";
import Dove from "../../public/icons/dove.svg";
import Bank from "../../public/icons/piggy-bank.svg";

export default function Feature_Card({ icon, head, content }) {
  return (
    <div className={`container ${styles.containerStyle} text-center `}>
      <div className="mt-4">
        <div className={`${styles.roundedStyle} mx-auto`}>
          {icon === "Safe" ? (
            <Safe
              className={`p-1 m-1 ${styles.iconStyle}`}
              width={50}
              height={50}
            />
          ) : icon === "Dove" ? (
            <Dove className="p-1 m-1" width={50} height={50} />
          ) : (
            <Bank className="p-1 m-1" width={50} height={50} />
          )}
        </div>
      </div>
      <div className="mt-3 text-large text-primary fw-800">{head}</div>
      <p className="mt-3 text-small py-md-2">{content}</p>
    </div>
  );
}
