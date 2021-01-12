import { Fragment } from "react";
import styles from "./aboutComp.module.scss";
import User_Reviews from "./../user_reviews/user_reviews";
import TalkUsBox from "./../talkUsBox/talkUsBox";
import AboutUsPlanCard from "./../aboutUSPlanCard/aboutUsPlanCard";
import { useEffect, useState } from "react";
import Link from "next/link";
import Bar from "../bar/bar";

export default function AboutComp() {
  const [plans, setPlan] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans`)
      .then((res) => res.json())
      .then((plans) => {
        setPlan(plans.plans);
      });
  }, []);
  if (plans) {
    return (
      <Fragment>
        <div className="container-fluid text-center my-5">
          <a className={`p-2 ${styles.pStyle}`}>Hi, we're Assurance</a>
          <p className="p-4 text-larger fw-700">
            {" "}
            We are always tailored to your needs
          </p>
          <div className="container d-flex flex-sm-nowrap flex-md-nowrap flex-wrap justify-content-center">
            <div className="p-2 text-center">
              <img src="/images/thomas.jpg" width="200px" height="200px"></img>
              <p className="fw-600">M L THOMAS (BABU)</p>
            </div>
            <div className="p-2">
              <p className="p-sm-5 p-md-5 p-1 text-interSize">
                I am working as Insurance Advisor in LIC and The New India
                Assurance Company Ltd for the last 21 years. In LIC I am
                entitled as Chairman's Club Member meanwhile in New India
                Assurance Co Ltd as a CMD Club Member. I do provide support to
                people who are interested in LIC and General Insurance in the
                form of helping to join new policies and sharing of other valid
                information for their insurance advantages. In order to solve
                the queries related to Insurances, I have availed a well
                equipped office at Chembumukku Jn, Kakkanad since 2010. I assure
                my best in policy service for all insurance needs of customers
              </p>
            </div>
          </div>
        </div>
        <div className="container-fluid text-center my-5">
          <p className="text-largest text-primary fw-800">AFFILIATED TO</p>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            <div className="p-4">
              <a href="https://licindia.in/" target="_blank">
                <img
                  src="/images/lic_logo.png"
                  width="300px"
                  height="200px"
                ></img>
              </a>
            </div>
            <div className="p-4">
              <a href="https://www.newindia.co.in/portal/" target="_blank">
                <img
                  src="/images/New_india_Assurance.png"
                  width="200px"
                  height="200px"
                ></img>
              </a>
            </div>
          </div>
        </div>
        <div
          className="container-fluid p-5 text-center mb-4"
          style={{ backgroundColor: "#f3f5f7" }}
        >
          <a className="py-4 fw-700 text-largest">OUR BEST </a>
          <a className="py-3 fw-800 text-largest" style={{ color: "#003478" }}>
            PLANS
          </a>
          <div className="d-flex flex-wrap justify-content-center">
            {plans.map((item) => {
              return (
                <div className="p-3" key={item.id}>
                  <AboutUsPlanCard subHead="POLICY" mainHead={item.planName} />
                </div>
              );
            })}
          </div>
        </div>

        <User_Reviews />
        <div
          className="container-fluid p-5 text-center mt-4"
          style={{ backgroundColor: "#f3f5f7" }}
        >
          <a className="py-4 fw-700 text-largest">GET IN </a>
          <a className="py-3 fw-800 text-largest" style={{ color: "#003478" }}>
            TOUCH
          </a>

          <div className="d-flex justify-content-center mt-5">
            <div
              className={`${styles.containerStyle} d-flex flex-column justify-content-md-center align-items-sm-start`}
            >
              <p className={`${styles.aStyle} text-extraLarge fw-800`}>
                TALK TO US
              </p>
              <div className={`${styles.container3Style}`}>
                <TalkUsBox />
              </div>
            </div>
            <div className={`${styles.container2Style} p-2 text-start`}>
              <TalkUsBox />
            </div>
          </div>
        </div>
      </Fragment>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}
