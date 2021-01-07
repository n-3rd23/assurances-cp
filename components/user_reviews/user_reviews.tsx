import styles from "./user_reviews.module.scss";
import { Component, Fragment } from "react";
import Quote from "../../public/icons/quote.svg";

interface CurrentReview {
  name?: string;
  quote?: string;
}

interface State {
  currentReview: CurrentReview;
  quotes: CurrentReview[];
  count: number;
}

export default class User_Reviews extends Component {
  state: State = {
    currentReview: {},
    count: 0,
    quotes: [
      {
        name: "Athul",
        quote:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        name: "Alan",
        quote:
          "Lorem aafa afaf Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        name: "Marshall",
        quote:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
  };

  componentDidMount() {
    this.setState({ currentReview: this.state.quotes[0] });
    setInterval(() => {
      console.log();
      this.setState({ currentReview: this.state.quotes[this.state.count] });
      this.state.count == this.state.quotes.length - 1
        ? this.setState({ count: 0 })
        : this.setState({ count: this.state.count + 1 });
    }, 2000);
  }

  render() {
    return (
      <Fragment>
        <div className={`container mt-5 p-1 ${styles.containerStyle}`}>
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
            <small style={{ color: "#a3b6ce" }}>
              {this.state.currentReview.quote}
            </small>
            <p className="fw-700 py-3" style={{ color: "#003478" }}>
              {this.state.currentReview.name}
            </p>
          </div>
        </div>
        <div className="container d-flex mb-5">
          {this.state.quotes.map((item) => {
            if (this.state.currentReview.name == item.name) {
              return (
                <div
                  key={item.name}
                  style={{
                    background: "var(--primary-main)",
                    width: "11px",
                    height: "11px",
                  }}
                  className={`${styles.dotStyle} m-1`}
                  onClick={() => {
                    this.setState({ currentReview: item });
                  }}
                ></div>
              );
            } else {
              return (
                <div
                  key={item.name}
                  className={`${styles.dotStyle} m-1`}
                  onClick={() => {
                    this.setState({ currentReview: item });
                  }}
                ></div>
              );
            }
          })}
        </div>
      </Fragment>
    );
  }
}
