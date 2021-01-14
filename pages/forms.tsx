import styles from "./forms.module.scss";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Bar from "../components/bar/bar";
import Download from "../public/icons/download.svg";

export default function Forms() {
  const [forms, setForms] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forms`)
      .then((res) => res.json())
      .then((forms) => {
        setForms(forms.forms);
      });
  }, []);

  if (forms) {
    return (
      <Layout title="Forms" description="Best Life Insurance ever">
        <h3 className="d-flex text-largest fw-900 text-primary mt-5 justify-content-center">
          Forms
        </h3>
        <Bar />
        <div className="row justify-content-center mt-5">
          {forms.map((item) => {
            return (
              <a
                href={item.url}
                target="_blank"
                className={`col-sm-3 col-md-3 col-12 py-5 px-2 m-3 ${styles.containerStyle}`}
              >
                <div
                  className={`data ${styles.dataStyle} text-center fw-700 p-2`}
                >
                  <div className={`${styles.pdfIcon}`}>
                    <img src="https://img.icons8.com/wired/64/000000/pdf.png" />
                  </div>
                  <br />
                  <p className="pt-2">{item.name}</p>
                </div>
              </a>
            );
          })}
        </div>
      </Layout>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
}
