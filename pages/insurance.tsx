import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import UserPlanCard from "../components/userPlanCard/userPlanCard";
import { firestore, storage } from "../firebase/firebase.util";
import { message } from "antd";
import { Component } from "react";

export default class Insurance extends Component {
  state = {
    plans: {},
  };

  componentDidMount() {
    this.getPlans();
  }

  getPlans = async () => {
    let plansDb = {};
    firestore
      .collection("plans")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          plansDb[doc.id] = doc.data();
        });
      })
      .then(() => this.setState({ plans: plansDb }))
      .catch(function (error) {
        message.error("Network issue encountered. Unable to fetch data.");
      });
  };

  render() {
    return (
      <Layout title="Assurances" description="Best Life Insurance ever">
        <Hero subHead="FOR EVERY PURPOSE" mainHead="WE HAVE YOU COVERED" />
        <div className="d-flex justify-content-around flex-wrap my-5">
          {Object.entries(this.state.plans).map((item) => {
            return (
              <div className="p-2">
                {" "}
                <UserPlanCard
                  subHead1="POLICY"
                  mainHead={item[1].planName}
                  subHead2={item[1].planSummary}
                />
              </div>
            );
            console.log(item[1]);
          })}
        </div>
      </Layout>
    );
  }
}
