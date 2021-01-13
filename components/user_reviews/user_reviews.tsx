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
        name: "Alan",
        quote:
          "I know him for the last 15 years. He is known for his dedication, discipline, straight forwardness, spontaneous in cutting jokes, good dressing and of late he has become tech savvy. He helps me continuously in saving my money. His service and friendly nature made him in good books of many of my friends and relatives. He has been in training financial planning also. He is not only my friend and his entire family has become part of our family. I wish him all the best. S. Pari",
      },
      {
        name: "Marshall",
        quote:
          " I know Mr.Thomas for a decade now and he is not just another financial advisor / consultant . When you invest your time with him, you have two benefits both lasts for life. One is money and other is his friendship. He is a great human who has a sense of responsibility for the work he does and a very dynamic person who makes our job of investment easier and quicker",
      },
      {
        name: "Athul",
        quote:
          "He has got an excellent knowledge on various financial products and is well qualified as a financial planner. His expertize on Life insurance products is amazing. As a person, Malli has got an amazing personality and brings in great fun and humor everytime you interact with him. He brings in lot of positivity and keeps all people around him with great Joy and Cheer. I cherish all his interactions. In addition he is a great Cricket and Shuttle player and has played for various leagues.",
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
