import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import UserPlanCard from "../components/userPlanCard/userPlanCard";

export default function Insurance() {
  return (
    <Layout title="Assurances" description="Best Life Insurance ever">
      <Hero subHead="FOR EVERY PURPOSE" mainHead="WE HAVE YOU COVERED" />

      <div className="d-flex justify-content-around flex-wrap">
        <div className="p-5">
          {" "}
          <UserPlanCard
            subHead1="POLICY"
            mainHead="Jeevan Anand"
            subHead2="Secure your life with jeevan anand and enjoy it's benefits throughout your life.For you and you're family"
          />
        </div>
        <div className="p-5">
          {" "}
          <UserPlanCard
            subHead1="POLICY"
            mainHead="Jeevan Anand"
            subHead2="Secure your life with jeevan anand and enjoy it's benefits throughout your life.For you and you're family"
          />
        </div>
        <div className="p-5">
          {" "}
          <UserPlanCard
            subHead1="POLICY"
            mainHead="Jeevan Anand"
            subHead2="Secure your life with jeevan anand and enjoy it's benefits throughout your life.For you and you're family"
          />
        </div>
        <div className="p-5">
          {" "}
          <UserPlanCard
            subHead1="POLICY"
            mainHead="Jeevan Anand"
            subHead2="Secure your life with jeevan anand and enjoy it's benefits throughout your life.For you and you're family"
          />
        </div>
      </div>
    </Layout>
  );
}
