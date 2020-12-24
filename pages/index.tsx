import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import Bar from "../components/bar/bar";
import Home_Features from "../components/home_features/home_features";
import Insurance_Main from "../components/insurance_main/insurance_main";
import User_Reviews from "../components/user_reviews/user_reviews";

export default function Home() {
  return (
    <Layout title="Assurances" description="Best Life Insurance ever">
      <Hero
        subHead="LIVE SECURE,LIVE HAPPY"
        mainHead="RELIABLE INSURANCE FOR ANY PURPOSE"
      />
      <Bar />
      <Home_Features />
      <Insurance_Main />
      <User_Reviews />
    </Layout>
  );
}
