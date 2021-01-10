import Layout from "../../components/layout/layout";
import DetailsCard from "../../components/detailsCard/detailsCard";
import { useEffect, useState } from "react";
import Clock from "../../public/icons/clock.svg";
import BenefitCard from "../../components/benefitCard/benefitCard";
import PlanHero from "../../components/planHero/planHero";
import DOMPurify from "dompurify";
import Part from "../../components/part/part";
import CallUsBack from "../../components/callUsBack/callUsBack";

interface Props {
  plan?: any;
}

export default function Insurance({ plan }: Props) {
  const [currentPlan, setCurrentPlan] = useState(null);
  useEffect(() => {
    setCurrentPlan(plan.plan);
  }, [plan]);

  if (currentPlan) {
    return (
      <Layout title="Assurances" description="Best Life Insurance ever">
        <PlanHero
          subHead="Life is secure"
          head={currentPlan.planName}
          img={currentPlan.images[0].link}
        />
        <div className="d-flex flex-wrap justify-content-center">
          <DetailsCard
            subHead1="TERM"
            mainHead={
              currentPlan.planTerm.from + " - " + currentPlan.planTerm.to
            }
            subHead2="YEARS"
          />
          <DetailsCard
            subHead1="MAX MATURITY"
            mainHead={currentPlan.maxMaturityAge}
            subHead2="YEARS"
          />
          <DetailsCard
            subHead1="MIN SUM"
            mainHead={currentPlan.sumAssured.min}
            subHead2="ASSURED"
          />
        </div>
        <div className="container px-4 px-md-5 smTextCenter">
          <a className="mt-5 fw-700" style={{ color: "#5a6371" }}>
            SUMMARY
          </a>
          <div
            className="text-interSize"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(currentPlan.planSummary),
            }}
          ></div>
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
            {currentPlan.paymentMode.map((item) => {
              return (
                <a key={item} className="fw-700 text-middle">
                  {" "}
                  {item},
                </a>
              );
            })}
          </div>
        </div>
        <div className="container mb-5 px-4 px-md-5 pb-5">
          <p className="mt-5 fw-700" style={{ color: "#5a6371" }}>
            BENEFITS
          </p>
          {currentPlan.benefits.map((item) => {
            return (
              <BenefitCard
                key={item.title}
                head={item.title.toUpperCase()}
                desc={item.description}
              />
            );
          })}
        </div>
        <CallUsBack />
        <Part name="KNOW MORE" />
      </Layout>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}

Insurance.getInitialProps = async (ctx) => {
  const data = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/plan?slug=${ctx.query.slug}`
  );
  const plan = await data.json();
  return { plan };
};
