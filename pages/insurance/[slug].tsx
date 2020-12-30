import Layout from "../../components/layout/layout";
import DetailsCard from "./../../components/detailsCard/detailsCard";
import { useState } from "react";
import { firestore } from "../../firebase/firebase.util";
import { message } from "antd";
import Router from "next/router";
import Clock from "../../public/icons/clock.svg";
import BenefitCard from "./../../components/benefitCard/benefitCard";
import PlanHero from "./../../components/planHero/planHero";
import { useRouter } from "next/router";

export default function Insurance({ plan }) {
  const [currentPlan, setCurrentPlan] = useState(null);
  console.log(plan);
  if (currentPlan) {
    return (
      <Layout title="Assurances" description="Best Life Insurance ever">
        <PlanHero
          subHead="Life is secure"
          head={currentPlan.planName}
          img={this.state.images.link}
        />
        <div className="d-flex flex-wrap justify-content-center">
          <DetailsCard
            subHead1="TERM"
            mainHead={this.state.term.from + " - " + this.state.term.to}
            subHead2="YEARS"
          />
          <DetailsCard
            subHead1="MAX MATURITY"
            mainHead={currentPlan.maxMaturityAge}
            subHead2="YEARS"
          />
          <DetailsCard
            subHead1="MIN SUM"
            mainHead={this.state.sum.min}
            subHead2="ASSURED"
          />
        </div>
        <div className="container px-4 px-md-5 smTextCenter">
          <a className="mt-5 fw-700" style={{ color: "#5a6371" }}>
            SUMMARY
          </a>
          <p className="text-interSize">{currentPlan.planSummary}</p>
        </div>

        <div className="d-flex container mt-5 px-4 px-md-5 justify-contents-start">
          <div className="p-2">
            <Clock width={60} height={60} />
          </div>
          <div className="p-2">
            <a className="text-medium fw-600" style={{ color: "#545e75" }}>
              PREMIUM
            </a>
            <br />
            {this.state.premium.map((item) => {
              return (
                <a key={item} className="fw-700 text-middle">
                  {" "}
                  {item},
                </a>
              );
            })}
          </div>
        </div>

        <div className="container mb-5 px-4 px-md-5">
          <p className="mt-5 fw-700" style={{ color: "#5a6371" }}>
            BENEFITS
          </p>
          {Object.entries(this.state.benefits).map((item) => {
            return (
              <BenefitCard
                key={item[1].title}
                head={item[1].title.toUpperCase()}
                desc={item[1].description}
              />
            );
          })}
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
}

Insurance.getInitialProps = async ({ req }) => {
  // const data = await fetch(
  //   `http://localhost:3000/api/plan?slug=${.query.slug}`
  // );
  // const plan = await data.json();
  const plan = "afaf";
  console.log(req);
  return { plan };
};
