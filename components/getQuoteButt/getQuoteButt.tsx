import styles from "./getQuoteButt.module.scss";
import { Modal } from "antd";
import React, { Fragment, useState } from "react";
import GetQuote from "../getQuote/getQuote";

export default function GetQuoteButt() {
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
    <Fragment>
      <button
        type="button"
        className="btn btn-lg btn-outline-light mt-4 rounded-0"
        onClick={showModal}
      >
        GET A QUOTE
      </button>
      <Modal
        bodyStyle={{
          backgroundColor: "#003478",
        }}
        className={styles.modalStyle}
        closable={false}
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <GetQuote />
      </Modal>
    </Fragment>
  );
}
