import Quote from "../../public/icons/quote.svg";
import Button from "../button/button";
import styles from "./hero.module.scss";
import { AutoComplete, Modal } from "antd";
import React, { useState } from "react";
import GetQuote from "../getQuote/getQuote";

export default function Hero({ subHead, mainHead }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={`${styles.hero} position-relative`}>
      <div
        className={`${styles.heroText} position-absolute text-white col-md-4 col-sm-8 col-12 text-md-start text-center`}
      >
        <p className="mb-0">{subHead}</p>
        <h1 className="mb-0 fw-800 text-white">{mainHead}</h1>
        <Button
          onClick={showModal}
          className="mt-3 fw-700 d-flex shadow-light mx-md-0 mx-auto"
        >
          <Quote width={16} height={16} className="shadow-sm" />
          &nbsp;
          <p className="mb-0 ms-2">GET A QUOTE</p>
        </Button>
        <Modal
          bodyStyle={{
            backgroundColor: "#003478",
          }}
          closable={false}
          footer={null}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <GetQuote />
        </Modal>
      </div>
    </div>
  );
}
