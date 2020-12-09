import styles from "./homeMain.module.scss";
import { Container, Row, Col } from "react-bootstrap";

export default function HomeMain() {
  return (
    <Container fluid className={`${styles.containerMainStyle}`}>
      hi
    </Container>
  );
}
