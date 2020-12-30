import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import UserPlanCard from "../components/userPlanCard/userPlanCard";

interface Props {
  plans?: any;
}

export default function Insurance({ plans }: Props) {
  return (
    <Layout title="Assurances" description="Best Life Insurance ever">
      <Hero subHead="FOR EVERY PURPOSE" mainHead="WE HAVE YOU COVERED" />
      <div className="d-flex justify-content-around flex-wrap my-5">
        {plans && plans.plans
          ? plans.plans.map((item: any) => {
              return (
                <div key={item.id} className="p-2">
                  {" "}
                  <UserPlanCard
                    subHead1="POLICY"
                    mainHead={item.planName}
                    subHead2={item.planSummary}
                  />
                </div>
              );
            })
          : ""}
      </div>
    </Layout>
  );
}

Insurance.getInitialProps = async ({ req }) => {
  const data = await fetch("http://localhost:3000/api/plans");
  const plans = await data.json();
  return { plans };
};
