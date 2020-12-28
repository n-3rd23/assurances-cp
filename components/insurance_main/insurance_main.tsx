import styles from "./insurance_main.module.scss";
import { Component } from "react";
import { message } from "antd";
import { firestore } from "../../firebase/firebase.util";
import GetQuoteButt from "./../getQuoteButt/getQuoteButt";

export default class Insurance_Main extends Component {
  state = {
    plans: {},
    selectedPlan: {},
  };

  componentDidMount() {
    this.getPlans();
  }

  getPlans = async () => {
    let plansDb = {};
    await firestore
      .collection("plans")
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          plansDb[doc.id] = doc.data();
        });
      })
      .then(() =>
        this.setState({
          plans: plansDb,
          selectedPlan: Object.entries(plansDb)[0][1],
          selectedImage: Object.entries(plansDb)[0][1].images[0],
        })
      )
      .catch(function (error) {
        message.error("Network issue encountered. Unable to fetch data.");
      });
  };

  render() {
    return (
      <div className={`container-fluid mt-5 pt-5 ${styles.mainStyle}`}>
        <div className="container mt-5 w-100">
          <div
            className={`d-flex flex-nowrap justify-content-between ${styles.containerStyle}`}
          >
            <div className="p-2 bd-highlight ">
              <div className={`${styles.imgDiv}`}>
                {this.state.selectedPlan.images ? (
                  <img
                    width="100%"
                    height="100%"
                    src={this.state.selectedPlan.images[0].link}
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
                {this.state.selectedPlan.planName}
                <div className="text-interSize fw-100 mt-2">
                  {this.state.selectedPlan.planSummary}
                </div>
              </div>
              <div><GetQuoteButt/></div>
            </div>

            <div className="p-2 bd-highlight ">
              <div
                className={`text-interSize fw-600 p-3 d-flex flex-column bd-highlight mb-3`}
              >
                {" "}
                {Object.entries(this.state.plans).map((item) => {
                  return (
                    <button
                      key={item[1].planName}
                      className={`border-0 ${styles.buttonStyle}`}
                      onClick={() => {
                        this.setState({
                          selectedPlan: item[1],
                        });
                      }}
                    >
                      <div
                        key={item[1].planName}
                        className={`p-2 ${styles.divStyle}`}
                      >
                        {item[1].planName}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center mt-4 pb-4">
          <button className={`border-0 ${styles.buttonStyle}`}>
            LOAD MORE
          </button>
        </div>
      </div>
    );
  }
}
