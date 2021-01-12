import styles from "./services.module.scss";
import ServiceCard from "./../serviceCard/serviceCard";
import { Fragment } from "react";
import Bar from "../bar/bar";
import { useEffect, useState } from "react";
import { Collapse } from "antd";

export default function Services() {
  const [categories, setCategories] = useState(null);
  const [allCategories, setAllCategories] = useState(null);
  const [buttonText, setButtonText] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories?limit=3`)
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories.categories);
        setButtonText("SHOW MORE");
      });
  }, []);

  function panelClick() {
    if (buttonText == "SHOW MORE") {
      setButtonText("SHOW LESS");
      document.getElementById("primary").style.display = "none";
    } else {
      setButtonText("SHOW MORE");
      document.getElementById("primary").style.display = "flex";
    }
    if (!allCategories) {
      getMoreCategories();
    }
  }

  function getMoreCategories() {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((categories) => {
        setAllCategories(categories.categories);
      });
  }

  if (categories) {
    const { Panel } = Collapse;
    return (
      <Fragment>
        <div className="container text-center mb-5">
          <Bar />
          <h3 className="mb-0 text-largest fw-900 text-primary mt-3">
            SERVICES
          </h3>
        </div>
        <div id="primary" className="row mx-auto justify-content-center">
          {categories.map((item) => {
            return (
              <div className="col-md-4 col-sm-12">
                <ServiceCard
                  img={item.images[0].link}
                  title={item.name}
                  desc={item.description}
                  slug={item.slug}
                />
              </div>
            );
          })}
        </div>
        <div className="container-fluid">
          <Collapse
            accordion
            bordered={false}
            style={{ backgroundColor: "white", textAlign: "center" }}
            onChange={panelClick}
          >
            <Panel header={buttonText} key="1" showArrow={false}>
              <div className="row mx-auto justify-content-center">
                {allCategories ? (
                  <Fragment>
                    {allCategories.map((item) => {
                      return (
                        <div className="col-md-4 col-sm-12">
                          <ServiceCard
                            img={item.images[0].link}
                            title={item.name}
                            desc={item.description}
                            slug={item.slug}
                          />
                        </div>
                      );
                    })}
                  </Fragment>
                ) : (
                  <div className="d-flex justify-content-center align-items-center my-5">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                )}
              </div>
            </Panel>
          </Collapse>
        </div>
      </Fragment>
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
