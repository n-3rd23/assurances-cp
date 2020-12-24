import styles from "./bar.module.scss";

export default function Bar() {
  return (
    <div className={`container bg-primary-main ${styles.containerStyle}`}></div>
  );
}
