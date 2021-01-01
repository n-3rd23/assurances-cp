import styles from "./planHero.module.scss";

export default function PlanHero({ img, subHead, head }) {
  return (
    <div
      className={`container mt-5 ${styles.containerStyle}`}
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${img})`,
      }}
    >
      <div
        className="container p-5 text-white d-flex flex-column justify-content-center"
        style={{ height: "450px" }}
      >
        <p className="px-3 mb-0">{subHead}</p>
        <p className="px-3 text-extraLarge fw-600">{head}</p>
      </div>
    </div>
  );
}
