import styles from "../styles/forms.module.scss";
import { useEffect, useState } from "react";
import Layout from "../components/layout/layout";
import Bar from "../components/bar/bar";
import { firestore } from "../firebase/firebase.util";
import { Select } from "antd";

export default function Forms() {
  const [forms, setForms] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { Option } = Select;
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/forms`)
      .then((res) => res.json())
      .then((forms) => {
        setForms(forms.forms);
      });
    getFormsCategory();
  }, []);

  const getFormsCategory = async () => {
    const formsCategoryRef = await firestore.collection("formCategory");
    const formsCategoryDoc = await formsCategoryRef.get();
    const tmp = [];
    formsCategoryDoc.forEach((doc) => {
      tmp.push({ id: doc.id, ...doc.data() });
    });
    setCategory(tmp);
  };

  const getSelectedCategory = (event) => {
    // console.log(event);
    setSelectedCategory(event);
  };

  if (forms) {
    console.log(forms);
    console.log(category);
    return (
      <Layout title="Forms" description="Best Life Insurance ever">
        <h3 className="d-flex text-largest fw-900 text-primary mt-5 justify-content-center">
          Forms
        </h3>
        <Bar />

        <div className="row justify-content-center mt-5">
          <div className="d-flex justify-content-center">
            <Select
              onChange={getSelectedCategory}
              value={selectedCategory}
              className="w-25"
            >
              <Option value="all">All</Option>
              {category.length > 0
                ? category.map((item) => {
                    return (
                      <Option value={item.categoryName} key={item.id}>
                        {item.categoryName}
                      </Option>
                    );
                  })
                : null}
            </Select>
          </div>
          {forms.map((item) => {
            if (selectedCategory == "all") {
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
            } else if (item.category == selectedCategory) {
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
            }
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
