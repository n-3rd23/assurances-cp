import styles from "./feature_card.module.scss";
import Safe from "../../public/icons/safe.svg";
import Dove from "../../public/icons/dove.svg";
import Bank from "../../public/icons/piggy-bank.svg";

export default function Feature_Card({ icon, head, content }) {
  return (
    <div className={`container ${styles.containerStyle} text-center p-4`}>
      <div className="mt-4">
        <div className={`${styles.roundedStyle} mx-auto`}>
        {icon}
        </div>
      </div>
      <div className="mt-3 text-large text-primary fw-800">{head}</div>
      <p className="mt-3 text-small py-md-2">{content}</p>
    </div>
  );
}
