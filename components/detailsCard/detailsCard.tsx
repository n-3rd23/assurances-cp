import styles from "./detailsCard.module.scss";

export default function DetailsCard({ subHead1, mainHead, subHead2 }) {
  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center my-5 mx-4 ${styles.containerStyle}`}
    >
      <p className={`px-3 text-medium fw-700`} style={{ color: "#8d94a5" }}>
        {subHead1}
      </p>
      <p
        className={`px-2 ${styles.pStyle} fw-700`}
        style={{ fontSize: "2.8rem" }}
      >
        {mainHead}
      </p>
      <p className={`px-3 text-medium fw-700`} style={{ color: "#8d94a5" }}>
        {subHead2}
      </p>
    </div>
  );
}
