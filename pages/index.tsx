import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import Home_Features from "../components/home_features/home_features";
import Insurance_Main from "../components/insurance_main/insurance_main";
import User_Reviews from "../components/user_reviews/user_reviews";
import { Modal } from "antd";
import React, { useState } from "react";
import GetQuote from "../components/getQuote";

export default function Home() {
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
    <Layout title="Assurances" description="Best Life Insurance ever">
      <Hero
        subHead="LIVE SECURE,LIVE HAPPY"
        mainHead="RELIABLE INSURANCE FOR ANY PURPOSE"
      />
      <Home_Features />
      <Insurance_Main />
      <User_Reviews />
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
        >
          LEARN MORE
        </button>
      </div>
    </Layout>
  );
}
