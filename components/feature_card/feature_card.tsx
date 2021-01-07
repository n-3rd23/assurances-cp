import styles from "./feature_card.module.scss";

export default function Feature_Card({ icon, head, content }) {
  return (
    <div className={`container ${styles.containerStyle} text-center p-4`}>
      <div className="mt-4">
        <div className={`${styles.roundedStyle} mx-auto`}>{icon}</div>
      </div>
      <div
        className={`${styles.titleStyle} mt-3 text-large text-primary fw-800`}
      >
        {head}
      </div>
      <p className={`${styles.subTitleStyle} mt-3 text-small py-md-2`}>{content}</p>
    </div>
  );
}
