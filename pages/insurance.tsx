import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import UserPlanCard from "../components/userPlanCard/userPlanCard";
import { firestore, storage } from "../firebase/firebase.util";
import { message } from "antd";
import { Component } from "react";
import truncate from "lodash/truncate";

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
        <div className="row mx-auto">
          {Object.entries(this.state.plans).map((item) => {
            return (
              <div key={item[1].planName} className="col-md-5 col-sm-6 col-12">
                {" "}
                <UserPlanCard
                  subHead1="POLICY"
                  mainHead={item[1].planName}
                  subHead2={truncate(item[1].planSummary, { length: "150" })}
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
