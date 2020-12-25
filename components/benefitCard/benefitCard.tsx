import styles from "./benefitCard.module.scss";

export default function BenefitCard({ head, desc }) {
  return (
    <div
      className={`fluid-container d-flex justify-content-start m-2 ${styles.containerStyle}`}
    >
      <div className="p-1 flex-grow-1 m-4">
        <a className="text-interSize fw-800">{head}</a>
        <p className="text-interSize">{desc}</p>
      </div>
    </div>
  );
}
