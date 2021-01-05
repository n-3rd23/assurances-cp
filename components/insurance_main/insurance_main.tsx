import styles from "./insurance_main.module.scss";
import Link from "next/link";
import kebabCase from "lodash/kebabCase";
import truncate from "lodash/truncate";
import { useEffect, useState } from "react";

export default function Insurance_Main() {
  const [plans, setPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans?limit=5`)
      .then((res) => res.json())
      .then((plans) => {
        setPlan(plans.plans);
        setSelectedPlan(plans.plans[0]);
      });
  }, []);
  if (selectedPlan && plans) {
    return (
      <div className={`container-fluid mt-5 pt-5 ${styles.mainStyle}`}>
        <div className="container mt-5 w-100">
          <div
            className={`d-flex flex-nowrap justify-content-between ${styles.containerStyle}`}
          >
            <div className="p-2 bd-highlight ">
              <div className={`${styles.imgDiv}`}>
                {selectedPlan.images[0] ? (
                  <img
                    width="100%"
                    height="100%"
                    src={selectedPlan.images[0].link}
                    alt=""
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
            <div
              className={`order-md-first p-2 bd-highlight  ${styles.sectionStyle}`}
            >
              {" "}
              <div className=" text-large fw-600">
                {selectedPlan.planName}
                <div className="text-interSize fw-100 mt-2">
                  {truncate(selectedPlan.planSummary, {
                    length: 150,
                  })}
                </div>
              </div>
              <div>
                <Link
                  href={{
                    pathname: "/insurance/[slug]",
                    query: { title: selectedPlan.planName },
                  }}
                  as={`/insurance/${kebabCase(selectedPlan.planName)}`}
                >
                  <a className="btn btn btn-outline-light mt-3">LEARN MORE</a>
                </Link>
              </div>
            </div>

            <div className="p-2 bd-highlight ">
              <div
                className={`text-interSize fw-600 p-3 d-flex flex-column bd-highlight mb-3`}
              >
                {" "}
                {plans.map((item) => {
                  return (
                    <button
                      key={item.planName}
                      className={`border-0 ${styles.buttonStyle}`}
                      onClick={() => setSelectedPlan(item)}
                    >
                      <div
                        key={item.planName}
                        className={`p-2 ${styles.divStyle}`}
                      >
                        {item.planName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center mt-4 pb-4">
          <Link href="/insurance">
            <a className={`border-0 ${styles.buttonStyle}`}>LOAD MORE</a>
          </Link>
        </div>
      </div>
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
