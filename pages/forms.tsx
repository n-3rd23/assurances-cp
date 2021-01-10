import styles from "./forms.module.scss";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Bar from "../components/bar/bar";
import Download from "../public/icons/download.svg";
import Link from "next/link";

export default function Forms() {
  const [forms, setForms] = useState(null);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forms`)
      .then((res) => res.json())
      .then((forms) => {
        setForms(forms.forms);
      });
  });

  if (forms) {
    return (
      <Layout title="Forms" description="Best Life Insurance ever">
        <h3 className="d-flex text-largest fw-900 text-primary mt-3 justify-content-center">
          Forms
        </h3>
        <Bar />
        <div className="row justify-content-center"></div>
        {forms.map((item) => {
          return (
            <Link href={item.url}>
              <div
                className={`col-sm-12 col-md-3 col-12 py-5 px-2 m-3 ${styles.containerStyle} mx-auto`}
              >
                <div className={`data ${styles.dataStyle} text-center fw-700`}>
                  {item.name}
                </div>
                <div
                  className={`d-flex ${styles.iconStyle} justify-content-center align-items-center`}
                >
                  <div className="icon">
                    <Download width={50} height={50} />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
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
