import styles from "./user_reviews.module.scss";
import { Component } from "react";
import Quote from "../../public/icons/quote.svg";

export default class User_Reviews extends Component {
  state = {
    currentReview: [],
  };
  render() {
    return (
      <div className={`container mt-5 mb-5 p-1 ${styles.containerStyle}`}>
        <a
          className={`px-4 py-2 fw-700 text-white text-large ${styles.smallBoxStyle}`}
        >
          OUR CLIENT SAYS
        </a>
        <div className="container">
          <Quote className="float-end mx-4" width={69} height={59} />{" "}
        </div>
      </div>
    );
  }
}
