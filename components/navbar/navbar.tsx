import styles from "./navbar.module.scss";

export default function Navbar() {
  return (
    <div className={`container rounded-3 text-center ${styles.containerStyle}`}>
      <div className="container innerContainer">
        <div className="d-flex justify-content-center align-items-center">
          <div className={`px-5 pt-4 pb-2 fw-600 ${styles.nav}`}>HOME</div>
          <div className={`px-5 pt-4 pb-2 fw-600 ${styles.nav}`}>INSURANCE</div>
          <div className={`px-5 pt-4 pb-2 fw-600 ${styles.nav}`}>ABOUT</div>
          <div className={`px-5 pt-4 pb-2 fw-600 ${styles.nav}`}>CONTACT</div>
        </div>
      </div>
    </div>
  );
}
