import { Fragment } from "react";
import styles from "./home_features.module.scss";
import Feature_Card from "../feature_card/feature_card";
import Bar from "../bar/bar";
import Safe from "../../public/icons/safe.svg";
import Dove from "../../public/icons/dove.svg";
import Bank from "../../public/icons/piggy-bank.svg";

export default function Home_Features() {
  return (
    <Fragment>
      <div className="container text-center p-5">
        <Bar />
        <h3 className="mb-0 text-largest fw-900 text-primary mt-3">
          NO MORE WORRIES
        </h3>
      </div>
      <div
        className={`d-flex justify-content-center p-5 ${styles.containerStyle}`}
      >
        <div className="p-3">
          <Feature_Card
            icon={<Safe className={`p-1 m-1`} width={50} height={50} />}
            head="SECURE LIFE"
            content="Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a"
          />
        </div>
        <div className="p-3">
          <Feature_Card
            icon={<Dove className={`p-1 m-1`} width={50} height={50} />}
            head="PEACEFUL LIFE"
            content="Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a"
          />
        </div>
        <div className="p-3">
          <Feature_Card
            icon={<Bank className={`p-1 m-1`} width={50} height={50} />}
            head="FLEXIBLE COST"
            content="Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a
            Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. 
            Etiam fermentum blandit odio,
            id iaculis felis tincidunt a"
          />
        </div>
      </div>
    </Fragment>
  );
}
