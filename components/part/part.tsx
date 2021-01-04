import styles from "./part.module.scss";
import { Modal } from "antd";
import { Fragment, useState } from "react";
import GetQuote from "../getQuote/getQuote";

export default function Part({ name }) {
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
      <div
        className="container mx-auto text-white w-75 text-center p-2"
        style={{ backgroundColor: "#89d32a" }}
      >
        <a className="fw-600"> Not sure what you need? </a>
        <a className="fw-300">
          {" "}
          Learn in seconds which types of insurance match your bussiness{" "}
        </a>
        <button
          type="button"
          className="btn btn btn-outline-light mx-5 fw-300"
          style={{ border: "2px solid white" }}
          onClick={() => setIsModalVisible(true)}
        >
          {name}
        </button>
      </div>
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
