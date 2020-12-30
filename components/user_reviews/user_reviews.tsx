import styles from "./user_reviews.module.scss";
import { Component, Fragment } from "react";
import Quote from "../../public/icons/quote.svg";

export default class User_Reviews extends Component {
  state = {
    currentReview: [],
    quotes: [
      {
        name: "athul",
        quote:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        name: "Chumma",
        quote:
          "Lorem aafa afaf Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
  };

  componentDidMount() {
    this.setState({ currentReview: this.state.quotes[0] });
  }

  render() {
    return (
      <Fragment>
        <div className={`container mb-1 mt-5 p-1 ${styles.containerStyle}`}>
          <a
            className={`px-4 py-2 fw-700 text-white text-large ${styles.smallBoxStyle}`}
          >
            OUR CLIENT SAYS
          </a>
          <div className={`container my-4`}>
            <Quote
              className={`float-end me-5 ${styles.quoteStyle}`}
              width={59}
              height={49}
            />{" "}
          </div>
          <div className="container p-5 mt-5">
            <a className="w-75" style={{ color: "#a3b6ce" }}>
              {this.state.currentReview.quote}
            </a>
            <p className="text-middle fw-700 py-3" style={{ color: "#003478" }}>
              {this.state.currentReview.name}
            </p>
          </div>
        </div>
        <div className="container d-flex mb-5">
          {this.state.quotes.map((item) => {
            return (
              <div
                key={item.name}
                className={`${styles.dotStyle} m-1`}
                onClick={() => {
                  this.setState({ currentReview: item });
                }}
              ></div>
            );
          })}
        </div>
      </Fragment>
    );
  }
}
