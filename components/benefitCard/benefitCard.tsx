import styles from "./benefitCard.module.scss";
import DOMPurify from "dompurify";

export default function BenefitCard({ head, desc }) {
  return (
    <div
      className={`fluid-container d-flex justify-content-start m-2 ${styles.containerStyle}`}
    >
      <div className="p-1 flex-grow-1 m-4">
        <a className="text-interSize fw-800">{head}</a>
        <div
          className="text-interSize"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }}
        ></div>
      </div>
    </div>
  );
}
