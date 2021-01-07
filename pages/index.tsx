import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import Home_Features from "../components/home_features/home_features";
import Insurance_Main from "../components/insurance_main/insurance_main";
import User_Reviews from "../components/user_reviews/user_reviews";
import Part from "../components/part/part";
import Services from "./../components/services/services";

export default function Home() {
  return (
    <Layout title="Assurances" description="Best Life Insurance ever">
      <Hero
        subHead="LIVE SECURE,LIVE HAPPY"
        mainHead="RELIABLE INSURANCE FOR ANY PURPOSE"
      />
      <Home_Features />
      <Insurance_Main />
      <User_Reviews />
      <Services />
      <Part name="LEARN MORE" />
    </Layout>
  );
}
