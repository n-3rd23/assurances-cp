import styles from "./infoHeading.module.scss";
import { Col, Row, Container } from "react-bootstrap";

export default function InfoHeading({ icon, mainHead, subHead }) {
  return (
    <Container fluid>
      <Row>
        <Col md={4}>
          <img src="" alt="" />
        </Col>
        <Col md={8} className={`fw-700 text-interSize midnightBlue `}>
          {mainHead}
          <br />
          <div className={`fw-600 text-medium lightSlateGrey `}>{subHead}</div>
        </Col>
      </Row>
    </Container>
  );
}
