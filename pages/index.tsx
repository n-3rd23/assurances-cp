import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import Home_Features from "../components/home_features/home_features";
import Insurance_Main from "../components/insurance_main/insurance_main";
import User_Reviews from "../components/user_reviews/user_reviews";
import Part from "../components/part/part";
import Services from "./../components/services/services";
import { firestore } from "../firebase/firebase.util";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const pageVisitRef = firestore
      .collection("siteVisits")
      .doc("BO1iFx1wtVincsnhZq95");
    pageVisitRef.get().then((doc) => {
      var a = doc.data().count + 1;
      pageVisitRef.set({
        count: a
      })
    });
  });
  
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
