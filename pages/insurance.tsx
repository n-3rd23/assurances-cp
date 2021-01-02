import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import UserPlanCard from "../components/userPlanCard/userPlanCard";

interface Props {
  plans?: any;
}

export default function Insurance({ plans }: Props) {
  return (
    <Layout title="Insurances" description="assurances insurance plans">
      <Hero subHead="FOR EVERY PURPOSE" mainHead="WE HAVE YOU COVERED" />
      <div className="row mx-auto">
        {plans && plans.plans
          ? plans.plans.map((item: any) => {
              return (
                <div
                  key={item.id}
                  className="col-lg-5 col-md-5 col-sm-5 col-12 p-5"
                >
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
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans`);
  const plans = await data.json();
  return { plans };
};
