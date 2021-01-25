import styles from "./services.module.scss";
import Hero from "../components/hero/hero";
import Layout from "../components/layout/layout";
import UserPlanCard from "../components/userPlanCard/userPlanCard";
import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import Bar from "../components/bar/bar";
import { useRouter } from "next/router";

interface Props {
  plans?: any;
}

export default function Services({ plans }: Props) {
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropDownText, setDropDownText] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const { category } = router.query;
    console.log(category);
    if (category) {
      console.log(category);
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/category?slug=${category}`)
        .then((res) => res.json())
        .then((category) => {
          setSelectedCategory(category.category);
          setDropDownText(category.category.name);
        });
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`)
      .then((res) => res.json())
      .then((categories) => {
        setCategories(categories.categories);
      });
  }, []);

  if (categories) {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href=""
            onClick={(e) => {
              e.preventDefault(),
                setSelectedCategory(null),
                setDropDownText("ALL");
            }}
          >
            ALL
          </a>
        </Menu.Item>
        {categories.map((item) => {
          return (
            <Menu.Item>
              <a
                key={item.id}
                target="_blank"
                rel="noopener noreferrer"
                href=""
                onClick={(e) => {
                  e.preventDefault(), console.log(item);
                  setSelectedCategory(item), setDropDownText(item.name);
                }}
              >
                {item.name}
              </a>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    if (selectedCategory) {
      console.log(selectedCategory)
      return (
        <Layout title="Insurances" description="assurances insurance plans">
          <Hero subHead="FOR EVERY PURPOSE" mainHead="WE HAVE YOU COVERED" />
          <div className="d-flex justify-content-center">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {dropDownText ? dropDownText : "Services"} <DownOutlined />
              </a>
            </Dropdown>
          </div>

          <div
            className={`container ${styles.containerStyle} p-5 d-flex flex-column my-5 justify-content-center align-items-center`}
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${selectedCategory.images[0].link}) `,
            }}
          >
            <a className={`text-white text-larger fw-700 ${styles.aStyle}`}>
              {selectedCategory.name}
            </a>
            <a
              className={`text-white text-medium fw-500 px-5 ${styles.aStyle}`}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(selectedCategory.description),
              }}
            ></a>
              {
               selectedCategory.slug == "vehicle-insurances" || selectedCategory.slug == "health-insurances" ? <div className="text-white"><a href="www.newindia.co.in">Click here to Go to New India Assurance</a></div> : null
              }
          </div>
          <Bar />
          <h3 className="d-flex text-largest fw-900 text-primary mt-3 justify-content-center">
            Plans In {dropDownText}
          </h3>
          <div className="row justify-content-center">
            {plans.plans.map((item) => {
              return item.category == selectedCategory.slug ? (
                <div
                  key={item.id}
                  className="col-lg-5 col-md-5 col-sm-5 col-12 p-4"
                >
                  {" "}
                  <UserPlanCard
                    key={item.id}
                    subHead1={selectedCategory.name}
                    mainHead={item.planName}
                    subHead2={item.planSummary}
                  />
                </div>
              ) : (
                ""
              );
            })}
          </div>
        </Layout>
      );
    } else {
      return (
        <Layout title="Insurances" description="assurances insurance plans">
          <Hero subHead="FOR EVERY PURPOSE" mainHead="WE HAVE YOU COVERED" />
          <div className="d-flex justify-content-center mb-5">
            <Dropdown overlay={menu} trigger={["click"]}>
              <a
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                {dropDownText ? dropDownText : "Services"} <DownOutlined />
              </a>
            </Dropdown>
          </div>
          <Bar />
          <h3 className="d-flex text-largest fw-900 text-primary mt-3 justify-content-center">
            Plans From All Services
          </h3>
          <div className="row justify-content-center">
            {plans && plans.plans
              ? plans.plans.map((item: any) => {
                  return (
                    <div
                      key={item.id}
                      className="col-lg-5 col-md-5 col-sm-5 col-12 p-4"
                    >
                      {" "}
                      <UserPlanCard
                        key={item.id}
                        subHead1={item.category}
                        mainHead={item.planName}
                        subHead2={item.planSummary}
                      />
                    </div>
                  );
                })
              : ""}
          </div>
        </Layout>
      );
    }
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

Services.getInitialProps = async ({ req }) => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/plans`);
  const plans = await data.json();
  return { plans };
};
