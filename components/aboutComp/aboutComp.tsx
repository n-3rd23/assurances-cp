import { Fragment } from "react";
import styles from "./aboutComp.module.scss";
import User_Reviews from "./../user_reviews/user_reviews";
import TalkUsBox from "./../talkUsBox/talkUsBox";
import AboutUsPlanCard from "./../aboutUSPlanCard/aboutUsPlanCard";
import { useEffect, useState } from "react";

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
          <div className="container">
            <p className="p-5 text-interSize">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              accumsan non diam sit amet venenatis. Donec dictum neque vitae
              elit porta, vitae commodo lacus condimentum. Aenean ullamcorper,
              neque vitae blandit posuere, diam dui ullamcorper dolor, id
              suscipit velit ex in diam. Morbi fermentum sit amet arcu sed
              ultricies. Vestibulum commodo massa enim, eget suscipit metus
              blandit ac. Integer quis ultricies dui. Nullam venenatis eu enim
              eget viverra. Etiam lacus mauris, cursus ac varius et, rhoncus at
              libero. Curabitur non ullamcorper dui. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Nullam vitae ipsum sit amet nulla vestibulum auctor at nec lectus.
              Morbi iaculis mauris justo, a fermentum tortor laoreet eget.
              Aliquam sit amet justo in ipsum efficitur tristique. Nam sed
              libero ac nibh aliquam convallis. Nam in magna at tellus dignissim
              convallis. Ut ornare accumsan suscipit.
            </p>
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
