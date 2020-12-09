import styles from "./header.module.scss";
import { Col, Row, Container, Button } from "react-bootstrap";
import { Fragment } from "react";
import InfoHeading from "../infoHeading/infoHeading";
import Navbar from "../navbar/navbar";

export default function Header() {
  return (
    <Fragment>
      <Container fluid className={` ${styles.firstContainer}`}>
        <Container className="d-flex justify-content-between">
          <div className="p-2">kooi</div>
          <div className="p-2">
            <div className="d-inline p-2 text-medium fw-700 midnightBlue">
              MAKE A CLAIM
            </div>
            <div className="d-inline p-2 fw-200">|</div>
            <div className="d-inline p-2 text-medium fw-700 midnightBlue">
              SERVICES
            </div>
          </div>
        </Container>
      </Container>
      <Container fluid className={`${styles.sndContainer}`}>
        <Container className="mt-4">
          <Row>
            <Col md={6}>
              <div className="d-block">
                <div className="d-inline text-largest fw-700">Life</div>
                <div className="d-inline text-largest fw-700 midnightBlue">
                  Assure
                </div>
              </div>
              <div
                className={`d-block text-medium fw-700 ${styles.headSizing}`}
              >
                INSURANCE COMPANY
              </div>
            </Col>

            <Col md={3} className="mt-4">
              <InfoHeading
                mainHead="info@lifeassure.com"
                subHead="Send us a message"
              />
            </Col>
            <Col md={3} className="mt-4">
              <InfoHeading mainHead="+91 9872369874" subHead="Give us a call" />
            </Col>
          </Row>
        </Container>
      </Container>
      <Navbar />
    </Fragment>
  );
}
